"use client";

import { useState, type FormEvent } from "react";
import s from "./gream-dsm.module.css";

const recipient = "riot.training.base@gmail.com";
const ways = ["資金協賛", "物品・用具", "会場・移動・サービス", "個人での応援", "まずは相談"];

export function DsmInquiry() {
  const [kind, setKind] = useState("まずは相談");
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) || "").trim();
    setDraft([
      "GREAM DSMの協賛について相談です。", "",
      `希望する支援：${kind}`,
      `会社・団体名：${value("company") || "個人"}`,
      `お名前：${value("name")}`,
      `返信先：${value("email")}`,
      `ご予算・提供内容：${value("budget") || "未定"}`,
      `希望時期：${value("timing") || "相談して決めたい"}`, "",
      `相談内容：\n${value("message") || "チームの必要な支援と、協賛の方法について教えてください。"}`,
    ].join("\n"));
    setNotice("相談文を作成しました。内容を確認し、メールアプリから送信してください。");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setNotice("相談文をコピーしました。メールやお問い合わせフォームに貼り付けて送信できます。");
    } catch {
      setNotice("コピーできませんでした。下の相談文を選択してコピーしてください。");
    }
  }

  return <div className={s.composer}>
    <h3>協賛の相談文を作る</h3>
    <p>予算や時期が未定でも大丈夫です。分かる範囲でお知らせください。</p>
    <form onSubmit={prepare} onChange={() => { setDraft(""); setNotice(""); }}>
      <fieldset><legend>希望する支援</legend><div className={s.choices}>{ways.map(way => <label key={way}><input type="radio" name="kind" value={way} checked={kind === way} onChange={() => setKind(way)} /><span>{way}</span></label>)}</div></fieldset>
      <div className={s.fields}>
        <label>会社・団体名（個人の方は空欄）<input name="company" autoComplete="organization" maxLength={100} /></label>
        <label>お名前 <span>必須</span><input name="name" required autoComplete="name" maxLength={80} /></label>
        <label>返信先メール <span>必須</span><input name="email" required type="email" autoComplete="email" maxLength={254} /></label>
        <label>ご予算・提供内容（任意）<input name="budget" placeholder="未定／ボールの提供など" maxLength={150} /></label>
        <label>希望時期（任意）<input name="timing" placeholder="相談して決めたい" maxLength={100} /></label>
      </div>
      <label className={s.message}>相談内容（任意）<textarea name="message" rows={4} maxLength={1200} placeholder="協力できること、確認したいことなど" /></label>
      <p className={s.note}>入力内容はこのページから送信されません。相談文を確認して、ご自身のメールアプリから送信できます。</p>
      <button className={s.primary} type="submit">相談文を確認する</button>
    </form>
    <p role="status" aria-live="polite">{notice}</p>
    {draft ? <div className={s.draft}><label>作成した相談文<textarea readOnly value={draft} rows={12} /></label><div className={s.actions}><a className={s.primary} href={`mailto:${recipient}?subject=${encodeURIComponent(`GREAM DSM｜${kind}の相談`)}&body=${encodeURIComponent(draft)}`}>メールアプリを開く</a><button className={s.secondary} type="button" onClick={copy}>相談文をコピー</button></div></div> : null}
    <noscript><p>下のメール・フォームから直接ご相談いただけます。</p></noscript>
  </div>;
}
