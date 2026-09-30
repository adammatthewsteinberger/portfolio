/**
 * Availability copy for the hire-me surface.
 *
 * Adam is available from 1 September 2026. Every pill, heading, and fact row on
 * the site derives its wording from here so the flip from "September 2026" to
 * "now" happens in one place. The site is statically built, so the value is
 * frozen at build time — redeploy after 2026-09-01 for the new wording to show.
 */
export const AVAILABLE_FROM = new Date('2026-09-01T00:00:00-04:00');

export const LOCATION_SUFFIX = 'Greenville, SC (remote) · US remote';

export function isAvailableNow(now: Date = new Date()): boolean {
  return now.getTime() >= AVAILABLE_FROM.getTime();
}

/** Header pill: "Available Sept 2026" → "Available now". */
export function availabilityShort(now: Date = new Date()): string {
  return isAvailableNow(now) ? 'Available now' : 'Available Sept 2026';
}

/** Section heading: "Available September 2026" → "Available now". */
export function availabilityHeading(now: Date = new Date()): string {
  return isAvailableNow(now) ? 'Available now' : 'Available September 2026';
}

/** Hero pill with location: "Available September 2026 · Greenville, SC (remote) · US remote". */
export function availabilityLong(now: Date = new Date()): string {
  return `${availabilityHeading(now)} · ${LOCATION_SUFFIX}`;
}

/** Value for the /hire-me "Available" fact row. */
export function availabilityFact(now: Date = new Date()): string {
  return isAvailableNow(now) ? 'Now' : 'September 2026';
}

/** First-person sentence for body copy. */
export function availabilitySentence(now: Date = new Date()): string {
  return isAvailableNow(now) ? "I'm available now" : "I'm available starting September 2026";
}
