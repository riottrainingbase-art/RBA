# RBA TAIWAN — Official site integration release checklist (2026-10-12)

## Changes implemented in PR #133
- 4-language `/taiwan` hub and `/taiwan/exchange` pages in the existing RBA Next.js app.
- Global header/menu/footer now expose team exchange links in each language.
- International platform links directly to the team exchange enquiry page.
- Sitemap includes all localized Taiwan hub and exchange URLs.
- Team exchange landing shows evidence-based SPARTANS Academy clinic history, sample learning activities and both directions (Japan → Taiwan / Taiwan → Japan).
- The existing official Jotform is the only enquiry endpoint; the optional exchange direction selector has been added and verified enabled.
- Original October 2026 Taiwan clinic photos are wired into a responsive Next.js gallery, **but the gallery is disabled by default** until rights and file upload are complete.

## Image assets to be uploaded to repository
Two compressed original images prepared locally in release ZIP `RBA_TAIWAN_公式HP写真統合素材_20261012.zip`:
- `public/taiwan/2026/spartans-clinic-action.jpg`
- `public/taiwan/2026/spartans-clinic-circle.jpg`

The images must be uploaded to the RBA repo via an authorized file upload path. The GitHub connector in this workflow only accepts text for file writes, and does not upload local binary files; do not claim the images are already in the repo. Verify guardian/host media consent before upload/publication.

## Publication gate
1. Confirm photo/video rights, safeguarding and SPARTANS attribution permission.
2. Upload the two images to exact paths and verify GET 200 after deployment.
3. Set `RBA_TAIWAN_MEDIA_APPROVED=true` in the intended deployment environment only after consent; otherwise leave false/unset (gallery hidden).
4. Run Next.js typecheck/lint/build, mobile layout and keyboard/ARIA QA.
5. Submit one authorized test enquiry and verify notification routing, privacy text, adult consent, and Taiwan-direction classification. Do not use real child data.
6. Confirm the operator / licensed travel provider for any regulated travel services before accepting travel-package fees.
7. Merge PR #133 and deploy to the existing RBA official domain only after all checks pass.
8. Verify `/ja/taiwan`, `/zh-tw/taiwan`, `/ja/taiwan/exchange`, `/zh-tw/taiwan/exchange`, `/sitemap.xml` and the real enquiry button.
9. Publish co-marketing posts only after Elton/SPARTANS approval; no unconfirmed event dates, prices, venue or team acceptance.
10. Record actual Taiwan sessions, qualified adult team enquiries, calls, signed scopes and payments separately; no invented conversion numbers.

## Marketing handoff
Existing draft posts: `docs/taiwan-japan-two-way-team-exchange-launch-2026-10-12.md`, `docs/taiwan-spartans-experience-campaign-2026-10-12.md`.
Current SPARTANS co-post email is a Gmail **draft only**, not sent.
Metricool has no connected social account; no social posts have been published through it.

## Release ownership
Masato Nishio: partner permission, commercial/operational scope and publish approval.
RBA web operator: binary image upload, environment flag, production deploy, SEO and form verification.
SPARTANS/Elton: approve named co-marketing and clarify whether future hosting is offered; no future commitment implied.

Status: code integrated on PR branch; production deployment and photo upload NOT COMPLETE.
