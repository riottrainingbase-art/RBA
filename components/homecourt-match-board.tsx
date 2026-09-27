"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Globe2, MapPin, ShieldCheck, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./homecourt-network.module.css";

type Post={id:string;entity_id:string;title:string;age_group:string;gender:string;country_from:string;city_from:string|null;target_countries:string[];mode:string;starts_on:string|null;ends_on:string|null;team_size_min:number|null;team_size_max:number|null;venue_available:boolean;languages:string[];purpose:string|null;level_note:string|null;public_note:string|null;status:string;created_at:string};
type Entity={entity_id:string;name:string;country:string;region:string|null;city:string|null;operator_confirmed_at:string|null};
const names:Record<string,string>={JP:"日本",TW:"台湾",KR:"韓国",MY:"マレーシア",DE:"ドイツ",AU:"オーストラリア",US:"アメリカ"};
const modeNames:Record<string,string>={host:"受入希望",travel:"遠征希望",either:"受入・遠征どちらも可"};

export function HomecourtMatchBoard(){
  const db=useMemo(()=>createClient(),[]);
  const [posts,setPosts]=useState<Post[]>([]);
  const [entities,setEntities]=useState<Record<string,Entity>>({});
  const [loading,setLoading]=useState(true);
  const [country,setCountry]=useState("all");
  const [age,setAge]=useState("all");

  useEffect(()=>{
    const timer=window.setTimeout(async()=>{
      const postQ=await db.from("homecourt_exchange_posts").select("*").eq("status","open").order("starts_on",{ascending:true,nullsFirst:false});
      const rows=(postQ.data||[]) as Post[];
      setPosts(rows);
      const ids=Array.from(new Set(rows.map(x=>x.entity_id)));
      if(ids.length){
        const entityQ=await db.from("homecourt_public_entities").select("entity_id,name,country,region,city,operator_confirmed_at").in("entity_id",ids);
        const map:Record<string,Entity>={};
        for(const entity of (entityQ.data||[]) as Entity[])map[entity.entity_id]=entity;
        setEntities(map);
      }
      setLoading(false);
    },0);
    return()=>window.clearTimeout(timer);
  },[db]);

  const visible=posts.filter(p=>(country==="all"||p.target_countries.includes(country)||p.country_from===country)&&(age==="all"||p.age_group===age));
  const targets=Array.from(new Set(posts.flatMap(p=>[p.country_from,...p.target_countries]))).sort();

  return <div className={styles.page}>
    <section className={styles.hero}>
      <p className={styles.kicker}><Globe2/> HOMECOURT / MATCH</p>
      <h1>国際交流を、<br/>偶然だけにしない。</h1>
      <p>育成年代のチーム同士が、交流試合・共同練習・キャンプを「受入できる／遠征したい」という条件から探せる場所です。選手個人の公開ランキングや、未成年者との無制限DMは使いません。</p>
      <div className={styles.heroActions}><a className={styles.primary} href="/ja/my-homecourt/app/match">チームとして募集・相談する<ArrowRight/></a><a href="/ja/homecourt/explore">育成環境を探す<ArrowRight/></a></div>
    </section>
    <section className={styles.notice}><ShieldCheck/><div><strong>まずはチーム対チーム。</strong><p>やり取りはチーム運営者単位で管理します。公式大会の参加資格・競技者登録・競技規則の認定をHOMECOURTが代替するものではありません。必要な公式手続きは各競技団体の制度を優先します。</p></div></section>
    <section className={styles.controls}>
      <label>国<select value={country} onChange={e=>setCountry(e.target.value)}><option value="all">すべて</option>{targets.map(c=><option key={c} value={c}>{names[c]||c}</option>)}</select></label>
      <label>年代<select value={age} onChange={e=>setAge(e.target.value)}><option value="all">すべて</option>{["U8","U10","U12","U15","U18"].map(x=><option key={x}>{x}</option>)}</select></label>
      <strong>{visible.length} open matches</strong>
    </section>
    <section className={styles.results}>
      {loading?<p>募集情報を読み込んでいます…</p>:visible.length?<div className={styles.grid}>{visible.map(post=>{const org=entities[post.entity_id];return <article className={styles.card} key={post.id}>
        <div className={styles.cardTop}><span>INTERNATIONAL MATCH</span><b>{modeNames[post.mode]||post.mode}</b></div>
        <h2>{post.title}</h2>
        <p className={styles.location}><MapPin/>{(org?.name||"掲載団体")+" · "+(names[post.country_from]||post.country_from)+(post.city_from?" / "+post.city_from:"")}</p>
        <div className={styles.tags}><span>{post.age_group}</span><span>{post.gender}</span>{post.languages.map(x=><span key={x}>{x}</span>)}</div>
        <dl>
          <div><dt><CalendarDays/>希望時期</dt><dd>{post.starts_on||"要相談"}{post.ends_on&&post.ends_on!==post.starts_on?" 〜 "+post.ends_on:""}</dd></div>
          <div><dt><Globe2/>希望国</dt><dd>{post.target_countries.length?post.target_countries.map(x=>names[x]||x).join(" / "):"地域不問"}</dd></div>
          <div><dt><Users/>人数</dt><dd>{post.team_size_min||post.team_size_max?(String(post.team_size_min||"?")+"〜"+String(post.team_size_max||"?")+"人"):"要相談"}</dd></div>
          <div><dt>会場</dt><dd>{post.venue_available?"受入会場あり":"要相談"}</dd></div>
        </dl>
        {post.purpose?<p><strong>目的：</strong>{post.purpose}</p>:null}
        {post.level_note?<p><strong>目安：</strong>{post.level_note}</p>:null}
        {post.public_note?<p>{post.public_note}</p>:null}
        <div className={styles.cardActions}><a href={"/ja/my-homecourt/app/match?post="+post.id}>チームとして関心を伝える<ArrowRight/></a></div>
      </article>})}</div>:<div className={styles.empty}><Globe2/><h2>公開中の募集はまだありません。</h2><p>最初の国際MATCH募集をチーム運営者から作成できます。</p><a href="/ja/my-homecourt/app/match">募集を作成する<ArrowRight/></a></div>}
    </section>
  </div>;
}
