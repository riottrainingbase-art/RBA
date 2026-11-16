import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read=(path)=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("hand-painted edition remains absent from standard paid checkout",()=>{
  const checkout=read("app/api/commerce/essentials-preorder/route.ts");
  const browserForm=read("components/essentials-preorder-form.tsx");
  const settings=read("lib/essentials-commerce.ts");
  assert.doesNotMatch(checkout,/handwritten|artist_option|painted_option|message_text/i);
  assert.doesNotMatch(browserForm,/handwritten|artist_option|painted_option|message_text/i);
  assert.doesNotMatch(settings,/RBA_ESSENTIALS_HANDWRITTEN_OPTION_APPROVED|HANDWRITTEN_MESSAGE_PRICE/i);
  assert.match(settings,/RBA_ESSENTIALS_PREORDER_ENABLED/);
  assert.match(settings,/RBA_ESSENTIALS_SAMPLES_APPROVED/);
});

test("artist price laboratory is strictly private and cannot charge customers",()=>{
  const page=read("app/ja/essentials/manage/atelier/page.tsx");
  const lab=read("components/essentials-atelier-lab.tsx");
  assert.match(page,/db\.auth\.getUser\(\)/);
  assert.match(page,/role!=="admin"/);
  assert.match(page,/notFound\(\)/);
  assert.match(page,/robots:\{index:false,follow:false\}/);
  assert.doesNotMatch(lab,/checkout\.sessions|stripe\.com|action="\/api\/commerce\/essentials-preorder"/);
  assert.match(lab,/税込/);
  assert.match(lab,/作家報酬/);
  assert.match(lab,/未承認/);
});

test("artist release specification requires written rights and physical validation",()=>{
  const spec=read("docs/RBA_ESSENTIALS_HANDPAINTED_EDITION_SPEC_20261116.md");
  const ops=read("docs/RBA_ESSENTIALS_HANDPAINTED_OPERATIONS_JA_20261116.md");
  assert.match(spec,/NOT ON SALE/);
  assert.match(spec,/not.*yet.*agreed/i);
  assert.match(spec,/after 1\/5\/10\/20 wash cycles/);
  assert.match(ops,/手書き版は非公開で商品開発/);
  assert.match(ops,/作家と責任の分界点|作家.*契約/);
  assert.match(ops,/特定商取引法|通信販売/);
});

test("RBA donation language accurately uses contribution not sales revenue",()=>{
  const spec=read("docs/RBA_ESSENTIALS_HANDPAINTED_EDITION_SPEC_20261116.md");
  assert.match(spec,/製造費・作家報酬・運営経費/);
  assert.match(spec,/利益/);
});
