import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getJournalLearningPath,journalLearningPaths} from "@/lib/journal-learning-paths";
import {PublicJournalLearningPath} from "@/components/journal-learning-paths";

export const dynamic="force-dynamic";
export const revalidate=0;

export function generateStaticParams(){return journalLearningPaths.map(item=>({path:item.key}));}

export async function generateMetadata({params}:{params:Promise<{path:string}>}):Promise<Metadata>{
  const {path:key}=await params;
  const path=getJournalLearningPath(key);
  if(!path)return {title:"RBA JOURNAL"};
  const url=`https://riotbasketballacademy.com/ja/journal/paths/${path.key}`;
  return {
    title:{absolute:`${path.shortTitle}｜RBA JOURNAL 読む順番`},
    description:path.description,
    alternates:{canonical:url},
    openGraph:{title:path.title,description:path.description,url,siteName:"Riot Basketball Academy",locale:"ja_JP",type:"website",images:["https://riotbasketballacademy.com/rba-court-hero.png"]}
  };
}

export default async function Page({params}:{params:Promise<{path:string}>}){
  const {path:key}=await params;
  const path=getJournalLearningPath(key);
  if(!path)notFound();
  return <PublicJournalLearningPath path={path}/>;
}
