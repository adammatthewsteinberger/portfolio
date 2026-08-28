import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Every content route is prerendered at build and nothing revalidates, so the
// read-only cache backed by the Worker's static assets is all we need — it is
// what serves /services/[slug], /novice-to-navigator/[slug], /blog/[slug],
// /work/[slug], and feed.xml (OpenNext reads prerendered dynamic-segment pages
// from the incremental cache, not from the assets directory). No R2 required.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
