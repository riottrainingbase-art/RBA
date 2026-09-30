import assert from "node:assert/strict";
import test from "node:test";
import {
  privateRateLimitKey,
  SlidingWindowRateLimiter,
} from "../lib/line/rate-limit.ts";

test("sliding-window limiter allows up to the configured maximum", () => {
  const limiter = new SlidingWindowRateLimiter(3, 60_000);
  assert.equal(limiter.check("a", 1_000).allowed, true);
  assert.equal(limiter.check("a", 2_000).allowed, true);
  assert.equal(limiter.check("a", 3_000).allowed, true);

  const blocked = limiter.check("a", 4_000);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.remaining, 0);
  assert.equal(blocked.retryAfterMs, 57_000);
});

test("events expire from the sliding window", () => {
  const limiter = new SlidingWindowRateLimiter(2, 10_000);
  assert.equal(limiter.check("a", 1_000).allowed, true);
  assert.equal(limiter.check("a", 2_000).allowed, true);
  assert.equal(limiter.check("a", 3_000).allowed, false);
  assert.equal(limiter.check("a", 11_001).allowed, true);
});

test("different private keys have independent limits", () => {
  const limiter = new SlidingWindowRateLimiter(1, 10_000);
  assert.equal(limiter.check("a", 1_000).allowed, true);
  assert.equal(limiter.check("a", 2_000).allowed, false);
  assert.equal(limiter.check("b", 2_000).allowed, true);
});

test("private rate-limit keys are deterministic and do not expose LINE user IDs", () => {
  const userId = "U123456789";
  const a = privateRateLimitKey(userId, "secret-a");
  const b = privateRateLimitKey(userId, "secret-a");
  const c = privateRateLimitKey(userId, "secret-b");

  assert.equal(a, b);
  assert.notEqual(a, c);
  assert.equal(a.includes(userId), false);
  assert.equal(a.length, 64);
});
