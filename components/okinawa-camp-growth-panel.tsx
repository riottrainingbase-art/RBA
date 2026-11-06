"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./okinawa-camp-growth-panel.module.css";

const eventPage = "/ja/events/okinawa-international-camp-2026";
const enquiryForm = "https://form.jotform.com/263095015591053";
const instagram = "https://www.instagram.com/riot.basketball.academy/";
const liveDay = Date.parse("2026-11-07T00:00:00+09:00");
const liveStarts = Date.parse("2026-11-07T21:00:00+09:00");
const liveEnds = Date.parse("2026-11-07T22:00:00+09:00");

type LivePhase = "off" | "upcoming" | "live";

export function OkinawaCampGrowthPanel({ placement = "home" }: { placement?: "home" | "event" }) {
  const [livePhase, setLivePhase] = useState<LivePhase>("off");

  useEffect(() => {
    const check = () => {
      const now = Date.now();
      setLivePhase(now >= liveDay && now < liveStarts ? "upcoming" : now >= liveStarts && now < liveEnds ? "live" : "off");
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.panel} aria-labelledby={"okinawa-camp-growth-" + placement} data-okinawa-camp-conversion={placement}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>RBA / OKINAWA · DEC 22–24, 2026</span>
        <h2 id={"okinawa-camp-growth-" + placement}>あのクリニックの続きは、<br />3日間の沖縄で。</h2>
        <p>新しい仲間と練習して、1対1も、少人数のゲームも。失敗して、考えて、また挑戦する。<br />7〜18歳を対象に、年齢や経験に合わせて取り組む国際ユースキャンプです。</p>
        <p className={styles.prices}><strong>沖縄県内：通い27,500円／宿泊39,600円</strong><span>県外からの国内参加：通い30,250円／宿泊43,560円（いずれも税込・選手1名）</span></p>
        <div className={styles.actions}>
          <a className={styles.primary} href={enquiryForm} target="_blank" rel="noopener noreferrer" data-growth-id="okinawa-camp-free-family-enquiry">
            まずは無料で参加相談する <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.secondary} href={eventPage} data-growth-id="okinawa-camp-detail-from-conversion">
            料金・内容・申込条件を見る <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className={styles.conditions}>会場側の受入れ回答を受領。宿泊の正式手続き、体育館利用時間、送迎、追加スタッフ、最終日の解散時刻は調整中です。相談だけでは申込・支払いになりません。</p>
      </div>
      <div className={styles.side}>
        <div className={styles.mark}>
          <Image src="/rba-logo-original.jpg" width={75} height={116} alt="Riot Basketball Academy 公式ロゴ" />
          <span>INTERNATIONAL<br />YOUTH BASKETBALL<br />CAMP 2026</span>
        </div>
        {livePhase !== "off" && (
          <div className={styles.live} role="status">
            <span className={styles.liveLabel}>{livePhase === "live" ? "INSTAGRAM LIVE / 配信時間中" : "INSTAGRAM LIVE / 本日"}</span>
            <strong>11/7（土）21:00–22:00</strong>
            <span>キャンプの内容と育成について、直接お話しします。</span>
            <a href={instagram} target="_blank" rel="noopener noreferrer" data-growth-id="okinawa-camp-instagram-live">
              {livePhase === "live" ? "公式Instagramでライブを見る ↗" : "公式Instagramを開く ↗"}
            </a>
          </div>
        )}
        <a className={styles.smallLink} href="/ja/cancellation">キャンセル・返金規定を確認する →</a>
      </div>
    </section>
  );
}
