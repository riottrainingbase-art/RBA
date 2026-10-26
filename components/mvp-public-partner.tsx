import type { Locale } from "./site-frame";
import { localePath } from "./site-frame";
import styles from "./mvp-public-partner.module.css";

const copy = {
  ja: { title: "MVP Basketball Academyと業務提携", location: "日本 × マレーシア", body: "Riot Basketball Academyは、マレーシアのMVP Basketball Academyと業務提携を結びました。日本とマレーシアのつながりを通じて、子どもたちの育成に取り組みます。", direction: "これから一緒につくること", aim: "選手の学びを中心に、指導者同士の知識・実践の共有を深め、共同クリニックや育成年代の交流機会を検討していきます。", note: "個別プログラムの日程・参加条件は、決定後に別途ご案内します。", link: "交流・連携について相談する", role: "育成・国際交流パートナー" },
  en: { title: "Our partnership with MVP Basketball Academy", location: "Japan × Malaysia", body: "Riot Basketball Academy and Malaysia’s MVP Basketball Academy have formed a partnership to support youth basketball development and strengthen connections between Japan and Malaysia.", direction: "Our future direction", aim: "With player learning at the centre, we aim to exchange coaching ideas and practice experience, and explore joint clinics and youth exchange opportunities.", note: "We will announce dates and participation details for individual programmes once confirmed.", link: "Discuss exchange and collaboration", role: "Player development and international exchange partner" },
  "zh-tw": { title: "與MVP Basketball Academy締結業務合作", location: "日本 × 馬來西亞", body: "Riot Basketball Academy與馬來西亞MVP Basketball Academy締結業務合作，透過日本與馬來西亞的連結，共同支持青少年籃球培育。", direction: "未來合作方向", aim: "以球員的學習為中心，促進教練之間的理念與實務交流，並探討共同訓練活動及青少年交流的機會。", note: "各項活動的日期與參加條件將於確定後另行公布。", link: "洽詢交流與合作", role: "青少年培育與國際交流夥伴" },
  ko: { title: "MVP Basketball Academy와 업무 제휴", location: "일본 × 말레이시아", body: "Riot Basketball Academy는 말레이시아의 MVP Basketball Academy와 업무 제휴를 맺었습니다. 일본과 말레이시아의 연결을 통해 유소년 농구 육성을 함께 지원합니다.", direction: "앞으로의 협력 방향", aim: "선수의 배움을 중심으로 코치들의 지도 아이디어와 실천 경험을 공유하고, 공동 클리닉과 유소년 교류 기회를 검토합니다.", note: "개별 프로그램의 일정과 참가 조건은 확정 후 별도로 안내합니다.", link: "교류 및 협력 문의", role: "선수 육성 및 국제 교류 파트너" },
} satisfies Record<Locale, { title: string; location: string; body: string; direction: string; aim: string; note: string; link: string; role: string }>;

export function MvpPublicPartner({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <section className={styles.section} id="mvp-partnership" aria-labelledby="mvp-partnership-title">
    <div className={styles.inner}>
      <p className={styles.kicker}>OFFICIAL PARTNERSHIP / RBA × MVP</p>
      <h2 id="mvp-partnership-title">{c.title}</h2>
      <div className={styles.content}>
        <div className={styles.brand}><img src="/mvp-academy-logo.jpg" width="160" height="162" alt="MVP Basketball Academy" loading="lazy"/><p>MVP Basketball Academy</p><span>{c.location}</span></div>
        <div className={styles.copy}><p className={styles.role}>{c.role}</p><p>{c.body}</p><h3>{c.direction}</h3><p>{c.aim}</p><p className={styles.note}>{c.note}</p><a href={localePath(locale, "contact")}>{c.link}<span aria-hidden="true">↗</span></a></div>
      </div>
    </div>
  </section>;
}
