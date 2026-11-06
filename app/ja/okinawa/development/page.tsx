import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import styles from "../page.module.css";

const JOIN_EMAIL = "mailto:riot.training.base@gmail.com?subject=" + encodeURIComponent("GREAM OKINAWA｜新規参加・体験のご相談");

export const metadata: Metadata = {
  title: { absolute: "育成方針・練習の考え方｜GREAM OKINAWA｜RBA" },
  description: "GREAM OKINAWAが大切にする「見る・判断する・実行する・振り返る」、U8〜U15の育成設計、練習と試合の考え方。新規定期活動の日程・担当・料金は準備中です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/okinawa/development" },
  openGraph: {
    title: "PLAY. THINK. GROW.｜GREAM OKINAWA の育成方針",
    description: "勝敗だけに左右されない、子どもが自分で判断できる力を育てる設計。",
    url: "https://riotbasketballacademy.com/ja/okinawa/development",
    type: "article", locale: "ja_JP",
  },
};

const principles = [
  ["01", "SEE", "見る", "ボールだけでなく、仲間・相手・スペース・時間の変化に気づく。"],
  ["02", "DECIDE", "判断する", "状況に応じて、パス・ドライブ・シュート・待つことを選ぶ。"],
  ["03", "ACT", "実行する", "正解を待つのでなく、自分で選んだプレーを試す。"],
  ["04", "REFLECT", "振り返る", "うまくいった理由と次の選択肢を、自分の言葉にする。"],
] as const;

const ageStages = [
  {
    eyebrow: "FOUNDATION / U8・U10",
    title: "夢中になれる基礎",
    body: "遊びと競争、さまざまな方向への動き、ボールとの関係づくり。難しい指示より、試す回数と楽しさを重視します。",
    points: ["たくさん動く・触る・試す", "左右・方向転換・停止を多様に経験", "ボールを持つことへの自信"],
  },
  {
    eyebrow: "EXPLORE / U12",
    title: "選択肢を増やす",
    body: "ボールを持つ前に見る、オフボールで動く、優位を見つける。ゲームの文脈の中で技術と判断を結びつけます。",
    points: ["1対1、2対2、3対3の学び", "スペーシングとサポート", "成功・失敗の両方を振り返る"],
  },
  {
    eyebrow: "APPLY / U15",
    title: "ゲームで応用する",
    body: "状況の変化に合わせた意思決定、技術の再現性、仲間との連携。勝つためだけでなく、その先にもつながる学びを設計します。",
    points: ["ゲーム理解と意思決定", "接触・強度と休養のバランス", "選手自身の課題設定"],
  },
] as const;

const session = [
  ["10分", "導入・ウォームアップ", "当日の体調、準備、動きの変化を確認する"],
  ["15分", "課題を発見", "対人・少人数ゲームで「何が見えるか」を問いかける"],
  ["35分", "スモールサイドゲーム", "判断と技術を結びつける場面を繰り返す"],
  ["20分", "実戦へ接続", "人数やルールを変えて学びを応用する"],
  ["10分", "振り返り", "選手の気づき、次回の課題、安全を確認する"],
] as const;

const agreements = [
  ["競技レベルで入口を閉じない", "所属チームや競技歴だけで、学びへのアクセスを決めません。"],
  ["全員の学習機会を設計する", "練習と試合の両方で、参加者が挑戦し学べる機会を意識します。出場時間の一律保証を意味するものではありません。"],
  ["技術と判断を分けない", "反復練習と実際のゲームを行き来し、状況に応じて使える技術を育てます。"],
  ["身体・心の安全を守る", "ケガ、成長段階、暑熱、疲労、指導時の言葉や接触に配慮します。"],
  ["指導者も振り返る", "練習の目的、子どもの反応、次回の改善を共有できる運営を目指します。"],
  ["子どもの尊厳を優先する", "威圧的な言動、体罰、侮辱によってプレーを強制する指導は認めません。"],
] as const;

export default function OkinawaDevelopmentPage() {
  return (
    <SiteFrame locale="ja">
      <div className={styles.page}>
        <section className={styles.detailHero}>
          <div className={styles.inner}>
            <Link className={styles.detailBack} href="/ja/okinawa">← GREAM OKINAWA トップ</Link>
            <p className={styles.eyebrow}>OUR METHOD / PLAYER DEVELOPMENT</p>
            <h1>教えることより、<br /><span>選べるようになること。</span></h1>
            <p className={styles.detailLead}>GREAM OKINAWAが大切にするのは、コーチの正解を再現するだけの選手ではなく、コートで自分の目を使い、考え、挑戦できる選手を育てることです。</p>
            <div className={styles.detailActions}>
              <Link className={styles.primary} href="#principles">育成の4つのステップ <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondary} href="/ja/okinawa/parents">保護者向けガイド <span aria-hidden="true">→</span></Link>
            </div>
            <p className={styles.detailHint}>このページは育成方針です。掲載の年代区分や90分モデルは、新しい定期クラスの開催確定・募集要項ではありません。</p>
          </div>
        </section>

        <nav className={styles.teamSubnav} aria-label="育成ページ内の案内">
          <div className={styles.inner}>
            <a href="#principles">育成の原則</a><a href="#stages">年代別の視点</a><a href="#session">練習モデル</a><a href="#commitments">活動の基準</a>
          </div>
        </nav>

        <section className={styles.section} id="principles">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>FOUR MOVEMENTS OF LEARNING</p>
            <div className={styles.heading}><h2>見る。判断する。実行する。振り返る。</h2><p>この循環を、選手の成長に合わせて何度でもつくります。うまくいかなかったプレーも学習の材料です。</p></div>
            <div className={styles.methodGrid}>
              {principles.map(([num, english, title, description]) => (
                <article key={num} className={styles.methodCard}>
                  <span className={styles.methodNumber}>{num}</span><span className={styles.mini}>{english}</span>
                  <h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.softSection} id="stages">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>AGE-APPROPRIATE DEVELOPMENT</p>
            <div className={styles.heading}><h2>年代が変われば、必要な経験も変わる。</h2><p>あくまで育成カリキュラムの設計指針です。実施クラス・参加対象・曜日は、活動ごとの正式案内を確認してください。</p></div>
            <div className={styles.ageStageGrid}>
              {ageStages.map((stage) => (
                <article key={stage.eyebrow} className={styles.ageStage}>
                  <p className={styles.mini}>{stage.eyebrow}</p><h3>{stage.title}</h3><p>{stage.body}</p>
                  <ul>{stage.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="session">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>90-MINUTE DESIGN / EXAMPLE ONLY</p>
            <div className={styles.heading}><h2>90分の中で、何を学ぶのか。</h2><p>練習時間を埋めるためのメニューではなく、一つの学習テーマを持った活動設計。これは指導者研修用のモデルであり、実際の予定ではありません。</p></div>
            <div className={styles.sessionList}>
              {session.map(([duration, title, description], i) => (
                <div key={title} className={styles.sessionRow}>
                  <span className={styles.sessionIndex}>0{i + 1}</span><strong>{duration}</strong>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </div>
              ))}
            </div>
            <p className={styles.disclaimer}>人数、年齢、会場、暑熱、体調、利用時間に応じて調整します。安全上の理由があれば実施を停止・変更します。</p>
          </div>
        </section>

        <section className={styles.darkSection} id="commitments">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>OUR COMMITMENTS</p>
            <div className={styles.heading}><h2>勝敗以外にも、<br />大切にすべきことがある。</h2><p className={styles.lightLead}>全員に同じ結果を約束するのではなく、一人ひとりが学ぶ機会を持ち、安全に挑戦できる活動を目指します。</p></div>
            <div className={styles.commitmentGrid}>
              {agreements.map(([title, body], i) => (
                <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>WHAT COMES NEXT</p>
            <div className={styles.detailClosing}>
              <div><h2>次に必要なのは、<br />良い練習を「続けられる仕組み」。</h2><p>日常の練習は、適切な現地担当・会場・安全体制が整って初めて継続できます。今後の体験や入会のご案内は、条件の確定後に行います。</p></div>
              <div className={styles.detailClosingActions}>
                <a className={styles.darkButton} href={JOIN_EMAIL}>参加希望について相談する <span aria-hidden="true">→</span></a>
                <Link className={styles.textLink} href="/ja/okinawa/parents">保護者向けガイドを読む →</Link>
                <Link className={styles.textLink} href="/ja/okinawa-coach">指導者募集の内容を見る →</Link>
              </div>
            </div>
            <p className={styles.disclaimer}>お問い合わせは無料です。相談だけで体験日・入会・新クラス開設・支払いは確定しません。</p>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
