/**
 * Visitor-facing messages for the résumé bot's failure modes.
 *
 * Running out of API credit is not an error the visitor caused, so it gets a
 * light line and an invitation instead of "something went wrong".
 */
export const OUT_OF_COFFEE =
  'Out of coffee — send more, please! ☕ (Or join us at /join-me; we need all the brainpower we can get.)';

export const GENERIC_FAILURE = 'Something went wrong answering that — try again in a moment.';

/**
 * True when an Anthropic API error means the account has no credit left.
 * The API reports this as a 400 invalid_request_error whose message says the
 * credit balance is too low; older responses said "insufficient" credits.
 */
export function isCreditsExhausted(error: unknown): boolean {
  const text = error instanceof Error ? error.message : typeof error === 'string' ? error : '';
  return /credit balance|insufficient (credit|funds)|billing/i.test(text);
}

/** Message for a caught model error: out-of-coffee when credit is gone, otherwise generic. */
export function failureMessage(error: unknown): string {
  return isCreditsExhausted(error) ? OUT_OF_COFFEE : GENERIC_FAILURE;
}
