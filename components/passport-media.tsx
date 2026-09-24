"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./passport-media.module.css";

type LinkEntry={id:string;title?:string};
type Media={id:string;storage_path:string;mime_type:string;title:string;captured_on:string;focus_seconds:number;noticed:string;next_action:string;review_on:string;history_id:string|null;goal_id:string|null};
const bucket="homecourt-private";
const formats:Record<string,string>={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","video/mp4":"mp4","video/quicktime":"mov","video/webm":"webm"};
const day=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
function nextWeek(){const d=new Date(`${day()}T12:00:00+09:00`);d.setDate(d.getDate()+7);return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(d);}
function Player({item,url}:{item:Media;url?:string}){
 const video=useRef<HTMLVideoElement>(null);
 const [error,setError]=useState(false);
 if(!url)return <p>ファイルを表示できません。「表示を更新」をお試しください。未完了の記録は削除して再登録できます。</p>;
 return <>{item.mime_type.startsWith("video/")?<><video ref={video} className={styles.visual} src={url} controls playsInline preload="metadata" onError={()=>setError(true)} aria-label={item.title}/><div className={styles.actions}><button type="button" onClick={()=>{if(video.current)video.current.currentTime=Math.min(item.focus_seconds,Number.isFinite(video.current.duration)?video.current.duration:item.focus_seconds);}}>注目の場面 · {item.focus_seconds}秒</button><label>再生速度<select defaultValue="1" onChange={e=>{if(video.current)video.current.playbackRate=Number(e.target.value);}}><option value="0.5">0.5倍</option><option value="0.75">0.75倍</option><option value="1">1倍</option></select></label></div></>:/* Private, short-lived URLs are intentionally not sent to an image optimizer. */
 // eslint-disable-next-line @next/next/no-img-element
 <img className={styles.visual} src={url} alt={item.title} loading="lazy" onError={()=>setError(true)}/>}{error&&<p role="status">この端末では表示できない形式か、表示期限が切れています。表示を更新するか、元のファイルを開いてください。</p>}<a href={url} target="_blank" rel="noopener noreferrer">元のファイルを開く</a></>;
}

export function PassportMedia({userId,personId,history,goals,onGoal,onLock}:{userId:string;personId:string;history:LinkEntry[];goals:LinkEntry[];onGoal:(action:string)=>void;onLock:(locked:boolean)=>void}){
 const db=useMemo(()=>createClient(),[]);
 const [items,setItems]=useState<Media[]>([]),[urls,setUrls]=useState<Record<string,string>>({});
 const [loading,setLoading]=useState(true),[failed,setFailed]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 const [form,setForm]=useState<Media|"new"|null>(null),[file,setFile]=useState<File|null>(null),[preview,setPreview]=useState("");
 const [selected,setSelected]=useState<string[]>([]),[filter,setFilter]=useState("all"),[limit,setLimit]=useState(8),[hasMore,setHasMore]=useState(false);
 const formRef=useRef<HTMLFormElement>(null),compareRef=useRef<HTMLDivElement>(null);
 const [pendingId,setPendingId]=useState<string|null>(null);
 const load=useCallback(async()=>{
  setLoading(true);setFailed(false);
  try{
   const {data,error,count}=await db.from("homecourt_media").select("*",{count:"exact"}).eq("user_id",userId).eq("person_id",personId).order("captured_on",{ascending:false}).order("created_at",{ascending:false}).limit(1000);
   if(error)throw error;
   const records=(data||[]) as Media[];setItems(records);setHasMore((count||0)>1000);
   const signed=records.length?await db.storage.from(bucket).createSignedUrls(records.map(x=>x.storage_path),900):{data:[],error:null};
   setUrls(Object.fromEntries((signed.data||[]).filter(x=>x.signedUrl).map(x=>[x.path,x.signedUrl])));
   if(signed.error)setMessage("記録は読み込めましたが、写真・動画を表示できませんでした。表示を更新してください。");
   return true;
  }catch{setFailed(true);setMessage("読み込めませんでした。通信状態を確認して、表示を更新してください。");return false;}finally{setLoading(false);}
 },[db,personId,userId]);
 useEffect(()=>{const t=setTimeout(()=>void load(),0);return()=>clearTimeout(t);},[load]);
 useEffect(()=>()=>{if(preview)URL.revokeObjectURL(preview);},[preview]);
 useEffect(()=>{onLock(busy||!!form);return()=>onLock(false);},[busy,form,onLock]);
 useEffect(()=>{if(form){formRef.current?.scrollIntoView({behavior:"smooth",block:"start"});formRef.current?.querySelector<HTMLInputElement>("input")?.focus({preventScroll:true});}},[form]);
 useEffect(()=>{const warn=(e:BeforeUnloadEvent)=>{if(busy||form){e.preventDefault();}};window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn);},[busy,form]);
 function open(item:Media|"new"){if(form&&!window.confirm("入力中の内容を保存せずに開きますか？"))return;setPendingId(null);setForm(item);setFile(null);setPreview("");setMessage("");}
 async function save(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||!form)return;
  const f=new FormData(e.currentTarget);const isNew=form==="new";
  if(isNew&&(!file||!formats[file.type]||file.size>50*1024*1024||!file.size)){setMessage("50MB以内のJPEG・PNG・WebP画像、MP4・MOV・WebM動画を選んでください。長い動画は注目する場面に短く切り出せます。");return;}
  const title=String(f.get("title")||"").trim();if(!title){setMessage("タイトルを入力してください。");return;}
  const id=isNew?(pendingId||crypto.randomUUID()):form.id;const path=isNew?`${userId}/${personId}/${id}`:form.storage_path;
  const payload={title,captured_on:String(f.get("captured_on")),focus_seconds:Number(f.get("focus_seconds")||0),noticed:String(f.get("noticed")||"").trim(),next_action:String(f.get("next_action")||"").trim(),review_on:String(f.get("review_on")),history_id:String(f.get("history_id")||"")||null,goal_id:String(f.get("goal_id")||"")||null};
  setBusy(true);setMessage(isNew?"写真・動画を保存しています。この画面を開いたままお待ちください。":"振り返りを保存しています…");
  try{
   const r=isNew&&!pendingId?await db.from("homecourt_media").insert({...payload,id,user_id:userId,person_id:personId,storage_path:path,mime_type:file!.type}).select("id").single():await db.from("homecourt_media").update(payload).eq("id",id).eq("user_id",userId).eq("person_id",personId).select("id").single();
   if(r.error)throw r.error;
   if(isNew){
    setPendingId(id);
    const result=await db.storage.from(bucket).upload(path,file!,{contentType:file!.type,upsert:false,cacheControl:"0"});
    if(result.error&&result.error.statusCode!=="409"){
     // Retain metadata on ambiguous network failure: the file may already have arrived.
     setMessage("アップロードの完了を確認できませんでした。入力内容は残しています。「表示を更新」で保存状況を確認してから再度お試しください。");return;
    }
   }
   setPendingId(null);setForm(null);setFile(null);setPreview("");if(await load())setMessage("保存しました。見返した気づきを、次の練習につなげましょう。");
  }catch{setMessage("保存できませんでした。入力内容は残しています。通信状態と入力内容を確認してください。");}finally{setBusy(false);}
 }
 async function remove(item:Media){
  if(busy||!window.confirm(`「${item.title}」の写真・動画と振り返りを削除しますか？元に戻せません。`))return;
  setBusy(true);
  try{const removed=await db.storage.from(bucket).remove([item.storage_path]);if(removed.error)throw removed.error;const row=await db.from("homecourt_media").delete().eq("id",item.id).eq("user_id",userId).select("id").single();if(row.error)throw row.error;setSelected(v=>v.filter(id=>id!==item.id));if(await load())setMessage("写真・動画と振り返りを削除しました。");}catch{setMessage("削除が完了しませんでした。表示を更新してから、もう一度お試しください。");}finally{setBusy(false);}
 }
 const chosen=items.filter(x=>selected.includes(x.id)).sort((a,b)=>a.captured_on.localeCompare(b.captured_on));
 const filtered=items.filter(x=>filter==="all"||(filter==="due"?x.review_on<=day():x.mime_type.startsWith(filter)));
 const edit=form&&form!=="new"?form:null;
 return <section className={styles.root} aria-labelledby="media-title">
  <div className={styles.head}><div><h3 id="media-title">写真・動画で、成長を見つける。</h3><p>残す → 見比べる → 気づく → 次の練習で試す。</p></div><button disabled={busy} onClick={()=>open("new")}>＋ 写真・動画を残す</button></div>
  <p>自分・子どものプレーを残す非公開のノートです。一緒に映る方の了承を得た写真・動画を選んでください。</p>
  {message&&<p role="status" className={styles.status}>{message}</p>}
  <div className={styles.actions}><button disabled={busy||loading} onClick={()=>void load()}>表示を更新</button><label>表示する記録<select value={filter} onChange={e=>{setFilter(e.target.value);setLimit(8);}}><option value="all">すべて</option><option value="due">振り返る日を迎えた記録</option><option value="video/">動画</option><option value="image/">写真</option></select></label></div>
  {selected.length>0&&<button onClick={()=>compareRef.current?.scrollIntoView({behavior:"smooth",block:"start"})}>選んだ{selected.length}件を見比べる</button>}
  <p><small>表示用リンクの有効期限は15分です。表示できなくなったら更新してください。</small></p>
  {form&&<form ref={formRef} className={styles.form} onSubmit={save} key={edit?.id||"new"}><h4>{edit?"気づき・次の一歩を更新":"プレーの記録を残す"}</h4><fieldset disabled={busy}>
   {!edit&&<><label>写真・動画（1件50MBまで）<input type="file" required disabled={!!pendingId} accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm" onChange={e=>{const picked=e.target.files?.[0]||null;setFile(picked);setPreview(picked?URL.createObjectURL(picked):"");}}/></label><small>写真はJPEG・PNG・WebP、動画はMP4・MOV・WebM。iPhoneのHEIC写真はJPEGに変換してください。端末によってはMOV動画を再生できないため、MP4をおすすめします。</small>{preview&&file&&formats[file.type]&&(file.type.startsWith("video/")?<video className={`${styles.visual} ${styles.preview}`} src={preview} controls playsInline preload="metadata"/>:
   // eslint-disable-next-line @next/next/no-img-element
   <img className={`${styles.visual} ${styles.preview}`} src={preview} alt="保存する写真の確認"/>)}</>}
   <label>タイトル<input name="title" required maxLength={160} defaultValue={edit?.title||""} placeholder="例：クリニックで教わったレイアップ"/></label>
   <label>撮影日<input name="captured_on" type="date" required min="2000-01-01" max={day()} defaultValue={edit?.captured_on||day()}/></label>
   <label>関連する参加履歴<select name="history_id" defaultValue={edit?.history_id||""}><option value="">普段の練習・試合など</option>{history.map(h=><option key={h.id} value={h.id}>{h.title}</option>)}</select></label>
   <label>取り組んでいる目標<select name="goal_id" defaultValue={edit?.goal_id||""}><option value="">まだ選ばない</option>{goals.map(g=><option key={g.id} value={g.id}>{g.title}</option>)}</select></label>
   <label>動画で注目する場面（開始からの秒数）<input name="focus_seconds" type="number" min={0} max={7200} step={1} defaultValue={edit?.focus_seconds||0}/></label>
   <label>見て気づいたこと<textarea name="noticed" maxLength={2000} rows={3} defaultValue={edit?.noticed||""} placeholder="できたことや、前回から変わったことは？"/></label>
   <label>次の練習で試すこと<textarea name="next_action" maxLength={1000} rows={3} defaultValue={edit?.next_action||""} placeholder="例：踏み切る前にリングを見る"/></label>
   <label>次に見返す日<input name="review_on" type="date" min="2000-01-01" required defaultValue={edit?.review_on||nextWeek()}/></label>
   {!edit&&<label className={styles.check}><input type="checkbox" required/>この写真・動画を保存する権利・了承があります。未成年の方は保護者と確認してください。</label>}
   <div className={styles.actions}><button type="submit">{busy?"保存中…":"非公開で保存"}</button><button type="button" onClick={()=>{if(window.confirm("入力内容を保存せず閉じますか？")){setForm(null);setFile(null);setPreview("");}}}>閉じる</button></div>
  </fieldset></form>}
  {selected.length>0&&<div className={styles.compare} ref={compareRef}><h4>前の自分と、今の自分。</h4><p>2件を選ぶと、撮影日の古い順に並びます。スマホでは上下に並べて見比べられます。</p><div className={styles.grid}>{chosen.map(item=><article key={item.id}><small>{item.captured_on}</small><h4>{item.title}</h4><Player item={item} url={urls[item.storage_path]}/><p>{item.noticed}</p></article>)}</div><button onClick={()=>setSelected([])}>比較を閉じる</button></div>}
  {loading?<p role="status">写真・動画を読み込んでいます…</p>:failed?null:<><p>{filtered.length}件{hasMore?"（最新1,000件から表示）":""} · 比較したい記録を2件まで選べます。</p>{!filtered.length&&<p>{items.length?"条件に合う記録はありません。":"まずは1枚、1本から。今のプレーが、これからの成長の基準になります。"}</p>}<div className={styles.grid}>{filtered.slice(0,limit).map(item=><article className={styles.card} key={item.id}><small>{item.captured_on} · {item.mime_type.startsWith("video/")?"動画":"写真"}</small><h4>{item.title}</h4><Player key={`${item.id}-${urls[item.storage_path]}`} item={item} url={urls[item.storage_path]}/>{item.history_id&&<p><small>参加履歴：{history.find(h=>h.id===item.history_id)?.title||"登録済みの参加"}</small></p>}{item.goal_id&&<p><small>目標：{goals.find(g=>g.id===item.goal_id)?.title||"登録済みの目標"}</small></p>}<h5>気づいたこと</h5><p>{item.noticed||"見返した気づきを追記しましょう。"}</p><h5>次の練習で試すこと</h5><p>{item.next_action||"次の一歩を一つ決めてみましょう。"}</p><span className={styles.badge}>{item.review_on<=day()?"振り返りのタイミングです":"次に見返す日"} · {item.review_on}</span><label className={styles.check}><input type="checkbox" checked={selected.includes(item.id)} disabled={!selected.includes(item.id)&&selected.length>=2} onChange={e=>setSelected(v=>e.target.checked?[...v,item.id]:v.filter(id=>id!==item.id))}/>見比べる記録に選ぶ</label><div className={styles.actions}><button disabled={busy} onClick={()=>open(item)}>振り返りを更新</button>{item.next_action&&<button disabled={busy} onClick={()=>{if(form&&!window.confirm("入力中の内容を閉じて目標を作りますか？"))return;onGoal(item.next_action);}}>この一歩を目標にする</button>}<button disabled={busy} onClick={()=>void remove(item)}>削除</button></div></article>)}</div>{filtered.length>limit&&<button onClick={()=>setLimit(limit+8)}>さらに8件を見る</button>}</>}
 </section>;
}
