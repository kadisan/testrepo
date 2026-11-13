import test from 'node:test';
import assert from 'node:assert/strict';
import {handleRequest} from '../scripts/domain-worker.mjs';
test('only the landing subtree uses Pages; the existing site keeps its original request',async()=>{
 const original=new Request('https://sarkadisandor.hu/egy-meglevo-oldal/');let forwarded;
 await handleRequest(original,async request=>{forwarded=request;return new Response('existing')});assert.equal(forwarded,original);
 const nearMatch=new Request('https://sarkadisandor.hu/eletutak-talalkozasa-regi/');
 await handleRequest(nearMatch,async request=>{assert.equal(request,nearMatch);return new Response('existing')});
});
test('the landing keeps paths and campaign parameters while stripping private request credentials',async()=>{
 let forwarded;
 const response=await handleRequest(new Request('https://sarkadisandor.hu/eletutak-talalkozasa/?utm_source=hirdetes',{headers:{cookie:'private=1',authorization:'Bearer private'}}),async request=>{forwarded=request;return new Response('<h1>Életutak</h1>',{headers:{'Content-Type':'text/html; charset=utf-8'}})});
 assert.equal(forwarded.url,'https://eletutak-talalkozasa.pages.dev/eletutak-talalkozasa/?utm_source=hirdetes');assert.equal(forwarded.headers.has('cookie'),false);assert.equal(forwarded.headers.has('authorization'),false);assert.equal(response.status,200);assert.match(await response.text(),/Életutak/);
});
test('canonical redirects stay on the own domain and config is never cached',async()=>{
 for(const from of ['http://sarkadisandor.hu/eletutak-talalkozasa/','https://www.sarkadisandor.hu/eletutak-talalkozasa/','https://sarkadisandor.hu/eletutak-talalkozasa']) {
  const result=await handleRequest(new Request(from),()=>{throw new Error('Redirect must not fetch the origin')});assert.equal(result.status,308);assert.equal(result.headers.get('location'),'https://sarkadisandor.hu/eletutak-talalkozasa/');
 }
 const response=await handleRequest(new Request('https://sarkadisandor.hu/eletutak-talalkozasa/config.js'),async()=>new Response('config',{headers:{'Cache-Control':'public, max-age=86400'}}));assert.match(response.headers.get('cache-control'),/no-store/);
});
test('Pages redirects are rewritten and unexpected POST requests never reach the origin',async()=>{
 const redirected=await handleRequest(new Request('https://sarkadisandor.hu/eletutak-talalkozasa/adatkezeles'),async()=>Response.redirect('https://eletutak-talalkozasa.pages.dev/eletutak-talalkozasa/adatkezeles/',308));assert.equal(redirected.headers.get('location'),'https://sarkadisandor.hu/eletutak-talalkozasa/adatkezeles/');
 const rejected=await handleRequest(new Request('https://sarkadisandor.hu/eletutak-talalkozasa/',{method:'POST',body:'not-a-form'}),()=>{throw new Error('A callback is finalized on the Google form')});assert.equal(rejected.status,405);
});
test('the new callback API is handled on the own domain, without forwarding private form data to static Pages',async()=>{
 const fetcher=()=>{throw new Error('An unconfigured API must not call the upstream')};
 const ready=await handleRequest(new Request('https://sarkadisandor.hu/eletutak-talalkozasa/api/callback'),fetcher);
 assert.deepEqual(await ready.json(),{enabled:false});
 const unavailable=await handleRequest(new Request('https://sarkadisandor.hu/eletutak-talalkozasa/api/callback',{
  method:'POST',headers:{'Content-Type':'application/json',Origin:'https://sarkadisandor.hu'},body:'{}',
 }),fetcher);
 assert.equal(unavailable.status,503);
 assert.equal(unavailable.headers.get('cache-control'),'no-store, max-age=0');
});
