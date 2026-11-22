import type { Metadata } from "next";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "神戸男子U14国際交流｜申込・決済停止中｜RBA",
  description: "この案件は現在無料の参加意向登録のみ受付中です。決済受付は開始していません。",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <main className="min-h-screen bg-[#f8f3ec] px-5 py-20 text-black">
    <section className="mx-auto max-w-2xl border-2 border-black bg-white p-8">
      <p className="text-xs font-black tracking-widest">RIOT BASKETBALL ACADEMY / KOBE 2027</p>
      <h1 className="mt-6 text-3xl font-black">現在、決済受付は行っていません</h1>
      <p className="mt-5 leading-8">会場承認、対象年齢、提供内容、返金条件および保護者書面同意が整うまで、申込の確定と決済は行いません。ここにアクセスしただけでは支払いが完了したことになりません。</p>
      <p className="mt-4 leading-8">既に何らかの支払履歴があるとお考えの場合、二重決済をせずRBA事務局にご確認ください。</p>
      <Link href="/ja/events/kobe-boys-u14-exchange-2027" className="mt-7 inline-block bg-black px-5 py-3 font-bold text-white">国際交流の概要に戻る</Link>
    </section>
  </main>;
}
