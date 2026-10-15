import type {Metadata} from "next";
import Link from "next/link";
import {researchEntries} from "@/lib/rba-research-series";
export const metadata:Metadata={title:"参考文献を読み解く｜RBA JOURNAL 研究シリーズ",description:"発達・判断力・ゲーム評価・少人数ゲーム・S&C・負荷管理など、育成年代の指導に役立つ研究を原典とともに解説。",alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/research"},openGraph:{title:"参考文献を読み解く｜RBA JOURNAL",description:"育成年代の指導に役立つ研究を日本語で読み解く。研究結果・限界・実践提案を区別して解説します。",url:"https://riotbasketballacademy.com/ja/journal/research",siteName:"Riot Basketball Academy",locale:"ja_JP",type:"website"},twitter:{card:"summary_large_image",title:"参考文献を読み解く｜RBA JOURNAL",description:"原典・研究の限界・指導への応用を日本語で紹介する7編の研究シリーズ。"}};
const categories=["すべて","発達・長期育成","S&C・成熟","判断・練習設計","成長評価","少人数ゲーム","負荷・傷害予防","遊び・競技経験"];
export default function Page(){return <main className="rba-research-shell">
<p className="rba-research-kicker">RBA JOURNAL / RESEARCH LIBRARY</p>
<h1>参考文献を読み解く</h1>
<p className="rba-research-lead">研究の結果をそのまま練習に当てはめるのではなく、何が確かめられ、何がまだ分からないのかを整理する。RBA JOURNALの参考文献シリーズです。</p>
<p className="rba-research-note">本シリーズでは、原著論文・系統的レビュー・合意声明・理論書を区別して紹介します。日本語の解説は原典の逐語訳ではなく、公開情報を踏まえた要約とRBAの実践提案です。全文を確認できていない資料は、公開されている要旨や出版社情報の範囲で解説します。</p>
<nav className="rba-research-contents" aria-label="テーマから探す">{categories.map((cat,i)=><a key={cat} href={i===0?"#series":"#item-"+String(i).padStart(2,"0")}>{cat}</a>)}</nav>
<section id="series"><h2>研究シリーズ　全{researchEntries.length}編</h2>
<div className="rba-research-list">{researchEntries.map((e,i)=><article key={e.slug} id={"item-"+String(i+1).padStart(2,"0")}>
<p className="rba-research-item-meta">No. {e.number}　/　{e.topic}　/　{e.year}</p>
<h3><Link href={"/ja/journal/research/"+e.slug}>{e.title}</Link></h3>
<p>{e.question}</p>
<p className="rba-research-source">{e.author} · {e.kind}</p>
<Link className="rba-research-textlink" href={"/ja/journal/research/"+e.slug}>日本語解説を読む →</Link>
</article>)}</div></section>
<section className="rba-research-guide"><h2>読み進める順番</h2>
<p>最初に研究の種類と対象を確認します。次に実際の結果を読み、限界を確かめたうえで、自分の指導現場に何を取り入れられるかを考えます。研究に書かれていない効果まで断定しないことが重要です。</p>
<div className="rba-research-crosslinks"><Link href="/ja/journal/okinawa-coaching-references#how-to-read">参考文献の読み方を詳しく確認 →</Link><Link href="/ja/journal/youth-coaching-guidelines">RBA育成指導指針を見る →</Link><Link href="/ja/journal/coaches">指導者向けの記事一覧へ →</Link></div>
</section>
<footer className="rba-research-footer"><Link href="/ja/journal">← RBA JOURNALに戻る</Link><span>編集・公開：Riot Basketball Academy</span></footer>
</main>}