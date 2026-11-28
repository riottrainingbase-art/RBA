"use client";

import { useEffect, useState } from "react";
import { EARLY_BIRD_END, CAMP_JAPAN_CONTACT } from "@/lib/okinawa-camp-pricing";
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
  return <aside className={`${styles.banner} ${compact ? styles.compact : ""}`} aria-label="沖縄キャンプの受付料金">
    <p className={styles.deadline}>海外参加者向け · 現在の料金</p>
    <p className={styles.headline}>参加費 <strong>USD</strong></p>
    {!compact && <p className={styles.intro}>この冬、沖縄で世界の仲間と。<br/>12月22〜24日開催 · 7〜18歳</p>}
    <div className={styles.prices}>
      <p>宿泊・食事付き<br/><strong>360米ドル</strong><small>1名・2泊3日</small></p>
      <p>通い・宿泊なし<br/><strong>240米ドル</strong><small>1名・3日間</small></p>
    </div>
    <p className={styles.group}>2名で申し込む場合の料金：<br/>宿泊324米ドル／通い216米ドル（1名あたり）</p>
    <a className={styles.cta} href={href}>海外参加の料金・申込へ →</a>
    <div className={styles.domestic}><strong>日本国内から参加する方へ</strong><p>沖縄県民：通い27,500円／宿泊39,600円（税込・1名）</p><div className={styles.localActions}><a href="/ja/events/okinawa-international-camp-2026#okinawa-resident-discount">県民割引の詳細 →</a><a href={CAMP_JAPAN_CONTACT}>県外からの参加を相談 →</a></div></div>
    <details className={styles.details}><summary>受付料金・適用条件</summary>
    <p className={styles.terms}>RBAサイトのオンライン申込受付期限は12月22日9:00（日本時間）です。航空券は別途。最終金額・条件を決済前にご確認ください。</p>
    <p className={styles.terms}>国内料金と海外料金は別体系です。3名以上は個別相談です。宿泊なしの食事・送迎費用、受入条件は支払い前にご確認ください。</p>
    </details>
  </aside>;
}
