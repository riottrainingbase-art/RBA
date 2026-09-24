# Data and automation

## Current lifecycle

Programme record → public cards/search → MY HOME COURT recommendation → Save → application/payment route → webhook reconciliation → confirmed attendance → Passport/Journey → next recommendation.

## Current single sources

- Public programmes and Torsten session: `components/programme-data.ts`.
- Payment options: `components/payment-data.ts` and verified gateway routing.
- D-HUB public explanation: locale-specific D-HUB page content.
- Member experience: authenticated Supabase data plus the canonical programme source.

## Event taxonomy

`analytics_events.event_name` accepts: `view`, `search`, `save`, `unsave`, `apply_open`, `learn_open`, `return_visit`.

The first live instrumentation records `return_visit`, `save`, `unsave`, and `apply_open`. Search and learning completion require the next instrumentation release.

## Next schema phase

Create normalized `content`, `courses`, `course_sessions`, `learning_history`, `recommendations`, and organizer publishing workflow only after staff operations and migration rules are approved. Torsten and D-HUB should then be stored as Program/Course/Session records and rendered from that source.
