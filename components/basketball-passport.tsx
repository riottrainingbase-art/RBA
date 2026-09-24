"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./basketball-passport.module.css";
import { PassportMedia } from "./passport-media";

type Person = { id:string; name:string; relationship:"self"|"child"; age_group:string; region:string };
type Entry = { id:string; person_id:string; title?:string; occurred_on?:string; date_precision?:string; venue?:string; takeaway?:string; next_action?:string; checked_on?:string; strengths?:string; challenge?:string; horizon?:string; action?:string; success?:string; target_on?:string; status?:string };
type Official = { id:string; events:{title:string;starts_at:string;venue:string|null}|null };
type Kind = "person"|"history"|"checkin"|"goal";
type Field = {name:string;label:string;type?:string;required?:boolean;max?:number;hint?:string;options?:string[][]};
const tables={person:"homecourt_people",history:"homecourt_history",checkin:"homecourt_checkins",goal:"homecourt_goals"};
const today=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
const ages=["U8","U10","U12","U15","U18","ADULT","COACH"];
const fields:Record<Kind,Field[]>={
 person:[{name:"name",label:"記録する人の呼び名",required:true,max:60,hint:"ニックネームで登録できます。"},{name:"relationship",label:"誰の記録ですか？",options:[["self","自分"],["child","保護者として子どもの記録を残す"]]},{name:"age_group",label:"対象年代・立場",options:ages.map(x=>[x,x==="ADULT"?"一般":x==="COACH"?"指導者":x])},{name:"region",label:"活動する地域",max:80,hint:"都道府県や市区町村まで。住所は不要です。"}],
 history:[{name:"title",label:"参加したクリニック・キャンプ名",required:true,max:160,hint:"例：仙台バスケットボールクリニック"},{name:"occurred_on",label:"参加日",type:"date",required:true},{name:"date_precision",label:"日付の確かさ",options:[["day","参加日を覚えている"],["month","月まで覚えている（日付はその月の1日を選択）"]]},{name:"venue",label:"地域・会場／国・都市",max:160,hint:"例：仙台、石垣島、台北、オンライン。海外経験でなくても構いません。"},{name:"takeaway",label:"覚えていること・学んだこと",type:"textarea",max:2000},{name:"next_action",label:"今の練習で試したいこと",type:"textarea",max:1000}],
 checkin:[{name:"checked_on",label:"振り返る日",type:"date",required:true},{name:"strengths",label:"できるようになったこと・自分の強み",type:"textarea",required:true,max:2000,hint:"例：ボールを持つ前に周りを見る回数が増えた。"},{name:"challenge",label:"今、取り組みたい課題",type:"textarea",required:true,max:2000},{name:"next_action",label:"次の練習で試すことを一つ",type:"textarea",required:true,max:1000}],
 goal:[{name:"horizon",label:"どのくらい先を見ますか？",options:[["week","今週の一歩"],["three_months","3か月の挑戦"],["vision","この先のビジョン"]]},{name:"title",label:"どんな自分になりたいですか？",required:true,max:160},{name:"action",label:"そのために取り組むこと",type:"textarea",required:true,max:1000},{name:"success",label:"できたと分かる目印",type:"textarea",required:true,max:1000,hint:"結果だけでなく、行動でも決められます。例：練習ごとに一度、自分から声をかける。"},{name:"target_on",label:"振り返る予定日",type:"date",required:true},{name:"status",label:"取り組み状況",options:[["active","取り組み中"],["achieved","達成した"],["paused","いったん休む"]]}]
};
const titles:Record<Kind,string>={person:"記録する人を登録",history:"過去のクリニックを記録",checkin:"今の自分を振り返る",goal:"次の目標を決める"};
const horizons:Record<string,string>={week:"今週の一歩",three_months:"3か月の挑戦",vision:"この先のビジョン"};
function dateLabel(date?:string,month=false){return date?new Date(`${date.slice(0,10)}T12:00:00+09:00`).toLocaleDateString("ja-JP",{year:"numeric",month:"long",...(month?{}:{day:"numeric"})}):"";}

export function BasketballPassport({userId}:{userId:string}){
 const formRef=useRef<HTMLFormElement>(null);
 const [mediaLocked,setMediaLocked]=useState(false),[draftAction,setDraftAction]=useState("");
 const db=useMemo(()=>createClient(),[]);
 const [people,setPeople]=useState<Person[]>([]),[personId,setPersonId]=useState("");
 const [history,setHistory]=useState<Entry[]>([]),[checkins,setCheckins]=useState<Entry[]>([]),[goals,setGoals]=useState<Entry[]>([]),[official,setOfficial]=useState<Official[]>([]);
 const [loading,setLoading]=useState(true),[failed,setFailed]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 const [view,setView]=useState<"overview"|"history"|"checkin"|"goal"|"media">("overview");
 const [form,setForm]=useState<{kind:Kind;entry?:Entry|Person}|null>(null),[removing,setRemoving]=useState<{kind:Kind;id:string}|null>(null);
 const [limit,setLimit]=useState(10),[truncated,setTruncated]=useState(false);
 const person=people.find(p=>p.id===personId);
 const load=useCallback(async(preferred?:string)=>{
  setLoading(true);setFailed(false);
  try{
   const p=await db.from(tables.person).select("id,name,relationship,age_group,region").eq("user_id",userId).order("created_at");
   if(p.error)throw p.error;
   const members=(p.data||[]) as Person[];const id=members.some(x=>x.id===preferred)?preferred!:members[0]?.id||"";
   setPeople(members);setPersonId(id);
   if(!id){setHistory([]);setCheckins([]);setGoals([]);setOfficial([]);return true;}
   const [h,c,g,o]=await Promise.all([
    db.from(tables.history).select("*",{count:"exact"}).eq("user_id",userId).eq("person_id",id).order("occurred_on",{ascending:false}).order("created_at",{ascending:false}).limit(1000),
    db.from(tables.checkin).select("*",{count:"exact"}).eq("user_id",userId).eq("person_id",id).order("checked_on",{ascending:false}).order("created_at",{ascending:false}).limit(1000),
    db.from(tables.goal).select("*",{count:"exact"}).eq("user_id",userId).eq("person_id",id).order("target_on").limit(1000),
    members.find(x=>x.id===id)?.relationship==="self"?db.from("participations").select("id,events(title,starts_at,venue)").eq("player_user_id",userId).eq("attendance_status","attended").limit(1000):Promise.resolve({data:[],error:null})
   ]);
   if(h.error||c.error||g.error||o.error)throw new Error("load");
   setHistory(h.data||[]);setCheckins(c.data||[]);setGoals(g.data||[]);setOfficial((o.data||[]) as unknown as Official[]);
   setTruncated([h,c,g].some(x=>(x.count||0)>1000));return true;
  }catch{setFailed(true);setMessage("記録を読み込めませんでした。再読み込みしてください。保存済みの記録は削除されていません。");return false;}
  finally{setLoading(false);}
 },[db,userId]);
 useEffect(()=>{const timer=setTimeout(()=>void load(),0);return()=>clearTimeout(timer);},[load]);
 useEffect(()=>{if(form){formRef.current?.scrollIntoView({behavior:"smooth",block:"start"});formRef.current?.querySelector<HTMLInputElement>("input,select,textarea")?.focus({preventScroll:true});}},[form]);
 function open(kind:Kind,entry?:Entry|Person){if(form&&!window.confirm("入力中の内容を保存せず、別の記録を開きますか？"))return;setDraftAction("");setForm({kind,entry});setMessage("");setRemoving(null);}
 async function save(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(!form||busy)return;
  const el=e.currentTarget;if(!el.checkValidity())return;
  const f=new FormData(el);const payload:Record<string,string>={user_id:userId};
  for(const field of fields[form.kind])payload[field.name]=String(f.get(field.name)||"").trim();
  if(fields[form.kind].some(field=>field.required&&!payload[field.name])){setMessage("空欄の項目を入力してください。");return;}
  if(form.kind!=="person")payload.person_id=personId;
  if(form.kind==="history"&&payload.date_precision==="month")payload.occurred_on=payload.occurred_on.slice(0,7)+"-01";
  setBusy(true);setMessage("");
  try{
   const result=form.entry?await db.from(tables[form.kind]).update(payload).eq("user_id",userId).eq("id",form.entry.id).select("id").single():await db.from(tables[form.kind]).insert(payload).select("id").single();
   if(result.error){setMessage(result.error.code==="23505"?"同じ記録が登録されています。自分の記録は1人までです。既存の記録をご確認ください。":"保存できませんでした。入力内容を残しています。通信状態と日付を確認し、もう一度お試しください。");return;}
   const selected=form.kind==="person"?result.data.id:personId;setForm(null);if(await load(selected))setMessage("アカウントに保存しました。");
  }catch{setMessage("通信できませんでした。入力内容を残しています。もう一度お試しください。");}
  finally{setBusy(false);}
 }
 async function remove(){
  if(!removing||busy)return;setBusy(true);
  try{const {data,error}=await db.from(tables[removing.kind]).delete().eq("user_id",userId).eq("id",removing.id).select("id").single();if(error||!data)throw new Error("delete");setRemoving(null);if(await load(personId))setMessage("記録を削除しました。");}catch{setMessage("削除できませんでした。もう一度お試しください。");}finally{setBusy(false);}
 }
 function exportRecords(){
  const blob=new Blob([JSON.stringify({exported_at:new Date().toISOString(),person,self_reported_history:history,checkins,goals,rba_attended:official},null,2)],{type:"application/json;charset=utf-8"});
  const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="rba-basketball-passport.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 const latest=checkins[0];const activeGoals=goals.filter(x=>x.status==="active");
 const editButtons=(kind:Kind,entry:Entry)=><div className={styles.actions}><button type="button" onClick={()=>open(kind,entry)}>編集</button><button type="button" onClick={()=>setRemoving({kind,id:entry.id})}>削除</button></div>;
 const recommend=new URLSearchParams();if(person?.age_group&&["U8","U10","U12","U15","COACH"].includes(person.age_group))recommend.set("age",person.age_group);if(person?.age_group==="COACH")recommend.set("kind","COACH");
 return <section className={styles.passport} aria-labelledby="passport-title">
  <header className={styles.hero}><p>GLOBAL BASKETBALL PASSPORT</p><h2 id="passport-title">自分の歩みを、<br/>世界につながる記録へ。</h2><p>地域の練習も、全国のクリニックも、海外交流も、オンラインで得た学びも。どこで何を学び、次に何を試すのかを、自分の成長の記録として残します。</p></header>
  {message&&<p className={styles.message} role={failed?"alert":"status"}>{message}</p>}
  {loading?<p role="status">記録を読み込んでいます…</p>:failed?<button onClick={()=>void load(personId)}>再読み込み</button>:<>
   <div className={styles.toolbar}>{people.length>0&&<label>記録する人<select value={personId} disabled={busy||!!form||mediaLocked} onChange={e=>{setLimit(10);setRemoving(null);void load(e.target.value);}}>{people.map(p=><option key={p.id} value={p.id}>{p.name}{p.relationship==="child"?"（子ども）":"（自分）"}</option>)}</select></label>}<button disabled={busy||!!form||mediaLocked} onClick={()=>open("person")}>{people.length?"＋ 記録する人を追加":"自分・子どもの記録を始める"}</button>{person&&<button disabled={!!form||mediaLocked} onClick={()=>open("person",person)}>プロフィールを編集</button>}</div>
   {!person&&<div className={styles.empty}><h3>以前クリニックに参加した方へ</h3><p>まず、記録する人を登録しましょう。参加した日付や会場、覚えていることから始められます。チームへの所属は必要ありません。</p></div>}
   {person&&<>
    <p className={styles.privacy}>{person.relationship==="child"?"保護者のアカウントで管理する記録です。子ども本人のアカウントとは自動連携されません。":"自分のための非公開の記録です。"} 記録はこのアカウントに保存され、他の会員には公開されません。</p>
    <nav className={styles.tabs} aria-label="成長記録">{([["overview","全体を見る"],["history","参加履歴"],["checkin","現在地"],["goal","これから"],["media","写真・動画"]] as const).map(([key,label])=><button key={key} aria-pressed={view===key} disabled={!!form||mediaLocked} onClick={()=>{setView(key);setLimit(10);setRemoving(null);}}>{label}</button>)}</nav>
    {truncated&&<p>各項目の最大1,000件を表示しています。全件の確認はRBAへお問い合わせください。</p>}
    {view==="media"&&<PassportMedia key={personId} userId={userId} personId={personId} history={history} goals={goals} onLock={setMediaLocked} onGoal={action=>{setDraftAction(action);setView("goal");setForm({kind:"goal"});}}/>}
    {view==="overview"&&<>
     <article className={styles.panel}><h3>プレーを残して、成長を見つける。</h3><p>写真・動画で前の自分と見比べ、気づきを次の練習へ。</p><button onClick={()=>setView("media")}>写真・動画の成長ノートを開く</button></article>
     <div className={styles.metrics}><article><span>自分で残した参加履歴</span><strong>{history.length}<small>件</small></strong></article><article><span>現在地の振り返り</span><strong>{checkins.length}<small>回</small></strong></article><article><span>達成した目標</span><strong>{goals.filter(g=>g.status==="achieved").length}<small>件</small></strong></article></div>
     <div className={styles.steps}>{([['history','01','あの日の経験を残す','参加したクリニックと学びを記録。'],['checkin','02','今の自分を知る','できたこと、課題、次の一歩を整理。'],['goal','03','これからを描く','今週の一歩から、将来のビジョンまで。']] as const).map(([kind,num,title,body])=><button key={kind} onClick={()=>open(kind)}><span>{num}</span><strong>{title}</strong><p>{body}</p></button>)}</div>
     <div className={styles.columns}><article className={styles.panel}><span>現在地 · {latest?dateLabel(latest.checked_on):"まだ記録がありません"}</span><h3>今の自分</h3>{latest?<><h4>できるようになったこと</h4><p>{latest.strengths}</p><h4>取り組みたい課題</h4><p>{latest.challenge}</p><h4>次の練習で試すこと</h4><p>{latest.next_action}</p></>:<p>他の人との比較ではなく、自分の変化を言葉にしてみましょう。</p>}<button onClick={()=>open("checkin")}>今日の現在地を記録</button></article><article className={styles.panel}><span>これから</span><h3>次に挑戦すること</h3>{activeGoals.length?activeGoals.slice(0,3).map(g=><div className={styles.goalSummary} key={g.id}><small>{horizons[g.horizon||""]} · {dateLabel(g.target_on)}</small><h4>{g.title}</h4><p>{g.action}</p></div>):<p>大きな夢でも、小さな一歩でも。自分で決めた目標を置いてみましょう。</p>}<button onClick={()=>open("goal")}>目標を追加</button></article></div>
    </>}
    {view==="history"&&<><div className={styles.sectionHead}><h3>これまでの参加履歴</h3><button onClick={()=>open("history")}>＋ 過去の参加を登録</button></div><p>地域の大会や練習、RBAのクリニック、海外交流、オンライン講習まで記録できます。自己登録の記録は参加証明にはなりません。RBAが出席を確認し、アカウントに紐づけた記録は別に表示します。</p>{official.length>0&&<div className={styles.panel}><h4>RBA出席確認済み · {official.length}件</h4>{official.map(o=><p key={o.id}>{dateLabel(o.events?.starts_at)} · {o.events?.title||"参加記録"} {o.events?.venue}</p>)}</div>}{!history.length&&<p className={styles.empty}>最初の記録を追加しましょう。日付が曖昧な場合は、月単位で残せます。</p>}{history.slice(0,limit).map(h=><article className={styles.record} key={h.id}><span>自己登録 · {dateLabel(h.occurred_on,h.date_precision==="month")}</span><h4>{h.title}</h4><small>{h.venue}</small>{h.takeaway&&<><h5>学んだこと</h5><p>{h.takeaway}</p></>}{h.next_action&&<><h5>次に試すこと</h5><p>{h.next_action}</p></>}{editButtons("history",h)}</article>)}{history.length>limit&&<button onClick={()=>setLimit(limit+10)}>さらに10件を見る</button>}</>}
    {view==="checkin"&&<><div className={styles.sectionHead}><h3>現在地の変化</h3><button onClick={()=>open("checkin")}>＋ 振り返りを残す</button></div><p>練習やクリニックのあとに、自分の言葉で。過去の振り返りと見比べると、変化が見えてきます。</p>{!checkins.length&&<p className={styles.empty}>最初の振り返りが、これからの基準になります。</p>}{checkins.slice(0,limit).map(c=><article className={styles.record} key={c.id}><span>{dateLabel(c.checked_on)}</span><h4>できるようになったこと</h4><p>{c.strengths}</p><h4>今の課題</h4><p>{c.challenge}</p><h4>次の一歩</h4><p>{c.next_action}</p>{editButtons("checkin",c)}</article>)}{checkins.length>limit&&<button onClick={()=>setLimit(limit+10)}>さらに10件を見る</button>}</>}
    {view==="goal"&&<><div className={styles.sectionHead}><h3>この先のビジョン</h3><button onClick={()=>open("goal")}>＋ 目標を決める</button></div><p>「なりたい姿」「そのための行動」「できたと分かる目印」をセットで残しましょう。</p>{!goals.length&&<p className={styles.empty}>まずは今週、試したいことを一つ。</p>}{goals.slice(0,limit).map(g=><article className={styles.record} key={g.id}><span>{horizons[g.horizon||""]} · {g.status==="achieved"?"達成":g.status==="paused"?"休止中":"取り組み中"}</span><h4>{g.title}</h4><small>振り返る日：{dateLabel(g.target_on)}{g.status==="active"&&g.target_on!<today()?" · 振り返りのタイミングです":""}</small><h5>取り組むこと</h5><p>{g.action}</p><h5>できたと分かる目印</h5><p>{g.success}</p>{editButtons("goal",g)}</article>)}{goals.length>limit&&<button onClick={()=>setLimit(limit+10)}>さらに10件を見る</button>}</>}
   </>}
  </>}
  {form&&<form className={styles.form} ref={formRef} key={`${form.kind}-${form.entry?.id||'new'}`} onSubmit={save}><h3>{form.entry?"記録を編集":titles[form.kind]}</h3><fieldset disabled={busy}>{fields[form.kind].map(field=><label key={field.name}>{field.label}{field.required&&<small> 必須</small>}{field.hint&&<span>{field.hint}</span>}{field.options?<select name={field.name} defaultValue={String((form.entry as unknown as Record<string,string>)?.[field.name]||(field.name==="age_group"?"U15":field.options[0][0]))}>{field.options.map(([v,label])=><option key={v} value={v}>{label}</option>)}</select>:field.type==="textarea"?<textarea name={field.name} rows={3} maxLength={field.max} required={field.required} defaultValue={(form.entry as unknown as Record<string,string>)?.[field.name]||(field.name==="action"?draftAction:"")}/>:<input name={field.name} type={field.type||"text"} required={field.required} maxLength={field.max} min={field.type==="date"?"2000-01-01":undefined} max={field.type==="date"&&field.name!=="target_on"?today():undefined} defaultValue={(form.entry as unknown as Record<string,string>)?.[field.name]||(field.name==="checked_on"?today():"")}/>}</label>)}<div className={styles.actions}><button type="submit">{busy?"保存中…":"アカウントに保存"}</button><button type="button" onClick={()=>{if(window.confirm("入力中の内容を保存せずに閉じますか？"))setForm(null);}}>閉じる</button></div></fieldset></form>}
  {removing&&<div className={styles.confirm} role="alert"><p>この記録を削除しますか？</p><button disabled={busy} onClick={()=>void remove()}>削除する</button><button disabled={busy} onClick={()=>setRemoving(null)}>残す</button></div>}
  {person&&!failed&&!loading&&<footer className={styles.footer}><div><h3>次のコートへ</h3><p>{person.age_group==="COACH"?"国内外の指導者向け学習から、次の学びを選べます。":"地域や年代から次の機会を探し、必要なら海外やオンラインにも視野を広げられます。"}</p><a href={`/ja/opportunities?${recommend}`}>自分に合う育成機会を探す →</a><a href="/ja/international">世界につながる活動を見る →</a><a href={person.age_group==="COACH"?"/ja/d-hub":"/ja/players"}>{person.age_group==="COACH"?"D-HUBで学びを続ける":"日々の練習のヒントを見る"} →</a></div><div><button onClick={exportRecords}>記録をダウンロード</button><p>参加記録の照合については、参加時期・会場を添えて<a href="/ja/contact">RBAへご相談ください。</a></p></div></footer>}
 </section>;
}
