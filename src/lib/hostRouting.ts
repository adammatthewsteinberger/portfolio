/**
 * Host-based routing for the Cloudflare Worker (see worker-entry.ts).
 *
 * The same rules exist in next.config.ts for `next start` and tests, but the
 * OpenNext router does not honour host-conditioned rewrites or regex sources,
 * so the Worker applies them before handing the request to Next. Pure and
 * unit-tested; nothing here touches the runtime.
 */
export const HIRE_HOST = 'hire.adam.matthewsteinberger.com';
export const CHAT_HOST = 'chat.adam.matthewsteinberger.com';

/** Hosts that exist only to send everything to the canonical hire host. */
export const LEGACY_HOSTS = ['matthewsteinberger.com', 'www.matthewsteinberger.com', `www.${HIRE_HOST}`];

export type HostRoute =
  | { kind: 'redirect'; location: string; status: 301 | 308 }
  | { kind: 'rewrite'; pathname: string }
  | { kind: 'pass' };

/** Paths on the chat host that must keep serving there (assets, API, files). */
const CHAT_PASSTHROUGH = /^\/(api\/|_next\/|.*\.[a-zA-Z0-9]+$)/;

/**
 * @param url  the request URL
 * @param hostHeader  the incoming Host header — authoritative on Workers (behind
 *   `wrangler dev` and some proxies `url.hostname` is the listener, not the site)
 */
export function routeByHost(url: URL, hostHeader?: string | null): HostRoute {
  const host = (hostHeader ?? url.hostname).split(':')[0].toLowerCase();
  const path = url.pathname;

  if (LEGACY_HOSTS.includes(host)) {
    return { kind: 'redirect', status: 301, location: `https://${HIRE_HOST}${path}${url.search}` };
  }

  if (host === CHAT_HOST) {
    if (path === '/') return { kind: 'rewrite', pathname: '/chat' };
    if (path === '/chat') return { kind: 'redirect', status: 308, location: `https://${CHAT_HOST}/` };
    if (CHAT_PASSTHROUGH.test(path)) return { kind: 'pass' };
    return { kind: 'redirect', status: 308, location: `https://${HIRE_HOST}${path}${url.search}` };
  }

  if (host === HIRE_HOST && path === '/chat') {
    return { kind: 'redirect', status: 308, location: `https://${CHAT_HOST}/` };
  }

  return { kind: 'pass' };
}
