import Link from 'next/link';
import { LOCALES, type Locale } from '@/lib/locales';

// Each language names itself, in its own script, so it is findable by someone
// who cannot read the current page.
const LABELS: Record<Locale, string> = { en: 'English', he: 'עברית' };

interface LocaleSwitcherProps {
  current: Locale;
  /** The page's path in each language it exists in. */
  hrefs: Partial<Record<Locale, string>>;
}

/** EN / HE switch for a page that has a translation; renders nothing when it has none. */
export default function LocaleSwitcher({ current, hrefs }: LocaleSwitcherProps) {
  const links = LOCALES.flatMap((locale) => {
    const href = hrefs[locale];
    return href ? [{ locale, href }] : [];
  });

  if (links.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Language" className="flex gap-4 text-sm">
      {links.map(({ locale, href }) =>
        locale === current ? (
          <span
            key={locale}
            lang={locale}
            aria-current="true"
            className="font-semibold text-[var(--color-text-primary)]"
          >
            {LABELS[locale]}
          </span>
        ) : (
          <Link
            key={locale}
            href={href}
            lang={locale}
            hrefLang={locale}
            className="text-[var(--color-accent)] hover:underline"
          >
            {LABELS[locale]}
          </Link>
        )
      )}
    </nav>
  );
}
