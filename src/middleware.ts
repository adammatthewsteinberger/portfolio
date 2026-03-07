import { NextRequest, NextResponse } from 'next/server';

const NOINDEX_PATHS = ['/letter-to-the-press', '/docs/letter-to-the-press.pdf'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldBlock = NOINDEX_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  if (shouldBlock) {
    const response = NextResponse.next();
    response.headers.set(
      'X-Robots-Tag',
      'noindex, nofollow, noarchive, nosnippet, noodp'
    );
    return response;
  }
}

export const config = {
  matcher: ['/letter-to-the-press/:path*', '/docs/letter-to-the-press.pdf'],
};
