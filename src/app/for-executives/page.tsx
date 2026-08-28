import Link from 'next/link';
import type { Metadata } from 'next';
import { execOffer, execRoutes } from '@/data/exec';
import { EXEC_PREFIX } from '@/lib/edition';
import { getExecProjects } from '@/lib/projectUtils';
import { OG_IMAGE } from '@/lib/seo';

const route = execRoutes[0];

export const metadata: Metadata = {
  title: 'For Executives',
  description:
    'Enterprise AI initiatives stall on security, data, and handoff — not on models. What changed for the teams Adam Matthew Steinberger worked with, and two ways to work with him.',
  alternates: { canonical: EXEC_PREFIX },
  openGraph: {
    images: [OG_IMAGE],
    title: 'For Executives | Adam Matthew Steinberger',
    description: 'Enterprise AI initiatives stall on security, data, and handoff — not on models.',
    url: `https://vibewithadam.matthewsteinberger.com${EXEC_PREFIX}`,
  },
};

const problems = [
  {
    title: 'Every team is doing AI its own way.',
    body: 'Each one holds its own vendor keys and its own retry logic. Nobody can say what a call cost, which project made it, or whether it was allowed — and one runaway loop can exhaust a shared quota for everyone.',
  },
  {
    title: 'The pilot worked. Production did not.',
    body: 'The demo ran on clean data with no approvals in the path. Real data has exceptions, real processes have a step that cannot be undone, and real regulators want to see who signed off.',
  },
  {
    title: 'Only one person can run it.',
    body: 'The system works until its author leaves. Then it is a black box with a salary attached, and every change waits for someone who is no longer there.',
  },
];

export default function ForExecutivesPage() {
  const studies = getExecProjects();

  return (
    <div>
      <section className="container mx-auto px-4 pt-10 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">{route.problem}</h1>
          <p className="text-xl text-[var(--color-text-muted)] leading-relaxed">
            Bottom line: the models are a commodity. What decides whether an AI platform survives
            contact with your organization is whether it handles your real data, your real security
            requirements, and your real organizational complexity — and whether the people who
            inherit it can run it without its author. That is the only kind of AI work I do.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">The problem, in your terms</h2>
          <div className="space-y-6">
            {problems.map((p) => (
              <div key={p.title} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{p.title}</h3>
                <p className="text-[var(--color-text-muted)] mb-0 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">What changed for the teams I worked with</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            One year, one cybersecurity firm, six platforms. Each one below is a problem that no longer exists.
          </p>
          <ul className="space-y-4 list-none pl-0">
            {studies.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`${EXEC_PREFIX}/work/${study.slug}`}
                  className="block bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors"
                >
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">{study.title}</span>
                  <p className="text-[var(--color-text-primary)] font-semibold mt-1 mb-2">{study.execProblem}</p>
                  <p className="text-sm text-[var(--color-text-muted)] mb-0">{study.execOutcome}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href={`${EXEC_PREFIX}/work`} className="text-[var(--color-accent-blue)] hover:underline">All of them, on one page →</Link>
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Two ways to work with me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[execOffer.hire, execOffer.engage].map((door) => (
              <div key={door.href} className="bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6 flex flex-col">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{door.title}</h3>
                <p className="text-[var(--color-text-muted)] flex-grow leading-relaxed">{door.body}</p>
                <Link
                  href={door.href}
                  className="inline-flex items-center justify-center px-5 py-2.5 mt-4 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
                  style={{ color: '#ffffff' }}
                >
                  {door.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">New to AI chatbots?</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            I wrote the plain-English guide. The first edition of{' '}
            <em>Novice to Navigator: Your Guide to AI Chatbots for Business</em> is free to read, and the
            readiness quiz takes about thirty minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/novice-to-navigator" className="text-[var(--color-accent-blue)] hover:underline font-medium">Read the first edition free →</Link>
            <Link href="/novice-to-navigator/readiness" className="text-[var(--color-accent-blue)] hover:underline font-medium">Take the readiness quiz →</Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 text-center">
        <p className="text-[var(--color-text-muted)]">
          Prefer the technical version? Everything here, in full detail, is on the{' '}
          <Link href="/" className="text-[var(--color-accent-blue)] hover:underline">engineering site</Link>.
        </p>
      </section>
    </div>
  );
}
