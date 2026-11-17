import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";
import styles from "../essentials.module.css";

export const dynamic="force-dynamic";
export const metadata: Metadata = {
  title: "購入前に知っておきたいこと | RBA STORE",
  description: "RBA公式ウェアのサイズ・商品画像・先行販売・国内送料・発送・返品・購入方法を確認するガイド。販売開始前の確認事項も透明にお知らせします。",
  alternates:{canonical:"/ja/essentials/guide"},
  robots:{index:false,follow:true},
};

const importantQuestions=[
  {question:"いま、支払いはできますか？",answer:"製品検証・販売条件の最終確認が完了するまでは、お支払いを受け付けません。無料アンケートへの回答は、注文や購入予約ではありません。販売を開始する場合は、商品仕様・総額・納期・返品条件を確認できる専用画面を公開します。"},
  {question:"掲載されている写真と同じ製品が届きますか？",answer:"現在の画像はデザイン検討用のCGイメージであり、実物撮影ではありません。生地感、シルエット、ロゴの仕上がりなどは量産仕様と異なる可能性があります。販売開始前に現物の写真と確定仕様を掲載します。"},
  {question:"サイズはどのように選べばいいですか？",answer:"S・M・L・XLは現時点の検討対象で、確定した実寸表はまだ公開していません。セットアップは上衣とパンツの各サイズを別々に確認できる購入手続きを準備しています。実寸表が掲載されるまでは、サイズ選択を伴う決済は行いません。"},
  {question:"送料とお届け時期は？",answer:"FIRST DROPの日本国内送料は0円を予定しています。販売を開始する際は、注文受付の期限、発送期限とお届け期限を購入前に明示します。具体的な日付は製造と発送体制の確認後にご案内します。"},
  {question:"キャンセルや不良品の対応は？",answer:"購入前にキャンセル条件、返品・交換の対象、連絡方法をご確認いただけるようにします。品質に問題がある場合の対応も含め、条件を確定するまでは販売しません。"},
  {question:"服の購入は、RBAの活動への寄付になりますか？",answer:"いいえ。これは物品の購入であり、寄付金控除を受けるための寄付ではありません。製造費・発送費・決済手数料などの必要経費を差し引いた販売利益を、RBAの育成活動に充てる方針です。購入しなくても、RBAの活動参加や指導上の扱いが不利になることはありません。"},
] as const;

export default function EssentialsGuidePage(){
  const config=getEssentialsPresaleConfig();
  return (
    <SiteFrame locale="ja">
      <main className={styles.page}>
        <div className={styles.productBreadcrumb}><Link href="/ja/store">RBA STORE</Link><span aria-hidden="true">/</span><span>BEFORE YOU BUY</span></div>
        <header className={styles.guideOpening}>
          <div><p className={styles.chapter}>A CONSIDERED PURCHASE / RBA STORE</p>
            <h1>Good design.<br/><em>Clear promises.</em></h1></div>
          <div className={styles.guideOpeningFoot}>
            <p>気に入った一着を、納得して選んでほしい。</p>
            <p>見た目だけでなく、素材・サイズ・お届けまで。現時点で決まっていることと、まだ確認中のことを分けてお伝えします。</p>
          </div>
        </header>
        <section className={styles.guideStatus} aria-label="現在の販売状況">
          <span className={styles.guideStatusDot} aria-hidden="true"/>
          <div><p className={styles.chapter}>CURRENT STATUS</p><h2>{config.ready?"販売条件を確認のうえ、先行受付中":"現在は販売準備中です"}</h2>
          <p>{config.ready?"商品ページでサイズ・税込価格・お届け予定・キャンセル条件をご確認ください。":"まだ代金のお支払いや購入予約は受け付けていません。無料アンケートは注文ではありません。"}</p></div>
          <Link href="/ja/essentials">商品を見る ↗</Link>
        </section>
        <section className={styles.guideEssentials} aria-labelledby="guide-essentials-heading">
          <div className={styles.guideHeading}><p className={styles.chapter}>FIRST DROP / THE FACTS</p><h2 id="guide-essentials-heading">What we know.</h2></div>
          <div className={styles.guideFacts}>
            <article><span>01 / PIECES</span><h3>2つの形から。</h3><p>ホワイトのTシャツと、ブラックのフーディ＆パンツ。日常に溶け込む服を目指します。</p></article>
            <article><span>02 / PRICE</span><h3>¥4,900 / ¥19,800</h3><p>FIRST DROPの税込予定価格。Tシャツとセットアップの順です。ご購入前に最終金額を表示します。</p></article>
            <article><span>03 / SHIPPING</span><h3>日本国内 0円</h3><p>送料無料はFIRST DROPの国内先行販売限定です。発売後の商品・配送条件とは区別します。</p></article>
            <article><span>04 / QUALITY</span><h3>実物を確かめてから。</h3><p>{config.ready?"実物サンプルの仕様に基づいて販売しています。サイズ・素材・お手入れ方法をご確認ください。":"生地・縫製・ワッペン・サイズ実寸・洗濯後の状態を確認してから正式に商品仕様を公開します。"}</p></article>
          </div>
        </section>
        <section className={styles.guideFaq} aria-labelledby="guide-faq-heading">
          <div className={styles.guideFaqTop}><p className={styles.chapter}>QUESTIONS / ANSWERED</p><h2 id="guide-faq-heading">Before you choose.</h2><p>未確定なことを、確定したように見せない。その姿勢もRBAのブランドの一部です。</p></div>
          <div>
            {importantQuestions.map((entry,i)=><details className={styles.guideFaqItem} key={entry.question}>
              <summary><span>{String(i+1).padStart(2,"0")}</span>{entry.question}<span aria-hidden="true" className={styles.guideFaqPlus}>＋</span></summary>
              <p>{config.ready ? (i===1?"掲載写真は確認済みの実物商品です。商品実寸・素材と色味の注意点を購入前にご確認ください。":i===0?"先行購入受付中です。商品仕様、価格、発送・お届け期限、キャンセル・返品条件をご確認ください。":i===2?"商品詳細で確定した素材と実寸をご確認ください。不明な点があれば購入前にお問い合わせください。":i===3?`国内送料はFIRST DROP限定で0円です。発送期限：${config.dispatchDeadline}、お届け期限：${config.deliveryDeadline}。`:i===4?"キャンセル・返品・不良品対応は販売条件ページでご確認ください。":entry.answer) : entry.answer}</p>
            </details>)}
          </div>
        </section>
        <section className={styles.guideEnd}>
          <p className={styles.chapter}>THE NEXT CHAPTER IS MADE WITH CARE.</p>
          <h2>No shortcuts.<br/><em>No false promises.</em></h2>
          <p>{config.ready?"販売条件・実寸・納期をご確認のうえ、納得できる商品をお選びください。":"正式な商品説明が整ってから、購入を選べる状態にします。販売条件の確定前に決済を求めることはありません。"}</p>
          <div><Link href="/ja/store">ショップトップへ ↗</Link><Link href="/ja/essentials/story">ブランドの背景 ↗</Link><Link href="/ja/essentials/legal">法定表示・販売条件 ↗</Link></div>
        </section>
      </main>
    </SiteFrame>
  );
}
