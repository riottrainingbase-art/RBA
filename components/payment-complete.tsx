import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { Locale, localePath, SiteFrame } from "./site-frame";


const copy={
 en:{k:"PAYMENT RECEIVED",t:"Thank you. Your payment is complete.",b:"Stripe will send a receipt to the email address used for payment. RBA will match it with your application and send programme details separately.",a:"Keep the Stripe receipt",d:"If the application and payment used different email addresses, contact RBA so we can match them.",back:"Return to programme calendar"},
 ja:{k:"決済完了",t:"お支払いありがとうございます。",b:"決済時に入力したメールアドレスへ、Stripeから支払い完了メールが届きます。RBAで申込情報との照合が完了した後、会場や参加方法などの詳細を別途ご案内します。",a:"Stripeから届く支払い完了メールを保管してください",d:"申込時と決済時で異なるメールアドレスを使用した場合は、情報を照合するためRBAへご連絡ください。",back:"開催日程へ戻る"},
 "zh-tw":{k:"付款完成",t:"謝謝，付款已完成。",b:"Stripe會將收據寄到付款時使用的電子郵件。RBA核對報名資料後，將另行通知活動詳情。",a:"請保留Stripe收據",d:"若報名與付款使用不同電子郵件，請聯絡RBA以便核對。",back:"返回活動日程"},
 ko:{k:"결제 완료",t:"결제가 완료되었습니다.",b:"Stripe 영수증이 결제 시 입력한 이메일로 발송됩니다. RBA가 신청 정보와 확인한 뒤 참가 세부 내용을 별도로 안내합니다.",a:"Stripe 영수증을 보관해 주세요",d:"신청과 결제에 다른 이메일을 사용했다면 RBA에 알려 주세요.",back:"프로그램 일정으로 돌아가기"},
} as const;


export function PaymentComplete({locale,paymentType}:{locale:Locale;paymentType?:string}){const c=copy[locale];const membership=paymentType==="rba_homecourt";const membershipCopy={
 en:{b:"Stripe will send a receipt to the email address used for payment. Your MY HOME COURT membership status is then matched to your RBA ID.",d:"Use the same email address as your RBA ID when possible. If you used a different address, contact RBA so the payment can be matched.",back:"Open MY HOME COURT"},
 ja:{b:"決済時に入力したメールアドレスへ、Stripeから支払い完了メールが届きます。決済情報の照合後、MY HOME COURTのメンバーシップ利用状況に反映されます。反映に少し時間がかかる場合があります。",d:"決済済みの場合は、反映待ちの間にもう一度支払わないでください。異なるメールアドレスで決済した場合や、しばらく反映されない場合はRBAへご連絡ください。",back:"MY HOME COURTを開く"},
 "zh-tw":{b:"Stripe會將付款完成郵件寄到付款時使用的電子郵件。核對付款資料後，會反映至MY HOME COURT的會員狀態。",d:"請盡量使用與RBA ID相同的電子郵件。若使用不同地址付款，請聯絡RBA協助核對。",back:"開啟MY HOME COURT"},
 ko:{b:"결제 시 입력한 이메일로 Stripe 결제 완료 메일이 발송됩니다. 결제 정보 확인 후 MY HOME COURT 멤버십 이용 상태에 반영됩니다.",d:"가능하면 RBA ID와 같은 이메일 주소를 사용해 주세요. 다른 주소로 결제했다면 확인을 위해 RBA에 문의해 주세요.",back:"MY HOME COURT 열기"}
}[locale];const body=membership?membershipCopy.b:c.b;const detail=membership?membershipCopy.d:c.d;const back=membership?membershipCopy.back:c.back;return <SiteFrame locale={locale} languagePage="payment-complete"><section className="payment-complete section-pad"><CheckCircle2 size={64}/><p className="section-index">{c.k}</p><h1>{c.t}</h1><p>{body}</p><div><Mail size={22}/><strong>{c.a}</strong><span>{detail}</span></div><a className="button button-orange" href={membership?(locale==="en"?"/my-homecourt/app":`/${locale}/my-homecourt/app`):localePath(locale,"schedule")}>{back}<ArrowRight size={17}/></a></section></SiteFrame>}
