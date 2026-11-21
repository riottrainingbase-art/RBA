# RBA STORE FIRST DROP — LIVE RELEASE RECOVERY

**RBA-only production audit / 2026-11-17 / NOT APPROVED FOR PAID SALES**

## Changes completed today

- Stripe live account `acct_1UGdxZRXDnnSs6XN`: hosted Checkout brand colors updated from Stripe blue to RBA black `#111111`, warm off-white `#f4f2ed`, square control style, Noto Sans JP font; verified after write.
- Two existing Stripe products renamed **RBA WHITE TEE｜COLLECTION 001** (`prod_VdhVeR8cgnzE6d`) and **RBA BLACK SETUP｜COLLECTION 001** (`prod_VdhVWqdMcIbZug`) and descriptions changed to remove unsupported manufacturing promises. The linked live Price IDs and tax-inclusive retail amounts remain unchanged (JPY 4,900 / 19,800).
- Both live Stripe Payment Links deliberately **deactivated**, read-back confirmed `active=false`:
  - TEE `plink_1UcRBCRXDnnSs6XNEW4xN93M`
  - SETUP `plink_1UcRBHRXDnnSs6XNoHlBdpSQ`
- The stored Payment Link completion message refers to RBA STORE. The links must NOT be reactivated until all blocks below are resolved.
- RBA site draft PR #458 now includes an independently verified checkout guard: if Stripe account website, merchant display, signed webhook destinations, or active and contracted fulfillment user fails verification, the POST checkout handler returns 423 without creating a Stripe session. Existing signed paid-session webhooks continue to reconcile independently.
- This draft PR is **not** published to production. Continue to keep `RBA_ESSENTIALS_PREORDER_ENABLED=false`.

## Confirmed unfinished tasks / blockers

1. **Account public display mismatch.** Live Stripe Account name = Riot Basketball Academy, but `business_profile.url` currently `https://www.jpnentry.com/` and `settings.payments.statement_descriptor` is `JAPAN MARKET ENTRY`. Correct the RBA account's public business website to `https://riotbasketballacademy.com/` and statement descriptor to a truthful RBA name. Verify from the actual Stripe account GET after editing. Also verify current product description in the account which still refers to international market entry service rather than youth development / clothing.
2. **Webhook not present.** Stripe live account `GET /v1/webhook_endpoints` returned 0 endpoints. The application defines routes `/api/commerce/essentials-preorder-webhook` and `/api/commerce/essentials-payment-link-webhook` in draft code only. AFTER the release is actually deployed to the correct domain, register signature-protected event destination(s) for `checkout.session.completed` and `checkout.session.async_payment_succeeded`; store signing secret(s) only as Vercel encrypted variables and test redelivery/replay. Never print or commit secrets.
3. **Fulfillment identities not enrolled.** Supabase HOMECOURT `ctngdzzorhzpdxswahzl` lists zero rows in `public.rba_essentials_fulfillment_agents`; no verified auth user ID, `terms_reference`, or active production permission is registered. Risa's general intent is not substitute for signed manufacturing/shipping/privacy compensation agreement. Securely verify her unique account; document the agreed fee, production lead time, logistics, returns, rework, dispatch tracking, and data access; enroll the exact person after that agreement. Keep customer address access private to permitted roles.
4. **Buyer acknowledgement automation missing.** The DB includes `buyer_notice_status` but webhook deliberately only records `pending`. Implement and test a sender with authenticated sender identity, dedupe, retry, success timestamps and error handling before any new paid order.
5. **Legal and fulfillment terms unapproved.** No signed merchant disclosure of address/telephone, final refund policy, size/material specifications, producer acceptance, actual delivery deadline or one-month capacity evidence. Do not invent a seller address, phone, shipment date, artist agreement, or refunds; first verify underlying facts and document merchant approval.
6. **Production release pending.** GitHub PR #458 is a draft against main and has not been merged into the official Vercel release branch. Publish and regression-test the customer-facing site in a safe, non-paid state first. Verify RBA store hero/logo and product pages on desktop/mobile. The existing Performance Tee uses independent Shopify gating.
7. **Tax assessment.** Live Stripe Tax settings report active but zero tax registrations, and first-drop Payment Links' `automatic_tax.enabled` is false. Retail unit amounts are described as tax-inclusive but seller's tax registration status and correct tax treatment must be verified separately; do not silently enable Stripe Tax or create registrations.

## Verifiable test order (do not charge a real customer during QA)

- Review final product specification, legal seller identity, price and return/cancellation notice together.
- Verify the production website is deployed with `RBA_ESSENTIALS_PREORDER_ENABLED=false` and the endpoints reject unsigned requests.
- Verify Stripe account profile/statement descriptor and account ownership; inspect Payment Links' inactive state.
- Verify secure webhook with controlled sandbox event; test duplicate notification and malformed signature.
- Verify Supabase one-record-per-session, maker-only fulfillment ticket and address access, and deterministic acknowledgement email state.
- Test actual site purchase-to-fulfillment only via safe sandbox/staging; confirm dispatch and arrival promises; explicitly approve any live test before charging.
- Only after EVERY gate is documented can owner approve both enabling the website checkout and separately reactivating Payment Links. No automatic toggling from audit results.

## Data and privacy
No customer name, address, telephone or email may enter GitHub tickets, logs, public marketing content, status notifications or this document. Use opaque/redacted order IDs only.
