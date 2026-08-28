/**
 * Which deployment this build is. Read at build time (the site is static), so
 * the preview Worker is built with SITE_ENV=preview: noindex, a banner, and no
 * analytics. Production leaves it unset.
 */
export type SiteEnv = 'production' | 'preview';

export function siteEnv(value: string | undefined = process.env.SITE_ENV): SiteEnv {
  return value === 'preview' ? 'preview' : 'production';
}

export function isPreview(value?: string | undefined): boolean {
  return siteEnv(value) === 'preview';
}
