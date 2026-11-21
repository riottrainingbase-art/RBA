import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const hub = read("components/rizehope-event-landing.tsx");
const united = read("app/ja/international/rizehope-japan-2027/united/page.tsx");
const generalUnited = read("components/platform-business-pages.tsx");
const officialForm = "https://form.jotform.com/263221266794057";

test("RIZEHOPE Japanese and English event pages offer distinct domestic, overseas and UNITED routes", () => {
  assert.match(hub, /263220855042046/);
  assert.match(hub, /263221234159047/);
  assert.match(hub, /263221266794057/);
  assert.ok(hub.includes("/ja/international/rizehope-japan-2027/united"));
  assert.match(hub, /RBA UNITED — Individual U12 players/);
  assert.match(hub, /RBA UNITED｜個人で参加したい選手・保護者/);
  assert.match(hub, /公式|無料|今は決済不要/);
});
test("RBA UNITED has a clear guardian-only free primary CTA and no active individual payment link", () => {
  assert.ok(united.includes(officialForm), "Must use original valid no-fee Jotform");
  assert.match(united, /保護者から無料で先行エントリー/);
  assert.match(united, /登録は無料・決済なし/);
  assert.match(united, /参加確定・選考合格・出場枠確保にはなりません/);
  assert.match(united, /保護者氏名/);
  assert.match(united, /居住都道府県/);
  assert.match(united, /学年/);
  assert.match(united, /マーケティング情報への同意は任意/);
  assert.doesNotMatch(united, /buy\.stripe\.com|checkout\.stripe\.com|squareup\.com/);
});
test("Nonpayable fee scenarios and domestic team price never conflate", () => {
  assert.match(united, /66,000円／チーム/);
  assert.match(united, /先行22,000円/);
  assert.match(united, /通常24,800円/);
  assert.match(united, /未確定の試算/);
  assert.match(united, /この金額による申込・決済は受け付けていません/);
});
test("RBA UNITED main landing surfaces the correct free form and details page", () => {
  assert.ok(generalUnited.includes("263221266794057"));
  assert.ok(generalUnited.includes("/ja/international/rizehope-japan-2027/united"));
  assert.ok(generalUnited.includes("無料登録は参加枠の確保や出場確定ではありません"));
});
test("Child-safety and organizer claims are not overstated", () => {
  assert.match(united, /年齢条件・指導者・引率・保険・救護/);
  assert.match(united, /UNITEDの出場枠は確保していません/);
  assert.match(united, /所属チームを変えず/);
  assert.match(united, /rba-logo-original\.jpg/);
  assert.match(united, /https:\/\/riotbasketballacademy\.com\/ja\/international\/rizehope-japan-2027\/united/);
});
