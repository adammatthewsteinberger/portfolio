/**
 * Fixed-scope freelance work — the site's second track, behind the open-source
 * work and ahead of hiring. /freelance renders it; the homepage, the header,
 * the site directory, llms.txt, and the "Ask about Adam" knowledge base read it.
 *
 * Rules this file keeps (AGENTS.md; src/data/__tests__/freelance.test.ts checks them):
 * - Every proof comes from the résumé and links to the case study that shows it.
 * - No prices on the site. Each package has a fixed price, quoted on the
 *   platform listing or in the written scope, because fees and terms change there.
 * - No call booking. An engagement starts with a written brief; calls are optional.
 * - A platform appears only once its profile is live (`profileUrl` set). The site
 *   never claims a listing, badge, or review that does not exist yet.
 * - A client met on a platform stays on that platform. Upwork's terms require it
 *   for 24 months, and it is simply the fair way to work.
 * - AI assistance is disclosed up front, and a person signs off every deliverable.
 */

import { method } from './evidence';

export interface Offer {
  /** Anchor on /freelance. */
  id: string;
  /** The outcome, stated as the thing the client receives. */
  title: string;
  /** Who it is for, in the client's own terms. */
  forWhom: string;
  /** What arrives at the end. Nouns, not adjectives. */
  deliverables: string[];
  /** Work already delivered, copied from the résumé: numbers and nouns. */
  proof: string;
  /** The case study that shows the proof. */
  proofHref: string;
}

export const offers: Offer[] = [
  {
    id: 'codebase-review',
    title: 'AI codebase and security review',
    forWhom: 'For a team about to scale, sell, or hand over a codebase, and wanting to know what is in it first.',
    deliverables: [
      'A technical brief with every finding ranked by risk',
      'An executive summary for the people who sign off',
      'A phased roadmap, each phase with an effort estimate',
    ],
    proof:
      'Reviewed 59,000 lines across 190+ files in 10 hours. Found 5% test coverage and missing authentication middleware, and delivered a technical brief, an executive summary, and a phased roadmap.',
    proofHref: '/work/chosen-people-answers-architecture',
  },
  {
    id: 'rag-chatbot',
    title: 'A production RAG chatbot in 30 days',
    forWhom: 'For an organization whose people keep asking the same questions of the same documents.',
    deliverables: [
      'A chatbot grounded in your own documents',
      'Hosting on your cloud, or fully on your own servers so no data leaves them',
      'Monitoring on every response, and a runbook your team can follow',
    ],
    proof:
      'Two delivered in 30 days each: one fully self-hosted for a non-profit (Mistral-7B, FAISS, and vLLM, with Grafana and Prometheus on every token and no external dependencies), and one cloud-based for a sales agency (Gemini, with API-driven web search).',
    proofHref: '/work/self-hosted-rag-chatbot',
  },
  {
    id: 'llm-gateway',
    title: 'An LLM cost and policy gateway',
    forWhom: 'For a company with several teams calling several model vendors, and no single view of spend or risk.',
    deliverables: [
      'One OpenAI-compatible API in front of the vendors you use',
      'Per-project allowlists, spend caps, and rate limits',
      'An audit trail that cannot be quietly edited',
    ],
    proof:
      'Sole architect of a gateway in front of six model vendors, with hard spend caps and a hash-chained, write-once audit trail. Three product teams moved onto it and retired the credentials their apps held.',
    proofHref: '/work/ai-governance-gateway',
  },
  {
    id: 'identity-governance',
    title: 'Okta or Entra ID identity governance, fixed',
    forWhom: 'For an IT or security team whose identity setup has drifted from what anyone meant it to be.',
    deliverables: [
      'Access rules declared in Git and reviewed like code',
      'Drift detection: safe drift fixed automatically, destructive changes held for a person',
      'A written access model mapped to your audit requirements',
    ],
    proof:
      'Sole author of two identity-governance-as-code control planes: 40 identity-provider resource kinds, multi-tenant, no stored tenant secrets. Identity advisory for a SOX-regulated enterprise of about 5,700 identities.',
    proofHref: '/work/identity-governance-as-code',
  },
  {
    id: 'ai-security-readiness',
    title: 'SOC 2 or OWASP LLM Top 10 readiness for an AI feature',
    forWhom: 'For a team shipping an AI feature to customers who will ask how it is secured.',
    deliverables: [
      'A STRIDE threat model of the feature',
      'A control map to the OWASP LLM Top 10 and the NIST AI RMF',
      'A ranked gap list, with the fix for each gap',
    ],
    proof:
      'Wrote the SOC 2 readiness assessment, STRIDE threat model, and decision records for a standards-aware report platform, and mapped an AI gateway’s controls to the OWASP LLM Top 10 and the NIST AI RMF.',
    proofHref: '/work/ai-report-generator-email-intake',
  },
];

export interface Step {
  title: string;
  body: string;
}

/** What each step of the method means for a client. Same order, same names as `method`. */
const STEP_BODIES = [
  'You fill in a short written brief. I read your code, documents, or tenant configuration, and ask any follow-up questions in writing.',
  'You get a fixed scope: deliverables, milestones, and an acceptance checklist for each one. Work starts when you accept it.',
  'The scope becomes small, reviewable pieces. Each milestone closes against its checklist, with a written status note.',
  'You get the code, the documentation, and a walkthrough for whoever owns it next, so the system keeps running after I leave.',
];

export const engagementSteps: Step[] = method.map((title, i) => ({ title, body: STEP_BODIES[i] }));

/** How an engagement runs, day to day. Each one is a promise the client can hold me to. */
export const workingAgreement: Step[] = [
  {
    title: 'Written brief first; calls are optional',
    body: 'Every engagement starts with a short written questionnaire, answered on your schedule. I reply with a written scope. We can talk live whenever it helps, but no step waits on a meeting.',
  },
  {
    title: 'Scope, price, and “done” agreed before work starts',
    body: 'Each package has a fixed price, a written deliverable list, and an acceptance checklist on every milestone. Anything new arrives as a written change note for you to accept or decline.',
  },
  {
    title: 'Status in writing, on a schedule',
    body: 'I answer messages in two set windows each business day, US Eastern time, and send a written status note at every milestone. You always know where things stand without having to ask.',
  },
  {
    title: 'Risks named early',
    body: 'A short risk register travels with the project: what could go wrong, how likely it is, and what we are doing about it. Bad news arrives early and in writing, while it is still cheap to fix.',
  },
  {
    title: 'Room to do it properly',
    body: 'I take on no more than three engagements at a time, so yours gets steady attention rather than a slot between other meetings.',
  },
  {
    title: 'AI-assisted, signed off by a person',
    body: 'I build with AI coding agents under the same gates vibey uses: strict types, tests, and review. I say so up front, I review what ships, and I sign off every deliverable myself.',
  },
];

/** What a written brief covers — the questions a first call would otherwise ask. */
export const briefPrompts: string[] = [
  'What should exist when the work is done',
  'What you have now: the repository, the identity tenant, or the documents',
  'Your deadline, and whether anything about it is fixed',
  'Who signs off, and what they need to see',
  'Anything off-limits: systems, data, or vendors',
];

export interface Platform {
  name: string;
  /** What the client does there. */
  role: string;
  /** The live profile. Unset until the profile exists; the page shows a platform only once it has one. */
  profileUrl?: string;
}

/** Where to start an engagement, in the order a client should try them. */
export const platforms: Platform[] = [
  {
    name: 'Upwork',
    role: 'Post a project and invite me, or send a direct offer. Contracts, milestones, and payment run through Upwork.',
  },
  {
    name: 'Fiverr Pro',
    role: 'The packages on this page as fixed listings you can order directly.',
  },
];

/** Platforms whose profiles are live, in order. */
export function listedPlatforms(list: Platform[] = platforms): Platform[] {
  return list.filter((p): p is Platform & { profileUrl: string } => Boolean(p.profileUrl));
}

/** The answer to "Can we work through Upwork or Fiverr?" — true for whichever profiles are live. */
export function platformAnswer(list: Platform[] = platforms): string {
  const live = listedPlatforms(list);
  const stay = 'If we meet on a platform, the whole engagement stays on that platform.';
  if (live.length === 0) {
    return `Yes. Platform profiles are linked from this page as they go live; until then, the written brief below starts an engagement directly. ${stay}`;
  }
  return `Yes, through ${live.map((p) => p.name).join(' or ')}, linked from this page, or directly through the written brief below. ${stay}`;
}

export interface Question {
  question: string;
  answer: string;
}

/** Plain answers to the questions buyers ask first. Also emitted as FAQPage structured data. */
export function freelanceFaq(list: Platform[] = platforms): Question[] {
  return [
    {
      question: 'Do we need a call before starting?',
      answer:
        'No. The written brief covers what a first call would, and you keep a copy. A call is available whenever it would help, but no step depends on one.',
    },
    {
      question: 'How is each package priced?',
      answer:
        'At a fixed price per package, agreed in writing before work starts and quoted on the platform listing or in your written scope. If the scope changes, you get a written change note to accept or decline.',
    },
    {
      question: 'Do you use AI to do the work?',
      answer:
        'Yes, as a tool. AI coding agents work under strict gates: typed code, tests, and review. I review and sign off everything that ships, and I say so at the start rather than waiting to be asked.',
    },
    {
      question: 'What happens to our code and data?',
      answer:
        'Deliverables are yours under the contract’s terms. Project data stays in the systems you give me access to and is used only for your project. Where a platform lets us switch off AI training on project data, I switch it off.',
    },
    { question: 'Can we work through Upwork or Fiverr?', answer: platformAnswer(list) },
    {
      question: 'Who does the work?',
      answer: 'I do. There is no agency behind this page, and nothing is subcontracted without your written approval.',
    },
    {
      question: 'What don’t you take on?',
      answer:
        'Work outside the packages above, open-ended retainers with no written scope, and anything that means bypassing a platform’s terms or a client’s security controls. If your project can’t be written down as a brief yet, I’m glad to help you write one.',
    },
  ];
}

/** The one-line summary the homepage and the knowledge base use. */
export const FREELANCE_SUMMARY =
  'Fixed-scope AI and security work: codebase reviews, RAG chatbots, LLM gateways, Okta and Entra ID governance, and AI security readiness. Written scope, fixed price, acceptance checklist on every milestone.';
