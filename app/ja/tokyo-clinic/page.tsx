import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

const interestForm = "https://form.jotform.com/263123746011043";

export const metadata: Metadata = {
  title: "東京 U12・U15 育成クリニック｜2027年春・無料先行案内｜RBA",
  description:
    "Riot Basketball Academyの東京U12・U15育成クリニックを2027年春に開催検討中。会場・正式日時・参加費は未確定です。保護者・指導者の無料先行案内希望を受付。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/tokyo-clinic" },
  robots: { index: true, follow: true },
};

const proposedDates = [
  { date: "2027年4月4日（日）", description: "第一候補・未確定" },
  { date: "2027年4月3日（土）", description: "代替候補・未確定" },
  { date: "2027年4月11日（日）", description: "代替候補・未確定" },
];

const learning = [
  {
    title: "見る・判断する",
    description: "守備者や味方の位置を見て、選択肢を自分で判断する。",
  },
  {
    title: "技術を試合につなぐ",
    description: "ドリブルやシュートを、実際のゲーム場面で使えるように。",
  },
  {
    title: "チャレンジできる環境",
    description: "成功と失敗の両方を学びにして、自分で考える経験を増やす。",
  },
];

const details = [
  ["対象", "U12・U15を想定。2027年度の新学年で確認します。"],
  ["形式", "年代別に時間帯を分けた対面クリニックを検討中。"],
  ["会場", "東京都内の体育館へ利用条件・空き状況を照会中。未確保。"],
  ["開催日", "上記3候補から、大会・会場・希望調査を踏まえて決定。"],
  ["費用", "未定。正式募集時に税込金額とキャンセル条件を案内。"],
  ["現在の受付", "無料の先行案内希望のみ。参加申込・予約・決済ではありません。"],
];

export default function TokyoClinicInterestPage() {
  return (
    <SiteFrame locale="ja">
      <div className="bg-[#fcfaf7] text-[#10233f]">
        <section className="border-b border-[#e8e0d6] px-5 py-12 md:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-xs font-extrabold tracking-[.16em] text-[#996842]">
              RBA TOKYO / 2027 SPRING · PLANNING
            </p>
            <p className="mb-5 inline-block rounded bg-[#eee8de] px-3 py-1 text-xs font-extrabold">
              開催検討中・会場未確保・参加費未定
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.32] tracking-[-.045em] md:text-6xl">
              東京で、もっと考えるバスケを。
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#4a5a6c] md:text-lg">
              Riot Basketball Academy（RBA）は、2027年春に東京でU12・U15向けの育成クリニックを計画しています。
              技術の反復だけでなく、選手が見て、判断し、試せる練習を大切にします。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={interestForm}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center rounded-lg bg-[#10233f] px-7 text-center text-base font-extrabold text-white no-underline hover:bg-[#284866]"
                data-growth-id="tokyo-clinic-interest-hero"
              >
                無料の先行案内を希望する →
              </a>
              <a
                href="#schedule"
                className="flex min-h-14 items-center justify-center rounded-lg border border-[#9eaab7] bg-white px-7 text-base font-bold text-[#10233f] no-underline hover:bg-[#f2f4f6]"
              >
                日程・開催状況を確認する ↓
              </a>
            </div>
            <p className="mt-4 text-xs leading-6 text-[#536275]">
              先行案内への登録は無料です。開催・参加・席の確保を保証せず、現段階で費用は発生しません。
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-5">
          <section className="py-12 md:py-16" id="schedule">
            <p className="text-xs font-extrabold tracking-[.13em] text-[#996842]">DATE / 開催候補</p>
            <h2 className="mt-3 text-3xl font-black">日程は、選手の試合と重ならないように決めます。</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526273]">
              以下はすべて検討中の候補です。東京都内のU12・U15大会、各チームの予定、
              体育館の利用条件、参加希望を確認して決定します。大会と重複しないことを現時点で保証するものではありません。
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {proposedDates.map((option) => (
                <div className="rounded-xl border border-[#dbe0e4] bg-white p-5" key={option.date}>
                  <p className="text-xs font-bold text-[#976238]">{option.description}</p>
                  <p className="mt-2 text-xl font-extrabold">{option.date}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-[#e8e0d6] py-12 md:py-16">
            <p className="text-xs font-extrabold tracking-[.13em] text-[#996842]">PROGRAMME / 育成テーマ</p>
            <h2 className="mt-3 text-3xl font-black">子どもが考える時間を増やす。</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {learning.map((item) => (
                <article className="rounded-xl bg-[#eff2f6] p-6" key={item.title}>
                  <h3 className="text-lg font-extrabold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#526273]">{item.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-4 text-xs leading-6 text-[#647488]">
              上記はRBAの育成方針に基づく企画案であり、正式な当日メニューや担当コーチの確定情報ではありません。
            </p>
          </section>

          <section className="border-t border-[#e8e0d6] py-12 md:py-16" id="details">
            <h2 className="text-3xl font-black">現在決まっていること・まだ決まっていないこと</h2>
            <dl className="mt-7 divide-y divide-[#e4e8ee] border-y border-[#e4e8ee]">
              {details.map(([label, value]) => (
                <div className="grid gap-2 py-4 sm:grid-cols-[150px_1fr]" key={label}>
                  <dt className="text-sm font-extrabold">{label}</dt>
                  <dd className="m-0 text-sm leading-7 text-[#526273]">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-10 rounded-2xl bg-[#10233f] px-6 py-10 text-white md:px-10" aria-labelledby="tokyo-interest-cta">
            <p className="text-xs font-extrabold tracking-[.15em] text-[#f9bf8c]">FREE EARLY INTEREST / 無料先行案内</p>
            <h2 id="tokyo-interest-cta" className="mt-3 text-3xl font-black leading-tight">
              参加したいと思ったら、まず希望だけ教えてください。
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#d8e2ec]">
              開催が正式決定した場合、登録した成人の連絡先へ詳細を案内します。
              チームの皆さまも、必要と思われる保護者や指導者へこの公開ページを任意で共有できます。
              選手名簿や未成年者の個人情報の提出は不要です。
            </p>
            <a
              href={interestForm}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-14 items-center justify-center rounded-lg bg-white px-7 text-base font-extrabold text-[#10233f] no-underline hover:bg-[#f0f1f2]"
              data-growth-id="tokyo-clinic-interest-footer"
            >
              無料の先行案内を希望する →
            </a>
            <p className="mt-4 text-xs leading-6 text-[#d8e2ec]">決済・参加確定・先着順の優先枠確保ではありません。</p>
          </section>

          <nav className="flex flex-wrap gap-6 border-t border-[#e8e0d6] py-8 text-sm font-bold">
            <Link href="/ja/clinic-interest" className="underline underline-offset-4">他の地域の開催希望</Link>
            <Link href="/ja/opportunities" className="underline underline-offset-4">募集中の活動を見る</Link>
            <Link href="/ja/policies" className="underline underline-offset-4">プライバシー・利用規約</Link>
          </nav>
        </div>
      </div>
    </SiteFrame>
  );
}
