"use client";

import { useEffect, useState } from "react";
import { EARLY_BIRD_END } from "@/lib/okinawa-camp-pricing";
import styles from "./okinawa-early-bird.module.css";

export function OkinawaEarlyBird({ compact = false, href = "/ja/events/okinawa-international-camp-2026/apply" }: { compact?: boolean; href?: string }) {
  const [active, setActive] = useState<boolean | null>(null);
  useEffect(() => {
    const update = () => setActive(Date.now() <= Date.parse(EARLY_BIRD_END));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (!active) return null;
  return <aside className={`${styles.banner} ${compact ? styles.compact : ""}`} aria-label="沖縄キャンプの早期申込割引">
    <p className={styles.deadline}>10/31までの早期申込特典 · 海外参加者向け</p>
    <p className={styles.headline}>参加費 <strong>20<span>％OFF</span></strong></p>
    <p className={styles.intro}>この冬、沖縄で世界の仲間と。<br/>12月22〜24日開催 · 7〜18歳</p>
    <div className={styles.prices}>
      <p>宿泊・食事付き<br/><del>450米ドル</del> → <strong>360米ドル</strong><small>1名・2泊3日</small></p>
      <p>通い・宿泊なし<br/><del>300米ドル</del> → <strong>240米ドル</strong><small>1名・3日間</small></p>
    </div>
    <p className={styles.group}>2名で申し込むと、早割からさらに10％OFF。<br/>1名あたり宿泊324米ドル／通い216米ドル。3名以上は個別相談。</p>
    <a className={styles.cta} href={href}>早割の条件を確認して申し込む →</a>
    <p className={styles.terms}>期限：2026年10月31日23:59（台湾時間／日本時間11月1日0:59）。海外参加者向け米ドル料金に適用。航空券は別途。割引後の料金・条件を決済前にご確認ください。</p>
    <p className={styles.terms}>日本国内からの参加はRBAへご相談ください。沖縄県民割引は通い27,500円／宿泊39,600円（税込・1名）。県民料金と上記早割・複数名割引の併用はありません。</p>
  </aside>;
}
