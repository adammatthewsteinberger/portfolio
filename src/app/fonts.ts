import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Type system. Body stays Inter; the display and mono faces are the same
 * Rajdhani + Share Tech Mono the OG images and the LinkedIn/GitHub banners
 * use (SIL OFL, vendored under src/app/_og/fonts), so the site and its social
 * cards finally share one voice. All three are self-hosted by next/font — no
 * third-party font host, no layout shift.
 */
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

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
