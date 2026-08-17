'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { track } from '@/lib/analytics';

type Audience = 'ceo' | 'engineer';

const AudienceContext = createContext<Audience>('ceo');

const STORAGE_KEY = 'audience-preference';

/**
 * Wraps a section of the page whose copy should adapt to the reader.
 * Persists the choice in localStorage and fires a GA4 event on change.
 */
export function AudienceToggle({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>('ceo');

  useEffect(() => {
    // localStorage isn't available during SSR render, so the saved
    // preference can only be read and applied client-side after mount.
    const saved = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === 'ceo' || saved === 'engineer') setAudience(saved);
  }, []);

  const choose = (next: Audience) => {
    setAudience(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    track('audience_toggle', { audience: next });
  };

  return (
    <AudienceContext.Provider value={audience}>
      <div className="flex justify-center mb-8">
        <div
          role="tablist"
          aria-label="Explain it to me like a…"
          className="inline-flex rounded-full bg-[var(--color-dark-card-alt)] p-1 border border-[var(--color-dark-border)]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={audience === 'ceo'}
            onClick={() => choose('ceo')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              audience === 'ceo'
                ? 'bg-[var(--color-accent-blue)] text-white'
                : 'text-[var(--color-text-muted)]'
            }`}
          >
            Explain it like I&apos;m a CEO
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={audience === 'engineer'}
            onClick={() => choose('engineer')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              audience === 'engineer'
                ? 'bg-[var(--color-accent-blue)] text-white'
                : 'text-[var(--color-text-muted)]'
            }`}
          >
            Explain it like I&apos;m an engineer
          </button>
        </div>
      </div>
      {children}
    </AudienceContext.Provider>
  );
}

export function ForAudience({ audience, children }: { audience: Audience; children: ReactNode }) {
  const current = useContext(AudienceContext);
  if (current !== audience) return null;
  return <>{children}</>;
}
