import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "../events/okinawa-international-camp-2026/page.module.css";

const canonical = "https://riotbasketballacademy.com/ko/korea";
const torsten = "/ko/events/torsten-loibl-online-clinic";
const camp = "/ko/events/okinawa-international-camp-2026";
const organisationMail = "mailto:riot.training.base@gmail.com?subject=" +
  encodeURIComponent("Korea–Japan youth basketball partnership enquiry") +
  "&body=" + encodeURIComponent("소속 단체명:\n담당자 성함:\n활동 지역:\n대상 연령 및 예상 인원:\n관심 분야 (훈련/코치교육/친선경기/캠프):\n희망 시기:\n문의 내용:\n");
const torstenDetails = "https://riotbasketballacademy.com/events/torsten-loibl-online-clinic";

export const metadata: Metadata = {
  title: "한국 × 일본 유소년 농구 교류·지도자 교육 | RBA JAPAN",
  description: "한국 유소년 농구클럽과 지도자를 위한 일본 RBA 교류 창구. 2026년 11월 Torsten Loibl 지도자 강의, 12월 오키나와 국제캠프, 2027년 일한 공동 프로그램 상담.",
  alternates: {
    canonical,
    languages: {
      ko: canonical,
      ja: "https://riotbasketballacademy.com/ja/international",
      en: "https://riotbasketballacademy.com/international",
      "x-default": "https://riotbasketballacademy.com/international",
    },
  },
  openGraph: {
    title: "한국과 일본의 코트가 만나는 곳 | RBA JAPAN",
    description: "코치교육, 유소년 캠프, 교류 경기. 먼저 조건과 목적을 맞추는 작은 협력부터 시작합니다.",
    url: canonical,
    locale: "ko_KR",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-court-hero.png" }],
  },
};
const faq = [
  ["한국 클럽과 공동으로 프로그램을 만들 수 있나요?",
   "가능성을 함께 검토할 수 있습니다. 선수 연령·지도 목표·일정·회장·운영 인력·안전·비용을 확인한 다음 구체적인 조건을 협의합니다. 지금 참여나 공동개최를 확약하는 것은 아닙니다."],
  ["일본에서 친선경기를 치를 수 있나요?",
   "학교나 클럽과의 교류, 합동 훈련, 친선경기를 개별적으로 기획할 수 있습니다. 참가팀과 장소, 출입국, 보험, 미성년자 인솔 등에 대한 확인이 우선입니다."],
  ["11월 25일 Torsten Loibl 강의는 한국어로 진행되나요?",
   "아닙니다. 강의는 영어로 진행되고 일본어 순차통역이 포함됩니다. 한국어 통역은 제공되지 않습니다. 라이브와 30일 녹화는 각각 별도 상품입니다."],
  ["오키나와 캠프에서 아이들은 보호자 없이 숙박할 수 있나요?",
   "나이와 필요한 지원, 인솔 체제, 시설 규정에 따라 개별 확인이 필요합니다. 시설과의 운영 세부 조율이 끝나기 전에는 보호자 없는 참가나 방 배정을 확약하지 않습니다."],
] as const;

export default function KoreaPartnerHub() {
  return <SiteFrame locale="ko">
    <main className={styles.page} lang="ko">
      <div className={styles.eyebrow}>RIOT BASKETBALL ACADEMY · JAPAN × KOREA</div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>COACH EDUCATION · YOUTH DEVELOPMENT · INTERNATIONAL EXCHANGE</p>
          <h1>한국과 일본의 코트,<br /><span>함께 넓혀 갑니다.</span></h1>
          <p className={styles.lead}>한 번의 방문보다 오래 남을 배움을.</p>
          <p className={styles.intro}>일본 Riot Basketball Academy(RBA)는 유소년 선수의 기술과 판단력, 지도자의 훈련 설계, 팀 간 교류를 연결합니다. 한국 클럽과도 서로의 운영 방식을 존중하며 작은 협력부터 시작하고 싶습니다.</p>
          <div className={styles.actions}>
            <a href={organisationMail} className={styles.primary}>클럽·아카데미 협력 상담 ↗</a>
            <a href="#programmes" className={styles.secondary}>참여 가능한 프로그램 보기 ↓</a>
          </div>
          <p className={styles.safety}>아래 프로그램의 참가·모집·교통편·비용 조건은 각각 다릅니다. 교류 협의만으로 참가 신청이나 유료 계약이 성립하지 않습니다.</p>
        </div>
      </section>
      <div className={styles.stats} aria-label="교류의 세 가지 방향">
        <div><strong>LEARN</strong><span>코치의 학습</span></div>
        <div><strong>PLAY</strong><span>선수의 도전</span></div>
        <div><strong>CONNECT</strong><span>팀 간 교류</span></div>
      </div>
      <section className={styles.section} id="programmes">
        <p className={styles.sectionLabel}>01 / COACH EDUCATION · NOVEMBER 2026</p>
        <h2>훈련에서는 넣는 슛.<br/>경기에서는 어떻게 만들어낼까?</h2>
        <p>2026년 11월 25일(수) 20:00~21:30(한국시간) · Zoom</p>
        <p>Torsten Loibl 온라인 코칭 클리닉 Vol.2에서는 슛 기술, 공간 활용, 오프볼 움직임과 판단, 게임으로 연결되는 훈련 설계를 다룹니다. Loibl 코치의 경력 및 자격은 강사 소개이며, RBA 단독 주최의 행사에 대한 FIBA 또는 소속 구단의 공인·후원을 의미하지 않습니다.</p>
        <div className={styles.priceGrid}>
          <article><span>LIVE / ZOOM · 영어 + 일본어 순차통역</span><strong>US$29</strong><p>2026년 11월 25일, 실시간 참가. 녹화 시청권은 포함되지 않습니다.</p></article>
          <article><span>RECORDING / 30일 개인 시청</span><strong>US$29</strong><p>행사 후 공개일부터 30일간 시청하는 별도 상품. 라이브 참가권은 포함되지 않습니다.</p></article>
        </div>
        <p className={styles.warning}>한국어 통역은 없습니다. 한국 참가자는 국제 신청 페이지에서 USD Stripe 결제를 이용하며, 일본 국내 엔화·Square 신청과는 별도입니다.</p>
        <div className={styles.actions}><a className={styles.primary} href={torsten}>한국어 강의 안내 보기 ↗</a><a className={styles.secondary} href={torstenDetails}>국제 신청 조건 확인 ↗</a></div>
      </section>
      <section className={styles.section}>
        <p className={styles.sectionLabel}>02 / YOUTH CAMP · DECEMBER 2026</p>
        <h2>2026 오키나와 국제 유소년 농구 캠프</h2>
        <p><strong>2026년 12월 22~24일 · 만 7~18세 · 일본 오키나와 이토만</strong></p>
        <p>국적이 다른 또래 선수와 함께 훈련하고, 경기 속 판단을 배우며, 코트 밖에서는 새로운 친구를 만나는 국제 프로그램입니다. 참가 연령과 경험에 따른 그룹 편성을 계획합니다.</p>
        <div className={styles.priceGrid}>
          <article><span>DAY CAMP / 숙박 없음 · 해외 기본 요금</span><strong>US$300</strong><p>항공료·교통편·동반 보호자 숙박은 별도입니다.</p></article>
          <article><span>RESIDENTIAL / 선수 2박 · 해외 기본 요금</span><strong>US$450</strong><p>프로그램 지정 숙박·식사를 포함합니다. 최종 제공 범위는 참가 전 안내합니다.</p></article>
        </div>
        <p className={styles.note}>조기 신청 및 2명 이상 할인은 공식 참가 안내에서 적용 기한·조건을 확인해 주세요. 보호자 숙박, 공항 송영, 체육관 방문, 최종 시간표와 시설 운영 세부 조건은 아직 확정되지 않았습니다. 예약 변경이 불가능한 항공권은 최종 안내 전 구입하지 않는 편이 안전합니다.</p>
        <div className={styles.actions}><a className={styles.primary} href={camp}>한국 참가자·학부모 안내 보기 ↗</a></div>
      </section>
      <section className={styles.section}>
        <p className={styles.sectionLabel}>03 / TEAM-TO-TEAM · 2027 AND BEYOND</p>
        <h2>내년에 함께 할 수 있는 작은 교류부터.</h2>
        <div className={styles.grid}>
          <article><b>CLINIC</b><h3>방문 클리닉</h3><p>한국 클럽에서 연령·수준에 맞춘 훈련을 함께 설계합니다. 시기와 강사 조건은 협의 후 결정합니다.</p></article>
          <article><b>EXCHANGE</b><h3>친선경기·합동 훈련</h3><p>경기 결과보다 선수의 학습과 문화 교류를 우선합니다. 체육관과 상대팀, 인솔·보험 조건은 별도 확인합니다.</p></article>
          <article><b>EDUCATION</b><h3>지도자 공동 학습</h3><p>U12·U15 학습 설계와 참여 기회, 게임 속 의사결정 등 구체적인 주제로 토론·실습을 검토합니다.</p></article>
        </div>
        <p className={styles.note}>2027년 개최일, 참가비, 숙박·이동, 지도자 초청과 계약 조건은 이 페이지에서 확약하지 않습니다. 각 단체의 희망과 운영 가능성을 먼저 확인합니다.</p>
      </section>
      <section className={styles.section}>
        <p className={styles.sectionLabel}>FREQUENT QUESTIONS</p>
        <h2>협력과 참가 전에 확인할 내용</h2>
        <div className={styles.faq}>{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>
      <section className={styles.cta}>
        <p className={styles.sectionLabel}>CONTACT / KOREA × JAPAN</p>
        <h2>무엇을 함께 만들고 싶은지 알려주세요.</h2>
        <p>클럽 이름, 활동 지역, 대상 연령, 원하는 교류 방식과 시기를 보내 주세요. 첫 문의에 선수·보호자 명단이나 여권번호는 필요하지 않습니다. 소개·문의에 비용이 발생하지 않으며, 양측이 명확히 합의하기 전에는 어떠한 계약도 확정되지 않습니다.</p>
        <div className={styles.actions}><a className={styles.primary} href={organisationMail}>RBA에 협력 제안 보내기 ↗</a><a className={styles.secondary} href={camp}>오키나와 가족 안내 ↗</a></div>
        <p className={styles.muted}>Riot Basketball Academy Japan · Masato Nishio · riot.training.base@gmail.com</p>
      </section>
    </main>
  </SiteFrame>;
}
