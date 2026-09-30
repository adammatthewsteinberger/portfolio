import Link from 'next/link';
import type { Metadata } from 'next';
import { AskAdam } from '@/components/AskAdam';
import { getAllBlogPosts } from '@/lib/blogUtils';
import { availabilityLong } from '@/lib/availability';
import { specialties } from '@/data/expertise';
import { method, staffEvidence, vibeyGuarantees } from '@/data/evidence';
import { openSourcePackages } from '@/data/open-source';
import { DistributionNote, PackageLinks } from '@/components/PackageLinks';
import { INVITATION, INVITATION_CTA, quickstart } from '@/data/quickstart';
import { VIBEY, audiences } from '@/data/audiences';
import { OG_IMAGE } from '@/lib/seo';

const TITLE = 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer';
// Search engines truncate near 155 characters: the open-source pitch comes first
// and fits whole; availability lives in /hire-me's description.
const DESCRIPTION =
  'vibey: run a team of coding agents that can’t lose your work. Open-source conductor on an append-only PostgreSQL ledger. MIT on PyPI; contributors welcome.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://vibewithadam.matthewsteinberger.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Home() {
  const latestPosts = getAllBlogPosts().slice(0, 4);

  return (
    <>
      {/* Hero — bottom line up front, for engineers */}
      <section className="container mx-auto px-4 text-center md:text-left pt-8 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-3">
          Adam Matthew Steinberger
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent mb-4">
          Staff Software Architect &amp; AI Automation Engineer
        </h2>
        <div className="scanline mx-auto md:mx-0 mb-6" aria-hidden="true" />
        <p className="text-2xl font-semibold text-[var(--color-text-primary)] max-w-2xl mx-auto md:mx-0 mb-3">
          Run a team of coding agents that can&apos;t lose your work.
        </p>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto md:mx-0 mb-4">
          vibey carries a change from spec to reviewed merge across Claude Code, Codex, Cursor,
          Antigravity, and a local Qwen model. Every decision is a row in an append-only ledger,
          so when an agent dies, the next one starts from the last row. It&apos;s free, MIT
          licensed, on PyPI, and this site is built with it.
        </p>
        <p className="text-lg text-[var(--color-text-primary)] max-w-2xl mx-auto md:mx-0 mb-8">
          I&apos;m looking for developers to help build it. {INVITATION}
        </p>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
          <Link
            href="/join-me"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
            style={{ color: '#ffffff' }}
          >
            {INVITATION_CTA} →
          </Link>
          <a
            href={VIBEY.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
          >
            vibey on GitHub
          </a>
          <AskAdam />
        </div>
        <p className="text-sm font-mono text-[var(--color-text-muted)] max-w-xl mx-auto md:mx-0">
          Always open for a connection or a coffee — adam@matthewsteinberger.com
        </p>
      </section>

      {/* Who this site is for — in priority order */}
      <section className="container mx-auto px-4 py-12" aria-labelledby="audiences-heading">
        <h2 id="audiences-heading" className="text-2xl font-bold mb-2 text-center text-[var(--color-text-primary)]">Who This Is For</h2>
        <p className="text-center text-[var(--color-text-muted)] mb-8">Each has its own section on the Join Me page.</p>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto list-none pl-0">
          {audiences.map((audience, i) => (
            <li key={audience.id} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-5 flex flex-col">
              <span className="text-xs font-mono text-[var(--color-accent-blue)] mb-1">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{audience.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] flex-grow">{audience.summary}</p>
              <Link href={audience.href} className="text-[var(--color-accent-blue)] hover:underline font-medium text-sm mt-3">{audience.cta} →</Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Run it in ten minutes */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Run the whole stack in ten minutes</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Python 3.12+, PostgreSQL, one agent login. Free, generic, and the same commands this
            site was built with.
          </p>
          <ol className="space-y-2 list-none pl-0">
            {quickstart.map((step) => (
              <li key={step.cmd} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-4">
                <pre className="mb-1 overflow-x-auto"><code>{step.cmd}</code></pre>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{step.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What it guarantees — the mechanism, for engineers deciding whether to try it */}
      <section className="container mx-auto px-4 py-12" aria-labelledby="guarantees-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="guarantees-heading" className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Why it doesn&apos;t lose your work
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            The agent is a worker. The ledger is the record. What that buys you, and how each part is kept:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vibeyGuarantees.map((item) => (
              <Link
                key={item.claim}
                href={item.href}
                className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors"
              >
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{item.claim}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{item.proof}</p>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm">
            <Link href="/work/vibey-conductor" className="text-[var(--color-accent-blue)] hover:underline font-medium">
              How vibey works, in one page →
            </Link>
          </p>
        </div>
      </section>

      {/* The packages */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-2 text-center text-[var(--color-text-primary)]">The Packages</h2>
        <DistributionNote className="text-center text-[var(--color-text-muted)] mb-8 max-w-3xl mx-auto" />
        <div className="max-w-4xl mx-auto overflow-x-auto border border-[var(--color-dark-border)] rounded-xl">
          <table className="w-full text-sm">
            <tbody>
              {openSourcePackages.map((pkg) => (
                <tr key={pkg.name} className="border-b border-[var(--color-dark-border)] last:border-b-0">
                  <td className="px-4 py-3 font-mono font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{pkg.name}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{pkg.tagline}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <PackageLinks pkg={pkg} className="text-[var(--color-accent-blue)] hover:underline mr-3 last:mr-0" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Who's behind it — scope that reaches past one person's code */}
      <section className="container mx-auto px-4 py-12" aria-labelledby="behind-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="behind-heading" className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">Who&apos;s Behind It</h2>
          <p className="text-[var(--color-text-muted)] mb-2">
            Thirteen years of production systems in insurance, fintech, healthcare, and
            cybersecurity, where identity, audit, and supply-chain controls are the requirement,
            not the afterthought. Not just demos. Every number below is on its case study.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)] text-xs font-semibold">
            {availabilityLong()}
          </div>
          <div className="divide-y divide-[var(--color-dark-border)] border-y border-[var(--color-dark-border)]">
            {staffEvidence.map((item) => (
              <Link key={item.claim} href={item.href} className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-1 md:gap-6 py-4 no-underline hover:bg-[var(--color-dark-card)] transition-colors">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-0">{item.claim}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{item.proof}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            The method is the same on every engagement:{' '}
            {method.map((step, i) => (
              <span key={step}>
                {i > 0 && ' → '}
                <strong className="text-[var(--color-text-primary)] font-semibold">{step}</strong>
              </span>
            ))}
            . Architecture before code, and written down, so the people who inherit the system
            can run it after I leave.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
            <Link href="/work" className="text-[var(--color-accent-blue)] hover:underline font-medium">All the work →</Link>
            <Link href="/story" className="text-[var(--color-accent-blue)] hover:underline font-medium">The story →</Link>
            <Link href="/hire-me" className="text-[var(--color-accent-blue)] hover:underline font-medium">Hiring? Everything a recruiter needs →</Link>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text-primary)]">Specialties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {specialties.map((group) => (
            <Link key={group.id} href={`/expertise#${group.id}`} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors">
              <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{group.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">{group.summary}</p>
              <p className="text-xs font-mono text-[var(--color-accent-blue)] mb-0">{group.stack.slice(0, 5).join(' · ')}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text-primary)]">Writing</h2>
        {latestPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors flex flex-col">
                <span className="text-xs text-[var(--color-accent-blue)] font-medium mb-2">{post.category}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] text-sm">{post.title}</h3>
              </Link>
            ))}
          </div>
        )}
        <p className="text-center text-[var(--color-text-muted)] mt-8 max-w-2xl mx-auto">
          Author of{' '}
          <Link href="/novice-to-navigator" className="text-[var(--color-accent-blue)] hover:underline">
            <em>Novice to Navigator: Your Guide to AI Chatbots for Business</em>
          </Link>{' '}
          — the first edition is free to read here. A second edition is in development.
        </p>
        <div className="text-center mt-4">
          <Link href="/writing" className="text-[var(--color-accent-blue)] hover:underline font-medium">All the writing →</Link>
        </div>
      </section>

      {/* Final CTA — the same memo as the top */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-[var(--color-accent-blue)]/10 to-[var(--color-accent-green)]/10 border border-[var(--color-accent-blue)]/30 rounded-xl p-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">Join Me</h2>
          <p className="text-[var(--color-text-muted)] mb-8">{INVITATION}</p>
          <Link
            href="/join-me"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
            style={{ color: '#ffffff' }}
          >
            {INVITATION_CTA} →
          </Link>
          <p className="text-sm text-[var(--color-text-muted)] mt-6 mb-0">
            <Link href="/join-me#governments" className="hover:underline">Governments and military</Link>
            {' · '}
            <Link href="/join-me#academia" className="hover:underline">Universities and academia</Link>
            {' · '}
            <Link href="/hire-me" className="hover:underline">Hiring</Link>
          </p>
        </div>
      </section>
    </>
  );
}
