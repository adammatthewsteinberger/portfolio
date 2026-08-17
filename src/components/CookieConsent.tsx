'use client';

import { useConsent } from '@/hooks/useConsent';
import { useState } from 'react';

export default function CookieConsent() {
  const { showBanner, acceptAll, rejectAll, updatePreferences } = useConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [adsConsent, setAdsConsent] = useState(false);
  const [personalizationConsent, setPersonalizationConsent] = useState(false);

  if (!showBanner) return null;

  const handleCustomize = () => {
    updatePreferences({
      analytics_storage: analyticsConsent ? 'granted' : 'denied',
      ad_storage: adsConsent ? 'granted' : 'denied',
      ad_user_data: adsConsent ? 'granted' : 'denied',
      ad_personalization: adsConsent ? 'granted' : 'denied',
      personalization_storage: personalizationConsent ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
  };

  return (
    <>
      {/* Bottom sheet — no full-screen backdrop; the rest of the page stays usable. */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-[1051] pointer-events-none">
        <div className="container mx-auto max-w-4xl pointer-events-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl shadow-2xl">
            <div className="p-6">
              {!showDetails ? (
                // Simple View
                <>
                  <h5 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Cookie Consent</h5>
                  <p className="text-[var(--color-text-muted)] mb-4">
                    We use cookies and similar technologies to improve your experience,
                    analyze site traffic, and personalize content. By clicking
                    &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                    <a href="/privacy" className="text-[var(--color-accent-blue)] hover:underline">
                      Learn more in our Privacy Policy
                    </a>
                    .
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-6 py-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-white font-medium rounded-lg transition-colors"
                      onClick={acceptAll}
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-[var(--color-dark-card-alt)] hover:bg-[var(--color-dark-border)] text-[var(--color-text-primary)] font-medium rounded-lg transition-colors"
                      onClick={rejectAll}
                    >
                      Essential Only
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 border border-[var(--color-dark-border)] hover:bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] font-medium rounded-lg transition-colors"
                      onClick={() => setShowDetails(true)}
                    >
                      Customize
                    </button>
                  </div>
                </>
              ) : (
                // Detailed View
                <>
                  <h5 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Cookie Preferences</h5>
                  <p className="text-[var(--color-text-muted)] mb-4">
                    Manage your cookie preferences below. Some cookies are essential
                    for the site to function and cannot be disabled.
                  </p>

                  <div className="mb-6 space-y-3">
                    {/* Essential Cookies */}
                    <div className="p-4 bg-[var(--color-dark-bg)] rounded-lg">
                      <label className="flex items-start gap-3 cursor-not-allowed">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 accent-[var(--color-accent-green)]"
                          checked
                          disabled
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <strong className="text-[var(--color-text-primary)]">Essential Cookies</strong>
                            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)] rounded">Always Active</span>
                          </div>
                          <p className="text-sm text-[var(--color-text-muted)] mt-1">
                            Required for the website to function properly. These
                            cannot be disabled.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="p-4 border border-[var(--color-dark-border)] rounded-lg">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 accent-[var(--color-accent-blue)]"
                          checked={analyticsConsent}
                          onChange={(e) => setAnalyticsConsent(e.target.checked)}
                        />
                        <div className="flex-1">
                          <strong className="text-[var(--color-text-primary)]">Analytics Cookies</strong>
                          <p className="text-sm text-[var(--color-text-muted)] mt-1">
                            Help us understand how visitors interact with our website
                            by collecting and reporting information anonymously.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Advertising Cookies */}
                    <div className="p-4 border border-[var(--color-dark-border)] rounded-lg">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 accent-[var(--color-accent-blue)]"
                          checked={adsConsent}
                          onChange={(e) => setAdsConsent(e.target.checked)}
                        />
                        <div className="flex-1">
                          <strong className="text-[var(--color-text-primary)]">Advertising Cookies</strong>
                          <p className="text-sm text-[var(--color-text-muted)] mt-1">
                            Used to deliver personalized advertisements and measure
                            advertising campaign effectiveness.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Personalization Cookies */}
                    <div className="p-4 border border-[var(--color-dark-border)] rounded-lg">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 accent-[var(--color-accent-blue)]"
                          checked={personalizationConsent}
                          onChange={(e) => setPersonalizationConsent(e.target.checked)}
                        />
                        <div className="flex-1">
                          <strong className="text-[var(--color-text-primary)]">Personalization Cookies</strong>
                          <p className="text-sm text-[var(--color-text-muted)] mt-1">
                            Remember your preferences and settings to provide a more
                            personalized experience.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-6 py-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-white font-medium rounded-lg transition-colors"
                      onClick={handleCustomize}
                    >
                      Save Preferences
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-[var(--color-dark-card-alt)] hover:bg-[var(--color-dark-border)] text-[var(--color-text-primary)] font-medium rounded-lg transition-colors"
                      onClick={acceptAll}
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 border border-[var(--color-dark-border)] hover:bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] font-medium rounded-lg transition-colors"
                      onClick={() => setShowDetails(false)}
                    >
                      Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
