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
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">Get In Touch</h1>
            <p className="lead">
              Ready to start your AI project? Let&apos;s discuss how I can help bring your vision to life.
            </p>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-calendar-alt fa-3x text-primary mb-3"></i>
                  <h5 className="card-title">Schedule a Call</h5>
                  <p className="card-text">
                    Book a free consultation to discuss your project requirements and timeline.
                  </p>
                  <a 
                    href="https://tidycal.com/realadammatthew" 
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Consultation
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-envelope fa-3x text-primary mb-3"></i>
                  <h5 className="card-title">Email Directly</h5>
                  <p className="card-text">
                    Send me a direct email for quick questions or detailed project discussions.
                  </p>
                  <a 
                    href="mailto:adam@matthewsteinberger.com" 
                    className="btn btn-outline-primary"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-comments fa-3x text-primary mb-3"></i>
                  <h5 className="card-title">Try My Chatbot</h5>
                  <p className="card-text">
                    Experience my AI chatbot technology firsthand to see what&apos;s possible.
                  </p>
                  <a 
                    href="https://chat.adam.matthewsteinberger.com" 
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo Chatbot
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <h2 className="h3">Or Send Me a Message</h2>
            <p className="text-muted">
              Fill out the form below and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 