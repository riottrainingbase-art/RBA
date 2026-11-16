/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";
import { essentials, ESSENTIALS_INSTAGRAM, ESSENTIALS_INTEREST_FORM } from "@/lib/rba-essentials";
import styles from "../essentials.module.css";

export const dynamic = "force-dynamic";
type PageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return essentials.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = essentials.find((entry) => entry.slug === slug);
  if (!item) return { title: "RBA ESSENTIALS" };
  const ready=getEssentialsPresaleConfig().ready;
  return {
    title: `${item.title} | RBA ESSENTIALS`,
    description: `${item.description} ${ready?"公式先行販売の商品詳細をご確認ください。":"現在は製品検証中につき注文・予約・決済を受け付けていません。"}`,
    alternates: { canonical: item.pagePath },
    openGraph: {
      title: `${item.title} | RBA ESSENTIALS`,
      description: item.description,
      url: item.pagePath,
      images: [{ url: item.image, alt: item.alt }],
      locale: "ja_JP", type: "website",
    },
  };
}

export default async function EssentialsProductPage({ params }: PageProps) {
  const { slug } = await params;
  const item = essentials.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const commerce=getEssentialsPresaleConfig();
  const unitPrice=item.slug==="tee"?commerce.unitPrices.tee:commerce.unitPrices.setup;
  const priceText=unitPrice!==null?unitPrice.toLocaleString("ja-JP")+"円（税込）":"価格未定";

  // Product information is editorial only: omit Offer/price/availability schema until approved.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: item.description + (commerce.ready?"（先行販売・詳細条件は購入ページをご確認ください）":"（商品デザイン検討中・販売前）"),
    image: [item.image],
    url: `https://riotbasketballacademy.com${item.pagePath}`,
    brand: { "@type": "Brand", name: "Riot Basketball Academy" },
    ...(commerce.ready&&unitPrice!==null? { offers: {
      "@type":"Offer",priceCurrency:"JPY",price:String(unitPrice),availability:"https://schema.org/PreOrder",url:`https://riotbasketballacademy.com/ja/essentials/checkout?item=${item.slug}`,
    }} : {}),
  };

  return (
    <SiteFrame locale="ja">
      <div className={styles.page}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}/>
        <div className={styles.productBreadcrumb}><Link href="/ja/essentials">RBA ESSENTIALS</Link><span aria-hidden="true">/</span><span>{item.number} — {item.name}</span></div>
        <article className={styles.detailLayout}>
          <div className={styles.detailPhoto}>
            <img src={item.image} alt={item.alt} fetchPriority="high"/>
            <p>DESIGN CONCEPT / NOT A PHYSICAL SAMPLE</p>
          </div>
          <div className={styles.detailCopy}>
            <p className={styles.chapter}>COLLECTION 001 / {item.color}</p>
            <h1>{item.name}</h1>
            <p className={styles.detailStatement}>{item.statement}</p>
            <p className={styles.detailDescription}>{item.description}</p>
            <div className={styles.detailRule}>
              <span>COLOUR</span><strong>{item.colorJa} / {item.color}</strong>
            </div>
            <div className={styles.detailRule}>
              <span>SIZE</span><strong>{commerce.ready?"S / M / L / XL":"サンプル確認後に確定"}</strong>
            </div>
            <div className={styles.detailRule}>
              <span>PRICE / FIRST DROP</span><strong>{priceText}</strong>
            </div>
            <p className={styles.detailSize}>{item.sizeNote}</p>
            {commerce.ready ? <Link className={styles.detailButton} href={`/ja/essentials/checkout?item=${item.slug}`}>Stripeで先行購入する <span aria-hidden="true">↗</span></Link> : <a className={styles.detailButton} href={ESSENTIALS_INTEREST_FORM} target="_blank" rel="noopener noreferrer">先行注文申込（お支払い前） <span aria-hidden="true">↗</span></a>}
            <p className={styles.detailCaution}>{commerce.ready?`先行販売・前払い。FIRST DROPのみ日本国内送料無料。お届け期限：${commerce.deliveryDeadline}（発送期限：${commerce.dispatchDeadline}）。キャンセル・返品条件は購入画面をご確認ください。`:"本商品は開発・試作準備中です。現在は販売、予約、決済を受け付けていません。アンケート回答は注文ではありません。"}</p>
          </div>
        </article>

        <section className={styles.details} aria-labelledby="product-features">
          <div className={styles.sectionHeader}>
            <div><p className={styles.chapter}>DESIGNED WITH INTENTION</p><h2 id="product-features">The Details.</h2></div>
            <p>{item.shape}</p>
          </div>
          <div className={styles.detailGrid}>
            {item.details.map((detail, index) => <div key={detail}><span>{String(index+1).padStart(2,"0")}</span><h3>{index===0?"FORM":index===1?"FIT":index===2?"SIGNATURE":"FINISH"}</h3><p>{detail}</p></div>)}
          </div>
        </section>
        <section className={styles.productEnd}>
          <p className={styles.chapter}>RBA / THE ESSENTIAL COLLECTION</p>
          <h2>Good things<br/><em>take intention.</em></h2>
          <p>実物サンプルの検品、サイズ表、販売価格、送料、発送予定、返品・交換条件を確認後、販売情報を公開します。</p>
          <div><Link href="/ja/essentials">← コレクションへ戻る</Link><a href={ESSENTIALS_INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagramで最新情報 ↗</a></div>
        </section>
      </div>
    </SiteFrame>
  );
}
