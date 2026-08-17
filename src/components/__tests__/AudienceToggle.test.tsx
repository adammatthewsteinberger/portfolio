import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AudienceToggle, ForAudience } from '../AudienceToggle';
import * as analytics from '@/lib/analytics';

function Fixture() {
  return (
    <AudienceToggle>
      <ForAudience audience="ceo">
        <p>CEO copy</p>
      </ForAudience>
      <ForAudience audience="engineer">
        <p>Engineer copy</p>
      </ForAudience>
    </AudienceToggle>
  );
}

describe('AudienceToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to the CEO audience', () => {
    render(<Fixture />);
    expect(screen.getByText('CEO copy')).toBeInTheDocument();
    expect(screen.queryByText('Engineer copy')).not.toBeInTheDocument();
  });

  it('renders both tabs', () => {
    render(<Fixture />);
    expect(screen.getByRole('tab', { name: /explain it like i'm a ceo/i })).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: /explain it like i'm an engineer/i })
    ).toBeInTheDocument();
  });

  it('switches to the engineer audience on click, persists the choice, and tracks the event', async () => {
    const trackSpy = vi.spyOn(analytics, 'track');
    const user = userEvent.setup();
    render(<Fixture />);

    await user.click(screen.getByRole('tab', { name: /explain it like i'm an engineer/i }));

    expect(screen.getByText('Engineer copy')).toBeInTheDocument();
    expect(screen.queryByText('CEO copy')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('audience-preference')).toBe('engineer');
    expect(trackSpy).toHaveBeenCalledWith('audience_toggle', { audience: 'engineer' });
  });

  it('marks the active tab as selected via aria-selected', async () => {
    const user = userEvent.setup();
    render(<Fixture />);

    const ceoTab = screen.getByRole('tab', { name: /explain it like i'm a ceo/i });
    const engineerTab = screen.getByRole('tab', { name: /explain it like i'm an engineer/i });
    expect(ceoTab).toHaveAttribute('aria-selected', 'true');
    expect(engineerTab).toHaveAttribute('aria-selected', 'false');

    await user.click(engineerTab);

    expect(ceoTab).toHaveAttribute('aria-selected', 'false');
    expect(engineerTab).toHaveAttribute('aria-selected', 'true');
  });

  it('restores a previously saved engineer preference on mount', () => {
    window.localStorage.setItem('audience-preference', 'engineer');
    render(<Fixture />);
    expect(screen.getByText('Engineer copy')).toBeInTheDocument();
  });

  it('ignores an invalid saved preference and falls back to ceo', () => {
    window.localStorage.setItem('audience-preference', 'not-a-real-audience');
    render(<Fixture />);
    expect(screen.getByText('CEO copy')).toBeInTheDocument();
  });

  it('clicking the CEO tab while on engineer switches back to CEO copy', async () => {
    const user = userEvent.setup();
    render(<Fixture />);

    await user.click(screen.getByRole('tab', { name: /explain it like i'm an engineer/i }));
    expect(screen.getByText('Engineer copy')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /explain it like i'm a ceo/i }));
    expect(screen.getByText('CEO copy')).toBeInTheDocument();
    expect(window.localStorage.getItem('audience-preference')).toBe('ceo');
  });

  it('ForAudience renders nothing outside an AudienceToggle provider (default context)', () => {
    render(
      <ForAudience audience="engineer">
        <p>Should not appear</p>
      </ForAudience>
    );
    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
  });
});
