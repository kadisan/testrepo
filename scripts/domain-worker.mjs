// Csak az Életutak mappáját szolgálja ki a már meglévő Pages-projektből.
// A domain többi útvonala az eredeti tárhelyen marad.
const canonicalHost='sarkadisandor.hu';
const prefix='/eletutak-talalkozasa';
const assetOrigin='https://eletutak-talalkozasa.pages.dev';
import {handleCallbackRequest} from '../src/callback-api.js';
export async function handleRequest(request,fetcher=fetch,env={}) {
  const url=new URL(request.url);
  if(![canonicalHost,'www.'+canonicalHost].includes(url.hostname))return new Response('Not found',{status:404});
  if(url.pathname!==prefix&&!url.pathname.startsWith(prefix+'/'))return fetcher(request);
  if(url.pathname===prefix+'/api/callback') {
    if(url.hostname!==canonicalHost||url.protocol!=='https:') {
      url.hostname=canonicalHost;url.protocol='https:';
      return Response.redirect(url.href,308);
    }
    return handleCallbackRequest(request,env,{fetcher});
  }
  if(request.method!=='GET'&&request.method!=='HEAD')return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
  if(url.hostname!==canonicalHost||url.protocol!=='https:'||url.pathname===prefix) {
    url.hostname=canonicalHost;url.protocol='https:';
    if(url.pathname===prefix)url.pathname+='/'
    return Response.redirect(url.href,308);
  }
  const upstream=new URL(url.pathname+url.search,assetOrigin);
  const headers=new Headers(request.headers);
  headers.delete('cookie');headers.delete('authorization');headers.delete('host');
  const response=await fetcher(new Request(upstream,{method:request.method,headers,redirect:'manual'}));
  const responseHeaders=new Headers(response.headers);
  // A Pages könyvtárátirányítása is a saját domainen maradjon.
  const location=responseHeaders.get('location');
  if(location) {
    const target=new URL(location,upstream);
    if(target.origin===assetOrigin){target.hostname=canonicalHost;responseHeaders.set('location',target.href)}
  }
  responseHeaders.set('X-Content-Type-Options','nosniff');
  responseHeaders.set('Referrer-Policy','strict-origin-when-cross-origin');
  if(url.pathname===prefix+'/config.js')responseHeaders.set('Cache-Control','no-store, max-age=0');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers:responseHeaders});
}
export default {fetch:(request,env)=>handleRequest(request,fetch,env)};
