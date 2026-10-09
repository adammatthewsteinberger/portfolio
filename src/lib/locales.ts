/**
 * Locale helpers for the Hebrew twin of /ministry. The site is English-first
 * and un-prefixed; Hebrew lives under /he. There is deliberately no site-wide
 * i18n framework: only the ministry section has a second language.
 */
export const LOCALES = ['en', 'he'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

const RTL_LOCALES: ReadonlySet<Locale> = new Set<Locale>(['he']);

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.has(locale);
}

/** The `lang` and `dir` attributes to put on a locale's wrapper element. */
export function localeAttrs(locale: Locale): { lang: Locale; dir: 'ltr' | 'rtl' } {
  return { lang: locale, dir: isRtl(locale) ? 'rtl' : 'ltr' };
}

/** "/ministry/x" -> "/he/ministry/x" for Hebrew, unchanged for English. */
export function localePath(locale: Locale, pathname: string): string {
  if (locale === DEFAULT_LOCALE) {
    return pathname;
  }
  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
}

/**
 * Next `alternates` for a page with an optional translation. Next does not
 * deep-merge `alternates`, so every page sets its own canonical here too (the
 * root layout must never declare one). Pass each locale's own path; x-default
 * points at English when it exists.
 */
export function localeAlternates(
  canonical: string,
  paths: Partial<Record<Locale, string>>
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    const target = paths[locale];
    if (target) {
      languages[locale] = target;
    }
  }
  if (paths.en) {
    languages['x-default'] = paths.en;
  }

  return { canonical, languages };
}
