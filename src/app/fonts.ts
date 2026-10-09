import { Heebo, Inter } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Type system. Body stays Inter; the display and mono faces are the same
 * Rajdhani + Share Tech Mono the OG images and the LinkedIn/GitHub banners
 * use (SIL OFL, vendored under src/app/_og/fonts), so the site and its social
 * cards finally share one voice. All three are self-hosted by next/font — no
 * third-party font host, no layout shift.
 */
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

/**
 * Hebrew face for the /he twin of /ministry. The Hebrew subset is its own
 * unicode-range file, so English pages never download it, and preload is off so
 * they do not even hint at it; only pages that render Hebrew glyphs fetch it.
 */
export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
  preload: false,
});

export const rajdhani = localFont({
  src: './_og/fonts/Rajdhani-Bold.ttf',
  weight: '700',
  variable: '--font-rajdhani',
  display: 'swap',
});

export const shareTechMono = localFont({
  src: './_og/fonts/ShareTechMono-Regular.ttf',
  weight: '400',
  variable: '--font-share-tech-mono',
  display: 'swap',
});
