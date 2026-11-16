# RBA ESSENTIALS — launch / Instagram commerce checklist

## Current scope (2026-11-16)

- **Collection**: white RBA ESSENTIAL TEE; black RBA ESSENTIAL SETUP (pullover hoodie + wide sweatpants).
- **Visual direction**: luxury-editorial minimalism, generous whitespace, paper/charcoal palette, oversized serif headings, no invented badges, discounts or scarcity.
- **Current state**: DESIGN CONCEPT ONLY. Generated visuals are not photographs of manufactured merchandise. No confirmed factory order, retail price, size chart, delivery estimate or returns policy. Do not collect payments or advertise in stock.
- **Stable product URLs**: `/ja/essentials/tee` and `/ja/essentials/setup`. These are reserved for eventual Meta catalog landing destinations. Collection: `/ja/essentials`.
- **Photo hosting**: current mockups are on the existing connected Shopify CDN. Transfer approved final photography to durable RBA-controlled asset storage before depending on it for a permanent live store.

## Manufacturing + brand approval (launch blockers)

- [ ] Confirm RBA logo master and rights for use on goods. Match complete official RBA mark exactly; do not substitute AI-generated approximations in production art.
- [ ] Confirm patch construction and dimensions. Compare 4 cm and 5 cm, with **4 cm currently a preference, not a final specification**.
- [ ] Receive and inspect physical T-shirt and full black hoodie/pants samples (collar print/label, hems, pocket, seams, material, colorfastness, wash/dry behavior).
- [ ] Verify supplier quotes, minimum orders, rework terms, delivery lead times, payment terms and fulfillment workflow.
- [ ] Confirm fiber content, care labels and any mandatory Japanese clothing quality labeling; produce accurate size charts from physical garments.
- [ ] Take original product photos (front/back/label/fit/texture) and replace generated **concept** imagery.
- [ ] Finalize sellable variants and SKU inventory rules: T-shirt size; setup size (and whether hoodie/pants may need different sizes).
- [ ] Decide preorder vs made-to-order with firm consumer-facing delivery estimates and fulfillment capacity.

## Commerce readiness (before any BUY button)

- [ ] Confirm tax treatment, tax-inclusive JPY prices, payment processing fees, shipping/packing cost and contribution margin.
- [ ] Publish current legal merchant identity and legally required Japan `特定商取引法に基づく表記` / communication-commerce disclosures; verify privacy policy and contact address.
- [ ] Publish clear delivery, cancellation, return/refund, incorrect-size, defects, overseas customs/fees and order-change terms. Do not claim all made-to-order returns are automatically nonrefundable.
- [ ] Use the RBA-approved Stripe live account **only after** owner approval of the commercial terms. Never reuse unrelated event/clinic Payment Links.
- [ ] Build a real item/size/quantity checkout with accurate total incl. shipping, success & cancel states, signed webhook/order reconciliation, email confirmation, inventory/production order and refund flow.
- [ ] Test successful purchase, declined payment, duplicate click, wrong/empty address, refund, webhook retry and order-email delivery in a sandbox. Validate mobile Safari and Chrome.
- [ ] Record approval evidence and enable purchase UI via a separate reviewed change. Do not silently convert the current free interest survey into an order form.

## Instagram / Meta commerce

- [ ] Ensure @riot.basketball.academy is a professional account with required Facebook page, verified domain/ownership and relevant Commerce Manager permissions.
- [ ] Verify up-to-date Meta eligibility and commerce policies for Japan. Approval and product tagging are not guaranteed.
- [ ] Create catalog entries using **confirmed** price, stock/preorder policy, variants, images and the individual stable product URLs (not this concept page with no price).
- [ ] Connect the shop/catalog to the Instagram account. Submit for review and check status before claiming shopping tags work.
- [ ] Once approved, tag products in relevant posts/reels and put the collection or product links in Stories and bio. Checkout may open an external website.
- [ ] Add campaign tracking (e.g., UTM) to Instagram launch links and measure product views, checkout starts, completed purchases and return rate. Preserve privacy settings.
- [ ] Keep a Stories link fallback to the official RBA site if product tagging is unavailable.

## Review before merging collection page

- [ ] CI, typecheck, mobile 390px + desktop 1440px, screenshot, keyboard focus and external image loading.
- [ ] Confirm existing /ja/store Performance Tee and /authentics are unchanged and that new collection is labeled pre-launch.
- [ ] Confirm content/brand photo permissions and no false manufacturing or shipping claims.
- [ ] Merge design separately from eventual payment launch; verify linked deployment for live release only after review.

## Implemented in PR #458 (not live until reviewed deployment)

- Editorial listing `/ja/essentials`, product URLs `/ja/essentials/tee` and `/ja/essentials/setup`.
- Customer preorder form `/ja/essentials/checkout`: T-shirt size; hoodie and pants sizes independently; 1–3 units/order; tax-inclusive total + Japan shipping + explicit buyer consent; Stripe Checkout created server-side.
- Stripe webhook `/api/commerce/essentials-preorder-webhook` validates Stripe signature, live RBA account and paid status before persisting a paid order.
- Supabase order ledger `public.rba_essentials_orders`: migration **applied in RBA HOMECOURT on 2026-11-16**, RLS enabled, no anonymous/authenticated table read privileges, service-role access only, 0 rows at setup. Do not rerun unrelated migrations.
- Owner-only order list `/ja/essentials/manage`; paid-session verification `/ja/essentials/complete`.
- `/ja/essentials/legal` commerce disclosure view and `/api/commerce/essentials-meta-catalog` CSV feed gated on approval.

### Production environment configuration (never check secret values into Git)

Required server variables **must be verified and approved**; do not add guessed prices, dates, address details or legal terms:

```text
STRIPE_SECRET_KEY=<RBA account production key, server only>
RBA_ESSENTIALS_STRIPE_WEBHOOK_SECRET=<signed webhook endpoint secret, server only>
NEXT_PUBLIC_SUPABASE_URL=<existing RBA HOMECOURT URL>
SUPABASE_SERVICE_ROLE_KEY=<existing private service key, server only>

RBA_ESSENTIALS_TEE_PRICE_JPY=<approved tax-inclusive yen>
RBA_ESSENTIALS_SETUP_PRICE_JPY=<approved tax-inclusive yen>
RBA_ESSENTIALS_JAPAN_SHIPPING_JPY=<approved yen amount, zero permitted>
RBA_ESSENTIALS_TAX_BEHAVIOR=inclusive
RBA_ESSENTIALS_ORDER_BY=<YYYY-MM-DD>
RBA_ESSENTIALS_DISPATCH_BY=<YYYY-MM-DD>
RBA_ESSENTIALS_TERMS_VERSION=<approved immutable revision>
RBA_ESSENTIALS_SELLER_NAME=<legal seller>
RBA_ESSENTIALS_SELLER_ADDRESS=<publicly disclosed legal address>
RBA_ESSENTIALS_SELLER_PHONE=<publicly disclosed seller phone>
RBA_ESSENTIALS_SELLER_EMAIL=<publicly disclosed seller email>
RBA_ESSENTIALS_CANCELLATION_TERMS=<approved cancellation conditions>
RBA_ESSENTIALS_RETURN_TERMS=<approved return/refund conditions>
RBA_ESSENTIALS_PRESALE_NOTE=<verified products and advance-payment fulfillment note>
```

Each of the following launch controls must be explicitly set to `true` **after evidence is checked**; any missing/false control means the checkout returns HTTP 423 and all buy buttons remain disabled:

```text
RBA_ESSENTIALS_PREORDER_ENABLED
RBA_ESSENTIALS_MANUFACTURING_CONFIRMED
RBA_ESSENTIALS_SAMPLES_APPROVED
RBA_ESSENTIALS_PHOTOS_APPROVED
RBA_ESSENTIALS_SIZE_CHART_APPROVED
RBA_ESSENTIALS_LOGO_RIGHTS_APPROVED
RBA_ESSENTIALS_PRICING_APPROVED
RBA_ESSENTIALS_TAX_APPROVED
RBA_ESSENTIALS_SHIPPING_APPROVED
RBA_ESSENTIALS_RETURNS_APPROVED
RBA_ESSENTIALS_SELLER_DISCLOSURE_APPROVED
RBA_ESSENTIALS_STRIPE_ACCOUNT_APPROVED
RBA_ESSENTIALS_ORDER_OPERATIONS_READY
RBA_ESSENTIALS_LEDGER_MIGRATED
RBA_ESSENTIALS_WEBHOOK_READY
RBA_ESSENTIALS_CONFIRMATION_NOTICE_READY
```

For the Meta feed, additionally set `RBA_ESSENTIALS_META_FEED_APPROVED=true` **only after Meta catalog eligibility and real product photos are confirmed**. In Commerce Manager choose scheduled data feed `https://riotbasketballacademy.com/api/commerce/essentials-meta-catalog` and verify every variant's `preorder` availability and landing-page price is accepted. A feed endpoint does not grant product tagging approval or manage the user's Instagram account automatically.

### Critical transactional checks

- Confirm consumer law disclosures including total cost, deadline for delivery, cancellation, returns, and merchant identification. Japanese Consumer Affairs Agency: https://www.no-trouble.caa.go.jp/what/mailorder/index.html
- Ensure **advance-payment acceptance notice** (including buyer identity, charged amount/date, goods and quantity, and concrete delivery deadline) is sent and recorded. Stripe card receipts alone may not meet this requirement. Set `RBA_ESSENTIALS_CONFIRMATION_NOTICE_READY=true` only after a verified automated email or staffed manual protocol has been implemented and tested.
- Ensure the Stripe webhook secret is from **this exact** `/api/commerce/essentials-preorder-webhook` endpoint; it must listen for `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
- Verify Stripe account matches `acct_1UGdxZRXDnnSs6XN`. Preorder route intentionally rejects test or unrelated account keys; perform a separate staging simulation and an owner-approved minimal real checkout before activating public sales.
- Test success, cancelled payment, failed card, duplicate click, buyer email, Japan-only shipping address, Stripe signed webhook idempotency, ledger availability, refunds, reorder/size changes, inventory cap, fulfillment and cancellation communications.
- Do not imply the purchase is a charitable donation or tax-deductible. Accounting should assign genuine net profit after manufacturing, shipping, fees and tax to documented RBA youth development activities.

## Artisan edition internal studio — implemented 2026-11-16

- New **RBA administrator-only** `/ja/essentials/manage/atelier` Studio Log plus price simulation. Access requires authenticated user with `profiles.role=admin`; unsigned and ordinary members receive 404.
- Studio Log supports sample entry and updates for white tee and black hoodie only. Stage choices: design, quote requested, sampling, received, revisions, internal review, paused.
- Each entry keeps distinct flags for creator rights, negotiated pay, textile paint/ink trial, physical sample quality, care/label compliance, and shipping capacity. Cost and proposed price fields are **non-commercial research only**.
- To advance to `approved_for_internal_review`, DB CHECK enforces >=1 sample, >=10 wash cycles, all six confirmations, known creator quote and measured time. **This internal status NEVER enables buying or Meta catalog activation.**
- Applied `supabase/migrations/20261116215000_rba_essentials_artisan_trials.sql` to RBA HOMECOURT project on 2026-11-16. Tables `public.rba_essentials_artisan_trials` and `public.rba_essentials_artisan_audit` have RLS enabled, no `anon` or `authenticated` table SELECT privileges. Private `service_role` access only; updates automatically append snapshots to the audit table through an invoker-security trigger.
- Verified an insert generated exactly 1 audit event **inside a rolled-back SQL transaction**. After rollback, both tables and the paid-order table held 0 records. No live payment was performed.
- Added `/ja/essentials/manage/readiness`: operator-only checks for manufacturer, sample, price, size chart, legal seller disclosure, returns, Stripe link, signed webhook, prepaid confirmation notification and one-month manufacturing capacity. It intentionally displays only yes/no status of environment flags and connected services, not secret values.
- Tests `tests/rba-essentials-handpaint-gates.test.mjs` are included in GitHub Actions to catch public exposure, missing auth and any inadvertent handwritten option being added to the *normal* sales checkout.

### Release review notes
- Last confirmed passing Github RBA Preflight QA for an earlier revision: commit `2291875eb0e8b9c3a74ffbb11318e8decb32a954`; later modified sources must run clean on the final head as well.
- Vercel build statuses for unrelated shared-repo projects may show **build-rate-limit**, which does not establish the new pages are deployed or verified; never claim production launch on that basis.
- RBA ESSENTIALS and future artist edition remain **unpublished draft PR #458** until approved. No successful payment or Meta Commerce registration. A single planned live launch cannot omit checks simply because the DB is prepared.

## 2026-11-16: RBA sales / Risa production handoff

The confirmed operating intent is **RBA marketing + order intake + seller settlement** and **Risa's manufacturing + quality control + packaging + fulfillment**. This is a delegation design, not proof of a completed vendor contract or permission to share buyer data.

- Management specification: `docs/RBA_ESSENTIALS_RISA_OPERATIONS_HANDOFF_20261116.md`.
- Production access: `/ja/essentials/production` (signed-in RBA admin or individually authorized, active production agent). No production agents are registered yet; do not assume Risa's email/identity or grant access by Instagram name.
- Three added launch gates: `RBA_ESSENTIALS_RISA_FULFILLMENT_AGREEMENT_APPROVED`, `RBA_ESSENTIALS_RISA_FULFILLMENT_ACCESS_VERIFIED`, and `RBA_ESSENTIALS_RISA_ORDER_HANDOFF_VERIFIED`. All start false and must be explicitly authorized based on actual written terms and verified account/test results.
- Applied database migration: `supabase/migrations/20261116221000_rba_essentials_fulfillment_handoff.sql`. Creates private `rba_essentials_fulfillment_agents`, `rba_essentials_fulfillment_tasks` and `rba_essentials_fulfillment_log` with RLS, public grants revoked and service-role backend access only. Paid order ledger INSERT automatically creates a production ticket; task changes produce audit logs. No public shipping address or phone in production task table.
- Verified in a rollback transaction: 1 synthetic paid order created 1 fulfillment task + 1 audit event; after rollback: **0 paid orders, 0 tasks, 0 audit events and 0 authorized agents**.
- Production route lets a verified agent record accepted → material ready → making → QA → packed → shipped → delivered, with carrier/tracking/shipping date required at shipped stage; flags unexpected issues. It does **not** email the customer, create shipping labels or receive buyer addresses. Actual shipping-address handoff requires a separate private workflow and purchaser-data processing contract.
- Existing Re.BRAND supplier email draft is not an order nor authorization for a parallel vendor; Risa is the intended primary producer.
- Seller obligations (legal consumer disclosures, refunds and customer complaints, tax accounting) remain with the legally named merchant, even when delegated to the producer. Verify the named merchant and contract in writing.
- Once production access is independently verified, Risa may be granted access via a verified Supabase authenticated user ID and a recorded `terms_reference`. Do not insert an unverified user, expose admin keys, auto-share Stripe customer data, or copy address/phone into Instagram messages.

**Not yet complete:** complete real receiving/shipping address handoff, buyer email notifications, agreed retail prices, production costs, returns/defects obligations, final photos and actual one-month shipping capacity. Until all verified, paid preorders stay disabled. The previously captured free interest form remains distinct from confirmed purchases.
