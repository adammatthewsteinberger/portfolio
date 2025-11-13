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
          <i className='fas fa-home me-2'></i>
          Home
        </Link>

        <div className='menu-section'>
          <h6 className='menu-section-title'>Services</h6>
          <Link href='/services/custom-chatbots' className='menu-item submenu-item' onClick={closeMenu}>
            <i className='fas fa-robot me-2'></i>
            Custom Chatbots
          </Link>
          <Link href='/services/llm-development' className='menu-item submenu-item' onClick={closeMenu}>
            <i className='fas fa-brain me-2'></i>
            LLM Development
          </Link>
          <Link href='/services/rag-development' className='menu-item submenu-item' onClick={closeMenu}>
            <i className='fas fa-search me-2'></i>
            RAG Systems
          </Link>
          <Link href='/services' className='menu-item submenu-item' onClick={closeMenu}>
            <i className='fas fa-list me-2'></i>
            All Services
          </Link>
        </div>

        <Link href='/about' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-user me-2'></i>
          About Me
        </Link>

        <Link href='/projects' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-briefcase me-2'></i>
          Projects
        </Link>

        <Link href='/novice-to-navigator' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-graduation-cap me-2'></i>
          Learn AI
        </Link>

        <Link href='/blog' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-blog me-2'></i>
          Blog
        </Link>

        <Link href='/contact' className='menu-item' onClick={closeMenu}>
          <i className='fas fa-envelope me-2'></i>
          Contact
        </Link>

        <a href='https://chat.adam.matthewsteinberger.com' className='menu-item' onClick={closeMenu} target='_blank' rel='noopener noreferrer'>
          <i className='fas fa-play me-2'></i>
          Demo
        </a>
        </Menu>

      {/* Main Navigation Bar */}
      <nav className='navbar fixed-top main-navbar'>
        <div className='container-fluid'>
          <Link href='/' className='navbar-brand d-flex align-items-center'>
            <Image
              src='/images/profile-picture.jpg'
              alt='Adam Matthew Steinberger'
              width={40}
              height={40}
              className='rounded-circle me-2'
              priority
            />
            <span className='brand-text'>Adam Matthew Steinberger</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='desktop-nav d-none d-lg-flex'>
            <div className='nav-list'>
              <Link href='/' className='nav-link-desktop'>
                <i className='fas fa-home me-1'></i>
                Home
              </Link>

              <div
                className='dropdown-wrapper'
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button
                  className='nav-link-desktop dropdown-btn'
                  onClick={toggleServices}
                >
                  <i className='fas fa-cogs me-1'></i>
                  Services
                  <i className={`fas fa-chevron-down ms-1 ${isServicesOpen ? 'rotate' : ''}`}></i>
                </button>
                {isServicesOpen && (
                  <div className='dropdown-menu-custom'>
                    <Link href='/services/custom-chatbots' className='dropdown-item-custom' onClick={closeServices}>
                      <i className='fas fa-robot me-2'></i>
                      Custom Chatbots
                    </Link>
                    <Link href='/services/llm-development' className='dropdown-item-custom' onClick={closeServices}>
                      <i className='fas fa-brain me-2'></i>
                      LLM Development
                    </Link>
                    <Link href='/services/rag-development' className='dropdown-item-custom' onClick={closeServices}>
                      <i className='fas fa-search me-2'></i>
                      RAG Systems
                    </Link>
                    <div className='dropdown-divider-custom'></div>
                    <Link href='/services' className='dropdown-item-custom' onClick={closeServices}>
                      <i className='fas fa-list me-2'></i>
                      All Services
                    </Link>
                  </div>
                )}
              </div>

              <Link href='/about' className='nav-link-desktop'>
                <i className='fas fa-user me-1'></i>
                About Me
              </Link>

              <Link href='/projects' className='nav-link-desktop'>
                <i className='fas fa-briefcase me-1'></i>
                Projects
              </Link>

              <Link href='/novice-to-navigator' className='nav-link-desktop'>
                <i className='fas fa-graduation-cap me-1'></i>
                Learn AI
              </Link>

              <Link href='/blog' className='nav-link-desktop'>
                <i className='fas fa-blog me-1'></i>
                Blog
              </Link>

              <a href='https://chat.adam.matthewsteinberger.com/' className='nav-link-desktop' target='_blank' rel='noopener noreferrer'>
                <i className='fas fa-play me-1'></i>
                Demo
              </a>

              <Link href='/contact' className='nav-link-desktop'>
                <i className='fas fa-envelope me-1'></i>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className='resume-header'>
        <div className='container py-5'>
          <div className='row align-items-center'>
            <div className='col-md-3 text-center mb-4 mb-md-0'>
              <Image
                src='/images/profile-picture.jpg'
                alt='Adam Matthew Steinberger - Staff Software Engineer and AI Solutions Architect'
                width={200}
                height={200}
                className='profile-large rounded-circle shadow'
                priority
              />
            </div>
            <div className='col-md-9'>
              <h1 className='display-4 fw-bold mb-2'>Adam Matthew Steinberger</h1>
              <h2 className='h4 text-muted mb-3'>Staff Software Engineer &amp; AI Solutions Architect</h2>
              <p className='lead mb-4'>
                Transforming businesses with cutting-edge AI solutions and custom chatbot development in 
                <br />
                📍 Greenville, South Carolina.
              </p>

              <div className='social-links d-flex gap-2'>
                <a
                  href='https://linkedin.com/in/realadammatthew/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary btn-sm'
                  aria-label='LinkedIn Profile'
                >
                  <i className='fab fa-linkedin me-1'></i>
                  <span className='btn-text'>LinkedIn</span>
                </a>
                <a
                  href='https://github.com/realadammatthew'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary btn-sm'
                  aria-label='GitHub Profile'
                >
                  <i className='fab fa-github me-1'></i>
                  <span className='btn-text'>GitHub</span>
                </a>
                <Link href='/contact' className='btn btn-primary btn-sm' aria-label='Contact Me'>
                  <i className='fas fa-envelope me-1'></i>
                  <span className='btn-text'>Contact Me</span>
                </Link>
                <a
                  href="https://github.com/realadammatthew/resume/raw/main/adam-steinberger-resume.pdf"
                  className='btn btn-primary btn-sm'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Download Resume'
                >
                  <i className='fas fa-download me-1'></i>
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
