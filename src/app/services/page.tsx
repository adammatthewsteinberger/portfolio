import MultipleCTAs from '@/components/MultipleCTAs';
import { serviceCategories } from '@/data/services';
import Link from 'next/link';
import styles from './ServicePage.module.css';
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
    siteName:
      'Hire Adam Matthew Steinberger - Upstate South Carolina AI Expert',
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
    <div className={styles.servicePageBg}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-10'>
            <h1 className={styles.headline}>AI Development Services</h1>
            <p
              className='lead text-center mb-5'
              style={{ fontSize: '1.25rem', lineHeight: 1.7 }}
            >
              Comprehensive AI development services tailored for Greenville,
              South Carolina businesses.
              <br />
              From custom chatbots to enterprise AI solutions, I help businesses
              leverage AI technology effectively.
            </p>

            {serviceCategories.map((category, index) => (
              <div key={index} className={styles.section}>
                <h2 className={styles.sectionTitle + ' section-headline-gold'}>
                  {category.title}
                </h2>
                <p
                  className='text-secondary mb-4'
                  style={{ fontSize: '1.1rem' }}
                >
                  {category.description}
                </p>
                <div className='row g-4'>
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className='col-md-6 col-lg-4'>
                      <div
                        className={styles.card + ' card solution-card h-100'}
                      >
                        <div className='card-body d-flex flex-column'>
                          <h5 className={styles.cardTitle}>{service.title}</h5>
                          <p className={styles.cardText + ' flex-grow-1'}>
                            {service.description}
                          </p>
                          <Link
                            href={`/services/${service.slug}`}
                            className='btn btn-outline-primary btn-sm mt-auto fw-bold px-3 py-2'
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <MultipleCTAs />
          </div>
        </div>
      </div>
    </div>
  );
}
