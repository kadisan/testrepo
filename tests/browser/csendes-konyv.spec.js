import {test, expect} from '@playwright/test';

// Csendes könyv (B) főoldal: a szerzői és a két agent által rögzített beépítési feltételek.
test('the motto is one heading and the explanatory bridge follows the interlude', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('és az elméd megtanuljon figyelni a lelkedre.');
  const order = await page.evaluate(() => {
    const q = document.querySelector('.ck-quote'), b = document.querySelector('#test-elme-lelek'), img = document.querySelector('.ck-wide-photo');
    return [q.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING, b.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING];
  });
  expect(order.every(Boolean)).toBe(true);
});

test('only the opening uses the ochre action; the closing call is a light outline', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('main .button-accent')).toHaveCount(1);
  await expect(page.locator('.closing-band .button-light')).toHaveCount(1);
  const bg = await page.locator('.closing-band .button').evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg).toBe('rgba(0, 0, 0, 0)');
});

test('no link points to a missing terms page and the portrait has no placeholder label', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('a[href="/aszf/"]')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('Cserélhető portréhely');
  await expect(page.locator('#rolam a[href="/tai-chi/#tanar"]')).toHaveCount(1);
});

test('body text stays at 20 px and helper text at least 18 px', async ({page}) => {
  await page.goto('/');
  const sizes = await page.evaluate(() => ({
    body: parseFloat(getComputedStyle(document.querySelector('#rolam .ck-muted')).fontSize),
    help: Math.min(...[...document.querySelectorAll('.field-help, .ck-small, .ck-credentials')].map(el => parseFloat(getComputedStyle(el).fontSize))),
  }));
  expect(sizes.body).toBeGreaterThanOrEqual(20);
  expect(sizes.help).toBeGreaterThanOrEqual(18);
});
