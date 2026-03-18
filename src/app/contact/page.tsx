import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Adam Matthew Steinberger | AI Development Consultation',
  description:
    'Get in touch with Adam Matthew Steinberger for AI development projects, custom chatbot solutions, and technology consulting in Greenville, SC. Schedule a free consultation today.',
  keywords:
    'contact AI developer, AI consultation Greenville SC, hire chatbot developer, AI project inquiry, custom AI solutions contact, Adam Matthew Steinberger contact',
  authors: [{ name: 'Adam Matthew Steinberger' }],
  creator: 'Adam Matthew Steinberger',
  publisher: 'Adam Matthew Steinberger LLC',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Adam Matthew Steinberger | AI Development Consultation',
    description:
      'Schedule a free consultation for AI development projects and custom chatbot solutions. Based in Greenville, SC.',
    url: 'https://hire.adam.matthewsteinberger.com/contact',
    siteName:
      'Hire Adam Matthew Steinberger - Upstate South Carolina AI Expert',
    images: [
      {
        url: '/images/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Contact Adam Matthew Steinberger',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Adam Matthew Steinberger | AI Development',
    description:
      'Schedule a free consultation for AI development and custom chatbot solutions in Greenville, SC.',
    images: ['/images/social-preview.png'],
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 pt-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Get In Touch</h1>
          <p className="text-xl text-[var(--color-text-muted)]">
            Ready to start your AI project? Let&apos;s discuss how I can help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 shadow-lg text-center h-full">
            <i className="fas fa-calendar-alt text-4xl text-[var(--color-accent-blue)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Schedule a Call</h5>
            <p className="text-[var(--color-text-muted)] mb-4">
              Book a free consultation to discuss your project requirements and timeline.
            </p>
            <a
              href="https://tidycal.com/adammatthewsteinberger"
              className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Consultation
            </a>
          </div>

          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 shadow-lg text-center h-full">
            <i className="fas fa-envelope text-4xl text-[var(--color-accent-blue)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Email Directly</h5>
            <p className="text-[var(--color-text-muted)] mb-4">
              Send me a direct email for quick questions or detailed project discussions.
            </p>
            <a
              href="mailto:adam@matthewsteinberger.com"
              className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium"
            >
              Send Email
            </a>
          </div>

          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 shadow-lg text-center h-full">
            <i className="fas fa-comments text-4xl text-[var(--color-accent-blue)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Try My Chatbot</h5>
            <p className="text-[var(--color-text-muted)] mb-4">
              Experience my AI chatbot technology firsthand to see what&apos;s possible.
            </p>
            <a
              href="https://chat.adam.matthewsteinberger.com"
              className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo Chatbot
            </a>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Or Send Me a Message</h2>
          <p className="text-[var(--color-text-muted)]">
            Fill out the form below and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
