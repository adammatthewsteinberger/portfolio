'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { availabilityLong, availabilityShort } from '@/lib/availability';
import { EXEC_PREFIX, editionFor } from '@/lib/edition';

const engineeringNav = [
  { href: '/', label: 'Home' },
  { href: '/story', label: 'Story' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/hire-me', label: 'Hire Me' },
];

// The exec edition gets its own nav; the engineering nav never links to it
// (that affordance lives in the footer and at the bottom of a few pages).
const execNav = [
  { href: EXEC_PREFIX, label: 'Overview' },
  { href: `${EXEC_PREFIX}/work`, label: 'What Changed' },
  { href: `${EXEC_PREFIX}/engage`, label: 'Engage' },
  { href: '/', label: 'Engineering Edition' },
];

export interface HeaderProps {
  /** Pill text; the root layout passes build-time values so server and client agree. */
  availabilityShortLabel?: string;
  availabilityLongLabel?: string;
}

export default function Header({
  availabilityShortLabel = availabilityShort(),
  availabilityLongLabel = availabilityLong(),
}: HeaderProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const edition = editionFor(usePathname());
  const navItems = edition === 'exec' ? execNav : engineeringNav;

  // Close the mobile menu on Escape and lock body scroll while it's open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-dark-bg)]/95 backdrop-blur-sm border-b border-[var(--color-dark-border)]">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href={edition === 'exec' ? EXEC_PREFIX : '/'} className="flex items-center gap-2 no-underline" onClick={closeMenu}>
            <Image
              src="/images/profile-picture.jpg"
              alt="Adam Matthew Steinberger"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
            <span className="text-[var(--color-text-primary)] font-semibold text-lg hidden sm:inline">
              Adam Matthew Steinberger
            </span>
            {edition === 'exec' && (
              <span className="hidden sm:inline text-xs font-mono uppercase tracking-wider text-[var(--color-accent-purple)]">
                For executives
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium no-underline"
              >
                {item.label}
              </Link>
            ))}
            <span className="mx-2 hidden xl:inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)] text-xs font-semibold whitespace-nowrap">
              {availabilityShortLabel}
            </span>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[var(--color-text-primary)] bg-transparent border-none cursor-pointer"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 z-40 bg-[var(--color-dark-bg)]"
          role="dialog"
          aria-modal="true"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="py-3 px-2 text-lg text-[var(--color-text-primary)] border-b border-[var(--color-dark-border)] no-underline"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="py-3 px-2 text-[var(--color-text-muted)] no-underline"
            >
              Contact
            </Link>
            <span className="mt-4 self-start inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)] text-xs font-semibold">
              {availabilityLongLabel}
            </span>
          </div>
        </div>
      )}

      {/* Spacer for the fixed nav */}
      <div className="h-16" />
    </>
  );
}
