import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { Locale, localePath, SiteFrame } from "./site-frame";


const copy={
 en:{k:"PAYMENT RECEIVED",t:"Thank you. Your payment is complete.",b:"Stripe will send a receipt to the email address used for payment. RBA will match it with your application and send programme details separately.",a:"Keep the Stripe receipt",d:"If the application and payment used different email addresses, contact RBA so we can match them.",back:"Return to programme calendar"},
 ja:{k:"決済完了",t:"お支払いありがとうございます。",b:"決済時に入力したメールアドレスへ、Stripeから支払い完了メールが届きます。RBAで申込情報との照合が完了した後、会場や参加方法などの詳細を別途ご案内します。",a:"Stripeから届く支払い完了メールを保管してください",d:"申込時と決済時で異なるメールアドレスを使用した場合は、情報を照合するためRBAへご連絡ください。",back:"開催日程へ戻る"},
 "zh-tw":{k:"付款完成",t:"謝謝，付款已完成。",b:"Stripe會將收據寄到付款時使用的電子郵件。RBA核對報名資料後，將另行通知活動詳情。",a:"請保留Stripe收據",d:"若報名與付款使用不同電子郵件，請聯絡RBA以便核對。",back:"返回活動日程"},
 ko:{k:"결제 완료",t:"결제가 완료되었습니다.",b:"Stripe 영수증이 결제 시 입력한 이메일로 발송됩니다. RBA가 신청 정보와 확인한 뒤 참가 세부 내용을 별도로 안내합니다.",a:"Stripe 영수증을 보관해 주세요",d:"신청과 결제에 다른 이메일을 사용했다면 RBA에 알려 주세요.",back:"프로그램 일정으로 돌아가기"},
} as const;


export function PaymentComplete({locale}:{locale:Locale}){const c=copy[locale];return <SiteFrame locale={locale} languagePage="payment-complete"><section className="payment-complete section-pad"><CheckCircle2 size={64}/><p className="section-index">{c.k}</p><h1>{c.t}</h1><p>{c.b}</p><div><Mail size={22}/><strong>{c.a}</strong><span>{c.d}</span></div><a className="button button-orange" href={localePath(locale,"schedule")}>{c.back}<ArrowRight size={17}/></a></section></SiteFrame>}
