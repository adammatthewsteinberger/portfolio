import Link from 'next/link';
import type { Metadata } from 'next';
import InlineCode from '@/components/InlineCode';
import {
  VIBEY,
  academiaItems,
  audiences,
  getStartedSteps,
  governmentClaims,
  helpWanted,
} from '@/data/audiences';
import { INVITATION, quickstart } from '@/data/quickstart';
import { OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Join Me — Help Build vibey',
  description:
    'I’m looking for developers to help build vibey, the open-source conductor for autonomous software delivery. Here is how to get started. Governments and military, and universities and academia, each have their own section.',
  alternates: { canonical: '/join-me' },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Join Me — Help Build vibey | Adam Matthew Steinberger',
    description:
      'How developers get started on vibey, what it offers governments and the military, and the research paper and book for universities.',
    url: 'https://vibewithadam.matthewsteinberger.com/join-me',
  },
};

const CARD = 'bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl';
const LINK = 'text-[var(--color-accent-blue)] hover:underline';

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
    </a>
  );
}

export default function JoinMePage() {
  return (
    <div>
      {/* Bottom line up front: who this page is for, in priority order. */}
      <section className="container mx-auto px-4 pt-8 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Join Me</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          I&apos;m looking for developers to help build{' '}
          <External href={VIBEY.repo}>vibey</External>, the open-source conductor that turns AI coding
          agents into autonomous software delivery. Everything you need to get started is below.
        </p>
        <p className="mt-4 text-[var(--color-text-primary)] max-w-2xl mx-auto">{INVITATION}</p>
        <nav aria-label="Sections on this page" className="mt-8">
          <ol className="flex flex-wrap justify-center gap-3 list-none pl-0">
            {audiences.map((audience, i) => (
              <li key={audience.id}>
                <a
                  href={`#${audience.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-accent-blue)]/40 text-[var(--color-text-primary)] hover:border-[var(--color-accent-blue)] no-underline text-sm font-medium"
                >
                  <span className="font-mono text-[var(--color-accent-blue)]">{String(i + 1).padStart(2, '0')}</span>
                  {audience.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-6 text-[var(--color-text-muted)]">
          <a href="mailto:adam@matthewsteinberger.com" className={LINK}>adam@matthewsteinberger.com</a>
        </p>
      </section>

      {/* 1 — Developers */}
      <section id="developers" aria-labelledby="developers-heading" className="container mx-auto px-4 py-10 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-blue)] mb-2">01 · Developers</p>
          <h2 id="developers-heading" className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            Help build vibey
          </h2>
          <p className="text-[var(--color-text-muted)]">
            AI coding agents can write code. Delivery still means babysitting them: re-prompting when
            one loses the thread, re-explaining everything after a crash, and watching a run die at
            2am because one vendor&apos;s credits ran out. vibey takes that job over. It interviews you
            until the spec is sharp, builds unattended across a pool of engines, and brings you back only
            for the decisions that are genuinely yours.
          </p>
          <p className="text-[var(--color-text-muted)]">
            It&apos;s MIT licensed and one <code>uv tool install</code> away. The whole family lives in{' '}
            <External href={VIBEY.repo}>one repository</External>: the five <code>*loop</code> engines,
            vibey-gh, vibey-skills, and vibey-bootstrap.
          </p>

          <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-10 mb-4">How to get started</h3>
          <ol className="space-y-4 list-none pl-0">
            {getStartedSteps.map((step, i) => (
              <li key={step.title} className={`${CARD} p-5`}>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-2">
                  <span className="font-mono text-[var(--color-accent-blue)] mr-2">{i + 1}.</span>
                  {step.title}
                </h4>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">
                  <InlineCode text={step.body} />
                </p>
                {step.commands.length > 0 && (
                  <pre className="mt-3 mb-0 overflow-x-auto"><code>{step.commands.join('\n')}</code></pre>
                )}
                {step.links.length > 0 && (
                  <p className="text-sm mt-3 mb-0 flex flex-wrap gap-x-4 gap-y-1">
                    {step.links.map((link) => (
                      <External key={link.href} href={link.href}>{link.label}</External>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ol>

          <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-10 mb-2">Run it before you change it</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            The user&apos;s path takes about ten minutes and uses the same commands this site was built with.
            It needs one agent login.
          </p>
          <ol className="space-y-2 list-none pl-0">
            {quickstart.map((step) => (
              <li key={step.cmd} className={`${CARD} p-4`}>
                <pre className="mb-1 overflow-x-auto"><code>{step.cmd}</code></pre>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{step.note}</p>
              </li>
            ))}
          </ol>

          <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-10 mb-4">Where help matters most</h3>
          <div className="space-y-4">
            {helpWanted.map((item) => (
              <div key={item.title} className={`${CARD} p-5`}>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">{item.title}</h4>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">{item.body}</p>
                <p className="text-sm mb-0"><External href={item.source.href}>{item.source.label} →</External></p>
              </div>
            ))}
          </div>

          <div className={`${CARD} border-[var(--color-accent-purple)]/30 p-6 mt-8`}>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Dogfooding: this site is built with it</h3>
            <p className="text-[var(--color-text-muted)]">
              The full-page chat at{' '}
              <a href="https://chatwithadam.matthewsteinberger.com/" className={LINK}>chatwithadam.matthewsteinberger.com</a>{' '}
              shipped as vibey project cycle one. It had an authored spec with acceptance criteria and
              non-functional requirements. All 23 jobs went green across two engines in about fifty
              minutes, and a review gate came before the merge.
            </p>
            <p className="text-[var(--color-text-muted)] mb-0">
              It got the mechanical work right: the page, the component variant, the footer and sitemap
              entries, the tests, and the docs. A human still had to fix three things afterward: the core
              routing criterion it skipped, a relative canonical, and first-person copy on a page that
              speaks in the third person. That&apos;s the honest state of autonomous delivery in 2026, and
              it&apos;s why the spec, the gates, and the review are the product, not the model.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — Governments and military */}
      <section id="governments" aria-labelledby="governments-heading" className="container mx-auto px-4 py-10 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-green)] mb-2">02 · Governments and military</p>
          <h2 id="governments-heading" className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            Governments and military
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Governments, and armed forces most of all, adopt software under the hardest obligations. Every
            artifact has to be attributable, and every automated decision has to be reconstructible after
            the fact. Work has to continue when a vendor or a network is denied, and no capability can
            depend on a supplier&apos;s continued goodwill. Here is what vibey offers against those
            obligations. Each claim links to its source, so you can check it instead of trusting it.
          </p>
          <div className="space-y-4 mt-6">
            {governmentClaims.map((claim) => (
              <div key={claim.title} className={`${CARD} p-5`}>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{claim.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">
                  <InlineCode text={claim.body} />
                </p>
                <p className="text-sm mb-0"><External href={claim.source.href}>{claim.source.label} →</External></p>
              </div>
            ))}
          </div>

          <div className={`${CARD} border-[var(--color-accent-green)]/30 p-6 mt-8`}>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">How to reach me</h3>
            <p className="text-[var(--color-text-muted)]">
              Use official channels, and expect the same verification in return. Write from an official
              address to{' '}
              <a href="mailto:adam@matthewsteinberger.com" className={LINK}>adam@matthewsteinberger.com</a>.
              Report a security vulnerability privately, as{' '}
              <External href={VIBEY.security}>vibey&apos;s security policy</External> describes, and never in
              a public issue. Ask public questions in{' '}
              <External href={VIBEY.discussions}>GitHub Discussions</External>. The longer case, written for a
              defense institution, is{' '}
              <External href={VIBEY.governmentPage}>vibey-gh for governments</External>.
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mb-0">
              This page claims no government or military customer, contract, clearance, accreditation,
              or endorsement. vibey is MIT-licensed open source: evaluate it on your own hardware, against
              its own gates.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Universities and academia */}
      <section id="academia" aria-labelledby="academia-heading" className="container mx-auto px-4 py-10 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-gold)] mb-2">03 · Universities and academia</p>
          <h2 id="academia-heading" className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            Universities and academia
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Claims about AI agents are easy to make and hard to reproduce. vibey&apos;s design is written as
            a research paper, its whole documentation is a book, and the code that backs both is open.
            Read it, cite it, teach with it, and test it.
          </p>
          <div className="flex flex-wrap gap-3 my-6">
            <a
              href={VIBEY.paperPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
              style={{ color: '#ffffff' }}
            >
              The paper (PDF)
            </a>
            <a
              href={VIBEY.paperHtml}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
            >
              The paper (HTML)
            </a>
            <a
              href={VIBEY.bookPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
            >
              The book (PDF)
            </a>
          </div>
          <div className="space-y-4">
            {academiaItems.map((item) => (
              <div key={item.title} className={`${CARD} p-5`}>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">
                  <InlineCode text={item.body} />
                </p>
                <p className="text-sm mb-0"><External href={item.source.href}>{item.source.label} →</External></p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-6">
            The book also comes as an <External href={VIBEY.bookEpub}>EPUB</External> and as{' '}
            <External href={VIBEY.bookPrint}>print-ready HTML</External>, and the companion paper on the
            exact-head release calculus is <External href={VIBEY.companionPaper}>in the repository</External>.
            This page claims no institutional affiliation or endorsement.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 text-center">
        <p className="text-[var(--color-text-muted)]">
          Don&apos;t see yourself here?{' '}
          <Link href="/contact" className={`${LINK} font-medium`}>Write to me →</Link>
        </p>
      </section>
    </div>
  );
}
