import type {Metadata} from "next";
import {SiteFrame} from "@/components/site-frame";
import {GrowthClickTracking} from "@/components/growth-click-tracking";
import {CampaignShareKit} from "@/components/campaign-share-kit";
import styles from "./share.module.css";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:"RBAの育成機会を紹介する｜保護者・指導者向け共有キット",
  description:"沖縄・兵庫・鹿児島のクリニック、Torstenオンライン講習、仙台スクールなど、公式の開催条件を確認しながら家族や指導者に任意で共有できる文章を選べます。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/share"},
  openGraph:{
    title:"RBA｜次の成長機会を必要な人へ",
    description:"保護者・指導者・SNS向けに紹介文を選んでコピー。申込や決済は各公式ページで。",
    url:"https://riotbasketballacademy.com/ja/share",
    type:"website"
  }
};

export default function SharePage(){
  return <SiteFrame locale="ja"><main className={styles.page} lang="ja">
    <GrowthClickTracking/>
    <div className={styles.wrap}>
      <a href="/ja/opportunities" className={styles.back}>← RBAの募集中イベントへ</a>
      <header className={styles.hero}>
        <p className={styles.kicker}>RBA / SHARE THE OPPORTUNITY</p>
        <h1>必要な人へ、<br/>育つ機会を届ける。</h1>
        <p>「こんなクリニックがあったよ」。その一言から、選手とご家庭の選択肢が増えることがあります。保護者LINE、チームの指導者、SNSなど、届けたい相手を選んで、そのまま使える紹介文を用意しました。</p>
      </header>
      <CampaignShareKit/>
      <section className={styles.how}>
        <h2>共有前に確認してほしいこと</h2>
        <div className={styles.steps}>
          <article><strong>01</strong><h3>内容と条件を確認</h3><p>開催日・対象・費用・会場の確定状況は、各公式ページに記載された最新案内を優先します。</p></article>
          <article><strong>02</strong><h3>必要な人にだけ共有</h3><p>ご家庭や指導者仲間へ、紹介できる相手がいる場合のみ。参加を強制したり、連絡先名簿を集めたりしません。</p></article>
          <article><strong>03</strong><h3>申込は主催者の窓口へ</h3><p>共有者が参加費を集金する必要はありません。正式な参加登録・決済はRBA公式の案内から行えます。</p></article>
        </div>
        <p className={styles.consent}>内容に変更があった場合は、最新条件に合わせて案内文を修正してください。これは紹介文の共有ツールであり、送信・投稿・申込の自動処理は行いません。</p>
        <div className={styles.links}><a href="/ja/start" data-growth-id="share-all-paths">参加・体験・相談の入口 →</a><a href="/ja/opportunities" data-growth-id="share-all-events">募集中の活動 →</a></div>
      </section>
    </div>
  </main></SiteFrame>;
}
