/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { ESSENTIALS_HERO_IMAGE, ESSENTIALS_SETUP_IMAGE, ESSENTIALS_COLLECTION_GALLERY, ESSENTIALS_INSTAGRAM, ESSENTIALS_INTEREST_FORM, essentials } from "@/lib/rba-essentials";
import styles from "./essentials.module.css";
import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RBA STORE | Riot Basketball Academy 公式アパレル",
  description: "RBA STORE。勝敗の先に、残るものを。Riot Basketball Academyの育成哲学をコートの外へ。白のTシャツと黒のセットアップ。",
  alternates: { canonical: "/ja/essentials" },
  openGraph: {
    title: "RBA STORE | 勝敗の先に、残るものを。",
    description: "バスケットボールとともに生きる人へ。RBA WHITE TEE / BLACK SETUP。",
    url: "/ja/essentials",
    images: [{ url: ESSENTIALS_HERO_IMAGE, alt: "RBA WHITE TEE 白いTシャツのデザインイメージ" }],
    locale: "ja_JP",
    type: "website",
  },
};


export default function EssentialsCollectionPage() {
  const commerce = getEssentialsPresaleConfig();

  return (
    <SiteFrame locale="ja">
      <div className={styles.front}>
        <nav className={styles.frontNav} aria-label="RBAストア">
          <strong style={{ display: "inline-flex", alignItems: "center", gap: 10 }}><img src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={30} height={42} style={{ objectFit: "contain" }} />RBA STORE</strong>
          <div>
            <a href="#collection">商品一覧</a>
            <a href="#handwritten">手書きエディション</a>
            <a href="#origin">RBAの背景</a>
            <a href="#essentials-guide">ご注文について</a>
          </div>
        </nav>

        <section className={styles.frontHero} aria-labelledby="collection-hero">
          <div className={styles.frontHeroCopy}>
            <p className={styles.frontKicker}>RIOT BASKETBALL ACADEMY / 001</p>
            <h1 id="collection-hero">FIRST <em>DROP.</em></h1>
            <p>練習に向かうときも、コートを出たあとも。<br />バスケットボールのある日常に。</p>
            <div className={styles.frontHeroActions}>
              <a className={styles.frontButton} href="#collection">コレクションを見る <span aria-hidden="true">↓</span></a>
              <a className={styles.frontEditionLink} href="#handwritten">手書きエディション <span aria-hidden="true">↘</span></a>
            </div>
            <span className={styles.frontStatus}>{commerce.ready ? "先行購入受付中" : "発売準備中"}</span>
          </div>
          <div className={styles.frontVisual}>
            {essentials.map((item, index) => (
              <Link key={item.slug} href={item.pagePath} aria-label={item.name + "の商品詳細"}>
                <img src={item.image} alt={item.alt} fetchPriority={index === 0 ? "high" : undefined} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.frontLookbook} aria-labelledby="rba-lookbook-title">
          <header className={styles.frontLookbookIntro}>
            <p className={styles.frontKicker}>COLLECTION 001 / LOOKBOOK</p>
            <h2 id="rba-lookbook-title">LESS LOGO. MORE EVERYDAY.</h2>
            <p>WHITE TEE と BLACK SETUP。練習や移動、日常の延長で着られるミニマルなRBAコレクションです。</p>
            <p className={styles.frontLookbookNotice}>以下の写真はデザインイメージです。実際の製品写真ではありません。描かれたタグ・ワッペンは正式ロゴの版下ではなく、素材・サイズ・価格・製造・発送時期は検証中です。ご注文・ご予約・決済は受け付けていません。</p>
          </header>
          <div className={styles.frontLookbookGrid}>
            {ESSENTIALS_COLLECTION_GALLERY.map(photo=><figure key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy"/>
              <figcaption>{photo.label} / DESIGN CONCEPT ONLY</figcaption>
            </figure>)}
          </div>
        </section>

        <section id="collection" className={styles.frontContent} aria-labelledby="products-title">
          <h2 className={styles.frontHeading} id="products-title">Collection 001.</h2>
          <div className={styles.frontGrid}>
            {essentials.map((item) => {
              const price = commerce.unitPrices[item.slug];
              return (
                <Link key={item.slug} href={item.pagePath} className={styles.frontProduct}>
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <div className={styles.frontInfo}>
                    <h3>{item.name}</h3><span aria-hidden="true">↗</span>
                    <p>{commerce.ready && price !== null ? `¥${price.toLocaleString("ja-JP")}（税込・国内送料無料）` : item.colorJa}</p>
                    <p>{commerce.ready ? "サイズ・商品詳細を見る" : "商品詳細を見る"}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className={styles.previewNote}>商品画像はイメージです。素材・実寸は各商品ページでご確認ください。</p>
        </section>

        <section id="handwritten" className={styles.frontHandwritten} aria-labelledby="handwritten-title">
          <div className={styles.frontContent}>
            <div className={styles.editionCopy}>
              <p className={styles.frontKicker}>RBA STORE / COLLECTION 001</p>
              <h2 id="handwritten-title">Handwritten <em>Edition.</em></h2>
              <p className={styles.editionLead}>RBAからの言葉を、一着に。</p>
              <p className={styles.editionDescription}>RBAが用意したメッセージを、一点ずつ手書きで添えます。対象は白Tと、黒セットアップのフーディーです。</p>
              <div className={styles.editionStatus}>
                <span>{commerce.handwrittenAvailable && commerce.handwrittenJPY !== null ? `受付中 ／ 追加 ¥${commerce.handwrittenJPY.toLocaleString("ja-JP")}（税込）` : "手書きエディションは受付準備中"}</span>
                {commerce.handwrittenAvailable && <a href="#collection">対象商品を見る <span aria-hidden="true">↑</span></a>}
              </div>
            </div>
            <figure className={styles.editionFigure}>
              <img src={ESSENTIALS_SETUP_IMAGE} alt="黒のフーディーとパンツの通常版デザインイメージ。フーディーが手書きエディションの対象。" loading="lazy" />
              <figcaption><span>BLACK SETUP</span><span>通常版のデザインイメージ</span></figcaption>
            </figure>
          </div>
        </section>

        <section id="origin" className={styles.frontOrigin} aria-labelledby="origin-title">
          <div className={styles.frontContent}>
            <div>
              <p className={styles.frontKicker}>FROM SENDAI / RBA</p>
              <h2 className={styles.frontHeading} id="origin-title">仙台のコートから、<br />日常の一着へ。</h2>
            </div>
            <div>
              <p>仙台を拠点に、全国やアジアのコートへ。RBAは、子どもたちが自分で考え、挑戦できる場をつくってきました。勝敗がついたあとも、新しい仲間と練習した時間や、次はこうしてみようと思えた経験は残ります。</p>
              <p>その時間の延長で着られるように、白のTシャツと黒のセットアップを選びました。どちらも、RBAのロゴは小さく。</p>
              <Link href="/ja/essentials/story">RBAがウェアをつくる理由 ↗</Link>
            </div>
          </div>
        </section>

        <section id="essentials-guide" className={styles.frontContent + " " + styles.frontGuide} aria-labelledby="guide-title">
          <h2 className={styles.frontHeading} id="guide-title">ご注文について</h2>
          <details>
            <summary>受付状況</summary>
            <p>{commerce.ready ? "先行購入を受け付けています。商品ページからサイズ選択へ進めます。" : "現在は発売準備中です。アンケートは無料で回答でき、注文や予約は成立しません。"}</p>
          </details>
          <details>
            <summary>送料とお届け</summary>
            <p>{commerce.ready ? `FIRST DROPは日本国内送料無料です。発送期限は${commerce.dispatchDeadline}、お届け期限は${commerce.deliveryDeadline}です。` : "国内送料とお届け時期は、受付開始前にご案内します。"}</p>
          </details>
          <details>
            <summary>素材・サイズ・返品</summary>
            <p>素材とサイズは各商品ページをご覧ください。キャンセルと返品は<Link href="/ja/essentials/legal">販売条件</Link>でご確認いただけます。</p>
          </details>
          <details>
            <summary>売上は何に使われますか？</summary>
            <p>製造費や販売経費を差し引いた利益は、RBAの育成活動に充てる方針です。</p>
          </details>
          {!commerce.ready && <a href={ESSENTIALS_INTEREST_FORM} target="_blank" rel="noopener noreferrer">発売前アンケートに回答する ↗</a>}
        </section>
        <footer className={styles.frontFoot}>
          <strong>RBA STORE</strong>
          <div>
            <Link href="/ja/essentials/legal">販売条件</Link>
            <a href={ESSENTIALS_INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="mailto:riot.training.base@gmail.com">お問い合わせ</a>
          </div>
        </footer>
      </div>
    </SiteFrame>
  );
}
