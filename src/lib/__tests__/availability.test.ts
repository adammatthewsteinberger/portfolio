import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  AVAILABLE_FROM,
  availabilityFact,
  availabilityHeading,
  availabilityLong,
  availabilitySentence,
  availabilityShort,
  isAvailableNow,
} from '../availability';

const before = new Date('2026-08-27T12:00:00-04:00');
const after = new Date('2026-09-01T00:00:00-04:00');

describe('availability copy', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('flips exactly at the available-from instant', () => {
    expect(isAvailableNow(before)).toBe(false);
    expect(isAvailableNow(new Date(AVAILABLE_FROM.getTime() - 1))).toBe(false);
    expect(isAvailableNow(after)).toBe(true);
  });

  it('renders the September wording before the flip', () => {
    expect(availabilityShort(before)).toBe('Available Sept 2026');
    expect(availabilityHeading(before)).toBe('Available September 2026');
    expect(availabilityLong(before)).toBe('Available September 2026 · Greenville, SC (remote) · US remote');
    expect(availabilityFact(before)).toBe('September 2026');
    expect(availabilitySentence(before)).toBe("I'm available starting September 2026");
  });

  it('renders the "now" wording after the flip', () => {
    expect(availabilityShort(after)).toBe('Available now');
    expect(availabilityHeading(after)).toBe('Available now');
    expect(availabilityLong(after)).toBe('Available now · Greenville, SC (remote) · US remote');
    expect(availabilityFact(after)).toBe('Now');
    expect(availabilitySentence(after)).toBe("I'm available now");
  });

  it('defaults to the current time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(after);
    expect(isAvailableNow()).toBe(true);
    expect(availabilityShort()).toBe('Available now');
    expect(availabilityHeading()).toBe('Available now');
    expect(availabilityLong()).toContain('Available now');
    expect(availabilityFact()).toBe('Now');
    expect(availabilitySentence()).toBe("I'm available now");
  });
});
