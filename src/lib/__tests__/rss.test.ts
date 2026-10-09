import { describe, it, expect } from 'vitest';
import { buildRss, escapeXml } from '../rss';

const BUILD_DATE = new Date('2026-01-02T03:04:05Z');

const channel = {
  title: 'A & B <Feed>',
  description: 'It\'s "quoted"',
  link: 'https://example.com/essays',
  selfLink: 'https://example.com/essays/feed.xml',
  language: 'en-us',
  buildDate: BUILD_DATE,
  items: [
    {
      title: 'First & Foremost',
      link: 'https://example.com/essays/first',
      description: 'About <things>',
      pubDate: new Date('2025-10-29T00:00:00Z'),
      author: 'Someone',
      categories: ['faith', 'a&b'],
    },
    {
      title: 'No Categories',
      link: 'https://example.com/essays/second',
      description: 'Plain',
      pubDate: new Date('2025-10-28T00:00:00Z'),
      author: 'Someone',
    },
  ],
};

describe('escapeXml', () => {
  it('escapes all five XML special characters', () => {
    expect(escapeXml(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&apos;');
  });

  it('leaves plain text alone', () => {
    expect(escapeXml('plain text')).toBe('plain text');
  });
});

describe('buildRss', () => {
  const xml = buildRss(channel);

  it('is an RSS 2.0 document with an atom self link', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
    expect(xml).toContain('<atom:link href="https://example.com/essays/feed.xml" rel="self" type="application/rss+xml" />');
  });

  it('escapes channel text and states language and build date', () => {
    expect(xml).toContain('<title>A &amp; B &lt;Feed&gt;</title>');
    expect(xml).toContain('<description>It&apos;s &quot;quoted&quot;</description>');
    expect(xml).toContain('<language>en-us</language>');
    expect(xml).toContain(`<lastBuildDate>${BUILD_DATE.toUTCString()}</lastBuildDate>`);
  });

  it('renders each item with an escaped title, a permalink guid, and a UTC date', () => {
    expect(xml).toContain('<title>First &amp; Foremost</title>');
    expect(xml).toContain('<guid isPermaLink="true">https://example.com/essays/first</guid>');
    expect(xml).toContain('<description>About &lt;things&gt;</description>');
    expect(xml).toContain(`<pubDate>${new Date('2025-10-29T00:00:00Z').toUTCString()}</pubDate>`);
  });

  it('renders one escaped category element per category, and none when there are none', () => {
    expect(xml).toContain('<category>faith</category>');
    expect(xml).toContain('<category>a&amp;b</category>');
    expect(xml.match(/<category>/g)).toHaveLength(2);
  });

  it('defaults the build date to now', () => {
    const { buildDate: _omit, ...rest } = channel;
    void _omit;
    const before = Date.now();
    const built = buildRss(rest);
    const stamp = built.match(/<lastBuildDate>(.*)<\/lastBuildDate>/)?.[1] ?? '';

    expect(Date.parse(stamp)).toBeGreaterThanOrEqual(Math.floor(before / 1000) * 1000);
  });

  it('builds a valid channel with no items', () => {
    expect(buildRss({ ...channel, items: [] })).toContain('</channel>');
  });
});
