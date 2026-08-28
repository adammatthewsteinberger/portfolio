import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { execOffer } from '@/data/exec';
import { EXEC_PREFIX } from '@/lib/edition';
import { getExecProjects, getProjectBySlug } from '@/lib/projectUtils';

interface ExecProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Only studies carrying both exec fields get a page here — and every one of
// them is, by construction, a study that already exists at /work/[slug].
export async function generateStaticParams() {
  return getExecProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ExecProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.execProblem || !project.execOutcome) {
    return { title: 'Not Found | For Executives' };
  }
  const url = `${EXEC_PREFIX}/work/${slug}`;
  return {
    title: `${project.title} | For Executives`,
    description: project.execProblem,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | For Executives | Adam Matthew Steinberger`,
      description: project.execProblem,
      url: `https://vibewithadam.matthewsteinberger.com${url}`,
    },
  };
}

export default async function ExecProjectPage({ params }: ExecProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.execProblem || !project.execOutcome) notFound();

  const others = getExecProjects().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div>
      <section className="container mx-auto px-4 pt-10 pb-8">
        <div className="max-w-3xl mx-auto">
          <nav className="mb-4 text-sm">
            <Link href={EXEC_PREFIX} className="text-[var(--color-accent-blue)] hover:underline">For executives</Link>
            <span className="text-[var(--color-text-muted)]"> / </span>
            <Link href={`${EXEC_PREFIX}/work`} className="text-[var(--color-accent-blue)] hover:underline">What changed</Link>
            <span className="text-[var(--color-text-muted)]"> / {project.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">{project.execProblem}</h1>
          <p className="text-sm font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
            {project.title} · {project.duration}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">What changed</h2>
            <p className="text-[var(--color-text-muted)] mb-0 leading-relaxed">{project.execOutcome}</p>
          </div>

          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">What it would take for you</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              This platform was built for one organization&apos;s constraints. The architecture, the
              documentation, and the handoff practice travel; the specifics get fitted to your systems,
              your identity provider, and your compliance regime. {execOffer.engage.body}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href={execOffer.engage.href}
                className="inline-flex items-center px-5 py-2.5 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
                style={{ color: '#ffffff' }}
              >
                {execOffer.engage.cta} →
              </Link>
              <Link
                href={execOffer.hire.href}
                className="inline-flex items-center px-5 py-2.5 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
              >
                Or hire me full-time
              </Link>
            </div>
          </div>

          <p className="text-[var(--color-text-muted)]">
            Want the architecture, the stack, and the trade-offs?{' '}
            <Link href={`/work/${slug}`} className="text-[var(--color-accent-blue)] hover:underline font-medium">
              Full technical version →
            </Link>
          </p>

          {others.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">Other problems removed</h2>
              <ul className="space-y-2 list-none pl-0">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link href={`${EXEC_PREFIX}/work/${other.slug}`} className="text-[var(--color-accent-blue)] hover:underline">
                      {other.execProblem}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
