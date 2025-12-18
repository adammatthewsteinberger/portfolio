import { test, expect, gotoAndDismiss } from './fixtures';

test.describe('Responsive Design', () => {
  test('homepage is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await gotoAndDismiss(page, '/');

    // Page should load without horizontal scroll issues
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Main content should be visible
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('homepage is responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoAndDismiss(page, '/');

    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('navigation works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await gotoAndDismiss(page, '/');

    // Mobile menu button should be visible (burger menu)
    const burgerButton = page.locator('.bm-burger-button');
    await expect(burgerButton).toBeVisible();

    await burgerButton.click();
    await page.waitForTimeout(500);

    // Menu items should appear
    const menuItems = page.locator('.bm-menu-wrap');
    await expect(menuItems).toBeVisible();
  });

  test('footer is visible on all screen sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await gotoAndDismiss(page, '/');
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('service page is responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await gotoAndDismiss(page, '/services/custom-chatbots');

    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('contact page form is usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await gotoAndDismiss(page, '/contact');

    // Form should be visible and fillable
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
