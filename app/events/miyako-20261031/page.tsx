import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

const applicationUrl = "https://docs.google.com/forms/d/e/1FAIpQLScQ8EtCsB7itDZkWebebPLcIRbWtgt4cXioL5DCj3v8RLdr5w/viewform";

export const metadata: Metadata = {
  title: "10/31 宮古 RBA 1DAY CLINIC｜参加申込",
  description: "2026年10月31日（土）、岩手県宮古市・千徳地区体育館。小学5年生〜中学3年生対象のRBA 1DAY CLINIC。開催内容を確認して、現地主催者の公式Googleフォームからお申し込みください。",
  alternates: { canonical: "https://riotbasketballacademy.com/events/miyako-20261031" },
  openGraph: {
    title: "宮古で、バスケが変わる。｜RBA 1DAY CLINIC",
    description: "10月31日（土）10:00〜17:00／千徳地区体育館／小学5年〜中学3年／定員30名",
    url: "https://riotbasketballacademy.com/events/miyako-20261031",
    type: "website",
  },
};

const button = { display: "inline-flex", justifyContent: "center", alignItems: "center", minHeight: 56, padding: "14px 28px", background: "#ff651a", color: "#111", borderRadius: 8, fontWeight: 900, textDecoration: "none", fontSize: "1.05rem" } as const;
const card = { padding: "24px", background: "#181818", border: "1px solid #414141", borderRadius: 14 } as const;

export default function MiyakoClinicPage() {
  return <SiteFrame locale="ja" compact><main lang="ja" style={{ background: "#0b0b0b", color: "#f8f6f1", minHeight: "100vh", padding: "clamp(36px,7vw,80px) 20px" }}>
    <div style={{ maxWidth: 980, margin: "0 auto" }}>
      <p style={{ color: "#ff762d", fontWeight: 900, letterSpacing: "0.16em" }}>RBA × BiiLDact / MIYAKO, IWATE</p>
      <h1 style={{ fontSize: "clamp(2.6rem,9vw,6.5rem)", lineHeight: 1.02, letterSpacing: "-0.06em", fontWeight: 950, margin: "18px 0" }}>宮古で、<br/><span style={{ color: "#ff651a" }}>バスケが変わる。</span></h1>
      <p style={{ fontSize: "clamp(1.35rem,3vw,2.3rem)", fontWeight: 900, margin: "0 0 20px" }}>RBA 1DAY CLINIC IN MIYAKO</p>
      <p style={{ maxWidth: 720, lineHeight: 1.9, fontSize: "1.06rem", color: "#d7d7d7" }}>練習で身につけた技術を、試合の判断へ。1対1・2対2・3対3を通して、見る・選ぶ・実行する力を磨く一日です。</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, margin: "30px 0" }}>
        <a href={applicationUrl} target="_blank" rel="noopener noreferrer" style={button}>公式フォームから申し込む ↗</a>
        <a href="#details" style={{ ...button, background: "transparent", color: "#fff", border: "1px solid #888" }}>開催概要を見る ↓</a>
      </div>
      <p style={{ color: "#bbb", fontSize: 14 }}>申込先は現地主催者が指定した既存のGoogleフォームです。新しい受付フォームや決済ページは設けていません。</p>
      <section id="details" style={{ marginTop: 58 }}>
        <p style={{ color: "#ff762d", fontWeight: 800 }}>EVENT INFORMATION</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          <div style={card}><small style={{ color: "#ff762d" }}>DATE & TIME</small><h2 style={{ fontSize: "1.55rem", margin: "12px 0" }}>2026.10.31（土）</h2><p>10:00〜17:00 ／ 受付9:30〜</p></div>
          <div style={card}><small style={{ color: "#ff762d" }}>VENUE</small><h2 style={{ fontSize: "1.55rem", margin: "12px 0" }}>千徳地区体育館</h2><p>岩手県宮古市</p></div>
          <div style={card}><small style={{ color: "#ff762d" }}>PLAYERS</small><h2 style={{ fontSize: "1.55rem", margin: "12px 0" }}>小学5年〜中学3年</h2><p>定員30名・先着順</p></div>
        </div>
      </section>
      <section style={{ marginTop: 42, padding: "28px 0", borderTop: "1px solid #555" }}>
        <h2 style={{ fontSize: "clamp(1.7rem,4vw,2.5rem)" }}>当日の学びを、次の試合へ。</h2>
        <p style={{ lineHeight: 1.9, color: "#ddd" }}>認知・判断・技術をつなぐゲーム形式のセッションを予定しています。詳細な持ち物、参加費、支払方法、キャンセル条件は現地主催者の公式申込フォームでご確認ください。申込状況によって受付を終了する場合があります。</p>
        <a href={applicationUrl} target="_blank" rel="noopener noreferrer" style={button}>参加費・条件を確認して申し込む ↗</a>
      </section>
      <section style={{ marginTop: 24, borderTop: "1px solid #555", paddingTop: 24 }}>
        <h2>お問い合わせ</h2>
        <p>Riot Basketball Academy：<a style={{ color: "#ff8a52" }} href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
        <p style={{ color: "#bbb", lineHeight: 1.8 }}>現地主催：BiiLDact Basketball Academy。申込情報は指定の公式フォームで受け付けます。RBA公式サイト上では個人情報を収集しません。</p>
      </section>
    </div>
  </main></SiteFrame>;
}
