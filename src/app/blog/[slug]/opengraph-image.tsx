import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/lib/blogUtils';

// Uses fs-backed content utilities (getBlogPostBySlug/getProjectBySlug), so
// this stays on the default Node.js runtime rather than edge.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const title = post?.title ?? 'Adam Matthew Steinberger';
  const category = post?.category ?? 'Writing';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #161a26 0%, #1e2436 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '8px 20px',
            borderRadius: 999,
            background: 'rgba(96, 165, 250, 0.15)',
            border: '1px solid rgba(96, 165, 250, 0.4)',
            color: '#93c5fd',
            fontSize: 24,
            fontWeight: 600,
            alignSelf: 'flex-start',
          }}
        >
          {category}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 48 : 58,
            fontWeight: 700,
            color: '#e6e9f0',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#9aa3b8' }}>
          Adam Matthew Steinberger — hire.adam.matthewsteinberger.com
        </div>
      </div>
    ),
    { ...size }
  );
}
