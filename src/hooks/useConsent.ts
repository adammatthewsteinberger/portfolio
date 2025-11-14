'use client';

import { useEffect, useState } from 'react';

export type ConsentState = {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  security_storage: 'granted' | 'denied';
};

const CONSENT_STORAGE_KEY = 'ga_consent_preferences';
const CONSENT_VERSION = 1;

// Default denied state for GDPR compliance
const defaultConsentState: ConsentState = {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted', // Always granted for site functionality
  personalization_storage: 'denied',
  security_storage: 'granted', // Always granted for security
};

// Accept all consent
const acceptAllConsentState: ConsentState = {
  ad_storage: 'granted',
  analytics_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  functionality_storage: 'granted',
  personalization_storage: 'granted',
  security_storage: 'granted',
};

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(defaultConsentState);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  // Check if user is in EEA (simplified detection)
  const isEEARegion = () => {
    // In production, you might want to use a more sophisticated geo-detection
    // For now, we'll show the banner to everyone to be safe
    return true;
  };

  useEffect(() => {
    // Load saved consent preferences
    const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);

    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.consent);
          setHasConsented(true);
          updateGtagConsent(parsed.consent);
        } else {
          // Version mismatch, show banner again
          setHasConsented(false);
          setShowBanner(isEEARegion());
        }
      } catch (e) {
        console.error('Error parsing consent preferences:', e);
        setHasConsented(false);
        setShowBanner(isEEARegion());
      }
    } else {
      // No saved consent, show banner for EEA users
      setHasConsented(false);
      setShowBanner(isEEARegion());
    }
  }, []);

  const updateGtagConsent = (newConsent: ConsentState) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: newConsent.ad_storage,
        analytics_storage: newConsent.analytics_storage,
        ad_user_data: newConsent.ad_user_data,
        ad_personalization: newConsent.ad_personalization,
        functionality_storage: newConsent.functionality_storage,
        personalization_storage: newConsent.personalization_storage,
        security_storage: newConsent.security_storage,
      });
    }
  };

  const saveConsent = (newConsent: ConsentState) => {
    setConsent(newConsent);
    setHasConsented(true);
    setShowBanner(false);

    // Save to localStorage
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        version: CONSENT_VERSION,
        consent: newConsent,
        timestamp: new Date().toISOString(),
      })
    );

    // Update gtag
    updateGtagConsent(newConsent);
  };

  const acceptAll = () => {
    saveConsent(acceptAllConsentState);
  };

  const rejectAll = () => {
    saveConsent(defaultConsentState);
  };

  const updatePreferences = (preferences: Partial<ConsentState>) => {
    const newConsent = { ...consent, ...preferences };
    saveConsent(newConsent);
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    setConsent(defaultConsentState);
    setHasConsented(false);
    setShowBanner(true);
  };

  return {
    consent,
    hasConsented,
    showBanner,
    acceptAll,
    rejectAll,
    updatePreferences,
    resetConsent,
  };
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}
