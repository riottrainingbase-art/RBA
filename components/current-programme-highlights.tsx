import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import { localePath, type Locale } from "./site-frame";

const copy = {
  ja: { title: "現在申し込める活動", intro: "日程・対象・費用を確認して、今の目的に合う活動をお選びください。", all: "募集中の活動をすべて見る", details: "詳細・申し込み", date: "日程", audience: "対象", fee: "参加費", note: "会場・持ち物・参加確定の条件は、各申込ページでご確認ください。" },
  en: { title: "Find your next programme", intro: "Compare dates, eligibility and fees, then choose the programme that fits your purpose.", all: "See all open programmes", details: "Details and registration", date: "Date", audience: "For", fee: "Fee", note: "Check the application page for venue details, preparation and confirmation terms." },
  "zh-tw": { title: "目前開放報名的活動", intro: "確認日期、對象與費用，選擇適合您目標的活動。", all: "查看所有開放報名活動", details: "詳情與報名", date: "日期", audience: "對象", fee: "費用", note: "場地、攜帶物品及報名確認條件，請參閱各活動報名頁面。" },
  ko: { title: "현재 신청 가능한 활동", intro: "일정·대상·비용을 확인하고 목적에 맞는 활동을 선택하세요.", all: "모집 중인 모든 활동 보기", details: "상세 및 신청", date: "일정", audience: "대상", fee: "참가비", note: "장소·준비물·참가 확정 조건은 각 신청 페이지에서 확인하세요." },
};

export function CurrentProgrammeHighlights({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const active = programmes.filter(p => isProgrammeActive(p));
  const dated = active.filter(p => !p.ongoing && p.id !== "torsten").sort((a, b) => a.startDate.localeCompare(b.startDate));
  const selected = [active.find(p => p.id === "torsten"), dated[0], active.find(p => p.ongoing)].filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (!selected.length) return null;
  return <section className="border-b border-[#c9c6c0] py-12 sm:py-16" aria-labelledby="current-programmes">
    <p className="text-[11px] font-bold tracking-[0.18em] text-[#666]">OPEN PROGRAMMES</p>
    <h2 id="current-programmes" className="mt-3 text-3xl font-bold tracking-tight">{c.title}</h2>
    <p className="mt-3 text-sm leading-7 text-[#555]">{c.intro}</p>
    <div className="mt-7 grid gap-4 md:grid-cols-3">
      {selected.map(p => <article key={p.id} className="flex min-w-0 flex-col border border-[#c9c6c0] bg-white p-6">
        <p className="text-xs font-semibold text-[#666]">{tr(p.place, locale)}</p>
        <h3 className="mt-3 text-xl font-bold leading-snug">{tr(p.title, locale)}</h3>
        <dl className="my-5 space-y-3 text-sm leading-6">
          <div><dt className="text-xs text-[#666]">{c.date}</dt><dd className="font-semibold">{tr(p.date, locale)}{p.ongoing ? ` · ${tr(p.dateSecondary, locale)}` : ""}</dd></div>
          <div><dt className="text-xs text-[#666]">{c.audience}</dt><dd>{tr(p.audience, locale)}</dd></div>
          <div><dt className="text-xs text-[#666]">{c.fee}</dt><dd className="font-semibold">{tr(p.price, locale)}</dd></div>
        </dl>
        <a className="mt-auto inline-flex min-h-12 items-center justify-center bg-[#171717] px-4 py-3 text-center text-sm font-bold text-white" href={p.detailPath ? localePath(locale, p.detailPath) : p.applicationUrl} target={p.detailPath ? undefined : "_blank"} rel={p.detailPath ? undefined : "noopener noreferrer"}>{c.details} ↗</a>
      </article>)}
    </div>
    <p className="mt-5 text-xs leading-6 text-[#666]">{c.note}</p>
    <a className="mt-4 inline-flex min-h-12 items-center border-b border-[#171717] text-sm font-bold" href={localePath(locale, "opportunities")}>{c.all} ↗</a>
  </section>;
}
