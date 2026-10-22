# RBA × MVP coach room

Published entry: `/partners/mvp`; authenticated room: `/my-homecourt/app/mvp`.

The user's explicit confirmation establishes the concluded partnership. The recovered history and two proposal documents support the four collaboration themes: youth player development, coach education, programme planning and Japan–Malaysia exchange. The available documents are discussion drafts, not the signed final instrument. Consequently the site does not publish unverified fees, dates, visit quotas, an advisory title or guaranteed response deadlines. The coach learning room itself is provided without a subscription charge, as authorised by the user.

The existing Kuala Lumpur invitation redirects to the partner welcome page; the Penang invitation is unchanged. RBA ID redirects use a narrow allowlist and a server-verified user ID. New coaches request access. Only two verified business email identities are invited as partnership leads; one existing RBA owner membership is provisioned. Wong must confirm his own email before claiming his invitation. These rights apply only to the MVP room and do not grant site administration or paid-course access.

Membership and thread/reply access are enforced by RLS, including direct Data API calls. Managers approve/revoke access and moderate; coaches post, reply, remove their own replies and resolve/reopen their own discussions. Posts render as text. New post timestamps are database generated and insertion is throttled per user. Deleting an account removes its discussion data. Private invitation lookups use narrowly scoped internal functions; no public SECURITY DEFINER RPC is added.

Validation: `node audit/mvp-partner-room/check.mjs` tests the signup return, verified identity handoff, signed-out route and old links with mocked auth. `rls-check.sql` runs on the actual database as authenticated/anonymous roles with transaction-only fixtures, checking manager invitation, request/approval/revocation, persistence, cross-user impersonation, role/time forgery, resolved threads and account cleanup. All fixtures roll back. TypeScript, changed-file ESLint, production build and existing registration/coach learning/paid-learning checks pass. Actual email inbox delivery and authenticated browser E2E require a real account; no sign-in email was sent for testing.

Discussions refresh on demand. No email or push notifications, file uploads or video hosting are implied. Shared documents remain limited to RBA-owned prompts and links to original publishers. The unofficial JBA translation was not redistributed.
