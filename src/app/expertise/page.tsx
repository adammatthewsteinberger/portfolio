import Link from 'next/link';
import { Metadata } from 'next';
import { fullStack, specialtyGroups } from '@/data/expertise';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Expertise | Adam Matthew Steinberger',
  description:
    'Azure (AKS, Functions, Service Bus, Bicep, Terraform, Key Vault) · Python and .NET backends · event-driven microservices · RAG, multi-vendor LLM gateways, AI governance · Kubernetes, Helm, GitOps, secretless DevSecOps · identity governance (Okta IGA, Entra ID, SAML/OIDC).',
  alternates: { canonical: '/expertise' },
  openGraph: {
    title: 'Expertise | Adam Matthew Steinberger',
    description:
      'Azure · Python and .NET backends · event-driven microservices · RAG, multi-vendor LLM gateways, AI governance · Kubernetes, Helm, GitOps, secretless DevSecOps · identity governance.',
    url: 'https://vibewithadam.matthewsteinberger.com/expertise',
  },
};

const titleBySlug = new Map(projects.map((p) => [p.slug, p.title]));

export default function ExpertisePage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Expertise
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Six specialties and how I design. Each one in full, with the rule I actually apply and
          the work where I applied it.
        </p>
      </section>

      <section className="container mx-auto px-4 py-4">
        <nav aria-label="Specialties" className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center mb-8">
          {specialtyGroups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="px-3 py-1.5 text-sm rounded-full bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] no-underline"
            >
              {group.title}
            </a>
          ))}
        </nav>

        <div className="max-w-4xl mx-auto space-y-12">
          {specialtyGroups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">{group.title}</h2>
              <p className="text-[var(--color-text-muted)] mb-4">{group.summary}</p>
              <p className="text-xs font-mono text-[var(--color-accent-blue)] mb-6">
                {group.stack.join(' · ')}
              </p>

              <div className="space-y-4">
                {group.pillars.map((pillar) => (
                  <article
                    key={pillar.id}
                    id={pillar.id}
                    className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 scroll-mt-24"
                  >
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">{pillar.title}</h3>
                    <p className="text-[var(--color-text-muted)] mb-3">{pillar.engineer}</p>
                    <p className="text-sm italic text-[var(--color-accent-blue)] mb-0">{pillar.rule}</p>
                  </article>
                ))}
              </div>

              <p className="text-sm text-[var(--color-text-muted)] mt-4">
                <span className="font-semibold text-[var(--color-text-primary)]">Where I&apos;ve done it: </span>
                {group.where.map((slug, i) => (
                  <span key={slug}>
                    <Link href={`/work/${slug}`} className="text-[var(--color-accent-blue)] hover:underline">
                      {titleBySlug.get(slug)}
                    </Link>
                    {i < group.where.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            </section>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
            The Stack
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {fullStack().map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
          style={{ color: '#ffffff' }}
        >
          See it in production →
        </Link>
      </section>
    </div>
  );
}
