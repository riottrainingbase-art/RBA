"use client";

import { useState } from "react";

const labels = {
  ja: { title: "練習試合の相談内容をつくる", intro: "成人のチーム責任者向け。条件を整理してRBA CONNECTに相談できます。ここでは保存・送信・相手の確保は行いません。", region: "希望地域（都道府県・地域名）", age: "対象年代", category: "カテゴリー", timing: "希望時期", format: "試合形式", venue: "会場", priority: "育成目的", generate: "相談文を確認", copy: "内容をコピー", copied: "コピーしました", contact: "公式相談窓口へ", notice: "選手の氏名・連絡先・学校名・映像は入力しないでください。相手チーム・会場・日程・費用・保険・安全条件は双方確認後に確定します。", unset: "選択してください", heading: "RBA CONNECT 練習試合相談（未確定）", categories: ["男子","女子","男女混合・相談"], formats: ["5対5","3x3","少人数ゲーム","相談"], venues: ["会場あり","相手側会場希望","未確定"], goals: ["全員にプレー機会","判断・ゲーム理解","同年代交流","育成レベルに合う対戦"], timings: ["平日","土日祝","長期休暇","相談"] },
  en: { title: "Prepare a practice-game enquiry", intro: "For adult team representatives. Prepare your conditions for RBA CONNECT. Nothing is stored, sent or matched automatically.", region: "Preferred region or prefecture", age: "Age group", category: "Category", timing: "Preferred timing", format: "Game format", venue: "Venue", priority: "Development goal", generate: "Review enquiry", copy: "Copy enquiry", copied: "Copied", contact: "Official contact", notice: "Do not enter player names, contact details, schools or footage. Opponents, venue, timing, costs, insurance and safety conditions require mutual confirmation.", unset: "Choose", heading: "RBA CONNECT practice-game enquiry (unconfirmed)", categories: ["Boys","Girls","Mixed / discuss"], formats: ["5v5","3x3","Small-sided games","Discuss"], venues: ["Venue available","Request host venue","Unconfirmed"], goals: ["Playing opportunities for all","Decision-making and game understanding","Age-group exchange","Development-appropriate opponents"], timings: ["Weekday","Weekend / holiday","School holidays","Discuss"] }
} as const;

export function DhubGameEnquiry({ locale }: { locale: "ja" | "en" }) {
  const t = labels[locale];
  const [region, setRegion] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [timing, setTiming] = useState("");
  const [format, setFormat] = useState("");
  const [venue, setVenue] = useState("");
  const [goal, setGoal] = useState("");
  const [preview, setPreview] = useState("");
  const [copied, setCopied] = useState(false);
  const complete = [region.trim(), age, category, timing, format, venue, goal].every(Boolean);
  function build() {
    setCopied(false);
    setPreview([t.heading, t.region + ": " + region.trim(), t.age + ": " + age, t.category + ": " + category, t.timing + ": " + timing, t.format + ": " + format, t.venue + ": " + venue, t.priority + ": " + goal, t.notice].join("\n"));
  }
  async function copy() {
    try { await navigator.clipboard.writeText(preview); setCopied(true); } catch { setCopied(false); }
  }
  const fields = [
    { label: t.age, value: age, set: setAge, options: ["U10","U12","U15","U18","Adult"] },
    { label: t.category, value: category, set: setCategory, options: t.categories },
    { label: t.timing, value: timing, set: setTiming, options: t.timings },
    { label: t.format, value: format, set: setFormat, options: t.formats },
    { label: t.venue, value: venue, set: setVenue, options: t.venues },
    { label: t.priority, value: goal, set: setGoal, options: t.goals }
  ];
  return <section id="practice-game" className="section-pad" style={{background:"#071b36",color:"#fff",paddingBlock:"2.5rem"}}>
    <p className="section-index" style={{color:"#c4d5eb"}}>D-HUB × RBA CONNECT / GAME MATCHING</p>
    <h2 style={{fontSize:"clamp(1.6rem,4vw,2.8rem)",fontWeight:800}}>{t.title}</h2>
    <p style={{maxWidth:"55rem",marginBlock:"1rem"}}>{t.intro}</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))",gap:"1rem",maxWidth:"70rem"}}>
      <label style={{display:"grid",gap:".4rem"}}>{t.region}<input value={region} maxLength={60} onChange={e=>{setRegion(e.target.value);setPreview("");}} style={{background:"white",color:"#071b36",padding:".65rem",borderRadius:4}} /></label>
      {fields.map(f=><label key={f.label} style={{display:"grid",gap:".4rem"}}>{f.label}<select value={f.value} onChange={e=>{f.set(e.target.value);setPreview("");}} style={{background:"white",color:"#071b36",padding:".65rem",borderRadius:4}}><option value="">{t.unset}</option>{f.options.map(o=><option key={o} value={o}>{o}</option>)}</select></label>)}
    </div>
    <p style={{marginBlock:"1rem",maxWidth:"55rem"}}>{t.notice}</p>
    <button className="button button-light" type="button" disabled={!complete} onClick={build} style={{opacity:complete?1:.55}}>{t.generate}</button>
    {preview && <div style={{marginTop:"1.25rem",maxWidth:"55rem"}}><label style={{display:"grid",gap:".5rem"}}>{t.heading}<textarea readOnly value={preview} rows={10} style={{background:"white",color:"#071b36",width:"100%",padding:".8rem",borderRadius:4}}/></label><div style={{display:"flex",gap:".75rem",flexWrap:"wrap",marginTop:"1rem"}}><button className="button button-light" type="button" onClick={copy}>{copied?t.copied:t.copy}</button><a className="button button-light" href={locale==="ja"?"/ja/contact":"/contact"}>{t.contact}</a></div></div>}
  </section>;
}
