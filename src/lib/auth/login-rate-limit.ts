/**
 * In-memory login attempt limiter (per IP + normalized email).
 * Replace with Redis / Upstash in production for multi-instance correctness.
 */
type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const buckets = new Map<string, Bucket>();

export function assertLoginRateAllowed(key: string): void {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  b.count += 1;
  if (b.count > MAX_ATTEMPTS) {
    throw new Error("rate_limited");
  }
}

export function resetLoginRate(key: string): void {
  buckets.delete(key);
}
