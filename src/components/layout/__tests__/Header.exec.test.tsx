import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

vi.mock('next/navigation', () => ({ usePathname: () => '/for-executives' }));

describe('Header (executive edition)', () => {
  it('swaps to the exec nav, brands the edition, and links back to the engineering edition', () => {
    render(<Header availabilityShortLabel="Available now" availabilityLongLabel="Available now" />);
    expect(screen.getAllByRole('link', { name: /overview/i })[0]).toHaveAttribute('href', '/for-executives');
    expect(screen.getAllByRole('link', { name: /what changed/i })[0]).toHaveAttribute('href', '/for-executives/work');
    expect(screen.getAllByRole('link', { name: /^engage$/i })[0]).toHaveAttribute('href', '/for-executives/engage');
    expect(screen.getAllByRole('link', { name: /engineering edition/i })[0]).toHaveAttribute('href', '/');
    expect(screen.getByText(/for executives/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^story$/i })).not.toBeInTheDocument();
    // Brand link goes to the edition's own root.
    expect(screen.getAllByRole('link', { name: /adam matthew steinberger/i })[0]).toHaveAttribute('href', '/for-executives');
  });

  it('mobile menu shows the exec nav plus contact', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('a[href="/for-executives/engage"]')).toBeInTheDocument();
    expect(dialog.querySelector('a[href="/contact"]')).toBeInTheDocument();
  });
});
