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

test("artisan trial storage is RLS restricted and records an immutable audit event",()=>{
 const migration=read("supabase/migrations/20261116215000_rba_essentials_artisan_trials.sql");
 assert.match(migration,/rba_essentials_artisan_trials enable row level security/);
 assert.match(migration,/revoke all on table public\.rba_essentials_artisan_trials from anon,authenticated/);
 assert.match(migration,/revoke all on table public\.rba_essentials_artisan_audit from anon,authenticated/);
 assert.match(migration,/after insert or update on public\.rba_essentials_artisan_trials/);
 assert.match(migration,/internal_review_requires_evidence/);
 assert.match(migration,/wash_cycles >= 10/);
 assert.doesNotMatch(migration,/approved_for_internal_review.*checkout\.sessions/s);
});

test("artist trial forms save only after server-side admin role verification",()=>{
 const action=read("app/ja/essentials/manage/atelier/actions.ts");
 const board=read("components/essentials-artisan-trials-board.tsx");
 assert.match(action,/db\.auth\.getUser\(\)/);
 assert.match(action,/role!=="admin"/);
 assert.match(action,/role!=="admin"\)notFound\(\)/);
 assert.match(action,/stage==="approved_for_internal_review"/);
 assert.match(action,/\.insert\(/);
 assert.match(action,/\.update\(/);
 assert.match(board,/action=\{saveRbaArtisanTrial\}/);
 assert.match(board,/作家報酬/);
 assert.doesNotMatch(board,/action="\/api\/commerce\/essentials-preorder"/);
});

test("commercial launch readiness is private and does not reveal secret values",()=>{
 const page=read("app/ja/essentials/manage/readiness/page.tsx");
 assert.match(page,/role!=="admin"/);
 assert.match(page,/getEssentialsPresaleConfig/);
 assert.match(page,/verifyEssentialsStripeAccount/);
 assert.match(page,/rba_essentials_orders/);
 assert.match(page,/robots:\{index:false,follow:false\}/);
 assert.doesNotMatch(page,/value=\{.*STRIPE_SECRET_KEY/s);
});


test("RBA handles marketing and buyer payment while Risa fulfillment contract gates launch",()=>{
  const release=read("lib/essentials-commerce.ts");
  const screen=read("app/ja/essentials/manage/readiness/page.tsx");
  const roles=read("docs/RBA_ESSENTIALS_RISA_OPERATIONS_HANDOFF_20261116.md");
  assert.match(release,/RBA_ESSENTIALS_RISA_FULFILLMENT_AGREEMENT_APPROVED/);
  assert.match(screen,/RBA_ESSENTIALS_RISA_FULFILLMENT_AGREEMENT_APPROVED/);
  assert.match(roles,/RBAが購入窓口・SNSマーケティング/);
  assert.match(roles,/りささんにデザイン・製造・品質管理・梱包・発送/);
  assert.match(roles,/販売者としての法的主体/);
  assert.match(roles,/個人情報/);
  assert.match(roles,/前払いの注文承諾メール/);
  assert.doesNotMatch(roles,/顧客情報を無制限に共有/);
});
