import Link from 'next/link';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { availabilityFact, availabilityLong } from '@/lib/availability';

export const metadata: Metadata = {
  title: 'Hire Me | Adam Matthew Steinberger — Staff Software Architect & AI Automation Engineer',
  description:
    'Available from September 2026. Staff Software Architect & AI Automation Engineer — RAG systems, event-driven Azure microservices, automation pipelines. Greenville, SC (remote) or US remote.',
  alternates: { canonical: '/hire-me' },
  openGraph: {
    title: 'Hire Me | Adam Matthew Steinberger',
    description:
      'Available from September 2026. Staff Software Architect & AI Automation Engineer — RAG systems, event-driven Azure microservices, automation pipelines.',
    url: 'https://hire.adam.matthewsteinberger.com/hire-me',
  },
};

const facts: { label: string; value: string }[] = [
  { label: 'Target titles', value: 'Staff Software Architect · AI Automation Engineer · Staff/Principal AI Engineer · Solutions Architect' },
  { label: 'Location', value: 'Greenville, SC — remote preferred; open to US remote anywhere' },
  { label: 'Available', value: availabilityFact() },
  { label: 'Employment types', value: 'W2 full-time preferred; contract-to-hire considered' },
  { label: 'Work authorization', value: 'US citizen — no sponsorship required' },
  {
    label: 'Specialties',
    value:
      'Azure (AKS, Functions, Service Bus, Bicep, Terraform, Key Vault) · Python and .NET backends · event-driven microservices · RAG, multi-vendor LLM gateways, AI governance (Claude, GPT, Gemini, Mistral, vLLM) · Kubernetes, Helm, GitOps, secretless DevSecOps · identity governance (Okta IGA, Entra ID, SAML/OIDC)',
  },
  {
    label: 'Verify me',
    value:
      'Ask my résumé at chat.adam.matthewsteinberger.com, read the packages on PyPI, or read the code on GitHub — every claim on this site is checkable.',
  },
];

const looking: string[] = [
  'A team where AI, automation, and architecture are the core of the role — not a side quest',
  'Ownership of hard, ambiguous problems with room to design the solution, not just implement a ticket',
  'A culture that treats written specs and async communication as a strength, not a workaround',
  'Greenville, SC-based or fully remote — I do not need to be in an office to do my best work',
];

const notLooking: string[] = [
  'Pure front-end or design roles with no backend/architecture component',
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

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            How to get the best signal out of me
          </h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            A live whiteboard measures how fast someone improvises under an audience. That is
            not the job. If you want to see how I actually architect systems, these cost you
            nothing and tell you far more:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
            <li>A take-home or a walkthrough of real work over a live whiteboard, where possible</li>
            <li>Technical questions shared in advance — you&apos;ll get a considered answer, not a rehearsed one</li>
            <li>An agenda before the call so we spend the time on substance</li>
            <li>Happy to be judged on shipped code: every case study on this site is real work with real constraints</li>
          </ul>
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
          Hiring for a business rather than an engineering team?{' '}
          <Link href="/for-executives" className="hover:underline">Read the executive edition</Link>.
        </p>
      </section>
    </div>
  );
}
