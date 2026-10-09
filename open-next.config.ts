import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';
import type { IncrementalCache } from '@opennextjs/aws/types/overrides.js';
import { toCacheFileKey } from './src/lib/routeCacheKey';

// Every content route is prerendered at build and nothing revalidates, so the
// read-only cache backed by the Worker's static assets is all we need — it is
// what serves /services/[slug], /novice-to-navigator/[slug], /blog/[slug],
// /work/[slug], /essays/[slug], and the feeds (OpenNext reads prerendered
// dynamic-segment pages from the incremental cache, not from the assets
// directory). No R2 required.
//
// Next 16.3 asks the cache for /route-cache/<kind>/<hash>/$/<path>, but OpenNext
// still writes the files by plain path, so without the key mapping below every
// lookup misses (see src/lib/routeCacheKey.ts). Only `get` needs it: `set` and
// `delete` are no-ops on a read-only cache. The name must stay the base cache's:
// the populate step switches on it to copy the cache into the assets directory.
const incrementalCache: IncrementalCache = {
  name: staticAssetsIncrementalCache.name,
  get: (key, cacheType) => staticAssetsIncrementalCache.get(toCacheFileKey(key), cacheType),
  set: (key, value, cacheType) => staticAssetsIncrementalCache.set(key, value, cacheType),
  delete: () => staticAssetsIncrementalCache.delete(),
};

export default defineCloudflareConfig({ incrementalCache });
