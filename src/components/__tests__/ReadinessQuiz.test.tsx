import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReadinessQuiz } from '../ReadinessQuiz';

vi.mock('@/lib/analytics', () => ({
  track: vi.fn(),
}));

import { track } from '@/lib/analytics';

const mockTrack = vi.mocked(track);

const TOTAL_FACTORS = 15; // 5 Organizational + 4 Technical + 4 Security & Compliance + 2 Operational

describe('ReadinessQuiz', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all four pillars and disables the score button until fully answered', () => {
    render(<ReadinessQuiz />);

    expect(screen.getByText('Organizational')).toBeInTheDocument();
    expect(screen.getByText('Technical')).toBeInTheDocument();
    expect(screen.getByText('Security & Compliance')).toBeInTheDocument();
    expect(screen.getByText('Operational')).toBeInTheDocument();

    expect(screen.getByText(`0 of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see my score/i })).toBeDisabled();
  });

  it('tracks progress and enables the score button once every factor is answered', async () => {
    const user = userEvent.setup();
    render(<ReadinessQuiz />);

    const yesButtons = screen.getAllByRole('button', { name: /^yes$/i });
    await user.click(yesButtons[0]);
    expect(screen.getByText(`1 of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
    expect(yesButtons[0]).toHaveAttribute('aria-pressed', 'true');

    // Answer the remaining Organizational + Technical factors "yes"
    for (let i = 1; i < 9; i++) {
      await user.click(screen.getAllByRole('button', { name: /^yes$/i })[i]);
    }
    // Security & Compliance factors "no"
    for (let i = 9; i < 13; i++) {
      await user.click(screen.getAllByRole('button', { name: /^no$/i })[i]);
    }
    // Operational factors "partial"
    for (let i = 13; i < 15; i++) {
      await user.click(screen.getAllByRole('button', { name: /^partial$/i })[i]);
    }

    expect(screen.getByText(`${TOTAL_FACTORS} of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see my score/i })).toBeEnabled();
  });

  it('lets an answer be changed before submitting', async () => {
    const user = userEvent.setup();
    render(<ReadinessQuiz />);

    const yesButtons = screen.getAllByRole('button', { name: /^yes$/i });
    await user.click(yesButtons[0]);
    expect(yesButtons[0]).toHaveAttribute('aria-pressed', 'true');

    const noButtons = screen.getAllByRole('button', { name: /^no$/i });
    await user.click(noButtons[0]);
    expect(screen.getAllByRole('button', { name: /^yes$/i })[0]).toHaveAttribute('aria-pressed', 'false');
    expect(noButtons[0]).toHaveAttribute('aria-pressed', 'true');
    // Changing an already-answered factor doesn't double-count it
    expect(screen.getByText(`1 of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
  });

  it('computes per-pillar and overall scores, identifies the weakest pillar, and tracks completion', async () => {
    const user = userEvent.setup();
    render(<ReadinessQuiz />);

    for (let i = 0; i < 9; i++) {
      await user.click(screen.getAllByRole('button', { name: /^yes$/i })[i]);
    }
    for (let i = 9; i < 13; i++) {
      await user.click(screen.getAllByRole('button', { name: /^no$/i })[i]);
    }
    for (let i = 13; i < 15; i++) {
      await user.click(screen.getAllByRole('button', { name: /^partial$/i })[i]);
    }

    await user.click(screen.getByRole('button', { name: /see my score/i }));

    expect(screen.getByText('Your Readiness Score: 63%')).toBeInTheDocument();
    expect(screen.getAllByText('Security & Compliance').length).toBeGreaterThanOrEqual(2);
    expect(mockTrack).toHaveBeenCalledWith('readiness_quiz_completed', {
      overall: 63,
      weakest: 'Security & Compliance',
    });

    const talkLink = screen.getByRole('link', { name: /talk through your score/i });
    expect(talkLink).toHaveAttribute('href', '/contact');
  });

  it('resets to the questions view on retake', async () => {
    const user = userEvent.setup();
    render(<ReadinessQuiz />);

    for (let i = 0; i < 9; i++) {
      await user.click(screen.getAllByRole('button', { name: /^yes$/i })[i]);
    }
    for (let i = 9; i < 13; i++) {
      await user.click(screen.getAllByRole('button', { name: /^no$/i })[i]);
    }
    for (let i = 13; i < 15; i++) {
      await user.click(screen.getAllByRole('button', { name: /^partial$/i })[i]);
    }
    await user.click(screen.getByRole('button', { name: /see my score/i }));
    expect(screen.getByText(/your readiness score/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /retake quiz/i }));

    expect(screen.queryByText(/your readiness score/i)).not.toBeInTheDocument();
    expect(screen.getByText(`0 of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see my score/i })).toBeDisabled();
  });
});
