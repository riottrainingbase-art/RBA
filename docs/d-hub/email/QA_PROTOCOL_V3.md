# D-HUB COACH LAB — v3 Test & Release Protocol

## Per-message tests
1. Verify `lang=ja`, exactly one H1, numbered H2 sections, official logo URL with alt text, and short hidden preheader.
2. Verify subjects and preheaders match the updated message, and body contains no draft placeholders, broken characters, invented source details, or private participant data.
3. Verify only the approved member-home, official coach program, contact, and verified public-source links.
4. Verify both HTML and plain-text copies contain the same complete editorial information.
5. Verify email is below Gmail's clipping threshold and contains no scripts, forms, unsafe third-party trackers, or font files.
6. Render each design at 280, 320, 360, 390, 430, 620, 760, and 1024 pixels. Test dark color scheme and blocked image. Check horizontal overflow and readable header, line breaks, body, and CTA.
7. Before sending, inspect the saved Gmail draft and confirm the current list of eligible paid COACH LAB members. Do not reuse membership lists for D-HUB PLAYERS or general RBA promotions.
8. Search prior sends for an identical/similar subject, especially the previously sent Torsten explainer, and do not resend identical material.
9. Verify copyright/permissions for any attached source documents. Original interpretation and references are preferable to unauthorized copies.
10. Only a separate authorized send followed by sent-item confirmation counts as delivery; an open PR, draft, or template does not.

## v3 local QA (2026-11-08)
- 4 message types; 4 HTML + 4 synchronized TXT.
- 4 × (8 widths + dark mode + images blocked) = **40 Chromium conditions**; horizontal overflow **0**.
- Text contrast (WCAG-style): `#62686C` on white **5.65:1**, on paper **5.09:1**. White on ink **19.81:1**.
- Torsten message contains source page references and distinguishes independently available WABC/JBA reading resources.
- Chromium preview uses a labeled placeholder where the real remote RBA logo would load; production HTML references the correct URL.
- Still needs live-client/dark-mode testing, current member verification, current login check, and final editorial review before any new real send.

**Operations:** Updating this document or the approved draft PR does not change production pages, mail subscriptions, payment systems, or send any user email.
