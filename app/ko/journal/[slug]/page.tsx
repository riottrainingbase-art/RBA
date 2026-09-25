import type {Metadata} from "next";
import {getPublicJournalPost} from "@/lib/public-content";
import {PublicJournalArticle} from "@/components/public-journal";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const p=await getPublicJournalPost("ko",slug);
  if(!p)return {title:"RBA JOURNAL"};
  const base="https://riotbasketballacademy.com";
  const url=base+"/ko"+"/journal/"+slug;
  return {
    title:p.title,
    description:p.standfirst,
    alternates:{
      canonical:url,
      languages:{
        en:base+"/journal/"+slug,
        ja:base+"/ja/journal/"+slug,
        "zh-Hant-TW":base+"/zh-tw/journal/"+slug,
        ko:base+"/ko/journal/"+slug,
        "x-default":base+"/journal/"+slug
      }
    },
    openGraph:{
      title:p.title,
      description:p.standfirst,
      url,
      siteName:"Riot Basketball Academy",
      locale:"ko_KR",
      type:"article",
      publishedTime:p.published_at||undefined,
      modifiedTime:p.reviewed_at||p.updated_at||undefined,
      authors:["Riot Basketball Academy"],
      images:["https://riotbasketballacademy.com/rba-court-hero.png"]
    },
    twitter:{card:"summary_large_image",title:p.title,description:p.standfirst,images:["https://riotbasketballacademy.com/rba-court-hero.png"]}
  };
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  return <PublicJournalArticle locale="ko" slug={slug}/>;
}
