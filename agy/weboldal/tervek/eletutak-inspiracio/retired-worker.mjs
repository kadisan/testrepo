// The author set aside the experiment on 24 November 2026.
// Keep its historical source; return visitors to the original full preview.
const destination = 'https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261124-helyszinek#lp-content';
export default {
  async fetch(request) {
    const headers = {'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow, noarchive'};
    if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, {status: 405, headers});
    if (new URL(request.url).pathname === '/robots.txt') return new Response(request.method === 'HEAD' ? null : 'User-agent: *\nDisallow: /\n', {headers});
    return new Response(null, {status: 302, headers: {...headers, Location: destination}});
  },
};
