import { dhubCoachCases } from "@/lib/dhub-coach-cases";
import styles from "./dhub-coach-case-lab.module.css";

export function DhubCoachCaseLab() {
  return (
    <section className="dhub-member-section section-pad" aria-labelledby="coach-case-lab">
      <div className={styles.intro}>
        <p className="section-index">D-HUB / FIELD CASE LAB</p>
        <h2 id="coach-case-lab">次の練習で、何を変える？</h2>
        <p>現場の困りごとから一つ選び、実践し、観察し、次回の練習を修正する8つのケース。時間は目安です。選手の年齢・経験・人数・体調に合わせて調整してください。</p>
        <p className={styles.note}>RBA独自の練習設計案です。特定講師の発言・録画・配布資料の転載ではなく、効果や成果を保証するものでもありません。大会規則・安全・本人の意思を優先します。</p>
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
