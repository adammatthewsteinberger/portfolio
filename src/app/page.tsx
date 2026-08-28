import Link from 'next/link';
import type { Metadata } from 'next';
import { AskAdam } from '@/components/AskAdam';
import { getAllBlogPosts } from '@/lib/blogUtils';
import { availabilityLong } from '@/lib/availability';
import { specialties } from '@/data/expertise';
import { openSourcePackages } from '@/data/open-source';

export const metadata: Metadata = {
  title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
  description:
    'Staff Software Architect & AI Automation Engineer in Greenville, SC. Production-grade AI platforms for enterprise environments — real data, real security requirements, real organizational complexity. Available from September 2026.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
    description:
      'AI systems that actually work inside enterprise environments — not just demos. Available from September 2026 — Greenville, SC (remote) or US remote.',
    url: 'https://vibe.with.adam.matthewsteinberger.com',
    images: [{ url: '/images/og-home.png', width: 1200, height: 630, alt: 'Adam Matthew Steinberger — Staff Software Architect & AI Automation Engineer' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
    description:
      'AI systems that actually work inside enterprise environments — not just demos. Available from September 2026.',
  },
};

// Every figure below is on the corresponding case study or on /story — nothing new.
const shipped = [
  {
    title: 'AI Governance Gateway',
    role: 'Sole architect',
    proof: 'Five model vendors behind one policy-enforced API — per-project cost caps, hash-chained audit trail, no API keys in the path. Three product teams migrated onto it; their credentials retired.',
    href: '/work/ai-governance-gateway',
  },
  {
    title: 'AI Payroll Platform',
    role: 'Co-lead',
    proof: '20 microservices, 585 test modules, human approval on every phase. Architecture production-ready at day 45; a junior developer trained in parallel now owns it.',
    href: '/work/enterprise-ai-payroll-processor',
  },
  {
    title: 'Identity Governance as Code',
    role: 'Sole author',
    proof: 'Two control planes for a SOX-regulated enterprise — 40 resource kinds reconciled from Git, secretless multi-tenant auth, a human in front of anything destructive.',
    href: '/work/identity-governance-as-code',
  },
  {
    title: 'Multi-System Ticket Relay',
    role: 'Sole author',
    proof: 'N-way sync with no privileged hub. 653 tests, 93% coverage, chaos-proved convergence.',
    href: '/work/multi-system-ticket-relay',
  },
  {
    title: 'Multi-Tenant Observability Portal',
    role: 'Lead',
    proof: 'Logs, traces, cost, and health from three data planes — every payload tagged with how fresh it really is.',
    href: '/work/multi-tenant-observability-portal',
  },
];

const beforeVizius = [
  { title: 'Self-hosted RAG (Mistral-7B)', href: '/work/self-hosted-rag-chatbot' },
  { title: 'Cloud RAG (Gemini)', href: '/work/cloud-rag-chatbot-gemini' },
  { title: 'Push notifications, TDD', href: '/work/godfocus-push-notifications' },
  { title: 'Code review & refactor roadmap', href: '/work/chosen-people-answers-architecture' },
];

export default function Home() {
  const latestPosts = getAllBlogPosts().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 text-center md:text-left pt-8 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)] text-sm font-semibold">
          {availabilityLong()}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-3">
          Adam Matthew Steinberger
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent mb-4">
          Staff Software Architect &amp; AI Automation Engineer
        </h2>
        <div className="scanline mx-auto md:mx-0 mb-6" aria-hidden="true" />
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto md:mx-0 mb-8">
          I build AI systems that actually work inside enterprise environments — production-grade
          platforms that handle real data, real security requirements, and real organizational
          complexity. Not just demos.
        </p>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
          <Link
            href="/hire-me"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
            style={{ color: '#ffffff' }}
          >
            Hire Me
          </Link>
          <a
            href="https://github.com/adammatthewsteinberger/resume/raw/main/adam-steinberger-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
          >
            Download Résumé
          </a>
          <AskAdam />
        </div>
        <p className="text-sm font-mono text-[var(--color-text-muted)] max-w-xl mx-auto md:mx-0">
          Most recently: five model vendors behind one policy-enforced API, three product teams
          migrated onto it, their credentials retired.
        </p>
      </section>

      {/* What I ship */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-2 text-center text-[var(--color-text-primary)]">
          What I Ship
        </h2>
        <p className="text-center text-[var(--color-text-muted)] mb-8">
          The past year at The Vizius Group. Every number is on the case study.
        </p>
        <div className="max-w-4xl mx-auto divide-y divide-[var(--color-dark-border)] border-y border-[var(--color-dark-border)]">
          {shipped.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-1 md:gap-6 py-4 no-underline hover:bg-[var(--color-dark-card)] transition-colors"
            >
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-green)]">{item.role}</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mb-0">{item.proof}</p>
            </Link>
          ))}
        </div>
        <p className="max-w-4xl mx-auto mt-6 text-sm text-[var(--color-text-muted)]">
          All of it on private AKS with OIDC workload identity and supply-chain scanning in CI.
          Around the code: five architecture document sets, identity-governance advisory for
          ~5,700 identities, the Security-First Scrum framework, and the firm&apos;s
          thought-leadership program.
        </p>
        <div className="text-center mt-6">
          <Link href="/work" className="text-[var(--color-accent-blue)] hover:underline font-medium">
            See all the work →
          </Link>
        </div>
      </section>

      {/* Specialties */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text-primary)]">
          Specialties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {specialties.map((group) => (
            <Link
              key={group.id}
              href={`/expertise#${group.id}`}
              className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors"
            >
              <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{group.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">{group.summary}</p>
              <p className="text-xs font-mono text-[var(--color-accent-blue)] mb-0">
                {group.stack.slice(0, 5).join(' · ')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How I work */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            How I Work
          </h2>
          <p className="text-[var(--color-text-muted)] mb-4 leading-relaxed">
            After 13+ years: the hardest part is never the technology — it&apos;s designing so
            the people who inherit it get a product that just works. Architecture before code.
            Juniors trained in parallel. Handoffs that hold.
          </p>
          <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
            I&apos;m a deep thinker and a purpose-driven craftsman. I document everything for the
            same reason a RAG pipeline cites its sources, and I communicate best with written
            documentation — a design document comes back before code does, because the expensive
            decisions get made before anyone opens an editor.
          </p>
          <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
            Before Vizius: four consulting engagements in six months —{' '}
            {beforeVizius.map((item, i) => (
              <span key={item.href}>
                <Link href={item.href} className="text-[var(--color-accent-blue)] hover:underline">
                  {item.title}
                </Link>
                {i < beforeVizius.length - 1 ? ', ' : ''}
              </span>
            ))}{' '}
            — and two years moving{' '}
            <Link href="/work/lima-one-microservices-suite" className="text-[var(--color-accent-blue)] hover:underline">
              Lima One Capital&apos;s integration layer from Mulesoft to NestJS microservices
            </Link>
            .
          </p>
          <Link href="/story" className="text-[var(--color-accent-blue)] hover:underline font-medium">
            Read the full story →
          </Link>
        </div>
      </section>

      {/* Open source */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-2 text-center text-[var(--color-text-primary)]">
          Open Source
        </h2>
        <p className="text-center text-[var(--color-text-muted)] mb-8">
          I primarily develop free and open-source software. All of it is MIT licensed and on PyPI.
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
        <p className="text-center text-[var(--color-text-muted)] mt-6 max-w-2xl mx-auto">
          Always open for a connection or a coffee — Greenville-remote or US-remote volunteers are
          welcome and encouraged to get involved at any time.{' '}
          <Link href="/join-me" className="text-[var(--color-accent-blue)] hover:underline">
            Everything a developer needs to get started →
          </Link>
        </p>
      </section>

      {/* Writing */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text-primary)]">
          Writing
        </h2>
        {latestPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors flex flex-col"
              >
                <span className="text-xs text-[var(--color-accent-blue)] font-medium mb-2">
                  {post.category}
                </span>
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
          <Link href="/writing" className="text-[var(--color-accent-blue)] hover:underline font-medium">
            All the writing →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-[var(--color-accent-blue)]/10 to-[var(--color-accent-green)]/10 border border-[var(--color-accent-blue)]/30 rounded-xl p-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
            Looking For
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Staff Software Architect · AI Automation Engineer · Staff/Principal AI Engineer ·
            Solutions Architect · Platform/Automation Engineer — Greenville-remote or US-remote,
            W2 preferred, contract-to-hire OK.
          </p>
          <Link
            href="/hire-me"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
            style={{ color: '#ffffff' }}
          >
            Everything a Recruiter Needs →
          </Link>
          <p className="text-sm text-[var(--color-text-muted)] mt-6 mb-0">
            Hiring for a business rather than an engineering team?{' '}
            <Link href="/for-executives" className="hover:underline">Read the executive edition</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
