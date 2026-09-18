import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MultipleCTAs from '../MultipleCTAs';
import { audiences } from '@/data/audiences';

describe('MultipleCTAs', () => {
  it('leads with the primary ask: help build vibey, linking to the developer section', () => {
    render(<MultipleCTAs />);
    expect(screen.getByRole('heading', { level: 2, name: 'Help build vibey' })).toBeInTheDocument();
    expect(screen.getByText(audiences[0].summary)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /how to get started/i })).toHaveAttribute('href', '/join-me#developers');
  });

  it('offers the other two audiences, in order, after the primary ask', () => {
    render(<MultipleCTAs />);
    const hrefs = Array.from(document.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs.indexOf('/join-me#developers')).toBeLessThan(hrefs.indexOf('/join-me#governments'));
    expect(hrefs.indexOf('/join-me#governments')).toBeLessThan(hrefs.indexOf('/join-me#academia'));
    expect(screen.getByRole('link', { name: /governments and military/i })).toHaveAttribute('href', '/join-me#governments');
    expect(screen.getByRole('link', { name: /universities and academia/i })).toHaveAttribute('href', '/join-me#academia');
  });

  it('keeps the writing and newsletter links, and nothing about hiring or booking', () => {
    render(<MultipleCTAs />);
    expect(screen.getByRole('link', { name: /read the writing/i })).toHaveAttribute('href', '/writing');
    const newsletter = screen.getByRole('link', { name: /newsletter/i });
    expect(newsletter).toHaveAttribute('href', 'https://eepurl.com/jiYXCQ');
    expect(newsletter).toHaveAttribute('target', '_blank');
    expect(screen.queryByRole('link', { name: /hire|call|engagement/i })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/available/i);
    expect(document.querySelector('a[href*="tidycal"], a[href="/hire-me"]')).toBeNull();
  });
});
