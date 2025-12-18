import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollDepth } from '../useScrollDepth';

describe('useScrollDepth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window and document scroll properties
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns false when not scrolled', () => {
    const { result } = renderHook(() => useScrollDepth(40));
    expect(result.current).toBe(false);
  });

  it('returns true when threshold is reached', () => {
    const { result } = renderHook(() => useScrollDepth(40));
    expect(result.current).toBe(false);

    // Simulate scrolling past 40% threshold
    // scrollableDistance = 2000 - 800 = 1200
    // 40% of 1200 = 480
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('uses default threshold of 40', () => {
    const { result } = renderHook(() => useScrollDepth());
    expect(result.current).toBe(false);

    // Scroll to 41% (should trigger at default 40%)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 492, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('respects custom threshold', () => {
    const { result } = renderHook(() => useScrollDepth(80));
    expect(result.current).toBe(false);

    // Scroll to 50% (should not trigger at 80%)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);

    // Scroll to 85% (should trigger)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1020, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('stays true once threshold is reached', () => {
    const { result } = renderHook(() => useScrollDepth(40));

    // Scroll past threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);

    // Scroll back up
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // Should still be true
    expect(result.current).toBe(true);
  });

  it('cleans up scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollDepth(40));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
