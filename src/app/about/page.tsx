import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Adam Matthew Steinberger | Senior Azure and AI Development Engineer',
  description: 'Learn about Adam Matthew Steinberger, a dedicated Senior Azure and AI Development Engineer based in Greenville, SC with over 12 years of experience in AI platforms.',
  openGraph: {
    title: 'About Adam Matthew Steinberger | Senior Azure and AI Development Engineer',
    description: 'Learn about Adam Matthew Steinberger, a dedicated Senior Azure and AI Development Engineer based in Greenville, SC with over 12 years of experience in AI platforms.',
    url: 'https://hire.adam.matthewsteinberger.com/about',
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Main Content */}
      <section className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="flex-shrink-0 text-center">
                <Image
                  src='/images/profile-picture.jpg'
                  alt='Adam Matthew Steinberger - Senior Azure and AI Development Engineer'
                  width={250}
                  height={250}
                  className='rounded-full shadow-lg'
                  priority
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">About Me</h1>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                  Hello! I&apos;m Adam Matthew Steinberger, a dedicated Senior Azure and AI Development Engineer based in
                  <strong className="text-[var(--color-text-primary)]"> Greenville, South Carolina</strong>. With over <strong className="text-[var(--color-text-primary)]">12 years of experience</strong> in building
                  scalable, secure AI platforms, I specialize in delivering innovative technology solutions tailored to business needs.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <i className="fas fa-brain text-[var(--color-accent-purple)]"></i>
                  Neurodiversity & Strengths
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Recently, I received an autism diagnosis, which has shed light on the unique strengths—like exceptional focus
                  and creative problem-solving—that have fueled my success in complex tech projects. I thrive in environments
                  where neurodiversity is celebrated, contributing fresh perspectives to AI development without engaging in
                  unrelated debates.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <i className="fas fa-briefcase text-[var(--color-accent-blue)]"></i>
                  Career Status
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  I just accepted a full-time W-2 position at <a href="https://www.vizius.com/" className="text-[var(--color-accent-blue)] hover:underline">The Vizius Group</a>, which officially transitioned from subcontractor consulting work in December 2025.
                  This is a huge blessing, and I look forward to working with this team to help businesses here in Greenville and beyond integrate AI into automation systems and improving company bottom lines.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <i className="fas fa-star text-[var(--color-accent-gold)]"></i>
                  Recent Project Highlights
                </h3>
                <div className="space-y-4">
                  <Link href="/projects/enterprise-ai-payroll-processor" className="block p-4 bg-[var(--color-dark-bg)] rounded-lg hover:bg-[var(--color-dark-card-alt)] transition-colors no-underline">
                    <h5 className="font-bold text-[var(--color-accent-blue)] mb-1">Enterprise AI Payroll Processor</h5>
                    <p className="text-[var(--color-text-muted)] text-sm">
                      Led a 45-day project to redesign an AI payroll processor for an enterprise client using Azure microservices
                    </p>
                  </Link>
                  <Link href="/projects/self-hosted-rag-chatbot" className="block p-4 bg-[var(--color-dark-bg)] rounded-lg hover:bg-[var(--color-dark-card-alt)] transition-colors no-underline">
                    <h5 className="font-bold text-[var(--color-accent-blue)] mb-1">Privacy-First RAG Chatbot</h5>
                    <p className="text-[var(--color-text-muted)] text-sm">
                      Built a privacy-first RAG chatbot for a non-profit with self-hosted Mistral-7B
                    </p>
                  </Link>
                  <Link href="/projects/cloud-rag-chatbot-gemini" className="block p-4 bg-[var(--color-dark-bg)] rounded-lg hover:bg-[var(--color-dark-card-alt)] transition-colors no-underline">
                    <h5 className="font-bold text-[var(--color-accent-blue)] mb-1">Custom Cloud-Based RAG Chatbot</h5>
                    <p className="text-[var(--color-text-muted)] text-sm">
                      Created a custom cloud-based RAG chatbot for a sales agency with a responsive web interface
                    </p>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <i className="fas fa-handshake text-[var(--color-accent-green)]"></i>
                  Let&apos;s Connect
                </h3>
                <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
                  I am thrilled to continue building relationship with professionals in the AI and tech space, and am always eager to connect whether online or in person!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline" style={{ color: '#000000' }}>
                    <i className="fas fa-envelope"></i>
                    Contact Me
                  </Link>
                  <a
                    href="https://github.com/realadammatthew/resume/raw/main/adam-steinberger-resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-download"></i>
                    Download Resume
                  </a>
                  <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 hover:from-amber-500 hover:to-[var(--color-accent-gold)] font-bold rounded-lg transition-all duration-300 no-underline" style={{ color: '#000000' }}>
                    <i className="fas fa-cogs"></i>
                    View Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
