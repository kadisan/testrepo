import {test, expect} from '@playwright/test';

const path='/eletutak-talalkozasa/';
async function fits(page) {
  const overflow=await page.evaluate(()=>({
    viewport: innerWidth,
    page: document.documentElement.scrollWidth,
    elements:[...document.querySelectorAll('main *,.lp-header *')]
      .filter(el=>{const r=el.getBoundingClientRect();return r.width&&r.height&&(r.right>innerWidth+1||r.left< -1)})
      .slice(0,8).map(el=>`${el.tagName}.${el.className}`)
  }));
  expect(overflow.page,JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport);
  expect(overflow.elements).toEqual([]);
}

for(const width of [320,390,768,1024,1440])test(`readable layout reflows at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:950});
  await page.goto(path);await page.evaluate(()=>document.fonts.ready);
  await fits(page);
  await expect(page.locator('.lp-hero-facts a')).toHaveCount(3);
  for(const link of await page.locator('.lp-hero-facts a').all()){
    const href=await link.getAttribute('href');await expect(page.locator(href)).toHaveCount(1);
  }
});

for(const width of [390,1280])test(`text enlarged to 200% remains usable at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:950});await page.goto(path);
  await page.addStyleTag({content:'html { font-size: 200%; }'});
  await page.evaluate(()=>document.fonts.ready);await fits(page);
  const menu=page.getByRole('button',{name:'Menü'}), collapsed=await menu.isVisible();
  if(collapsed)await menu.click();
  await expect(page.locator('#lp-nav')).toBeVisible();
  await page.getByRole('navigation').getByRole('link',{name:'A hétvégék',exact:true}).click();
  if(collapsed)await expect(page.locator('#lp-nav')).toBeHidden();
  await page.locator('[data-trip="2"]').click();
  await expect(page.locator('[name=weekend][value="2"]')).toBeChecked();
  await expect(page.locator('.lp-submit')).toBeVisible();
});

test('important text and form help are large enough without browser zoom',async({page})=>{
  await page.setViewportSize({width:390,height:950});await page.goto(path);
  const minimum=async selector=>page.locator(selector).evaluateAll(nodes=>Math.min(...nodes.map(n=>parseFloat(getComputedStyle(n).fontSize))));
  expect(await minimum('.lp-trip time,.lp-trip-body>p,.lp-price-card li,.lp-contact input:not([type=checkbox]),.lp-contact textarea,.lp-btn')).toBeGreaterThanOrEqual(20);
  expect(await minimum('.lp-field-help,.lp-form-note,.lp-consent,.lp-trip-days')).toBeGreaterThanOrEqual(18);
  await page.locator('.lp-hero-facts a').last().focus();
  await expect(page.locator('.lp-hero-facts a').last()).toBeFocused();
});

test('extra text spacing does not hide content or create horizontal scrolling',async({page})=>{
  await page.setViewportSize({width:390,height:950});await page.goto(path);
  await page.addStyleTag({content:'.lp-body * { line-height:1.5 !important; letter-spacing:.12em !important; word-spacing:.16em !important; } .lp-body p { margin-bottom:2em !important; }'});
  await fits(page);
});
