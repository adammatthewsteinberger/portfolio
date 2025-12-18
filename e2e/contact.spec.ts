import { test, expect, gotoAndDismiss } from './fixtures';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await gotoAndDismiss(page, '/contact');
  });

  test('contact page loads correctly', async ({ page }) => {
    await expect(page.locator('h1, h2, h3').filter({ hasText: /contact/i })).toBeVisible();
  });

  test('contact form is present', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
  });

  test('form has required fields', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('form fields can be filled', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message');

    await expect(page.locator('input[name="name"]')).toHaveValue('John Doe');
    await expect(page.locator('input[name="email"]')).toHaveValue('john@example.com');
    await expect(page.locator('input[name="subject"]')).toHaveValue('Test Subject');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('This is a test message');
  });

  test('submit button is present', async ({ page }) => {
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('form has validation', async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Form should prevent submission with HTML5 validation
    // Check that we're still on the contact page
    await expect(page).toHaveURL('/contact');
  });
});
