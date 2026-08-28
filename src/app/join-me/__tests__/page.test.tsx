import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import JoinMePage, { metadata } from '../page';
import { openSourcePackages } from '@/data/open-source';

describe('/join-me', () => {
  it('invites volunteers, gives a generic free quickstart, and lists every repository', () => {
    render(<JoinMePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Join Me');
    expect(screen.getByText(/Greenville-remote or US-remote volunteers are welcome/i)).toBeInTheDocument();
    expect(screen.getByText('uv tool install vibey')).toBeInTheDocument();
    expect(screen.getByText('vibey doctor --conformance --record')).toBeInTheDocument();
    const cells = Array.from(document.querySelectorAll('td')).map((td) => td.textContent);
    for (const pkg of openSourcePackages) {
      expect(cells).toContain(pkg.name);
    }
    expect(screen.getByRole('link', { name: /adam@matthewsteinberger\.com/i })).toHaveAttribute('href', 'mailto:adam@matthewsteinberger.com');
    expect(screen.getByRole('link', { name: /what i.m looking for/i })).toHaveAttribute('href', '/hire-me');
  });

  it('never states a package count and is self-canonical', () => {
    render(<JoinMePage />);
    expect(document.body.textContent).not.toMatch(/\b(seven|eight|nine)\s+packages/i);
    expect(metadata.alternates?.canonical).toBe('/join-me');
  });
});
