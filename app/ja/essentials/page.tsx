/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { ESSENTIALS_HERO_IMAGE, ESSENTIALS_SETUP_IMAGE, ESSENTIALS_INSTAGRAM, ESSENTIALS_INTEREST_FORM, essentials } from "@/lib/rba-essentials";
import styles from "./essentials.module.css";
import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RBA ESSENTIALS | Official Apparel Collection",
  description: "RBA ESSENTIALS公式アパレル。白Tシャツ税込4,900円、黒セットアップ税込19,800円。先行販売は国内送料無料。購入受付は製造と決済の承認後に開始します。",
  alternates: { canonical: "/ja/essentials" },
  openGraph: {
    title: "RBA ESSENTIALS | The Essential Collection",
    description: "White Tee. Black Setup. No noise, only essentials. 発売前の商品イメージを公開中。",
    url: "/ja/essentials",
    images: [{ url: ESSENTIALS_HERO_IMAGE, alt: "RBA Essentials 白Tシャツの商品デザイン検討画像（モデル着用なし）" }],
    locale: "ja_JP",
    type: "website",
  },
};

export default function EssentialsCollectionPage() {
  const commerce=getEssentialsPresaleConfig();
  return (
    <SiteFrame locale="ja">
      <div className={styles.page}>
        <section className={styles.intro} aria-labelledby="essentials-title">
          <div className={styles.overline}><span>RBA / OFFICIAL APPAREL</span><span>FIRST DROP / 国内送料無料</span></div>
          <div className={styles.introBody}>
            <p className={styles.chapter}>THE ESSENTIAL COLLECTION / JAPAN FREE SHIPPING FIRST DROP</p>
            <h1 id="essentials-title" className={styles.display}>ESSENTIALS<span>.</span></h1>
            <div className={styles.introBottom}>
              <p className={styles.lead}>余計なものは、いらない。<br />コートの外にも、RBAの哲学を。</p>
              <a className={styles.editorialLink} href="#collection">EXPLORE THE COLLECTION <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className={styles.heroImage} aria-label="RBA ESSENTIALS コレクションイメージ">
          <div className={styles.heroPair}>
            <img src={ESSENTIALS_HERO_IMAGE} alt="RBA公式の白いTシャツ。右裾ワッペンと首裏のブランド表示を示したデザインイメージ。モデルなし。" fetchPriority="high" />
            <img src={ESSENTIALS_SETUP_IMAGE} alt="RBA公式の黒いパーカーとワイドパンツ。ワッペンを統一したデザインイメージ。モデルなし。" />
          </div>
          <div className={styles.heroCaption}><span>WHITE TEE / BLACK SETUP</span><span>CG DESIGN REFERENCES / NOT PHYSICAL SAMPLES</span></div>
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
                    <p className={styles.productColor}>{item.colorJa} ・ 税込 ¥{Number(item.slug==="tee"?commerce.unitPrices.tee:commerce.unitPrices.setup).toLocaleString("ja-JP")} ・ 先行販売国内送料無料{commerce.ready?" ／ 購入受付中":" ／ 決済準備中"}</p>
                  </div>
                  <Link className={styles.roundArrow} href={item.pagePath} aria-label={item.title+"を見る"}>↗</Link>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.previewNote}>掲載写真はデザイン検討用のCGイメージで、実物撮影ではありません。販売の可否、製品仕様、配送期限、キャンセル条件は各商品ページでご確認ください。</p>
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
          <p>{commerce.ready ? "公式ウェアの先行購入受付中。商品サイズ、税込総額、発送期限、キャンセル・返品条件をご確認のうえ、Stripeで購入いただけます。販売による利益はRBAの育成活動に活用します。" : "先行販売の国内送料は無料です。税込価格は白Tシャツ4,900円、黒セットアップ19,800円。製造・発送・返品と決済の最終確認が終わるまで、前払いは受け付けません。利益はRBAの育成活動に活用します。"}</p>
          <div className={styles.launchLinks}>
            {commerce.ready ? <Link className={styles.darkButton} href="/ja/essentials/checkout">先行購入する <span aria-hidden="true">↗</span></Link> : <a className={styles.darkButton} href={ESSENTIALS_INTEREST_FORM} target="_blank" rel="noopener noreferrer">先行注文申込（支払前） <span aria-hidden="true">↗</span></a>}
            <a className={styles.textLink} href={ESSENTIALS_INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagramで最新情報を見る <span aria-hidden="true">↗</span></a>
          </div>
          <p className={styles.launchFine}>{commerce.ready ? `先行販売・前払い。国内送料0円（FIRST DROP限定）。発送期限：${commerce.dispatchDeadline}。` : "先行注文申込は無料・正式購入未確定です。送料0円は今回の国内先行販売にのみ適用します。"}</p>
        </section>
        <footer className={styles.collectionFooter}><span>RBA ESSENTIALS © RIOT BASKETBALL ACADEMY</span><a href="mailto:riot.training.base@gmail.com">CONTACT / EMAIL ↗</a></footer>
      </div>
    </SiteFrame>
  );
}
