import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

const base = "https://riotbasketballacademy.com";
const application = "https://form.jotform.com/263223688314055?utm_source=rba_site&utm_medium=event_page&utm_campaign=nikaho_20270411";
const path = "/ja/events/nikaho-clinic-2027";

export const metadata: Metadata = {
  title: "【先行案内受付】2027年4月11日 にかほ市RBA育成クリニック｜秋田",
  description: "秋田県にかほ市で2027年4月11日（日）にRBA育成クリニックを計画中。平沢男子・象潟男子・にかほ女子など地域の育成年代を対象とし、13:30〜16:30を予定。会場・参加条件は最終調整中。無料の先行案内登録を受付。",
  alternates: { canonical: base + path },
  openGraph: { title: "にかほで、次の判断を。｜RBA育成クリニック 2027", description: "4月11日（日）開催に向け調整中。先行案内希望は無料で登録できます。", url: base + path, type: "website", locale: "ja_JP", images: ["/rba-court-hero.png"] },
  twitter: { card: "summary_large_image", title: "にかほで、次の判断を。｜RBA育成クリニック 2027", images: ["/rba-court-hero.png"] },
};
const topics = [
  ["MOVE", "次の動きにつながる身体の使い方", "ただ反復するだけではなく、状況に応じて止まる・方向を変える・動き直すことを考えます。"],
  ["READ", "相手と味方を見て選ぶ", "1対1での駆け引きや、スペースを見つける判断を実際のプレーで試します。"],
  ["PLAY", "ゲームに生きる学びへ", "ドリブルやシュートを目的化せず、プレーの中で使える技術と判断をつなげます。"],
] as const;

export default function NikahoClinicPage() {
  return <SiteFrame locale="ja">
    <div className="bg-[#f7f4ee] text-[#191919]">
      <section className="bg-[#151515] text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <a href="/ja/schedule" className="text-sm font-bold underline underline-offset-4 text-white/80">← クリニック開催予定</a>
          <p className="mt-12 text-xs font-black tracking-[.24em] text-[#ff8a4b]">RBA DEVELOPMENT CLINIC / NIKAHO 2027</p>
          <h1 className="mt-5 text-[clamp(2.8rem,7vw,5.8rem)] font-black leading-[1.08] tracking-[-.05em]">にかほで、<br/>次の判断を。</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9">ボールを扱うだけでは終わらない。相手と味方を見て、考え、選ぶ。ゲームの中で生きるバスケットボールを、秋田の子どもたちと。</p>
          <div className="mt-8 max-w-3xl border-l-4 border-[#ff8a4b] bg-white/10 p-5">
            <p className="font-black text-[#ffbc97]">開催に向けて最終調整中／正式な参加募集・決済は未開始</p>
            <p className="mt-2 text-sm leading-7">日程は地域主催者と4月11日（日）で合意していますが、会場の利用許可、参加条件、当日の進行・参加費は正式発表前です。現在は無料の先行案内希望登録のみ受け付けます。</p>
          </div>
          <a href={application} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-14 items-center bg-[#ff762d] px-7 py-4 text-center text-base font-black text-black hover:bg-[#ffa074]">先行案内を無料で受け取る ↗</a>
          <p className="mt-3 text-xs leading-6 text-white/70">登録だけでは予約確定・参加枠確保・料金請求になりません。</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-xs font-black tracking-[.17em] text-[#b5571e]">EVENT INFORMATION</p>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">開催概要（調整中）</h2>
        <dl className="mt-8 grid gap-px border border-black/15 bg-black/15 sm:grid-cols-2">
          {[
            ["開催予定日", "2027年4月11日（日）"],
            ["時間帯", "13:30〜16:30（予定・最終調整中）"],
            ["開催地", "秋田県にかほ市"],
            ["会場", "平沢小学校体育館を候補として調整中／未確保"],
            ["対象", "地域の育成年代（学年・参加条件調整中）"],
            ["地域参加チーム", "平沢男子・象潟男子・にかほ女子（調整中）"],
            ["参加費・定員", "地域主催者による正式案内をお待ちください"],
            ["受付状況", "無料の先行案内登録のみ"],
          ].map(([label,value])=><div className="bg-white px-5 py-5" key={label}><dt className="text-xs font-black text-neutral-600">{label}</dt><dd className="mt-2 text-base font-bold leading-7">{value}</dd></div>)}
        </dl>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-xs font-black tracking-[.17em] text-[#b5571e]">THE DEVELOPMENT EXPERIENCE</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">上手く見せる練習より、<br/>上手くなる経験を。</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{topics.map(([eyebrow,title,note])=><article key={eyebrow} className="border border-black/15 bg-[#f9f6ef] p-6"><p className="text-xs font-black tracking-widest text-[#b5571e]">{eyebrow}</p><h3 className="mt-3 text-xl font-black leading-8">{title}</h3><p className="mt-4 text-sm leading-7 text-neutral-700">{note}</p></article>)}</div>
          <p className="mt-7 max-w-3xl text-sm leading-8 text-neutral-700">発育発達段階や競技経験に応じ、内容を調整します。プログラムは現地の人数・学年・指導体制を確認後に確定します。</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <h2 className="text-3xl font-black sm:text-4xl">正式募集の案内を受け取る</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8">会場・募集人数・参加料金・参加方法が決まり次第、登録いただいた保護者へ案内します。無料登録は正式な参加申込や決済ではありません。</p>
        <a href={application} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center bg-black px-8 py-4 font-black text-white">無料で先行案内登録 ↗</a>
        <p className="mt-7 text-sm">お問い合わせ：<a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
      </section>
    </div>
  </SiteFrame>;
}
