import type { Metadata } from "next";
import styles from "@/components/clinic-reflection.module.css";
import { SiteFrame } from "@/components/site-frame";
import { ClinicReflection } from "@/components/clinic-reflection";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import Link from "next/link";

export const metadata: Metadata = {
  title: "クリニック参加後の振り返り・次の練習へ｜RBA",
  description: "RBAの参加後に、気づいたことと次に試すことを整理する無料の振り返り。保護者の声かけ例、次回参加、地域開催・チーム開催の相談へ。登録不要。",
  alternates: { canonical: "/ja/after-clinic" },
  openGraph: { title: "参加した日の学びを、次の練習へ｜RBA", description: "振り返る。一つ試す。次の機会を選ぶ。登録不要の振り返りメモと保護者の声かけ例。", url: "/ja/after-clinic", locale: "ja_JP", type: "website" },
};

export default function Page() {
  return <div className={styles.printScope}><SiteFrame locale="ja"><GrowthClickTracking />
    <div className="mx-auto max-w-5xl px-5 py-10 text-[#10233f] md:px-8">
      <a href="/ja" className="text-sm underline underline-offset-4">← RBAトップ</a>
      <header className="my-8"><p className="text-xs font-bold tracking-widest">AFTER THE CLINIC</p><h1 className="mt-4 text-3xl font-bold leading-relaxed md:text-5xl">参加した日の学びを、<br/>次の練習へ。</h1><p className="mt-5 max-w-3xl leading-8">楽しかったこと、難しかったこと、もう一度試したいこと。全部を一度に直そうとせず、選手自身が次に取り組みたいことを一つ選びましょう。初めて参加した方も、久しぶりの方も、登録なしで使えます。</p></header>
      <section className="my-6 border border-slate-300 bg-slate-50 p-6"><h2 className="text-xl font-bold">ここから、保護者・指導者と一緒に。</h2><p className="my-3 leading-8">下の振り返りから、次に試すこと・周りの役割・振り返る日を一枚の計画にできます。地域で続ける方法から、キャンプや海外交流まで、目的に合わせて相談できます。</p><a href="/ja/development-projects#plan" className="inline-flex min-h-12 items-center font-bold underline" data-growth-id="reflection-development-project">次の一歩を一緒に考える →</a></section>
      <section className="my-8 rounded-xl border border-[#10233f] bg-[#10233f] p-6 text-white md:p-8" aria-labelledby="clinic-rba-id">
        <p className="text-xs font-bold tracking-widest text-slate-300">BASKETBALL PASSPORT / 無料RBA ID</p>
        <h2 id="clinic-rba-id" className="mt-3 text-2xl font-bold leading-relaxed md:text-3xl">その日の経験を、次の挑戦につなげる。</h2>
        <p className="mt-4 max-w-3xl leading-8">RBAのクリニックに参加した方へ。無料のRBA IDを作ると、MY HOME COURTからお子さまの参加経験や次の目標を記録し、次回の育成機会を探せます。現在の所属チームはそのまま。入会金や月額料金は必要ありません。</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href="/ja/my-homecourt/login?source=after-clinic" data-growth-id="after-clinic-free-rba-id" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 py-3 text-center font-bold text-[#10233f]">保護者が無料でRBA IDを作る →</a>
          <a href="/ja/home-court" data-growth-id="after-clinic-free-details" className="inline-flex min-h-12 items-center underline underline-offset-4">無料と有料の違いを見る</a>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300">メールアドレスを入力して、届いたログインリンクを開くだけ。お子さまの利用は保護者の方と一緒に進めてください。有料のHOMECOURT PLUSは任意です。下の振り返りメモは自動でアカウントに保存されないため、必要に応じてコピーしてください。</p>
      </section>
      <ClinicReflection />
      <section className="my-8 border border-slate-300 bg-slate-50 p-6 md:p-8" aria-labelledby="clinic-feedback">
        <p className="text-xs font-bold tracking-widest">YOUR VOICE / 90 SECONDS</p>
        <h2 id="clinic-feedback" className="mt-3 text-2xl font-bold">次のクリニックを、一緒に良くする。</h2>
        <p className="mt-3 leading-8">楽しかったことも、申込・決済・運営で困ったことも教えてください。率直な意見を次回の開催や教材づくりに活かします。名前や連絡先は不要です。</p>
        <a className="mt-5 inline-flex min-h-12 items-center bg-[#10233f] px-5 py-3 font-bold text-white" href="https://form.jotform.com/263285106552052" data-growth-id="after-clinic-feedback" target="_blank" rel="noopener noreferrer">90秒のアンケートに回答する ↗</a>
      </section>
      <section className="my-8 border border-slate-300 p-6 md:p-8" aria-labelledby="clinic-support">
        <p className="text-xs font-bold tracking-widest">LEARN / SUPPORT</p>
        <h2 id="clinic-support" className="mt-3 text-2xl font-bold">育成を学ぶ。次の世代を応援する。</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <article className="border border-slate-300 p-5"><h3 className="font-bold">活動応援メンバー</h3><p className="mt-2 text-2xl font-bold">月500円<span className="text-sm">（税込）</span></p><p className="mt-3 leading-7">全国の育成活動を支え、活動報告を受け取る。</p></article>
          <article className="border border-slate-300 p-5"><h3 className="font-bold">育成を学ぶメンバー</h3><p className="mt-2 text-2xl font-bold">月1,000円<span className="text-sm">（税込）</span></p><p className="mt-3 leading-7">活動応援に加え、保護者・指導者向けの育成記事を読む。</p></article>
        </div>
        <a className="mt-5 inline-flex min-h-12 items-center bg-[#10233f] px-5 py-3 font-bold text-white" href="https://note.com/rba_official/membership/join" data-growth-id="after-clinic-note-support" target="_blank" rel="noopener noreferrer">公式noteでプランを確認する ↗</a>
        <p className="mt-4 text-sm leading-7">成人・保護者向けの任意の月額契約です。noteで別途申し込み、自動更新・解約条件をご確認ください。加入済みの方は再加入不要です。クリニック参加や指導評価には影響しません。</p>
        <Link className="mt-3 inline-flex min-h-12 items-center font-bold underline" href="/ja/homecourt-plus" data-growth-id="after-clinic-plus">成長記録・実践教材を継続して使う：HOMECOURT PLUS →</Link>
      </section>
      <section className="py-10" aria-labelledby="parent-guide"><h2 id="parent-guide" className="text-2xl font-bold">保護者の方へ。まずは、本人の言葉を聞く。</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{[
        ["帰り道は、感想から", "「どんなことが楽しかった？」「もう一度やってみたいことは？」。その場で答えが出なくても、急いで結論を出す必要はありません。"],
        ["次の練習で、一つ試す", "本人が選んだことを大切に。「何点取った？」だけでなく、「試してみて、どうだった？」と聞いてみましょう。"],
        ["できたことと、迷ったこと", "成功・失敗だけで評価せず、その時に何を見て、どう選んだかを聞く。技術の助言は、本人の希望も聞きながら指導者に相談できます。"],
      ].map(([title,body]) => <article className="border border-slate-300 p-5" key={title}><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-7">{body}</p></article>)}</div><p className="mt-4 text-xs leading-6 text-slate-600">RBAからの声かけ例です。年齢や本人の気持ちに合わせてご活用ください。</p></section>
      <section className="border-t border-slate-300 py-10" aria-labelledby="next-step"><h2 id="next-step" className="text-2xl font-bold">次の一歩は、目的に合わせて。</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{[
        ["また参加したい", "募集中の活動から、日程・対象・会場・費用を確認できます。", "/ja/opportunities", "次回の活動を探す", "return-programmes"],
        ["自分の地域でも開催してほしい", "次回の日程が出ていない地域は、無料で開催希望を登録できます。", "/ja/clinic-interest", "開催希望を登録する", "return-interest"],
        ["チームのみんなと学びたい", "訪問指導や継続支援の内容を確認し、成人の担当者から相談できます。", "/ja/team-development", "チーム開催・継続支援を見る", "return-team"],
        ["学びや経験を残したい", "RBA IDを使う活動記録は、MY HOME COURTから。利用方法を確認できます。", "/ja/my-homecourt", "MY HOME COURTを見る", "return-record"],
        ["所属チームの外で挑戦したい", "大会・遠征・国際交流ごとに期間限定のチームで参加するRBA UNITED。対象、費用、参加条件を確認できます。", "/ja/united", "RBA UNITEDを見る", "return-united"],
      ].map(([title,body,href,cta,id]) => <article key={id} className="flex flex-col border border-slate-300 p-6"><h3 className="text-lg font-bold">{title}</h3><p className="my-3 text-sm leading-7">{body}</p><a className="mt-auto inline-flex min-h-12 items-center font-bold underline underline-offset-4" href={id==="return-record"?"/ja/my-homecourt/login?source=after-clinic":href} data-growth-id={id}>{cta} →</a></article>)}</div><p className="mt-5 text-sm leading-7">開催希望登録は、参加申込ではありません。開催を計画できる場合に条件をご案内します。海外との交流に関心がある方は、<a className="underline underline-offset-4" href="/ja/international" data-growth-id="return-international">交流の考え方と相談窓口</a>をご覧ください。</p></section>
      <section className="border-t border-slate-300 py-8"><h2 className="text-xl font-bold">チームを離れても、続け方は考えられる。</h2><p className="mt-4 leading-8">今の環境が合わない時は、休むことも含めて本人の気持ちを聞き、一緒に次の機会を探しましょう。スクールやクリニックの参加条件と、公式大会の選手登録・移籍条件はそれぞれ確認が必要です。</p><a className="mt-4 inline-flex min-h-12 items-center font-bold underline underline-offset-4" href="/ja/contact" data-growth-id="return-consult">参加について相談する →</a></section>
    </div>
  </SiteFrame></div>;
}
