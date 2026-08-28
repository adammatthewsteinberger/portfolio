import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the brand link back to home', () => {
    render(<Header />);
    expect(screen.getAllByRole('link', { name: /adam matthew steinberger/i })[0]).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders the desktop nav items', () => {
    render(<Header />);
    // Desktop nav is present in the DOM even on narrow test viewports
    // (hidden via a lg: class, not removed), so getAllByRole is used since
    // the mobile panel can also contain matching links once opened.
    expect(screen.getAllByRole('link', { name: 'Story' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Expertise' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Work' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Writing' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Hire Me' }).length).toBeGreaterThan(0);
  });

  it('shows the availability pill text it is given', () => {
    render(<Header availabilityShortLabel="Available now" availabilityLongLabel="Available now · Greenville, SC (remote) · US remote" />);
    expect(screen.getAllByText(/available now/i).length).toBeGreaterThan(0);
  });

  it('derives the availability pill from the clock when no label is passed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-27T12:00:00-04:00'));
    render(<Header />);
    expect(screen.getAllByText(/available sept 2026/i).length).toBeGreaterThan(0);
  });

  it('mobile menu is closed by default', () => {
    render(<Header />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('opens the mobile menu on click, and it contains the nav links plus services/contact', () => {
    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    expect(dialog.querySelector('a[href="/hire-me"]')).toBeInTheDocument();
    expect(dialog.querySelector('a[href="/services"]')).toBeInTheDocument();
    expect(dialog.querySelector('a[href="/contact"]')).toBeInTheDocument();
  });

  it('closes the mobile menu when a nav link inside it is clicked', () => {
    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const dialog = screen.getByRole('dialog');
    const storyLink = dialog.querySelector('a[href="/story"]') as HTMLElement;
    fireEvent.click(storyLink);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the mobile menu on Escape and restores body scroll', () => {
    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('ignores non-Escape key presses and leaves the menu open', () => {
    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Enter' });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('toggling the menu closed via the button also restores body scroll', () => {
    render(<Header />);

    const toggle = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(toggle);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
