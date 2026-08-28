import { getAllBlogPosts } from '@/lib/blogUtils';

// Generated at build (reads Markdown with fs); served as a static asset on Workers.
export const dynamic = 'force-static';

const DOMAIN = 'https://hire.adam.matthewsteinberger.com';
const SITE_TITLE = 'Adam Matthew Steinberger — Writing';
const SITE_DESCRIPTION =
  'AI, automation, and software architecture — written by Adam Matthew Steinberger, Staff Software Architect & AI Automation Engineer.';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const posts = getAllBlogPosts().slice(0, 40);

  const items = posts
    .map((post) => {
      const url = `${DOMAIN}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedDate).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(post.author)}</author>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${DOMAIN}/writing</link>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
