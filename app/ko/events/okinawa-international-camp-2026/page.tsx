import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

const canonical = "https://riotbasketballacademy.com/ko/events/okinawa-international-camp-2026";
const familyGuide = "https://riotbasketballacademy.com/okinawa-international-guide-2026.html";
const entry = "mailto:riot.training.base@gmail.com?subject=" + encodeURIComponent("Korea / Okinawa International Youth Camp 2026 — family enquiry") +
  "&body=" + encodeURIComponent("참가를 결정하기 전에 문의하고 싶습니다.\n선수 나이: \n참가 선수 수: \n출발 도시: \n숙박형 또는 통학형: \n동반 보호자 수: \n질문: \n");
const partnership = "mailto:riot.training.base@gmail.com?subject=" + encodeURIComponent("Korea–Japan U12/U15 basketball exchange / partner enquiry");

export const metadata: Metadata = {
  title: "오키나와 국제 유소년 농구 캠프 2026 | 한국 참가자 안내 | RBA",
  description: "2026년 12월 22~24일 일본 오키나와·이토만. 만 7~18세 국제 유소년 농구 캠프. 숙박·참가비·보호자 호텔·교통·안전 조건과 한국 참가자 상담 안내. 운영 세부사항은 확정 전입니다.",
  alternates: {
    canonical,
    languages: {
      ko: canonical,
      ja: "https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026",
      en: familyGuide,
      "x-default": familyGuide,
    },
  },
  openGraph: {
    title: "2026 오키나와 국제 유소년 농구 캠프 | 한국 참가자 안내",
    description: "12월 22~24일 · 만 7~18세 · 이토만. 한국 가족과 클럽이 여행 전 확인할 조건과 문의 창구.",
    url: canonical,
    siteName: "Riot Basketball Academy",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-court-hero.png" }],
  },
};

const questions = [
  ["일본어를 못해도 참가할 수 있나요?", "국제 교류 프로그램으로 계획하고 있으나 한국어 전담 통역은 보장되지 않습니다. 선수의 연령과 필요한 언어 지원을 사전에 알려 주시면 참여 가능 여부를 개별 확인하겠습니다."],
  ["보호자도 숙박시설에서 함께 잘 수 있나요?", "동반 보호자는 별도의 호텔을 예약하는 방향으로 준비해 주세요. 보호자의 숙박·식비는 선수 참가비에 포함되지 않습니다."],
  ["숙소와 체육관 사이에 셔틀버스가 있나요?", "공항 송영 및 보호자 숙소와 훈련 장소 사이의 셔틀 운행을 검토·조율하고 있지만, 버스·승하차 장소·시간·비용은 아직 확정되지 않았습니다. 확정 안내 전까지는 개별 이동도 고려해 주세요."],
  ["부모가 훈련을 참관할 수 있나요?", "학부모의 체육관 방문 및 자녀 훈련 참관은 가능합니다. 다만 방문 가능한 시간, 출입 방법과 관람 중 지켜야 할 사항은 최종 훈련 일정과 시설 규정·스태프 안내에 따라야 합니다."],
  ["형제자매가 같은 방에 묵을 수 있나요?", "형제의 동실 희망은 접수할 수 있지만, 실제 방 배정과 감독 인력은 시설 규정에 따라 최종 확인해야 합니다."],
  ["참가비를 결제하면 참가가 확정되나요?", "아니요. 시설 운영 조건과 참가자의 연령·지원 필요 사항 등 최종 조건을 확인한 후 참가 확정 안내를 드립니다. 이미 결제한 경우에는 중복 결제하지 마세요."],
  ["취소·환불 조건은 무엇인가요?", "RBA가 주최하는 캠프에는 공식 취소·환불 규정이 적용됩니다. 신청 직후 참가비의 20%를 일률적으로 환불하지 않거나, 캠프 시작 20일 전부터 무조건 환불을 거절하는 규정은 운영하지 않습니다. RBA가 개최 전에 취소하는 경우(태풍 등 불가항력 포함) 참가비를 전액 환불합니다. 참가자 본인의 취소 수수료는 사전에 안내된 적법한 개별 조건에 따릅니다."],
  ["보험과 지도자 배치는 확정되었나요?", "아직 아닙니다. 캠프 지도자·감독 인원과 보험의 구체적인 보장 범위는 참가 확정 전에 안내합니다. 시설의 배상책임보험이 선수의 모든 부상을 보장하는 것은 아닙니다. 지도자 1명당 선수 10명 배치를 확정한 것으로 안내하지 않습니다."],
] as const;

export default function Page() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "RBA Okinawa International Youth Basketball Camp 2026",
    startDate: "2026-12-22",
    endDate: "2026-12-24",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Itoman Youth Center",
      address: {
        "@type": "PostalAddress",
        streetAddress: "賀数347",
        addressLocality: "糸満市",
        addressRegion: "沖縄県",
        addressCountry: "JP",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Riot Basketball Academy",
      url: "https://riotbasketballacademy.com",
    },
    inLanguage: ["ko", "en", "ja"],
    url: canonical,
  };
  return <SiteFrame locale="ko">
    <main className={styles.page} lang="ko">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <div className={styles.eyebrow}>RBA JAPAN × KOREA · INTERNATIONAL YOUTH DEVELOPMENT</div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>OKINAWA · JAPAN · 22–24 DECEMBER 2026</p>
          <h1>바스켓볼로 만나는<br /><span>새로운 세계.</span></h1>
          <p className={styles.lead}>일본 오키나와 국제 유소년 농구 캠프</p>
          <p className={styles.intro}>훈련, 게임, 팀 활동을 통해 다른 나라의 선수와 함께 배우는 3일. 코트에서 기술을 익히는 데서 그치지 않고, 게임을 읽고 스스로 판단하는 경험을 나눕니다.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={entry}>참가 조건 먼저 문의하기 <span aria-hidden="true">↗</span></a>
            <a className={styles.secondary} href="#details">일정·참가비 살펴보기 ↓</a>
          </div>
          <p className={styles.safety}>시설은 신청 절차와 운영 규정에 따라 행사 수용에 동의했습니다. 세부 시설 이용, 훈련 시간, 인솔 인력 및 교통편은 최종 조율 중이며 참가 확정 전입니다.</p>
        </div>
      </section>
      <div className={styles.stats} aria-label="행사 개요">
        <div><strong>12.22–24</strong><span>2026년 · 2박 3일</span></div>
        <div><strong>7–18</strong><span>참가 가능 연령</span></div>
        <div><strong>ITOMAN</strong><span>오키나와현 이토만시</span></div>
      </div>
      <section id="details" className={styles.section}>
        <p className={styles.sectionLabel}>PROGRAMME / 운영 개요</p>
        <h2>기술·판단·국제 교류를 한 번에.</h2>
        <div className={styles.grid}>
          <article><b>01 / TRAIN</b><h3>게임을 위한 연습</h3><p>연령과 경험을 고려해 기술, 공간 활용, 움직임, 판단을 연결합니다. 세부 훈련 내용은 최종 일정에서 안내합니다.</p></article>
          <article><b>02 / PLAY</b><h3>다른 스타일과의 만남</h3><p>소규모 게임과 교류를 통해 일본 및 다른 지역 선수의 플레이 방식을 접합니다. 참가 국가·팀 수는 아직 확정되지 않았습니다.</p></article>
          <article><b>03 / CONNECT</b><h3>코트 밖의 배움</h3><p>함께 지내고 소통하는 경험을 중시합니다. 숙박 인솔·식사·야간 운영은 확정된 조건을 개별 안내합니다.</p></article>
        </div>
      </section>
      <section className={styles.section}>
        <p className={styles.sectionLabel}>INTERNATIONAL FEES / 한국에서 참가할 경우</p>
        <h2>요금과 포함 항목을 먼저 확인하세요.</h2>
        <div className={styles.priceGrid}>
          <article><span>DAY CAMP / 숙박 없음</span><strong>US$300</strong><p>해외 참가 기본 요금 · 선수 1명. 숙박, 항공편, 이동 및 동반 보호자 비용 별도.</p></article>
          <article><span>RESIDENTIAL / 선수 2박</span><strong>US$450</strong><p>해외 참가 기본 요금 · 선수 1명. 지정된 숙박 및 식사 포함. 제공 범위와 방 배정은 최종 확인.</p></article>
        </div>
        <p className={styles.note}>위 금액은 해외 참가자 기본 요금입니다. RBA가 안내하는 조기 신청 20% 할인은 계속 적용되고 있으며 새 마감일은 정해지지 않았습니다. 해당 조건을 충족하면 1명 기준 숙박형 US$360, 통학형 US$240입니다. 2명 이상 추가 10% 할인이 적용되는 2명 동시 신청은 1인당 숙박형 US$324, 통학형 US$216입니다. 항공권·이동·보호자 비용은 별도이며, 3명 이상은 개별 상담이 필요합니다.</p>
        <p className={styles.warning}><strong>결제 전 조건 확인:</strong> 해외 협력 사이트와 일부 Stripe 결제 화면에 과거 조기 신청 마감일 및 RBA 공식 규정과 다른 취소·환불 문구가 남아 있어 수정·대조 중입니다. 금액·신청 방법·적용 환불 조건을 RBA에 문의하여 확인한 후 결제해 주세요. 이미 신청·결제한 분은 중복 결제하지 마세요.</p>
        <div className={styles.actions}><a className={styles.secondary} href="/ja/cancellation">RBA 공식 취소·환불 규정 확인 ↗</a><a className={styles.secondary} href="/okinawa-international-guide-2026.html#korean">한국어 보호자 가이드 ↗</a></div>
      </section>
      <section className={styles.section}>
        <p className={styles.sectionLabel}>BEFORE BOOKING / 출발 전 확인</p>
        <h2>부모님이 궁금해하실 내용을 먼저 알려드립니다.</h2>
        <div className={styles.faq}>
          {questions.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
        <p className={styles.warning}>체육관 이용시간과 최종 집합·해산 시각은 조율 중입니다. 셔틀 운행·요금과 최종 인솔 인력·야간 감독·보험 보장 범위도 아직 확정되지 않았습니다. 부모님의 훈련 참관은 가능하지만 방문 시간과 출입 방법은 시설 규정을 따릅니다. 최종 안내 전에는 환불이 불가능한 항공권이나 호텔을 예약하지 마세요. 알레르기·응급 대응 정보도 참가 확정 전에 별도로 확인합니다.</p>
      </section>
      <section className={styles.cta}>
        <p className={styles.sectionLabel}>KOREA × JAPAN</p>
        <h2>관심이 있다면, 우선 대화부터 시작해 주세요.</h2>
        <p>한국의 유소년 팀, 농구 아카데미, 학부모가 참가를 검토할 때 필요한 정보를 함께 확인하겠습니다. 처음에는 선수 나이, 인원, 출발 도시, 숙박 희망, 동반 보호자 수 정도만 알려주시면 됩니다. 여권번호나 상세 의료정보는 첫 문의에 필요하지 않습니다.</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={entry}>한국 참가 문의 메일 보내기 ↗</a>
          <a className={styles.secondary} href={familyGuide} target="_blank" rel="noopener noreferrer">한국어 보호자 안내 읽기 ↗</a>
        </div>
        <p>한국 클럽의 합동 훈련·교류 경기 및 2027년 공동 프로그램도 별도로 논의할 수 있습니다. <a href={partnership}>클럽 협력 문의 ↗</a></p>
        <p className={styles.muted}>해외 협력 사이트는 정보 참고용이며, 결제·환불 문구 대조가 끝나기 전에는 반드시 RBA에 확인해 주세요.</p><p className={styles.muted}>주최: Riot Basketball Academy (RBA) · riot.training.base@gmail.com · 시설/운영 최종 확정 전. 이 페이지는 행사 참가 조건을 설명하기 위한 공식 안내이며, 시설이나 제3자 단체의 보증을 의미하지 않습니다.</p>
      </section>
    </main>
  </SiteFrame>;
}
