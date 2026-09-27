import type {Metadata} from "next";
import {notFound,redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {DhubArticleAdminEditor} from "@/components/dhub-article-admin-editor";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB ARTICLE NEW | RBA"},robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{program?:string;error?:string}>}){
 const q=await searchParams;const db=await createClient();const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fadmin%2Farticles%2Fnew");
 const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();if(profile?.role!=="admin")notFound();
 const [{data:existing},{data:publicPosts}]=await Promise.all([
  db.from("dhub_paid_articles").select("program_type,category"),
  db.from("public_journal_posts").select("slug,title,category,source_references").eq("locale","ja").eq("published",true).order("published_at",{ascending:false})
 ]);
 const categories=Array.from(new Set((existing||[]).map(x=>x.category).filter(Boolean))).sort();
 const posts=(publicPosts||[]).map(p=>({slug:p.slug,title:p.title,category:p.category,referenceCount:Array.isArray(p.source_references)?p.source_references.length:0}));
 const program=q.program==="players"?"players":"coach_lab";
 return <DhubArticleAdminEditor initial={{program_type:program,slug:"",category:"",title:"",summary:"",reading:"8 MIN READ",sections:[],field_action:"",reflection_questions:[],related_public_slugs:[],source_references:[],editorial_note:"",published:false,published_at:null}} categories={categories} publicPosts={posts}/>;
}
