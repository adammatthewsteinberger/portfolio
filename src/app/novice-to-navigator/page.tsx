import { sections } from '@/data/articles';
import Link from 'next/link';
import MultipleCTAs from '@/components/MultipleCTAs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novice to Navigator: AI Chatbot Education Series | Adam Matthew Steinberger',
  description:
    'Master AI chatbot knowledge with this comprehensive 33-article series. Learn what AI chatbots are, how they work, and what to look for when hiring an expert. From complete beginner to confident decision-maker.',
  keywords:
    'AI chatbot education, AI learning series, chatbot tutorial, AI for beginners, GPT education, AI chatbot guide, custom AI solutions, Adam Matthew Steinberger, Greenville SC AI expert',
  authors: [{ name: 'Adam Matthew Steinberger' }],
  creator: 'Adam Matthew Steinberger',
  publisher: 'Adam Matthew Steinberger LLC',
  alternates: {
    canonical: '/novice-to-navigator',
  },
  openGraph: {
    title: 'Novice to Navigator: Master AI Chatbot Knowledge',
    description:
      'A comprehensive 33-article series designed to take you from complete beginner to confident decision-maker in AI chatbot development.',
    url: 'https://hire.adam.matthewsteinberger.com/novice-to-navigator',
    siteName:
      'Hire Adam Matthew Steinberger - Upstate South Carolina AI Expert',
    images: [
      {
        url: '/images/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Novice to Navigator AI Education Series',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novice to Navigator: AI Chatbot Education Series',
    description:
      '33-article series taking you from beginner to expert in AI chatbot knowledge. Learn how to make confident business decisions.',
    images: ['/images/social-preview.png'],
  },
};

export default function NoviceToNavigator() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center pt-8 pb-16">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent mb-4">
          Novice to Navigator
        </h2>
        <h3 className="text-xl font-semibold text-[var(--color-text-muted)] mb-6">
          Master AI Chatbot Knowledge to Make Confident Business Decisions
        </h3>
        <div className="max-w-2xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-coral)]/30 rounded-xl p-6 shadow-lg text-[var(--color-text-muted)]">
            A comprehensive 33-article series designed to take you from complete beginner to confident decision-maker. Learn what AI chatbots are, how they work, and what to look for when hiring an expert to build your custom solution. No technical background required.
          </div>
          <div className="mt-4 bg-[var(--color-accent-gold)]/10 border border-[var(--color-accent-gold)]/30 rounded-xl p-4 text-sm text-[var(--color-text-muted)] flex flex-wrap items-center justify-center gap-3">
            <span>
              📖 A <strong className="text-[var(--color-text-primary)]">second edition</strong> is in
              development, with real case studies and named research.
            </span>
            <a
              href="https://eepurl.com/jiYXCQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-gold)] hover:underline font-semibold whitespace-nowrap"
            >
              Get notified →
            </a>
          </div>
          <div className="mt-4">
            <Link
              href="/novice-to-navigator/readiness"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline text-sm font-semibold"
            >
              <i className="fas fa-clipboard-check"></i> Take the Chatbot Readiness Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Series Overview */}
      <section className="container mx-auto px-4 py-16">
        <h4 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent">
          What You&apos;ll Learn
        </h4>
        <div className="max-w-3xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6">
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <i className="fas fa-graduation-cap text-[var(--color-accent-blue)]"></i>
              Your Learning Journey
            </h5>
            <p className="text-[var(--color-text-muted)] mb-6">
              This series is designed using the Feynman Technique - explaining complex AI concepts in simple, understandable terms. Each section builds upon the previous one, ensuring you have the knowledge needed to make informed decisions about AI chatbot investments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h6 className="font-bold text-[var(--color-accent-blue)] mb-2">33 Comprehensive Articles</h6>
                <p className="text-[var(--color-text-muted)]">From basic AI concepts to advanced business applications</p>
              </div>
              <div>
                <h6 className="font-bold text-[var(--color-accent-blue)] mb-2">7 Progressive Sections</h6>
                <p className="text-[var(--color-text-muted)]">Structured learning path from beginner to confident decision-maker</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles by Section */}
      {sections.map((section, sectionIndex) => (
        <section key={section.title} className="container mx-auto px-4 py-16">
          <h4 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent">
            {sectionIndex === 0 && '🧠 '}
            {sectionIndex === 1 && '💬 '}
            {sectionIndex === 2 && '⚡ '}
            {sectionIndex === 3 && '🔧 '}
            {sectionIndex === 4 && '🛡️ '}
            {sectionIndex === 5 && '💼 '}
            {sectionIndex === 6 && '🤝 '}
            Section {sectionIndex + 1}: {section.title}
          </h4>
          <p className="text-center text-[var(--color-text-muted)] italic mb-8">{section.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {section.articles.map((article) => (
              <div key={article.slug} className="bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6">
                <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <i className="fas fa-question-circle text-[var(--color-accent-gold)]"></i>
                  {article.title}
                </h5>
                <p className="text-[var(--color-text-muted)] mb-4">{article.description}</p>
                <Link href={`/novice-to-navigator/${article.slug}`} className="block w-full text-center py-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] rounded-lg transition-colors no-underline font-medium" style={{ color: '#000000' }}>
                  Read Article
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <h4 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[var(--color-accent-green)] to-[var(--color-accent-green-light)] bg-clip-text text-transparent">
          Ready to Start Your AI Journey?
        </h4>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[var(--color-text-muted)] mb-6">
            Begin with the first article and work your way through the series. Each article builds on the previous one, ensuring you have a solid foundation for making informed AI decisions.
          </p>
          <Link
            href="/novice-to-navigator/what-is-ai-really"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 hover:from-amber-500 hover:to-[var(--color-accent-gold)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline"
            style={{ color: '#000000' }}
          >
            <i className="fas fa-play"></i> Start with my First Article: &ldquo;What is AI Really?&rdquo;
          </Link>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">Begin your journey from novice to navigator</p>
        </div>
      </section>

      {/* Multiple CTAs */}
      <MultipleCTAs />
    </>
  );
}
