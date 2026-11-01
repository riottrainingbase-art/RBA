import styles from "./note-bridge.module.css";

type NoteBridgeProps = {
  variant?: "home" | "journal";
};

const noteItems = [
  {
    label: "無料で読む",
    title: "ドイツの選手17名が日本で経験したこと",
    description: "学校交流、合同練習、ホームステイ。勝敗だけでは測れない育成の価値を考えます。",
    href: "https://note.com/rba_official/n/nf2fc33040fc7",
    action: "無料記事を読む",
  },
  {
    label: "指導者向け｜単品 ¥1,200（税込）",
    title: "海外遠征を「思い出」で終わらせない",
    description: "合同練習90分の構成例、選手評価、安全管理、帰国後4週間の振り返りを整理した実践編です。",
    href: "https://note.com/rba_official/n/nae7e55e4dec5",
    action: "有料実践編を見る",
  },
  {
    label: "継続して学ぶ・応援する",
    title: "RBAメンバーズ",
    description: "活動を応援する月500円プランと、育成記事も読める月1,000円プランがあります。",
    href: "https://note.com/rba_official/membership",
    action: "月額プランを確認",
  },
] as const;

export function NoteBridge({ variant = "home" }: NoteBridgeProps) {
  const headingId = `rba-official-note-${variant}`;

  return (
    <section
      className={`${styles.section} ${variant === "journal" ? styles.journal : styles.home}`}
      aria-labelledby={headingId}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>RBA OFFICIAL NOTE</p>
          <h2 id={headingId}>公式noteで、育成の考えを読む。</h2>
          <p className={styles.lead}>
            RBA JOURNALは公式サイトの育成資料・記事。
            noteでは、現場の考えや活動報告、指導者向けの実践記事を発信しています。
          </p>
        </div>
        <a
          className={styles.all}
          href="https://note.com/rba_official"
          target="_blank"
          rel="noopener noreferrer"
        >
          公式noteの記事一覧 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={styles.cards}>
        {noteItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <span className={styles.label}>{item.label}</span>
            <strong>{item.title}</strong>
            <span className={styles.description}>{item.description}</span>
            <span className={styles.action}>{item.action} <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
      <p className={styles.note}>リンク先は外部サービスのnoteです。単品記事と月額メンバーシップは別のサービス・料金です。</p>
    </section>
  );
}
