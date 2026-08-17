import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('rateLimit', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('checkRateLimit', () => {
    it('allows requests under the per-window limit', async () => {
      const { checkRateLimit } = await import('../rateLimit');
      for (let i = 0; i < 5; i++) {
        expect(checkRateLimit('client-a').allowed).toBe(true);
      }
    });

    it('blocks the 6th request within the same window', async () => {
      const { checkRateLimit } = await import('../rateLimit');
      for (let i = 0; i < 5; i++) checkRateLimit('client-b');
      const result = checkRateLimit('client-b');
      expect(result.allowed).toBe(false);
      expect(result.retryAfterSeconds).toBeGreaterThan(0);
    });

    it('resets the window after it elapses', async () => {
      const { checkRateLimit } = await import('../rateLimit');
      for (let i = 0; i < 5; i++) checkRateLimit('client-c');
      expect(checkRateLimit('client-c').allowed).toBe(false);

      vi.advanceTimersByTime(61_000);

      expect(checkRateLimit('client-c').allowed).toBe(true);
    });

    it('blocks once the daily cap is reached, even across window resets', async () => {
      const { checkRateLimit } = await import('../rateLimit');

      // 60 allowed requests spread across windows (5 per window, 12 windows)
      for (let window = 0; window < 12; window++) {
        for (let i = 0; i < 5; i++) {
          expect(checkRateLimit('client-d').allowed).toBe(true);
        }
        vi.advanceTimersByTime(61_000);
      }

      const result = checkRateLimit('client-d');
      expect(result.allowed).toBe(false);
      expect(result.retryAfterSeconds).toBeGreaterThan(0);
    });

    it('resets the daily count after 24 hours', async () => {
      const { checkRateLimit } = await import('../rateLimit');

      for (let window = 0; window < 12; window++) {
        for (let i = 0; i < 5; i++) checkRateLimit('client-e');
        vi.advanceTimersByTime(61_000);
      }
      expect(checkRateLimit('client-e').allowed).toBe(false);

      vi.advanceTimersByTime(86_400_000);

      expect(checkRateLimit('client-e').allowed).toBe(true);
    });

    it('tracks separate clients independently', async () => {
      const { checkRateLimit } = await import('../rateLimit');
      for (let i = 0; i < 5; i++) checkRateLimit('client-f');
      expect(checkRateLimit('client-f').allowed).toBe(false);
      expect(checkRateLimit('client-g').allowed).toBe(true);
    });
  });

  describe('checkDailySpendCap / recordOutputTokens', () => {
    it('allows spend under the daily cap', async () => {
      const { checkDailySpendCap, recordOutputTokens } = await import('../rateLimit');
      recordOutputTokens(1000);
      expect(checkDailySpendCap()).toBe(true);
    });

    it('blocks once the daily output token cap is reached', async () => {
      const { checkDailySpendCap, recordOutputTokens } = await import('../rateLimit');
      recordOutputTokens(200_001);
      expect(checkDailySpendCap()).toBe(false);
    });

    it('resets the spend cap after 24 hours', async () => {
      const { checkDailySpendCap, recordOutputTokens } = await import('../rateLimit');
      recordOutputTokens(200_001);
      expect(checkDailySpendCap()).toBe(false);

      vi.advanceTimersByTime(86_400_001);

      expect(checkDailySpendCap()).toBe(true);
    });
  });

  describe('clientKeyFromHeaders', () => {
    it('prefers the Netlify client connection IP header', async () => {
      const { clientKeyFromHeaders } = await import('../rateLimit');
      const headers = new Headers({
        'x-nf-client-connection-ip': '1.2.3.4',
        'x-forwarded-for': '5.6.7.8',
      });
      expect(clientKeyFromHeaders(headers)).toBe('1.2.3.4');
    });

    it('falls back to the first x-forwarded-for entry', async () => {
      const { clientKeyFromHeaders } = await import('../rateLimit');
      const headers = new Headers({ 'x-forwarded-for': '5.6.7.8, 9.9.9.9' });
      expect(clientKeyFromHeaders(headers)).toBe('5.6.7.8');
    });

    it('falls back to "unknown" with no identifying headers', async () => {
      const { clientKeyFromHeaders } = await import('../rateLimit');
      expect(clientKeyFromHeaders(new Headers())).toBe('unknown');
    });
  });
});
