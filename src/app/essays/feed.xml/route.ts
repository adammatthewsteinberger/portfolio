import { getAllCollectionEntries } from '@/lib/collectionUtils';
import { buildRss } from '@/lib/rss';
import { ESSAYS_DIR, ESSAYS_FEED_PATH, ESSAYS_PATH, essaysSection } from '@/data/essays';

// Generated at build (reads Markdown with fs); served as a static asset on Workers.
export const dynamic = 'force-static';

const DOMAIN = 'https://vibewithadam.matthewsteinberger.com';

export function GET() {
  // No cap: the essays share one publication date, so "newest N" would really be
  // "first N by title" and drop essays arbitrarily. Items are only a title and a
  // description, so the whole collection is small.
  const items = getAllCollectionEntries(ESSAYS_DIR).map((essay) => ({
    title: essay.title,
    link: `${DOMAIN}${ESSAYS_PATH}/${essay.slug}`,
    description: essay.description,
    pubDate: new Date(essay.publishedDate),
    author: essay.author,
    categories: essay.tags,
  }));

  const xml = buildRss({
    title: 'Adam Matthew Steinberger — Essays',
    description: essaysSection.description,
    link: `${DOMAIN}${ESSAYS_PATH}`,
    selfLink: `${DOMAIN}${ESSAYS_FEED_PATH}`,
    language: 'en-us',
    items,
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
