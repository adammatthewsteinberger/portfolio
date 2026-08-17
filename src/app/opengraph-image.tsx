import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Adam Matthew Steinberger — Staff Software Architect & AI Automation Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #161a26 0%, #1e2436 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
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
            }}
          >
            Available September 2026
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            color: '#e6e9f0',
            marginBottom: 16,
          }}
        >
          Adam Matthew Steinberger
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            fontWeight: 600,
            backgroundImage: 'linear-gradient(90deg, #60a5fa, #34d399)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 28,
          }}
        >
          Staff Software Architect &amp; AI Automation Engineer
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#9aa3b8', maxWidth: 900 }}>
          Gifted, autistic, in Greenville, SC — RAG systems, event-driven microservices, and
          automation pipelines.
        </div>
      </div>
    ),
    { ...size }
  );
}
