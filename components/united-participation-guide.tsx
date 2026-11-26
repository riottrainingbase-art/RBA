import { ArrowRight, CalendarDays, CheckCircle2, Users } from "lucide-react";
import { localePath, type Locale } from "./site-frame";

const copy = {
  ja: {title:"個人参加までの道のり", intro:"今の所属チームを続けながら、企画ごとに参加できます。保護者と一緒に条件を確認しましょう。", steps:["対象年代・日程・会場・総費用を確認","公式窓口で参加意向または正式申込。意向登録だけでは参加確定になりません。","RBAからの正式案内・支払条件を確認。確定前に返金不可の交通・宿泊を予約しない。","参加後はできたこと、次に試すことを記録する。"], upcoming:"参加意向受付中（開催条件調整中）", kobe:"神戸・男子U14 国際交流｜2027年1月", kobeDetail:"個人参加と選抜プログラムは別です。会場、選考、最終費用は正式案内を確認してください。", details:"公式企画詳細を見る", lang:"日本語の企画詳細", prepare:"参加前：カレンダーで準備", reflect:"参加後：経験を記録", report:"PLUS育成レポート", ask:"参加条件をRBAに相談", note:"MY HOME COURTの月会費と、UNITEDの企画参加費は別です。会員登録だけで出場枠は確保されません。", memberTitle:"今のチームのまま、次の挑戦へ", memberBody:"参加意向・正式申込の違い、費用、準備と振り返りを確認できます。", memberCta:"UNITED参加ガイドへ"},
  en: {title:"Your route to individual participation", intro:"Keep your home team and join individual programmes. Review the conditions with a guardian.", steps:["Check age eligibility, dates, venue and total cost.","Use the official channel to express interest or apply. Interest is not a confirmed place.","Wait for official confirmation and payment terms; avoid non-refundable travel bookings before confirmation.","Record what went well and what to try next."], upcoming:"Interest registration (conditions pending)", kobe:"Kobe boys U14 international exchange | January 2027", kobeDetail:"General participation and the selected programme are separate. Check official confirmation for venue, selection and final fees.", details:"View official programme details", lang:"Programme details in Japanese", prepare:"Before: plan in your calendar", reflect:"After: record your experience", report:"PLUS development report", ask:"Ask RBA about eligibility", note:"MY HOME COURT subscription and UNITED programme fees are separate. Membership does not reserve a place.", memberTitle:"Keep your team. Find your next challenge.", memberBody:"Check the difference between interest and confirmed applications, costs, preparation and reflection.", memberCta:"Open UNITED participation guide"},
  "zh-tw": {title:"個人參加流程", intro:"保留原所屬球隊，依活動個別參加。請與家長一起確認條件。", steps:["確認年齡資格、日期、場地及總費用。","透過官方管道登記意願或正式報名。意願登記並不代表取得名額。","等待正式通知及付款條件；確認前請勿預訂不可退款的交通或住宿。","活動後記錄成長及下次想嘗試的目標。"], upcoming:"開放意願登記（條件協調中）", kobe:"神戶男子 U14 國際交流｜2027年1月", kobeDetail:"一般個人參加與選拔方案不同。場地、選拔及最終費用以正式通知為準。", details:"查看官方活動詳情", lang:"日文活動詳情", prepare:"參加前：行事曆準備", reflect:"參加後：記錄經驗", report:"PLUS 成長報告", ask:"向 RBA 詢問參加條件", note:"MY HOME COURT 月費與 UNITED 活動費用分開計算，會員資格不保證參加名額。", memberTitle:"保留原球隊，迎接下一個挑戰", memberBody:"確認意願登記、正式報名、費用與參加前後的準備。", memberCta:"開啟 UNITED 參加指南"},
  ko: {title:"개인 참가 절차", intro:"기존 소속팀을 유지하며 프로그램별로 참가할 수 있습니다. 보호자와 조건을 확인하세요.", steps:["연령 자격, 일정, 장소, 총비용을 확인하세요.","공식 창구에서 참가 의향 또는 정식 신청을 제출하세요. 의향 등록은 참가 확정이 아닙니다.","공식 안내와 결제 조건을 확인하고 확정 전 환불 불가 교통·숙박 예약을 피하세요.","참가 후 잘한 점과 다음 도전 목표를 기록하세요."], upcoming:"참가 의향 접수 중 (조건 조율 중)", kobe:"고베 남자 U14 국제교류 | 2027년 1월", kobeDetail:"일반 개인 참가와 선발 프로그램은 별개입니다. 장소, 선발 및 최종 비용은 공식 안내를 확인하세요.", details:"공식 프로그램 상세 보기", lang:"일본어 프로그램 상세", prepare:"참가 전: 캘린더 준비", reflect:"참가 후: 경험 기록", report:"PLUS 성장 리포트", ask:"RBA에 참가 조건 문의", note:"MY HOME COURT 월 구독료와 UNITED 참가비는 별도입니다. 회원 가입만으로 참가 자리가 보장되지 않습니다.", memberTitle:"소속팀은 그대로, 다음 도전으로", memberBody:"참가 의향과 정식 신청, 비용, 준비 및 회고를 확인하세요.", memberCta:"UNITED 참가 가이드 열기"},
} as const;

export function UnitedMemberEntry({locale}:{locale:Locale}) {
  const c=copy[locale];
  return <section className="member-next-step"><div><Users/><span>RBA UNITED / INDIVIDUAL PARTICIPATION</span><strong>{c.memberTitle}</strong><p>{c.memberBody}</p></div><a href={`${localePath(locale,"united")}#united-participation`}>{c.memberCta}<ArrowRight/></a></section>;
}

export function UnitedParticipationGuide({locale, now=new Date()}:{locale:Locale;now?:Date}) {
  const c=copy[locale];
  const app=`${localePath(locale,"my-homecourt")}/app`;
  const showKobe=now < new Date("2027-01-05T00:00:00+09:00");
  const reflectionNote={ja:"",en:"On the member home, use Reflect on today and download your note. It is not automatically saved to your account.","zh-tw":"在會員首頁開啟今天的回顧並下載筆記。筆記不會自動儲存至帳戶。",ko:"회원 홈에서 오늘의 돌아보기를 열고 메모를 다운로드하세요. 계정에 자동 저장되지 않습니다."}[locale];
  return <section id="united-participation" className="homecourt-product-preview section-pad">
    <div className="section-head"><div><p className="section-index">UNITED / HOW TO JOIN</p><h2>{c.title}</h2></div><p>{c.intro}</p></div>
    {showKobe?<article className="homecourt-plan-card"><span>{c.upcoming}</span><h3>{c.kobe}</h3><p>{c.kobeDetail}</p><a className="button button-dark" href="/ja/events/kobe-boys-u14-exchange-2027" hrefLang="ja">{c.details}<ArrowRight/></a>{locale!=="ja"?<p>{c.lang}</p>:null}</article>:null}
    <div className="homecourt-preview-grid">{c.steps.map((step,index)=><article key={step}><CheckCircle2/><span>0{index+1}</span><p>{step}</p></article>)}</div>
    <p className="registration-note">{c.note}</p>
    <div className="homecourt-launch-actions"><a className="button button-light" href={localePath(locale,"contact")}>{c.ask}<ArrowRight/></a><a className="button button-dark" href={`${app}/calendar`}><CalendarDays/>{c.prepare}<ArrowRight/></a><a className="button button-dark" href={locale==="ja"?`${app}/start`:`${app}#member-reflection`}>{c.reflect}<ArrowRight/></a><a className="button button-light" href={`${app}/report`}>{c.report}<ArrowRight/></a></div>
    {reflectionNote?<p className="registration-note">{reflectionNote}</p>:null}
  </section>;
}
