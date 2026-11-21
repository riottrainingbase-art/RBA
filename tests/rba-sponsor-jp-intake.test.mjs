import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
const html=readFileSync(new URL("../definitive-content/ja/sponsor.html",import.meta.url),"utf8");
test("Japanese sponsor homepage helps businesses find all four appropriate sponsorship products",()=>{
  assert.ok(html.includes("支援したいことから、無理のない形をご相談ください。"));
  for(const link of [
    "/ja/gream-sendai/partners",
    "/ja/support",
    "/ja/national-tour",
    "https://form.jotform.com/263222129730046",
    "https://form.jotform.com/263089038431054"
  ]) assert.ok(html.includes(link),"missing destination: "+link);
});
test("Published sponsorship products explain their actual prices and different contracts",()=>{
  assert.ok(html.includes("月額3,300円（税込）から"));
  assert.ok(html.includes("月額11,000円（税込）"));
  assert.ok(html.includes("開催協賛10万円など（ご相談額）"));
  assert.ok(html.includes("5万〜30万円（協賛交渉案）"));
  assert.ok(html.includes("基本は12か月契約"));
  assert.ok(html.includes("送信だけで契約や請求は発生しません"));
});
test("No unapproved title sponsorship or data-sharing promise",()=>{
  assert.ok(html.includes("正式な参加"));
  assert.ok(html.includes("企業名・ロゴの掲載"));
  assert.ok(html.includes("子さまの氏名・連絡先・写真"));
  assert.ok(html.includes("企業の皆さまに協賛や紹介の義務はありません"));
  assert.ok(!html.includes("協賛決定しました"));
  assert.ok(!html.includes("海外チームの参加が確定"));
});
test("Official RBA logo and usable mobile markup remain",()=>{
  assert.ok(html.includes("/rba-logo-original.jpg"));
  assert.ok(html.includes("sponsor-options__primary"));
  assert.ok(html.includes("@media(max-width:700px)"));
  assert.ok(html.includes('rel="noopener noreferrer"'));
});
