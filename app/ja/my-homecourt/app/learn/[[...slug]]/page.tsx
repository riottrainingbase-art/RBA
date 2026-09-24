import type { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { memberArticles } from "@/lib/member-articles";
import { canReadMemberArticles } from "@/lib/member-article-access";
import styles from "./reading.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "学びのライブラリ | MY HOME COURT",
  description: "選手・保護者・指導者のための、次の練習につながる読み物。",
  robots: { index: false, follow: false },
};
const root = "/ja/my-homecourt/app/learn";
const bodySchema = z.object({ sections: z.array(z.object({title:z.string(),paragraphs:z.array(z.string())})), action:z.string(), questions:z.array(z.string()) });
const labels = { player: "選手", parent: "保護者", coach: "指導者" };
const parentCategories = Array.from(new Set(memberArticles.filter(item=>item.role==="parent"&&item.category).map(item=>item.category!)));

export default async function Page({ params, searchParams }: { params: Promise<{ slug?: string[] }>; searchParams: Promise<{ q?: string; category?: string }> }) {
  const { slug } = await params;
  const query = await searchParams;
  const q = (query.q || "").trim().toLowerCase();
  const category = (query.category || "").trim();
  const parentVisible = memberArticles.filter(item=>item.role==="parent").filter(item=>!category||item.category===category).filter(item=>!q||[item.title,item.summary,item.category||"",...(item.tags||[])].join(" ").toLowerCase().includes(q));
  const article = slug?.length === 1 ? memberArticles.find(item => item.slug === slug[0]) : undefined;
  if (slug?.length && !article) notFound();
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect(`/ja/my-homecourt/login?next=${encodeURIComponent(article ? `${root}/${article.slug}` : root)}`);
  const { data, error } = await db.from("subscriptions")
    .select("id,status,plan_key,current_period_end,cancel_at_period_end")
    .eq("user_id", user.id).eq("plan_key", "homecourt_monthly");
  const allowed = !error && canReadMemberArticles(data || []);
  const pending = !allowed && (data || []).some(item => ["active", "trialing"].includes(item.status) && (!item.current_period_end || !Number.isFinite(Date.parse(item.current_period_end))));

  const bodyResult = allowed && article ? await db.from("member_article_bodies").select("sections,action,questions").eq("slug",article.slug).eq("published",true).maybeSingle() : null;
  const parsed = bodySchema.safeParse(bodyResult?.data);
  const body = bodyResult && !bodyResult.error && parsed.success ? parsed.data : null;
  const related = article ? memberArticles
    .filter(item=>item.role===article.role&&item.slug!==article.slug)
    .sort((a,b)=>Number(b.category===article.category)-Number(a.category===article.category))
    .slice(0,4) : [];

  return <main className={styles.shell}>
    <header className={styles.header}><Link prefetch={false} href="/ja/my-homecourt/app">RBA / MY HOME COURT</Link><Link prefetch={false} href={root}>記事一覧</Link></header>
    <div className={styles.body}>
      <p className={styles.eyebrow}>LEARN / MY HOME COURT</p>
      <h1>{article?.title || "読んで、試して、振り返る。"}</h1>
      <p className={styles.lead}>{article?.summary || "今の自分に合う一記事から。次の練習や、子どもとの会話に持ち帰ろう。"}</p>
      {!article?<section className={styles.positioning}><span>NOTE / HOME COURT</span><strong>noteは「考える」。HOME COURTは「使う」。</strong><p>ここでは、問題提起を読むだけで終わらせず、自分の状況を整理し、話し、次の行動へつなげるための実践ガイドをまとめています。</p></section>:null}
      {error ? <section className={styles.notice} role="alert"><h2>契約状況を確認できませんでした</h2><p>時間を置いて、もう一度このページを開いてください。</p><form method="get" action={article ? `${root}/${article.slug}` : root}><button type="submit">もう一度確認する</button></form></section>
        : pending ? <section className={styles.notice}><h2>メンバーシップの反映を確認しています</h2><p>契約の記録はありますが、閲覧期間の確認が完了していません。追加のお支払いはせず、契約状況をご確認ください。反映されない場合はお問い合わせください。</p><Link prefetch={false} href="/ja/my-homecourt/app/my">契約状況を確認する</Link><Link prefetch={false} href="/ja/contact">お問い合わせ</Link></section> : !allowed ? <section className={styles.notice}><h2>MY HOME COURTで、学びを続けよう</h2><p>記事の本文は、月額メンバーシップでお読みいただけます。お申し込み済みの方は、決済時と同じRBA IDでログインしているかご確認ください。</p><Link prefetch={false} href="/ja/my-homecourt/app/my">契約状況を確認する</Link><Link prefetch={false} href="/ja/payments">メンバーシップの内容・申込を見る</Link></section> : null}
      {article ? allowed && body ? <article className={styles.article}>
        <p className={styles.eyebrow}>{labels[article.role]}向け / RBA実践ガイド</p>
        <section className={styles.method}>
          <p className={styles.eyebrow}>HOME COURT METHOD</p>
          <h2>{article.role==="parent"?"読んだ後、家庭で使う。":"読んだ後、次の現場で使う。"}</h2>
          <div className={styles.methodGrid}>
            {(article.role==="parent"
              ? [["01","READ","まず全体像を理解する"],["02","SORT","事実と推測を分けて整理する"],["03","TALK","子どもや必要な相手と話す"],["04","ACT","今できる一つを選ぶ"]]
              : [["01","READ","テーマを理解する"],["02","CHOOSE","試すことを一つ決める"],["03","TRY","練習や試合で試す"],["04","REFLECT","次の改善を決める"]]
            ).map(([n,kicker,text])=><div key={n}><span>{n}</span><strong>{kicker}</strong><p>{text}</p></div>)}
          </div>
        </section>
        <nav className={styles.toc} aria-label="目次"><strong>この記事で考えること</strong>{body.sections.map((section,index)=><Link prefetch={false} href={`#section-${index}`} key={section.title}>{section.title}</Link>)}</nav>
        {body.sections.map((section,index)=><section id={`section-${index}`} key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>)}
        <section className={styles.exercise}>
          <p className={styles.eyebrow}>USE / THIS WEEK</p>
          <h2>{article.role==="parent"?"今週、家庭で使う":"次の現場で使う"}</h2>
          <h3>まず一つやること</h3><p>{body.action}</p>
          <h3>{article.role==="parent"?"確認する質問":"振り返りの問い"}</h3><ul>{body.questions.map(question=><li key={question}>{question}</li>)}</ul>
          <p>{article.role==="parent"?"全部を一度に解決する必要はありません。事実を整理して、必要な一つから確認してみましょう。":"気づいたことは、手元のノートやMY HOME COURTの参加記録に残してみましょう。"}</p>
          <Link prefetch={false} href="/ja/my-homecourt/app">HOME COURTへ戻る</Link>
        </section>
        <section><h2>続けて読む</h2>{related.map(item=><Link prefetch={false} className={styles.related} href={`${root}/${item.slug}`} key={item.slug}>{item.title} →</Link>)}{article.role==="coach"?<div className={styles.links}><Link prefetch={false} href="/ja/d-hub">D-HUBを見る</Link><Link prefetch={false} href="/ja/events/torsten-loibl-online-clinic">Torsten Online Clinicを見る</Link></div>:<Link prefetch={false} className={styles.related} href="/ja/opportunities">次の活動を探す →</Link>}</section>
      </article> : allowed ? <section className={styles.notice}><h2>記事を読み込めませんでした</h2><p>時間を置いて、もう一度お試しください。契約情報と記事の公開状況を確認しています。</p><form method="get" action={`${root}/${article.slug}`}><button type="submit">もう一度確認する</button></form><Link prefetch={false} href={root}>記事一覧に戻る</Link></section> : null : <>
        <nav className={styles.filters} aria-label="対象から探す">{Object.entries(labels).map(([role,label])=><Link prefetch={false} href={`#${role}`} key={role}>{label}向け</Link>)}</nav>
        {Object.entries(labels).map(([role,label])=><section className={styles.group} id={role} key={role}><h2>{label}のための読み物</h2>{role==="parent"?<><form className={styles.search} method="get" action={root}><label htmlFor="parent-q">悩み・キーワードから探す</label><div><input id="parent-q" name="q" defaultValue={query.q||""} placeholder="例：出場、移籍、遠征、指導者" /><select name="category" defaultValue={category}><option value="">すべてのカテゴリ</option>{parentCategories.map(item=><option value={item} key={item}>{item}</option>)}</select><button type="submit">探す</button></div>{q||category?<Link prefetch={false} href={`${root}#parent`}>絞り込みを解除</Link>:null}</form><p className={styles.count}>{parentVisible.length}件の保護者向けガイド</p></>:null}<div className={styles.grid}>{(role==="parent"?parentVisible:memberArticles.filter(item=>item.role===role)).map(item=><article className={styles.card} key={item.slug}><p className={styles.eyebrow}>{label}{item.category?` / ${item.category}`:""} / 実践ガイド</p><h3><Link prefetch={false} href={`${root}/${item.slug}`}>{item.title}</Link></h3><p>{item.summary}</p><Link prefetch={false} className={styles.read} href={`${root}/${item.slug}`}>{allowed?"記事を読む":"記事の概要を見る"} →</Link></article>)}</div>{role==="parent"&&!parentVisible.length?<p className={styles.empty}>該当する記事が見つかりません。別のキーワードまたはカテゴリでお試しください。</p>:null}</section>)}
      </>}
    </div>
  </main>;
}
