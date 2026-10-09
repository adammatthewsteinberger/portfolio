import { describe, it, expect } from 'vitest';
import {
  DEFAULT_LOCALE,
  LOCALES,
  isRtl,
  localeAlternates,
  localeAttrs,
  localePath,
} from '../locales';

describe('locales', () => {
  it('is English-first', () => {
    expect(LOCALES).toEqual(['en', 'he']);
    expect(DEFAULT_LOCALE).toBe('en');
  });

  it('marks only Hebrew as right-to-left', () => {
    expect(isRtl('he')).toBe(true);
    expect(isRtl('en')).toBe(false);
  });

  it('builds lang and dir attributes', () => {
    expect(localeAttrs('he')).toEqual({ lang: 'he', dir: 'rtl' });
    expect(localeAttrs('en')).toEqual({ lang: 'en', dir: 'ltr' });
  });

  describe('localePath', () => {
    it('leaves English paths un-prefixed', () => {
      expect(localePath('en', '/ministry/atonement')).toBe('/ministry/atonement');
    });

    it('prefixes Hebrew paths with /he', () => {
      expect(localePath('he', '/ministry/atonement')).toBe('/he/ministry/atonement');
    });

    it('maps the site root to /he rather than /he/', () => {
      expect(localePath('he', '/')).toBe('/he');
    });
  });

  describe('localeAlternates', () => {
    it('lists both languages and points x-default at English', () => {
      expect(localeAlternates('/ministry/x', { en: '/ministry/x', he: '/he/ministry/x' })).toEqual({
        canonical: '/ministry/x',
        languages: { en: '/ministry/x', he: '/he/ministry/x', 'x-default': '/ministry/x' },
      });
    });

    it('works for a Hebrew page whose canonical is its own path', () => {
      expect(
        localeAlternates('/he/ministry/x', { en: '/ministry/x', he: '/he/ministry/x' }).canonical
      ).toBe('/he/ministry/x');
    });

    it('omits languages a page does not exist in, and x-default without English', () => {
      expect(localeAlternates('/ministry/x', { en: '/ministry/x' }).languages).toEqual({
        en: '/ministry/x',
        'x-default': '/ministry/x',
      });
      expect(localeAlternates('/he/ministry/x', { he: '/he/ministry/x' }).languages).toEqual({
        he: '/he/ministry/x',
      });
    });

    it('returns no languages at all for a page with no translations listed', () => {
      expect(localeAlternates('/ministry', {})).toEqual({ canonical: '/ministry', languages: {} });
    });
  });
});
