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

// `getAllByRole('button', { name })` computes every button's accessible name and
// walks its ancestors' computed styles on each call: ~35ms per query in jsdom versus
// ~0.2ms for a text query scoped to <button>. Calling it inside the click loops made
// these tests time out under full-suite parallel load, so the accessible roles and
// names are asserted once (first test) and the loops use the cheap query. Query once
// per render and reuse the elements: React updates them in place across re-renders
// (stable keys), so the references stay valid.
function getAnswerButtons() {
  return {
    yes: screen.getAllByText('yes', { selector: 'button' }),
    no: screen.getAllByText('no', { selector: 'button' }),
    partial: screen.getAllByText('partial', { selector: 'button' }),
  };
}

// No artificial setTimeout between pointer actions; timing isn't under test.
const setupUser = () => userEvent.setup({ delay: null });

// Organizational + Technical "yes", Security & Compliance "no", Operational "partial".
async function answerEveryFactor(user: ReturnType<typeof setupUser>) {
  const { yes, no, partial } = getAnswerButtons();
  for (let i = 0; i < 9; i++) await user.click(yes[i]);
  for (let i = 9; i < 13; i++) await user.click(no[i]);
  for (let i = 13; i < 15; i++) await user.click(partial[i]);
}

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

    for (const name of [/^yes$/i, /^no$/i, /^partial$/i]) {
      const buttons = screen.getAllByRole('button', { name });
      expect(buttons).toHaveLength(TOTAL_FACTORS);
      for (const button of buttons) expect(button).toHaveAttribute('aria-pressed', 'false');
    }

    expect(screen.getByText(`0 of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see my score/i })).toBeDisabled();
  });

  it('tracks progress and enables the score button once every factor is answered', async () => {
    const user = setupUser();
    render(<ReadinessQuiz />);

    const { yes } = getAnswerButtons();
    await user.click(yes[0]);
    expect(screen.getByText(`1 of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
    expect(yes[0]).toHaveAttribute('aria-pressed', 'true');

    await answerEveryFactor(user);

    expect(screen.getByText(`${TOTAL_FACTORS} of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see my score/i })).toBeEnabled();
  });

  it('lets an answer be changed before submitting', async () => {
    const user = setupUser();
    render(<ReadinessQuiz />);

    const { yes, no } = getAnswerButtons();
    await user.click(yes[0]);
    expect(yes[0]).toHaveAttribute('aria-pressed', 'true');

    await user.click(no[0]);
    expect(yes[0]).toHaveAttribute('aria-pressed', 'false');
    expect(no[0]).toHaveAttribute('aria-pressed', 'true');
    // Changing an already-answered factor doesn't double-count it
    expect(screen.getByText(`1 of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
  });

  it('computes per-pillar and overall scores, identifies the weakest pillar, and tracks completion', async () => {
    const user = setupUser();
    render(<ReadinessQuiz />);

    await answerEveryFactor(user);
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
    const user = setupUser();
    render(<ReadinessQuiz />);

    await answerEveryFactor(user);
    await user.click(screen.getByRole('button', { name: /see my score/i }));
    expect(screen.getByText(/your readiness score/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /retake quiz/i }));

    expect(screen.queryByText(/your readiness score/i)).not.toBeInTheDocument();
    expect(screen.getByText(`0 of ${TOTAL_FACTORS} answered`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see my score/i })).toBeDisabled();
  });
});
