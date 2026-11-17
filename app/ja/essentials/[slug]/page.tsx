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
  if (!item) return { title: "RBA STORE" };
  const ready=getEssentialsPresaleConfig().ready;
  return {
    title: `${item.title} | RBA STORE`,
    description: `${item.description} ${ready?"公式先行販売の商品詳細をご確認ください。":"現在は製品検証中につき注文・予約・決済を受け付けていません。"}`,
    alternates: { canonical: item.pagePath },
    openGraph: {
      title: `${item.title} | RBA STORE`,
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
  const priceText = commerce.ready && unitPrice !== null
    ? `¥${unitPrice.toLocaleString("ja-JP")}（税込）`
    : "発売時にご案内";
  const checkoutPath = `/ja/essentials/checkout?item=${item.slug}`;
  const nextItem=essentials.find((entry)=>entry.slug!==item.slug)!;

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
      <div className={[styles.page, commerce.ready && styles.productWithOrder].filter(Boolean).join(" ")}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}/>
        <div className={styles.productBreadcrumb}><Link href="/ja/essentials">RBA STORE</Link><span aria-hidden="true">/</span><span>{item.number} — {item.name}</span></div>
        <article className={styles.detailLayout}>
          <div className={styles.detailPhoto}>
            <img src={item.image} alt={item.alt} fetchPriority="high"/>
            <p>RBA STORE / 商品イメージ</p>
          </div>
          <div className={styles.detailCopy}>
            <p className={styles.chapter}>RBA STORE / COLLECTION 001 / LOOK {item.number} / {item.color}</p>
            <h1>RBA {item.name}</h1>
            <p className={styles.detailStatement}>{item.statement}</p>
            <p className={styles.detailDescription}>{item.description}</p>
            <div className={styles.detailRule}>
              <span>カラー</span><strong>{item.colorJa} / {item.color}</strong>
            </div>
            <div className={styles.detailRule}>
              <span>サイズ</span><strong>{commerce.ready?"S / M / L / XL":"サンプル確認後に確定"}</strong>
            </div>
            <div className={styles.detailRule}>
              <span>価格</span><strong>{priceText}</strong>
            </div>
            {!commerce.ready && <p className={styles.detailSize}>{item.sizeNote}</p>}
            <p className={styles.productStatus} role="status">{commerce.ready?"先行購入受付中":"販売準備中｜現在は注文・予約・決済を受け付けていません"}</p>
            {commerce.ready ? <Link className={styles.detailButton} href={checkoutPath}>サイズを選んで先行購入へ <span aria-hidden="true">↗</span></Link> : <a className={styles.detailButton} href={ESSENTIALS_INTEREST_FORM} target="_blank" rel="noopener noreferrer">発売前アンケートに回答する <span aria-hidden="true">↗</span></a>}
            <p className={styles.detailCaution}>{commerce.ready?`先行販売・前払い。FIRST DROPのみ日本国内送料無料。お届け期限：${commerce.deliveryDeadline}（発送期限：${commerce.dispatchDeadline}）。キャンセル・返品条件は購入画面をご確認ください。`:"本商品は開発・試作準備中です。正式な素材と実寸は、サンプル確認後に掲載します。アンケートは無料で回答できます。"}</p>
            <aside className={styles.detailHandwritten} aria-label="手書きカスタム">
              <strong>手書きカスタム</strong>
              <p>{item.slug === "setup" ? "セットアップのパーカー" : "白T"}に、お好きな短い言葉を手書きで添える特別仕様です。</p>
              {commerce.handwrittenAvailable && commerce.handwrittenJPY !== null ? (
                <Link href={checkoutPath + "#handwritten-option"}>手書きカスタムを選ぶ（追加 ¥{commerce.handwrittenJPY.toLocaleString("ja-JP")}・税込）</Link>
              ) : (
                <Link href="/ja/essentials#handwritten">受付準備中 · 手書きカスタムの詳細を見る</Link>
              )}
            </aside>
          </div>
        </article>

        <aside className={styles.productPromises} aria-label="ご購入前に確認いただきたいこと">
          <div><span>01 / PHOTO</span><p>商品画像はイメージです。色味・生地・仕上がりは実際の商品と異なる場合があります。</p></div>
          <div><span>02 / FIT & FABRIC</span><p>{commerce.ready?"実寸・生地組成・お手入れ方法を商品説明で確認してください。":"実測サイズ・生地の組成・厚み・洗濯表示はサンプル確認後に公開します。"}</p></div>
          <div><span>03 / DELIVERY</span><p>{commerce.ready?`FIRST DROPは国内送料無料。発送期限：${commerce.dispatchDeadline}、お届け期限：${commerce.deliveryDeadline}。返品条件は販売条件ページをご確認ください。`:"FIRST DROPは国内送料無料を予定。正式な発送・返品条件を購入前に表示します。"}</p></div>
        </aside>

        <section className={styles.productBelief} aria-label="RBAの公式ウェアの背景">
          <div>
            <p className={styles.chapter}>THE BRAND IS THE BELIEF.</p>
            <h2>コートで育った、<br/><em>RBAの考え方。</em></h2>
          </div>
          <div>
            <p>バスケットボールが好きだから、育成のあり方を考え続ける。仙台から全国・アジアへ、選手の選択肢を広げてきたRBAの活動と、その背景にある哲学。</p>
            <Link href="/ja/essentials/story">RBAがウェアをつくる理由 <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
        <section className={styles.details} aria-labelledby="product-features">
          <div className={styles.sectionHeader}>
            <div><p className={styles.chapter}>DESIGNED WITH INTENTION</p><h2 id="product-features">デザインと仕様</h2></div>
            <p>{item.colorJa}</p>
          </div>
          <div className={styles.detailGrid}>
            {item.details.map((detail, index) => <div key={detail}><span>{String(index+1).padStart(2,"0")}</span><h3>{index===0?"シルエット":index===1?"デザイン":index===2?"ディテール":"仕上げ"}</h3><p>{detail}</p></div>)}
          </div>
        </section>
        <section className={styles.productQuestions} aria-labelledby="product-questions-heading">
          <div><p className={styles.chapter}>PRODUCT INFORMATION / FIRST DROP</p><h2 id="product-questions-heading">購入前によくある質問</h2><p>長く使う一着だからこそ、販売前に確かめたいことを明確にしています。</p></div>
          <div className={styles.productAnswers}>
            <details><summary>この商品はいつ購入できますか？ <span aria-hidden="true">＋</span></summary><p>{commerce.ready?"先行購入受付中です。注文画面で販売条件をご確認ください。":"製造・実物確認・サイズ表・発送期限・決済連携が整ってからご案内します。現在は注文・決済を受け付けていません。"}</p></details>
            <details><summary>素材とサイズは確認できますか？ <span aria-hidden="true">＋</span></summary><p>{commerce.ready?`${item.sizeNote} 素材と洗濯表示を購入前にご確認ください。`:`${item.sizeNote} 生地組成や洗濯方法も最終サンプルの仕様確定後に掲載します。`}</p></details>
            <details><summary>返品・キャンセルについて教えてください。 <span aria-hidden="true">＋</span></summary><p>{commerce.ready?"キャンセル・返品条件は": "商品ごとの確定したキャンセル・返品条件は、販売開始前に"}<Link href="/ja/essentials/legal">販売条件ページ</Link>{commerce.ready?"でご確認ください。":"でご案内します。現時点で購入契約は成立しません。"}</p></details>
          </div>
        </section>

        <section className={styles.nextLook} aria-labelledby="next-look-title">
          <div><p className={styles.chapter}>COMPLETE THE EDIT / {nextItem.number}</p><h2 id="next-look-title">もう一つのアイテム</h2><p>{nextItem.statement}</p><Link href={nextItem.pagePath}>{nextItem.name}を見る <span aria-hidden="true">↗</span></Link></div>
          <Link href={nextItem.pagePath} aria-label={nextItem.title+"の詳細を見る"}><img src={nextItem.image} loading="lazy" alt={nextItem.alt}/></Link>
        </section>

        <section className={styles.productEnd}>
          <p className={styles.chapter}>RBA STORE / COLLECTION 001</p>
          <h2>コレクションを見比べる</h2>
          <p>{commerce.ready?"RBAの育成理念を日常に。商品仕様と販売条件をご確認のうえ、お選びください。":"実物サンプル・実測サイズ・発送予定・返品条件を確認したうえで、購入受付を開始します。"}</p>
          <div><Link href="/ja/essentials">← コレクションへ戻る</Link><a href={ESSENTIALS_INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagramで最新情報 ↗</a></div>
        </section>
        {commerce.ready && <div className={styles.mobileOrder}>
          <div><strong>{priceText}</strong><small>国内送料無料</small></div>
          <Link href={checkoutPath}>サイズを選ぶ</Link>
        </div>}
      </div>
    </SiteFrame>
  );
}
