import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import "./shooting-game-transfer.css";

const root = "https://riotbasketballacademy.com";
const clinic = "/ja/events/torsten-loibl-online-clinic";
const quiz = "/ja/coach/shooting-check";
const worksheet = "/resources/shooting-observation.pdf";

export const metadata: Metadata = {
  title: "試合でシュートを打てる選手を育てる｜45分×3回の練習設計例｜RBA",
  description: "U12・U15の指導者に向けた無料実践ガイド。キャッチ前の準備、守備との距離、打つ・運ぶ・パスの判断を、45分×3回の練習と10回の攻撃観察で振り返ります。RBA独自制作。",
  alternates: { canonical: root + "/ja/coaches/shooting-game-transfer" },
  openGraph: {
    title: "練習では入るのに、試合で打てない。その練習をどう変える？｜RBA",
    description: "45分×3回の練習設計例と、指導者向け観察項目を無料公開。",
    type: "article", locale: "ja_JP", siteName: "Riot Basketball Academy",
    url: root + "/ja/coaches/shooting-game-transfer",
    images: [{url: root + "/rba-court-hero.png", width: 1664, height: 935, alt: "Riot Basketball Academy"}],
  },
  twitter: { card: "summary_large_image", title: "練習と試合をつなぐ45分×3回のシュート練習｜RBA", images: [root + "/rba-court-hero.png"] },
};

const sessions = [
  {
    day: "SESSION 01", name: "打つ前を観察する", theme: "キャッチ前の準備",
    objective: "シュート成否だけでなく、受ける前に身体と視野を準備できているかを見る。",
    blocks: [
      ["0–8分", "導入：ボールを持たない移動・キャッチ・ストップを簡単に確認する。"],
      ["8–20分", "2人組：パスを受ける前に空いたスペースへ動き、ゴールと守備の位置を見て受ける。"],
      ["20–38分", "2対2：守備の距離を見て、キャッチ後に打つ・運ぶ・パスを選ぶ。全員が交代して攻守を経験する。"],
      ["38–45分", "振り返り：「ボールが来る前、何を見ていた？」と一つ質問する。"],
    ],
  },
  {
    day: "SESSION 02", name: "打てる状況を見極める", theme: "守備とタイミング",
    objective: "同じシュートでも守備の寄せ方で選択が変わることを経験する。",
    blocks: [
      ["0–10分", "無守備：無理のない距離でキャッチからのシュート動作を確認する。"],
      ["10–22分", "1対1：パスから開始。守備の開始位置・距離を変え、打つ／運ぶを選択する。"],
      ["22–39分", "2対2：ボール保持者だけでなく味方の立ち位置も変え、スペーシングを試す。"],
      ["39–45分", "振り返り：「打たなかったのはなぜ？」をプレー直後に短く尋ねる。"],
    ],
  },
  {
    day: "SESSION 03", name: "ゲームで確かめる", theme: "転移の観察",
    objective: "狙っていた準備や判断が、対人ゲームで現れるか観察する。",
    blocks: [
      ["0–8分", "各自が前2回で意識したことを一つ選ぶ。"],
      ["8–18分", "2対2：守備の寄せ方を少し変えてプレー。プレーを止めすぎず、まず様子を見る。"],
      ["18–38分", "3対3など：人数・コート・時間を調整し、全員に攻守の機会を確保する。"],
      ["38–45分", "実ゲーム10回の攻撃を観察し、準備・判断・シュート機会の変化を記録する。"],
    ],
  },
];

const observations = [
  ["準備", "ボールを受ける前に、ゴール・守備・味方を見る時間があったか。"],
  ["判断", "打てる状況で打ち、守備が近いときは別の選択を試せたか。"],
  ["機会", "特定の選手だけでなく、複数の選手に実際の選択機会があったか。"],
  ["制約", "守備・人数・時間の条件が、その年代にとって難しすぎなかったか。"],
  ["振り返り", "シュート成功本数だけでなく、判断の理由を言葉にできたか。"],
];

export default function ShootingGameTransferPage() {
  return <SiteFrame locale="ja" languagePage="coaches">
    <main className="sgt">
      <div className="sgt-inner">
        <header className="sgt-hero">
          <p className="sgt-eyebrow">RBA COACH EDUCATION / FREE PRACTICE GUIDE</p>
          <p className="sgt-date">U12 / U15 · 指導者向け · 閲覧無料 · 個人情報入力不要</p>
          <h1>練習では入るのに、<br /><em>試合で打てない。</em></h1>
          <p className="sgt-lead">その原因を、フォームだけで説明しないために。</p>
          <p>シュート技術の反復は大切です。ただし試合では、ボールを受ける前の準備、守備との距離、味方の位置、打つ・運ぶ・パスの選択も関わります。この無料ガイドは、<strong>練習を3回に分けて組み直すための一例</strong>です。</p>
          <div className="sgt-actions">
            <a href="#sessions" className="sgt-btn">3回の練習例を見る ↓</a>
            <Link href={quiz} className="sgt-ghost">無料5問で現状を振り返る →</Link>
          </div>
          <p className="sgt-small">RBAが独自に制作した実践例です。トーステン・ロイブル氏の監修・推奨教材ではありません。年齢、人数、技能、安全、施設に応じて調整してください。</p>
        </header>

        <section className="sgt-section" aria-labelledby="sgt-thinking">
          <p className="sgt-eyebrow">BEFORE THE DRILLS</p>
          <h2 id="sgt-thinking">最初に変えるのは、<br />シュート本数ではなく<strong>観察の視点。</strong></h2>
          <div className="sgt-grid">
            <article><span>01 / BEFORE</span><h3>受ける前</h3><p>選手は何を見て、どこへ動き、どう止まったか。</p></article>
            <article><span>02 / AT THE CATCH</span><h3>受けた瞬間</h3><p>リング、守備、味方との位置関係から何を選んだか。</p></article>
            <article><span>03 / AFTER</span><h3>選んだ後</h3><p>入った／外れた以上に、その選択にどんな情報があったか。</p></article>
          </div>
          <p className="sgt-note">基準は「毎回シュートを打つ」ではありません。良い判断には、打たずに次の選択へ進む場面も含まれます。</p>
        </section>

        <section className="sgt-section sgt-sessions" id="sessions" aria-labelledby="sgt-sessions-title">
          <p className="sgt-eyebrow">THREE PRACTICES / 45 MINUTES EACH</p>
          <h2 id="sgt-sessions-title">45分×3回の練習設計例</h2>
          <p>週3回の練習を求めるものではありません。既存の練習の一部に、順番を変えず取り入れても構いません。運動強度や休息は、当日の体調・習熟度に合わせてください。</p>
          {sessions.map(session => <article key={session.day} className="sgt-session">
            <div className="sgt-sessionHead"><p>{session.day} / {session.theme}</p><h3>{session.name}</h3><span>{session.objective}</span></div>
            <ol>{session.blocks.map(([time,task]) => <li key={time}><strong>{time}</strong><span>{task}</span></li>)}</ol>
          </article>)}
        </section>

        <section className="sgt-section" aria-labelledby="sgt-adjust">
          <p className="sgt-eyebrow">ADAPT TO YOUR COURT</p>
          <h2 id="sgt-adjust">人数とリングが違っても、同じメニューにしない。</h2>
          <div className="sgt-grid">
            <article><span>U12 初学者</span><h3>難しければ簡単に</h3><p>守備を一歩遅らせる、人数を減らす、ゴールへ近づける。得点よりも見る・止まる・選ぶ機会を増やします。</p></article>
            <article><span>U15 経験者</span><h3>情報量を調整する</h3><p>守備の寄せ方や開始位置を変え、予測しすぎず選ぶ状況をつくります。全員を同じ難易度に固定しません。</p></article>
            <article><span>リング1基・人数多数</span><h3>待ち時間を減らす</h3><p>非シュート組ではキャッチ、止まり方、スペーシングを行い、数分単位で交代。コート状況に合わせて安全な距離を確保します。</p></article>
          </div>
        </section>

        <section className="sgt-section sgt-observe" aria-labelledby="sgt-observe-title">
          <p className="sgt-eyebrow">COACH'S COURTSIDE NOTES</p>
          <h2 id="sgt-observe-title">次のゲームで、10回だけ観察する。</h2>
          <p>10回は指導現場で使いやすい観察単位として設定したもので、科学的に確立した基準値ではありません。同じ状況を比較できる範囲で繰り返し使ってください。</p>
          <ol className="sgt-observationList">{observations.map(([label,body]) => <li key={label}><strong>{label}</strong><span>{body}</span></li>)}</ol>
          <div className="sgt-prompts">
            <h3>指導者の振り返りメモ</h3>
            <p>「受ける前に見られた場面」／「打つべきか迷った場面」／「待ち時間が長かった選手」／「次に変える制約を一つ」</p>
            <p className="sgt-small">子どもの評価や序列化に用いるものではありません。匿名化してチーム内の練習計画に活用してください。</p>
            <Link href={worksheet} target="_blank" rel="noopener noreferrer" className="sgt-ghost sgt-download">無料のA4観察ワークシートを見る →</Link>
          </div>
        </section>

        <section className="sgt-section" aria-labelledby="sgt-further">
          <p className="sgt-eyebrow">LEARN MORE / BY YOUR CHOICE</p>
          <h2 id="sgt-further">さらに深く、シューターの育成を考える。</h2>
          <p>2026年11月25日（水）20:00〜21:30 JST、Riot Basketball Academy主催のTorsten Loibl ONLINE CLINIC Vol.2を開催します。主題は「現代バスケットボールにおけるシューターの育成と活用」。技術・判断・練習設計・スペーシングをどのようにつなげるかを考えるオンライン講習です。</p>
          <div className="sgt-offer"><strong>LIVE 3,300円（税込）</strong><strong>30日間の録画視聴 4,400円（税込）</strong><span>Zoom開催・英語講義／日本語逐次通訳</span></div>
          <Link href={clinic} className="sgt-btn">講習内容・参加形式・申込方法を確認する →</Link>
          <p className="sgt-small">この無料記事を読むだけで申込や支払いは発生しません。講習のフォーム送信と参加費の決済は別です。JBA公認リフレッシュポイント対象とは案内していません。</p>
        </section>

        <footer className="sgt-references">
          <h2>学習の参考資料</h2>
          <p>このガイドの練習時間・配分・例はRBAによる提案で、以下の資料の転載や各団体の公式推奨プログラムではありません。</p>
          <ul>
            <li><a href="https://jr.nba.com/jr-nba-instructional-curriculum/" target="_blank" rel="noopener noreferrer">Jr. NBA / Jr. WNBA Instructional Curriculum</a> — 少人数ゲームや意思決定を含む年代別カリキュラム</li>
            <li><a href="https://about.fiba.basketball/en/wabc-documents" target="_blank" rel="noopener noreferrer">FIBA / WABC Coaching Documents</a> — コーチ向け資料・年代別指導資料</li>
            <li><a href="https://www.usab.com/coaching/coaching-resources" target="_blank" rel="noopener noreferrer">USA Basketball Coaching Resources</a> — 育成年代のコーチ向け資料</li>
          </ul>
          <Link href={quiz}>無料5問チェックに戻る →</Link>
        </footer>
      </div>
    </main>
  </SiteFrame>;
}
