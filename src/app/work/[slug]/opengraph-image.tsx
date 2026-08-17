import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/projectUtils';

// Uses fs-backed content utilities (getBlogPostBySlug/getProjectBySlug), so
// this stays on the default Node.js runtime rather than edge.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.heroTitle ?? project?.title ?? 'Case Study';
  const category = project?.category ?? 'Work';

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
            background: 'rgba(52, 211, 153, 0.15)',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            color: '#34d399',
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
            fontSize: title.length > 40 ? 50 : 60,
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
