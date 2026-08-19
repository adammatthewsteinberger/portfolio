import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { ReactNode } from 'react';

/**
 * Shared cyberpunk frame for the dynamic Open Graph images (blog posts, case
 * studies). Satori (next/og) supports only a subset of CSS, so this uses
 * gradients, borders and absolutely-positioned divs — no filters or SVG.
 * The static home/social image (public/images/og-home.png) is the same design
 * rendered from SVG.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const FONT_DIR = path.join(process.cwd(), 'src', 'app', '_og', 'fonts');

/** Fonts for next/og (SIL OFL, vendored in ./fonts). Node runtime only. */
export async function loadOgFonts() {
  const [rajdhani, mono] = await Promise.all([
    readFile(path.join(FONT_DIR, 'Rajdhani-Bold.ttf')),
    readFile(path.join(FONT_DIR, 'ShareTechMono-Regular.ttf')),
  ]);
  return [
    { name: 'Rajdhani', data: rajdhani, weight: 700 as const, style: 'normal' as const },
    { name: 'ShareTechMono', data: mono, weight: 400 as const, style: 'normal' as const },
  ];
}

export const og = {
  bg: '#050611',
  cyan: '#00f0ff',
  magenta: '#ff2bd6',
  green: '#39ff14',
  greenText: '#7dff5c',
  text: '#eaf3ff',
  muted: '#a5b4d6',
};

const gridRows = [432, 441, 452, 466, 484, 506, 533, 566, 606];

/** Title block: Rajdhani headline with a neon glow + role line beneath. */
export function CyberTitle({ title, size }: { title: string; size: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Rajdhani',
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.05,
          color: og.text,
          textShadow: '0 0 24px rgba(0,240,255,0.55)',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', marginTop: 22, fontSize: 19, letterSpacing: 3, color: og.cyan }}>
        STAFF SOFTWARE ARCHITECT &amp; AI AUTOMATION ENGINEER
      </div>
    </div>
  );
}

export function CyberFrame({
  kicker,
  kickerColor = og.cyan,
  children,
}: {
  kicker: string;
  kickerColor?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'linear-gradient(180deg, #050611 0%, #0a0b24 55%, #160a2e 100%)',
        fontFamily: 'ShareTechMono',
        color: og.text,
      }}
    >
      {/* horizon glow */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1200,
          height: 630,
          background:
            'radial-gradient(circle at 50% 72%, rgba(255,43,214,0.42) 0%, rgba(122,43,255,0.22) 30%, rgba(0,240,255,0.05) 60%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* grid floor */}
      {gridRows.map((y, i) => (
        <div
          key={y}
          style={{
            position: 'absolute',
            left: 0,
            top: y,
            width: 1200,
            height: 0,
            borderTop: `1px solid rgba(255,43,214,${0.25 + i * 0.07})`,
          }}
        />
      ))}
      {/* horizon line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 419,
          width: 1200,
          height: 2,
          background: `linear-gradient(90deg, ${og.cyan}, ${og.magenta})`,
          opacity: 0.9,
        }}
      />
      {/* HUD brackets */}
      <div style={{ position: 'absolute', left: 60, top: 56, width: 24, height: 24, borderLeft: `2px solid ${og.cyan}`, borderTop: `2px solid ${og.cyan}` }} />
      <div style={{ position: 'absolute', right: 60, top: 56, width: 24, height: 24, borderRight: `2px solid ${og.cyan}`, borderTop: `2px solid ${og.cyan}` }} />
      <div style={{ position: 'absolute', left: 60, bottom: 56, width: 24, height: 24, borderLeft: `2px solid ${og.cyan}`, borderBottom: `2px solid ${og.cyan}` }} />
      <div style={{ position: 'absolute', right: 60, bottom: 56, width: 24, height: 24, borderRight: `2px solid ${og.cyan}`, borderBottom: `2px solid ${og.cyan}` }} />

      {/* content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '72px 96px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 15,
              letterSpacing: 3,
              color: kickerColor,
              textTransform: 'uppercase',
            }}
          >
            {`// ${kicker}`}
          </div>
          <div style={{ display: 'flex', fontSize: 15, letterSpacing: 3, color: og.magenta }}>
            STATUS: AVAILABLE_SEP_2026
          </div>
        </div>

        {children}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: 999,
              background: '#061a14',
              border: `1.5px solid ${og.green}`,
              color: og.greenText,
              fontSize: 18,
              letterSpacing: 1,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 999, background: og.green, marginRight: 12 }} />
            ADAM MATTHEW STEINBERGER · AVAILABLE SEPTEMBER 2026
          </div>
          <div style={{ display: 'flex', fontSize: 18, color: og.muted, letterSpacing: 1, whiteSpace: 'nowrap' }}>
            hire.adam.matthewsteinberger.com
          </div>
        </div>
      </div>
    </div>
  );
}
