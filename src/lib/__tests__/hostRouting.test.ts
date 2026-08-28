import { describe, expect, it } from 'vitest';
import { CHAT_HOST, HIRE_HOST, LEGACY_HOSTS, routeByHost } from '../hostRouting';

const at = (host: string, path = '/') => routeByHost(new URL(`https://${host}${path}`));

describe('routeByHost', () => {
  it('sends the legacy apex/www hosts to the hire host, path and query preserved', () => {
    for (const host of LEGACY_HOSTS) {
      expect(at(host, '/story?x=1')).toEqual({ kind: 'redirect', status: 301, location: `https://${HIRE_HOST}/story?x=1` });
    }
    expect(at('WWW.MATTHEWSTEINBERGER.COM')).toEqual({ kind: 'redirect', status: 301, location: `https://${HIRE_HOST}/` });
  });

  it('serves the chat page at the chat root and canonicalizes /chat there', () => {
    expect(at(CHAT_HOST, '/')).toEqual({ kind: 'rewrite', pathname: '/chat' });
    expect(at(CHAT_HOST, '/chat')).toEqual({ kind: 'redirect', status: 308, location: `https://${CHAT_HOST}/` });
  });

  it('keeps API, Next internals, and file assets on the chat host, and sends pages to the hire host', () => {
    for (const path of ['/api/ask', '/_next/static/chunks/app.js', '/favicon.ico', '/robots.txt', '/images/profile-picture.jpg']) {
      expect(at(CHAT_HOST, path)).toEqual({ kind: 'pass' });
    }
    expect(at(CHAT_HOST, '/story')).toEqual({ kind: 'redirect', status: 308, location: `https://${HIRE_HOST}/story` });
    expect(at(CHAT_HOST, '/work/x?y=2')).toEqual({ kind: 'redirect', status: 308, location: `https://${HIRE_HOST}/work/x?y=2` });
  });

  it('prefers the Host header over the URL host and ignores a port', () => {
    expect(routeByHost(new URL('http://localhost:8788/'), `${CHAT_HOST}:443`)).toEqual({ kind: 'rewrite', pathname: '/chat' });
    expect(routeByHost(new URL('http://localhost:8788/hire-me'), null)).toEqual({ kind: 'pass' });
  });

  it('moves /chat on the hire host to the chat host and leaves everything else alone', () => {
    expect(at(HIRE_HOST, '/chat')).toEqual({ kind: 'redirect', status: 308, location: `https://${CHAT_HOST}/` });
    expect(at(HIRE_HOST, '/hire-me')).toEqual({ kind: 'pass' });
    expect(at('localhost', '/chat')).toEqual({ kind: 'pass' });
    expect(at('preview.workers.dev', '/')).toEqual({ kind: 'pass' });
  });
});
