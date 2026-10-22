"use client";
import { useEffect, useState } from "react";
import { OKINAWA_CLINIC } from "@/lib/clinics/okinawa";
import styles from "./okinawa-clinic.module.css";
type Row={id:string;participant_name:string;school_grade:string;guardian_name:string;contact_email:string;emergency_phone:string;media_consent:boolean;status:string;created_at:string};
export function OkinawaClinicAdmin(){
  const [rows,setRows]=useState<Row[]>([]),[status,setStatus]=useState("権限と受付状況を確認しています…");
  useEffect(()=>{let active=true;void(async()=>{try{
    const response=await fetch(OKINAWA_CLINIC.api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"admin"}),cache:"no-store"});
    const result=await response.json() as {ok:boolean;registrations:Row[]};if(!response.ok||!result.ok)throw new Error();
    if(active){setRows(result.registrations);setStatus("");}
  }catch{if(active)setStatus("主催者またはRBA管理者のアカウントでログインしてください。一般の参加者は名簿を閲覧できません。");}})();return()=>{active=false;};},[]);
  function download(){
    const escape=(v:unknown)=>{let s=String(v??"");if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
    const fields: (keyof Row)[]=["id","participant_name","school_grade","guardian_name","contact_email","emergency_phone","status","media_consent","created_at"];
    const csv="\ufeff"+[["受付番号","選手名","学年","保護者名","メール","緊急連絡先","受付状況","写真掲載同意","申込日時"].map(escape).join(","),...rows.map(r=>fields.map(k=>escape(r[k])).join(","))].join("\r\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));const a=document.createElement("a");a.href=url;a.download="RBA_Okinawa_20261114_registrations.csv";a.click();URL.revokeObjectURL(url);
  }
  return <>{status?<p role="status">{status}</p>:<><p>申込 {rows.length}件 ／ 支払確認済み {rows.filter(r=>r.status==="paid").length}名 ／ キャンセル待ち {rows.filter(r=>r.status==="waitlisted").length}名</p><button className={styles.button} onClick={download}>運営用名簿をCSVで保存</button><div style={{overflowX:"auto"}}><table className={styles.adminTable}><thead><tr><th>選手・学年</th><th>保護者・連絡先</th><th>受付状況</th><th>写真掲載</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.participant_name}<br/>{r.school_grade}<br/>{r.id.slice(0,8)}</td><td>{r.guardian_name}<br/>{r.contact_email}<br/>{r.emergency_phone}</td><td>{r.status}</td><td>{r.media_consent?"同意":"不同意"}</td></tr>)}</tbody></table></div></>}</>;
}
