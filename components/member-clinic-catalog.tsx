"use client";

import { useMemo, useState } from "react";
import { programmes, isProgrammeActive } from "./programme-data";

type Category = "all" | "clinic" | "camp" | "lecture" | "other";
function typeOf(p: (typeof programmes)[number]): Category {
  if (p.pathway === "clinic") return "clinic";
  if (p.pathway === "development-camp") return "camp";
  if (p.pathway === "coach") return "lecture";
  return "other";
}
const categoryName: Record<Category,string> = {
  all: "すべて", clinic: "クリニック・スクール", camp: "キャンプ・遠征", lecture: "オンライン・講習", other: "国際交流・大会",
};
function safeApplicationUrl(raw: string): string | null {
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" ? u.toString() : null;
  } catch { return null; }
}
function paymentGuide(id: string) {
  if (id === "kagoshima-nov29") return { step: "公式ページで申込情報を入力し、オンライン決済へ", cta: "申込・Stripe決済へ" };
  if (id === "torsten") return { step: "国内はGoogleフォーム登録後、Squareの支払案内へ", cta: "講習を申し込む" };
  if (id === "okinawa-december-camp") return { step: "参加プランと宿泊・通いの条件を確認し、公式窓口から申込", cta: "キャンプの申込・料金確認" };
  if (id === "sendai-u15") return { step: "スクールフォームで申込み、RBAから条件・支払いをご案内", cta: "スクール申込へ" };
  if (id === "kobe") return { step: "宿泊・食事・送迎等の条件を確認。支払済みの場合は再決済しない", cta: "キャンプ申込を確認" };
  return { step: "公式申込先にて対象・日程・料金・支払い方法を最終確認", cta: "公式の参加申込へ" };
}
const filters: Category[] = ["all","clinic","camp","lecture","other"];

export function MemberClinicCatalog() {
  const [filter,setFilter] = useState<Category>("all");
  const [search,setSearch] = useState("");
  const items = useMemo(() => programmes
    .filter(p => isProgrammeActive(p))
    .filter(p => filter === "all" || typeOf(p) === filter)
    .filter(p => !search.trim() ||
      [p.title[1],p.place[1],p.audience[1],p.price[1]].join(" ").toLowerCase().includes(search.toLowerCase().trim()))
    .sort((a,b) => a.startDate.localeCompare(b.startDate)),[filter,search]);
  return <div>
    <div className="border-l-4 border-[#e56a18] bg-white p-5 text-sm leading-8">
      <strong>参加・決済は企画ごとの公式窓口で確認してください。</strong>
      <p>RBA IDでログインしていても、各クリニックへの申込・決済は別途必要です。開催終了分を除外し、対象年代・会場・料金と現在案内されている申込先を掲載しています。空き枠やフォームの受付状況は申込先でご確認ください。</p>
      <p className="mt-2">決済はStripe・Square・主催者サイトなど企画により異なります。支払済みの方は再決済しないでください。</p>
    </div>
    <div className="mt-7 space-y-4 rounded-md border border-black/15 bg-white p-4 sm:p-6">
      <label className="block text-sm font-bold" htmlFor="clinic-search">クリニック・地域・対象を検索</label>
      <input id="clinic-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="例：鹿児島、U15、オンライン" className="w-full rounded border border-black/25 px-4 py-3 text-base"/>
      <div className="flex flex-wrap gap-2" aria-label="企画の種類を絞り込む">
        {filters.map(c=><button type="button" key={c} aria-pressed={filter===c} onClick={()=>setFilter(c)}
          className={"min-h-10 rounded border px-4 py-2 text-xs font-bold sm:text-sm "+(filter===c?"border-black bg-black text-white":"border-black/25 bg-white text-black")}>{categoryName[c]}</button>)}
      </div>
      <p className="text-sm text-black/70">{items.length}件の対象企画</p>
    </div>
    <div className="mt-7 grid gap-4 md:grid-cols-2">
      {items.map(p=>{
        const pay=paymentGuide(p.id);
        const application=safeApplicationUrl(p.applicationUrl);
        const details=p.japaneseInfoPath?safeApplicationUrl(p.japaneseInfoPath):null;
        const external=Boolean(application?.startsWith("https://"));
        return <article key={p.id} className="rounded-md border border-black/20 bg-white p-5 sm:p-7">
          <p className="text-xs font-black tracking-widest text-[#de6419]">{categoryName[typeOf(p)]}</p>
          <h2 className="mt-3 text-xl font-black leading-snug sm:text-2xl">{p.title[1]}</h2>
          <p className="mt-3 text-sm font-semibold">{p.date[1]}</p>
          <p className="mt-2 text-sm">{p.place[1]}</p>
          <div className="mt-4 border-t border-black/10 pt-4 text-sm">
            <p><strong>参加費：</strong>{p.price[1]}</p>
            <p className="mt-2"><strong>対象：</strong>{p.audience[1]}</p>
          </div>
          <p className="mt-4 text-xs leading-7 text-black/70">{pay.step}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {application?<a className="inline-flex min-h-12 items-center justify-center rounded bg-[#f36b17] px-5 py-3 text-sm font-black"
              href={application} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined}>
              {pay.cta} →</a>:<span className="text-sm">申込先を調整中</span>}
            {details && details!==application?
              <a className="inline-flex min-h-12 items-center justify-center rounded border border-black/25 px-4 py-3 text-sm font-bold"
                href={details} target={details.startsWith("https://")?"_blank":undefined} rel={details.startsWith("https://")?"noopener noreferrer":undefined}>
                詳細を確認</a>:null}
          </div>
        </article>;
      })}
    </div>
    {!items.length && <p className="mt-7 rounded-md border border-black/20 bg-white px-5 py-7 text-sm leading-7">条件に合う受付対象の企画は現在ありません。絞り込みを解除するか、新しい公式案内をご確認ください。</p>}
    <aside className="mt-9 rounded-md border-2 border-black bg-white p-6">
      <span className="text-xs font-black tracking-widest text-[#de6419]">RBA UNITED / JAPAN × GUAM</span>
      <h2 className="mt-3 text-2xl font-black">神戸2027・男子U14国際交流</h2>
      <p className="mt-3 text-sm leading-8">グアム来日と国内男子U14交流を調整中です。会場・日時・年齢基準・正式受入枠が確定しておらず、前金決済はまだ開始していません。申込や出場を確約しません。</p>
      <a href="/ja/events/kobe-boys-u14-exchange-2027" className="mt-5 inline-flex min-h-12 items-center rounded bg-black px-5 py-3 text-sm font-bold text-white">神戸交流の最新情報・申込方法 →</a>
    </aside>
    <div className="mt-8 flex flex-wrap gap-4 text-sm">
      <a href="/ja/my-homecourt/app" className="font-bold underline underline-offset-4">MY HOME COURTへ戻る</a>
      <a href="/ja/payments" className="font-bold underline underline-offset-4">支払い・参加費の案内</a>
      <a href="mailto:riot.training.base@gmail.com" className="font-bold underline underline-offset-4">申込・入金の問い合わせ</a>
    </div>
    <p className="mt-4 text-xs leading-7 text-black/60">新規企画はRBA公式のプログラム一覧に掲載・審査されるとここにも反映されます。リンク先は各企画の公式申込先であり、MY HOME COURTへのログインのみでは申込完了にはなりません。</p>
  </div>;
}