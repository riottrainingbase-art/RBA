import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "@/app/ja/okinawa/page.module.css";

type OkinawaLocale = "en" | "zh-tw" | "ko";

const email = "riot.training.base@gmail.com";
const coachForm = "https://form.jotform.com/262765305419057";

const translations = {
  en: {
    eyebrow: "RIOT BASKETBALL ACADEMY / GREAM OKINAWA",
    heroTitle: "A place to play.",
    heroAccent: "A place to keep learning.",
    lead: "Youth basketball development in Okinawa, built around learning, care and community. RBA is reviewing the coaching, venue and safeguarding arrangements for future regular activities.",
    heroNote: "Individual notices for existing members are separate from plans for future regular activities.",
    familyAction: "Already participating?",
    futureAction: "Interested in joining?",
    supportAction: "Coaching & local support",
    statusLabel: "START HERE",
    statusTitle: "Choose the information you need.",
    statusIntro: "We separate confirmed activities from plans still being prepared.",
    memberCard: ["Current members & families", "Use your existing contact route", "Updates to activities you already attend are communicated to the relevant families through their established channels. For membership or payment questions, contact RBA directly.", "Membership guidance"],
    futureCard: ["Future regular sessions", "Preparing, not yet open", "Venues, coaches, safety arrangements, dates, age groups and fees must be confirmed before a new programme is announced. An enquiry does not constitute an enrolment.", "Ask about future participation"],
    eventCard: ["Clinics & international camps", "See each event's details", "One-off clinics and camps have their own eligibility, price and registration terms. Please check the event page rather than assuming the regular programme's details apply.", "Explore events"],
    familyEyebrow: "CURRENT MEMBERS / FAMILIES",
    familyTitle: "Clear information for families already involved.",
    familyText: "Please continue using your established channel for training, game-day and urgent local updates. RBA can review individual questions on membership, fees, payments or the service provided. Include the activity name and relevant date in your message.",
    familyPanelTitle: "Contact the RBA office",
    familyPanelText: "We will check the relevant programme terms and available records before answering an individual question. Please do not email sensitive medical details, identification documents or card information in your first message.",
    familyEmailSubject: "GREAM OKINAWA | Existing member or parent enquiry",
    familyEmailAction: "Email RBA about membership",
    emergency: "For injuries or urgent safety issues, contact the on-site responsible adult and emergency services as needed. Do not wait for an email reply.",
    futureLabel: "FUTURE PROGRAMME",
    futureTitle: "Regular activities begin only when the essentials are in place.",
    futureText: "We will not announce a confirmed session, place or coach before verifying the arrangements.",
    steps: [
      ["01", "Coaching & safeguarding", "Confirm roles, relevant experience or qualifications, safety leads and emergency response."],
      ["02", "Venue & timetable", "Verify permission to use the facility, dates, access and cancellation terms."],
      ["03", "Fees & participation", "Explain age groups, pricing, joining requirements and the relevant policies."],
      ["04", "Formal announcement", "Open registration only for activities whose arrangements are confirmed."]
    ],
    futureCta: "Ask about future participation (free enquiry)",
    futureEmailSubject: "GREAM OKINAWA | Future participation enquiry",
    futureNote: "An enquiry is not a booking, a free trial confirmation, an obligation to pay or a guarantee that a new programme will open. Existing activities are not automatically cancelled by this notice.",
    eventsLabel: "SEPARATE EVENTS",
    eventsTitle: "Clinics and international camps.",
    clinicTitle: "Okinawa basketball clinic",
    clinicBody: "A separate November 2026 event. Confirm date, age requirements, price and venue notice on its own page (Japanese-language details).",
    campTitle: "Okinawa international youth camp",
    campBody: "December 22–24, 2026 is planned. Accommodation, participation and fees are governed by the camp's event information (Japanese-language details).",
    details: "View event details",
    joinLabel: "COACH / VENUE / COMMUNITY",
    joinTitle: "Help build a lasting local opportunity.",
    joinText: "We welcome enquiries from adults interested in coaching, conditioning support, suitable gym facilities or regional partnerships.",
    roles: [
      ["Coaching & assistants", "Age-appropriate youth coaching, assistance and mentoring. Roles and regular dates are subject to review.", "View the coaching information (Japanese)", "/ja/okinawa-coach"],
      ["S&C and wellbeing", "Conditioning, age-appropriate training and safety support, within each person's qualifications and agreed responsibilities.", "Ask RBA about a role", ""],
      ["Venues & community partners", "Facilities and organisations in or near Itoman, Tomigusuku and Yaese. We check use permissions, cost and scheduling before making commitments.", "Email a venue or partnership enquiry", ""]
    ],
    coachesEmailSubject: "GREAM OKINAWA | Coaching or S&C collaboration",
    venueEmailSubject: "GREAM OKINAWA | Venue or community partnership",
    roleNote: "The enquiry and application process does not constitute employment, a contract, a confirmed venue booking or programme admission. Any paid role requires prior agreement about duties, compensation, payment date, expenses and safety responsibilities.",
    faqLabel: "QUESTIONS",
    faqTitle: "Before you get in touch.",
    faq: [
      ["Are regular sessions currently open for new registration?", "No newly planned regular session is confirmed on this page. Please enquire first; any formal recruitment will state the verified dates, location, responsible staff and terms."],
      ["Does this page mean my existing session is cancelled?", "No. Existing members should rely on communications specifically addressed to their activity. If you cannot verify a change, contact the established local route or the RBA office."],
      ["Can I enquire about a refund or a change of schedule?", "Yes. We review individual cases against the applicable registration conditions, actual services and payment records. This page does not promise a blanket refund or automatic transfer."],
      ["Can an English-speaking coach or parent get in touch?", "Yes. You can email RBA in English. The current coach interest form is in Japanese; if it is difficult to use, contact us by email instead."]
    ],
    footerTitle: "Build the opportunity carefully. Keep it open to more children.",
    footerText: "For existing members, prospective families, coaches and local partners, the first step is a clear conversation.",
    policy: "Participation, safety and privacy policies",
    backJapanese: "日本語ページへ",
  },
  "zh-tw": {
    eyebrow: "RIOT BASKETBALL ACADEMY / GREAM OKINAWA",
    heroTitle: "讓沖繩的孩子，",
    heroAccent: "持續在球場上學習。",
    lead: "我們希望打造重視學習、安全與社區連結的青少年籃球環境。目前，RBA 正在確認未來常態活動的教練、場地及兒少安全管理安排。",
    heroNote: "現有會員的個別活動通知，與未來常態課程的籌備資訊分開處理。",
    familyAction: "現有會員與家長",
    futureAction: "未來想參加",
    supportAction: "教練及在地合作",
    statusLabel: "從這裡開始",
    statusTitle: "依照您的需求查看資訊。",
    statusIntro: "已確認的活動與籌備中的計畫會清楚區分。",
    memberCard: ["現有會員與家長", "請使用既有聯絡管道", "已參與的訓練、比賽與重要變更，會透過原本的聯絡管道通知相關家庭。如需詢問會費或會員事項，可直接聯絡 RBA。", "會員及活動聯絡"],
    futureCard: ["未來常態訓練", "條件確認中，尚未正式開放", "教練、場地、安全措施、日期、年齡及費用須確認後才會正式公告。提出詢問不代表報名或入會完成。", "洽詢未來參與方式"],
    eventCard: ["單次講習與國際營隊", "請查看各活動頁面", "講習和營隊的日期、對象、費用及報名條件各自獨立，請以各活動官方資訊為準。", "查看活動"],
    familyEyebrow: "現有會員與家長",
    familyTitle: "讓正在參與的家庭安心掌握資訊。",
    familyText: "訓練、比賽當日與緊急事項，請優先使用先前提供的聯絡管道。會員、會費、付款及實際活動內容等個別問題，可透過電子郵件向 RBA 詢問，請註明活動名稱與日期。",
    familyPanelTitle: "聯絡 RBA 本部",
    familyPanelText: "我們會根據適用的報名條件和現有紀錄確認。首次來信不必附上兒童病歷、身分證件或信用卡資料。",
    familyEmailSubject: "GREAM OKINAWA | 現有會員與家長諮詢",
    familyEmailAction: "以電子郵件洽詢會員事項",
    emergency: "如遇傷害或其他緊急安全狀況，請先聯絡現場負責人，必要時立即聯絡緊急救護單位，不要等待電子郵件回覆。",
    futureLabel: "未來常態活動",
    futureTitle: "條件確認完成後，再正式開放報名。",
    futureText: "我們不會在場地或指導人員尚未確認時，提前承諾訓練日期或參加名額。",
    steps: [
      ["01", "教練與安全管理", "確認指導職責、相關經驗與資格、安全負責人及緊急應變方式。"],
      ["02", "場地與時間", "確認場地使用許可、日期、進出規則與取消條件。"],
      ["03", "費用及參與條件", "說明年齡、費用、申請方式與適用規章。"],
      ["04", "正式公告", "僅在所有必要條件確認後，開放該活動報名。"]
    ],
    futureCta: "洽詢未來參與方式（免費諮詢）",
    futureEmailSubject: "GREAM OKINAWA | 未來參與諮詢",
    futureNote: "提出詢問不代表預約、免費體驗確定、付款義務或活動保證。此公告也不代表既有活動全部取消。",
    eventsLabel: "獨立活動",
    eventsTitle: "講習與國際青少年營隊。",
    clinicTitle: "沖繩籃球實技講習",
    clinicBody: "預定於 2026 年 11 月舉辦的獨立活動。日期、年齡、費用及場地通知方式請查看日文活動頁。",
    campTitle: "沖繩國際青少年籃球營",
    campBody: "預定於 2026 年 12 月 22–24 日舉辦。住宿、參與方式及費用以營隊活動頁為準（日文）。",
    details: "查看活動詳情（日文）",
    joinLabel: "教練／場地／社區",
    joinTitle: "一起打造能持續發展的在地機會。",
    joinText: "歡迎對教練、體能指導、安全協助、體育館及在地合作有興趣的成年人與我們聯絡。",
    roles: [
      ["籃球教練與助教", "協助青少年籃球教學、練習和成長。實際職務與日期仍需確認。", "教練相關說明（日文）", "/ja/okinawa-coach"],
      ["體能訓練及安全協助", "依個人資格與約定職責，提供符合年齡的體能與安全輔助。", "電子郵件洽詢", ""],
      ["場地與社區夥伴", "希望與糸滿、豐見城、八重瀨等地的場地及團體合作；使用許可和費用確認前不保證舉辦。", "洽詢場地／合作", ""]
    ],
    coachesEmailSubject: "GREAM OKINAWA | 教練及體能訓練合作",
    venueEmailSubject: "GREAM OKINAWA | 場地及社區合作",
    roleNote: "諮詢或填寫意願表不等同錄用、締約、完成場地預約或確定參加。若有有償工作，須事先確認工作內容、報酬、付款日期、費用及安全責任。",
    faqLabel: "常見問題",
    faqTitle: "聯絡之前先了解。",
    faq: [
      ["新常態課程已開放報名嗎？", "本頁沒有公告已確認的全新常態課程。請先洽詢；正式招募時將提供日期、場地、負責人及費用條件。"],
      ["這表示我目前參加的課程取消了嗎？", "不是。請以您參加的活動收到的個別通知為準。如無法確認，請詢問原有聯絡管道或 RBA 本部。"],
      ["可以詢問退費或改期嗎？", "可以。我們將根據適用規章、實際提供的活動與付款紀錄個別確認，並未在本頁承諾一律退款或自動轉換。"],
      ["能用中文或英文諮詢嗎？", "可以，歡迎以中文或英文來信。現有的教練意願表為日文，如不方便使用，也可以直接寄信。"]
    ],
    footerTitle: "先把基礎做好，再為孩子拓展更多機會。",
    footerText: "不論是現有家長、未來參加者、教練或在地夥伴，都歡迎先與我們討論。",
    policy: "參與、安全及隱私政策",
    backJapanese: "日本語ページへ",
  },
  ko: {
    eyebrow: "RIOT BASKETBALL ACADEMY / GREAM OKINAWA",
    heroTitle: "오키나와에,",
    heroAccent: "배움이 이어지는 코트를.",
    lead: "RBA는 배움과 안전, 지역사회와의 연결을 중심으로 청소년 농구 환경을 만들고자 합니다. 현재 향후 정기 활동을 위한 지도자·체육관·안전관리 체계를 확인하고 있습니다.",
    heroNote: "현재 회원에게 보내는 개별 활동 안내와 새 정기 프로그램의 준비 정보는 구분하여 제공합니다.",
    familyAction: "기존 회원 및 보호자",
    futureAction: "향후 참가 문의",
    supportAction: "코치·지역 협력",
    statusLabel: "안내",
    statusTitle: "필요한 정보부터 확인하세요.",
    statusIntro: "확정된 활동과 준비 중인 계획을 명확히 구분합니다.",
    memberCard: ["기존 회원·보호자", "기존 안내 채널 이용", "이미 참가하고 있는 훈련이나 경기의 일정과 변경 사항은 기존 공식 연락 경로를 통해 해당 가정에 안내합니다. 회비와 회원 관련 문의는 RBA에 직접 연락해 주세요.", "회원 안내"],
    futureCard: ["새 정기 활동", "조건 확인 중 · 등록 미개시", "코치, 체육관, 안전관리, 대상 연령, 일정, 비용을 확인한 뒤 공식적으로 안내합니다. 문의만으로 등록이나 참가가 확정되지 않습니다.", "참가 상담"],
    eventCard: ["클리닉·국제 캠프", "각 행사 안내 확인", "일회성 클리닉과 캠프는 참가 조건, 가격, 장소와 등록 방법이 각각 다릅니다. 반드시 해당 행사 안내를 확인해 주세요.", "행사 살펴보기"],
    familyEyebrow: "기존 회원 / 보호자",
    familyTitle: "현재 활동에 참여하는 가정을 위한 안내.",
    familyText: "훈련, 경기 당일 연락과 긴급 상황은 기존에 안내된 연락 경로를 우선 이용해 주세요. 회비, 결제, 회원 및 실제 활동 관련 문의는 활동 이름과 날짜를 적어 RBA로 연락할 수 있습니다.",
    familyPanelTitle: "RBA 본부에 문의하기",
    familyPanelText: "해당 참가 조건과 확인 가능한 기록을 검토한 후 개별적으로 안내합니다. 첫 문의에 아동의 의료정보, 신분증 또는 카드 정보를 첨부할 필요는 없습니다.",
    familyEmailSubject: "GREAM OKINAWA | 기존 회원 및 보호자 문의",
    familyEmailAction: "회원 관련 이메일 보내기",
    emergency: "부상이나 긴급한 안전 문제가 발생하면 현장 책임자와 보호자에게 즉시 연락하고, 필요시 응급서비스를 이용하세요. 이메일 회신을 기다리지 마세요.",
    futureLabel: "향후 정기 프로그램",
    futureTitle: "안전한 운영 조건을 확인한 뒤 시작합니다.",
    futureText: "지도자와 체육관이 확정되지 않은 상태에서 활동 날짜나 참가를 약속하지 않습니다.",
    steps: [
      ["01", "지도자·안전관리", "지도 역할, 관련 경력·자격, 안전 책임자와 응급대응을 확인합니다."],
      ["02", "체육관·일정", "시설 사용 허가, 시간, 출입 및 취소 조건을 확인합니다."],
      ["03", "비용·참가 조건", "대상 연령, 회비, 등록 절차와 적용되는 규정을 안내합니다."],
      ["04", "공식 모집", "준비 조건이 확인된 활동에 한해 모집과 체험 정보를 공개합니다."]
    ],
    futureCta: "향후 참가 문의하기(문의 무료)",
    futureEmailSubject: "GREAM OKINAWA | 향후 참가 상담",
    futureNote: "문의는 예약, 무료 체험 확정, 결제 의무 또는 새 프로그램 개설 보장을 의미하지 않습니다. 기존 활동이 일괄 취소된다는 뜻도 아닙니다.",
    eventsLabel: "별도 행사",
    eventsTitle: "클리닉과 국제 유소년 캠프.",
    clinicTitle: "오키나와 농구 클리닉",
    clinicBody: "2026년 11월 예정인 별도 행사입니다. 날짜, 연령, 참가비 및 장소 안내는 일본어 행사 페이지를 확인해 주세요.",
    campTitle: "오키나와 국제 유소년 캠프",
    campBody: "2026년 12월 22~24일 예정입니다. 숙박, 참가 방식, 비용은 일본어 캠프 안내를 기준으로 확인해 주세요.",
    details: "행사 상세보기(일본어)",
    joinLabel: "코치 / 체육관 / 지역 협력",
    joinTitle: "지역에서 이어지는 배움의 기회를 함께.",
    joinText: "청소년 지도, 체력훈련, 안전지원, 체육관과 지역 협력에 관심 있는 성인의 문의를 환영합니다.",
    roles: [
      ["코치·지도 보조", "청소년 농구 지도와 보조 업무. 실제 역할과 정기 일정은 협의 후 확정합니다.", "코치 모집 안내(일본어)", "/ja/okinawa-coach"],
      ["체력훈련·안전지원", "본인의 자격과 합의한 범위에서 연령에 맞는 훈련과 안전관리 보조를 담당합니다.", "이메일로 협력 문의", ""],
      ["체육관·지역 파트너", "이토만·도미구스쿠·야에세 주변의 체육관이나 기관과 협력을 모색합니다. 이용 허가와 비용이 확인되기 전 개최를 확약하지 않습니다.", "시설·협력 문의", ""]
    ],
    coachesEmailSubject: "GREAM OKINAWA | 코치 및 체력훈련 협력",
    venueEmailSubject: "GREAM OKINAWA | 체육관 및 지역 협력",
    roleNote: "문의나 신청서 제출만으로 고용, 계약, 시설 예약 또는 활동 참가가 확정되지 않습니다. 유급 업무는 사전에 역할, 보수, 지급일, 경비와 안전 책임을 합의합니다.",
    faqLabel: "자주 묻는 질문",
    faqTitle: "문의 전에 확인해 주세요.",
    faq: [
      ["새 정기 프로그램에 바로 등록할 수 있나요?", "이 페이지에서는 새 정기 프로그램의 등록이 확정되지 않았습니다. 공식 모집 시 일정, 장소, 지도 책임자, 비용 등을 명시합니다."],
      ["현재 참여하는 활동이 취소되었다는 뜻인가요?", "아닙니다. 현재 활동에 관한 결정은 해당 가정에 발송되는 개별 안내를 확인해 주세요. 불명확하면 기존 연락 경로나 RBA 본부에 문의해 주세요."],
      ["환불이나 일정 변경을 문의할 수 있나요?", "가능합니다. 실제 제공된 활동, 가입 조건과 결제 기록을 바탕으로 개별 확인합니다. 일괄 환불이나 자동 이전을 보장하지 않습니다."],
      ["한국어로 연락해도 되나요?", "네, 한국어 또는 영어로 이메일을 보내실 수 있습니다. 기존 코치 관심 신청서는 일본어로 제공되며, 이용이 어려우면 이메일로 문의해 주세요."]
    ],
    footerTitle: "안전한 토대 위에, 더 많은 기회를.",
    footerText: "기존 회원, 참가 희망 가정, 코치와 지역 협력자 모두 문의할 수 있습니다.",
    policy: "참가 규정·안전·개인정보 안내",
    backJapanese: "日本語ページへ",
  },
} as const;

function inquiry(subject: string) {
  return "mailto:" + email + "?subject=" + encodeURIComponent(subject);
}

export function OkinawaLocalizedInfo({ locale }: { locale: OkinawaLocale }) {
  const t = translations[locale];
  const cards = [t.memberCard, t.futureCard, t.eventCard] as const;
  const ids = ["members", "future", "events"] as const;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Riot Basketball Academy", item: "https://riotbasketballacademy.com/" },
      { "@type": "ListItem", position: 2, name: "GREAM OKINAWA", item: "https://riotbasketballacademy.com/" + (locale === "en" ? "okinawa" : locale + "/okinawa") },
    ],
  };

  return (
    <SiteFrame locale={locale} languagePage="okinawa">
      <GrowthClickTracking />
      <main className={styles.page} id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        <section className={styles.hero}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t.eyebrow}</p>
            <h1>{t.heroTitle}<br /><span>{t.heroAccent}</span></h1>
            <p className={styles.heroLead}>{t.lead}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primary} href="#members" data-growth-id={"okinawa-" + locale + "-member"}>{t.familyAction} <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondary} href="#future" data-growth-id={"okinawa-" + locale + "-future"}>{t.futureAction} <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondary} href="#join" data-growth-id={"okinawa-" + locale + "-support"}>{t.supportAction} <span aria-hidden="true">→</span></Link>
            </div>
            <p className={styles.heroFoot}>{t.heroNote}</p>
            <p className={styles.heroFoot}><Link href="/ja/okinawa" hrefLang="ja">{t.backJapanese}</Link></p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t.statusLabel}</p>
            <div className={styles.heading}><h2>{t.statusTitle}</h2><p>{t.statusIntro}</p></div>
            <div className={styles.statusGrid}>
              {cards.map((item, i) => (
                <article className={styles.statusCard} key={ids[i]}>
                  <p className={styles.mini}>{item[0]}</p>
                  <h3>{item[0]}</h3>
                  <p className={styles.state}>{item[1]}</p>
                  <p>{item[2]}</p>
                  <Link href={"#" + ids[i]} className={styles.textLink}>{item[3]} <span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="members" className={styles.darkSection}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t.familyEyebrow}</p>
            <div className={styles.split}>
              <div><h2>{t.familyTitle}</h2><p>{t.familyText}</p></div>
              <div className={styles.darkPanel}>
                <h3>{t.familyPanelTitle}</h3>
                <p>{t.familyPanelText}</p>
                <a href={inquiry(t.familyEmailSubject)} className={styles.lightButton} data-growth-id={"okinawa-" + locale + "-member-email"}>{t.familyEmailAction} <span aria-hidden="true">→</span></a>
                <p className={styles.email}>{email}</p>
              </div>
            </div>
            <p className={styles.emergency}>{t.emergency}</p>
          </div>
        </section>

        <section id="future" className={styles.softSection}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t.futureLabel}</p>
            <div className={styles.heading}><h2>{t.futureTitle}</h2><p>{t.futureText}</p></div>
            <ol className={styles.stepGrid}>
              {t.steps.map(([number, title, body]) => (
                <li key={number} className={styles.step}><span>{number}</span><h3>{title}</h3><p>{body}</p></li>
              ))}
            </ol>
            <div className={styles.futureActions}>
              <a className={styles.darkButton} href={inquiry(t.futureEmailSubject)} data-growth-id={"okinawa-" + locale + "-future-email"}>{t.futureCta} <span aria-hidden="true">→</span></a>
            </div>
            <p className={styles.disclaimer}>{t.futureNote}</p>
          </div>
        </section>

        <section id="events" className={styles.section}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t.eventsLabel}</p>
            <div className={styles.heading}><h2>{t.eventsTitle}</h2></div>
            <div className={styles.eventGrid}>
              <article><p className={styles.mini}>NOVEMBER 2026</p><h3>{t.clinicTitle}</h3><p>{t.clinicBody}</p><Link href="/ja/events/okinawa-clinic-2026-11-14" className={styles.textLink} hrefLang="ja">{t.details} <span aria-hidden="true">→</span></Link></article>
              <article><p className={styles.mini}>DECEMBER 2026</p><h3>{t.campTitle}</h3><p>{t.campBody}</p><Link href="/ja/events/okinawa-international-camp-2026" className={styles.textLink} hrefLang="ja">{t.details} <span aria-hidden="true">→</span></Link></article>
            </div>
          </div>
        </section>

        <section id="join" className={styles.joinSection}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t.joinLabel}</p>
            <div className={styles.heading}><h2>{t.joinTitle}</h2><p>{t.joinText}</p></div>
            <div className={styles.joinGrid}>
              {t.roles.map(([title, body, action, link], i) => (
                <article key={title}>
                  <p className={styles.mini}>{"0" + (i + 1)}</p>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  {link ? <Link className={styles.textLink} href={link} hrefLang="ja">{action} <span aria-hidden="true">→</span></Link> : (
                    <a href={inquiry(i === 1 ? t.coachesEmailSubject : t.venueEmailSubject)} className={styles.textLink} data-growth-id={"okinawa-" + locale + (i === 1 ? "-coach-email" : "-venue-email")}>{action} <span aria-hidden="true">→</span></a>
                  )}
                </article>
              ))}
            </div>
            <p className={styles.disclaimer}>{t.roleNote} <a href={coachForm} target="_blank" rel="noopener noreferrer" hrefLang="ja">{locale === "en" ? "Coach interest form (Japanese)" : locale === "ko" ? "코치 관심 신청서(일본어)" : "教練意願表（日文）"} ↗</a></p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t.faqLabel}</p>
            <div className={styles.heading}><h2>{t.faqTitle}</h2></div>
            <div className={styles.faqGrid}>
              {t.faq.map(([question, answer]) => <article className={styles.faqItem} key={question}><h3>{question}</h3><p>{answer}</p></article>)}
            </div>
          </div>
        </section>

        <section className={styles.footerCta}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>RBA OKINAWA</p>
            <h2>{t.footerTitle}</h2>
            <p>{t.footerText}</p>
            <div className={styles.heroActions}>
              <a href={inquiry(t.futureEmailSubject)} className={styles.primary} data-growth-id={"okinawa-" + locale + "-footer-email"}>{t.futureCta} <span aria-hidden="true">→</span></a>
              <Link href={locale === "en" ? "/policies" : "/" + locale + "/policies"} className={styles.secondary}>{t.policy} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
