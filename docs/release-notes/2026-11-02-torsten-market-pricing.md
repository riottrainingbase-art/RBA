# Torsten Loibl Online Clinic Vol.2 — pricing and registration routes (2026-11-02)

- **Japan:** LIVE JPY 3,300 (tax included); 30-day recording JPY 4,400 (tax included). Use the existing Japanese Google Form and its post-submission payment path.
- **International:** LIVE USD 29; 30-day recording USD 29. Use the existing direct USD Stripe checkout via `/events/torsten-loibl-online-clinic#register`, without the Japanese Google Form.
- Existing international Stripe payment links were checked as active on the RBA live Stripe account. They were not created or modified as part of this release.
- English, Traditional Chinese and Korean public entrypoints lead to the international USD checkout, with a Japan JPY route available. The Japanese page remains on its original domestic payment flow.
- The user explicitly clarified that international and Japanese pricing are different. Do not globally convert or equalize them.
- Source PRs: #294 (corrected `main`) and #295 (released to `preview-rba`).

## 2 November 2026 — Verified speaker credentials
- WABC President Patrick Hunt's signed letter dated 22 October 2026 grants Torsten Loibl **FIBA WABC Level 3 Coach Instructor Status** through Recognition of Prior Learning (RPL), alongside Instructor for Coach Instructors and Basketball Knowledge Module FRIP Courses statuses. This does not imply passing an examination or completing a Level 3 course.
- Levanga Hokkaido officially confirms Torsten Loibl as Head Coach for its 2026–27 B.LEAGUE PREMIER season. The biographical reference does not imply the club sponsors or endorses RBA's independent event.
- Do not publish the private credential letter or contact details; public pages cite only its date and grant, along with public official coaching records.
