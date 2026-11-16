import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync, existsSync} from "node:fs";

const read = (path) => {
  assert.ok(existsSync(path), `missing source: ${path}`);
  return readFileSync(path,"utf8");
};
const check = (p,rx) => assert.match(read(p),rx);
test("RBA Japanese flagship value statement is consistent",()=>{
  check("components/simple-japanese-home.tsx",/子どもの可能性を、/);
  check("components/simple-japanese-home.tsx",/所属先で決めない。/);
  check("app/ja/page.tsx",/子どもの可能性を、所属先で決めない。/);
  check("components/founder-profile.tsx",/子どもの可能性を、/);
  check("definitive-content/ja/about.html",/子どもの可能性を、/);
});
test("Warm editorial design is properly scoped and mobile responsive",()=>{
  check("components/site-brand.module.css",/--rba-brass:#a38b65/);
  check("components/simple-japanese-home.module.css",/Hiragino Mincho ProN/);
  check("components/simple-japanese-home.module.css",/@media\(max-width:700px\)/);
  check("app/ja/go/go.module.css",/@media\(max-width:620px\)/);
  check("app/ja/essentials/shop/shop.module.css",/@media\(max-width:720px\)/);
  check("public/rba-definitive/assets/editorial-ja-202611.css",/\.definitive-static\.locale-ja/);
  check("public/rba-definitive/assets/editorial-ja-202611.css",/prefers-reduced-motion/);
  check("components/definitive-static-page.tsx",/locale === "ja"/);
  check("components/definitive-static-page.tsx",/editorial-ja-202611\.css/);
});
test("Every recovered Japanese static page keeps content and the common brand voice",()=>{
  const names=["about","camp","contact","d-hub-coaches","d-hub-players","d-hub","faq","index","international","my-homecourt","network","opportunities","organizer","platform","policies","regional-host","sponsor","team","verified"];
  for(const name of names){
    const source=read(`definitive-content/ja/${name}.html`);
    assert.match(source,/<main\b/);
    assert.match(source,/<footer\b/);
    assert.match(source,/子どもの可能性を、所属先で決めない。/, `brand promise on ${name}`);
  }
});
test("Instagram conversion and direct payment remain available and correctly disclosed",()=>{
  const go=read("app/ja/go/page.tsx");
  const shop=read("app/ja/essentials/shop/page.tsx");
  const home=read("components/site-frame.tsx");
  assert.match(go,/https:\/\/buy\.stripe\.com\/9B6fZj423fY09eRboz7EQ1O/);
  assert.match(go,/https:\/\/buy\.stripe\.com\/bJe4gB1TVh241Mp3W77EQ1P/);
  assert.match(shop,/price:4900/);
  assert.match(shop,/price:19800/);
  assert.match(shop,/手書き加工/);
  assert.match(shop,/日本国内送料は無料/);
  assert.match(shop,/JAPAN MARKET ENTRY/);
  assert.match(go,/手書き加工/);
  assert.match(go,/条件調整中/);
  assert.match(home,/公式ウェア/);
  check("app/ja/instagram/page.tsx",/instagram-unified-official-links/);
});
test("Japanese coach learning stays truthful about membership and payment",()=>{
  const coach=read("definitive-content/ja/d-hub-coaches.html");
  assert.match(coach,/月額3,300円/);
  assert.match(coach,/Square/);
  assert.match(coach,/追加決済は不要/);
  const camp=read("app/ja/events/okinawa-international-camp-2026/page.tsx");
  assert.match(camp,/OKINAWA_CAMP_LOGISTICS/);
  assert.match(camp,/キャンセル|返金/);
  const kagoshima=read("app/ja/events/kagoshima-clinic-2026-11-29/page.tsx");
  assert.match(kagoshima,/4,000円/);
  assert.match(kagoshima,/3,000円/);
});
test("Editor guidelines clearly separate facts and promotional narrative",()=>{
  const g=read("docs/RBA_JA_EDITORIAL_LUXURY_BRAND_GUIDE_20261117.md");
  assert.match(g,/事実/);
  assert.match(g,/料金/);
  assert.match(g,/未確定/);
  assert.match(g,/アクセシビリティ/);
});
