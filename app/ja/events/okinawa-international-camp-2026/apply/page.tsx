import { OkinawaResidentPrices } from "@/components/okinawa-resident-prices";
import { OkinawaEarlyBird } from "@/components/okinawa-early-bird";
import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { OkinawaCampCheckout } from "@/components/okinawa-camp-checkout";

export const metadata: Metadata = {
  title: "沖縄国際キャンプ｜料金選択・お申し込み・お支払い",
  description: "2026年12月22〜24日・7〜18歳。糸満青少年の家で開催予定。沖縄県民割引は通い27,500円・宿泊39,600円（税込）。日本国内の参加はRBAが受付。海外参加者は宿泊・人数から海外向け料金と申込・決済方法を確認できます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026/apply" },
};

export default function Page() {
  return <SiteFrame locale="ja"><div style={{ background: "#faf8f4" }}><header style={{ maxWidth: 900, margin: "auto", padding: "40px 24px 28px" }}><a href="/ja/events/okinawa-international-camp-2026" style={{ textDecoration: "underline" }}>← キャンプの開催概要へ</a><p style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".12em", marginTop: 24 }}>RBA / OKINAWA INTERNATIONAL CAMP</p><h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", lineHeight: 1.4, fontWeight: 900, margin: "12px 0" }}>参加方法を選んで、<br/>沖縄キャンプへ。</h1><p>2026年12月22日〜24日 · 7〜18歳 · 2泊3日</p><p>キャンプコーチ：西尾優人・Elton Chen · <a href="/ja/events/okinawa-international-camp-2026#camp-coaches" style={{ textDecoration: "underline" }}>プロフィールを見る</a></p><p><strong>学校が終わってから、1日だけ参加したい方へ</strong><br/>沖縄県内の7〜18歳向けに、宿泊なしの交流枠を調整しています。<a href="/ja/events/okinawa-international-camp-2026#after-school" style={{ textDecoration: "underline" }}>放課後・1日参加の内容と無料相談フォームへ →</a></p><p>3日間の通い・宿泊をご希望の方は、下の既存プランから申込・決済へ進めます。放課後・1日参加は無料相談の受付のみで、送信しても申込確定・決済にはなりません。海外参加者は、海外向けの公式フォームと米ドル決済をご利用ください。</p><nav aria-label="国内参加プラン" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}><a href="#okinawa-resident-discount" style={{ textDecoration: "underline", fontWeight: 800 }}>沖縄県民のプランへ ↓</a><a href="#okinawa-domestic-prices" style={{ textDecoration: "underline", fontWeight: 800 }}>県外からの参加プランへ ↓</a></nav></header><OkinawaResidentPrices/><OkinawaResidentPrices residence="japan"/><div style={{ maxWidth: 900, margin: "auto", padding: "0 24px" }}><OkinawaEarlyBird compact href="#choose-plan"/></div><OkinawaCampCheckout/></div></SiteFrame>;
}
