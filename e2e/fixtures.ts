import { test as base, Page, expect as baseExpect } from '@playwright/test';

/**
 * Helper to dismiss any modals that may be blocking interaction.
 */
export async function dismissModals(page: Page): Promise<void> {
  // Seed a valid, already-consented ConsentState (see useConsent.ts) so the
  // cookie banner doesn't show on future navigations in this test.
  await page.evaluate(() => {
    localStorage.setItem(
      'ga_consent_preferences',
      JSON.stringify({
        version: 1,
        timestamp: new Date().toISOString(),
        consent: {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          functionality_storage: 'granted',
          personalization_storage: 'granted',
          security_storage: 'granted',
        },
      })
    );
  });

  const acceptButton = page.locator('button:has-text("Accept All")');
  if (await acceptButton.isVisible({ timeout: 500 }).catch(() => false)) {
    await acceptButton.click();
    await page.waitForTimeout(300);
  }
}

/**
 * Navigate to a URL and dismiss any modals.
 */
export async function gotoAndDismiss(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await dismissModals(page);
}

export const test = base;
export const expect = baseExpect;
