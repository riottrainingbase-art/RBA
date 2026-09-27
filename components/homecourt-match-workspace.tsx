"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Globe2, LoaderCircle, ShieldCheck, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./homecourt-network.module.css";

type Entity={id:string;name:string;country:string;region:string|null;city:string|null};
type Post={id:string;entity_id:string;created_by?:string;title:string;age_group:string;gender:string;country_from:string;city_from:string|null;target_countries:string[];mode:string;starts_on:string|null;ends_on:string|null;team_size_min:number|null;team_size_max:number|null;venue_available:boolean;languages:string[];purpose:string|null;level_note:string|null;public_note:string|null;status:string;created_at:string};
type Interest={id:string;post_id:string;responding_entity_id:string;created_by:string;note:string|null;status:string;created_at:string};

export function HomecourtMatchWorkspace({userId}:{userId:string}){
  const db=useMemo(()=>createClient(),[]);
  const [entities,setEntities]=useState<Entity[]>([]);
  const [posts,setPosts]=useState<Post[]>([]);
  const [openPosts,setOpenPosts]=useState<Post[]>([]);
  const [interests,setInterests]=useState<Interest[]>([]);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function load(){
    const memberships=await db.from("entity_memberships").select("entity_id,member_role,status").eq("user_id",userId).eq("status","active");
    const memberIds=(memberships.data||[]).filter(x=>["owner","admin"].includes(x.member_role)).map(x=>x.entity_id);
    const owned=await db.from("platform_entities").select("id,name,country,region,city").eq("created_by",userId);
    const ownRows=(owned.data||[]) as Entity[];
    const extraIds=memberIds.filter(id=>!ownRows.some(x=>x.id===id));
    let extra:Entity[]=[];
    if(extraIds.length){
      const q=await db.from("platform_entities").select("id,name,country,region,city").in("id",extraIds);
      extra=(q.data||[]) as Entity[];
    }
    const managed=[...ownRows,...extra];
    setEntities(managed);
    if(!managed.length){setPosts([]);setOpenPosts([]);setInterests([]);return;}
    const ids=managed.map(x=>x.id);
    const [myPosts,allOpen]=await Promise.all([
      db.from("homecourt_exchange_posts").select("*").in("entity_id",ids).order("created_at",{ascending:false}),
      db.rpc("get_homecourt_exchange_posts")
    ]);
    const mine=(myPosts.data||[]) as Post[];
    const all=((allOpen.data||[]) as Post[]);
    setPosts(mine);
    setOpenPosts(all.filter(p=>!ids.includes(p.entity_id)));
    const relevant=Array.from(new Set([...mine.map(p=>p.id),...all.map(p=>p.id)]));
    if(relevant.length){
      const iq=await db.from("homecourt_exchange_interests").select("*").in("post_id",relevant).order("created_at",{ascending:false});
      setInterests((iq.data||[]) as Interest[]);
    }else setInterests([]);
  }

  useEffect(()=>{
    const timer=window.setTimeout(()=>void load(),0);
    return()=>window.clearTimeout(timer);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  async function createPost(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");
    const form=new FormData(e.currentTarget);
    const entity=entities.find(x=>x.id===String(form.get("entity_id")));
    if(!entity){setBusy(false);return;}
    const targets=String(form.get("target_countries")||"").split(/[ ,、/]+/).map(x=>x.trim().toUpperCase()).filter(Boolean);
    const languages=String(form.get("languages")||"").split(/[ ,、/]+/).map(x=>x.trim()).filter(Boolean);
    const result=await db.from("homecourt_exchange_posts").insert({
      entity_id:entity.id,created_by:userId,title:String(form.get("title")).trim(),
      age_group:String(form.get("age_group")),gender:String(form.get("gender")),
      country_from:entity.country,city_from:entity.city,target_countries:targets,
      mode:String(form.get("mode")),starts_on:String(form.get("starts_on")||"")||null,
      ends_on:String(form.get("ends_on")||"")||null,
      team_size_min:Number(form.get("team_size_min"))||null,team_size_max:Number(form.get("team_size_max"))||null,
      venue_available:form.get("venue_available")==="on",languages,
      purpose:String(form.get("purpose")||"").trim()||null,
      level_note:String(form.get("level_note")||"").trim()||null,
      public_note:String(form.get("public_note")||"").trim()||null,status:"open"
    });
    setBusy(false);
    setMessage(result.error?"募集を公開できませんでした。入力内容とチーム管理権限をご確認ください。":"国際MATCH募集を公開しました。");
    if(!result.error){e.currentTarget.reset();await load();}
  }

  async function sendInterest(postId:string,entityId:string){
    if(!entityId)return;
    setBusy(true);
    const result=await db.from("homecourt_exchange_interests").insert({
      post_id:postId,responding_entity_id:entityId,created_by:userId,status:"requested",note:"HOMECOURT MATCHから関心を送信"
    });
    setMessage(result.error?"関心を送信できませんでした。すでに送信済みの場合があります。":"チームとして関心を送信しました。個人の連絡先は公開されません。");
    setBusy(false);if(!result.error)await load();
  }

  async function setInterest(id:string,status:"accepted"|"declined"){
    setBusy(true);
    const result=await db.from("homecourt_exchange_interests").update({status,updated_at:new Date().toISOString()}).eq("id",id);
    setBusy(false);
    setMessage(result.error?"更新できませんでした。":status==="accepted"?"MATCH候補として受け付けました。次の調整はチーム運営者同士で安全に進めます。":"今回は見送りに更新しました。");
    if(!result.error)await load();
  }

  const entityName=(id:string)=>entities.find(x=>x.id===id)?.name||"他チーム";
  const myPostIds=new Set(posts.map(x=>x.id));

  return <div className={styles.memberPage}>
    <section className={styles.memberHero}><p className={styles.kicker}><Globe2/> HOMECOURT MATCH / TEAM DESK</p><h1>国際交流を、<br/>チーム単位でつくる。</h1><p>選手個人が知らない大人と直接つながる仕組みではありません。チーム運営者が条件を公開し、団体同士で関心を伝えます。</p></section>
    {message?<p className={styles.message}>{message}</p>:null}

    {!entities.length?<section className={styles.empty}><Users/><h2>管理できる団体がありません。</h2><p>まず掲載ページの運営者確認を申請してください。</p><a href="/ja/my-homecourt/app/claim">運営者確認へ<ArrowRight/></a></section>:<div className={styles.workspace}>
      <article><h2>国際MATCHを募集</h2><form onSubmit={createPost}>
        <label>募集する団体<select name="entity_id" required>{entities.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
        <label>タイトル<input name="title" required placeholder="U15男子｜台湾で交流試合・共同練習希望"/></label>
        <label>年代<select name="age_group">{["U8","U10","U12","U15","U18"].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>カテゴリー<select name="gender"><option value="boys">男子</option><option value="girls">女子</option><option value="mixed">男女・混合</option></select></label>
        <label>希望国コード<input name="target_countries" placeholder="TW KR MY"/></label>
        <label>形態<select name="mode"><option value="travel">遠征したい</option><option value="host">受け入れたい</option><option value="either">どちらも可能</option></select></label>
        <label>開始希望日<input name="starts_on" type="date"/></label>
        <label>終了希望日<input name="ends_on" type="date"/></label>
        <label>最少人数<input name="team_size_min" type="number" min="1"/></label>
        <label>最大人数<input name="team_size_max" type="number" min="1"/></label>
        <label><input name="venue_available" type="checkbox"/> 受入会場を用意できる</label>
        <label>対応言語<input name="languages" placeholder="Japanese English"/></label>
        <label>交流の目的<textarea name="purpose" rows={3} placeholder="勝敗より、違う育成環境を経験し選手同士が交流すること"/></label>
        <label>レベル感の説明<textarea name="level_note" rows={3} placeholder="ランキングではなく、普段の活動カテゴリーや希望するゲーム強度を言葉で"/></label>
        <label>公開メモ<textarea name="public_note" rows={3}/></label>
        <button disabled={busy}>{busy?<LoaderCircle/>:<Globe2/>}募集を公開</button>
      </form></article>
      <article><h2>公開中の自分たちの募集</h2>{posts.length?posts.map(p=><div className={styles.statusCard} key={p.id}><strong>{p.title}</strong><span>{p.status}</span><p>{p.age_group+" / "+(p.target_countries.join("・")||"地域不問")}</p></div>):<p>まだありません。</p>}</article>
    </div>}

    {entities.length?<section className={styles.matchList}><h2>他チームの募集に関心を伝える</h2>
      {openPosts.length?openPosts.map(p=><article key={p.id}><div><strong>{p.title}</strong><p>{p.country_from+" → "+(p.target_countries.join(" / ")||"地域不問")+" · "+p.age_group}</p></div><select id={"entity-"+p.id} defaultValue={entities[0].id}>{entities.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select><button disabled={busy} onClick={()=>{const el=document.getElementById("entity-"+p.id) as HTMLSelectElement|null;if(el)void sendInterest(p.id,el.value);}}>関心を伝える<ArrowRight/></button></article>):<p>現在、条件を公開している他チームはありません。</p>}
    </section>:null}

    {interests.some(i=>myPostIds.has(i.post_id))?<section className={styles.matchList}><h2>自分たちの募集への反応</h2>
      {interests.filter(i=>myPostIds.has(i.post_id)).map(i=><article key={i.id}><div><strong>{entityName(i.responding_entity_id)}</strong><p>{i.status+" · "+(i.note||"")}</p></div>{i.status==="requested"?<div><button disabled={busy} onClick={()=>void setInterest(i.id,"accepted")}><CheckCircle2/>候補として受ける</button><button disabled={busy} onClick={()=>void setInterest(i.id,"declined")}>今回は見送る</button></div>:<span>{i.status}</span>}</article>)}
    </section>:null}

    <section className={styles.notice}><ShieldCheck/><div><strong>未成年者の個人連絡先はMATCHに載せません。</strong><p>チーム運営者同士の調整を前提とし、必要に応じてRBAや現地主催者が間に入れる運用にします。大会登録や渡航・旅行手配には、それぞれ必要な公式手続きと許認可を優先します。</p></div></section>
  </div>;
}
