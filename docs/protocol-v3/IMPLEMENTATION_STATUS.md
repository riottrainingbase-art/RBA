# RBA Platform / MY HOME COURT — Protocol v3 status

Updated: 2026-09-24

## Product architecture

- RBA public site: discovery and acquisition.
- MY HOME COURT: role-aware member workspace.
- Basketball Passport: private participation, reflection, goals and media.
- MY WEEK: role-specific current actions.
- MY JOURNEY: confirmed RBA participation plus self-recorded history.
- Opportunities: canonical programme records in `components/programme-data.ts`.
- Coach Education: D-HUB weekly loop plus Torsten Loibl special session.
- Payments: existing authenticated gateway, Stripe webhook reconciliation and customer portal.

## Data ownership

| Data | Source | Access |
|---|---|---|
| Profile and role | `profiles`, `profile_roles` | owner, verified guardian, admin where defined |
| Confirmed attendance | `participations` | participant, verified guardian, admin |
| Self-recorded Passport | `homecourt_*` | owner only |
| Private media | `homecourt_media`, private Storage bucket | owner only, short-lived signed URL |
| Saves | `homecourt_saves` | owner only |
| Product activity | `analytics_events` | owner and global admin; insert only for owner |
| Applications and orders | platform application/payment tables | existing RLS and server reconciliation |

## Implemented in this release

- Role-aware first view for PLAYER, PARENT and COACH.
- MY WEEK with different actions per role.
- Coach priority for D-HUB, Torsten and Coach Education.
- MY JOURNEY combines confirmed attendance and self-recorded experience without treating self-entry as proof.
- Recommendations from the canonical programme source.
- Account-bound Save/Unsave.
- Return, save, unsave and application-open activity events.
- App-like bottom navigation: Home, Discover, Passport, Learn, Profile.
- D-HUB × Torsten learning loop on the top page and Torsten landing page.

## Safety decisions

- No automatic migration of past attendance without identity confirmation.
- No public child profile, journey or media.
- No invented capacity, popularity or remaining-seat labels.
- No live payment setting changes in this release.
- Analytics payloads contain product keys and role/locale, not free-text personal data.

## Current blockers

- Production email login/registration remains paused until an RBA sender team and SMTP delivery are configured and verified.
- Live HOMECOURT Payment Links remain inactive.
- Authenticated browser E2E cannot be completed until email delivery is restored.
- Course/session/content schemas and staff Admin OS remain future phases.
