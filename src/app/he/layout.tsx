import { localeAttrs } from '@/lib/locales';

/**
 * The Hebrew twin of /ministry. The root layout owns the only <html>, so the
 * language and direction go on this wrapper instead; everything inside, the
 * ministry pages and their prose, lays out right-to-left. The site header and
 * footer sit outside it and stay left-to-right.
 */
export default function HebrewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div {...localeAttrs('he')} className="font-hebrew">
      {children}
    </div>
  );
}
