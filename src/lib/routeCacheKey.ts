/**
 * Bridges two cache key formats.
 *
 * Next 16.3 keys its response cache as
 *   /route-cache/<KIND>/<sha256 of the source route>/$<pathname>
 * (see next/dist/server/lib/route-cache-key.js). OpenNext's build, however,
 * writes the prerendered cache files by plain pathname (blog/agent-benchmarks.cache,
 * index.cache, feed.xml.cache), and its static-assets incremental cache looks them
 * up by whatever key Next hands it. With the new prefix every lookup missed, so no
 * prerendered page was ever served from the cache. Pages then rendered on demand on
 * a Worker with no filesystem: Markdown-backed routes 404ed, and the blog index,
 * feed, and sitemap came back empty, all with a 200.
 *
 * The hash is of the route's source module and the kind is the route type; both are
 * irrelevant to a read-only cache holding exactly one build, so they are dropped.
 * Keys without the prefix (and fetch-cache keys) pass through unchanged.
 */
const ROUTE_CACHE_PREFIX = /^\/route-cache\/[A-Z_]+\/[0-9a-f]{64}\/\$(?=\/)/;

export function toCacheFileKey(key: string): string {
  return key.replace(ROUTE_CACHE_PREFIX, '');
}
