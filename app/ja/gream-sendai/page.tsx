import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

const formUrl = "https://form.jotform.com/263082418714053";
const pageUrl = "https://riotbasketballacademy.com/ja/gream-sendai";
const ink = "#131619";
const muted = "#515b60";
const border = "#d8dcdd";
const panel = "#f4f5f3";

export const metadata: Metadata = {
  title: "GREAM SENDAI U15男子クラブ｜新規メンバー募集・参加相談｜RBA",
  description: "2026年に誕生した仙台市太白区中心のGREAM仙台U15男子クラブ。現在中学2・3年生は在籍していません。みんなでバスケットボールを楽しみ、成長する。練習計画・コーチ・月会費8,800円・入団相談をご案内。",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "GREAM SENDAI U15｜2026年発足・太白区の新しいバスケ仲間",
    description: "2026年発足。仙台市太白区を中心に、仲間とバスケを楽しみながら成長するU15男子クラブ。現在中学2・3年生は在籍していません。練習日時と会場は調整中。",
    url: pageUrl,
    type: "website",
    siteName: "Riot Basketball Academy",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }]
  },
  twitter: { card: "summary_large_image", title: "GREAM SENDAI U15｜メンバー募集", description: "1年後の成長を考える。仙台の男子U15バスケットボールクラブ。" }
};

const pillars = [
  { num: "01", en: "RECOGNIZE", title: "見る", description: "ボールだけではなく、ディフェンス、味方、空間、時間を認知する。" },
  { num: "02", en: "DECIDE", title: "判断する", description: "状況に合わせてShot・Drive・Passを選び、プレーの理由を説明する。" },
  { num: "03", en: "EXECUTE", title: "実行する", description: "個人技術を1on1から2on2・3on3・5on5の中で使える形へつなぐ。" },
  { num: "04", en: "REFLECT", title: "修正する", description: "練習と実戦を振り返り、次の課題を見つけて改善を重ねる。" }
] as const;

const roadmap = [
  ["09", "Foundation", "現状把握・基本動作・身体能力の確認"],
  ["10", "1on1 / Advantage", "1on1で優位性をつくる"],
  ["11", "Decision Making", "判断・トランジション・ゲーム理解"],
  ["12", "Team Concept", "スペーシング・オフボール・切り替え"],
  ["01", "Individual Development", "個人課題・シュート・フィニッシュ・S&C"],
  ["02", "Game Understanding", "2on2・3on3と認知・判断"],
  ["03", "Competition", "対外試合・年度末評価（予定）"],
  ["04", "Re-Assessment", "再評価・年間目標の見直し"],
  ["05", "Advantage Creation", "1on1から少人数ゲームへの接続"],
  ["06", "Modern Fundamentals", "キャッチ・パス・シュートの再構築"],
  ["07", "Challenge", "夏季交流・対外試合（予定）"],
  ["08", "Development Camp", "合宿・年間評価（計画）"]
] as const;

const coaches = [
  ["櫻井 征典", "COACH", "2026年大会登録のコーチ"],
  ["結城 悟", "ASSISTANT COACH", "2026年大会登録のアシスタントコーチ"],
  ["西尾 優人", "REPRESENTATIVE / COACH", "RBA代表・2026年大会登録のアシスタントコーチ"]
] as const;

const faqs = [
  ["どんなクラブですか？", "2026年に発足した仙台市太白区中心のU15男子クラブです。仲間とバスケを楽しみ、練習・試合・振り返りを積み重ねます。毎週木曜日のRBA U15 SKILL UP SCHOOLとは別の活動です。"],
  ["練習日はいつですか？", "スタッフ用の練習案は週3回・各90分ですが、曜日・体育館・時間はまだ正式決定していません。太白区を中心に調整し、入団前に日程と会場を個別にご案内します。"],
  ["小学6年生でも相談できますか？", "はい、相談は可能です。ただし実際の活動参加・登録資格は学年やチームの受け入れ状況を確認してからご案内します。"],
  ["体験や入団相談は有料ですか？", "このフォームからの参加相談・入団希望の提出は無料で、送信だけで会費の請求や入団確定は生じません。体験実施日・体験費用・正式手続きは個別にご案内します。"],
  ["月会費のほかに費用がかかりますか？", "現在の通常活動月会費は8,800円（税込）です。入会金などの初期費用は正式手続き前に内訳をご案内します。遠征・合宿・大会・特別活動は別途参加費が発生する場合があり、事前に金額を確認できます。"],
  ["2027年度の月会費は値上がりしますか？", "月額9,900円への改定は検討案であり、正式決定ではありません。開始時期・既存会員への適用・初期費用等は確定後に事前案内します。現在の8,800円の料金や契約を無断で変更しません。"],
  ["中学2・3年生や未経験でも相談できますか？", "はい。2026年発足のチームで、現在中学2・3年生は在籍していませんが、学年・経験を問わず入団相談は受け付けています。実際の参加可否は受入体制と登録条件を確認してお知らせします。"],
  ["選手名簿は見られますか？", "個々の未成年選手の氏名や学校・身体情報は募集ページに掲載しません。写真・動画は公開許可を得ていますが、配信素材の準備が完了するまで公開しません。"]
] as const;

const button = { display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 54, padding: "14px 24px", color: "#fff", background: ink, textDecoration: "none", fontWeight: 850, fontSize: 16, borderRadius: 3 } as const;

export default function GreamSendaiPage() {
  return <SiteFrame locale="ja">
    <main id="main-content" lang="ja" style={{ background: "#fff", color: ink }}>
      <section style={{ padding: "clamp(62px,8vw,112px) max(20px,6vw) 64px", background: ink, color: "#fff", borderBottom: "6px solid #d6dadd" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ margin: "0 0 18px", fontSize: 12, fontWeight: 800, letterSpacing: 3, color: "#c5cacf" }}>RIOT BASKETBALL ACADEMY / SENDAI / U15 BOYS CLUB</p>
          <h1 style={{ fontSize: "clamp(45px,9vw,122px)", fontWeight: 950, lineHeight: .88, letterSpacing: "-.075em", margin: "0 0 24px" }}>GREAM<br/>SENDAI <span style={{ color: "#b6bec3" }}>U15.</span></h1>
          <h2 style={{ fontSize: "clamp(24px,3.6vw,47px)", lineHeight: 1.25, fontWeight: 900, margin: "0 0 20px" }}>2026年、ここから一緒に。<br/>バスケを楽しみ、成長する。</h2>
          <p style={{ maxWidth: 800, lineHeight: 1.9, fontSize: "clamp(16px,1.7vw,19px)", color: "#d5dbdf", margin: "0 0 30px" }}>今年2026年に発足した、仙台市太白区を中心に活動するU15男子クラブです。現在は中学2・3年生がいない新しいチーム。学年や経験にかかわらず、バスケットボールを楽しみ、声をかけ合いながら一緒に成長する仲間を募集しています。</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <a href={formUrl} target="_blank" rel="noopener noreferrer" data-growth-id="gream-sendai-club-hero-intake" style={{ ...button, background: "#fff", color: ink }}>新規メンバーの参加相談をする ↗</a>
            <a href="#programme" style={{ ...button, border: "1px solid #727c82", background: "transparent" }}>活動内容を詳しく見る ↓</a>
          </div>
          <p style={{ margin: "22px 0 0", fontSize: 13, color: "#b9c1c5", lineHeight: 1.8 }}>まずは保護者の方から無料で参加相談。練習日・会場・会費を確認してから、正式な入団を判断できます。相談だけで入団や請求は確定しません。</p>
        </div>
      </section>

      <section style={{ background: "#e9ebea", borderBottom: "1px solid "+border, padding: "25px max(20px,6vw)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 22 }}>
          {[
            ["カテゴリー", "U15男子クラブ"],
            ["主な活動地域", "仙台市太白区（宮城県仙台市）"],
            ["現在の月会費", "8,800円（税込）※2027年度の改定は未決定"],
            ["練習回数（計画）", "週3回・各90分を想定／確定日程は個別案内"]
          ].map(([label,value])=><div key={label}><p style={{ fontSize: 12, letterSpacing: 2, color: muted, fontWeight: 800, margin: "0 0 8px" }}>{label}</p><strong style={{ fontSize: "clamp(18px,2.2vw,25px)", lineHeight: 1.4 }}>{value}</strong></div>)}
        </div>
      </section>

      <section style={{ padding: "36px max(20px,6vw)", background: "#f5f5f3", borderBottom: "1px solid #d8dcdd" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 18, alignItems: "center" }}>
          <div><p style={{ letterSpacing: 3, fontSize: 12, fontWeight: 900, color: muted }}>2026 FIRST SEASON</p><h2 style={{ fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.15, margin: "6px 0 14px" }}>まだ、始まったばかり。<br/>だから、一緒につくれる。</h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.9, color: muted }}>
            <p style={{ marginTop: 0 }}>今年2026年に発足したU15男子クラブ。現在のメンバーに中学2・3年生はいません。学年や経験の違いを認め合い、仲間とバスケを楽しむところからチームを育てていきます。</p>
            <p style={{ marginBottom: 0 }}><strong>活動の中心は仙台市太白区。</strong> 練習の具体的な曜日・体育館は確定次第ご案内します。</p>
          </div>
        </div>
      </section>

      <section id="programme" style={{ padding: "76px max(20px,6vw)", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ letterSpacing: 3, fontSize: 12, fontWeight: 900, color: muted }}>OUR DEVELOPMENT PHILOSOPHY</p>
          <h2 style={{ fontSize: "clamp(33px,5vw,64px)", lineHeight: 1.04, letterSpacing: "-.04em", margin: "12px 0 20px" }}>まず、バスケを楽しむ。<br/>その先に、成長と挑戦がある。</h2>
          <p style={{ fontSize: 18, lineHeight: 1.95, color: muted, maxWidth: 850, margin: "0 0 34px" }}>2026年に立ち上がったばかりのチームだから、選手もコーチも一緒に文化をつくります。「バスケットボールが楽しい」「また練習したい」と思えることを大切にしながら、仲間への声かけ、挑戦、失敗からの学びを積み重ねます。勝敗だけで評価せず、試合も成長の機会として考えます。</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 1, background: "#bec4c4" }}>
            {pillars.map(p=><article key={p.num} style={{ background: panel, padding: "28px 24px" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: muted }}>{p.num} / {p.en}</span>
              <h3 style={{ fontSize: 32, margin: "22px 0 12px", letterSpacing: "-.04em" }}>{p.title}</h3>
              <p style={{ lineHeight: 1.85, color: muted, margin: 0 }}>{p.description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "76px max(20px,6vw)", background: ink, color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ letterSpacing: 3, fontSize: 12, fontWeight: 800, color: "#bcc5c8" }}>TRAIN / PLAY / ASSESS / ADJUST / CHALLENGE</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,61px)", margin: "12px 0 30px", lineHeight: 1.04 }}>クラブ活動だから、<br/>経験を積み重ねられる。</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 13 }}>
            {[
              ["ゲームに直結する練習", "1on1・2on2・3on3・5on5をつなぎ、チーム戦術の前に一人ひとりの判断力を育てる。"],
              ["成長期に合う身体づくり", "減速・着地・方向転換、負荷と回復を考慮したS&Cで、無理なく競技を続ける土台をつくる。"],
              ["試合と交流", "対外試合・交流・合宿を育成の機会として設計する。実施日や参加条件は決まり次第お知らせする。"],
              ["振り返りと個人課題", "プレーの選択を観察し、良かった場面と改善する場面を次回の練習につなげる。"]
            ].map(([title,description])=><article key={title} style={{ padding: 24, border: "1px solid #465057" }}><h3 style={{ fontSize: 23, margin: "0 0 13px" }}>{title}</h3><p style={{ lineHeight: 1.85, color: "#c4ced2", margin: 0 }}>{description}</p></article>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "76px max(20px,6vw)", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ letterSpacing: 3, fontSize: 12, fontWeight: 800, color: muted }}>COACHING MEMBERS</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,60px)", lineHeight: 1.05, margin: "12px 0 24px" }}>指導・運営メンバー</h2>
          <p style={{ lineHeight: 1.85, color: muted, maxWidth: 830, margin: "0 0 30px" }}>2026年秋の大会登録資料で確認できた指導者を掲載しています。実際の各練習回の担当、指導体制は活動日ごとにご案内します。</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
            {coaches.map(([name,role,description])=><article key={name} style={{ border: "1px solid "+border, padding: "27px 24px", background: panel }}>
              <p style={{ color: muted, letterSpacing: 1.8, fontWeight: 800, fontSize: 12, margin: "0 0 20px" }}>{role}</p>
              <h3 style={{ fontSize: 29, margin: "0 0 13px" }}>{name}</h3>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{description}</p>
            </article>)}
          </div>
          <div style={{ marginTop: 20, borderLeft: "4px solid "+ink, background: "#f2f3f2", padding: 20, lineHeight: 1.85, color: muted }}>
            選手メンバー：2026年に発足した新しいチームで、現時点では中学2年生・3年生は在籍していません。2026年9月大会登録の13名は当時の記録で、現在の在籍数・募集枠とは異なる場合があります。掲載許可を得た活動写真・動画は公開準備中です。選手の氏名・学校・身体情報は募集ページに掲載しません。
          </div>
        </div>
      </section>

      <section style={{ padding: "76px max(20px,6vw)", background: panel }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ letterSpacing: 3, fontSize: 12, fontWeight: 800, color: muted }}>ANNUAL DEVELOPMENT PLAN / SEP 2026 – AUG 2027</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,60px)", margin: "10px 0 20px" }}>年間を通じて、学びをつなぐ。</h2>
          <p style={{ color: muted, lineHeight: 1.85, maxWidth: 870, margin: "0 0 30px" }}>年間活動計画に基づく育成テーマです。試合・遠征・合宿の実施日は大会日程や施設状況によって変更され、参加確約ではありません。</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
            {roadmap.map(([month,english,detail],index)=><article key={index} style={{ background: "#fff", padding: "23px 21px", border: "1px solid "+border }}>
              <div style={{ display: "flex", gap: 15, alignItems: "baseline" }}><strong style={{ fontSize: 34, lineHeight: 1 }}>{month}</strong><span style={{ fontSize: 12, color: muted, letterSpacing: 1.1 }}>MONTH</span></div>
              <h3 style={{ fontSize: 17, margin: "17px 0 9px" }}>{english}</h3>
              <p style={{ color: muted, lineHeight: 1.75, margin: 0 }}>{detail}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="schedule" style={{ padding: "76px max(20px,6vw)", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ letterSpacing: 3, fontSize: 12, fontWeight: 800, color: muted }}>PRACTICE / FEES / ENTRY</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,60px)", margin: "10px 0 26px" }}>練習・料金・入団まで。</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
            <article style={{ background: panel, border: "1px solid "+border, padding: "28px 25px" }}>
              <h3 style={{ fontSize: 25, margin: "0 0 16px" }}>通常練習について</h3>
              <p style={{ lineHeight: 1.85, color: muted }}>2026年11月のスタッフ計画では<strong>週3回・各90分</strong>を想定しています。ただし、これは確定済みの定期開催日ではありません。実際の曜日・開始時刻・体育館・担当スタッフは、参加相談後にご確認いただきます。</p>
              <p style={{ lineHeight: 1.8, fontWeight: 800 }}>活動拠点：宮城県仙台市太白区を中心に活動（会場は調整・個別案内）</p>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.8 }}>※木曜18:00〜19:30の「RBA U15 SKILL UP SCHOOL」は別事業です。クラブの確定練習枠ではありません。</p>
            </article>
            <article style={{ background: panel, border: "1px solid "+border, padding: "28px 25px" }}>
              <h3 style={{ fontSize: 25, margin: "0 0 16px" }}>活動費について</h3>
              <p style={{ fontSize: 39, fontWeight: 900, margin: "0 0 8px" }}>8,800円 <span style={{ fontSize: 15 }}>／月（税込）</span></p>
              <p style={{ lineHeight: 1.85, color: muted }}>2026–2027年度の年間計画に基づく<strong>現行の通常月会費</strong>です。遠征・合宿・大会・特別活動などは、実施する場合に別途参加費をご案内します。入会金・初月費用・保険・登録等は正式入団前に内訳を確認いただけます。</p>
            </article>
            <article style={{ background: panel, border: "1px solid "+border, padding: "28px 25px" }}>
              <h3 style={{ fontSize: 25, margin: "0 0 16px" }}>参加対象と受付</h3>
              <p style={{ lineHeight: 1.85, color: muted }}>基本対象はU15年代の男子選手です。現在中学2・3年生の在籍はありません。中学2・3年生の入団希望も含めて相談を受け付け、実際の受入条件は個別に確認します。小学6年生の参加もご相談ください。チーム経験や今の実力だけで可能性を決めません。</p>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.8 }}>相談フォームでは費用の決済は発生しません。正式な入団・継続課金は、条件と規約をご案内した後の別手続きです。</p>
            </article>
          </div>
        </div>
      </section>

      <section id="2027-fees" aria-labelledby="gream-fee-review-heading" style={{ padding: "55px max(20px,6vw)", background: "#f0f1ef", borderTop: "1px solid #d8dcdd", borderBottom: "1px solid #d8dcdd" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22, alignItems: "start" }}>
          <div><p style={{ fontWeight: 900, fontSize: 12, letterSpacing: 2, color: muted, margin: "0 0 8px" }}>FEES / 2027 REVIEW</p><h2 id="gream-fee-review-heading" style={{ fontSize: "clamp(27px,4vw,43px)", margin: "0 0 15px" }}>会費は、決定したものだけをご案内します。</h2><p style={{ fontSize: 16, lineHeight: 1.85, color: muted, margin: 0 }}>家計の負担と、指導・会場・安全管理を継続するための費用の両方を大切にしています。費用の最終条件を確認してから入団を判断できます。</p></div>
          <div style={{ padding: "25px 24px", background: "#fff", border: "1px solid #d8dcdd", display: "grid", gap: 16 }}>
            <div><p style={{ fontSize: 12, color: muted, margin: "0 0 5px", fontWeight: 800 }}>現在の通常活動費（確定している案内）</p><strong style={{ fontSize: 28 }}>8,800円／月 <span style={{ fontSize: 13 }}>税込</span></strong></div>
            <div style={{ borderTop: "1px solid #d8dcdd", paddingTop: 15 }}><p style={{ fontSize: 12, color: muted, margin: "0 0 5px", fontWeight: 800 }}>2027年度の改定について</p><strong style={{ fontSize: 19 }}>9,900円／月は検討中</strong><p style={{ fontSize: 14, lineHeight: 1.8, color: muted, margin: "7px 0 0" }}>正式決定・適用開始時期・既存会員の扱いは未確定です。今後の改定を既に決定した料金として請求・表示することはありません。</p></div>
          </div>
        </div>
      </section>

      <section style={{ padding: "76px max(20px,6vw)", background: ink, color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, letterSpacing: 3, color: "#aab4b9", fontWeight: 800 }}>SCHOOL OR CLUB?</p>
          <h2 style={{ fontSize: "clamp(29px,4.5vw,54px)", margin: "12px 0 25px", lineHeight: 1.08 }}>U15スキルアップとの違い。</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            <article style={{ border: "1px solid #6c747b", padding: 26 }}>
              <h3 style={{ fontSize: 26, margin: "0 0 10px" }}>GREAM SENDAI U15</h3>
              <p style={{ color: "#d5dbde", lineHeight: 1.85 }}>U15男子のクラブチーム。仲間と練習や対外試合・交流に取り組み、チームとして成長します。現在の月会費は8,800円（税込）。練習枠は調整中。</p>
            </article>
            <article style={{ border: "1px solid #6c747b", padding: 26 }}>
              <h3 style={{ fontSize: 26, margin: "0 0 10px" }}>RBA U15 SKILL UP SCHOOL</h3>
              <p style={{ color: "#d5dbde", lineHeight: 1.85 }}>所属チームを変えずに追加で学ぶスクール。毎週木曜18:00〜19:30、原則月3回。月額7,700円（税込）の別プログラムです。</p>
              <a href="/ja/u15-skill-up" style={{ color: "#fff", fontWeight: 800 }}>スキルアップスクールを見る →</a>
            </article>
          </div>
        </div>
      </section>

      <section id="join-steps" aria-labelledby="gream-join-title" style={{ padding: "70px max(20px,6vw)", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: 3, color: muted }}>HOW TO JOIN</p>
          <h2 id="gream-join-title" style={{ fontSize: "clamp(30px,5vw,55px)", margin: "12px 0 22px", lineHeight: 1.15 }}>入団までの流れは、3ステップ。</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>
            {[
              ["01", "無料で相談する", "保護者の方がフォームで学年・希望曜日・相談内容を送信します。ここでは決済はありません。"],
              ["02", "練習条件と費用を確認", "RBAから活動日時・会場・受入条件・初期費用・規約をご案内。必要に応じ体験日を調整します。"],
              ["03", "納得して正式に入団", "保護者の同意と所定の登録・支払手続きを経て受付確定。フォーム送信だけでは入団になりません。"]
            ].map(([n,t,d])=><article key={n} style={{ padding: "25px 22px", background: "#f4f5f3", border: "1px solid #d8dcdd" }}><p style={{ fontSize: 12, fontWeight: 900, letterSpacing: 2, color: muted, margin: "0 0 13px" }}>{n} / ENTRY</p><h3 style={{ fontSize: 23, margin: "0 0 12px" }}>{t}</h3><p style={{ lineHeight: 1.85, color: muted, margin: 0 }}>{d}</p></article>)}
          </div>
          <a href={formUrl} target="_blank" rel="noopener noreferrer" data-growth-id="gream-sendai-steps-intake" style={{ ...button, marginTop: 24 }}>無料の参加相談フォームを開く ↗</a>
        </div>
      </section>

      <section style={{ padding: "76px max(20px,6vw)", background: panel }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, letterSpacing: 3, color: muted, fontWeight: 800 }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(30px,5vw,54px)", margin: "10px 0 25px" }}>参加前によくある質問</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
            {faqs.map(([question,answer])=><article key={question} style={{ padding: "22px 23px", background: "#fff", border: "1px solid "+border }}>
              <h3 style={{ fontSize: 18, lineHeight: 1.5, margin: "0 0 10px" }}>{question}</h3><p style={{ lineHeight: 1.85, color: muted, margin: 0, fontSize: 15 }}>{answer}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="apply" style={{ padding: "80px max(20px,6vw) 100px", background: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, letterSpacing: 3, fontWeight: 850, color: muted }}>JOIN GREAM SENDAI U15</p>
          <h2 style={{ fontSize: "clamp(34px,6vw,74px)", letterSpacing: "-.055em", lineHeight: 1.04, margin: "15px 0 24px" }}>一緒に、バスケを楽しもう。</h2>
          <p style={{ fontSize: 18, color: muted, lineHeight: 1.9, margin: "0 auto 32px", maxWidth: 760 }}>2026年に始まったばかりのチームです。太白区を中心に活動できる仲間を募集しています。まずは保護者の方から参加相談・入団希望をお寄せください。学年・希望曜日を確認し、練習場所・参加条件・費用をご案内します。</p>
          <a href={formUrl} target="_blank" rel="noopener noreferrer" data-growth-id="gream-sendai-club-final-intake" style={button}>GREAM仙台 U15 参加相談・入団希望フォーム ↗</a>
          <p style={{ color: muted, fontSize: 13, lineHeight: 1.85, margin: "22px auto 12px", maxWidth: 700 }}>申込フォームへの入力は無料。送信のみで入団や参加枠は確定せず、決済も発生しません。未成年者は保護者が入力してください。</p>
          <p style={{ fontSize: 14, lineHeight: 1.85 }}>お問い合わせ：<a href="mailto:riot.training.base@gmail.com" style={{ color: ink, fontWeight: 800 }}>riot.training.base@gmail.com</a>　｜　<a href="/ja/policies" style={{ color: ink, fontWeight: 800 }}>参加・安全・個人情報の方針</a></p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
