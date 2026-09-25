"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, History, LoaderCircle, Sparkles, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "./site-frame";

type Review={
  id:string;
  period_month:string;
  role:string;
  focus:string;
  wins:string;
  challenge:string;
  next_action:string;
  note:string;
};

const copy={
  ja:{
    eyebrow:"MONTHLY DEVELOPMENT REVIEW",
    title:"1か月を振り返り、次の1か月を決める。",
    intro:"結果の良し悪しではなく、何を試したか、何が変わったか、次に何を続けるかを自分の言葉で残します。",
    focus:"今月、意識したテーマ",
    wins:"できたこと・変わったこと",
    challenge:"まだ難しいこと・気になっていること",
    next:"来月、続けることを一つ",
    note:"自由メモ",
    save:"今月のレビューを保存",
    saved:"今月のレビューを保存しました。",
    error:"保存できませんでした。もう一度お試しください。",
    loading:"今月のレビューを読み込んでいます…",
    private:"このレビューは非公開です。他の会員には表示されません。",
  },
  en:{eyebrow:"MONTHLY DEVELOPMENT REVIEW",title:"Review one month. Decide the next.",intro:"Record what you tried, what changed and what you will continue next.",focus:"This month's focus",wins:"What improved",challenge:"What still feels difficult",next:"One thing to continue next month",note:"Notes",save:"Save monthly review",saved:"Monthly review saved.",error:"Could not save. Please try again.",loading:"Loading monthly review…",private:"This review is private."},
  "zh-tw":{eyebrow:"MONTHLY DEVELOPMENT REVIEW",title:"回顧一個月，決定下一個月。",intro:"記錄嘗試過什麼、改變了什麼，以及下一步要繼續什麼。",focus:"本月主題",wins:"做到或改變的事",challenge:"仍然困難的事",next:"下月繼續的一件事",note:"自由備註",save:"儲存本月回顧",saved:"已儲存本月回顧。",error:"無法儲存，請再試一次。",loading:"讀取本月回顧…",private:"此回顧為非公開資料。"},
  ko:{eyebrow:"MONTHLY DEVELOPMENT REVIEW",title:"한 달을 돌아보고 다음 한 달을 정합니다.",intro:"무엇을 시도했고 무엇이 달라졌는지, 다음에 무엇을 이어갈지 기록합니다.",focus:"이번 달 주제",wins:"달라진 점",challenge:"아직 어려운 점",next:"다음 달에 이어갈 한 가지",note:"자유 메모",save:"이번 달 리뷰 저장",saved:"이번 달 리뷰를 저장했습니다.",error:"저장하지 못했습니다. 다시 시도하세요.",loading:"이번 달 리뷰 불러오는 중…",private:"이 리뷰는 비공개입니다."}
} as const;

function monthKey(){
  const now=new Date();
  const y=now.getFullYear();
  const m=String(now.getMonth()+1).padStart(2,"0");
  return `${y}-${m}-01`;
}

export function HomecourtMonthlyReview({userId,locale,role}:{userId:string;locale:Locale;role:string}){
  const c=copy[locale];
  const db=useMemo(()=>createClient(),[]);
  const period=monthKey();
  const safeRole=role==="coach"?"coach":role==="parent"?"parent":"player";
  const [review,setReview]=useState<Review|null>(null);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    let alive=true;
    void db.from("homecourt_monthly_reviews").select("id,period_month,role,focus,wins,challenge,next_action,note").eq("user_id",userId).eq("period_month",period).eq("role",safeRole).maybeSingle().then(({data})=>{
      if(!alive)return;
      setReview((data as Review|null)||null);
      setLoading(false);
    });
    return()=>{alive=false};
  },[db,userId,period,safeRole]);

  async function save(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setBusy(true);setMessage("");
    const f=new FormData(e.currentTarget);
    const payload={
      user_id:userId,
      period_month:period,
      role:safeRole,
      focus:String(f.get("focus")||"").trim(),
      wins:String(f.get("wins")||"").trim(),
      challenge:String(f.get("challenge")||"").trim(),
      next_action:String(f.get("next_action")||"").trim(),
      note:String(f.get("note")||"").trim(),
      updated_at:new Date().toISOString(),
    };
    const result=await db.from("homecourt_monthly_reviews").upsert(payload,{onConflict:"user_id,period_month,role"}).select("id,period_month,role,focus,wins,challenge,next_action,note").single();
    if(result.error){setMessage(c.error);setBusy(false);return;}
    setReview(result.data as Review);setMessage(c.saved);setBusy(false);
  }

  if(loading)return <section className="member-next-step"><div><LoaderCircle className="spin"/><span>{c.eyebrow}</span><strong>{c.loading}</strong></div></section>;

  return <section className="member-section">
    <div className="member-section-head"><div><p>{c.eyebrow}</p><h2>{c.title}</h2><p>{c.intro}</p></div><History/></div>
    <form className="member-inline-form" onSubmit={save}>
      <label><Target/>{c.focus}<textarea name="focus" rows={2} maxLength={1000} defaultValue={review?.focus||""}/></label>
      <label><CheckCircle2/>{c.wins}<textarea name="wins" rows={3} maxLength={2000} defaultValue={review?.wins||""}/></label>
      <label><Sparkles/>{c.challenge}<textarea name="challenge" rows={3} maxLength={2000} defaultValue={review?.challenge||""}/></label>
      <label>{c.next}<textarea name="next_action" rows={2} maxLength={1000} defaultValue={review?.next_action||""}/></label>
      <label>{c.note}<textarea name="note" rows={3} maxLength={3000} defaultValue={review?.note||""}/></label>
      <button disabled={busy}>{busy?<LoaderCircle className="spin"/>:<CheckCircle2/>}{c.save}</button>
    </form>
    {message?<p className="member-alert" role="status">{message}</p>:null}
    <p className="member-safety">{c.private}</p>
  </section>;
}
