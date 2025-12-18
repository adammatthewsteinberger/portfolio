import Link from 'next/link';
import MultipleCTAs from '@/components/MultipleCTAs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Site Directory | Adam Matthew Steinberger - AI Development Services',
  description:
    'Complete site directory of Adam Matthew Steinberger\'s AI development website. Browse all services, articles, blog posts, and resources for custom AI and chatbot solutions.',
  keywords:
    'site directory, website navigation, AI services directory, AI articles, chatbot resources, Adam Matthew Steinberger',
  authors: [{ name: 'Adam Matthew Steinberger' }],
  creator: 'Adam Matthew Steinberger',
  publisher: 'Adam Matthew Steinberger LLC',
  alternates: {
    canonical: '/site-directory',
  },
  openGraph: {
    title: 'Site Directory | Adam Matthew Steinberger AI Services',
    description:
      'Browse all AI development services, educational content, and resources from Adam Matthew Steinberger.',
    url: 'https://hire.adam.matthewsteinberger.com/site-directory',
    siteName:
      'Hire Adam Matthew Steinberger - Upstate South Carolina AI Expert',
    images: [
      {
        url: '/images/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Site Directory - Adam Matthew Steinberger',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Directory | AI Development Services',
    description:
      'Browse all AI services, articles, and resources from Adam Matthew Steinberger.',
    images: ['/images/social-preview.png'],
  },
};

export default function SiteDirectoryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center pt-4 pb-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent">
          Site Directory
        </h2>
      </section>

      {/* Main Services */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 text-center">
            <i className="fas fa-home text-4xl text-[var(--color-accent-gold)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Main Landing Page</h5>
            <p className="text-[var(--color-text-muted)] mb-4">Comprehensive overview of all AI services and expertise.</p>
            <Link href="/" className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium">
              Visit Main Page
            </Link>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center">
            <i className="fas fa-user text-4xl text-[var(--color-accent-purple)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">About Me</h5>
            <p className="text-[var(--color-text-muted)] mb-4">Learn about my background, experience, and neurodivergent strengths.</p>
            <Link href="/about" className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium">
              About Me
            </Link>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center">
            <i className="fas fa-envelope text-4xl text-[var(--color-accent-blue)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Contact Me</h5>
            <p className="text-[var(--color-text-muted)] mb-4">Schedule a free consultation to explore your options.</p>
            <Link href="/contact" className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium">
              Contact Me
            </Link>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center">
            <i className="fas fa-tools text-4xl text-[var(--color-accent-green)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">My Services</h5>
            <p className="text-[var(--color-text-muted)] mb-4">Comprehensive overview of all AI services and expertise.</p>
            <Link href="/services" className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium">
              Browse Services
            </Link>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center">
            <i className="fas fa-graduation-cap text-4xl text-[var(--color-accent-gold)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Novice to Navigator Series</h5>
            <p className="text-[var(--color-text-muted)] mb-4">A comprehensive 33-article series to learn about AI chatbots.</p>
            <Link href="/novice-to-navigator" className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium">
              Start Learning
            </Link>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center">
            <i className="fas fa-newspaper text-4xl text-[var(--color-accent-coral)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Blog</h5>
            <p className="text-[var(--color-text-muted)] mb-4">Insights, case studies, and the latest trends in AI technology.</p>
            <Link href="/blog" className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium">
              Read the Blog
            </Link>
          </div>
          <div className="md:col-span-2 bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center max-w-md mx-auto w-full">
            <i className="fas fa-envelope-open-text text-4xl text-[var(--color-accent-blue)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Newsletter</h5>
            <p className="text-[var(--color-text-muted)] mb-4">Stay updated with the latest AI trends and insights.</p>
            <a href="http://eepurl.com/jiYXCQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium">
              Subscribe Now
            </a>
          </div>
        </div>
      </section>

      <MultipleCTAs />
    </>
  );
}
