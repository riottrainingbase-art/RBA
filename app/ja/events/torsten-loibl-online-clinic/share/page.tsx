import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { EventShareActions } from "@/components/event-share-actions";

const clinicUrl = "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic";
const checkUrl = "https://riotbasketballacademy.com/ja/coach/shooting-check";
const shareText = [
  "【11/25（水）20:00〜21:30／オンライン】",
  "「練習では入る。試合では打てない。」その理由を、シュートフォームだけに求めていませんか？",
  "2019年3x3女子U23日本代表の世界一にディレクターコーチとして貢献。男子U18日本代表のアジア準優勝、国内リーグと天皇杯の2冠を経験したトーステン・ロイブル氏。",
  "Riot Basketball Academy主催・オンライン講習 Vol.2。",
  "テーマは「現代バスケットボールにおけるシューターの育成と活用」。技術・判断・練習設計・スペーシングのつながりを考える90分です。",
  "Zoom開催／英語講義・日本語逐次通訳。LIVE 3,300円（税込）、開催後30日間のオンデマンド 4,400円（税込）。指導者資格は不要です。",
  "詳細・申込：" + clinicUrl,
].join("\n\n");

const coachShareKits = [
  {
    label: "U12／ミニバスの指導者へ",
    summary: "フォームを教えることと、試合で自分で選べることをつなぎたい方へ",
    text: [
      "【RBA｜指導者向けオンライン講習 11/25（水）20:00–21:30 JST】",
      "練習では入るのに、試合では打てない。U12ではシュート技術をいつ・どう扱い、打つ前の準備や判断とどう結び付けるのでしょうか。",
      "日本男子U18代表のアジア準優勝を経験したTorsten Loibl氏と、シューター育成・練習設計・スペーシングを考える90分です。",
      "Zoom／英語講義・日本語逐次通訳。LIVE税込3,300円、配信開始後30日間の録画視聴は税込4,400円。",
      "詳細・申込：" + clinicUrl,
    ].join("\n\n"),
  },
  {
    label: "U15／U18の指導者へ",
    summary: "シューティング練習を守備のあるゲームへ転移させたい方へ",
    text: [
      "【RBA｜11/25（水）20:00–21:30 JST・オンライン】",
      "シュートの成功率だけでなく、守備を見た選択、オフボールの準備、スペーシングから良いシュート機会をどう生むか。",
      "2016年男子U18日本代表アジア準優勝、2017年男子U19ワールドカップ10位の指導経験を持つTorsten Loibl氏と、技術・判断・練習設計を一体で考えます。",
      "Zoom／英語講義・日本語逐次通訳。LIVE税込3,300円、配信開始後30日間の録画視聴は税込4,400円。",
      "詳細・申込：" + clinicUrl,
    ].join("\n\n"),
  },
  {
    label: "女子バスケ／3x3の指導者へ",
    summary: "限られた時間と空間で良いシュート機会をつくる指導を考えたい方へ",
    text: [
      "【RBA｜11/25（水）20:00–21:30 JST・オンライン】",
      "「練習では入る。試合では打てない。」を出発点に、シュート技術、スペーシング、攻撃中の判断、練習設計を考えるオンライン講習です。",
      "Torsten Loibl氏は2019年3x3女子U23日本代表の世界選手権優勝にディレクターコーチとして貢献。特定の練習ドリルを保証する講習ではなく、現代バスケットボールのシューター育成を学ぶ90分です。",
      "Zoom／英語講義・日本語逐次通訳。LIVE税込3,300円、配信開始後30日間の録画視聴は税込4,400円。",
      "詳細・申込：" + clinicUrl,
    ].join("\n\n"),
  },
] as const;

const shareTitle = "11月25日 トーステン・ロイブル氏オンライン講習｜公式紹介文";
const shareDescription = "3x3女子U23世界一に貢献し、日本代表の育成・国内2冠を経験したトーステン・ロイブル氏と学ぶ90分。11/25 Zoom、日本語逐次通訳。LIVE税込3,300円、録画30日税込4,400円。";

export const metadata: Metadata = {
  title: shareTitle,
  description: shareDescription,
  alternates: { canonical: "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic/share" },
  openGraph: {
    title: shareTitle, description: shareDescription,
    url: "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic/share",
    locale: "ja_JP", type: "website", siteName: "Riot Basketball Academy",
    images: [{ url: "/rba-court-hero.png", width: 1664, height: 935, alt: "Riot Basketball Academy：バスケットボールの育成と指導者向け講習" }],
  },
  twitter: { card: "summary_large_image", title: shareTitle, description: shareDescription, images: ["/rba-court-hero.png"] },
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
          <section aria-labelledby="coach-share-title" style={{ marginTop: 40 }}>
            <h2 id="coach-share-title" style={{ fontSize: 24, fontWeight: 850, margin: "0 0 12px" }}>指導対象に合わせた紹介文</h2>
            <p style={{ color: "#ccd1db", lineHeight: 1.85, marginBottom: 20 }}>
              U12・U15／U18・女子バスケ／3x3の現場に合わせた短い案内文です。必要だと思う方に、ご自身の判断で共有してください。自動送信や一斉配信は行われません。
            </p>
            <div style={{ display: "grid", gap: 16 }}>
              {coachShareKits.map((kit) => (
                <article key={kit.label} style={{ border: "1px solid #424958", borderRadius: 14, padding: "22px 20px", background: "#171c25" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 8px" }}>{kit.label}</h3>
                  <p style={{ color: "#c7cfdc", lineHeight: 1.75, margin: "0 0 18px" }}>{kit.summary}</p>
                  <p style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.85, color: "#e7e9ee", margin: "0 0 20px" }}>{kit.text}</p>
                  <EventShareActions title={"RBA指導者講習｜" + kit.label} text={kit.text} copyLabel="この文章をコピー" shareLabel="この文章を共有" copiedLabel="コピーしました" />
                </article>
              ))}
            </div>
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
