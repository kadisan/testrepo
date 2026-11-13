import {test,expect} from '@playwright/test';

const path='/eletutak-talalkozasa/';
async function prepare(page){
 await page.route('**/eletutak-talalkozasa/api/callback',route=>route.fulfill({json:{enabled:false}}));
}
async function fits(page){
 const overflow=await page.evaluate(()=>({
  viewport:innerWidth,page:document.documentElement.scrollWidth,
  elements:[...document.querySelectorAll('main *,.et-header *')]
   .filter(el=>{if(el.closest('.et-honey'))return false;const r=el.getBoundingClientRect();return r.width&&r.height&&(r.right>innerWidth+1||r.left< -1)})
   .slice(0,8).map(el=>`${el.tagName}.${el.className}`)
 }));
 expect(overflow.page,JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport);
 expect(overflow.elements).toEqual([]);
}

for(const width of [320,390,768,1024,1440])test(`Hungarian conversion layout reflows at ${width}px`,async({page})=>{
 await prepare(page);await page.setViewportSize({width,height:950});await page.goto(path);await page.evaluate(()=>document.fonts.ready);await fits(page);
 for(const href of ['#hetvegek','#reszvetel','#kapcsolat'])await expect(page.locator(href)).toHaveCount(1);
});

for(const width of [390,1280])test(`Hungarian conversion text at 200% remains usable at ${width}px`,async({page})=>{
 await prepare(page);await page.setViewportSize({width,height:950});await page.goto(path);
 await page.addStyleTag({content:'html { font-size: 200%; }'});await page.evaluate(()=>document.fonts.ready);await fits(page);
 const menu=page.getByRole('button',{name:/Menü/}),collapsed=await menu.isVisible();if(collapsed)await menu.click();
 await expect(page.locator('#et-nav')).toBeVisible();await page.locator('#et-nav a[href="#hetvegek"]').click();
 if(collapsed)await expect(page.locator('#et-nav')).toBeHidden();
 await page.locator('[data-et-weekend="2"]').click();await expect(page.locator('#et-selection-text')).toContainText('március 5–7.');
 await expect(page.locator('.et-submit')).toBeVisible();
});

test('Hungarian primary text, inputs and controls preserve the large-text baseline',async({page})=>{
 await prepare(page);await page.setViewportSize({width:390,height:950});await page.goto(path);
 const minimum=async selector=>page.locator(selector).evaluateAll(nodes=>Math.min(...nodes.map(n=>parseFloat(getComputedStyle(n).fontSize))));
 expect(await minimum('.et-trip time,.et-trip-copy>p,.et-package li,.et-form input:not([type=checkbox]),.et-form textarea,.et-hero .et-button,.et-guide .et-button,.et-price-feature .et-button,.et-submit')).toBeGreaterThanOrEqual(20);
 expect(await minimum('.et-form small,.et-consent,.et-form-availability')).toBeGreaterThanOrEqual(18);
 await page.locator('.et-hero .et-button').focus();await expect(page.locator('.et-hero .et-button')).toBeFocused();
});

test('extra text spacing preserves content and avoids horizontal scrolling',async({page})=>{
 await prepare(page);await page.setViewportSize({width:390,height:950});await page.goto(path);
 await page.addStyleTag({content:'.et-page * { line-height:1.5 !important; letter-spacing:.12em !important; word-spacing:.16em !important; } .et-page p { margin-bottom:2em !important; }'});await fits(page);
});
