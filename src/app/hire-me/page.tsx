import Link from 'next/link';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { availabilityFact, availabilityHeading, availabilityLong } from '@/lib/availability';
import { method, staffEvidence } from '@/data/evidence';
import { OG_IMAGE } from '@/lib/seo';

const DESCRIPTION =
  'Staff Software Architect & AI Automation Engineer: AI platforms, auth and identity, and secretless, auditable deployments for regulated environments. US citizen, Greenville, SC or US remote.';

export const metadata: Metadata = {
  title: 'Hire Me | Adam Matthew Steinberger — Staff Software Architect & AI Automation Engineer',
  description: `${availabilityHeading()}. ${DESCRIPTION}`,
  alternates: { canonical: '/hire-me' },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Hire Me | Adam Matthew Steinberger',
    description: `${availabilityHeading()}. ${DESCRIPTION}`,
    url: 'https://vibewithadam.matthewsteinberger.com/hire-me',
  },
};

const facts: { label: string; value: string }[] = [
  {
    label: 'Target roles',
    value:
      'Staff+ Software Engineer (AI platform, auth and identity, regulated and public-sector deployments) · Forward Deployed AI Engineer · Staff Software Architect',
  },
  { label: 'Location', value: 'Greenville, SC — remote preferred; open to US remote anywhere' },
  { label: 'Available', value: availabilityFact() },
  { label: 'Employment types', value: 'W2 full-time preferred; contract-to-hire considered' },
  { label: 'Work authorization', value: 'US citizen — no sponsorship required' },
  {
    label: 'Specialties',
    value:
      'Identity and access (Entra ID, Okta core/IGA/Workflows, SAML 2.0, OIDC, workload identity federation) · AI platforms (multi-vendor LLM gateways, agent orchestration and sandboxing, RAG, MCP) · security and compliance (secretless delivery, SBOM and keyless signing, policy-as-code admission, STRIDE, SOC 2 readiness, OWASP LLM Top 10, NIST AI RMF) · platform (private AKS, Terraform, Helm, GitOps) · Python, TypeScript, C#/.NET',
  },
  {
    label: 'Verify me',
    value:
      'Ask my résumé at chatwithadam.matthewsteinberger.com, run the packages from PyPI, or read the code on GitHub. Every claim on this site is checkable.',
  },
];

const looking: string[] = [
  'A role where AI platform, identity, or security architecture is the job, not a side quest',
  'Hard, ambiguous problems, with room to design the solution and not only implement a ticket',
  'A team that writes things down: design docs, decision records, and reviews in the open',
  'Greenville, SC-based or US remote',
];

const notLooking: string[] = [
  'Pure front-end or design roles with no backend or architecture component',
  'On-call-heavy support rotations with no engineering ownership attached',
  'Roles requiring daily in-person presence in an office outside the Greenville area',
];

export default function HireMePage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)] text-sm font-semibold">
          {availabilityLong()}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Hire Me
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Everything a recruiter or hiring manager needs, in one place — no scrolling through a
          blog to find it.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl overflow-hidden">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 p-4 md:p-5 ${
                i !== facts.length - 1 ? 'border-b border-[var(--color-dark-border)]' : ''
              }`}
            >
              <span className="shrink-0 w-full md:w-40 text-sm font-semibold text-[var(--color-text-muted)]">
                {fact.label}
              </span>
              <span className="text-[var(--color-text-primary)]">{fact.value}</span>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-6 flex flex-wrap gap-3 justify-center">
          <a
            href="https://github.com/adammatthewsteinberger/resume/raw/main/adam-steinberger-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
            style={{ color: '#ffffff' }}
          >
            Download Résumé (PDF)
          </a>
          <a
            href="https://www.linkedin.com/in/adammatthewsteinberger/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/adammatthewsteinberger"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12" aria-labelledby="evidence-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="evidence-heading" className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Staff-level evidence
          </h2>
          <div className="divide-y divide-[var(--color-dark-border)] border-y border-[var(--color-dark-border)]">
            {staffEvidence.map((item) => (
              <Link key={item.claim} href={item.href} className="block py-4 no-underline hover:bg-[var(--color-dark-card)] transition-colors">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{item.claim}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{item.proof}</p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            Open source, in public:{' '}
            <Link href="/work/vibey-conductor" className="text-[var(--color-accent-blue)] hover:underline">
              vibey
            </Link>
            , a ledger-mediated conductor for coding agents, chaos-tested at 500 jobs with 20% of
            workers dropped mid-job and none lost.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12" aria-labelledby="how-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="how-heading" className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            How I work
          </h2>
          <ol className="list-decimal pl-6 space-y-1 text-[var(--color-text-primary)] mb-4">
            {method.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="text-[var(--color-text-muted)] mb-0">
            My strongest work is in writing: a design before the code, a decision record for
            every choice that matters, and a short written recap after every conversation, so
            nothing we agreed depends on memory. For an interview loop, I&apos;m glad to do a
            take-home or walk through real code from any case study on this site.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
              What I&apos;m looking for
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
              {looking.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
              What I&apos;m not looking for
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
              {notLooking.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
            Want to talk?
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Tell me about the role — I&apos;ll get back to you within 24 hours. References
            available on request.
          </p>
          <ContactForm />
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 text-center">
        <p className="text-[var(--color-text-muted)]">
          Want to see the proof first?{' '}
          <Link href="/work" className="text-[var(--color-accent-blue)] hover:underline">
            Browse the case studies
          </Link>{' '}
          or{' '}
          <Link href="/expertise" className="text-[var(--color-accent-blue)] hover:underline">
            the technical stack
          </Link>
          .
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mt-6">
          Prefer to contribute first?{' '}
          <Link href="/join-me#developers" className="hover:underline">Help build vibey — how to get started</Link>.
        </p>
      </section>
    </div>
  );
}
