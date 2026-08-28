import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MultipleCTAs from '../MultipleCTAs';

describe('MultipleCTAs (engineering edition, default)', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the September heading before the availability date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-27T12:00:00-04:00'));
    render(<MultipleCTAs />);
    expect(screen.getByRole('heading', { name: /available september 2026/i })).toBeInTheDocument();
  });

  it('renders the "now" heading once the date has passed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-01T09:00:00-04:00'));
    render(<MultipleCTAs />);
    expect(screen.getByRole('heading', { name: /^available now$/i })).toBeInTheDocument();
  });

  it('renders the primary Hire Me CTA', () => {
    render(<MultipleCTAs />);
    const hireMe = screen.getByRole('link', { name: /hire me/i });
    expect(hireMe).toHaveAttribute('href', '/hire-me');
  });

  it('renders non-commercial secondary links only', () => {
    render(<MultipleCTAs edition="engineering" />);
    expect(screen.getByRole('link', { name: /open source/i })).toHaveAttribute('href', '/open-source');
    expect(screen.getByRole('link', { name: /read the writing/i })).toHaveAttribute('href', '/writing');
    const newsletter = screen.getByRole('link', { name: /newsletter/i });
    expect(newsletter).toHaveAttribute('href', 'https://eepurl.com/jiYXCQ');
    expect(newsletter).toHaveAttribute('target', '_blank');
    expect(screen.queryByRole('link', { name: /call/i })).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="tidycal"]')).toBeNull();
  });

  it('mentions the target location and role in the supporting text', () => {
    render(<MultipleCTAs />);
    expect(screen.getByText(/staff software architect.*greenville, sc \(remote\)/i)).toBeInTheDocument();
  });
});

describe('MultipleCTAs (exec edition)', () => {
  it('leads with the engagement door and keeps the booking link here', () => {
    render(<MultipleCTAs edition="exec" />);
    expect(screen.getByRole('heading', { name: /engage my firm/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /how an engagement works/i })).toHaveAttribute('href', '/for-executives/engage');
    const call = screen.getByRole('link', { name: /book a call/i });
    expect(call).toHaveAttribute('href', 'https://tidycal.com/adammatthewsteinberger');
    expect(call).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('link', { name: /hire me full-time/i })).toHaveAttribute('href', '/hire-me');
    expect(screen.getByRole('link', { name: /engineering edition/i })).toHaveAttribute('href', '/');
  });
});
