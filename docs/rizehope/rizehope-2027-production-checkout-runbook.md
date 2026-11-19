# RIZEHOPE JAPAN 2027 — Domestic U12 team payments (staged, NOT accepting money)
Updated 2026-11-20. Do not send this page to participants as a confirmation of availability.

## Source of truth and scope
- Dates: Feb 27–28, 2027. Venue: Shibata Town Gymnasium; two-day reservation and presentation permission confirmed by local organiser, but court hours, staffing, match format, final operator/legal collection entity and age categories are still in review.
- Global capacity: 10 teams **total**, counting Japan-based teams, overseas teams, and RBA UNITED if approved. No preferred slot for UNITED.
- Japan-based U12 teams only: ¥66,000 tax-inclusive price for two days; ¥33,000 deposit (50%) applies toward total, ¥33,000 balance (50%) later. No promise of an unconditional nonrefundable deposit.
- Travel, hotel and meals excluded. Overseas teams and UNITED players are separate audiences with separate fees and consent.
- Jotform entry: https://form.jotform.com/263223566035050, cancellation waiting list https://form.jotform.com/263223619546056.
- Stripe live product `prod_VeqgtQekecgw2W`; deposit price `price_1UdX1YRXDnnSs6XNKuXr8BKc`; balance `price_1UdX1aRXDnnSs6XN8HYjjPNB`; old all-at-once price `price_1UdWzCRXDnnSs6XNlK3uvb2L` inactive.
- Two legacy generic payment links `plink_1UdX3XRXDnnSs6XNHPAh1IGh` and `plink_1UdX3dRXDnnSs6XN30zT14Mr` are both active=false. **Never enable or distribute them**: a shared 10-use link is not an atomic 10-team cap and does not prove team approval.
- Stripe Tax Settings was active, but registered jurisdictions returned zero, and the selected sporting event participant tax code `txcd_50012003` is only supported in the Tax Calculation API rather than normal Product API. A correct Japan tax approach and event collection entity require review before checkout activation. Prices use `tax_behavior=inclusive` and the checkout is otherwise gated.
- Current status: Jotform domestic entries 0; Supabase capacity ledger 0. No payments received in this workflow.

## Application and controlled checkout stages
1. RBA staff verifies Jotform original submission ID, timestamp, adult representative, team's formal name and location, using source form IDs. Review for duplicate team aliases and existing free EOI, overseas inquiries and UNITED.
2. Staff-only ledger: `/ja/international/rizehope-japan-2027/admin`. Login required, `profiles.role=admin` and DB functions check `private.is_global_admin()`.
3. Import through `rizehope_2027_import_entry`; invalid/duplicate submissions do not create additional capacity. Do not invent an arrival time or submission ID. Jotform is not yet automatically synchronized to this ledger.
4. After a final organiser signs off final rules and written contract/refund terms, enable `RIZEHOPE_2027_APPROVAL_ENABLED=true` and call `rizehope_2027_accept_team` with the actual published terms version. A DB row lock on the singleton capacity row serializes approval and prevents approved slots from exceeding **10**. This is a capacity *hold*, not a paid confirmation.
5. Confirm the representative truly accepted that exact terms version; log documented evidence via `rizehope_2027_record_terms_acceptance`. The evidence must be an actual signed or timestamped original, not a made-up reference.
6. Independently verify the Stripe Tax treatment, exact payment-collection entity, refund policy, participant eligibility, usable venue hours, safeguarding and emergency staffing, and signed Stripe webhook endpoint. Then, and **only then**, set all five explicit gate flags to true:
   - `RIZEHOPE_2027_CHECKOUT_ENABLED`
   - `RIZEHOPE_2027_ORGANIZER_APPROVED`
   - `RIZEHOPE_2027_TERMS_PUBLISHED`
   - `RIZEHOPE_2027_TAX_REVIEW_APPROVED`
   - `RIZEHOPE_2027_STRIPE_WEBHOOK_READY`
7. Server secrets `STRIPE_SECRET_KEY`, `RIZEHOPE_2027_STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` must be configured in the correct Vercel production environment. Keep secrets in environment storage, never in Git, logs, screenshots, emails or web pages.
8. For an approved domestic team with documented terms acceptance, a verified admin calls `POST /api/rizehope-2027/admin/checkout` with `{"team_id":"<UUID>","stage":"deposit"}`. A server-side Stripe Checkout Session is generated for **that team and that stage only** with customer email, its UUID as `client_reference_id`, metadata and idempotency. The DB stores a single checkout session per team/stage; a second request will not generate another. The admin sends the short-lived hosted Stripe URL privately to that one approved team's adult representative.
9. Dedicated signed webhook `POST /api/rizehope-2027/stripe-webhook` handles only `checkout.session.completed` where payment_status=paid, live mode, amount=33,000 JPY, correct session and metadata. It calls service-role-only `rizehope_2027_record_verified_payment`, applying the amount to the ledger and audit log once; duplicate event IDs cannot double-credit. A redirect or mere Jotform submission is never proof of payment.
10. After deposit, status becomes `deposit_paid` (provisional place). Issue separate stage `balance` only after its due date and original agreed terms are verified. The webhook records another ¥33,000 and moves state to `confirmed` only after the second payment. No new entry counts against capacity for the balance stage.

## Failure and refund controls
- Never mark paid based on an email screenshot, submission, success URL or manually typed date.
- Webhook returns 500 on failed reconciliation so Stripe retries; reconcile exceptions using Stripe event IDs and DB audit, not guesses.
- An expired Checkout Session remains recorded. A new Checkout requires verifying the prior session is unpaid/expired at Stripe, recording a controlled reset, and ensuring the old session cannot collect funds. Do **not** create a second link silently.
- A cancelled, postponed or overcapacity booking with money received is an incident to reconcile, not a row to delete. Refund only after authorised review and the written cancellation terms. No automatic forfeiture and no unilateral changes to external team agreements.
- Stripe Payment Links previously created remain inactive; do not switch them on to bypass the per-team checkout.
- Jotform limit of 10 submissions is not proven to match ten unique domestic + overseas + UNITED team entries; do not advertise "X slots remaining" until data across all channels is reconciled.

## QA / release
- `node --test tests/rizehope-international-hub.test.mjs tests/rizehope-payment-ops.test.mjs`
- `pnpm exec tsc --noEmit`
- `pnpm exec eslint ...` through RIZEHOPE GitHub Actions.
- Supabase security advisor may flag the four admin-only SECURITY DEFINER functions because they are executable by authenticated users. These functions check `private.is_global_admin()` before any mutation; the signed-payment function is EXECUTE-granted only to service_role. This must be accepted as a reviewed privilege design or reworked into a service-role-only admin backend before public release.
- Confirm production deployment SHA against the reviewed release branch and confirm returned URLs manually; a GitHub merge is not a deployment.
- Verify full lifecycle in a **safe Stripe test context** before turning on live checkout. Only live accounts are currently surfaced in the connected Stripe account list; never perform a real ¥33,000 test charge without explicit authorisation.
- Separate outstanding approvals: official collection entity, age rules, session allocation, refund version, financial close, merchant tax treatment, Stripe production webhook, RBA user/admin credentials, Jotform-to-ledger source syncing.
