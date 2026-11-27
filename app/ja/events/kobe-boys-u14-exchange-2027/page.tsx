import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "神戸・男子U14国際交流｜2027年1月・参加意向受付",
  description: "神戸・関西で計画中の男子U14国際交流。会場や競技日程、最終費用は調整中です。無料の参加意向を確認します。",
  alternates: { canonical: "/ja/events/kobe-boys-u14-exchange-2027" },
};
export default function KobeU14InterestPage() {
  return <SiteFrame locale="ja"><article className="mx-auto max-w-4xl space-y-8 px-5 py-10 text-[#111211]">
    <header className="rounded bg-[#111211] p-7 text-white sm:p-10"><p className="text-sm font-bold text-[#b5c6ff]">RBA UNITED / JAPAN × GUAM</p><h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">神戸で、世界と同じコートへ。</h1><p className="mt-4 text-lg font-bold">男子U14国際交流｜2027年1月5〜10日・計画期間</p><p className="mt-4 leading-8">グアムとの交流試合・合同練習を神戸・関西で計画しています。実際の競技日、会場、年齢資格、参加費、引率条件は調整中です。</p></header>
    <section className="rounded border border-black/20 bg-white p-6"><h2 className="text-xl font-black">現在は無料の参加意向受付です</h2><p className="mt-3 leading-8">国内男子U14チーム、個人選手、海外男子U14チームからの希望をお伺いします。参加枠・選考・開催を確約するものではありません。正式な参加条件・費用・取消条件をご案内するまで決済はありません。</p><div className="mt-5 flex flex-wrap gap-3"><a href="https://form.jotform.com/263188088558069" target="_blank" rel="noopener noreferrer" className="rounded bg-[#2454D8] px-5 py-3 font-bold text-white">国内の参加意向を伝える ↗</a><a href="https://form.jotform.com/263187713938065" target="_blank" rel="noopener noreferrer" className="rounded border border-black/25 px-5 py-3 font-bold">海外チームの参加意向 ↗</a></div><p className="mt-4 text-sm">会場・日程が正式に決まる前の返金不可の交通・宿泊手配はお控えください。</p></section>
    <Link href="/ja/united" className="font-bold underline">RBA UNITEDへ戻る</Link>
  </article></SiteFrame>;
}
