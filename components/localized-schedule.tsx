import { ui } from "./ui-copy";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Locale, SiteFrame, localePath } from "@/components/site-frame";
import { programmes } from "@/components/programme-data";
import { tr } from "@/components/network-data";


const copy={
  en:{kicker:"PROGRAMME CALENDAR",title:["Find the next","RBA programme."],intro:"Upcoming clinics, camps and development projects. Select an event to open its official information or application page.",list:"Upcoming programmes",desc:"Final details, availability, fees and eligibility are always confirmed on the linked official form.",target:"For",payment:"Payment",apply:"Official application",pay:"Payment after applying",notice:"Receive programme updates",noticeCopy:"Add RBA on LINE to receive new programme announcements and application information.",line:"Open RBA on LINE",back:"Return to RBA"},
  ja:{kicker:"クリニック・イベント日程",title:["次に参加したいRBAの活動を","見つける。"],intro:"クリニック、キャンプ、育成プログラムの開催予定をまとめています。対象年代、参加費、決済方法を確認し、そのまま各イベントの公式申込ページへ進めます。",list:"開催予定",desc:"募集状況、参加費に含まれる内容、キャンセル条件は、リンク先の公式フォームでご確認ください。",target:"対象",payment:"決済方法",apply:"公式申込ページへ",pay:"申込後の決済へ",notice:"新しい開催情報を受け取る",noticeCopy:"RBA公式LINEでは、新しいクリニックの開催情報や募集開始のお知らせを受け取れます。",line:"公式LINEを開く",back:"RBAトップへ"},
  "zh-tw":{kicker:"活動日程",title:["找到下一場","RBA活動。"],intro:"以下為近期訓練營與青少年培育活動。選擇活動即可前往官方資訊或報名頁面。",list:"近期活動",desc:"活動內容、剩餘名額、費用與參加資格，請以連結中的官方表單為準。",target:"對象",payment:"付款",apply:"官方報名頁",pay:"報名後付款",notice:"接收活動通知",noticeCopy:"加入RBA官方LINE，取得新活動與開放報名資訊。",line:"前往RBA官方LINE",back:"返回RBA首頁"},
  ko:{kicker:"프로그램 일정",title:["다음 RBA 프로그램을","확인하세요."],intro:"RBA의 클리닉, 캠프 및 유소년 육성 프로그램 일정입니다. 프로그램을 선택하면 공식 정보 또는 신청 페이지로 이동합니다.",list:"예정 프로그램",desc:"최종 내용, 잔여 인원, 참가비 및 조건은 연결된 공식 신청서를 확인해 주세요.",target:"대상",payment:"결제",apply:"공식 신청 페이지",pay:"신청 후 결제",notice:"프로그램 소식 받기",noticeCopy:"RBA 공식 LINE에서 새로운 프로그램 및 신청 소식을 확인할 수 있습니다.",line:"RBA 공식 LINE 열기",back:"RBA 홈으로"}
} as const;


export function LocalizedSchedule({locale}:{locale:Locale}){
  const c=copy[locale];
  return <div lang={locale==="zh-tw"?"zh-Hant-TW":locale}><SiteFrame locale={locale} languagePage="schedule">
    <section className="inner-hero section-pad"><a className="back-link" href={localePath(locale)}>← RBA</a><p className="section-index">{c.kicker}</p><h1>{c.title[0]}<br/>{c.title[1]}</h1><p>{c.intro}</p></section>
    {locale==="ja"?<section className="homecourt-bridge section-pad"><div><p className="section-index inverse">RBA ID / ONE ID</p><h2>参加前の準備から、参加後の振り返りまで。</h2><p>RBA IDを作ると、気になる活動の保存、参加履歴、Basketball Passport、次のおすすめをMY HOME COURTでまとめて確認できます。以前RBAに参加した方も、同じRBA IDから利用できます。</p></div><a className="button button-light" href="/ja/my-homecourt/login?next=%2Fja%2Fopportunities">無料でRBA IDをつくる →</a></section>:null}
    {locale==="ja"?<section className="registration-flow section-pad">
      <div><p className="section-index inverse">BEFORE YOU JOIN</p><h2>参加する前に、ひとつ準備しておく。</h2><p>当日を迎える前に、「どんなプレーを試したいか」「何を持ち帰りたいか」を一つ決めておくと、学びがより明確になります。</p></div>
      <div className="registration-flow-steps">
        <article><span>01</span><strong>CHOOSE</strong><p>参加してみたい活動を選ぶ。</p></article>
        <article><span>02</span><strong>IMAGINE</strong><p>当日やってみたいプレーを一つ決める。</p></article>
        <article><span>03</span><strong>CHALLENGE</strong><p>うまくいくかより、まず試してみる。</p></article>
        <article><span>04</span><strong>KEEP</strong><p>参加後はMY HOME COURTに経験を記録する。</p></article>
      </div>
    </section>:null}
    <section className="event-list section-pad"><div className="section-head"><div><p className="section-index"><CalendarDays size={15}/> {c.list}</p><h2>{c.list}</h2></div><p>{c.desc}</p></div>{programmes.filter(event=>!event.registrationClosed).map((event)=><article key={event.id}><time dateTime={event.startDate}><strong>{tr(event.datePrimary,locale)}</strong><span>{tr(event.dateSecondary,locale)}</span></time><div><p className="note-tag">{tr(event.place,locale)}</p><h3>{tr(event.title,locale)}</h3><p><strong>{c.target}：</strong>{tr(event.audience,locale)}</p><p className="event-price">{tr(event.price,locale)}</p><p className="event-payment"><strong>{c.payment}：</strong>{tr(event.payment,locale)}</p></div><div className="event-actions"><a href={event.applicationUrl} target="_blank" rel="noreferrer">{locale==="ja"?"このコートに参加する":c.apply}<ArrowUpRight size={17}/></a><a href={`${localePath(locale,"payments")}#${event.id}`}>{c.pay}<ArrowUpRight size={17}/></a></div></article>)}</section>
    <section className="calendar-notice section-pad"><div><h2>{c.notice}</h2><p>{c.noticeCopy}</p></div><a className="button button-light" href="https://lin.ee/5l1YG8N" target="_blank" rel="noreferrer">{c.line}<ArrowUpRight size={17}/></a></section>
    <section className="next-page section-pad"><p>{ui(locale,"continue")}</p><a href={localePath(locale)}>{c.back}<span>→</span></a></section>
  </SiteFrame></div>;
}
