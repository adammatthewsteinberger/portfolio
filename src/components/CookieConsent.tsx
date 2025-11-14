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
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1050,
        }}
      />

      {/* Cookie Banner */}
      <div
        className="position-fixed bottom-0 start-0 end-0 p-3 p-md-4"
        style={{ zIndex: 1051 }}
      >
        <div className="container">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              {!showDetails ? (
                // Simple View
                <>
                  <h5 className="card-title mb-3">Cookie Consent</h5>
                  <p className="card-text mb-4">
                    We use cookies and similar technologies to improve your experience,
                    analyze site traffic, and personalize content. By clicking
                    &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                    <a href="/privacy" className="text-decoration-none">
                      Learn more in our Privacy Policy
                    </a>
                    .
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={acceptAll}
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={rejectAll}
                    >
                      Reject All
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowDetails(true)}
                    >
                      Customize
                    </button>
                  </div>
                </>
              ) : (
                // Detailed View
                <>
                  <h5 className="card-title mb-3">Cookie Preferences</h5>
                  <p className="card-text mb-4">
                    Manage your cookie preferences below. Some cookies are essential
                    for the site to function and cannot be disabled.
                  </p>

                  <div className="mb-4">
                    {/* Essential Cookies */}
                    <div className="form-check mb-3 p-3 bg-light rounded">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="essentialCookies"
                        checked
                        disabled
                      />
                      <label
                        className="form-check-label w-100"
                        htmlFor="essentialCookies"
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <strong>Essential Cookies</strong>
                            <p className="mb-0 small text-muted">
                              Required for the website to function properly. These
                              cannot be disabled.
                            </p>
                          </div>
                          <span className="badge bg-success ms-2">Always Active</span>
                        </div>
                      </label>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="form-check mb-3 p-3 border rounded">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="analyticsCookies"
                        checked={analyticsConsent}
                        onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      />
                      <label
                        className="form-check-label w-100"
                        htmlFor="analyticsCookies"
                      >
                        <strong>Analytics Cookies</strong>
                        <p className="mb-0 small text-muted">
                          Help us understand how visitors interact with our website
                          by collecting and reporting information anonymously.
                        </p>
                      </label>
                    </div>

                    {/* Advertising Cookies */}
                    <div className="form-check mb-3 p-3 border rounded">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="adCookies"
                        checked={adsConsent}
                        onChange={(e) => setAdsConsent(e.target.checked)}
                      />
                      <label className="form-check-label w-100" htmlFor="adCookies">
                        <strong>Advertising Cookies</strong>
                        <p className="mb-0 small text-muted">
                          Used to deliver personalized advertisements and measure
                          advertising campaign effectiveness.
                        </p>
                      </label>
                    </div>

                    {/* Personalization Cookies */}
                    <div className="form-check mb-3 p-3 border rounded">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="personalizationCookies"
                        checked={personalizationConsent}
                        onChange={(e) =>
                          setPersonalizationConsent(e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label w-100"
                        htmlFor="personalizationCookies"
                      >
                        <strong>Personalization Cookies</strong>
                        <p className="mb-0 small text-muted">
                          Remember your preferences and settings to provide a more
                          personalized experience.
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCustomize}
                    >
                      Save Preferences
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={acceptAll}
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
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
