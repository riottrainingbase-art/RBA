import { dhubCoachCases } from "@/lib/dhub-coach-cases";
import styles from "./dhub-coach-case-lab.module.css";

export function DhubCoachCaseLab() {
  return (
    <section className="dhub-member-section section-pad" aria-labelledby="coach-case-lab">
      <div className={styles.intro}>
        <p className="section-index">D-HUB / FIELD CASE LAB</p>
        <h2 id="coach-case-lab">次の練習で、何を変える？</h2>
        <p>現場の困りごとから一つ選び、実践し、観察し、次回の練習を修正する{dhubCoachCases.length}のケース。時間は目安です。選手の年齢・経験・人数・体調に合わせて調整してください。</p>
        <p className={styles.note}>RBA独自の練習設計案です。特定講師の発言・録画・配布資料の転載ではなく、効果や成果を保証するものでもありません。大会規則・安全・本人の意思を優先します。</p>
      </div>
      <div className={styles.intro}>
        <h3>RBA共通の練習設計｜ゲームから学ぶ</h3>
        <p>最初に短いゲームで課題を見つけ、選手に問いかけます。必要な技術を個別に補い、条件を一つ調整して再試行し、変化を振り返ります。基礎練習を否定するのではなく、目的をゲームにつなげます。</p>
        <h3>指導者の自己評価（各回）</h3>
        <ul><li>開始前：学習目標と安全条件、全員の参加・休息・交代計画を確認。</li><li>実践中：活動時間、待機時間、指導者の介入、選手の自発的な選択を観察。</li><li>終了後：選手の声と観察事実を照合し、次回の変更を一つ決める。</li><li>安全上の問題は直ちに活動を止め、適切な担当者へ連携。健康・個人情報は公開しない。</li></ul>
        <p className={styles.note}>WABCの公開資料を参考にしたRBA独自の実践体系です。公式資格講座ではありません。<a href="/ja/approach">育成方針と無料公開の公式参照資料を確認する</a>。</p>
      </div>
      <div className={styles.grid}>
        {dhubCoachCases.map((item,index)=>(
          <details className={styles.case} key={item.id}>
            <summary>
              <span className={styles.meta}>CASE {String(index+1).padStart(2,"0")} / {item.age} / {item.duration}</span>
              <strong>{item.title}</strong>
              <span>{item.question}</span>
              <span className={styles.open}>実践プランを開く</span>
            </summary>
            <div className={styles.body}>
              <h3>準備</h3><p>{item.setup}</p>
              <h3>練習の流れ</h3><ol>{item.steps.map(step=><li key={step}>{step}</li>)}</ol>
              <h3>観察すること</h3><p>{item.observe}</p>
              <h3>難度・安全の調整</h3><p>{item.adjust}</p>
              <h3>選手への問いかけ</h3><blockquote>{item.cue}</blockquote>
              <h3>選手・保護者と共有するなら</h3><dl><dt>選手</dt><dd>{item.player}</dd><dt>保護者</dt><dd>{item.parent}</dd></dl>
              <h3>振り返り</h3><p>{item.review}</p>
              <div className={styles.record}><strong>記録のひな形</strong><p>実施日・対象年代／設定した条件／観察できた事実／次回変えること（一つ）。氏名や健康情報を外部共有しないでください。</p></div>
            </div>
          </details>
        ))}
      </div>
      <p className={styles.note}>記録はお手元のノートで行います。このケース集に入力欄や自動保存・提出機能はありません。既存レッスンの修了記録にも自動加算されません。</p>
    </section>
  );
}
