# JPNentry — ChatGPT-managed official website

**Production:** https://www.jpnentry.com/  
**Vercel project:** `jpnentry-official`  
**GitHub:** `riottrainingbase-art/RBA` → `jpnentry-site/`  
**Business contact:** `jpnentry.sales@gmail.com`  
**RFQ:** https://form.jotform.com/262542049350049

JPNentry's site is isolated from the RBA site in the same repository. The `www.jpnentry.com` and `jpnentry.com` domains point to the Vercel project. **Domain registration and DNS management remain with Wix**; the transfer to Vercel was a hosting/DNS change, not a domain ownership transfer. Preserve Google MX, SPF and other unrelated DNS records when making changes.

## How to update with ChatGPT

Ask for a change to the JPNentry website with exact page/topic details. ChatGPT can use the connected GitHub and Vercel tools to modify only `jpnentry-site/`, build a preview, run QA, merge reviewed changes and verify the production deployment. Source control provides an audit trail and rollback capability.

| Source | Role |
|---|---|
| `build.cjs` | Original sitemap, 144 migrated articles, core corporate pages |
| `enhance.cjs` | Trust, FAQ, localizations, industry pages and SEO basics |
| `growth.cjs` | Additional local-language pages, practical RFQ guides, blog discovery |
| `finalize.cjs` | Global buyers / Japan suppliers partnership funnel, branded 404, CSS bundling |
| `app.js` | Accessible mobile navigation, language choice, article filters and RFQ copy buttons |
| `style.css`, `extra.css`, `premium.css`, `growth.css` | Source CSS components; built together into one `dist/theme.css` for production |
| `data/posts-*.json` | One-time archive export from the legacy Wix blog (144 posts) |
| `audit.cjs` | Release-blocking QA checks for email, HTML, internal links, localized routes, asset bundle and indexable sitemap |

Do **not** edit `dist/` directly; it is generated. Use `npm run build` to create it and run the QA suite. The Vercel project root directory is `jpnentry-site` with output directory `dist`.

## Public buyer journeys

- Home → Japan sourcing categories and international buyer/supplier introductions.
- `/automotive`, `/industrial`, `/vehicles` → exact requirements and quote/no-go commercial steps.
- `/malaysia` and `/ms/automotive` → Malaysia-oriented automotive parts enquiries.
- `/rfq` → buyer checklist, copyable buying brief and current external Jotform.
- `/partners` → overseas wholesale buyers and genuine Japan-based suppliers.
- `/contact`, `/trust`, `/faq`, `/legal` → contact and independent business verification.
- `/blog`, `/blog/categories/*`, `/post/<existing-slug>` → archived articles and guides.
- `/404.html` → branded, noindex error fallback.

The site has English, Japanese, Malay, Indonesian, simplified and traditional Chinese landing pages. Some historic articles and legal documents remain in their original published languages; do not claim every page is fully translated.

## Mandatory release checklist

1. Verify the intended production project and GitHub branch.
2. Do not imply manufacturer dealer authorization, confirmed stock, shipment lead time or Malaysian Toyota new-CBU import permission without documentary evidence.
3. Do not invent transactions or promote live RFQs as completed sales.
4. Run `npm run build`; ensure the audit reports **zero broken internal links** and the sitemap excludes the noindex 404.
5. Review the mobile header and RFQ buttons, existing Jotform URL, official email, SEO canonicals and a sample archived article.
6. Deploy a preview, inspect logs, then merge to production only after tests pass.
7. Verify the production custom domain `www.jpnentry.com`, homepage, /rfq, /partners, /blog and Jotform link.
8. If an unexpected regression affects forms or publishing, revert via Git/Vercel instead of altering unrelated DNS.

## Buyer and supplier information

JPNentry is operated by Masato Nishio as a sole proprietor in Japan and is an independent sourcing and verification service. The website must never claim to be a Toyota/Lexus authorized dealership or to possess ready-to-export inventory that has not been verified. A buyer's initial RFQ is non-binding and procurement begins only following the agreed written conditions and confirmed payment.

### Current limitations

- The existing Jotform continues to host and process RFQ entries externally; the public site does **not** save RFQ submissions itself.
- The 144 Wix-origin blog posts were migrated as readable text, which may not preserve every old image/layout element. Review case studies before citing them.
- Native mobile viewport visual QA should be checked after design changes in a browser capable of emulating a phone screen.
- DNS email and legacy language subdomains remain under Wix DNS and must not be deleted casually.
