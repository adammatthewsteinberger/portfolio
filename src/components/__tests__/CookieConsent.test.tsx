import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CookieConsent from '../CookieConsent';
import type { ConsentState } from '@/hooks/useConsent';

// Define the return type of useConsent for mocking
type UseConsentReturn = {
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (preferences: Partial<ConsentState>) => void;
  consent: ConsentState;
  hasConsented: boolean | null;
  resetConsent: () => void;
};

// Mock the useConsent hook
vi.mock('@/hooks/useConsent', () => ({
  useConsent: vi.fn(() => ({
    showBanner: true,
    acceptAll: vi.fn(),
    rejectAll: vi.fn(),
    updatePreferences: vi.fn(),
  })),
}));

import { useConsent } from '@/hooks/useConsent';
const mockUseConsent = vi.mocked(useConsent);

// Helper to create properly typed mock return value
const createMockReturn = (overrides: Partial<UseConsentReturn> = {}): UseConsentReturn => ({
  showBanner: true,
  acceptAll: vi.fn() as unknown as () => void,
  rejectAll: vi.fn() as unknown as () => void,
  updatePreferences: vi.fn() as unknown as (preferences: Partial<ConsentState>) => void,
  consent: {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  },
  hasConsented: false,
  resetConsent: vi.fn() as unknown as () => void,
  ...overrides,
});

describe('CookieConsent', () => {
  let mockAcceptAll: ReturnType<typeof vi.fn>;
  let mockRejectAll: ReturnType<typeof vi.fn>;
  let mockUpdatePreferences: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAcceptAll = vi.fn();
    mockRejectAll = vi.fn();
    mockUpdatePreferences = vi.fn();

    mockUseConsent.mockReturnValue(createMockReturn({
      acceptAll: mockAcceptAll as unknown as () => void,
      rejectAll: mockRejectAll as unknown as () => void,
      updatePreferences: mockUpdatePreferences as unknown as (preferences: Partial<ConsentState>) => void,
    }));
  });

  describe('banner visibility', () => {
    it('renders when showBanner is true', () => {
      render(<CookieConsent />);
      expect(screen.getByText('Cookie Consent')).toBeInTheDocument();
    });

    it('does not render when showBanner is false', () => {
      mockUseConsent.mockReturnValue(createMockReturn({
        showBanner: false,
        acceptAll: mockAcceptAll as unknown as () => void,
        rejectAll: mockRejectAll as unknown as () => void,
        updatePreferences: mockUpdatePreferences as unknown as (preferences: Partial<ConsentState>) => void,
        hasConsented: true,
      }));

      render(<CookieConsent />);
      expect(screen.queryByText('Cookie Consent')).not.toBeInTheDocument();
    });
  });

  describe('simple view', () => {
    it('displays consent message', () => {
      render(<CookieConsent />);
      expect(
        screen.getByText(/we use cookies and similar technologies/i)
      ).toBeInTheDocument();
    });

    it('displays Accept All button', () => {
      render(<CookieConsent />);
      expect(screen.getByRole('button', { name: 'Accept All' })).toBeInTheDocument();
    });

    it('displays Essential Only button', () => {
      render(<CookieConsent />);
      expect(screen.getByRole('button', { name: 'Essential Only' })).toBeInTheDocument();
    });

    it('displays Customize button', () => {
      render(<CookieConsent />);
      expect(screen.getByRole('button', { name: 'Customize' })).toBeInTheDocument();
    });

    it('has link to privacy policy', () => {
      render(<CookieConsent />);
      expect(
        screen.getByRole('link', { name: /privacy policy/i })
      ).toHaveAttribute('href', '/privacy');
    });

    it('calls acceptAll when Accept All is clicked', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Accept All' }));
      expect(mockAcceptAll).toHaveBeenCalledTimes(1);
    });

    it('calls rejectAll when Essential Only is clicked', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Essential Only' }));
      expect(mockRejectAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('detailed view', () => {
    it('shows detailed view when Customize is clicked', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));
      expect(screen.getByText('Cookie Preferences')).toBeInTheDocument();
    });

    it('shows essential cookies checkbox (always checked and disabled)', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));
      const essentialCheckbox = screen.getByLabelText(/essential cookies/i);
      expect(essentialCheckbox).toBeChecked();
      expect(essentialCheckbox).toBeDisabled();
    });

    it('shows analytics cookies checkbox (unchecked by default)', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));
      const analyticsCheckbox = screen.getByLabelText(/analytics cookies/i);
      expect(analyticsCheckbox).not.toBeChecked();
      expect(analyticsCheckbox).not.toBeDisabled();
    });

    it('shows advertising cookies checkbox', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));
      expect(screen.getByLabelText(/advertising cookies/i)).toBeInTheDocument();
    });

    it('shows personalization cookies checkbox', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));
      expect(screen.getByLabelText(/personalization cookies/i)).toBeInTheDocument();
    });

    it('shows Save Preferences button in detailed view', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));
      expect(
        screen.getByRole('button', { name: 'Save Preferences' })
      ).toBeInTheDocument();
    });

    it('shows Back button in detailed view', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    });

    it('returns to simple view when Back is clicked', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));
      expect(screen.getByText('Cookie Preferences')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Back' }));
      expect(screen.getByText('Cookie Consent')).toBeInTheDocument();
    });

    it('calls updatePreferences with correct values when Save Preferences is clicked', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));

      // Toggle analytics on
      await user.click(screen.getByLabelText(/analytics cookies/i));

      await user.click(screen.getByRole('button', { name: 'Save Preferences' }));

      expect(mockUpdatePreferences).toHaveBeenCalledWith({
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        personalization_storage: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
      });
    });

    it('toggles the advertising and personalization checkboxes into the saved preferences', async () => {
      const user = userEvent.setup();
      render(<CookieConsent />);

      await user.click(screen.getByRole('button', { name: 'Customize' }));

      const adsCheckbox = screen.getByLabelText(/advertising cookies/i);
      const personalizationCheckbox = screen.getByLabelText(/personalization cookies/i);
      await user.click(adsCheckbox);
      await user.click(personalizationCheckbox);
      expect(adsCheckbox).toBeChecked();
      expect(personalizationCheckbox).toBeChecked();

      await user.click(screen.getByRole('button', { name: 'Save Preferences' }));

      expect(mockUpdatePreferences).toHaveBeenCalledWith({
        analytics_storage: 'denied',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        personalization_storage: 'granted',
        functionality_storage: 'granted',
        security_storage: 'granted',
      });
    });
  });

  describe('accessibility', () => {
    it('renders as a non-blocking bottom sheet, not a full-screen backdrop', () => {
      render(<CookieConsent />);
      // The banner sits in a pointer-events-none wrapper so the rest of the
      // page stays interactive; only its inner card captures clicks.
      const wrapper = document.querySelector('.pointer-events-none');
      expect(wrapper).toBeInTheDocument();
      expect(document.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
    });
  });
});
