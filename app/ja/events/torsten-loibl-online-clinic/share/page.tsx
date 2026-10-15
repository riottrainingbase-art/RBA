import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { EventShareActions } from "@/components/event-share-actions";

const clinicUrl = "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic";
const checkUrl = "https://riotbasketballacademy.com/ja/coach/shooting-check";
const shareText = [
  "【11/25（水）20:00〜21:30／オンライン】",
  "「練習では入る。試合では打てない。」その理由を、シュートフォームだけに求めていませんか？",
  "Riot Basketball Academy主催・トーステン・ロイブル氏オンライン講習 Vol.2。",
  "テーマは「現代バスケットボールにおけるシューターの育成と活用」。技術・判断・練習設計・スペーシングのつながりを考える90分です。",
  "Zoom開催／英語講義・日本語逐次通訳。LIVE 3,300円（税込）、開催後30日間のオンデマンド 4,400円（税込）。指導者資格は不要です。",
  "詳細・申込：" + clinicUrl,
].join("\n\n");

export const metadata: Metadata = {
  title: "11月25日 トーステン・ロイブル氏オンライン講習｜公式紹介文・共有用",
  description: "RBA主催オンライン指導者講習（11月25日）の紹介文と公式リンクをまとめた共有ページです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic/share" },
};

export default function TorstenSharePage() {
  return (
    <SiteFrame locale="ja" languagePage="events/torsten-loibl-online-clinic">
      <main style={{ background: "#0c1016", color: "#f7f8fa", minHeight: "70vh", padding: "64px 20px 88px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#f6a648", fontWeight: 800 }}>RBA COACH EDUCATION / SHARE KIT</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 58px)", lineHeight: 1.17, margin: "16px 0 20px", fontWeight: 900 }}>
            必要な指導者へ、<br />学ぶ機会を届ける。
          </h1>
          <p style={{ lineHeight: 1.85, color: "#ccd1db", maxWidth: 680 }}>
            11月25日開催のトーステン・ロイブル氏オンライン講習を紹介したい方向けに、公式案内文をまとめました。
            送る相手との関係を大切に、必要な方にだけ共有してください。
          </p>
          <section aria-labelledby="share-title" style={{ marginTop: 36, border: "1px solid #424958", borderRadius: 14, padding: "28px 24px", background: "#171c25" }}>
            <h2 id="share-title" style={{ fontSize: 21, fontWeight: 850, margin: "0 0 20px" }}>紹介文（そのまま使えます）</h2>
            <p style={{ whiteSpace: "pre-wrap", fontSize: 15, lineHeight: 1.9, color: "#e7e9ee", marginBottom: 28 }}>{shareText}</p>
            <EventShareActions title="トーステン・ロイブル氏オンライン講習 11/25" text={shareText} copyLabel="紹介文をコピー" shareLabel="共有する" copiedLabel="コピーしました" />
            <p style={{ marginTop: 16, fontSize: 12, color: "#aeb5c2" }}>コピー操作だけでは相手に送信されません。</p>
          </section>
          <section style={{ marginTop: 36, display: "grid", gap: 12 }}>
            <Link href={clinicUrl} style={{ display: "block", padding: "17px 22px", borderRadius: 10, background: "#f6a648", color: "#141820", fontWeight: 900, textAlign: "center" }}>講習の詳細・申込を見る →</Link>
            <Link href={checkUrl} style={{ display: "block", padding: "17px 22px", border: "1px solid #697487", borderRadius: 10, color: "#f7f8fa", fontWeight: 750, textAlign: "center" }}>無料・2分のシュート練習チェック →</Link>
          </section>
          <p style={{ marginTop: 28, color: "#aeb5c2", fontSize: 13, lineHeight: 1.8 }}>
            申込フォーム送信後、選択プランのお支払いが完了して申込確定となります。
            本講習はJBA公認リフレッシュ研修のポイント付与対象としてご案内していません。
          </p>
        </div>
      </main>
    </SiteFrame>
  );
}
