import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {researchEntries,researchBySlug} from "@/lib/rba-research-series";
export function generateStaticParams(){return researchEntries.map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const e=researchBySlug(slug);
 if(!e)return {title:"RBA JOURNAL"};
 return {title:e.title+"｜参考文献シリーズ｜RBA JOURNAL",description:e.question,alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/research/"+slug},openGraph:{title:e.title+"｜RBA JOURNAL",description:e.question,url:"https://riotbasketballacademy.com/ja/journal/research/"+slug,siteName:"Riot Basketball Academy",locale:"ja_JP",type:"article"},twitter:{card:"summary_large_image",title:e.title,description:e.question}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const e=researchBySlug(slug);if(!e)notFound();
 const index=researchEntries.findIndex(x=>x.slug===slug);
 const prev=researchEntries[(index+researchEntries.length-1)%researchEntries.length];
 const next=researchEntries[(index+1)%researchEntries.length];
 return <main className="rba-research-shell rba-research-article">
 <p className="rba-research-kicker"><Link href="/ja/journal/research">RBA JOURNAL / 参考文献シリーズ</Link>　/　{e.number}</p>
 <p className="rba-research-topic">{e.topic}　·　{e.year}　·　{e.kind}</p>
 <h1>{e.title}</h1>
 <p className="rba-research-lead">{e.question}</p>
 <nav className="rba-research-mini-nav" aria-label="記事の目次"><a href="#outline">資料の概要</a><a href="#findings">確認できること</a><a href="#limits">解釈の限界</a><a href="#practice">練習への応用</a><a href="#original">原典</a></nav>
 <section id="outline"><h2>01　どのような資料か</h2>{e.summary.map((p,i)=><p key={i}>{p}</p>)}</section>
 <section id="findings"><h2>02　資料から確認できること</h2>{e.findings.map((p,i)=><p key={i}>{p}</p>)}</section>
 <section id="limits"><h2>03　この資料だけでは言えないこと</h2>{e.limits.map((p,i)=><p key={i}>{p}</p>)}</section>
 <section id="practice"><h2>04　RBAとしての実践提案</h2><p>以下は研究の結果そのものではなく、研究を参考にRBAが指導の現場で試すことを提案する内容です。</p>{e.practice.map((p,i)=><p key={i}>{p}</p>)}
 <h3>指導後に確かめたいこと</h3><ul>{e.check.map((p,i)=><li key={i}>{p}</li>)}</ul></section>
 <section id="original"><h2>05　原典・書誌情報</h2><p className="rba-research-citation">{e.citation}</p><p><a className="rba-research-original" href={e.url} target="_blank" rel="noopener noreferrer">原典・出版社のページを開く ↗</a></p><p className="rba-research-small">出版社の公開範囲によっては、全文を読むために購読や購入が必要です。掲載内容の日本語要約は原典の全文翻訳ではありません。</p></section>
 <section className="rba-research-related"><h2>続けて読みたい記事</h2>
 <div className="rba-research-crosslinks">
 <Link href="/ja/journal/youth-coaching-guidelines">RBA育成指導指針｜U8〜U15 →</Link>
 <Link href="/ja/journal/okinawa-coaching-references#how-to-read">参考文献の読み方 →</Link>
 <Link href="/ja/journal/gream-okinawa-u13-annual-development-programme-2026">年間育成計画の考え方 →</Link>
 </div></section>
 <nav className="rba-research-next" aria-label="前後の記事"><Link href={"/ja/journal/research/"+prev.slug}>← 前の記事：{prev.title}</Link><Link href={"/ja/journal/research/"+next.slug}>次の記事：{next.title} →</Link></nav>
 <footer className="rba-research-footer"><Link href="/ja/journal/research">← 参考文献シリーズ一覧へ</Link><span>Riot Basketball Academy / 2026.10</span></footer>
 </main>
}