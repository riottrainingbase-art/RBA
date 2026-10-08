import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { torstenRegistrationUrl } from "@/components/programme-data";

const eventUrl = "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic";
const quoteShort =
  "Riot Basketball Academyは11月25日（水）20:00から、トーステン・ロイブル氏によるオンライン指導者講習を開催します。テーマは現代バスケットボールにおけるシューターの育成と活用。Zoom・日本語逐次通訳付き。LIVE 3,300円（税込）、30日オンデマンド 4,400円（税込）。";
const quoteLong =
  "練習では入るシュートが、なぜ試合では打てないのか。シュートフォームだけでなく、スペーシング、状況判断、アドバンテージ、ゲームでの選択まで含めて考える90分。Riot Basketball Academy（RBA）は、トーステン・ロイブル氏を講師に迎え、11月25日（水）20:00〜21:30にオンライン講習 Vol.2を開催します。指導者・チームスタッフ・保護者・選手も参加可能。Zoom開催、日本語逐次通訳付き。LIVE 3,300円、30日オンデマンド 4,400円（いずれも税込）。フォーム送信後、表示される決済方法に従ってお支払いください。";

export const metadata: Metadata = {
  title: "報道・指導者コミュニティ向け素材 | Torsten Loibl Online Clinic Vol.2 | RBA",
  description:
    "RBA主催・2026年11月25日トーステン・ロイブル氏オンライン講習の正確な開催情報、紹介文案、指導者向け記事テーマ、公式素材と申込先。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic/media-kit",
  },
  robots: { index: true, follow: true },
};

const card: CSSProperties = {
  border: "1px solid #d9d9d9",
  borderRadius: 12,
  padding: "clamp(18px,3vw,30px)",
  background: "#fff",
  color: "#181818",
};

export default function MediaKitPage() {
  return (
    <SiteFrame locale="ja" languagePage="events/torsten-loibl-online-clinic">
      <section className="section-pad" style={{ background: "#101113", color: "#fff" }}>
        <a href={eventUrl} style={{ color: "#dedede", textDecoration: "underline" }}>← 講習の公式詳細に戻る</a>
        <p className="eyebrow" style={{ marginTop: 28 }}>RBA / MEDIA & COMMUNITY RESOURCES</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 54px)", lineHeight: 1.15, margin: "18px 0" }}>
          指導者へ届けるための<br />公式紹介素材
        </h1>
        <p style={{ maxWidth: 850, lineHeight: 1.8 }}>
          11月25日のTorsten Loibl Online Clinic Vol.2を、指導者・学校・クラブ・勉強会・地域メディアで
          ご紹介いただく際に使える情報をまとめました。紹介・掲載・転送は任意であり、RBAからの依頼を受ける義務はありません。
        </p>
      </section>

      <section className="section-pad" style={{ background: "#f4f4f4", color: "#171717" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 18 }}>
          <div style={card}>
            <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em" }}>OFFICIAL EVENT FACTS</p>
            <h2 style={{ fontSize: 24, margin: "16px 0" }}>開催概要</h2>
            <dl style={{ display: "grid", gap: 12, lineHeight: 1.7 }}>
              <div><dt><strong>主催</strong></dt><dd>Riot Basketball Academy（RBA）</dd></div>
              <div><dt><strong>講師</strong></dt><dd>Torsten Loibl（トーステン・ロイブル）氏</dd></div>
              <div><dt><strong>開催</strong></dt><dd>2026年11月25日（水）20:00〜21:30</dd></div>
              <div><dt><strong>形式</strong></dt><dd>Zoom・英語講義／日本語逐次通訳付き</dd></div>
              <div><dt><strong>料金</strong></dt><dd>LIVE 3,300円／30日オンデマンド 4,400円（税込）</dd></div>
              <div><dt><strong>対象</strong></dt><dd>指導者・チームスタッフ・教員・選手・保護者ほか</dd></div>
            </dl>
            <a className="button button-orange" href={torstenRegistrationUrl} target="_blank" rel="noopener noreferrer"
               style={{ marginTop: 22 }}>公式申込フォームへ →</a>
          </div>
          <div style={card}>
            <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em" }}>EDITORIAL ANGLES</p>
            <h2 style={{ fontSize: 24, margin: "16px 0" }}>紹介記事の切り口</h2>
            <ol style={{ display: "grid", gap: 15, lineHeight: 1.65, paddingLeft: 20 }}>
              <li>練習でシュートが入るのに、試合で打てないのはなぜか。</li>
              <li>技術・判断・スペーシングを一つの練習設計につなぐ方法。</li>
              <li>シュートの成功率だけに頼らず、良い選択をどう評価するか。</li>
            </ol>
            <p style={{ marginTop: 18, fontSize: 14 }}>
              これらは取材・紹介のための切り口です。講師の逐語発言や、当日の講義内容が確定したことを示すものではありません。
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "#fff", color: "#111" }}>
        <p className="eyebrow">SHAREABLE COPY</p>
        <h2 style={{ fontSize: "clamp(26px,4vw,40px)", margin: "14px 0" }}>掲載・共有用の紹介文</h2>
        <p>必要に応じて編集して使える文案です。日付・料金・申込条件を変更する場合は必ず公式ページと照合してください。</p>
        <div style={{ display: "grid", gap: 18, marginTop: 24 }}>
          <article style={card}>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>短文版｜グループ・SNS向け</h3>
            <p style={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{quoteShort}</p>
            <p><strong>講習詳細：</strong><a href={eventUrl}>{eventUrl}</a></p>
          </article>
          <article style={card}>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>長文版｜メディア・団体案内向け</h3>
            <p style={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{quoteLong}</p>
            <p><strong>講習詳細：</strong><a href={eventUrl}>{eventUrl}</a></p>
          </article>
        </div>
      </section>

      <section className="section-pad" style={{ background: "#f4f4f4", color: "#111" }}>
        <h2 style={{ fontSize: "clamp(26px,4vw,38px)" }}>ロゴ・出典・利用上のお願い</h2>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(100px,170px) 1fr", gap: 25, marginTop: 24, alignItems: "start" }}>
          <Image src="/rba-logo-original.jpg" alt="RBAの公式ロゴ" width={132} height={202} style={{ width: "100%", height: "auto", maxWidth: 132 }} />
          <div style={{ lineHeight: 1.75 }}>
            <p><a href="/rba-logo-original.jpg" target="_blank" rel="noopener noreferrer">RBA公式ロゴ画像を開く ↗</a></p>
            <p>主催者の名称は「Riot Basketball Academy（RBA）」と表記してください。掲載は任意です。</p>
            <p>講師・関連団体からの推薦や公式認定、研修ポイント付与など、確認されていない内容を付け加えないでください。</p>
            <p>人物の動画・写真の再編集や転用については、素材ごとの利用権限を事前にRBAへ確認してください。</p>
            <p>申込完了の扱いは公式フォーム送信後の決済案内に従います。共有・記事掲載だけで登録数には加算されません。</p>
          </div>
        </div>
      </section>

      <section className="event-final section-pad">
        <p className="eyebrow">OFFICIAL REGISTRATION</p>
        <h2>11月25日、次の練習に持ち帰る90分。</h2>
        <p>イベント情報の最新版と参加条件は、RBA公式ページでご確認ください。</p>
        <div className="closing-actions">
          <a className="button button-orange" href={eventUrl}>公式講習ページへ →</a>
          <a className="button button-dark" href={torstenRegistrationUrl} target="_blank" rel="noopener noreferrer">申込フォームへ ↗</a>
        </div>
      </section>
    </SiteFrame>
  );
}
