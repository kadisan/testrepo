import {test,expect} from '@playwright/test';

function contrastOnWatermark(background,opacity) {
  const rgb=background.match(/[\d.]+/g).slice(0,3).map(Number);
  const linear=rgb.map(c=>{
    const value=(c*(1-opacity)+255*opacity)/255;
    return value<=.04045?value/12.92:((value+.055)/1.055)**2.4;
  });
  return 1.05/(linear[0]*.2126+linear[1]*.7152+linear[2]*.0722+.05);
}

test('each gate highlights in its own green and stays readable over its centered symbol',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('/');
  const gates=page.locator('.path-gates .door');
  const backgrounds=[];
  for(let n=0;n<4;n++){
    const gate=gates.nth(n),mark=gate.locator('.line-icon');
    const restingOpacity=Number(await mark.evaluate(el=>getComputedStyle(el).opacity));
    await gate.hover();
    await expect(gate).toHaveCSS('color','rgb(255, 255, 255)');
    await expect.poll(()=>mark.evaluate(el=>Number(getComputedStyle(el).opacity))).toBeGreaterThan(restingOpacity);
    const styles=await gate.evaluate(el=>({background:getComputedStyle(el).backgroundColor,opacity:Number(getComputedStyle(el.querySelector('.line-icon')).opacity)}));
    backgrounds.push(styles.background);
    expect(contrastOnWatermark(styles.background,styles.opacity)).toBeGreaterThanOrEqual(4.5);
    for(const selector of ['h3','p','.door-link'])await expect(gate.locator(selector)).toHaveCSS('color','rgb(255, 255, 255)');
    const card=await gate.boundingBox(),symbol=await mark.boundingBox();
    expect(Math.abs(card.x+card.width/2-symbol.x-symbol.width/2)).toBeLessThan(1);
    expect(Math.abs(card.y+card.height/2-symbol.y-symbol.height/2)).toBeLessThan(1);
  }
  expect(new Set(backgrounds).size).toBe(4);
});

test('keyboard users get the same highlight and can enter the chosen path',async({page})=>{
  await page.goto('/');
  await page.keyboard.press('Tab');
  const gates=page.locator('.path-gates .door');
  for(let n=0;n<4;n++){
    const gate=gates.nth(n);
    await gate.focus();
    expect(await gate.evaluate(el=>el.matches(':focus-visible'))).toBe(true);
    await expect(gate).toHaveCSS('color','rgb(255, 255, 255)');
    await expect(gate).toHaveCSS('outline-style','solid');
  }
  await gates.first().focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/tai-chi\/$/);
  await expect(page.locator('h1')).toContainText('TAI CHI');
});

test('reduced motion keeps the highlight without moving the gate',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const gate=page.locator('.path-gates .door').first();
  await gate.hover();
  await expect(gate).toHaveCSS('color','rgb(255, 255, 255)');
  await expect(gate).toHaveCSS('transition-duration','0s');
  await expect(gate).toHaveCSS('transform','none');
});

test('a touch user can open a gate with a single tap',async({browser,baseURL})=>{
  const context=await browser.newContext({baseURL,viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  try{
    const page=await context.newPage();
    await page.goto('/');
    const gate=page.locator('.path-gates .door').first();
    await expect(gate).not.toHaveCSS('color','rgb(255, 255, 255)');
    await gate.tap();
    await expect(page).toHaveURL(/\/tai-chi\/$/);
    await expect(page.locator('h1')).toContainText('TAI CHI');
  }finally{await context.close();}
});
