import { ArrowRight, ArrowUpRight, CheckCircle2, CreditCard, FileText, ShieldCheck } from "lucide-react";
import { HOMECOURT_BILLING_PORTAL } from "@/lib/homecourt-billing";
import { paymentEnquiryUrl } from "@/lib/payment-enquiry";
import { eventPayments, formatJPY } from "./payment-data";
import { Locale, localePath, SiteFrame } from "./site-frame";
import { programmeById } from "./programme-data";
import { homecourtFreeRegistrationUrl, HOMECOURT_PRICE_JPY } from "./homecourt-data";


const copy = {
  en:{kicker:"OFFICIAL REGISTRATION & PAYMENT",title:"Apply first. Pay securely.",intro:"Use the application form and Stripe payment page for the same programme and plan. Enter the same email address on both.",apply:"1. Application form",pay:"2. Secure payment",openForm:"Open application form",openPay:"Open Stripe payment",pending:"Fee and payment instructions are not yet published. Submit the form first; RBA will confirm the amount before requesting payment.",notice:"Before paying",points:["Submit one application per participant.","Check the programme, plan and amount shown by Stripe before paying.","A place is confirmed after payment or a written confirmation from RBA.","The cancellation terms in the application form or event notice take priority."],complete:"After payment, keep the Stripe receipt sent to your email address."},
  ja:{kicker:"公式申込・決済",title:"お申し込み後、安全な決済ページへ進めます。",intro:"参加する企画とプランをご確認のうえ、対応する申込フォームとStripe決済ページをご利用ください。申込時と決済時には、同じメールアドレスを入力してください。",apply:"1. 参加申込",pay:"2. Stripe決済",openForm:"申込フォームを開く",openPay:"Stripe決済ページを開く",pending:"参加費と決済方法は、まだ公開されていません。まず申込フォームを送信し、RBAから参加費の案内が届いてからお支払いください。",notice:"決済前に必ずご確認ください",points:["参加者1名につき、申込フォームを1件送信してください。","Stripe画面に表示される企画名、プラン、金額を確認してから決済してください。","決済完了、またはRBAからの受付完了の案内をもって参加が確定します。","キャンセル条件は、各申込フォームまたはイベント案内に記載された内容をご確認ください。"],complete:"決済後にStripeから届く支払い完了メールは、お申し込み内容を確認できるよう保管してください。"},
  "zh-tw":{kicker:"官方報名與付款",title:"先報名，再安全付款。",intro:"請使用同一活動、同一方案的報名表與Stripe付款頁，兩處填寫相同電子郵件。",apply:"1. 提交報名",pay:"2. Stripe付款",openForm:"開啟報名表",openPay:"開啟Stripe付款頁",pending:"費用與付款方式尚未公開。請先提交表單，收到RBA確認金額後再付款。",notice:"付款前請確認",points:["每位參加者提交一份表單。","付款前確認Stripe顯示的活動、方案與金額。","付款完成或收到RBA書面確認後，名額才算確定。","取消規定以各報名表或活動通知為準。"],complete:"請保留Stripe寄出的付款收據電子郵件。"},
  ko:{kicker:"공식 신청·결제",title:"먼저 신청하고 안전하게 결제하세요.",intro:"동일한 프로그램과 플랜의 신청서 및 Stripe 결제 페이지를 사용하고 같은 이메일 주소를 입력해 주세요.",apply:"1. 참가 신청",pay:"2. Stripe 결제",openForm:"신청서 열기",openPay:"Stripe 결제 페이지 열기",pending:"참가비와 결제 방법이 아직 공개되지 않았습니다. 신청서를 먼저 제출하고 RBA가 금액을 확인한 뒤 결제해 주세요.",notice:"결제 전 확인",points:["참가자 1명당 신청서 1건을 제출해 주세요.","Stripe 화면의 프로그램명, 플랜, 금액을 확인한 뒤 결제해 주세요.","결제 완료 또는 RBA의 서면 확인 후 참가가 확정됩니다.","취소 규정은 각 신청서 또는 행사 안내를 우선합니다."],complete:"결제 후 Stripe 영수증 이메일을 보관해 주세요."},
} as const;


const ids=["yaima","kawasaki","saga-fukuoka","yamagata","shizugawa","kobe","torsten"] as const;


export function LocalizedPayments({locale}:{locale:Locale}){
  const onlineCheckoutReady=process.env.RBA_AUTH_EMAIL_READY === "true";
  const paused={
    ja:{title:"参加のお申し込み・お支払いのご案内",intro:"各企画の申込フォームをご利用ください。現在、お支払い方法はRBAが個別にご案内しています。申込済みの方は、企画名と参加プランを添えてお問い合わせください。",pay:"お支払い方法を確認する"},
    en:{title:"Registration and payment guidance",intro:"Use the application form for your programme. RBA is currently providing payment instructions individually. If you have already applied, contact us with your programme and plan.",pay:"Ask about payment"},
    "zh-tw":{title:"報名與付款指南",intro:"請使用各活動的報名表。目前由 RBA 個別提供付款方式。已報名者請註明活動與方案並聯絡我們。",pay:"確認付款方式"},
    ko:{title:"참가 신청 및 결제 안내",intro:"각 프로그램의 신청서를 이용해 주세요. 현재 결제 방법은 RBA가 개별 안내하고 있습니다. 신청하신 분은 프로그램과 플랜을 적어 문의해 주세요.",pay:"결제 방법 문의"},
  } as const;
  const c=onlineCheckoutReady?copy[locale]:{...copy[locale],...paused[locale]};
  const homecourtCheckout=locale==="ja"?"/ja/my-homecourt/subscribe":`/api/commerce/checkout/homecourt-monthly?locale=${locale}`;
  return <SiteFrame locale={locale} languagePage="payments">
    <section className="inner-hero section-pad"><a className="back-link" href={localePath(locale,"schedule")}>← RBA</a><p className="section-index"><CreditCard size={15}/> {c.kicker}</p><h1>{c.title}</h1><p>{c.intro}</p></section>
    <section className="payment-notice section-pad"><div><ShieldCheck size={38}/><h2>{c.notice}</h2></div><ul>{c.points.map(x=><li key={x}><CheckCircle2 size={18}/>{x}</li>)}</ul><p>{c.complete}</p></section>
    <section className="homecourt-payment section-pad"><div><p className="section-index">RBA ID → MY HOME COURT</p><h2>{locale==="ja"?"次の挑戦につながる、自分だけのホームコート。":"Your next opportunity starts here."}</h2><p>{locale==="ja"?"活動情報、参加履歴、立場に合った学びをひとつに。クリニックで得た経験を、次の一歩へつなげます。":"Discover programmes, community routes and learning for players, families and coaches."}</p><a className="button button-member" href={homecourtFreeRegistrationUrl(locale)}>{locale==="ja"?"RBA IDで始める":"Explore RBA ID"}<ArrowRight size={16}/></a></div><div><span>{locale==="ja"?"MY HOME COURT メンバーシップ":"RBA HOMECOURT monthly"}</span><strong>{formatJPY(HOMECOURT_PRICE_JPY)}</strong><small>{locale==="ja"?(onlineCheckoutReady?"月額3,300円。内容をご確認のうえ、そのままStripeでお手続きいただけます。":"内容とお申し込み方法をRBAがご案内します。"):"Contact RBA to confirm the membership details and payment arrangements."}</small><a className="button button-orange" href={onlineCheckoutReady?homecourtCheckout:localePath(locale,"contact")}><CreditCard size={17}/>{onlineCheckoutReady?(locale==="ja"?"月額メンバーシップを始める":locale==="zh-tw"?"開始月費會員方案":locale==="ko"?"월간 멤버십 시작":"Start monthly membership"):(locale==="ja"?"メンバーシップについて相談する":locale==="zh-tw"?"諮詢會員方案":locale==="ko"?"멤버십 문의":"Ask about membership")}<ArrowRight size={16}/></a><a className="text-link" href={HOMECOURT_BILLING_PORTAL} target="_blank" rel="noopener noreferrer">{({ja:"契約中の方：カード変更・請求書・解約",en:"Members: card, invoices & cancellation","zh-tw":"已訂閱：信用卡、帳單與取消",ko:"구독 중: 카드·청구서·취소"})[locale]}<ArrowUpRight size={16}/></a><a className="text-link" href={localePath(locale,"home-court")}>{locale==="ja"?"MY HOME COURTを見る":"Compare membership"}<ArrowRight size={16}/></a></div></section>
    <section className="payment-event-list section-pad">{ids.filter(id=>!programmeById[id].registrationClosed).map(id=>{const p=programmeById[id];const options=eventPayments[id];return <article id={id} key={id}><div className="payment-event-head"><div><time>{p.date[locale==="en"?0:locale==="ja"?1:locale==="zh-tw"?2:3]}</time><h2>{p.title[locale==="en"?0:locale==="ja"?1:locale==="zh-tw"?2:3]}</h2><p>{p.place[locale==="en"?0:locale==="ja"?1:locale==="zh-tw"?2:3]}</p></div><a className="button button-dark" href={p.applicationUrl} target="_blank" rel="noreferrer"><FileText size={17}/>{c.openForm}<ArrowUpRight size={16}/></a></div><div className="payment-options"><p className="section-index">{c.pay}</p>{options.length?options.map(option=><a href={onlineCheckoutReady?`/api/commerce/checkout/${option.id}?locale=${locale}`:paymentEnquiryUrl(option.id,locale)} key={option.id}><span>{option.label}</span><strong>{formatJPY(option.amount)}<ArrowUpRight size={17}/></strong></a>):<p className="payment-pending">{c.pending}</p>}</div></article>})}</section>
    <section className="next-page section-pad"><p>{c.apply} → {c.pay}</p><a href={localePath(locale,"policies")}>{locale==="ja"?"参加規約・キャンセル方針を確認":"Terms and cancellation policy"}<ArrowRight size={24}/></a></section>
  </SiteFrame>;
}
