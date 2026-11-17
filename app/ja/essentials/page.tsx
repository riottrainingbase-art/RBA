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
  description: "RBA ESSENTIALS。仙台から全国・世界へ広がる育成の哲学を、コートの外へ。ホワイトTシャツとブラックセットアップ。現在は販売準備中です。",
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
        <a className={styles.skipCollection} href="#collection">商品一覧へ移動する</a>
        <nav className={styles.collectionNav} aria-label="RBA ESSENTIALS ショップ内のご案内">
          <span>RBA ESSENTIALS / ISSUE NO. 001</span>
          <div>
            <a href="#collection">THE COLLECTION</a>
            <a href="#philosophy">THE PHILOSOPHY</a>
            <Link href="/ja/essentials/story">OUR STORY</Link>
            <a href="#essentials-guide">BEFORE YOU ORDER</a>
          </div>
        </nav>
        <section className={styles.intro} aria-labelledby="essentials-title">
          <div className={styles.overline}><span>RBA / OFFICIAL APPAREL</span><span>FIRST DROP / 国内送料無料</span></div>
          <div className={styles.introBody}>
            <p className={styles.chapter}>COLLECTION 001 / THE EVERYDAY UNIFORM / RIOT BASKETBALL ACADEMY</p>
            <h1 id="essentials-title" className={styles.display}>ESSENTIALS<span>.</span></h1>
            <div className={styles.introBottom}>
              <div><p className={styles.lead}>勝敗の先に、残るものを。<br />コートの外にも、RBAの哲学を。</p><p className={styles.shopStatus} role="status">{commerce.ready ? "PRE-ORDER OPEN / 先行購入受付中" : "FIRST DROP IN DEVELOPMENT / 現在は販売・決済を受け付けていません"}</p></div>
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

        <section className={styles.identityRibbon} aria-label="RBA ブランド哲学">
          <span>RIOT BASKETBALL ACADEMY</span>
          <p>BUILT IN THE GYM. <em>WORN BEYOND IT.</em></p>
          <Link href="/ja/essentials/story">DISCOVER OUR STORY <span aria-hidden="true">↗</span></Link>
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

        <section id="philosophy" className={styles.manifesto} aria-label="RBA ESSENTIALS のデザイン哲学">
          <p className={styles.chapter}>02 / THE PHILOSOPHY</p>
          <p className={styles.manifestoHeadline}>LESS, <em>but</em><br />MORE RBA.</p>
          <div className={styles.manifestoFooter}>
            <span>THE JOURNEY / THE HUMAN MARK / LONG WEAR</span>
            <p>勝った日も、負けた日も。<br />挑戦を重ねた時間にこそ、残しておきたい価値がある。</p>
          </div>
        </section>

        <section className={styles.origin} aria-labelledby="origin-title">
          <div className={styles.originAside}>
            <p className={styles.chapter}>03 / THE REASON</p>
            <span>FROM SENDAI,<br/>BEYOND THE COURT.</span>
          </div>
          <div className={styles.originContent}>
            <p className={styles.originMini}>THE STORY BEHIND THE LABEL</p>
            <h2 id="origin-title">服を売るために、<br/><em>バスケットボールを</em><br/>始めたんじゃない。</h2>
            <div className={styles.originFoot}>
              <p>仙台から全国、そしてアジアへ。RBAが向き合ってきたのは、子どもたちが自分で考え、挑戦し、成長できる環境づくりです。目の前の勝利だけにとらわれず、コートの外にも広がる可能性を大切にしたい。</p>
              <p>ESSENTIALSは、その考えを日常に持ち帰るための一着。大きな主張ではなく、いつもの服に小さく残る意思を。</p>
            </div>
            <Link className={styles.originLink} href="/ja/essentials/story">OUR ROOTS. OUR PHILOSOPHY. <span aria-hidden="true">EXPLORE THE STORY ↗</span></Link>
          </div>
        </section>

        <section className={styles.details} aria-labelledby="details-title">
          <div className={styles.sectionHeader}>
            <div><p className={styles.chapter}>04 / THE DETAILS</p><h2 id="details-title">Quiet by design.</h2></div>
            <p>2つのアイテムに共通する、小さなこだわり。</p>
          </div>
          <div className={styles.detailGrid}>
            <div><span>01</span><h3>ONE SIGNATURE</h3><p>公式RBAロゴを用いた小型ワッペン。縦約4cmを候補に、織り・縫製・耐洗濯性を確認します。</p></div>
            <div><span>02</span><h3>CONSISTENT LABEL</h3><p>首元のブランド表示を揃えて、手に取ったときにもRBAの一着だと伝わる仕様に。</p></div>
            <div><span>03</span><h3>EVERYDAY FIT</h3><p>トレーニングの行き帰りも、日常も。ゆとりとシルエットにこだわってサイズを検証します。</p></div>
          </div>
        </section>

        <section id="essentials-guide" className={styles.buyersGuide} aria-labelledby="essentials-guide-heading">
          <div className={styles.guideIntro}>
            <p className={styles.chapter}>05 / BEFORE YOU ORDER</p>
            <h2 id="essentials-guide-heading">Details matter.<br/><em>So does trust.</em></h2>
            <p>「良さそう」だけで購入してほしくないから。製造・サイズ・お届けについて、現時点でお伝えできることと、まだ確認中のことを分けて公開します。</p>
            <Link href="/ja/essentials/legal">販売条件・特定商取引法に基づく表記 ↗</Link>
          </div>
          <div className={styles.guideQuestions}>
            <details><summary>現在、購入や決済はできますか？ <span aria-hidden="true">＋</span></summary><p>{commerce.ready ? "先行購入を受け付けています。購入前にサイズ表・表示価格・発送予定・キャンセルおよび返品条件を確認してください。" : "現在は購入・予約・決済の受付前です。掲載している価格とデザインは、正式販売に向けたご案内です。関心登録フォームへの回答は注文にはなりません。"}</p></details>
            <details><summary>掲載画像は実際の商品ですか？ <span aria-hidden="true">＋</span></summary><p>現在の商品画像はデザイン確認用のCGで、量産品を撮影したものではありません。素材感・縫製・ロゴ位置は最終サンプル確認後に確定します。</p></details>
            <details><summary>サイズ・生地・着用感は確認できますか？ <span aria-hidden="true">＋</span></summary><p>実測サイズ、生地組成、厚み、お手入れ方法は確認中です。確定した情報を掲載するまでは、見た目だけでサイズを選んでいただく販売は開始しません。</p></details>
            <details><summary>送料とお届け時期は？ <span aria-hidden="true">＋</span></summary><p>{commerce.ready ? `FIRST DROPの国内送料は無料です。発送期限は${commerce.dispatchDeadline}、お届け期限は${commerce.deliveryDeadline}です。購入前に正式な販売条件をご確認ください。` : "FIRST DROPの日本国内送料は無料とする予定です。正式な発送日・お届け期限は製造体制の確認後、購入手続きの前に明示します。現在は前払いを受け付けていません。"}</p></details>
            <details><summary>商品を買うとRBAの育成を支援できますか？ <span aria-hidden="true">＋</span></summary><p>製造費・販売経費などを差し引いた利益をRBAの育成活動に充てる方針です。これはアパレルの売買であり、寄附や寄附金控除の対象として案内するものではありません。購入の有無がRBAの指導や参加機会に影響することはありません。</p></details>
          </div>
        </section>

        <section className={styles.launch} aria-labelledby="launch-title">
          <p className={styles.chapter}>06 / FIRST DROP / IN DEVELOPMENT</p>
          <h2 id="launch-title">Built to last.<br /><em>Not rushed.</em></h2>
          <p>{commerce.ready ? "公式ウェアの先行購入受付中。商品サイズ、税込総額、発送期限、キャンセル・返品条件をご確認のうえ、Stripeで購入いただけます。販売による利益はRBAの育成活動に活用します。" : "先行販売の国内送料は無料です。税込価格は白Tシャツ4,900円、黒セットアップ19,800円。製造・発送・返品と決済の最終確認が終わるまで、前払いは受け付けません。利益はRBAの育成活動に活用します。"}</p>
          <div className={styles.launchLinks}>
            {commerce.ready ? <Link className={styles.darkButton} href="/ja/essentials/checkout">先行購入する <span aria-hidden="true">↗</span></Link> : <a className={styles.darkButton} href={ESSENTIALS_INTEREST_FORM} target="_blank" rel="noopener noreferrer">発売前の関心登録（決済なし） <span aria-hidden="true">↗</span></a>}
            <a className={styles.textLink} href={ESSENTIALS_INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagramで最新情報を見る <span aria-hidden="true">↗</span></a>
          </div>
          <p className={styles.launchFine}>{commerce.ready ? `先行販売・前払い。国内送料0円（FIRST DROP限定）。お届け期限：${commerce.deliveryDeadline}（発送期限：${commerce.dispatchDeadline}）。` : "関心登録は無料で、注文や予約の成立・商品の確保を意味しません。送料0円はFIRST DROPの国内販売にのみ適用します。"}</p>
        </section>
        <footer className={styles.collectionFooter}><span>RBA ESSENTIALS © RIOT BASKETBALL ACADEMY</span><a href="mailto:riot.training.base@gmail.com">CONTACT / EMAIL ↗</a></footer>
      </div>
    </SiteFrame>
  );
}
