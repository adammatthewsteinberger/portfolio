import { buildRss } from '@/lib/rss';
import { getWritingFeedItems } from '@/lib/writingFeed';

// Generated at build (reads Markdown with fs); served as a static asset on Workers.
export const dynamic = 'force-static';

const DOMAIN = 'https://vibewithadam.matthewsteinberger.com';

export function GET() {
  const xml = buildRss({
    title: 'Adam Matthew Steinberger — Writing',
    description:
      'Everything in the writing section: the engineering blog, essays, articles, and the Novice to Navigator series, by Adam Matthew Steinberger, Staff Software Architect & AI Automation Engineer.',
    link: `${DOMAIN}/writing`,
    selfLink: `${DOMAIN}/feed.xml`,
    language: 'en-us',
    items: getWritingFeedItems(),
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
