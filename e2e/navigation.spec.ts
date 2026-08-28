import { test, expect, gotoAndDismiss } from './fixtures';

test.describe('Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await gotoAndDismiss(page, '/');
    await expect(page).toHaveTitle(/Adam Matthew Steinberger/);
    await expect(page.locator('h1').first()).toContainText('Adam Matthew Steinberger');
  });

  test('story page loads (and /about redirects to it)', async ({ page }) => {
    await gotoAndDismiss(page, '/about');
    await expect(page).toHaveURL('/story');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('expertise page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/expertise');
    await expect(page).toHaveURL('/expertise');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('hire-me page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/hire-me');
    await expect(page).toHaveURL('/hire-me');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('services page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/services');
    await expect(page).toHaveURL('/services');
  });

  test('blog page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/blog');
    await expect(page).toHaveURL('/blog');
  });

  test('work page loads (and /projects redirects to it)', async ({ page }) => {
    await gotoAndDismiss(page, '/projects');
    await expect(page).toHaveURL('/work');
  });

  test('learn AI page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/novice-to-navigator');
    await expect(page).toHaveURL('/novice-to-navigator');
  });

  test('contact page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/contact');
    await expect(page).toHaveURL('/contact');
  });

  test('footer links are present', async ({ page }) => {
    await gotoAndDismiss(page, '/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('a[href="/hire-me"]')).toBeVisible();
    await expect(footer.locator('a[href="/work"]')).toBeVisible();
    await expect(footer.locator('a[href="/for-executives"]')).toBeVisible();
    await expect(footer.locator('a[href="/services"]')).toHaveCount(0);
  });

  test('social media links open in new tab', async ({ page }) => {
    await gotoAndDismiss(page, '/');
    const linkedinLink = page.locator('a[aria-label="LinkedIn"]');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', /noopener/);
  });
});
