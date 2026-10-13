# RBA Company Operating System

## North Star
RBA is a scalable youth-development platform company. It must not operate as a collection of founder-dependent clinics.

Every material operating decision is evaluated against:
1. Development value
2. Recurring economics
3. National scalability
4. Data asset creation
5. Founder-dependency reduction
6. Safeguarding
7. Governance
8. Auditability

## Customer-facing operating model

RBA has four customer-facing product lines:

1. **ACADEMY** — recurring local development programmes, beginning with Sendai.
2. **DEVELOPMENT** — clinics, camps, team development and Regional Host delivery.
3. **MEMBERSHIP** — MY HOME COURT as the account/operating layer, with role-based player, family and coach development paths. D-HUB is the coach pathway inside this model, not a separate administrative stack.
4. **UNITED / GLOBAL** — a limited number of flagship domestic and international programmes.

JOURNAL, content, sponsors, partners, commerce, identity, notifications and analytics are shared platform capabilities. They are not separate founder-managed businesses.

### Legacy accounting mapping
Until the data model is migrated, the existing internal codes may remain:
ACADEMY / EVENTS / UNITED / DHUB / HOMECOURT / GLOBAL / PARTNERS.

The customer experience must not expose this internal fragmentation. Management reporting should provide both legacy-code and four-line rollups during transition.

## Founder operating rule

The founder owns only:
- development doctrine and brand principles;
- selected high-value coaching;
- major strategic partnerships and international relationships;
- final approval for material product, safety, legal, reputational or capital decisions.

The founder does **not** own routine:
- inbox triage;
- application review for standard offers;
- participant lists;
- payment checking;
- standard reminders;
- calendar coordination;
- standard quotations;
- venue follow-up;
- ordinary refunds within approved policy;
- routine website updates;
- social publishing;
- invoice/receipt chasing;
- attendance reconciliation.

**Founder speed is not a valid reason to keep a repeatable task founder-owned.**

## Default automation policy

The normal path is automated. Humans work exceptions.

A workflow may require a human decision only when one or more of the following are true:
- safeguarding or child-safety concern;
- medical/injury information requiring appropriate professional handling;
- overnight or international travel exception;
- non-standard contract, price, refund or liability term;
- capacity, identity, consent or payment data cannot be established authoritatively;
- complaint, dispute, reputational risk or material financial anomaly;
- strategic partner decision above delegated authority.

Everything else should progress from state to state without founder intervention.

## One operating system

MY HOME COURT is the operating system of record for:
- RBA ID / identity;
- role and guardian relationships;
- consent;
- applications and waitlists;
- orders, subscriptions and payment state;
- participation and check-in;
- schedules and reminders;
- player development records;
- coach development;
- safeguarding records;
- notifications;
- post-program feedback and next-step recommendations.

External forms may be temporary intake adapters. They must write into the same system of record and must not become a second database.

## Commerce

- Stripe is the target governed payment rail.
- One checkout gateway, one order model and one transaction ledger.
- Payment success is webhook-driven; redirects are not proof of payment.
- Standard eligible offers move: eligibility → capacity reservation → checkout → payment webhook → participation automatically.
- Capacity-controlled offers fail closed when authoritative capacity is unknown.
- Existing subscriptions must be detected before allowing duplicate checkout.
- Unknown prices and non-standard scopes remain inquiry-only.
- Square-based D-HUB billing is a transition dependency to retire; do not create new independent billing logic around it.

## Communications

Platform state is authoritative. Email/other channels mirror platform events.

Users should receive automatic communications for:
- account/onboarding completion;
- application receipt;
- eligibility/acceptance where rules are deterministic;
- payment required;
- payment confirmed;
- waitlist offer/expiry;
- event reminders;
- schedule/venue updates;
- pre-event checklist;
- post-event feedback;
- next relevant opportunity;
- subscription payment problems and renewal/cancellation state.

Founder communication should be exception-only.

## Management by exception

The founder should receive one concise operational digest rather than continuous operational messages.

Digest categories:
- critical safety/legal/reputational;
- payment/reconciliation exceptions;
- capacity/data-quality blocks;
- event margin exceptions;
- partner follow-up above threshold;
- founder-dependency exceptions;
- approvals waiting specifically for founder authority.

No empty digest is required.

## Founder Dependency Ratio

Founder Dependency Ratio =
founder-dependent revenue / total revenue

Additional operating measures:
- founder touches per week;
- founder routine-admin minutes per week;
- automatic order rate;
- automatic participation-confirmation rate;
- exception rate per 100 transactions;
- median time application → confirmed participation;
- unmatched payment count/age;
- unresolved critical exception age.

Target state:
- routine founder administration: <= 3 hours/week;
- standard eligible orders: >= 95% no-touch;
- standard reminders: 100% automated;
- payment reconciliation: >= 99% automatic, exceptions queued;
- founder-dependent revenue ratio: declines quarter over quarter.

## Event operating model

An event is not launch-ready until authoritative values exist for:
- owner;
- programme type;
- date/time;
- venue or approved venue status;
- capacity;
- price/payment route;
- eligibility;
- guardian/consent requirements;
- cancellation/refund policy;
- safeguarding owner/escalation;
- communications schedule.

Missing mandatory data blocks public checkout rather than creating manual founder work.

## Regional Host model

National expansion defaults to Host-led delivery.

Host owns:
- venue and local logistics;
- local recruitment where agreed;
- local day-of operations;
- locally delegated participant support.

RBA owns:
- programme standard;
- coach assignment/quality;
- governed commerce and participant record;
- safeguarding standards;
- brand;
- post-program development record.

Founder participation is optional unless the offer is explicitly sold as founder-led.

## Content operating model

One real activity should create reusable source material once. Approved derivatives can be generated for Journal, social, email and partner reporting.

Automation may draft, resize, schedule and distribute content.
A human must approve any item involving:
- minors or identifying media;
- partner logo/name/quote;
- medical/performance claim;
- contentious evidence claim;
- contractual or reputational implications.

Founder can approve doctrine-heavy content in batches, not post-by-post operations.

## Source and production control

- GitHub is the source of truth for application code and database migrations.
- main represents the intended production baseline.
- Production database schema drift must be recovered into version control before further structural production changes.
- Feature changes are developed in branches.
- Preview/testing is mandatory before production promotion.
- Direct production schema editing is emergency-only and must be recovered immediately into migration history.

## Safeguarding

Safeguarding is never delegated to unreviewed automation.

Automation may:
- collect;
- validate completeness;
- route;
- timestamp;
- remind;
- restrict access;
- preserve audit evidence.

A qualified accountable human retains decisions on actual safeguarding cases.

Required organizational controls:
- primary safeguarding officer;
- deputy/escalation route;
- reporting pathway;
- incident handling;
- access control;
- coach screening/verification;
- documented training;
- auditable actions.

## Monthly management close

Management close is generated from the operating system, not assembled manually from inboxes.

Close must cover:
- revenue;
- gross profit;
- operating profit;
- active/new/repeat customers;
- events held;
- participants;
- refunds;
- founder-dependent revenue;
- open exceptions;
- safeguarding/governance review status.

A human approves the close; the data collection and calculations are automated.

## Auditability

Material decisions, risks, production changes, monthly closes, exceptions, approvals and automation dispatches must be retained as structured evidence.
