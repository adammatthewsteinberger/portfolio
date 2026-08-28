// Cloudflare Worker entry: host routing, then the OpenNext-built Next.js handler.
// Wrangler bundles this file (see wrangler.jsonc "main"). Run `npm run preview`
// or `npm run deploy` — both build .open-next first.
import openNext from './.open-next/worker.js';
import { routeByHost } from './src/lib/hostRouting';

export * from './.open-next/worker.js';

export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const route = routeByHost(url, request.headers.get('host'));
    if (route.kind === 'redirect') {
      return Response.redirect(route.location, route.status);
    }
    if (route.kind === 'rewrite') {
      // Present the rewritten path under a neutral host: next.config.ts carries the
      // same host rules for `next start`, and on the chat host they would bounce
      // /chat straight back to / — an infinite loop. Host routing is done here.
      url.pathname = route.pathname;
      const headers = new Headers(request.headers);
      headers.set('x-forwarded-host', url.host);
      headers.set('host', 'rewrite.internal');
      request = new Request(url.toString(), { method: request.method, headers, body: request.body, redirect: 'manual' });
    }
    return (openNext as { fetch: (r: Request, e: unknown, c: ExecutionContext) => Promise<Response> }).fetch(request, env, ctx);
  },
};
