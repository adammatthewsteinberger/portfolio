import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import {
  briefPrompts,
  engagementSteps,
  freelanceFaq,
  listedPlatforms,
  offers,
  platforms,
  workingAgreement,
} from '@/data/freelance';
import { OG_IMAGE } from '@/lib/seo';

const SITE_URL = 'https://vibewithadam.matthewsteinberger.com';
// The root layout's template appends "| Adam Matthew Steinberger" to `title`;
// the social card has no template, so it carries the name itself.
const TITLE = 'Freelance AI & Security Engineering';
const SOCIAL_TITLE = `${TITLE} | Adam Matthew Steinberger`;
// Under ~155 characters so search results show it whole: the packages, by name.
const DESCRIPTION =
  'Fixed-scope AI work from a Staff architect: codebase and security reviews, RAG chatbots, LLM gateways, Okta and Entra ID governance, SOC 2 readiness.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/freelance' },
  openGraph: {
    images: [OG_IMAGE],
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/freelance`,
  },
};

const faq = freelanceFaq();
const live = listedPlatforms();

// Structured data: the packages as an offer catalogue (no prices — they live on
// the platform listings) and the questions as an FAQ, so search engines and AI
// assistants can quote them accurately. Generated from src/data/freelance.ts.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/freelance#service`,
      name: 'Fixed-scope AI and security engineering',
      serviceType: 'Freelance software engineering',
      description: DESCRIPTION,
      url: `${SITE_URL}/freelance`,
      provider: { '@id': `${SITE_URL}/#person` },
      availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${SITE_URL}/freelance#brief` },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Packages',
        itemListElement: offers.map((offer) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: offer.title,
            description: `${offer.forWhom} Deliverables: ${offer.deliverables.join('; ')}.`,
            url: `${SITE_URL}/freelance#${offer.id}`,
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/freelance#faq`,
      mainEntity: faq.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.answer },
      })),
    },
  ],
};

// globals.css styles ol/ul padding and h4 size outside any @layer, so they beat
// Tailwind utilities; the `!` suffix restores the utility where it must win.
const card = 'bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl';
const link = 'text-[var(--color-accent-blue)] hover:underline font-medium';

export default function FreelancePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero: the client's problem first, then the promise */}
      <section className="container mx-auto px-4 pt-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-mono text-[var(--color-accent-blue)] mb-3">Freelance · fixed scope · US remote</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-5">
            Fixed-scope AI and security engineering
          </h1>
          <p className="text-xl text-[var(--color-text-primary)] mb-4">
            You have an AI feature to ship, a codebase to trust, or an audit on the calendar. It
            needs doing once, and doing right, by someone who writes down what &ldquo;done&rdquo;
            means before the work starts.
          </p>
          <p className="text-lg text-[var(--color-text-muted)] mb-8">
            Every package below is built from work I have already delivered, and each comes with a
            fixed price, a written scope, and an acceptance checklist on every milestone.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href="#brief"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
              style={{ color: '#ffffff' }}
            >
              Send a written brief
            </a>
            <a href="#packages" className={`px-3 py-3 ${link}`}>
              See the packages ↓
            </a>
            {live.map((p) => (
              <a key={p.name} href={p.profileUrl} target="_blank" rel="noopener noreferrer" className={`px-3 py-3 ${link}`}>
                {p.name} profile ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The packages: outcome, who it's for, what arrives, and where it was done before */}
      <section id="packages" className="container mx-auto px-4 py-12 scroll-mt-24" aria-labelledby="packages-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="packages-heading" className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            The packages
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Each one names what you receive. The proof underneath is work already delivered, and
            every number links to its case study.
          </p>
          <ol className="list-none pl-0! space-y-4">
            {offers.map((offer, i) => (
              <li key={offer.id} id={offer.id} className={`${card} p-6 scroll-mt-24`}>
                <span className="text-xs font-mono text-[var(--color-accent-blue)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-1 mb-2">{offer.title}</h3>
                <p className="text-[var(--color-text-muted)] mb-4">{offer.forWhom}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm! font-semibold text-[var(--color-text-primary)] mb-2">You get</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--color-text-primary)]">
                      {offer.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm! font-semibold text-[var(--color-text-primary)] mb-2">Done before</h4>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">{offer.proof}</p>
                    <Link href={offer.proofHref} className={`text-sm ${link}`}>
                      Read the case study →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How it runs: the same four-step method as every engagement */}
      <section className="container mx-auto px-4 py-12" aria-labelledby="steps-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="steps-heading" className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
            How an engagement runs
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0!">
            {engagementSteps.map((step, i) => (
              <li key={step.title} className={`${card} p-5`}>
                <span className="text-xs font-mono text-[var(--color-accent-blue)]">Step {i + 1}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The working agreement: promises a client can hold me to */}
      <section className="container mx-auto px-4 py-12" aria-labelledby="agreement-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="agreement-heading" className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            What you can count on
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Everything that matters is in writing, so nothing we agree depends on anyone&apos;s memory.
          </p>
          <div className="divide-y divide-[var(--color-dark-border)] border-y border-[var(--color-dark-border)]">
            {workingAgreement.map((item) => (
              <div key={item.title} className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-1 md:gap-6 py-4">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-0">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start: the written brief, and the platforms whose profiles are live */}
      <section id="brief" className="container mx-auto px-4 py-12 scroll-mt-24" aria-labelledby="brief-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="brief-heading" className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Send a written brief
          </h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            A few short paragraphs are plenty. You&apos;ll get a written reply within one business
            day: either a scope to accept, or the questions that need answering first. It helps to cover:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-[var(--color-text-primary)] mb-6">
            {briefPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
          {live.length > 0 && (
            <div className="mb-6 space-y-2">
              {live.map((p) => (
                <p key={p.name} className="text-sm text-[var(--color-text-muted)] mb-0">
                  <a href={p.profileUrl} target="_blank" rel="noopener noreferrer" className={link}>
                    {p.name}
                  </a>
                  : {p.role}
                </p>
              ))}
            </div>
          )}
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Already working with me on {platforms.map((p) => p.name).join(' or ')}? Message me there; the
            engagement stays on the platform where we met.
          </p>
          <div className="text-center">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Questions buyers ask first */}
      <section className="container mx-auto px-4 py-12" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-heading" className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
            Questions
          </h2>
          <div className="space-y-3">
            {faq.map((q) => (
              <details key={q.question} className={`${card} p-5 group`}>
                <summary className="font-semibold text-[var(--color-text-primary)] cursor-pointer">{q.question}</summary>
                <p className="text-[var(--color-text-muted)] mt-3 mb-0">{q.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The open-source work comes first; say so on the way out */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center text-sm text-[var(--color-text-muted)] space-y-2">
          <p className="mb-0">
            The gates behind every package are the ones I build in the open.{' '}
            <Link href="/work/vibey-conductor" className={link}>
              See how vibey works
            </Link>
            , or{' '}
            <Link href="/join-me#developers" className={link}>
              help build it
            </Link>
            .
          </p>
          <p className="mb-0">
            Hiring for a permanent role instead?{' '}
            <Link href="/hire-me" className={link}>
              Everything a recruiter needs is here
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
