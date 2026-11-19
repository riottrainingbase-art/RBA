# Okinawa 2026 day-pass: transaction-safe reservation

## Current implementation (2026-11-20)

- Dedicated Supabase project: `ctngdzzorhzpdxswahzl`
- Public-schema RPC (not publicly executable): `public.reserve_okinawa_2026_daypass(p_application jsonb, p_daily_capacity jsonb)`
- Migration applied: `okinawa_2026_day_pass_atomic_reservation`
- Additional DB CHECK migration: `okinawa_2026_day_pass_approved_record_guard`
- Actual start-time column, constraint and RPC migration: `okinawa_day_pass_verified_first_session`
- GitHub operator tool: `scripts/okinawa-daypass-issue-invite.mjs`
- Jotform interest: https://form.jotform.com/263217090103041
- RBA Stripe Checkout remains off until event and payment conditions pass: `OKINAWA_2026_DAY_PASS_PAYMENTS_ENABLED=false`

## Security invariants

1. **No public execution.** The function uses `SECURITY INVOKER`, with `EXECUTE` revoked for `public`, `anon` and `authenticated`; only `service_role` is authorized. The function explicitly requires `current_user = 'service_role'`. Verified using `has_function_privilege`.
2. **Transactional count + reservation.** `pg_advisory_xact_lock(2026,122224)` serializes the entire count-and-insert operation, preventing two operators from issuing seats simultaneously when only one is left. All 1- and 2-day options map to their occupied calendar day(s).
3. **No arbitrary amounts or capacity.** The operator script first matches the input plan amount to the RBA-approved server-side JSON, then the RPC validates the range and approved per-date net capacity. The supply entered into `p_daily_capacity` is the approved number of *additional* seats after existing participants, families, staff and vehicles are accounted for. Numbers cannot be invented or derived from a marketing graphic.
4. **Guardian review.** All nine attestation fields must be true before a reservation may be created, with a real venue confirmation timestamp after the Nov 22 booking cutoff and a limited token lifespan.
5. **Record constraints.** A DB CHECK rejects records with an active/paid state unless required guardian, venue, terms and token evidence exists. Unique indexes prevent reusing the same application reference, invite hash, Checkout session and payment intent.
6. **Confirmed start time.** `first_session_at` is mandatory for any approved or paid record. PostgreSQL verifies it is in the future and falls on the first selected participation day in Japan time. The payment page displays the actual date/time, and Checkout closes before that time rather than relying on provisional timetable estimates.
7. **No stored bearer token.** Only SHA-256 of the random token is stored; the full URL is emitted only to the trusted operator for verified one-to-one delivery.
8. **No automatic charge.** Reserving a place does not call Stripe or charge a card. The guardian must visit an individual, still-valid payment page, expressly accept terms and proceed into Stripe. RBA/Stripe success is verified separately from confirmed participation.

## User workflow

1. After November 22, obtain the venue's formal authorization for *each* gym block and daily approved net additional capacity; record adult supervision, low-age safeguarding and arrival/handover arrangements.
2. Agree on, and publish, accurate participant-facing terms/price/venue/cancellation version. Do not claim “already half full” without audited evidence.
3. Review the Jotform response for the individual guardian, cross-check the RBA Stripe 3-day camp receipts, SPARTANS and any alternative payments. Validate date, planned vehicle count and age. **Record the confirmed first gym session's ISO-8601 timestamp with timezone** (for example only after obtaining actual venue confirmation).
4. Set approved prices, per-day caps and terms in the server's protected environment; configure RBA Stripe live key, service role key and verified webhook credentials. Do not paste secrets into the repository or chats.
5. Fill the example `scripts/okinawa-daypass-approved-application.example.json` with a real *one-person* approved application **only in a private operator environment**. All review flags must have documentary evidence; the sample has false defaults.
6. Issue the private invitation in a *single* operator workflow and deliver it to the exact guardian, never in bulk or on a public page. PostgreSQL serializes simultaneous requests.
7. The user checks the amount and approved cancellation terms, ticks explicit consent and pays in Stripe. The signed Edge webhook records the outcome; the return page independently verifies the matching Checkout session.
8. RBA reviews paid, unmatched and refund records and separately confirms acceptance and pickup logistics. An accepted payment does not itself prove the child is safely confirmed.

## Remaining release blockers

- The facility's official timetable and amended participant/vehicle application are still pending until the 22 November 2026 cutoff.
- Daily safe inventory has not been formally approved. The official form has zero day-pass interest responses at the time of this review.
- Official Vercel does not have the Stripe live server secret, Supabase service role secret or approved terms version configured. The release switch remains false.
- A signed, real-world end-to-end Stripe webhook / failed payment / refund test and iPhone preview verification have not been completed. CI static checks cannot replace payment testing.
- PR #481 targets `main`; the RBA deployment playbook requires one controlled `preview-rba` checkpoint before any production release.

**Do not turn on live payment flag or distribute any new-day-pass charge link until these conditions are complete.**
