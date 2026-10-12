# Taiwan exchange preview checkpoint — 2026-10-12

## Included in the current RBA preview branch
- PR #136 merged as b3c348fa6faa2ad228d234d7bdc8a187e29e327d.
- Four-language Taiwan hub and two-way team exchange enquiry pages.
- Official navigation, international page CTA, sitemap and canonical Jotform link.
- SPARTANS Academy October 2026 clinic described as past collaboration; future hosting, dates, fees and packages not confirmed.
- Real-photo gallery remains OFF by default, because binary originals are not in the repository. RBA representative has confirmed photo publication permission; the files must still be uploaded before activation.

## QA status at checkpoint
- Taiwan Preview Static QA #2: PASS (TypeScript, ESLint, deployment policy).
- RBA Preflight QA #579: FAIL in site Japanese regression audit, with pre-existing issues in localized-home, opportunity-explorer, programme-data, localized-policies and definitive-content unrelated to Taiwan files.
- Do not claim full site-wide QA pass.
- Jotform notifications and production end-to-end flow have not been tested.

## Release scope
This is a PREVIEW ONLY checkpoint under the established RBA single-preview deployment policy. Do not promote to production without verifying preview rendering, required consent, form delivery and resolving or explicitly accepting the unrelated site-wide regression audit failures.
