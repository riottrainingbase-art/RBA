# MY HOMECOURT — MATCH / ENTRY / STORE pilot runbook
Date: 2026-11-12 JST
Status: Code review, not a live public launch.

## Product decision
The three workstreams are features INSIDE MY HOMECOURT, not three new standalone brands.

**MATCH** (/ja/my-homecourt/app/match): verified adult representatives of checked clubs create team-level listings and register interest. No minor DM, no direct contact details or automatic payment.
**ENTRY** (/ja/my-homecourt/app/entry): RBA administrators reconcile event source statuses and produce event-level CSV counts. Not licensed to other organizers yet.
**STORE** (/ja/store): existing Shopify Performance Tee remains DRAFT; no purchases before genuine product verification.

## MATCH — registration and safeguarding
1. Logged-in RBA ID adult applies with official organization name. Organization remains pending_review/pending, not RBA-verified or a member of a franchise.
2. RBA operator independently checks adult contact, identity/authority to represent club, coach safeguarding, and venue/operating conditions. A checkbox is only an attestation of an external review.
3. RBA operator activates and verifies only after actual review. DB trigger prevents self-verification by ordinary users.
4. Approved coach managing a verified organization can post future team-level fixtures by date, age, gender, municipality, and hosting/travel preference. No child name, exact contact or personal details.
5. A different verified club may send one team-level interest per post. Organizer accepts/declines; responder can cancel. Acceptance is not proof of a booked game.
6. Independently verify venue permission, insurance, age and participant safety, transport, cancellation terms, and final participants.
Pilot target: 5–10 independently confirmed clubs. No fee to list; track matches completed, approval rate, safety escalations, support minutes and repeat usage before considering charges.
Email login for new RBA IDs remains disabled until SMTP and callback are verified. Existing signed-in sessions alone can use protected features.

## ENTRY — separate source counts
- Clinic受付: clinic_registrations with status submitted or paid.
- Clinic入金確認: paid status plus paid_at timestamp. This is not necessarily settled cash.
- 別申請: submitted program_applications, which may overlap clinic registrations.
- 注文入金: paid platform_orders linked to an event, which may overlap registrations.
- 来場: check-in timestamp from event_checkins.
- External Google Forms, Square, other Stripe links, DM and co-organizer bookings are NOT included. Never infer remaining capacity from partial feeds.
- No automatic paid-confirmation email or roster publication. CSV includes aggregate event-level numbers only; spreadsheet formula injection is neutralized.
Reporting limits: 80 events / 1,000 source rows per query. Add pagination before claiming complete lifetime reconciliation.

## STORE — release gates
Shopify product gid://shopify/Product/9709290946817 confirmed DRAFT, zero stock, seven legacy placeholder variants, USD69 old internal estimate.
Candidate SOL'S 11939 adult S–2XL remains untested; target ¥4,400 is not approved. The public site remains a preview, and existing survey https://form.jotform.com/262947168647069 is free, not a reservation.
Before sale: official logo high-resolution source, actual sample wear and wash test, correct inventory options, supplier production/shipping mapping, taxes/returns/seller disclosures, delivered margin, and controlled end-to-end test order.

## Deployment policy
Merge to main after static QA only; main builds are intentionally ignored by Vercel.
Stage minimal file changes on preview-rba, explicitly tag exactly one [preview] checkpoint after budget and safety gates, inspect preview and existing registration/payment routes, then promote the same reviewed artifact.
Never switch Stripe/Square links, login-email gate, or Shopify DRAFT status as a side effect of this PR.