import { ImageResponse } from 'next/og';
import { CyberFrame, CyberTitle, OG_SIZE, loadOgFonts } from '@/app/_og/CyberFrame';

// Site-wide Open Graph / social card, generated from the same CyberFrame as
// the per-post and per-case-study images so the host, role, and design can
// never drift from the site again (the old static PNG carried a retired URL).
// Routes with their own opengraph-image (blog, work) keep theirs.
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Adam Matthew Steinberger — Staff Software Architect & AI Automation Engineer';

export default async function Image() {
  return new ImageResponse(
    (
      <CyberFrame kicker="FOSS :: AUTONOMOUS SOFTWARE DELIVERY :: ENTERPRISE AI">
        <CyberTitle title="Adam Matthew Steinberger" size={78} />
      </CyberFrame>
    ),
    { ...size, fonts: await loadOgFonts() }
  );
}
