import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "たつの育成キャンプ 2026｜開催終了",
  description: "兵庫県たつの市での11月の育成キャンプは終了しました。ご参加いただいた選手、ご協力いただいた皆さま、ありがとうございました。",
  alternates: { canonical: "/ja/events/kobe-development-camp-2026" },
};

export default function TatsunoCampArchive() {
  return (
    <SiteFrame locale="ja">
      <section className="section-pad">
        <p className="section-index">HYOGO / TATSUNO · NOVEMBER 2026</p>
        <h1>たつの育成キャンプ 2026｜開催終了</h1>
        <p>兵庫県たつの市での11月の育成キャンプは終了しました。ご参加いただいた選手、ご協力いただいた皆さま、ありがとうございました。</p>
        <p><a className="button button-dark" href="/ja/schedule">今後の開催予定を見る</a></p>
        <details><summary>開催時のキャンセル条件</summary><p>最初の参加日の14日前までは返金不可の決済手数料を除き返金、13〜7日前は参加費の50%、6日前以降は100%。宿泊プランは発生済みの返金不可の宿泊費が差し引かれる場合があります。詳しい条件は公式フォームをご確認ください。</p></details>
        <p><a href="/ja/contact">参加済みの方のお問い合わせ</a></p>
      </section>
    </SiteFrame>
  );
}
