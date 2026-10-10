import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./book-launch.module.css";

export const BOOK_LAUNCH_SLUG = "bench-is-not-development-book-2026";
export const BOOK_LAUNCH_HREF = "/ja/journal/" + BOOK_LAUNCH_SLUG;

// Verified Amazon Kindle product page: 西尾優人 / ASIN B0HMFX2BRK.
export const BOOK_AMAZON_URL = "https://www.amazon.co.jp/dp/B0HMFX2BRK";

export function BookLaunchFeature() {
  return (
    <section className={styles.feature} aria-labelledby="rba-book-launch-title" id="rba-books">
      <div className={styles.bookMark} aria-hidden="true">
        <span className={styles.bookTop}>RBA BOOKS / 01</span>
        <strong>ベンチは<br />育成じゃない。</strong>
        <span className={styles.bookBottom}>MASATO NISHIO · 2026</span>
      </div>
      <div className={styles.featureCopy}>
        <p className={styles.eyebrow}>NEW RELEASE / KINDLE</p>
        <h2 id="rba-book-launch-title">「出られなかった」で、<br />終わらせないために。</h2>
        <p>勝つことと、育てることは同じではない。出場機会、競争、指導者の役割。RBAが全国の育成年代の現場で考えてきたことを、一冊の電子書籍にしました。</p>
        <p className={styles.meta}>『ベンチは育成じゃない。』／西尾優人　｜　Amazon Kindleで発売中</p>
        <div className={styles.actions}>
          <Link href={BOOK_LAUNCH_HREF} className={styles.primary}>出版の背景を読む <ArrowRight size={16} aria-hidden="true" /></Link>
          <a href={BOOK_AMAZON_URL} className={styles.secondary} target="_blank" rel="noopener noreferrer">Amazonで本を見る <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <small className={styles.disclaimer}>※価格・購入条件はAmazonの商品ページでご確認ください。</small>
      </div>
    </section>
  );
}

export function BookJournalPurchase() {
  return (
    <section className={styles.purchase} aria-label="『ベンチは育成じゃない。』の書籍案内">
      <div>
        <p className={styles.eyebrow}>RBA BOOKS / 01</p>
        <h2>『ベンチは育成じゃない。』</h2>
        <p>2026年10月9日、Amazon Kindleで販売が始まりました。電子書籍版をご覧いただけます。価格・購入条件はAmazonの商品ページでご確認ください。</p>
      </div>
      <div className={styles.purchaseActions}>
        <a href={BOOK_AMAZON_URL} className={styles.primary} target="_blank" rel="noopener noreferrer">Amazonで本を見るする <ArrowUpRight size={16} aria-hidden="true" /></a>
        <Link href="/ja/journal/playing-time-is-experience" className={styles.secondary}>出場時間についての記事を読む <ArrowRight size={16} aria-hidden="true" /></Link>
        <small className={styles.disclaimer}>紙版の販売・価格・在庫については、確認できた段階でご案内します。</small>
      </div>
    </section>
  );
}
