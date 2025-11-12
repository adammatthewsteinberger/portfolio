import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { getServiceBySlug } from '@/lib/serviceUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import MultipleCTAs from '@/components/MultipleCTAs';
import styles from '../ServicePage.module.css';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
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
    <div className={styles.servicePageBg}>
      {/* Hero Section */}
      <section className="container text-center" style={{marginTop: '6rem', marginBottom: '3rem'}}>
        <h1 className={styles.headline}>
          {serviceContent.heroTitle}
        </h1>
        <h2 className={styles.subheadline}>
          {serviceContent.heroSubtitle}
        </h2>
        <div className="mx-auto mb-4" style={{maxWidth: '700px'}}>
          <div className="alert custom-alert p-4 mb-4 shadow-lg" style={{fontSize: '1.15rem', lineHeight: '1.7'}}>
            {serviceContent.description.split('<newline>').map((paragraph, index) => (
              <p key={index} className={index > 0 ? 'mt-3' : 'mb-0'}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Choice 1, 2, 3 */}
      <section className="container my-5">
        <h4 className={styles.sectionTitle + ' section-headline-gold'}>{serviceContent.whyChoose}</h4>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className={styles.card + ' card credential-card'}>
              <i className={`fas ${serviceContent.choice1Icon} fa-2x mb-3`}></i>
              <h5 className={styles.cardTitle}>{serviceContent.choice1Title}</h5>
              <p className={styles.cardText}>{serviceContent.choice1Description}</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className={styles.card + ' card credential-card'}>
              <i className={`fas ${serviceContent.choice2Icon} fa-2x mb-3`}></i>
              <h5 className={styles.cardTitle}>{serviceContent.choice2Title}</h5>
              <p className={styles.cardText}>{serviceContent.choice2Description}</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className={styles.card + ' card credential-card'}>
              <i className={`fas ${serviceContent.choice3Icon} fa-2x mb-3`}></i>
              <h5 className={styles.cardTitle}>{serviceContent.choice3Title}</h5>
              <p className={styles.cardText}>{serviceContent.choice3Description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <h4 className={styles.sectionTitle + ' section-headline-green'}>{serviceContent.featuresOffered}</h4>
        <div className="row justify-content-center g-4">
          <div className="col-md-6">
            <div className={styles.card + ' card solution-card'}>
              <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature1Icon}`}></i> {serviceContent.feature1Title}</h5>
              <p className={styles.cardText}>{serviceContent.feature1Description}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.card + ' card solution-card'}>
              <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature2Icon}`}></i> {serviceContent.feature2Title}</h5>
              <p className={styles.cardText}>{serviceContent.feature2Description}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.card + ' card solution-card'}>
              <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature3Icon}`}></i> {serviceContent.feature3Title}</h5>
              <p className={styles.cardText}>{serviceContent.feature3Description}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.card + ' card solution-card'}>
              <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature4Icon}`}></i> {serviceContent.feature4Title}</h5>
              <p className={styles.cardText}>{serviceContent.feature4Description}</p>
            </div>
          </div>
          {serviceContent.feature5Title && serviceContent.feature5Description && (
            <div className="col-md-6">
              <div className={styles.card + ' card solution-card'}>
                <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature5Icon}`}></i> {serviceContent.feature5Title}</h5>
                <p className={styles.cardText}>{serviceContent.feature5Description}</p>
              </div>
            </div>
          )}
          {serviceContent.feature6Title && serviceContent.feature6Description && (
            <div className="col-md-6">
              <div className={styles.card + ' card solution-card'}>
                <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature6Icon}`}></i> {serviceContent.feature6Title}</h5>
                <p className={styles.cardText}>{serviceContent.feature6Description}</p>
              </div>
            </div>
          )}
          {serviceContent.feature7Title && serviceContent.feature7Description && (
            <div className="col-md-6">
              <div className={styles.card + ' card solution-card'}>
                <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature7Icon}`}></i> {serviceContent.feature7Title}</h5>
                <p className={styles.cardText}>{serviceContent.feature7Description}</p>
              </div>
            </div>
          )}
          {serviceContent.feature8Title && serviceContent.feature8Description && (
            <div className="col-md-6">
              <div className={styles.card + ' card solution-card'}>
                <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature8Icon}`}></i> {serviceContent.feature8Title}</h5>
                <p className={styles.cardText}>{serviceContent.feature8Description}</p>
              </div>
            </div>
          )}
          {serviceContent.feature9Title && serviceContent.feature9Description && (
            <div className="col-md-6">
              <div className={styles.card + ' card solution-card'}>
                <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature9Icon}`}></i> {serviceContent.feature9Title}</h5>
                <p className={styles.cardText}>{serviceContent.feature9Description}</p>
              </div>
            </div>
          )}
          {serviceContent.feature10Title && serviceContent.feature10Description && (
            <div className="col-md-6">
              <div className={styles.card + ' card solution-card'}>
                <h5 className={styles.cardTitle}><i className={`fas ${serviceContent.feature10Icon}`}></i> {serviceContent.feature10Title}</h5>
                <p className={styles.cardText}>{serviceContent.feature10Description}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className={styles.mainContentCard + ' ' + styles.articleBody + ' article-body mb-5'}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {serviceContent.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      <MultipleCTAs />
    </div>
  );
}