import type { MetadataRoute } from "next";
import { getPublicJournalPosts, type ContentLocale } from "@/lib/public-content";
import { journalLearningPaths } from "@/lib/journal-learning-paths";

export const revalidate=300;

const base="https://riotbasketballacademy.com";
const locales=["","/ja","/zh-tw","/ko"] as const;
const core=["","/players","/families","/coaches","/home-court","/my-homecourt","/my-homecourt/players","/my-homecourt/families","/my-homecourt/coaches","/community","/impact","/d-hub","/united","/connect","/organizer","/about","/approach","/schedule","/payments","/clinic-request","/events/torsten-loibl-online-clinic","/asia","/partners","/contact","/social","/policies","/camp","/faq","/international","/network","/opportunities","/platform","/regional-host","/sponsor","/team","/verified","/journal","/journal/coaches","/after-application"] as const;
const journalPathPages=["/ja/journal/paths",...journalLearningPaths.map(path=>`/ja/journal/paths/${path.key}`)];
const journalFamilyPages=["/ja/journal/families","/ja/journal/families/references"];
const productPages=["/ja/homecourt-plus","/ja/development"];
const legacy=["/authentics","/field-notes","/work-with-rba","/ja/work-with-rba","/ja/u15-skill-up","/ja/team-visit-clinic","/ja/team-training","/ja/minibasket-support","/radio","/links","/sponsors"] as const;
const localeMap:{prefix:string;locale:ContentLocale}[]=[
  {prefix:"",locale:"en"},
  {prefix:"/ja",locale:"ja"},
  {prefix:"/zh-tw",locale:"zh-tw"},
  {prefix:"/ko",locale:"ko"},
];

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const localized=locales.flatMap(locale=>core.map(path=>locale+path));
  const journalPosts=(await Promise.all(localeMap.map(async item=>{
    try{
      const posts=await getPublicJournalPosts(item.locale,500);
      return posts.map(post=>({
        path:`${item.prefix}/journal/${post.slug}`,
        lastModified:post.reviewed_at||post.updated_at||post.published_at,
      }));
    }catch{
      return [];
    }
  }))).flat();

  const entries=[
    ...localized.map(path=>({path,lastModified:null as string|null})),
    ...legacy.map(path=>({path,lastModified:null as string|null})),
    ...journalPathPages.map(path=>({path,lastModified:"2026-09-27T00:00:00Z"})),
    ...journalFamilyPages.map(path=>({path,lastModified:"2026-09-28T12:31:00Z"})),
    ...productPages.map(path=>({path,lastModified:"2026-09-27T00:00:00Z"})),
    ...journalPosts,
  ];

  const seen=new Set<string>();
  return entries.filter(entry=>{if(seen.has(entry.path))return false;seen.add(entry.path);return true;}).map(entry=>({
    url:base+(entry.path||"/"),
    lastModified:entry.lastModified?new Date(entry.lastModified):new Date("2026-09-27T00:00:00Z"),
    changeFrequency:entry.path.includes("/journal/")||entry.path.includes("schedule")||entry.path.includes("opportunities")||entry.path.includes("torsten")?"weekly":"monthly",
    priority:entry.path===""?1:entry.path.includes("my-homecourt")||entry.path.includes("torsten")?0.95:entry.path.includes("schedule")||entry.path.includes("opportunities")||entry.path.includes("journal")||entry.path.includes("asia")?0.9:0.8,
  }));
}
