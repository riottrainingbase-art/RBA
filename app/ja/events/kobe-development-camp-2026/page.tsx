import type { Metadata } from "next";
import Image from "next/image";
import styles from "./tatsuno.module.css";

const form = "https://form.jotform.com/262591727805061?utm_source=rba_site&utm_medium=event_page&utm_campaign=kobe_20261121";
const inquiry = "https://form.jotform.com/262983880762068?utm_source=rba_site&utm_medium=camp_inquiry&utm_campaign=kobe_20261121";
export const metadata: Metadata = {
  title: "兵庫・たつの 育成キャンプ｜11月21〜23日・小5〜中3｜RBA",
  description: "練習した技術を、試合で使える力へ。RBAの兵庫・たつの育成キャンプ。半日6,600円・日帰り11,000円・3日通い27,500円。青龍ラーテルズとの合同練習を中心に実施。宿泊・食事・送迎の詳細は個別確認のうえご案内します。",
  alternates: { canonical: "/ja/events/kobe-development-camp-2026" },
  openGraph: { title: "練習ではできる。試合では出せない。その差を、次の一歩へ。｜RBA", description: "2026年11月21〜23日｜兵庫県たつの市｜小5〜中3｜半日・日帰り・通いの参加相談受付", url: "/ja/events/kobe-development-camp-2026", images: ["/rba-logo-original.jpg"], locale: "ja_JP" },
};
const plans = [["半日", "6,600円", "午前または午後を選んで参加"], ["1日・日帰り", "11,000円", "1日だけ参加したい方へ"], ["2日・通い", "19,800円", "宿泊せずに2日間"], ["3日・通い", "27,500円", "自宅から通って3日間"], ["2日1泊・食事付き", "33,000円", "宿泊条件は決済前に確認"], ["3日2泊・食事付き", "52,800円", "宿泊条件は決済前に確認"]];
const days = [["11.21 SAT", "見る。選ぶ。", "守備との距離、味方の位置、空いている場所。何を見て、どのプレーを選ぶかを、動きづくりと対人練習から整理します。"], ["11.22 SUN", "味方と、つながる。", "パスを出して終わらない。受け手の準備と動き直しを学び、自分のプレーを次のチャンスへつなげます。"], ["11.23 MON", "振り返りと、次の挑戦。", "9:00〜12:00の地域交流枠を予定。実施内容と担当体制は現地協力スタッフと最終調整します。帰路の航空便に合わせて参加しない選手もいます。"]];
const faq = [["3日間すべて参加できなくても大丈夫？", "半日、1日、2日・通いなどの参加プランがあります。11月23日は午前9:00〜12:00を予定し、21・22日の終日枠とは異なります。希望日・実際の参加時間・料金を申込前にご確認ください。既にお申し込み済みの方は再申込不要です。"], ["経験が少なくても参加できますか？", "完成度の高い選手だけを対象にしていません。学年や経験、当日の様子に合わせて課題を調整します。心配なことは事前にご相談ください。"], ["指導は誰が担当しますか？", "11月21・22日はRBA代表の西尾優人が中心となり、青龍ラーテルズの皆さんと合同練習を行います。23日午前は現地協力スタッフと運営・指導体制を調整しており、代表が同時間帯に常駐することは確約していません。参加日ごとの担当者は個別の最終案内でお知らせします。"], ["保護者は見学できますか？", "見学については施設および現地協力団体の運営ルールに従います。見学を希望される場合は事前にRBAへご相談ください。"], ["会場・宿泊先はどこですか？", "11月20日夜・21日・22日は兵庫県たつの市の体育館を使い、青龍ラーテルズとの合同練習を中心に行います。23日午前は別会場での地域交流枠を調整しています。会場の集合地点や宿泊先の部屋・食事、送迎条件は各参加家庭へ個別にお知らせします。宿泊・交通の手配や決済の前にRBAへご確認ください。"], ["申込・支払いはどう進めますか？", "新規参加をご希望の場合は、先に参加希望日・プランをご相談ください。個別の参加条件をご案内したうえで、公式フォームと決済方法をご案内します。フォーム送信のみでは入金・参加確定になりません。既に申込・決済済みの方は再手続き不要です。"]];

export default function KobeDevelopmentCamp() {
  return <main className={`${styles.page} min-h-screen bg-[#f6f2e9] text-[#243d42]`}>
    <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5 sm:px-9">
      <a href="/ja" className="flex items-center gap-3"><Image src="/rba-logo-original.jpg" alt="RBA公式ロゴ" width={45} height={58} className="h-14 w-11 object-contain"/><span className="text-xs font-black tracking-wider">RIOT BASKETBALL<br/>ACADEMY</span></a>
      <a href="/ja/schedule" className="text-sm font-bold underline underline-offset-4">開催予定一覧</a>
    </header>
    <section className={`${styles.hero} border-y-2 border-[#c3ad89] bg-[#183f47] text-[#fff8ee]`}>
      <div className="relative mx-auto max-w-5xl px-5 py-12 sm:px-9 sm:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-xs font-black tracking-widest">HYOGO / TATSUNO · DEVELOPMENT CAMP 2026</p><span className="border border-[#e8ca95]/60 px-4 py-2 text-sm font-bold tracking-[.2em] text-[#e8ca95]">兵庫・たつの</span></div>
        <div className={styles.quickStart}><p>11/21–23｜小5〜中3｜半日6,600円〜（税込）</p><a href={inquiry} data-cta="kobe-top-inquiry">参加できる日を無料で相談 ↗</a></div>
        <p className="mt-7 text-sm font-semibold tracking-[.15em] text-[#e8ca95]">揖保川の流れと、城下町のぬくもりを感じるまちで。</p>
        <h1 className="mt-7 text-[clamp(38px,7.8vw,84px)] font-black leading-[1.15] tracking-[-.06em]">練習ではできる。<br/>試合では出せない。</h1>
        <p className="mt-6 text-2xl font-black sm:text-4xl">その差を、次の一歩へ。</p>
        <p className="mt-6 max-w-2xl text-base font-semibold leading-8">ドリブルも、パスも、シュートも。<br/>「何を見て、いつ使うか」まで学ぶRBAの育成キャンプ。</p>
        <div className="mt-8 border-y border-[#c3ad89]/60 py-5"><p className="text-[clamp(29px,6vw,60px)] font-black tracking-tight">2026.11.21–23</p><p className="mt-1 font-bold sm:text-xl">兵庫県たつの市 ／ 小学5年生〜中学3年生</p></div>
        <p className="mt-6 text-xl font-black">半日・日帰り・通いでも参加できます。</p>
        <a href={inquiry} data-cta="kobe-hero-inquiry" className="mt-6 inline-flex min-h-14 items-center justify-center bg-[#844a2c] px-6 py-4 text-base font-black text-white" style={{color:"#fff"}}>参加できる日・プランを無料で相談する ↗</a><p className="mt-3 text-xs font-semibold leading-6">相談フォームは無料です。送信しても予約・申込・決済は確定しません。</p>
      </div>
    </section>
    <section aria-labelledby="planning-note" className="mx-auto max-w-5xl px-5 py-7 sm:px-9">
      <div className="border-l-4 border-[#9c6545] bg-white p-5 text-sm leading-7"><h2 id="planning-note" className="font-black">参加を検討されている方へ</h2><p>11月20日夜・21日・22日は、現地の青龍ラーテルズとの合同練習を中心に実施します。21・22日の活動時間は9:00〜17:00、23日は別会場の午前9:00〜12:00を予定しています。宿泊・食事・送迎の個別条件は調整中のため、新規参加の方には希望日とプランを伺ったうえでご案内します。申込・決済済みの方は再手続き不要です。</p></div>
    </section>
    <section className="mx-auto max-w-5xl px-5 py-10 sm:px-9">
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl">こんな場面を、変えていく。</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">{[["抜けたのに、止まる。","守備が寄ったら、打つ・渡す・やり直す。その場に合う選択肢を考える。"],["パスの後、見ている。","ボールを渡した後も、次に受けられる場所へ動く。味方のチャンスもつくる。"],["ミスの理由が、分からない。","できたことと変えることを一つずつ整理し、もう一度試す。"]].map(([title,body])=><article key={title} className="border border-[#d6ccba] bg-white p-6"><h3 className="text-xl font-black">{title}</h3><p className="mt-4 text-sm leading-7 text-neutral-700">{body}</p></article>)}</div>
    </section>
    <section className="bg-[#294c46] text-white"><div className="mx-auto max-w-5xl px-5 py-12 sm:px-9"><h2 className="text-3xl font-black sm:text-4xl">それぞれの参加日を、学びにつなぐ。</h2><div className="mt-8 grid gap-5 sm:grid-cols-3">{days.map(([date,title,body])=><article key={date} className="border-t border-white/30 pt-5"><p className="text-sm font-black text-[#efd7aa]">{date}</p><h3 className="mt-4 text-2xl font-black">{title}</h3><p className="mt-4 text-sm leading-7 text-[#e2e9e2]">{body}</p></article>)}</div><p className="mt-7 text-xs leading-6 text-[#e2e9e2]">内容・グループ構成は人数と会場条件に合わせて調整します。11/21・22は9:00〜17:00、11/23は別会場の9:00〜12:00を予定しています。仙台からの遠征選手3名は11/23午前の練習には参加しません。担当スタッフ・集合解散の詳細は個別の最終案内を優先してください。</p></div></section>
    <section id="plans" className="mx-auto max-w-5xl px-5 py-12 sm:px-9">
      <h2 className="text-3xl font-black sm:text-4xl">泊まらなくても、参加できる。</h2><p className="mt-4 leading-8 text-neutral-700">すべての日程に参加できなくても大丈夫。ご家庭の予定に合うプランをご相談ください。</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{plans.map(([title,price,note])=><article key={title} className="border border-[#d6ccba] bg-white p-5"><h3 className="font-black">{title}</h3><p className="mt-4 text-3xl font-black">{price}<span className="ml-2 text-xs font-medium">税込／1名</span></p><p className="mt-3 text-sm text-neutral-600">{note}</p></article>)}</div>
      <p className="mt-5 text-sm leading-7">前夜クリニック：11/20（金）18:00〜20:30／3,300円（税込・1名）。宿泊・食事は含みません。本キャンプと併用する場合は別途お申し込みください。</p>
      <a href={inquiry} data-cta="kobe-plan-inquiry" className="mt-6 inline-flex min-h-14 items-center bg-[#844a2c] px-6 py-4 font-black text-white" style={{color:"#fff"}}>希望日・参加方法を無料で相談する ↗</a>
    </section>
    <section className="mx-auto max-w-5xl px-5 pb-12 sm:px-9"><h2 className="text-3xl font-black">よくあるご質問</h2><div className="mt-6 divide-y divide-[#d6ccba] border-y border-[#d6ccba]">{faq.map(([q,a])=><details key={q} className="py-5"><summary className="cursor-pointer pr-4 font-black">{q}</summary><p className="mt-4 max-w-3xl text-sm leading-8 text-neutral-700">{a}</p></details>)}</div></section>
    <section className="mx-auto max-w-5xl px-5 pb-12 sm:px-9"><h2 className="text-xl font-black">お申し込み前に</h2><p className="mt-4 text-sm leading-7 text-neutral-700">参加者1名ずつお申し込みください。保護者の参加同意・健康上の注意事項・緊急連絡先を確認します。参加日・現地の集合場所・宿泊条件を確認後、案内された決済方法を使用してください。既に決済済みの場合は再決済しないでください。送迎・昼食・宿泊の詳細はプランごとにご確認ください。</p><p className="mt-4 text-sm leading-7 text-neutral-700">キャンセル：最初の参加日の14日前までは返金不可の決済手数料を除き返金、13〜7日前は参加費の50%、6日前以降は100%。宿泊プランは発生済みの返金不可の宿泊費が差し引かれる場合があります。詳しい条件は公式フォームをご確認ください。</p><a href={form} target="_blank" rel="noreferrer" data-cta="kobe-form" className="mt-5 inline-block border-b border-black pb-1 text-sm font-black">公式フォーム・申込条件を確認する ↗</a></section>
    <aside className={styles.stickyInquiry} aria-label="参加相談"><div><p>たつの育成キャンプ｜11/21–23</p><span>半日・日帰り・通いも相談できます</span></div><a href={inquiry} data-cta="kobe-sticky-inquiry">無料で参加相談 ↗</a></aside>
    <footer className="border-t-4 border-[#9c6545] bg-[#e9dfce] px-5 py-10 text-center"><p className="text-xs font-black tracking-widest">RIOT BASKETBALL ACADEMY</p><p className="mt-4 text-3xl font-black">次の一歩を、たつので。</p><a href={inquiry} className="mt-6 inline-block bg-[#844a2c] px-6 py-4 font-black text-white" style={{color:"#fff"}}>無料の参加相談フォームへ ↗</a><p className="mt-4 text-sm">メールでもご相談いただけます：<a href="mailto:riot.training.base@gmail.com" className="underline">riot.training.base@gmail.com</a></p></footer>
  </main>;
}
