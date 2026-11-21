import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "八戸ミニバスクリニック 開催準備中 | Riot Basketball Academy",
  description: "青森県八戸市で小学生向けのバスケットボールクリニックを準備しています。",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <SiteFrame locale="ja" languagePage="contact">
      <div lang="ja" className="mx-auto max-w-4xl space-y-10 px-5 py-12 sm:px-8 sm:py-20">
        <header className="space-y-4">
          <p className="text-sm font-bold">青森県八戸市 · 開催準備中</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">八戸ミニバスクリニック</h1>
          <p className="max-w-2xl text-lg leading-relaxed">
            小学生の男女を対象に、八戸市でRBAのクリニックを準備しています。
            日程と会場は、地区大会の日程と体育館の利用枠を確認してからお知らせします。
          </p>
        </header>
        <section aria-labelledby="program" className="space-y-4">
          <h2 id="program" className="text-2xl font-bold">練習内容の予定</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="rounded-xl border p-5">
              <h3 className="font-bold">小学1〜3年生</h3>
              <p className="mt-2">止まる、方向を変える、空いている場所を見つける。少人数ゲームで試します。</p>
            </li>
            <li className="rounded-xl border p-5">
              <h3 className="font-bold">小学4〜6年生</h3>
              <p className="mt-2">1対1の仕掛けと2対1の判断を練習し、3対3で生かします。</p>
            </li>
          </ul>
        </section>
        <section aria-labelledby="faq" className="space-y-3">
          <h2 id="faq" className="text-2xl font-bold">よくある質問</h2>
          <details className="rounded-xl border p-4">
            <summary className="cursor-pointer font-bold">チームに所属していなくても参加できますか？</summary>
            <p className="mt-3">チームへの所属を問わず、個人で参加できるクリニックとして準備しています。</p>
          </details>
          <details className="rounded-xl border p-4">
            <summary className="cursor-pointer font-bold">日程・会場・参加費はいつ分かりますか？</summary>
            <p className="mt-3">体育館の利用枠と地域の大会日程を確認後、学年別の時間、参加費、持ち物とあわせてご案内します。</p>
          </details>
          <details className="rounded-xl border p-4">
            <summary className="cursor-pointer font-bold">開催案内を希望すると参加が確定しますか？</summary>
            <p className="mt-3">開催案内の希望を受け付けます。参加枠は、開催確定後の正式な申込手続きで確保できます。</p>
          </details>
        </section>
        <section aria-labelledby="interest" className="space-y-3">
          <h2 id="interest" className="text-2xl font-bold">開催案内を希望する方へ</h2>
          <p>お問い合わせに「八戸クリニック・開催案内希望」と、お子さまの学年を添えてください。正式な参加申込は日程確定後にご案内します。</p>
          <Link href="/ja/contact" className="inline-flex min-h-11 items-center rounded-lg border px-5 py-3 font-bold underline underline-offset-4">
            RBAへ開催案内を希望する
          </Link>
        </section>
      </div>
    </SiteFrame>
  );
}
