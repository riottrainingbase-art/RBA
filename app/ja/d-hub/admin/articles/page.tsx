import type {Metadata} from "next";
import Link from "next/link";
import {notFound,redirect} from "next/navigation";
import {ArrowLeft,ArrowRight,Copy,FilePlus2,Search} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";
import {duplicateArticle} from "./actions";
import styles from "./admin-articles.module.css";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB ARTICLE CMS | RBA"},robots:{index:false,follow:false}};

export default async function Page({searchParams}:{searchParams:Promise<{program?:string;locale?:string;state?:string;q?:string}>}){
 const query=await searchParams;
 const db=await createClient();
 const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fadmin%2Farticles");
 const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(profile?.role!=="admin")notFound();

 const {data}=await db.from("dhub_paid_articles").select("id,program_type,locale,slug,category,title,summary,reading,published,published_at,updated_at,source_references").order("updated_at",{ascending:false});
 const all=data||[];
 const q=(query.q||"").trim().toLowerCase();
 const state=(a:any)=>!a.published?"draft":a.published_at&&new Date(a.published_at)>new Date()?"scheduled":"published";
 const filtered=all.filter(a=>!query.program||a.program_type===query.program).filter(a=>!query.locale||a.locale===query.locale).filter(a=>!query.state||state(a)===query.state).filter(a=>!q||[a.title,a.summary,a.slug,a.category,a.locale].join(" ").toLowerCase().includes(q));
 const count=(program:string)=>all.filter(a=>a.program_type===program).length;
 const published=all.filter(a=>state(a)==="published").length;
 const scheduled=all.filter(a=>state(a)==="scheduled").length;
 const drafts=all.filter(a=>state(a)==="draft").length;

 return <SiteFrame locale="ja" languagePage="d-hub"><main className={styles.cmsShell}>
  <header className={styles.cmsHero}>
   <Link href="/ja/d-hub/admin"><ArrowLeft size={15}/> D-HUB ADMIN</Link>
   <p>D-HUB / ARTICLE CMS</p>
   <h1>記事の追加・修正・公開を、ここだけで。</h1>
   <span>GitHubやVercelを触らず、スマホからでも更新できます。</span>
   <div className={styles.heroActions}><Link href="/ja/d-hub/admin/articles/new?program=coach_lab&locale=ja"><FilePlus2 size={16}/> COACH LAB記事を作る</Link><Link href="/ja/d-hub/admin/articles/new?program=players&locale=ja"><FilePlus2 size={16}/> PLAYERS記事を作る</Link><Link href="/ja/d-hub/admin/articles/new?program=players&locale=en"><FilePlus2 size={16}/> PLAYERS ENを作る</Link></div>
  </header>

  <section className={styles.stats}><div><span>COACH LAB</span><strong>{count("coach_lab")}</strong></div><div><span>PLAYERS</span><strong>{count("players")}</strong></div><div><span>公開中</span><strong>{published}</strong></div><div><span>予約</span><strong>{scheduled}</strong></div><div><span>下書き</span><strong>{drafts}</strong></div></section>

  <section className={styles.toolbar}>
   <form method="get"><label><Search size={16}/><input name="q" defaultValue={query.q||""} placeholder="タイトル・カテゴリ・slug"/></label><select name="program" defaultValue={query.program||""}><option value="">両方</option><option value="coach_lab">COACH LAB</option><option value="players">PLAYERS</option></select><select name="locale" defaultValue={query.locale||""}><option value="">JA / EN</option><option value="ja">JA</option><option value="en">EN</option></select><select name="state" defaultValue={query.state||""}><option value="">全状態</option><option value="published">公開中</option><option value="scheduled">公開予約</option><option value="draft">下書き</option></select><button>絞り込む</button></form>
  </section>

  <section className={styles.articleList}>
   {filtered.map(article=>{const s=state(article);const refs=Array.isArray(article.source_references)?article.source_references.length:0;return <article key={article.id}>
    <div className={styles.articleState}><span>{String(article.locale||"ja").toUpperCase()}</span><span className={styles[article.program_type]}>{article.program_type==="coach_lab"?"COACH LAB":"PLAYERS"}</span><span className={styles[s]}>{s==="published"?"公開中":s==="scheduled"?"公開予約":"下書き"}</span></div>
    <div><small>{article.category} · {article.reading} · 参考文献 {refs}件</small><h2>{article.title}</h2><p>{article.summary}</p><small>更新 {new Date(article.updated_at).toLocaleString("ja-JP")}</small></div>
    <div className={styles.articleActions}><Link href={"/ja/d-hub/admin/articles/"+article.id}>編集 <ArrowRight size={15}/></Link><form action={duplicateArticle}><input type="hidden" name="id" value={article.id}/><button><Copy size={14}/> 複製</button></form></div>
   </article>})}
   {!filtered.length?<div className={styles.empty}>条件に合う記事はありません。</div>:null}
  </section>
 </main></SiteFrame>;
}
