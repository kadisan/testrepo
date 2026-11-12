import {test,expect} from '@playwright/test';
for(const width of [360,768,1440])test(`Tai Chi landing fits at ${width}px`,async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));const failures=[];page.on('response',r=>{if(r.status()>=400)failures.push(r.url())});
 await page.setViewportSize({width,height:950});await page.goto('/tai-chi/');await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('h1')).toContainText('TAI CHI');await expect(page.locator('#tudnivalok')).toContainText('10:00–11:30');await expect(page.locator("#tudnivalok")).toContainText("1 000 Ft");await expect(page.locator(".pass")).toHaveCount(6);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 expect(errors).toEqual([]);expect(failures).toEqual([]);
 await page.screenshot({path:`/tmp/taichi-${width}.png`,fullPage:true});
});
test('homepage Tai Chi door leads to the landing',async({page})=>{await page.goto('/');await page.locator('.door[href="/tai-chi/"]').click();await expect(page).toHaveURL(/\/tai-chi\/$/);await expect(page.locator('h1')).toContainText('TAI CHI')});
