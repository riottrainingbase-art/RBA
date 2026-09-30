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
  <section className="world-youth-map-hero section-pad"><p className="section-index inverse"><Globe2/> RBA JOURNAL / WORLD YOUTH BASKETBALL MAP 2026</p><h1>制度を比べると、<br/>見えてくるものがある。</h1><p>海外の制度を、そのまま日本の正解として紹介するページではありません。FIBAや各国協会、育成年代リーグなどの一次資料をもとに、実際に何が変わったのか、その制度は何を解決しようとしているのか、日本の現場から見たときに何を考えられるのかを整理します。</p><div><span>PRIMARY SOURCES</span><span>VERIFIED UPDATES</span><span>NO COUNTRY RANKING</span></div></section>
  <section className="world-youth-map-controls section-pad"><div><Filter/><strong>テーマから見る</strong></div><div>{(["all","rules","competition","coach_education","talent","school","girls","3x3"] as const).map(key=><button key={key} aria-pressed={category===key} onClick={()=>setCategory(key)}>{key==="all"?"すべて":labels[key]}</button>)}</div></section>
  <section className="world-youth-map-list section-pad">{items.map((item,index)=><article key={item.slug}><header><div><span>{String(index+1).padStart(2,"0")} / {item.country}</span><small>{labels[item.category]} · VERIFIED {item.verifiedOn}</small></div><h2>{item.title}</h2></header><div className="world-youth-map-columns"><section><span>資料から確認できること</span><p>{item.fact}</p></section><section><span>この制度を見る意味</span><p>{item.meaning}</p></section><section><span>日本の現場で考えたいこと</span><p>{item.japanQuestion}</p></section></div><footer><strong>{item.organization}</strong><a href={item.sourceUrl} target="_blank" rel="noreferrer">一次資料を開く <ArrowUpRight/></a>{item.articleSlug?<a href={`/ja/journal/${item.articleSlug}`}><BookOpen/> JOURNALで背景を読む</a>:null}</footer></article>)}</section>
  <section className="world-youth-map-note section-pad"><p className="section-index">EDITORIAL POLICY</p><h2>「海外ではこうだ」で、ひとまとめにしない。</h2><p>人口も、学校制度も、クラブの成り立ちも国や地域によって違います。制度を単純に優劣で並べず、一次資料から確認できる事実とRBAの見方を分けて掲載します。情報を確認した日も残し、制度が変わったときに追える形にします。</p></section>
 </main></SiteFrame>
}
