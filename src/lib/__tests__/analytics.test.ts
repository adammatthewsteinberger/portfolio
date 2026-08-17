import { describe, it, expect, vi, beforeEach } from 'vitest';
import { track } from '../analytics';

describe('track', () => {
  beforeEach(() => {
    // @ts-expect-error - resetting the global between tests
    delete window.gtag;
  });

  it('calls window.gtag with the event name and params when gtag is available', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    track('cta_click', { location: 'hero' });

    expect(gtag).toHaveBeenCalledWith('event', 'cta_click', { location: 'hero' });
  });

  it('defaults params to an empty object when none are given', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    track('scroll_75');

    expect(gtag).toHaveBeenCalledWith('event', 'scroll_75', {});
  });

  it('does not throw when gtag is not defined', () => {
    expect(() => track('resume_download')).not.toThrow();
  });

  it('does not throw when gtag is defined but not a function', () => {
    // @ts-expect-error - deliberately wrong type to exercise the guard
    window.gtag = 'not-a-function';
    expect(() => track('resume_download')).not.toThrow();
  });
});
