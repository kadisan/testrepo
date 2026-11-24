import {test,expect} from '@playwright/test';
const path='/eletutak-talalkozasa/';
async function open(page){
 await page.route('**/eletutak-talalkozasa/api/callback',route=>route.fulfill({json:{enabled:true}}));
 await page.goto(path);await expect(page.locator('.et-submit')).toBeEnabled();await page.evaluate(()=>document.fonts.ready);
}

test('package photographs appear on hover and keyboard focus without selecting an offer',async({page})=>{
 await open(page);
 const sources=await page.locator('.et-trip img').evaluateAll(images=>images.map(i=>new URL(i.src).pathname));
 for(const [id,index] of [['one',0],['two',0],['series',1],['plus',2]]){
  const card=page.locator(`#et-csomag-${id}`),layer=card.locator('.et-season-images');
  await page.mouse.move(1,1);await page.locator('.et-hero h1').focus();
  await expect(layer).toHaveCSS('opacity','0');await card.hover();await expect(layer).toHaveCSS('opacity','0.42');
  const images=await layer.locator('[data-et-season]').evaluateAll(parts=>parts.map(e=>getComputedStyle(e).backgroundImage));
  expect(images).toHaveLength(1);expect(images[0]).toContain(sources[index]);
  await expect(card).not.toHaveClass(/is-selected/);await expect(page.locator('.et-selection')).toBeHidden();
  // A bound using a completely white photograph covers every real photo pixel.
  const contrast=await card.evaluate(e=>{
   const color=s=>s.match(/[\d.]+/g).slice(0,3).map(Number),layer=e.querySelector('.et-season-images');
   const alpha=Number(getComputedStyle(layer).opacity),brightness=Number(getComputedStyle(layer).filter.match(/brightness\(([\d.]+)\)/)[1]);
   const background=color(getComputedStyle(e).backgroundColor).map(x=>x*(1-alpha)+255*brightness*alpha);
   const foreground=color(getComputedStyle(e.querySelector('h3')).color);
   const l=c=>c.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
   return (Math.max(l(background),l(foreground))+.05)/(Math.min(l(background),l(foreground))+.05);
  });
  expect(contrast).toBeGreaterThanOrEqual(4.5);
  await page.mouse.move(1,1);await card.locator('[data-et-package]').focus();await expect(layer).toHaveCSS('opacity','0.42');
  await expect(card).not.toHaveClass(/is-selected/);
 }
});

test('each dated enquiry uses only its own photograph on every package, including after clearing',async({page})=>{
 await open(page);
 const sources=await page.locator('.et-trip img').evaluateAll(images=>images.map(i=>new URL(i.src).pathname));
 for(const index of [0,1,2]){
  await page.locator(`[data-et-weekend="${index}"]`).click();
  for(const id of ['one','two','series','plus']){
   const image=page.locator(`[data-et-season-package="${id}"] [data-et-season]`);
   await expect(image).toHaveCount(1);await expect(image).toHaveAttribute('data-et-season',String(index));
   expect(await image.evaluate(e=>getComputedStyle(e).backgroundImage)).toContain(sources[index]);
  }
  await page.locator('#et-clear-selection').click();
  for(const [id,initial] of [['one',0],['two',0],['series',1],['plus',2]]){
   const image=page.locator(`[data-et-season-package="${id}"] [data-et-season]`);
   await expect(image).toHaveCount(1);await expect(image).toHaveAttribute('data-et-season',String(initial));
  }
 }
 await page.locator('[data-et-package=series]').click();
 await expect(page.locator('[data-et-season-package=series] [data-et-season]')).toHaveCount(1);
 await expect(page.locator('#et-selection-text')).toContainText('Három hétvége');
});

test('section titles reveal imagery without moving and reduced motion stays still',async({page})=>{
 await open(page);
 const intro=page.locator('.et-intro'),introTitle=page.locator('#et-intro-title');
 await introTitle.scrollIntoViewIfNeeded();await page.mouse.move(1,1);
 await expect.poll(()=>intro.evaluate(e=>getComputedStyle(e,'::before').opacity)).toBe('0.25');
 const introBox=await introTitle.boundingBox();await introTitle.hover();
 await expect.poll(()=>intro.evaluate(e=>getComputedStyle(e,'::before').opacity)).toBe('0.3');
 expect(await introTitle.boundingBox()).toEqual(introBox);
 const voices=page.locator('.et-testimonials'),voicesTitle=page.locator('#et-testimonials-title');
 await voices.evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await page.mouse.move(-10,-10);
 await expect.poll(()=>voices.evaluate(e=>getComputedStyle(e,'::before').opacity)).toBe('0');
 const voicesBox=await voicesTitle.boundingBox(),quoteBox=await voices.locator('.et-quote').first().boundingBox();
 await page.mouse.move(quoteBox.x+20,quoteBox.y+20);
 await expect.poll(()=>voices.evaluate(e=>getComputedStyle(e,'::before').opacity)).toBe('0.18');
 expect(await voicesTitle.boundingBox()).toEqual(voicesBox);
 await page.mouse.move(-10,-10);
 await expect.poll(()=>voices.evaluate(e=>getComputedStyle(e,'::before').opacity)).toBe('0');
 for(const id of ['et-weekends-title','et-practice-title','et-guide-title','et-prices-title','et-stay-title','et-faq-title','et-contact-title']){
  const title=page.locator(`#${id}`),panel=title.locator('xpath=ancestor::*[contains(concat(" ",normalize-space(@class)," ")," et-scene-heading ")][1]');
  await title.scrollIntoViewIfNeeded();await page.mouse.move(1,1);
  const before=await title.boundingBox();await title.hover();
  await expect.poll(()=>panel.evaluate(e=>getComputedStyle(e,'::after').opacity)).toBe('0.16');
  expect(await title.boundingBox()).toEqual(before);
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('.et-hero h1').hover();
 await expect(page.locator('.et-hero-forest')).toHaveCSS('transform','none');
 await expect(page.locator('.et-hero-forest')).toHaveCSS('transition-duration','0s');
});
