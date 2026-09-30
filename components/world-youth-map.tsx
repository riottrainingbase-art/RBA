"use client";
import {useMemo,useState} from "react";
import {ArrowUpRight,BookOpen,Filter,Globe2} from "lucide-react";
import {SiteFrame} from "./site-frame";
import {worldYouthEntries,type WorldYouthCategory} from "./world-youth-data";
const labels:Record<WorldYouthCategory,string>={rules:"ルール",competition:"競技環境",coach_education:"コーチ教育",talent:"タレント育成",school:"学校・地域",girls:"女子育成","3x3":"3x3",environment:"育成環境"};
export function WorldYouthMap(){
 const [category,setCategory]=useState<"all"|WorldYouthCategory>("all");
 const items=useMemo(()=>category==="all"?worldYouthEntries:worldYouthEntries.filter(x=>x.category===category),[category]);
 return <SiteFrame locale="ja" languagePage="journal"><main className="world-youth-map">
  <section className="world-youth-map-hero section-pad"><p className="section-index inverse"><Globe2/> RBA JOURNAL / WORLD YOUTH BASKETBALL MAP 2026</p><h1>制度の違いから、<br/>育成環境を考える。</h1><p>海外の制度を正解として紹介するページではありません。FIBA、各国協会、育成年代リーグなどの一次情報から、何が変わったのか、なぜその仕組みが必要なのか、日本の現場で何を問い直せるのかを整理します。</p><div><span>PRIMARY SOURCES</span><span>VERIFIED UPDATES</span><span>NO COUNTRY RANKING</span></div></section>
  <section className="world-youth-map-controls section-pad"><div><Filter/><strong>テーマから見る</strong></div><div>{(["all","rules","competition","coach_education","talent","school","girls","3x3"] as const).map(key=><button key={key} aria-pressed={category===key} onClick={()=>setCategory(key)}>{key==="all"?"すべて":labels[key]}</button>)}</div></section>
  <section className="world-youth-map-list section-pad">{items.map((item,index)=><article key={item.slug}><header><div><span>{String(index+1).padStart(2,"0")} / {item.country}</span><small>{labels[item.category]} · VERIFIED {item.verifiedOn}</small></div><h2>{item.title}</h2></header><div className="world-youth-map-columns"><section><span>確認できること</span><p>{item.fact}</p></section><section><span>育成上の意味</span><p>{item.meaning}</p></section><section><span>日本で考えたいこと</span><p>{item.japanQuestion}</p></section></div><footer><strong>{item.organization}</strong><a href={item.sourceUrl} target="_blank" rel="noreferrer">一次情報を確認 <ArrowUpRight/></a>{item.articleSlug?<a href={`/ja/journal/${item.articleSlug}`}><BookOpen/> RBA JOURNALで背景を読む</a>:null}</footer></article>)}</section>
  <section className="world-youth-map-note section-pad"><p className="section-index">EDITORIAL POLICY</p><h2>「世界では」が主語にならないように。</h2><p>国や地域によって人口、学校制度、競技文化、財政、クラブ構造は異なります。RBAは制度を単純に優劣で並べず、一次資料で確認できる事実とRBAの解釈を分け、検証日を残します。</p></section>
 </main></SiteFrame>
}
