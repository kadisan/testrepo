import {handleCallbackRequest} from '../src/callback-api.js';

const host = 'sarkadisandor.hu';
const prefix = '/eletutak-talalkozasa';
// The previous published offer and its legal/translated pages remain available
// independently of this release. Do not change the old Pages production build.
const legacyOrigin = 'https://b5ead318.eletutak-talalkozasa.pages.dev';
const files = new Set([
  '/', '/index.html', '/tai-chi', '/tai-chi/', '/tai-chi/index.html',
  '/config.js', '/robots.txt', '/sitemap.xml', '/release-version.json',
  '/favicon.ico', '/favicon-16.png', '/favicon-32.png',
  '/apple-touch-icon.png', '/icon-192.png', '/icon-512.png', '/forest-canopy.webp',
]);

function sitePath(path) {
  return files.has(path) || ['/assets/', '/images/', '/letoltes/'].some(p => path.startsWith(p));
}

async function legacy(request, fetcher) {
  const original = new URL(request.url);
  const target = new URL(original.pathname + original.search, legacyOrigin);
  const headers = new Headers(request.headers);
  for (const name of ['cookie', 'authorization', 'host']) headers.delete(name);
  const response = await fetcher(new Request(target, {method:request.method, headers, redirect:'manual'}));
  const output = new Headers(response.headers);
  const location = output.get('Location');
  if (location) {
    const next = new URL(location, target);
    if ([legacyOrigin, 'https://eletutak-talalkozasa.pages.dev'].includes(next.origin)) {
      next.protocol = 'https:'; next.hostname = host;
      output.set('Location', next.href);
    }
  }
  return new Response(response.body, {status:response.status, statusText:response.statusText, headers:output});
}

export async function handleSiteRequest(request, env = {}, {fetcher = fetch} = {}) {
  const url = new URL(request.url);
  const preview = url.hostname.endsWith('.workers.dev');
  if (![host, 'www.'+host].includes(url.hostname) && !preview) return new Response('Not found', {status:404});
  const landing = url.pathname === prefix || url.pathname.startsWith(prefix+'/');
  const known = sitePath(url.pathname) || landing;
  if (!known) return preview ? new Response('Not found', {status:404}) : fetcher(request);

  if (url.protocol !== 'https:' || url.hostname === 'www.'+host ||
      ['/index.html','/tai-chi','/tai-chi/index.html',prefix,prefix+'/index.html'].includes(url.pathname)) {
    url.protocol = 'https:';
    if (!preview) url.hostname = host;
    if (url.pathname === '/index.html') url.pathname = '/';
    if (['/tai-chi','/tai-chi/index.html'].includes(url.pathname)) url.pathname = '/tai-chi/';
    if ([prefix,prefix+'/index.html'].includes(url.pathname)) url.pathname = prefix+'/';
    return Response.redirect(url.href, 308);
  }
  if (url.pathname === prefix+'/api/callback') {
    // Opening the home page first must not accidentally activate the new offer.
    return handleCallbackRequest(request, env.LANDING_ENABLED === 'true' ? env : {}, {fetcher});
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', {status:405, headers:{Allow:'GET, HEAD'}});
  }
  if (landing && (env.LANDING_ENABLED !== 'true' || url.pathname !== prefix+'/')) {
    return legacy(request, fetcher);
  }
  if (!env.ASSETS?.fetch) return new Response('Temporarily unavailable', {status:503});
  const response = await env.ASSETS.fetch(request);
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options','nosniff');
  headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  if (preview) headers.set('X-Robots-Tag','noindex, nofollow, noarchive');
  if (url.pathname === '/config.js' || url.pathname === '/release-version.json') {
    headers.set('Cache-Control','no-store, max-age=0');
  } else if (/^text\/html/i.test(headers.get('Content-Type') || '')) {
    headers.set('Cache-Control','no-cache');
  }
  return new Response(response.body, {status:response.status, statusText:response.statusText, headers});
}

export default {fetch:(request, env)=>handleSiteRequest(request, env)};
