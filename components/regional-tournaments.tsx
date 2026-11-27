"use client";

import { useState } from "react";
import { JapanAcademicCalendar } from "./japan-academic-calendar";
import Link from "next/link";
import tournaments from "@/data/regional-tournaments.json";
import { todayJst } from "@/lib/homecourt-growth";
import { upcomingLocalProgrammes } from "@/lib/regional-programmes";

export function RegionalTournaments({ region, settingsHref }: { region: string | null; settingsHref: string }) {
  const [cityFilter,setCityFilter] = useState("");
  const [ageFilter,setAgeFilter] = useState("");
  const [nationwide,setNationwide] = useState(false);
  const [academicRange,setAcademicRange] = useState<{start:string;end:string;title:string;revision:number}|undefined>(undefined);
  const today = todayJst();
  const localEvents = tournaments.filter(event => event.region === region && event.end >= today);
  const allEvents = tournaments.filter(event => event.end >= today);
  const scope = nationwide ? allEvents : localEvents;
  const cities = [...new Set(scope.map(event => event.city))].sort((a,b) => a.localeCompare(b,"ja"));
  const matchingCity = cities.includes(cityFilter) ? cityFilter : "";
  const entries = scope.filter(event => (!matchingCity || event.city === matchingCity) && (!ageFilter || event.category === ageFilter))
    .sort((a,b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title));
  const localProgrammes = upcomingLocalProgrammes(region);
  return <section className="member-section" aria-label="地域の大会と育成機会">
    <div className="member-section-head"><div><p>LOCAL BASKETBALL</p><h2>{region ? region + "の大会・育成情報" : "地域の大会・育成情報"}</h2>
      <p className="mt-2 text-sm">主催者が公表した情報を掲載しています。参加資格・受付・変更は公式案内をご確認ください。</p></div></div>
    <div id="academic-schedule-check"><JapanAcademicCalendar key={academicRange?.revision ?? 0} region={region} initialRange={academicRange}/></div>
    <div className="flex flex-wrap items-center gap-3 py-3">
      <button type="button" aria-pressed={!nationwide} className={(!nationwide?"bg-black text-white":"border border-black/30")+" rounded px-4 py-2 text-sm font-bold"} onClick={()=>{setNationwide(false);setCityFilter("");}}>登録地域</button>
      <button type="button" aria-pressed={nationwide} className={(nationwide?"bg-black text-white":"border border-black/30")+" rounded px-4 py-2 text-sm font-bold"} onClick={()=>{setNationwide(true);setCityFilter("");}}>全国 {allEvents.length}件</button>
      <Link href={settingsHref} className="text-sm font-bold underline">活動地域を変更</Link>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="text-sm font-bold">市区・地区<select className="mt-1 block w-full rounded border border-black/20 bg-white px-3 py-2" value={matchingCity} onChange={e=>setCityFilter(e.target.value)}><option value="">すべて</option>{cities.map(city=><option key={city}>{city}</option>)}</select></label>
      <label className="text-sm font-bold">カテゴリー<select className="mt-1 block w-full rounded border border-black/20 bg-white px-3 py-2" value={ageFilter} onChange={e=>setAgeFilter(e.target.value)}><option value="">すべて</option>{["U12","U15","U18","3x3","一般","その他"].map(age=><option key={age}>{age}</option>)}</select></label>
    </div>
    <p className="my-3 text-sm">{entries.length}件掲載中　<span className="text-black/60">（全大会の網羅性は未確認）</span></p>
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map(event => <article key={event.region+event.start+event.title} className="rounded border border-black/15 bg-white p-4">
        <p className="text-xs font-bold text-[#a74315]">{event.category} · {event.level} · {event.status}</p>
        <h3 className="mt-2 text-base font-black">{event.title}</h3>
        <p className="mt-2 text-sm">{event.start.slice(0,4)}年{event.dates}</p>
        <p className="mt-1 text-sm">{event.region} {event.city} · {event.venue}</p>
        <button type="button" className="mt-3 mr-3 rounded border border-black/25 px-3 py-2 text-sm font-bold" onClick={()=>{setAcademicRange(old=>({start:event.start,end:event.end,title:event.title,revision:(old?.revision??0)+1}));document.getElementById("academic-schedule-check")?.scrollIntoView({block:"start"});}}>学校日程と照合</button>
        <a className="mt-3 inline-block text-sm font-bold underline" data-growth-id="homecourt-tournament-official" href={event.source} target="_blank" rel="noopener noreferrer">主催者の開催情報へ ↗</a>
      </article>)}
    </div>
    {!entries.length && <p className="rounded bg-black/5 p-4 text-sm">{region||nationwide?"この条件で掲載済みの大会はありません。大会が存在しないという意味ではありません。":"活動地域を登録すると、地域の大会を表示できます。"}</p>}
    <p className="mt-3 text-sm"><a href="https://www.japanbasketball.jp/47ba" className="font-bold underline" target="_blank" rel="noopener noreferrer">全国47都道府県の公式協会一覧で最新情報を確認</a></p>
    <aside className="mt-6 rounded border-l-4 border-[#f36b17] bg-white p-4">
      <h3 className="font-black">次の大会に向けて、練習できる機会</h3>
      {localProgrammes.length ? <ul className="mt-2 space-y-2">{localProgrammes.map(p=><li key={p.id}><strong>{p.title[1]}</strong><p className="text-sm">{p.date[1]} ・ {p.price[1]}</p>{!p.ongoing && <button type="button" className="mt-2 rounded border border-black/25 px-3 py-2 text-sm font-bold" onClick={()=>{setAcademicRange(old=>({start:p.startDate,end:p.endDate||p.startDate,title:p.title[1],revision:(old?.revision??0)+1}));document.getElementById("academic-schedule-check")?.scrollIntoView({block:"start"});}}>学校日程と照合</button>}</li>)}</ul> : <p className="mt-2 text-sm">登録地域の掲載中のRBA企画は現在ありません。</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/ja/my-homecourt/app/clinics" data-growth-id="homecourt-local-programmes" className="rounded bg-[#f36b17] px-4 py-3 text-sm font-bold text-black">クリニック・キャンプを探す</Link>
        <Link href="/ja/clinic-interest" data-growth-id="homecourt-local-interest" className="rounded border border-black/25 px-4 py-3 text-sm font-bold">地元での開催を希望する（無料）</Link>
      </div>
    </aside>
  </section>;
}
