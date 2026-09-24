# RBA PLATFORM / MY HOME COURT — Product Audit
Date: 2026-09-25
Production: https://riotbasketballacademy.com/ja/
Scope: Japanese production surface + current Next.js codebase.

## Executive finding
The product foundation is already stronger than the public landing pages imply. MY HOME COURT has authenticated role-aware home logic, MY WEEK, saved items, Journey/Passport, team calendar, notifications, billing and coach workflows in code. The immediate priority is not another redesign: it is making these capabilities reachable, reliable and measurable.

## P0 / P1 findings
1. **Build boundary regression on current main** — `SiteFrame` became async and imported server-only public-content code. Because client components import `SiteFrame`, preview builds fail. Fix: move latest-update retrieval behind a route handler and render it through a client banner.
2. **Save is missing from public Opportunities** — authenticated Save exists inside HOME COURT recommendations, but the public discovery surface has no Save control. Fix implemented in this branch.
3. **Member return paths are too narrow** — login redirect allowlist did not include learning/start flows, creating avoidable post-login detours. Fix implemented.
4. **Past participant re-entry is not obvious** — Passport can store self-reported and RBA-confirmed history, but the public HOME COURT page did not expose a dedicated return path. Participant return/start pages are added in this branch.
5. **Top page is still too long** — production already contains the requested opportunity → HOME COURT → role → Torsten → D-HUB sequence, but continues into many secondary sections. Treat as a content-pruning task, not a redesign.
6. **Role pages are functional but still mostly explanatory** — PLAYER/PARENT/COACH pages route onward but do not yet behave like personalized product surfaces before sign-in.
7. **Blog/JOURNAL is not yet the requested role/theme discovery engine in production** — current main has new journal work, but production is behind main.
8. **Analytics taxonomy is incomplete** — HOME COURT was emitting generic save/unsave. This branch aligns home and opportunity save events with the requested funnel taxonomy.

## Confirmed production routes
No 404 was found in the audited primary Japanese routes:
- /
- /ja
- /ja/my-homecourt
- /ja/opportunities
- /ja/players
- /ja/families
- /ja/coaches
- /ja/d-hub
- /ja/events/torsten-loibl-online-clinic
- /ja/international
- /ja/my-homecourt/login
- /ja/payments
- /ja/home-court
- /ja/community
- /ja/platform
- /ja/impact
- /ja/united
- /ja/connect
- /ja/organizer
- /ja/contact
- /ja/policies
- /ja/schedule

## Existing LIVE product capabilities
- RBA ID email login
- Role-aware authenticated member app
- MY WEEK
- role-specific recommendations
- Save inside authenticated HOME COURT
- MY JOURNEY / Basketball Passport
- self-reported history + RBA-confirmed attendance separation
- parent-managed child records
- team schedule / attendance
- coach practice planning
- notifications
- billing / membership
- D-HUB and Torsten routes
- Opportunities filters
- Stripe-backed payment routes for configured offers

## Implemented in this branch
- Client-safe public update banner + API route
- Public Opportunities Save for authenticated RBA ID users
- Login return-path preservation for Learn / Start / Opportunities
- HOME COURT analytics: `home_view`, `return_visit`, `opportunity_save`, `opportunity_unsave`
- Past participant public return path
- First-record authenticated start page
- Mobile-first Save control styling

## Not changed in this branch
These require a separate reviewed release because they affect production architecture, identity or payments:
- authentication provider/method
- Supabase schema/RLS
- Stripe products/prices/webhooks
- user deletion/migration
- production domain promotion
- large-scale top-page content removal

## Next build tranche
1. Role-aware onboarding: Role + safe age/child context + Region + Interests without storing a child's data on a parent's profile.
2. Universal search across Events / Articles / Videos / Programs / D-HUB / Torsten / International.
3. Blog role/theme/series taxonomy and article-end contextual recommendations.
4. Event lifecycle state automation and post-payment attendance/passport pipeline.
5. Analytics funnel dashboard for registration, first save, first content, first opportunity, application, 7-day and 30-day return.
6. MY MAP after participation data quality is high enough to avoid decorative/fake geography.
