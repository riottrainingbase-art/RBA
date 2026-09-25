"use client";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, FileText, LoaderCircle, Printer, Sparkles, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "./site-frame";

type Weekly={id:string;week_start:string;theme:string;action:string;reflection:string;next_action:string;status:string};
type Monthly={id:string;period_month:string;focus:string;wins:string;challenge:string;next_action:string};
type History={id:string;title:string;occurred_on:string;venue:string;takeaway:string;next_action:string};

const copy={
  ja:{eyebrow:"DEVELOPMENT REPORT",title:"成長の記録を、1枚にまとめる。",lead:"週ごとのテーマ、月ごとの振り返り、参加履歴を一つにまとめます。自分のための振り返りとして使えます。",print:"印刷・PDF保存",weekly:"最近のWEEKLY LOOP",monthly:"MONTHLY REVIEW",history:"最近の参加履歴",empty:"まだ記録がありません。",privacy:"このレポートは非公開データから作成されます。共有する場合は、自分または保護者の判断で行ってください。",loading:"レポートを作成しています…"},
  en:{eyebrow:"DEVELOPMENT REPORT",title:"Put your development journey on one page.",lead:"Bring weekly themes, monthly reviews and participation history together.",print:"Print / Save PDF",weekly:"Recent weekly loops",monthly:"Monthly reviews",history:"Recent participation",empty:"No records yet.",privacy:"This report is built from private data. Share only if you choose to.",loading:"Building report…"},
  "zh-tw":{eyebrow:"DEVELOPMENT REPORT",title:"把成長紀錄整理成一頁。",lead:"整合每週主題、每月回顧與參加紀錄。",print:"列印 / 儲存PDF",weekly:"最近每週循環",monthly:"每月回顧",history:"最近參加紀錄",empty:"尚無紀錄。",privacy:"此報告由私人資料產生，僅在你選擇時分享。",loading:"建立報告中…"},
  ko:{eyebrow:"DEVELOPMENT REPORT",title:"성장 기록을 한 장에 정리합니다.",lead:"주간 주제, 월간 회고와 참가 기록을 함께 봅니다.",print:"인쇄 / PDF 저장",weekly:"최근 주간 루프",monthly:"월간 리뷰",history:"최근 참가 기록",empty:"기록이 아직 없습니다.",privacy:"이 보고서는 비공개 데이터로 만들어집니다. 공유 여부는 본인 또는 보호자가 결정합니다.",loading:"보고서 작성 중…"}
} as const;

export function HomecourtDevelopmentReport({userId,locale,name,role,region}:{userId:string;locale:Locale;name:string;role:string;region?:string|null}){
  const c=copy[locale];
  const db=useMemo(()=>createClient(),[]);
  const safeRole=role==="coach"?"coach":role==="parent"?"parent":"player";
  const [weekly,setWeekly]=useState<Weekly[]>([]);
  const [monthly,setMonthly]=useState<Monthly[]>([]);
  const [history,setHistory]=useState<History[]>([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    let alive=true;
    void Promise.all([
      db.from("homecourt_weekly_actions").select("id,week_start,theme,action,reflection,next_action,status").eq("user_id",userId).eq("role",safeRole).order("week_start",{ascending:false}).limit(8),
      db.from("homecourt_monthly_reviews").select("id,period_month,focus,wins,challenge,next_action").eq("user_id",userId).eq("role",safeRole).order("period_month",{ascending:false}).limit(6),
      db.from("homecourt_history").select("id,title,occurred_on,venue,takeaway,next_action").eq("user_id",userId).order("occurred_on",{ascending:false}).limit(8),
    ]).then(([w,m,h])=>{
      if(!alive)return;
      setWeekly((w.data||[]) as Weekly[]);
      setMonthly((m.data||[]) as Monthly[]);
      setHistory((h.data||[]) as History[]);
      setLoading(false);
    });
    return()=>{alive=false};
  },[db,userId,safeRole]);

  if(loading)return <section className="member-next-step"><div><LoaderCircle className="spin"/><span>{c.eyebrow}</span><strong>{c.loading}</strong></div></section>;

  const completed=weekly.filter(x=>x.status==="completed").length;
  const active=weekly.find(x=>x.status==="active");
  const latestMonthly=monthly[0];

  return <section className="member-section">
    <div className="member-section-head"><div><p>{c.eyebrow}</p><h1>{c.title}</h1><p>{c.lead}</p></div><FileText/></div>
    <div className="member-summary">
      <article><span>{locale==="ja"?"名前":"NAME"}</span><strong>{name}</strong><p>{region||"—"}</p></article>
      <article><span>{locale==="ja"?"完了した週":"COMPLETED WEEKS"}</span><strong>{completed}</strong><p>{safeRole.toUpperCase()}</p></article>
      <article><span>{locale==="ja"?"今週のテーマ":"THIS WEEK"}</span><strong>{active?.theme||"—"}</strong><p>{active?.action||"—"}</p></article>
    </div>

    <section className="homecourt-product-preview">
      <div className="section-head"><div><p className="section-index">{c.weekly}</p><h2>{locale==="ja"?"週ごとの実践と振り返り":"Weekly practice and reflection"}</h2></div></div>
      {weekly.length?<div className="member-list">{weekly.map(item=><article key={item.id}><time>{item.week_start}</time><div><span>{item.status.toUpperCase()}</span><strong>{item.theme}</strong><p>{item.action}</p>{item.reflection?<p>REFLECT｜{item.reflection}</p>:null}{item.next_action?<p>NEXT｜{item.next_action}</p>:null}</div><Target/></article>)}</div>:<p className="member-safety">{c.empty}</p>}
    </section>

    <section className="homecourt-product-preview">
      <div className="section-head"><div><p className="section-index">{c.monthly}</p><h2>{latestMonthly?.focus||c.empty}</h2></div></div>
      {monthly.length?<div className="homecourt-preview-grid">{monthly.slice(0,4).map(item=><article key={item.id}><CalendarDays/><span>{item.period_month}</span><h3>{item.focus||"—"}</h3>{item.wins?<p>{locale==="ja"?"できたこと｜":"WINS | "}{item.wins}</p>:null}{item.challenge?<p>{locale==="ja"?"課題｜":"CHALLENGE | "}{item.challenge}</p>:null}{item.next_action?<p>{locale==="ja"?"次へ｜":"NEXT | "}{item.next_action}</p>:null}</article>)}</div>:<p className="member-safety">{c.empty}</p>}
    </section>

    <section className="homecourt-product-preview">
      <div className="section-head"><div><p className="section-index">{c.history}</p><h2>{locale==="ja"?"経験を次の行動へ":"Experience to next action"}</h2></div></div>
      {history.length?<div className="homecourt-preview-grid">{history.slice(0,4).map(item=><article key={item.id}><CheckCircle2/><span>{item.occurred_on}</span><h3>{item.title}</h3><p>{item.venue||"—"}</p>{item.takeaway?<p>{item.takeaway}</p>:null}{item.next_action?<p>→ {item.next_action}</p>:null}</article>)}</div>:<p className="member-safety">{c.empty}</p>}
    </section>

    <div className="member-next-step">
      <div><Sparkles/><span>PRIVATE REPORT</span><strong>{c.privacy}</strong></div>
      <button type="button" onClick={()=>window.print()}><Printer/>{c.print}</button>
    </div>
  </section>;
}
