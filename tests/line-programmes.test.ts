import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../components/programme-data.ts", import.meta.url), "utf8");
const lineSource = readFileSync(new URL("../lib/line/programme-knowledge.ts", import.meta.url), "utf8");

test("LINE programme knowledge imports the RBA programme source of truth", () => {
  assert.equal(
    lineSource.includes('from "@/components/programme-data"'),
    true,
  );
});

test("programme source contains current Sendai U15, camps and Torsten facts", () => {
  assert.equal(source.includes('id: "sendai-u15"'), true);
  assert.equal(source.includes('入会金5,500円＋月3回7,700円（税込）'), true);
  assert.equal(source.includes('id: "saga-fukuoka"'), true);
  assert.equal(source.includes('参加費 16,500円（税込）'), true);
  assert.equal(source.includes('id: "yamagata"'), true);
  assert.equal(source.includes('id: "shizugawa"'), true);
  assert.equal(source.includes('id: "kobe"'), true);
  assert.equal(source.includes('id: "torsten"'), true);
  assert.equal(source.includes('ライブ 3,300円／30日オンデマンド 4,400円'), true);
});

test("closed September programmes are explicitly marked closed", () => {
  const yaimaStart = source.indexOf('id: "yaima"');
  const kawasakiStart = source.indexOf('id: "kawasaki"');
  const sagaStart = source.indexOf('id: "saga-fukuoka"');

  assert.notEqual(yaimaStart, -1);
  assert.notEqual(kawasakiStart, -1);
  assert.notEqual(sagaStart, -1);

  const yaimaBlock = source.slice(yaimaStart, kawasakiStart);
  const kawasakiBlock = source.slice(kawasakiStart, sagaStart);
  assert.equal(yaimaBlock.includes("registrationClosed: true"), true);
  assert.equal(kawasakiBlock.includes("registrationClosed: true"), true);
});
