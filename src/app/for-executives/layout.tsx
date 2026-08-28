import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * The executive edition wrapper. The engineering site is the canonical version;
 * this banner says so on every exec page and links back. Header/Footer switch
 * their nav by pathname (see src/lib/edition.ts), so no separate root layout.
 */
export default function ForExecutivesLayout({ children }: { children: ReactNode }) {
  return (
    <div data-edition="exec">
      <div className="bg-[var(--color-dark-card)] border-b border-[var(--color-accent-purple)]/30">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--color-text-muted)]">
          <span>
            <span className="font-mono uppercase tracking-wider text-[var(--color-accent-purple)] mr-2">Executive edition</span>
            The problem first, then what changed.
          </span>
          <Link href="/" className="text-[var(--color-accent-blue)] hover:underline">
            Full technical version →
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
