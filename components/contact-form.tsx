import { Locale } from "./site-frame";

export const contactFormUrl = "https://form.jotform.com/262590542634055";
export const regionalHostEnquiryUrl = "https://form.jotform.com/262648437888073";
const copy = {
  en: ["Online enquiry", "Open the enquiry form", "Send your enquiry in your browser. Labels are provided in English, Japanese, Traditional Chinese and Korean. Submitting an enquiry does not confirm a booking or incur a charge."],
  ja: ["オンラインお問い合わせ", "お問い合わせフォームを開く", "メールアプリを使わず、ブラウザから送信できます。入力項目は日本語・英語・繁体字中国語・韓国語でご案内しています。フォームを送信しただけで予約が確定したり、料金が発生したりすることはありません。"],
  "zh-tw": ["線上查詢", "開啟查詢表單", "直接使用瀏覽器傳送查詢，無需電郵應用程式。欄位提供英語、日語、繁體中文與韓語。提交查詢不代表預約成立，也不會產生費用。"],
  ko: ["온라인 문의", "문의 양식 열기", "이메일 앱 없이 브라우저에서 문의할 수 있습니다. 항목은 영어, 일본어, 번체 중국어와 한국어로 안내합니다. 문의 제출만으로 예약이 확정되거나 비용이 발생하지 않습니다."],
} as const;
const fields={en:["Adult contact and organisation","Email","Target age group and player count","Preferred city and dates","Programme purpose and desired outcomes","Court / format information","Working budget (optional)","Consent to the privacy and participation policies"],ja:["成人の担当者名・団体名","メールアドレス","対象年代・参加予定人数","希望する地域・日程","開催目的・選手に学んでほしいこと","会場・開催形式","ご予算の目安（任意）","プライバシー・参加規約への同意"],"zh-tw":["成年聯絡人與單位","電子郵件","對象年齡與預計人數","希望城市與日期","活動目的與學習目標","場地與活動形式","預算範圍（選填）","同意隱私與參加條款"],ko:["성인 담당자 및 단체","이메일","대상 연령 및 예상 인원","희망 지역 및 일정","개최 목적과 학습 목표","코트 및 진행 방식","예상 예산(선택)","개인정보 및 참가 약관 동의"]} as const;
export function ContactForm({ locale, formPurpose = "general" }: { locale: Locale; formPurpose?: "general" | "clinic-host" }) {
  const c = copy[locale];
  const isHostEnquiry = formPurpose === "clinic-host" && locale === "ja";
  const hostFields = [
    "成人の主催担当者・チーム／団体名・連絡先",
    "開催を希望する都道府県・時期と候補日",
    "対象年代・想定選手数・解決したい育成課題",
    "チーム訪問／合同公開／3回継続などの希望",
    "地域でできる協力（体育館・募集・受付）",
    "会場の有料利用可否・費用は後日確認でも可",
    "未成年者の個人情報を送らないこと・料金は書面合意後に確定",
  ];
  const title = isHostEnquiry ? "全国クリニック・地域主催者の無料開催相談" : c[0];
  const description = isHostEnquiry
    ? "まずは開催の希望を教えてください。チーム訪問・地域合同・継続3回のどの形でも相談できます。専用フォームから送信しても予約や支払いは発生しません。"
    : c[2];
  const url = isHostEnquiry ? regionalHostEnquiryUrl : contactFormUrl;
  const button = isHostEnquiry ? "地域主催者専用の無料相談フォームを開く" : c[1];
  return (
    <section className="contact-online section-pad" id="request-form">
      <h2>{title}</h2>
      <p>{description}</p>
      <ul className="form-field-list">
        {(isHostEnquiry ? hostFields : fields[locale]).map((item) => <li key={item}>{item}</li>)}
      </ul>
      <p>{({
        en: "Please do not submit children’s names, medical details or private photographs. Share only the programme outline and the adult contact’s details.",
        ja: "子どもの氏名・医療情報・非公開写真は送らず、企画の概要と成人のご担当者の連絡先をお知らせください。",
        "zh-tw": "請勿提交兒童姓名、醫療資訊或私人照片。請提供活動概要與成年聯絡人的資料。",
        ko: "아동의 이름, 의료 정보 또는 비공개 사진를 보내지 마세요. 프로그램 개요와 성인 담당자의 연락처만 알려 주세요。",
      })[locale]}</p>
      <a className="button button-dark" href={url} target="_blank" rel="noopener noreferrer" data-cta={isHostEnquiry ? "clinic-host-enquiry" : undefined}>
        {button} ↗
      </a>
      {isHostEnquiry && <p className="text-sm">日程・指導者・利用施設・料金・役割分担・キャンセル条件は、事前の書面合意後に確定します。</p>}
    </section>
  );
}
