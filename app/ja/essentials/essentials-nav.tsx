import Link from "next/link";
import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";
import styles from "./essentials.module.css";

type Section = "collection" | "story" | "guide";

/**
 * An editorial sub-navigation for the RBA store, separate from the academy site.
 * The status label is derived from the server-side launch gate; this component
 * never links directly to a payment provider or enables sales.
 */
export function EssentialsNav({ current }: { current: Section }) {
  const ready = getEssentialsPresaleConfig().ready;
  const links: { id: Section; href: string; label: string; mobileLabel: string }[] = [
    { id: "collection", href: "/ja/essentials", label: "COLLECTION", mobileLabel: "商品" },
    { id: "story", href: "/ja/essentials/story", label: "OUR STORY", mobileLabel: "ストーリー" },
    { id: "guide", href: "/ja/essentials/guide", label: "PRODUCT GUIDE", mobileLabel: "購入ガイド" },
  ];
  return (
    <nav className={styles.shopNav} aria-label="RBA ESSENTIALS ショップ内メニュー">
      <Link href="/ja/essentials" className={styles.shopNavWordmark} aria-label="RBA ESSENTIALS 商品一覧へ">RBA <span>ESSENTIALS</span></Link>
      <div className={styles.shopNavLinks}>
        {links.map(({ id, href, label, mobileLabel }) => (
          <Link href={href} key={id} aria-current={current === id ? "page" : undefined}>
            <span className={styles.shopNavDesktop}>{label}</span>
            <span className={styles.shopNavMobile}>{mobileLabel}</span>
          </Link>
        ))}
      </div>
      <span className={styles.shopNavStatus} role="status">{ready ? "PRE-ORDER / 受付中" : "PRE-LAUNCH / 販売準備中"}</span>
    </nav>
  );
}
