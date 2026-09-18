import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the brand link back to home', () => {
    render(<Header />);
    expect(screen.getAllByRole('link', { name: /adam matthew steinberger/i })[0]).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders the desktop nav items, with Join Me as the last one and no hiring link', () => {
    render(<Header />);
    expect(document.querySelector('a[href="/hire-me"]')).toBeNull();
    expect(document.querySelector('a[href^="/for-executives"]')).toBeNull();
    // Desktop nav is present in the DOM even on narrow test viewports
    // (hidden via a lg: class, not removed), so getAllByRole is used since
    // the mobile panel can also contain matching links once opened.
    expect(screen.getAllByRole('link', { name: 'Story' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Expertise' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Work' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Writing' }).length).toBeGreaterThan(0);
    const joinMe = screen.getAllByRole('link', { name: 'Join Me' });
    expect(joinMe[0]).toHaveAttribute('href', '/join-me');
    const navLinks = Array.from(document.querySelectorAll('nav .lg\\:flex a')).map((a) => a.textContent);
    expect(navLinks.slice(-2)).toEqual(['Join Me', 'Contributors welcome']);
  });

  it('shows a contributors pill that links to the developer section, never an availability pill', () => {
    render(<Header />);
    const pill = screen.getByRole('link', { name: 'Contributors welcome' });
    expect(pill).toHaveAttribute('href', '/join-me#developers');
    expect(document.body.textContent).not.toMatch(/available/i);
  });

  it('stacks the preview banner above the nav inside the fixed header, and enlarges the spacer', () => {
    const { container } = render(<Header preview />);
    const banner = screen.getByRole('status');
    expect(banner).toHaveTextContent(/preview build/i);
    expect(banner.parentElement?.className).toContain('fixed');
    expect(banner.nextElementSibling?.tagName).toBe('NAV');
    expect(container.querySelector('.h-\\[5\\.75rem\\]')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog').className).toContain('top-[5.75rem]');
  });

  it('renders no banner and the normal spacer without the preview flag', () => {
    const { container } = render(<Header />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(container.querySelector('.h-16')).not.toBeNull();
  });

  it('mobile menu is closed by default', () => {
    render(<Header />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('opens the mobile menu on click, and it contains the nav links, contact, and the contributors pill — never hiring pages', () => {
    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    expect(dialog.querySelector('a[href="/join-me"]')).toBeInTheDocument();
    expect(dialog.querySelector('a[href="/hire-me"]')).not.toBeInTheDocument();
    expect(dialog.querySelector('a[href="/services"]')).not.toBeInTheDocument();
    expect(dialog.querySelector('a[href^="/for-executives"]')).not.toBeInTheDocument();
    expect(dialog.querySelector('a[href="/contact"]')).toBeInTheDocument();
    expect(dialog.querySelector('a[href="/join-me#developers"]')).toHaveTextContent('Contributors welcome');
  });

  it('closes the mobile menu when the contributors pill inside it is clicked', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const pill = screen.getByRole('dialog').querySelector('a[href="/join-me#developers"]') as HTMLElement;
    fireEvent.click(pill);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
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
