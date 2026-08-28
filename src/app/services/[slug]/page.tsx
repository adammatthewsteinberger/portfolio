import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { getServiceBySlug, getServiceMetadata } from '@/lib/serviceUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import MultipleCTAs from '@/components/MultipleCTAs';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const serviceMetadata = getServiceMetadata(slug);

  if (!serviceMetadata) {
    return {
      title: 'Service Not Found',
    };
  }

  // Clean description - remove <newline> tags and get first paragraph
  const cleanDescription = serviceMetadata.description
    .split('<newline>')[0]
    .replace(/<[^>]*>/g, '')
    .trim();

  const pageTitle = `${serviceMetadata.title} | Adam Matthew Steinberger`;
  const pageUrl = `https://hire.adam.matthewsteinberger.com/services/${slug}`;

  return {
    title: pageTitle,
    description: cleanDescription,
    keywords: `${serviceMetadata.title}, ${serviceMetadata.category}, AI development Greenville SC, custom AI solutions, Adam Matthew Steinberger`,
    authors: [{ name: 'Adam Matthew Steinberger' }],
    creator: 'Adam Matthew Steinberger',
    publisher: 'Adam Matthew Steinberger LLC',
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: serviceMetadata.title,
      description: cleanDescription,
      url: pageUrl,
      siteName: 'Adam Matthew Steinberger',
      images: [
        {
          url: '/images/social-preview.png',
          width: 1200,
          height: 630,
          alt: serviceMetadata.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: serviceMetadata.title,
      description: cleanDescription,
      images: ['/images/social-preview.png'],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const serviceIndex = services.findIndex(s => s.slug === slug);
  const service = services[serviceIndex];

  if (!service) {
    notFound();
  }

  const serviceContent = getServiceBySlug(slug);

  if (!serviceContent) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center pt-8 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent">
          {serviceContent.heroTitle}
        </h1>
        <h2 className="text-xl text-[var(--color-text-muted)] mb-8">
          {serviceContent.heroSubtitle}
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-coral)]/30 rounded-xl p-6 shadow-lg text-lg leading-relaxed text-[var(--color-text-muted)]">
            {serviceContent.description.split('<newline>').map((paragraph, index) => (
              <p key={index} className={index > 0 ? 'mt-4' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Choice 1, 2, 3 */}
      <section className="container mx-auto px-4 py-16">
        <h4 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent">
          {serviceContent.whyChoose}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 text-center">
            <Icon name={serviceContent.choice1Icon} className="text-4xl text-[var(--color-accent-gold)] mb-4" />
            <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{serviceContent.choice1Title}</h5>
            <p className="text-[var(--color-text-muted)]">{serviceContent.choice1Description}</p>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 text-center">
            <Icon name={serviceContent.choice2Icon} className="text-4xl text-[var(--color-accent-blue)] mb-4" />
            <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{serviceContent.choice2Title}</h5>
            <p className="text-[var(--color-text-muted)]">{serviceContent.choice2Description}</p>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 text-center">
            <Icon name={serviceContent.choice3Icon} className="text-4xl text-[var(--color-accent-purple)] mb-4" />
            <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{serviceContent.choice3Title}</h5>
            <p className="text-[var(--color-text-muted)]">{serviceContent.choice3Description}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h4 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-green)] to-[var(--color-accent-green-light)] bg-clip-text text-transparent">
          {serviceContent.featuresOffered}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
            <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <Icon name={serviceContent.feature1Icon} className="text-[var(--color-accent-blue)]" />
              {serviceContent.feature1Title}
            </h5>
            <p className="text-[var(--color-text-muted)]">{serviceContent.feature1Description}</p>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
            <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <Icon name={serviceContent.feature2Icon} className="text-[var(--color-accent-blue)]" />
              {serviceContent.feature2Title}
            </h5>
            <p className="text-[var(--color-text-muted)]">{serviceContent.feature2Description}</p>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
            <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <Icon name={serviceContent.feature3Icon} className="text-[var(--color-accent-blue)]" />
              {serviceContent.feature3Title}
            </h5>
            <p className="text-[var(--color-text-muted)]">{serviceContent.feature3Description}</p>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
            <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <Icon name={serviceContent.feature4Icon} className="text-[var(--color-accent-blue)]" />
              {serviceContent.feature4Title}
            </h5>
            <p className="text-[var(--color-text-muted)]">{serviceContent.feature4Description}</p>
          </div>
          {serviceContent.feature5Title && serviceContent.feature5Description && (
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
              <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                <Icon name={serviceContent.feature5Icon} className="text-[var(--color-accent-blue)]" />
                {serviceContent.feature5Title}
              </h5>
              <p className="text-[var(--color-text-muted)]">{serviceContent.feature5Description}</p>
            </div>
          )}
          {serviceContent.feature6Title && serviceContent.feature6Description && (
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
              <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                <Icon name={serviceContent.feature6Icon} className="text-[var(--color-accent-blue)]" />
                {serviceContent.feature6Title}
              </h5>
              <p className="text-[var(--color-text-muted)]">{serviceContent.feature6Description}</p>
            </div>
          )}
          {serviceContent.feature7Title && serviceContent.feature7Description && (
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
              <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                <Icon name={serviceContent.feature7Icon} className="text-[var(--color-accent-blue)]" />
                {serviceContent.feature7Title}
              </h5>
              <p className="text-[var(--color-text-muted)]">{serviceContent.feature7Description}</p>
            </div>
          )}
          {serviceContent.feature8Title && serviceContent.feature8Description && (
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
              <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                <Icon name={serviceContent.feature8Icon} className="text-[var(--color-accent-blue)]" />
                {serviceContent.feature8Title}
              </h5>
              <p className="text-[var(--color-text-muted)]">{serviceContent.feature8Description}</p>
            </div>
          )}
          {serviceContent.feature9Title && serviceContent.feature9Description && (
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
              <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                <Icon name={serviceContent.feature9Icon} className="text-[var(--color-accent-blue)]" />
                {serviceContent.feature9Title}
              </h5>
              <p className="text-[var(--color-text-muted)]">{serviceContent.feature9Description}</p>
            </div>
          )}
          {serviceContent.feature10Title && serviceContent.feature10Description && (
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
              <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                <Icon name={serviceContent.feature10Icon} className="text-[var(--color-accent-blue)]" />
                {serviceContent.feature10Title}
              </h5>
              <p className="text-[var(--color-text-muted)]">{serviceContent.feature10Description}</p>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-8 article-body prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {serviceContent.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      <MultipleCTAs edition="exec" />
    </div>
  );
}
