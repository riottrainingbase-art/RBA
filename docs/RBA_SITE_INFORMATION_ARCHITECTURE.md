# RBA Website Information Architecture

## Purpose

The Japanese RBA website must help a first-time visitor answer two questions immediately:

1. Who am I?
2. What do I want to do next?

Visitors should not need to understand internal product names before choosing a route.

## Primary Japanese journeys

These are the canonical public entry routes.

| User intent | Canonical route | Primary CTA |
| --- | --- | --- |
| Join an activity | /ja/opportunities | 活動を探す |
| Learn about development | /ja/development | 育成ガイド |
| Keep records / continue with RBA | /ja/my-homecourt | MY HOME COURT |
| Coach learning | /ja/coaches | 指導者の方へ |
| Team / organiser support | /ja/organizer | チーム・団体 |
| International exchange | /ja/international | 海外交流 |
| Trust / organisation information | /ja/about | RBAについて |
| General fallback contact | /ja/contact | お問い合わせ |

## Homepage order

The Japanese homepage should preserve this order unless there is a documented reason to change it:

1. Hero — what RBA is
2. Four role-based doors
   - 選手・保護者
   - 指導者
   - チーム・団体
   - 海外・連携
3. Search by age / region / purpose
4. Current open programmes
5. MY HOME COURT
6. Development Guide
7. Current priority learning campaign, when appropriate
8. RBA development position
9. Verifiable activity footprint / trust
10. Final action
   - 活動を探す
   - RBAに相談する

Do not add a new large homepage section merely because a new product exists. Products should normally live behind one of the primary journeys.

## Product hierarchy

### RBA ID
Account identity. Free when registration is available.

### MY HOME COURT
The personal home for activity discovery, saved items, participation history, reflection and next actions.

### HOMECOURT PLUS
Optional paid layer for deeper learning, planning, reflection and development tools. It is not a separate top-level navigation destination.

### D-HUB
Ongoing development programme. Coach learning is primarily entered through /ja/coaches. Player D-HUB content is a separate programme route, not a homepage-level product category.

### Development Camp
Learning-focused camp. Discover through OPPORTUNITIES or the player route.

### RBA UNITED
Time-limited team for tournaments, trips or exchanges. Discover through OPPORTUNITIES or MY HOME COURT.

### TEAM / ORGANIZER
All Japanese team, host and organiser needs enter through /ja/organizer, then branch to team support, visit training, local hosting or event/business collaboration.

## Canonical redirects

The following Japanese routes are legacy or duplicate public entry points and must resolve to the canonical route:

- /ja/schedule -> /ja/opportunities
- /ja/home-court -> /ja/my-homecourt
- /ja/team -> /ja/organizer
- /ja/work-with-rba -> /ja/organizer

Do not reintroduce these legacy routes into Japanese primary navigation, homepage CTAs or sitemap discovery.

## Single source of truth

### Programmes
components/programme-data.ts is the canonical source for programme:
- dates
- active / closed state
- audience
- region
- price display
- application URL
- pathway

Use isProgrammeActive() for every public open-programme list. Do not implement a second date comparison.

### Member availability
RBA_AUTH_EMAIL_READY controls whether public registration/login CTAs are presented as available.

When false:
- do not promise immediate RBA ID creation
- use MY HOME COURT information or registration-reopening messaging
- do not route a signed-out save action to a dead login flow

### Organisation proof
Numbers such as participant reach and activity locations must use a defined, supportable metric. Do not mix unique people and cumulative participation.

## CTA rules

Each major screen should have at most two visually dominant next actions.

Preferred hierarchy:

1. The user's main task
2. MY HOME COURT or relevant consultation route

WhatsApp, LINE, policies, social links and secondary resources should not compete visually with the primary task.

Use action language:
- 活動を探す
- 募集中を見る
- 詳細・申込を見る
- MY HOME COURTを見る
- チーム・団体向けを見る
- 海外交流を相談する

Avoid requiring users to understand internal labels before they can act.

## Mobile rules

- Keep the header visually light.
- Language switching lives inside the mobile menu.
- Japanese mobile users retain two persistent core actions:
  - MY HOME COURT
  - 活動を探す
- WhatsApp remains available from Contact/footer instead of competing with core navigation.
- On OPPORTUNITIES, filters and results appear before explanatory content.

## Content ownership

- JOURNAL = knowledge and evidence
- DEVELOPMENT GUIDE = problem/topic discovery
- OPPORTUNITIES = current actionable programmes
- MY HOME COURT = personal continuity
- COACHES = coach learning entry
- ORGANIZER = team / host / organiser entry
- INTERNATIONAL = Japan × Asia exchange entry
- ABOUT = trust, mission, evidence and operating principles
- CONTACT = fallback when no dedicated route fits

## Navigation regression checks

Before release, verify:

- No Japanese homepage CTA points to /ja/schedule, /ja/home-court, /ja/team or /ja/work-with-rba.
- Current programme lists all use isProgrammeActive().
- RBA ID copy matches RBA_AUTH_EMAIL_READY.
- The Japanese homepage still exposes the four role-based doors.
- Mobile navigation includes clear groups and language switching.
- OPPORTUNITIES shows filters and results before long explanations.
- Static and React-based pages use the same canonical destinations.
