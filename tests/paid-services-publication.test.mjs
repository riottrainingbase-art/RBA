import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const page=fs.readFileSync(new URL("../app/ja/services/advanced/page.tsx",import.meta.url),"utf8");
const parent=fs.readFileSync(new URL("../app/ja/services/page.tsx",import.meta.url),"utf8");
const sitemap=fs.readFileSync(new URL("../app/sitemap.ts",import.meta.url),"utf8");

test("paid services keep current prices separate from draft-only offers",()=>{
  for(const p of ["3,300円","11,000円","33,000円","55,000円","88,000円"]){
    assert.ok(page.includes(p),`missing registered price ${p}`);
  }
  assert.ok(page.includes("企画・個別見積段階"));
  assert.ok(page.includes("フォーム提出だけで契約や課金"));
  assert.ok(page.includes("新プランの自動課金・決済リンクは公開していません。"));
});

test("consultation route never contains direct checkout or insecure adult/minor data collection",()=>{
  assert.ok(page.includes("https://form.jotform.com/263261461105044"));
  for(const forbidden of ["buy.stripe.com","checkout.stripe.com","api/checkout","<form","<input","uploadFile","未成年者の病歴を送信"]){
    assert.equal(page.includes(forbidden),false,`unexpected checkout/data-collection string: ${forbidden}`);
  }
  assert.ok(page.includes("未成年者の病歴"));
  assert.ok(page.includes("保護者同意"));
});

test("new paid-service page is linked to public services and sitemap",()=>{
  assert.ok(parent.includes('href="/ja/services/advanced"'));
  assert.ok(sitemap.includes('"/ja/services/advanced"'));
});

test("explicitly exclude other benefits and recurring subscription obligations",()=>{
  assert.ok(page.includes("自動的に含まれません"));
  assert.ok(page.includes("既存の決済と利用権限"));
  assert.ok(page.includes("キャンセル"));
  assert.ok(page.includes("個別見積"));
});
