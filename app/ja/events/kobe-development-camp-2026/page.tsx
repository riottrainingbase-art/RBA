import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "たつの育成キャンプ 2026｜開催終了",
  description: "11月のたつの育成キャンプは終了しました。参加してくれた選手の皆さん、支えてくださった保護者・地元チームの皆さん、ありがとうございました。",
  alternates: { canonical: "/ja/events/kobe-development-camp-2026" },
};

export default function TatsunoCampArchive() {
  return (
    <SiteFrame locale="ja">
      <section className="section-pad">
        <p className="section-index">HYOGO / TATSUNO · NOVEMBER 2026</p>
        <h1>たつの育成キャンプ 2026｜開催終了</h1>
        <p>11月のたつの育成キャンプは終了しました。参加してくれた選手の皆さん、支えてくださった保護者・地元チームの皆さん、ありがとうございました。</p>
        <p><a className="button button-dark" href="/ja/schedule">今後の開催予定を見る</a></p>
        <details><summary>開催時にご案内した練習日程</summary><p>11/21・22は青龍ラーテルズとの合同練習、11/23は別会場での午前練習としてご案内しました。</p><p>仙台からの遠征選手への当時の案内は「11/23午前の練習には参加しません」でした。</p></details>
        <details><summary>お申し込み時のキャンセル条件を確認する</summary><p>最初の参加日の14日前までは返金不可の決済手数料を除き返金、13〜7日前は参加費の50%、6日前以降は100%。宿泊プランは発生済みの返金不可の宿泊費が差し引かれる場合があります。個別の手続きは、下の窓口からお問い合わせください。</p></details>
        <p><a href="/ja/contact">このキャンプに参加された方のお問い合わせ</a></p>
      </section>
    </SiteFrame>
  );
}
