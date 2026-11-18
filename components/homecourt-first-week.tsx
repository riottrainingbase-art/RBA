"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import styles from "./homecourt-first-week.module.css";

type Role = "player" | "parent" | "coach";
type Lesson = {
  title: string;
  purpose: string;
  duration: string;
  practice: string;
  observe: string;
  reflection: string;
  article: string;
};
const roleNames: Record<Role, string> = { player: "選手", parent: "保護者", coach: "指導者" };
const roleLeads: Record<Role, string> = {
  player: "上手くできた数より、何を見てどう判断したかを大切にする7つの小さな実践。",
  parent: "指示を増やすのではなく、子どもが自分で考えられる余白をつくる7つの関わり方。",
  coach: "ドリルを増やす前に、選手の判断と練習の機会を変える7つの設計。",
};

const lessons: Record<Role, readonly Lesson[]> = {
  player: [
    {
      title: "受ける前に、見る",
      purpose: "ボールを受ける前に周囲を確認する習慣をつくる。",
      duration: "3〜5分",
      practice: "パスをもらう前に、味方・相手・空いている場所のうち一つを見る。まずはゆっくり動く2人組のパスで試す。",
      observe: "受けてから初めて周りを見ていないか。見るタイミングが一度でも早くなればOK。",
      reflection: "ボールを受ける前に、何が見えた？",
      article: "player-first-five-minutes",
    },
    {
      title: "味方との距離を変える",
      purpose: "立ち位置を決め打ちせず、スペースと守備者を見て動く。",
      duration: "5分",
      practice: "2対2や3対3で、味方がドライブしたら同じ場所に立ち続けず、パスの通る場所へ一歩動く。練習相手がいなければ試合を見て位置を指で示す。",
      observe: "味方へ近づきすぎた場面と、パスの選択肢を作れた場面を一つずつ探す。",
      reflection: "その場所を選んだのはなぜ？",
      article: "player-disappears-in-five-on-five",
    },
    {
      title: "ドリブルの前に選択肢を持つ",
      purpose: "ボールを持ったら自動的にドリブルする、を見直す。",
      duration: "5分",
      practice: "1対1または2対2で、ボールを持つ前に「打つ・パス・ドライブ」の候補を一つ考え、守備の位置が変わったら選び直す。",
      observe: "プレーが成功したかだけでなく、守備を見て選び直せたか。",
      reflection: "その時、守備はどこにいた？",
      article: "player-first-five-minutes",
    },
    {
      title: "ミスの後、次の3秒",
      purpose: "失敗を引きずるより、次のプレーに戻る。",
      duration: "試合・練習中",
      practice: "ターンオーバーなどの後に、まず守備へ戻る・味方に声をかけるなど、その場でできる一つの行動を決める。",
      observe: "ミスそのものではなく、次の行動を自分で選べたか。",
      reflection: "ミスの次のプレーで、何ができた？",
      article: "player-after-two-mistakes",
    },
    {
      title: "ボールがない時間を使う",
      purpose: "ボールを持っていない時間もプレーに参加する。",
      duration: "5分",
      practice: "3対3などで、ボールの位置が変わったら自分の位置も見直す。守備者を連れて動く場面と、スペースを空ける場面を試す。",
      observe: "ボールを受けられなくても、味方の選択肢を増やせた場面はあったか。",
      reflection: "動くべき時と、動かない方がよい時はどう違った？",
      article: "player-disappears-in-five-on-five",
    },
    {
      title: "良かった判断を一つ残す",
      purpose: "得点以外の成長を見つける。",
      duration: "3分",
      practice: "今日の練習や試合を思い出し、自分が状況を見て選んだ行動を一つだけ言葉にする。映像がなくてもよい。",
      observe: "成功・失敗ではなく、見たものと選んだ行動を分けて説明できるか。",
      reflection: "何を見て、そのプレーを選んだ？",
      article: "player-watch-your-own-video",
    },
    {
      title: "来週の一歩を決める",
      purpose: "振り返りを次の練習につなげる。",
      duration: "5分",
      practice: "この6回から続けたいことを一つ選ぶ。次回の練習で試す場面を決め、必要ならBasketball Passportに短く記録する。",
      observe: "行動が具体的か。「もっと頑張る」より「パス前に一度見る」。",
      reflection: "次の練習で試す一つは何？",
      article: "player-how-to-ask-coach",
    },
  ],
  parent: [
    {
      title: "試合の帰り道は、まず聞く",
      purpose: "親の反省会より、子どもの経験を先に知る。",
      duration: "3分",
      practice: "試合の後に「今日どうだった？」と一度だけ聞く。話したくなければ、その場では聞かず休む時間にする。",
      observe: "子どもが自分の言葉で話せたか。話さない選択も尊重できたか。",
      reflection: "大人が答えを先に言っていなかった？",
      article: "game-day-car-conversation",
    },
    {
      title: "結果より、本人の判断を見る",
      purpose: "シュートの成功率だけで練習を評価しない。",
      duration: "5分",
      practice: "練習や試合で、周囲を見てパスを選んだ場面、動き直した場面などを一つ探す。試合中の声かけは控える。",
      observe: "成功したプレーだけを褒めていないか。挑戦や選択にも気づけたか。",
      reflection: "今日の本人の良い判断は何だった？",
      article: "parents-support-not-coach",
    },
    {
      title: "コーチと保護者の役割を分ける",
      purpose: "家がもう一つの指導席にならないようにする。",
      duration: "3分",
      practice: "家庭で伝えることを「応援・生活・気持ちの確認」に絞り、技術的な細かい修正は本人の相談がある時だけ考える。",
      observe: "本人が求めていない技術指示を何度も出していないか。",
      reflection: "本人の考える時間を残せた？",
      article: "parents-support-not-coach",
    },
    {
      title: "休む日も予定に入れる",
      purpose: "練習を足す前に、生活と負荷の全体を見る。",
      duration: "5分",
      practice: "学校・チーム・自主練・移動の予定を一緒に見て、休む時間があるか確認する。痛みや強い疲れは無理に続けず相談する。",
      observe: "競技以外の生活や本人の疲労感を聞けたか。",
      reflection: "休養を『さぼり』と呼んでいない？",
      article: "child-wants-to-quit-basketball",
    },
    {
      title: "観戦中の言葉を減らす",
      purpose: "コート上で自分で選ぶ時間を守る。",
      duration: "次の試合",
      practice: "プレー中の「打て」「パス」などの指示を控え、応援と安全の確認を中心にする。",
      observe: "判断直前に大人の指示が飛んでいないか。",
      reflection: "本人が自分で決める余白をつくれた？",
      article: "game-day-car-conversation",
    },
    {
      title: "環境を一つの基準で見る",
      purpose: "チームの勝敗と子どもの成長機会を分ける。",
      duration: "5分",
      practice: "出場機会、練習での挑戦の数、指導者との対話、生活との両立を確認する。すぐに環境を変える結論は出さなくてよい。",
      observe: "本人が何を学び、何を望んでいるか。",
      reflection: "この環境の良い点と困る点はそれぞれ何？",
      article: "how-to-choose-youth-team",
    },
    {
      title: "次の一歩は本人と決める",
      purpose: "保護者の目標を子どもへ押し付けない。",
      duration: "5分",
      practice: "この一週間で気づいたことを一つ話し、子ども自身が選んだ次の小さな挑戦を聞く。答えがなくても急がない。",
      observe: "大人が結論を決めずに終えられたか。",
      reflection: "本人は何をやってみたいと言っている？",
      article: "asking-coach-is-not-complaining",
    },
  ],
  coach: [
    {
      title: "直す前に、見る",
      purpose: "ミスの一場面だけで原因を決めない。",
      duration: "次の練習で5分",
      practice: "同じ状況のプレーを3回ほど見てから介入する。技術・認知・相手のプレッシャーのどこで難しくなったかを観察する。",
      observe: "選手が何を見て、どの選択肢を持っていたか。",
      reflection: "一度目の失敗で答えを言っていないか？",
      article: "coach-observe-before-correct",
    },
    {
      title: "並ぶ時間を減らす",
      purpose: "説明の長さより、全員が試す回数を確保する。",
      duration: "練習の一部分",
      practice: "順番待ちの多いドリルを2〜3組の小グループへ分ける。コート面積や安全を考慮し、全員の待機時間を見直す。",
      observe: "1人が実際にプレーする時間は増えたか。",
      reflection: "説明や待ち時間を何分減らせた？",
      article: "practice-lines-reduce-learning-time",
    },
    {
      title: "制約で判断を引き出す",
      purpose: "答えを先に教えるより、解くべき問題を設計する。",
      duration: "5〜10分",
      practice: "2対2・3対3などで守備・時間・スペースの条件を一つだけ変える。選手の判断がどう変わるか観察する。",
      observe: "変更した条件が目的の判断を増やしたか。逆に難しすぎなかったか。",
      reflection: "何を変えたら、選手の選択が変わった？",
      article: "scrimmage-needs-a-learning-goal",
    },
    {
      title: "問いは一つにする",
      purpose: "問いかけの量でなく、次の実践へ戻れる質を重視する。",
      duration: "3分",
      practice: "プレー後に「今、何が見えた？」など一問だけ聞く。答えを求め続けず、次のプレーを試す時間を残す。",
      observe: "問いによってプレーが止まりすぎていないか。",
      reflection: "質問は次の判断に役立った？",
      article: "questions-are-not-always-better",
    },
    {
      title: "ゲームに戻して確かめる",
      purpose: "ドリルが上達したことと試合で使えることを区別する。",
      duration: "10分",
      practice: "練習テーマを同じ条件のゲームで試す。成功率だけでなく、選べるプレーが増えたかを観察する。",
      observe: "相手がいる状況でも学びが表れたか。",
      reflection: "練習でできたことがゲームで使えた？",
      article: "scrimmage-needs-a-learning-goal",
    },
    {
      title: "全員の経験量を見直す",
      purpose: "上手い選手だけに判断機会が集中しないようにする。",
      duration: "5分",
      practice: "ゲーム中、出場・ボール関与・攻守の選択機会を数人分だけ観察する。序列をつけず、練習条件の見直しに使う。",
      observe: "同じ選手ばかりが選択していないか。",
      reflection: "参加機会が少ない選手の経験をどう増やす？",
      article: "stop-practice-less-often",
    },
    {
      title: "次の練習を一つ変える",
      purpose: "一週間の観察を新しい練習設計に反映する。",
      duration: "5分",
      practice: "6回の取り組みから「続けること」「変えること」を一つずつ決める。次回の練習で選手の反応を見て調整する。",
      observe: "コーチの満足度ではなく、選手が試せたか。",
      reflection: "次回、一つだけ設計を変えるなら何？",
      article: "coach-video-ask-before-tell",
    },
  ],
};

function safeRole(value: string): Role {
  return value === "parent" ? "parent" : value === "coach" || value === "admin" ? "coach" : "player";
}

export function HomecourtFirstWeek({ userId, role }: { userId: string; role: string }) {
  const selectedRole = safeRole(role);
  const items = lessons[selectedRole];
  const storageKey = `rba-homecourt-first-week:v1:${userId}:${selectedRole}`;
  const [activeDay, setActiveDay] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [storageWarning, setStorageWarning] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        const parsed: unknown = raw ? JSON.parse(raw) : [];
        setCompleted(Array.isArray(parsed)
          ? [...new Set(parsed.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < 7))]
          : []);
        setStorageWarning(false);
      } catch {
        setCompleted([]);
        setStorageWarning(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  const current = items[activeDay];
  const count = completed.length;
  function toggleCompleted() {
    const next = completed.includes(activeDay) ? completed.filter(n => n !== activeDay) : [...completed, activeDay].sort();
    setCompleted(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setStorageWarning(false);
    } catch {
      setStorageWarning(true);
    }
  }

  return (
    <section className={styles.root} aria-labelledby="first-week-heading" lang="ja">
      <div className={styles.top}>
        <div>
          <p className={styles.eyebrow}>RBA / MY FIRST 7 STEPS</p>
          <h2 id="first-week-heading">最初の7歩。<br />今日、一つ試す。</h2>
          <p>{roleLeads[selectedRole]}</p>
        </div>
        <div className={styles.progress} aria-label={`7つのうち${count}つを試しました`}>
          <strong>{count}<small> / 7</small></strong>
          <span>試してみた</span>
        </div>
      </div>
      <div className={styles.context}>
        <span className={styles.role}>FOR {roleNames[selectedRole]}</span>
        <span>無料・自分のペースでOK</span>
        <span>点数・順位はつけません</span>
      </div>
      <div className={styles.progressRail} role="progressbar" aria-label="7つの実践の進み具合" aria-valuemin={0} aria-valuemax={7} aria-valuenow={count}>
        <span style={{ width: `${Math.round(count / 7 * 100)}%` }} />
      </div>
      <div className={styles.days} role="group" aria-label="実践するテーマを選ぶ">
        {items.map((step, index) => (
          <button
            key={step.title}
            type="button"
            className={`${styles.day} ${activeDay === index ? styles.selected : ""} ${completed.includes(index) ? styles.done : ""}`}
            aria-pressed={activeDay === index}
            onClick={() => setActiveDay(index)}
            aria-label={`STEP ${index + 1} ${step.title} ${completed.includes(index) ? "実践済み" : "未実践"}`}
          >
            {completed.includes(index) ? <Check aria-hidden="true" size={17} /> : String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <article className={styles.lesson}>
        <p className={styles.step}>STEP {String(activeDay + 1).padStart(2, "0")} / 07 <span><Clock3 size={15} aria-hidden="true" /> {current.duration}</span></p>
        <h3>{current.title}</h3>
        <p className={styles.purpose}>{current.purpose}</p>
        <div className={styles.lessonGrid}>
          <div><strong>やってみる</strong><p>{current.practice}</p></div>
          <div><strong>観察すること</strong><p>{current.observe}</p></div>
        </div>
        <div className={styles.reflect}>
          <span>1つだけ振り返る</span>
          <p>{current.reflection}</p>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={toggleCompleted} aria-pressed={completed.includes(activeDay)} className={completed.includes(activeDay) ? styles.complete : styles.mark}>
            {completed.includes(activeDay) ? <CheckCircle2 aria-hidden="true" size={20} /> : <Check aria-hidden="true" size={20} />}
            {completed.includes(activeDay) ? "試したことを記録済み（取り消す）" : "今日、試した"}
          </button>
          <Link href={`/ja/journal/${current.article}`}><BookOpen aria-hidden="true" size={18} /> 関連記事を読む <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </article>
      {count === 7 ? <p className={styles.celebrate} role="status"><CheckCircle2 size={20} aria-hidden="true" /> 7つの実践を記録しました。次は、一つ選んだことを日常の練習で続けてみましょう。</p> : null}
      <footer className={styles.footer}>
        <p><ShieldCheck aria-hidden="true" size={18} /> チェックは「試した」自己記録です。能力の評価や比較には使用しません。状態はこの端末のブラウザ内にのみ保存され、他の端末とは同期しません。自由に取り消せます。</p>
        <Link href="/ja/my-homecourt/app/start">経験や目標をBasketball Passportに残す <ArrowRight size={16} aria-hidden="true" /></Link>
        {storageWarning ? <small role="status">このブラウザではチェックを保存できない可能性があります。画面を閉じると記録が消える場合があります。</small> : null}
      </footer>
    </section>
  );
}
