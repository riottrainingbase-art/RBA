import type { Metadata } from "next";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA応援メンバー｜月500円・クリニック会員交流会",
  description: "月500円でRBAの育成活動を応援。RBAの全クリニックに合わせた会員交流会と、公式noteでの入会方法をご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/supporters" },
};

export default function SupportersPage() {
  return (
    <SiteFrame locale="ja">
      <GrowthClickTracking />
      <section className="opportunity-hero section-pad">
        <a className="back-link" href="/ja">← RBAトップ</a>
        <p className="section-index inverse">RBA応援メンバー</p>
        <h1>月500円で、RBAの仲間に。</h1>
        <p>子どもたちがバスケットボールを楽しみ、挑戦できる場を一緒に支える、個人向けのメンバーシップです。</p>
        <a className="button button-light" data-growth-id="supporters-note-join" href="https://note.com/rba_official/membership/join">
          公式noteで月500円のプランを見る →
        </a>
        <p>公式noteのプラン一覧から「応援メンバー（月500円）」をお選びください。</p>
      </section>

      <section id="clinic-meetups" className="section-pad" aria-labelledby="clinic-meetups-title">
        <div className="section-head">
          <div>
            <h2 id="clinic-meetups-title">全クリニックに合わせた会員交流会</h2>
            <p>当日の練習を振り返り、子どもたちの育成や日頃の疑問について、西尾優人と直接話せる時間です。</p>
          </div>
        </div>
        <ol>
          <li>開催一覧から、気になるクリニックの案内を開きます。</li>
          <li>交流会の日時・会場・参加方法は、各回の案内で決まり次第お知らせします。</li>
          <li>クリニック本体の参加条件・申込方法も、各回の案内でご確認ください。</li>
        </ol>
        <a className="button button-dark" data-growth-id="supporters-clinic-list" href="/ja/opportunities#opportunity-list">
          クリニックの開催案内を見る →
        </a>
      </section>

      <section className="section-pad" aria-labelledby="supporter-note-title">
        <h2 id="supporter-note-title">公式noteでもRBAの活動を身近に</h2>
        <p>活動レポートの先行公開、西尾優人の育成日誌、月1回の会員限定Q&amp;A、イベントの先行案内を予定しています。</p>
        <p>育成記事を読みたい保護者・指導者向けには、同じ公式noteに月1,000円の育成記事プランがあります。</p>
      </section>
    </SiteFrame>
  );
}
