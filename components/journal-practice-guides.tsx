import Link from "next/link";
import type { PublicJournalPost } from "@/lib/public-content";
import styles from "./journal-practice-guides.module.css";

const guides = [
  { slug: "practice-observation-ten-minute-sheet", label: "保護者・指導者", time: "10分の観察", title: "練習を10分見たら、何が分かる？", description: "待つ・選ぶ・もう一度試す。印象を、話し合える記録へ。", tool: "観察シート・架空の記入例" },
  { slug: "family-weekly-sport-schedule-sheet", label: "保護者・選手", time: "15分の家族会議", title: "予定を埋める前に、1週間を広げよう。", description: "チームも、スクールも、移動も。別々の予定を一枚に。", tool: "週間書式・相談メッセージ例" },
  { slug: "before-adopting-a-basketball-drill", label: "指導者", time: "次の練習をつくる", title: "その練習、採用する前に5つだけ。", description: "動画をまねる前に、誰の、どんなプレーを変えるか。", tool: "採用チェック・2対1の設計例" },
];

export function JournalPracticeGuides({ posts }: { posts: PublicJournalPost[] }) {
  const available = guides.filter(guide => posts.some(post => post.slug === guide.slug));
  if (!available.length) return null;
  return <section className={`${styles.section} section-pad`} aria-labelledby="journal-practice-guides">
    <div className={styles.heading}><div><p className="section-index">READ → TRY → REVIEW</p><h2 id="journal-practice-guides">読んだら、一つ試してみる。</h2></div><p>答えを押しつけるためではなく、話し合う材料をつくるために。書き写して使える、RBAの実践ガイドです。無料・ログイン不要。</p></div>
    <div className={styles.grid}>{available.map((guide, index) => <article key={guide.slug}>
      <div className={styles.meta}><span>0{index + 1} / {guide.label}</span><span>{guide.time}</span></div>
      <h3><Link href={`/ja/journal/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p><small>{guide.tool}</small>
      <Link className={styles.link} href={`/ja/journal/${guide.slug}`}>ガイドと記入例を読む <span aria-hidden="true">↗</span></Link>
    </article>)}</div>
    <p className={styles.note}>書式・時間配分・例はRBAの提案です。公式の評価尺度や、FIBA・WABCの認定書式ではありません。各記事で原典と使える範囲を確認できます。</p>
  </section>;
}
