import { test, expect, gotoAndDismiss } from './fixtures';

test.describe('Articles (Novice to Navigator)', () => {
  test('article index page loads', async ({ page }) => {
    await gotoAndDismiss(page, '/novice-to-navigator');
    await expect(page).toHaveURL('/novice-to-navigator');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('article sections are displayed', async ({ page }) => {
    await gotoAndDismiss(page, '/novice-to-navigator');
    // Verify article sections exist
    await expect(page.getByText(/Understanding the Basics of AI/i)).toBeVisible();
  });

  test('first article loads correctly', async ({ page }) => {
    await gotoAndDismiss(page, '/novice-to-navigator/what-is-ai-really');
    await expect(page).toHaveURL('/novice-to-navigator/what-is-ai-really');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('second article loads correctly', async ({ page }) => {
    await gotoAndDismiss(
      page,
      '/novice-to-navigator/whats-the-difference-between-ai-machine-learning-and-deep-learning'
    );
    await expect(page).toHaveURL(
      '/novice-to-navigator/whats-the-difference-between-ai-machine-learning-and-deep-learning'
    );
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
