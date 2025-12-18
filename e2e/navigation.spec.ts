import { test, expect, gotoAndDismiss } from './fixtures';

test.describe('Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await gotoAndDismiss(page, '/');
    await expect(page).toHaveTitle(/Adam Matthew Steinberger/);
    await expect(page.locator('h1').first()).toContainText('Adam Matthew Steinberger');
  });

  test('about page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/about');
    await expect(page).toHaveURL('/about');
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

  test('projects page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/projects');
    await expect(page).toHaveURL('/projects');
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
    await expect(footer.locator('a[href="/services"]')).toBeVisible();
    await expect(footer.locator('a[href="/blog"]')).toBeVisible();
    await expect(footer.locator('a[href="/novice-to-navigator"]')).toBeVisible();
    await expect(footer.locator('a[href="/contact"]')).toBeVisible();
  });

  test('social media links open in new tab', async ({ page }) => {
    await gotoAndDismiss(page, '/');
    const linkedinLink = page.locator('a[aria-label="LinkedIn"]');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', /noopener/);
  });
});
