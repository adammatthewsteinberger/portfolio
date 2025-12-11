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
    <div className="about-page">

      {/* Main Content */}
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-content-card">
              <div className="row align-items-center mb-5">
                <div className="col-md-4 text-center mb-4 mb-md-0">
                  <Image
                    src='/images/profile-picture.jpg'
                    alt='Adam Matthew Steinberger - Senior Azure and AI Development Engineer'
                    width={250}
                    height={250}
                    className='rounded-circle shadow-lg'
                    priority
                  />
                </div>
                <div className="col-md-8">
                  <h1 className="display-4 fw-bold mb-4">About Me</h1>
                  <p className="about-intro">
                    Hello! I&apos;m Adam Matthew Steinberger, a dedicated Senior Azure and AI Development Engineer based in
                    <strong> Greenville, South Carolina</strong>. With over <strong>12 years of experience</strong> in building
                    scalable, secure AI platforms, I specialize in delivering innovative technology solutions tailored to business needs.
                  </p>
                </div>
              </div>

              <div className="about-sections">
                <div className="about-section mb-5">
                  <h3 className="section-heading mb-3">
                    <i className="fas fa-brain me-2"></i>
                    Neurodiversity & Strengths
                  </h3>
                  <p>
                    Recently, I received an autism diagnosis, which has shed light on the unique strengths—like exceptional focus
                    and creative problem-solving—that have fueled my success in complex tech projects. I thrive in environments
                    where neurodiversity is celebrated, contributing fresh perspectives to AI development without engaging in
                    unrelated debates.
                  </p>
                </div>

                <div className="about-section mb-5">
                  <h3 className="section-heading mb-3">
                    <i className="fas fa-shield-alt me-2"></i>
                    Transparency & Integrity
                  </h3>
                  <p>
                    In 2025, I faced a civil matter due to a failed real estate transaction, which is currently being resolved. This experience
                    has helped me discover my new autism diagnosis while also reinforcing my dedication to diligence, integrity, and transparency in all my work.
                  </p>
                </div>

                <div className="about-section mb-5">
                  <h3 className="section-heading mb-3">
                    <i className="fas fa-briefcase me-2"></i>
                    Career Goals
                  </h3>
                  <p>
                    I just accepted a full-time W-2 position at <a href="https://www.vizius.com/">The Vizius Group</a>, which officially transitions from subcontractor consulting work in December 2025.
                    This is a huge blessing, and I look forward to working with this team to help businesses here in Greenville and beyond integrate AI into automation systems and improving company bottom lines.
                  </p>
                </div>

                <div className="about-section mb-5">
                  <h3 className="section-heading mb-3">
                    <i className="fas fa-star me-2"></i>
                    Recent Project Highlights
                  </h3>
                  <div className="project-highlights">
                    <div className="highlight-item mb-3">
                      <Link href="/projects/enterprise-ai-payroll-processor" className="text-decoration-none">
                        <h5 className="fw-bold text-primary">Enterprise AI Payroll Processor</h5>
                        <p className="mb-2">
                          Led a 45-day project to redesign an AI payroll processor for an enterprise client using Azure microservices
                        </p>
                      </Link>
                    </div>
                    <div className="highlight-item mb-3">
                      <Link href="/projects/self-hosted-rag-chatbot" className="text-decoration-none">
                        <h5 className="fw-bold text-primary">Privacy-First RAG Chatbot</h5>
                        <p className="mb-2">
                          Built a privacy-first RAG chatbot for a non-profit with self-hosted Mistral-7B
                        </p>
                      </Link>
                    </div>
                    <div className="highlight-item mb-3">
                      <Link href="/projects/cloud-rag-chatbot-gemini" className="text-decoration-none">
                        <h5 className="fw-bold text-primary">Custom Cloud-Based RAG Chatbot</h5>
                        <p className="mb-2">
                          Created a custom cloud-based RAG chatbot for a sales agency with a responsive web interface
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="about-section">
                  <h3 className="section-heading mb-3">
                    <i className="fas fa-handshake me-2"></i>
                    Let&apos;s Connect
                  </h3>
                  <p className="mb-4">
                    I am thrilled to continue building relationship with professionals in the AI and tech space, and am always eager to connect whether online or in person!
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    <Link href="/contact" className="btn btn-primary btn-lg">
                      <i className="fas fa-envelope me-2"></i>
                      Contact Me
                    </Link>
                    <a
                      href="https://github.com/realadammatthew/resume/raw/main/adam-steinberger-resume.pdf"
                      className="btn btn-outline-primary btn-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-download me-2"></i>
                      Download Resume
                    </a>
                    <Link href="/services" className="btn btn-custom btn-lg">
                      <i className="fas fa-cogs me-2"></i>
                      View Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}