# RBA Taiwan official release — 2026-10-13

## Public status
- Official domains: https://riotbasketballacademy.com and https://www.riotbasketballacademy.com
- Taiwan overview: /taiwan, /ja/taiwan, /zh-tw/taiwan, /ko/taiwan
- Team exchange: the same paths with /exchange
- Published Vercel deployment: dpl_BeS39AuMRrzPQaRHbDzLooHFA8SY
- Both official aliases confirmed assigned to this deployment.
- All eight Taiwan routes and root, /ja, /ja/my-homecourt, /ja/opportunities and /ja/international returned HTTP 200 after release.

## Source and release protection
- GitHub PR #140 merged the eight routes, shared components, international-page link and sitemap entries to main. Preflight QA succeeded.
- The actual live production alias before this release pointed to deployment dpl_5dfghhAmmKC1zuQpnrjrjAYtXG1e (commit c20a30e60ada11c52b3847e1667d541e46ec4fda), not the latest deployment with target=production.
- To avoid regressing the 26 live changes after the older production-tagged deployment, the published candidate was built from that **actual live commit**, plus only Taiwan-specific changes (14 files, including a release-branch-only Vercel manual build override).
- The live-baseline release branch is release/taiwan-current-live-20261013 at commit 621728433b18c84678e58ca0210aab87e261ac61.
- The release branch's vercel.json override was used solely to permit a manual build; **do not merge this override into main**. Main retains the standard deployment policy.
- Vercel promote API returned HTTP 422 for an earlier candidate. The official apex and www aliases were therefore assigned directly to the tested READY deployment.

## Rollback
If regression is discovered, reassign both official aliases to dpl_5dfghhAmmKC1zuQpnrjrjAYtXG1e and verify critical routes. Do not delete that rollback deployment.

## Follow-up
- Reconcile the 26 live-only commits into main before the next regular production release, without discarding main-only changes.
- Verify form notification delivery with a controlled test submission; Jotform is enabled, but no test was sent.
- Obtain and upload actual authorized Taiwan photo assets before enabling a native gallery. Current page uses SPARTANS official links and the original RBA Instagram post.
- Check mobile real-device layout and external SEO indexing.
- Future dates, fees, host arrangements and registrations remain unconfirmed. No bookings or payments are taken on Taiwan pages.
