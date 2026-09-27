# Open MY HOME COURT — development discovery

The Japanese signed-in home now offers discovery, comparison and saved opportunities without checking a subscription. Published membership articles retain their existing entitlement checks.

## Included
- One programme catalogue for discovery, dates, audience, price and application links.
- Age/coach, region, category, online and inclusive start-date filters. Expired or explicitly closed events excluded.
- Two selected activities compared using the same fields. Comparison is temporary; Saved persists in the existing owner-protected `homecourt_saves` table.
- Save/unsave error handling and completion cleanup; no payment or account creation is triggered.
- Public opportunity URL sharing via Web Share/clipboard. Personal records never enter the payload.
- Role-sensitive learning prompts, international and journal entry, and Passport goal/reflection links.
- Japanese duplicate world/overview sections consolidated. Monochrome styling, single-column mobile cards, 48px controls.
- Corrected upcoming-date labels: a near event date is not an application deadline.

## Verification / limits
- Pure filtering tests cover closed/past events, same-day inclusion, audience/category/region/online combinations and date bounds.
- Production build and targeted lint/type checks required before release.
- No international partner, remaining-place, deadline or verified attendance data invented.
- Original programme data still has coarse regional groups and text prices. Municipal/numeric-price search requires verified structured data.
- No private messaging between minors, automatic guardian linking, public athlete profiles or paid access grants added.
- Preview/mobile browser and live save/unsave roundtrip remain release gates while Vercel build rate limit is active.
