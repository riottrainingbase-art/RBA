import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

const canonical = "https://riotbasketballacademy.com/ja/events/nikaho-clinic-2027";

export const metadata: Metadata = {
  title: "にかほ育成クリニック 2027年4月11日｜小学生対象・開催予定｜RBA",
  description: "2027年4月11日（日）13:30〜16:30、秋田県にかほ市で小学生のみを対象とするRBA育成クリニックを開催予定。平沢男子・象潟男子・にかほ女子との地域合同クリニックを調整中。お問い合わせはにかほバスケットボール協会まで。",
  alternates: { canonical },
  openGraph: {
    title: "にかほ育成クリニック｜2027年4月11日（日）",
    description: "小学生のみ対象。13:30〜16:30開催予定。詳細・お問い合わせはにかほバスケットボール協会まで。",
    url: canonical,
    locale: "ja_JP",
    type: "website",
    siteName: "Riot Basketball Academy",
  },
};

const facts = [
  ["開催予定日", "2027年4月11日（日）"],
  ["予定時間", "13:30〜16:30"],
  ["対象", "小学生のみ（男女）"],
  ["開催地", "秋田県にかほ市"],
  ["会場", "平沢小学校体育館を候補として調整中／正式な利用許可未確認"],
  ["合同参加予定", "平沢男子・象潟男子・にかほ女子（調整中）"],
  ["参加費・参加方法", "未確定。地域主催者の正式案内をご確認ください"],
] as const;

const themes = [
  ["01", "技術", "姿勢・フットワーク・ボール操作を、実際のプレーに結びつける。"],
  ["02", "判断", "相手と味方を見て、選び、動く。"],
  ["03", "空間認識", "間合い・スペース・サポートの原則を学ぶ。"],
  ["04", "実戦への応用", "少人数ゲームで試し、考え、仲間と学び合う。"],
] as const;

export default function NikahoElementaryClinicPage() {
  return (
    <SiteFrame locale="ja">
      <main className="bg-[#f6f3ec] text-[#161616]">
        <header className="bg-[#ff741f] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <a href="/ja/schedule" className="text-sm font-bold underline underline-offset-4">← 開催予定一覧へ</a>
            <p className="mt-12 text-xs font-black tracking-[.2em]">RBA / NIKAHO DEVELOPMENT CLINIC</p>
            <h1 className="mt-5 text-[clamp(2.5rem,7vw,5.4rem)] font-black leading-[1.12] tracking-[-.045em]">
              にかほ<br/>育成クリニック
            </h1>
            <p className="mt-7 border-y-4 border-black py-4 text-xl font-black sm:text-3xl">
              2027年4月11日（日）<br/>13:30〜16:30
            </p>
            <p className="mt-5 text-lg font-black">小学生のみ対象（男女）／開催予定</p>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8">
              技術だけではなく、見る・考える・判断する力を。
              地域の仲間と、実戦につながるバスケットボールを学ぶクリニックです。
            </p>
            <p className="mt-7 border-l-4 border-black bg-white p-5 text-sm font-bold leading-7">
              現在、地域主催者と開催条件を調整中です。会場・参加費・対象学年の詳細・受付方法は正式確定前のため、参加枠の予約や有料申込は受け付けていません。
            </p>
          </div>
        </header>
        <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16" aria-labelledby="nikaho-facts">
          <p className="text-xs font-black tracking-widest text-[#a74910]">EVENT INFORMATION</p>
          <h2 id="nikaho-facts" className="mt-2 text-3xl font-black">開催概要（予定）</h2>
          <dl className="mt-7 grid gap-px border border-black/15 bg-black/15 sm:grid-cols-2">
            {facts.map(([label, value]) => (
              <div key={label} className="bg-white p-5">
                <dt className="text-xs font-black text-neutral-600">{label}</dt>
                <dd className="mt-2 text-base font-bold leading-7">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="bg-white px-5 py-12 sm:py-16" aria-labelledby="nikaho-learning">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black tracking-widest text-[#a74910]">SKILL × DECISION</p>
            <h2 id="nikaho-learning" className="mt-2 text-3xl font-black">技術を、試合で使える力に。</h2>
            <p className="mt-4 max-w-3xl leading-8">
              小学生の発達段階や経験に合わせ、1対1や少人数ゲームなどを活用する予定です。
              正式な実施内容は、参加人数と現地指導体制を確認して決定します。
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {themes.map(([num, title, note]) => (
                <article key={num} className="border-2 border-black p-5">
                  <span className="text-sm font-black text-[#a74910]">{num} / DEVELOPMENT</span>
                  <h3 className="mt-2 text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7">{note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#ff741f] px-5 py-12 sm:py-16" aria-labelledby="nikaho-contact">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-black tracking-widest">CONTACT / LOCAL ORGANIZER</p>
            <h2 id="nikaho-contact" className="mt-3 text-3xl font-black sm:text-4xl">詳細・お問い合わせ</h2>
            <p className="mt-5 border-y-4 border-black bg-white px-5 py-6 text-xl font-black leading-8 sm:text-2xl">
              にかほバスケットボール協会
            </p>
            <p className="mt-5 max-w-3xl text-sm font-bold leading-7">
              会場・参加条件・申込方法・参加費については、にかほバスケットボール協会の正式案内をご確認ください。
              RBA公式サイト上では参加受付・決済を行っていません。募集開始は協会からの正式案内をご確認ください。
            </p>
            <a href="/ja/schedule" className="mt-7 inline-flex min-h-12 items-center border-2 border-black bg-black px-6 font-bold text-white">
              RBA開催予定一覧へ戻る →
            </a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
