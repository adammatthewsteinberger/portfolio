import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ForExecutivesPage, { metadata } from '../page';
import { execRoutes } from '@/data/exec';

describe('/for-executives landing', () => {
  it('leads with the problem, offers both doors, and links back to the engineering site', () => {
    render(<ForExecutivesPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(execRoutes[0].problem);
    expect(screen.getByRole('link', { name: /what i’m looking for/i })).toHaveAttribute('href', '/hire-me');
    expect(screen.getByRole('link', { name: /how an engagement works/i })).toHaveAttribute('href', '/for-executives/engage');
    expect(screen.getByRole('link', { name: /engineering site/i })).toHaveAttribute('href', '/');
    // Every case study listed is the exec view of a real /work study.
    const studyLinks = document.querySelectorAll('a[href^="/for-executives/work/"]');
    expect(studyLinks.length).toBeGreaterThanOrEqual(6);
  });

  it('is self-canonical under the exec prefix', () => {
    expect(metadata.alternates?.canonical).toBe('/for-executives');
  });
});
