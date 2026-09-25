"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Bookmark, CalendarDays, CircleDollarSign, MapPin, Search, SlidersHorizontal, Users } from "lucide-react";
import { programmes } from "./programme-data";
import { Locale, localePath, SiteFrame } from "./site-frame";
import { tr } from "./network-data";
import { createClient } from "@/lib/supabase/client";

type Region="all"|"tohoku"|"kanto"|"kansai"|"kyushu"|"okinawa"|"online";
type Age="all"|"U8"|"U10"|"U12"|"U15"|"COACH";
type Kind="all"|"TRAIN"|"PLAY"|"TRAVEL"|"COACH";

const copy={
  ja:{title:"次の育成機会を、ここで見つける。",lead:"所属や地域だけで選択肢を決めず、日程・年代・目的から自分に合う活動を探せます。今のチームに所属したまま参加できる企画もあります。参加条件を確認したうえで、そのまま公式申込へ進めます。",filter:"条件を選ぶ",region:"地域",age:"対象",kind:"目的",all:"すべて",results:"件の募集中プログラム",empty:"条件に合う募集中の活動はありません。条件を変えてお探しください。",open:"募集中",date:"日程",place:"地域・会場",target:"対象",fee:"参加費",detail:"詳しく見る",apply:"公式申込へ",payment:"申込・決済案内",join:"RBA IDで、参加した経験を次につなげる",joinBody:"参加履歴や振り返り、次のおすすめ、学びをMY HOME COURTでまとめて確認できます。",regions:{tohoku:"東北",kanto:"関東",kansai:"関西",kyushu:"九州",okinawa:"沖縄",online:"オンライン"}},
  en:{title:"Find your next development opportunity.",lead:"Compare date, region, age, type, fee and availability, then continue to the official application.",filter:"Choose filters",region:"Region",age:"Age",kind:"Purpose",all:"All",results:"open programmes",empty:"No open programmes match these filters.",open:"Open",date:"Date",place:"Region / venue",target:"For",fee:"Fee",detail:"View details",apply:"Official application",payment:"Registration & payment",join:"Connect the next step with RBA ID",joinBody:"Bring participation, recommendations and learning into MY HOME COURT.",regions:{tohoku:"Tohoku",kanto:"Kanto",kansai:"Kansai",kyushu:"Kyushu",okinawa:"Okinawa",online:"Online"}},
  "zh-tw":{title:"在這裡找到下一個培育機會。",lead:"比較日期、地區、年齡、類型、費用及招募狀態，直接前往官方報名。",filter:"選擇條件",region:"地區",age:"對象",kind:"目的",all:"全部",results:"個開放報名活動",empty:"目前沒有符合條件的活動，請調整篩選。",open:"招募中",date:"日期",place:"地區・場地",target:"對象",fee:"費用",detail:"查看詳情",apply:"官方報名",payment:"報名與付款",join:"使用RBA ID連結下一步",joinBody:"在MY HOME COURT整理參加、推薦活動與學習內容。",regions:{tohoku:"東北",kanto:"關東",kansai:"關西",kyushu:"九州",okinawa:"沖繩",online:"線上"}},
  ko:{title:"다음 성장 기회를 여기에서 찾으세요.",lead:"일정, 지역, 연령, 유형, 비용과 모집 상태를 비교하고 공식 신청으로 이동합니다.",filter:"조건 선택",region:"지역",age:"대상",kind:"목적",all:"전체",results:"개 모집 중 프로그램",empty:"조건에 맞는 모집 중 프로그램이 없습니다.",open:"모집 중",date:"일정",place:"지역・장소",target:"대상",fee:"참가비",detail:"자세히 보기",apply:"공식 신청",payment:"신청・결제 안내",join:"RBA ID로 다음 기회 연결",joinBody:"MY HOME COURT에서 참가, 추천 활동과 학습을 이어갑니다.",regions:{tohoku:"도호쿠",kanto:"간토",kansai:"간사이",kyushu:"규슈",okinawa:"오키나와",online:"온라인"}}
} as const;

const pathwayLabel=(locale:Locale,pathway?:string)=>({
  "development-camp":({ja:"DEVELOPMENT CAMP",en:"DEVELOPMENT CAMP","zh-tw":"DEVELOPMENT CAMP",ko:"DEVELOPMENT CAMP"})[locale],
  united:"RBA UNITED",
  clinic:({ja:"CLINIC",en:"CLINIC","zh-tw":"CLINIC",ko:"CLINIC"})[locale],
  coach:({ja:"COACH EDUCATION",en:"COACH EDUCATION","zh-tw":"COACH EDUCATION",ko:"COACH EDUCATION"})[locale],
}[pathway||""]||"RBA");

export function OpportunityExplorer({locale}:{locale:Locale}){
  const c=copy[locale];
  const [region,setRegion]=useState<Region>("all");
  const [age,setAge]=useState<Age>("all");
  const [kind,setKind]=useState<Kind>("all");
  const db=useMemo(()=>createClient(),[]);
  const [userId,setUserId]=useState<string|null>(null);
  const [saved,setSaved]=useState<string[]>([]);
  const [saving,setSaving]=useState("");
  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      const q=new URLSearchParams(location.search);
      const r=q.get("region") as Region|null; const a=q.get("age") as Age|null; const k=q.get("kind") as Kind|null;
      if(r&&["tohoku","kanto","kansai","kyushu","okinawa","online"].includes(r))setRegion(r);
      if(a&&["U8","U10","U12","U15","COACH"].includes(a))setAge(a);
      if(k&&["TRAIN","PLAY","TRAVEL","COACH"].includes(k))setKind(k);
      void db.auth.getUser().then(async({data})=>{
        const id=data.user?.id||null;setUserId(id);
        if(!id)return;
        const result=await db.from("homecourt_saves").select("item_key").eq("user_id",id).eq("item_type","opportunity");
        if(!result.error)setSaved((result.data||[]).map(item=>item.item_key));
        void db.from("analytics_events").insert({user_id:id,event_name:"opportunity_view",item_type:"opportunity_list",item_key:"opportunities",locale});
      });
    },0);
    return ()=>window.clearTimeout(timer);
  },[db,locale]);
  const visible=useMemo(()=>programmes.filter(p=>!p.registrationClosed&&(region==="all"||p.region===region)&&(age==="all"||p.ageGroups.some(group=>group===age))&&(kind==="all"||p.category===kind)),[region,age,kind]);
  const update=(next:{region?:Region;age?:Age;kind?:Kind})=>{
    const r=next.region??region,a=next.age??age,k=next.kind??kind;
    const q=new URLSearchParams(); if(r!=="all")q.set("region",r);if(a!=="all")q.set("age",a);if(k!=="all")q.set("kind",k);
    history.replaceState(null,"",`${location.pathname}${q.size?`?${q}`:""}`);
    if(userId)void db.from("analytics_events").insert({user_id:userId,event_name:"filter_apply",item_type:"opportunity",item_key:[r,a,k].join(":"),locale});
  };
  async function toggleSave(p:(typeof programmes)[number]){
    if(!userId){location.href=`${locale==="en"?"":`/${locale}`}/my-homecourt/login?next=${encodeURIComponent(`${locale==="en"?"":`/${locale}`}/opportunities`)}`;return;}
    setSaving(p.id);
    const exists=saved.includes(p.id);
    if(exists){
      await db.from("homecourt_saves").delete().eq("user_id",userId).eq("item_type","opportunity").eq("item_key",p.id);
      setSaved(current=>current.filter(id=>id!==p.id));
    }else{
      const result=await db.from("homecourt_saves").insert({user_id:userId,item_type:"opportunity",item_key:p.id,title:tr(p.title,locale),href:p.detailPath?localePath(locale,p.detailPath):p.applicationUrl,metadata:{category:p.category,region:p.region,start_date:p.startDate}});
      if(!result.error)setSaved(current=>[...current,p.id]);
    }
    void db.from("analytics_events").insert({user_id:userId,event_name:exists?"opportunity_unsave":"opportunity_save",item_type:"opportunity",item_key:p.id,locale});
    setSaving("");
  }

  return <SiteFrame locale={locale} languagePage="opportunities"><div className="opportunity-page">
    <section className="opportunity-hero section-pad"><a className="back-link" href={localePath(locale)}>← RBA</a><p className="section-index inverse"><Search size={15}/> RBA OPPORTUNITIES</p><h1>{c.title}</h1><p>{c.lead}</p></section>
    <section className="homecourt-plan-separation section-pad"><div className="homecourt-plan-intro"><p className="section-index">CHOOSE THE RIGHT PATH</p><h2>{({ja:"Development CampとRBA UNITEDは、別のプログラムです。",en:"Development Camp and RBA UNITED are different programmes.","zh-tw":"Development Camp 與 RBA UNITED 是不同的方案。",ko:"Development Camp와 RBA UNITED는 서로 다른 프로그램입니다."})[locale]}</h2><p>{({ja:"目的から選んでください。育成を深めるならDevelopment Camp。大会・遠征・国際交流へ期間限定チームで挑戦するならRBA UNITEDです。",en:"Choose by purpose: Development Camp is for learning and growth; RBA UNITED is for a time-limited team challenge in a tournament, trip or exchange.","zh-tw":"請依目的選擇：Development Camp著重培育與學習；RBA UNITED則以期間限定團隊挑戰大會、遠征或國際交流。",ko:"목적에 따라 선택하세요. Development Camp는 성장과 학습, RBA UNITED는 기간 한정 팀으로 대회·원정·국제교류에 도전하는 경로입니다."})[locale]}</p></div><div className="homecourt-plan-grid"><article className="homecourt-plan-card"><span>DEVELOPMENT</span><h3>Development Camp</h3><p>{({ja:"練習・ゲーム・身体づくり・振り返りを通して、普段の環境へ持ち帰る成長課題をつくる。",en:"Train, play, prepare physically and reflect—then take a clear development theme back home.","zh-tw":"透過訓練、比賽、身體準備與反思，把清楚的成長課題帶回日常。",ko:"훈련·게임·신체 준비·회고를 통해 일상으로 가져갈 성장 과제를 만듭니다."})[locale]}</p><a className="button button-light" href={localePath(locale,"camp")}>Development Camp<ArrowRight/></a></article><article className="homecourt-plan-card"><span>CHALLENGE</span><h3>RBA UNITED</h3><p>{({ja:"個人で集まり、大会・遠征・国際交流など特定の挑戦のために期間限定チームを組む。",en:"Individual players form a time-limited team for a specific tournament, trip or exchange challenge.","zh-tw":"個人球員為特定大會、遠征或國際交流挑戰組成期間限定團隊。",ko:"개인 선수가 특정 대회·원정·국제교류 도전을 위해 기간 한정 팀을 구성합니다."})[locale]}</p><a className="button button-dark" href={localePath(locale,"united")}>RBA UNITED<ArrowRight/></a></article></div></section>
    <section className="opportunity-controls section-pad" aria-label={c.filter}><div className="opportunity-filter-head"><SlidersHorizontal/><div><p className="section-index">FILTER</p><h2>{c.filter}</h2></div><strong>{visible.length}{c.results}</strong></div><div className="opportunity-filters">
      <label>{c.region}<select value={region} onChange={e=>{const v=e.target.value as Region;setRegion(v);update({region:v})}}><option value="all">{c.all}</option>{Object.entries(c.regions).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label>{c.age}<select value={age} onChange={e=>{const v=e.target.value as Age;setAge(v);update({age:v})}}><option value="all">{c.all}</option>{["U8","U10","U12","U15","COACH"].map(v=><option key={v}>{v}</option>)}</select></label>
      <label>{c.kind}<select value={kind} onChange={e=>{const v=e.target.value as Kind;setKind(v);update({kind:v})}}><option value="all">{c.all}</option>{["TRAIN","PLAY","TRAVEL","COACH"].map(v=><option key={v}>{v}</option>)}</select></label>
    </div></section>
    {locale==="ja"?<section className="registration-flow section-pad"><div><p className="section-index inverse">HOW TO JOIN</p><h2>参加までの流れを、分かりやすく。</h2></div><div><ol><li><span>01</span><div><strong>活動を探す</strong><p>年代・地域・目的から、自分に合う企画を絞り込みます。</p></div></li><li><span>02</span><div><strong>条件と費用を確認</strong><p>対象、会場、参加費、持ち物、宿泊の有無などを確認します。</p></div></li><li><span>03</span><div><strong>公式フォームから申し込む</strong><p>各カードの「このコートに挑戦する」から、RBAの公式申込フォームへ進みます。</p></div></li><li><span>04</span><div><strong>決済して受付を完了する</strong><p>フォーム送信後の案内に沿って決済し、RBAからの受付完了案内をご確認ください。</p></div></li></ol><p className="registration-note">普段所属しているチームがあっても、各企画の参加条件を満たせば申し込めます。大会・遠征など一部企画では個別条件がありますので、各申込ページを優先してください。</p></div></section>:null}
    <section className="opportunity-results section-pad" aria-live="polite">{visible.length?<div className="opportunity-card-grid">{visible.map(p=>{const detail=p.detailPath?localePath(locale,p.detailPath):null;return <article key={p.id}><div className="opportunity-card-top"><span>{pathwayLabel(locale,p.pathway)}</span><strong>{c.open}</strong></div><h2>{tr(p.title,locale)}</h2><dl><div><dt><CalendarDays/>{c.date}</dt><dd>{tr(p.date,locale)}</dd></div><div><dt><MapPin/>{c.place}</dt><dd>{tr(p.place,locale)}</dd></div><div><dt><Users/>{c.target}</dt><dd>{tr(p.audience,locale)}</dd></div><div><dt><CircleDollarSign/>{c.fee}</dt><dd>{tr(p.price,locale)}</dd></div></dl><div className="opportunity-card-actions"><button className="opportunity-save" type="button" aria-pressed={saved.includes(p.id)} disabled={saving===p.id} onClick={()=>void toggleSave(p)}><Bookmark fill={saved.includes(p.id)?"currentColor":"none"}/>{saved.includes(p.id)?({ja:"保存済み",en:"Saved","zh-tw":"已收藏",ko:"저장됨"})[locale] :({ja:"保存する",en:"Save","zh-tw":"收藏",ko:"저장"})[locale]}</button>{detail?<a href={detail}>{c.detail}<ArrowRight/></a>:null}<a href={p.applicationUrl} target="_blank" rel="noreferrer">{locale==="ja"?"このコートに挑戦する":c.apply}<ArrowUpRight/></a></div></article>})}</div>:<div className="opportunity-empty"><Search/><p>{c.empty}</p></div>}</section>
    {locale==="ja"?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">YOUR NEXT COURT</p><h2>「どこに行く？」より、「何を試す？」</h2></div><p>参加する活動を選んだら、当日に試したいことを一つ決めてみましょう。参加後はMY HOME COURTに記録し、次の挑戦につなげられます。</p></div>
      <div className="homecourt-preview-grid">
        <article><CalendarDays/><span>01</span><h3>見つける</h3><p>年代・地域・目的から行ってみたいコートを探す。</p></article>
        <article><Users/><span>02</span><h3>決める</h3><p>当日やってみたいプレーや挑戦を一つ決める。</p></article>
        <article><Bookmark/><span>03</span><h3>保存する</h3><p>気になる活動は保存しておけば、あとでMY HOME COURTからもう一度確認できます。</p></article>
        <article><ArrowRight/><span>04</span><h3>次へ</h3><p>参加した経験をPassportに残し、次のコートへ。</p></article>
      </div>
    </section>:null}
    <section className="opportunity-member-bridge section-pad"><div><p className="section-index inverse">RBA ID / MY HOME COURT</p><h2>{c.join}</h2><p>{c.joinBody}</p>{locale==="ja"?<p>過去にRBAへ参加した方は、これまでの経験をPassportに残せます。指導者の方はD-HUB・Torsten・Coach EducationをMY HOME COURTから続けられます。</p>:null}</div><div><a className="button button-light" href={localePath(locale,"my-homecourt")}>MY HOME COURT<ArrowRight/></a>{locale==="ja"?<><a className="text-link light-link" href="/ja/my-homecourt/participants">過去の参加を記録する<ArrowRight/></a><a className="text-link light-link" href="/ja/my-homecourt/coaches">指導者向けHOME<ArrowRight/></a></>:null}<a className="text-link light-link" href={localePath(locale,"payments")}>{c.payment}<ArrowRight/></a></div></section>
  </div></SiteFrame>;
}
