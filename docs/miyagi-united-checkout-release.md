# RBA UNITED Miyagi 2027 — direct checkout release

No Jotform dependency. The guardian enters data on the RBA site, and Stripe hosts card entry. Only a verified Stripe event marks an application paid.

## Required release gates

- Verify the final venue/activities, individual admission criteria, each programme's capacity, cancellation policy and early-price cutoff with RBA management. The approved prices are Shizugawa ¥29,800 / ¥33,000 and RIZEHOPE individual ¥22,000 / ¥24,800, all inclusive of tax. The team registration is separate.
- Apply `20261127150000_miyagi_united_checkout.sql` to the correct Supabase project; verify RLS and restricted grants, and exercise the reservation function in a separate test database.
- Register a Stripe webhook at `/api/commerce/miyagi-united-webhook` for checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed and checkout.session.expired. Verify the RBA account and store its signing secret only in sensitive deployment variables. Test with a separate Stripe sandbox and test database; the current live-only connector is not a substitute for that test. Do not run a live charge for QA.
- Configure `MIYAGI_UNITED_SHIZUGAWA_EARLY_UNTIL`, `MIYAGI_UNITED_RIZEHOPE_EARLY_UNTIL` as ISO dates with Japan offset, `MIYAGI_UNITED_SHIZUGAWA_CAPACITY`, `MIYAGI_UNITED_RIZEHOPE_CAPACITY` as positive integers, `MIYAGI_UNITED_TERMS_VERSION=miyagi-2027-v1`, and `MIYAGI_UNITED_WEBHOOK_SECRET`. Reuse existing server-only Stripe and Supabase credentials. Enable each programme using its `_PAYMENT_ENABLED=true` only after acceptance and validation. Missing configuration fails closed.
- Sandbox checks: same-player duplicate and simultaneous capacity requests, valid/invalid grade, early/regular cutoff, cancelled checkout, expiry, delayed success/failure, repeated signed events, no private data exposed, receipt delivery. Do not declare the receipt a guaranteed attendance confirmation until the webhook is processed.
- Follow DEPLOYMENT.md: static checks, one approved preview, merge and promote that verified preview. Keep the old Jotform intake disabled to avoid duplicate payments.

## Operations

Use the restricted application table and Stripe Dashboard to reconcile paid rows; do not expose it via a public API. Uncertain creation attempts deliberately retain their reservation until staff reconciles Stripe and the row; never release a capacity slot without confirming that an existing session cannot be paid. Unpaid open sessions expire after one hour; verified expired/failed events release the slot. Refunds are managed in Stripe and must be reconciled by authorised staff with the roster; no automatic refund action is implemented. A separate attendee-confirmation email needs a verified outbound service and consent configuration before enabling automated sending.

## 2026-11-27 preflight

- RBA approved Shizugawa capacity 30, RIZEHOPE individual capacity 12, and both early-price cutoffs 2026-12-07T00:00:00+09:00 (December 6 inclusive). Configured the production and preview project variables for these values and terms version, with payment enable flags intentionally false pending credential/webhook verification.

- Applied the isolated application migration to RBA HOMECOURT (`ctngdzzorhzpdxswahzl`). Verified RLS enabled, no anonymous SELECT, no member INSERT, no anonymous or member reserve-function EXECUTE, and service-role SELECT/EXECUTE allowed.
- A transaction-scoped test as service_role reserved one synthetic seat, rejected a duplicate even with remaining capacity, rejected a second applicant when capacity was one, then rolled back. Verified zero application rows after rollback. No real customer data or payments were used.
- Production project `rba-official-production` is currently serving an unrelated store release. The production env inventory did not contain `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `MIYAGI_UNITED_WEBHOOK_SECRET`; no secret values were retrieved. Do not enable live payment until the owner configures appropriate server-only credentials, the new webhook is verified, and exact capacities and cutoff dates are approved.
