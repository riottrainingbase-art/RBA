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
              <p>白のTシャツ。襟元と裾に小さなブランド表現を置く構想。素材・寸法・サイズ・ロゴ表現は実物サンプルの確認後に決定します。</p>
            </div>
          </article>

          <article className={styles.product}>
            <div className={styles.productImage}>
              <img src={images.setup} alt="RBA BLACK SETUPの黒フーディーと黒スウェットパンツ、ワッペンを示すデザインコンセプト。実物の完成写真ではありません。" loading="lazy" decoding="async" />
            </div>
            <div className={styles.productInfo}>
              <span>002 / BLACK</span>
              <h3>RBA BLACK SETUP.</h3>
              <p>黒フーディーとスウェットパンツのセットアップ構想。上下のサイズ、素材、正式なワッペン、製造・発送方法はまだ確定していません。</p>
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
          <p><strong>画像はCG・デザインイメージです。</strong>描かれた襟元表示やワッペンは正式なロゴ版下ではありません。実際の製品はサンプル確認後に決定します。販売価格・サイズ・納期・配送・返品条件は確定していないため、まだ代金を受け付けていません。</p>
          <a href="https://form.jotform.com/263193283498065" target="_blank" rel="noopener noreferrer">無料の発売希望アンケートに回答する <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
