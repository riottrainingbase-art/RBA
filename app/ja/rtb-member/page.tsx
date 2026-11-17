import type { Metadata } from "next";

const memberPortal = "https://rtb-member-training.riot-training-base.chatgpt.site/";
const requestAccess = `mailto:riot.training.base@gmail.com?subject=${encodeURIComponent("RTB会員ページの利用登録")}&body=${encodeURIComponent("RTB会員ページの利用登録をお願いします。\n\nお名前：\nログインに使うメールアドレス：\n")}`;

export const metadata: Metadata = {
  title: "RTB会員ページ | Riot Training Base",
  description: "RTB会員の予約、個別トレーニングメニュー、実施記録の入口です。",
  robots: { index: false, follow: false },
};

const features = [
  ["予約", "RBAの取り込み済み予定と重ならない空き枠から予約を申請できます。RTBが承認すると確定します。"],
  ["個別メニュー", "担当コーチから届いたトレーニングメニューを確認できます。"],
  ["トレーニング記録", "実施した種目を記録し、次回のセッションに活かせます。"],
  ["チームメニュー", "所属チームのトレーニングメニューを確認できます。"],
  ["数値記録", "使用重量・体重・身長を記録し、ご自身の推移をグラフで確認できます。"],
  ["トレーニングコラム", "コーチが共有したコラムと参考文献を読めます。"],
  ["コーチからの動画", "ご自身に配信された動画を、会員ページで視聴できます。"],
] as const;

export default function RtbMemberPage() {
  return (
    <main lang="ja" style={{ minHeight: "75vh", background: "#eeeae1", color: "#171916", padding: "clamp(20px, 6vw, 68px) 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <section style={{ borderRadius: 6, background: "#171916", color: "#fafaf4", padding: "clamp(22px, 6vw, 54px)" }}>
          <p style={{ color: "#c7ac78", fontWeight: 700, letterSpacing: ".12em" }}>RIOT TRAINING BASE</p>
          <h1 style={{ fontSize: "clamp(30px, 7vw, 58px)", fontFamily: "Georgia, serif", lineHeight: 1.15, margin: "12px 0 16px" }}>RTB会員ページ</h1>
          <p>次回の予約と、あなたのトレーニングメニューを確認できます。</p>
          <a href={memberPortal} style={{ display: "inline-flex", alignItems: "center", minHeight: 48, marginTop: 20, borderRadius: 3, padding: "8px 18px", background: "#c7ac78", color: "#171916", fontWeight: 700 }}>
            ログインして開く <span aria-hidden="true">　→</span>
          </a>
          <a href={memberPortal + "#booking"} style={{ display: "inline-flex", alignItems: "center", minHeight: 48, padding: "8px 18px", color: "#ead8b5", fontWeight: 700 }}>空き枠を見て予約する</a>
          <p style={{ color: "#d8dbce", marginTop: 14, fontSize: 14 }}>RTBで登録したメールアドレスのChatGPTアカウントでログインできます。</p>
          <a href={requestAccess} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, marginTop: 8, color: "#ead8b5", textDecoration: "underline", textUnderlineOffset: 4 }}>初めての方は利用登録を依頼する</a>
          <p style={{ color: "#d8dbce", fontSize: 14 }}>メールにお名前とログイン用アドレスをご記入ください。RTBからの招待後、このページから開けます。</p>
        </section>
        <ul aria-label="会員ページでできること" style={{ listStyle: "none", padding: 0, margin: "16px 0", display: "grid", gap: 8 }}>
          {features.map(([title, detail]) => (
            <li key={title} style={{ padding: "14px 18px", borderRadius: 4, background: "#fbf8f1", border: "1px solid #d9d1c2" }}>
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
