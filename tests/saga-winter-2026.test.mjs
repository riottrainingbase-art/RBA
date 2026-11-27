import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { sagaWinterOffers,sagaEarlybird,isSagaEarlybirdOpen } from "../lib/saga-winter-2026.ts";
test("28 December plans and confirmed earlybird amounts",()=>{
  assert.deepEqual(Object.values(sagaWinterOffers).map(p=>p.amount),[5500,5500,4400,9900,12100]);
  assert.deepEqual(Object.values(sagaWinterOffers).map(p=>p.amount-sagaEarlybird.amount),[4500,4500,3400,8900,11100]);
  assert.equal(isSagaEarlybirdOpen(Date.parse("2026-12-20T23:59:59+09:00")),true);
  assert.equal(isSagaEarlybirdOpen(Date.parse(sagaEarlybird.endExclusive)),false);
  assert.ok(Object.values(sagaWinterOffers).every(p=>p.starts.startsWith("2026-12-28")));
});
test("public programme and guardian checkout refer only to confirmed 28 December",()=>{
  const page=readFileSync("app/ja/saga/page.tsx","utf8");
  const programmes=readFileSync("components/programme-data.ts","utf8");
  const route=readFileSync("app/api/clinics/saga-winter-20261228/checkout/route.ts","utf8");
  assert.match(page,/29日のみの参加や2日間参加のお申し込み・お支払いは、まだ受け付けていません/);
  assert.match(page,/入金確認後/);
  assert.match(page,/再申込・再決済しないでください/);
  assert.match(programmes,/id:"saga-winter-20261228"/);
  assert.match(route,/isSagaEarlybirdOpen/);
  assert.match(route,/rba_approved/);
  assert.match(route,/idempotencyKey/);
});
