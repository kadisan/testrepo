import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {fields,isConfigured,validPhone,validEmail,payloadFor,prefilledFormUrl} from '../src/form.js';
const config={formEnabled:true,formAction:'https://docs.google.com/forms/d/e/example/formResponse',privacyUrl:'https://example.hu/adatvedelem',entries:Object.fromEntries(fields.map((f,i)=>[f,f==='email'?'emailAddress':`entry.${i+1}`]))};
test('submission requires activation, privacy policy and all ten distinct current mappings',()=>{
 assert.equal(isConfigured({}),false);assert.equal(isConfigured(config),true);assert.equal(isConfigured({...config,formEnabled:false}),false);
 assert.equal(isConfigured({...config,privacyUrl:'/eletutak-talalkozasa/adatkezeles/'}),true);assert.equal(isConfigured({...config,privacyUrl:'//example.org/privacy'}),false);assert.equal(isConfigured({...config,privacyUrl:''}),false);
 assert.equal(isConfigured({...config,formAction:'https://evil.example/forms/d/e/example/formResponse'}),false);
 assert.equal(isConfigured({...config,entries:{...config.entries,program:''}}),false);
 assert.equal(isConfigured({...config,entries:{...config.entries,program:config.entries.name}}),false);
});
test('phone validation accepts international and domestic formats and rejects non-phone values',()=>{for(const phone of ['+36 30 123 4567','06 (30) 123-4567'])assert.equal(validPhone(phone),true);for(const phone of ['abc123456789','123','+1234567890123456',''])assert.equal(validPhone(phone),false)});
test('the owner-renamed question receives the program instead of campaign data, and the deleted question is omitted',()=>{
 const context={window:{}};runInNewContext(readFileSync(new URL('../public/config.js',import.meta.url),'utf8'),context);
 const actual=context.window.SARKADI_CONFIG;
 const payload=payloadFor(actual,{name:'PRÓBA',email:'kadisan@gmail.com',phone:'+36 70 316 1897',call_window:'Hétköznap 16–19',program:'Életutak találkozása – 2027. március 5–7.'},'https://example.hu/?utm_source=teszt');
 assert.equal(actual.formEnabled,false);assert.equal(payload.get('emailAddress'),'kadisan@gmail.com');assert.equal(payload.size,10);
 assert.equal(payload.get('entry.441268117'),'Életutak találkozása – 2027. március 5–7.');
 assert.equal(payload.has('entry.1598759546'),false);assert.ok(!payload.toString().includes('utm_source'));
});
test('the main-page enquiry can fill the required program question without inventing a selection',()=>{
 const payload=payloadFor(config,{name:'Árvíztűrő Tükörfúrógép',email:'teszt@example.com',phone:'+36 30 123 4567',call_window:'Hétköznap késő délután (16–19)',what_brought_you:'Még nem döntöttem, melyik út érdekel.'});
 assert.equal(payload.size,10);assert.equal(payload.get(config.entries.name),'Árvíztűrő Tükörfúrógép');assert.equal(payload.get(config.entries.call_window),'Hétköznap késő délután (16–19)');
 assert.equal(payload.get(config.entries.program),'Még nem döntöttem, melyik út érdekel.');assert.match(payload.get(config.entries.consent),/Hozzájárulok/);
});

test('email validation catches incomplete and invalid contact addresses',()=>{for(const email of ['kadisan@gmail.com','name+callback@example.hu'])assert.equal(validEmail(email),true);for(const email of ['','name','name@','two addresses@example.hu','name@example.hu\nother@example.hu'])assert.equal(validEmail(email),false)});
test('the handoff preserves accented text and selections, and final submission stays on the Google form',()=>{
 const values={name:'Árvíztűrő Tükörfúrógép',email:'teszt+proba@example.hu',phone:'+36 70 123 4567',call_window:'Hétköznap 16–19',what_brought_you:'Kérdésem van: táv & időpont?',program:'Életutak találkozása\n2027. március 5–7.'};
 const url=new URL(prefilledFormUrl(config,values,'hu'));
 assert.equal(url.origin,'https://docs.google.com');assert.equal(url.pathname,'/forms/d/e/example/viewform');assert.equal(url.searchParams.get('usp'),'pp_url');assert.equal(url.searchParams.get('hl'),'hu');
 for(const [key,value]of Object.entries(values))assert.equal(url.searchParams.get(config.entries[key]),value);
 assert.match(url.searchParams.get(config.entries.consent),/Hozzájárulok/);
 assert.throws(()=>prefilledFormUrl({...config,formEnabled:false},values));
 assert.throws(()=>prefilledFormUrl({...config,formAction:'https://example.org/formResponse'},values));
});
