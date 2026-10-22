import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import styles from "./store.module.css";

export const metadata: Metadata = {
  title: "RBA Performance Tee｜RBA公式スポーツウェア",
  description: "コートへ、その先へ。RBAと。公式ロゴをまとったスポーツTシャツを準備中。発売状況・素材選び・お届けについてご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/store" },
};

export default function StorePage() {
  return <SiteFrame locale="ja"><div className={styles.page}>
    <section className={styles.hero} aria-labelledby="store-title">
      <div><p className={styles.eyebrow}>RBA / PERFORMANCE COLLECTION 01</p><p className={styles.status}>発売準備中</p>
        <h1 id="store-title">コートへ、<br/>その先へ。<br/><span>RBAと。</span></h1>
        <p className={styles.lead}>いつもの練習に、RBAの一枚を。<br/>動きやすさと、着たくなる佇まい。<br/>その両方を目指す、公式スポーツTシャツ。</p>
        <a className={styles.button} href="#details">発売に向けた準備を見る <span aria-hidden="true">↓</span></a>
      </div>
      <figure className={styles.visual} aria-label="ブラックのTシャツにRBA公式ロゴを配置したデザイン検討図。製品写真ではありません。">
        <div className={styles.shirt} aria-hidden="true"><div className={styles.collar}/><Image className={styles.logo} src="/rba-logo-original.jpg" width={203} height={312} alt=""/></div>
        <div className={styles.visualCaption}><span>RBA PERFORMANCE TEE</span><strong>01 / BLACK</strong></div>
        <figcaption>デザイン検討図。製品写真ではありません。<br/>ロゴの位置・大きさ・生地・色は確定前です。</figcaption>
      </figure>
    </section>
    <section className={styles.section} id="details"><p className={styles.eyebrow}>MADE FOR THE COURT</p><h2>動ける一枚を、丁寧に選ぶ。</h2>
      <div className={styles.grid}>{[
        ["01", "しなやかに動く。", "ストレッチのあるスポーツメッシュを候補に、動きやすさ、肌触り、汗をかいたときの着心地を確認します。"],
        ["02", "RBAの公式ロゴを。", "胸元に公式ロゴを配置するデザインを検討中。印刷の鮮明さと、洗濯後の仕上がりも確認してから発売します。"],
        ["03", "必要な分を、一枚ずつ。", "注文後に製造する方式で準備しています。日本と海外への配送条件を確認し、購入前に送料とお届け目安をご案内します。"],
      ].map(([number, title, body]) => <article key={number}><p className={styles.eyebrow}>{number}</p><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
    <section className={styles.preparation}><div><p className={styles.eyebrow}>BEFORE THE FIRST DROP</p><h2>着心地まで確かめて、<br/>お届けします。</h2></div><div><p>現在は、生地・印刷・製造と配送の仕組みを整えている段階です。販売価格、サイズ表、配送対象国、送料、製造・配送日数は、確認が完了した後にこのページで公開します。</p><p><strong>現在、注文・予約・お支払いは受け付けていません。</strong></p><a className={styles.lightButton} href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noreferrer">公式Instagramを見る ↗</a><a className={styles.textLink} href="mailto:riot.training.base@gmail.com?subject=RBA%20Performance%20Tee">商品について問い合わせる →</a></div></section>
    <section className={styles.section}><p className={styles.eyebrow}>GOOD TO KNOW</p><h2>よくあるご質問</h2>
      <details><summary>いつ購入できますか？</summary><p>発売日は未定です。サンプルと製造・配送の連携確認後、公式サイトとInstagramでお知らせします。</p></details>
      <details><summary>海外からも注文できますか？</summary><p>国際配送に対応する受注生産サービスで準備中です。すべての国への配送を保証するものではありません。対応国と送料は発売時にご案内します。</p></details>
      <details><summary>サイズ・素材・価格は？</summary><p>最終仕様は未確定です。成人用のスポーツメッシュTシャツを候補に、生地の感触、透け、サイズ、プリント、洗濯後の状態を確認します。サイズ表と総額を確認してから注文できるようにします。</p></details>
      <details><summary>交換や返品はできますか？</summary><p>販売開始前に、不良品・誤配送、サイズ交換、キャンセル・返金の条件を掲載します。受注生産でも、すべての返品・返金ができないという一律の扱いにはしません。</p></details>
    </section>
  </div></SiteFrame>;
}
