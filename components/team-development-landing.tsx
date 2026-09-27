import { ArrowRight, BarChart3, CalendarRange, ClipboardList, Eye, RefreshCw, ShieldCheck, Users } from "lucide-react";
import styles from "./team-development.module.css";

const flow=[
  ["01","BEFORE","事前にチームを把握する","年代・人数・活動頻度・現在の課題・指導者が変えたいことを短時間で整理します。"],
  ["02","CLINIC","RBAが現場を見る","普段の体育館で、選手個人を点数化せず、チーム全体に起きている現象を観察します。"],
  ["03","REPORT","見えたことを言葉にする","強み・優先課題・次に見るポイントを、RBA TEAM DEVELOPMENT REPORTとして残します。"],
  ["04","30 DAYS","練習へ戻す","4週間のテーマ、Small-Sided Game、観察点、問いをTEAM HOMEへ残します。"],
  ["05","FOLLOW-UP","変化を確認する","指導者の週次チェックインと再訪問で、前回から何が変わったかを確認します。"],
] as const;

const observations=[
  ["SPACING","スペースの使い方"],
  ["PERCEPTION","キャッチ前・プレー前に何を見ているか"],
  ["DECISION","状況から自分で選べているか"],
  ["ADVANTAGE","優位性をつくり、維持し、使えているか"],
  ["OFF-BALL","ボールを持っていない時間の動き"],
  ["TRANSITION","攻守の切り替え"],
  ["DEFENCE","1on1・ヘルプ・ローテーション"],
  ["COMMUNICATION","声・共有・チーム内の情報伝達"],
  ["PHYSICAL","動きの準備・負荷・身体の使い方"],
  ["PRACTICE DESIGN","練習そのものが学習につながっているか"],
] as const;

export function TeamDevelopmentLanding(){
  return <div className={styles.publicPage}>
    <section className={styles.hero}>
      <p>RBA / TEAM DEVELOPMENT</p>
      <h1>一度のクリニックを、<br/>チームの30日に変える。</h1>
      <span>RBAが現場へ行き、見て、伝えて、次の練習までつなぐ。TEAM DEVELOPMENTは、単発指導をチームの学習サイクルへ変える仕組みです。</span>
      <div><a className={styles.primary} href="/ja/team-visit-clinic">RBAをチームに呼ぶ<ArrowRight/></a><a href="/ja/my-homecourt/app/team-development">TEAM DEVELOPMENTを開く<ArrowRight/></a></div>
    </section>

    <section className={styles.promise}>
      <ShieldCheck/><div><strong>選手ランキングではありません。</strong><p>個人を点数化して並べるのではなく、チームとして今何が起きているか、次の練習で何を見るかを整理します。JBA加盟・競技者登録・公式大会の資格管理とも別の機能です。</p></div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p>BEFORE → CLINIC → REPORT → 30 DAYS</p><h2>クリニックを、前後まで含めて設計する。</h2></div><span>その日だけ上手く見えることより、RBAが帰った後の練習に何が残るかを重視します。</span></div>
      <div className={styles.flow}>{flow.map(([no,tag,title,body])=><article key={no}><span>{no} / {tag}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>

    <section className={styles.darkSection}>
      <div className={styles.sectionHead}><div><p>TEAM OBSERVATION</p><h2>見るのは「誰が上手いか」ではなく、チームの現象。</h2></div></div>
      <div className={styles.observationGrid}>{observations.map(([tag,label])=><article key={tag}><Eye/><span>{tag}</span><strong>{label}</strong></article>)}</div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p>RBA TEAM DEVELOPMENT REPORT</p><h2>指導者が次の日から使える形で残す。</h2></div><span>保護者向けの説明にも、次回のRBA訪問にも、同じ記録を使えます。</span></div>
      <div className={styles.reportGrid}>
        <article><ClipboardList/><h3>TEAM REPORT</h3><p>強み、見えた現象、優先課題、次に観察するポイントを一枚の流れにまとめます。</p></article>
        <article><CalendarRange/><h3>30 DAY PLAN</h3><p>4週間のテーマ・目的・Small-Sided Game・コーチの観察点・選手への問いを設定します。</p></article>
        <article><RefreshCw/><h3>WEEKLY CHECK-IN</h3><p>「何が良くなったか」「何が詰まったか」「次にどう変えるか」を週ごとに残します。</p></article>
        <article><BarChart3/><h3>TEAM TIMELINE</h3><p>クリニック、レポート、30日プラン、フォローアップ、次の国際交流までチームの履歴として積み上げます。</p></article>
      </div>
    </section>

    <section className={styles.sales}>
      <div><p>FOR TEAM SALES / PARTNERSHIP</p><h2>チームクリニックを、継続接点にする。</h2><span>TEAM TAKEOVER / VISIT TRAININGを受けたチームは、その後のTEAM DEVELOPMENTへつなげられます。単発、30日フォロー、年間パートナーの3つの運用に対応できる設計です。</span></div>
      <div className={styles.salesCards}>
        <article><span>CLINIC</span><h3>現場指導＋REPORT</h3><p>まず一度、RBAの視点を持ち帰りたいチームへ。</p></article>
        <article><span>CLINIC + 30</span><h3>現場指導＋30日実践</h3><p>4週間の実践と指導者チェックインまでつなげる標準形。</p></article>
        <article><span>PARTNER</span><h3>継続訪問＋TEAM HOME</h3><p>複数回の訪問、D-HUB、国内外の交流まで育成環境を長期でつなぐ。</p></article>
      </div>
    </section>

    <section className={styles.final}>
      <Users/><div><p>RBA TEAM DEVELOPMENT</p><h2>「呼んで終わり」にしない。</h2><span>チームの普段の環境に、次の30日へ続く仕組みを入れます。</span></div>
      <div><a className={styles.primary} href="/ja/team-visit-clinic">チームクリニックを相談する<ArrowRight/></a><a href="/ja/my-homecourt/app/team-development">TEAM HOMEで使う<ArrowRight/></a></div>
    </section>
  </div>;
}
