import test from 'node:test';
import assert from 'node:assert/strict';
import {copy,dates,packageIds,packagePrices,languagePath} from '../src/landing/content.js';
import {renderDocument} from '../src/landing/render.js';
import {enquiryValues} from '../src/landing/form.js';
import {payloadFor,fields} from '../src/form.js';
test('all four pages have equivalent content, independent language URLs and correct static metadata',()=>{
 const keys=Object.keys(copy.hu).sort();
 for(const lang of ['hu','en','de','it']){
  assert.deepEqual(Object.keys(copy[lang]).sort(),keys);
  assert.equal(copy[lang].tripDates.length,3);assert.equal(copy[lang].priceNames.length,4);assert.equal(copy[lang].faq.length,6);
  const html=renderDocument(lang);
  assert.match(html,new RegExp(`<html lang="${lang}">`));assert.ok(html.includes(copy[lang].hero[0]));
  assert.ok(html.includes(`https://sarkadisandor.hu${languagePath(lang)}`));
  for(const other of ['hu','en','de','it']) assert.ok(html.includes(`hreflang="${other}"`));
  assert.ok(html.includes('noindex,nofollow'));
 }
});
test('the approved weekends begin on Friday and use the agreed full participation prices',()=>{
 assert.deepEqual(dates,['2027-01-08','2027-02-12','2027-03-05']);
 for(const date of dates) assert.equal(new Date(`${date}T12:00:00Z`).getUTCDay(),5);
 assert.deepEqual(packagePrices,[60000,100000,160000,200000]);
});
test('the chosen woodland layout brings weekends and the guide forward without losing sections',()=>{
 const html=renderDocument('hu');
 const sections=[...html.matchAll(/<section class="lp-section ([^" ]+)/g)].map(m=>m[1]);
 assert.deepEqual(sections,['lp-weekends','lp-about','lp-intro','lp-fit','lp-moments','lp-rhythm','lp-stay','lp-prices','lp-faq','lp-contact']);
 assert.match(html,/napfenyes-erdei-hatter\.webp/);
 assert.doesNotMatch(html,/leveltextura-hero\.webp/);
 assert.match(html,/marciusi-to\.webp/);
 assert.match(html,/sarkadi-sandor-fatronk-portre\.webp/);
 const parked=renderDocument('en');
 assert.doesNotMatch(parked,/lp-hero-woodland/);
});
test('an international enquiry preserves package, selected weekends, language and readable Hungarian callback window',()=>{
 const data=new FormData();Object.entries({name:'  Eva Muster  ',phone:'+49 151 12345678',email:'eva@example.com',package:'plus',call_window:'2',what_brought_you:'Ich möchte mehr erfahren.',consent:'on'}).forEach(([k,v])=>data.set(k,v));data.append('weekend','0');data.append('weekend','2');
 const values=enquiryValues(data,'de');assert.equal(values.name,'Eva Muster');assert.equal(values.email,'eva@example.com');assert.equal(values.call_window,'Hétköznap 16–19');assert.match(values.what_brought_you,/Deutsch/);assert.match(values.what_brought_you,/Télből tavaszba/);assert.match(values.what_brought_you,/2027. január 8–10./);assert.match(values.what_brought_you,/2027. március 5–7./);
 const config={entries:Object.fromEntries(fields.map((f,i)=>[f,`entry.${i}`]))};const payload=payloadFor(config,values);assert.equal(payload.size,10);assert.match(payload.get(config.entries.program),/2027. március 5–7./);assert.match(payload.get(config.entries.program),/Csendes derű útja/);assert.equal(payload.get(config.entries.name),'Eva Muster');
});
test('missing and invalid selections cannot create invented booking details',()=>{
 const data=new FormData();data.set('package','<script>');data.append('weekend','-1');data.append('weekend','8');
 const values=enquiryValues(data,'hu');assert.equal(values.call_window,'');assert.match(values.what_brought_you,/Csomag: Egyeztetendő/);assert.match(values.what_brought_you,/Hétvégék: Egyeztetendő/);assert.ok(!values.what_brought_you.includes('<script>'));
});
