# RBA Saga content maintenance

Last reviewed: 2026-10-04

## Canonical editable source

The public Saga page at `/ja/saga` now reads its frequently changing content from:

`content/saga.json`

Use that file for routine updates to:
- page update date;
- SEO copy;
- hero copy;
- past event history and application-record counts;
- development copy;
- the next planned/open event;
- roadmap items;
- FAQ.

For day-to-day editing instructions in Japanese, use:

`docs/RBA_SAGA_QUICK_UPDATE.md`

The page component should only be edited when layout or functionality changes.

## Public-data rules

Never publish participant names, guardian names, email addresses, phone numbers, health information, allergies, payment status, or individual application notes.

Application counts must not be presented as verified attendance unless attendance has been independently confirmed.

The current history data stores application-record counts by event. The page totals those values automatically.

## Event-status rules

The next event is controlled by `content/saga.json -> nextEvent`.

- `planned`: save-the-date only; no registration URL.
- `open`: registration is live; set `registrationUrl`.
- `closed`: registration is no longer open.

Do not publish a registration/payment link before the official event information is ready.

## 2026 year-end clinic

Current save-the-date:
- 2026-12-28
- 2026-12-29
- planned windows: 09:00–11:30 / 13:30–16:30 / 19:00–20:30

Venue, audience categories, capacity, participation fee and application method are not yet published on the Saga page.

## Editorial standard

Public-facing Japanese should sound like a coach or organizer speaking naturally to players and families, not like an internal operations memo.

Prefer:
- 「今のチームを大切にしながら」
- 「もう一つの学びへ」
- 「練習したことをゲームの中で」
- 「また佐賀で」
- 「詳しくは決まり次第お知らせします」

Avoid unnecessary internal or technical terms such as:
- 参加価値
- 外部環境
- 実装
- 転移
- 申込選手枠
- 地域ハブ
- 未算入
- データ構造

Keep necessary accuracy notes short and separate from the main story.

## Discovery paths

The Saga page should remain reachable from:
- Japanese homepage;
- Japanese development guide;
- national activity map;
- site navigation;
- sitemap.

The sitemap last-modified date for Saga is driven from `content/saga.json -> updatedAt`.
