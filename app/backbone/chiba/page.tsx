import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

const registration="https://docs.google.com/forms/d/e/1FAIpQLScP3NPWCVgySjcP1TyqMdXQ4Cw9CUBhMk78DJPP1dlLl3hShw/viewform";

export const metadata: Metadata={
 title:"BACKBONE 千葉 CHAPTER Round 3｜10月25日（日）",
 description:"2026年10月25日（日）、千葉県神崎町で開催予定のBACKBONE。育成クリニックと3x3ゲーム。対象は小学1年生〜中学3年生、参加費6,600円（税込）。",
 alternates:{canonical:"https://riotbasketballacademy.com/backbone/chiba"}
};
export default function ChibaChapter(){
 return <SiteFrame locale="ja">
 <div className="bg-[#f4f1eb] text-[#17191b]">
  <div className="mx-auto max-w-[1050px] px-6 py-14 sm:px-10 sm:py-20">
   <Link href="/backbone" className="text-sm font-bold underline underline-offset-4">← BACKBONEに戻る</Link>
   <p className="mt-10 text-xs font-bold tracking-[.16em] text-[#666]">BACKBONE / CHIBA CHAPTER / ROUND 3</p>
   <h1 className="mt-4 text-[clamp(36px,6vw,74px)] font-black leading-[1.12] tracking-[-.05em]">10月25日、千葉でプレーしよう。</h1>
   <p className="mt-6 max-w-[740px] text-base leading-8 text-[#505859]">午前は育成クリニック、午後は3x3ゲーム。チームは当日編成するため、一人での参加も歓迎しています。</p>
   <div className="mt-9 grid gap-3 sm:grid-cols-3">
    <article className="border-t border-[#aeb2ad] py-5"><h2 className="text-base font-bold">日時・会場</h2><p className="mt-3 text-sm leading-7">2026年10月25日（日）<br/>8:40受付／9:00〜16:00<br/>神崎中学校体育館（千葉県神崎町）</p></article>
    <article className="border-t border-[#aeb2ad] py-5"><h2 className="text-base font-bold">対象・定員</h2><p className="mt-3 text-sm leading-7">小学1年生〜中学3年生<br/>定員60名<br/>個人参加歓迎</p></article>
    <article className="border-t border-[#aeb2ad] py-5"><h2 className="text-base font-bold">参加費</h2><p className="mt-3 text-sm leading-7">1名 6,600円（税込）<br/>複数名の場合は人数分のお申し込みが必要です。</p></article>
   </div>
   <section className="mt-10 border-t border-[#c9c6c0] py-9"><h2 className="text-2xl font-bold">当日の予定</h2><dl className="mt-5 grid gap-2 text-sm leading-7 sm:grid-cols-[145px_1fr]"><dt className="font-bold">8:40</dt><dd>受付</dd><dt className="font-bold">9:00〜11:30</dt><dd>育成クリニック</dd><dt className="font-bold">11:30〜13:00</dt><dd>昼食・休憩</dd><dt className="font-bold">13:00〜13:30</dt><dd>チーム発表・準備運動</dd><dt className="font-bold">13:30〜15:50</dt><dd>3x3ゲーム</dd><dt className="font-bold">16:00</dt><dd>終了予定</dd></dl><p className="mt-5 text-xs leading-6 text-[#606565]">当日の進行は状況により調整する場合があります。</p></section>
   <section className="border-t border-[#c9c6c0] py-9"><h2 className="text-2xl font-bold">参加申込</h2><p className="mt-4 max-w-[700px] text-sm leading-7 text-[#505859]">申込フォームの最新の募集状況と参加条件をご確認ください。フォーム送信後の受付・決済については主催者の案内に従ってください。</p><a href={registration} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center bg-[#17191b] px-6 py-3 text-sm font-bold text-white">参加申込フォームを開く ↗</a><p className="mt-5 text-xs leading-6 text-[#606565]">主催：HBC Wolves／指導・監修：Riot Basketball Academy／協賛：GLEAM® by Nobumitsu Tabata</p></section>
   <section className="border-t border-[#c9c6c0] py-9"><h2 className="text-xl font-bold">ほかの活動を見る</h2><p className="mt-3 text-sm leading-7 text-[#505859]"><Link className="font-bold underline underline-offset-4" href="/backbone">BACKBONEについて</Link> ／ <Link className="font-bold underline underline-offset-4" href="/ja/opportunities">RBAの活動一覧</Link></p></section>
  </div>
 </div>
 </SiteFrame>;
}
