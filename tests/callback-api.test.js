import test from 'node:test';
import assert from 'node:assert/strict';
import { handleCallbackRequest } from '../src/callback-api.js';
import { onRequest } from '../functions/eletutak-talalkozasa/api/callback.js';

const origin = 'https://sarkadisandor.hu';
const endpoint = origin + '/eletutak-talalkozasa/api/callback';
const requestId = '22d9a455-a930-42d0-912d-9127080f2f43';
const env = {
  CALLBACK_SECRET: 'a-test-secret-at-least-thirty-two-characters-long',
  CALLBACK_WEBHOOK_URL: 'https://script.google.com/macros/s/DEPLOYMENT_ID/exec',
};
const lead = {
  requestId, name: 'Teszt Elek', phone: '+36 30 123 4567', consent: true,
};

function post(body = lead, headers = {}) {
  return new Request(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin, ...headers },
    body: JSON.stringify(body),
  });
}

function receiver(body = { ok: true, requestId }, status = 200) {
  return Response.json(body, { status });
}

test('callback readiness describes local configuration without network or secrets', async () => {
  const request = new Request(endpoint);
  let calls = 0;
  const options = { fetcher: () => { calls++; throw new Error('unexpected'); } };
  const ready = await handleCallbackRequest(request, env, options);
  assert.deepEqual(await ready.json(), { enabled: true });
  assert.deepEqual(await (await handleCallbackRequest(new Request(endpoint), {}, options)).json(), { enabled: false });
  assert.equal(calls, 0);
  assert.match(ready.headers.get('Cache-Control'), /no-store/);
});

test('callback receiver configuration rejects wrong hosts, paths, credentials, query, and weak secrets', async () => {
  for (const url of [
    'http://script.google.com/macros/s/ID/exec',
    'https://script.google.com.evil.invalid/macros/s/ID/exec',
    'https://script.google.com@evil.invalid/macros/s/ID/exec',
    'https://user:password@script.google.com/macros/s/ID/exec',
    'https://script.google.com/macros/s/ID/dev',
    'https://script.google.com/macros/s/ID/exec?secret=x',
    'https://script.google.com/macros/s/ID/exec#fragment',
    'https://script.google.com:444/macros/s/ID/exec',
  ]) {
    assert.deepEqual(await (await handleCallbackRequest(new Request(endpoint), { ...env, CALLBACK_WEBHOOK_URL: url })).json(), { enabled: false }, url);
  }
  assert.deepEqual(await (await handleCallbackRequest(new Request(endpoint), { ...env, CALLBACK_SECRET: 'short' })).json(), { enabled: false });
});

test('callback POST stays unavailable without receiver configuration', async () => {
  const response = await handleCallbackRequest(post(), {}, { fetcher: () => assert.fail('no write when unconfigured') });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});

test('callback rejects foreign Origin or cross-site browser context', async () => {
  for (const headers of [{ Origin: 'https://elsewhere.invalid' }, { Origin: 'null' }, { 'Sec-Fetch-Site': 'cross-site' }]) {
    const response = await handleCallbackRequest(post(lead, headers), env, { fetcher: () => assert.fail('no foreign writes') });
    assert.equal(response.status, 403);
  }
});

test('callback validates required consent, phone, name, UUID, optional reason, selection and trap before network', async () => {
  const invalid = [
    { ...lead, consent: false }, { ...lead, consent: 'true' },
    { ...lead, phone: '123' }, { ...lead, phone: '+36 example' }, { ...lead, phone: '1'.repeat(16) },
    { ...lead, name: '  ' }, { ...lead, name: 'A'.repeat(121) }, { ...lead, name: 'A\nB' },
    { ...lead, requestId: 'not-a-uuid' }, { ...lead, reason: 'a'.repeat(1001) },
    { ...lead, reason: '\u0000' }, { ...lead, package: 'made-up' },
    { ...lead, weekends: [3] }, { ...lead, weekends: [0, 0] }, { ...lead, weekends: ['0'] },
    { ...lead, website: 'https://spam.invalid' },
  ];
  for (const body of invalid) {
    const response = await handleCallbackRequest(post(body), env, { fetcher: () => assert.fail('no invalid writes') });
    assert.equal(response.status, 400, JSON.stringify(body));
  }
});

test('callback rejects unsupported content, malformed JSON and oversized body', async () => {
  const noWrite = { fetcher: () => assert.fail('no invalid writes') };
  assert.equal((await handleCallbackRequest(post(lead, { 'Content-Type': 'text/plain' }), env, noWrite)).status, 415);
  const malformed = new Request(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' });
  assert.equal((await handleCallbackRequest(malformed, env, noWrite)).status, 400);
  const oversized = post({ ...lead, extra: 'x'.repeat(13000) });
  assert.equal((await handleCallbackRequest(oversized, env, noWrite)).status, 413);
  assert.equal((await handleCallbackRequest(post(lead, { 'Content-Length': '13000' }), env, noWrite)).status, 413);
});

test('callback sends no invented email and returns only the matching confirmed receipt', async () => {
  let forwarded;
  const response = await handleCallbackRequest(post({ ...lead, name: '  Teszt Elek  ', reason: '  Egy kérdés\nkét sorban.  ', package: 'plus', weekends: [2, 0] }), env, {
    fetcher: async (url, init) => {
      assert.equal(url, env.CALLBACK_WEBHOOK_URL);
      assert.equal(init.redirect, 'manual');
      forwarded = JSON.parse(init.body);
      return receiver();
    },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, requestId });
  assert.deepEqual(forwarded, { ...lead, name: 'Teszt Elek', reason: 'Egy kérdés\nkét sorban.', package: 'plus', weekends: [0, 2], secret: env.CALLBACK_SECRET });
  assert.equal('email' in forwarded, false);
});

test('callback accepts only explicit success matching the request ID', async () => {
  for (const makeResponse of [
    () => receiver({ ok: false, error: 'unauthorized' }),
    () => receiver({ ok: true, requestId: 'another-id' }),
    () => receiver({ ok: true }),
    () => receiver({ ok: 'true', requestId }),
    () => new Response('<html>Log in</html>', { headers: { 'Content-Type': 'text/html' } }),
    () => receiver({ ok: true, requestId }, 500),
    () => new Response('not JSON', { headers: { 'Content-Type': 'application/json' } }),
  ]) {
    const response = await handleCallbackRequest(post(), env, { fetcher: async () => makeResponse() });
    assert.equal(response.status, 502);
    const result = await response.json();
    assert.equal(result.ok, false);
    assert.equal(result.retryable, true);
    assert.equal(JSON.stringify(result).includes(env.CALLBACK_SECRET), false);
  }
});

test('callback follows Google output redirects with GET and without secret or lead body', async () => {
  const calls = [];
  const outputUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=example&lib=example';
  const response = await handleCallbackRequest(post(), env, {
    fetcher: async (url, init) => {
      calls.push({ url, init });
      return calls.length === 1 ? new Response(null, { status: 302, headers: { Location: outputUrl } }) : receiver();
    },
  });
  assert.equal(response.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, outputUrl);
  assert.equal(calls[1].init.method, 'GET');
  assert.equal(calls[1].init.body, undefined);
  assert.equal(JSON.stringify(calls[1]).includes(env.CALLBACK_SECRET), false);
});

test('callback refuses untrusted redirect destinations and does not forward secrets', async () => {
  for (const target of [
    'https://evil.invalid/collect',
    'https://script.googleusercontent.com.evil.invalid/macros/echo',
    'https://script.googleusercontent.com/wrong-path',
    'https://script.google.com/macros/s/OTHER/exec',
    'http://script.googleusercontent.com/macros/echo',
  ]) {
    let calls = 0;
    const response = await handleCallbackRequest(post(), env, { fetcher: async () => {
      calls++;
      return new Response(null, { status: 307, headers: { Location: target } });
    } });
    assert.equal(response.status, 502, target);
    assert.equal(calls, 1);
  }
});

test('callback times out without reporting a lead as confirmed', async () => {
  let signal;
  const response = await handleCallbackRequest(post(), env, {
    timeoutMs: 5,
    fetcher: async (_url, init) => { signal = init.signal; return new Promise(() => {}); },
  });
  assert.equal(response.status, 504);
  assert.equal(signal.aborted, true);
  assert.equal((await response.json()).retryable, true);
});

test('callback Pages Function delegates to the same-origin handler', async () => {
  const response = await onRequest({ request: new Request(endpoint), env: {} });
  assert.deepEqual(await response.json(), { enabled: false });
  assert.equal((await handleCallbackRequest(new Request(endpoint, { method: 'DELETE' }), env)).status, 405);
});

