import { PERFORMANCE_TEE_INTEREST_FORM } from "@/lib/performance-tee-launch";
import styles from "./apparel-interest-path.module.css";

const items = [
  { number: "01", code: "RBA ORIGINAL", title: "PERFORMANCE TEE", subtitle: "練習でも日常でも。", stage: "製品検証中", note: "デザイン案は公開中。生地・サイズ・プリントの品質確認後に販売条件を確定します。" },
  { number: "02", code: "RBA ORIGINAL", title: "BASKETBALL SHORTS", subtitle: "プレーに集中できる一着。", stage: "製造条件を照会中", note: "動きやすさ、股下、透けにくさ、男女・ユースのサイズを重視し、見積とサンプルで判断します。" },
  { number: "03", code: "RBA TEAMWEAR", title: "CUSTOM TEAMWEAR", subtitle: "クラブの必要な分だけ。", stage: "小ロット条件を照会中", note: "チーム用ジャージ・リバーシブル・練習着。正式見積と納期が確定するまで注文を受けません。" },
  { number: "04", code: "GLOBAL SELECTION", title: "INTERNATIONAL BRANDS", subtitle: "海外の良い製品を、育成現場へ。", stage: "正規販売条件を確認中", note: "海外メーカーとは協議・照会段階です。日本販売権や代理店資格を取得したとの表示はしません。" },
] as const;

export function ApparelInterestPath() {
  return <section className={styles.section} aria-labelledby="rba-apparel-lineup">
    <div className={styles.intro}>
      <div>
        <p className={styles.eyebrow}>RBA APPAREL / EXPLORING THE NEXT COLLECTION</p>
        <h2 id="rba-apparel-lineup">コートで使えるものを、<br />必要な分だけ。</h2>
      </div>
      <p>RBAオリジナルウェアと、海外ブランドの日本導入は別の取り組みです。発売や取扱いを急がず、指導現場での使いやすさ・安全性・適正価格を確認します。</p>
    </div>
    <div className={styles.collection}>
      {items.map(item=><article key={item.number} className={styles.item}>
        <div className={styles.itemTop}>
          <span>{item.number} / {item.code}</span>
          <span className={styles.stage}>{item.stage}</span>
        </div>
        <h3>{item.title}</h3>
        <strong>{item.subtitle}</strong>
        <p>{item.note}</p>
      </article>)}
    </div>
    <div className={styles.action}>
      <div>
        <p className={styles.eyebrow}>BEFORE WE MAKE IT</p>
        <h3>欲しいものを、先に教えてください。</h3>
        <p>サイズ、価格帯、希望の商品を無料アンケートで確認しています。購入予約ではなく、支払いも必要ありません。任意のメール案内は、明示的に同意した方にのみ送ります。</p>
      </div>
      <div className={styles.cta}>
        <a href={PERFORMANCE_TEE_INTEREST_FORM} target="_blank" rel="noopener noreferrer" data-growth-id="store-apparel-interest">無料アンケートに回答する <span aria-hidden="true">↗</span></a>
        <small>無料・注文ではありません / 商品・価格・納期は未確定</small>
      </div>
    </div>
  </section>;
}
