import Link from "next/link";
import type {Locale} from "./site-frame";
import styles from "./sponsor-project-options.module.css";

export const sponsorEnquiryUrl = "https://form.jotform.com/262954078351059";

const copy = {
  ja: {
    title: "どの機会を、一緒につくりますか。",
    intro: "協賛金、物品・サービスの提供、共同企画。それぞれの方法で、企業の対象地域や目的に合う一案をご相談します。以下は連携の例であり、開催日程や募集枠の確約ではありません。",
    cards: [
      ["地域の参加機会", "地域クリニックや交流の参加機会を支える。", "会場費・用具・参加費補助など、対象と使途を決めてご提案します。"],
      ["指導者の学び", "学びを、日々のチーム指導へつなぐ。", "講習・教材・通訳など、実施内容と対象の指導者を整理します。"],
      ["国内外の交流", "違うコートで学ぶための準備を支える。", "移動・言語支援などを検討。日程・主催者の許可・役割を確認してから募集します。"],
    ],
    processTitle: "社内で判断できる、一枚の提案へ。",
    steps: [
      ["目的を確認", "対象地域、支援したい活動、予算の目安、検討時期を伺います。未定でも構いません。"],
      ["条件を文書で合意", "企画・日程・費用使途・税込総額・掲載権限・報告日・中止時の扱いを、実施前に確認します。"],
      ["実施して報告", "参加延べ人数、実施内容、費用の使途、合意した掲載の実績を報告。継続は結果を見て双方で判断します。"],
    ],
    proof: "実際の活動を見る：マレーシア・ペナン育成クリニック",
    faqTitle: "ご相談の前に",
    faq: [
      ["金銭以外でも協力できますか？", "物品・サービス提供や共同企画も相談できます。現金協賛とは分けて、数量・配送・担当範囲などを確認します。"],
      ["金額と掲載内容は決まっていますか？", "企画ごとに見積もります。税・送料等を含む総額と提供内容は書面で提示します。外部主催者の広告枠やロゴの利用は許可が前提です。"],
      ["相談すると契約になりますか？", "ご相談だけで契約や請求は発生しません。日程・費用・役割が未確定の企画への入金はお願いしません。"],
    ],
    button: "協賛専用フォームで相談する",
    note: "ブラウザから相談できます。子どもの氏名や健康情報は送らず、成人の担当者と企画の概要をお知らせください。",
  },
  en: {
    title: "Choose the opportunity you want to support.",
    intro: "Discuss cash support, goods, services or a joint programme aligned with your region and purpose. These are collaboration examples, not confirmed dates or available inventory.",
    cards: [["Local access", "Support a local clinic or exchange.", "Agree the use of funds: venue, equipment or participation support."], ["Coach learning", "Connect learning with daily coaching.", "Define the audience and scope of workshops, resources or interpreting."], ["Exchange", "Help young people prepare for another court.", "Explore travel or language support after dates, host permissions and responsibilities are confirmed."]],
    processTitle: "A proposal your organisation can evaluate.",
    steps: [["Define the purpose", "Discuss location, activity, budget range and decision timing; these can be undecided."], ["Agree in writing", "Confirm the programme, dates, use of funds, tax-inclusive total, rights, reporting date and cancellation terms before delivery."], ["Deliver and report", "Report participant visits, activities, use of funds and agreed recognition. Review results together before renewal."]],
    proof: "See our work: Penang development clinics (Japanese)",
    faqTitle: "Before you enquire",
    faq: [["Can we contribute goods or services?", "Yes. Quantity, delivery and responsibilities are agreed separately from cash support."], ["Are fees and rights fixed?", "Each project receives a written quote including taxes and applicable delivery costs. Third-party branding rights require permission."], ["Does an enquiry create a commitment?", "No contract or charge arises from an enquiry. We do not request payment for an undefined project."]],
    button: "Enquire by email", note: "Contact us in English by email, or use the Japanese enquiry form. Send adult contact details and a project outline only.",
  },
  "zh-tw": {
    title: "選擇希望一起創造的機會。", intro: "歡迎討論金錢、物資、服務或共同企劃，配合企業的地區與目標。以下為合作範例，不代表已確認的日期或名額。",
    cards: [["地方參與機會", "支持地方訓練或交流。", "先確認場地、器材或參加費補助等資金用途。"], ["教練學習", "讓學習回到日常指導。", "確認講習、教材或口譯的對象與範圍。"], ["國內外交流", "支持前往不同球場的準備。", "日期、主辦許可與責任確認後，再討論交通或語言支援。"]],
    processTitle: "提供可供企業評估的提案。", steps: [["確認目的", "討論地區、活動、預算與評估時間；尚未決定也可諮詢。"], ["書面確認", "活動前確認企劃、日期、用途、含稅總額、權利、報告日期與取消條件。"], ["執行與報告", "報告參與人次、活動、資金用途與約定的露出，再共同決定是否續約。"]],
    proof: "活動紀錄：檳城培育訓練（日文）", faqTitle: "諮詢前須知", faq: [["可以提供物資或服務嗎？", "可以。數量、配送與責任另行確認，與金錢贊助分開記錄。"], ["費用與露出已固定嗎？", "依企劃提供含稅及適用運費的書面報價。第三方的廣告與標誌須取得許可。"], ["諮詢即代表簽約嗎？", "不會因諮詢產生合約或費用。企劃條件未確認前，不要求付款。"]],
    button: "以電子郵件洽談", note: "可用電子郵件或日文表單聯絡。請只提供成年聯絡人與企劃概要，勿填寫兒童姓名或健康資訊。",
  },
  ko: {
    title: "함께 만들 기회를 선택하세요.", intro: "기업의 지역과 목적에 맞는 협찬금, 물품·서비스 또는 공동 기획을 상담합니다. 아래는 협업 예시이며 확정 일정이나 모집 자리가 아닙니다.",
    cards: [["지역 참여 기회", "지역 클리닉과 교류를 지원합니다.", "대관료, 장비, 참가비 지원 등 용도를 먼저 정합니다."], ["코치 교육", "배움을 일상의 지도에 연결합니다.", "강습, 자료, 통역의 대상과 범위를 확인합니다."], ["국내외 교류", "새로운 코트를 위한 준비를 돕습니다.", "일정, 주최자 허가, 역할 확인 후 이동·언어 지원을 검토합니다."]],
    processTitle: "기업이 검토할 수 있는 구체적인 제안.", steps: [["목적 확인", "지역, 활동, 예산과 검토 시기를 상담합니다. 미정이어도 괜찮습니다."], ["서면 합의", "실행 전에 기획, 일정, 용도, 세금 포함 총액, 권리, 보고일과 취소 조건을 확인합니다."], ["실행과 보고", "누적 참가 횟수, 활동, 지원금 사용 및 합의한 게재 내역을 보고한 후 지속 여부를 함께 결정합니다."]],
    proof: "활동 기록: 페낭 육성 클리닉 (일본어)", faqTitle: "상담 전 안내", faq: [["물품이나 서비스 제공도 가능한가요?", "가능합니다. 수량, 배송과 역할은 현금 협찬과 구분해 합의합니다."], ["금액과 게재 내용이 정해져 있나요?", "프로젝트별로 세금과 해당 배송비를 포함한 서면 견적을 제공합니다. 외부 주최자의 광고와 로고 사용에는 허가가 필요합니다."], ["문의하면 계약이 되나요?", "문의만으로 계약이나 비용이 발생하지 않습니다. 조건이 정해지지 않은 프로젝트의 입금을 요청하지 않습니다."]],
    button: "이메일로 상담하기", note: "이메일 또는 일본어 양식으로 문의하세요. 아동의 이름·건강 정보 없이 성인 담당자와 기획 개요만 보내 주세요.",
  },
} as const;

export function SponsorProjectOptions({locale}: {locale: Locale}) {
  const x = copy[locale];
  const email = "mailto:riot.training.base@gmail.com?subject=" + encodeURIComponent("RBA partnership enquiry") + "&body=" + encodeURIComponent("Organisation:\nRegion:\nActivity / purpose:\nSupport type (cash, goods, services, joint programme):\nBudget range (optional):\nDecision timing:\n");
  return <section className={`${styles.section} section-pad`} id="sponsor-projects" aria-labelledby="sponsor-projects-title">
    <p className="section-index">ONE PROJECT / CLEAR PURPOSE / SHARED REPORT</p>
    <h2 id="sponsor-projects-title">{x.title}</h2><p className={styles.intro}>{x.intro}</p>
    <div className={styles.grid}>{x.cards.map(([title,lead,detail],i) => <article className={styles.card} key={title}><span>0{i+1}</span><h3>{title}</h3><p><strong>{lead}</strong></p><p>{detail}</p></article>)}</div>
    <h3 className={styles.subheading}>{x.processTitle}</h3>
    <ol className={styles.steps}>{x.steps.map(([title,detail]) => <li key={title}><h4>{title}</h4><p>{detail}</p></li>)}</ol>
    <Link className={styles.proof} href="/ja/journal/malaysia-penang-development-clinic-2026">{x.proof} →</Link>
    <div className={styles.faq}><h3>{x.faqTitle}</h3>{x.faq.map(([question,answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    <a className="button button-orange" href={locale==="ja"?sponsorEnquiryUrl:email}>{x.button} →</a>
    <p className={styles.note}>{x.note}</p>
    {locale!=="ja" && <a className={styles.proof} href={sponsorEnquiryUrl}>日本語フォーム / Japanese form →</a>}
  </section>;
}
