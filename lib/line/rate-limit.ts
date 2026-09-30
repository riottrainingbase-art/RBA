import { createHmac } from "node:crypto";

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
};

export class SlidingWindowRateLimiter {
  private readonly buckets = new Map<string, number[]>();

  constructor(
    private readonly maxEvents: number,
    private readonly windowMs: number,
    private readonly maxKeys = 2000,
  ) {
    if (!Number.isFinite(maxEvents) || maxEvents < 1) {
      throw new Error("maxEvents must be at least 1");
    }
    if (!Number.isFinite(windowMs) || windowMs < 1) {
      throw new Error("windowMs must be at least 1");
    }
  }

  check(key: string, now = Date.now()): RateLimitResult {
    const cutoff = now - this.windowMs;
    const previous = this.buckets.get(key) ?? [];
    const recent = previous.filter((timestamp) => timestamp > cutoff);

    if (recent.length >= this.maxEvents) {
      this.buckets.set(key, recent);
      return {
        allowed: false,
        remaining: 0,
        retryAfterMs: Math.max(1, recent[0] + this.windowMs - now),
      };
    }

    recent.push(now);
    this.buckets.delete(key);
    this.buckets.set(key, recent);
    this.trimKeys();

    return {
      allowed: true,
      remaining: Math.max(0, this.maxEvents - recent.length),
      retryAfterMs: 0,
    };
  }

  private trimKeys() {
    while (this.buckets.size > this.maxKeys) {
      const oldestKey = this.buckets.keys().next().value;
      if (typeof oldestKey !== "string") break;
      this.buckets.delete(oldestKey);
    }
  }
}

export function privateRateLimitKey(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value, "utf8").digest("hex");
}
