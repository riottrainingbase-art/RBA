import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { OkinawaCampCheckout } from "@/components/okinawa-camp-checkout";

export const metadata: Metadata = {
  title: "沖縄国際キャンプ｜料金選択・お申し込み・お支払い",
  description: "2026年12月22〜24日・7〜18歳。宿泊・人数から料金を確認し、公式申込フォームと該当するStripe決済へ進めます。現地割引・3名以上は個別相談。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026/apply" },
};

export default function Page() {
  return <SiteFrame locale="ja"><div style={{ background: "#faf8f4" }}><header style={{ maxWidth: 900, margin: "auto", padding: "40px 24px 28px" }}><a href="/ja/events/okinawa-international-camp-2026" style={{ textDecoration: "underline" }}>← キャンプの開催概要へ</a><p style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".12em", marginTop: 24 }}>RBA / OKINAWA INTERNATIONAL CAMP</p><h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", lineHeight: 1.4, fontWeight: 900, margin: "12px 0" }}>料金を確認して、<br/>沖縄キャンプへ。</h1><p>2026年12月22日〜24日 · 7〜18歳 · 2泊3日</p><p>宿泊・人数を選び、公式フォームで申込後にお支払いへ進みます。現地割引をご希望の方は、専用の相談案内をご確認ください。</p></header><OkinawaCampCheckout/></div></SiteFrame>;
}
