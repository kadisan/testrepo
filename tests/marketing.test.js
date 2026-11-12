import test from 'node:test';
import assert from 'node:assert/strict';
import {marketingChoice,consentKey,consentLifetime,pixelConfigured} from '../src/landing/marketing.js';

test('advertising measurement needs an explicit enabled flag and a valid public pixel ID',()=>{
 assert.equal(pixelConfigured({metaPixelEnabled:true,metaPixelId:'419467115532734'}),true);
 for(const config of [{},{metaPixelEnabled:false,metaPixelId:'419467115532734'},{metaPixelEnabled:true,metaPixelId:'<script>'},{metaPixelEnabled:true}])assert.equal(pixelConfigured(config),false);
});
test('only an unexpired, previously recorded choice is reused',()=>{
 const now=2000000000000;
 const storage=record=>({getItem:key=>{assert.equal(key,consentKey);return JSON.stringify(record)}});
 for(const choice of ['granted','denied'])assert.equal(marketingChoice(storage({version:1,choice,at:now-1000}),now),choice);
 for(const record of [null,{version:1,choice:'granted',at:now-consentLifetime},{version:1,choice:'granted',at:now+1},{version:1,choice:'yes',at:now},{version:0,choice:'granted',at:now}])assert.equal(marketingChoice(storage(record),now),null);
});
test('missing, damaged or blocked browser storage never grants consent',()=>{
 assert.equal(marketingChoice(null),null);
 assert.equal(marketingChoice({getItem:()=>'{broken'}),null);
 assert.equal(marketingChoice({getItem:()=>{throw Error('Blocked')}}),null);
});
