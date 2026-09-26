import { memberAuthDestination } from "@/lib/member-auth-redirect";
import { paymentEnquiryUrl } from "@/lib/payment-enquiry";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { MemberLogin } from "./member-login";
import type { Locale } from "./site-frame";

const copy = {
  ja: { title: "MY HOME COURTへようこそ。", message: "現在、RBA IDの登録・ログインメールの送信を一時停止しています。登録再開のお知らせは公式LINEで受け取れます。クリニックやキャンプの情報は、開催日程ページから引き続きご覧いただけます。", back: "MY HOME COURTへ戻る", schedule: "開催日程を見る", contact: "RBAに問い合わせる", status: "RBA IDの登録・ログインについて" },
  en: { title: "Welcome to MY HOME COURT.", message: "Registration and sign-in emails are temporarily unavailable. You can still browse clinics and camps. Please contact RBA for participation enquiries or assistance.", back: "Back to MY HOME COURT", schedule: "Explore upcoming programmes", contact: "Contact RBA", status: "Email sign-in update" },
  "zh-tw": { title: "歡迎來到 MY HOME COURT。", message: "目前暫停傳送註冊與登入郵件。您仍可瀏覽訓練營與活動資訊。報名或需要協助時，請聯絡 RBA。", back: "返回 MY HOME COURT", schedule: "查看活動日程", contact: "聯絡 RBA", status: "電子郵件登入公告" },
  ko: { title: "MY HOME COURT에 오신 것을 환영합니다.", message: "현재 가입 및 로그인 이메일 전송을 일시 중단했습니다. 클리닉과 캠프 일정은 계속 확인하실 수 있습니다. 참가 신청이나 도움이 필요하면 RBA에 문의해 주세요.", back: "MY HOME COURT로 돌아가기", schedule: "활동 일정 보기", contact: "RBA에 문의하기", status: "이메일 로그인 안내" },
} as const;

// Enable only after the SMTP sender, delivery and callback have been verified.
// This gate does not change Supabase authentication or existing member sessions.
export function MemberLoginEntry({ locale, authError, next, source }: {
  locale: Locale;
  next?: string;
  source?: string;
  authError?: boolean | "browser" | "expired";
}) {
  if (process.env.RBA_AUTH_EMAIL_READY === "true") {
    return <MemberLogin locale={locale} authError={authError} next={next} source={source} />;
  }
  const c = copy[locale];
  const destination=memberAuthDestination(next||null);
  const paymentOption=destination.startsWith("/api/commerce/checkout/")?destination.split("/").pop()?.split("?")[0]:null;
  const prefix = locale === "en" ? "" : `/${locale}`;
  return <main className="member-login-shell">
    <a className="member-login-back" href={`${prefix}/my-homecourt`}><ArrowLeft size={17} />{c.back}</a>
    <section className="member-login-card">
      <div className="member-login-copy"><p>RBA ID / MY HOME COURT</p><h1>{c.title}</h1></div>
      <div className="member-login-sent" role="status">
        <Mail aria-hidden="true" /><h2>{c.status}</h2><p>{c.message}</p>
        {locale==="ja"?<p><a className="button button-member" href="https://lin.ee/5l1YG8N" target="_blank" rel="noreferrer"><MessageCircle size={17}/>登録再開のお知らせを受け取る</a></p>:null}
        <p><a className="button button-dark" href={`${prefix}/schedule`}>{c.schedule}</a></p>
        <p><a className="button button-outline" href={paymentOption?paymentEnquiryUrl(paymentOption,locale):`${prefix}/contact`}>{c.contact}</a></p>
      </div>
    </section>
  </main>;
}
