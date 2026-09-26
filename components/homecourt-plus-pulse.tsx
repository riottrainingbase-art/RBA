"use client";
import { useEffect, useMemo, useState } from "react";
import { Activity, CalendarDays, CheckCircle2, LoaderCircle, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "./site-frame";

type Wellness={checkin_on:string;energy:number;fatigue:number;soreness:number;sleep_hours:number|null;pain_level:number};
type Task={id:string;title:string;due_at:string|null;completed_at:string|null;category:string};
type Weekly={theme:string;action:string;next_action:string;status:string};
type Monthly={focus:string;next_action:string;period_month:string};

const copy={
  ja:{eyebrow:"PLUS / DEVELOPMENT PULSE",title:"この1週間の流れを、ひと目で確認する。",lead:"予定、今週のテーマ、コンディション記録、準備項目を一つにまとめて確認できます。医療上の判断や能力評価ではなく、自分の行動を整理するための画面です。",theme:"今週のテーマ",condition:"7日間の記録",prep:"未完了の準備",next:"次に取り組むこと",noTheme:"今週のテーマはまだありません",noCondition:"まだ記録がありません",noPrep:"未完了の準備はありません",noNext:"次の項目はまだありません",loading:"今週の情報をまとめています…",days:"日分の記録",energy:"平均エネルギー",fatigue:"平均疲労",sleep:"平均睡眠"},
  en:{eyebrow:"PLUS / DEVELOPMENT PULSE",title:"See your current week at a glance.",lead:"Bring your weekly theme, condition records and preparation tasks together. This is not a medical or ability assessment.",theme:"This week's theme",condition:"7-day records",prep:"Open preparation",next:"Next action",noTheme:"No weekly theme yet",noCondition:"No records yet",noPrep:"No open preparation",noNext:"No next action yet",loading:"Building your current view…",days:"days logged",energy:"Avg energy",fatigue:"Avg fatigue",sleep:"Avg sleep"},
  "zh-tw":{eyebrow:"PLUS / DEVELOPMENT PULSE",title:"一眼看見本週狀態。",lead:"整合本週主題、身體狀況紀錄與準備事項。這不是醫療或能力評估。",theme:"本週主題",condition:"7天紀錄",prep:"未完成準備",next:"下一步",noTheme:"尚未設定本週主題",noCondition:"尚無紀錄",noPrep:"沒有未完成準備",noNext:"尚無下一步",loading:"整理目前狀態中…",days:"天紀錄",energy:"平均精神",fatigue:"平均疲勞",sleep:"平均睡眠"},
  ko:{eyebrow:"PLUS / DEVELOPMENT PULSE",title:"이번 주 상태를 한눈에 봅니다.",lead:"주간 주제, 컨디션 기록, 준비 항목을 함께 봅니다. 의료 또는 능력 평가가 아닙니다.",theme:"이번 주 주제",condition:"7일 기록",prep:"미완료 준비",next:"다음 행동",noTheme:"이번 주 주제가 없습니다",noCondition:"기록이 없습니다",noPrep:"미완료 준비가 없습니다",noNext:"다음 행동이 없습니다",loading:"현재 상태 정리 중…",days:"일 기록",energy:"평균 에너지",fatigue:"평균 피로",sleep:"평균 수면"}
} as const;

function startOfWeek(){
  const d=new Date(); const day=(d.getDay()+6)%7; d.setHours(12,0,0,0); d.setDate(d.getDate()-day);
  return d.toISOString().slice(0,10);
}
function sevenDaysAgo(){return new Date(Date.now()-6*86400000).toISOString().slice(0,10)}
const avg=(values:number[])=>values.length?Math.round(values.reduce((a,b)=>a+b,0)/values.length*10)/10:null;

export function HomecourtPlusPulse({userId,locale,role}:{userId:string;locale:Locale;role:string}){
  const c=copy[locale];
  const db=useMemo(()=>createClient(),[]);
  const safeRole=role==="coach"?"coach":role==="parent"?"parent":"player";
  const [loading,setLoading]=useState(true);
  const [wellness,setWellness]=useState<Wellness[]>([]);
  const [tasks,setTasks]=useState<Task[]>([]);
  const [weekly,setWeekly]=useState<Weekly|null>(null);
  const [monthly,setMonthly]=useState<Monthly|null>(null);

  useEffect(()=>{
    let alive=true;
    void Promise.all([
      db.from("homecourt_wellness_checkins").select("checkin_on,energy,fatigue,soreness,sleep_hours,pain_level").eq("user_id",userId).gte("checkin_on",sevenDaysAgo()).order("checkin_on"),
      db.from("homecourt_schedule_tasks").select("id,title,due_at,completed_at,category").eq("user_id",userId).is("completed_at",null).order("due_at",{ascending:true}).limit(5),
      db.from("homecourt_weekly_actions").select("theme,action,next_action,status").eq("user_id",userId).eq("week_start",startOfWeek()).eq("role",safeRole).maybeSingle(),
      db.from("homecourt_monthly_reviews").select("focus,next_action,period_month").eq("user_id",userId).eq("role",safeRole).order("period_month",{ascending:false}).limit(1).maybeSingle(),
    ]).then(([w,t,week,month])=>{
      if(!alive)return;
      setWellness((w.data||[]) as Wellness[]);
      setTasks((t.data||[]) as Task[]);
      setWeekly((week.data as Weekly|null)||null);
      setMonthly((month.data as Monthly|null)||null);
      setLoading(false);
    });
    return()=>{alive=false};
  },[db,userId,safeRole]);

  if(loading)return <section className="member-next-step"><div><LoaderCircle className="spin"/><span>{c.eyebrow}</span><strong>{c.loading}</strong></div></section>;

  const energies=wellness.map(x=>Number(x.energy)).filter(Number.isFinite);
  const fatigues=wellness.map(x=>Number(x.fatigue)).filter(Number.isFinite);
  const sleeps=wellness.map(x=>Number(x.sleep_hours)).filter(Number.isFinite);
  const energyAvg=avg(energies),fatigueAvg=avg(fatigues),sleepAvg=avg(sleeps);
  const nextAction=weekly?.next_action||monthly?.next_action||"";

  return <section className="member-section">
    <div className="member-section-head"><div><p>{c.eyebrow}</p><h2>{c.title}</h2><p>{c.lead}</p></div><Activity/></div>
    <div className="member-summary">
      <article><Target/><span>{c.theme}</span><strong>{weekly?.theme||c.noTheme}</strong><p>{weekly?.action||"—"}</p></article>
      <article><Activity/><span>{c.condition}</span><strong>{wellness.length?wellness.length+" "+c.days:c.noCondition}</strong><p>{wellness.length?`${c.energy} ${energyAvg ?? "—"} / ${c.fatigue} ${fatigueAvg ?? "—"} / ${c.sleep} ${sleepAvg ?? "—"}h`:"—"}</p></article>
      <article><CheckCircle2/><span>{c.prep}</span><strong>{tasks.length?String(tasks.length):c.noPrep}</strong><p>{tasks[0]?.title||"—"}</p></article>
      <article><CalendarDays/><span>{c.next}</span><strong>{nextAction||c.noNext}</strong><p>{monthly?.focus||"—"}</p></article>
    </div>
  </section>;
}
