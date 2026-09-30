import Link from 'next/link';

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

const NEWSLETTER = { href: 'https://eepurl.com/jiYXCQ', label: 'Newsletter', external: true };

// Join Me first: it is the primary page (developers, then governments and
// military, then universities and academia).
const links: FooterLink[] = [
  { href: '/join-me', label: 'Join Me' },
  { href: '/chat', label: 'Ask about Adam' },
  { href: '/work', label: 'Work' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/open-source', label: 'Open Source' },
  { href: '/writing', label: 'Writing' },
  NEWSLETTER,
  { href: '/site-directory', label: 'Site Directory' },
  { href: '/privacy', label: 'Privacy' },
];

const LINK_CLASS = 'text-[var(--color-text-primary)] font-semibold hover:text-[var(--color-accent-blue)] transition-colors';

export default function FooterNav() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6 text-sm">
      {links.map((link, i) => (
        <span key={link.href} className="inline-flex gap-4">
          {i > 0 && <span className="text-[var(--color-dark-border)]">|</span>}
          {link.external ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              {link.label}
            </a>
          ) : (
            <Link href={link.href} className={LINK_CLASS}>
              {link.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
