import {test,expect} from '@playwright/test';

const path='/eletutak-talalkozasa/';
const endpoint='**/eletutak-talalkozasa/api/callback';

// Every request is intercepted. These tests never create real callback records.
async function callbackApi(page,{enabled=true,post}={}){
 const submissions=[];
 await page.route('**/config.js',route=>route.fulfill({contentType:'application/javascript',body:'window.SARKADI_CONFIG={callbackEnabled:true,metaPixelEnabled:false,callbackEndpoint:"/eletutak-talalkozasa/api/callback"};'}));
 await page.route(endpoint,async route=>{
  if(route.request().method()==='GET')return route.fulfill({json:{enabled}});
  const payload=route.request().postDataJSON();submissions.push(payload);
  if(post)return post(route,payload,submissions.length);
  return route.fulfill({json:{ok:true,requestId:payload.requestId}});
 });
 await page.addInitScript(()=>{window.__confirmedCallbacks=[];window.addEventListener('sarkadi:callback-confirmed',event=>window.__confirmedCallbacks.push(event.detail));});
 return submissions;
}
async function fillCallback(page,{reason=''}={}){
 await page.locator('[name=name]').fill('Teszt Elek');
 await page.locator('[name=phone]').fill('+36 30 123 4567');
 if(reason)await page.locator('[name=reason]').fill(reason);
 await page.locator('[name=consent]').check();
}

for(const width of [360,390,768,1440])test(`Hungarian conversion landing fits ${width}px with its complete offer`,async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await callbackApi(page);await page.setViewportSize({width,height:950});await page.goto(path);await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByRole('heading',{level:1})).toContainText('Önismereti hétvége');
 await expect(page.locator('.et-trip')).toHaveCount(3);
 await expect(page.locator('[data-et-package]')).toHaveCount(4);
 await expect(page.locator('.et-main-price')).toContainText(/60\s*000/);
 for(const amount of ['100','160','200'])await expect(page.locator('.et-package-price').filter({hasText:amount})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('.et-submit')).toBeEnabled();expect(errors).toEqual([]);
});

test('the mobile hero offers a visible first step without scrolling',async({page})=>{
 await callbackApi(page);await page.setViewportSize({width:390,height:844});await page.goto(path);await page.evaluate(()=>document.fonts.ready);
 const button=page.locator('.et-hero .et-button');await expect(button).toBeVisible();
 const bounds=await button.boundingBox();expect(bounds.y).toBeGreaterThanOrEqual(0);expect(bounds.y+bounds.height).toBeLessThanOrEqual(844);
});

test('only name, phone and consent are required; a reason and email are not needed',async({page})=>{
 const submissions=await callbackApi(page);await page.goto(path);await expect(page.locator('.et-submit')).toBeEnabled();
 await page.locator('.et-submit').click();
 await expect(page.locator('[name=name]')).toHaveAttribute('aria-invalid','true');
 expect(submissions).toEqual([]);
 await page.locator('[name=name]').fill('Teszt Elek');await page.locator('[name=phone]').fill('rossz szám');await page.locator('[name=consent]').check();
 await page.locator('.et-submit').click();await expect(page.locator('[name=phone]')).toHaveAttribute('aria-invalid','true');expect(submissions).toEqual([]);
 await page.locator('[name=phone]').fill('+36 30 123 4567');await page.locator('[name=consent]').uncheck();
 await page.locator('.et-submit').click();await expect(page.locator('[name=consent]')).toHaveAttribute('aria-invalid','true');expect(submissions).toEqual([]);
 await page.locator('[name=consent]').check();await page.locator('.et-submit').click();
 await expect.poll(()=>submissions.length).toBe(1);
 expect(submissions[0]).toMatchObject({name:'Teszt Elek',phone:'+36 30 123 4567',reason:'',consent:true});
 expect(submissions[0]).not.toHaveProperty('email');
 await expect.poll(()=>page.evaluate(()=>window.__confirmedCallbacks.length)).toBe(1);
 await expect(page.locator('[name=name]')).toHaveValue('');await expect(page.locator('[name=phone]')).toHaveValue('');
 await expect(page).toHaveURL(new RegExp(`${path}$`));
});

test('package and date choices are carried to the request and can be cleared',async({page})=>{
 const submissions=await callbackApi(page);await page.goto(path);
 await page.locator('[data-et-package=plus]').click();await expect(page.locator('.et-selection')).toBeVisible();
 await expect(page.locator('#et-selection-text')).toContainText('Télből tavaszba');
 await page.locator('[data-et-weekend="1"]').click();await expect(page.locator('#et-selection-text')).toContainText('február 12–14.');
 await page.locator('#et-clear-selection').click();await expect(page.locator('.et-selection')).toBeHidden();
 await page.locator('[data-et-package=plus]').click();await fillCallback(page,{reason:'A márciusi hétvége érdekel.'});
 await expect(page.locator('.et-submit')).toBeEnabled();await page.locator('.et-submit').click();
 await expect.poll(()=>submissions.length).toBe(1);
 expect(submissions[0]).toMatchObject({package:'plus',weekends:[0,1,2],reason:'A márciusi hétvége érdekel.'});
});

test('an unconfigured receiver keeps online submission disabled and shows direct contact',async({page})=>{
 const submissions=await callbackApi(page,{enabled:false});await page.goto(path);
 await expect(page.locator('.et-submit')).toBeDisabled();await expect(page.locator('#et-form-availability')).toBeVisible();
 await expect(page.locator('#et-form-availability a[href="tel:+36703161897"]')).toBeVisible();
 await expect(page.locator('#et-form-availability a[href="mailto:kadisan@gmail.com"]')).toBeVisible();
 await fillCallback(page);expect(submissions).toEqual([]);
});

test('static HTML returned in place of readiness never enables callback submission',async({page})=>{
 await callbackApi(page);await page.unroute(endpoint);
 await page.route(endpoint,route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html><body>Static fallback</body></html>'}));
 await page.goto(path);await expect(page.locator('.et-submit')).toBeDisabled();await expect(page.locator('#et-form-availability')).toBeVisible();
});

test('an ambiguous success response preserves input and retries the same request identifier',async({page})=>{
 const submissions=await callbackApi(page,{post:(route,payload,attempt)=>route.fulfill({json:attempt===1?{ok:true,requestId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'}:{ok:true,requestId:payload.requestId}})});
 await page.goto(path);await fillCallback(page,{reason:'Szeretnék megállni egy hétvégére.'});await expect(page.locator('.et-submit')).toBeEnabled();
 await page.locator('.et-submit').click();await expect(page.locator('#et-form-status')).not.toHaveText('');
 await expect(page.locator('[name=name]')).toHaveValue('Teszt Elek');await expect(page.locator('[name=reason]')).toHaveValue('Szeretnék megállni egy hétvégére.');
 expect(await page.evaluate(()=>window.__confirmedCallbacks)).toEqual([]);
 await page.locator('.et-submit').click();await expect.poll(()=>submissions.length).toBe(2);
 expect(submissions[0].requestId).toBe(submissions[1].requestId);
 await expect.poll(()=>page.evaluate(()=>window.__confirmedCallbacks.length)).toBe(1);
 expect(await page.evaluate(()=>window.__confirmedCallbacks)).toEqual([{requestId:submissions[1].requestId}]);
});

test('a server failure preserves the request and never emits a confirmed lead',async({page})=>{
 await callbackApi(page,{post:route=>route.fulfill({status:503,json:{ok:false,error:'unavailable'}})});
 await page.goto(path);await fillCallback(page);await expect(page.locator('.et-submit')).toBeEnabled();await page.locator('.et-submit').click();
 await expect(page.locator('#et-form-status')).not.toHaveText('');await expect(page.locator('[name=phone]')).toHaveValue('+36 30 123 4567');
 expect(await page.evaluate(()=>window.__confirmedCallbacks)).toEqual([]);
});

test('mobile menu, FAQ and privacy links remain accessible',async({page})=>{
 await callbackApi(page);await page.setViewportSize({width:390,height:844});await page.goto(path);
 await page.getByRole('button',{name:/Menü/}).click();await expect(page.locator('#et-nav')).toBeVisible();
 await page.locator('#et-nav a[href="#hetvegek"]').click();await expect(page.locator('#et-nav')).toBeHidden();
 const detail=page.locator('.et-faq details').first();await detail.locator('summary').click();await expect(detail).toHaveAttribute('open','');
 const popup=page.waitForEvent('popup');await page.locator('.et-consent a').click();const privacy=await popup;
 await expect(privacy).toHaveURL(/eletutak-talalkozasa\/adatkezeles\//);await expect(privacy.getByRole('heading',{level:1})).toContainText('Adatkezelési tájékoztató');await privacy.close();
});

test('photos open at full size and support next, previous, Escape and return focus',async({page})=>{
 await callbackApi(page);await page.goto(path);
 const opener=page.locator('.et-trip [data-et-photo]').first();await opener.click();
 const viewer=page.locator('#et-photo-dialog');await expect(viewer).toBeVisible();
 const original=await page.locator('#et-photo-full').getAttribute('src');
 await expect(page.locator('#et-photo-counter')).toHaveText('1 / 6');
 await page.locator('[data-photo-next]').click();
 await expect(page.locator('#et-photo-full')).toHaveAttribute('src',/erdei-gyokerek-hq\.webp$/);
 await page.keyboard.press('ArrowLeft');await expect(page.locator('#et-photo-full')).toHaveAttribute('src',original);
 await page.keyboard.press('Escape');await expect(viewer).not.toBeVisible();await expect(opener).toBeFocused();
});

test('clicking an offer surface selects it while a photo click only opens its viewer',async({page})=>{
 await callbackApi(page);await page.goto(path);
 await page.locator('.et-package').filter({has:page.locator('[data-et-package=series]')}).locator('h3').click();
 await expect(page.locator('#et-selection-text')).toContainText('Három hétvége');
 await expect(page.locator('[data-et-package=series]')).toHaveAttribute('aria-pressed','true');
 await page.locator('.et-trip').first().locator('[data-et-photo]').click();
 await expect(page.locator('#et-photo-dialog')).toBeVisible();
 await expect(page.locator('#et-selection-text')).toContainText('Három hétvége');
});

test('the complete offer and direct contact remain available without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto(path);
 await expect(page.getByRole('heading',{level:1})).toContainText('Önismereti hétvége');await expect(page.locator('.et-trip')).toHaveCount(3);
 await expect(page.locator('.et-main-price')).toContainText(/60\s*000/);await expect(page.locator('.et-submit')).toBeDisabled();
 await expect(page.locator('.et-contact-copy a[href="tel:+36703161897"]')).toBeVisible();await context.close();
});
