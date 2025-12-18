import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConsent } from '../useConsent';

describe('useConsent', () => {
  const CONSENT_STORAGE_KEY = 'ga_consent_preferences';

  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    vi.clearAllMocks();
    // Mock gtag
    window.gtag = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('shows banner when no consent is saved', () => {
      const { result } = renderHook(() => useConsent());
      expect(result.current.showBanner).toBe(true);
    });

    it('starts with default denied consent', () => {
      const { result } = renderHook(() => useConsent());
      expect(result.current.consent.ad_storage).toBe('denied');
      expect(result.current.consent.analytics_storage).toBe('denied');
      expect(result.current.consent.functionality_storage).toBe('granted');
      expect(result.current.consent.security_storage).toBe('granted');
    });

    it('hasConsented is false initially', () => {
      const { result } = renderHook(() => useConsent());
      expect(result.current.hasConsented).toBe(false);
    });
  });

  describe('saved consent', () => {
    it('loads saved consent from localStorage', () => {
      const savedConsent = {
        version: 1,
        consent: {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          functionality_storage: 'granted',
          personalization_storage: 'granted',
          security_storage: 'granted',
        },
      };
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(savedConsent));

      const { result } = renderHook(() => useConsent());

      expect(result.current.showBanner).toBe(false);
      expect(result.current.hasConsented).toBe(true);
      expect(result.current.consent.ad_storage).toBe('granted');
    });

    it('shows banner if version mismatch', () => {
      const savedConsent = {
        version: 0, // Old version
        consent: {
          ad_storage: 'granted',
          analytics_storage: 'granted',
        },
      };
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(savedConsent));

      const { result } = renderHook(() => useConsent());

      expect(result.current.showBanner).toBe(true);
      expect(result.current.hasConsented).toBe(false);
    });

    it('handles invalid JSON gracefully', () => {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, 'invalid-json');

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { result } = renderHook(() => useConsent());

      expect(result.current.showBanner).toBe(true);
      expect(result.current.hasConsented).toBe(false);
      consoleSpy.mockRestore();
    });
  });

  describe('acceptAll', () => {
    it('sets all consent to granted', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.acceptAll();
      });

      expect(result.current.consent.ad_storage).toBe('granted');
      expect(result.current.consent.analytics_storage).toBe('granted');
      expect(result.current.consent.ad_user_data).toBe('granted');
      expect(result.current.consent.ad_personalization).toBe('granted');
      expect(result.current.consent.personalization_storage).toBe('granted');
    });

    it('hides banner after accepting', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.acceptAll();
      });

      expect(result.current.showBanner).toBe(false);
      expect(result.current.hasConsented).toBe(true);
    });

    it('saves to localStorage', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.acceptAll();
      });

      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      expect(saved).not.toBeNull();
      const parsed = JSON.parse(saved!);
      expect(parsed.consent.ad_storage).toBe('granted');
    });

    it('calls gtag to update consent', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.acceptAll();
      });

      expect(window.gtag).toHaveBeenCalledWith('consent', 'update', expect.objectContaining({
        ad_storage: 'granted',
        analytics_storage: 'granted',
      }));
    });
  });

  describe('rejectAll', () => {
    it('keeps non-essential consent as denied', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.rejectAll();
      });

      expect(result.current.consent.ad_storage).toBe('denied');
      expect(result.current.consent.analytics_storage).toBe('denied');
      expect(result.current.consent.ad_user_data).toBe('denied');
      expect(result.current.consent.ad_personalization).toBe('denied');
      expect(result.current.consent.personalization_storage).toBe('denied');
    });

    it('keeps essential consent as granted', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.rejectAll();
      });

      expect(result.current.consent.functionality_storage).toBe('granted');
      expect(result.current.consent.security_storage).toBe('granted');
    });

    it('hides banner after rejecting', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.rejectAll();
      });

      expect(result.current.showBanner).toBe(false);
      expect(result.current.hasConsented).toBe(true);
    });
  });

  describe('updatePreferences', () => {
    it('updates specific preferences', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.updatePreferences({
          analytics_storage: 'granted',
        });
      });

      expect(result.current.consent.analytics_storage).toBe('granted');
      expect(result.current.consent.ad_storage).toBe('denied'); // Unchanged
    });

    it('saves preferences to localStorage', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.updatePreferences({
          analytics_storage: 'granted',
        });
      });

      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      expect(saved).not.toBeNull();
    });
  });

  describe('resetConsent', () => {
    it('removes consent from localStorage', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.acceptAll();
      });
      expect(localStorage.getItem(CONSENT_STORAGE_KEY)).not.toBeNull();

      act(() => {
        result.current.resetConsent();
      });
      expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
    });

    it('shows banner again', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.acceptAll();
      });
      expect(result.current.showBanner).toBe(false);

      act(() => {
        result.current.resetConsent();
      });
      expect(result.current.showBanner).toBe(true);
      expect(result.current.hasConsented).toBe(false);
    });

    it('resets to default denied state', () => {
      const { result } = renderHook(() => useConsent());

      act(() => {
        result.current.acceptAll();
      });
      expect(result.current.consent.ad_storage).toBe('granted');

      act(() => {
        result.current.resetConsent();
      });
      expect(result.current.consent.ad_storage).toBe('denied');
      expect(result.current.consent.analytics_storage).toBe('denied');
    });
  });
});
