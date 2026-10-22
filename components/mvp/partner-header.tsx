import Image from "next/image";
import Link from "next/link";
import styles from "./partner.module.css";
export function PartnerHeader() {
  return <header className={styles.header}><Link href="/partners/mvp" className={styles.identity} aria-label="RBA and MVP partner home"><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy" width={37} height={52} /><span className={styles.cross}>×</span><Image src="/mvp-academy-logo.jpg" alt="MVP Basketball Academy" width={62} height={63} /><span className={styles.brand}>RBA × MVP<small>COACH DEVELOPMENT PARTNERSHIP</small></span></Link><Link href="/my-homecourt/app">My RBA ID ↗</Link></header>;
}
