import {test,expect} from '@playwright/test';
const id='419467115532734',key='sarkadi_marketing_consent_v1';
const sdk='https://connect.facebook.net/en_US/fbevents.js';
const mockSdk=`window.__metaCalls=[];const old=window.fbq?.queue||[];window.fbq=(...a)=>window.__metaCalls.push(a);old.forEach(a=>window.fbq(...a));document.cookie='_fbp=TEST_ONLY;path=/;SameSite=Lax';`;
async function setup(page){
 const requests=[];page.on('request',r=>{if(/facebook\.(net|com)/.test(r.url()))requests.push(r.url())});
 await page.route('**/config.js',route=>route.fulfill({contentType:'application/javascript',body:`window.SARKADI_CONFIG={formEnabled:false,metaPixelEnabled:true,metaPixelId:'${id}'};`}));
 await page.route(sdk,route=>route.fulfill({contentType:'application/javascript',body:mockSdk}));
 return requests;
}
const calls=page=>page.evaluate(()=>window.__metaCalls||[]);
test('no Meta resource is requested before a choice or after refusal, including after reload',async({page})=>{
 const requests=await setup(page);await page.goto('/eletutak-talalkozasa/');
 await expect(page.locator('#lp-marketing-consent')).toBeVisible();expect(requests).toEqual([]);
 await page.getByRole('button',{name:'Nem engedélyezem',exact:true}).click();
 await expect(page.locator('#lp-marketing-consent')).toBeHidden();
 await page.reload();await expect(page.locator('.lp-marketing-settings')).toBeVisible();await expect(page.locator('#lp-marketing-consent')).toBeHidden();
 expect(requests).toEqual([]);expect(await calls(page)).toEqual([]);
});
test('permission loads the provided pixel once and records only PageView without form values',async({page})=>{
 const requests=await setup(page);await page.goto('/eletutak-talalkozasa/');
 await page.getByRole('button',{name:'Engedélyezem',exact:true}).click();
 await expect.poll(async()=>JSON.stringify(await calls(page))).toContain('PageView');
 const events=await calls(page);
 expect(events).toContainEqual(['set','autoConfig',false,id]);expect(events).toContainEqual(['init',id]);
 expect(events.filter(e=>e[0]==='track')).toEqual([['track','PageView']]);expect(requests).toEqual([sdk]);
 await page.locator('[name=email]').fill('private@example.com');await page.locator('[name=what_brought_you]').fill('Private message that must not reach Meta');
 await page.locator('.lp-marketing-settings').click();await page.getByRole('button',{name:'Engedélyezem',exact:true}).click();
 expect((await calls(page)).filter(e=>e[0]==='track')).toEqual([['track','PageView']]);
 expect(JSON.stringify(await calls(page))).not.toContain('private@example.com');expect(JSON.stringify(await calls(page))).not.toContain('Private message');
});
test('withdrawal revokes permission and removes accessible Meta cookies',async({page,context})=>{
 await setup(page);await page.goto('/eletutak-talalkozasa/');await page.getByRole('button',{name:'Engedélyezem',exact:true}).click();
 await expect.poll(async()=>JSON.stringify(await calls(page))).toContain('PageView');
 expect((await context.cookies()).some(c=>c.name==='_fbp')).toBe(true);
 await page.locator('.lp-marketing-settings').click();await page.getByRole('button',{name:'Nem engedélyezem',exact:true}).click();
 expect(await calls(page)).toContainEqual(['consent','revoke']);expect((await context.cookies()).some(c=>['_fbp','_fbc'].includes(c.name))).toBe(false);
});
test('withdrawal while the SDK downloads never queues a page view',async({page})=>{
 await setup(page);let release;const ready=new Promise(resolve=>{release=resolve});
 await page.route(sdk,async route=>{await ready;await route.fulfill({contentType:'application/javascript',body:mockSdk})});
 await page.goto('/eletutak-talalkozasa/');await page.getByRole('button',{name:'Engedélyezem',exact:true}).click();
 await page.locator('.lp-marketing-settings').click();await page.getByRole('button',{name:'Nem engedélyezem',exact:true}).click();
 release();await expect.poll(async()=>JSON.stringify(await calls(page))).toContain('revoke');
 expect((await calls(page)).filter(e=>['init','track'].includes(e[0]))).toEqual([]);
});
test('a choice older than 180 days asks again without loading Meta',async({page})=>{
 const requests=await setup(page);await page.addInitScript(({key})=>localStorage.setItem(key,JSON.stringify({version:1,choice:'granted',at:Date.now()-181*86400000})),{key});
 await page.goto('/eletutak-talalkozasa/');await expect(page.locator('#lp-marketing-consent')).toBeVisible();expect(requests).toEqual([]);
});
test('withdrawing in another tab also stops the already-open tab',async({page,context})=>{
 await setup(page);await page.goto('/eletutak-talalkozasa/');await page.getByRole('button',{name:'Engedélyezem',exact:true}).click();
 await expect.poll(async()=>JSON.stringify(await calls(page))).toContain('PageView');
 const other=await context.newPage();await setup(other);await other.goto('/eletutak-talalkozasa/');
 await expect.poll(async()=>JSON.stringify(await calls(other))).toContain('PageView');
 await other.locator('.lp-marketing-settings').click();await other.getByRole('button',{name:'Nem engedélyezem',exact:true}).click();
 await expect.poll(async()=>JSON.stringify(await calls(page))).toContain('revoke');await other.close();
});
for(const [width,zoom] of [[320,false],[390,true]])test(`the choice remains readable and operable at ${width}px, enlarged=${zoom}`,async({page})=>{
 await setup(page);await page.setViewportSize({width,height:850});await page.goto('/eletutak-talalkozasa/');if(zoom)await page.addStyleTag({content:'html{font-size:200%}'});
 const panel=page.locator('#lp-marketing-consent');await expect(panel).toBeVisible();
 const bounds=await panel.boundingBox();expect(bounds.x).toBeGreaterThanOrEqual(0);expect(bounds.x+bounds.width).toBeLessThanOrEqual(width+1);
 expect(await panel.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
 await page.getByRole('button',{name:'Nem engedélyezem',exact:true}).click();await expect(panel).toBeHidden();
});
