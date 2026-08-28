/**
 * The executive edition (/for-executives): routes, parity, and the copy that
 * is only allowed to appear there.
 *
 * Content contract (vibey-gh #135): bottom line up front; the problem before
 * the solution, in the reader's terms; then the offer — tailoring and
 * whitelabeling by Adam Matthew Steinberger LLC, for pay. Never pricing.
 *
 * Mechanism contract (vibey-gh #134): every exec page has an engineering
 * counterpart (`engineeringUrl` here; /work/[slug] for case studies), the
 * exec edition is never the target of a rewrite or redirect, and it never
 * outranks the engineering page in the sitemap. src/__tests__/editions.test.ts
 * checks all of that.
 */
import { EXEC_PREFIX } from '@/lib/edition';

export interface ExecRoute {
  execUrl: string;
  engineeringUrl: string;
  /** The first heading on the page — a problem, never a product. */
  problem: string;
}

export const execRoutes: ExecRoute[] = [
  {
    execUrl: EXEC_PREFIX,
    engineeringUrl: '/',
    problem: 'Your AI initiative is stalling on security, data, and handoff — not on models.',
  },
  {
    execUrl: `${EXEC_PREFIX}/work`,
    engineeringUrl: '/work',
    problem: 'The same three problems keep killing enterprise AI platforms. These are the ones I have removed.',
  },
  {
    execUrl: `${EXEC_PREFIX}/engage`,
    engineeringUrl: '/contact',
    problem: 'You need this to work in your environment, not in a demo.',
  },
];

/** The only place a booking link is allowed to be defined. Engineering pages never render it. */
export const EXEC_BOOKING_URL = 'https://tidycal.com/adammatthewsteinberger';

export const execOffer = {
  hire: {
    title: 'Hire me into your engineering organization',
    body: 'Full-time, W2 preferred, Greenville-remote or US-remote. You get the architect who builds these platforms and trains the people who will own them.',
    href: '/hire-me',
    cta: 'What I’m looking for',
  },
  engage: {
    title: 'Engage my firm to tailor these platforms to your environment',
    body: 'Adam Matthew Steinberger LLC fits and whitelabels this work to your systems, your identity provider, and your compliance regime — with the architecture documents and the handoff that let your own team run it afterward.',
    href: `${EXEC_PREFIX}/engage`,
    cta: 'How an engagement works',
  },
};
