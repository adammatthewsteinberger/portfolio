import { test, expect, gotoAndDismiss } from './fixtures';

test.describe('Services Pages', () => {
  test('services index page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/services');
    await expect(page).toHaveURL('/services');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('custom chatbots service page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/services/custom-chatbots');
    await expect(page).toHaveURL('/services/custom-chatbots');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('llm development service page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/services/llm-development');
    await expect(page).toHaveURL('/services/llm-development');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('rag development service page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/services/rag-development');
    await expect(page).toHaveURL('/services/rag-development');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('ai consulting service page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/services/ai-consulting');
    await expect(page).toHaveURL('/services/ai-consulting');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('location-based service page loads (Greenville)', async ({ page }) => {
    await gotoAndDismiss(page, '/services/ai-greenville');
    await expect(page).toHaveURL('/services/ai-greenville');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('service pages have CTA sections', async ({ page }) => {
    await gotoAndDismiss(page, '/services/custom-chatbots');
    // Check for call to action elements
    const ctaLinks = page.locator('a[href*="tidycal"]');
    await expect(ctaLinks.first()).toBeVisible();
  });
});
