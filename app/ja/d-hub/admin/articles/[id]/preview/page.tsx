import type {Metadata} from "next";
import Link from "next/link";
import {notFound,redirect} from "next/navigation";
import {ArrowLeft,ExternalLink} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";
import styles from "../../admin-articles.module.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB ARTICLE PREVIEW | RBA"},robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const db=await createClient();const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next="+encodeURIComponent("/ja/d-hub/admin/articles/"+id+"/preview"));
 const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();if(profile?.role!=="admin")notFound();
 const {data:a}=await db.from("dhub_paid_articles").select("*").eq("id",id).maybeSingle();if(!a)notFound();
 const sources=Array.isArray(a.source_references)?a.source_references:[];
 return <SiteFrame locale="ja" languagePage="d-hub"><main className={styles.previewShell}>
  <header className={styles.previewTop}><Link href={"/ja/d-hub/admin/articles/"+id}><ArrowLeft size={15}/> 編集へ戻る</Link><span>ADMIN PREVIEW / {a.program_type==="coach_lab"?"COACH LAB":"PLAYERS"}</span></header>
  <article className={styles.previewArticle}><p>{a.category} / {a.reading}</p><h1>{a.title}</h1><strong>{a.summary}</strong>
   {(a.sections||[]).map((s:any,index:number)=><section key={index}><span>{String(index+1).padStart(2,"0")}</span><h2>{s.heading}</h2>{(s.paragraphs||[]).map((p:string)=><p key={p}>{p}</p>)}</section>)}
   <aside><p>{a.program_type==="coach_lab"?"次の現場でやること":"次の練習・試合でやること"}</p><h2>一つだけ持ち帰る。</h2><strong>{a.field_action}</strong></aside>
   <div className={styles.previewQuestions}><h2>振り返り</h2>{(a.reflection_questions||[]).map((q:string,i:number)=><p key={q}><span>{String(i+1).padStart(2,"0")}</span>{q}</p>)}</div>
  </article>
  {sources.length?<section className={styles.previewSources}><h2>参考文献</h2>{sources.map((r:any,i:number)=>r.url?<a key={i} href={r.url} target="_blank" rel="noreferrer"><strong>{r.title||r.source}</strong><ExternalLink size={14}/></a>:null)}</section>:null}
 </main></SiteFrame>;
}
