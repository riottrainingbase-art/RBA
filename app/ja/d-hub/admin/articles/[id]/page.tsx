import type {Metadata} from "next";
import {notFound,redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {DhubArticleAdminEditor} from "@/components/dhub-article-admin-editor";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB ARTICLE EDIT | RBA"},robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const db=await createClient();const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next="+encodeURIComponent("/ja/d-hub/admin/articles/"+id));
 const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();if(profile?.role!=="admin")notFound();
 const [{data:article},{data:workingDraft},{data:existing},{data:publicPosts},{data:revisions}]=await Promise.all([
  db.from("dhub_paid_articles").select("*").eq("id",id).maybeSingle(),
  db.from("dhub_paid_articles").select("program_type,category"),
  db.from("public_journal_posts").select("slug,title,category,source_references").eq("locale","ja").eq("published",true).order("published_at",{ascending:false}),
  db.from("dhub_paid_article_revisions").select("id,revision_no,created_at,change_note").eq("article_id",id).order("revision_no",{ascending:false}).limit(20)
 ]);
 if(!article)notFound();
 const categories=Array.from(new Set((existing||[]).map(x=>x.category).filter(Boolean))).sort();
 const posts=(publicPosts||[]).map(p=>({slug:p.slug,title:p.title,category:p.category,referenceCount:Array.isArray(p.source_references)?p.source_references.length:0}));
 const initial=workingDraft?.payload?{...article,...workingDraft.payload,id:article.id,published:article.published,published_at:article.published_at,has_admin_draft:true}:{...article,has_admin_draft:false};\n return <DhubArticleAdminEditor initial={initial as any} categories={categories} publicPosts={posts} revisions={(revisions||[]) as any}/>;
}
