import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DistributionNote, PackageLinks } from '../PackageLinks';
import { openSourcePackages, VIBEY_DISTRIBUTION } from '@/data/open-source';

const byName = (name: string) => openSourcePackages.find((p) => p.name === name)!;

describe('PackageLinks', () => {
  it('links a runner to its source directory in the vibey repository', () => {
    render(<p><PackageLinks pkg={byName('claudeloop')} /></p>);
    const link = screen.getByRole('link', { name: 'Source' });
    expect(link).toHaveAttribute('href', 'https://github.com/the-vibey-project/vibey/tree/develop/src/vibey_runners/claude');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('links vibey to PyPI, the repository, and the docs, with a caller-supplied class', () => {
    render(<p><PackageLinks pkg={byName('vibey')} className="custom" /></p>);
    const links = screen.getAllByRole('link');
    expect(links.map((a) => a.textContent)).toEqual(['PyPI', 'Repository', 'Docs']);
    expect(links.map((a) => a.getAttribute('href'))).toEqual([VIBEY_DISTRIBUTION.pypi, VIBEY_DISTRIBUTION.repo, VIBEY_DISTRIBUTION.docs]);
    for (const a of links) expect(a.className).toBe('custom');
  });
});

describe('DistributionNote', () => {
  it('says the family is one repository and one PyPI distribution, with the install command', () => {
    const { container } = render(<DistributionNote className="note" />);
    expect(container.firstElementChild?.className).toBe('note');
    expect(container.textContent).toMatch(/ships as one PyPI\s+distribution/);
    expect(screen.getByText(VIBEY_DISTRIBUTION.install).tagName).toBe('CODE');
    expect(screen.getByRole('link', { name: 'the-vibey-project/vibey' })).toHaveAttribute('href', VIBEY_DISTRIBUTION.repo);
    expect(screen.getByRole('link', { name: 'PyPI' })).toHaveAttribute('href', VIBEY_DISTRIBUTION.pypi);
    expect(screen.getByRole('link', { name: 'docs' })).toHaveAttribute('href', VIBEY_DISTRIBUTION.docs);
  });

  it('renders without a class', () => {
    const { container } = render(<DistributionNote />);
    expect(container.firstElementChild?.className).toBe('');
  });
});
