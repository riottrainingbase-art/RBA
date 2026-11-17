# RBA STORE — Order → payment → notice → maker → shipment system

**Internal runbook · 2026-11-17 · PR #458 is DRAFT, NOT DEPLOYED. Do not turn on paid sales automatically.**

## 1. Verified configuration and scope

- Stripe live account `acct_1UGdxZRXDnnSs6XN`, display name Riot Basketball Academy.
- Merchant profile website `https://riotbasketballacademy.com/`; card statement `RIOT BASKETBALL`, prefix `RBA`; verified after owner changed settings.
- Existing TEE and SETUP hosted Payment Links are `active=false` (intentionally; no checkout charges).
- Existing Stripe webhook destination currently points to HOMECOURT's shared `stripe-homecourt-webhook` Edge Function. This event destination handles other RBA payments but **does not implement RBA ESSENTIALS order reconciliation**; do not count it as a working store webhook.
- Supabase HOMECOURT: `ctngdzzorhzpdxswahzl`. At review: 0 apparel orders, 0 fulfillment tasks, 0 permitted fulfillment agents.
- Actual paid Checkout routes are still in GitHub draft; production website does not yet serve them.

## 2. Deployed migration — shipping state (no new PII columns)

**Applied on 2026-11-17:** `20261117042410_rba_essentials_shipment_notices_20261117.sql`.

- Order columns `shipment_notice_status` (default `not_ready`) and `shipment_notice_sent_at`.
- DB trigger `rba_essentials_shipment_notice_trg` marks paid orders pending **only** when a maker moves a fulfillment task to `shipped`.
- Existing private table ACL/RLS remain unchanged; trigger uses `SECURITY INVOKER`, revokes execution from public/anon/authenticated.
- Database cannot and must not contain recipient email addresses or mailing addresses. Those remain in Stripe's protected Checkout Session, fetched by an authenticated server only when a notice is sent.

## 3. Customer acknowledgement (implemented but NOT running live)

Source:
- `lib/essentials-notice-config.ts`
- `lib/essentials-buyer-notices.ts`
- `app/api/commerce/essentials-preorder-webhook/route.ts`
- `app/api/commerce/essentials-payment-link-webhook/route.ts`
- `app/ja/essentials/manage/page.tsx` and `notice-actions.ts`

Paid Stripe event → verify signature and live RBA account → write unique order and fulfillment ticket → verify order from Stripe again → claim `buyer_notice_status=pending` atomically → send plain-text acknowledgement with Resend API idempotency key → write `sent` and `buyer_notice_sent_at` only on provider acceptance.

The notice includes the first eight characters of the order ID, item/size/quantity, paid amount and date, dispatch and delivery deadlines, immutable terms version, contact and seller name. Hand-painted addon is itemized only if actually charged. The customer email is read from Stripe, not stored in the Supabase apparel table. **Historical Stripe-hosted orders with draft/pending terms do not receive a false contractual acceptance notice**: they require manual review and customer-specific remedy.

No implicit retries of `failed` state. A timeout may mean the provider actually accepted the mail; operator must inspect provider logs and confirm before manually resetting status. Resend supports `Idempotency-Key` for duplicate-retry prevention, but the provider retention period is bounded and should not be treated as unlimited deduplication.

## 4. Shipment notice (implemented but NOT running live)

Source:
- `lib/essentials-shipment-notices.ts`
- `app/ja/essentials/production/actions.ts`
- `app/ja/essentials/manage/page.tsx` and `notice-actions.ts`

Only a paid, recorded order with a shipped/delivered task, shipping date, carrier and valid tracking ID is eligible. Stripe payment status is rechecked before sending. The production-stage action calls the sender after the DB trigger queues the shipment. The same atomic claim and fail-for-manual-review logic applies. Admin-only tools can send **pending** but never automatically retry **failed** notices. Supplier access requires a verified authenticated Supabase user whose active `rba_essentials_fulfillment_agents.access_role` is `production`; no maker credentials or PII are added by this release.

The Resend API returning an email ID means accepted for sending; it does not prove final inbox delivery. An actual inbox check and the provider's delivery/bounce logs remain launch prerequisites.

## 5. Secret and verified sender setup — REQUIRED BEFORE SALE

On the correct Vercel project, add only as encrypted **server-side** configuration:

```text
STRIPE_SECRET_KEY=<RBA restricted live key, kept secret>
SUPABASE_SERVICE_ROLE_KEY=<HOMECOURT service role key, kept secret>
RBA_ESSENTIALS_STRIPE_WEBHOOK_SECRET=<Stripe signing secret for the site preorder route>
RBA_ESSENTIALS_PAYMENT_LINK_WEBHOOK_SECRET=<signing secret for site fallback route>
RBA_ESSENTIALS_RESEND_API_KEY=<Resend API key with send-email permission>
RBA_ESSENTIALS_NOTICE_FROM=RBA STORE <orders@riotbasketballacademy.com>
RBA_ESSENTIALS_NOTICE_REPLY_TO=<verified RBA customer-support mailbox>
RBA_ESSENTIALS_NOTICE_SENDER_VERIFIED=true  # set only after DNS/domain/sender verification
RBA_ESSENTIALS_NOTICE_ENABLED=true # set only after controlled inbox test
```

No API key, DNS setting, or domain validation is claimed to exist. Never commit or paste secret values into GitHub. Values in `<...>` above are placeholders, not real values. Sender domain should be verified with the provider before using the address.

Store-specific seller name, telephone/address, return/cancellation policy, one-month delivery promise, actual sizes and materials, manufacturing agreement and cost evidence are **separate** legally relevant gates. Do not assume that an e-mail sender verification authorizes sales.

## 6. Exact Stripe event destinations — REQUIRED AFTER SAFE DEPLOY

Register on RBA live account **after** the protected routes are available on the correct host:
- `https://riotbasketballacademy.com/api/commerce/essentials-preorder-webhook`
- `https://riotbasketballacademy.com/api/commerce/essentials-payment-link-webhook`

Subscribe to `checkout.session.completed` and `checkout.session.async_payment_succeeded` for each. Copy each unique signing secret to its **matching** Vercel server env. Test invalid signature (reject), test paid session (reconcile), asynchronous payment (wait for payment status paid), duplicate delivery (no duplicate order or notices), and non-store events (ignore). Existing HOMECOURT payment endpoint for unrelated RBA activity must not be replaced or disturbed.

The checkout server now rejects sales if Stripe account merchant display is wrong, webhook destinations are missing, maker access is empty, the notices are unconfigured, or any other previously established commercial gate is incomplete. Do not disable these guards simply to see a BUY button.

## 7. Controlled acceptance test (no charge to a customer)

1. Approve final item photos or imagery usage, accurate fabric/care/size chart, seller details, delivery dates and returns.
2. Confirm the production supplier's written agreement and active least-privilege account in HOMECOURT. Do not assign permission by name alone.
3. Verify mail sender from an independent inbox and inspect provider delivery status.
4. Build and preview PR #458 (desktop and iPhone). In staging, simulate two signature-valid webhook events for the same Checkout Session; assert one order, one maker task, one buyer notice. Simulate invalid signature, wrong account, unpaid, metadata mismatch and expiry.
5. Move a *test* order through the production transitions to shipped and ensure only one shipping email is accepted. Verify malformed tracking is rejected and recipient email remains absent from DB.
6. Only after a full signed-off launch checklist, deploy to production with the sales switch still false. Read back real merchant fields, webhook destinations, legal terms and order tables.
7. A separate explicit release authorizes enabling the first-drop checkout. Keep the existing Payment Links inactive unless there is a reason to reactivate them and both are separately reapproved.

## 8. Operational exceptions / manual review

- `buyer_notice_status=failed`: show in admin ledger; inspect provider logs and order details before requeuing. Do not assume no email was sent.
- `shipment_notice_status=failed`: inspect carrier/tracking and provider delivery logs; only then manually retry under controlled procedure.
- `payment_status=refunded` or `disputed`: skip new acceptance/shipment notices and handle customer communication separately.
- If Stripe returns payment success but order is missing, **do not ship**; reconcile the paid session to the ledger with its original unique session ID, issue incident alert and resolve.
- No customer names, email addresses, shipping addresses, transaction secrets or card info in PRs, dashboards that are not authorized, or public marketing.

**Status as of creation:** Database shipping migration applied and verified. Application code committed to draft PR. No live app deploy, no actual buyer notice sent, no new sales or refunds.
