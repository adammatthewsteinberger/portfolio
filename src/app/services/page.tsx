import MultipleCTAs from '@/components/MultipleCTAs';
import { serviceCategories } from '@/data/services';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Development Services | Greenville SC | Adam Matthew Steinberger',
  description:
    'Comprehensive AI development services tailored for Greenville, South Carolina businesses. From custom chatbots to enterprise AI solutions, specialized expertise across industries and locations.',
  keywords:
    'AI development services, custom AI solutions Greenville SC, chatbot development, enterprise AI, AI consulting, GPT solutions, RAG systems, Adam Matthew Steinberger, Upstate AI expert',
  authors: [{ name: 'Adam Matthew Steinberger' }],
  creator: 'Adam Matthew Steinberger',
  publisher: 'Adam Matthew Steinberger LLC',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'AI Development Services for Greenville & Upstate SC Businesses',
    description:
      'From custom chatbots to enterprise AI solutions, comprehensive services tailored for your business needs across all industries.',
    url: 'https://hire.adam.matthewsteinberger.com/services',
    siteName: 'Adam Matthew Steinberger',
    images: [
      {
        url: '/images/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'AI Development Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Development Services | Greenville SC',
    description:
      'Comprehensive AI solutions for businesses. Custom chatbots, enterprise AI, industry-specific expertise.',
    images: ['/images/social-preview.png'],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent">
            AI Development Services
          </h1>
          <p className="text-xl text-center text-[var(--color-text-muted)] mb-16 max-w-3xl mx-auto leading-relaxed">
            Comprehensive AI development services tailored for Greenville,
            South Carolina businesses.
            <br />
            From custom chatbots to enterprise AI solutions, I help businesses
            leverage AI technology effectively.
          </p>

          {serviceCategories.map((category, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent">
                {category.title}
              </h2>
              <p className="text-lg text-center text-[var(--color-text-muted)] mb-8">
                {category.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 flex flex-col h-full hover:border-[var(--color-accent-blue)]/50 transition-colors"
                  >
                    <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                      {service.title}
                    </h5>
                    <p className="text-[var(--color-text-muted)] flex-grow mb-4">
                      {service.description}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center justify-center px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg font-bold text-sm transition-colors no-underline mt-auto"
                    >
                      Learn More
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <MultipleCTAs edition="exec" />
        </div>
      </div>
    </div>
  );
}
