# Taiwan clinic photo release acknowledgement — 2026-10-12

## Permission
On 2026-10-12 the RBA representative explicitly confirmed that permission has been obtained from SPARTANS Academy and the guardians of the children shown for publication of the supplied Taiwan clinic photos on the RBA official website.

**Evidence classification:** representative's attestation in the current conversation. This is not an independent review of written releases. Preserve the consent records with RBA; confirm scope for social reposts, duration and future reuse separately.

## Assets prepared for official RBA website
These are the **actual photos supplied by RBA**, not stock images, generated substitutes or photos from another event.

- `public/taiwan/2026/spartans-clinic-action.jpg`
  - SHA-256 `c4c917c9b96cb6d2929ea098416f1df3e6f11dddd01f3b69392c60a8b10a0b04`
- `public/taiwan/2026/spartans-clinic-circle.jpg`
  - SHA-256 `7517289ec525b21f738098a625ff71d918c203c1c10965363e41e8145b148008`

Both compressed files are in the locally generated `RBA_TAIWAN_実写写真_公式サイト実装パック.zip` and ready for upload. The connector available for GitHub text edits cannot directly upload binary files from this working container. **Neither image has yet been committed to this PR.**

## Release procedure
1. Upload the two original compressed JPEGs to the paths above and verify their checksums.
2. Confirm images load on a preview deployment with no broken paths.
3. Only then set `RBA_TAIWAN_MEDIA_APPROVED=true` for the preview/production deployment; the gallery is otherwise hidden.
4. Verify the actual photos display on all four localized `/taiwan/exchange` pages, on mobile and desktop.
5. Run typecheck/lint/build and test the canonical Jotform notification route.
6. Merge and promote only after production approval and legal/safeguarding checks.

No future SPARTANS hosting, co-branded event, dates or prices are promised by the photo consent confirmation.
