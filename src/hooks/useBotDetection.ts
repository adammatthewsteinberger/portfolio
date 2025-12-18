'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the visitor is a bot/crawler
 * Checks user agent for common bot identifiers
 * @returns boolean - true if bot detected, false if human user
 */
export function useBotDetection(): boolean {
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsBot(true);
      return;
    }

    const userAgent = navigator.userAgent.toLowerCase();

    const botPatterns = [
      'googlebot',
      'bingbot',
      'slurp', // Yahoo
      'duckduckbot',
      'baiduspider',
      'yandexbot',
      'sogou',
      'exabot',
      'facebot', // Facebook
      'ia_archiver', // Alexa
      'bot',
      'crawler',
      'spider',
      'scraper',
      'lighthouse',
      'chrome-lighthouse',
      'gtmetrix',
      'pingdom',
      'pagespeed',
      'headlesschrome',
      'playwright', // E2E testing
    ];

    const isBotDetected = botPatterns.some(pattern => userAgent.includes(pattern));
    setIsBot(isBotDetected);
  }, []);

  return isBot;
}
