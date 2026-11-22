"use client";

import { useState, type FormEvent } from "react";

type Locale = "ja" | "en" | "zh-tw";
const choices = [
  { value: "2026-12-11", label: "Fri 11 Dec · Tianmu · 18:30–20:00" },
  { value: "2026-12-12", label: "Sat 12 Dec · Neihu · 16:00–18:00" },
  { value: "2026-12-13", label: "Sun 13 Dec · Linkou · 14:00–16:00" },
] as const;

const copy = {
  ja: {
    heading: "SPARTANSに参加希望を送る",
    detail: "保護者が希望日と年齢を入力すると、SPARTANS宛てのメール下書きが開きます。メールアプリで「送信」するまで連絡は完了しません。申し込みや予約の確定ではありません。",
    day: "希望日（必須）", name: "保護者のお名前（必須）", email: "ご連絡先メール（必須）",
    age: "選手の年齢（必須）", message: "質問・ご希望（任意）",
    submit: "SPARTANS宛てメールを作成 →", line: "SPARTANS公式LINEで相談する →",
    fallback: "メールアプリを利用できない場合は、SPARTANS公式LINE「@spartans」からご連絡ください。",
    placeholder: "例：初参加です。追加参加枠を教えてください。"
  },
  en: {
    heading: "Send your request directly to SPARTANS",
    detail: "This opens an email draft addressed to SPARTANS. You must send the email in your mail app. It is an enquiry, not a confirmed booking or payment.",
    day: "Preferred session (required)", name: "Parent/guardian name (required)", email: "Parent/guardian email (required)",
    age: "Player age (required)", message: "Questions (optional)",
    submit: "OPEN EMAIL TO SPARTANS →", line: "CONTACT SPARTANS ON LINE →",
    fallback: "If your email app is unavailable, contact SPARTANS on official LINE @spartans.",
    placeholder: "e.g. New participant; please confirm space and the event fee."
  },
  "zh-tw": {
    heading: "直接向 SPARTANS 洽詢報名",
    detail: "填寫後會開啟寄給 SPARTANS 的電子郵件草稿。請在郵件程式中按下「寄送」。送出洽詢不代表報名完成或已付款。",
    day: "希望場次（必填）", name: "家長姓名（必填）", email: "家長電子郵件（必填）",
    age: "球員年齡（必填）", message: "問題或備註（選填）",
    submit: "開啟寄給 SPARTANS 的郵件 →", line: "使用 SPARTANS 官方 LINE 洽詢 →",
    fallback: "如果無法使用電子郵件，請聯絡 SPARTANS 官方 LINE：@spartans。",
    placeholder: "例如：首次參加，想確認剩餘名額與本次費用。"
  }
} as const;

export function TaipeiClinicInquiryForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [day, setDay] = useState<string>("");
  const [guardian, setGuardian] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [question, setQuestion] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!day || !guardian.trim() || !email.trim() || !age.trim()) return;
    const session = choices.find(x=>x.value===day);
    const subject = "RBA × SPARTANS Taipei Dec 2026 | Registration enquiry | "+(session?.label||day);
    const body = [
      "Hello SPARTANS,",
      "",
      "I would like to enquire about joining the RBA × SPARTANS special Taipei clinic.",
      "Requested session: "+(session?.label||day)+" (Taiwan time, UTC+8)",
      "Parent/guardian name: "+guardian.trim(),
      "Parent email: "+email.trim(),
      "Player age: "+age,
      "Questions: "+(question.trim()||"None"),
      "",
      "Please confirm available places, the December special-event fee, official registration/payment link and cancellation policy before I pay.",
      "Thank you."
    ].join("\n");
    window.location.assign("mailto:hi@spartans.com.tw?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body));
  }
  return <div className="rounded-2xl border border-[#ccd5d1] bg-white p-5 shadow-sm sm:p-8">
    <h3 className="text-2xl font-black text-[#153e39]">{t.heading}</h3>
    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#3a4d47]">{t.detail}</p>
    <form className="mt-6 grid gap-4" onSubmit={submit}>
      <label className="grid gap-2 text-sm font-bold">{t.day}
        <select className="min-h-12 rounded-lg border border-[#899b94] bg-white px-4 text-base" value={day} onChange={e=>setDay(e.target.value)} required>
          <option value="">{locale==="ja"?"日程を選択":locale==="en"?"Select session":"選擇場次"}</option>
          {choices.map(x=><option value={x.value} key={x.value}>{x.label}</option>)}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">{t.name}<input type="text" maxLength={100} autoComplete="name" required className="min-h-12 rounded-lg border border-[#899b94] bg-white px-4 text-base" value={guardian} onChange={e=>setGuardian(e.target.value)}/></label>
        <label className="grid gap-2 text-sm font-bold">{t.email}<input type="email" maxLength={180} autoComplete="email" required className="min-h-12 rounded-lg border border-[#899b94] bg-white px-4 text-base" value={email} onChange={e=>setEmail(e.target.value)}/></label>
      </div>
      <label className="grid max-w-sm gap-2 text-sm font-bold">{t.age}<input type="number" min={5} max={19} required className="min-h-12 rounded-lg border border-[#899b94] bg-white px-4 text-base" value={age} onChange={e=>setAge(e.target.value)}/></label>
      <label className="grid gap-2 text-sm font-bold">{t.message}<textarea rows={3} maxLength={700} className="rounded-lg border border-[#899b94] bg-white px-4 py-3 text-base" placeholder={t.placeholder} value={question} onChange={e=>setQuestion(e.target.value)}/></label>
      <button className="min-h-14 w-full rounded-lg bg-[#24554e] px-5 py-3 text-base font-bold text-white hover:bg-[#173f39] sm:w-fit" type="submit">{t.submit}</button>
    </form>
    <a href="https://hbl.tw/line?utm_source=spartans_site&utm_medium=web&utm_content=contact" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center rounded-lg border-2 border-[#24554e] px-5 py-3 text-sm font-bold text-[#24554e] hover:bg-[#ecf4ef]">{t.line}</a>
    <p className="mt-3 text-xs leading-6 text-[#4d5e58]">{t.fallback}</p>
  </div>;
}
