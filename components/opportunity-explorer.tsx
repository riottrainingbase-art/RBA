"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, CircleDollarSign, MapPin, Search, SlidersHorizontal, Users } from "lucide-react";
import { programmes } from "./programme-data";
import { Locale, localePath, SiteFrame } from "./site-frame";
import { tr } from "./network-data";

type Region="all"|"tohoku"|"kanto"|"kansai"|"kyushu"|"okinawa"|"online";
type Age="all"|"U8"|"U10"|"U12"|"U15"|"COACH";
type Kind="all"|"TRAIN"|"PLAY"|"TRAVEL"|"COACH";

const copy={
  ja:{title:"次の育成機会を、ここで見つける。",lead:"日程、地域、対象年代、内容、参加費、募集状況を見比べて、そのまま公式申込へ進めます。",filter:"条件を選ぶ",region:"地域",age:"対象",kind:"目的",all:"すべて",results:"件の募集中プログラム",empty:"条件に合う募集中の活動はありません。条件を変えてお探しください。",open:"募集中",date:"日程",place:"地域・会場",target:"対象",fee:"参加費",detail:"詳しく見る",apply:"公式申込へ",payment:"申込・決済案内",join:"RBA IDで、参加後も次につなげる",joinBody:"参加後の記録や次のおすすめ、学びをMY HOME COURTでまとめて確認できます。",regions:{tohoku:"東北",kanto:"関東",kansai:"関西",kyushu:"九州",okinawa:"沖縄",online:"オンライン"}},
  en:{title:"Find your next development opportunity.",lead:"Compare date, region, age, type, fee and availability, then continue to the official application.",filter:"Choose filters",region:"Region",age:"Age",kind:"Purpose",all:"All",results:"open programmes",empty:"No open programmes match these filters.",open:"Open",date:"Date",place:"Region / venue",target:"For",fee:"Fee",detail:"View details",apply:"Official application",payment:"Registration & payment",join:"Connect the next step with RBA ID",joinBody:"Bring participation, recommendations and learning into MY HOME COURT.",regions:{tohoku:"Tohoku",kanto:"Kanto",kansai:"Kansai",kyushu:"Kyushu",okinawa:"Okinawa",online:"Online"}},
  "zh-tw":{title:"在這裡找到下一個培育機會。",lead:"比較日期、地區、年齡、類型、費用及招募狀態，直接前往官方報名。",filter:"選擇條件",region:"地區",age:"對象",kind:"目的",all:"全部",results:"個開放報名活動",empty:"目前沒有符合條件的活動，請調整篩選。",open:"招募中",date:"日期",place:"地區・場地",target:"對象",fee:"費用",detail:"查看詳情",apply:"官方報名",payment:"報名與付款",join:"使用RBA ID連結下一步",joinBody:"在MY HOME COURT整理參加、推薦活動與學習內容。",regions:{tohoku:"東北",kanto:"關東",kansai:"關西",kyushu:"九州",okinawa:"沖繩",online:"線上"}},
  ko:{title:"다음 성장 기회를 여기에서 찾으세요.",lead:"일정, 지역, 연령, 유형, 비용과 모집 상태를 비교하고 공식 신청으로 이동합니다.",filter:"조건 선택",region:"지역",age:"대상",kind:"목적",all:"전체",results:"개 모집 중 프로그램",empty:"조건에 맞는 모집 중 프로그램이 없습니다.",open:"모집 중",date:"일정",place:"지역・장소",target:"대상",fee:"참가비",detail:"자세히 보기",apply:"공식 신청",payment:"신청・결제 안내",join:"RBA ID로 다음 기회 연결",joinBody:"MY HOME COURT에서 참가, 추천 활동과 학습을 이어갑니다.",regions:{tohoku:"도호쿠",kanto:"간토",kansai:"간사이",kyushu:"규슈",okinawa:"오키나와",online:"온라인"}}
} as const;

export function OpportunityExplorer({locale}:{locale:Locale}){
  const c=copy[locale];
  const [region,setRegion]=useState<Region>("all");
  const [age,setAge]=useState<Age>("all");
  const [kind,setKind]=useState<Kind>("all");
  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      const q=new URLSearchParams(location.search);
      const r=q.get("region") as Region|null; const a=q.get("age") as Age|null; const k=q.get("kind") as Kind|null;
      if(r&&["tohoku","kanto","kansai","kyushu","okinawa","online"].includes(r))setRegion(r);
      if(a&&["U8","U10","U12","U15","COACH"].includes(a))setAge(a);
      if(k&&["TRAIN","PLAY","TRAVEL","COACH"].includes(k))setKind(k);
    },0);
    return ()=>window.clearTimeout(timer);
  },[]);
  const visible=useMemo(()=>programmes.filter(p=>!p.registrationClosed&&(region==="all"||p.region===region)&&(age==="all"||p.ageGroups.some(group=>group===age))&&(kind==="all"||p.category===kind)),[region,age,kind]);
  const update=(next:{region?:Region;age?:Age;kind?:Kind})=>{
    const r=next.region??region,a=next.age??age,k=next.kind??kind;
    const q=new URLSearchParams(); if(r!=="all")q.set("region",r);if(a!=="all")q.set("age",a);if(k!=="all")q.set("kind",k);
    history.replaceState(null,"",`${location.pathname}${q.size?`?${q}`:""}`);
  };
  return <SiteFrame locale={locale} languagePage="opportunities"><div className="opportunity-page">
    <section className="opportunity-hero section-pad"><a className="back-link" href={localePath(locale)}>← RBA</a><p className="section-index inverse"><Search size={15}/> RBA OPPORTUNITIES</p><h1>{c.title}</h1><p>{c.lead}</p></section>
    <section className="opportunity-controls section-pad" aria-label={c.filter}><div className="opportunity-filter-head"><SlidersHorizontal/><div><p className="section-index">FILTER</p><h2>{c.filter}</h2></div><strong>{visible.length}{c.results}</strong></div><div className="opportunity-filters">
      <label>{c.region}<select value={region} onChange={e=>{const v=e.target.value as Region;setRegion(v);update({region:v})}}><option value="all">{c.all}</option>{Object.entries(c.regions).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label>{c.age}<select value={age} onChange={e=>{const v=e.target.value as Age;setAge(v);update({age:v})}}><option value="all">{c.all}</option>{["U8","U10","U12","U15","COACH"].map(v=><option key={v}>{v}</option>)}</select></label>
      <label>{c.kind}<select value={kind} onChange={e=>{const v=e.target.value as Kind;setKind(v);update({kind:v})}}><option value="all">{c.all}</option>{["TRAIN","PLAY","TRAVEL","COACH"].map(v=><option key={v}>{v}</option>)}</select></label>
    </div></section>
    <section className="opportunity-results section-pad" aria-live="polite">{visible.length?<div className="opportunity-card-grid">{visible.map(p=>{const detail=p.detailPath?localePath(locale,p.detailPath):null;return <article key={p.id}><div className="opportunity-card-top"><span>{p.category}</span><strong>{c.open}</strong></div><h2>{tr(p.title,locale)}</h2><dl><div><dt><CalendarDays/>{c.date}</dt><dd>{tr(p.date,locale)}</dd></div><div><dt><MapPin/>{c.place}</dt><dd>{tr(p.place,locale)}</dd></div><div><dt><Users/>{c.target}</dt><dd>{tr(p.audience,locale)}</dd></div><div><dt><CircleDollarSign/>{c.fee}</dt><dd>{tr(p.price,locale)}</dd></div></dl><div className="opportunity-card-actions">{detail?<a href={detail}>{c.detail}<ArrowRight/></a>:null}<a href={p.applicationUrl} target="_blank" rel="noreferrer">{c.apply}<ArrowUpRight/></a></div></article>})}</div>:<div className="opportunity-empty"><Search/><p>{c.empty}</p></div>}</section>
    <section className="opportunity-member-bridge section-pad"><div><p className="section-index inverse">RBA ID / MY HOME COURT</p><h2>{c.join}</h2><p>{c.joinBody}</p></div><div><a className="button button-light" href={localePath(locale,"my-homecourt")}>MY HOME COURT<ArrowRight/></a><a className="text-link light-link" href={localePath(locale,"payments")}>{c.payment}<ArrowRight/></a></div></section>
  </div></SiteFrame>;
}
