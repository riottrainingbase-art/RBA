import type { MetadataRoute } from "next";

const base="https://riotbasketballacademy.com";
const locales=["","/ja","/zh-tw","/ko"] as const;
const core=["","/players","/families","/coaches","/home-court","/my-homecourt","/my-homecourt/players","/my-homecourt/families","/my-homecourt/coaches","/community","/impact","/d-hub","/united","/connect","/organizer","/about","/approach","/schedule","/payments","/clinic-request","/events/torsten-loibl-online-clinic","/asia","/partners","/contact","/social","/policies","/camp","/faq","/international","/network","/opportunities","/platform","/regional-host","/sponsor","/team","/verified"] as const;
const legacy=["/authentics","/field-notes","/work-with-rba","/radio","/links","/sponsors"] as const;
const journal=["/journal","/journal/kobe-development-camp-2026","/journal/building-a-real-asia-basketball-relationship","/journal/plan-a-japan-basketball-exchange","/journal/what-rba-coordinates-in-japan"] as const;

export default function sitemap():MetadataRoute.Sitemap{
  const localized=locales.flatMap(locale=>core.map(path=>locale+path));
  return [...localized,...legacy,...journal].map(path=>({
    url:base+(path||"/"),
    lastModified:new Date("2026-09-20T00:00:00Z"),
    changeFrequency:path.includes("schedule")||path.includes("torsten")?"weekly":"monthly",
    priority:path===""?1:path.includes("torsten")?0.95:path.includes("schedule")||path.includes("asia")?0.9:0.8,
  }));
}