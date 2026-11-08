# D-HUB COACH LAB — Email & Editorial Standard v3.0

**Applies to:** paid COACH LAB members only. Does not include D-HUB PLAYERS, Torsten one-off buyers, club contacts, or general marketing leads.

**Source:** RBA site `app/globals.css`, member page `/ja/d-hub/coaches/member`. This file supersedes the earlier v2 email design draft.

## Fixed design tokens
| Token | Value |
|---|---|
| Ink | `#090A0B` |
| Page | `#F3F3F1` |
| Surface | `#FFFFFF` |
| Rule | `#C7C9C7` |
| Muted | `#62686C` |
| Font | `Arial, Helvetica, Hiragino Sans, Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, sans-serif` |
| Body | 16px / 1.85 line-height |
| H1 | 30px desktop / 27px mobile, 1.4 line-height |
| H2 | 20px / 1.52 line-height |
| Container | single column, 620px max |
| CTA | one black button to `https://riotbasketballacademy.com/ja/d-hub/coaches/member` |
| Logo | `https://riotbasketballacademy.com/rba-logo-original.jpg` |

Use the official logo URL only. A blocked image must not hide the nearby textual brand name. Avoid colored promotional banners, decorative emoji, tracking pixels, gradients, custom font downloads, or automatic advertisements.

## Editorial model
**Evidence → interpretation → one practice → review.**
Begin: 「会員の皆さま、いつもありがとうございます。RBAの西尾です。」
Write natural です・ます Japanese. Keep one point per paragraph and describe a concrete practice situation. Do not present a proposal by RBA as a conclusion by a lecture author. Avoid unverified `世界基準`, `絶対`, `唯一`, or exaggerated product language.

**WEEKLY LETTER:** one topic, one practice change, one question.
**COACH NOTE:** source page citations, limits, RBA application, practical example.
**RESEARCH NOTE:** population, method, findings, uncertainty, limitations, citation/DOI, practice.
**MEMBER UPDATE:** confirmed change, effective date, audience, required member action.

Source notation for the Torsten example:
- A — Torsten Loibl, `Prepare players for the future game`, RBA seminar materials from 2026-08-14 (29 pp., not publicly distributable).
- B — Torsten Loibl, `Skill Development Concept – Learning Ages / Learning Age Diary`, RBA-provided material; publication year unconfirmed.
- C — Riot Basketball Academy, `RBA Development Curriculum` v1.0 (2026-08, own interpretation).
- Related, independently available: FIBA/WABC Manuals `https://about.fiba.basketball/en/wabc-documents`; JBA teaching materials `https://www.japanbasketball.jp/training/documents/`; JBA youth materials `https://www.japanbasketball.jp/training/youthacademy/documents/`.

Related public resources must not be described as endorsement, accreditation, or direct source of the private lecture.

## Quality gate
- Use RBA's Primary Gmail and the list of **current paid COACH LAB members**. Independently check paid access, opt-out and sent history before each send.
- **Already sent:** A substantially similar Torsten lecture explainer was mailed to eleven existing COACH LAB members on 2026-11-08. Do not resend it.
- Citation permission is required before redistributing actual lecture slides, photos, or recordings.
- If placeholders remain, DO NOT SEND.
- A saved draft is not a sent message. Creating a template must never modify subscriptions or payments.
- Recheck actual member-login and external-reference links before live sending.
- Final real-client check: Gmail web/iOS, Apple Mail, Outlook including dark mode. Browser emulation alone does not verify native clients.

## Current implementation
The fully editable v3 package provides `config.json`, structured `content/letters.json`, synchronized HTML/plain text generation, 4 variants, browser width/blocked-image checks, and QA reports. The editable package is the production editing reference; this repository document records the invariant policy for reviewers. No production deployment is initiated by updating this file.
