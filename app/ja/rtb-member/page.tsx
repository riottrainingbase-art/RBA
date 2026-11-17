import type { Metadata } from "next";

const memberPortal = "https://rtb-member-training.riot-training-base.chatgpt.site";

export const metadata: Metadata = {
  title: "RTB会員ページ | Riot Training Base",
  description: "RTB会員の予約、個別トレーニングメニュー、実施記録の入口です。",
  robots: { index: false, follow: false },
};

const features = [
  ["予約", "次回の予約を確認し、希望日時を申請できます。"],
  ["個別メニュー", "担当コーチから届いたトレーニングメニューを確認できます。"],
  ["トレーニング記録", "実施した種目を記録し、次回のセッションに活かせます。"],
] as const;

export default function RtbMemberPage() {
  return (
    <main lang="ja" style={{ minHeight: "75vh", background: "#f3f3ec", color: "#171916", padding: "clamp(20px, 6vw, 68px) 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <section style={{ borderRadius: 18, background: "#171916", color: "#fafaf4", padding: "clamp(22px, 6vw, 54px)" }}>
          <p style={{ color: "#d9f54b", fontWeight: 700, letterSpacing: ".12em" }}>RIOT TRAINING BASE</p>
          <h1 style={{ fontSize: "clamp(30px, 7vw, 58px)", lineHeight: 1.15, margin: "12px 0 16px" }}>RTB会員ページ</h1>
          <p>次回の予約と、あなたのトレーニングメニューを確認できます。</p>
          <a href={memberPortal} style={{ display: "inline-flex", alignItems: "center", minHeight: 48, marginTop: 20, borderRadius: 8, padding: "8px 18px", background: "#d9f54b", color: "#171916", fontWeight: 700 }}>
            会員ページを開く <span aria-hidden="true">　→</span>
          </a>
          <p style={{ color: "#d8dbce", marginTop: 14, fontSize: 14 }}>初めての方は、RTBで利用登録したメールアドレスでログインしてください。</p>
        </section>
        <ul aria-label="会員ページでできること" style={{ listStyle: "none", padding: 0, margin: "16px 0", display: "grid", gap: 8 }}>
          {features.map(([title, detail]) => (
            <li key={title} style={{ padding: "14px 18px", borderRadius: 10, background: "#fcfcf7", border: "1px solid #d9dcd0" }}>
              <strong>{title}</strong><p style={{ margin: "4px 0 0" }}>{detail}</p>
            </li>
          ))}
        </ul>
        <details style={{ padding: "12px 2px" }}>
          <summary style={{ cursor: "pointer", fontWeight: 700 }}>スマホのホーム画面に追加する</summary>
          <p>iPhoneはSafariの共有メニューから、AndroidはChromeのメニューから「ホーム画面に追加」を選んでください。</p>
        </details>
      </div>
    </main>
  );
}
