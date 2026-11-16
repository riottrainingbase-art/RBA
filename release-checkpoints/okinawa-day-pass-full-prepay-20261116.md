# Okinawa Day Pass — Full Advance Payment Release Gate

Scope: 2026/12/22–24 Okinawa International Youth Camp, optional 1-day and after-school participation. Existing paid three-day Okinawa/other-Japan/overseas payment links are unchanged.

## Guardian journey

1. Parent/guardian or adult submits a free enquiry using the existing Jotform: https://form.jotform.com/263095015591053 . This is not a paid booking.
2. RBA verifies official gym hours, facility permit, age grouping, capacity, staff, insurance, consent and guardian; also checks for an existing paid three-day registration. RBA approves individual slots and tax-inclusive prices in writing before charging.
3. Authorized RBA operators generate a cryptographically random **32-byte (64 hex character)** single-recipient token. Store only its SHA-256 digest in the Supabase row; never store the raw token in DB or logs.
4. In project ctngdzzorhzpdxswahzl, create one record in public.okinawa_2026_day_pass_payments with a unique application_ref, validated plan_code, guardian_name/email, exact price amount_jpy, status approved, terms_version, guardian_verified_at, venue_verified_at and invite_expires_at. Never approve without verifying the actual facility schedule.
5. Privately send the verified guardian the URL: https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026/day-pass/payment?token=REPLACE_WITH_PRIVATE_TOKEN . Never post or share an actual invitation token publicly.
6. Guardian reviews plan and exact total, signs off the rules and pays **100% before the event** (one card payment). No deposit/balance, on-site cash, unpaid seat confirmation or uncontrolled payment link. Checkout is linked to the approved application and idempotent.
7. A separate signed Stripe webhook reconciles the paid session, JPY full amount, invitation ID, registered plan and terms, and marks the row paid only on Stripe's verified paid state.
8. RBA checks the paid record against the application and guardian consent, sends exactly one participation confirmation and correct arrival/collection instructions. Checkout redirect alone cannot confirm participation.

## Production activation — all must be verified first

- Approved day-and-time slots and capacity; venue safety, staffing, participant ages and guardian handoff.
- Approved tax-inclusive JPY prices configured only for active slots in server-only JSON variable OKINAWA_2026_DAY_PASS_APPROVED_AMOUNTS_JPY (plan keys dec22_day, dec22_after, dec23_day, dec23_after, dec24_day). No earlier suggested price is automatically approved.
- Approved cancellation/terms version: OKINAWA_2026_DAY_PASS_TERMS_VERSION.
- Stripe secret key must belong to RBA acct_1UGdxZRXDnnSs6XN (not the other connected companies).
- Separate webhook endpoint /api/camps/okinawa-2026/day-pass/webhook, signed secret OKINAWA_2026_DAY_PASS_WEBHOOK_SECRET. Enable checkout.session.completed and checkout.session.async_payment_succeeded.
- Server-side NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from project ctngdzzorhzpdxswahzl. Never send service-role key to the browser.
- Supabase table RLS enabled, anon and authenticated revoked; select/insert/update accessible only to trusted service role. This new table is deliberately empty at creation.
- Production CI, build, staged no-charge test, real Stripe test (through an authorized test mode first), and verification of official domain routing.
- Set OKINAWA_2026_DAY_PASS_PAYMENTS_ENABLED=true last, after all checks. Default is disabled.
- Any uncertain payment status, duplicate or paid three-day plan, unverified guardian, venue uncertainty, cancelled attendance or failed payment matching is HOLD, not a new charge.

## Scope exclusions

- Existing three-day and overnight pricing / links are unchanged; international USD and domestic JPY flows are separate.
- This one-day policy differs from Kobe boys U14's 50% deposit and balance. Never reuse Kobe's payment stages or price.
- No new prices have been publicly activated or charged, and there are no approved new day-pass customers at release preparation time.
- No automatic confirmation email has been implemented in the webhook: staff must verify the record and send exactly one confirmation.

## Test and reconciliation

Tests: node --test tests/okinawa-day-pass-full-prepay.test.mjs
Verify source PR and Vercel preview without exposing participant details. After webhook registration, verify that an approved one-off payment is recorded once; duplicate events must be idempotent. Manual cancellation and refund follow official rules, linked to Stripe payment intent. Do not treat status paid on a browser screen alone as evidence.
