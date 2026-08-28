import { describe, expect, it } from 'vitest';
import { GENERIC_FAILURE, OUT_OF_COFFEE, failureMessage, isCreditsExhausted } from '../messages';

describe('résumé-bot failure messages', () => {
  it('recognises the ways Anthropic reports exhausted credit', () => {
    expect(isCreditsExhausted(new Error('Your credit balance is too low to access the Anthropic API.'))).toBe(true);
    expect(isCreditsExhausted(new Error('insufficient credits'))).toBe(true);
    expect(isCreditsExhausted('billing issue')).toBe(true);
  });

  it('does not misread other errors or non-errors as exhausted credit', () => {
    expect(isCreditsExhausted(new Error('overloaded_error'))).toBe(false);
    expect(isCreditsExhausted({ status: 500 })).toBe(false);
    expect(isCreditsExhausted(undefined)).toBe(false);
  });

  it('serves the coffee line for exhausted credit and the generic line otherwise', () => {
    expect(failureMessage(new Error('credit balance is too low'))).toBe(OUT_OF_COFFEE);
    expect(failureMessage(new Error('timeout'))).toBe(GENERIC_FAILURE);
    expect(OUT_OF_COFFEE).toMatch(/join-me/);
  });
});
