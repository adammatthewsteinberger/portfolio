import { test, expect, gotoAndDismiss } from './fixtures';

// The pages retired with the client-seeking copy (the-vibey-project/vibey#238)
// redirect permanently, so no old link or search result 404s. /hire-me was
// retired with them and has since been restored, so it is served, not redirected.
test.describe('Retired pages redirect', () => {
  test('/hire-me is served, not redirected', async ({ page }) => {
    await gotoAndDismiss(page, '/hire-me');
    await expect(page).toHaveURL('/hire-me');
    await expect(page.locator('h1').first()).toHaveText('Hire Me');
  });

  test('an executive-edition case study lands on the engineering case study', async ({ page }) => {
    await gotoAndDismiss(page, '/for-executives/work/ai-governance-gateway');
    await expect(page).toHaveURL('/work/ai-governance-gateway');
  });

  test('the executive edition and its engagement page land on real pages', async ({ page }) => {
    await gotoAndDismiss(page, '/for-executives');
    await expect(page).toHaveURL('/');
    await gotoAndDismiss(page, '/for-executives/engage');
    await expect(page).toHaveURL('/contact');
  });

  test('a consulting page and its legacy alias land on the homepage', async ({ page }) => {
    await gotoAndDismiss(page, '/services/custom-chatbots');
    await expect(page).toHaveURL('/');
    await gotoAndDismiss(page, '/ai-greenville.html');
    await expect(page).toHaveURL('/');
  });

  test('the header offers Join Me, then Hire Me', async ({ page }) => {
    await gotoAndDismiss(page, '/');
    await expect(page.locator('header a[href="/hire-me"]').first()).toBeAttached();
    await expect(page.locator('a[href="/join-me#developers"]').first()).toBeAttached();
  });
});
