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
    <main>
      {/* Hero Section - Problem Statement */}
      <section
        className='container text-center my-5 hero-section'
      >
        <h2
          className='fw-bold headline-gradient'
          style={{ fontSize: '2.7rem' }}
        >
          The AI Crisis
        </h2>
        <br />
        <h3
          className='fw-semibold mb-3 headline-gradient'
          style={{ fontSize: '1.35rem' }}
        >
          And How I&apos;m Solving It for Greenville, South Carolina Businesses
        </h3>
        {/* <div className="mb-4">
          <div className="ratio ratio-16x9" style={{maxWidth: '800px', margin: '0 auto'}}>
            <iframe 
              src="https://www.youtube.com/embed/2O8Qg4uFnl0" 
              title="The AI Crisis - How I'm Solving It for Greenville South Carolina Businesses" 
              allowFullScreen
            ></iframe>
          </div>
        </div> */}
        <div className='mx-auto mb-4' style={{ maxWidth: '800px' }}>
          <div className='alert custom-alert p-4 mb-4 shadow-lg' style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
            <strong>Reality Check:</strong> Most businesses are losing money on AI right now.
            They&apos;re either stuck with generic chatbots that don&apos;t understand their unique business processes,
            or they&apos;re completely paralyzed by legitimate security concerns and overwhelming technical complexity.
            <br /><br />
            The worst part? While they&apos;re hesitating, their competitors are gaining massive operational advantages
            through properly implemented custom AI solutions—automating workflows, reducing support costs by 40%,
            and capturing leads 24/7 with intelligent systems that actually understand their industry.
            <br /><br />
            The gap between AI winners and losers isn&apos;t about budget—it&apos;s about having the right technical
            partner who can navigate the complexity, implement security correctly, and deliver solutions that
            actually move the needle on your business metrics. <strong>Keep scrolling to see how this works.</strong>
          </div>
        </div>
      </section>

      {/* Book Announcement Section */}
      <section className='container my-5'>
        <div className='row justify-content-center'>
          <div className='col-md-10 col-lg-8'>
            <div className='card golden-box text-center p-4 shadow-lg'>
              <div className='mb-3'>
                <i className='fas fa-book fa-3x' style={{ color: '#fbbf24' }}></i>
              </div>
              <h4 className='fw-bold mb-3' style={{
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}>
                New Book: From Novice to Navigator
              </h4>
              <p className='lead mb-4' style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                Your comprehensive guide to understanding and implementing AI in your business.
                Learn the strategies, frameworks, and best practices that successful companies use
                to leverage AI effectively.
              </p>
              <div className='d-flex justify-content-center gap-3 flex-wrap'>
                <AmazonBookButton size='lg' />
                <Link
                  href='/novice-to-navigator'
                  className='btn btn-outline-primary btn-lg fw-bold'
                >
                  <i className='fas fa-eye me-2'></i>
                  Preview Chapters
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Deep Dive */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-blue text-center'>
          The 5 Critical AI Implementation Challenges
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-6 mb-4'>
            <div className='card blue-box problem-card'>
              <i className='fas fa-exclamation-triangle fa-2x mb-3'></i>
              <h5>Generic Chatbots That Don&apos;t Work</h5>
              <p>
                Off-the-shelf solutions that can&apos;t handle your specific
                business processes, leading to frustrated customers and wasted
                resources.
              </p>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card blue-box problem-card'>
              <i className='fas fa-shield-alt fa-2x mb-3'></i>
              <h5>Security &amp; Compliance Concerns</h5>
              <p>
                Uncertainty about data protection, HIPAA compliance, and
                intellectual property security slowing AI adoption.
              </p>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card blue-box problem-card'>
              <i className='fas fa-dollar-sign fa-2x mb-3'></i>
              <h5>Hidden Costs &amp; Poor ROI</h5>
              <p>
                Projects that start small but balloon into expensive, ongoing
                maintenance challenges with unclear returns.
              </p>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card blue-box problem-card'>
              <i className='fas fa-users fa-2x mb-3'></i>
              <h5>Team Resistance &amp; Poor Adoption</h5>
              <p>
                AI solutions that don&apos;t integrate with existing workflows,
                leading to low adoption rates and wasted investments.
              </p>
            </div>
          </div>
          <div className='col-md-12 mb-4'>
            <div className='card blue-box problem-card'>
              <i className='fas fa-clock fa-2x mb-3'></i>
              <h5>Implementation Paralysis</h5>
              <p>
                Analysis paralysis from too many options, unclear requirements,
                and lack of local expertise to guide the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Framework */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-green text-center'>
          The Upstate AI Solution Framework
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card green-box solution-framework-card mb-4'>
              <h5 className='mb-3'>
                <i className='fas fa-lightbulb'></i> My Proven 4-Step Process
              </h5>
              <div className='row'>
                <div className='col-md-6'>
                  <h6>
                    <strong>Step 1: Strategic Assessment</strong>
                  </h6>
                  <p>
                    Deep dive into your business processes, data security
                    requirements, and ROI goals. No cookie-cutter solutions.
                  </p>
                </div>
                <div className='col-md-6'>
                  <h6>
                    <strong>Step 2: Custom Architecture</strong>
                  </h6>
                  <p>
                    Design secure, scalable AI solutions using your existing
                    tools and workflows. No rip-and-replace required.
                  </p>
                </div>
                <div className='col-md-6'>
                  <h6>
                    <strong>Step 3: Secure Implementation</strong>
                  </h6>
                  <p>
                    Enterprise-grade security with self-hosted options, HIPAA
                    compliance, and data protection built-in.
                  </p>
                </div>
                <div className='col-md-6'>
                  <h6>
                    <strong>Step 4: Team Enablement</strong>
                  </h6>
                  <p>
                    Comprehensive training, documentation, and ongoing support
                    to ensure successful adoption and ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section - Enhanced */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-gold text-center'>
          Why Greenville Businesses Trust My Expertise
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-4 mb-4'>
            <div className='card golden-box credential-card'>
              <i className='fas fa-code fa-2x mb-3'></i>
              <h5>12+ Years Technical Excellence</h5>
              <p>
                Enterprise-grade software engineering with production AI systems
                serving millions of users. No junior-level mistakes.
              </p>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card purple-box credential-card'>
              <i className='fas fa-shield-alt fa-2x mb-3'></i>
              <h5>Security-First Architecture</h5>
              <p>
                Specialized in HIPAA-compliant, SOC2-ready AI systems. Your data
                security is non-negotiable.
              </p>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card golden-box credential-card'>
              <i className='fas fa-map-marker-alt fa-2x mb-3'></i>
              <h5>Local Upstate Expertise</h5>
              <p>
                Serving Greenville with hands-on support. No offshore teams or
                timezone issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Deep Dive */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-blue text-center'>
          Advanced AI Technical Stack
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-6 mb-4'>
            <div className='card blue-box technical-card'>
              <h5>
                <i className='fas fa-brain'></i> LLM Technologies
              </h5>
              <ul>
                <li>ChatGPT API &amp; Custom GPTs</li>
                <li>Claude AI (Anthropic)</li>
                <li>Gemini (Google)</li>
                <li>Mistral AI &amp; Open Source</li>
                <li>Custom Fine-tuning</li>
              </ul>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card purple-box technical-card'>
              <h5>
                <i className='fas fa-database'></i> RAG &amp; Vector Systems
              </h5>
              <ul>
                <li>Pinecone Vector Database</li>
                <li>Weaviate &amp; Chroma</li>
                <li>Custom Embeddings</li>
                <li>Semantic Search</li>
                <li>Context Engineering</li>
              </ul>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card golden-box technical-card'>
              <h5>
                <i className='fas fa-cloud'></i> Infrastructure &amp; Security
              </h5>
              <ul>
                <li>AWS, Azure, GCP</li>
                <li>Docker &amp; Kubernetes</li>
                <li>HIPAA Compliance</li>
                <li>SOC2 Security</li>
                <li>Self-Hosted Options</li>
              </ul>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card green-box technical-card'>
              <h5>
                <i className='fas fa-cogs'></i> Integration &amp; Automation
              </h5>
              <ul>
                <li>Slack, Discord, Teams</li>
                <li>HubSpot, Salesforce</li>
                <li>Zapier &amp; Webhooks</li>
                <li>Custom APIs</li>
                <li>Workflow Automation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Case Studies */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-gold text-center'>
          Proven Results Across Upstate Industries
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-6 mb-4'>
            <div className='card golden-box case-study-card'>
              <h5>
                <i className='fas fa-building'></i> Enterprise AI Payroll Processor
              </h5>
              <p>
                <strong>Challenge:</strong> Complex payroll processing system redesign with Azure microservices architecture
              </p>
              <p>
                <strong>Solution:</strong> Complete architectural design and implementation package using GPT-5 and RAG systems
              </p>
              <p>
                <strong>Result:</strong> 45-day delivery enabling junior developer implementation with comprehensive handoff
              </p>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card purple-box case-study-card'>
              <h5>
                <i className='fas fa-shield-alt'></i> Privacy-First RAG Chatbot
              </h5>
              <p>
                <strong>Challenge:</strong> Non-profit needed secure, self-hosted AI solution protecting sensitive data
              </p>
              <p>
                <strong>Solution:</strong> Custom RAG chatbot with self-hosted Mistral-7B ensuring complete privacy control
              </p>
              <p>
                <strong>Result:</strong> 100% data privacy with powerful AI capabilities and seamless user experience
              </p>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card blue-box case-study-card'>
              <h5>
                <i className='fas fa-cloud'></i> Cloud RAG Sales Assistant
              </h5>
              <p>
                <strong>Challenge:</strong> Sales agency needed intelligent customer engagement with Gemini integration
              </p>
              <p>
                <strong>Solution:</strong> Custom cloud-based RAG chatbot with responsive web interface and sales optimization
              </p>
              <p>
                <strong>Result:</strong> Enhanced customer interactions with intelligent lead qualification and conversion
              </p>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card green-box case-study-card'>
              <h5>
                <i className='fas fa-snowflake'></i> Snow Portal Job Scheduler
              </h5>
              <p>
                <strong>Challenge:</strong> Lima One Capital needed Alteryx replacement for Snowflake workflow automation
              </p>
              <p>
                <strong>Solution:</strong> Custom job scheduling system with comprehensive workflow management and monitoring
              </p>
              <p>
                <strong>Result:</strong> 60% cost reduction while improving performance and enabling self-service analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Business Impact */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-green text-center'>
          Measurable Business Impact
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card green-box roi-card mb-4'>
              <h5 className='mb-3'>
                <i className='fas fa-chart-line'></i> Typical ROI Metrics
              </h5>
              <div className='row'>
                <div className='col-md-6'>
                  <h6>
                    <strong>Cost Reduction</strong>
                  </h6>
                  <ul>
                    <li>30-60% reduction in customer service costs</li>
                    <li>40-70% faster issue resolution</li>
                    <li>50-80% reduction in repetitive tasks</li>
                  </ul>
                </div>
                <div className='col-md-6'>
                  <h6>
                    <strong>Revenue Impact</strong>
                  </h6>
                  <ul>
                    <li>25-45% increase in lead conversion</li>
                    <li>20-40% improvement in customer satisfaction</li>
                    <li>15-35% increase in online sales</li>
                  </ul>
                </div>
              </div>
              <p className='mt-3'>
                <strong>Average ROI Timeline:</strong> 6-12 months for most
                implementations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-blue text-center'>
          Why Choose Local Greenville Expertise?
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-6 mb-4'>
            <div className='card blue-box comparison-card'>
              <h5>
                <i className='fas fa-times-circle text-danger'></i> Generic AI
                Platforms
              </h5>
              <ul>
                <li>❌ No custom training on your data</li>
                <li>❌ Generic responses that don&apos;t match your brand</li>
                <li>❌ Limited integration options</li>
                <li>❌ No local support or training</li>
                <li>❌ Hidden costs and usage limits</li>
              </ul>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card golden-box comparison-card'>
              <h5>
                <i className='fas fa-check-circle text-success'></i> My Custom
                Solutions
              </h5>
              <ul>
                <li>✅ Trained specifically on your business data</li>
                <li>✅ Matches your exact brand voice and personality</li>
                <li>✅ Integrates with your existing tools and workflows</li>
                <li>✅ Local Upstate area support and training</li>
                <li>✅ Transparent pricing with no hidden fees</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className='container my-5'>
        <h4 className='fw-bold section-headline-gold text-center'>
          Experience the Difference
        </h4>
        <div className='text-center my-4'>
          <p className='mb-4'>
            See how a custom AI assistant trained on real business data handles
            complex interactions. Notice the consistent brand voice, security
            features, and seamless integration capabilities.
          </p>
          <a
            href='https://chat.adam.matthewsteinberger.com'
            target='_blank'
            className='btn-custom btn btn-lg fw-bold shadow-lg px-5 py-3 demo-btn'
          >
            <i className='fas fa-play'></i> Try the Live Demo
          </a>
          <p className='mt-3 text-secondary'>
            No registration required - experience the technology firsthand
          </p>
        </div>
      </section>

      {/* Investment & Pricing Transparency */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-blue text-center'>
          Transparent Investment &amp; Timeline
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card purple-box pricing-card mb-4'>
              <h5 className='mb-3'>
                <i className='fas fa-chart-line'></i> Project-Based Pricing
              </h5>
              <div className='row'>
                <div className='col-md-6'>
                  <h6>
                    <strong>Small Business Solutions</strong>
                  </h6>
                  <p>
                    $5K-15K for essential AI automation and customer support
                    chatbots
                  </p>
                  <ul>
                    <li>Custom chatbot training</li>
                    <li>Website integration</li>
                    <li>Basic analytics</li>
                    <li>30-day support</li>
                  </ul>
                </div>
                <div className='col-md-6'>
                  <h6>
                    <strong>Enterprise Solutions</strong>
                  </h6>
                  <p>
                    $15K-50K+ for comprehensive AI platforms with advanced
                    features
                  </p>
                  <ul>
                    <li>Multi-platform integration</li>
                    <li>Advanced RAG systems</li>
                    <li>Custom API development</li>
                    <li>Ongoing optimization</li>
                  </ul>
                </div>
              </div>
              <p className='mt-3'>
                <strong>Timeline:</strong> 2-6 weeks depending on complexity.
                Most projects deliver ROI within 6-12 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Mitigation */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-green text-center'>
          Risk-Free Implementation
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-4 mb-4'>
            <div className='card green-box risk-card'>
              <i className='fas fa-shield-alt fa-2x mb-3'></i>
              <h5>Security Guarantee</h5>
              <p>
                Self-hosted options available. Your data never leaves your
                control. HIPAA and SOC2 compliance built-in.
              </p>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card green-box risk-card'>
              <i className='fas fa-handshake fa-2x mb-3'></i>
              <h5>Performance Guarantee</h5>
              <p>
                If your AI solution doesn&apos;t meet agreed performance
                metrics, I&apos;ll optimize it at no additional cost.
              </p>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card green-box risk-card'>
              <i className='fas fa-graduation-cap fa-2x mb-3'></i>
              <h5>Adoption Guarantee</h5>
              <p>
                Comprehensive training and support to ensure your team
                successfully adopts and uses the AI solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-purple text-center'>
          For Employers: Staff Software Engineer and AI Solutions Architect Available
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card purple-box employer-card mb-4'>
              <h5 className='mb-3'>
                <i className='fas fa-briefcase'></i> Staff Software Engineering and AI Solutions Architecting
              </h5>
              <p>
                <strong>Available for:</strong> Full-time positions, contract
                work, or consulting projects in the Upstate region
              </p>
              <div className='row'>
                <div className='col-md-6'>
                  <h6>
                    <strong>Technical Skills</strong>
                  </h6>
                  <ul>
                    <li>Production RAG systems</li>
                    <li>LLM integration &amp; fine-tuning</li>
                    <li>Vector database architecture</li>
                    <li>AI/ML pipeline development</li>
                    <li>Cloud infrastructure (AWS/Azure/GCP)</li>
                  </ul>
                </div>
                <div className='col-md-6'>
                  <h6>
                    <strong>Business Value</strong>
                  </h6>
                  <ul>
                    <li>12+ years software engineering</li>
                    <li>Enterprise security expertise</li>
                    <li>Local Upstate Region knowledge</li>
                    <li>Proven ROI delivery</li>
                    <li>Team leadership experience</li>
                  </ul>
                </div>
              </div>
              <p className='mt-3'>
                <strong>Interested in hiring?</strong> Let&apos;s discuss how my
                AI expertise can accelerate your team&apos;s capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple CTAs */}
      <MultipleCTAs />

      {/* Trust Signals */}
      <section className='container my-5'>
        <h4 className='fw-bold mb-4 section-headline-gold text-center'>
          Why Greenville Businesses Choose Me
        </h4>
        <div className='row justify-content-center'>
          <div className='col-md-3 mb-4'>
            <div className='card golden-box trust-card text-center'>
              <i className='fas fa-clock fa-2x mb-3'></i>
              <h5>Fast Implementation</h5>
              <p>2-6 weeks from concept to deployment</p>
            </div>
          </div>
          <div className='col-md-3 mb-4'>
            <div className='card purple-box trust-card text-center'>
              <i className='fas fa-shield-alt fa-2x mb-3'></i>
              <h5>Security First</h5>
              <p>HIPAA compliant, SOC2 ready</p>
            </div>
          </div>
          <div className='col-md-3 mb-4'>
            <div className='card golden-box trust-card text-center'>
              <i className='fas fa-map-marker-alt fa-2x mb-3'></i>
              <h5>Local Support</h5>
              <p>Upstate expertise &amp; availability</p>
            </div>
          </div>
          <div className='col-md-3 mb-4'>
            <div className='card purple-box trust-card text-center'>
              <i className='fas fa-chart-line fa-2x mb-3'></i>
              <h5>Proven ROI</h5>
              <p>6-12 month average payback period</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
