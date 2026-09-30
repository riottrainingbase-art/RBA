# RBA Platform Readiness Checklist

Branch: work/platform-foundation-20261001
Deployment: PROHIBITED until an explicit deployment request is made.

## 1. Product coherence

- [x] RBA ID first-week activation path
- [x] MY DEVELOPMENT LOOP on member home
- [x] Passport / Opportunities / Journal connected
- [x] WORLD MAP independent explorer
- [x] Partner beta public explanation
- [x] Partner beta authenticated intake
- [x] D-HUB coaching practice reflection
- [x] Private development action analytics
- [ ] Remove or consolidate older duplicated FIRST 3 UI after visual QA
- [ ] Confirm HOMECOURT / HOMECOURT PLUS naming is consistent everywhere

## 2. Database

Migrations added but NOT APPLIED:
- 20261001090000_development_platform_foundation.sql
- 20261001100000_coach_practice_loop.sql
- 20261001110000_development_action_analytics.sql
- 20261001113000_partner_beta_applications.sql

Before applying:
- [ ] Review RLS against current admin model
- [ ] Add admin-only partner review policy or server-side admin action
- [ ] Verify dhub_lessons.id type matches coach_practice_reflections.lesson_id uuid
- [ ] Verify no migration name collision in remote Supabase
- [ ] Run migration on non-production database first

## 3. WORLD MAP editorial QA

- [ ] Re-open every primary source immediately before publication
- [ ] Confirm source publication dates where placeholder month-level dates exist
- [ ] Never mark an entry verified from a secondary source alone
- [ ] Add existing Finland / Germany / Spain / France / Australia / Serbia / England / USA Journal entries to structured data only after source re-verification
- [ ] Keep fact / interpretation / Japan question visibly separate
- [ ] Add archived status when an official programme is superseded

## 4. Partner governance

Before public recruitment:
- [ ] Define reviewer(s)
- [ ] Define response SLA
- [ ] Define annual / seasonal re-verification
- [ ] Define complaint and safeguarding escalation
- [ ] Define suspension / removal rules
- [ ] Define exact permitted RBA logo wording
- [ ] Do not call the network "certified", "approved", or "safe" without a separate audited certification programme

## 5. Child safety and privacy

- [x] No public player ranking
- [x] No scouting score
- [x] No unrestricted adult/minor DM added
- [x] Coach reflection private by default
- [x] Optional anonymized-learning flag does not publish records
- [ ] Privacy review before any aggregate insights feature
- [ ] Never expose low-count aggregates that could identify a child/team

## 6. Engineering QA before preview

No preview deployment has been created.

Required locally or in CI before any preview:
- [ ] pnpm lint
- [ ] TypeScript / Next build
- [ ] npm run audit:homecourt-ja
- [ ] npm run audit:site-ja
- [ ] npm run audit:deploy-policy
- [ ] iPhone widths 320 / 375 / 390 / 430
- [ ] desktop Japanese header
- [ ] keyboard navigation for WORLD MAP filters
- [ ] authenticated / unauthenticated Partner application paths
- [ ] D-HUB access denied / active member states
- [ ] Supabase failure states

## 7. Metrics

North star:
Weekly member with >=2 distinct development action types.

Do not optimize for raw registration count alone.

Funnel:
RBA ID created
→ onboarding completed
→ first save / first learn / first reflection
→ week-2 return
→ week-4 return
→ programme participation or continued learning

Coach:
lesson opened
→ practice reflection created
→ next_change recorded
→ another reflection within 28 days

Partner:
application
→ review
→ beta collaboration
→ real joint activity
→ re-verification
