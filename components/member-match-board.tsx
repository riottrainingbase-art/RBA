"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, CheckCircle2, MapPin, ShieldCheck, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  MATCH_AGE_GROUPS, MATCH_GENDERS, MATCH_GENDER_LABELS,
  MATCH_MODES, MATCH_MODE_LABELS, MATCH_PILOT_STATUSES,
  matchEligibleEntity, matchPostInput, todayTokyo
} from "@/lib/homecourt-match";
import styles from "./member-match-board.module.css";

type Org={id:string;name:string;created_by:string;entity_type:string;status:string;verification_status:string};
type Post={id:string;entity_id:string;created_by:string;title:string;age_group:string;gender:string;city_from:string|null;country_from:string;mode:string;starts_on:string|null;status:string;venue_available:boolean;created_at:string};
type Interest={id:string;post_id:string;responding_entity_id:string;created_by:string;status:string;note:string|null;created_at:string};

const initialData:{orgs:Org[];feed:Post[];requests:Interest[];pending:Org[]}={orgs:[],feed:[],requests:[],pending:[]};
const genderLabel=(v:string)=>MATCH_GENDER_LABELS[v as keyof typeof MATCH_GENDER_LABELS]||v;
const modeLabel=(v:string)=>MATCH_MODE_LABELS[v as keyof typeof MATCH_MODE_LABELS]||v;
const statusLabel=(v:string)=>MATCH_PILOT_STATUSES[v as keyof typeof MATCH_PILOT_STATUSES]||v;

export function MemberMatchBoard({userId,isAdmin}:{userId:string;isAdmin:boolean}){
  const db=useMemo(()=>createClient(),[]);
  const [data,setData]=useState(initialData);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState("");
  const [message,setMessage]=useState("");
  const [region,setRegion]=useState("");
  const [age,setAge]=useState("");
  const [organization,setOrganization]=useState("");
  const [requestNotes,setRequestNotes]=useState<Record<string,string>>({});
  const [reviewed,setReviewed]=useState<Record<string,boolean>>({});
  const load=useCallback(async()=>{
    const session=await db.auth.getUser();
    if(session.error||session.data.user?.id!==userId)throw new Error("RBA IDのログインを確認できませんでした。");
    const [mine,membership,posts,requests,pending]=await Promise.all([
      db.from("platform_entities").select("id,name,created_by,entity_type,status,verification_status").eq("created_by",userId).order("created_at",{ascending:false}).limit(30),
      db.from("entity_memberships").select("entity_id").eq("user_id",userId).eq("status","active").in("member_role",["owner","admin"]).limit(30),
      db.from("homecourt_exchange_posts").select("id,entity_id,created_by,title,age_group,gender,city_from,country_from,mode,starts_on,status,venue_available,created_at").eq("status","open").gte("starts_on",todayTokyo()).order("starts_on",{ascending:true}).limit(80),
      db.from("homecourt_exchange_interests").select("id,post_id,responding_entity_id,created_by,status,note,created_at").order("created_at",{ascending:false}).limit(120),
      isAdmin ? db.from("platform_entities").select("id,name,created_by,entity_type,status,verification_status").eq("status","pending_review").order("created_at",{ascending:false}).limit(40) : Promise.resolve({data:[],error:null}),
    ]);
    if(mine.error||membership.error||posts.error||requests.error||pending.error)throw new Error("登録内容を読み込めませんでした。再読み込みしてください。");
    let orgs=(mine.data||[]) as Org[];
    const linked=(membership.data||[]).map(x=>x.entity_id).filter(id=>!orgs.some(x=>x.id===id));
    if(linked.length){
      const extra=await db.from("platform_entities").select("id,name,created_by,entity_type,status,verification_status").in("id",linked);
      if(extra.error)throw new Error("所属組織を読み込めませんでした。");
      orgs=[...orgs,...(extra.data||[]) as Org[]];
    }
    setData({orgs,feed:(posts.data||[]) as Post[],requests:(requests.data||[]) as Interest[],pending:(pending.data||[]) as Org[]});
    setOrganization(current=>orgs.some(o=>o.id===current)?current:(orgs.find(matchEligibleEntity)?.id||orgs[0]?.id||""));
  },[db,userId,isAdmin]);
  useEffect(()=>{
    let valid=true;
    void load().catch(()=>{if(valid)setMessage("現在、募集情報を読み込めません。時間をおいて再度お試しください。");}).finally(()=>{if(valid)setLoading(false)});
    return ()=>{valid=false};
  },[load]);

  const myOrgIds=new Set(data.orgs.map(o=>o.id));
  const matchedOrg=data.orgs.find(o=>o.id===organization);
  const eligibleOrgs=data.orgs.filter(matchEligibleEntity);
  const ownPosts=data.feed.filter(p=>myOrgIds.has(p.entity_id));
  const results=data.feed.filter(p=>(!region||p.city_from?.includes(region))&&(!age||p.age_group===age));
  const orgNames=new Map(data.orgs.map(org=>[org.id,org.name]));
  const requestsForMine=data.requests.filter(r=>ownPosts.some(p=>p.id===r.post_id));
  const ownRequests=data.requests.filter(r=>myOrgIds.has(r.responding_entity_id));
  const submit=async(task:string, fn:()=>Promise<boolean>,success:string)=>{
    if(busy)return;setBusy(task);setMessage("");
    try{
      const ok=await fn();
      if(ok){await load();setMessage(success)}
    }catch{setMessage("操作を完了できませんでした。内容と権限をご確認ください。")}
    finally{setBusy("")}
  };
  const registerOrg=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const form=event.currentTarget, fd=new FormData(form);
    const name=String(fd.get("name")||"").trim();
    if(name.length<2||name.length>120){setMessage("団体名は2〜120文字で入力してください。");return}
    void submit("org",async()=>{
      const {error}=await db.from("platform_entities").insert({
        entity_type:"team",name,created_by:userId,country:"JP",
        status:"pending_review",verification_status:"pending"
      });
      if(error)throw error;form.reset();return true;
    },"団体の確認申請を受け付けました。RBAが確認するまで募集の公開はできません。");
  };
  const createPost=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!matchedOrg||!matchEligibleEntity(matchedOrg)){setMessage("RBAが確認した団体を選択してください。");return}
    const form=event.currentTarget,fd=new FormData(form);
    const result=matchPostInput({
      title:String(fd.get("title")||""),age_group:String(fd.get("age_group")||""),
      gender:String(fd.get("gender")||""),mode:String(fd.get("mode")||""),
      starts_on:String(fd.get("starts_on")||""),city_from:String(fd.get("city_from")||"")
    });
    if(!result.ok){setMessage(result.message);return}
    const input=result.data;
    void submit("post",async()=>{
      const {error}=await db.from("homecourt_exchange_posts").insert({
        ...input, entity_id:matchedOrg.id,created_by:userId,
        country_from:"JP",venue_available:input.mode==="host",status:"open",
        purpose:"練習試合・育成交流"
      });
      if(error)throw error;form.reset();return true;
    },"募集を公開しました。指導者の申請が入ると、この画面で確認できます。");
  };
  const interest=(post:Post)=>{
    const text=(requestNotes[post.id]||"").trim();
    if(!matchedOrg||!matchEligibleEntity(matchedOrg)||matchedOrg.id===post.entity_id){
      setMessage("確認済みの自分の団体を選択してください。");return;
    }
    if(text.length>300){setMessage("申請メッセージは300文字までです。");return}
    if(/https?:\/\/|www\.|[^\s@]+@[^\s@]+\.[^\s@]+|0\d{9,10}|@[a-z0-9_]+/i.test(text)){
      setMessage("未成年者保護のため、連絡先やSNS IDは記載しないでください。");return;
    }
    void submit("interest-"+post.id,async()=>{
      const {error}=await db.from("homecourt_exchange_interests").insert({
        post_id:post.id,responding_entity_id:matchedOrg.id,created_by:userId,note:text,status:"requested"
      });if(error)throw error;return true;
    },"交流希望を登録しました。主催側の判断をこの画面で確認できます。");
  };
  const updateStatus=(table:"homecourt_exchange_posts"|"homecourt_exchange_interests",id:string,status:string)=>{
    void submit("status-"+id,async()=>{
      const {error}=await db.from(table).update({status}).eq("id",id);
      if(error)throw error;return true;
    },status==="closed"?"募集を終了しました。":status==="accepted"?"希望を承認しました。詳細はRBAの運営窓口を通して調整してください。":"状態を更新しました。");
  };
  const verifyOrg=(org:Org)=>{
    if(!isAdmin||!reviewed[org.id]){setMessage("確認資料と団体代表者の適格性を確認してから承認してください。");return}
    void submit("verify-"+org.id,async()=>{
      const {error}=await db.from("platform_entities")
        .update({status:"active",verification_status:"verified"})
        .eq("id",org.id).eq("status","pending_review");
      if(error)throw error;return true;
    },"団体を認証しました。");
  };

  return <section className={styles.page} aria-labelledby="match-title">
    <div className={styles.heading}>
      <div>
        <p className={styles.kicker}>MY HOMECOURT / RBA MATCH</p>
        <h1 id="match-title">次の対戦相手を見つける。</h1>
        <p>練習試合・育成交流の募集と希望を、チームの責任者同士で管理します。所属チームを辞める必要はありません。</p>
      </div>
      <div className={styles.safety}><ShieldCheck size={19} aria-hidden="true"/>認証済みの団体・指導者による試験運用。未成年者への自由なDM・連絡先公開・自動決済はありません。</div>
    </div>
    {message?<p className={styles.status} role="status">{message}</p>:null}
    {loading?<p className={styles.empty} role="status">募集情報を確認しています…</p>:<>
      <section className={styles.block} aria-labelledby="match-filter-title">
        <div className={styles.blockHeading}>
          <div><p className={styles.kicker}>FIND A MATCH</p><h2 id="match-filter-title">練習試合を探す</h2></div>
          <span>{results.length} 件</span>
        </div>
        <div className={styles.filters}>
          <label>対象年代
            <select value={age} onChange={e=>setAge(e.target.value)}><option value="">すべての年代</option>{MATCH_AGE_GROUPS.map(a=><option key={a}>{a}</option>)}</select>
          </label>
          <label>市区町村
            <input value={region} onChange={e=>setRegion(e.target.value)} placeholder="例：仙台市" maxLength={60}/>
          </label>
        </div>
        {results.length?<div className={styles.postList}>{results.map(post=>{
          const already=data.requests.some(x=>x.post_id===post.id&&myOrgIds.has(x.responding_entity_id));
          return <article className={styles.post} key={post.id}>
            <div className={styles.postHead}><span>{post.age_group} / {genderLabel(post.gender)}</span><span>{modeLabel(post.mode)}</span></div>
            <h3>{post.title}</h3>
            <p><CalendarDays size={16} aria-hidden="true"/>{post.starts_on||"日程要確認"}　<MapPin size={16} aria-hidden="true"/>{post.city_from||"地域要確認"}</p>
            {myOrgIds.has(post.entity_id)?<div className={styles.ownerActions}>
              <strong>自団体の募集</strong>
              <button type="button" disabled={Boolean(busy)} onClick={()=>updateStatus("homecourt_exchange_posts",post.id,"closed")}>募集を終了する</button>
            </div>:already?<p className={styles.sent}><CheckCircle2 size={16} aria-hidden="true"/>申請済みです。状態を下で確認できます。</p>:<div className={styles.interest}>
              <label htmlFor={"note-"+post.id}>交流希望のメモ（任意・300文字以内）</label>
              <textarea id={"note-"+post.id} value={requestNotes[post.id]||""} onChange={e=>setRequestNotes(old=>({...old,[post.id]:e.target.value}))} maxLength={300} placeholder="例：当日はU12男子10名で参加を希望します。連絡先や子どもの名前は記載しないでください。"/>
              <button type="button" disabled={Boolean(busy)||!matchedOrg||!matchEligibleEntity(matchedOrg)} onClick={()=>interest(post)}>この募集に希望を送る <ArrowUpRight size={15} aria-hidden="true"/></button>
            </div>}
          </article>
        })}</div>:<p className={styles.empty}>この条件で現在公開中の募集はありません。まずは協力チームでの試験運用から始めます。</p>}
      </section>

      <section className={styles.block} aria-labelledby="match-club-title">
        <div className={styles.blockHeading}><div><p className={styles.kicker}>YOUR CLUB</p><h2 id="match-club-title">団体登録・募集</h2></div></div>
        {data.orgs.length?<label className={styles.orgPicker}>操作する団体
          <select value={organization} onChange={e=>setOrganization(e.target.value)}>
            {data.orgs.map(o=><option value={o.id} key={o.id}>{o.name} — {matchEligibleEntity(o)?"認証済み":"確認待ち"}</option>)}
          </select>
        </label>:null}
        {matchedOrg?<p className={styles.orgState}>団体の確認状況：<strong>{matchEligibleEntity(matchedOrg)?"認証済み（募集可）":"RBAによる確認待ち"}</strong></p>:null}
        {eligibleOrgs.length?<form className={styles.form} onSubmit={createPost}>
          <h3>練習試合の募集を登録</h3>
          <label>募集タイトル <input name="title" required maxLength={120} minLength={4} placeholder="例：12月・仙台 U12交流ゲーム"/></label>
          <div className={styles.formGrid}>
            <label>対象年代 <select name="age_group" required>{MATCH_AGE_GROUPS.map(a=><option key={a}>{a}</option>)}</select></label>
            <label>対象 <select name="gender">{MATCH_GENDERS.map(g=><option value={g} key={g}>{genderLabel(g)}</option>)}</select></label>
            <label>予定日 <input name="starts_on" type="date" min={todayTokyo()} required/></label>
            <label>開催方法 <select name="mode">{MATCH_MODES.map(m=><option value={m} key={m}>{modeLabel(m)}</option>)}</select></label>
          </div>
          <label>地域（市区町村まで）<input name="city_from" placeholder="例：仙台市太白区" required maxLength={90}/></label>
          <p className={styles.fieldHelp}>会場の詳しい住所、連絡先、個人名はここでは公開しません。日時や会場の利用は双方で別途確認します。</p>
          <button disabled={Boolean(busy)||!matchedOrg||!matchEligibleEntity(matchedOrg)}>募集を公開する</button>
        </form>:<p className={styles.empty}>募集を公開するには、団体代表者の確認が必要です。以下から申請できます。確認後に募集機能が使えるようになります。</p>}
        <form className={styles.form} onSubmit={registerOrg}>
          <h3>団体の確認申請</h3>
          <label>正式な団体名<input name="name" required minLength={2} maxLength={120} placeholder="例：〇〇バスケットボールクラブ"/></label>
          <p className={styles.fieldHelp}>申請しただけでは認証・加盟とはなりません。運営者と団体の実在性をRBA側で確認します。</p>
          <button disabled={Boolean(busy)}>新しい団体を申請する</button>
        </form>
      </section>

      <section className={styles.block} aria-labelledby="match-applications-title">
        <div className={styles.blockHeading}><div><p className={styles.kicker}>REQUESTS</p><h2 id="match-applications-title">交流希望の状況</h2></div></div>
        {requestsForMine.map(r=><article className={styles.request} key={r.id}>
          <strong>自団体への希望 — {statusLabel(r.status)}</strong>
          <p>対象募集：{ownPosts.find(p=>p.id===r.post_id)?.title||"募集終了・非表示"}</p>
          <p>団体ID：{r.responding_entity_id.slice(0,8)}…</p>
          {r.note?<p>申請内容：{r.note}</p>:null}
          {r.status==="requested"?<div className={styles.requestButtons}>
            <button disabled={Boolean(busy)} onClick={()=>updateStatus("homecourt_exchange_interests",r.id,"accepted")}>受入を承認</button>
            <button disabled={Boolean(busy)} onClick={()=>updateStatus("homecourt_exchange_interests",r.id,"declined")}>今回は見送る</button>
          </div>:null}
        </article>)}
        {ownRequests.filter(r=>!requestsForMine.some(t=>t.id===r.id)).map(r=><article className={styles.request} key={r.id}>
          <strong>申請した交流 — {statusLabel(r.status)}</strong>
          <p>申請日：{r.created_at.slice(0,10)}</p>
          {r.status==="requested"?<button disabled={Boolean(busy)} onClick={()=>updateStatus("homecourt_exchange_interests",r.id,"cancelled")}>申請を取り下げる</button>:null}
          {r.status==="accepted"?<p>受入承認済み。日程や会場の最終確定はRBAの運営窓口を通じて行ってください。</p>:null}
        </article>)}
        {!requestsForMine.length&&!ownRequests.length?<p className={styles.empty}>まだ申請はありません。申請・回答の結果はここに表示されます。</p>:null}
        <a className={styles.supportLink} href="/ja/contact">安全・会場・組み合わせの確認を相談する <ArrowUpRight size={15}/></a>
      </section>

      {isAdmin?<section className={styles.block} aria-labelledby="match-admin-title">
        <div className={styles.blockHeading}><div><p className={styles.kicker}>RBA / OPERATOR ONLY</p><h2 id="match-admin-title">団体確認キュー</h2></div><span>{data.pending.length} 件</span></div>
        {data.pending.map(org=><article className={styles.request} key={org.id}>
          <strong>{org.name}</strong><p>管理者ID：{org.created_by.slice(0,8)}… / {org.entity_type}</p>
          <label className={styles.check}><input type="checkbox" checked={Boolean(reviewed[org.id])} onChange={e=>setReviewed(old=>({...old,[org.id]:e.target.checked}))}/>団体・責任者の実在性、指導者の適格性、安全体制を別途確認済み</label>
          <button disabled={Boolean(busy)||!reviewed[org.id]} onClick={()=>verifyOrg(org)}>確認して認証する</button>
        </article>)}
        {!data.pending.length?<p className={styles.empty}>確認待ちの団体はありません。</p>:null}
      </section>:null}
      <p className={styles.disclaimer}>RBA MATCHは無料の試験運用です。募集の掲載・希望の送信は施設や指導者の確保、試合の成立、料金の発生を意味しません。最終開催は双方の責任者が条件を確認した後に決めます。</p>
    </>}
  </section>;
}
