import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/projectUtils';
import { CyberFrame, CyberTitle, OG_SIZE, loadOgFonts, og } from '@/app/_og/CyberFrame';

// Uses fs-backed content utilities (getBlogPostBySlug/getProjectBySlug), so
// this stays on the default Node.js runtime rather than edge.
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.heroTitle ?? project?.title ?? 'Case Study';
  const category = project?.category ?? 'Work';

  return new ImageResponse(
    (
      <CyberFrame kicker={`CASE STUDY :: ${category}`} kickerColor={og.green}>
        <CyberTitle title={title} size={title.length > 40 ? 60 : 74} />
      </CyberFrame>
    ),
    { ...size, fonts: await loadOgFonts() }
  );
}
