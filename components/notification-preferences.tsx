"use client";
import {FormEvent,useEffect,useMemo,useState} from "react";
import {Bell,CheckCircle2,LoaderCircle} from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import type {Locale} from "./site-frame";
import styles from "./notification-preferences.module.css";

type Prefs={event_updates:boolean;payment_updates:boolean;team_updates:boolean;development_updates:boolean;opportunities:boolean;marketing:boolean;preferred_channel:string};
const defaults:Prefs={event_updates:true,payment_updates:true,team_updates:true,development_updates:true,opportunities:true,marketing:false,preferred_channel:"email"};
const copy={
 ja:{title:"通知・メール設定",lead:"必要な連絡と、任意の案内を分けて設定できます。",event:"申込・イベントの変更",payment:"決済・請求に関する重要なお知らせ",team:"所属チームからのお知らせ",development:"振り返り・育成記録に関するお知らせ",opportunities:"新しいクリニック・キャンプ・育成機会",marketing:"RBAからのニュース・ご案内",channel:"優先する連絡方法",save:"設定を保存",saved:"保存しました",note:"安全・決済・契約上必要な通知は、設定にかかわらず送信する場合があります。"},
 en:{title:"Notifications & email",lead:"Separate essential service messages from optional updates.",event:"Application and event changes",payment:"Important payment and billing notices",team:"Team notices",development:"Development and reflection updates",opportunities:"New clinics, camps and development opportunities",marketing:"RBA news and announcements",channel:"Preferred channel",save:"Save preferences",saved:"Saved",note:"Safety, billing or legally required service notices may still be sent when necessary."},
 "zh-tw":{title:"通知與電子郵件設定",lead:"可分開設定必要通知與選擇性資訊。",event:"報名與活動變更",payment:"重要付款・帳單通知",team:"球隊通知",development:"培育記錄與回顧通知",opportunities:"新的訓練營、培育營與機會",marketing:"RBA新聞與資訊",channel:"優先聯絡方式",save:"儲存設定",saved:"已儲存",note:"安全、付款或依法必要的服務通知，必要時仍可能發送。"},
 ko:{title:"알림・이메일 설정",lead:"필수 서비스 알림과 선택 안내를 나누어 설정할 수 있습니다.",event:"신청・이벤트 변경",payment:"중요 결제・청구 알림",team:"팀 알림",development:"육성 기록・회고 알림",opportunities:"새 클리닉・캠프・육성 기회",marketing:"RBA 뉴스・안내",channel:"우선 연락 방법",save:"설정 저장",saved:"저장했습니다",note:"안전, 결제 또는 법적으로 필요한 서비스 알림은 필요 시 발송될 수 있습니다."}
} as const;

export function NotificationPreferences({userId,locale}:{userId:string;locale:Locale}){
 const c=copy[locale],db=useMemo(()=>createClient(),[]);
 const [prefs,setPrefs]=useState(defaults),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 useEffect(()=>{const timer=setTimeout(async()=>{const {data}=await db.from("notification_preferences").select("event_updates,payment_updates,team_updates,development_updates,opportunities,marketing,preferred_channel").eq("user_id",userId).maybeSingle();if(data)setPrefs({...defaults,...data});setLoading(false)},0);return()=>clearTimeout(timer)},[db,userId]);
 async function save(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);const form=new FormData(e.currentTarget);const next:Prefs={event_updates:form.get("event_updates")==="on",payment_updates:form.get("payment_updates")==="on",team_updates:form.get("team_updates")==="on",development_updates:form.get("development_updates")==="on",opportunities:form.get("opportunities")==="on",marketing:form.get("marketing")==="on",preferred_channel:String(form.get("preferred_channel")||"email")};const {error}=await db.from("notification_preferences").upsert({user_id:userId,...next,updated_at:new Date().toISOString()},{onConflict:"user_id"});if(!error){await db.from("profiles").update({marketing_consent:next.marketing,updated_at:new Date().toISOString()}).eq("id",userId);setPrefs(next);setMessage(c.saved)}else setMessage(locale==="ja"?"保存できませんでした。":"Could not save.");setBusy(false)}
 if(loading)return <section className={styles.shell}><LoaderCircle className={styles.spin}/></section>;
 const checks:[keyof Prefs,string][]=[["event_updates",c.event],["payment_updates",c.payment],["team_updates",c.team],["development_updates",c.development],["opportunities",c.opportunities],["marketing",c.marketing]];
 return <section className={styles.shell}><header><Bell/><div><h2>{c.title}</h2><p>{c.lead}</p></div></header><form onSubmit={save}><div className={styles.checks}>{checks.map(([key,label])=><label key={key}><input type="checkbox" name={key} defaultChecked={Boolean(prefs[key])}/><span>{label}</span></label>)}</div><label className={styles.channel}>{c.channel}<select name="preferred_channel" defaultValue={prefs.preferred_channel}><option value="email">Email</option><option value="line">LINE</option><option value="push">MY HOME COURT</option><option value="none">OFF</option></select></label><p className={styles.note}>{c.note}</p><button disabled={busy}>{busy?<LoaderCircle className={styles.spin}/>:<CheckCircle2/>}{c.save}</button>{message?<p className={styles.message} role="status">{message}</p>:null}</form></section>
}
