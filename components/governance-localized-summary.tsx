import type { Locale } from "./site-frame";
import { SiteFrame } from "./site-frame";
import styles from "./governance-localized-summary.module.css";

type TranslationLocale = Extract<Locale, "en" | "zh-tw" | "ko">;

const copy = {
  en: {
    back: "Back to RBA",
    kicker: "ORGANISATION / GOVERNANCE",
    title: "Our organisation and governance",
    intro: "How we fund purposeful youth basketball development, and how we distinguish adopted rules from proposals.",
    role: "Riot Basketball Academy (RBA) • Based in Sendai, Japan",
    current: "Current organisational rules",
    currentDate: "Effective 7 July 2026",
    currentBody: "RBA's Japanese organisational rules describe youth development, coach and parent education, and domestic and international exchange. They allow participation fees, membership fees, donations, sponsorship and other programme income, while prohibiting distribution of surpluses to members. Funds remaining after appropriate expenses are used for the organisation's purposes.",
    proposed: "Governance revisions under consideration",
    proposedStatus: "Draft only — not effective",
    proposedBody: "A separate 29-article proposal addresses membership, decision-making, conflicts of interest, reasonable remuneration, financial controls, safeguarding and dissolution. This proposal has not been adopted as an amendment to the current rules.",
    legal: "Nonprofit purpose is not the same as corporate registration",
    legalBody: "Charging a fee does not, by itself, make a youth development programme profit-seeking. However, RBA's stated purpose does not establish nonprofit corporate status, charitable tax relief or a right to use any particular public facility. Legal and facility requirements must be assessed for each activity.",
    original: "Read the current Japanese rules and the full draft",
    note: "This page is an explanatory translation. The Japanese text identifies the current adopted rules and proposed clauses; translations do not replace the Japanese source. Public facts should not be read as certification, registration or legal advice.",
    contact: "Ask about governance",
  },
  "zh-tw": {
    back: "返回 RBA",
    kicker: "ORGANISATION / GOVERNANCE",
    title: "團體概要與治理原則",
    intro: "說明青少年籃球培育活動的經費來源，以及現行規章與尚未生效草案的區別。",
    role: "Riot Basketball Academy（RBA）・活動據點：日本仙台",
    current: "現行團體規章",
    currentDate: "2026年7月7日起施行",
    currentBody: "RBA的日文現行規章以青少年健全發展、教練與家長教育、國內外交流為宗旨；活動可收取參加費、會費、捐款、贊助及其他收入，但不將盈餘分配給成員。支付合理的活動費用後，餘額繼續用於團體宗旨。",
    proposed: "研議中的治理修訂",
    proposedStatus: "僅為草案・尚未生效",
    proposedBody: "另一份29條草案規劃會員資格、決策程序、利益衝突、合理報酬、會計管理、兒少安全與解散後資產處理。該草案尚未正式通過。",
    legal: "非營利宗旨不等於取得法人資格",
    legalBody: "收取參加費不必然表示以營利為目的；但自述非營利宗旨，不代表已取得非營利法人資格、稅務優惠或特定公共場館的使用許可。各活動仍須依適用法規及場館規定判斷。",
    original: "閱讀日文現行規章與完整草案",
    note: "本頁為便於理解的翻譯摘要，不能取代日文規章全文；不得據此推定已取得法人登記、公益認證或法律上的特別資格。",
    contact: "洽詢團體治理事項",
  },
  ko: {
    back: "RBA 소개로 돌아가기",
    kicker: "ORGANISATION / GOVERNANCE",
    title: "단체 개요 및 운영 원칙",
    intro: "유소년 농구 육성을 위한 운영 재원과 현행 규약 및 미시행 개정안의 차이를 안내합니다.",
    role: "Riot Basketball Academy(RBA) · 일본 센다이 거점",
    current: "현행 단체 규약",
    currentDate: "2026년 7월 7일 시행",
    currentBody: "RBA의 일본어 현행 규약은 유소년의 건전한 성장, 지도자·보호자 교육, 국내외 교류를 목적으로 합니다. 참가비, 회비, 기부금, 후원금과 사업 수입을 허용하되 잉여금을 구성원에게 분배하지 않으며, 적정 운영비를 지출한 후 남은 자금은 단체 목적에 사용합니다.",
    proposed: "검토 중인 운영 규약 개정안",
    proposedStatus: "초안 · 미시행",
    proposedBody: "별도의 29개 조항 초안에는 회원 자격, 의사 결정, 이해충돌, 적정 보수, 회계 관리, 아동 보호 및 해산 시 재산 처분에 관한 내용이 담겨 있습니다. 아직 정식 개정·시행되지 않았습니다.",
    legal: "비영리 목적과 법인격은 별개입니다",
    legalBody: "참가비를 받는다는 사실만으로 영리 목적이 되는 것은 아닙니다. 그러나 비영리 목적의 자체 선언만으로 비영리 법인 자격, 세제 혜택 또는 공공 체육시설 이용 허가가 주어지는 것은 아니며, 각 활동의 실제 조건에 따라 별도로 확인해야 합니다.",
    original: "일본어 현행 규약 및 개정안 전문 보기",
    note: "이 페이지는 이해를 돕기 위한 번역 요약입니다. 현행 규약과 초안은 일본어 원문을 기준으로 확인해야 하며, 이 설명은 법인 등기·공익 인증·법률 자문을 의미하지 않습니다.",
    contact: "운영 규정 문의",
  },
} as const;

export function GovernanceLocalizedSummary({locale}:{locale:TranslationLocale}) {
  const c=copy[locale];
  const home=locale==="en"?"/about":"/"+locale+"/about";
  return <SiteFrame locale={locale} languagePage="about/governance">
    <div className={styles.page}>
      <header className={styles.hero}>
        <a href={home} className={styles.back}>{c.back} ←</a>
        <p className={styles.kicker}>{c.kicker}</p>
        <h1>{c.title}</h1>
        <p className={styles.intro}>{c.intro}</p>
        <p className={styles.role}>{c.role}</p>
      </header>
      <div className={styles.main}>
        <article className={styles.section}>
          <p className={styles.index}>01 / EFFECTIVE RULES</p>
          <h2>{c.current}</h2>
          <p className={styles.status}>{c.currentDate}</p>
          <p>{c.currentBody}</p>
        </article>
        <article className={styles.section}>
          <p className={styles.index}>02 / UNADOPTED PROPOSAL</p>
          <h2>{c.proposed}</h2>
          <p className={styles.status}>{c.proposedStatus}</p>
          <p>{c.proposedBody}</p>
        </article>
        <article className={styles.section}>
          <p className={styles.index}>03 / LEGAL CLARITY</p>
          <h2>{c.legal}</h2>
          <p>{c.legalBody}</p>
        </article>
        <div className={styles.actions}>
          <a href="/ja/about/governance" lang="ja">{c.original} →</a>
          <a href="mailto:riot.training.base@gmail.com?subject=RBA%20Governance">{c.contact} ↗</a>
        </div>
        <p className={styles.note}>{c.note}</p>
      </div>
    </div>
  </SiteFrame>;
}
