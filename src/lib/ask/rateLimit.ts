/**
 * In-memory rate limiting and spend cap for the "Ask my résumé" bot.
 *
 * Netlify Functions can scale to multiple concurrent instances, each with
 * its own memory, and cold starts reset it entirely — so these caps are a
 * best-effort backstop against a single hot instance being hammered, not a
 * hard guarantee across the whole deployment. Combined with the per-request
 * turn cap and honeypot check, that's an acceptable tradeoff for a low-value
 * chat widget without provisioning Netlify Blobs/KV for this.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_REQUESTS_PER_DAY = 60;
const MAX_DAILY_OUTPUT_TOKENS = 200_000;

interface Bucket {
  windowStart: number;
  windowCount: number;
  dayStart: number;
  dayCount: number;
}

const buckets = new Map<string, Bucket>();
let dailyOutputTokens = 0;
let dailyTokensDayStart = Date.now();

function getBucket(key: string): Bucket {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { windowStart: now, windowCount: 0, dayStart: now, dayCount: 0 };
    buckets.set(key, bucket);
  }
  if (now - bucket.windowStart > WINDOW_MS) {
    bucket.windowStart = now;
    bucket.windowCount = 0;
  }
  if (now - bucket.dayStart > 86_400_000) {
    bucket.dayStart = now;
    bucket.dayCount = 0;
  }
  return bucket;
}

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const bucket = getBucket(key);
  if (bucket.windowCount >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((bucket.windowStart + WINDOW_MS - Date.now()) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) };
  }
  if (bucket.dayCount >= MAX_REQUESTS_PER_DAY) {
    const retryAfterSeconds = Math.ceil((bucket.dayStart + 86_400_000 - Date.now()) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) };
  }
  bucket.windowCount += 1;
  bucket.dayCount += 1;
  return { allowed: true };
}

export function checkDailySpendCap(): boolean {
  const now = Date.now();
  if (now - dailyTokensDayStart > 86_400_000) {
    dailyTokensDayStart = now;
    dailyOutputTokens = 0;
  }
  return dailyOutputTokens < MAX_DAILY_OUTPUT_TOKENS;
}

export function recordOutputTokens(count: number): void {
  dailyOutputTokens += count;
}

export function clientKeyFromHeaders(headers: Headers): string {
  return (
    headers.get('x-nf-client-connection-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}
