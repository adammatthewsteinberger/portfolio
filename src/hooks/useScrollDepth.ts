'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll depth as a percentage
 * @param threshold - Percentage threshold to trigger (0-100)
 * @returns boolean indicating if threshold has been reached
 */
export function useScrollDepth(threshold: number = 40): boolean {
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Don't check if already triggered
      if (hasReachedThreshold) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate scroll percentage
      const scrollableDistance = documentHeight - windowHeight;
      const scrollPercentage = (scrollTop / scrollableDistance) * 100;

      if (scrollPercentage >= threshold) {
        setHasReachedThreshold(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, hasReachedThreshold]);

  return hasReachedThreshold;
}
