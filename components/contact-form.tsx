import { Locale } from "./site-frame";

export const contactFormUrl = "https://form.jotform.com/262590542634055";
const copy = {
  en: ["Online enquiry", "Open the enquiry form", "Send your enquiry in your browser. Labels are provided in English, Japanese, Traditional Chinese and Korean. Submitting an enquiry does not confirm a booking or incur a charge."],
  ja: ["オンラインお問い合わせ", "お問い合わせフォームを開く", "メールアプリを使わず、ブラウザから送信できます。入力項目は日本語・英語・繁体字中国語・韓国語でご案内しています。フォームを送信しただけで予約が確定したり、料金が発生したりすることはありません。"],
  "zh-tw": ["線上查詢", "開啟查詢表單", "直接使用瀏覽器傳送查詢，無需電郵應用程式。欄位提供英語、日語、繁體中文與韓語。提交查詢不代表預約成立，也不會產生費用。"],
  ko: ["온라인 문의", "문의 양식 열기", "이메일 앱 없이 브라우저에서 문의할 수 있습니다. 항목은 영어, 일본어, 번체 중국어와 한국어로 안내합니다. 문의 제출만으로 예약이 확정되거나 비용이 발생하지 않습니다."],
} as const;
const fields={
 en:["Full name","Email address","Enquiry topic","Organisation (optional)","City / country (optional)","Preferred dates (optional)","Age group (optional)","Participant count (optional)","Budget (optional)","Message"],
 ja:["氏名","メールアドレス","お問い合わせ内容","所属・団体名（任意）","都市・国（任意）","希望日程（任意）","対象年代（任意）","参加人数（任意）","予算（任意）","メッセージ"],
 "zh-tw":["姓名","電子郵件","查詢主題","機構（選填）","城市／國家（選填）","希望日期（選填）","年齡層（選填）","參加人數（選填）","預算（選填）","訊息"],
 ko:["성명","이메일 주소","문의 주제","소속 (선택)","도시 / 국가 (선택)","희망 날짜 (선택)","연령대 (선택)","참가 인원 (선택)","예산 (선택)","메시지"]
} as const;
export function ContactForm({locale}: {locale: Locale}) {
  const c = copy[locale];
  return <section className="contact-online section-pad" id="request-form"><h2>{c[0]}</h2><p>{c[2]}</p><ul className="form-field-list">{fields[locale].map(x=><li key={x}>{x}</li>)}</ul><p>{({en:"Please do not submit children’s names, medical details or private photographs. Share only the programme outline and the adult contact’s details.",ja:"子どもの氏名・医療情報・非公開写真は送らず、企画の概要と成人のご担当者の連絡先をお知らせください。","zh-tw":"請勿提交兒童姓名、醫療資訊或私人照片。請提供活動概要與成年聯絡人的資料。",ko:"아동의 이름, 의료 정보 또는 비공개 사진은 보내지 마세요. 프로그램 개요와 성인 담당자의 연락처만 알려 주세요."})[locale]}</p><a className="button button-dark" href={contactFormUrl} target="_blank" rel="noopener noreferrer">{c[1]} ↗</a></section>;
}