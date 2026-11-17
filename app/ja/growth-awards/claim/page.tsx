import type { Metadata } from "next";
import Link from "next/link";

const claimForm = "https://form.jotform.com/263204721370044";

export const metadata: Metadata = {
  title: "受賞記念品のお受け取り | RBA GROWTH AWARDS",
  description: "RBAから受賞記念品の案内を受け取った保護者向けの受け取り窓口です。",
  robots: { index: false, follow: false },
};

export default function AwardClaimPage() {
  return (
    <main lang="ja" className="min-h-screen bg-neutral-100 px-5 py-10 text-neutral-900 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/ja/growth-awards" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
          ← GROWTH AWARDSへ戻る
        </Link>
        <section className="mt-4 bg-neutral-900 px-6 py-9 text-white sm:p-12">
          <p className="text-xs font-bold tracking-widest text-lime-300">RBA GROWTH AWARDS</p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">受賞記念品のお受け取り</h1>
          <p className="mt-5 leading-relaxed">受賞おめでとうございます。RBAから受取コードをお知らせした保護者の方はこちらからお手続きください。</p>
          <a className="mt-6 inline-flex min-h-12 items-center bg-lime-300 px-5 py-3 font-bold text-black" href={claimForm}>受け取り手続きへ</a>
        </section>
        <section className="mt-5 border border-neutral-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold">お手続きの流れ</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 leading-relaxed">
            <li>受賞案内に記載の受取コードと、保護者のメールアドレスを用意します。</li>
            <li>フォームを送信します。サイズ選択の案内がある場合は希望サイズを入力してください。</li>
            <li>RBAが受賞記録と照合し、受け取り方法を個別にお知らせします。</li>
          </ol>
          <p className="mt-5 text-sm leading-relaxed">コードが届いていない場合や案内内容の確認は <a className="underline" href="mailto:riot.training.base@gmail.com">RBA運営窓口</a> へご連絡ください。</p>
        </section>
      </div>
    </main>
  );
}
