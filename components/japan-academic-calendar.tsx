"use client";

import { useState } from "react";
import academicEvents from "@/data/japan-academic-calendar.json";

type AcademicEvent = (typeof academicEvents)[number];
const dayMs = 86400000;
const dateValue = (s: string) => Date.parse(s + "T00:00:00Z");
const validDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(dateValue(s)) && new Date(dateValue(s)).toISOString().slice(0,10) === s;
function relation(start: string, end: string, eventStart: string, eventEnd: string, preparationDays: number) {
  const a = dateValue(start), b = dateValue(end), c = dateValue(eventStart), d = dateValue(eventEnd);
  if (a <= d && b >= c) return "overlap";
  if (preparationDays > 0 && a < c && b >= c - preparationDays * dayMs) return "prepare";
  return "none";
}
const buffer = (e: AcademicEvent) => e.kind === "試験" || e.kind === "入試" ? 14 : 0;
const kindLabel = { overlap: "日程重複", prepare: "試験前の準備期間", none: "この掲載日程とは重複なし" } as const;

export function JapanAcademicCalendar({ region }: { region: string | null }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [allRegions, setAllRegions] = useState(false);
  const [school, setSchool] = useState("");
  const [manualStart, setManualStart] = useState("");
  const [manualEnd, setManualEnd] = useState("");
  const [manualType, setManualType] = useState("試験");
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone:"Asia/Tokyo", year:"numeric", month:"2-digit", day:"2-digit" }).format(new Date());
  const scope = academicEvents.filter(e => allRegions || e.region === region);
  const schools = [...new Set(scope.filter(e => e.city).map(e => e.school))].sort((a,b)=>a.localeCompare(b,"ja"));
  const selected = schools.includes(school) ? school : "";
  const valid = validDate(start) && validDate(end || start) && (end || start) >= start;
  const manualValid = validDate(manualStart) && validDate(manualEnd || manualStart) && (manualEnd || manualStart) >= manualStart;
  const relevant = scope.filter(e => (!selected || e.school === selected || !e.city) && e.end >= (valid ? start : today))
    .sort((a,b)=>a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
  const compared = valid ? relevant.map(e => ({e, result:relation(start,end||start,e.start,e.end,buffer(e))})).filter(x=>x.result!=="none") : [];
  const manualResult = valid && manualValid ? relation(start,end||start,manualStart,manualEnd||manualStart,manualType==="試験"||manualType==="入試"?14:0) : null;
  const inputClass = "mt-1 block w-full min-w-0 rounded border border-black/20 bg-white px-3 py-2 text-sm";
  return <section className="my-4 rounded border border-black/15 bg-white p-4" aria-label="学校行事と試験の重複確認">
    <p className="text-xs font-bold text-[#245989]">SCHOOL & BASKETBALL</p>
    <h3 className="mt-2 text-lg font-black">学校生活とバスケの予定を両立する</h3>
    <p className="mt-2 text-sm">定期考査・受験・学校行事を大会や合宿の前に確認。試験開始の14日前からは準備期間の目安として表示します。参加を禁止するものではありません。</p>
    <details className="mt-3">
      <summary className="cursor-pointer rounded border border-black/20 px-3 py-3 text-sm font-bold">学校日程・試験との重複を確認する</summary>
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="button" aria-pressed={!allRegions} className="rounded border border-black/25 px-3 py-2 text-sm font-bold" onClick={()=>{setAllRegions(false);setSchool("");}}>登録地域（{region||"未設定"}）</button>
        <button type="button" aria-pressed={allRegions} className="rounded border border-black/25 px-3 py-2 text-sm font-bold" onClick={()=>{setAllRegions(true);setSchool("");}}>全国の掲載情報</button>
      </div>
      <p className="mt-2 text-xs">初期掲載：宮城県の一部学校・県立高校入試。地域・学校の全日程を網羅していません。</p>
      {schools.length > 0 && <label className="mt-3 block text-sm font-bold">学校別表示<select className={inputClass} value={selected} onChange={e=>setSchool(e.target.value)}><option value="">掲載校を比較（参考）</option>{schools.map(s=><option key={s} value={s}>{s}</option>)}</select></label>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-bold">大会・合宿の開始日<input className={inputClass} type="date" value={start} onChange={e=>setStart(e.target.value)}/></label>
        <label className="text-sm font-bold">終了日（任意・日帰りは空欄）<input className={inputClass} type="date" value={end} min={start||undefined} onChange={e=>setEnd(e.target.value)}/></label>
      </div>
      {(start||end)&&!valid && <p className="mt-2 text-sm" role="alert">開始日と終了日を正しく入力してください。</p>}
      <fieldset className="mt-4 rounded border border-black/15 p-3">
        <legend className="px-1 text-sm font-bold">自分の学校予定を確認（任意）</legend>
        <p className="text-xs">未掲載校でも利用できます。ここで入力した日付は画面内でのみ使用し、保存・共有・送信しません。</p>
        <label className="mt-2 block text-sm font-bold">種類<select className={inputClass} value={manualType} onChange={e=>setManualType(e.target.value)}>{["試験","入試","学校行事"].map(k=><option key={k}>{k}</option>)}</select></label>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-bold">学校予定の開始日<input className={inputClass} type="date" value={manualStart} onChange={e=>setManualStart(e.target.value)}/></label>
          <label className="text-sm font-bold">学校予定の終了日（任意）<input className={inputClass} type="date" value={manualEnd} min={manualStart||undefined} onChange={e=>setManualEnd(e.target.value)}/></label>
        </div>
        {(manualStart||manualEnd)&&!manualValid && <p className="mt-2 text-sm" role="alert">学校予定の日付を正しく入力してください。</p>}
      </fieldset>
      {valid && <div className="mt-4 rounded bg-black/5 p-3" aria-live="polite">
        <p className="text-sm font-black">日程チェック：{start} ～ {end||start}</p>
        <p className="mt-1 text-sm">{compared.length ? "掲載情報に要確認の日程が "+compared.length+" 件あります。" : "掲載情報では重複・準備期間への該当は確認されませんでした。学校日程の安全確認が完了したわけではありません。"}</p>
        {compared.map(({e,result})=><p key={e.id} className="mt-2 text-sm"><strong>{kindLabel[result]}</strong>：{e.school}（{e.grade}） {e.title} {e.start}～{e.end}</p>)}
        {manualResult && <p className="mt-2 text-sm font-bold">手入力の日程：{kindLabel[manualResult]}</p>}
        <p className="mt-2 text-xs">学校・学年・受験対象に該当する場合の参考です。最新の学校通知を優先してください。</p>
      </div>}
      <h4 className="mt-5 font-black">公式情報から確認した予定</h4>
      {!relevant.length && <p className="mt-2 text-sm">この条件の公式情報は未掲載です。学校の年間・月間行事予定と保護者への通知を確認してください。</p>}
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {relevant.map(e=><article key={e.id} className="rounded border border-black/15 p-3">
          <p className="text-xs font-bold">{e.region} {e.city} ・ {e.kind} ・ {e.grade}</p>
          <p className="mt-1 text-sm font-black">{e.school}｜{e.title}</p>
          <p className="mt-1 text-sm">{e.start}{e.end!==e.start?" ～ "+e.end:""}</p>
          <a className="mt-2 inline-block text-sm font-bold underline" href={e.source} target="_blank" rel="noopener noreferrer">学校・教育委員会の公式情報 ↗</a>
          <p className="mt-1 text-xs text-black/60">確認日：{e.checked}・変更の可能性あり</p>
        </article>)}
      </div>
      <p className="mt-4 text-xs">開催前には定期考査・受験・始業式・終業式・卒入学式・学校行事・公式戦・会場の予約条件をあわせて確認しましょう。未確認を「重複なし」と扱わないでください。</p>
    </details>
  </section>;
}
