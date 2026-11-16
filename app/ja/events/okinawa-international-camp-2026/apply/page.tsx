import { OkinawaResidentPrices } from "@/components/okinawa-resident-prices";
import { OkinawaEarlyBird } from "@/components/okinawa-early-bird";
import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { OkinawaCampCheckout } from "@/components/okinawa-camp-checkout";
import { OKINAWA_RESIDENT_PRICES, OKINAWA_DOMESTIC_PRICES } from "@/lib/okinawa-camp-pricing";

export const metadata: Metadata = {
  title: "沖縄国際キャンプ｜料金選択・お申し込み・お支払い",
  description: "2026年12月22〜24日・7〜18歳。糸満青少年の家で開催予定。沖縄県民割引は通い27,500円・宿泊39,600円（税込）。日本国内の参加はRBAが受付。海外参加者は宿泊・人数から海外向け料金と申込・決済方法を確認できます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026/apply" },
};

export default function Page() {
  return <SiteFrame locale="ja"><div style={{ background: "#faf8f4" }}><header style={{ maxWidth: 900, margin: "auto", padding: "40px 24px 28px" }}><a href="/ja/events/okinawa-international-camp-2026" style={{ textDecoration: "underline" }}>← キャンプの開催概要へ</a><p style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".12em", marginTop: 24 }}>RBA / OKINAWA INTERNATIONAL CAMP</p><h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", lineHeight: 1.4, fontWeight: 900, margin: "12px 0" }}>参加方法を選んで、<br/>沖縄キャンプへ。</h1><p>2026年12月22日〜24日 · 7〜18歳 · 2泊3日</p><p>キャンプコーチ：西尾優人・Elton Chen · <a href="/ja/events/okinawa-international-camp-2026#camp-coaches" style={{ textDecoration: "underline" }}>プロフィールを見る</a></p><section aria-labelledby="camp-plan-overview">
  <h2 id="camp-plan-overview">参加プランとお支払い</h2>
  <dl>
    <dt><strong>放課後・1日参加（沖縄県内の方）</strong></dt>
    <dd>12月22日夕方が第一候補。日帰りで交流ゲームに参加する有料枠です。先に参加申込を提出し、RBAから日時・参加費と支払いの案内を受け取ります。 <a href="/ja/events/okinawa-international-camp-2026/after-school" style={{ textDecoration: "underline" }}>放課後・1日参加の申込へ →</a></dd>
    <dt><strong>3日間の通い</strong></dt>
    <dd>沖縄県内 {OKINAWA_RESIDENT_PRICES.day.toLocaleString("ja-JP")}円／県外からの国内参加 {OKINAWA_DOMESTIC_PRICES.day.toLocaleString("ja-JP")}円。現地集合・解散です。</dd>
    <dt><strong>2泊3日の宿泊</strong></dt>
    <dd>沖縄県内 {OKINAWA_RESIDENT_PRICES.housing.toLocaleString("ja-JP")}円／県外からの国内参加 {OKINAWA_DOMESTIC_PRICES.housing.toLocaleString("ja-JP")}円。所定の食事を含みます。</dd>
  </dl>
  <p>表示額は税込・選手1名分です。3日間の通い・宿泊は下のプランからStripeで申込・決済に進めます。海外からの参加は海外向けフォームと米ドル決済をご利用ください。</p>
</section><nav aria-label="国内参加プラン" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}><a href="#okinawa-resident-discount" style={{ textDecoration: "underline", fontWeight: 800 }}>沖縄県民のプランへ ↓</a><a href="#okinawa-domestic-prices" style={{ textDecoration: "underline", fontWeight: 800 }}>県外からの参加プランへ ↓</a></nav></header><OkinawaResidentPrices/><OkinawaResidentPrices residence="japan"/><div style={{ maxWidth: 900, margin: "auto", padding: "0 24px" }}><OkinawaEarlyBird compact href="#choose-plan"/></div><OkinawaCampCheckout/></div></SiteFrame>;
}
