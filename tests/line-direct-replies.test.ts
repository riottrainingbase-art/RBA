import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../lib/line/direct-replies.ts", import.meta.url), "utf8");

test("deterministic replies are grounded in programme-data", () => {
  assert.equal(
    source.includes('from "@/components/programme-data"'),
    true,
  );
  assert.equal(source.includes("isProgrammeActive"), true);
  assert.equal(source.includes("programmeById"), true);
});

test("deterministic replies cover key official links and programmes", () => {
  for (const value of [
    "sendai-u15",
    "saga-fukuoka",
    "yamagata",
    "shizugawa",
    "kobe",
    "torsten",
    "MY HOME COURT",
    "rbaWebsite",
    "rtbLinktree",
  ]) {
    assert.equal(source.includes(value), true, `missing ${value}`);
  }
});

test("closed programmes are not presented as open", () => {
  assert.equal(source.includes('if (programme.registrationClosed) return "受付終了"'), true);
  assert.equal(source.includes('申込：現在は受付していません'), true);
});

test("upcoming list uses active programme filtering", () => {
  assert.equal(
    source.includes(".filter((programme) => isProgrammeActive(programme, now))"),
    true,
  );
});
