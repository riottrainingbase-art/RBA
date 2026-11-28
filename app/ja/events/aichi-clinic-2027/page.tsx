import type { Metadata } from "next";
import { AichiClinicFees } from "@/components/aichi-clinic-fees";
import { getAichiPayment } from "@/lib/aichi-clinic-payments";
import { SiteFrame } from "@/components/site-frame";
import { aichiClinic as event } from "@/lib/aichi-clinic-2027";
export const metadata:Metadata={
 title:"RBA 愛知 1DAY クリニック｜2027年2月23日（火・祝）",
 description:"愛知県豊田市で2027年2月23日9:00〜17:00に開催予定の育成クリニック。会場は後日案内。早期割引・事前決済制。",
 alternates:{canonical:event.path},
};
const themes=[["01","見る","味方・相手・空いているスペースを認識する。"],["02","選ぶ","状況に応じてシュート、パス、ドライブを判断する。"],["03","試す","1対1や少人数ゲームで技術と判断をつなげる。"],["04","振り返る","次の練習で意識することを持ち帰る。"]];
export const dynamic="force-dynamic";
export default function Page(){
 const payable=getAichiPayment("full")?.payable;
 return <SiteFrame locale="ja"><main className="bg-[#f6f3ec] text-[#151719]">
  <header className="bg-[#ff7900] px-5 py-14 sm:py-20"><div className="mx-auto max-w-5xl">
   <a className="text-sm font-bold underline" href="/ja/schedule">← 開催日程</a>
   <p className="mt-8 text-xs font-black tracking-widest">RBA / AICHI DEVELOPMENT CLINIC</p>
   <h1 className="mt-3 text-[clamp(2.5rem,7vw,5rem)] font-black leading-tight">技術を、<br/>試合で使える力へ。</h1>
   <h2 className="mt-5 text-2xl font-black">{event.title}</h2>
   <p className="mt-4 border-y-2 border-black py-4 text-xl font-black">{event.dateLabel}<br/>{event.time}</p>
   <p className="mt-5 text-sm font-bold">開催予定・会場は後日案内。早割あり・事前決済制。{payable?"正式受付中です。":"正式募集と決済は開始していません。"}</p>
   <a href="#entry" className="mt-6 inline-block bg-black px-5 py-4 font-black text-white">参加方法・受付状況 →</a>
  </div></header>
  <section className="mx-auto max-w-5xl px-5 py-12"><h2 className="text-3xl font-black">開催概要</h2>
   <dl className="mt-6 grid gap-px border border-black/15 bg-black/15 sm:grid-cols-2">{[["開催日",event.dateLabel],["時間",event.time],["会場",event.place],["対象・定員","調整中"],["参加費","早割：半日6,600円／終日11,000円（税込）"],["決済","事前決済制"],["運営","Riot Basketball Academy（RBA）"]].map(([label,value])=><div className="bg-white p-5" key={label}><dt className="text-xs font-bold text-neutral-600">{label}</dt><dd className="mt-2 font-black">{value}</dd></div>)}</dl>
  </section>
  <section className="mx-auto max-w-5xl px-5 pb-12"><AichiClinicFees/></section>
  <section className="bg-white px-5 py-12"><div className="mx-auto max-w-5xl"><h2 className="text-3xl font-black">クリニックの育成テーマ（予定）</h2><p className="mt-3 leading-7">所属チームに関わらず、普段の練習や試合につなげられる学びを。対象年代・参加人数に応じて内容を調整します。</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{themes.map(([n,title,body])=><article className="border border-neutral-300 p-5" key={n}><p className="text-xs font-black">{n} / DEVELOPMENT</p><h3 className="mt-2 text-xl font-black">{title}</h3><p className="mt-2 leading-7">{body}</p></article>)}</div></div></section>
  <section className="mx-auto max-w-5xl px-5 py-12" id="entry"><h2 className="text-3xl font-black">参加申込・お支払い</h2><p className="mt-4 font-bold">{payable?"保護者申込フォームからStripe事前決済まで一続きで申し込めます。早割は1月31日23:59までです。":"受付準備中。会場の使用許可・募集条件・決済設定の確認後に正式受付を開始します。早期割引は1月31日23:59までです。現在は参加枠の予約・課金はありません。"}</p>
   <div className="mt-6 grid gap-3 sm:grid-cols-2"><a className="border border-neutral-300 bg-white p-5 font-bold" href={event.path+"/apply"}>{payable?"01 申込・Stripe事前決済 →":"01 申込フォームの受付状況 →"}</a><a className="border border-neutral-300 bg-white p-5 font-bold" href={event.path+"/payment"}>02 決済の受付状況 →</a></div>
   <p className="mt-5 text-sm"><a className="underline" href="/ja/policies">参加規約・安全方針</a>　<a className="underline" href="/ja/privacy">プライバシーポリシー</a>　<a className="underline" href="/ja/legal">特商法表記</a></p>
  </section>
 </main></SiteFrame>;
}
