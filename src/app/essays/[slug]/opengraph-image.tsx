import { ImageResponse } from 'next/og';
import { getCollectionEntry } from '@/lib/collectionUtils';
import { ESSAYS_DIR } from '@/data/essays';
import { CyberFrame, CyberTitle, OG_SIZE, loadOgFonts } from '@/app/_og/CyberFrame';

// Reads Markdown with fs at build time, so this stays on the default Node.js
// runtime (see blog/[slug]/opengraph-image.tsx).
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getCollectionEntry(ESSAYS_DIR, slug);
  const title = essay?.title ?? 'Adam Matthew Steinberger';

  return new ImageResponse(
    (
      <CyberFrame kicker="ESSAYS">
        <CyberTitle title={title} size={title.length > 60 ? 58 : 72} />
      </CyberFrame>
    ),
    { ...size, fonts: await loadOgFonts() }
  );
}
