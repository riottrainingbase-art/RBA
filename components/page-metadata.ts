import type { Metadata } from "next";
import { Locale, LanguagePage, localePath } from "./site-frame";
const titles:Record<string,Record<Locale,string>>={
 players:{en:"For players",ja:"選手の方へ","zh-tw":"球員專區",ko:"선수 안내"},
 families:{en:"For families",ja:"保護者の方へ","zh-tw":"家長專區",ko:"보호자 안내"},
 coaches:{en:"For coaches",ja:"コーチ・指導者の方へ","zh-tw":"教練專區",ko:"코치·지도자 안내"},
 "home-court":{en:"MY HOME COURT",ja:"MY HOME COURT｜利用案内","zh-tw":"MY HOME COURT","ko":"MY HOME COURT"},
 "my-homecourt":{en:"MY HOME COURT",ja:"MY HOME COURT","zh-tw":"MY HOME COURT",ko:"MY HOME COURT"},
 community:{en:"RBA community",ja:"RBAコミュニティ","zh-tw":"RBA社群",ko:"RBA 커뮤니티"},
 impact:{en:"RBA IMPACT",ja:"RBA IMPACT｜成果と再投資方針","zh-tw":"RBA IMPACT",ko:"RBA IMPACT"},
 "d-hub":{en:"D-HUB｜Coach development",ja:"D-HUB｜指導者育成","zh-tw":"D-HUB｜教練培育",ko:"D-HUB｜코치 교육"},
 united:{en:"RBA UNITED",ja:"RBA UNITED｜個人参加型チーム","zh-tw":"RBA UNITED",ko:"RBA UNITED"},
 connect:{en:"RBA CONNECT",ja:"RBA CONNECT｜国内・国際ネットワーク","zh-tw":"RBA CONNECT",ko:"RBA CONNECT"},
 organizer:{en:"ORGANIZER HOME",ja:"大会・イベント主催者の方へ","zh-tw":"主辦單位專區",ko:"대회·이벤트 주최자 안내"},
 about:{en:"About RBA",ja:"RBAについて","zh-tw":"關於RBA",ko:"RBA 소개"},
 approach:{en:"Development approach",ja:"育成方針","zh-tw":"培育理念",ko:"육성 철학"},
 schedule:{en:"Programme calendar",ja:"開催日程","zh-tw":"活動日程",ko:"프로그램 일정"},
 payments:{en:"Official registration and payment",ja:"公式申込・決済","zh-tw":"官方報名與付款",ko:"공식 신청·결제"},
 "clinic-request":{en:"Clinic request",ja:"クリニック開催のご相談","zh-tw":"訓練營邀約",ko:"클리닉 요청"},
 asia:{en:"Japan–Asia exchange",ja:"海外連携","zh-tw":"日本交流",ko:"일본 교류"},
 partners:{en:"Partners",ja:"協賛・連携","zh-tw":"合作夥伴",ko:"파트너십"},
 contact:{en:"Contact RBA",ja:"お問い合わせ","zh-tw":"聯絡RBA",ko:"RBA 문의"},
 social:{en:"Official channels",ja:"公式チャンネル","zh-tw":"官方平台",ko:"공식 채널"},
 policies:{en:"Privacy, terms and safety policies",ja:"プライバシー・参加規約・安全方針","zh-tw":"隱私、條款與安全政策",ko:"개인정보, 약관 및 안전 정책"},
 "events/torsten-loibl-online-clinic":{en:"Torsten Loibl Online Clinic · 25 November 2026",ja:"トーステン・ロイブル講習｜2026年11月25日","zh-tw":"Torsten Loibl 線上講座｜2026年11月25日",ko:"Torsten Loibl 온라인 클리닉｜2026년 11월 25일"},
};
const descriptions:Partial<Record<LanguagePage,Record<Locale,string>>>={
 "my-homecourt":{
  en:"MY HOME COURT brings schedules, applications, participation history, Basketball Passport, photos, film and next opportunities together under one RBA ID.",
  ja:"MY HOME COURTは、所属チーム、これまでの経験、次に参加できる育成機会、Development Camp、RBA UNITED、国内外の選択肢を、一つのRBA IDでつなぐ自分専用の育成ページです。",
  "zh-tw":"MY HOME COURT以一個RBA ID整合行程、報名、參與紀錄、Basketball Passport、照片影片與下一個培育機會。",
  ko:"MY HOME COURT는 일정, 신청, 참가 기록, Basketball Passport, 사진·영상과 다음 성장 기회를 하나의 RBA ID로 연결합니다."
 },
 coaches:{
  en:"Coach development at RBA: D-HUB weekly learning, Torsten Loibl Online Clinic, practice design, LTAD, S&C and international coach exchange.",
  ja:"D-HUBの継続学習、トーステン・ロイブル氏の講習、練習設計、長期育成、S&C、国際交流をつなぐRBAの指導者向け学習環境です。",
  "zh-tw":"連結D-HUB持續學習、Torsten Loibl線上講座、訓練設計、LTAD、S&C與國際交流的RBA教練培育。",
  ko:"D-HUB 지속 학습, Torsten Loibl 온라인 클리닉, 훈련 설계, LTAD, S&C와 국제 교류를 연결하는 RBA 코치 교육."
 },
 "d-hub":{
  en:"D-HUB is RBA's continuous coach-development programme: 48 sessions a year connecting short online learning, court practice and reflection.",
  ja:"D-HUBは年間48回。短時間のオンライン学習、現場での実践、振り返りをつなぐRBAの継続型指導者育成プログラムです。",
  "zh-tw":"D-HUB全年48次，連結短時間線上學習、場上實踐與反思，是RBA的持續性教練培育計畫。",
  ko:"D-HUB는 연간 48회, 짧은 온라인 학습과 현장 실천·성찰을 연결하는 RBA의 지속형 코치 교육 프로그램입니다."
 },
 schedule:{
  en:"Find current RBA clinics, camps, 3x3, games, coach education and international opportunities by date, place and audience.",
  ja:"募集中のクリニック、キャンプ、3x3、ゲーム、指導者講習、海外交流を、日程・地域・対象から探せます。",
  "zh-tw":"依日期、地區與對象尋找RBA正在招募的訓練營、營隊、3x3、比賽、教練課程與國際交流。",
  ko:"모집 중인 클리닉, 캠프, 3x3, 경기, 코치 교육과 국제 교류를 일정·지역·대상으로 찾을 수 있습니다."
 },
 payments:{
  en:"Official RBA programme application forms, payment guidance and the Stripe billing portal for existing members.",
  ja:"RBA各プログラムの公式申込フォーム、お支払い案内、契約中の方のStripe請求ポータルをまとめています。",
  "zh-tw":"彙整RBA各項活動的官方報名表、付款指南與既有會員的Stripe帳單入口。",
  ko:"RBA 프로그램 공식 신청서, 결제 안내와 기존 회원용 Stripe 청구 포털을 한곳에서 확인할 수 있습니다."
 }
};
export function pageMetadata(locale:Locale,page:LanguagePage):Metadata {
 const title=titles[page][locale];
 const description=descriptions[page]?.[locale] ?? (page==="events/torsten-loibl-online-clinic"
  ? ({en:"25 November 2026, 20:00 JST on Zoom. Torsten Loibl on shooter development, shooting programme design and high-percentage shots. Live ¥3,300; 30-day on-demand ¥4,400.",ja:"2026年11月25日20:00、Zoom開催。トーステン・ロイブル氏から、シューターの育成、シュート練習の設計、確率の高いシュートを生み出す戦略を学ぶ90分。ライブ参加3,300円、30日間オンデマンド4,400円。","zh-tw":"2026年11月25日日本時間20:00線上舉行。Torsten Loibl分享射手培養、投籃訓練設計與創造高命中率機會。直播3,300日圓，30天隨選4,400日圓。",ko:"2026년 11월 25일 20:00(JST) Zoom 진행. Torsten Loibl에게 슈터 육성, 슈팅 프로그램 설계와 높은 확률의 슛을 만드는 전략을 배우는 90분. 라이브 3,300엔, 30일 다시보기 4,400엔."})[locale]
  : page==="payments"
    ? ({en:"Official RBA programme application forms and secure Stripe payment pages.",ja:"RBAの各プログラムの公式申込フォームとStripe決済ページです。","zh-tw":"RBA各項活動的官方報名表與安全Stripe付款頁面。",ko:"RBA 프로그램의 공식 신청서와 안전한 Stripe 결제 페이지입니다."})[locale]
    : ({en:`${title}: programmes, information and enquiries at Riot Basketball Academy.`,ja:`Riot Basketball Academyの${title}に関する情報をご案内します。`,"zh-tw":`${title}。Riot Basketball Academy活動資訊與洽詢。`,ko:`${title}. Riot Basketball Academy의 프로그램 안내와 문의.`})[locale]);
 return {title,description,twitter:{card:"summary_large_image",title,description,images:["/rba-court-hero.png"]},alternates:{canonical:localePath(locale,page),languages:{en:localePath("en",page),ja:localePath("ja",page),"zh-Hant-TW":localePath("zh-tw",page),ko:localePath("ko",page),"x-default":localePath("en",page)}},openGraph:{title,description,images:["/rba-court-hero.png"],url:localePath(locale,page),siteName:"Riot Basketball Academy",locale:{en:"en_US",ja:"ja_JP","zh-tw":"zh_TW",ko:"ko_KR"}[locale],type:"website"}};
}


export function homecourtRoleMetadata(locale:Locale,role:"players"|"families"|"coaches"):Metadata {
 const prefix=locale==="en"?"":`/${locale}`;
 const path=`${prefix}/my-homecourt/${role}`;
 const data={
  players:{
   en:{title:"MY HOME COURT for Players",description:"A personal basketball home for players: see your team location, keep experiences, discover Development Camps and RBA UNITED, and expand from Japan to Asia and the world."},
   ja:{title:"選手のMY HOME COURT｜今いる場所から次の挑戦へ",description:"所属チーム、これまでの経験、次に参加できる育成機会、Development Camp、RBA UNITED、海外交流を一つにつなぐ選手向けMY HOME COURTです。"},
   "zh-tw":{title:"球員 MY HOME COURT｜從現在的位置走向世界",description:"把所屬球隊、參與經驗、下一個培育機會、Development Camp、RBA UNITED與國際交流連在一起。"},
   ko:{title:"선수 MY HOME COURT｜현재 위치에서 세계로",description:"소속팀, 경험 지역, 다음 성장 기회, Development Camp, RBA UNITED와 국제 교류를 하나로 연결하는 선수용 MY HOME COURT."}
  },
  families:{
   en:{title:"MY HOME COURT for Families",description:"A clearer development home for families: team environment, participation history, development articles, next opportunities and global pathways in one place."},
   ja:{title:"保護者のMY HOME COURT｜育成を考える情報を一つに",description:"チーム環境、参加履歴、育成記事、次の活動、全国や海外の選択肢を一つにつなぐ保護者向けMY HOME COURTです。"},
   "zh-tw":{title:"家長 MY HOME COURT｜把培育判斷集中在一處",description:"整合球隊環境、參與紀錄、培育文章、下一個活動與日本及海外的選擇。"},
   ko:{title:"보호자 MY HOME COURT｜성장 판단 자료를 한곳에",description:"팀 환경, 참가 이력, 성장 콘텐츠, 다음 활동과 일본·해외 선택지를 하나로 연결합니다."}
  },
  coaches:{
   en:{title:"MY HOME COURT for Coaches",description:"A coach development home connecting D-HUB, practice design, coach learning, team operations and international development perspectives."},
   ja:{title:"指導者のMY HOME COURT｜学びを日々の指導へ",description:"D-HUB、練習設計、指導者講習、TEAM HOME、育成記事、海外の育成事例を一つにつなぐ指導者向けMY HOME COURTです。"},
   "zh-tw":{title:"教練 MY HOME COURT｜連結學習與現場",description:"整合D-HUB、訓練設計、教練學習、TEAM HOME、培育文章與國際培育視角。"},
   ko:{title:"코치 MY HOME COURT｜배움과 현장을 연결",description:"D-HUB, 훈련 설계, 코치 교육, TEAM HOME, 성장 콘텐츠와 국제 육성 관점을 하나로 연결합니다."}
  }
 }[role][locale];
 return {
  title:data.title,
  description:data.description,
  alternates:{canonical:path,languages:{en:`/my-homecourt/${role}`,ja:`/ja/my-homecourt/${role}`,"zh-Hant-TW":`/zh-tw/my-homecourt/${role}`,ko:`/ko/my-homecourt/${role}`,"x-default":`/my-homecourt/${role}`}},
  openGraph:{title:data.title,description:data.description,url:path,siteName:"Riot Basketball Academy",type:"website",images:["/rba-court-hero.png"]},
  twitter:{card:"summary_large_image",title:data.title,description:data.description,images:["/rba-court-hero.png"]}
 };
}
