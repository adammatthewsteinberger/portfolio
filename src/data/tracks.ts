/**
 * The site's six tracks, in priority order. The homepage's "Who This Is For"
 * cards and the knowledge base follow this list.
 *
 * 1. Open-source developers — help build vibey (the primary audience).
 * 2. Freelance clients — fixed-scope projects (src/data/freelance.ts).
 * 3. Universities and academia — the paper, the book, the citation file.
 * 4. Governments and military — vibey's checkable guarantees.
 * 5. Nonprofits — what vibey offers small, mission-driven teams.
 * 6. Industry — hiring teams for Staff+ and forward-deployed roles (/hire-me).
 *
 * Open-source developers, academia, governments, and nonprofits live on /join-me
 * (src/data/audiences.ts); freelance and industry have pages of their own.
 * The header reflects the main navigation paths (Join Me, Freelance, Hire Me).
 * The site never names a target employer; the industry card describes the work.
 */

import { audiences, type Audience, type AudienceId } from './audiences';
import { FREELANCE_SUMMARY } from './freelance';

export type TrackId = 'contributors' | 'clients' | 'academia' | 'governments' | 'nonprofits' | 'employers';

export interface Track {
  id: TrackId;
  title: string;
  summary: string;
  href: string;
  cta: string;
}

const audience = (id: AudienceId): Audience => audiences.find((a) => a.id === id)!;

/** A track that is one of vibey's audiences: its copy comes from audiences.ts, word for word. */
const fromAudience = (id: AudienceId, trackId: TrackId, title = audience(id).title): Track => {
  const { summary, href, cta } = audience(id);
  return { id: trackId, title, summary, href, cta };
};

export const tracks: Track[] = [
  fromAudience('developers', 'contributors', 'Open-source developers'),
  {
    id: 'clients',
    title: 'Freelance projects',
    summary: FREELANCE_SUMMARY,
    href: '/freelance',
    cta: 'See the packages',
  },
  fromAudience('academia', 'academia'),
  fromAudience('governments', 'governments'),
  fromAudience('nonprofits', 'nonprofits'),
  {
    id: 'employers',
    title: 'Industry and hiring teams',
    summary:
      'Staff+ roles in AI platform, identity, and forward-deployed engineering, including regulated and public-sector work. Evidence, availability, and the résumé on one page.',
    href: '/hire-me',
    cta: 'Everything a recruiter needs',
  },
];
