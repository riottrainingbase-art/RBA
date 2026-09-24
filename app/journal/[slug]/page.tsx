import type {Metadata} from "next";
import {getPublicJournalPost} from "@/lib/public-content";
import {PublicJournalArticle} from "@/components/public-journal";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const p=await getPublicJournalPost("en",slug);
  return p?{title:p.title,description:p.standfirst,alternates:{canonical:`/journal/${slug}`}}:{title:"RBA Journal"};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <PublicJournalArticle locale="en" slug={slug}/>}
