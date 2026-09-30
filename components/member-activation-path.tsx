"use client";
import {useEffect,useMemo,useState} from "react";
import {CheckCircle2,ChevronRight,Compass,BookOpen,NotebookPen} from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import type {Locale} from "./site-frame";
type Props={locale:Locale;userId:string;role:"player"|"parent"|"coach"|"admin";hasExperience:boolean;hasSave:boolean};
export function MemberActivationPath({locale,userId,role,hasExperience,hasSave}:Props){
 const db=useMemo(()=>createClient(),[]);const [learned,setLearned]=useState(false);
 useEffect(()=>{void db.from("development_action_events").select("id",{count:"exact",head:true}).eq("user_id",userId).eq("action_type","learn").then(({count})=>setLearned((count||0)>0))},[db,userId]);
 const steps=[
  {done:hasSave,label:"01 / DISCOVER",title:"気になる活動を一つ保存",body:"今すぐ申し込む必要はありません。気になる活動を一つ、あとで見返せるように残しておきます。",href:"/ja/opportunities",icon:<Compass/>},
  {done:learned,label:"02 / LEARN",title:role==="coach"?"今週考えたいテーマを一つ選ぶ":"無料JOURNALを1本読む",body:role==="coach"?"次の練習で何を見て、何を試すかを一つ決めます。":"全部読む必要はありません。今の自分に関係するものを一つ選べば十分です。",href:role==="coach"?"/ja/d-hub":"/ja/journal",icon:<BookOpen/>},
  {done:hasExperience,label:"03 / REFLECT",title:"最近の経験を一つ残す",body:"練習、試合、クリニックなどから一つ選び、気づいたことと次に試したいことを残します。",href:"/ja/my-homecourt/app/start",icon:<NotebookPen/>}
 ];
 const done=steps.filter(x=>x.done).length;
 return <section className="member-activation-path"><header><div><span>RBA ID / FIRST WEEK</span><h2>{done===3?"準備完了。ここからは自分のペースで。":"最初は、この3つから。"}</h2><p>すべての機能を使う必要はありません。まずは「探す・学ぶ・残す」を一度ずつ。そこから、自分に必要な使い方を見つけてください。</p></div><strong>{done}/3</strong></header><div>{steps.map(step=><a key={step.label} className={step.done?"is-done":undefined} href={step.href}>{step.done?<CheckCircle2/>:step.icon}<span>{step.label}</span><strong>{step.title}</strong><p>{step.body}</p><ChevronRight/></a>)}</div></section>
}
