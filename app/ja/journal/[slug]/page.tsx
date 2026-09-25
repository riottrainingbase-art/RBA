import type {Metadata} from "next";
import {getPublicJournalPost} from "@/lib/public-content";
import {PublicJournalArticle} from "@/components/public-journal";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const p=await getPublicJournalPost("ja",slug);
  if(!p)return {title:"RBA JOURNAL"};
  const url=`https://riotbasketballacademy.com/ja/journal/${slug}`;
  return {
    title:p.title,
    description:p.standfirst,
    alternates:{canonical:url},
    openGraph:{title:p.title,description:p.standfirst,url,siteName:"Riot Basketball Academy",locale:"ja_JP",type:"article",images:["https://riotbasketballacademy.com/rba-court-hero.png"]},
    twitter:{card:"summary_large_image",title:p.title,description:p.standfirst,images:["https://riotbasketballacademy.com/rba-court-hero.png"]},
  };
}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <PublicJournalArticle locale="ja" slug={slug}/>}
