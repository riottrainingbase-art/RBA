"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Search, ShieldCheck, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./homecourt-network.module.css";

type Entity={entity_id:string;name:string;country:string;region:string|null;city:string|null;operator_confirmed_at:string|null};
type Claim={id:string;entity_id:string;user_id:string;relationship_to_entity:string;proof_url:string|null;proof_note:string|null;status:string;created_at:string};
type Suggestion={id:string;user_id:string;name:string;entity_type:string;country:string;region:string|null;city:string|null;official_url:string|null;source_url:string|null;note:string|null;status:string;created_at:string};

export function HomecourtClaimWorkspace({userId,isAdmin}:{userId:string;isAdmin:boolean}){
  const db=useMemo(()=>createClient(),[]);
  const [entities,setEntities]=useState<Entity[]>([]);
  const [claims,setClaims]=useState<Claim[]>([]);
  const [adminClaims,setAdminClaims]=useState<Claim[]>([]);
  const [suggestions,setSuggestions]=useState<Suggestion[]>([]);
  const [adminSuggestions,setAdminSuggestions]=useState<Suggestion[]>([]);
  const [selected,setSelected]=useState("");
  const [query,setQuery]=useState("");
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function load(){
    const [entityQ,claimsQ,suggestQ]=await Promise.all([
      db.from("homecourt_public_entities").select("entity_id,name,country,region,city,operator_confirmed_at").eq("published",true).order("name"),
      db.from("homecourt_entity_claims").select("*").eq("user_id",userId).order("created_at",{ascending:false}),
      db.from("homecourt_entity_suggestions").select("*").eq("user_id",userId).order("created_at",{ascending:false}),
    ]);
    setEntities((entityQ.data||[]) as Entity[]);
    setClaims((claimsQ.data||[]) as Claim[]);
    setSuggestions((suggestQ.data||[]) as Suggestion[]);
    if(isAdmin){
      const [allClaims,allSuggestions]=await Promise.all([
        db.from("homecourt_entity_claims").select("*").eq("status","pending").order("created_at"),
        db.from("homecourt_entity_suggestions").select("*").eq("status","pending").order("created_at")
      ]);
      setAdminClaims((allClaims.data||[]) as Claim[]);
      setAdminSuggestions((allSuggestions.data||[]) as Suggestion[]);
    }
  }

  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      const e=new URLSearchParams(location.search).get("entity");
      if(e)setSelected(e);
      void load();
    },0);
    return()=>window.clearTimeout(timer);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  async function submitClaim(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!selected)return;setBusy(true);setMessage("");
    const form=new FormData(e.currentTarget);
    const result=await db.from("homecourt_entity_claims").insert({
      entity_id:selected,user_id:userId,relationship_to_entity:String(form.get("relationship")),
      proof_url:String(form.get("proof_url")||"").trim()||null,
      proof_note:String(form.get("proof_note")||"").trim()||null,status:"pending"
    });
    setMessage(result.error?"申請を送信できませんでした。すでに申請中の場合は、下の申請状況をご確認ください。":"運営者確認の申請を受け付けました。JBA等の公式認証を意味するものではありません。");
    setBusy(false);if(!result.error)await load();
  }

  async function submitSuggestion(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");const form=new FormData(e.currentTarget);
    const result=await db.from("homecourt_entity_suggestions").insert({
      user_id:userId,name:String(form.get("name")).trim(),entity_type:String(form.get("entity_type")),
      country:String(form.get("country")).toUpperCase(),region:String(form.get("region")||"").trim()||null,
      city:String(form.get("city")||"").trim()||null,official_url:String(form.get("official_url")||"").trim()||null,
      source_url:String(form.get("source_url")||"").trim()||null,note:String(form.get("note")||"").trim()||null,status:"pending"
    });
    setMessage(result.error?"送信できませんでした。入力内容をご確認ください。":"情報提供を受け付けました。公開前に情報源を確認します。");
    setBusy(false);if(!result.error){e.currentTarget.reset();await load();}
  }

  async function approveClaim(id:string){
    setBusy(true);const result=await db.rpc("approve_homecourt_entity_claim",{claim_id:id});
    setMessage(result.error?"承認できませんでした。":"運営者確認を承認しました。");setBusy(false);if(!result.error)await load();
  }

  async function approveSuggestion(id:string){
    setBusy(true);const result=await db.rpc("approve_homecourt_entity_suggestion",{suggestion_id:id});
    setMessage(result.error?"公開処理を完了できませんでした。":"情報源確認済みの公開ページを作成しました。");setBusy(false);if(!result.error)await load();
  }

  const filtered=entities.filter(x=>[x.name,x.region,x.city].filter(Boolean).join(" ").toLowerCase().includes(query.toLowerCase()));
  const name=(id:string)=>entities.find(x=>x.entity_id===id)?.name||id.slice(0,8);

  return <div className={styles.memberPage}>
    <section className={styles.memberHero}><p className={styles.kicker}><Users/> TEAM / ORGANIZER CLAIM</p><h1>「公式認証」ではなく、<br/>運営者本人であることを確認する。</h1><p>HOMECOURTの運営者確認は、JBA加盟・登録・資格認定とは別物です。掲載情報を誰が管理しているかを明確にするための仕組みです。</p></section>
    {message?<p className={styles.message} role="status">{message}</p>:null}

    <section className={styles.workspace}>
      <article><h2>掲載ページを管理する</h2><p>所属・運営しているチームや団体を探してください。</p>
        <label className={styles.search}><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="チーム・団体名"/></label>
        <select value={selected} onChange={e=>setSelected(e.target.value)}><option value="">選択してください</option>{filtered.map(x=><option key={x.entity_id} value={x.entity_id}>{x.name+" / "+[x.region,x.city].filter(Boolean).join(" ")}</option>)}</select>
        <form onSubmit={submitClaim}>
          <label>あなたの関係<select name="relationship"><option value="owner">代表・運営責任者</option><option value="coach">指導者</option><option value="staff">スタッフ</option></select></label>
          <label>確認できるURL（任意）<input name="proof_url" type="url" placeholder="公式サイト・SNS等"/></label>
          <label>補足<textarea name="proof_note" rows={4} placeholder="公式サイトに記載の連絡先から確認可能、など"/></label>
          <button disabled={busy||!selected}>{busy?<LoaderCircle/>:<ShieldCheck/>}運営者確認を申請</button>
        </form>
      </article>
      <article id="suggest"><h2>掲載がない場合</h2><p>公開情報の情報源を添えてお知らせください。口コミだけでは公開しません。</p>
        <form onSubmit={submitSuggestion}>
          <label>名称<input name="name" required/></label>
          <label>種類<select name="entity_type"><option value="team">チーム</option><option value="club">クラブ</option><option value="school">スクール</option><option value="organizer">主催団体</option><option value="facility">施設</option></select></label>
          <label>国コード<input name="country" defaultValue="JP" maxLength={2} required/></label>
          <label>都道府県・州・地域<input name="region"/></label>
          <label>市区町村・都市<input name="city"/></label>
          <label>公式URL<input name="official_url" type="url"/></label>
          <label>情報源URL<input name="source_url" type="url" required/></label>
          <label>補足<textarea name="note" rows={4}/></label>
          <button disabled={busy}>情報を送る<ArrowRight/></button>
        </form>
      </article>
    </section>

    <section className={styles.statusList}><h2>自分の申請状況</h2>
      {claims.length?claims.map(c=><article key={c.id}><strong>{name(c.entity_id)}</strong><span>{c.status}</span><time>{new Date(c.created_at).toLocaleDateString("ja-JP")}</time></article>):<p>申請はまだありません。</p>}
      {suggestions.map(s=><article key={s.id}><strong>{s.name}</strong><span>{"情報提供 / "+s.status}</span><time>{new Date(s.created_at).toLocaleDateString("ja-JP")}</time></article>)}
    </section>

    {isAdmin?<section className={styles.adminPanel}><h2>ADMIN / 確認待ち</h2><p>承認は「JBA公認」ではなく、HOMECOURT上の運営者確認または情報源確認です。</p>
      {adminClaims.map(c=><article key={c.id}><div><strong>{name(c.entity_id)}</strong><p>{c.relationship_to_entity+" / "+(c.proof_note||"補足なし")}</p></div><button disabled={busy} onClick={()=>void approveClaim(c.id)}><CheckCircle2/>運営者として承認</button></article>)}
      {adminSuggestions.map(s=><article key={s.id}><div><strong>{s.name}</strong><p>{[s.country,s.region,s.city].filter(Boolean).join(" / ")}<br/>{s.source_url}</p></div><button disabled={busy} onClick={()=>void approveSuggestion(s.id)}><CheckCircle2/>情報源を確認して公開</button></article>)}
    </section>:null}
  </div>;
}
