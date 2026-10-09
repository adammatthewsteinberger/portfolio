import { test, expect, gotoAndDismiss } from './fixtures';

test.describe('Essays', () => {
  test('the index lists essays and links to one', async ({ page }) => {
    await gotoAndDismiss(page, '/essays');
    await expect(page.locator('h1').first()).toHaveText('Essays');
    await expect(page.getByRole('link', { name: /Welcome to The Autistic Apologist/ })).toBeVisible();
  });

  test('an essay opens from the index', async ({ page }) => {
    await gotoAndDismiss(page, '/essays');
    await page.getByRole('link', { name: /Welcome to The Autistic Apologist/ }).click();
    await expect(page).toHaveURL('/essays/welcome');
    await expect(page.locator('h1').first()).toHaveText('Welcome to The Autistic Apologist');
  });

  test('is reachable from the Writing hub', async ({ page }) => {
    await gotoAndDismiss(page, '/writing');
    await page.getByRole('link', { name: /^Essays/ }).click();
    await expect(page).toHaveURL('/essays');
  });

  test('the feed is served as XML', async ({ request }) => {
    const response = await request.get('/essays/feed.xml');
    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain('<rss version="2.0"');
  });
});
