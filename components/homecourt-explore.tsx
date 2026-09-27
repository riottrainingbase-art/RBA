"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Compass, MapPin, Search, ShieldCheck, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./homecourt-network.module.css";

type Entity = {
  id:string; entity_id:string; entity_type:string; name:string; slug:string;
  country:string; region:string|null; city:string|null; description:string|null; website_url:string|null;
  age_groups:string[]; categories:string[]; genders:string[]; activity_days:string[];
  activity_frequency:string|null; beginner_policy:string|null; recruitment_status:string;
  trial_status:string; fee_note:string|null; parent_duty_note:string|null; philosophy:string|null;
  source_url:string|null; source_checked_at:string|null; last_confirmed_at:string|null;
  operator_confirmed_at:string|null;
};

const countryNames:Record<string,string>={JP:"日本",TW:"台湾",KR:"韓国",MY:"マレーシア",DE:"ドイツ",US:"アメリカ",AU:"オーストラリア"};
const statusLabel:Record<string,string>={open:"募集中",limited:"要確認",closed:"募集停止",unknown:"情報確認中"};
const trialLabel:Record<string,string>={available:"体験可",request:"要問い合わせ",unavailable:"体験受付なし",unknown:"情報確認中"};

export function HomecourtExplore(){
  const db=useMemo(()=>createClient(),[]);
  const [items,setItems]=useState<Entity[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [country,setCountry]=useState("all");
  const [age,setAge]=useState("all");
  const [query,setQuery]=useState("");

  useEffect(()=>{
    const timer=window.setTimeout(async()=>{
      const result=await db.from("homecourt_public_entities")
        .select("id,entity_id,entity_type,name,slug,country,region,city,description,website_url,age_groups,categories,genders,activity_days,activity_frequency,beginner_policy,recruitment_status,trial_status,fee_note,parent_duty_note,philosophy,source_url,source_checked_at,last_confirmed_at,operator_confirmed_at")
        .eq("published",true)
        .order("last_confirmed_at",{ascending:false,nullsFirst:false});
      if(result.error){setError("現在、掲載情報を読み込めません。RBAの募集中プログラムは引き続き確認できます。");}
      else setItems((result.data||[]) as Entity[]);
      setLoading(false);
    },0);
    return()=>window.clearTimeout(timer);
  },[db]);

  const countries=useMemo(()=>Array.from(new Set(items.map(x=>x.country))).sort(),[items]);
  const visible=useMemo(()=>items.filter(item=>{
    const hay=[item.name,item.region,item.city,item.description,item.philosophy,...item.categories].filter(Boolean).join(" ").toLowerCase();
    return (country==="all"||item.country===country)
      && (age==="all"||item.age_groups.includes(age))
      && (!query.trim()||hay.includes(query.trim().toLowerCase()));
  }),[items,country,age,query]);

  return <div className={styles.page}>
    <section className={styles.hero}>
      <p className={styles.kicker}><Compass size={16}/> HOMECOURT / EXPLORE</p>
      <h1>次に育つ場所を、<br/>所属の外まで見にいく。</h1>
      <p>チーム、クラブ、育成団体、クリニック、国際交流。勝率や口コミ順位ではなく、年代・地域・活動条件と確認できた事実から選択肢を広げます。</p>
      <div className={styles.heroActions}><a className={styles.primary} href="/ja/opportunities">RBAの募集中活動を見る<ArrowRight/></a><a href="/ja/homecourt/match">国際MATCHを見る<ArrowRight/></a></div>
    </section>

    <section className={styles.notice}>
      <ShieldCheck/><div><strong>HOMECOURTはTeamJBAの代替ではありません。</strong><p>JBA加盟、競技者登録、公式大会の出場資格・エントリーなどは、JBA・各競技団体の公式制度をご確認ください。HOMECOURTは、育成環境と参加機会を見つけ、経験を自分の記録へつなぐための民間プラットフォームです。</p></div>
    </section>

    <section className={styles.controls}>
      <div><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="チーム名・地域・活動内容で探す" aria-label="キーワード"/></div>
      <label>国・地域<select value={country} onChange={e=>setCountry(e.target.value)}><option value="all">すべて</option>{countries.map(c=><option key={c} value={c}>{countryNames[c]||c}</option>)}</select></label>
      <label>年代<select value={age} onChange={e=>setAge(e.target.value)}><option value="all">すべて</option>{["U8","U10","U12","U15","U18"].map(x=><option key={x}>{x}</option>)}</select></label>
      <strong>{visible.length} environments</strong>
    </section>

    <section className={styles.results} aria-live="polite">
      {loading?<p>育成環境を読み込んでいます…</p>:error?<div className={styles.empty}><p>{error}</p><a href="/ja/opportunities">RBA OPPORTUNITIES <ArrowRight/></a></div>:visible.length?<div className={styles.grid}>{visible.map(item=><article key={item.id} className={styles.card}>
        <div className={styles.cardTop}><span>{item.entity_type.toUpperCase()}</span>{item.operator_confirmed_at?<b><CheckCircle2/>運営者確認済み</b>:<b>公開情報を確認</b>}</div>
        <h2>{item.name}</h2>
        <p className={styles.location}><MapPin/>{[countryNames[item.country]||item.country,item.region,item.city].filter(Boolean).join(" / ")}</p>
        {item.description?<p>{item.description}</p>:null}
        <div className={styles.tags}>{item.age_groups.map(x=><span key={x}>{x}</span>)}{item.categories.slice(0,4).map(x=><span key={x}>{x}</span>)}</div>
        <dl>
          <div><dt>募集</dt><dd>{statusLabel[item.recruitment_status]||item.recruitment_status}</dd></div>
          <div><dt>体験</dt><dd>{trialLabel[item.trial_status]||item.trial_status}</dd></div>
          <div><dt>活動頻度</dt><dd>{item.activity_frequency||"未確認"}</dd></div>
          <div><dt>保護者負担</dt><dd>{item.parent_duty_note||"未確認"}</dd></div>
        </dl>
        {item.philosophy?<blockquote>{item.philosophy}</blockquote>:null}
        <div className={styles.cardMeta}><span>最終確認：{item.last_confirmed_at?new Date(item.last_confirmed_at).toLocaleDateString("ja-JP"):"—"}</span></div>
        <div className={styles.cardActions}>
          {item.website_url?<a href={item.website_url} target="_blank" rel="noreferrer">公式サイト等<ArrowUpRight/></a>:null}
          {item.source_url&&item.source_url!==item.website_url?<a href={item.source_url} target="_blank" rel="noreferrer">情報源<ArrowUpRight/></a>:null}
          <a href={"/ja/my-homecourt/app/claim?entity="+item.entity_id}>この情報を管理する<ArrowRight/></a>
        </div>
      </article>)}</div>:<div className={styles.empty}><Users/><h2>まだ条件に合う掲載がありません。</h2><p>HOMECOURTは掲載数を誇張しません。確認できた情報から順に公開します。</p><a href="/ja/my-homecourt/app/claim#suggest">育成環境を知らせる<ArrowRight/></a></div>}
    </section>

    <section className={styles.footerCta}><div><p className={styles.kicker}>DEVELOPMENT GRAPH</p><h2>見つけて終わらせない。</h2><p>参加した経験はMY HOMECOURTへ。そこから、次に参加できる機会へつなげます。</p></div><a className={styles.primary} href="/ja/my-homecourt/app/timeline">自分のTIMELINEを見る<ArrowRight/></a></section>
  </div>;
}
