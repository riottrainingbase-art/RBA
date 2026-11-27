# RBA shared brand colours

Use `app/rba-brand.css` as the source of truth for public and member UI. The November 27 consolidation uses deep navy (#10233F), black (#090A0B), off-white (#F8F8F5), silver (#B8BDC0), and orange (#FF6500).

- Navy: navigation, editorial text and dark panels.
- Black and off-white: neutral surfaces, apparel and photography.
- Silver: supporting details on dark panels, not small text on white.
- Orange: primary registration/checkout controls with **dark text**. Ordinary navigation remains navy or neutral.
- Blue focus ring: keyboard focus, not a campaign accent. Keep the outline visible on both light and dark surfaces.
- Preserve status indicators (success, warning, error, completed/disabled), partner logos, official artwork and event photography; do not recolour them mechanically.
- Keep payment/authentication logic and translated strings unchanged. New programme pages should reuse the functional tokens rather than introduce another accent colour.

The standalone BACKBONE and member overview retain their structure while using the shared identity. The public support page and mobile menu use the same action tokens; completed tasks and supporter review states retain separate semantic colours. The remaining legacy pages and authenticated states should be reviewed visually on the verified release preview before promotion.
