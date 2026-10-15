# JPNentry website — ChatGPT-editable source

This folder is an isolated JPNentry site inside the user's existing GitHub repository. It is built and deployed on Vercel independently of RBA.

## Editing via ChatGPT

Ask ChatGPT to change JPNentry pages, headings, services, colors, legal texts or new buyer guides. The source files are `build.cjs` (copy, pages and static generation), `style.css` (visual system), `app.js` (interactions), and `data/posts-*.json` (144 articles exported from the user's Wix site).

Changes committed to `main` can trigger the linked Vercel project's automatic deployment. Always verify the site and keep the original custom domain on Wix until the new site passes URL/content/form tests.

## Features
- Home, JA, ZH-CN entry pages
- Automotive parts, vehicles and industrial sourcing landing pages
- Existing Jotform RFQ endpoint `https://form.jotform.com/262542049350049`
- Legal terms, trust center, sample article
- 144 migrated published posts at original `/post/<slug>` URLs
- Searchable archive and sitemap
- Public contact `jpnentry.sales@gmail.com`

## Build
`npm run build` creates `dist`. The Vercel project root directory is `jpnentry-site` with output directory `dist`.

## No premature domain cutover
The registered domain `jpnentry.com` must remain on its current Wix host until functionality, existing blog URLs, translations, business/legal copy, and existing form submissions are checked on Vercel. Preserve DNS email records and domain ownership.
