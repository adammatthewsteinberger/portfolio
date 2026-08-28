import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Metadata } from 'next';

import { metadata as home } from '@/app/page';
import { metadata as hireMe } from '@/app/hire-me/page';
import { metadata as story } from '@/app/story/page';
import { metadata as expertise } from '@/app/expertise/page';
import { metadata as work } from '@/app/work/page';
import { metadata as openSource } from '@/app/open-source/page';
import { metadata as writing } from '@/app/writing/page';
import { metadata as books } from '@/app/books/page';
import { metadata as blog } from '@/app/blog/page';
import { metadata as noviceToNavigator } from '@/app/novice-to-navigator/page';
import { metadata as readiness } from '@/app/novice-to-navigator/readiness/page';
import { metadata as services } from '@/app/services/page';
import { metadata as contact } from '@/app/contact/page';
import { metadata as privacy } from '@/app/privacy/page';
import { metadata as siteDirectory } from '@/app/site-directory/page';
import { generateMetadata as workSlugMetadata } from '@/app/work/[slug]/page';
import { metadata as forExecutives } from '@/app/for-executives/page';
import { metadata as joinMe } from '@/app/join-me/page';
import { metadata as execWork } from '@/app/for-executives/work/page';
import { metadata as execEngage } from '@/app/for-executives/engage/page';
import { generateMetadata as execSlugMetadata } from '@/app/for-executives/work/[slug]/page';

// Regression guard for a real bug: the root layout used to set
// `alternates.canonical: '/'`, and Next.js does not deep-merge `alternates`,
// so every page that didn't override it told crawlers it *was* the homepage.
// Now every route sets its own canonical and the layout sets none.
const staticPages: [string, Metadata][] = [
  ['/', home],
  ['/hire-me', hireMe],
  ['/story', story],
  ['/expertise', expertise],
  ['/work', work],
  ['/open-source', openSource],
  ['/writing', writing],
  ['/books', books],
  ['/blog', blog],
  ['/novice-to-navigator', noviceToNavigator],
  ['/novice-to-navigator/readiness', readiness],
  ['/services', services],
  ['/contact', contact],
  ['/privacy', privacy],
  ['/site-directory', siteDirectory],
  ['/join-me', joinMe],
  ['/for-executives', forExecutives],
  ['/for-executives/work', execWork],
  ['/for-executives/engage', execEngage],
];

describe('canonical URLs', () => {
  it.each(staticPages)('%s canonicalizes to itself', (route, meta) => {
    expect(meta.alternates?.canonical).toBe(route);
  });

  it('case studies canonicalize to their own slug', async () => {
    const meta = await workSlugMetadata({ params: Promise.resolve({ slug: 'ai-governance-gateway' }) });
    expect(meta.alternates?.canonical).toBe('/work/ai-governance-gateway');
  });

  it('exec case studies canonicalize to their own exec URL, and unknown slugs get no canonical', async () => {
    const meta = await execSlugMetadata({ params: Promise.resolve({ slug: 'ai-governance-gateway' }) });
    expect(meta.alternates?.canonical).toBe('/for-executives/work/ai-governance-gateway');
    const missing = await execSlugMetadata({ params: Promise.resolve({ slug: 'lima-one-microservices-suite' }) });
    expect(missing.alternates).toBeUndefined();
  });

  it('the root layout no longer declares a canonical for children to inherit', () => {
    const layout = fs.readFileSync(path.join(process.cwd(), 'src/app/layout.tsx'), 'utf8');
    expect(layout).not.toMatch(/canonical:/);
  });
});
