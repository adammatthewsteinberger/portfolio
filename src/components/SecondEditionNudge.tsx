'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useScrollDepth } from '@/hooks/useScrollDepth';
import { useBotDetection } from '@/hooks/useBotDetection';
import { track } from '@/lib/analytics';
import Icon from '@/components/Icon';

const DISMISSED_KEY = 'n2n-second-edition-nudge-dismissed';

/**
 * A soft, dismissable nudge toward the "second edition in development" email
 * capture. Unlike the old ContentGateModal it never locks scroll, never
 * fires more than once per session, and never links to Amazon (the book
 * isn't for sale — see /books).
 */
export default function SecondEditionNudge() {
  const [visible, setVisible] = useState(false);
  const hasScrolledEnough = useScrollDepth(60);
  const isBot = useBotDetection();

  useEffect(() => {
    if (isBot || !hasScrolledEnough) return;
    // sessionStorage isn't available during SSR render, and hasScrolledEnough
    // itself only ever becomes true from a client-side scroll listener, so
    // this can't be expressed as a lazy useState initializer.
    if (window.sessionStorage.getItem(DISMISSED_KEY)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    track('second_edition_nudge_shown');
  }, [hasScrolledEnough, isBot]);

  const dismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Second edition update"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-[1000] bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl shadow-2xl p-5"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] bg-transparent border-none cursor-pointer"
      >
        <Icon name="times" />
      </button>
      <h3 className="font-bold text-[var(--color-text-primary)] mb-2 pr-6">
        A second edition is in the works
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">
        You&apos;re reading the first edition, free. The second edition adds real case studies
        and named research. It isn&apos;t for sale yet — get notified when it ships.
      </p>
      <div className="flex gap-2">
        <a
          href="https://eepurl.com/jiYXCQ"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('newsletter_submit', { source: 'second_edition_nudge' })}
          className="flex-1 text-center px-4 py-2 bg-[var(--color-accent-gold)] hover:brightness-95 font-bold rounded-lg no-underline text-sm"
          style={{ color: '#000000' }}
        >
          Get Notified
        </a>
        <Link
          href="/"
          onClick={dismiss}
          className="px-4 py-2 bg-[var(--color-dark-card-alt)] hover:bg-[var(--color-dark-border)] text-[var(--color-text-primary)] font-medium rounded-lg no-underline text-sm"
        >
          Keep Reading
        </Link>
      </div>
    </div>
  );
}
