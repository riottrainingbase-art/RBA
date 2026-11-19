import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck, PenLine } from "lucide-react";
import styles from "./note-bridge.module.css";

type NoteBridgeProps = { variant?: "home" | "journal" };

const noteItems = [
  { label: "無料記事", title: "ドイツの選手17名が日本で経験したこと", description: "交流の現場から、勝敗では測れない育成の価値を考える。", href: "https://note.com/rba_official/n/nf2fc33040fc7", action: "noteで読む" },
  { label: "有料単品記事", title: "海外遠征を「思い出」で終わらせない", description: "事前準備・安全・振り返りを深める実践編。販売条件はnote側で確認。", href: "https://note.com/rba_official/n/nae7e55e4dec5", action: "内容と価格を確認" },
  { label: "任意の月額応援", title: "RBA noteメンバーシップ", description: "活動応援と育成記事の月額プラン。記事単品購入・RBA IDとは別です。", href: "https://note.com/rba_official/membership", action: "プランと特典を確認" },
] as const;

export function NoteBridge({ variant = "home" }: NoteBridgeProps) {
  const headingId = `rba-reading-channels-${variant}`;
  return (
    <section className={`${styles.section} ${variant === "journal" ? styles.journal : styles.home}`} aria-labelledby={headingId}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>RBA / WHERE TO READ</p>
          <h2 id={headingId}>JOURNALとnote、何が違う？</h2>
          <p className={styles.lead}>大きな違いは、<strong>「根拠を整理して学ぶ場所」と「現場の視点・経験を深く読む場所」</strong>。どちらか一方に登録する必要はありません。</p>
        </div>
        <Link className={styles.all} href="/ja/reading-guide">発信の使い分けを見る <ArrowRight size={16}/></Link>
      </header>

      <div className={styles.comparison} aria-label="RBA JOURNAL・note・MY HOME COURTの役割">
        <article className={styles.channel}>
          <span className={styles.channelNumber}>01 / FREE LIBRARY</span>
          <BookOpen size={27} aria-hidden="true"/>
          <h3>RBA JOURNAL</h3>
          <strong>知る・根拠を確かめる。</strong>
          <p>公式資料や研究で確認できる内容、RBAの解釈、まだ断定できない点を整理。保護者も指導者も、必要なテーマから無料で読めます。</p>
          <Link href="/ja/journal">無料の育成記事を探す <ArrowRight size={16}/></Link>
        </article>
        <article className={`${styles.channel} ${styles.noteChannel}`}>
          <span className={styles.channelNumber}>02 / VOICE & FIELD NOTES</span>
          <PenLine size={27} aria-hidden="true"/>
          <h3>RBA公式note</h3>
          <strong>現場の視点と背景を読む。</strong>
          <p>代表の問題提起、現場での経験、活動報告、より踏み込んだ実践編。無料記事と有料記事があり、応援メンバーシップは任意です。</p>
          <a href="https://note.com/rba_official" target="_blank" rel="noopener noreferrer">公式noteを開く <ArrowRight size={16}/></a>
        </article>
        <article className={styles.channel}>
          <span className={styles.channelNumber}>03 / PUT INTO PRACTICE</span>
          <ClipboardCheck size={27} aria-hidden="true"/>
          <h3>MY HOME COURT</h3>
          <strong>読んだことを、自分の行動へ。</strong>
          <p>記事から得た気づき、練習や試合の振り返り、次のクリニックや挑戦をつなぐ場所。RBA IDは無料、有料機能は別途任意です。</p>
          <Link href="/ja/my-homecourt">MY HOME COURTを見る <ArrowRight size={16}/></Link>
        </article>
      </div>

      <div className={styles.examples}>
        <div className={styles.examplesHead}><div><p className={styles.kicker}>FROM NOTE</p><h3>noteには、こんな記事があります。</h3></div><a href="https://note.com/rba_official" target="_blank" rel="noopener noreferrer">記事一覧 <ArrowRight size={15}/></a></div>
        <div className={styles.cards}>{noteItems.map(item=><a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={styles.card}><span className={styles.label}>{item.label}</span><strong>{item.title}</strong><span className={styles.description}>{item.description}</span><span className={styles.action}>{item.action} <ArrowRight size={14} aria-hidden="true"/></span></a>)}</div>
      </div>
      <p className={styles.footnote}>RBA JOURNALの公開記事は無料です。noteの単品記事・月額会員、MY HOME COURTの月額プラン、D-HUB、クリニック参加費はそれぞれ別のサービスです。購入・入会前には各ページの最新条件をご確認ください。</p>
    </section>
  );
}
