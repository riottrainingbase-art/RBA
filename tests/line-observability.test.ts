import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../app/api/line/webhook/route.ts", import.meta.url), "utf8");

test("LINE observability logs use aggregate outcomes", () => {
  for (const outcome of [
    "follow",
    "non_text",
    "menu",
    "staff",
    "ambiguous",
    "deterministic",
    "rate_limited",
    "ai",
    "fallback",
  ]) {
    assert.equal(source.includes(`"${outcome}"`), true, `missing ${outcome}`);
  }
});

test("structured outcome logger does not log raw message text or LINE user id", () => {
  const loggerStart = source.indexOf("function logLineOutcome");
  const loggerEnd = source.indexOf("const MENU_QUICK_REPLIES");
  const loggerSource = source.slice(loggerStart, loggerEnd);
  assert.equal(loggerSource.includes("userText"), false);
  assert.equal(loggerSource.includes("userId"), false);
  assert.equal(loggerSource.includes("message.text"), false);
});
