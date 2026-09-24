import type { Locale } from "./site-frame";
export type Text4=readonly[string,string,string,string];
export const tr=(v:Text4,l:Locale)=>v[({en:0,ja:1,"zh-tw":2,ko:3})[l]];
export type ActivityType="clinic"|"camp"|"3x3"|"school";
export type MapPoint={id:string;lon:number;lat:number;name:Text4;status:"activity"|"planned"|"partner"|"discussion";detail:Text4;activities?:ActivityType[]};
const typeNames={en:{clinic:"Clinic",camp:"Camp","3x3":"3x3",school:"School"},ja:{clinic:"クリニック",camp:"キャンプ","3x3":"3x3",school:"スクール"},"zh-tw":{clinic:"訓練營",camp:"培育營","3x3":"3x3",school:"課程"},ko:{clinic:"클리닉",camp:"캠프","3x3":"3x3",school:"스쿨"}} as const;
const record=(id:string,lon:number,lat:number,name:Text4,activities:ActivityType[],example:Text4):MapPoint=>({id,lon,lat,name,status:"activity",activities,detail:(["en","ja","zh-tw","ko"] as Locale[]).map((l,i)=>`${activities.map(x=>typeNames[l][x]).join(l==="ja"||l==="zh-tw"?"／":" / ")}. ${example[i]}`) as unknown as Text4});


// Canonical source: Google Drive “RBA 統合運営コントロール 2026” → 日本地図_活動地域 A2:H26.
// Coordinates are representative city/region positions, never venue entrances.
export const japanPoints:MapPoint[]=[
 record("hokkaido",142.46,43.38,["Hokkaido","北海道","北海道","홋카이도"],["camp"],["Youth development camp.","北海道育成キャンプ。","北海道青少年培育營。","홋카이도 유소년 육성 캠프."]),
 record("akita",140.10,39.72,["Akita","秋田","秋田","아키타"],["clinic","3x3"],["Clinic and BACKBONE programme.","クリニック／BACKBONE。","訓練營與BACKBONE活動。","클리닉 및 BACKBONE 프로그램."]),
 record("yuzawa",140.49,39.16,["Yuzawa · Akita","秋田・湯沢","秋田・湯澤","아키타・유자와"],["clinic"],["RBA Basketball Clinic.","湯沢開催クリニック。","湯澤RBA訓練營。","유자와 RBA 클리닉."]),
 record("sendai",140.87,38.27,["Sendai · Miyagi","宮城・仙台","宮城・仙台","미야기・센다이"],["clinic","camp","school"],["RBA base; clinics, camps and U12 school.","RBA拠点。クリニック、キャンプ、U12スクール。","RBA基地；訓練營、培育營與U12課程。","RBA 거점; 클리닉, 캠프, U12 스쿨."]),
 record("shizugawa",141.44,38.68,["Shizugawa · Miyagi","宮城・志津川","宮城・志津川","미야기・시즈가와"],["camp"],["SHIZUGAWA DEVELOPMENT CAMP 2026.","SHIZUGAWA DEVELOPMENT CAMP 2026。","SHIZUGAWA DEVELOPMENT CAMP 2026。","SHIZUGAWA DEVELOPMENT CAMP 2026."]),
 record("niigata",139.02,37.90,["Niigata","新潟","新潟","니가타"],["clinic"],["RBA Niigata Clinic.","新潟クリニック。","新潟RBA訓練營。","니가타 RBA 클리닉."]),
 record("ibaraki",140.45,36.34,["Ibaraki","茨城","茨城","이바라키"],["clinic","3x3"],["BACKBONE pre-event and clinic.","BACKBONEプレ開催／クリニック。","BACKBONE預備活動與訓練營。","BACKBONE 프리 이벤트 및 클리닉."]),
 record("tochigi",139.88,36.57,["Tochigi","栃木","栃木","도치기"],["clinic"],["RBA skill-up clinic.","スキルアップクリニック。","RBA技能提升訓練營。","RBA 스킬업 클리닉."]),
 record("saitama",139.65,35.86,["Saitama","埼玉","埼玉","사이타마"],["clinic","3x3"],["Clinics and 3x3 programmes.","クリニック／3x3。","訓練營與3x3活動。","클리닉 및 3x3 프로그램."]),
 record("kazo",139.60,36.13,["Kazo · Saitama","埼玉・加須","埼玉・加須","사이타마・가조"],["3x3"],["3x3 basketball class.","3x3バスケットボール教室。","3x3籃球課程。","3x3 농구 교실."]),
 record("harayama",139.69,35.87,["Harayama · Saitama","埼玉・原山","埼玉・原山","사이타마・하라야마"],["clinic"],["Clinic at Harayama Junior High School.","原山中学校クリニック。","原山中學訓練營。","하라야마 중학교 클리닉."]),
 record("kozaki",140.41,35.90,["Kozaki · Chiba","千葉・神崎","千葉・神崎","지바・고자키"],["3x3"],["HBC wolves presents BACKBONE Chiba.","HBC wolvesプレゼンツ BACKBONE千葉。","HBC wolves主辦BACKBONE千葉。","HBC wolves 주최 BACKBONE 지바."]),
 record("kawasaki",139.70,35.53,["Kawasaki · Kanagawa","神奈川・川崎","神奈川・川崎","가나가와・가와사키"],["clinic"],["RBA clinic and U12 Development Camp.","クリニック／U12 DEVELOPMENT CAMP。","RBA訓練營與U12培育營。","RBA 클리닉 및 U12 Development Camp."]),
 record("takahama",136.99,34.93,["Takahama · Aichi","愛知・高浜","愛知・高濱","아이치・다카하마"],["clinic"],["RBA Summer Clinic in Takahama.","SUMMER CLINIC in 高浜。","高濱夏季訓練營。","다카하마 Summer Clinic."]),
 record("toyota",137.16,35.08,["Toyota · Aichi","愛知・豊田","愛知・豐田","아이치・도요타"],["clinic","3x3"],["Aichi clinic and BACKBONE.","愛知クリニック／BACKBONE。","愛知訓練營與BACKBONE。","아이치 클리닉 및 BACKBONE."]),
 record("ise",136.73,34.49,["Ise · Mie","三重・伊勢","三重・伊勢","미에・이세"],["clinic","3x3"],["BACKBONE 3x3 × RBA Ise Clinic.","BACKBONE 3x3 × RBA伊勢クリニック。","BACKBONE 3x3 × RBA伊勢訓練營。","BACKBONE 3x3 × RBA 이세 클리닉."]),
 record("osaka",135.50,34.69,["Osaka","大阪","大阪","오사카"],["clinic"],["RBA Osaka Clinic.","大阪クリニック。","大阪RBA訓練營。","오사카 RBA 클리닉."]),
 record("kobe",135.20,34.69,["Kobe · Hyogo","兵庫・神戸","兵庫・神戶","효고・고베"],["clinic","3x3"],["U15 clinic and BACKBONE Kobe.","U15クリニック／BACKBONE in 神戸。","U15訓練營與BACKBONE神戶。","U15 클리닉 및 BACKBONE 고베."]),
 record("saga",130.30,33.25,["Saga","佐賀","佐賀","사가"],["clinic","camp"],["2DAYS CAMP and clinics.","2DAYS CAMP／クリニック。","兩日培育營與訓練營。","2DAYS CAMP 및 클리닉."]),
 record("okawa",130.38,33.21,["Okawa · Fukuoka","福岡・大川","福岡・大川","후쿠오카・오카와"],["camp"],["Saga × Okawa 2DAYS DEVELOPMENT CAMP.","佐賀・大川 2DAYS DEVELOPMENT CAMP。","佐賀・大川兩日培育營。","사가・오카와 2DAYS DEVELOPMENT CAMP."]),
 record("okinawa",127.81,26.33,["Okinawa City","沖縄市","沖繩市","오키나와시"],["clinic"],["RBA Basketball Clinic.","沖縄市開催クリニック。","沖繩市RBA訓練營。","오키나와시 RBA 클리닉."]),
 record("tomigusuku",127.67,26.16,["Tomigusuku · Okinawa","沖縄・豊見城","沖繩・豐見城","오키나와・도미구스쿠"],["clinic"],["RBA Tomigusuku Clinic.","沖縄豊見城クリニック。","沖繩豐見城訓練營。","도미구스쿠 RBA 클리닉."]),
 record("itoman",127.67,26.12,["Itoman · Okinawa","沖縄・糸満","沖繩・糸滿","오키나와・이토만"],["3x3"],["BACKBONE 3x3 Chapter Round 1.","BACKBONE 3x3 CHAPTER Round1。","BACKBONE 3x3 CHAPTER Round1。","BACKBONE 3x3 CHAPTER Round1."]),
 record("ishigaki",124.16,24.34,["Ishigaki Island","石垣島","石垣島","이시가키섬"],["clinic","camp"],["Clinics and camps on Ishigaki Island.","石垣島クリニック／キャンプ。","石垣島訓練營與培育營。","이시가키섬 클리닉 및 캠프."]),
 record("nanjo",127.77,26.16,["Nanjo · Okinawa","沖縄・南城","沖繩・南城","오키나와・난조"],["camp"],["On-ball defence specialised camp.","オンボールディフェンス特化キャンプ。","持球防守專項培育營。","온볼 디펜스 특화 캠프."]),
];
export const plannedJapanPoints:MapPoint[]=[
 {id:"yamagata-planned",lon:140.34,lat:38.25,name:["Yamagata · planned","山形・開催予定","山形・預定活動","야마가타・개최 예정"],status:"planned",activities:["clinic"],detail:["1Day Clinic planned for 24 October 2026; not included in the 25-location record.","2026年10月24日1Day Clinic予定。実績25地点には未算入。","預定2026年10月24日一日訓練營；不計入25個活動地點。","2026년 10월 24일 1Day Clinic 예정. 25개 활동 실적에는 미포함."]},
 {id:"tatsuno-planned",lon:134.55,lat:34.86,name:["Tatsuno · Hyogo · planned","兵庫・たつの・開催予定","兵庫・龍野・預定活動","효고・다쓰노・개최 예정"],status:"planned",activities:["camp"],detail:["Development Camp planned for 20–23 November 2026; not included in the 25-location record.","2026年11月20〜23日 Development Camp予定。実績25地点には未算入。","預定2026年11月20日至23日舉辦培育營；不計入25個活動地點。","2026년 11월 20~23일 Development Camp 예정. 25개 활동 실적에는 미포함."]}
];
export const worldPoints:MapPoint[]=[
 {id:"taiwan",lon:121.56,lat:25.08,name:["Taipei · Taiwan","台湾・台北","台灣・台北","대만・타이베이"],status:"partner",detail:["Spartan Academy · verified youth basketball collaboration.","Spartan Academy。確認済みの育成年代連携。","Spartan Academy；已確認的青少年籃球合作。","Spartan Academy. 확인된 유소년 농구 협력."]},
 {id:"malaysia",lon:101.69,lat:3.14,name:["Malaysia","マレーシア","馬來西亞","말레이시아"],status:"discussion",detail:["MVP Basketball Academy · curriculum, technical-advisor and event collaboration discussions.","MVP Basketball Academy。カリキュラム、技術アドバイザー、イベント連携を協議中。","MVP Basketball Academy；正洽談課程、技術顧問與活動合作。","MVP Basketball Academy. 커리큘럼, 기술 자문과 이벤트 협력 협의 중."]},
 {id:"indonesia",lon:106.85,lat:-6.21,name:["Indonesia","インドネシア","印尼","인도네시아"],status:"discussion",detail:["AirOne Basketball Club · initial online meeting completed.","AirOne Basketball Club。初回オンライン面談を実施。","AirOne Basketball Club；已完成首次線上會談。","AirOne Basketball Club. 첫 온라인 미팅 완료."]},
 {id:"korea",lon:126.98,lat:37.57,name:["South Korea","韓国","韓國","대한민국"],status:"discussion",detail:["HIGH RAISE and PLAYGROUND · coach and youth-development relationship discussions.","HIGH RAISE、PLAYGROUND。指導者・育成年代の連携を協議。","HIGH RAISE、PLAYGROUND；洽談教練與青少年培育合作。","HIGH RAISE, PLAYGROUND. 코치 및 유소년 육성 협력 협의 중."]},
 {id:"philippines",lon:120.98,lat:14.60,name:["Philippines","フィリピン","菲律賓","필리핀"],status:"discussion",detail:["Youth basketball representatives · exchange discussions started.","育成年代バスケットボール関係者と交流協議を開始。","已與青少年籃球相關人士展開交流討論。","유소년 농구 관계자와 교류 협의 시작."]},
 {id:"guam",lon:144.79,lat:13.44,name:["Guam","グアム","關島","괌"],status:"discussion",detail:["Basketball representative contact · relationship and meeting discussions.","現地バスケットボール関係者と面談・連携を協議。","正與當地籃球相關人士洽談會面與合作。","현지 농구 관계자와 미팅 및 협력 협의 중."]},
];
