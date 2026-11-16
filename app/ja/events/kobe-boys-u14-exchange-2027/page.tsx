import type { Metadata } from "next";
import Image from "next/image";

const domestic = "https://form.jotform.com/263188088558069?utm_source=rba_site&utm_medium=event_page&utm_campaign=kobe_boys_u14_2027";
const checkout = "/ja/events/kobe-boys-u14-exchange-2027/checkout";
const overseas = "https://form.jotform.com/263187713938065?utm_source=rba_site&utm_medium=event_page&utm_campaign=kobe_boys_u14_2027";

export const metadata: Metadata = {
  title: "【先行参加意向受付】神戸国際男子U14交流 2027｜RBA × GUAM",
  description: "2027年1月5日グアム来日、6〜7日に男子U14国際交流試合・合同練習を神戸エリアで計画中。国内男子U14チーム・個人選手および海外男子U14チームの参加意向を無料受付。会場・競技時間・参加費は最終調整中。申込と決済は未確定です。",
  alternates: { canonical: "/ja/events/kobe-boys-u14-exchange-2027", languages: { "ja-JP": "/ja/events/kobe-boys-u14-exchange-2027", "en": "/events/kobe-boys-u14-exchange-2027" } },
  openGraph: { title: "神戸で、世界と同じコートへ。男子U14 国際交流 2027｜RBA", description: "1/5到着｜1/6〜7競技予定｜1/8〜9追加交流を検討。国内・海外チームの参加意向を無料で受付中。", url: "/ja/events/kobe-boys-u14-exchange-2027", images: ["/rba-logo-original.jpg"] },
};

const schedule = [
  ["JAN 05 / TUE", "RBA UNITED事前練習／グアム来日", "RBA UNITED JAPAN男子U14はHC西尾優人のもと、神戸エリアで13:30集合・14:00〜17:00頃の日本側事前練習を第一候補として調整中。会場・実施時間・費用は未確定。グアム側は関西空港10:05到着後の移動・休息を優先し、同日の有料交流試合は実施しません。"],
  ["JAN 06 / WED", "男子U14交流試合・合同練習", "国内男子U14チーム・RBA UNITEDの競技参加希望を優先募集。開始・終了時刻、会場は正式確保後に案内します。"],
  ["JAN 07 / THU", "男子U14交流（時間調整中）", "神戸市立学校の始業日です。学校日程と安全に配慮して競技時間・参加方法を決定します。"],
  ["JAN 08–09", "追加交流の希望確認", "グアム側は1月10日に帰国予定。特に9日（土）の追加交流は、別会場・スタッフ・対戦希望の確認後に実施判断します。追加料金は未設定です。"],
];

const faqs = [
  ["会場は決まっていますか？", "関西・神戸エリアで調整しています。神戸国際大学体育館は候補ですが、大学の正式な施設使用許可はまだ取得していません。大学名を共催・協賛として表示することはありません。"],
  ["グアムチームの来日は確定していますか？", "グアム側から関西国際空港への1月5日到着・1月10日出発の航空券手配について連絡を受けています。選手・引率者の内訳や大会競技日は調整中です。"],
  ["対象は男子だけですか？", "今回の募集対象は男子U14チーム・男子U14の個人選手のみです。正確な生年月日による年齢基準は各国関係者との合意後に最終募集要項で明示します。"],
  ["RBA UNITED JAPANのヘッドコーチと事前練習は？", "RBA代表・西尾優人が男子U14チームのヘッドコーチを務めます。1月5日午後に日本側選手の練習を計画していますが、日時・会場・追加費用・選考結果は未確定です。遠方からの参加や練習に参加できない選手については事前共有等の方法を検討します。"],
  ["1月7日は学校が始まりますが？", "神戸市立小中学校の3学期始業日に当たるため、学校に支障のない参加時間を優先して調整します。1月6日の単日参加希望も受け付けます。"],
  ["先行受付で支払いは発生しますか？", "発生しません。これは参加意向を確認する無料フォームです。場所・日程・最終参加費・中止返金条件を確定し、改めて参加意思を確認するまで請求しません。"],
  ["国内チームと個人を両方申し込む必要は？", "ありません。チーム単位の申込には選手10〜15名を含みます。選手個人へ同じ参加日分の料金を重複請求しない設計です。"],
  ["海外チームには宿泊・送迎が付きますか？", "航空券、宿泊、食事、送迎は参加条件の確認後に各団体と別途調整します。無償提供や日本側の全額負担を約束するものではありません。"],
];

export default function KobeBoysU14InterestPage() {
  return <main className="min-h-screen bg-[#f6f2e9] text-[#111]">
    <div className="border-b border-black/20 bg-[#fff9f0]"><div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
      <a href="/ja" className="flex items-center gap-3" aria-label="RBA日本語トップ"><Image src="/rba-logo-original.jpg" alt="RBA公式ロゴ" width={47} height={59} className="h-14 w-12 object-contain"/><span className="text-xs font-black leading-5">RIOT BASKETBALL<br/>ACADEMY</span></a>
      <nav className="flex gap-4 text-xs font-bold sm:text-sm"><a href="/ja/schedule" className="underline underline-offset-4">活動予定</a><a href="/events/kobe-boys-u14-exchange-2027" className="underline underline-offset-4" lang="en">ENGLISH</a></nav>
    </div></div>
    <header className="bg-[#ff6709] px-5 py-14 sm:px-8 sm:py-20"><div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center gap-3"><span className="border-2 border-black px-3 py-1 text-xs font-black tracking-wider">BOYS U14 ONLY</span><span className="border-2 border-black px-3 py-1 text-xs font-black tracking-wider">先行参加意向受付／未決済</span></div>
      <p className="mt-9 text-sm font-black tracking-[.24em]">JAPAN × GUAM + ASIA / KOBE 2027</p>
      <h1 className="mt-4 max-w-5xl text-[clamp(2.7rem,8.5vw,7.5rem)] font-black leading-[1.02] tracking-[-.07em]">神戸で、<br/>世界と同じコートへ。</h1>
      <p className="mt-7 border-t-[6px] border-black pt-5 text-[clamp(1.8rem,5vw,4rem)] font-black tracking-tight">RBA INTERNATIONAL<br/>BOYS U14 EXCHANGE</p>
      <p className="mt-5 text-2xl font-black sm:text-4xl">2027.01.05–10 <span className="text-base sm:text-lg">／ 神戸・関西</span></p>
      <p className="mt-5 max-w-3xl text-base font-bold leading-8">1月5日はグアム側の関空到着日。同日午後にHC西尾優人が率いるRBA UNITED JAPAN男子U14の事前練習（神戸エリア・会場未確定）を検討しています。1月6〜7日の男子U14交流を中心に、国内・海外の選手が互いの判断や文化に触れる場を計画しています。1月8〜9日の追加交流も希望を調査中です。</p>
      <p className="mt-5 max-w-3xl border-l-4 border-black bg-[#fff4e8] p-4 text-sm font-bold leading-7">現在の受付は参加意向の確認です。体育館、競技日程、参加国数、年齢資格、最終料金は未確定です。参加枠の確約・請求・決済は行いません。</p>
      <div className="mt-8 flex flex-wrap gap-3"><a href={checkout} className="inline-flex min-h-14 items-center justify-center border-2 border-black bg-white px-6 py-4 text-sm font-black text-black sm:text-base">料金・決済手順を確認 →</a><a href={domestic} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center bg-black px-6 py-4 text-sm font-black text-white sm:text-base">日本国内｜男子U14の参加意向を登録 ↗</a><a href={overseas} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center border-2 border-black bg-[#fff4e8] px-6 py-4 text-sm font-black text-black sm:text-base" lang="en">OVERSEAS TEAMS / ENQUIRE ↗</a></div>
    </div></header>
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8"><p className="text-xs font-black tracking-[.25em] text-[#e75d09]">WHY WE MEET</p><h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">勝つためだけに、<br/>集まるわけじゃない。</h2><p className="mt-5 max-w-4xl text-base leading-9">普段と異なる守り方。初めて会う仲間。言葉が通じなくても伝わる判断。1対1、スペーシング、相手を見て選ぶプレーを、試合と合同練習で試します。勝敗だけでなく、交流と学びを中心に設計します。</p>
    <div className="mt-9 grid gap-4 md:grid-cols-3">{[["01","国際交流試合","海外・国内男子U14チームが試合の中で互いを知る。"],["02","合同練習","単なる試合消化にせず、違う考え方や技術を持ち寄る。"],["03","文化と指導者交流","選手・指導者がバスケットボールを越えてつながる。"]].map(([n,title,body])=><article key={n} className="border border-black/20 bg-white p-6"><p className="text-2xl font-black text-[#ef650b]">{n}</p><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7">{body}</p></article>)}</div></section>
    <section className="bg-black px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold tracking-[.24em] text-[#ff9a59]">DRAFT PROGRAMME / TENTATIVE</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">フライトを変えず、<br/>出会いを増やす。</h2><div className="mt-8 grid gap-3 md:grid-cols-2">{schedule.map(([day,title,note])=><article key={day} className="border border-white/30 p-6"><p className="text-sm font-black text-[#ff9a59]">{day}</p><h3 className="mt-3 text-xl font-black">{title}</h3><p className="mt-4 text-sm leading-7 text-[#e6e6e6]">{note}</p></article>)}</div><p className="mt-6 text-xs leading-7 text-neutral-300">グアム側からの連絡では1/5関空到着・1/10関空出発の航空券予約があります。到着日の午前に試合は設定しません。試合・合同練習の場所と時刻は未確定です。</p></div></section>
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8"><p className="text-xs font-black tracking-[.25em] text-[#e75d09]">DOMESTIC / FEES UNDER REVIEW</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">参加のかたちは、2つ。</h2><p className="mt-4 max-w-4xl leading-8">以下は現在の予算上の予定価格です（税込）。競技の実施日・時間、使用会場、最低開催条件が確定した後に最終案内します。</p><div className="mt-8 grid gap-4 md:grid-cols-2">
      <article className="border-2 border-black bg-white p-6"><h3 className="text-2xl font-black">個人参加 / BOYS U14</h3><p className="mt-4 text-3xl font-black">¥8,800 <span className="text-sm font-medium">1日・予定</span></p><p className="mt-2 text-3xl font-black">¥15,400 <span className="text-sm font-medium">1/6＋1/7・予定</span></p><p className="mt-5 text-sm leading-7">単独参加の希望を受け付け、人数・年齢資格を確認したうえでRBA UNITED JAPAN男子U14等の編成を検討します。HCは西尾優人。1月5日の事前練習は参加可能性を確認する段階で、選出・参加枠・出場時間は確約しません。</p></article>
      <article className="border-2 border-black bg-white p-6"><h3 className="text-2xl font-black">チーム参加 / BOYS U14</h3><p className="mt-4 text-3xl font-black">¥77,000 <span className="text-sm font-medium">1日・予定</span></p><p className="mt-2 text-3xl font-black">¥143,000 <span className="text-sm font-medium">1/6＋1/7・予定</span></p><p className="mt-5 text-sm leading-7">男子U14選手10〜15名のチーム単位で参加意向を受付。料金は1チームあたり。チーム枠の選手に個人参加費を重複して請求しません。</p></article>
    </div><p className="mt-5 text-sm font-bold leading-7">※宿泊・交通・食事等は含みません。1/5は到着日、1/8〜9は追加交流の検討段階であり、現在の料金には含まれません。1/7は学校予定を優先して実施時間を調整します。</p><div className="mt-7 flex flex-wrap gap-3"><a href={domestic} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center bg-[#ff6709] px-7 py-4 font-black text-black">男子U14の参加希望を無料登録する ↗</a><a href={checkout} className="inline-flex min-h-14 items-center justify-center border-2 border-black bg-white px-7 py-4 font-black text-black">参加プラン・決済手順を確認 →</a></div></section>
    <section className="bg-[#eee4d9] px-5 py-14 sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-xs font-black tracking-[.24em] text-[#bd4b00]">INTERNATIONAL TEAMS</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">海外男子U14チームも、<br/>参加意向を募集。</h2><p className="mt-5 max-w-4xl leading-8">グアムとの交流を軸に、アジア各国・地域の育成クラブにも参加の可能性を確認しています。グアム以外の海外チームの参加は未確定であり、団体名・国旗を確定参加として表示しません。航空券や宿泊は各団体のご判断で、参加・施設条件が確定する前の返金不可予約はお勧めしません。</p><a href={overseas} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center bg-black px-7 py-4 font-black text-white" lang="en">OVERSEAS BOYS U14 TEAM INTEREST FORM ↗</a></div></section>
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8"><h2 className="text-3xl font-black">参加前のよくある質問</h2><div className="mt-6 divide-y divide-black/20 border-y border-black/20">{faqs.map(([q,a])=><details key={q} className="py-5"><summary className="cursor-pointer pr-5 font-black">{q}</summary><p className="mt-3 text-sm leading-8">{a}</p></details>)}</div></section>
    <footer className="bg-black px-5 py-12 text-white sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-xs font-black tracking-[.25em] text-[#ff9a59]">RIOT BASKETBALL ACADEMY</p><h2 className="mt-4 text-3xl font-black">国内も、海外も。次のコートで。</h2><div className="mt-7 flex flex-wrap gap-3"><a className="bg-[#ff6709] px-6 py-4 font-black text-black" href={domestic} target="_blank" rel="noopener noreferrer">日本国内・無料先行受付 ↗</a><a className="border border-white px-6 py-4 font-black" href={overseas} target="_blank" rel="noopener noreferrer">OVERSEAS / EN ↗</a></div><p className="mt-6 text-sm text-neutral-300">主催予定：Riot Basketball Academy（RBA）／会場・協力団体・安全管理体制・費用は正式調整中</p><a className="mt-3 inline-block text-sm underline underline-offset-4" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></div></footer>
  </main>;
}
