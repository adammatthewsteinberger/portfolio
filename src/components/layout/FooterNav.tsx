'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EXEC_PREFIX, editionFor } from '@/lib/edition';

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
  muted?: boolean;
}

const NEWSLETTER = { href: 'https://eepurl.com/jiYXCQ', label: 'Newsletter', external: true };

// The engineering footer is the one place (besides a few page bottoms) that
// links to the executive edition — explicitly, last, and de-emphasized.
const engineeringLinks: FooterLink[] = [
  { href: '/hire-me', label: 'Hire Me' },
  { href: '/chat', label: 'Ask my résumé' },
  { href: '/work', label: 'Work' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/open-source', label: 'Open Source' },
  { href: '/join-me', label: 'Join Me' },
  { href: '/writing', label: 'Writing' },
  NEWSLETTER,
  { href: '/site-directory', label: 'Site Directory' },
  { href: '/privacy', label: 'Privacy' },
  { href: EXEC_PREFIX, label: 'For Executives', muted: true },
];

const execLinks: FooterLink[] = [
  { href: EXEC_PREFIX, label: 'Overview' },
  { href: `${EXEC_PREFIX}/work`, label: 'What Changed' },
  { href: `${EXEC_PREFIX}/engage`, label: 'Engage' },
  { href: '/services', label: 'Services' },
  { href: '/hire-me', label: 'Hire Me' },
  NEWSLETTER,
  { href: '/privacy', label: 'Privacy' },
  { href: '/', label: 'Engineering Edition', muted: true },
];

export default function FooterNav() {
  const links = editionFor(usePathname()) === 'exec' ? execLinks : engineeringLinks;
  const linkClass = (muted?: boolean) =>
    `${muted ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)] font-semibold'} hover:text-[var(--color-accent-blue)] transition-colors`;

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6 text-sm">
      {links.map((link, i) => (
        <span key={link.href} className="inline-flex gap-4">
          {i > 0 && <span className="text-[var(--color-dark-border)]">|</span>}
          {link.external ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass(link.muted)}>
              {link.label}
            </a>
          ) : (
            <Link href={link.href} className={linkClass(link.muted)}>
              {link.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
