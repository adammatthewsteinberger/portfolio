import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config';

const CHAT_HOST = 'chat.adam.matthewsteinberger.com';
const HIRE_HOST = 'hire.adam.matthewsteinberger.com';
const onChatHost = [{ type: 'host', value: CHAT_HOST }];
const onHireHost = [{ type: 'host', value: HIRE_HOST }];

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
        destination: `https://${HIRE_HOST}/:path`,
        permanent: true,
      },
      { source: '/chat', has: onHireHost, destination: `https://${CHAT_HOST}/`, permanent: true },
    ]);
  });

  it('keeps /api/*, /_next/* and asset paths out of the chat-host catch-all', async () => {
    const [, catchAll] = await nextConfig.redirects!();
    const pattern = new RegExp(`^/${catchAll.source.slice('/:path('.length, -1)}$`);
    for (const served of ['/api/ask', '/_next/static/chunks/app.js', '/favicon.ico', '/robots.txt', '/images/profile-picture.jpg', '/font-awesome.min.css']) {
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
