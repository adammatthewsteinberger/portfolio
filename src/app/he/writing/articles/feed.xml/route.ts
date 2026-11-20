import { getAllCollectionEntries } from '@/lib/collectionUtils';
import { buildRss } from '@/lib/rss';
import { WRITING_ARTICLES_HE_DIR, WRITING_ARTICLES_HE_FEED_PATH, WRITING_ARTICLES_HE_PATH, writingArticlesHe } from '@/data/writingArticles';

// Generated at build (reads Markdown with fs); served as a static asset on Workers.
export const dynamic = 'force-static';

const DOMAIN = 'https://vibewithadam.matthewsteinberger.com';

export function GET() {
  // No cap: items are only a title and a description, and a "newest N" cut
  // would drop articles that share a date arbitrarily.
  const items = getAllCollectionEntries(WRITING_ARTICLES_HE_DIR).map((article) => ({
    title: article.title,
    link: `${DOMAIN}${WRITING_ARTICLES_HE_PATH}/${article.slug}`,
    description: article.description,
    pubDate: new Date(article.publishedDate),
    author: article.author,
    categories: article.tags,
  }));

  const xml = buildRss({
    title: 'Adam Matthew Steinberger — מאמרים',
    description: writingArticlesHe.description,
    link: `${DOMAIN}${WRITING_ARTICLES_HE_PATH}`,
    selfLink: `${DOMAIN}${WRITING_ARTICLES_HE_FEED_PATH}`,
    language: 'he',
    items,
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
