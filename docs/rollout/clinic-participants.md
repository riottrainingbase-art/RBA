# Clinic participant rollout — 2026-09-24

## User flow

- `/ja/my-homecourt/participants`: public participant entry, official logo, short instructions.
- `/ja/my-homecourt/app/start`: authenticated direct Passport entry; existing email login preserves this destination.
- Existing private person/history/check-in/goal/media tools are reused. No automatic paid subscription or role assignment.
- Parents select and maintain separate child records within their account. These are not automatic cross-account guardian links.
- Self-reported history is distinct from verified attendance. A contact match never establishes attendance or guardian identity.

## Source audit (private records stay outside Git)

- 39 response sheets inspected; 860 distinct syntactically valid contact addresses across collected and manually entered email columns. These may include multiple addresses for one household and duplicates of response sheets; not a participant count.
- 9 nonempty email cells need manual correction. No guessed corrections made.
- Existing launch campaign: 338 distinct recipients, 61 with repeated messages. Sending is not proof of delivery.
- 264 contact addresses match the audited campaign; 596 were not found in it. These are review candidates, not a ready-to-send list.
- `participant_rollout_delivery_audit`: hashed recipients + source message IDs for duplicate prevention.
- `participant_rollout_candidates`: hashed contacts + exact sheet/row/column references. Service-role only, RLS enabled; no direct member access. Hashes remain personal data.
- Existing applications and verified attendance were not generated from these sheets. No accounts or subscriptions were created.

## Completion gates for the next outreach batch

1. Verify source event dates and attended/cancelled status; sheet titles or response timestamps alone do not prove attendance.
2. Choose intended guardian/contact address when collected and entered addresses differ.
3. Check opt-outs, bounces and the existing MailerLite permission record noted in the operations sheet.
4. Exclude sent recipients and currently pending sends; preview exact subject/body and destinations.
5. Verify new email login and private image/video upload on a test account before promising full availability to a cohort.
6. Send once per eligible contact; record provider IDs and status. Do not mark delivered or registered from send success.

No new invitation batch was sent in this release. A full all-participant rollout is not yet complete.
