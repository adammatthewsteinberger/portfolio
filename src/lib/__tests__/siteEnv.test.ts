import { afterEach, describe, expect, it, vi } from 'vitest';
import { isPreview, siteEnv } from '../siteEnv';

describe('siteEnv', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('is production unless SITE_ENV is exactly "preview"', () => {
    expect(siteEnv(undefined)).toBe('production');
    expect(siteEnv('')).toBe('production');
    expect(siteEnv('staging')).toBe('production');
    expect(siteEnv('preview')).toBe('preview');
    expect(isPreview('preview')).toBe(true);
    expect(isPreview('production')).toBe(false);
  });

  it('reads process.env.SITE_ENV by default', () => {
    vi.stubEnv('SITE_ENV', 'preview');
    expect(isPreview()).toBe(true);
    vi.stubEnv('SITE_ENV', '');
    expect(isPreview()).toBe(false);
  });
});
