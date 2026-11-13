import {test,expect} from '@playwright/test';

// The parked locales retain the existing Google handoff. Hungarian conversion
// behavior is exercised separately in conversion.spec.js.
const paths={en:'/eletutak-talalkozasa/en/',de:'/eletutak-talalkozasa/de/',it:'/eletutak-talalkozasa/it/'};
for(const [lang,path] of Object.entries(paths))for(const width of [390,1440])test(`${lang} parked landing renders at ${width}px`,async({page})=>{
 const errors=[],failures=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`)});
 await page.setViewportSize({width,height:950});await page.goto(path);await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('html')).toHaveAttribute('lang',lang);
 await expect(page.locator('h1')).toBeVisible();
 await expect(page.locator('.lp-trip')).toHaveCount(3);await expect(page.locator('.lp-price-card')).toHaveCount(4);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(errors).toEqual([]);expect(failures).toEqual([]);
});

test('parked locale package and weekend choices still reach its callback form',async({page})=>{
 await page.goto(paths.en);await page.locator('[data-package=plus]').click();
 await expect(page.locator('#lp-package')).toHaveValue('plus');
 await expect(page.locator('[name=weekend]:checked')).toHaveCount(3);
 await page.locator('[data-trip="1"]').click();
 await expect(page.locator('#lp-package')).toHaveValue('one');
 await expect(page.locator('[name=weekend]:checked')).toHaveCount(1);
 await expect(page.locator('[name=weekend][value="1"]')).toBeChecked();
});

test('switching parked languages preserves campaign attribution and selected package',async({page})=>{
 await page.goto(`${paths.en}?utm_source=meta&pack=plus`);
 await expect(page.locator('#lp-package')).toHaveValue('plus');
 for(const lang of ['de','it','en']){
  await page.locator(`.lp-languages a[lang=${lang}]`).click();
  await expect(page.locator('html')).toHaveAttribute('lang',lang);
  await expect(page).toHaveURL(new RegExp(`eletutak-talalkozasa/${lang}/\\?utm_source=meta&pack=plus`));
  await expect(page.locator('#lp-package')).toHaveValue('plus');
 }
});

test('parked mobile navigation, FAQ and privacy remain operable',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto(paths.en);
 await page.locator('.lp-menu').click();await expect(page.locator('#lp-nav')).toBeVisible();
 await page.locator('#lp-nav a[href="#hetvegek"]').click();await expect(page.locator('#lp-nav')).toBeHidden();
 await page.locator('.lp-faq summary').nth(1).click();await expect(page.locator('.lp-faq details').nth(1)).toHaveAttribute('open','');
 const popup=page.waitForEvent('popup');await page.locator('[data-legal=privacy]').click();
 const privacy=await popup;await expect(privacy).toHaveURL(/eletutak-talalkozasa\/adatkezeles\//);
 await expect(privacy.getByRole('heading',{level:1})).toContainText('Adatkezelési tájékoztató');await privacy.close();
});

async function completeLegacyForm(page){
 await page.locator('[name=name]').fill('Teszt Elek');
 await page.locator('[name=email]').fill('teszt@example.com');
 await page.locator('[name=phone]').fill('+36 30 123 4567');
 await page.locator('[name=call_window]').selectOption('2');
 await page.locator('[name=what_brought_you]').fill('Az év eleji utak érdekelnek.');
 await page.locator('[name=consent]').check();
}

test('a disabled parked form validates but never transmits personal data',async({page})=>{
 const posts=[];page.on('request',r=>{if(r.method()==='POST')posts.push(r.url())});
 await page.goto(paths.en);await page.locator('.lp-submit').click();
 await expect(page.locator('[name=name]')).toHaveAttribute('aria-invalid','true');
 await completeLegacyForm(page);await page.locator('.lp-submit').click();
 await expect(page.locator('#lp-form-status')).not.toHaveText('');expect(posts).toEqual([]);
});

test('a configured parked form hands values to Google without claiming final submission',async({page})=>{
 const entries=Object.fromEntries(['name','email','phone','call_window','last_20km','been_with_us','what_brought_you','silence_view','consent','program'].map((f,i)=>[f,f==='email'?'emailAddress':`entry.${i}`]));
 await page.route('**/config.js',route=>route.fulfill({contentType:'application/javascript',body:`window.SARKADI_CONFIG=${JSON.stringify({formEnabled:true,formAction:'https://docs.google.com/forms/d/e/test-only/formResponse',privacyUrl:'https://example.org/privacy',entries})}`}));
 const posts=[];page.on('request',r=>{if(r.method()==='POST')posts.push(r.url())});
 let handoffUrl='';await page.route(url=>url.origin==='https://docs.google.com'&&url.pathname==='/forms/d/e/test-only/viewform',route=>{
  handoffUrl=route.request().url();return route.fulfill({contentType:'text/html; charset=utf-8',body:'<!doctype html><html lang="hu"><head><meta charset="utf-8"></head><body><h1>Ellenőrzés és végleges beküldés</h1></body></html>'});
 });
 await page.goto(`${paths.de}?utm_source=teszt`);await page.locator('[data-package=plus]').click();await completeLegacyForm(page);await page.locator('.lp-submit').click();
 await expect(page.getByRole('heading',{level:1})).toContainText('Ellenőrzés és végleges beküldés');
 const parsed=new URL(handoffUrl).searchParams;
 expect(parsed.get('emailAddress')).toBe('teszt@example.com');expect(parsed.get(entries.what_brought_you)).toContain('Deutsch');
 expect(parsed.get(entries.program)).toContain('Téli ív Plusz');expect(parsed.get(entries.program)).toContain('2027. március 5–7.');
 expect(parsed.get(entries.name)).toBe('Teszt Elek');expect(handoffUrl).not.toContain('utm_source');expect(posts).toEqual([]);
});

test('parked pages retain their static content without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto(paths.en);
 await expect(page.locator('h1')).toBeVisible();await expect(page.locator('.lp-trip')).toHaveCount(3);await expect(page.locator('.lp-price-card')).toHaveCount(4);await context.close();
});
