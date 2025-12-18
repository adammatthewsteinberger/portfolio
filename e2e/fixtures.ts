import { test as base, Page, expect as baseExpect } from '@playwright/test';

/**
 * Helper to dismiss any modals that may be blocking interaction
 */
export async function dismissModals(page: Page): Promise<void> {
  // Set localStorage to prevent cookie consent from showing on future navigations
  await page.evaluate(() => {
    localStorage.setItem(
      'ga_consent_preferences',
      JSON.stringify({
        analytics: true,
        marketing: true,
        version: 1,
        timestamp: Date.now(),
      })
    );
  });

  // Wait a moment for any modals to appear
  await page.waitForTimeout(500);

  // Try to dismiss cookie consent if visible
  const acceptButton = page.locator('button:has-text("Accept All")');
  if (await acceptButton.isVisible({ timeout: 500 }).catch(() => false)) {
    await acceptButton.click();
    await page.waitForTimeout(300);
  }

  // Try to close content gate modal if visible (by clicking close button)
  const closeButton = page.locator('.modal-close-btn, [aria-label="Close modal"]');
  if (await closeButton.isVisible({ timeout: 500 }).catch(() => false)) {
    await closeButton.click();
    await page.waitForTimeout(300);
  }
}

/**
 * Navigate to a URL and dismiss any modals
 */
export async function gotoAndDismiss(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await dismissModals(page);
}

// Re-export test and expect for convenience
export const test = base;
export const expect = baseExpect;
