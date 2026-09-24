import type { Metadata } from "next";
import { Locale, LanguagePage, localePath } from "./site-frame";
const titles:Record<string,Record<Locale,string>>={
 players:{en:"For players",ja:"選手の方へ","zh-tw":"球員專區",ko:"선수 안내"},
 families:{en:"For families",ja:"保護者の方へ","zh-tw":"家長專區",ko:"보호자 안내"},
 coaches:{en:"For coaches",ja:"コーチ・指導者の方へ","zh-tw":"教練專區",ko:"코치·지도자 안내"},
 "home-court":{en:"RBA HOMECOURT membership",ja:"RBA HOMECOURT｜会員案内","zh-tw":"RBA HOMECOURT會員",ko:"RBA HOMECOURT 회원"},
 "my-homecourt":{en:"MY HOME COURT",ja:"MY HOME COURT","zh-tw":"MY HOME COURT",ko:"MY HOME COURT"},
 community:{en:"RBA community",ja:"RBAコミュニティ","zh-tw":"RBA社群",ko:"RBA 커뮤니티"},
 impact:{en:"RBA IMPACT",ja:"RBA IMPACT｜成果と再投資方針","zh-tw":"RBA IMPACT",ko:"RBA IMPACT"},
 "d-hub":{en:"D-HUB｜Selection and high performance",ja:"D-HUB｜選抜・強化","zh-tw":"D-HUB｜選拔・強化",ko:"D-HUB｜선발·강화"},
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
export function pageMetadata(locale:Locale,page:LanguagePage):Metadata {
 const title=titles[page][locale];
 const description=page==="events/torsten-loibl-online-clinic"
  ? ({en:"25 November 2026, 20:00 JST on Zoom. Torsten Loibl on shooter development, shooting programme design and high-percentage shots. Live ¥3,300; 30-day on-demand ¥4,400.",ja:"2026年11月25日20:00、Zoom開催。トーステン・ロイブル氏から、シューターの育成、シュート練習の設計、確率の高いシュートを生み出す戦略を学ぶ90分。ライブ参加3,300円、30日間オンデマンド4,400円。","zh-tw":"2026年11月25日日本時間20:00線上舉行。Torsten Loibl分享射手培養、投籃訓練設計與創造高命中率機會。直播3,300日圓，30天隨選4,400日圓。",ko:"2026년 11월 25일 20:00(JST) Zoom 진행. Torsten Loibl에게 슈터 육성, 슈팅 프로그램 설계와 높은 확률의 슛을 만드는 전략을 배우는 90분. 라이브 3,300엔, 30일 다시보기 4,400엔."})[locale]
  : page==="payments"
    ? ({en:"Official RBA programme application forms and secure Stripe payment pages.",ja:"RBAの各プログラムの公式申込フォームとStripe決済ページです。","zh-tw":"RBA各項活動的官方報名表與安全Stripe付款頁面。",ko:"RBA 프로그램의 공식 신청서와 안전한 Stripe 결제 페이지입니다."})[locale]
    : ({en:`${title}: programmes, information and enquiries at Riot Basketball Academy.`,ja:`Riot Basketball Academyの${title}に関する情報をご案内します。`,"zh-tw":`${title}。Riot Basketball Academy活動資訊與洽詢。`,ko:`${title}. Riot Basketball Academy의 프로그램 안내와 문의.`})[locale];
 return {title,description,twitter:{card:"summary_large_image",title,description,images:["/rba-court-hero.png"]},alternates:{canonical:localePath(locale,page),languages:{en:localePath("en",page),ja:localePath("ja",page),"zh-Hant-TW":localePath("zh-tw",page),ko:localePath("ko",page),"x-default":localePath("en",page)}},openGraph:{title,description,images:["/rba-court-hero.png"],url:localePath(locale,page),siteName:"Riot Basketball Academy",locale:{en:"en_US",ja:"ja_JP","zh-tw":"zh_TW",ko:"ko_KR"}[locale],type:"website"}};
}