import {test, expect} from '@playwright/test';

async function openPage(page, path) {
  await page.route('**/eletutak-talalkozasa/api/callback', route =>
    route.fulfill({json: {enabled: false}}));
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
}

for (const path of ['/', '/tai-chi/', '/eletutak-talalkozasa/']) {
  for (const width of [320, 390]) {
    test(`200% text stays readable without horizontal scrolling: ${path} ${width}px`, async ({page}) => {
      await page.setViewportSize({width, height: 844});
      await openPage(page, path);
      const size = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
      await page.addStyleTag({content: `html {font-size:${size * 2}px!important}`});
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise(resolve => requestAnimationFrame(resolve));
      });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const content = path === '/' ? '.ck-list' : path === '/tai-chi/' ? '.quick-facts' : '.et-price-feature';
      const box = await page.locator(content).boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      const menu = page.getByRole('button', {name: 'Menü', exact: true});
      await menu.click();
      await expect(page.getByRole('navigation')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('navigation')).toBeHidden();
    });
  }
}

for (const path of ['/', '/tai-chi/', '/eletutak-talalkozasa/']) {
  for (const [width, height] of [[320, 568], [390, 667]]) {
    test(`first action fits a short phone: ${path} ${width}x${height}`, async ({page}) => {
      await page.setViewportSize({width, height});
      await openPage(page, path);
      const button = page.locator(path === '/' ? '.hp-actions .button' : path === '/tai-chi/' ? '.hero-taichi .button' : '.et-hero-actions .et-button');
      const box = await button.boundingBox();
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(height);
      await button.click();
      await expect(page).toHaveURL(path === '/' ? /#utak$/ : /#kapcsolat$/);
    });
  }
}

test('the four home gates open the intended pages and Életutak returns to the choices', async ({page}) => {
  await openPage(page, '/');
  const gates = page.locator('.path-gates .door');
  await expect(gates).toHaveCount(4);
  for (const [key, href] of Object.entries({taichi: '/tai-chi/', eletutak: '/eletutak-talalkozasa/', zarandoklat: 'https://zarandoklat.com', erdo: 'https://fakbolcsessege.com'})) {
    await expect(page.locator(`[data-path=${key}]`)).toHaveAttribute('href', href);
  }
  await page.locator('[data-path=eletutak]').click();
  await expect(page.locator('h1')).toContainText('Önismereti hétvége');
  await expect(page.locator('#callback-form [required]')).toHaveCount(3);
  await page.getByRole('link', {name: 'A négy lehetőség'}).click();
  await expect(page).toHaveURL(/\/#utak$/);
  await expect(page.locator('.path-gates .door')).toHaveCount(4);
});
