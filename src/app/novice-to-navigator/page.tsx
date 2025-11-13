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
    <main>
      {/* Hero Section */}
      <section className="container text-center my-5" style={{marginTop: '0 !important', paddingTop: '0 !important'}}>
        <h2 className="fw-bold headline-gradient" style={{fontSize: '2.7rem'}}>Novice to Navigator</h2>
        <br />
        <h3 className="fw-semibold mb-3 headline-gradient" style={{fontSize: '1.35rem'}}>
          Master AI Chatbot Knowledge to Make Confident Business Decisions
        </h3>
        {/* <div className="mb-4">
          <div className="ratio ratio-16x9" style={{maxWidth: '800px', margin: '0 auto'}}>
            <iframe 
              src="https://www.youtube.com/embed/fhiWkaK_pt8" 
              title="Novice to Navigator" 
              allowFullScreen
            ></iframe>
          </div>
        </div> */}
        <div className="mx-auto mb-4" style={{maxWidth: '700px'}}>
          <div className="alert custom-alert p-4 mb-4 shadow-lg">
            A comprehensive 33-article series designed to take you from complete beginner to confident decision-maker. Learn what AI chatbots are, how they work, and what to look for when hiring an expert to build your custom solution. No technical background required.
          </div>
        </div>
      </section>

      {/* Series Overview */}
      <section className="container my-3">
        <h4 className="fw-bold mb-4 section-headline-gold text-center">What You&apos;ll Learn</h4>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card purple-box knowledge-card mb-4">
              <h5 className="mb-3"><i className="fas fa-graduation-cap"></i> Your Learning Journey</h5>
              <p>This series is designed using the Feynman Technique - explaining complex AI concepts in simple, understandable terms. Each section builds upon the previous one, ensuring you have the knowledge needed to make informed decisions about AI chatbot investments.</p>
              <div className="row mt-4">
                <div className="col-md-6">
                  <h6 className="fw-bold text-primary">📚 33 Comprehensive Articles</h6>
                  <p>From basic AI concepts to advanced business applications</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold text-primary">🎯 7 Progressive Sections</h6>
                  <p>Structured learning path from beginner to confident decision-maker</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles by Section */}
      {sections.map((section, sectionIndex) => (
        <section key={section.title} className="container my-5">
          <h4 className="fw-bold mb-4 section-headline-blue text-center">
            {sectionIndex === 0 && '🧠 '}
            {sectionIndex === 1 && '💬 '}
            {sectionIndex === 2 && '⚡ '}
            {sectionIndex === 3 && '🔧 '}
            {sectionIndex === 4 && '🛡️ '}
            {sectionIndex === 5 && '💼 '}
            {sectionIndex === 6 && '🤝 '}
            Section {sectionIndex + 1}: {section.title}
          </h4>
          <p className="text-center mb-4"><em>{section.description}</em></p>
          <div className="row justify-content-center g-4">
            {section.articles.map((article) => (
              <div key={article.slug} className="col-md-6">
                <div className="card golden-box solution-card">
                  <h5><i className="fas fa-question-circle"></i> {article.title}</h5>
                  <p>{article.description}</p>
                  <Link href={`/novice-to-navigator/${article.slug}`} className="btn btn-primary w-100 mt-3">
                    Read Article
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="container my-5">
        <h4 className="fw-bold section-headline-green text-center">Ready to Start Your AI Journey?</h4>
        <div className="text-center my-4">
          <p className="mb-4">Begin with the first article and work your way through the series. Each article builds on the previous one, ensuring you have a solid foundation for making informed AI decisions.</p>
          <Link href="/novice-to-navigator/what-is-ai-really" className="btn-custom btn btn-lg fw-bold shadow-lg px-5 py-3 demo-btn">
            <i className="fas fa-play"></i> Start with my First Article: &ldquo;What is AI Really?&rdquo;
          </Link>
          <p className="mt-3 text-secondary">Begin your journey from novice to navigator</p>
        </div>
      </section>

      {/* Multiple CTAs */}
      <MultipleCTAs />
    </main>
  );
} 