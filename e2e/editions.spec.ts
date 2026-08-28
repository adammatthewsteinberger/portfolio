import { test, expect, gotoAndDismiss } from './fixtures';

// vibey-gh #134: the engineering site is the default and never promotes the
// exec edition above the fold; the exec edition always links back.
test.describe('Editions', () => {
  test('the engineering header never links to the executive edition', async ({ page }) => {
    await gotoAndDismiss(page, '/');
    await expect(page.locator('header a[href^="/for-executives"], nav a[href^="/for-executives"]')).toHaveCount(0);
  });

  test('the executive edition loads, leads with a problem, and links back to the engineering site', async ({ page }) => {
    await gotoAndDismiss(page, '/for-executives');
    await expect(page).toHaveURL('/for-executives');
    await expect(page.locator('h1').first()).toContainText(/stalling on security, data, and handoff/i);
    await expect(page.locator('a[href="/"]').first()).toBeVisible();
  });

  test('an exec case study mirrors its engineering case study', async ({ page }) => {
    await gotoAndDismiss(page, '/for-executives/work/ai-governance-gateway');
    await expect(page.locator('a[href="/work/ai-governance-gateway"]').first()).toBeVisible();
  });

  test('the engagement page is the only home of the booking link outside /services', async ({ page }) => {
    await gotoAndDismiss(page, '/for-executives/engage');
    await expect(page.locator('a[href*="tidycal"]').first()).toBeVisible();
    await gotoAndDismiss(page, '/contact');
    await expect(page.locator('a[href*="tidycal"]')).toHaveCount(0);
  });
});
