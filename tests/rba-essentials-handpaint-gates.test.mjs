import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read=(path)=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("hand-painted addition cannot be charged without separate producer and quality approvals",()=>{
  const checkout=read("app/api/commerce/essentials-preorder/route.ts");
  const browserForm=read("components/essentials-preorder-form.tsx");
  const settings=read("lib/essentials-commerce.ts");
  const webhook=read("app/api/commerce/essentials-preorder-webhook/route.ts");
  assert.match(checkout,/config\.handwrittenAvailable/);
  assert.match(checkout,/手書き加工の受付はまだ開始していません/);
  assert.match(browserForm,/handwrittenAvailable/);
  assert.match(browserForm,/handwrittenCharge/);
  assert.match(settings,/RBA_ESSENTIALS_HANDWRITTEN_PRICE_APPROVED/);
  assert.match(settings,/RBA_ESSENTIALS_HANDWRITTEN_ARTIST_RIGHTS_APPROVED/);
  assert.match(settings,/RBA_ESSENTIALS_HANDWRITTEN_WASH_TEST_APPROVED/);
  assert.match(settings,/RBA_ESSENTIALS_PREORDER_ENABLED/);
  assert.match(settings,/RBA_ESSENTIALS_SAMPLES_APPROVED/);
  assert.match(webhook,/handwritten_addon_jpy/);
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
  assert.match(roles,/前払い?の?注文承諾メール/);
  assert.doesNotMatch(roles,/顧客情報を無制限に共有/);
});


test("only authorized production users can view and advance paid orders",()=>{
  const page=read("app/ja/essentials/production/page.tsx");
  const action=read("app/ja/essentials/production/actions.ts");
  assert.match(page,/\.auth\.getUser\(\)/);
  assert.match(page,/rba_essentials_fulfillment_agents/);
  assert.match(page,/role==="admin"/);
  assert.match(page,/payment_status","paid"/);
  assert.doesNotMatch(page,/shipping\.address|shipping_details|customer_details/);
  assert.match(action,/\.auth\.getUser\(\)/);
  assert.match(action,/rba_essentials_fulfillment_agents/);
  assert.match(action,/payment_status!=="paid"/);
  assert.match(action,/transitions\[old\]/);
  assert.match(action,/tracking_reference/);
});

test("production ticket is created only from a recorded order and is private",()=>{
 const migration=read("supabase/migrations/20261116221000_rba_essentials_fulfillment_handoff.sql");
 const release=read("lib/essentials-commerce.ts");
 assert.match(migration,/after insert on public\.rba_essentials_orders/);
 assert.match(migration,/insert into public\.rba_essentials_fulfillment_tasks/);
 assert.match(migration,/rba_essentials_fulfillment_audit_trg/);
 assert.match(migration,/revoke all on public\.rba_essentials_fulfillment_agents from anon, authenticated/);
 assert.match(migration,/revoke all on public\.rba_essentials_fulfillment_tasks from anon, authenticated/);
 assert.match(release,/RBA_ESSENTIALS_RISA_FULFILLMENT_ACCESS_VERIFIED/);
 assert.match(release,/RBA_ESSENTIALS_RISA_ORDER_HANDOFF_VERIFIED/);
});


test("first-drop free domestic shipping and approved retail prices are locked separately from future sales",()=>{
 const config=read("lib/essentials-commerce.ts");
 const checkout=read("components/essentials-preorder-form.tsx");
 const stripe=read("app/api/commerce/essentials-preorder/route.ts");
 const catalog=read("lib/rba-essentials.ts");
 const product=read("app/ja/essentials/page.tsx");
 assert.match(config,/FIRST_DROP_TEE_JPY = 6600/);
 assert.match(config,/FIRST_DROP_SETUP_JPY = 19800/);
 assert.match(config,/FIRST_DROP_JAPAN_SHIPPING_JPY = 0/);
 assert.match(config,/oneMonthFromJstDate/);
 assert.match(stripe,/config\.shippingJPY/);
 assert.match(stripe,/FIRST DROP \/ 日本国内送料無料/);
 assert.match(checkout,/先行販売・国内限定/);
 assert.match(checkout,/送料は追加料金なし/);
 assert.match(catalog,/rba-essentials-white-tee-official-design-reference/);
 assert.match(catalog,/rba-essentials-black-hoodie-setup-official-design-reference/);
 assert.doesNotMatch(catalog,/ESSENTIALS_MODEL_IMAGE/);
 assert.match(product,/essentials\.map\(\(item, index\) => \(/);
 assert.match(product,/href=\{item\.pagePath\}/);
 assert.match(product,/src=\{item\.image\}/);
});


test("one-month deadline means actual delivery, not merely dispatch",()=>{
 const cfg=read("lib/essentials-commerce.ts");
 const route=read("app/api/commerce/essentials-preorder/route.ts");
 const webhook=read("app/api/commerce/essentials-preorder-webhook/route.ts");
 const form=read("components/essentials-preorder-form.tsx");
 const legal=read("app/ja/essentials/legal/page.tsx");
 const db=read("supabase/migrations/20261116231500_rba_essentials_delivery_by_date.sql");
 assert.match(cfg,/RBA_ESSENTIALS_DELIVER_BY/);
 assert.match(cfg,/deliveryDeadline <= \(oneMonthFromJstDate\(todayJST\)/);
 assert.match(route,/deliver_by:config\.deliveryDeadline/);
 assert.match(webhook,/deliveredBy > latestArrival/);
 assert.match(form,/お届け期限/);
 assert.match(legal,/お届け期限/);
 assert.match(db,/add column if not exists deliver_by date/);
});

test("handwritten customization paid metadata is not displayed publicly and cannot be enabled by free-shipping approval",()=>{
 const cfg=read("lib/essentials-commerce.ts");
 const webhook=read("app/api/commerce/essentials-preorder-webhook/route.ts");
 const production=read("app/ja/essentials/production/page.tsx");
 const db=read("supabase/migrations/20261116230000_rba_essentials_handwritten_option.sql");
 assert.match(cfg,/RBA_ESSENTIALS_HANDWRITTEN_ARTIST_RIGHTS_APPROVED/);
 assert.match(cfg,/RBA_ESSENTIALS_HANDWRITTEN_PRICE_APPROVED/);
 assert.match(cfg,/RBA_ESSENTIALS_HANDWRITTEN_RETURN_TERMS/);
 assert.match(webhook,/session\.amount_total!==expectedAmount/);
 assert.match(production,/o\.handwritten_message/);
 assert.match(db,/rba_essentials_handwritten_order_integrity/);
 assert.match(db,/handwritten_message/);
});


test("Stripe-hosted payment links reconcile only paid and signed first-drop sessions",()=>{
 const hook=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
 const migration=read("supabase/migrations/20261116234500_rba_essentials_fallback_checkout_reconciliation.sql");
 assert.match(hook,/webhooks\.constructEvent/);
 assert.match(hook,/verifyEssentialsStripeAccount/);
 assert.match(hook,/rba_essentials_first_drop/);
 assert.match(hook,/plink_1UcRBCRXDnnSs6XNEW4xN93M/);
 assert.match(hook,/plink_1UcRBHRXDnnSs6XNoHlBdpSQ/);
 assert.match(hook,/stripe\.checkout\.sessions\.listLineItems/);
 assert.match(hook,/session\.amount_total!==amount\*qty/);
 assert.match(hook,/checkout_source:"stripe_payment_link"/);
 assert.match(hook,/buyer_notice_status:"pending"/);
 assert.match(hook,/ignoreDuplicates:true/);
 assert.match(migration,/buyer_notice_status/);
 assert.doesNotMatch(hook,/raw_customer_address|customer_email.*\.insert/i);
});
test("Risa shipping address is available only to identity-checked paid-order staff",()=>{
 const page=read("app/ja/essentials/production/[orderId]/shipping/page.tsx");
 const maker=read("app/ja/essentials/production/page.tsx");
 assert.match(page,/\.auth\.getUser\(\)/);
 assert.match(page,/rba_essentials_fulfillment_agents/);
 assert.match(page,/terms_reference/);
 assert.match(page,/role==="admin"/);
 assert.match(page,/payment_status!=="paid"/);
 assert.match(page,/verifyEssentialsStripeAccount/);
 assert.match(page,/address\.country!=="JP"/);
 assert.match(page,/session\.customer_details\?\.phone/);
 assert.match(maker,/\/ja\/essentials\/production\/\$\{o\.order_id\}\/shipping/);
 assert.doesNotMatch(page,/fetch\(\s*["']https:\/\//);
});


test("RBA STORE is the clearly identified public shop with both apparel initiatives and original logo",()=>{
 const hub=read("app/ja/store/page.tsx");
 const hubStyles=read("app/ja/store/store.module.css");
 const catalogPage=read("app/ja/essentials/page.tsx");
 const story=read("app/ja/essentials/story/page.tsx");
 const productPage=read("app/ja/essentials/[slug]/page.tsx");
 const siteFrame=read("components/site-frame.tsx");
 const catalog=read("lib/rba-essentials.ts");
 assert.match(hub,/id="rba-store-heading"/);
 assert.match(hub,/id="collection-001"/);
 assert.match(hub,/id="performance-tee"/);
 assert.match(hub,/RBA STORE/);
 assert.match(hub,/rba-logo-original\.jpg/);
 assert.match(hub,/getEssentialsPresaleConfig/);
 assert.match(hub,/canSellPerformanceTee/);
 assert.match(hubStyles,/\.storeProducts/);
 assert.match(hubStyles,/\.storeIntro/);
 assert.match(catalogPage,/RBA STORE/);
 assert.match(catalogPage,/canonical: "\/ja\/essentials"/);
 assert.match(productPage,/RBA STORE/);
 assert.match(story,/LONG WEAR/);
 assert.match(story,/HUMAN MARK/);
 assert.match(story,/THE ARCHIVE/);
 assert.match(siteFrame,/RBA STORE｜公式ウェア/);
 assert.match(catalog,/name: "WHITE TEE"/);
 assert.match(catalog,/name: "BLACK SETUP"/);
 assert.match(catalogPage,/commerce\.ready/);
 assert.match(productPage,/commerce\.ready/);
});

test("front-end brand name changes preserve first-drop Stripe IDs and fail-closed live checkout",()=>{
 const config=read("lib/essentials-commerce.ts");
 const hook=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
 const store=read("app/ja/store/page.tsx");
 const legal=read("app/ja/essentials/legal/page.tsx");
 assert.match(config,/RBA_ESSENTIALS_PREORDER_ENABLED/);
 assert.match(config,/RBA_ESSENTIALS_SAMPLES_APPROVED/);
 assert.match(hook,/plink_1UcRBCRXDnnSs6XNEW4xN93M/);
 assert.match(hook,/plink_1UcRBHRXDnnSs6XNoHlBdpSQ/);
 assert.match(hook,/session\.payment_status!=="paid"/);
 assert.match(store,/getEssentialsPresaleConfig/);
 assert.match(store,/apparel\.ready/);
 assert.match(legal,/c\.ready/);
 assert.doesNotMatch(store,/buy\.stripe\.com\/|checkout\.stripe\.com\//);
});


test("public product concepts can use approved imagery without falsely claiming photographs",()=>{
 const config=read("lib/essentials-commerce.ts");
 const admin=read("app/ja/essentials/manage/readiness/page.tsx");
 const catalog=read("app/ja/essentials/page.tsx");
 const detail=read("app/ja/essentials/[slug]/page.tsx");
 const guide=read("app/ja/essentials/guide/page.tsx");
 const legal=read("app/ja/essentials/legal/page.tsx");
 assert.doesNotMatch(config,/essentialsHaveProductionPhotos/);
 assert.match(config,/essentialsHaveFinalSpecifications/);
 assert.match(config,/RBA_ESSENTIALS_PHOTOS_APPROVED/);
 assert.match(config,/RBA_ESSENTIALS_PUBLIC_LISTING_APPROVED/);
 assert.match(admin,/掲載画像（CGを含む）の権利・表示内容の承認/);
 assert.match(catalog,/商品画像はイメージです/);
 assert.match(detail,/商品画像はイメージです/);
 assert.match(guide,/商品画像はイメージです/);
 assert.match(legal,/商品画像はイメージです/);
 assert.doesNotMatch(detail,/承認済みの実物写真/);
 assert.doesNotMatch(guide,/掲載写真は確認済みの実物商品/);
});


test("RBA checkout independently verifies the real Stripe merchant, webhooks and maker access",()=>{
 const check=read("app/api/commerce/essentials-preorder/route.ts");
 const stripe=read("lib/essentials-stripe.ts");
 const maker=read("lib/essentials-fulfillment-readiness.ts");
 const admin=read("app/ja/essentials/manage/readiness/page.tsx");
 const paidHook=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
 assert.match(check,/verifyEssentialsStripePublicBranding\(secret\)/);
 assert.match(check,/verifyEssentialsStripeWebhookDestinations\(secret\)/);
 assert.match(check,/essentialsFulfillmentCanAcceptOrders\(\)/);
 assert.match(stripe,/riotbasketballacademy\.com/);
 assert.match(stripe,/statement_descriptor/);
 assert.match(stripe,/checkout\.session\.completed/);
 assert.match(stripe,/checkout\.session\.async_payment_succeeded/);
 assert.match(maker,/server-only/);
 assert.match(maker,/rba_essentials_fulfillment_agents/);
 assert.match(maker,/\.eq\("active",true\)/);
 assert.match(maker,/\.eq\("access_role","production"\)/);
 assert.match(admin,/makerAccessReady/);
 assert.match(admin,/rbaPublicBrand/);
 assert.match(admin,/rbaWebhookDestinations/);
 assert.doesNotMatch(paidHook,/verifyEssentialsStripePublicBranding|verifyEssentialsStripeWebhookDestinations|essentialsFulfillmentCanAcceptOrders/);
});


test("acceptance notices are fail-closed and never expose buyer email in the database",()=>{
 const mail=read("lib/essentials-buyer-notices.ts");
 const mailConfig=read("lib/essentials-notice-config.ts");
 const cfg=read("lib/essentials-commerce.ts");
 const stripeSite=read("app/api/commerce/essentials-preorder-webhook/route.ts");
 const stripeLink=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
 assert.match(mail,/import "server-only"/);
 assert.match(mail,/stripe\.checkout\.sessions\.retrieve/);
 assert.match(mail,/session\.payment_status!=="paid"/);
 assert.match(mail,/\.eq\("buyer_notice_status","pending"\)/);
 assert.match(mail,/buyer_notice_status:"sent"/);
 assert.match(mail,/Idempotency-Key/);
 assert.match(mail,/rba-store-acceptance-/);
 assert.match(mail,/buyer_notice_sent_at/);
 assert.doesNotMatch(mail,/customer_email.*\.insert|customer_details.*\.upsert/);
 assert.match(mailConfig,/RBA_ESSENTIALS_NOTICE_SENDER_VERIFIED/);
 assert.match(mailConfig,/RBA_ESSENTIALS_NOTICE_ENABLED/);
 assert.match(mailConfig,/RBA_ESSENTIALS_RESEND_API_KEY/);
 assert.match(cfg,/getEssentialsNoticeConfig\(\)\.configured/);
 assert.match(stripeSite,/sendEssentialsBuyerAcceptance\(order\)/);
 assert.match(stripeLink,/sendEssentialsBuyerAcceptance\(recorded\.data\.order_id\)/);
 assert.match(stripeLink,/\.eq\("stripe_checkout_session_id",session\.id\)/);
});

test("only RBA admin may manually send pending buyer notices, failures are not automatically retried",()=>{
 const action=read("app/ja/essentials/manage/notice-actions.ts");
 const orders=read("app/ja/essentials/manage/page.tsx");
 const sender=read("lib/essentials-buyer-notices.ts");
 assert.match(action,/\.auth\.getUser\(\)/);
 assert.match(action,/profile.*role/);
 assert.match(action,/role!=="admin"/);
 assert.match(action,/sendEssentialsBuyerAcceptance/);
 assert.match(orders,/buyer_notice_status/);
 assert.match(orders,/emailReady&&o\.payment_status==="paid"&&o\.buyer_notice_status==="pending"/);
 assert.match(sender,/if\(row\.buyer_notice_status!=="pending"\)/);
 assert.match(sender,/delivery_uncertain_review_required/);
 assert.doesNotMatch(action,/role==="production"/);
});


test("shipments queue exactly one private notice only after a shipped stage",()=>{
 const migration=read("supabase/migrations/20261117042410_rba_essentials_shipment_notices_20261117.sql");
 const sender=read("lib/essentials-shipment-notices.ts");
 const action=read("app/ja/essentials/production/actions.ts");
 const admin=read("app/ja/essentials/manage/page.tsx");
 const noticeActions=read("app/ja/essentials/manage/notice-actions.ts");
 assert.match(migration,/shipment_notice_status text NOT NULL DEFAULT 'not_ready'/);
 assert.match(migration,/NEW\.stage='shipped'/);
 assert.match(migration,/shipment_notice_status='not_ready'/);
 assert.match(migration,/SECURITY INVOKER/);
 assert.match(sender,/import "server-only"/);
 assert.match(sender,/rba_essentials_fulfillment_tasks/);
 assert.match(sender,/session\.payment_status!=="paid"/);
 assert.match(sender,/\.eq\("shipment_notice_status","pending"\)/);
 assert.match(sender,/shipment_notice_status:"sent"/);
 assert.match(sender,/Idempotency-Key/);
 assert.doesNotMatch(sender,/customer_email.*\.insert|customer_details.*\.upsert/);
 assert.match(action,/stage==="shipped"\)await sendEssentialsShipmentNotice\(orderId\)/);
 assert.match(action,/\.eq\("access_role","production"\)/);
 assert.match(admin,/shipment_notice_status/);
 assert.match(admin,/sendPendingEssentialsShipmentNotice/);
 assert.match(noticeActions,/role!=="admin"/);
 assert.match(noticeActions,/sendEssentialsShipmentNotice/);
});

test("buyer acceptance does not treat draft Payment Link terms as an approved order contract",()=>{
 const sender=read("lib/essentials-buyer-notices.ts");
 assert.match(sender,/unapproved_terms_manual_review/);
 assert.match(sender,/row\.handwritten_addon_jpy/);
 assert.match(sender,/RBA WHITE TEE/);
 assert.match(sender,/RBA BLACK SETUP/);
});


test("FIRST DROP size options match the garment reference specifications across UI, checkout and webhook", () => {
  const sizes = read("lib/essentials-size-options.ts");
  const ui = read("components/essentials-preorder-form.tsx");
  const checkout = read("app/api/commerce/essentials-preorder/route.ts");
  const webhook = read("app/api/commerce/essentials-preorder-webhook/route.ts");
  assert.match(sizes, /ESSENTIALS_TEE_SIZES = \["S", "M", "L", "XL"\]/);
  assert.match(sizes, /ESSENTIALS_HOODIE_SIZES = \["S", "M", "L", "XL", "XXL"\]/);
  assert.match(sizes, /ESSENTIALS_PANTS_SIZES = \["M", "L", "XL"\]/);
  assert.doesNotMatch(sizes, /ESSENTIALS_PANTS_SIZES = \["S"/);
  assert.match(ui, /ESSENTIALS_TEE_SIZES\.map/);
  assert.match(ui, /ESSENTIALS_HOODIE_SIZES\.map/);
  assert.match(ui, /ESSENTIALS_PANTS_SIZES\.map/);
  assert.match(checkout, /asSize\(form,"tee_size","tee"\)/);
  assert.match(checkout, /asSize\(form,"hoodie_size","hoodie"\)/);
  assert.match(checkout, /asSize\(form,"pants_size","pants"\)/);
  assert.match(webhook, /essentialsSizeIsAllowed\("tee"/);
  assert.match(webhook, /essentialsSizeIsAllowed\("hoodie"/);
  assert.match(webhook, /essentialsSizeIsAllowed\("pants"/);
  assert.match(checkout, /config\.ready/);
});
