# 2026-11-14 Okinawa clinic operations

## Approved event conditions

- Saturday 14 November 2026, 16:00–19:00 JST (07:00–10:00 UTC).
- JPY 3,300 including tax, one player per payment.
- Japan school grades 4–9; capacity 50.
- Venue address is communicated directly to applicants; never put it in public HTML, programme data, Stripe product descriptions, or this document.
- Venue reservation is expected to be confirmed on the 25th. No confirmed booking or venue address has been supplied. Initial release is pre-registration with payments disabled.

## URLs

- Public: `/ja/events/okinawa-clinic-2026-11-14`
- Organiser roster: `/ja/events/okinawa-clinic-2026-11-14/admin`
- Same-origin authenticated API: `/api/clinics/okinawa-20261114`

## Registration and privacy

Guardian RBA ID login returns to the event. Children need no separate account/email. Required: participant name, grade, guardian name, emergency phone and adult/participation consent. Contact email comes from the verified RBA ID. Photography consent is separate and optional. No health records collected by this form.

`clinic_registrations` is RLS protected, with self/admin SELECT only. The Edge Function verifies the login token. Only its service client can execute the registration writer. A locked event row serialises the first 50 registrations; subsequent entries are waitlisted. Same guardian + normalised player name + grade returns the existing record. An organiser (offer creator) or existing global admin can fetch the roster and CSV; no public participant list exists.

No marketing or mass announcement email is sent by the application. Transactional receipt/confirmation is an RBA notification; Stripe receipt delivery depends on the account's receipt settings. Venue instructions must be sent individually after the venue is known. Do not claim that those messages have already been sent.

## Payment state

Live RBA account: `acct_1UGdxZRXDnnSs6XN`.
Payment Link: `plink_1UTNHzRXDnnSs6XNfJQf3ohX`, initially inactive; one item, JPY 3,300, completed-session limit 50.

Before opening payments:

1. Confirm the gym booking, actual venue instructions and safe operating capacity.
2. Send the confirmed venue details to the registered families; address stays out of the public page.
3. Activate the existing Stripe link (do not create a duplicate), then set the offer metadata `venue_confirmed=true`, `payment_enabled=true`, availability `confirmed`, and event status `open`.
4. Verify the event shows payment buttons only for eligible submitted registrations.

Payment URL is supplied only by the authenticated server after checking event state and ownership. Reference is the registration UUID. No payment success is inferred from the return query. Existing signed Stripe webhook validates event, exact link, amount/currency/live mode and registration before writing the order, ledger, paid registration and notification. Unpaid sessions remain pending. A different paid session for an already-linked registration is sent to the existing unmatched-payment reconciliation queue for review/refund.

The limit on Stripe completed sessions is an additional global cap. Link URLs can be copied once issued; they are not single-use sessions. Monitor duplicate payments and unpaid asynchronous sessions. Do not increase the Stripe limit without reconciling the roster first.

## Cancellations / waiting list

The current official Japanese RBA policy is shown on the event page: through Nov 6 full refund; Nov 7–10 50%; Nov 11 onward normally none; RBA cancellation full refund or transfer. All dates are JST. Do not invent a no-refund exception.

Organiser handles cancellation requests and Stripe refunds. Refund webhooks use the existing `record_stripe_refund` path, and the participant's event page displays the resulting order refund status. Keep the paid record for accounting. For an unpaid withdrawal, change the registration to `withdrawn` under organiser control; promote the earliest waitlisted entry after confirming an actual released place. Promotions/refunds are not performed automatically or by the public form.

## Verification

- `node scripts/test-okinawa-clinic.mjs`: payment amount/link/reference/eligibility/pending/idempotency cases with simulated provider data.
- SQL transaction tests: 50 submitted, 51st waitlist, duplicate registration identity, anon SELECT denied, direct authenticated RPC write denied, self SELECT allowed, other user SELECT hidden. Fixtures rolled back.
- `node audit/email-registration/check.mjs`: login safe-return regression.
- TypeScript, changed-file ESLint, deployment budget policy.
- Real live card charges and delivery of authentication/receipt emails are not exercised by these tests.

## Runtime source preservation

The deployed webhook v17 contained ESSENTIAL supporter handlers missing from repository main. This release preserves that exact deployed baseline and adds the Okinawa branch; do not replace it with the older repository-only webhook.
