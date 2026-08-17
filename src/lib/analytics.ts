'use client';

/**
 * Thin wrapper around GA4's gtag() for custom event tracking.
 * Safe to call before gtag has loaded or when analytics consent is denied —
 * it just no-ops. Window.gtag itself is declared in useConsent.ts.
 *
 * This module is marked 'use client' and every call site is inside a client
 * component's event handler or effect, so `window` is always defined by the
 * time it runs — there's no SSR code path to guard against here.
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
