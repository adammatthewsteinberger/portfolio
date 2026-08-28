import { describe, expect, it } from 'vitest';
import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import fs from 'node:fs';
import path from 'node:path';
import { metadata as home } from '@/app/page';
import { metadata as hireMe } from '@/app/hire-me/page';
import { metadata as story } from '@/app/story/page';
import { metadata as expertise } from '@/app/expertise/page';
import { metadata as work } from '@/app/work/page';
import { metadata as openSource } from '@/app/open-source/page';
import { metadata as writing } from '@/app/writing/page';
import { metadata as books } from '@/app/books/page';
import { metadata as noviceToNavigator } from '@/app/novice-to-navigator/page';
import { metadata as readiness } from '@/app/novice-to-navigator/readiness/page';
import { metadata as services } from '@/app/services/page';
import { metadata as contact } from '@/app/contact/page';
import { metadata as siteDirectory } from '@/app/site-directory/page';
import { metadata as chat } from '@/app/chat/page';
import { metadata as joinMe } from '@/app/join-me/page';
import { metadata as forExecutives } from '@/app/for-executives/page';
import { metadata as execWork } from '@/app/for-executives/work/page';
import { metadata as execEngage } from '@/app/for-executives/engage/page';
import { generateMetadata as serviceSlug } from '@/app/services/[slug]/page';
import { generateMetadata as articleSlug } from '@/app/novice-to-navigator/[slug]/page';
import { generateMetadata as execSlug } from '@/app/for-executives/work/[slug]/page';

// Next does not deep-merge `openGraph`: any page that defines the block must
// carry the site-wide social card itself, or it ships with no image at all.
const pages: [string, Metadata][] = [
  ['/', home], ['/hire-me', hireMe], ['/story', story], ['/expertise', expertise], ['/work', work],
  ['/open-source', openSource], ['/writing', writing], ['/books', books], ['/novice-to-navigator', noviceToNavigator],
  ['/novice-to-navigator/readiness', readiness], ['/services', services], ['/contact', contact],
  ['/site-directory', siteDirectory], ['/chat', chat], ['/join-me', joinMe], ['/for-executives', forExecutives],
  ['/for-executives/work', execWork], ['/for-executives/engage', execEngage],
];

const images = (meta: Metadata) => JSON.stringify(meta.openGraph?.images ?? []);

describe('social card on every page', () => {
  it.each(pages)('%s carries the generated site-wide card', (_route, meta) => {
    expect(images(meta)).toContain(OG_IMAGE);
  });

  it('dynamic content routes without their own image route carry it too', async () => {
    const params = (slug: string) => ({ params: Promise.resolve({ slug }) });
    expect(images(await serviceSlug(params('custom-chatbots')))).toContain(OG_IMAGE);
    expect(images(await articleSlug(params('what-is-ai-really')))).toContain(OG_IMAGE);
    expect(images(await execSlug(params('ai-governance-gateway')))).toContain(OG_IMAGE);
  });

  it('the root layout carries the card too (read from source: it imports globals.css)', () => {
    const layout = fs.readFileSync(path.join(process.cwd(), 'src/app/layout.tsx'), 'utf8');
    expect(layout).toMatch(/images: \[OG_IMAGE\]/);
    expect(layout).not.toMatch(/og-home\.png/);
  });

  it('no page references the retired static PNGs', () => {
    for (const [, meta] of pages) {
      expect(JSON.stringify(meta)).not.toMatch(/og-home\.png|social-preview\.png/);
    }
  });
});
