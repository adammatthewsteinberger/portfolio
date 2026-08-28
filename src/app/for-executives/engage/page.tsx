import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { EXEC_BOOKING_URL, execOffer, execRoutes } from '@/data/exec';

const route = execRoutes[2];

export const metadata: Metadata = {
  title: 'Engage | For Executives',
  description:
    'Adam Matthew Steinberger LLC tailors and whitelabels enterprise AI platforms to your systems, identity provider, and compliance regime — with the documentation and handoff that let your team run them.',
  alternates: { canonical: route.execUrl },
  openGraph: {
    title: 'Engage | For Executives | Adam Matthew Steinberger',
    description: 'Tailored and whitelabeled enterprise AI platforms, with the handoff included.',
    url: `https://vibe.with.adam.matthewsteinberger.com${route.execUrl}`,
  },
};

const included = [
  { title: 'Discovery and an architecture document set', body: 'Structured interviews, a design document, an executive summary, and a threat model — before any code. The expensive decisions get made on paper.' },
  { title: 'Built on your stack', body: 'Azure first (AKS, Functions, Service Bus, Key Vault), but the architecture is the product, not the vendor. Python or .NET backends, event-driven where a real boundary demands it.' },
  { title: 'Fitted to your identity and compliance regime', body: 'Your identity provider (Okta, Entra ID, SAML/OIDC), no credentials in the path, and an audit trail that a regulator can read.' },
  { title: 'Your people trained in parallel', body: 'A junior developer on your side is trained while the platform is built, so the handoff is to someone who already knows it — not a binder.' },
  { title: 'A handoff that holds', body: 'Documentation, runbooks, and a system your team can change without me. If you still need me afterward, the engagement was not finished.' },
];

export default function EngagePage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-10 pb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">{route.problem}</h1>
          <p className="text-xl text-[var(--color-text-muted)] leading-relaxed">
            Bottom line: {execOffer.engage.body}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">What an engagement includes</h2>
          <ol className="space-y-4 list-none pl-0">
            {included.map((item, i) => (
              <li key={item.title} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-5 flex gap-4">
                <span className="font-mono text-[var(--color-accent-blue)] shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-0">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[var(--color-text-muted)] mt-6">
            The full catalogue of service pages is at{' '}
            <Link href="/services" className="text-[var(--color-accent-blue)] hover:underline">/services</Link>.
            Every engagement is scoped to the problem, not to a package.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Talk it through</h2>
            <p className="text-[var(--color-text-muted)] mb-4">Thirty minutes on your problem, no deck.</p>
            <a
              href={EXEC_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
              style={{ color: '#ffffff' }}
            >
              Book a call
            </a>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{execOffer.hire.title}</h2>
            <p className="text-[var(--color-text-muted)] mb-4">{execOffer.hire.body}</p>
            <Link href={execOffer.hire.href} className="text-[var(--color-accent-blue)] hover:underline font-medium">
              {execOffer.hire.cta} →
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Or write to me</h2>
          <p className="text-[var(--color-text-muted)] mb-2">Tell me the problem, not the solution you have in mind. I reply within 24 hours.</p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
