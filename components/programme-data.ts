import type { Text4 } from "./network-data";


export type ProgrammeId =
  | "yaima"
  | "kawasaki"
  | "saga-fukuoka"
  | "yamagata"
  | "shizugawa"
  | "kobe"
  | "torsten"
  | "sendai-u15";


export type Programme = {
  id: ProgrammeId;
  startDate: string;
  registrationClosed?: boolean;
  date: Text4;
  datePrimary: Text4;
  dateSecondary: Text4;
  title: Text4;
  place: Text4;
  price: Text4;
  audience: Text4;
  payment: Text4;
  applicationUrl: string;
  detailPath?: "events/torsten-loibl-online-clinic";
  region: "tohoku" | "kanto" | "kansai" | "kyushu" | "okinawa" | "online";
  category: "TRAIN" | "PLAY" | "TRAVEL" | "COACH";
  pathway?: "development-camp" | "united" | "clinic" | "coach";
  ageGroups: readonly ("U8" | "U10" | "U12" | "U15" | "COACH")[];
};


// Single source for every event card, calendar row, map callout and registration CTA.
// Dates and application URLs were reconciled with RBA's current official link hub.
export const programmes: readonly Programme[] = [
  {
    id: "sendai-u15",
    startDate: "2026-10-01",
    date: ["Every Thursday · 3x / month", "毎週木曜日・原則月3回", "每週四・原則每月3次", "매주 목요일 · 원칙 월 3회"],
    datePrimary: ["THU", "木曜", "週四", "목요일"],
    dateSecondary: ["18:00–19:30", "18:00〜19:30", "18:00–19:30", "18:00–19:30"],
    title: ["RBA U15 Skill Up School · Sendai", "RBA U15 SKILL UP SCHOOL｜仙台", "RBA U15技能提升學校｜仙台", "RBA U15 스킬업 스쿨｜센다이"],
    place: ["Taihaku, Sendai", "仙台市太白区", "仙台市太白區", "센다이시 다이하쿠구"],
    price: ["Enrollment ¥5,500 + ¥7,700 / month", "入会金5,500円＋月3回7,700円（税込）", "入會費¥5,500＋每月3次¥7,700", "입회비 ¥5,500 + 월 3회 ¥7,700"],
    audience:["U15 players · Grade 6 welcome · capacity 25", "U15年代（小学6年生も参加可）・定員25名", "U15球員（小學6年級亦可參加）・限額25名", "U15 선수（초등학교 6학년도 참가 가능）· 정원 25명"],
    payment:["RBA confirms participation by email.", "申込内容を確認後、RBAからの確認メールをもって受付確定。会場詳細もメールでご案内します。", "由RBA確認後以電郵通知參加及場地詳情", "RBA 확인 이메일로 참가 확정 및 장소 안내"],
    applicationUrl: "https://form.jotform.com/262678369675074",
    region:"tohoku", category:"TRAIN", pathway:"clinic", ageGroups:["U15"],
  },
  {
    id: "yaima",
    startDate: "2026-09-20",
    registrationClosed: true,
    date: ["20–22 SEP 2026", "2026.09.20–22", "2026.09.20–22", "2026.09.20–22"],
    datePrimary: ["20–22", "20〜22日", "20至22日", "20~22일"],
    dateSecondary: ["SEP 2026", "2026年9月", "2026年9月", "2026년 9월"],
    title: ["YAIMA CUP Project", "YAIMA CUP参加プロジェクト", "YAIMA CUP參賽計畫", "YAIMA CUP 참가 프로젝트"],
    place: ["Ishigaki, Okinawa", "沖縄・石垣島", "沖繩・石垣島", "오키나와・이시가키섬"],
    price: ["RBA fee: ¥25,000", "RBA参加費 25,000円（税込）", "RBA參加費 25,000日圓", "RBA 참가비 25,000엔"],
    audience:["U12 players", "U12選手（男女）", "U12球員", "U12 선수"],
    payment:["Payment guidance follows the form.", "フォーム送信後の案内に従ってお支払いください", "提交表單後依通知付款", "폼 제출 후 안내에 따라 결제"],
    applicationUrl: "https://forms.gle/wzc4X7pZrDRqi5Qp6",
    region:"okinawa", category:"PLAY", pathway:"united", ageGroups:["U12"],
  },
  {
    id: "kawasaki",
    startDate: "2026-09-27",
    date: ["27 SEP 2026", "2026.09.27", "2026.09.27", "2026.09.27"],
    datePrimary: ["27", "27日", "27日", "27일"],
    dateSecondary: ["SEP 2026", "2026年9月", "2026年9月", "2026년 9월"],
    title: ["RBA Kawasaki Clinic", "RBA 川崎クリニック", "RBA川崎訓練營", "RBA 가와사키 클리닉"],
    place: ["Kawasaki, Kanagawa", "神奈川・川崎", "神奈川・川崎", "가나가와・가와사키"],
    price: ["See the application page for the fee.", "参加費は申込ページでご確認ください", "費用請參閱報名頁面", "참가비는 신청 페이지에서 확인해 주세요"],
    audience:["U12 / U15 players", "U12・U15選手", "U12・U15球員", "U12·U15 선수"],
    payment:["Payment guidance follows the form.", "フォーム送信後の案内に従ってお支払いください", "提交表單後依通知付款", "폼 제출 후 안내에 따라 결제"],
    applicationUrl: "https://forms.gle/dpdzwWsgHyZDuNaW9",
    region:"kanto", category:"TRAIN", pathway:"clinic", ageGroups:["U12","U15"],
  },
  {
    id: "saga-fukuoka",
    startDate: "2026-10-04",
    date: ["04–05 OCT 2026", "2026.10.04–05", "2026.10.04–05", "2026.10.04–05"],
    datePrimary: ["04–05", "4〜5日", "4至5日", "4~5일"],
    dateSecondary: ["OCT 2026", "2026年10月", "2026年10月", "2026년 10월"],
    title: ["Saga × Fukuoka 2Days Development Camp", "佐賀 × 福岡 2Days Development Camp", "佐賀 × 福岡兩日培育營", "사가 × 후쿠오카 2Days Development Camp"],
    place: ["Saga & Okawa, Fukuoka", "佐賀・福岡（大川）", "佐賀・福岡（大川）", "사가・후쿠오카 오카와"],
    price: ["Participation: ¥16,500", "参加費 16,500円（税込）", "參加費 16,500日圓", "참가비 16,500엔"],
    audience:["U8 / U10 / U12 / U15 players", "U8・U10・U12・U15選手", "U8・U10・U12・U15球員", "U8·U10·U12·U15 선수"],
    payment:["Payment is required after submitting the form.", "フォーム送信後、参加費のお支払いが完了すると申込が確定します", "提交表單後完成付款才確認報名", "폼 제출 후 결제 완료 시 신청 확정"],
    applicationUrl: "https://forms.gle/NJ4widb21vR1Eanj6",
    region:"kyushu", category:"TRAIN", pathway:"development-camp", ageGroups:["U8","U10","U12","U15"],
  },
  {
    id: "yamagata",
    startDate: "2026-10-24",
    date: ["24 OCT 2026", "2026.10.24", "2026.10.24", "2026.10.24"],
    datePrimary: ["24", "24日", "24日", "24일"],
    dateSecondary: ["OCT 2026", "2026年10月", "2026年10月", "2026년 10월"],
    title: ["Yamagata 1Day Clinic", "山形 1Day Clinic", "山形一日訓練營", "야마가타 1Day Clinic"],
    place: ["Yamagata", "山形", "山形", "야마가타"],
    price: ["Participation: ¥6,600", "参加費 6,600円（税込）", "參加費 6,600日圓", "참가비 6,600엔"],
    audience:["U10 / U12 / U15 players", "U10・U12・U15選手", "U10・U12・U15球員", "U10·U12·U15 선수"],
    payment:["Payment guidance follows the form.", "フォーム送信後の案内に従ってお支払いください", "提交表單後依通知付款", "폼 제출 후 안내에 따라 결제"],
    applicationUrl: "https://forms.gle/JKdTjasPxXtnLZ487",
    region:"tohoku", category:"TRAIN", pathway:"clinic", ageGroups:["U10","U12","U15"],
  },
  {
    id: "shizugawa",
    startDate: "2026-11-07",
    date: ["07–08 NOV 2026", "2026.11.07–08", "2026.11.07–08", "2026.11.07–08"],
    datePrimary: ["07–08", "7〜8日", "7至8日", "7~8일"],
    dateSecondary: ["NOV 2026", "2026年11月", "2026年11月", "2026년 11월"],
    title: ["Shizugawa Development Camp 2026", "志津川 Development Camp 2026", "志津川培育營2026", "시즈가와 Development Camp 2026"],
    place: ["Minamisanriku, Miyagi", "宮城・南三陸（志津川）", "宮城・南三陸（志津川）", "미야기・미나미산리쿠（시즈가와）"],
    price: ["Participation: ¥25,000", "参加費 25,000円", "參加費 ¥25,000", "참가비 ¥25,000"],
    audience:["Grades 3–9", "小学3年〜中学3年", "小學3年級至國中3年級", "초등 3학년~중학 3학년"],
    payment:["RBA sends payment instructions after review.", "内容を確認した後、RBAからお支払い方法を個別にご案内します", "確認內容後由RBA另行通知付款方式", "내용 확인 후 RBA가 결제 방법 안내"],
    applicationUrl: "https://form.jotform.com/262498430063054",
    region:"tohoku", category:"TRAVEL", pathway:"development-camp", ageGroups:["U10","U12","U15"],
  },
  {
    id: "kobe",
    startDate: "2026-11-20",
    date: ["20–23 NOV 2026", "2026.11.20–23", "2026.11.20–23", "2026.11.20–23"],
    datePrimary: ["20–23", "20〜23日", "20至23日", "20~23일"],
    dateSecondary: ["NOV 2026", "2026年11月", "2026年11月", "2026년 11월"],
    title: ["KOBE Development Camp 2026", "KOBE Development Camp 2026", "KOBE培育營2026", "KOBE Development Camp 2026"],
    place: ["Tatsuno, Hyogo", "兵庫・たつの", "兵庫・龍野", "효고・다쓰노"],
    price: ["From ¥6,600 / full camp with stay ¥52,800", "半日 6,600円〜／全日程・宿泊食事付 52,800円", "半日 ¥6,600起／全程含住宿餐食 ¥52,800", "반일 ¥6,600부터 / 전 일정 숙박·식사 포함 ¥52,800"],
    audience:["Grades 5–9", "小学5年〜中学3年", "小學5年級至國中3年級", "초등 5학년~중학 3학년"],
    payment:["Select a plan, submit and complete the corresponding payment.", "プランを選んでフォームを送信し、選択したプランのお支払いを完了してください", "選擇方案並提交後完成對應付款", "플랜 선택·제출 후 해당 결제 완료"],
    applicationUrl: "https://form.jotform.com/262591727805061",
    region:"kansai", category:"TRAVEL", pathway:"development-camp", ageGroups:["U12","U15"],
  },
  {
    id: "torsten",
    startDate: "2026-11-25",
    date: ["25 NOV 2026", "2026.11.25", "2026.11.25", "2026.11.25"],
    datePrimary: ["25", "25日", "25日", "25일"],
    dateSecondary: ["NOV 2026", "2026年11月", "2026年11月", "2026년 11월"],
    title: ["Torsten Loibl Online Clinic Vol.2", "トーステン・ロイブル オンライン講習 Vol.2", "Torsten Loibl線上講座 Vol.2", "Torsten Loibl 온라인 클리닉 Vol.2"],
    place: ["Online · Zoom", "オンライン・Zoom", "線上・Zoom", "온라인・Zoom"],
    price: ["Live ¥3,300 / 30-day on-demand ¥4,400", "ライブ 3,300円／30日オンデマンド 4,400円", "直播 ¥3,300／30日隨選 ¥4,400", "라이브 ¥3,300 / 30일 다시보기 ¥4,400"],
    audience:["Coaches, players, families and performance staff", "指導者・選手・保護者・トレーナー・S&Cコーチ", "教練、球員、家長及體能人員", "코치, 선수, 보호자와 퍼포먼스 스태프"],
    payment:["Submit the form, then pay from the confirmation screen.", "フォーム送信後、確認画面の決済リンクからお支払いください", "提交表單後從確認畫面付款", "폼 제출 후 확인 화면의 결제 링크로 결제"],
    applicationUrl: "https://forms.gle/fy4etmavBtw1s7FQ8",
    detailPath: "events/torsten-loibl-online-clinic",
    region:"online", category:"COACH", pathway:"coach", ageGroups:["COACH"],
  },
] as const;


export const programmeById = Object.fromEntries(programmes.map((programme) => [programme.id, programme])) as Record<ProgrammeId, Programme>;
export const torstenRegistrationUrl = programmeById.torsten.applicationUrl;
