import assert from "node:assert/strict";
import test from "node:test";
import { currentRbaProgrammeKnowledge } from "../lib/line/programme-knowledge.ts";

test("programme knowledge excludes closed September events and includes active October/November items", () => {
  const text = currentRbaProgrammeKnowledge(new Date("2026-09-30T07:00:00Z"));
  assert.equal(text.includes("YAIMA CUP参加プロジェクト"), false);
  assert.equal(text.includes("RBA 川崎クリニック"), false);
  assert.equal(text.includes("佐賀 × 福岡 2Days Development Camp"), true);
  assert.equal(text.includes("山形 1Day Clinic"), true);
  assert.equal(text.includes("志津川 Development Camp 2026"), true);
  assert.equal(text.includes("KOBE Development Camp 2026"), true);
  assert.equal(text.includes("トーステン・ロイブル オンライン講習 Vol.2"), true);
  assert.equal(text.includes("RBA U15 SKILL UP SCHOOL｜仙台"), true);
});

test("programme knowledge carries official fee and registration facts", () => {
  const text = currentRbaProgrammeKnowledge(new Date("2026-09-30T07:00:00Z"));
  assert.equal(text.includes("参加費 16,500円（税込）"), true);
  assert.equal(text.includes("ライブ 3,300円／30日オンデマンド 4,400円"), true);
  assert.equal(text.includes("入会金5,500円＋月3回7,700円（税込）"), true);
});
