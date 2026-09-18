import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config';

const CHAT_HOST = 'chatwithadam.matthewsteinberger.com';
const SITE_HOST = 'vibewithadam.matthewsteinberger.com';
const onChatHost = [{ type: 'host', value: CHAT_HOST }];
const onSiteHost = [{ type: 'host', value: SITE_HOST }];

describe('next.config host-aware routing for the chat subdomain', () => {
  it('rewrites the chat-host root to /chat before the filesystem', async () => {
    const rewrites = await nextConfig.rewrites!();
    expect(rewrites).toEqual({
      beforeFiles: [{ source: '/', has: onChatHost, destination: '/chat' }],
    });
  });

  it('places the three host redirects first, in order', async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects.slice(0, 3)).toEqual([
      { source: '/chat', has: onChatHost, destination: `https://${CHAT_HOST}/`, permanent: true },
      {
        source: '/:path((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).+)',
        has: onChatHost,
        destination: `https://${SITE_HOST}/:path`,
        permanent: true,
      },
      { source: '/chat', has: onSiteHost, destination: `https://${CHAT_HOST}/`, permanent: true },
    ]);
  });

  it('keeps /api/*, /_next/* and asset paths out of the chat-host catch-all', async () => {
    const [, catchAll] = await nextConfig.redirects!();
    const pattern = new RegExp(`^/${catchAll.source.slice('/:path('.length, -1)}$`);
    for (const served of ['/api/ask', '/_next/static/chunks/app.js', '/favicon.ico', '/robots.txt', '/images/profile-picture.jpg', '/site.webmanifest']) {
      expect(served).not.toMatch(pattern);
    }
    for (const redirected of ['/story', '/work/self-hosted-rag-chatbot', '/hire-me', '/blog/some-post']) {
      expect(redirected).toMatch(pattern);
    }
  });

  it('never redirects /chat without a host condition', async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects.filter((rule) => rule.source === '/chat' && !rule.has)).toHaveLength(0);
  });
});

describe('next.config redirects for the pages retired with the looking-for-work copy', () => {
  const find = async (source: string) => (await nextConfig.redirects!()).find((rule) => rule.source === source && !rule.has);

  it('sends /hire-me to /join-me, permanently', async () => {
    expect(await find('/hire-me')).toEqual({ source: '/hire-me', destination: '/join-me', permanent: true });
  });

  it('sends every executive-edition page to the page it mirrored', async () => {
    expect((await find('/for-executives'))?.destination).toBe('/');
    expect((await find('/for-executives/work'))?.destination).toBe('/work');
    expect((await find('/for-executives/work/:slug'))?.destination).toBe('/work/:slug');
    expect((await find('/for-executives/engage'))?.destination).toBe('/contact');
  });

  it('sends the consulting catalogue and its legacy aliases home, with no chains', async () => {
    const redirects = await nextConfig.redirects!();
    expect((await find('/services'))?.destination).toBe('/');
    expect((await find('/services/:slug'))?.destination).toBe('/');
    for (const legacy of ['/ai-greenville', '/ai-greenville.html', '/ai-consulting', '/custom-chatbots.html', '/ai-developer-near-me']) {
      expect((await find(legacy))?.destination, legacy).toBe('/');
    }
    for (const rule of redirects) {
      expect(rule.permanent, rule.source).toBe(true);
      // No redirect points at a page that is itself redirected.
      expect(rule.destination, rule.source).not.toMatch(/^\/(hire-me|for-executives|services)(\/|$)/);
    }
  });

  it('sends the retired job-change post to the story, not to a hiring page', async () => {
    expect((await find('/blog/why-im-leaving-a-job-i-liked'))?.destination).toBe('/story');
  });
});
