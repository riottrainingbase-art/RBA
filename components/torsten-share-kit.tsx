"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { clinicShareMessages, clinicTitle } from "@/lib/torsten-clinic";
import styles from "./torsten-conversion.module.css";

export function TorstenShareKit() {
  const [selected, setSelected] = useState("general");
  const [status, setStatus] = useState("");
  const [fallback, setFallback] = useState(false);
  const message = clinicShareMessages.find(item => item.id === selected) ?? clinicShareMessages[0];
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(message.text);
      setFallback(false); setStatus("案内文をコピーしました。共有先に貼り付けてお使いください。");
    } catch {
      setFallback(true); setStatus("自動コピーが使えませんでした。下の案内文を選択してコピーしてください。");
    }
  }
  async function share() {
    if (!navigator.share) { await copy(); return; }
    try { await navigator.share({ title: clinicTitle, text: message.text }); setStatus("共有メニューを閉じました。送信状況は共有先のアプリでご確認ください。"); }
    catch (error) { if (error instanceof Error && error.name === "AbortError") { setStatus("共有をキャンセルしました。"); return; } setStatus("共有メニューを開けませんでした。案内文をコピーしてお使いください。"); }
  }
  return <div className={styles.shareKit}>
    <fieldset><legend>届けたい相手に合わせて選ぶ</legend><div className={styles.choices}>{clinicShareMessages.map(item => <label key={item.id} className={selected===item.id?styles.selected:undefined}><input type="radio" name="share-audience" value={item.id} checked={selected===item.id} onChange={() => { setSelected(item.id); setStatus(""); setFallback(false); }}/>{item.label}</label>)}</div></fieldset>
    <label className={styles.textLabel} htmlFor="clinic-share-message">転送用の案内文（編集せずそのまま使えます）</label>
    <textarea id="clinic-share-message" readOnly rows={13} value={message.text} onFocus={event => { if (fallback) event.currentTarget.select(); }}/>
    <div className={styles.shareButtons}><button type="button" className="button button-orange" onClick={copy}>{status.startsWith("案内文をコピー")?<Check size={18}/>:<Copy size={18}/>}案内文をコピー</button><button type="button" className="button button-dark" onClick={share}><Share2 size={18}/>共有メニューを開く</button></div>
    <p className={styles.status} role="status" aria-live="polite">{status || "内容を確認してから、ご自身で共有できます。"}</p>
    <p className={styles.note}>このボタンだけで自動投稿・一斉送信は行われません。案内文の共有は歓迎しています。受講用のZoom・動画URLは共有しないでください。</p>
  </div>;
}
