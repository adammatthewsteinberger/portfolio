import Link from 'next/link';
import type { Metadata } from 'next';
import MultipleCTAs from '@/components/MultipleCTAs';
import { execRoutes } from '@/data/exec';
import { EXEC_PREFIX } from '@/lib/edition';
import { getExecProjects } from '@/lib/projectUtils';

const route = execRoutes[1];

export const metadata: Metadata = {
  title: 'What Changed | For Executives',
  description: 'Six enterprise AI platforms, each stated as the problem it removed and what changed — for the reader who has to decide, not build.',
  alternates: { canonical: route.execUrl },
  openGraph: {
    title: 'What Changed | For Executives | Adam Matthew Steinberger',
    description: 'Six enterprise AI platforms, each stated as the problem it removed and what changed.',
    url: `https://hire.adam.matthewsteinberger.com${route.execUrl}`,
  },
};

export default function ExecWorkPage() {
  const studies = getExecProjects();

  return (
    <div>
      <section className="container mx-auto px-4 pt-10 pb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">{route.problem}</h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            Credential sprawl, pilots that die on real data, systems only their author can run. Each
            platform below is one of those problems, stated first, followed by what changed. The full
            engineering write-up is one click away on every one.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {studies.map((study) => (
            <article key={study.slug} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">{study.title}</span>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mt-1 mb-3">{study.execProblem}</h2>
              <p className="text-[var(--color-text-muted)] mb-4">{study.execOutcome}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href={`${EXEC_PREFIX}/work/${study.slug}`} className="text-[var(--color-accent-blue)] hover:underline font-medium">What it would take for you →</Link>
                <Link href={`/work/${study.slug}`} className="text-[var(--color-text-muted)] hover:underline">Full technical version</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <MultipleCTAs edition="exec" />
    </div>
  );
}
