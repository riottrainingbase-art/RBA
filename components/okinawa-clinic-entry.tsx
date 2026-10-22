"use client";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { OKINAWA_CLINIC as clinic, clinicGrades } from "@/lib/clinics/okinawa";
import styles from "./okinawa-clinic.module.css";

type Registration={id:string;participant_name:string;school_grade:string;status:string;payment_status:string|null};
type State={ok:boolean;open:boolean;closed:boolean;email:string;registrations:Registration[]};
export function OkinawaClinicEntry(){
  const [data,setData]=useState<State|null>(null),[login,setLogin]=useState(false),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState(""),[message,setMessage]=useState("");
  const inFlight=useRef(false);
  const load=useCallback(async()=>{
    try{
      const response=await fetch(clinic.api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"prepare"}),cache:"no-store"});
      if(response.status===401){setLogin(true);return;}
      const result=await response.json() as State;if(!response.ok||!result.ok)throw new Error();
      setData(result);setLogin(false);setError("");
    }catch{setError("受付状況を読み込めませんでした。下の「再読み込み」を押してください。");}
    finally{setLoading(false);}
  },[]);
  useEffect(()=>{const timer=setTimeout(()=>void load(),0);return()=>clearTimeout(timer);},[load]);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(inFlight.current)return;
    const form=e.currentTarget;if(!form.reportValidity())return;
    const fields=new FormData(form);inFlight.current=true;setBusy(true);setError("");setMessage("");
    try{
      const response=await fetch(clinic.api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"submit",participant_name:fields.get("participant_name"),school_grade:fields.get("school_grade"),guardian_name:fields.get("guardian_name"),emergency_phone:fields.get("emergency_phone"),guardian_consent:fields.get("guardian_consent")==="on",terms_consent:fields.get("terms_consent")==="on",media_consent:fields.get("media_consent")==="on"})});
      const result=await response.json() as {ok?:boolean;status:string;open:boolean};if(!response.ok||!result.ok)throw new Error();
      form.reset();await load();
      setMessage(result.status==="waitlisted"?"キャンセル待ちで受け付けました。空きが出た場合にRBAからご連絡します。現時点でのお支払いはありません。":result.status==="paid"?"この選手のお支払いは確認済みです。重ねてお支払いいただく必要はありません。":result.open?"申込を受け付けました。下の選手名を確認し、お支払いへお進みください。":"先行受付が完了しました。会場の予約確定後、このページからお支払いに進めます。現時点では参加確定ではありません。");
    }catch{setError("受付を完了できませんでした。通信状況をご確認のうえ、再度お試しください。同じ選手名・学年での再送による重複申込は作成しません。");}
    finally{inFlight.current=false;setBusy(false);}
  }
  async function checkout(id:string){
    if(inFlight.current)return;inFlight.current=true;setBusy(true);setError("");
    try{
      const response=await fetch(clinic.api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"checkout",registration_id:id})});
      const result=await response.json() as {ok?:boolean;url:string};if(!response.ok||!result.ok)throw new Error();
      const url=new URL(result.url);if(url.protocol!=="https:"||url.hostname!=="buy.stripe.com")throw new Error();
      window.location.assign(url.href);
    }catch{setError("決済へ進めませんでした。決済開始前・定員到達・支払済みの可能性があります。再読み込みして受付状況をご確認ください。");inFlight.current=false;setBusy(false);}
  }
  const loginUrl=`/ja/my-homecourt/login?next=${encodeURIComponent(clinic.path)}&source=okinawa-clinic-20261114`;
  return <div className={styles.form} aria-busy={busy||loading}>
    <h3>選手1名ずつ、お申し込みください。</h3>
    <p>保護者のRBA IDでお申し込みいただけます。お子さま専用のメールアドレスやアカウントは不要です。</p>
    {loading?<p role="status">受付状況を確認しています…</p>:null}
    {login?<div className={styles.status}><p>まず保護者のメールアドレスでRBA IDにログインしてください。初めての方も無料で作成できます。メールに届くリンクから、この申込ページへ戻れます。</p><a className={styles.button} href={loginUrl}>RBA IDで申込を始める →</a></div>:null}
    {error?<p className={styles.error} role="alert">{error}</p>:null}
    {message?<p className={styles.status} role="status">{message}</p>:null}
    {!loading&&!login?<button type="button" onClick={()=>{setLoading(true);void load();}} disabled={busy} className={styles.button}>受付・支払状況を再読み込み</button>:null}
    {data?<>
      <p className={styles.fine}>連絡先メール：{data.email}（RBA IDのメールアドレス）</p>
      <p className={styles.notice}>{data.closed?"現在、申込受付を終了しています。":data.open?"正式受付中です。申込後、参加費のお支払いに進めます。支払確認後に参加確定となります。":"現在は先行受付中です。会場の予約確定後に決済受付を開始します。申込情報は保存されますが、この時点で料金は発生しません。"}</p>
      {data.registrations.length?<div aria-label="申込済みの選手"><h3>あなたの申込</h3>{data.registrations.map(r=><div className={styles.registration} key={r.id}><div><strong>{r.participant_name}さん</strong><small>{r.school_grade} ／ {r.payment_status==="refunded"?"返金済み":r.payment_status==="partially_refunded"?"一部返金あり・RBAへご確認ください":r.status==="paid"?"支払確認済み・参加確定":r.payment_status==="awaiting_payment"?"決済処理中・再度支払わず反映をお待ちください":r.status==="waitlisted"?"キャンセル待ち":r.status==="withdrawn"?"申込取り下げ":"申込受付済み・支払前"}</small><small>受付番号：{r.id.slice(0,8).toUpperCase()}</small></div>{data.open&&r.status==="submitted"&&r.payment_status!=="awaiting_payment"?<button className={styles.button} disabled={busy} onClick={()=>void checkout(r.id)}>この選手の3,300円を支払う →</button>:null}</div>)}</div>:null}
      {!data.closed?<form onSubmit={submit} style={{marginTop:28}}>
        <div className={styles.fields}>
          <label className={styles.field}>参加する選手の氏名（必須）<input name="participant_name" required maxLength={80} autoComplete="off" placeholder="例：山田 太郎"/></label>
          <label className={styles.field}>学年（必須）<select name="school_grade" required defaultValue=""><option value="" disabled>学年を選んでください</option>{clinicGrades.map(g=><option key={g}>{g}</option>)}</select></label>
          <label className={styles.field}>保護者の氏名（必須）<input name="guardian_name" required maxLength={80} autoComplete="name"/></label>
          <label className={styles.field}>当日の緊急連絡先（必須）<input name="emergency_phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={8} maxLength={25} placeholder="090-1234-5678"/></label>
        </div>
        <div className={styles.checks}>
          <label><input type="checkbox" name="guardian_consent" required/><span>私は保護者（または保護者の同意を得た成人）として申し込み、選手の参加と運営に必要な個人情報の取扱いに同意します。（必須）</span></label>
          <label><input type="checkbox" name="terms_consent" required/><span>対象学年、日時、参加費3,300円、会場の個別案内、先行受付と参加確定の違い、下記キャンセル条件および<a href="/ja/policies" target="_blank" rel="noreferrer">参加規約・プライバシーポリシー</a>を確認しました。（必須）</span></label>
          <label><input type="checkbox" name="media_consent"/><span>活動紹介のため、選手が写る写真・動画をRBA公式サイトやSNSへ掲載することに同意します。（任意・同意しなくても参加できます）</span></label>
        </div>
        <button className={styles.button} disabled={busy||loading} type="submit">{busy?"受付処理中…":data.open?"この選手の申込を保存する →":"この選手の先行受付を保存する →"}</button>
        <p className={styles.fine}>申込後も、このページで受付状況を確認できます。兄弟で参加する場合は、1名ずつ送信してください。入力内容の修正や取り下げは、受付番号を添えてRBAへご連絡ください。</p>
      </form>:null}
    </>:null}
  </div>;
}
