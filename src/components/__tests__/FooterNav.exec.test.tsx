import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FooterNav from '../layout/FooterNav';

vi.mock('next/navigation', () => ({ usePathname: () => '/for-executives/work' }));

describe('FooterNav (executive edition)', () => {
  it('shows the exec navigation and the way back to the engineering edition', () => {
    render(<FooterNav />);
    expect(screen.getByRole('link', { name: /overview/i })).toHaveAttribute('href', '/for-executives');
    expect(screen.getByRole('link', { name: /what changed/i })).toHaveAttribute('href', '/for-executives/work');
    expect(screen.getByRole('link', { name: /engage/i })).toHaveAttribute('href', '/for-executives/engage');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: /hire me/i })).toHaveAttribute('href', '/hire-me');
    expect(screen.getByRole('link', { name: /engineering edition/i })).toHaveAttribute('href', '/');
    expect(screen.queryByRole('link', { name: /for executives/i })).not.toBeInTheDocument();
  });
});
