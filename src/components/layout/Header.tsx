'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Menu = dynamic(
  () => import('react-burger-menu').then((mod) => mod.slide),
  { ssr: false }
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [servicesTimeout, setServicesTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const closeServices = () => {
    setIsServicesOpen(false);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeout) {
      clearTimeout(servicesTimeout);
      setServicesTimeout(null);
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsServicesOpen(false);
    }, 500);
    setServicesTimeout(timeout);
  };

  return (
    <>
      {/* Burger Menu */}
        <Menu
          isOpen={isMenuOpen}
          onStateChange={handleStateChange}
          right
          width={'280px'}
          className='burger-menu'
        >
        <Link href='/' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-home mr-2'></i>
          Home
        </Link>

        <div className='menu-section'>
          <h6 className='menu-section-title'>Services</h6>
          <Link href='/services/custom-chatbots' className='menu-item submenu-item' onClick={closeMenu}>
            <i className='fas fa-robot mr-2'></i>
            Custom Chatbots
          </Link>
          <Link href='/services/llm-development' className='menu-item submenu-item' onClick={closeMenu}>
            <i className='fas fa-brain mr-2'></i>
            AI Development
          </Link>
          <Link href='/services/rag-development' className='menu-item submenu-item' onClick={closeMenu}>
            <i className='fas fa-search mr-2'></i>
            RAG Systems
          </Link>
          <Link href='/services' className='menu-item submenu-item' onClick={closeMenu}>
            <i className='fas fa-list mr-2'></i>
            All Services
          </Link>
        </div>

        <Link href='/about' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-user mr-2'></i>
          About Me
        </Link>

        <Link href='/projects' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-briefcase mr-2'></i>
          Projects
        </Link>

        <Link href='/novice-to-navigator' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-graduation-cap mr-2'></i>
          Learn AI
        </Link>

        <Link href='/blog' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-blog mr-2'></i>
          Blog
        </Link>

        <Link href='/contact' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-envelope mr-2'></i>
          Contact
        </Link>

        </Menu>

      {/* Main Navigation Bar */}
      <nav className='fixed top-0 left-0 right-0 z-50 bg-[var(--color-dark-bg)]/95 backdrop-blur-sm border-b border-[var(--color-dark-border)] main-navbar'>
        <div className='container mx-auto px-4 flex items-center justify-between h-16'>
          <Link href='/' className='flex items-center gap-2 no-underline'>
            <Image
              src='/images/profile-picture.jpg'
              alt='Adam Matthew Steinberger'
              width={40}
              height={40}
              className='rounded-full'
              priority
            />
            <span className='text-[var(--color-text-primary)] font-semibold text-lg'>Adam Matthew Steinberger</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center'>
            <div className='flex items-center gap-1'>
              <Link href='/' className='px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium no-underline'>
                <i className='fas fa-home mr-1'></i>
                Home
              </Link>

              <div
                className='relative'
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button
                  className='px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium bg-transparent border-none cursor-pointer flex items-center gap-1'
                  onClick={toggleServices}
                >
                  <i className='fas fa-cogs mr-1'></i>
                  Services
                  <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {isServicesOpen && (
                  <div className='absolute top-full left-0 mt-1 w-56 bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-lg shadow-lg py-2 z-50'>
                    <Link href='/services/custom-chatbots' className='flex items-center px-4 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-dark-card-alt)] transition-colors text-sm no-underline' onClick={closeServices}>
                      <i className='fas fa-robot mr-2 w-5'></i>
                      Custom Chatbots
                    </Link>
                    <Link href='/services/llm-development' className='flex items-center px-4 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-dark-card-alt)] transition-colors text-sm no-underline' onClick={closeServices}>
                      <i className='fas fa-brain mr-2 w-5'></i>
                      AI Development
                    </Link>
                    <Link href='/services/rag-development' className='flex items-center px-4 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-dark-card-alt)] transition-colors text-sm no-underline' onClick={closeServices}>
                      <i className='fas fa-search mr-2 w-5'></i>
                      RAG Systems
                    </Link>
                    <div className='border-t border-[var(--color-dark-border)] my-1'></div>
                    <Link href='/services' className='flex items-center px-4 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-dark-card-alt)] transition-colors text-sm no-underline' onClick={closeServices}>
                      <i className='fas fa-list mr-2 w-5'></i>
                      All Services
                    </Link>
                  </div>
                )}
              </div>

              <Link href='/about' className='px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium no-underline'>
                <i className='fas fa-user mr-1'></i>
                About Me
              </Link>

              <Link href='/projects' className='px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium no-underline'>
                <i className='fas fa-briefcase mr-1'></i>
                Projects
              </Link>

              <Link href='/novice-to-navigator' className='px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium no-underline'>
                <i className='fas fa-graduation-cap mr-1'></i>
                Learn AI
              </Link>

              <Link href='/blog' className='px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium no-underline'>
                <i className='fas fa-blog mr-1'></i>
                Blog
              </Link>

              <Link href='/contact' className='px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium no-underline'>
                <i className='fas fa-envelope mr-1'></i>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className='resume-header mt-20'>
        <div className='container mx-auto px-4 py-2'>
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='flex-shrink-0 text-center'>
              <Image
                src='/images/profile-picture.jpg'
                alt='Adam Matthew Steinberger - Senior Azure and AI Development Engineer'
                width={200}
                height={200}
                className='rounded-full shadow-lg'
                priority
              />
            </div>
            <div className='flex-1 text-center md:text-left'>
              <h1 className='text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-2'>Adam Matthew Steinberger</h1>
              <h2 className='text-xl text-[var(--color-text-muted)] mb-4'>Senior Azure and AI Development Engineer</h2>
              <p className='text-lg text-[var(--color-text-muted)] mb-6 leading-relaxed'>
                Transforming businesses with cutting-edge AI solutions and custom chatbot development in
                <br />
                Greenville, South Carolina.
              </p>

              <div className='flex flex-wrap gap-2 justify-center md:justify-start'>
                <a
                  href='https://linkedin.com/in/adammatthewsteinberger/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 px-4 py-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-sm font-medium rounded-lg transition-colors no-underline'
                  style={{ color: '#ffffff' }}
                  aria-label='LinkedIn Profile'
                >
                  <i className='fab fa-linkedin'></i>
                  <span className='btn-text'>LinkedIn</span>
                </a>
                <a
                  href='https://github.com/adammatthewsteinberger'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 px-4 py-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-sm font-medium rounded-lg transition-colors no-underline'
                  style={{ color: '#ffffff' }}
                  aria-label='GitHub Profile'
                >
                  <i className='fab fa-github'></i>
                  <span className='btn-text'>GitHub</span>
                </a>
                <Link href='/contact' className='inline-flex items-center gap-1 px-4 py-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-sm font-medium rounded-lg transition-colors no-underline' style={{ color: '#ffffff' }} aria-label='Contact Me'>
                  <i className='fas fa-envelope'></i>
                  <span className='btn-text'>Contact Me</span>
                </Link>
                <a
                  href="https://github.com/adammatthewsteinberger/resume/raw/main/adam-steinberger-resume.pdf"
                  className='inline-flex items-center gap-1 px-4 py-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-sm font-medium rounded-lg transition-colors no-underline'
                  style={{ color: '#ffffff' }}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Download Resume'
                >
                  <i className='fas fa-download'></i>
                  <span className='btn-text'>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
