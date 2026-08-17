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
    // navigator.userAgent isn't available during SSR render, so this has to
    // run client-side after mount rather than as a lazy useState initializer.
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
    // navigator isn't available during SSR render, so bot detection can only
    // run client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsBot(isBotDetected);
  }, []);

  return isBot;
}
