import "server-only";
import Link from "next/link";
import {notFound,redirect} from "next/navigation";
import {ArrowLeft,ArrowRight,BookOpen,ExternalLink} from "lucide-react";
import {createClient} from "@/lib/supabase/server";
import {SiteFrame} from "@/components/site-frame";
import styles from "./dhub-paid-library.module.css";

type Program="coach_lab"|"players";
type PaidLocale="ja"|"en";
type Source={title?:string;source?:string;year?:number;url?:string;note?:string};
type Section={heading:string;paragraphs:string[]};
type PaidArticle={
 id:string;slug:string;category:string;title:string;summary:string;reading:string;
 sections:Section[];field_action:string;reflection_questions:string[];
 related_public_slugs:string[];source_references:Source[];published_at:string|null;
};

const config={
 ja:{
  coach_lab:{
   label:"D-HUB COACH LAB",audience:"指導者向け",root:"/ja/d-hub/coaches/articles",home:"/ja/d-hub/coaches/member",
   login:"/ja/my-homecourt/login",rpc:"has_dhub_coach_access",
   heading:"現場で使うための、メンバー記事。",
   lead:"無料COACH JOURNALで考え方と根拠を確認したあと、練習設計、ゲームコーチング、S&C、保護者対応まで一段深く掘り下げます。読んで終わりではなく、次の現場で何を変えるかまで決めるための記事です。"
  },
  players:{
   label:"D-HUB PLAYERS",audience:"選手向け",root:"/ja/d-hub/players/articles",home:"/ja/d-hub/players/member",
   login:"/ja/my-homecourt/login",rpc:"has_dhub_player_access",
   heading:"試合と練習に持っていける、選手向けの記事。",
   lead:"うまくいかなかった理由を自分の性格や才能だけで片づけず、次に何を見て、何を試すかを整理します。難しい言葉を覚えるためではなく、自分のプレーを少しずつ変えるための読み物です。"
  }
 },
 en:{
  coach_lab:{
   label:"D-HUB COACH LAB",audience:"COACHES",root:"/d-hub/coaches/articles",home:"/d-hub/coaches/member",
   login:"/my-homecourt/login",rpc:"has_dhub_coach_access",
   heading:"Member articles built for the next practice.",
   lead:"Go beyond ideas and turn them into practice design, game coaching, physical preparation and reflection."
  },
  players:{
   label:"D-HUB PLAYERS",audience:"PLAYERS",root:"/d-hub/players/articles",home:"/d-hub/players/member",
   login:"/my-homecourt/login",rpc:"has_dhub_player_access",
   heading:"Player articles you can take into practice and games.",
   lead:"Do not reduce a difficult game to talent or personality. Work out what you saw, what you chose, what happened, and what you can try next."
  }
 }
} as const;

export async function DhubPaidLibrary({program,slug,locale="ja"}:{program:Program;slug?:string[];locale?:PaidLocale}){
 const c=config[locale][program];
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 const next=slug?.length===1?c.root+"/"+encodeURIComponent(slug[0]):c.root;
 if(!user)redirect(c.login+"?next="+encodeURIComponent(next));
 const {data:allowed}=await supabase.rpc(c.rpc);
 if(!allowed)redirect(c.home);
 if(slug&&slug.length>1)notFound();

 if(slug?.length===1){
  const {data,error}=await supabase.from("dhub_paid_articles").select("*")
   .eq("program_type",program).eq("locale",locale).eq("slug",slug[0]).eq("published",true).maybeSingle();
  if(error||!data)notFound();
  const article=data as PaidArticle;
  const sources=Array.isArray(article.source_references)?article.source_references:[];
  return <SiteFrame locale={locale} languagePage="d-hub"><main className={styles.shell}>
    <header className={styles.articleHero}>
      <Link href={c.root} className={styles.back}><ArrowLeft size={15}/> {locale==="ja"?"記事一覧へ":"Article library"}</Link>
      <p className={styles.eyebrow}>{c.label} / MEMBER ARTICLE / {article.category}</p>
      <h1>{article.title}</h1>
      <p className={styles.lead}>{article.summary}</p>
      <div className={styles.meta}><span>{article.reading}</span>{sources.length?<span>{locale==="ja"?`参考文献 ${sources.length}件`:`${sources.length} sources`}</span>:null}</div>
    </header>

    <section className={styles.readingGuide}>
      <div><p className={styles.eyebrow}>{locale==="ja"?"この記事で扱うこと":"IN THIS ARTICLE"}</p><strong>{locale==="ja"?"気になる見出しから読んでも構いません。":"Start with the section that matters most right now."}</strong></div>
      <nav>{article.sections.map((section,index)=><Link href={"#paid-section-"+index} key={section.heading}><span>{String(index+1).padStart(2,"0")}</span>{section.heading}</Link>)}</nav>
    </section>

    <article className={styles.articleBody}>
      {article.sections.map((section,index)=><section id={"paid-section-"+index} key={section.heading}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <h2>{section.heading}</h2>
        {section.paragraphs.map(p=><p key={p}>{p}</p>)}
      </section>)}

      <section className={styles.action}>
        <p className={styles.eyebrow}>{locale==="ja"?(program==="coach_lab"?"次の現場でやること":"次の練習・試合でやること"):"NEXT ACTION"}</p>
        <h2>{locale==="ja"?"一つだけ、持ち帰る。":"Take one thing into your next session."}</h2>
        <p>{article.field_action}</p>
      </section>

      <section className={styles.questions}>
        <p className={styles.eyebrow}>{locale==="ja"?"振り返る時の問い":"REFLECTION QUESTIONS"}</p>
        {article.reflection_questions.map((q,index)=><div key={q}><span>{String(index+1).padStart(2,"0")}</span><strong>{q}</strong></div>)}
      </section>
    </article>

    {article.related_public_slugs?.length?<section className={styles.related}>
      <div><p className={styles.eyebrow}>{locale==="ja"?"無料JOURNALも確認する":"RELATED JOURNAL"}</p><h2>{locale==="ja"?"根拠や背景を読み直す。":"Read the wider context."}</h2></div>
      <div>{article.related_public_slugs.map(s=><Link href={(locale==="ja"?"/ja/journal/":"/journal/")+s} key={s}><BookOpen size={16}/><span>{s.replaceAll("-"," ")}</span><ArrowRight size={15}/></Link>)}</div>
    </section>:null}

    {sources.length?<section className={styles.sources}>
      <div><p className={styles.eyebrow}>{locale==="ja"?"参考文献":"SOURCES"}</p><h2>{locale==="ja"?"記事の背景にした資料。":"Background and source material."}</h2>{program==="coach_lab"?<p>{locale==="ja"?"研究が直接示している範囲と、RBAでの現場への落とし込みは同じではありません。本文では、その違いを踏まえて実践案として整理しています。":"Research findings and RBA's on-court application are not the same thing. The article separates the evidence from the practical interpretation."}</p>:null}</div>
      <div>{sources.map((source,index)=>source.url?<a href={source.url} target="_blank" rel="noreferrer" key={(source.title||"source")+index}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{source.title||source.source||(locale==="ja"?"参考資料":"Source")}</strong><p>{[source.source,source.year].filter(Boolean).join(" / ")}</p>{source.note?<small>{source.note}</small>:null}</div><ExternalLink size={14}/></a>:null)}</div>
    </section>:null}

    <footer className={styles.articleFooter}><Link href={c.home}>{c.label} {locale==="ja"?"MEMBER HOMEへ":"MEMBER HOME"} <ArrowRight size={16}/></Link></footer>
  </main></SiteFrame>;
 }

 const {data,error}=await supabase.from("dhub_paid_articles")
  .select("id,slug,category,title,summary,reading,source_references,published_at")
  .eq("program_type",program).eq("locale",locale).eq("published",true)
  .order("published_at",{ascending:false}).order("title");
 const articles=(error?[]:(data||[])) as PaidArticle[];
 const categories=Array.from(new Set(articles.map(a=>a.category)));

 return <SiteFrame locale={locale} languagePage="d-hub"><main className={styles.shell}>
   <header className={styles.libraryHero}>
    <Link href={c.home} className={styles.back}><ArrowLeft size={15}/> MEMBER HOME</Link>
    <p className={styles.eyebrow}>{c.label} / PAID ARTICLE LIBRARY</p>
    <h1>{c.heading}</h1>
    <p className={styles.lead}>{c.lead}</p>
    <div className={styles.libraryStats}><div><span>{locale==="ja"?"公開中":"PUBLISHED"}</span><strong>{articles.length}</strong><small>ARTICLES</small></div><div><span>{locale==="ja"?"対象":"FOR"}</span><strong>{c.audience}</strong><small>MEMBERS ONLY</small></div></div>
   </header>

   <nav className={styles.categoryNav}>{categories.map(category=><Link href={"#cat-"+category} key={category}>{category}</Link>)}</nav>

   {categories.map(category=><section className={styles.group} id={"cat-"+category} key={category}>
    <div className={styles.groupHead}><span>{category}</span><strong>{articles.filter(a=>a.category===category).length}{locale==="ja"?"本":" ARTICLES"}</strong></div>
    <div className={styles.grid}>{articles.filter(a=>a.category===category).map(article=>{
      const refs=Array.isArray(article.source_references)?article.source_references.length:0;
      return <Link href={c.root+"/"+article.slug} key={article.slug} className={styles.card}>
        <div className={styles.cardMeta}><span>{article.reading}</span>{refs?<span>{locale==="ja"?`参考文献 ${refs}`:`${refs} sources`}</span>:null}</div>
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <strong>{locale==="ja"?"記事を読む":"Read article"} <ArrowRight size={15}/></strong>
      </Link>;
    })}</div>
   </section>)}
 </main></SiteFrame>;
}
