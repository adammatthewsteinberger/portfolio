import MultipleCTAs from '@/components/MultipleCTAs';
import AmazonBookButton from '@/components/AmazonBookButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hire Expert AI Chatbot Developer in Greenville SC | Adam Matthew Steinberger',
  description:
    "Hire Adam Matthew Steinberger—Greenville's leading AI chatbot developer for custom GPT solutions. Serving Upstate businesses with secure, branded chatbots using ChatGPT, Claude, Gemini & Mistral. Local Upstate region expertise.",
  keywords:
    'hire AI developer Greenville SC, custom chatbot developer Greenville, GPT engineer Upstate, Upstate Region AI expert, ChatGPT integration specialist, Claude AI developer SC, Gemini implementation Greenville, Mistral AI engineer Greenville, local AI developer Upstate, custom GPT solutions Greenville, AI chatbot agency Greenville, Greenville South Carolina AI engineer, Adam Matthew Steinberger, AI chatbot solutions SC, local AI expert Greenville, custom AI chatbots Upstate South Carolina, business AI solutions Greenville, Claude Gemini Mistral integration SC',
  authors: [{ name: 'Adam Matthew Steinberger' }],
  creator: 'Adam Matthew Steinberger',
  publisher: 'Adam Matthew Steinberger LLC',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'Hire Local AI Chatbot Developer | Greenville & Upstate South Carolina',
    description:
      'Expert AI developer in Greenville, SC specializing in custom chatbots for Upstate Region businesses. Local expertise in ChatGPT, Claude, Gemini & Mistral solutions.',
    url: 'https://hire.adam.matthewsteinberger.com',
    siteName:
      'Hire Adam Matthew Steinberger - Upstate South Carolina AI Expert',
    images: [
      {
        url: '/images/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Adam Matthew Steinberger - Upstate South Carolina AI Expert',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire Local AI Expert in Greenville | Custom Chatbot Solutions',
    description:
      "Greenville's premier AI developer for custom business chatbots. Local expertise in ChatGPT, Claude, Gemini & Mistral implementation.",
    images: ['/images/social-preview.png'],
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section - Problem Statement */}
      <section className='container mx-auto px-4 text-center pt-8 pb-16'>
        <h2 className='text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent mb-4'>
          The AI Crisis
        </h2>
        <h3 className='text-xl font-semibold text-[var(--color-text-muted)] mb-6'>
          And How I&apos;m Solving It for Greenville, South Carolina Businesses
        </h3>
        <div className='max-w-3xl mx-auto mb-8'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-coral)]/30 rounded-xl p-6 shadow-lg text-lg leading-relaxed text-[var(--color-text-muted)]'>
            <strong className='text-[var(--color-text-primary)]'>Reality Check:</strong> Most businesses are losing money on AI right now.
            They&apos;re either stuck with generic chatbots that don&apos;t understand their unique business processes,
            or they&apos;re completely paralyzed by legitimate security concerns and overwhelming technical complexity.
            <br /><br />
            The worst part? While they&apos;re hesitating, their competitors are gaining massive operational advantages
            through properly implemented custom AI solutions—automating workflows, reducing support costs by 40%,
            and capturing leads 24/7 with intelligent systems that actually understand their industry.
            <br /><br />
            The gap between AI winners and losers isn&apos;t about budget—it&apos;s about having the right technical
            partner who can navigate the complexity, implement security correctly, and deliver solutions that
            actually move the needle on your business metrics. <strong className='text-[var(--color-text-primary)]'>Keep scrolling to see how this works.</strong>
          </div>
        </div>
      </section>

      {/* Book Announcement Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='max-w-3xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-8 shadow-lg text-center'>
            <div className='mb-4'>
              <i className='fas fa-book text-5xl text-[var(--color-accent-gold)]'></i>
            </div>
            <h4 className='text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent inline-block'>
              New Book: From Novice to Navigator
            </h4>
            <p className='text-lg text-[var(--color-text-muted)] mb-6 leading-relaxed'>
              Your comprehensive guide to understanding and implementing AI in your business.
              Learn the strategies, frameworks, and best practices that successful companies use
              to leverage AI effectively.
            </p>
            <div className='flex justify-center gap-4 flex-wrap'>
              <AmazonBookButton size='lg' />
              <Link
                href='/novice-to-navigator'
                className='inline-flex items-center gap-2 px-6 py-3 text-lg font-bold border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline'
              >
                <i className='fas fa-eye'></i>
                Preview Chapters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Deep Dive */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent'>
          The 5 Critical AI Implementation Challenges
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6'>
            <i className='fas fa-exclamation-triangle text-3xl text-[var(--color-accent-coral)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Generic Chatbots That Don&apos;t Work</h5>
            <p className='text-[var(--color-text-muted)]'>
              Off-the-shelf solutions that can&apos;t handle your specific
              business processes, leading to frustrated customers and wasted
              resources.
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6'>
            <i className='fas fa-shield-alt text-3xl text-[var(--color-accent-blue)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Security &amp; Compliance Concerns</h5>
            <p className='text-[var(--color-text-muted)]'>
              Uncertainty about data protection, HIPAA compliance, and
              intellectual property security slowing AI adoption.
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6'>
            <i className='fas fa-dollar-sign text-3xl text-[var(--color-accent-green)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Hidden Costs &amp; Poor ROI</h5>
            <p className='text-[var(--color-text-muted)]'>
              Projects that start small but balloon into expensive, ongoing
              maintenance challenges with unclear returns.
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6'>
            <i className='fas fa-users text-3xl text-[var(--color-accent-purple)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Team Resistance &amp; Poor Adoption</h5>
            <p className='text-[var(--color-text-muted)]'>
              AI solutions that don&apos;t integrate with existing workflows,
              leading to low adoption rates and wasted investments.
            </p>
          </div>
          <div className='md:col-span-2 bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6'>
            <i className='fas fa-clock text-3xl text-[var(--color-accent-gold)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Implementation Paralysis</h5>
            <p className='text-[var(--color-text-muted)]'>
              Analysis paralysis from too many options, unclear requirements,
              and lack of local expertise to guide the process.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution Framework */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-green)] to-[var(--color-accent-green-light)] bg-clip-text text-transparent'>
          The Upstate AI Solution Framework
        </h4>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-8'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2'>
              <i className='fas fa-lightbulb text-[var(--color-accent-gold)]'></i> My Proven 4-Step Process
            </h5>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-2'>Step 1: Strategic Assessment</h6>
                <p className='text-[var(--color-text-muted)]'>
                  Deep dive into your business processes, data security
                  requirements, and ROI goals. No cookie-cutter solutions.
                </p>
              </div>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-2'>Step 2: Custom Architecture</h6>
                <p className='text-[var(--color-text-muted)]'>
                  Design secure, scalable AI solutions using your existing
                  tools and workflows. No rip-and-replace required.
                </p>
              </div>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-2'>Step 3: Secure Implementation</h6>
                <p className='text-[var(--color-text-muted)]'>
                  Enterprise-grade security with self-hosted options, HIPAA
                  compliance, and data protection built-in.
                </p>
              </div>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-2'>Step 4: Team Enablement</h6>
                <p className='text-[var(--color-text-muted)]'>
                  Comprehensive training, documentation, and ongoing support
                  to ensure successful adoption and ROI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section - Enhanced */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent'>
          Why Greenville Businesses Trust My Expertise
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-code text-3xl text-[var(--color-accent-blue)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>12+ Years Technical Excellence</h5>
            <p className='text-[var(--color-text-muted)]'>
              Enterprise-grade software engineering with production AI systems
              serving millions of users. No junior-level mistakes.
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-shield-alt text-3xl text-[var(--color-accent-purple)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Security-First Architecture</h5>
            <p className='text-[var(--color-text-muted)]'>
              Specialized in HIPAA-compliant, SOC2-ready AI systems. Your data
              security is non-negotiable.
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-map-marker-alt text-3xl text-[var(--color-accent-coral)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Local Upstate Expertise</h5>
            <p className='text-[var(--color-text-muted)]'>
              Serving Greenville with hands-on support. No offshore teams or
              timezone issues.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Expertise Deep Dive */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent'>
          Advanced AI Technical Stack
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-brain text-[var(--color-accent-blue)]'></i> LLM Technologies
            </h5>
            <ul className='space-y-2 text-[var(--color-text-muted)]'>
              <li>ChatGPT API &amp; Custom GPTs</li>
              <li>Claude AI (Anthropic)</li>
              <li>Gemini (Google)</li>
              <li>Mistral AI &amp; Open Source</li>
              <li>Custom Fine-tuning</li>
            </ul>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-database text-[var(--color-accent-purple)]'></i> RAG &amp; Vector Systems
            </h5>
            <ul className='space-y-2 text-[var(--color-text-muted)]'>
              <li>Pinecone Vector Database</li>
              <li>Weaviate &amp; Chroma</li>
              <li>Custom Embeddings</li>
              <li>Semantic Search</li>
              <li>Context Engineering</li>
            </ul>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-cloud text-[var(--color-accent-gold)]'></i> Infrastructure &amp; Security
            </h5>
            <ul className='space-y-2 text-[var(--color-text-muted)]'>
              <li>AWS, Azure, GCP</li>
              <li>Docker &amp; Kubernetes</li>
              <li>HIPAA Compliance</li>
              <li>SOC2 Security</li>
              <li>Self-Hosted Options</li>
            </ul>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-cogs text-[var(--color-accent-green)]'></i> Integration &amp; Automation
            </h5>
            <ul className='space-y-2 text-[var(--color-text-muted)]'>
              <li>Slack, Discord, Teams</li>
              <li>HubSpot, Salesforce</li>
              <li>Zapier &amp; Webhooks</li>
              <li>Custom APIs</li>
              <li>Workflow Automation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Social Proof & Case Studies */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent'>
          Proven Results Across Upstate Industries
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-building text-[var(--color-accent-gold)]'></i> Enterprise AI Payroll Processor
            </h5>
            <p className='text-[var(--color-text-muted)] mb-2'>
              <strong className='text-[var(--color-text-primary)]'>Challenge:</strong> Complex payroll processing system redesign with Azure microservices architecture
            </p>
            <p className='text-[var(--color-text-muted)] mb-2'>
              <strong className='text-[var(--color-text-primary)]'>Solution:</strong> Complete architectural design and implementation package using GPT-5 and RAG systems
            </p>
            <p className='text-[var(--color-text-muted)]'>
              <strong className='text-[var(--color-text-primary)]'>Result:</strong> 45-day delivery enabling junior developer implementation with comprehensive handoff
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-shield-alt text-[var(--color-accent-purple)]'></i> Privacy-First RAG Chatbot
            </h5>
            <p className='text-[var(--color-text-muted)] mb-2'>
              <strong className='text-[var(--color-text-primary)]'>Challenge:</strong> Non-profit needed secure, self-hosted AI solution protecting sensitive data
            </p>
            <p className='text-[var(--color-text-muted)] mb-2'>
              <strong className='text-[var(--color-text-primary)]'>Solution:</strong> Custom RAG chatbot with self-hosted Mistral-7B ensuring complete privacy control
            </p>
            <p className='text-[var(--color-text-muted)]'>
              <strong className='text-[var(--color-text-primary)]'>Result:</strong> 100% data privacy with powerful AI capabilities and seamless user experience
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-blue)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-cloud text-[var(--color-accent-blue)]'></i> Cloud RAG Sales Assistant
            </h5>
            <p className='text-[var(--color-text-muted)] mb-2'>
              <strong className='text-[var(--color-text-primary)]'>Challenge:</strong> Sales agency needed intelligent customer engagement with Gemini integration
            </p>
            <p className='text-[var(--color-text-muted)] mb-2'>
              <strong className='text-[var(--color-text-primary)]'>Solution:</strong> Custom cloud-based RAG chatbot with responsive web interface and sales optimization
            </p>
            <p className='text-[var(--color-text-muted)]'>
              <strong className='text-[var(--color-text-primary)]'>Result:</strong> Enhanced customer interactions with intelligent lead qualification and conversion
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-snowflake text-[var(--color-accent-blue)]'></i> Snow Portal Job Scheduler
            </h5>
            <p className='text-[var(--color-text-muted)] mb-2'>
              <strong className='text-[var(--color-text-primary)]'>Challenge:</strong> Lima One Capital needed Alteryx replacement for Snowflake workflow automation
            </p>
            <p className='text-[var(--color-text-muted)] mb-2'>
              <strong className='text-[var(--color-text-primary)]'>Solution:</strong> Custom job scheduling system with comprehensive workflow management and monitoring
            </p>
            <p className='text-[var(--color-text-muted)]'>
              <strong className='text-[var(--color-text-primary)]'>Result:</strong> 60% cost reduction while improving performance and enabling self-service analytics
            </p>
          </div>
        </div>
      </section>

      {/* ROI & Business Impact */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-green)] to-[var(--color-accent-green-light)] bg-clip-text text-transparent'>
          Measurable Business Impact
        </h4>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-8'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2'>
              <i className='fas fa-chart-line text-[var(--color-accent-green)]'></i> Typical ROI Metrics
            </h5>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-3'>Cost Reduction</h6>
                <ul className='space-y-2 text-[var(--color-text-muted)]'>
                  <li>30-60% reduction in customer service costs</li>
                  <li>40-70% faster issue resolution</li>
                  <li>50-80% reduction in repetitive tasks</li>
                </ul>
              </div>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-3'>Revenue Impact</h6>
                <ul className='space-y-2 text-[var(--color-text-muted)]'>
                  <li>25-45% increase in lead conversion</li>
                  <li>20-40% improvement in customer satisfaction</li>
                  <li>15-35% increase in online sales</li>
                </ul>
              </div>
            </div>
            <p className='mt-6 text-[var(--color-text-muted)]'>
              <strong className='text-[var(--color-text-primary)]'>Average ROI Timeline:</strong> 6-12 months for most implementations
            </p>
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent'>
          Why Choose Local Greenville Expertise?
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-coral)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-times-circle text-[var(--color-accent-coral)]'></i> Generic AI Platforms
            </h5>
            <ul className='space-y-2 text-[var(--color-text-muted)]'>
              <li>No custom training on your data</li>
              <li>Generic responses that don&apos;t match your brand</li>
              <li>Limited integration options</li>
              <li>No local support or training</li>
              <li>Hidden costs and usage limits</li>
            </ul>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-6'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-check-circle text-[var(--color-accent-green)]'></i> My Custom Solutions
            </h5>
            <ul className='space-y-2 text-[var(--color-text-muted)]'>
              <li>Trained specifically on your business data</li>
              <li>Matches your exact brand voice and personality</li>
              <li>Integrates with your existing tools and workflows</li>
              <li>Local Upstate area support and training</li>
              <li>Transparent pricing with no hidden fees</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold text-center bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent mb-6'>
          Ready to Get Started?
        </h4>
        <div className='text-center max-w-2xl mx-auto'>
          <p className='text-[var(--color-text-muted)] mb-6'>
            Let&apos;s talk about what custom AI can do for your business. Schedule a free consultation to discuss your needs, timeline, and budget — no commitment required.
          </p>
          <a
            href='https://tidycal.com/adammatthewsteinberger'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-8 py-4 text-lg font-bold bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 hover:from-amber-500 hover:to-[var(--color-accent-gold)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline'
            style={{ color: '#000000' }}
          >
            <i className='fas fa-calendar'></i> Schedule Free Consultation
          </a>
          <p className='mt-4 text-sm text-[var(--color-text-muted)]'>
            Free 30-minute call — no pressure, no commitment
          </p>
        </div>
      </section>

      {/* Investment & Pricing Transparency */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent'>
          Transparent Investment &amp; Timeline
        </h4>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-8'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2'>
              <i className='fas fa-chart-line text-[var(--color-accent-purple)]'></i> Project-Based Pricing
            </h5>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-3'>Small Business Solutions</h6>
                <p className='text-[var(--color-text-muted)] mb-3'>
                  $5K-15K for essential AI automation and customer support chatbots
                </p>
                <ul className='space-y-1 text-[var(--color-text-muted)]'>
                  <li>Custom chatbot training</li>
                  <li>Website integration</li>
                  <li>Basic analytics</li>
                  <li>30-day support</li>
                </ul>
              </div>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-3'>Enterprise Solutions</h6>
                <p className='text-[var(--color-text-muted)] mb-3'>
                  $15K-50K+ for comprehensive AI platforms with advanced features
                </p>
                <ul className='space-y-1 text-[var(--color-text-muted)]'>
                  <li>Multi-platform integration</li>
                  <li>Advanced RAG systems</li>
                  <li>Custom API development</li>
                  <li>Ongoing optimization</li>
                </ul>
              </div>
            </div>
            <p className='mt-6 text-[var(--color-text-muted)]'>
              <strong className='text-[var(--color-text-primary)]'>Timeline:</strong> 2-6 weeks depending on complexity.
              Most projects deliver ROI within 6-12 months.
            </p>
          </div>
        </div>
      </section>

      {/* Risk Mitigation */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-green)] to-[var(--color-accent-green-light)] bg-clip-text text-transparent'>
          Risk-Free Implementation
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-shield-alt text-3xl text-[var(--color-accent-green)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Security Guarantee</h5>
            <p className='text-[var(--color-text-muted)]'>
              Self-hosted options available. Your data never leaves your
              control. HIPAA and SOC2 compliance built-in.
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-handshake text-3xl text-[var(--color-accent-blue)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Performance Guarantee</h5>
            <p className='text-[var(--color-text-muted)]'>
              If your AI solution doesn&apos;t meet agreed performance
              metrics, I&apos;ll optimize it at no additional cost.
            </p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-graduation-cap text-3xl text-[var(--color-accent-gold)] mb-4'></i>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-2'>Adoption Guarantee</h5>
            <p className='text-[var(--color-text-muted)]'>
              Comprehensive training and support to ensure your team
              successfully adopts and uses the AI solution.
            </p>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-purple-light)] bg-clip-text text-transparent'>
          For Employers: Senior Azure and AI Development Engineer Working Full-Time
        </h4>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-8'>
            <h5 className='text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2'>
              <i className='fas fa-briefcase text-[var(--color-accent-purple)]'></i> Senior Azure and AI Development Engineer
            </h5>
            <p className='text-[var(--color-text-muted)] mb-6'>
              <strong className='text-[var(--color-text-primary)]'>Currently working:</strong> I just accepted a full-time W2 role at <a href="https://www.vizius.com/" className='text-[var(--color-accent-blue)] hover:underline'>The Vizius Group</a>!
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-3'>Technical Skills</h6>
                <ul className='space-y-2 text-[var(--color-text-muted)]'>
                  <li>Production RAG systems</li>
                  <li>LLM integration &amp; fine-tuning</li>
                  <li>Vector database architecture</li>
                  <li>AI/ML pipeline development</li>
                  <li>Cloud infrastructure (AWS/Azure/GCP)</li>
                </ul>
              </div>
              <div>
                <h6 className='font-bold text-[var(--color-text-primary)] mb-3'>Business Value</h6>
                <ul className='space-y-2 text-[var(--color-text-muted)]'>
                  <li>12+ years software engineering</li>
                  <li>Enterprise security expertise</li>
                  <li>Local Upstate Region knowledge</li>
                  <li>Proven ROI delivery</li>
                  <li>Team leadership experience</li>
                </ul>
              </div>
            </div>
            <p className='mt-6 text-[var(--color-text-muted)]'>
              <strong className='text-[var(--color-text-primary)]'>Interested in learning more?</strong> Let&apos;s chat about how my skills have worked so well for this new team I&apos;ve just joined!
            </p>
          </div>
        </div>
      </section>

      {/* Multiple CTAs */}
      <MultipleCTAs />

      {/* Trust Signals */}
      <section className='container mx-auto px-4 py-16'>
        <h4 className='text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent'>
          Why Greenville Businesses Choose Me
        </h4>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto'>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-clock text-3xl text-[var(--color-accent-gold)] mb-4'></i>
            <h5 className='text-lg font-bold text-[var(--color-text-primary)] mb-2'>Fast Implementation</h5>
            <p className='text-[var(--color-text-muted)] text-sm'>2-6 weeks from concept to deployment</p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-shield-alt text-3xl text-[var(--color-accent-purple)] mb-4'></i>
            <h5 className='text-lg font-bold text-[var(--color-text-primary)] mb-2'>Security First</h5>
            <p className='text-[var(--color-text-muted)] text-sm'>HIPAA compliant, SOC2 ready</p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-map-marker-alt text-3xl text-[var(--color-accent-coral)] mb-4'></i>
            <h5 className='text-lg font-bold text-[var(--color-text-primary)] mb-2'>Local Support</h5>
            <p className='text-[var(--color-text-muted)] text-sm'>Upstate expertise &amp; availability</p>
          </div>
          <div className='bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center'>
            <i className='fas fa-chart-line text-3xl text-[var(--color-accent-green)] mb-4'></i>
            <h5 className='text-lg font-bold text-[var(--color-text-primary)] mb-2'>Proven ROI</h5>
            <p className='text-[var(--color-text-muted)] text-sm'>6-12 month average payback period</p>
          </div>
        </div>
      </section>
    </>
  );
}
