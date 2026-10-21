import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import "./goods.css";

const official = "https://riotbasketballacademy.com/ja/goods";

export const metadata: Metadata = {
  title: "RBA GOODS｜在庫を持たない公式グッズ企画｜Riot Basketball Academy",
  description: "RBAの活動と育成理念を日常に。Tシャツ・3x3ウェア・コーチ向けグッズの企画を公開中。在庫を先に製造せず、正式な購入先・価格・送料が確認できた商品だけ販売します。",
  alternates: { canonical: official },
  openGraph: {
    title: "RBA GOODS｜RIOT BASKETBALL ACADEMY",
    description: "RBA公式グッズ企画。販売条件と品質確認が完了した商品からご案内します。",
    url: official,
    locale: "ja_JP",
    type: "website",
    siteName: "Riot Basketball Academy",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};

function verifiedExternalShop(): string | null {
  // A supplier/shop URL is deliberately never guessed or auto-generated.
  // Operator must verify ownership, product availability, tax/shipping and refund conditions.
  if (process.env.RBA_GOODS_STORE_VERIFIED !== "true") return null;
  const raw = process.env.RBA_GOODS_STORE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:") return null;
    if (![
      "up-t.jp", "market.up-t.jp", "goods.up-t.jp",
      "suzuri.jp", "fourthwall.com"
    ].some(allowed => host === allowed || host.endsWith("." + allowed))) return null;
    return url.toString();
  } catch {
    return null;
  }
}

const concepts = [
  {
    id: "01", tag: "CORE / EVERYDAY", name: "RBA CORE TEE",
    phrase: "PLAY. THINK. GROW.",
    description: "RBAの活動理念を、体育館の外でも着られるシンプルな一枚に。既存のRTB・Ball Line製ウェアとは別企画として検討しています。",
    details: "黒・白を軸に検討／サイズ・素材・価格は未確定",
  },
  {
    id: "02", tag: "BASKETBALL / 3×3", name: "BACKBONE TEE",
    phrase: "THE GAME BELONGS TO EVERYONE.",
    description: "試合機会と挑戦を大切にするBACKBONEの考え方を表現。特定チームや大会の公式ユニフォームではありません。",
    details: "普段着向けデザインを検討／練習着としての性能は未検証",
  },
  {
    id: "03", tag: "COACH / OFF COURT", name: "RBA COACH TOTE",
    phrase: "TEACH THE GAME.",
    description: "指導者がノートや練習道具を持ち運ぶ場面をイメージした日常使いのグッズ。講師・クラブの監修や推薦を意味しません。",
    details: "生地・印刷面・容量・価格は未確定",
  },
] as const;

export default function RbaGoodsPage() {
  const shopUrl = verifiedExternalShop();
  return <SiteFrame locale="ja">
    <div className="rg-page">
      <section className="rg-hero" aria-labelledby="rg-title">
        <div className="rg-shell">
          <p className="rg-eyebrow">RBA / OFFICIAL GOODS PROJECT</p>
          <h1 id="rg-title">THE GAME.<br/><em>BEYOND THE COURT.</em></h1>
          <p className="rg-lede">バスケットボールの学びも、挑戦も、日常へ。<br/>Riot Basketball Academyの公式グッズ企画。</p>
          <div className="rg-hero-foot">
            <span className="rg-status">{shopUrl ? "公式販売先を公開中" : "商品企画公開中・注文受付前"}</span>
            <span>MADE TO ORDER / NO PRE-BUILT STOCK</span>
          </div>
          {shopUrl ? <a href={shopUrl} className="rg-cta" target="_blank" rel="noopener noreferrer">出品先の正式価格・発送条件を確認する ↗</a>
            : <a href="#rg-lineup" className="rg-cta">商品企画を見る ↓</a>}
        </div>
      </section>

      <section id="rg-lineup" className="rg-shell rg-content" aria-labelledby="rg-lineup-title">
        <div className="rg-intro">
          <div><p className="rg-eyebrow rg-eyebrow-dark">FIRST COLLECTION / CONCEPT</p><h2 id="rg-lineup-title">まず、3つだけ。</h2></div>
          <p>最初から商品数を増やさず、Tシャツ2種と日常使いのグッズ1種に絞って企画を進めます。以下は販売前のコンセプト紹介です。<strong>価格や購入可能な商品仕様ではありません。</strong></p>
        </div>
        <div className="rg-grid">
          {concepts.map(item => <article className="rg-card" key={item.id}>
            <div className="rg-art" aria-hidden="true">
              <span className="rg-art-corner">RIOT BASKETBALL ACADEMY</span>
              <span className="rg-art-phrase">{item.phrase}</span>
              <span className="rg-art-foot">RBA / {item.id}</span>
            </div>
            <div className="rg-card-body">
              <p className="rg-card-tag">{item.tag}</p>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="rg-details">{item.details}</p>
              <span className="rg-coming">仕様・販売価格は確定後に公開</span>
            </div>
          </article>)}
        </div>
      </section>

      <section className="rg-process" aria-labelledby="rg-process-title">
        <div className="rg-shell">
          <p className="rg-eyebrow">HOW IT WILL WORK</p>
          <h2 id="rg-process-title">在庫を持たず、<br/>注文後に製造する。</h2>
          <p className="rg-process-intro">国内では、注文・製造・発送までを外部プラットフォームが扱う方式を優先しています。RBAが先に何十枚も発注するモデルではありません。</p>
          <div className="rg-steps">
            <div><span>01</span><h3>正式な販売ページで注文</h3><p>販売を開始した後は、商品の仕様・価格・送料・販売条件を外部ショップで確認します。</p></div>
            <div><span>02</span><h3>注文後に製造</h3><p>販売先が受注生産に対応する商品を選び、在庫を先に仕入れない方式にします。</p></div>
            <div><span>03</span><h3>販売先から発送</h3><p>製造・配送・不良品対応の窓口と条件は、実際の販売サービスに合わせて明示します。</p></div>
          </div>
        </div>
      </section>

      <section className="rg-shell rg-faq" aria-labelledby="rg-faq-title">
        <p className="rg-eyebrow rg-eyebrow-dark">BEFORE YOU ORDER</p>
        <h2 id="rg-faq-title">販売に関するご案内</h2>
        <details open><summary>いま注文や予約はできますか？</summary><p>{shopUrl ? "正式な商品・決済・発送条件は外部の公式販売先に表示されます。このページ自体では決済を受け付けません。" : "まだできません。現在はデザイン・製造条件を検討している段階で、決済・予約・仮申込を受け付けていません。"}</p></details>
        <details><summary>価格と送料はいくらですか？</summary><p>商品仕様と製造原価が確定するまで提示しません。販売開始後は購入先で税込価格・送料・納期を必ずご確認ください。</p></details>
        <details><summary>海外への配送はできますか？</summary><p>日本向けから検証しています。マレーシア・台湾等への発送は、対象商品、送料、税・関税、販売サービスの対応が確認できるまで受付可能とは案内しません。</p></details>
        <details><summary>返品やサイズ交換はできますか？</summary><p>販売サービス・商品の受注生産条件により異なります。商品ページの返品・不良品・サイズ交換規定をご確認ください。RBAから独自の返品保証は約束していません。</p></details>
        <details><summary>既存のチームウェアと同じものですか？</summary><p>別企画です。RTBの既存ウェア、クラブの指定ユニフォーム、講習の参加費とは区別しています。第三者のクラブロゴや講師の肖像・肩書等は使用しません。</p></details>
      </section>

      <section className="rg-contact">
        <div className="rg-shell">
          <p className="rg-eyebrow">RBA / YOUR VOICE</p>
          <h2>欲しいのは、<br/>どんな一枚ですか。</h2>
          <p>サイズ・商品種別・デザインのご希望は、既存の公式お問い合わせ先でお聞かせください。個人情報の販売リストへの追加や、自動配信は行いません。</p>
          {shopUrl?<a className="rg-cta" href={shopUrl} target="_blank" rel="noopener noreferrer">公式の販売先を確認する ↗</a>
            :<Link className="rg-cta" href="/ja/contact">RBAに希望を伝える ↗</Link>}
          <p className="rg-footnote">RBA GOODSは商品企画です。ショップ開設・出品完了・販売開始を示すページではありません。</p>
        </div>
      </section>
    </div>
  </SiteFrame>;
}
