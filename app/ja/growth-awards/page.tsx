import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA GROWTH AWARDS｜クリニック後の挑戦を称える｜Riot Basketball Academy",
  description: "RBAクリニック・キャンプ参加者の挑戦、判断、成長を称えるプログラム。保護者から無料で成長レポートを申請できます。企業・地域パートナーも募集中。",
  alternates: { canonical: "/ja/growth-awards" },
  openGraph: { title: "RBA GROWTH AWARDS｜勝敗ではなく、次の一歩を。", description: "子どもの挑戦と成長を称え、次の学びにつなげるRBAの育成プログラム。", url: "/ja/growth-awards", locale: "ja_JP", type: "website" },
};

const reportUrl = "https://form.jotform.com/263184604186056";
const sponsorUrl = "https://form.jotform.com/263089038431054";
const ink = "#171d20";
const awards = [
  { code: "01 / CHALLENGE", title: "挑戦を称える", body: "クリニックで学んだことを、失敗を恐れず自分の練習や試合で試した行動を認めます。" },
  { code: "02 / GROWTH", title: "変化を見つける", body: "見る・判断する・実行する過程や、本人が気づいた改善を大切にします。上手い下手の順位はつけません。" },
  { code: "03 / TEAM IMPACT", title: "仲間との成長", body: "声かけ、協力、仲間の挑戦を支える行動など、周囲との前向きな関わりを称えます。" },
] as const;
const steps = [
  ["参加", "RBAのクリニックやキャンプで、学びや気づきを持ち帰る。"],
  ["実践", "所属チームや日常で一つ挑戦する。成功だけでなく失敗も記録する。"],
  ["報告", "保護者または成人本人が、無料の専用フォームから成長レポートを送る。"],
  ["確認・表彰", "RBAが参加履歴と内容を確認し、選考結果を保護者へ個別に案内する。"],
] as const;
const options = [
  { title: "GROWTH SUPPORTER", unit: "現物協賛", price: "必要な分だけ", body: "ノート、ペン、タオル、ボトル等、子どもが日常で使える品や製作・配送支援。" },
  { title: "COMMUNITY PARTNER", unit: "企画協賛", price: "3万円〜（提案目安）", body: "表彰状・教材制作、参加機会の補助など、合意した用途の支援。" },
  { title: "PROGRAMME PARTNER", unit: "プログラム協賛", price: "10万円〜（提案目安）", body: "複数回の育成活動・表彰・活動報告を一体で支える協賛。" },
  { title: "IMPACT PARTNER", unit: "継続協賛", price: "30万円〜（提案目安）", body: "年度を通じた育成機会の創出や、成長・活動実績の集計を支える協賛。" },
] as const;
const faq = [
  ["受賞には何点取る必要がありますか？", "得点・勝敗・参加回数では決めません。本人が何を学び、何を試したかを重視します。"],
  ["選ばれなければ成長していないのですか？", "いいえ。成長の価値と受賞は別です。結果はランキングとして公開しません。"],
  ["有料会員になる必要はありますか？", "ありません。申請は無料です。MY HOME COURTへの登録や有料プラン契約は申請条件ではありません。"],
  ["景品は必ずもらえますか？", "いいえ。提供内容・対象・選考人数・条件は、協賛確定と法令確認を経て別途正式に公表します。現時点では賞品の交付を約束しません。"],
  ["企業に子どもの情報が渡りますか？", "協賛企業に個別の申請内容・氏名・メールアドレスを提供しません。公開事例は別途同意を得た範囲に限ります。"],
] as const;
export default function GrowthAwardsPage() {
  return <SiteFrame locale="ja">
    <main lang="ja" style={{background:"#fff",color:ink}}>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-neutral-300 pb-5">
          <a href="/ja" className="flex items-center gap-3 font-black tracking-tight"><img src="/rba-logo-original.jpg" alt="RBA ロゴ" width="58" height="58" className="h-14 w-14 object-contain" /><span className="text-xs tracking-widest">RIOT BASKETBALL ACADEMY</span></a>
          <span className="text-xs font-bold tracking-[.2em]">GROWTH / EDUCATION</span>
        </div>
        <header className="max-w-4xl py-10 md:py-16">
          <p className="text-xs font-extrabold tracking-[.24em]">RBA GROWTH AWARDS / 2026–</p>
          <h1 className="mt-6 text-[clamp(2.6rem,7.1vw,5.8rem)] font-black leading-[1.23] tracking-tight">勝敗ではなく、<br/>次の一歩を称える。</h1>
          <p className="mt-7 max-w-3xl text-lg leading-9">クリニックは、参加した日で終わらない。学んだことを持ち帰り、試し、振り返る。その小さな挑戦を、RBAは見逃したくありません。</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={reportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center bg-neutral-900 px-6 py-3 font-bold text-white">成長レポートを無料で申請 ↗</a>
            <a href="#partners" className="inline-flex min-h-12 items-center justify-center border border-neutral-900 px-6 py-3 font-bold">企業・地域の協賛について ↓</a>
          </div>
          <p className="mt-4 text-sm leading-7 text-neutral-600">申請はRBAクリニック・キャンプ参加者向け。保護者または18歳以上の本人が手続きします。表彰・景品の交付を確約するものではありません。</p>
        </header>
        <section aria-labelledby="awards-why" className="border-t-2 border-neutral-900 py-12">
          <span className="text-xs font-bold tracking-[.2em]">WHY IT EXISTS</span>
          <h2 id="awards-why" className="mt-3 text-3xl font-black">勝った選手だけが、育った選手ではない。</h2>
          <p className="mt-5 max-w-4xl text-base leading-9">一歩目を変えた。仲間を見てパスを選んだ。ミスの後にもう一度挑戦した。指導者が教えたことを、自分の判断として実践した。結果が数字に出なくても、そうした行動には意味があります。RBA GROWTH AWARDSは、他者との比較ではなく本人の学びを伝える仕組みです。</p>
        </section>
        <section aria-labelledby="awards-types" className="py-8">
          <p className="text-xs font-bold tracking-[.2em]">THREE PERSPECTIVES</p>
          <h2 id="awards-types" className="mt-3 text-3xl font-black">3つの表彰テーマ</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">{awards.map(item=><article key={item.code} className="border border-neutral-300 bg-neutral-50 p-6"><p className="text-xs font-black tracking-widest">{item.code}</p><h3 className="mt-4 text-2xl font-black">{item.title}</h3><p className="mt-4 text-sm leading-8">{item.body}</p></article>)}</div>
        </section>
        <section aria-labelledby="awards-how" className="py-10">
          <p className="text-xs font-bold tracking-[.2em]">FROM CLINIC TO PRACTICE</p>
          <h2 id="awards-how" className="mt-3 text-3xl font-black">申請までの4ステップ</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">{steps.map(([title,body],i)=><article key={title} className="border-t-4 border-neutral-900 pt-5"><p className="text-xs font-black">0{i+1}</p><h3 className="mt-2 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7">{body}</p></article>)}</div>
          <div className="mt-8 border border-neutral-300 bg-neutral-50 p-6"><h3 className="text-xl font-black">応募の際に必要なもの</h3><p className="mt-3 text-sm leading-8">参加したイベント名・日付、保護者の連絡先、本人の言葉での学び、実際に挑戦したこと、次に試したいこと。写真・動画、住所、学校名、健康情報は申請時に求めません。</p><a className="mt-5 inline-flex min-h-12 items-center bg-neutral-900 px-6 py-3 font-bold text-white" target="_blank" rel="noopener noreferrer" href={reportUrl}>成長レポートを送る ↗</a></div>
        </section>
        <section id="partners" aria-labelledby="awards-partners" className="scroll-mt-24 border-t-2 border-neutral-900 py-14">
          <p className="text-xs font-bold tracking-[.2em]">PARTNERSHIP / SUPPORT</p>
          <h2 id="awards-partners" className="mt-3 text-3xl font-black leading-normal">企業の支援を、<br/>子どもの挑戦へ。</h2>
          <p className="mt-5 max-w-4xl text-base leading-9">商品の配布が目的ではありません。日々の練習で使える道具、振り返りの教材、参加しやすい環境を企業とつくります。物品協賛・印刷/配送協力・育成プログラム協賛など、実際の使い道が見える形でご提案します。</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">{options.map(item=><article key={item.title} className="border border-neutral-300 p-6"><p className="text-xs font-black tracking-widest">{item.title}</p><h3 className="mt-3 text-xl font-black">{item.unit}</h3><p className="mt-2 font-bold">{item.price}</p><p className="mt-4 text-sm leading-8">{item.body}</p></article>)}</div>
          <p className="mt-5 text-sm leading-7 text-neutral-600">金額は相談用の目安です。協賛・広告の税務、提供物品、掲載範囲、期間、レポート提出は契約で個別に決定。公式サイトの固定広告プランや全国ツアー協賛とは別案件として扱います。</p>
          <div className="mt-6 flex flex-wrap gap-4"><a href={sponsorUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center bg-neutral-900 px-6 py-3 font-bold text-white">協賛を無料で相談 ↗</a><a href="/ja/partners/brief" className="inline-flex min-h-12 items-center items-center font-bold underline underline-offset-4">RBA全体の協賛ご案内を見る →</a></div>
        </section>
        <section aria-labelledby="awards-report" className="border-t border-neutral-300 py-12">
          <h2 id="awards-report" className="text-3xl font-black">支援の成果は、活動で示す。</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{[["活動実施","実際の開催日・場所・実施内容"],["参加・挑戦","集計した申請件数・挑戦テーマ（個人を特定しない）"],["企業との合意","提供品の使用状況・許諾された掲載実績"]].map(([title,desc])=><article className="bg-neutral-50 p-6" key={title}><h3 className="font-black">{title}</h3><p className="mt-3 text-sm leading-7">{desc}</p></article>)}</div>
          <p className="mt-5 text-sm leading-8">実績数・広告効果は保証しません。子どもや保護者の氏名・連絡先・個別回答を協賛先へ提供しません。個人の活動事例や写真を公開する場合は、用途を説明した別途の同意を確認します。</p>
        </section>
        <section aria-labelledby="awards-faq" className="border-t border-neutral-300 py-12"><h2 id="awards-faq" className="text-3xl font-black">よくあるご質問</h2><div className="mt-6 divide-y divide-neutral-300 border-y border-neutral-300">{faq.map(([q,a])=><details key={q} className="group py-5"><summary className="cursor-pointer list-none font-bold">{q} ＋</summary><p className="mt-4 max-w-4xl text-sm leading-8 text-neutral-700">{a}</p></details>)}</div></section>
        <section className="bg-neutral-900 px-6 py-10 text-white md:px-10">
          <p className="text-xs font-bold tracking-[.2em]">MORE THAN BASKETBALL.</p>
          <h2 className="mt-3 text-3xl font-black leading-normal">次の一歩を、子どもたちへ。</h2>
          <p className="mt-4 max-w-3xl leading-8">保護者は無料で成長レポートを提出できます。継続して学びを記録したい方はMY HOME COURTもご利用ください（任意）。</p>
          <div className="mt-6 flex flex-wrap gap-4"><a href={reportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center bg-white px-6 py-3 font-bold text-neutral-900">成長を報告する ↗</a><a href="/ja/my-homecourt" className="inline-flex min-h-12 items-center font-bold underline underline-offset-4">MY HOME COURTを見る →</a></div>
        </section>
        <p className="mt-8 text-xs leading-7 text-neutral-600">個人情報・安全性・表彰の詳細は審査体制と協賛条件が整い次第ご案内します。正式な景品企画開始前に景品表示法等の適用を確認します。お問い合わせ：<a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
      </div>
    </main>
  </SiteFrame>;
}
