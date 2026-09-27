"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Circle, Globe2, History, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./homecourt-network.module.css";

type TimelineItem={user_id:string;source_type:string;source_id:string;title:string;happened_on:string;country:string|null;region:string|null;venue:string|null;verification_level:string;metadata:Record<string,unknown>|null};
const verify:Record<string,{label:string;className:string}> = {
  self:{label:"自分で記録",className:"self"},
  registered:{label:"申込記録",className:"registered"},
  registration_confirmed:{label:"参加予定確認",className:"confirmed"},
  organizer_confirmed:{label:"主催者確認済み",className:"verified"},
  recorded:{label:"記録",className:"registered"},
  verified:{label:"確認済み",className:"verified"},
};
const country:Record<string,string>={JP:"日本",TW:"台湾",KR:"韓国",MY:"マレーシア",DE:"ドイツ"};

export function DevelopmentTimeline({userId}:{userId:string}){
  const db=useMemo(()=>createClient(),[]);
  const [items,setItems]=useState<TimelineItem[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [filter,setFilter]=useState("all");

  useEffect(()=>{
    const timer=window.setTimeout(async()=>{
      const result=await db.from("homecourt_development_timeline").select("*").eq("user_id",userId).order("happened_on",{ascending:false}).limit(300);
      if(result.error)setError("TIMELINEを読み込めませんでした。これまでのPassport記録は削除されていません。");
      else setItems((result.data||[]) as TimelineItem[]);
      setLoading(false);
    },0);
    return()=>window.clearTimeout(timer);
  },[db,userId]);

  const visible=items.filter(x=>filter==="all"||(filter==="confirmed"&&["organizer_confirmed","registration_confirmed","verified"].includes(x.verification_level))||(filter==="self"&&x.verification_level==="self")||(filter==="milestone"&&x.source_type==="milestone"));
  const confirmed=items.filter(x=>["organizer_confirmed","registration_confirmed","verified"].includes(x.verification_level)).length;
  const countries=new Set(items.map(x=>x.country).filter(Boolean));

  return <div className={styles.memberPage}>
    <section className={styles.memberHero}><p className={styles.kicker}><History/> DEVELOPMENT TIMELINE</p><h1>どこで、誰と、<br/>何を経験してきたか。</h1><p>所属チームが変わっても、地域や国が変わっても、自分の経験はMY HOMECOURTに残ります。上手さを点数にするのではなく、経験と次の一歩をつなぎます。</p></section>
    <section className={styles.timelineStats}><article><span>EXPERIENCES</span><strong>{items.length}</strong><p>記録された経験</p></article><article><span>CONFIRMED</span><strong>{confirmed}</strong><p>主催者等の確認がある記録</p></article><article><span>COUNTRIES</span><strong>{countries.size||1}</strong><p>経験がつながる国・地域</p></article></section>
    <section className={styles.notice}><ShieldCheck/><div><strong>「確認済み」は能力評価ではありません。</strong><p>参加・所属・出来事が確認されたことを示します。選手の公開ランキング、能力スコア、他人との優劣には使いません。</p></div></section>
    <nav className={styles.timelineFilters}>{[["all","すべて"],["confirmed","確認のある記録"],["self","自分で記録"],["milestone","節目"]].map(([k,l])=><button key={k} aria-pressed={filter===k} onClick={()=>setFilter(k)}>{l}</button>)}</nav>
    <section className={styles.timeline}>
      {loading?<p>読み込んでいます…</p>:error?<p role="alert">{error}</p>:visible.length?visible.map(item=>{const v=verify[item.verification_level]||{label:item.verification_level,className:"registered"};return <article key={item.source_type+"-"+item.source_id}>
        <div className={styles.timelineRail}>{["organizer_confirmed","verified"].includes(item.verification_level)?<CheckCircle2/>:<Circle/>}</div>
        <div><div className={styles.timelineTop}><time>{item.happened_on?new Date(item.happened_on+"T12:00:00").toLocaleDateString("ja-JP"):"日付未設定"}</time><span data-kind={v.className}>{v.label}</span></div><h2>{item.title}</h2><p>{[item.country?country[item.country]||item.country:null,item.region,item.venue].filter(Boolean).join(" / ")||"場所の記録なし"}</p>{typeof item.metadata?.takeaway==="string"&&item.metadata.takeaway?<blockquote>{item.metadata.takeaway}</blockquote>:null}{typeof item.metadata?.next_action==="string"&&item.metadata.next_action?<p><strong>次に試す：</strong>{item.metadata.next_action}</p>:null}</div>
      </article>}):<div className={styles.empty}><History/><h2>最初の経験を残しましょう。</h2><p>過去のクリニック、試合、キャンプ、海外交流など、覚えているものから始められます。</p></div>}
    </section>
    <section className={styles.footerCta}><div><p className={styles.kicker}>NEXT</p><h2>経験を、次の機会へ。</h2></div><div className={styles.heroActions}><a className={styles.primary} href="/ja/my-homecourt/app/start">経験を追加する<ArrowRight/></a><a href="/ja/homecourt/explore">次の育成環境を探す<ArrowRight/></a><a href="/ja/homecourt/match"><Globe2/>国際MATCHを見る<ArrowRight/></a></div></section>
  </div>;
}
