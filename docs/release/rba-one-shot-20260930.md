# RBA ONE-SHOT RELEASE CHECKLIST

Release branch: `release/rba-one-shot-20260930`
Purpose: ship the iPhone / MY HOME COURT / JOURNAL / PLUS usability work in one reviewed release.

## Release rule
- Do not promote partial fixes.
- Do not rebuild production after validation.
- Create one Preview from this release candidate.
- Validate that exact Preview.
- Promote that exact validated artifact to Production.

## P0 — must pass before Preview

Static QA gate: PASSED on GitHub Actions before this Preview checkpoint.
- [ ] Japanese HOME COURT audit passes
- [ ] No broken internal routes in changed member/JOURNAL surfaces
- [ ] Existing session bypasses login
- [ ] Signed-out member flow returns to requested destination after email login
- [ ] Terms consent appears at first setup, not every returning login
- [ ] No accidental sign-out icon in the HOME header
- [ ] Notifications and account settings are separate actions
- [ ] JOURNAL save works for signed-in RBA ID users
- [ ] Saved JOURNAL / opportunities appear in MY HOME COURT
- [ ] Passport first-record route works
- [ ] PLUS learning route opens the actual member learning library
- [ ] Free member learning opens public JOURNAL
- [ ] HOMECOURT PLUS uses the current /ja/homecourt-plus route
- [ ] WORLD YOUTH BASKETBALL MAP says 14 countries
- [ ] iPhone manifest opens /ja/my-homecourt/app
- [ ] standalone safe-area CSS is present

## Preview validation — iPhone widths
Check 320 / 375 / 390 / 430 px:
- [ ] Header does not overlap Dynamic Island / safe area
- [ ] HOME bottom navigation is fully tappable
- [ ] HOME / 探す / 記録 / 学ぶ or PLUS / 設定 are legible
- [ ] Home-screen install card does not cover primary actions
- [ ] Saved items cards fit without horizontal scroll
- [ ] JOURNAL Save / Share / Print controls fit
- [ ] Login email field and button fit without zoom or clipping
- [ ] First-time onboarding fields fit
- [ ] PLUS cards do not overwhelm the free HOME
- [ ] Public pages keep a clear one-tap return to MY HOME COURT in installed mode

## Functional flows
1. New RBA ID
   - login email -> callback -> onboarding -> HOME
2. Returning member
   - MY HOME COURT -> direct HOME without login page
3. JOURNAL save
   - article -> Save -> HOME -> 保存したもの -> article
4. First activation
   - Passport 1 record -> Save 1 item -> Read 1 JOURNAL -> starter panel disappears
5. PLUS
   - free HOME -> PLUS explanation -> current checkout route
   - active PLUS -> member learning library -> weekly tools -> report
6. Logout
   - only from Settings, then return to login
7. Installed iPhone
   - Home Screen icon -> MY HOME COURT
   - public JOURNAL -> MY HOME COURT return dock

## Production
- Promote only after every P0 and Preview item above passes.
- After promotion verify:
  - /ja
  - /ja/my-homecourt
  - /ja/my-homecourt/login
  - /ja/my-homecourt/app
  - /ja/journal
  - /ja/homecourt-plus
  - /ja/d-hub
  - /ja/opportunities
