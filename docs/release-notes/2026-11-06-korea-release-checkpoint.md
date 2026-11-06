# Korea / Japan growth release candidate — 2026-11-06

## Reviewed scope
- New Korean basketball cooperation hub: `/ko/korea`.
- New Korean 2026 Okinawa family landing: `/ko/events/okinawa-international-camp-2026`.
- Korean homepage & programme listings route to RBA Korean pages, rather than the outdated external camp booking site.
- International Torsten 25 Nov: English lecture with Japanese consecutive interpretation, **no Korean interpretation**; LIVE and 30-day recording are separate US$29 purchases.
- Okinawa 22–24 Dec: family hotel separate; shuttle *planned, not confirmed*; parents can watch at the gym following facility rules; dates and final programme slots subject to final confirmation.
- No new payments, no changes to adult/child data collection, no marketing bulk sends.

## Quality gates
- GitHub PR #354 targets main and passed `RBA Preflight QA` (run 42174507659).
- GitHub PR #353 was squash-merged to the release candidate.
- Preview must be tested for HTTP 200, internal Korean link continuity, mobile presentation and booking-route isolation before promoting.

## Release requirement
This checkpoint is the sole explicit `[preview]` marker for the Korea bundle. It does **not** authorize any other unrelated project deployments.

## External-site consistency
`https://okinawa.camp/` has conflicting claims about shuttle availability, final-day programme and early-bird deadline. Request for corrections sent to the SPARTANS site operator (Primary Gmail SENT 1a1af868a6590b94). Do not publish this external link as the Korean signup destination until resolved.
