# RBA Saga regional hub — content maintenance

Last reviewed: 2026-10-04

## Purpose

`/ja/saga` is the long-lived regional hub for Riot Basketball Academy activities in Saga.

It is not:
- a permanent team registration page;
- a permanent school timetable;
- a claim that every listed applicant attended;
- a replacement for each event's official registration page.

The regional hub should explain the accumulated activity, RBA's development approach, the next planned opportunity, and the path to current official information.

## Public-data rules

Never publish participant names, guardian names, email addresses, phone numbers, health information, allergies, payment status, or individual application notes from registration sources.

Public counts must be conservative.

For the current page, "100+" means the sum of unique player-name records within each of four event application periods after obvious duplicate submissions inside the same event were consolidated. It is an application-slot figure, not verified attendance or paid participation.

Current event-level application-slot counts used by the page:
- 2025 Sep: 22
- 2026 Jan: 28
- 2026 Jul: 42
- 2026 Oct: 17

Do not silently change the wording from "application / entry" to "participants" unless attendance has been independently verified.

## Event-status rules

Use these states consistently:

1. **Planned**
   - A date/time may be shown as "予定".
   - Do not expose payment or application CTAs unless the event is actually open.
   - Clearly state which details are still unconfirmed.

2. **Open**
   - The official event page becomes the source of truth for date, venue, audience, capacity, price, cancellation terms and payment.
   - The Saga hub may link to the official page, but should not duplicate volatile details unless kept in sync.

3. **Completed**
   - Remove or disable obsolete payment/application CTAs.
   - Move the event into the history section.
   - Describe what was designed or offered; avoid claiming attendance numbers without verification.

4. **Cancelled / changed**
   - Update the regional hub immediately if the page currently promotes the event.
   - The official event notice remains the source of truth.

## 2026 year-end clinic

Current public save-the-date:
- 2026-12-28
- 2026-12-29
- planned windows on both days: 09:00–11:30 / 13:30–16:30 / 19:00–20:30

As of 2026-10-04, venue, audience categories, capacity, participation fee and application method are not confirmed on the regional hub.

When these are confirmed:
- create or designate one official registration/detail page;
- update `/ja/saga` to point to it;
- update `app/sitemap.ts` lastModified;
- update the Saga entry in `components/network-maps.tsx`;
- check the homepage regional link;
- verify mobile layout and all CTAs;
- run RBA Preflight QA before merge.

## Editorial standard

Preferred language:
- "育成機会"
- "所属を変えずに参加できる"
- "見る・考える・選ぶ・実行する"
- "基礎 → 小局面 → ゲームへの転移"
- "現代のゲームから逆算する"
- "申込記録" when the source is an application form

Avoid:
- unsupported superlatives;
- implying a permanent local club when none exists;
- "参加者○名" when only application records are known;
- promising future programmes before venue/operations are confirmed;
- language that attacks local teams or coaches.

## Discovery paths

The Saga hub should remain discoverable from:
- Japanese full navigation/footer;
- Japanese homepage field footprint;
- Japanese development guide;
- Japan network map (Saga location);
- sitemap.

Future regional hubs should reuse the same trust model rather than copying volatile event pages.
