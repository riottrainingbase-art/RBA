import type { Locale } from "./site-frame";
import { SiteFrame } from "./site-frame";
import { ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react";
import styles from "./japan-court-exchange.module.css";

const ENQUIRY_FORM = "https://form.jotform.com/263084520901047";

const languagePaths: Record<Locale, string> = {
  en: "/international/japan-court-exchange",
  ja: "/ja/international/japan-court-exchange",
  "zh-tw": "/zh-tw/international/japan-court-exchange",
  ko: "/ko/international/japan-court-exchange",
};

type Copy = {
  label: string;
  title: string;
  subtitle: string;
  intro: string;
  enquiry: string;
  browse: string;
  scopeHeading: string;
  scopeText: string;
  included: string[];
  excludedHeading: string;
  excluded: string[];
  pricesHeading: string;
  pricesText: string;
  tiers: { name: string; duration: string; detail: string }[];
  pricingNote: string;
  modelHeading: string;
  modelText: string;
  modelItems: string[];
  modelNote: string;
  processHeading: string;
  steps: { name: string; detail: string }[];
  termsHeading: string;
  termsText: string;
  finalHeading: string;
  finalText: string;
  facts: string[];
  noPayment: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    label: "RBA INTERNATIONAL / SPORTS SERVICES",
    title: "JAPAN COURT EXCHANGE",
    subtitle: "Basketball development in Japan, designed for visiting clubs.",
    intro: "A structured, on-court learning programme for overseas youth teams. RBA designs the basketball activities, coordinates appropriate local sporting partners and works with your coaches on clear development goals. Travel is arranged separately.",
    enquiry: "Request a club proposal",
    browse: "Back to RBA International",
    scopeHeading: "What RBA delivers",
    scopeText: "The quoted service is a basketball programme, not a package holiday.",
    included: [
      "Pre-programme call with an authorised adult club representative",
      "A written basketball learning plan adapted to age, level and team objectives",
      "RBA-led on-court instruction and practice/game-based learning",
      "Sport-specific coordination with potential local clubs and facilities",
      "Coach briefing, safeguarding coordination and post-programme feedback",
    ],
    excludedHeading: "Arranged and charged separately",
    excluded: ["Flights, trains, accommodation and all ground transport", "Meals, sightseeing, travel insurance, visas and personal expenses", "External venue, referee and interpreter charges unless explicitly agreed"],
    pricesHeading: "Reference club prices",
    pricesText: "The following are indicative RBA sports-service fees for a group of up to 10 players. Each programme is scoped and quoted in writing before a contract is offered.",
    tiers: [
      { name: "ONE DAY EXCHANGE", duration: "1 on-court programme day", detail: "One focused development session and local sporting coordination." },
      { name: "CLUB EXCHANGE", duration: "2 on-court programme days", detail: "Two development activities, sporting partner coordination and coach feedback." },
      { name: "EXTENDED EXCHANGE", duration: "3 on-court programme days", detail: "Three development activities, extended review and tailored coach discussion." },
    ],
    pricingNote: "JPY indicative prices. Exact session length, number of coaches, venue charges, interpretation, tax treatment and any additional players are confirmed in the formal quote. An enquiry does not reserve a court or an opponent.",
    modelHeading: "Example programme, not a completed case study",
    modelText: "A possible two-region plan might combine a small-sided/game-based exchange with local Japanese U12 players in the Kanto region and an RBA development camp in Tohoku. This is a planning illustration only.",
    modelItems: ["Explore spacing, defender reads and choices under game pressure", "Connect players and coaches through age-appropriate friendly play", "Review the learning with the visiting club's coaches"],
    modelNote: "No opposing team, fixture, venue or international-match approval is guaranteed until confirmed in writing. The model does not represent a delivered client project.",
    processHeading: "From enquiry to confirmation",
    steps: [
      { name: "Tell us about your club", detail: "Your adult team coordinator shares age group, approximate group size, objectives, dates and budget." },
      { name: "Feasibility and written quotation", detail: "RBA checks sporting partners, coaching capacity, venue permissions, safety and any required federation approval." },
      { name: "Sign and pay securely", detail: "Only after written terms and service conditions are agreed: 50% advance payment through the official RBA Stripe account, then the balance before the programme." },
      { name: "Deliver and review", detail: "Deliver the agreed sport activities and provide follow-up notes to the adult team contact." },
    ],
    termsHeading: "Safeguarding and payment conditions",
    termsText: "Fees are charged solely for RBA sports services. The initial payment is part of—not in addition to—the agreed total. Final due dates, cancellation rules, changes and refunds are documented in the signed agreement. If RBA cannot provide the contracted core service, the agreement provides for an appropriate refund. Any regulated travel services are contracted and paid to qualified providers separately. International games remain subject to applicable permissions and safety rules.",
    finalHeading: "Tell us what your team wants to learn.",
    finalText: "Initial enquiries are free. We only need an authorised adult club contact and general team details at this stage—no child or parent lists.",
    facts: ["Independent RBA programme", "No guaranteed match or venue", "No bundled travel payment"],
    noPayment: "No payment is taken on this page. A private Stripe payment request is issued only after the contract and conditions have been agreed.",
  },
  ja: {
    label: "RBA 国際事業 / スポーツ指導サービス",
    title: "JAPAN COURT EXCHANGE",
    subtitle: "海外クラブのための、日本でのバスケットボール育成交流。",
    intro: "海外の育成年代クラブを対象に、RBAが指導内容と日本側のスポーツ交流を設計します。目的、対象年代、競技レベルに合わせて現場で学ぶプログラムです。旅行の手配・販売とは分けて提供します。",
    enquiry: "クラブ向け個別提案を依頼",
    browse: "国際交流の案内に戻る",
    scopeHeading: "RBAが提供するサービス",
    scopeText: "販売対象はバスケットボールの指導・交流運営です。旅行商品ではありません。",
    included: ["成人のクラブ代表者との事前面談", "年代・レベル・目的に応じた書面の育成プログラム", "RBAによるオンコート指導とゲームを通じた学習", "日本側のクラブ・会場とのスポーツ活動に関する調整", "指導者向けの説明、安全面の役割整理、終了後の振り返り"],
    excludedHeading: "別契約・別料金となるもの",
    excluded: ["航空券、鉄道、宿泊、貸切車などの移動・旅行", "食事、観光、旅行保険、査証、個人費用", "別途合意のない外部会場費、審判、専門通訳"],
    pricesHeading: "クラブ向け参考価格",
    pricesText: "最大10選手のチームを想定したRBAのスポーツサービス参考価格です。実施内容を確認し、正式な見積・契約書で確定します。",
    tiers: [
      { name: "ONE DAY EXCHANGE", duration: "指導・交流活動1日", detail: "育成セッションと日本側スポーツ活動の調整。" },
      { name: "CLUB EXCHANGE", duration: "指導・交流活動2日", detail: "2つの育成交流活動、国内の調整、指導者向け振り返り。" },
      { name: "EXTENDED EXCHANGE", duration: "指導・交流活動3日", detail: "3つの育成交流活動と、発展的な指導者フィードバック。" },
    ],
    pricingNote: "表示金額は日本円の参考価格です。指導時間、人数、講師体制、施設費、通訳、税区分等は個別見積時に確認します。問い合わせだけでは会場・対戦相手は確保されません。",
    modelHeading: "受入プログラムの構成例（未実施モデル）",
    modelText: "例えば、関東で日本のU12選手とのゲーム形式の交流と、東北でのRBA育成キャンプを組み合わせる計画が考えられます。これは企画例であり、実施済みの事例ではありません。",
    modelItems: ["守備の読み、スペーシング、意思決定をゲームで学ぶ", "同年代の日本の選手との目的を持った交流", "帯同指導者と学びを言語化し、普段の活動へ持ち帰る"],
    modelNote: "対戦、体育館、日程、必要な国際試合承認は正式確定まで保証しません。",
    processHeading: "相談から実施まで",
    steps: [
      { name: "クラブの希望を確認", detail: "成人責任者から、年代・おおよその人数・希望時期・育成目的・予算を共有いただきます。" },
      { name: "条件確認と書面見積", detail: "指導体制、相手チーム、会場利用、安全管理、必要な協会承認等を確認します。" },
      { name: "契約・前金決済", detail: "正式条件に合意後、RBA公式Stripeで契約総額の50%を前払い。残額も実施前に精算します。" },
      { name: "活動と振り返り", detail: "契約したスポーツ指導を実施し、成人の担当者へ振り返りを共有します。" },
    ],
    termsHeading: "安全・支払・取消条件",
    termsText: "RBAが請求するのはスポーツ事業費のみです。前金は契約総額に充当され、追加料金にはなりません。支払期限、変更・取消、返金の条件は契約書に記載します。RBAが契約した中核サービスを提供できない場合は、契約内容に応じて適切に返金します。旅行関連サービスは、必要な資格を持つ事業者等と別契約・別決済とします。国際交流試合は必要な許認可と安全上の条件を満たす場合に限ります。",
    finalHeading: "チームに必要な学びからご相談ください。",
    finalText: "初回相談は無料です。最初に必要なのは成人の団体責任者とチーム概要だけで、子どもや保護者の名簿は求めません。",
    facts: ["RBA独立主催", "対戦・会場の確約なし", "旅行代金を含まない"],
    noPayment: "このページでは決済を受け付けません。正式契約・条件の確認後に専用Stripe請求をお送りします。",
  },
  "zh-tw": {
    label: "RBA 國際籃球服務 / 日本",
    title: "JAPAN COURT EXCHANGE",
    subtitle: "為海外青少年球隊設計的日本籃球培育交流。",
    intro: "RBA依據球隊年齡、程度及發展目標，設計日本現場籃球教學與體育交流。旅行、住宿及交通由適格服務業者另行處理。",
    enquiry: "索取球隊個別企劃",
    browse: "返回國際交流",
    scopeHeading: "RBA提供的服務",
    scopeText: "本商品是籃球教學與體育活動協調服務，而不是套裝旅遊。",
    included: ["與成年授權球隊窗口進行需求確認", "依年齡與程度訂製書面訓練方案", "RBA現場籃球指導與實戰決策學習", "與日本當地球隊及場館進行體育活動協調", "教練說明、兒少安全責任確認及事後回饋"],
    excludedHeading: "另行報價與簽約",
    excluded: ["機票、鐵路、住宿及地面交通", "餐食、觀光、旅遊保險、簽證及個人支出", "未經另行約定的外部場地費、裁判與翻譯"],
    pricesHeading: "球隊服務參考價格",
    pricesText: "以下是以最多10名球員為前提的RBA體育服務參考價格；最終範圍與費用須書面確認。",
    tiers: [
      { name: "ONE DAY EXCHANGE", duration: "1日籃球活動", detail: "單日培育課程與日本當地體育交流協調。" },
      { name: "CLUB EXCHANGE", duration: "2日籃球活動", detail: "兩項培育交流、在地合作協調與教練回饋。" },
      { name: "EXTENDED EXCHANGE", duration: "3日籃球活動", detail: "三項培育交流活動與深入教練討論。" },
    ],
    pricingNote: "日圓參考費用。課程時數、教練配置、場地、翻譯、稅務處理及額外球員由正式報價確認。洽詢不代表保證場地或對手。",
    modelHeading: "交流活動示例（尚未完成的企劃）",
    modelText: "例如在關東與日本U12球員進行實戰交流，並在東北地區參加RBA育成訓練營。這只是企劃示例，不是已完成的客戶案例。",
    modelItems: ["實戰中的空間、判斷及防守閱讀", "與日本同齡球員交流學習", "與隨隊教練整理可帶回日常練習的收穫"],
    modelNote: "實際對手、場地與國際比賽批准均須另行書面確認。",
    processHeading: "從洽詢到實施",
    steps: [
      { name: "提供球隊需求", detail: "成年負責人提供年齡、人數、目標、日期與預算。" },
      { name: "確認條件並報價", detail: "確認日本球隊、教練、場地、安全與必要的體育組織程序。" },
      { name: "簽約並預付", detail: "協議簽署及條件確認後，透過RBA官方Stripe支付合同總額50%預付款；餘額於活動前支付。" },
      { name: "實施與回顧", detail: "完成已約定的體育活動並向成年領隊提供回饋。" },
    ],
    termsHeading: "安全、付款與取消",
    termsText: "RBA只收取體育教學與活動費用。預付款包含在合同總額內，不另行重複收費。付款期限、取消及退款政策由正式協議確定。如RBA無法履行核心服務，依合同合理退款。交通、住宿與旅遊服務由合規提供者另行簽約收費。交流賽須取得必要批准。",
    finalHeading: "從球隊真正想學的事開始。",
    finalText: "初次洽詢免費。只需成年團隊負責人的聯絡資料及球隊概要，不須提交未成年選手或家長名單。",
    facts: ["RBA獨立服務", "不保證對手或場館", "旅費另行處理"],
    noPayment: "此頁不收費。正式簽約並確認條件後，才會個別提供Stripe付款資訊。",
  },
  ko: {
    label: "RBA 국제 농구 서비스",
    title: "JAPAN COURT EXCHANGE",
    subtitle: "해외 유소년 농구팀을 위한 일본 현지 육성 교류.",
    intro: "RBA가 팀의 연령, 수준 및 학습 목표에 맞게 일본 현지 코칭과 스포츠 교류를 기획합니다. 여행·숙박·교통 서비스는 별도의 적격 사업자가 담당합니다.",
    enquiry: "팀 맞춤 제안 요청",
    browse: "국제 교류 페이지로",
    scopeHeading: "RBA 제공 내용",
    scopeText: "본 서비스는 농구 코칭과 스포츠 활동 조정이며 여행 패키지가 아닙니다.",
    included: ["성인 팀 대표자와 사전 상담", "연령·수준·목표별 서면 육성 계획", "RBA 현장 코칭 및 경기형 학습 활동", "일본 현지 팀 및 체육시설 관련 스포츠 조정", "코치 브리핑, 아동 보호 책임 확인 및 사후 피드백"],
    excludedHeading: "별도 계약 및 비용",
    excluded: ["항공권, 철도, 숙박 및 차량 이동", "식사, 관광, 여행자 보험, 비자 및 개인 비용", "별도 합의되지 않은 외부 시설·심판·전문 통역 비용"],
    pricesHeading: "클럽 단위 참고 가격",
    pricesText: "최대 10명의 선수를 기준으로 한 RBA 스포츠 서비스 참고 금액이며, 최종 내용과 금액은 서면 견적으로 확정합니다.",
    tiers: [
      { name: "ONE DAY EXCHANGE", duration: "현장 프로그램 1일", detail: "하루 육성 활동 및 현지 스포츠 교류 조정." },
      { name: "CLUB EXCHANGE", duration: "현장 프로그램 2일", detail: "두 번의 육성 교류 활동, 현지 조정과 코치 피드백." },
      { name: "EXTENDED EXCHANGE", duration: "현장 프로그램 3일", detail: "세 번의 육성 교류 활동과 심화 코치 리뷰." },
    ],
    pricingNote: "일본 엔화 기준 참고 가격. 강습 시간, 코치 수, 시설비, 통역, 세금 및 추가 선수는 정식 견적 시 확인합니다. 문의만으로 코트나 상대 팀이 확보되지는 않습니다.",
    modelHeading: "활동 구성 예시 (실제 완료 사례 아님)",
    modelText: "간토 지역에서 일본 U12 선수들과 게임형 교류를 진행하고 도호쿠 지역의 RBA 육성 캠프를 결합하는 등의 구성이 가능합니다. 이는 기획 예시입니다.",
    modelItems: ["실전에서 공간과 수비 상황을 읽고 판단하기", "일본의 또래 선수들과 연령에 맞는 교류", "동행 코치와 학습 성과를 정리하여 팀 훈련에 연결"],
    modelNote: "상대 팀, 시설 및 국제경기 관련 승인은 별도 서면 확인이 필요합니다.",
    processHeading: "문의부터 실행까지",
    steps: [
      { name: "팀의 목표 공유", detail: "성인 담당자가 연령, 인원, 희망 시기, 목적과 예산을 알려 줍니다." },
      { name: "가능성 검토 및 서면 견적", detail: "코치·상대 팀·시설·안전·필요한 협회 승인 등을 확인합니다." },
      { name: "계약 및 사전 결제", detail: "서면 계약과 조건 확정 후 RBA 공식 Stripe로 총액의 50%를 선납하고, 나머지는 시작 전에 정산합니다." },
      { name: "활동과 리뷰", detail: "합의된 농구 활동을 진행하고 성인 담당자와 피드백을 공유합니다." },
    ],
    termsHeading: "안전·결제·취소 규정",
    termsText: "RBA는 농구 교육 및 스포츠 운영 서비스만 청구합니다. 선납금은 계약 총액에 포함되며 별도 추가금이 아닙니다. 일정·취소·환불 규정은 서면 계약으로 정합니다. 핵심 서비스 제공이 불가능한 경우 계약에 따라 적절히 환불합니다. 여행 관련 서비스는 적격 사업자와 별도 계약·결제합니다. 국제 친선 경기는 필요한 승인을 전제로 합니다.",
    finalHeading: "선수들이 무엇을 배울지부터 시작하세요.",
    finalText: "첫 상담은 무료입니다. 성인 팀 담당자와 팀 개요만 있으면 되며 미성년자 또는 보호자의 명단은 요구하지 않습니다.",
    facts: ["RBA 독립 운영", "경기·시설 보장 아님", "여행비는 별도"],
    noPayment: "이 페이지에서는 결제하지 않습니다. 정식 계약과 조건을 확인한 후에만 전용 Stripe 결제를 안내합니다.",
  },
};

const prices = ["¥165,000", "¥330,000", "¥440,000"];

export function JapanCourtExchange({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <SiteFrame locale={locale} languagePage="international/japan-court-exchange">
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <a className={styles.back} href={locale === "en" ? "/international" : "/" + locale + "/international"}>← {c.browse}</a>
            <p className={styles.kicker}>{c.label}</p>
            <h1>{c.title}</h1>
            <h2>{c.subtitle}</h2>
            <p className={styles.lead}>{c.intro}</p>
            <div className={styles.actions}>
              <a className={styles.primary} href={ENQUIRY_FORM} target="_blank" rel="noopener noreferrer">{c.enquiry} <ArrowRight size={18} /></a>
            </div>
            <div className={styles.facts}>{c.facts.map(item => <span key={item}><ShieldCheck size={15}/>{item}</span>)}</div>
          </div>
        </section>
        <nav className={styles.languages} aria-label="Page language">
          {(Object.keys(languagePaths) as Locale[]).map(l =>
            <a key={l} href={languagePaths[l]} hrefLang={l === "zh-tw" ? "zh-Hant-TW" : l} aria-current={locale === l ? "page" : undefined}>
              {({ en: "English", ja: "日本語", "zh-tw": "繁體中文", ko: "한국어" })[l]}
            </a>
          )}
        </nav>
        <section className={styles.section}>
          <div className={styles.heading}><p className={styles.kicker}>01 / SCOPE OF SERVICE</p><h2>{c.scopeHeading}</h2><p>{c.scopeText}</p></div>
          <div className={styles.twoColumns}>
            <div className={styles.panel}>
              <h3>{c.scopeHeading}</h3>
              <ul>{c.included.map(item => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul>
            </div>
            <div className={styles.panelMuted}>
              <h3>{c.excludedHeading}</h3>
              <ul>{c.excluded.map(item => <li key={item}><span className={styles.dash}>—</span>{item}</li>)}</ul>
            </div>
          </div>
        </section>
        <section className={styles.pricing}>
          <div className={styles.sectionInner}>
            <div className={styles.heading}><p className={styles.kicker}>02 / CLUB PACKAGES</p><h2>{c.pricesHeading}</h2><p>{c.pricesText}</p></div>
            <div className={styles.cards}>
              {c.tiers.map((tier, i) =>
                <article className={i === 1 ? styles.featureCard : styles.priceCard} key={tier.name}>
                  <p className={styles.tierIndex}>0{i + 1} / RBA SPORTS SERVICE</p>
                  <h3>{tier.name}</h3>
                  <p className={styles.tierDuration}>{tier.duration}</p>
                  <strong className={styles.price}>{prices[i]}</strong>
                  <p className={styles.tierDescription}>{tier.detail}</p>
                  <a href={ENQUIRY_FORM} target="_blank" rel="noopener noreferrer">{c.enquiry} <ArrowRight size={16}/></a>
                </article>
              )}
            </div>
            <p className={styles.legalSmall}>{c.pricingNote}</p>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}><p className={styles.kicker}>03 / PLANNING MODEL</p><h2>{c.modelHeading}</h2><p>{c.modelText}</p></div>
          <div className={styles.model}>
            {c.modelItems.map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p></div>)}
          </div>
          <p className={styles.legalSmall}>{c.modelNote}</p>
        </section>
        <section className={styles.stepsSection}>
          <div className={styles.sectionInner}>
            <div className={styles.heading}><p className={styles.kicker}>04 / PROCESS</p><h2>{c.processHeading}</h2></div>
            <div className={styles.steps}>
              {c.steps.map((step, i) => <article key={step.name}><span>0{i + 1}</span><div><h3>{step.name}</h3><p>{step.detail}</p></div></article>)}
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.terms}>
            <ClipboardCheck size={28}/>
            <div><h2>{c.termsHeading}</h2><p>{c.termsText}</p></div>
          </div>
        </section>
        <section className={styles.close}>
          <div className={styles.sectionInner}>
            <p className={styles.kicker}>RBA / INTERNATIONAL CLUB ENQUIRY</p>
            <h2>{c.finalHeading}</h2>
            <p>{c.finalText}</p>
            <a className={styles.primary} href={ENQUIRY_FORM} target="_blank" rel="noopener noreferrer">{c.enquiry} <ArrowRight size={18}/></a>
            <small>{c.noPayment}</small>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
