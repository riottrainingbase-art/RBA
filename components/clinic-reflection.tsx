"use client";

import { useState } from "react";
import styles from "./clinic-reflection.module.css";

const prompts = [
  ["気づいたこと", "例：受ける前に相手の位置を見ると、次のプレーを選びやすかった。"],
  ["次の練習で一つ試すこと", "例：パスを待つ間に、相手と仲間の位置を確かめる。"],
  ["試してから、確かめたいこと", "例：できた場面と、迷った場面を一つずつ思い出す。"],
] as const;

export function ClinicReflection() {
  const [notes, setNotes] = useState(["", "", ""]);
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText("RBA｜参加後の振り返り\n\n" + prompts.map(([label], i) => `${label}\n${notes[i] || "（未記入）"}`).join("\n\n"));
      setMessage("コピーしました。ご自身のメモなどに貼り付けて保管できます。");
    } catch { setMessage("コピーできませんでした。入力欄の文章を選択してコピーするか、印刷をご利用ください。"); }
  }
  return <section className={styles.card} aria-labelledby="reflection-title">
    <h2 id="reflection-title">今日の学びを、三つのメモに。</h2>
    <p>入力は任意です。このメモはRBAへ送信・保存されません。ページを閉じたり再読み込みしたりすると消えます。残したい場合はコピーまたは印刷してください。</p>
    {prompts.map(([label, placeholder], index) => <label className={styles.field} key={label} htmlFor={`reflection-${index}`}><strong>{index + 1}. {label}</strong><textarea id={`reflection-${index}`} rows={3} maxLength={1000} placeholder={placeholder} value={notes[index]} onChange={event => { setNotes(notes.map((note, i) => i === index ? event.target.value : note)); setMessage(""); }} /><span className={styles.printNote}>{notes[index] || "（未記入）"}</span></label>)}
    <div className={styles.actions}><button type="button" onClick={() => void copy()}>メモをコピー</button><button type="button" onClick={() => window.print()}>印刷・PDFに保存</button></div>
    <p role="status" aria-live="polite">{message}</p>
  </section>;
}
