# RBA National Network Map — data and governance

Last reviewed: 2026-10-04

## Purpose

The national map is the durable discovery layer for RBA's regional activity across Japan.

Public route:
- `/ja/regions` — national regional-network hub
- `/ja/saga` — first dedicated regional hub

The map must continue to work when the network grows from dozens of locations to nationwide coverage.

## Map base

Japan uses the Geospatial Information Authority of Japan (GSI) pale map tiles in real time:

`https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png`

The implementation uses Web Mercator math for both the tile viewport and the RBA location anchors, so the marker anchor and basemap use the same projection.

Required public attribution:
- link to the GSI tile list;
- show that GSI is the map source;
- for the small-scale ZL5 pale map, retain the additional VMAP0 shoreline attribution required by the tile documentation.

The legacy `/public/network-japan.svg` remains only as a low-opacity fallback underneath live GSI tiles.

## Marker accuracy

The small dot / leader-line origin is the geographic anchor.
The numbered button may be offset from that anchor when locations overlap.

Location coordinates are not private venue entrances.

Each Japan location profile has one of:
- `city` — representative point for the named city;
- `area` — representative point for the named local area;
- `prefecture` — representative prefectural point when the historical record is only prefecture-level.

If a future event has a verified venue, do not replace the public regional point with a private entrance or residential address. Store venue information on the official event page instead.

## Stable location model

Activity/event content stays in `components/network-data.ts` as `MapPoint`.

Regional-directory metadata is stored in `japanLocationProfiles`:
- region;
- prefecture;
- municipality/area when known;
- coordinate level;
- optional regional lead;
- optional dedicated regional page.

### Adding a regional lead

Only add a lead after the person's role is confirmed.

Example:

```ts
saga: {
  region: "kyushu",
  prefecture: ["Saga","佐賀県","佐賀縣","사가현"],
  municipality: ["Saga","佐賀市周辺","佐賀市周邊","사가시 일대"],
  coordinateLevel: "area",
  lead: {
    name: "Example Name",
    role: ["Regional Lead","地域責任者","區域負責人","지역 책임자"],
  },
  page: { ja: "/ja/saga" },
}
```

Until that confirmation, omit `lead`. The public UI will show “後日掲載”.

Do not publish phone numbers, personal email addresses or private contact details in the lead field.

## Regional statuses

Keep these states distinct:
- `activity` — confirmed historical activity;
- `planned` — a future programme is planned but not yet part of the activity record;
- `partner` — international partner;
- `discussion` — discussion underway, not completed collaboration.

Do not convert planned points to activity records until the activity has actually occurred.

## Regional page rollout

A dedicated regional page should be created when one or more of these are true:
- repeat activity exists;
- there is a local organising relationship;
- a regional lead is confirmed;
- there is enough recurring information to justify a durable page;
- users need one stable URL instead of repeated temporary event pages.

Recommended page pattern:
- current status;
- activity history;
- development approach;
- next planned opportunity;
- regional lead / contact structure;
- FAQ;
- source-of-truth note;
- link to official current registration page.

## Update checklist

When adding a new Japan location:
1. add the map point with representative lon/lat;
2. add a `japanLocationProfiles` entry;
3. select the correct region/prefecture/municipality;
4. set coordinate level honestly;
5. add activity types and status;
6. add regional page only if it exists;
7. add regional lead only after confirmation;
8. verify the marker anchor visually against the GSI map;
9. test region and activity filters;
10. run RBA Preflight QA.

When a regional lead changes:
1. confirm the new role;
2. update only the stable profile data;
3. remove the old name instead of leaving two apparent owners;
4. do not expose personal contact details.

## Nationwide expansion standard

The public map is not a sales-coverage map and not a claim of permanent local offices.

It represents:
- where RBA has actually worked;
- where an event is planned;
- which areas have a durable regional hub;
- who the confirmed regional lead is, when applicable.

Accuracy and status clarity take priority over making the network appear larger.
