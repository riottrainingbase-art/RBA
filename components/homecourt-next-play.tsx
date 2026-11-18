"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, BookOpen, Check, CheckCircle2, Compass, ExternalLink, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  getNextPlay, nextPlayForRole, nextPlayRoleLabels, type NextPlayRole,
} from "@/lib/homecourt-next-play";
import styles from "./homecourt-next-play.module.css";

type SaveState = "idle" | "saving" | "saved" | "login" | "error";
type Props = { initialRole: NextPlayRole; initialTopic: string };

export function HomecourtNextPlay({ initialRole, initialTopic }: Props) {
  const [role, setRole] = useState<NextPlayRole>(initialRole);
  const [topic, setTopic] = useState(getNextPlay(initialRole, initialTopic).id);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [copied, setCopied] = useState(false);
  const plans = useMemo(() => nextPlayForRole(role), [role]);
  const selected = getNextPlay(role, topic);
  const permanentPath = "/ja/my-homecourt/next-play";
  const sharePath = permanentPath + "?role=" + role + "&topic=" + selected.id;
  const loginPath = "/ja/my-homecourt/login?next=" + encodeURIComponent(sharePath);

  function changeRole(next: NextPlayRole) {
    const first = nextPlayForRole(next)[0];
    setRole(next);
    setTopic(first.id);
    setSaveState("idle");
    setCopied(false);
  }
  function changeTopic(id: string) {
    setTopic(id);
    setSaveState("idle");
    setCopied(false);
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin + sharePath);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  async function savePlan() {
    if (saveState === "saving" || saveState === "saved") return;
    setSaveState("saving");
    try {
      const db = createClient();
      const { data, error: authError } = await db.auth.getUser();
      if (authError || !data.user) {
        setSaveState("login");
        return;
      }
      const { error } = await db.from("homecourt_saves").insert({
        user_id: data.user.id,
        item_type: "content",
        item_key: "next-play-" + selected.id,
        title: selected.resultTitle,
        href: sharePath,
        metadata: {
          category: "RBA NEXT PLAY",
          role,
          plan_key: selected.id,
        },
      });
      if (error && error.code !== "23505") throw error;
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  return (
    <div className={styles.page} lang="ja">
      <header className={styles.hero}>
        <div className={styles.heroBody}>
          <p className={styles.eyebrow}>RBA / NEXT PLAY</p>
          <h1>悩みを、<span>次の1プレー</span>に。</h1>
          <p className={styles.lead}>「試合で動けない」「出番がない」「どう指導すればいい？」。答えを押しつけるのではなく、今の状況に合わせて<span>今日できる一歩</span>を見つける無料ガイドです。</p>
          <div className={styles.heroMeta}><span>登録なしで試せる</span><span>選手・保護者・指導者に対応</span><span>評価・ランキングなし</span></div>
        </div>
        <div className={styles.heroMark} aria-hidden="true"><span>RBA</span><strong>NEXT<br/>PLAY</strong><small>PROBLEM → ACTION → REFLECTION</small></div>
      </header>

      <main className={styles.shell}>
        <section className={styles.stepSection} aria-labelledby="role-heading">
          <div className={styles.sectionLabel}>01 / 立場を選ぶ</div>
          <h2 id="role-heading">どの立場から考えますか？</h2>
          <div className={styles.roles} role="group" aria-label="あなたの立場">
            {(["player", "parent", "coach"] as const).map(item => (
              <button type="button" key={item} className={role === item ? styles.roleActive : styles.roleButton} aria-pressed={role === item} onClick={() => changeRole(item)}>
                {role === item ? <CheckCircle2 size={19} aria-hidden="true" /> : <Compass size={19} aria-hidden="true" />}
                {nextPlayRoleLabels[item]} <span>{item.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.stepSection} aria-labelledby="topic-heading">
          <div className={styles.sectionLabel}>02 / 今、気になること</div>
          <h2 id="topic-heading">いま一番近い悩みは？</h2>
          <p className={styles.guidance}>すべてに当てはまる必要はありません。近いものを一つ選んでください。</p>
          <div className={styles.concerns} role="group" aria-label="気になる課題">
            {plans.map(item => (
              <button type="button" key={item.id} className={topic === item.id ? styles.concernActive : styles.concern} aria-pressed={topic === item.id} onClick={() => changeTopic(item.id)}>
                <span>{item.short}</span>
                <strong>{item.concern}</strong>
                <span className={styles.arrow} aria-hidden="true"><ArrowRight size={19}/></span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.plan} aria-live="polite" aria-labelledby="answer-heading">
          <div className={styles.planHeader}>
            <div>
              <p className={styles.sectionLabel}>03 / 今日のNEXT PLAY</p>
              <h2 id="answer-heading">{selected.resultTitle}</h2>
              <p>{selected.insight}</p>
            </div>
            <span className={styles.free}>FREE</span>
          </div>
          <div className={styles.threeSteps}>
            {selected.steps.map((step, index) => (
              <article key={index} className={styles.action}>
                <span>STEP {String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
          <div className={styles.insightGrid}>
            <div><strong>見るポイント</strong><p>{selected.observe}</p></div>
            <div><strong>避けたいこと</strong><p>{selected.doNot}</p></div>
          </div>
          <div className={styles.question}>
            <span>REFLECT / ひとつ振り返る</span>
            <p>{selected.reflection}</p>
          </div>
          {selected.safety ? <p className={styles.safety}><ShieldCheck size={18} aria-hidden="true"/>{selected.safety}</p> : null}
          <div className={styles.actions}>
            <button type="button" onClick={savePlan} disabled={saveState === "saving" || saveState === "saved"} className={styles.save}>
              {saveState === "saved" ? <CheckCircle2 size={19} aria-hidden="true"/> : <Bookmark size={19} aria-hidden="true"/>}
              {saveState === "saving" ? "保存しています..." : saveState === "saved" ? "MY HOME COURTに保存済み" : "このプランを保存する"}
            </button>
            <Link className={styles.article} href={"/ja/journal/" + selected.articleSlug}><BookOpen size={18} aria-hidden="true"/> 関連記事を読む <ArrowRight size={16} aria-hidden="true"/></Link>
            <button className={styles.share} type="button" onClick={() => void copyLink()}>
              {copied ? <Check size={18} aria-hidden="true" /> : <ExternalLink size={18} aria-hidden="true" />}
              {copied ? "共有リンクをコピーしました" : "このプランを共有"}
            </button>
          </div>
          <div className={styles.status} role="status" aria-live="polite">
            {saveState === "login" ? <>保存には無料のRBA IDが必要です。<Link href={loginPath}>RBA IDでログインして保存する <ArrowRight size={14} aria-hidden="true"/></Link></> : null}
            {saveState === "error" ? "保存できませんでした。通信状況を確認して再度お試しください。課金は発生しません。" : null}
            {saveState === "saved" ? "プランを保存しました。ログイン中のMY HOME COURTの保存一覧から確認できます。" : null}
          </div>
        </section>

        <section className={styles.next} aria-labelledby="next-heading">
          <div><span className={styles.sectionLabel}>RBA / CONTINUE</span><h2 id="next-heading">今日の一歩を、次の成長へ。</h2><p>記事を読むだけで終わらせず、プレーで試して、気づきを残す。無料のRBA IDで経験の記録や次の活動探しもできます。</p></div>
          <nav aria-label="MY HOME COURTへの導線">
            <Link href="/ja/my-homecourt/login">無料RBA IDで始める <ArrowRight size={18} aria-hidden="true"/></Link>
            <Link href="/ja/opportunities">全国の育成機会を探す <ArrowRight size={18} aria-hidden="true"/></Link>
          </nav>
        </section>
        <footer className={styles.footnote}><ShieldCheck size={18} aria-hidden="true" /><p>このページは一般的な学習・行動のヒントであり、診断・法律相談・個別指導契約を提供するものではありません。この画面での選択だけではRBAのデータベースに保存されません。共有リンクには選んだ一般的な課題が含まれます。明示的に「保存」を選んだ場合のみ、選択した一般プランがご本人のアカウントに保存されます。未成年の方は保護者と利用してください。</p></footer>
      </main>
    </div>
  );
}
