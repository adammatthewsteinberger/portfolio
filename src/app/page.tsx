import Link from 'next/link';
import type { Metadata } from 'next';
import { AskAdam } from '@/components/AskAdam';
import { getAllBlogPosts } from '@/lib/blogUtils';
import { availabilityLong } from '@/lib/availability';
import { specialties } from '@/data/expertise';
import { openSourcePackages } from '@/data/open-source';
import { INVITATION, INVITATION_CTA, quickstart } from '@/data/quickstart';

export const metadata: Metadata = {
  title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
  description:
    'Free and open-source autonomous software-delivery tooling — the *loop agent runners, the vibey conductor, vibey-gh release automation — all MIT on PyPI, from a Staff Software Architect & AI Automation Engineer in Greenville, SC. Volunteers welcome. Available from September 2026.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
    description:
      'Free and open-source autonomous software-delivery tooling, MIT on PyPI. Run it in ten minutes; volunteers welcome. Available from September 2026 — Greenville, SC (remote) or US remote.',
    url: 'https://hire.adam.matthewsteinberger.com',
    images: [{ url: '/images/og-home.png', width: 1200, height: 630, alt: 'Adam Matthew Steinberger — Staff Software Architect & AI Automation Engineer' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
    description: 'Free and open-source autonomous software-delivery tooling, MIT on PyPI. Run it in ten minutes; volunteers welcome.',
  },
};

// Every figure below is on the corresponding case study or on /story — nothing new.
const shipped = [
  { title: 'AI Governance Gateway', role: 'Sole architect', proof: 'Five model vendors behind one policy-enforced API — per-project cost caps, hash-chained audit trail, no API keys in the path. Three product teams migrated; their credentials retired.', href: '/work/ai-governance-gateway' },
  { title: 'AI Payroll Platform', role: 'Co-lead', proof: '20 microservices, 585 test modules, human approval on every phase. Architecture production-ready at day 45; a junior developer trained in parallel now owns it.', href: '/work/enterprise-ai-payroll-processor' },
  { title: 'Identity Governance as Code', role: 'Sole author', proof: 'Two control planes for a SOX-regulated enterprise — 40 resource kinds reconciled from Git, secretless multi-tenant auth, a human in front of anything destructive.', href: '/work/identity-governance-as-code' },
  { title: 'Multi-System Ticket Relay', role: 'Sole author', proof: 'N-way sync with no privileged hub. 653 tests, 93% coverage, chaos-proved convergence.', href: '/work/multi-system-ticket-relay' },
  { title: 'Multi-Tenant Observability Portal', role: 'Lead', proof: 'Logs, traces, cost, and health from three data planes — every payload tagged with how fresh it really is.', href: '/work/multi-tenant-observability-portal' },
];

const involvement = [
  { title: 'Run it', body: 'The six commands above give you an autonomous software-engineering agent on your own machine, with a real budget brake. Nothing is tailored to anyone’s deployment but this site’s — by dogfooding.', href: '/join-me', cta: 'Full quickstart' },
  { title: 'Contribute', body: 'Issues, pull requests against develop, a new *loop engine, a new skill for vibey-skills, or a doc that lied to you. Every repo has a CONTRIBUTING and a SECURITY policy.', href: '/join-me', cta: 'Ways to contribute' },
  { title: 'Volunteer', body: 'Nonprofit with a real engineering problem, or an engineer who wants to work alongside on one? Project Excite is the current example. Same address either way.', href: '/work/project-excite-relay', cta: 'See the volunteer work' },
];

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
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto md:mx-0 mb-4">
          I primarily develop free and open-source software: autonomous software-delivery tooling
          — the <code>*loop</code> agent runners, the vibey conductor, vibey-gh release automation
          — all MIT licensed, all on PyPI, and all of it dogfooded on this very site.
        </p>
        <p className="text-lg text-[var(--color-text-primary)] max-w-2xl mx-auto md:mx-0 mb-8">
          {INVITATION}
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
            href="https://github.com/adammatthewsteinberger"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
          >
            GitHub
          </a>
          <AskAdam />
        </div>
        <p className="text-sm font-mono text-[var(--color-text-muted)] max-w-xl mx-auto md:mx-0">
          Always open for a connection or a coffee — adam@matthewsteinberger.com
        </p>
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

      {/* The packages */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-2 text-center text-[var(--color-text-primary)]">The Packages</h2>
        <p className="text-center text-[var(--color-text-muted)] mb-8">
          Engines → conductor → release automation → skills → runtime layer. All MIT, all on PyPI.
        </p>
        <div className="max-w-4xl mx-auto overflow-x-auto border border-[var(--color-dark-border)] rounded-xl">
          <table className="w-full text-sm">
            <tbody>
              {openSourcePackages.map((pkg) => (
                <tr key={pkg.name} className="border-b border-[var(--color-dark-border)] last:border-b-0">
                  <td className="px-4 py-3 font-mono font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{pkg.name}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{pkg.tagline}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={pkg.pypi} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-blue)] hover:underline mr-3">PyPI</a>
                    <a href={pkg.repo} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-blue)] hover:underline">GitHub</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ways to get involved */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text-primary)]">Get Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {involvement.map((item) => (
            <div key={item.title} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-5 flex flex-col">
              <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] flex-grow">{item.body}</p>
              <Link href={item.href} className="text-[var(--color-accent-blue)] hover:underline font-medium text-sm mt-3">{item.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Who's behind it */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">Who&apos;s Behind It</h2>
          <p className="text-[var(--color-text-muted)] mb-2">
            I build AI systems that actually work inside enterprise environments — production-grade
            platforms that handle real data, real security requirements, and real organizational
            complexity. Not just demos. The past year at The Vizius Group; every number is on the
            case study.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)] text-xs font-semibold">
            {availabilityLong()}
          </div>
          <div className="divide-y divide-[var(--color-dark-border)] border-y border-[var(--color-dark-border)]">
            {shipped.map((item) => (
              <Link key={item.href} href={item.href} className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-1 md:gap-6 py-4 no-underline hover:bg-[var(--color-dark-card)] transition-colors">
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-green)]">{item.role}</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{item.proof}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            After 13+ years: the hardest part is never the technology — it&apos;s designing so the
            people who inherit it get a product that just works. Architecture before code. Juniors
            trained in parallel. Handoffs that hold. I document everything for the same reason a
            RAG pipeline cites its sources, and I communicate best with written documentation.
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
            Hiring?{' '}
            <Link href="/hire-me" className="hover:underline">Everything a recruiter needs</Link>
            {' · '}
            Running a business?{' '}
            <Link href="/for-executives" className="hover:underline">The executive edition</Link>
          </p>
        </div>
      </section>
    </>
  );
}
