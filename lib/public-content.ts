import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Locale } from "@/components/site-frame";

const db=()=>createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {auth:{persistSession:false,autoRefreshToken:false}}
);

export type PublicUpdate={kind:"journal"|"programme"|"exchange"|"platform";locale:Locale;title:string;summary:string|null;href:string;published_at:string};
export type PublicJournalPost={
  locale:Locale;slug:string;category:string;audience:string;title:string;standfirst:string;reading:string;
  aside_title:string|null;aside_text:string|null;
  sections:{heading:string;paragraphs:string[];bullets?:string[]}[];
  cta_title:string|null;cta_body:string|null;published_at:string|null;
};

export async function getLatestPublicUpdate(locale:Locale){
  const {data,error}=await db().from("public_content_updates")
    .select("kind,locale,title,summary,href,published_at")
    .eq("locale",locale).eq("is_active",true)
    .order("published_at",{ascending:false}).limit(1).maybeSingle();
  return error?null:data as PublicUpdate|null;
}

export async function getPublicJournalPosts(locale:Locale,limit=60){
  const {data,error}=await db().from("public_journal_posts")
    .select("locale,slug,category,audience,title,standfirst,reading,aside_title,aside_text,sections,cta_title,cta_body,published_at")
    .eq("locale",locale).eq("published",true)
    .order("published_at",{ascending:false}).limit(limit);
  return error?[]:(data||[]) as PublicJournalPost[];
}

export async function getPublicJournalPost(locale:Locale,slug:string){
  const {data,error}=await db().from("public_journal_posts")
    .select("locale,slug,category,audience,title,standfirst,reading,aside_title,aside_text,sections,cta_title,cta_body,published_at")
    .eq("locale",locale).eq("slug",slug).eq("published",true).maybeSingle();
  return error?null:data as PublicJournalPost|null;
}
