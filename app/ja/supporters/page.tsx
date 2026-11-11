import type { Metadata } from "next";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA応援メンバー｜月500円・育成活動を支える",
  description: "RBAの育成活動を月500円から応援。noteの正式なプラン内容と、交流企画についてご案内します。",
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
            <h2 id="clinic-meetups-title">会員向けの交流企画について</h2>
            <p>クリニックに合わせた交流の機会も検討しています。実施する回・日時・会場・参加条件は、確定したときに個別にご案内します。加入だけで全クリニックの交流会参加を保証するものではありません。</p>
          </div>
        </div>
        <ol>
          <li>開催一覧から、気になるクリニックの案内を開きます。</li>
          <li>交流企画の実施有無・日時・会場・参加方法は、各回の案内で決まり次第お知らせします。</li>
          <li>クリニック本体の参加条件・申込方法も、各回の案内でご確認ください。</li>
        </ol>
        <a className="button button-dark" data-growth-id="supporters-clinic-list" href="/ja/opportunities#opportunity-list">
          クリニックの開催案内を見る →
        </a>
      </section>

      <section className="section-pad" aria-labelledby="supporter-note-title">
        <h2 id="supporter-note-title">公式noteでもRBAの活動を身近に</h2>
        <p>記事・交流企画などの特典は、公式noteのプラン説明にある最新の内容を必ずご確認ください。申込や決済は公式note側で行います。</p>
        <p>育成記事を読みたい保護者・指導者向けには、同じ公式noteに月1,000円の育成記事プランがあります。</p>
      </section>
    </SiteFrame>
  );
}
