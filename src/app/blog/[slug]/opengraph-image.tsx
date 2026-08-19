import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/lib/blogUtils';
import { CyberFrame, CyberTitle, OG_SIZE, loadOgFonts } from '@/app/_og/CyberFrame';

// Uses fs-backed content utilities (getBlogPostBySlug/getProjectBySlug), so
// this stays on the default Node.js runtime rather than edge.
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const title = post?.title ?? 'Adam Matthew Steinberger';
  const category = post?.category ?? 'Writing';

  return new ImageResponse(
    (
      <CyberFrame kicker={`WRITING :: ${category}`}>
        <CyberTitle title={title} size={title.length > 60 ? 58 : 72} />
      </CyberFrame>
    ),
    { ...size, fonts: await loadOgFonts() }
  );
}
