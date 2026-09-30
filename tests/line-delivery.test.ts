import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../app/api/line/webhook/route.ts", import.meta.url), "utf8");

test("webhook acknowledges only after event processing", () => {
  assert.equal(source.includes("after(async () =>"), false);
  assert.equal(source.includes("await processEvents(events)"), true);
  assert.equal(source.includes("status: 500"), true);
});

test("failed fallback reply is rethrown for webhook recovery", () => {
  assert.equal(source.includes("throw fallbackError"), true);
  assert.equal(source.includes("AggregateError"), true);
});
