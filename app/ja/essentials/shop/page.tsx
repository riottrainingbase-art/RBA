/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./shop.module.css";

const root = "https://riotbasketballacademy.com/ja/essentials/shop";
const products = [
  {
    key:"tee",
    number:"01",
    english:"RBA ESSENTIAL TEE",
    japanese:"ホワイト Tシャツ",
    price:4900,
    image:"https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-white-tee-official-design-reference-20261116.jpg?v=1794837114",
    imageAlt:"RBA ESSENTIAL TEE ホワイト。モデルなしの商品デザイン参考画像。",
    href:"https://buy.stripe.com/9B6fZj423fY09eRboz7EQ1O",
    sizes:"S / M / L / XL",
    detail:"余白を生かした白。主張は、裾の小さなRBAロゴだけ。",
  },
  {
    key:"setup",
    number:"02",
    english:"RBA ESSENTIAL SETUP",
    japanese:"ブラック パーカー＆パンツ",
    price:19800,
    image:"https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-black-hoodie-setup-official-design-reference-20261116.jpg?v=1794837122",
    imageAlt:"RBA ESSENTIAL SETUP ブラックのパーカーとワイドパンツ。モデルなしの商品デザイン参考画像。",
    href:"https://buy.stripe.com/bJe4gB1TVh241Mp3W77EQ1P",
    sizes:"パーカー・パンツを個別選択：S / M / L / XL",
    detail:"黒の佇まいに、さりげないRBAの印。フーディとパンツの上下セット。",
  },
] as const;

export const metadata:Metadata = {
  title:"RBA ESSENTIALS｜FIRST DROP 公式コレクション",
  description:"RBA ESSENTIALS、最初のコレクション。WHITE TEE 4,900円、BLACK SETUP 19,800円（税込）。先行販売の日本国内送料は無料。",
  alternates:{canonical:root},
  openGraph:{
    type:"website",
    locale:"ja_JP",
    siteName:"Riot Basketball Academy",
    title:"RBA ESSENTIALS — FIRST DROP",
    description:"WHITE TEE ¥4,900 / BLACK SETUP ¥19,800｜先行販売は国内送料無料",
    url:root,
    images:[{url:products[0].image,alt:products[0].imageAlt}],
  },
  twitter:{card:"summary_large_image",title:"RBA ESSENTIALS / FIRST DROP",images:[products[0].image]},
};

export default function InstagramEssentialsShop(){
  return <SiteFrame locale="ja">
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <span className={styles.kicker}>RIOT BASKETBALL ACADEMY / OFFICIAL APPAREL</span>
          <h1>ESSENTIALS<span>.</span></h1>
          <p className={styles.subtitle}>FIRST DROP / 001 — THE ESSENTIAL COLLECTION</p>
          <div className={styles.promo}>先行販売・国内送料無料 <span>・</span> 全額前払い <span>・</span> 1か月以内にお届け</div>
          <p className={styles.lead}>飾らない。<br/>その選択に、意志がある。</p>
        </header>
        <section className={styles.products} aria-label="商品を選んで購入">
          {products.map(item=><article className={styles.product} key={item.key}>
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.imageAlt} loading={item.key==="tee"?"eager":"lazy"}/>
              <span>{item.number} / FIRST DROP</span>
            </div>
            <div className={styles.productBody}>
              <p className={styles.english}>{item.english}</p>
              <h2>{item.japanese}</h2>
              <div className={styles.price}><strong>¥{item.price.toLocaleString("ja-JP")}</strong><small>税込・国内送料0円</small></div>
              <p className={styles.detail}>{item.detail}</p>
              <p className={styles.size}>サイズ：{item.sizes}</p>
              <a className={styles.buy} href={item.href} data-growth-id={"essentials-instagram-buy-"+item.key}>
                <span>サイズを選んで購入する</span><span aria-hidden="true">↗</span>
              </a>
              <p className={styles.payment}>お支払いはStripeの決済画面で行います。</p>
            </div>
          </article>)}
        </section>
        <section className={styles.finePrint} aria-label="購入前のご案内">
          <p className={styles.kicker}>BEFORE YOU ORDER</p>
          <h2>ご注文の前に。</h2>
          <p>掲載写真は完成品の実物撮影ではなく、デザイン参考画像です。生地・サイズ感・ロゴの実際の仕上がりが実物サンプルと異なる場合があるため、ご不明点は支払前にご確認ください。通常版の販売であり、手書き加工オプションは上記の決済には含まれません。複数着を一度に注文する場合、同一商品のサイズ選択は全着に適用されます。異なるサイズをご希望なら、サイズごとに分けてお申し込みください。</p>
          <p>今回のFIRST DROPに限り日本国内送料は無料です。商品代金はStripeで一括前払いとなります。配送先は日本国内のみ。ご注文から1か月以内のお届けを予定しています。</p>
          <p>お客様都合の未使用品返品は商品到着から8日以内にご連絡ください（返送料お客様負担）。不良・誤配送はRBA負担で交換または返金いたします。納期を守れない場合は連絡し、継続・全額返金をお選びいただけます。</p>
          <p>販売事業者：西尾優人（Riot Basketball Academy）。所在地は購入前のお申し出に応じて遅滞なく開示いたします。カード会社の明細には「JAPAN MARKET ENTRY」を含む表示が出る可能性がありますが、決済先はRBAのStripeアカウントです。</p>
          <a className={styles.contact} href="mailto:riot.training.base@gmail.com?subject=RBA%20ESSENTIALS%20%E5%95%8F%E5%90%88%E3%81%9B">購入前のご質問・返品のご相談 ↗</a>
        </section>
        <footer className={styles.footer}>© RIOT BASKETBALL ACADEMY · MADE FOR THE JOURNEY.</footer>
      </div>
    </main>
  </SiteFrame>;
}
