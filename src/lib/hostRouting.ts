/**
 * Host-based routing for the Cloudflare Worker (see worker-entry.ts).
 *
 * The same rules exist in next.config.ts for `next start` and tests, but the
 * OpenNext router does not honour host-conditioned rewrites or regex sources,
 * so the Worker applies them before handing the request to Next. Pure and
 * unit-tested; nothing here touches the runtime.
 */
export const HIRE_HOST = 'vibewithadam.matthewsteinberger.com';
export const CHAT_HOST = 'chatwithadam.matthewsteinberger.com';

/**
 * Deprecated hosts, each permanently forwarded (path and query preserved).
 * hire.adam.* was the site's home until 2026-08-28; chat.adam.* was the chat's.
 */
export const LEGACY_HOSTS: Record<string, string> = {
  'hire.adam.matthewsteinberger.com': HIRE_HOST,
  'www.hire.adam.matthewsteinberger.com': HIRE_HOST,
  'chat.adam.matthewsteinberger.com': CHAT_HOST,
  'matthewsteinberger.com': HIRE_HOST,
  'www.matthewsteinberger.com': HIRE_HOST,
  [`www.${HIRE_HOST}`]: HIRE_HOST,
};

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

  const target = LEGACY_HOSTS[host];
  if (target) {
    // /chat on the old chat host is the new chat root — skip the second hop.
    const newPath = target === CHAT_HOST && path === '/chat' ? '/' : path;
    return { kind: 'redirect', status: 301, location: `https://${target}${newPath}${url.search}` };
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
