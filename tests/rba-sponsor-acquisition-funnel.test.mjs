import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const landing = read("app/ja/partners/sponsor-options/page.tsx");
const master = read("definitive-content/ja/sponsor.html");
const brief = read("app/ja/partners/brief/page.tsx");
const national = read("app/ja/support/page.tsx");
const gream = read("app/ja/gream/support/page.tsx");
const sendai = read("app/ja/gream-sendai/partners/page.tsx");
const tour = read("app/ja/national-tour/page.tsx");
const policy = read("docs/sponsorship/rba-sponsor-acquisition-operations-20261121.md");

test("New sponsored-options landing has Japanese SEO and official RBA logo", () => {
  assert.ok(landing.includes("https://riotbasketballacademy.com/ja/partners/sponsor-options"));
  assert.ok(landing.includes('src="/rba-logo-original.jpg"'));
  assert.ok(landing.includes('<SiteFrame locale="ja">'));
  assert.ok(landing.includes('lang="ja"'));
});

test("Five distinct sponsorship paths never alter the existing business model", () => {
  assert.ok(landing.includes("GREAM仙台の地域広告"));
  assert.ok(landing.includes("月3,300円（税込）から"));
  assert.ok(landing.includes("年39,600円"));
  assert.ok(landing.includes("年132,000円"));
  assert.ok(landing.includes("12か月契約"));
  assert.ok(landing.includes("自動更新はありません"));
  assert.ok(landing.includes("RBA全国企業広告"));
  assert.ok(landing.includes("月11,000円（税込）"));
  assert.ok(landing.includes("毎月自動更新"));
  assert.ok(landing.includes("NEXT COURT TOUR 2027"));
  assert.ok(landing.includes("年間協賛60万円"));
  assert.ok(landing.includes("RIZEHOPE JAPAN 2027"));
  assert.ok(landing.includes("冠パートナー30万円"));
  assert.ok(landing.includes("現物・サービス提供による協力"));
});

test("Free consultation, live subscription and event enquiries use only verified endpoints", () => {
  assert.ok(landing.includes("https://form.jotform.com/263089038431054"));
  assert.ok(landing.includes("https://form.jotform.com/263222129730046"));
  assert.ok(landing.includes("/ja/support#apply"));
  assert.ok(landing.includes("/ja/national-tour"));
  assert.ok(landing.includes("/ja/gream-sendai/partners"));
  assert.ok(landing.includes("/ja/partners/brief"));
  assert.ok(landing.includes("無料相談は契約・申込み・課金ではありません"));
  assert.ok(landing.includes("フォーム送信だけで契約や課金は成立しません"));
  assert.ok(!landing.includes("buy.stripe.com/"));
  assert.ok(!landing.includes("checkout.stripe.com/"));
});

test("No fictional confirmations, endorsement, or child-data marketing", () => {
  assert.ok(landing.includes("海外チームの正式参加"));
  assert.ok(landing.includes("調整中"));
  assert.ok(landing.includes("交渉案"));
  assert.ok(landing.includes("選手・保護者の名簿や連絡先"));
  assert.ok(landing.includes("企業名やロゴ"));
  assert.ok(landing.includes("利用許諾"));
  assert.ok(landing.includes("事前にご確認"));
});

test("Existing visible sponsor/ads/event pages link to the central comparison", () => {
  const url = "/ja/partners/sponsor-options";
  for (const page of [master, brief, national, gream, sendai, tour]) {
    assert.ok(page.includes(url), "Expected sponsor comparison link on existing entry page");
  }
  assert.ok(master.includes("企業として無料で相談する"));
  assert.ok(brief.includes("協賛の種類・金額を比較する"));
});

test("Lead and contract handling are distinct, stopped leads must not be re-contacted", () => {
  for (const phrase of ["new_inquiry", "proposal_sent", "terms_agreed", "payment_verified", "declined_or_stop", "bounce_or_hold"]) {
    assert.ok(policy.includes(phrase));
  }
  assert.ok(policy.includes("相談 → 条件確認 → 見積・提案"));
  assert.ok(policy.includes("停止要請"));
  assert.ok(policy.includes("送信済み ≠ 先方到達"));
  assert.ok(policy.includes("企業名・ロゴの掲載は許可後"));
});
