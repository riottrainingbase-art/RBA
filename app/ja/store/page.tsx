import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { ApparelInterestPath } from "@/components/apparel-interest-path";
import {
  canSellPerformanceTee,
  performanceTeeRelease,
  PERFORMANCE_TEE_INTEREST_FORM,
  safePerformanceTeeProductUrl,
} from "@/lib/performance-tee-launch";
import styles from "./store.module.css";

export const metadata: Metadata = {
  title: "RBA PERFORMANCE TEE | Riot Basketball Academy 公式スポーツウェア",
  description:
    "コートへ、その先へ。Riot Basketball Academy公式Performance Tee。発売状況・着用設計・購入前の確認事項をご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/store" },
  openGraph: {
    title: "RBA PERFORMANCE TEE | コートへ、その先へ。",
    description: "RBA公式スポーツウェアの第一弾。製品の検証と発売情報はこちら。",
    url: "https://riotbasketballacademy.com/ja/store",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/rba-logo-original.jpg" }],
  },
};

const ready = canSellPerformanceTee(performanceTeeRelease);
const checkoutUrl = ready
  ? safePerformanceTeeProductUrl(performanceTeeRelease.confirmedShopifyProductUrl)
  : null;

const features = [
  {
    number: "01",
    title: "FOR THE COURT",
    subtitle: "毎日の練習に。",
    detail:
      "現在の候補はSOL’S 11939。通気性のあるポリエステルメッシュ、140g/㎡、リラックスフィットのラグランスリーブ。着用サンプルで適合性を確かめてから最終採用します。",
  },
  {
    number: "02",
    title: "OFFICIAL RBA",
    subtitle: "本物の公式ロゴを。",
    detail:
      "RBAの公式ロゴを用いたシンプルなブラックを検討中。仕上がり、プリント耐久性、サイズ感は製造サンプルの確認後に確定します。",
  },
  {
    number: "03",
    title: "MADE WHEN ORDERED",
    subtitle: "必要な分だけ届ける。",
    detail:
      "在庫を大量に抱えない受注生産方式を予定しています。製造・配送会社との連携を確認した国・地域のみで販売し、送料を購入前に明示します。",
  },
] as const;

const questions = [
  {
    question: "いつ購入できますか？",
    answer:
      "正式な発売日と販売価格はまだ確定していません。製品サンプル、サイズ、配送・返品条件、決済と製造の接続テストが完了した段階で、公式サイトとInstagramからご案内します。",
  },
  {
    question: "価格とサイズは？",
    answer:
      "現在のShopify管理画面の価格やXS・3XLを含む登録内容は旧案の仮設定です。実際に販売するサイズと日本円の価格は、サンプルと製造費用を確認した後に表示します。現時点で確定価格を掲示しません。",
  },
  {
    question: "海外からも購入できますか？",
    answer:
      "日本に加え、台湾・マレーシアへの発送も検討しています。ただし、対応国・送料・関税・到着目安は未確定です。購入できる地域だけを注文時に選択可能にします。",
  },
  {
    question: "受注生産なら返品できませんか？",
    answer:
      "受注生産だからすべての返品・交換をお断りする、という対応ではありません。不良品・誤配送・キャンセル・サイズ交換の条件を、正式販売前に明示します。",
  },
] as const;

export default function StorePage() {
  return <SiteFrame locale="ja">
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="store-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / OFFICIAL COLLECTION</p>
          <p className={styles.status}>{checkoutUrl ? "NOW AVAILABLE" : "FIRST DROP / LAUNCH PREPARATION"}</p>
          <h1 id="store-title">コートへ、<br />その先へ。<br /><span>RBAと。</span></h1>
          <p className={styles.lead}>
            着るたびに、次のコートを思い出す。<br />
            RBAがつくる、最初のパフォーマンスウェア。
          </p>
          <p className={styles.productName}>RBA PERFORMANCE TEE <span>01 / BLACK</span></p>
          {checkoutUrl ? <a className={styles.button} href={checkoutUrl} target="_blank" rel="noopener noreferrer" data-growth-id="store-performance-buy">
            Shopifyで購入する <span aria-hidden="true">↗</span>
          </a> : <>
            <p className={styles.noCheckout}>現在は発売準備中です。ご注文・ご予約・お支払いは受け付けていません。</p>
            <a className={styles.button} href={PERFORMANCE_TEE_INTEREST_FORM} target="_blank" rel="noopener noreferrer" data-growth-id="store-performance-survey">
              発売前アンケートに回答する <span aria-hidden="true">↗</span>
            </a>
            <p className={styles.surveyHelp}>無料・購入予約ではありません。回答に決済は発生しません。</p>
          </>}
        </div>
        <figure className={styles.visual}>
          <div className={styles.shirt} aria-hidden="true">
            <div className={styles.collar}/>
            <Image className={styles.logo} src="/rba-logo-original.jpg" width={203} height={312} alt="" />
          </div>
          <div className={styles.visualCaption}><span>RBA / PERFORMANCE TEE</span><strong>COLLECTION 01</strong></div>
          <figcaption>デザイン検討図です。実際の商品写真ではありません。ロゴの位置、素材、仕上がりは最終確認前です。</figcaption>
        </figure>
      </section>

      <section className={styles.section} id="details" aria-labelledby="details-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>PRODUCT PHILOSOPHY</p>
          <h2 id="details-title">パフォーマンスにも、<br />日常にも。</h2>
          <p>「RBAらしさ」と「練習で着られる品質」。両方が成立するまで、仕様をごまかさずに準備します。</p>
        </div>
        <div className={styles.grid}>
          {features.map(({number,title,subtitle,detail})=><article key={number}>
            <span className={styles.featureNum}>{number} / {title}</span>
            <h3>{subtitle}</h3><p>{detail}</p>
          </article>)}
        </div>
      </section>

      <section className={styles.preparation} aria-labelledby="next-title">
        <div>
          <p className={styles.eyebrow}>FROM SAMPLE TO DELIVERY</p>
          <h2 id="next-title">販売までの約束。</h2>
          <p className={styles.preparationLead}>発売前に、製品の品質も、お支払い後の流れも確かめます。</p>
        </div>
        <div>
          <ol className={styles.launchSteps}>
            <li><span>01</span><div><strong>製品・ロゴの検証</strong><p>生地、着心地、サイズ、印刷品質と洗濯後の状態をサンプルで確認。</p></div></li>
            <li><span>02</span><div><strong>価格・発送条件の確定</strong><p>販売価格・送料・税・対応国・キャンセルと返品条件を掲載。</p></div></li>
            <li><span>03</span><div><strong>販売と製造の接続テスト</strong><p>決済・製造発注・発送追跡まで実際の注文で検証。</p></div></li>
          </ol>
          {checkoutUrl?<a className={styles.lightButton} href={checkoutUrl} target="_blank" rel="noopener noreferrer" data-growth-id="store-buy-bottom">
            公式Shopifyで購入する <span aria-hidden="true">↗</span>
          </a>:<a className={styles.lightButton} href={PERFORMANCE_TEE_INTEREST_FORM} target="_blank" rel="noopener noreferrer" data-growth-id="store-survey-bottom">
            発売前アンケート <span aria-hidden="true">↗</span>
          </a>}
          <a className={styles.textLink} href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">発売情報は公式Instagramから ↗</a>
        </div>
      </section>

      <ApparelInterestPath />

      <section className={styles.section} aria-labelledby="faq-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>QUESTIONS & ANSWERS</p>
          <h2 id="faq-title">購入前に知っておきたいこと。</h2>
        </div>
        <div className={styles.faq}>
          {questions.map(({question,answer})=><details key={question}>
            <summary>{question}</summary><p>{answer}</p>
          </details>)}
        </div>
        <p className={styles.smallPrint}>
          本ページはRiot Basketball Academy公式商品のご案内です。製品の仕様・販売価格・発送可能地域は正式発売時に確定します。
          <a href="mailto:riot.training.base@gmail.com?subject=RBA%20Performance%20Tee"> 商品に関するお問い合わせはこちら。</a>
        </p>
      </section>
    </main>
  </SiteFrame>;
}
