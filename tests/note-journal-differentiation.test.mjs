import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const bridge = read("components/note-bridge.tsx");
const bridgeStyles = read("components/note-bridge.module.css");
const guide = read("app/ja/reading-guide/page.tsx");
const guideStyles = read("app/ja/reading-guide/page.module.css");
const publicHome = read("components/my-homecourt.tsx");
const journal = read("components/public-journal.tsx");
const frame = read("components/site-frame.tsx");
const main = read("components/simple-japanese-home.tsx");

test("JOURNAL and note have clearly separate editorial purposes", () => {
  assert.match(bridge,/JOURNALとnote、何が違う？/);
  assert.match(bridge,/公式資料や研究で確認できる内容/);
  assert.match(bridge,/代表の問題提起、現場での経験/);
  assert.match(bridge,/無料記事と有料記事/);
  assert.match(bridge,/MY HOME COURT/);
  assert.match(guide,/違いは、読む目的/);
});

test("free Journal content cannot be mistaken for required note payment", () => {
  assert.match(guide,/公開されているRBA JOURNALの記事は無料/);
  assert.match(guide,/noteの購入や月額加入は条件ではありません/);
  assert.match(bridge,/JOURNALの公開記事は無料/);
  assert.match(bridge,/別のサービス/);
  assert.match(guide,/noteの単品記事・月額メンバーシップ/);
  assert.match(guide,/提供条件/);
});

test("public entry points consistently link to a stable shareable guide", () => {
  assert.match(journal,/<NoteBridge variant="journal"/);
  assert.match(bridge,/href="\/ja\/reading-guide"/);
  assert.match(guide,/https:\/\/riotbasketballacademy\.com\/ja\/reading-guide/);
  assert.match(publicHome,/href="\/ja\/reading-guide"/);
  assert.match(frame,/href="\/ja\/reading-guide"/);
  assert.match(main,/href="\/ja\/reading-guide"/);
  assert.match(guide,/href="\/ja\/journal"/);
  assert.match(guide,/href="\/ja\/my-homecourt"/);
});

test("paid note is an external, opt-in product with no implied account entitlement", () => {
  assert.match(bridge,/https:\/\/note\.com\/rba_official/);
  assert.match(bridge,/target="_blank" rel="noopener noreferrer"/);
  assert.match(guide,/noteの有料記事やメンバーシップは必須ですか/);
  assert.match(guide,/別のサービスです/);
  assert.doesNotMatch(guide,/Stripe\s*Checkout|createCheckoutSession|\/api\/commerce\/checkout/);
  assert.doesNotMatch(bridge,/必ず成果が出る|購入しないと読めない/);
});

test("mobile usability, focus and reduced motion checks exist", () => {
  assert.match(bridgeStyles,/@media\(max-width:680px\)/);
  assert.match(guideStyles,/@media\(max-width:730px\)/);
  assert.match(bridgeStyles,/:focus-visible/);
  assert.match(guideStyles,/:focus-visible/);
  assert.match(bridgeStyles, /prefers-reduced-motion/);
  assert.match(guide, /aria-labelledby="reading-faq"/);
});
