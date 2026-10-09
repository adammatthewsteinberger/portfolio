/**
 * RSS 2.0 builder for the essays and ministry feeds. (The blog's own feed at
 * /feed.xml predates this and keeps its inline copy.) Pure string building, so
 * the route handlers that call it stay thin and the logic is unit-tested.
 */
export interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  author: string;
  categories?: string[];
}

export interface FeedChannel {
  title: string;
  description: string;
  /** The human-facing page this feed belongs to. */
  link: string;
  /** This feed's own URL, for the atom:link rel=self. */
  selfLink: string;
  /** RSS language tag, e.g. "en-us" or "he". */
  language: string;
  items: FeedItem[];
  /** Injectable so tests are deterministic; defaults to now. */
  buildDate?: Date;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderItem(item: FeedItem): string {
  const categories = (item.categories ?? [])
    .map((category) => `\n      <category>${escapeXml(category)}</category>`)
    .join('');

  return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>${categories}
      <author>${escapeXml(item.author)}</author>
    </item>`;
}

export function buildRss(channel: FeedChannel): string {
  const buildDate = channel.buildDate ?? new Date();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${channel.link}</link>
    <atom:link href="${channel.selfLink}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(channel.description)}</description>
    <language>${channel.language}</language>
    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
${channel.items.map(renderItem).join('\n')}
  </channel>
</rss>`;
}
