import Link from "next/link";
import styles from "./clinic-support-invitation.module.css";

type ClinicSupportInvitationProps = {
  stage: "application" | "feedback";
};

const copy = {
  application: {
    eyebrow: "OPTIONAL SUPPORT / AFTER APPLICATION",
    heading: "申し込みのあとに、もう一つだけ。",
    lead: "今回の参加とは別に、RBAの育成活動を継続して支えてくださる方を募集しています。無理のない範囲で、次の子どもたちの挑戦を一緒につくっていただけたら嬉しいです。",
    growthId: "clinic-applied-note-support",
  },
  feedback: {
    eyebrow: "OPTIONAL SUPPORT / AFTER FEEDBACK",
    heading: "ご意見を、次の育成につなげていきます。",
    lead: "クリニックへのご参加と率直なフィードバックをありがとうございます。皆さまの声を活動の改善に活かしていきます。活動を継続して応援してくださる方は、月500円からのnoteメンバーシップもご検討ください。",
    growthId: "clinic-feedback-note-support",
  },
} as const;

/** A non-blocking invitation shown separately from registration, payment, and feedback. */
export function ClinicSupportInvitation({ stage }: ClinicSupportInvitationProps) {
  const c = copy[stage];
  return (
    <aside className={styles.section} aria-label="RBAの任意サポートのご案内">
      <p className={styles.eyebrow}>{c.eyebrow}</p>
      <h2>{c.heading}</h2>
      <p className={styles.lead}>{c.lead}</p>
      <div className={styles.plans} aria-label="note月額メンバーシップのプラン">
        <p><strong>月500円</strong><span>活動を応援。活動・使途・次の計画を月1回報告。</span></p>
        <p><strong>月1,000円</strong><span>応援に加え、育成・見守り方の実践記事を月2本。</span></p>
      </div>
      <Link className={styles.action} href="/ja/supporters" data-growth-id={c.growthId}>
        任意の応援方法を見る <span aria-hidden="true">→</span>
      </Link>
      <p className={styles.note}>
        <strong>参加・フィードバックへの回答は、応援会員への加入とは無関係です。</strong>
        ご加入の有無で参加条件・選手の評価・今後の案内に不利益はありません。
        月500円・1,000円はいずれも任意の月額契約です。決済と更新・退会はnoteで行います。
        すでに会員の方は重複してお申し込みいただく必要はありません。
      </p>
    </aside>
  );
}
