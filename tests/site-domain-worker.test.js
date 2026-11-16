import test from 'node:test';
import assert from 'node:assert/strict';
import {handleSiteRequest} from '../scripts/site-domain-worker.mjs';

const origin='https://sarkadisandor.hu';
const request=path=>new Request(origin+path);
const fail=()=>{throw new Error('Unexpected origin request');};

test('the home, Tai Chi and their assets use the new binding; unrelated old URLs keep their origin',async()=>{
 const seen=[];
 const env={ASSETS:{fetch:async req=>{seen.push(new URL(req.url).pathname);return new Response('site');}}};
 for(const path of ['/','/tai-chi/','/images/portrait.webp','/assets/main.js','/letoltes/konyv.pdf']) {
  assert.equal(await(await handleSiteRequest(request(path),env,{fetcher:fail})).text(),'site');
 }
 assert.equal(seen.length,5);
 const original=request('/meglevo-tartalom/');let forwarded;
 assert.equal(await(await handleSiteRequest(original,env,{fetcher:async req=>{forwarded=req;return new Response('origin');}})).text(),'origin');
 assert.equal(forwarded,original);
});

test('the first phase preserves the old offer even though new assets already contain its replacement',async()=>{
 let forwarded;
 const response=await handleSiteRequest(request('/eletutak-talalkozasa/?utm_source=campaign'),{ASSETS:{fetch:fail}}, {
  fetcher:async req=>{forwarded=req;return new Response('old offer');},
 });
 assert.equal(await response.text(),'old offer');
 assert.equal(forwarded.url,'https://b5ead318.eletutak-talalkozasa.pages.dev/eletutak-talalkozasa/?utm_source=campaign');
 const readiness=await handleSiteRequest(request('/eletutak-talalkozasa/api/callback'),{LANDING_ENABLED:'false'}, {fetcher:fail});
 assert.deepEqual(await readiness.json(),{enabled:false});
});

test('the second phase publishes the new Hungarian offer while keeping existing legal and translated pages',async()=>{
 const env={LANDING_ENABLED:'true',ASSETS:{fetch:async()=>new Response('new offer')}};
 assert.equal(await(await handleSiteRequest(request('/eletutak-talalkozasa/'),env,{fetcher:fail})).text(),'new offer');
 for(const path of ['/eletutak-talalkozasa/adatkezeles/','/eletutak-talalkozasa/impresszum/','/eletutak-talalkozasa/en/','/eletutak-talalkozasa/config.js']) {
  let target;
  const response=await handleSiteRequest(request(path),env,{fetcher:async req=>{target=req.url;return new Response('preserved');}});
  assert.equal(await response.text(),'preserved');assert.ok(target.endsWith(path));
 }
});

test('canonical redirects retain campaign parameters and static POSTs are rejected',async()=>{
 for(const [from,to]of[
  ['http://sarkadisandor.hu/?utm_source=test',origin+'/?utm_source=test'],
  ['https://www.sarkadisandor.hu/tai-chi',origin+'/tai-chi/'],
  [origin+'/index.html',origin+'/'],
  [origin+'/tai-chi/index.html',origin+'/tai-chi/'],
 ]) {
  const res=await handleSiteRequest(new Request(from),{},{fetcher:fail});assert.equal(res.status,308);assert.equal(res.headers.get('location'),to);
 }
 const post=await handleSiteRequest(new Request(origin+'/',{method:'POST',body:'body'}),{},{fetcher:fail});assert.equal(post.status,405);
});

test('legacy requests strip credentials and rewrite redirects back to the public domain',async()=>{
 const res=await handleSiteRequest(new Request(origin+'/eletutak-talalkozasa/en',{headers:{cookie:'private',authorization:'Bearer private'}}),{}, {
  fetcher:async req=>{assert.equal(req.headers.has('cookie'),false);assert.equal(req.headers.has('authorization'),false);return Response.redirect('https://b5ead318.eletutak-talalkozasa.pages.dev/eletutak-talalkozasa/en/',308);},
 });
 assert.equal(res.headers.get('location'),origin+'/eletutak-talalkozasa/en/');
});

test('static configuration is uncached, staging is not indexed, and unknown hosts cannot use the router',async()=>{
 const env={ASSETS:{fetch:async()=>new Response('config',{headers:{'Cache-Control':'public,max-age=86400'}})}};
 const live=await handleSiteRequest(request('/config.js'),env,{fetcher:fail});assert.match(live.headers.get('cache-control'),/no-store/);assert.equal(live.headers.has('x-robots-tag'),false);
 const preview=await handleSiteRequest(new Request('https://sarkadi-site.example.workers.dev/config.js'),env,{fetcher:fail});assert.match(preview.headers.get('x-robots-tag'),/noindex/);
 assert.equal((await handleSiteRequest(new Request('https://unrelated.example/'),env,{fetcher:fail})).status,404);
});

test('the enabled same-origin API delegates only to the production backend, without browser credentials',async()=>{
 const id='d3210982-ca12-495b-a919-fe3d24334770';
 const env={LANDING_ENABLED:'true',CALLBACK_SECRET:'a'.repeat(64),CALLBACK_WEBHOOK_URL:'https://script.google.com/macros/s/example/exec'};
 const req=new Request(origin+'/eletutak-talalkozasa/api/callback',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({requestId:id,name:'Technical check',phone:'+36700000000',consent:true})});
 const res=await handleSiteRequest(req,env,{fetcher:async upstream=>{
  assert.equal(upstream.url,'https://sarkadi-kapcsolat.pages.dev/eletutak-talalkozasa/api/callback');
  assert.equal(upstream.headers.get('origin'),'https://sarkadi-kapcsolat.pages.dev');
  assert.equal(upstream.headers.has('cookie'),false);assert.equal(upstream.headers.has('authorization'),false);
  assert.equal((await upstream.json()).requestId,id);
  return Response.json({ok:true,requestId:id});
 }});
 assert.deepEqual(await res.json(),{ok:true,requestId:id});
});

test('the callback gateway rejects foreign origins and non-JSON upstream responses',async()=>{
 const env={LANDING_ENABLED:'true'};
 const rejected=await handleSiteRequest(new Request(origin+'/eletutak-talalkozasa/api/callback',{headers:{Origin:'https://foreign.example'}}),env,{fetcher:fail});
 assert.equal(rejected.status,403);
 const notApi=await handleSiteRequest(request('/eletutak-talalkozasa/api/callback'),env,{fetcher:async()=>new Response('<html>not API</html>',{headers:{'Content-Type':'text/html'}})});
 assert.equal(notApi.status,502);assert.equal((await notApi.json()).ok,false);
});
