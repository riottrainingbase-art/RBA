"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, CreditCard, ExternalLink, MapPin, Search, Users } from "lucide-react";
import { isProgrammeActive, programmes, type Programme } from "@/components/programme-data";

type Area = "all" | Programme["region"];
type Focus = "all" | "clinic" | "camp" | "online" | "exchange";
type Age = "all" | "U8" | "U10" | "U12" | "U14" | "U15" | "U18" | "COACH";
const areas: { key: Area; label: string }[] = [
 {key:"all",label:"全国・すべて"},{key:"tohoku",label:"東北"},{key:"kanto",label:"関東"},{key:"kansai",label:"関西"},
 {key:"kyushu",label:"九州"},{key:"okinawa",label:"沖縄"},{key:"online",label:"オンライン"},
];
const focus: {key:Focus;label:string}[] = [
 {key:"all",label:"全プログラム"},{key:"clinic",label:"クリニック・スクール"},{key:"camp",label:"キャンプ"},{key:"online",label:"オンライン講習"},{key:"exchange",label:"国際交流・大会"},
];
const ages:Age[]=["all","U8","U10","U12","U14","U15","U18","COACH"];
const emoji:Record<Focus,string>={all:"🏀",clinic:"🏀",camp:"⛹️",online:"💻",exchange:"🌍"};
const special=new Set(["kobe-u14-2027"]);
function classify(p:Programme):Focus{
 if(p.pathway==="united"||p.category==="PLAY")return "exchange";
 if(p.region==="online"||p.pathway==="coach")return "online";
 if(p.pathway==="development-camp"||p.category==="TRAVEL")return "camp";
 return "clinic";
}
function dateKey(p:Programme){return p.ongoing?"9999-12-31":p.startDate;}
function destination(p:Programme){
  // Existing official application/payment routes are authoritative; do not invent checkout links.
  return p.applicationUrl;
}
function destinationLabel(p:Programme){
  if(p.id==="kobe-u14-2027")return "仮申込・前金決済の手順へ";
  if(p.id==="kagoshima-nov29")return "申込・決済ページへ";
  if(p.id==="okinawa-december-camp")return "キャンプ公式申込・決済へ";
  return "公式申込へ進む";
}
const closedTitle="参加条件・受付状況・最新の決済可否は、必ず公式リンク先をご確認ください。既にお支払い済みの場合は、重複して決済しないでください。";
export function MemberClinicCatalog(){
 const [area,setArea]=useState<Area>("all");
 const [type,setType]=useState<Focus>("all");
 const [age,setAge]=useState<Age>("all");
 const [search,setSearch]=useState("");
 const visible=useMemo(()=>programmes
   .filter(p=>isProgrammeActive(p))
   .filter(p=>area==="all"||p.region===area)
   .filter(p=>type==="all"||classify(p)===type)
   .filter(p=>age==="all"||p.ageGroups.includes(age))
   .filter(p=>!search||[p.title[1],p.place[1],p.audience[1]].join(" ").toLowerCase().includes(search.toLowerCase()))
   .sort((a,b)=>dateKey(a).localeCompare(dateKey(b))),
 [area,type,age,search]);
 const filters="min-h-11 w-full rounded border border-black/25 bg-white px-3 py-2 text-sm focus:border-[#db651c] focus:outline-none";
 return <section className="mt-8">
  <div className="border-2 border-black bg-white p-5 sm:p-7">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><p className="text-xs font-black tracking-[.16em] text-[#c65416]">FIND YOUR NEXT COURT</p><h2 className="mt-2 text-2xl font-black">クリニック・キャンプを探す</h2></div>
      <span className="text-sm font-bold">{visible.length} 件の案内</span>
    </div>
    <p className="mt-3 text-sm leading-7">地域・対象年代・目的で検索。参加費と条件を確認し、公式の申込ページへ進めます。受付状況はイベントごとに異なります。開催終了・受付停止の企画は表示しません。</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-sm font-bold">地域<select className={filters+" mt-2"} value={area} onChange={e=>setArea(e.target.value as Area)}>{areas.map(a=><option key={a.key} value={a.key}>{a.label}</option>)}</select></label>
      <label className="text-sm font-bold">企画の種類<select className={filters+" mt-2"} value={type} onChange={e=>setType(e.target.value as Focus)}>{focus.map(f=><option key={f.key} value={f.key}>{f.label}</option>)}</select></label>
      <label className="text-sm font-bold">対象区分<select className={filters+" mt-2"} value={age} onChange={e=>setAge(e.target.value as Age)}>{ages.map(x=><option key={x} value={x}>{x==="all"?"全年代":x}</option>)}</select></label>
      <label className="text-sm font-bold">キーワード<div className="relative mt-2"><Search className="absolute left-3 top-3 h-5 w-5 text-black/50"/><input className={filters+" pl-10"} type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="地域・イベント名など"/></div></label>
    </div>
  </div>
  <div className="mt-6 grid gap-5 lg:grid-cols-2" aria-live="polite">
    {visible.map(p=>{
      const kind=classify(p);
      const url=destination(p);
      const external=!url.startsWith("/");
      const info=p.japaneseInfoPath && p.japaneseInfoPath!==url?p.japaneseInfoPath:null;
      const linkProps=external?{target:"_blank",rel:"noopener noreferrer"}:{};
      return <article key={p.id} className="flex flex-col border border-black/20 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-black tracking-widest text-[#cd5d17]">{emoji[kind]} {focus.find(f=>f.key===kind)?.label}</span>
          <span className="text-xs text-black/65">受付条件は主催者案内を優先</span>
        </div>
        <h3 className="mt-3 text-xl font-black leading-7">{p.title[1]}</h3>
        <div className="mt-5 space-y-2 text-sm leading-6">
          <p className="flex items-start gap-2"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0"/><span>{p.date[1]}</span></p>
          <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0"/><span>{p.place[1]}</span></p>
          <p className="flex items-start gap-2"><Users className="mt-0.5 h-4 w-4 shrink-0"/><span>{p.audience[1]}</span></p>
          <p className="flex items-start gap-2 font-bold"><CreditCard className="mt-0.5 h-4 w-4 shrink-0"/><span>{p.price[1]}</span></p>
        </div>
        <p className="mt-4 flex-1 border-t border-black/15 pt-4 text-sm leading-7">{p.payment[1]}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 bg-black px-4 py-3 text-center text-sm font-bold text-white" href={url} {...linkProps}>{destinationLabel(p)}<ExternalLink className="h-4 w-4"/></Link>
          {info?<Link href={info} className="inline-flex min-h-11 items-center justify-center border border-black/25 px-4 py-3 text-sm font-bold">詳細・注意事項</Link>:null}
        </div>
      </article>;
    })}
  </div>
  {visible.length===0?<div className="mt-6 border border-black/20 bg-white p-8 text-center"><p className="font-bold">条件に合う案内はありません。</p><button className="mt-4 underline" type="button" onClick={()=>{setArea("all");setAge("all");setType("all");setSearch("");}}>すべての条件をリセット</button></div>:null}
  <p className="mt-7 border-l-4 border-[#db651c] bg-[#fff5e9] p-5 text-sm leading-7">{closedTitle} 本ページはRBA公式掲載データをもとに、申込先をまとめたものです。各外部フォームの支払い完了をこの画面が自動保証するものではありません。</p>
  <div className="mt-6 flex flex-wrap gap-3"><Link className="inline-flex min-h-12 items-center bg-[#ef6b20] px-5 py-3 font-black" href="/ja/my-homecourt/app/united-2027">神戸U14・前金の確認</Link><Link href="/ja/opportunities" className="inline-flex min-h-12 items-center border border-black/25 bg-white px-5 py-3 font-bold">RBA全体の活動一覧へ</Link></div>
 </section>;
}
