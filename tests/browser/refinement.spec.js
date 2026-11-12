import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.clock.setFixedTime(new Date('2026-11-12T12:00:00Z'));
});

for (const width of [320,390,768,1440]) {
  test(`home choices are early and the first action fits at ${width}px`, async ({page}) => {
    test.setTimeout(45000);
    await page.setViewportSize({width,height:844});
    await page.goto('/'); await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const box = await page.locator('.hp-actions .button').boundingBox();
    expect(box.y + box.height).toBeLessThanOrEqual(844);
    expect(await page.locator('main>section').nth(1).getAttribute('id')).toBe('utak');
    await expect(page.locator('#rolam')).toContainText('A Tai Chi számomra életmód');
    await page.locator('.hp-actions .button').click();
    await expect(page.locator('#utak')).toBeInViewport();
  });
}

test('Tai Chi shows the practical facts immediately and asks only class-related questions', async ({page}) => {
  await page.setViewportSize({width:390,height:844}); await page.goto('/tai-chi/');
  await expect(page.locator('.quick-facts')).toBeInViewport();
  await expect(page.locator('.quick-facts')).toContainText('10:00–11:30');
  await expect(page.locator('.quick-facts')).toContainText('1 000 Ft');
  await expect(page.locator('form [name=last_20km],form [name=call_window],form [name=silence_view]')).toHaveCount(0);
  await page.locator('[name=class_date]').fill('2026-11-19');
  await page.locator('.submit-button').click();
  await expect(page.locator('[name=class_date]')).toHaveAttribute('aria-invalid','true');
  await expect(page.getByRole('status')).toContainText('szerdán');
});

test('a class handoff contains the chosen Wednesday and never reports an unconfirmed submission', async ({page}) => {
  await page.route('**/config.js', async route => {
    const response = await route.fetch();
    await route.fulfill({response, body:(await response.text()).replace('formEnabled: false','formEnabled: true')});
  });
  let target;
  await page.route('https://docs.google.com/**', async route => {
    target = route.request().url();
    await route.fulfill({contentType:'text/html; charset=utf-8',body:'<h1>Helyben elfogott Google-átadás</h1>'});
  });
  await page.goto('/tai-chi/');
  await page.locator('[name=class_date]').fill('2026-11-18');
  await page.locator('[name=name]').fill('Próba');
  await page.locator('[name=email]').fill('proba@example.com');
  await page.locator('[name=phone]').fill('+36300000000');
  await page.locator('[name=consent]').check();
  await page.locator('.submit-button').click();
  await expect(page.getByRole('heading')).toHaveText('Helyben elfogott Google-átadás');
  const url = new URL(target);
  expect(url.pathname).toContain('/viewform');
  expect(url.searchParams.get('entry.441268117')).toContain('Tai Chi — 2026. november 18.');
  expect(url.searchParams.get('entry.2099660283')).toContain('Tai Chi-órával kapcsolatos egyeztetést');
  expect(url.searchParams.has('entry.985865425')).toBe(false);
});

test('the demo class form sends nothing and explains the unsubmitted state', async ({page}) => {
  const external=[];
  page.on('request', request => {if(request.url().includes('docs.google.com'))external.push(request.url())});
  await page.goto('/tai-chi/');
  await page.locator('[name=name]').fill('Próba');
  await page.locator('[name=email]').fill('proba@example.com');
  await page.locator('[name=phone]').fill('+36300000000');
  await page.locator('[name=consent]').check();
  await page.locator('.submit-button').click();
  await expect(page.getByRole('status')).toContainText('nem küldtük el');
  expect(external).toEqual([]);
});

for (const path of ['/', '/tai-chi/']) {
  test(`enlarged text reflows and the menu still works on ${path}`, async ({page}) => {
    await page.setViewportSize({width:390,height:844});
    await page.goto(path); await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({content:'html {font-size:40px !important}'});
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise(resolve => requestAnimationFrame(resolve));
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await page.getByRole('button',{name:'Menü'}).click();
    await expect(page.getByRole('navigation')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('navigation')).toBeHidden();
    await page.locator('.submit-button').focus();
    await expect(page.locator('.submit-button')).toBeFocused();
  });
}
