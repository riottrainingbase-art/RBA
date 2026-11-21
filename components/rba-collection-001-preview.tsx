/* eslint-disable @next/next/no-img-element -- Original RBA design concepts are served from the store's verified Shopify CDN; no commerce or remote image optimizer is required. */
import styles from "./rba-collection-001-preview.module.css";

const images = {
  white: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-white-tee-concept-detail-20261120.jpg?v=1795103081",
  setup: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-black-setup-concept-detail-20261120.jpg?v=1795103099",
  flatlay: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-collection-001-group-flatlay-concept-20261120.jpg?v=1795103039",
  styling: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-collection-001-group-editorial-concept-20261120.jpg?v=1795103061",
} as const;

export function RbaCollection001Preview() {
  return (
    <section className={styles.collection} id="collection-001" aria-labelledby="rba-first-drop-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>RBA STORE / FIRST DROP / COLLECTION 001</p>
            <h2 id="rba-first-drop-title">LESS LOGO.<br/><em>MORE EVERYDAY.</em></h2>
          </div>
          <div className={styles.headRight}>
            <p>コートに向かう日も、その後の日常にも。<br/>RBAのミニマルウェア、第一弾。</p>
            <span className={styles.status}>発売準備中 / 注文・予約・決済は未開始</span>
          </div>
        </header>

        <div className={styles.products}>
          <article className={styles.product}>
            <div className={styles.productImage}>
              <img src={images.white} alt="RBA WHITE TEEの白Tシャツと、襟元・裾ワッペンを示すデザインコンセプト。実物の完成写真ではありません。" loading="lazy" decoding="async" />
            </div>
            <div className={styles.productInfo}>
              <span>001 / WHITE</span>
              <h3>RBA WHITE TEE.</h3>
              <p>税込6,600円・日本国内送料無料（販売予定価格）。United Athle 4252-01、7.1oz・綿100%。襟元と右裾に控えめなRBAブランド表現を予定。加工後の実寸、ロゴ版下・ワッペンと品質は実物検品後に最終承認します。</p>
            </div>
          </article>

          <article className={styles.product}>
            <div className={styles.productImage}>
              <img src={images.setup} alt="RBA BLACK SETUPの黒フーディーと黒スウェットパンツ、ワッペンを示すデザインコンセプト。実物の完成写真ではありません。" loading="lazy" decoding="async" />
            </div>
            <div className={styles.productInfo}>
              <span>002 / BLACK</span>
              <h3>RBA BLACK SETUP.</h3>
              <p>上下セット税込19,800円・日本国内送料無料（販売予定価格）。United Athle 5763-01と5765-01、12oz裏起毛。実物パンツの裾はシャーリング仕様でCGのワイドストレートとは異なります。上下別サイズ・加工品質・製造/発送条件は最終確認前です。</p>
            </div>
          </article>
        </div>

        <div className={styles.lookbook} aria-label="RBAコレクション001の全体デザイン案">
          <figure>
            <img src={images.flatlay} alt="白Tシャツ、黒フーディー、黒スウェットパンツを並べたRBAコレクション001のデザインイメージ。" loading="lazy" decoding="async" />
            <figcaption>THE THREE PIECES / DESIGN CONCEPT</figcaption>
          </figure>
          <figure>
            <img src={images.styling} alt="白Tシャツと黒セットアップを組み合わせたRBAのスタイリング案。未製造のコンセプト画像。" loading="lazy" decoding="async" />
            <figcaption>EVERYDAY UNIFORM / DESIGN CONCEPT</figcaption>
          </figure>
        </div>

        <div className={styles.footer}>
          <p><strong>画像はCG・デザインイメージで実物商品ではありません。</strong>表示中の襟元表現やワッペンは製造用の正式版下ではありません。価格（白T税込6,600円・黒上下税込19,800円）と初回国内送料無料はRBA側の方針です。加工後のサイズ・実物品質・製造契約・発送期限・返品条件は未承認のため、注文・予約・代金は受け付けていません。</p>
          <a href="https://form.jotform.com/263193283498065" target="_blank" rel="noopener noreferrer">無料の発売案内・購入希望を登録する <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
