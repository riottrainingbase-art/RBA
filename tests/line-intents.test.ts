import assert from "node:assert/strict";
import test from "node:test";
import {
  inferAmbiguousTopic,
  inferConciergeRoute,
  inferServiceHint,
  inferStaffCategory,
  isMenuRequest,
} from "../lib/line/intents.ts";

test("menu requests stay in the RIOT welcome flow", () => {
  assert.equal(isMenuRequest("メニュー"), true);
  assert.equal(isMenuRequest("こんにちは"), true);
  assert.equal(isMenuRequest("何ができる？"), true);
  assert.equal(isMenuRequest("U15について知りたい"), false);
});

test("RTB training inquiries route to RTB", () => {
  assert.equal(inferConciergeRoute("パーソナルトレーニングを相談したい"), "rtb");
  assert.equal(inferConciergeRoute("中学生のウエイト導入について知りたい"), "rtb");
  assert.equal(inferConciergeRoute("ACL予防のトレーニングを相談したい"), "rtb");
  assert.equal(inferConciergeRoute("怪我予防のS&Cを相談したい"), "rtb");
});

test("RBA development inquiries route to RBA", () => {
  assert.equal(inferConciergeRoute("U15の活動について知りたい"), "rba");
  assert.equal(inferConciergeRoute("クリニックに参加したい"), "rba");
  assert.equal(inferConciergeRoute("指導者向けD-HUBについて知りたい"), "rba");
  assert.equal(inferConciergeRoute("海外交流について知りたい"), "rba");
  assert.equal(inferConciergeRoute("佐賀福岡キャンプについて知りたい"), "rba");
  assert.equal(inferConciergeRoute("山形の参加方法を知りたい"), "rba");
  assert.equal(inferConciergeRoute("神戸キャンプの料金は？"), "rba");
  assert.equal(inferConciergeRoute("トーステンのオンライン講習について"), "rba");
  assert.equal(inferConciergeRoute("川崎の料金は？"), "rba");
  assert.equal(inferConciergeRoute("やいまカップについて知りたい"), "rba");
});

test("generic price and booking questions ask which service", () => {
  assert.equal(inferConciergeRoute("料金を知りたい"), "ambiguous");
  assert.equal(inferConciergeRoute("体験できますか"), "ambiguous");
  assert.equal(inferConciergeRoute("予約したい"), "ambiguous");
});

test("billing and refund inquiries always require staff handling", () => {
  assert.equal(inferConciergeRoute("返金について確認したい"), "staff");
  assert.equal(inferStaffCategory("返金について確認したい"), "billing");
  assert.equal(inferConciergeRoute("RBAの二重決済について"), "staff");
  assert.equal(inferStaffCategory("RBAの二重決済について"), "billing");
});

test("health and injury cases require staff handling", () => {
  assert.equal(inferConciergeRoute("腰痛があります"), "staff");
  assert.equal(inferStaffCategory("腰痛があります"), "health");
  assert.equal(inferConciergeRoute("半月板損傷後のトレーニングを相談したい"), "staff");
  assert.equal(inferStaffCategory("半月板損傷後のトレーニングを相談したい"), "health");
  assert.equal(inferConciergeRoute("膝が痛いです"), "staff");
});

test("schedule changes and cancellations require staff handling", () => {
  assert.equal(inferConciergeRoute("明日の予約を変更したい"), "staff");
  assert.equal(inferStaffCategory("明日の予約を変更したい"), "schedule");
  assert.equal(inferConciergeRoute("クリニックを欠席します"), "staff");
  assert.equal(inferStaffCategory("クリニックを欠席します"), "schedule");
});

test("explicit human handoff requests stay human", () => {
  assert.equal(inferConciergeRoute("スタッフと直接相談したい"), "staff");
  assert.equal(inferStaffCategory("スタッフと直接相談したい"), "human");
  assert.equal(inferConciergeRoute("担当者に確認したい"), "staff");
});

test("service-specific operational questions keep service context", () => {
  assert.equal(inferConciergeRoute("RTBの料金を知りたい"), "rtb");
  assert.equal(inferConciergeRoute("RBAキャンプの料金を知りたい"), "rba");
  assert.equal(inferConciergeRoute("RTBの予約をしたい"), "rtb");
});


test("staff service hints identify RTB and RBA without guessing ambiguous cases", () => {
  assert.equal(inferServiceHint("RTBの返金について"), "RTB");
  assert.equal(inferServiceHint("RBAのキャンプを欠席します"), "RBA");
  assert.equal(inferServiceHint("パーソナルトレーニングの予約を変更したい"), "RTB");
  assert.equal(inferServiceHint("U15の予約変更について"), "RBA");
  assert.equal(inferServiceHint("返金について確認したい"), "UNKNOWN");
});


test("ambiguous topics preserve the user's original intent", () => {
  assert.equal(inferAmbiguousTopic("料金を知りたい"), "price");
  assert.equal(inferAmbiguousTopic("予約できますか"), "booking");
  assert.equal(inferAmbiguousTopic("体験したい"), "application");
  assert.equal(inferAmbiguousTopic("場所はどこですか"), "location");
  assert.equal(inferAmbiguousTopic("問い合わせしたい"), "general");
});
