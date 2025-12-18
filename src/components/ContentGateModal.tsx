'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useScrollDepth } from '@/hooks/useScrollDepth';
import { useBotDetection } from '@/hooks/useBotDetection';

export default function ContentGateModal() {
  const [showModal, setShowModal] = useState(false);
  const hasScrolledEnough = useScrollDepth(15);
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1050]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-2xl shadow-2xl z-[1051] p-8">
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] bg-transparent border-none cursor-pointer transition-colors"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="text-center mb-6">
          <i className="fas fa-book text-5xl mb-4 text-[var(--color-accent-gold)]"></i>
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent">
            Want to Read More?
          </h3>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            This is a preview from my new book on AI implementation. Get the complete guide with in-depth strategies, real-world examples, and actionable insights.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="https://www.amazon.com/dp/B0G2FWTJ3Q"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 hover:from-amber-500 hover:to-[var(--color-accent-gold)] font-bold rounded-lg transition-all no-underline"
            style={{ color: '#000000' }}
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fab fa-amazon"></i>
            Order on Amazon
          </a>

          <a
            href="https://chat.adam.matthewsteinberger.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fas fa-comments"></i>
            Chat Now
          </a>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-dark-card-alt)] hover:bg-[var(--color-dark-border)] text-[var(--color-text-primary)] font-bold rounded-lg transition-colors no-underline"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fas fa-home"></i>
            Go Home
          </Link>
        </div>

        <p className="text-center text-[var(--color-text-muted)] mt-6 text-sm">
          Or continue exploring this preview content
        </p>
      </div>
    </>
  );
}
