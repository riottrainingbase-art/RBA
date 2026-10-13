# RBA Automation OS v1

## Objective

Normal RBA operations run without founder intervention. Humans handle only exceptions, safeguarding, non-standard commercial decisions and strategic work.

Architecture:

RBA ID → eligibility / guardian / consent → application → deterministic decision → capacity reservation → Stripe checkout → Stripe webhook → order + ledger + participation → reminders + preparation → check-in → attendance/history → feedback → next-step recommendation → management reporting.

MY HOME COURT is the system of record. External forms and channels are adapters.

## Core rules

1. One state, one owner. Do not maintain parallel participant or payment truth.
2. A database/payment state change triggers the next workflow.
3. Every automated action is idempotent and has a dedupe key or provider event ID.
4. Missing capacity, consent, identity or governed payment routing fails closed.
5. Missing data creates an exception for Operations; it does not become founder work.
6. Each manual gate has a reason, delegated role, SLA and audit record.
7. Messages mirror system state; messages never become the system of record.

## Identity and onboarding

Fully automate:
- account creation and login;
- preferred language/timezone;
- role selection;
- guardian-child link request;
- onboarding completion;
- notification preferences;
- terms acceptance timestamp;
- HOME COURT routing.

Human exception:
- identity mismatch;
- guardian dispute;
- duplicate-account merge;
- safeguarding-restricted account.

Founder: none.

## Standard programme application

Target normal flow:
1. Authenticated RBA ID selects participant.
2. Validate role, eligibility, guardian link and required consent.
3. Write application directly to program_applications.
4. If deterministic rules pass, advance automatically.
5. Reserve capacity atomically.
6. Checkout gateway returns governed Stripe route.
7. Payment webhook writes order, ledger, participation and expected check-in.
8. Confirmation appears in HOME COURT and external transactional notification mirrors it.

Manual review only for:
- selection-based UNITED programmes;
- scholarships;
- non-standard safety accommodation;
- age/eligibility exception;
- international/overnight travel;
- explicitly documented manual_after_application offers.

## Capacity and waitlist

Fully automate:
- capacity check;
- seat reservation;
- waitlist join;
- queue priority;
- next-seat offer;
- offer expiry;
- return to waiting/expired state;
- notification;
- audit log.

Hard rule:
No live checkout for a capacity-controlled offer without authoritative capacity.

## Payment and subscription

Fully automate:
- checkout access decision;
- Stripe routing;
- duplicate subscription prevention;
- payment success ingestion;
- transaction ledger;
- order confirmation;
- subscription entitlement;
- participation creation;
- unmatched payment queue;
- payment reminder;
- provider-driven refund ledger sync;
- billing-portal self service.

Transition:
Retire D-HUB Square as a separate recurring billing truth. New recurring membership should use the governed Stripe commerce stack. Historical Square records can remain legacy entitlement evidence until migration completes.

Human exception:
- unmatched payer after automated matching;
- dispute/chargeback;
- exceptional refund;
- reconciliation mismatch above delegated threshold.

## Event communications

Automatically generate from authoritative event state:
- application received;
- payment needed;
- payment confirmed;
- T-7 / T-3 / T-1 / day-of reminders;
- venue/time change;
- preparation checklist;
- waitlist offer/expiry;
- cancellation/refund state;
- post-event feedback;
- next relevant opportunity.

In-app notification is authoritative. Email is the default external transactional mirror.

## Attendance and post-event record

Automate:
- expected roster from confirmed participation;
- check-in state;
- verified attendance into participant history/passport;
- no-show/cancelled state;
- post-event feedback request;
- aggregate event metrics;
- next-step recommendation.

Founder: optional coaching reflection only.

## ACADEMY

Automate:
- subscription/payment state;
- roster;
- guardian visibility;
- calendar;
- attendance reminders;
- payment-problem notices;
- attendance summaries;
- development review reminders;
- member onboarding checklist.

Human:
- coaching;
- developmental judgment;
- safeguarding;
- exceptional family conversation.

Founder is not roster administrator.

## DEVELOPMENT / Regional Host / Team delivery

Use one first-party structured B2B request:
- organisation;
- objective;
- age group;
- participant estimate;
- location;
- dates;
- venue readiness;
- budget band;
- travel support;
- safeguarding/logistics;
- requested service.

Automatic qualification:
- service class;
- completeness score;
- standard/non-standard flag;
- standard scope where configured;
- next action;
- operations owner;
- follow-up due date.

Auto-proposal only when price, travel and staffing rules are deterministic.
Otherwise create an Operations exception.

Founder handles strategically important or genuinely non-standard opportunities only.

## UNITED / GLOBAL

Automate:
- interest/application;
- guardian document completeness;
- payment milestones;
- travel-document checklist;
- schedule;
- reminders;
- participant state;
- partner action list;
- post-trip reporting.

Human gates:
- player selection;
- travel/insurance responsibility;
- safeguarding approval;
- partner/contract approval;
- emergency decisions.

Founder does not own participant administration.

## D-HUB / coach pathway

D-HUB becomes the coach-development pathway inside MEMBERSHIP.

Automate:
- entitlement;
- lesson access;
- progress;
- session reminders;
- completion record;
- saved tools;
- opted-in project opportunities;
- project application state.

Human:
- educational quality;
- pedagogical feedback when valuable;
- credential/safeguarding verification for work involving minors.

## Content

Field capture → structured note → derivative drafts → approval queue → scheduled publish → analytics.

Automation can generate:
- Journal draft;
- social draft;
- email excerpt;
- metadata/SEO;
- translation draft;
- partner-report draft.

Mandatory human approval for:
- identifiable minors;
- third-party logos/quotes;
- medical claims;
- high-stakes evidence claims;
- reputational/contractual implications.

## Finance and management

Automatically calculate:
- event P&L;
- revenue/refunds;
- monthly KPIs;
- founder-dependent revenue;
- unpaid aging;
- failed webhook count;
- unmatched payments;
- capacity blocks;
- negative-margin events;
- stale partner opportunities;
- monthly-close readiness.

Human approves close and investigates material exceptions.

## Exception routing

P0 immediate:
- safety;
- security;
- legal;
- payment-system outage;
- major public incident.

P1 same business day:
- material payment mismatch;
- near-term event blocked by bad data;
- partner/contract escalation.

P2 Operations queue:
- ordinary data correction;
- failed notification;
- standard refund review.

P3 housekeeping:
- stale content;
- low-risk metadata;
- optimisation.

Founder receives:
- all P0;
- P1 explicitly tagged founder_required;
- strategic approvals.

## Founder digest

One digest rather than continuous operational interruption.

Include:
- decisions waiting specifically for founder;
- P0/P1 exceptions;
- founder-required delivery in next 14 days;
- founder-dependency trend;
- strategic partner actions;
- material reconciliation anomaly.

Do not include work Operations/system can resolve.

## Automation controls

Every automated workflow requires:
- source state;
- target state;
- idempotency/dedupe;
- audit timestamp;
- failure state;
- safe retry policy;
- exception route;
- observable count;
- recovery/rollback path.

No silent failure and no founder-as-catch-all.
