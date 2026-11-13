// Same-origin callback endpoint. A successful response requires a confirmed
// durable write by the configured owner-controlled receiver.
const MAX_BODY_BYTES = 12 * 1024;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PACKAGES = new Set(['', 'one', 'two', 'series', 'plus']);
const GENERIC_ERROR = 'A kérés beküldése most nem sikerült. Próbáld újra, vagy hívj közvetlenül.';

function reply(body, status = 200, extraHeaders = {}) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });
}

function receiverConfiguration(env) {
  const secret = env?.CALLBACK_SECRET;
  if (typeof secret !== 'string' || secret.length < 32 || secret.length > 512) return null;
  try {
    const url = new URL(env.CALLBACK_WEBHOOK_URL);
    if (url.protocol !== 'https:' || url.hostname !== 'script.google.com' || url.port ||
        url.username || url.password || url.search || url.hash ||
        !/^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url.pathname)) return null;
    return { url: url.href, secret };
  } catch {
    return null;
  }
}

function sameOrigin(request) {
  if (request.headers.get('Sec-Fetch-Site')?.toLowerCase() === 'cross-site') return false;
  const origin = request.headers.get('Origin');
  return !origin || origin === new URL(request.url).origin;
}

async function readBody(request) {
  const length = request.headers.get('Content-Length');
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) {
    throw new RangeError('body');
  }
  if (!request.body) throw new SyntaxError('body');
  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let lengthRead = 0;
  let content = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      lengthRead += value.byteLength;
      if (lengthRead > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError('body');
      }
      content += decoder.decode(value, { stream: true });
    }
    content += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(content);
}

function validate(input) {
  if (!input || Array.isArray(input) || typeof input !== 'object') return null;
  if (typeof input.requestId !== 'string' || !UUID.test(input.requestId)) return null;
  if (typeof input.name !== 'string' || typeof input.phone !== 'string') return null;
  const name = input.name.trim();
  const phone = input.phone.trim();
  if (!name || name.length > 120 || /[\u0000-\u001f\u007f]/.test(name)) return null;
  const digits = phone.replace(/\D/g, '');
  if (phone.length > 40 || !/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) return null;
  if (input.consent !== true) return null;
  if (input.website !== undefined && (typeof input.website !== 'string' || input.website.trim())) return null;
  const reason = input.reason === undefined ? '' : input.reason;
  if (typeof reason !== 'string' || reason.length > 1000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(reason)) return null;
  const packageId = input.package === undefined ? '' : input.package;
  if (!PACKAGES.has(packageId)) return null;
  const weekends = input.weekends === undefined ? [] : input.weekends;
  if (!Array.isArray(weekends) || weekends.length > 3 ||
      weekends.some(value => !Number.isInteger(value) || value < 0 || value > 2) ||
      new Set(weekends).size !== weekends.length) return null;
  return {
    requestId: input.requestId.toLowerCase(),
    name,
    phone,
    reason: reason.trim(),
    consent: true,
    package: packageId,
    weekends: [...weekends].sort(),
  };
}

function trustedOutputRedirect(location, currentUrl) {
  try {
    const url = new URL(location, currentUrl);
    return url.protocol === 'https:' && url.hostname === 'script.googleusercontent.com' &&
      !url.port && !url.username && !url.password && !url.hash && url.pathname === '/macros/echo'
      ? url.href : null;
  } catch {
    return null;
  }
}

async function deliver(config, payload, fetcher, signal) {
  let currentUrl = config.url;
  let response = await fetcher(currentUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, secret: config.secret }),
    redirect: 'manual',
    signal,
  });
  for (let redirects = 0; [301, 302, 303, 307, 308].includes(response.status); redirects++) {
    if (redirects >= 2) throw new Error('receiver');
    const next = trustedOutputRedirect(response.headers.get('Location'), currentUrl);
    if (!next) throw new Error('receiver');
    // Apps Script's ContentService redirects to Google-hosted output. Never
    // resend the secret or lead body to a redirect target, even for 307/308.
    currentUrl = next;
    response = await fetcher(currentUrl, {
      method: 'GET', headers: { Accept: 'application/json' }, redirect: 'manual', signal,
    });
  }
  if (!response.ok) throw new Error('receiver');
  const type = response.headers.get('Content-Type') || '';
  if (!/^application\/json(?:;|$)/i.test(type)) throw new Error('receiver');
  const result = await readBody(response);
  if (result?.ok !== true || result.requestId !== payload.requestId) throw new Error('unconfirmed');
  return result;
}

export async function handleCallbackRequest(request, env = {}, { fetcher = fetch, timeoutMs = 12000 } = {}) {
  if (!sameOrigin(request)) return reply({ ok: false, error: 'A kérés erről az oldalról nem fogadható.' }, 403);
  const config = receiverConfiguration(env);
  if (request.method === 'GET') return reply({ enabled: Boolean(config) });
  if (request.method !== 'POST') return reply({ ok: false, error: 'Nem támogatott kérés.' }, 405, { Allow: 'GET, POST' });
  if (!config) return reply({ ok: false, error: 'Az online visszahíváskérés még nincs bekapcsolva. Hívj közvetlenül.' }, 503);
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('Content-Type') || '')) {
    return reply({ ok: false, error: 'Hibás kérés.' }, 415);
  }
  let payload;
  try {
    payload = validate(await readBody(request));
  } catch (error) {
    return reply({ ok: false, error: 'Hibás vagy túl hosszú kérés.' }, error instanceof RangeError ? 413 : 400);
  }
  if (!payload) return reply({ ok: false, error: 'Ellenőrizd a nevedet, telefonszámodat és a hozzájárulást.' }, 400);

  const controller = new AbortController();
  let timeout;
  try {
    // Promise.race also bounds custom fetch adapters that do not observe abort.
    await Promise.race([
      deliver(config, payload, fetcher, controller.signal),
      new Promise((_, reject) => {
        timeout = setTimeout(() => { controller.abort(); reject(new Error('timeout')); }, timeoutMs);
      }),
    ]);
    return reply({ ok: true, requestId: payload.requestId });
  } catch {
    // A timeout may happen after the durable write. The browser must retain and
    // reuse requestId on retry; the receiver will return that same stored lead.
    return reply({ ok: false, error: GENERIC_ERROR, retryable: true }, controller.signal.aborted ? 504 : 502);
  } finally {
    clearTimeout(timeout);
  }
}
