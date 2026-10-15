# JPNentry site — editing and deployment guide

This directory is the independently deployed public JPNentry website. It is hosted as the Vercel project `jpnentry-official` (project ID `prj_3maRGqNxkOpOt2MWK1KdeU9WZ1mg`) from the GitHub repository `riottrainingbase-art/RBA`, root directory `jpnentry-site`. The live website is https://www.jpnentry.com/.

## Rules for updates requested in ChatGPT

- Preserve `jpnentry.com` and `www.jpnentry.com`. Do not alter domain, MX, SPF, or registrar without an explicit request. Site DNS is managed by Wix; website hosting is Vercel.
- The official displayed commercial contact is `jpnentry.sales@gmail.com`. Never restore the prior `riot.training.base@gmail.com` in public content.
- The primary nonbinding buyer RFQ form is https://form.jotform.com/262542049350049. Form titles, questions, notifications and submissions are managed in Jotform separately; do not assume the published website edits its configuration.
- Primary buyer categories: exact genuine/OEM automotive spare parts, industrial automation and obsolete components, and legally permissible buyer-backed vehicle sourcing. Do not imply ready stock, promised price/lead time, completed transactions, Toyota manufacturer authorization, or unrestricted new-vehicle import permissions.
- Reflect that JPNentry is operated by Masato Nishio as a Japanese sole proprietor; Kobe automotive sourcing partners do not imply manufacturer franchise or dealership authorization.
- Preserve all legacy published post routes `/post/<slug>`. Their 144 article texts and metadata are stored under `data/posts-*.json`; not all original Wix rich content formatting survived extraction. Do not drop or silently overwrite existing article content.
- Preserve existing legal terms and privacy commitments unless the user requests specific changes or a reviewed legal update; avoid inventing legal guarantees.
- Accessible responsive design, correct Japanese copy, English B2B conversion, and accurate multilingual language tags are important.
- Maintain the current inquiry-first / quote-or-no-go / buyer-approval process. No order or payment is created by submitting the initial RFQ.

## Technical layout

- `build.cjs`: baseline site, core pages, historical Wix blog posts.
- `enhance.cjs`: enriched landing pages, translations, SEO metadata, historical blog indexes and conversion pages.
- `style.css` and `extra.css`: desktop and mobile styling.
- `app.js`: accessible menu, language dropdown behavior and searchable blog listing.
- `audit.cjs`: fail-closed quality checks for broken internal links, one H1/page, canonical and titles, 180-route sitemap, contact email.
- `package.json`: `npm run build` generates `dist` and runs validation.
- `vercel.json`: routing and response-header configuration.

## Release workflow

1. Inspect the live page and the exact source file first.
2. Make the smallest suitable change in the `jpnentry-site` folder; avoid editing RBA's other pages.
3. Run `npm run build` or inspect the new Vercel deployment build logs.
4. Confirm the Vercel deployment is READY, with the quality gate reporting 0 broken local links.
5. Check the changed public URL, navigation, RFQ button, contact email and mobile layout as practical.
6. Do not claim live publication if the deployment has failed or remains pending.

## Existing language entries

- `/` English
- `/ja` Japanese and selected `/ja/... ` service pages
- `/ms` Malay
- `/id` Indonesian
- `/zh-cn` Simplified Chinese
- `/zh-tw` Traditional Chinese

Other country/industry landing pages and older Wix-hosted language subdomains may require deliberate localization and SEO reviews. Review live redirects before changing any DNS record.

## Commercial priorities

- High-quality B2B buyer RFQs from Malaysia for Japanese car parts and commercial vehicles.
- Export-compliant buyer-backed vehicle sourcing in permitted destinations.
- Exact industrial MPN procurement for overseas workshops and factories.
- One reliable RFQ and commercial result matters more than fabricated inventory or vanity statistics.
