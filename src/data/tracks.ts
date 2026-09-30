/**
 * The site's three tracks, in priority order. The homepage's "Who This Is For"
 * cards, the header order, and the knowledge base follow this list.
 *
 * 1. Open-source developers — help build vibey (the primary audience).
 * 2. Teams with a fixed-scope project — freelance work (src/data/freelance.ts).
 * 3. Hiring teams — Staff+ and forward-deployed roles (/hire-me).
 *
 * Governments and military, and universities and academia, remain vibey's
 * audiences on /join-me (src/data/audiences.ts), under the developer track.
 * The site never names a target employer; the hiring card describes the work.
 */

import { audiences } from './audiences';
import { FREELANCE_SUMMARY } from './freelance';

export type TrackId = 'contributors' | 'clients' | 'employers';

export interface Track {
  id: TrackId;
  title: string;
  summary: string;
  href: string;
  cta: string;
}

const developers = audiences[0];

export const tracks: Track[] = [
  {
    id: 'contributors',
    title: 'Open-source developers',
    summary: developers.summary,
    href: developers.href,
    cta: developers.cta,
  },
  {
    id: 'clients',
    title: 'Teams with a project',
    summary: FREELANCE_SUMMARY,
    href: '/freelance',
    cta: 'See the packages',
  },
  {
    id: 'employers',
    title: 'Hiring teams',
    summary:
      'Staff+ roles in AI platform, identity, and forward-deployed engineering, including regulated and public-sector work. Evidence, availability, and the résumé on one page.',
    href: '/hire-me',
    cta: 'Everything a recruiter needs',
  },
];
