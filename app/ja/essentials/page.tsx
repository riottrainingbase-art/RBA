/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { ESSENTIALS_HERO_IMAGE, ESSENTIALS_INSTAGRAM, ESSENTIALS_INTEREST_FORM, essentials } from "@/lib/rba-essentials";
import styles from "./essentials.module.css";

export const metadata: Metadata = {
  title: "RBA ESSENTIALS | Official Apparel Collection",
  description: "Riot Basketball Academyの公式アパレル構想。ミニマルなホワイトTシャツと、ブラックのフーディ＆スウェットパンツ。現在は製品開発・発売準備中です。",
  alternates: { canonical: "/ja/essentials" },
  openGraph: {
    title: "RBA ESSENTIALS | The Essential Collection",
    description: "White Tee. Black Setup. No noise, only essentials. 発売前の商品イメージを公開中。",
    url: "/ja/essentials",
    images: [{ url: ESSENTIALS_HERO_IMAGE, width: 1536, height: 1024, alt: "RBA Essentials apparel design concept" }],
    locale: "ja_JP",
    type: "website",
  },
};

export default function EssentialsCollectionPage() {
  return (
    <SiteFrame locale="ja">
      <div className={styles.page}>
        <section className={styles.intro} aria-labelledby="essentials-title">
          <div className={styles.overline}><span>RBA / OFFICIAL APPAREL</span><span>COLLECTION 001 — PREVIEW</span></div>
          <div className={styles.introBody}>
            <p className={styles.chapter}>THE ESSENTIAL COLLECTION</p>
            <h1 id="essentials-title" className={styles.display}>ESSENTIALS<span>.</span></h1>
            <div className={styles.introBottom}>
              <p className={styles.lead}>余計なものは、いらない。<br />コートの外にも、RBAの哲学を。</p>
              <a className={styles.editorialLink} href="#collection">EXPLORE THE COLLECTION <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className={styles.heroImage} aria-label="RBA ESSENTIALS コレクションイメージ">
          <img src={ESSENTIALS_HERO_IMAGE} alt="白いTシャツ、黒いパーカーと黒いワイドスウェットパンツのRBA公式アパレル・デザインイメージ" fetchPriority="high" />
          <div className={styles.heroCaption}><span>WHITE / BLACK</span><span>DESIGN STUDY — NOT A PHYSICAL SAMPLE</span></div>
        </section>

        <section id="collection" className={styles.collection} aria-labelledby="collection-title">
          <div className={styles.sectionHeader}>
            <div><p className={styles.chapter}>001 / THE LINEUP</p><h2 id="collection-title">The Collection</h2></div>
            <p>選んだのは、シンプルな2つの形。<br />主張ではなく、佇まいで伝える。</p>
          </div>
          <div className={styles.productGrid}>
            {essentials.map((item) => (
              <article className={styles.product} key={item.slug}>
                <Link href={item.pagePath} className={styles.imageLink} aria-label={item.title + "の詳細"}>
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <span className={styles.imageNumber}>{item.number} / {item.color}</span>
                </Link>
                <div className={styles.productInfo}>
                  <div>
                    <p className={styles.productEyebrow}>RBA ESSENTIALS / {item.number}</p>
                    <h3>{item.name}</h3>
                    <p className={styles.productColor}>{item.colorJa} ・ 発売準備中</p>
                  </div>
                  <Link className={styles.roundArrow} href={item.pagePath} aria-label={item.title+"を見る"}>↗</Link>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.previewNote}>掲載写真は製造前のCG・デザインイメージです。生地、タグ、サイズ、色合い、仕様はサンプル検証後に確定します。現在はご注文・ご予約・決済を受け付けていません。</p>
        </section>

        <section className={styles.manifesto} aria-label="RBA ESSENTIALS のデザイン哲学">
          <p className={styles.chapter}>02 / THE PHILOSOPHY</p>
          <p className={styles.manifestoHeadline}>LESS, <em>but</em><br />MORE RBA.</p>
          <div className={styles.manifestoFooter}>
            <span>THE MARK IS ENOUGH.</span>
            <p>ロゴを大きく見せる必要はない。<br />育成を大切にする姿勢が、すでにブランドだから。</p>
          </div>
        </section>

        <section className={styles.details} aria-labelledby="details-title">
          <div className={styles.sectionHeader}>
            <div><p className={styles.chapter}>03 / THE DETAILS</p><h2 id="details-title">Quiet by design.</h2></div>
            <p>2つのアイテムに共通する、小さなこだわり。</p>
          </div>
          <div className={styles.detailGrid}>
            <div><span>01</span><h3>ONE SIGNATURE</h3><p>公式RBAロゴを用いた小型ワッペン。縦約4cmを候補に、織り・縫製・耐洗濯性を確認します。</p></div>
            <div><span>02</span><h3>CONSISTENT LABEL</h3><p>首元のブランド表示を揃えて、手に取ったときにもRBAの一着だと伝わる仕様に。</p></div>
            <div><span>03</span><h3>EVERYDAY FIT</h3><p>トレーニングの行き帰りも、日常も。ゆとりとシルエットにこだわってサイズを検証します。</p></div>
          </div>
        </section>

        <section className={styles.launch} aria-labelledby="launch-title">
          <p className={styles.chapter}>FIRST DROP / IN DEVELOPMENT</p>
          <h2 id="launch-title">Built to last.<br /><em>Not rushed.</em></h2>
          <p>価格、サイズ表、製造、発送、返品・交換条件が揃ってから販売を開始します。先に、購入前アンケートでご意見をお寄せください。</p>
          <div className={styles.launchLinks}>
            <a className={styles.darkButton} href={ESSENTIALS_INTEREST_FORM} target="_blank" rel="noopener noreferrer">無料の購入前アンケート <span aria-hidden="true">↗</span></a>
            <a className={styles.textLink} href={ESSENTIALS_INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagramで最新情報を見る <span aria-hidden="true">↗</span></a>
          </div>
          <p className={styles.launchFine}>アンケートは注文・予約・決済ではありません。発売日は未定です。</p>
        </section>
        <footer className={styles.collectionFooter}><span>RBA ESSENTIALS © RIOT BASKETBALL ACADEMY</span><a href="mailto:riot.training.base@gmail.com">CONTACT / EMAIL ↗</a></footer>
      </div>
    </SiteFrame>
  );
}
