'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useScrollDepth } from '@/hooks/useScrollDepth';
import { useBotDetection } from '@/hooks/useBotDetection';

export default function ContentGateModal() {
  const [showModal, setShowModal] = useState(false);
  const hasScrolledEnough = useScrollDepth(40);
  const isBot = useBotDetection();

  useEffect(() => {
    // Only show modal to human users who have scrolled enough
    if (hasScrolledEnough && !isBot && !showModal) {
      setShowModal(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
  }, [hasScrolledEnough, isBot, showModal]);

  const handleClose = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  // Don't render anything for bots
  if (isBot) {
    return null;
  }

  if (!showModal) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="content-gate-overlay"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="content-gate-modal">
        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-content-inner">
          <div className="text-center mb-4">
            <i className="fas fa-book fa-3x mb-3" style={{ color: '#fbbf24' }}></i>
            <h3 className="fw-bold mb-3" style={{
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Want to Read More?
            </h3>
            <p className="lead mb-4">
              This is a preview from my new book on AI implementation. Get the complete guide with in-depth strategies, real-world examples, and actionable insights.
            </p>
          </div>

          <div className="d-grid gap-3">
            <a
              href="https://www.amazon.com/dp/B0G2FWTJ3Q"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-primary fw-bold"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fab fa-amazon me-2"></i>
              Order on Amazon
            </a>

            <a
              href="https://chat.adam.matthewsteinberger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-outline-primary fw-bold"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-comments me-2"></i>
              Chat Now
            </a>

            <Link
              href="/"
              className="btn btn-lg btn-dark fw-bold"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-home me-2"></i>
              Go Home
            </Link>
          </div>

          <p className="text-center text-muted mt-4 mb-0" style={{ fontSize: '0.875rem' }}>
            Or continue exploring this preview content
          </p>
        </div>
      </div>
    </>
  );
}
