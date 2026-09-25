"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, LoaderCircle, RotateCcw, Sparkles, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "./site-frame";

type Weekly={
  id:string;
  week_start:string;
  role:string;
  theme:string;
  action:string;
  evidence:string;
  reflection:string;
  next_action:string;
  status:"active"|"completed"|"skipped";
  completed_at:string|null;
};

function mondayKey(){
  const d=new Date();
  const day=(d.getDay()+6)%7;
  d.setHours(12,0,0,0);
  d.setDate(d.getDate()-day);
  const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),date=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${date}`;
}

const roleCopy={
  ja:{
    player:{theme:"今週、伸ばしたいテーマ",action:"次の練習・試合で実際にやること",evidence:"できたと判断する目印",prompt:"例：ボールを持つ前に2回以上周りを見る"},
    parent:{theme:"今週、子どもの成長で意識したいこと",action:"保護者として実際にやること",evidence:"関わり方が良かったと判断する目印",prompt:"例：試合後すぐに技術的な指示をしない"},
    coach:{theme:"今週、指導で観察したいテーマ",action:"次の練習で変える設計・問い・制約",evidence:"選手に変化があったと判断する目印",prompt:"例：ベンチから答えを言わず、選手の判断回数を見る"},
  },
  en:{
    player:{theme:"This week's development theme",action:"What you will actually try",evidence:"What will show progress",prompt:"Example: scan before receiving the ball"},
    parent:{theme:"What you want to notice this week",action:"What you will do as a parent",evidence:"What will show the support was helpful",prompt:"Example: do not coach immediately after games"},
    coach:{theme:"What you want to observe this week",action:"What you will change in practice",evidence:"What will show player change",prompt:"Example: observe decisions instead of giving answers"},
  },
  "zh-tw":{
    player:{theme:"本週想提升的主題",action:"下一次訓練或比賽要實際做的事",evidence:"判斷有進步的標誌",prompt:"例：接球前先觀察周圍"},
    parent:{theme:"本週想關注孩子成長的事",action:"家長實際要做的事",evidence:"判斷支持方式有效的標誌",prompt:"例：比賽後不要立刻技術指導"},
    coach:{theme:"本週想觀察的指導主題",action:"下一次訓練要改變的設計",evidence:"判斷球員有變化的標誌",prompt:"例：觀察決策，不直接給答案"},
  },
  ko:{
    player:{theme:"이번 주 성장 주제",action:"다음 훈련·경기에서 실제로 할 것",evidence:"변화를 확인할 기준",prompt:"예: 공을 받기 전에 주변을 본다"},
    parent:{theme:"이번 주 아이의 성장에서 볼 것",action:"보호자로서 실제로 할 것",evidence:"지원이 좋았다고 볼 기준",prompt:"예: 경기 직후 기술 지시를 하지 않는다"},
    coach:{theme:"이번 주 지도에서 관찰할 주제",action:"다음 훈련에서 바꿀 설계",evidence:"선수 변화 판단 기준",prompt:"예: 답을 주지 않고 판단 횟수를 본다"},
  }
} as const;

const general={
  ja:{eyebrow:"WEEKLY DEVELOPMENT LOOP",title:"今週は、一つだけ決める。",lead:"たくさんやるのではなく、今週のテーマを一つ決め、実際に試し、週末に振り返ります。",reflection:"今週やってみて、何が起きたか",next:"来週も続けること・変えること",save:"今週のテーマを保存",complete:"今週を完了して振り返る",reopen:"もう一度編集する",saved:"保存しました。",error:"保存できませんでした。もう一度お試しください。",loading:"今週のテーマを読み込んでいます…",streak:"継続",weeks:"週",history:"最近の週",empty:"まだ完了した週はありません。"},
  en:{eyebrow:"WEEKLY DEVELOPMENT LOOP",title:"Choose one thing this week.",lead:"Pick one theme, try it in real life, then reflect.",reflection:"What happened when you tried it?",next:"What will you continue or change next week?",save:"Save this week",complete:"Complete and reflect",reopen:"Edit again",saved:"Saved.",error:"Could not save. Try again.",loading:"Loading this week…",streak:"Completed",weeks:"weeks",history:"Recent weeks",empty:"No completed weeks yet."},
  "zh-tw":{eyebrow:"WEEKLY DEVELOPMENT LOOP",title:"本週只決定一件事。",lead:"選一個主題，實際去做，再在週末回顧。",reflection:"實際做了之後發生了什麼",next:"下週要繼續或改變什麼",save:"儲存本週主題",complete:"完成本週並回顧",reopen:"重新編輯",saved:"已儲存。",error:"無法儲存，請再試一次。",loading:"讀取本週主題…",streak:"完成",weeks:"週",history:"最近幾週",empty:"還沒有完成的週。"},
  ko:{eyebrow:"WEEKLY DEVELOPMENT LOOP",title:"이번 주에는 한 가지만 정합니다.",lead:"한 가지를 정하고 실제로 시도한 뒤 주말에 돌아봅니다.",reflection:"실제로 해보니 무엇이 일어났나요?",next:"다음 주에 이어가거나 바꿀 것",save:"이번 주 저장",complete:"이번 주 완료 및 회고",reopen:"다시 편집",saved:"저장했습니다.",error:"저장하지 못했습니다. 다시 시도하세요.",loading:"이번 주 불러오는 중…",streak:"완료",weeks:"주",history:"최근 주",empty:"완료한 주가 아직 없습니다."}
} as const;

export function HomecourtWeeklyLoop({userId,locale,role}:{userId:string;locale:Locale;role:string}){
  const c=general[locale];
  const safeRole=role==="coach"?"coach":role==="parent"?"parent":"player";
  const rc=roleCopy[locale][safeRole];
  const db=useMemo(()=>createClient(),[]);
  const week=mondayKey();
  const [entry,setEntry]=useState<Weekly|null>(null);
  const [recent,setRecent]=useState<Weekly[]>([]);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function load(){
    setLoading(true);
    const [currentQ,recentQ]=await Promise.all([
      db.from("homecourt_weekly_actions").select("*").eq("user_id",userId).eq("week_start",week).eq("role",safeRole).maybeSingle(),
      db.from("homecourt_weekly_actions").select("*").eq("user_id",userId).eq("role",safeRole).eq("status","completed").order("week_start",{ascending:false}).limit(8)
    ]);
    setEntry((currentQ.data as Weekly|null)||null);
    setRecent((recentQ.data||[]) as Weekly[]);
    setLoading(false);
  }
  useEffect(()=>{void load();},[userId,safeRole,week]);

  async function persist(form:HTMLFormElement,complete=false){
    setBusy(true);setMessage("");
    const f=new FormData(form);
    const payload={
      user_id:userId,week_start:week,role:safeRole,
      theme:String(f.get("theme")||"").trim(),
      action:String(f.get("action")||"").trim(),
      evidence:String(f.get("evidence")||"").trim(),
      reflection:String(f.get("reflection")||"").trim(),
      next_action:String(f.get("next_action")||"").trim(),
      status:complete?"completed":"active",
      completed_at:complete?new Date().toISOString():null,
      updated_at:new Date().toISOString(),
    };
    const result=await db.from("homecourt_weekly_actions").upsert(payload,{onConflict:"user_id,week_start,role"}).select("*").single();
    if(result.error){setMessage(c.error);setBusy(false);return;}
    setEntry(result.data as Weekly);setMessage(c.saved);setBusy(false);await load();
  }

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    await persist(e.currentTarget,false);
  }

  async function completeWeek(form:HTMLFormElement){
    await persist(form,true);
  }

  async function reopen(){
    if(!entry)return;
    setBusy(true);
    const result=await db.from("homecourt_weekly_actions").update({status:"active",completed_at:null,updated_at:new Date().toISOString()}).eq("id",entry.id).eq("user_id",userId).select("*").single();
    if(result.data)setEntry(result.data as Weekly);
    setBusy(false);
  }

  if(loading)return <section className="member-next-step"><div><LoaderCircle className="spin"/><span>{c.eyebrow}</span><strong>{c.loading}</strong></div></section>;

  return <section className="member-section">
    <div className="member-section-head"><div><p>{c.eyebrow}</p><h2>{c.title}</h2><p>{c.lead}</p></div><Target/></div>
    <form className="member-inline-form" onSubmit={e=>void submit(e)}>
      <label>{rc.theme}<textarea name="theme" rows={2} maxLength={500} defaultValue={entry?.theme||""} placeholder={rc.prompt} required/></label>
      <label>{rc.action}<textarea name="action" rows={3} maxLength={1200} defaultValue={entry?.action||""} required/></label>
      <label>{rc.evidence}<textarea name="evidence" rows={2} maxLength={1200} defaultValue={entry?.evidence||""}/></label>
      <label>{c.reflection}<textarea name="reflection" rows={3} maxLength={2000} defaultValue={entry?.reflection||""}/></label>
      <label>{c.next}<textarea name="next_action" rows={2} maxLength={1200} defaultValue={entry?.next_action||""}/></label>
      <div className="member-attendance">
        <button disabled={busy||entry?.status==="completed"} type="submit">{busy?<LoaderCircle className="spin"/>:<Sparkles/>}{c.save}</button>
        <button disabled={busy||!entry?.theme||entry?.status==="completed"} type="button" onClick={e=>{const form=e.currentTarget.closest("form");if(form)void completeWeek(form)}}><CheckCircle2/>{c.complete}</button>
        {entry?.status==="completed"?<button disabled={busy} type="button" onClick={()=>void reopen()}><RotateCcw/>{c.reopen}</button>:null}
      </div>
    </form>
    {message?<p className="member-alert" role="status">{message}</p>:null}
    <div className="member-summary"><article><span>{c.streak}</span><strong>{recent.length}</strong><p>{c.weeks}</p></article><article><span>{c.history}</span><strong>{recent[0]?.theme||c.empty}</strong><p>{recent[0]?.week_start||"—"}</p></article></div>
    {recent.length?<div className="member-list">{recent.map(item=><article key={item.id}><time>{item.week_start}</time><div><span>COMPLETED</span><strong>{item.theme}</strong>{item.reflection?<p>{item.reflection}</p>:null}{item.next_action?<p>→ {item.next_action}</p>:null}</div><ChevronRight/></article>)}</div>:null}
  </section>;
}
