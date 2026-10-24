import type { Locale } from "./site-frame";
import styles from "./okinawa-camp-partner.module.css";

const copy = {
  ja: { title: "子どもたちの挑戦を、ともに。", role: "公式タイムキーパー", body: "TIMEXが、2026年12月22〜24日開催予定の沖縄国際ユースバスケットボールキャンプの公式タイムキーパーに決定しました。子どもたちが世界の仲間と出会い、挑戦する機会をともにつくります。", scope: "沖縄国際ユースバスケットボールキャンプ2026", link: "キャンプの開催概要・参加案内", notice: "TIMEXが公式タイムキーパーに決定" },
  en: { title: "Together for young players’ next challenge.", role: "Official Timekeeper", body: "TIMEX has been named Official Timekeeper of the Okinawa International Youth Basketball Camp, scheduled for December 22–24, 2026. Together, we support an opportunity for young players to connect and challenge themselves with peers from around the world.", scope: "Okinawa International Youth Basketball Camp 2026", link: "Camp details and participation", notice: "TIMEX named Official Timekeeper" },
  "zh-tw": { title: "一起支持孩子的下一次挑戰。", role: "官方計時合作夥伴", body: "TIMEX 已確定擔任預定於2026年12月22–24日舉行的沖繩國際青少年籃球訓練營官方計時合作夥伴，共同支持孩子與世界各地球友交流、挑戰自我的機會。", scope: "2026沖繩國際青少年籃球訓練營", link: "查看營隊詳情與參加資訊", notice: "TIMEX 確定擔任官方計時合作夥伴" },
  ko: { title: "아이들의 다음 도전을 함께합니다.", role: "공식 타임키퍼", body: "TIMEX가 2026년 12월 22–24일 개최 예정인 오키나와 국제 유소년 농구 캠프의 공식 타임키퍼로 선정되었습니다. 세계의 또래 선수들과 만나고 도전하는 기회를 함께 지원합니다.", scope: "2026 오키나와 국제 유소년 농구 캠프", link: "캠프 안내 및 참가 정보", notice: "TIMEX 공식 타임키퍼 선정" },
} satisfies Record<Locale, { title: string; role: string; body: string; scope: string; link: string; notice: string }>;

export function OkinawaCampPartnerNotice({ locale }: { locale: Locale }) {
  return <p className={styles.notice}><span aria-hidden="true">●</span> {copy[locale].notice}<span className={styles.english}>OFFICIAL TIMEKEEPER / OKINAWA CAMP 2026</span></p>;
}

export function OkinawaCampPartner({ locale = "ja" }: { locale?: Locale }) {
  const c = copy[locale];
  const href = locale === "ja" ? "/ja/events/okinawa-international-camp-2026#entry-desk" : locale === "zh-tw" ? "https://okinawa.camp/?lang=zh-TW" : "https://okinawa.camp/";
  return <section className={styles.section} aria-labelledby={`camp-partner-${locale}`}>
    <div className={styles.inner}>
      <p className={styles.kicker}>OKINAWA CAMP 2026 / OFFICIAL TIMEKEEPER</p>
      <h2 id={`camp-partner-${locale}`}>{c.title}</h2>
      <div className={styles.card}>
        <div className={styles.brand}><strong>TIMEX</strong><span>OFFICIAL TIMEKEEPER</span></div>
        <div><p className={styles.scope}>{c.scope}</p><h3>TIMEX <span>/ {c.role}</span></h3><p className={styles.body}>{c.body}</p><a className={styles.link} href={href}>{c.link} <span aria-hidden="true">↗</span></a></div>
      </div>
    </div>
  </section>;
}
