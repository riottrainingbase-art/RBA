# RBA final release checklist

Run this checklist only at an explicit release checkpoint. Normal working commits should not trigger Vercel.

## 1. Repository
- latest `main` is merged into the release branch
- `pnpm run audit:release` passes
- no public `RBA ID / ONE ID` wording remains
- no duplicate legacy routes remain in the sitemap
- PR is mergeable with no unresolved review threads

## 2. Preview build
Create one `[preview]` checkpoint on `preview-rba`.

Required:
- Vercel state = READY
- no build/type errors
- no new runtime errors

## 3. Public-site smoke test
Desktop + mobile:
- /ja
- /ja/my-homecourt
- /ja/homecourt/explore
- /ja/homecourt/match
- /ja/opportunities
- /ja/team-development
- /ja/team-visit-clinic
- /ja/d-hub
- /ja/journal
- /ja/international
- /ja/partners
- /ja/policies

Confirm:
- header has five primary entrances
- Japanese copy is natural and not duplicated
- completed events are not shown as open
- no broken CTA or 404
- redirected legacy routes land on the canonical route

## 4. HOMECOURT
- EXPLORE loads public entities
- source / operator confirmation labels render correctly
- MATCH loads only safe public exchange fields
- no minor personal contact data is exposed
- TeamJBA / federation boundary wording is visible

## 5. Authenticated MY HOME COURT
- login redirect is safe
- Development Timeline reads only the signed-in user
- claim application can be submitted
- team MATCH workspace requires entity management
- TEAM DEVELOPMENT requires team/entity management

## 6. TEAM DEVELOPMENT 90
Test one controlled team cycle:
- create cycle
- submit pre-clinic brief
- RBA adds observation
- issue TEAM DEVELOPMENT REPORT
- issue 12-week plan
- submit weekly check-in
- submit D30 / D60 / D90 review
- print/PDF report
- non-admin team manager cannot self-assign RBA partner/commercial status

## 7. SEO / language
- document language is correct for EN / JA / 繁中 / KO
- canonical URLs are correct
- hreflang exists where intended
- redirected duplicates are absent from sitemap
- login/member pages remain noindex where intended

## 8. Production
After all preview checks pass:
- merge the release PR
- create one explicit `[deploy]` production checkpoint
- verify Production READY
- verify riotbasketballacademy.com
- recheck runtime errors
