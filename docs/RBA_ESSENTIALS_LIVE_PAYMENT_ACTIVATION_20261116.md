# RBA ESSENTIALS FIRST DROP | LIVE-PAYMENT READINESS
Updated 2026-11-16 JST. Merchant owner explicitly requested launch and reported that Risa approved production. This document is an internal safety/activation checklist, **not** evidence that payment is currently public.

## Approved by the merchant
- WHITE TEE: ¥4,900 Japanese tax-inclusive; black hoodie + wide trousers SETUP: ¥19,800 Japanese tax-inclusive.
- FIRST DROP domestic-Japan customer shipping is ¥0; postage/packaging remain a business expense. Later retail/overseas are not covered.
- One-month delivery to buyer after payment, not merely one-month factory dispatch.
- No model photographs; use owner-supplied white/black product-only design references and clearly label as concept images.
- RBA runs marketing and sales, Risa manages production, quality, packing, carrier and dispatch. Maker 'OK' was **reported by the RBA owner on 2026-11-16**; no signed contract, delivery capacity metrics, confirmed costs or maker account was provided.
- Handmade add-on is separately gated until artist rights, unit fee, wash tests and custom returns approved.

## Stripe live account and items (checked)
- RBA connected merchant account: `acct_1UGdxZRXDnnSs6XN`; charges_enabled and payouts_enabled both true.
- Product WHITE TEE: `prod_VdhVeR8cgnzE6d`, one-time JPY 4,900 incl tax: `price_1UcQ68RXDnnSs6XN5XW1ZMaj`.
- Product BLACK SETUP: `prod_VdhVWqdMcIbZug`, one-time JPY 19,800 incl tax: `price_1UcQ6jRXDnnSs6XNeJUiq622`.
- Product photos updated on the two Stripe products to the exact user-supplied product-only image references, and their price objects reactivated; no public checkout by that action alone.
- Back-up **Stripe-hosted payment links prepared but deliberately deactivated**:
  - TEE: `plink_1UcRBCRXDnnSs6XNEW4xN93M` — https://buy.stripe.com/9B6fZj423fY09eRboz7EQ1O . Collects shirt size S/M/L/XL, Japanese shipping address, buyer name and phone, 1–3 units.
  - SETUP: `plink_1UcRBHRXDnnSs6XNoHlBdpSQ` — https://buy.stripe.com/bJe4gB1TVh241Mp3W77EQ1P . Collects hoodie and pants sizes separately, Japanese shipping address, buyer name and phone, 1–3 sets.
  - Both payment links confirmed **active=false** by a fresh Stripe read. These are preparation links only; they have no webhook integration to RBA's local order ledger, no handwriting add-on and cannot be marketed as current paid checkout.
- **Critical merchant brand mismatch** found on the live RBA Stripe account: account name = "Riot Basketball Academy", but business_profile.url = `https://www.jpnentry.com/` and account-wide card statement_descriptor = `JAPAN MARKET ENTRY` (settings.payments). Merchant-card descriptors and other existing Stripe charges could be affected by a global change. Do not silently change them or expose an active link until corrected/tested and approved with knowledge of the effects on existing payments.

## Official RBA website
- GitHub draft PR #458 `feature/rba-essentials-editorial-store-20261116` has 2 product detail pages, checkout form, Stripe Checkout session creation, signed webhook, paid-order ledger, fulfillment queue, private maker page, returns/legal view, conditional handwriting, and Japan-free-shipping code.
- This is NOT currently merged/deployed to the official site. Current Vercel production of `rba_site_v11_portal_ready` is based on `preview-rba`, not PR #458.
- Vercel environment currently has the base prices/tax/free shipping and `RBA_ESSENTIALS_PREORDER_ENABLED=false`. It lacks the validated runtime Stripe secret, a signed webhook secret, Supabase service-role secret and verified live-order notice service. These cannot be fabricated.
- Additional checkout readiness gate `RBA_ESSENTIALS_STRIPE_PUBLIC_BRANDING_VERIFIED` requires the user to verify their card statement and account website branding before public purchase.

## Final gates before switching real payments on
1. Correct Stripe public statement descriptor and website for the RBA account **with merchant acknowledgement of effects on existing RBA-account charges**. Check the buyer checkout UI and test statement before public launch.
2. Publish Japan distance-sales merchant terms: legal seller name (trade name alone inadequate for individuals), address and phone or a valid CAA Section 11 on-request disclosure procedure, contact email, exact product/size specification, price, Japanese FIRST DROP free shipping, full prepayment, one-month delivery deadline, customer cancellation/return/defect/late-delivery process. Do NOT blindly reuse RBA camp/event refund conditions for goods.
3. Confirm Risa maker-approved usable unit sizes/material, defect handling, ability to fulfill up to 3-item links with actual fabric/patch and delivery within one month, postage included as RBA expense. Verify Risa's secure production account/email for receiving order details; no customer addresses in Instagram DM.
4. In RBA website, configure Vercel Stripe secret, verified webhook signature secret and Supabase service-role key securely; test paid order event idempotency, order acknowledgement under Japan CAA prepaid mail-order notice, receipt, maker handoff, tracking, refund and email. Do not reveal secrets in logs or docs.
5. Alternatively, only after steps 1–3 and explicit approval, reactivate the Stripe-hosted payment links as fallback. Stripe-hosted links do not automatically populate the currently separate RBA `rba_essentials_orders` database; set a supported native webhook or monitored manual maker workflow first.
6. Final buyer-facing step: check both links and legal terms with a test purchase in a controlled real or sandbox environment, never test by unknowingly charging a customer. Add approved links to Instagram and product pages only after all checks pass.

## Current status at last read
Risa owner-reported "OK": yes. Stripe account charge capability: yes. Product/prices active in catalog: yes. Both payment links active: **NO**. RBA public website payment live: **NO**. Fulfillment agents enabled: **0**. Existing real paid apparel orders: **0**. Handwriting charge authorized: **NO**.

Official CAA communication-commerce guidance: https://www.no-trouble.caa.go.jp/what/mailorder/
CAA advertising Q&A for individual legal seller disclosure: https://www.no-trouble.caa.go.jp/qa/advertising.html
