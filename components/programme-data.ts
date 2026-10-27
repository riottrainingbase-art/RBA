import type { Text4 } from "./network-data";


export type ProgrammeId =
  | "okinawa-december-camp"
  | "okinawa-nov14"
  | "kagoshima-nov29"
  | "yaima"
  | "kawasaki"
  | "saga-fukuoka"
  | "yamagata"
  | "shizugawa"
  | "kobe"
  | "torsten"
  | "sendai-u15"
  | "backbone-chiba"
  | "miyako";


export type Programme = {
  id: ProgrammeId;
  startDate: string;
  endDate?: string;
  ongoing?: boolean;
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
  /** Japanese information page to read before applying or paying. */
  japaneseInfoPath?: string;
  detailPath?: "events/torsten-loibl-online-clinic" | "camp/saga-fukuoka-2026";
  region: "tohoku" | "kanto" | "kansai" | "kyushu" | "okinawa" | "online";
  category: "TRAIN" | "PLAY" | "TRAVEL" | "COACH";
  pathway?: "development-camp" | "united" | "clinic" | "coach";
  ageGroups: readonly ("U8" | "U10" | "U12" | "U15" | "U18" | "COACH")[];
};


// Single source for every event card, calendar row, map callout and registration CTA.
// Dates and application URLs were reconciled with RBA's current official link hub.
export const programmes: readonly Programme[] = [
  {
    id:"miyako",startDate:"2026-10-31",endDate:"2026-10-31",
    date:["31 OCT 2026 · 10:00–17:00","2026.10.31（土）10:00〜17:00","2026.10.31 · 10:00–17:00","2026.10.31 · 10:00–17:00"],
    datePrimary:["31 OCT","10月31日","10月31日","10월 31일"],
    dateSecondary:["Saturday · 10:00–17:00","土曜日・10:00〜17:00","星期六・10:00–17:00","토요일 · 10:00–17:00"],
    title:["RBA 1DAY CLINIC in Miyako","宮古 RBA 1DAY CLINIC","宮古 RBA 一日籃球訓練","미야코 RBA 1DAY CLINIC"],
    place:["Sentoku District Gymnasium · Miyako, Iwate","岩手県宮古市・千徳地区体育館","岩手縣宮古市・千德地區體育館","이와테현 미야코시 · 센토쿠 체육관"],
    price:["Check the organiser's official form","参加費は現地主催者の公式フォームで確認","費用請參閱主辦單位官方表單","참가비는 주최자 공식 신청서 확인"],
    audience:["Grades 5–9 · capacity 30","小学5年〜中学3年・定員30名","小學5年級至國中3年級・限30名","초등 5학년~중학 3학년 · 정원 30명"],
    payment:["Apply through the organiser's existing Google Form.","現地主催者指定の公式Googleフォームから申込。支払条件はフォーム記載を優先。","透過主辦單位官方表單報名。","주최자 공식 Google 양식으로 신청."],
    applicationUrl:"https://docs.google.com/forms/d/e/1FAIpQLScQ8EtCsB7itDZkWebebPLcIRbWtgt4cXioL5DCj3v8RLdr5w/viewform",
    japaneseInfoPath:"/events/miyako-20261031",
    region:"tohoku",category:"TRAIN",pathway:"clinic",ageGroups:["U12","U15"],
  },
  {
    id:"kagoshima-nov29",startDate:"2026-11-29",
    date:["29 NOV 2026 · 09:30–12:00 / 13:00–15:30","2026.11.29（日）午前9:30〜12:00／午後13:00〜15:30","2026.11.29 · 09:30–12:00／13:00–15:30","2026.11.29 · 09:30–12:00 / 13:00–15:30"],
    datePrimary:["29 NOV","11月29日","11月29日","11월 29일"],dateSecondary:["Sunday · AM / PM","日曜日・午前／午後","星期日・上午／下午","일요일 · 오전 / 오후"],
    title:["BASTET × RBA Kagoshima Clinic","BASTET × RBA 鹿児島クリニック","BASTET × RBA 鹿兒島訓練營","BASTET × RBA 가고시마 클리닉"],
    place:["Kinkowan High School gym · Kagoshima","錦江湾高校体育館（鹿児島市）","錦江灣高中體育館・鹿兒島市","긴코완 고등학교 체육관 · 가고시마"],
    price:["Both sessions ¥4,000 / one session ¥3,000","午前・午後通し4,000円／1部のみ3,000円","全日¥4,000／單節¥3,000","종일 ¥4,000 / 한 세션 ¥3,000"],
    audience:["Elementary, junior high and high school students · all genders","小・中・高校生（男女）","小學、國中、高中生（男女）","초·중·고등학생（남녀）"],
    payment:["Apply by email or Instagram DM; payment details follow.","メール・InstagramのDMで受付。支払方法などの詳細は受付後にご案内します。","電郵或Instagram私訊報名，付款方式於受理後通知。","이메일·Instagram DM 신청. 결제 방법은 접수 후 안내합니다."],
    applicationUrl:"/ja/events/kagoshima-clinic-2026-11-29",region:"kyushu",category:"TRAIN",pathway:"clinic",ageGroups:["U8","U10","U12","U15","U18"],
  },

  {
    id:"okinawa-december-camp",startDate:"2026-12-22",endDate:"2026-12-24",
    date:["22–24 DEC 2026 · accommodation secured","2026.12.22〜24・宿泊先確保済み","2026.12.22–24・住宿已安排","2026.12.22–24 · 숙소 확보 완료"],
    datePrimary:["22–24 DEC","12月22〜24日","12月22–24日","12월 22–24일"],dateSecondary:["2 nights","2泊3日","三天兩夜","2박 3일"],
    title:["Okinawa International Youth Basketball Camp","沖縄国際ユースバスケットボールキャンプ","沖繩國際青少年籃球營","오키나와 국제 유소년 농구 캠프"],
    place:["Itoman Youth Center · accommodation secured","糸満青少年の家（宿泊先確保済み）","糸滿青少年之家（住宿已安排）","이토만 청소년의 집 · 숙소 확보 완료"],
    price:["Published: USD 450 with housing / USD 300 without; discounts available","沖縄県民：通い27,500円／宿泊39,600円（税込）・県外参加は要相談","公布費用：含住宿450美元／不含住宿300美元・另有優惠","게시 요금: 숙박 포함 USD 450 / 숙박 제외 USD 300 · 할인 있음"],
    audience:["Players aged 7–18","7〜18歳の選手","7–18歲球員","만 7–18세 선수"],
    payment:["Contact us before payment or booking travel. Accommodation is secured; gym slots, arrival/departure times, transfers, staff and final inclusions are being confirmed; please confirm final arrangements.","宿泊先は確保済み。体育館の時間・集合解散・送迎・スタッフ・料金に含まれる内容は調整中。支払い・航空券購入前に詳細をお問い合わせください。","住宿已安排，體育館時段、集合解散、接駁、工作人員及費用包含項目仍在確認，付款、訂機票前請先聯絡。","숙소 확보 완료. 체육관 시간·집합해산·교통·스태프·포함 항목 조율 중.  결제·항공권 구매 전 문의해 주세요."],
    japaneseInfoPath:"/ja/events/okinawa-international-camp-2026",
    applicationUrl:"https://okinawa.camp/",region:"okinawa",category:"TRAIN",pathway:"development-camp",ageGroups:["U8","U10","U12","U15"],
  },
  {
    id:"okinawa-nov14",startDate:"2026-11-14",
    date:["14 NOV 2026 · 16:00–19:00","2026.11.14（土）16:00〜19:00","2026.11.14 · 16:00–19:00","2026.11.14 · 16:00–19:00"],
    datePrimary:["14 NOV","11月14日","11月14日","11월 14일"],dateSecondary:["16:00–19:00","16:00〜19:00","16:00–19:00","16:00–19:00"],
    title:["RBA Okinawa Clinic","RBA 沖縄クリニック","RBA 沖繩訓練營","RBA 오키나와 클리닉"],
    place:["Southern Okinawa · venue shared with applicants","沖縄県南部・会場は申込者へ個別案内","沖繩南部・場地個別通知","오키나와 남부 · 신청자에게 장소 개별 안내"],
    price:["¥3,300 incl. tax / player","参加費3,300円（税込）／1名","每人¥3,300（含稅）","1인 ¥3,300（세금 포함）"],
    audience:["Japan grades 4–9 · capacity 50","小学4年〜中学3年生・定員50名","日本小學4年級至國中3年級・限50名","일본 초4~중3 · 정원 50명"],
    payment:["Register online; payment opens after venue confirmation.","公式ページで申込・決済。会場予約確定後に決済受付を開始します。","官方頁面報名，場地確定後開放付款。","공식 페이지 신청 · 장소 확정 후 결제 시작"],
    applicationUrl:"/ja/events/okinawa-clinic-2026-11-14",region:"okinawa",category:"TRAIN",pathway:"clinic",ageGroups:["U10","U12","U15"],
  },
  {
    id: "sendai-u15",
    startDate: "2026-10-01",
    ongoing: true,
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
    endDate: "2026-09-22",
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
    endDate: "2026-09-27",
    registrationClosed: true,
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
    startDate: "2026-10-03",
    endDate: "2026-10-04",
    date: ["03–04 OCT 2026", "2026.10.03–04", "2026.10.03–04", "2026.10.03–04"],
    datePrimary: ["03–04", "3〜4日", "3至4日", "3~4일"],
    dateSecondary: ["OCT 2026", "2026年10月", "2026年10月", "2026년 10월"],
    title: ["Saga × Fukuoka 2Days Development Camp", "佐賀 × 福岡 2Days Development Camp", "佐賀 × 福岡兩日培育營", "사가 × 후쿠오카 2Days Development Camp"],
    place: ["Saga & Okawa, Fukuoka", "佐賀・福岡（大川）", "佐賀・福岡（大川）", "사가・후쿠오카 오카와"],
    price: ["Full 2 days ¥16,500 / day ¥7,700 / session ¥4,400", "2日間 16,500円／日帰り 7,700円／1セッション 4,400円（税込）", "兩日 ¥16,500／單日 ¥7,700／單節 ¥4,400", "2일 ¥16,500 / 당일 ¥7,700 / 1세션 ¥4,400"],
    audience:["U8 / U10 / U12 / U15 players", "U8・U10・U12・U15選手", "U8・U10・U12・U15球員", "U8·U10·U12·U15 선수"],
    payment:["Submit the common form, then complete payment for your selected plan.", "共通申込フォーム送信後、選択した参加プランの決済完了で申込確定です", "提交共用表單後，完成所選方案付款即確認報名", "공통 신청 폼 제출 후 선택 플랜 결제 완료 시 신청 확정"],
    applicationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfTiiqA9Ak6xpzmrhSIN34HHjGOsDcNBLlTws0cYF9bCqyO9w/viewform?usp=send_form",
    detailPath: "camp/saga-fukuoka-2026",
    region:"kyushu", category:"TRAIN", pathway:"development-camp", ageGroups:["U8","U10","U12","U15"],
  },
  {
    id: "backbone-chiba",
    startDate: "2026-10-25",
    endDate: "2026-10-25",
    date: ["25 OCT 2026", "2026.10.25（日）", "2026.10.25", "2026.10.25"],
    datePrimary: ["25", "25日", "25日", "25일"],
    dateSecondary: ["OCT 2026", "2026年10月", "2026年10月", "2026년 10월"],
    title: ["BACKBONE 3×3 Chiba Chapter Round 3", "BACKBONE 3×3 千葉 CHAPTER Round 3", "BACKBONE 3×3 千葉站 第3回", "BACKBONE 3×3 지바 챕터 3라운드"],
    place: ["Kozaki Junior High School Gym, Chiba", "千葉県神崎町・神崎中学校体育館", "千葉縣神崎町・神崎中學體育館", "지바현 고자키마치・고자키 중학교 체육관"],
    price: ["¥6,600 per person (tax included)", "1名6,600円（税込）", "每人¥6,600（含稅）", "1인 ¥6,600（세금 포함）"],
    audience: ["Grades 1–9 · capacity 60", "小学1年生〜中学3年生・定員60名／個人参加歓迎", "小學1年級至國中3年級・名額60人", "초등 1학년~중학 3학년・정원 60명"],
    payment: ["Apply through official Google Form; payment guidance from organiser", "公式Googleフォームからお申し込みください。お支払い方法は主催者の案内をご確認ください。", "請使用官方表單報名", "공식 Google 양식으로 신청"],
    applicationUrl: "https://docs.google.com/forms/d/e/1FAIpQLScP3NPWCVgySjcP1TyqMdXQ4Cw9CUBhMk78DJPP1dlLl3hShw/viewform",
    region: "kanto", category: "PLAY", ageGroups: ["U8","U10","U12","U15"],
  },
  {
    id: "yamagata",
    startDate: "2026-10-24",
    endDate: "2026-10-24",
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
    endDate: "2026-11-08",
    date: ["07–08 NOV 2026", "2026.11.07–08", "2026.11.07–08", "2026.11.07–08"],
    datePrimary: ["07–08", "7〜8日", "7至8日", "7~8일"],
    dateSecondary: ["NOV 2026", "2026年11月", "2026年11月", "2026년 11월"],
    title: ["Shizugawa Development Camp 2026", "志津川 Development Camp 2026", "志津川培育營2026", "시즈가와 Development Camp 2026"],
    place: ["Minamisanriku, Miyagi", "宮城・南三陸（志津川）", "宮城・南三陸（志津川）", "미야기・미나미산리쿠（시즈가와）"],
    price: ["Overnight ¥25,000 / day ¥6,600 (meals extra)", "宿泊25,000円／日帰り1日6,600円（食事代別）", "住宿 ¥25,000／單日 ¥6,600（餐費另計）", "숙박 ¥25,000 / 당일 ¥6,600 (식비 별도)"],
    audience:["Grades 4–9", "小学4年〜中学3年", "小學4年級至國中3年級", "초등 4학년~중학 3학년"],
    payment:["RBA sends payment instructions after review.", "内容を確認した後、RBAからお支払い方法を個別にご案内します", "確認內容後由RBA另行通知付款方式", "내용 확인 후 RBA가 결제 방법 안내"],
    japaneseInfoPath: "/ja/events/shizugawa-development-camp-2026",
    applicationUrl: "https://form.jotform.com/262498430063054",
    region:"tohoku", category:"TRAVEL", pathway:"development-camp", ageGroups:["U10","U12","U15"],
  },
  {
    id: "kobe",
    startDate: "2026-11-20",
    endDate: "2026-11-23",
    date: ["21–23 NOV 2026 · optional evening clinic 20 NOV", "2026.11.21〜23／11.20は別料金の前夜クリニック", "2026.11.21–23／11.20晚間訓練另計", "2026.11.21–23 / 11.20 전야 클리닉 별도"],
    datePrimary: ["21–23", "21〜23日", "21至23日", "21~23일"],
    dateSecondary: ["NOV 2026", "2026年11月", "2026年11月", "2026년 11월"],
    title: ["KOBE Development Camp 2026", "KOBE Development Camp 2026", "KOBE培育營2026", "KOBE Development Camp 2026"],
    place: ["Tatsuno, Hyogo", "兵庫・たつの", "兵庫・龍野", "효고・다쓰노"],
    price: ["From ¥6,600 / full camp with stay ¥52,800", "半日 6,600円〜／全日程・宿泊食事付 52,800円", "半日 ¥6,600起／全程含住宿餐食 ¥52,800", "반일 ¥6,600부터 / 전 일정 숙박·식사 포함 ¥52,800"],
    audience:["Grades 5–9", "小学5年〜中学3年", "小學5年級至國中3年級", "초등 5학년~중학 3학년"],
    payment:["Confirm attendance dates, venue and accommodation conditions with RBA before payment.", "会場・宿泊条件を最終確認中。決済前に参加希望日・プランをご相談ください。", "場地與住宿條件仍在確認，付款前請先洽詢參加日期與方案。", "장소·숙박 조건 확인 중. 결제 전 참가일과 플랜을 상담해 주세요."],
    japaneseInfoPath:"/ja/events/kobe-development-camp-2026",
    applicationUrl: "https://form.jotform.com/262591727805061",
    region:"kansai", category:"TRAVEL", pathway:"development-camp", ageGroups:["U12","U15"],
  },
  {
    id: "torsten",
    startDate: "2026-11-25",
    endDate: "2026-11-25",
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


function japanDateKey(now: Date){
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  const get=(type:string)=>parts.find(part=>part.type===type)?.value||"";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function isProgrammeActive(programme: Programme, now=new Date()){
  if(programme.registrationClosed)return false;
  const today=japanDateKey(now);
  // Vol.2の新規販促は開催当日（11/25 JST）から停止する。
  if(programme.id==="torsten" && today>="2026-11-25")return false;
  if(programme.ongoing)return true;
  return (programme.endDate||programme.startDate)>=today;
}
