import test from 'node:test';
import assert from 'node:assert/strict';
import {copy,dates,packageIds,packagePrices,languagePath} from '../src/landing/content.js';
import {renderDocument} from '../src/landing/render.js';
import {enquiryValues} from '../src/landing/form.js';
import {payloadFor,fields} from '../src/form.js';
import {conversionOffer} from '../src/landing/conversion-content.js';
test('parked locales retain their content while every page has independent language URLs and static metadata',()=>{
 const keys=Object.keys(copy.hu).sort();
 for(const lang of ['hu','en','de','it']){
  assert.deepEqual(Object.keys(copy[lang]).sort(),keys);
  assert.equal(copy[lang].tripDates.length,3);assert.equal(copy[lang].priceNames.length,4);assert.equal(copy[lang].faq.length,6);
  const html=renderDocument(lang);
  assert.match(html,new RegExp(`<html lang="${lang}">`));if(lang!=='hu')assert.ok(html.includes(copy[lang].hero[0]));
  assert.ok(html.includes(`https://sarkadisandor.hu${languagePath(lang)}`));
  for(const other of ['hu','en','de','it']) assert.ok(html.includes(`hreflang="${other}"`));
  assert.ok(html.includes('noindex,nofollow'));
 }
});
test('the approved weekends begin on Friday and parked locales retain their historical prices',()=>{
 assert.deepEqual(dates,['2027-01-08','2027-02-12','2027-03-05']);
 for(const date of dates) assert.equal(new Date(`${date}T12:00:00Z`).getUTCDay(),5);
 assert.deepEqual(packagePrices,[60000,100000,160000,200000]);
});
test('Hungarian landing presents the confirmed offer without stale prices, with author-supplied pilgrimage testimonials',()=>{
 const html=renderDocument('hu').replace(/\u00a0|\u202f/g,' ');
 assert.match(html,/Önismereti hétvégék/);
 assert.match(html,/Tai Chi/);assert.match(html,/erdei jelenlét/);
 for(const amount of ['60 000','100 000','160 000','200 000'])assert.ok(html.includes(amount),`Missing price ${amount}`);
 for(const stale of ['50 000','95 000','139 000','48 000'])assert.ok(!html.includes(stale),`Stale price ${stale}`);
 assert.match(html,/legfeljebb 12|12 fő|12 fős/i);
 assert.match(html,/Ősfenyves Vendégházak/);
 assert.match(html,/2027-01-08/);assert.match(html,/2027-02-12/);assert.match(html,/2027-03-05/);
 assert.match(html,/lombkorona-hatter\.webp/);
 assert.match(html,/marciusi-to\.webp/);
 assert.match(html,/sarkadi-sandor-fatronk-portre\.webp/);
 assert.doesNotMatch(html,/Ide kerül|Lorem ipsum|példa-visszajelzés/i);
 assert.equal((html.match(/<blockquote>/g)||[]).length,3);
 assert.match(html,/Korábbi zarándokutak résztvevőinek/);
 const voices=[...html.matchAll(/<figure class="et-quote[^\"]*">([\s\S]*?)<\/figure>/g)].map(match=>match[1]);
 for(const quote of conversionOffer.testimonials){
  const voice=voices.find(figure=>figure.includes(`<figcaption>${quote.name}</figcaption>`));
  assert.ok(voice,`Missing attribution for ${quote.name}`);
  const words=quote.text.replaceAll('„','»').replaceAll('”','«');
  assert.ok(voice.replace(/<[^>]+>/g,'').includes(`„${words}”`),`Quote must stay paired with ${quote.name}`);
 }
 assert.match(html,/egy órán belül/i);assert.match(html,/9[–—-]19/);
});
test('the November brief keeps comparison prices distinct from payable prices and recommends only the complete package',()=>{
 const html=renderDocument('hu').replace(/\u00a0|\u202f/g,' ');
 assert.ok(html.includes(`<h1 id="et-title">${conversionOffer.title}</h1>`));
 assert.ok(html.includes(conversionOffer.introduction));
 assert.match(html,/<del>120 000 Ft<\/del>/);
 assert.match(html,/<del>180 000 Ft<\/del>/);
 assert.doesNotMatch(html,/20 000 Ft kedvezmény/);
 assert.equal((html.match(/Ha a hétvégék után is szeretnél kísérést\./g)||[]).length,1);
 assert.ok(html.includes(conversionOffer.gift));
 assert.match(html,/images\/logo\/fejlec-logo-sotetzold\.webp/);
 assert.equal((html.match(/<details>/g)||[]).length,conversionOffer.faq.length);
 const staticEnquiries=[...html.matchAll(/<a\b[^>]*\bdata-et-enquiry\b[^>]*>/g)];
 assert.ok(staticEnquiries.length>=10);
 assert.ok(staticEnquiries.every(([tag])=>tag.includes('href="tel:+36703161897"')));
 assert.doesNotMatch(html,/visszaszámláló|szabad helyek:|jelentkezési határidő:/i);
});
test('the Hungarian callback asks only for the agreed required data and offers direct contact without JavaScript',()=>{
 const html=renderDocument('hu');
 const form=html.match(/<form\b[^>]*>[\s\S]*?<\/form>/)?.[0];
 assert.ok(form,'Callback form is rendered in static HTML');
 const inputs=[...form.matchAll(/<(?:input|textarea|select)\b[^>]*>/g)].map(m=>m[0]);
 const required=inputs.filter(tag=>/\brequired(?:\s|>|=)/.test(tag)).map(tag=>tag.match(/name="([^"]+)"/)?.[1]).sort();
 assert.deepEqual(required,['consent','name','phone']);
 assert.ok(inputs.some(tag=>/name="reason"/.test(tag)&&!tag.includes('required')));
 assert.ok(inputs.every(tag=>!/(?:name="email"|name="call_window")/.test(tag)));
 assert.match(html,/href="tel:\+36703161897"/);
 assert.match(html,/href="mailto:kadisan@gmail\.com"/);
 assert.match(html,/href="\/eletutak-talalkozasa\/adatkezeles\//);
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
