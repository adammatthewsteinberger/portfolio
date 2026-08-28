import type { Metadata } from 'next';
import { ReadinessQuiz } from '@/components/ReadinessQuiz';

export const metadata: Metadata = {
  title: 'Chatbot Readiness Quiz | Novice to Navigator',
  description:
    'A 15-factor, four-pillar self-assessment: is your organization actually ready for a custom AI chatbot? Answer honestly and find out which pillar is your weakest.',
  alternates: { canonical: "/novice-to-navigator/readiness" },
  openGraph: {
    title: 'Chatbot Readiness Quiz | Novice to Navigator',
    description: 'A 15-factor self-assessment for AI chatbot readiness.',
    url: 'https://vibewithadam.matthewsteinberger.com/novice-to-navigator/readiness',
  },
};

export default function ReadinessPage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Are You Actually Ready for a Chatbot?
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Fifteen factors, four pillars. Readiness is not a technical question — it&apos;s an
          organizational one, and the weakest pillar is where a deployment fails.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <ReadinessQuiz />
      </section>
    </div>
  );
}
