import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBotDetection } from '../useBotDetection';

describe('useBotDetection', () => {
  const originalUserAgent = navigator.userAgent;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUserAgent = (ua: string) => {
    Object.defineProperty(navigator, 'userAgent', {
      value: ua,
      writable: true,
      configurable: true,
    });
  };

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      writable: true,
      configurable: true,
    });
  });

  describe('bot detection', () => {
    it('detects Googlebot', () => {
      mockUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(true);
    });

    it('detects Bingbot', () => {
      mockUserAgent('Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(true);
    });

    it('detects generic bot pattern', () => {
      mockUserAgent('Mozilla/5.0 (compatible; SomeBot/1.0)');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(true);
    });

    it('detects crawler pattern', () => {
      mockUserAgent('Mozilla/5.0 (compatible; WebCrawler/1.0)');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(true);
    });

    it('detects spider pattern', () => {
      mockUserAgent('Mozilla/5.0 (compatible; Spider/1.0)');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(true);
    });

    it('detects Lighthouse', () => {
      mockUserAgent('Mozilla/5.0 Chrome-Lighthouse');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(true);
    });

    it('detects HeadlessChrome', () => {
      mockUserAgent('Mozilla/5.0 HeadlessChrome/90.0');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(true);
    });
  });

  describe('human user detection', () => {
    it('returns false for regular Chrome browser', () => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(false);
    });

    it('returns false for regular Firefox browser', () => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(false);
    });

    it('returns false for Safari on Mac', () => {
      mockUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(false);
    });

    it('returns false for mobile Safari', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1');
      const { result } = renderHook(() => useBotDetection());
      expect(result.current).toBe(false);
    });
  });
});
