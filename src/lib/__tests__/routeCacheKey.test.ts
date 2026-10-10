import { describe, it, expect } from 'vitest';
import { getRouteCacheKey } from 'next/dist/server/lib/route-cache-key';
import { toCacheFileKey } from '../routeCacheKey';

// RouteKind is an ambient const enum, which isolatedModules forbids using as a
// value, so build the owner through the function's own parameter type. The kind
// strings are the enum's real values.
type Owner = Parameters<typeof getRouteCacheKey>[1];
const owner = (kind: 'APP_PAGE' | 'APP_ROUTE', sourceRoute: string) =>
  ({ kind, sourceRoute }) as unknown as Owner;

const HASH = 'a'.repeat(64);

describe('toCacheFileKey', () => {
  it('strips the route-cache prefix from a page key', () => {
    expect(toCacheFileKey(`/route-cache/APP_PAGE/${HASH}/$/blog/agent-benchmarks`)).toBe('/blog/agent-benchmarks');
  });

  it('strips it from a route handler key', () => {
    expect(toCacheFileKey(`/route-cache/APP_ROUTE/${HASH}/$/feed.xml`)).toBe('/feed.xml');
  });

  it('leaves keys that have no prefix alone', () => {
    expect(toCacheFileKey('/blog/agent-benchmarks')).toBe('/blog/agent-benchmarks');
    expect(toCacheFileKey('blog/agent-benchmarks')).toBe('blog/agent-benchmarks');
    expect(toCacheFileKey('some-fetch-cache-key')).toBe('some-fetch-cache-key');
  });

  it('only strips the prefix at the start of the key', () => {
    const key = `/blog/route-cache/APP_PAGE/${HASH}/$/x`;
    expect(toCacheFileKey(key)).toBe(key);
  });

  it('does not strip something that is not a 64-character hash', () => {
    const key = '/route-cache/APP_PAGE/abc123/$/blog/x';
    expect(toCacheFileKey(key)).toBe(key);
  });
});

// The reason this module exists is that Next's key format changed under the
// OpenNext adapter without anything failing loudly. These tests build keys with
// Next's own function, so a future change to the format fails here, on the
// dependency-bump PR, instead of silently emptying the live site.
describe('against the keys the installed Next actually produces', () => {
  const pageOwner = owner('APP_PAGE', '/blog/[slug]/page');
  const routeOwner = owner('APP_ROUTE', '/feed.xml/route');

  it.each([
    ['/blog/agent-benchmarks', pageOwner, '/blog/agent-benchmarks'],
    ['/essays/welcome', pageOwner, '/essays/welcome'],
    // Next normalizes the site root to /index; OpenNext writes index.cache.
    ['/', pageOwner, '/index'],
    ['/feed.xml', routeOwner, '/feed.xml'],
    ['/sitemap.xml', routeOwner, '/sitemap.xml'],
  ])('maps the key for %s to the file name OpenNext writes', (pathname, owner, expected) => {
    const key = getRouteCacheKey(pathname, owner);

    expect(key).toMatch(/^\/route-cache\//);
    expect(toCacheFileKey(key)).toBe(expected);
  });
});
