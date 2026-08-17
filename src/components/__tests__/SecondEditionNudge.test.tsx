import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SecondEditionNudge from '../SecondEditionNudge';

vi.mock('@/hooks/useScrollDepth', () => ({
  useScrollDepth: vi.fn(() => false),
}));

vi.mock('@/hooks/useBotDetection', () => ({
  useBotDetection: vi.fn(() => false),
}));

vi.mock('@/lib/analytics', () => ({
  track: vi.fn(),
}));

import { useScrollDepth } from '@/hooks/useScrollDepth';
import { useBotDetection } from '@/hooks/useBotDetection';
import { track } from '@/lib/analytics';

const mockUseScrollDepth = vi.mocked(useScrollDepth);
const mockUseBotDetection = vi.mocked(useBotDetection);
const mockTrack = vi.mocked(track);

const DISMISSED_KEY = 'n2n-second-edition-nudge-dismissed';

describe('SecondEditionNudge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseScrollDepth.mockReturnValue(false);
    mockUseBotDetection.mockReturnValue(false);
    window.sessionStorage.clear();
  });

  it('does not render before the scroll threshold is reached', () => {
    render(<SecondEditionNudge />);
    expect(screen.queryByText(/second edition is in the works/i)).not.toBeInTheDocument();
  });

  it('does not render for bots even after scrolling', () => {
    mockUseScrollDepth.mockReturnValue(true);
    mockUseBotDetection.mockReturnValue(true);

    render(<SecondEditionNudge />);
    expect(screen.queryByText(/second edition is in the works/i)).not.toBeInTheDocument();
  });

  it('renders and tracks a shown event once scrolled and not a bot', () => {
    mockUseScrollDepth.mockReturnValue(true);

    render(<SecondEditionNudge />);

    expect(screen.getByText(/second edition is in the works/i)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith('second_edition_nudge_shown');
  });

  it('does not render again in the same session after being dismissed', () => {
    window.sessionStorage.setItem(DISMISSED_KEY, '1');
    mockUseScrollDepth.mockReturnValue(true);

    render(<SecondEditionNudge />);
    expect(screen.queryByText(/second edition is in the works/i)).not.toBeInTheDocument();
  });

  it('never locks page scroll — no scroll-lock side effects on mount', () => {
    mockUseScrollDepth.mockReturnValue(true);
    document.body.style.overflow = '';

    render(<SecondEditionNudge />);
    expect(document.body.style.overflow).toBe('');
  });

  it('dismissing via the close button hides it and records the session flag', async () => {
    mockUseScrollDepth.mockReturnValue(true);
    const user = userEvent.setup();

    render(<SecondEditionNudge />);
    await user.click(screen.getByRole('button', { name: /dismiss/i }));

    expect(screen.queryByText(/second edition is in the works/i)).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem(DISMISSED_KEY)).toBe('1');
  });

  it('dismissing via "Keep Reading" hides it and records the session flag', async () => {
    mockUseScrollDepth.mockReturnValue(true);
    const user = userEvent.setup();

    render(<SecondEditionNudge />);
    await user.click(screen.getByRole('link', { name: /keep reading/i }));

    expect(screen.queryByText(/second edition is in the works/i)).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem(DISMISSED_KEY)).toBe('1');
  });

  it('the "Get Notified" link points at the newsletter and tracks a submit event on click', async () => {
    mockUseScrollDepth.mockReturnValue(true);
    const user = userEvent.setup();

    render(<SecondEditionNudge />);
    const link = screen.getByRole('link', { name: /get notified/i });
    expect(link).toHaveAttribute('href', 'https://eepurl.com/jiYXCQ');
    expect(link).toHaveAttribute('target', '_blank');

    await user.click(link);
    expect(mockTrack).toHaveBeenCalledWith('newsletter_submit', {
      source: 'second_edition_nudge',
    });
  });
});
