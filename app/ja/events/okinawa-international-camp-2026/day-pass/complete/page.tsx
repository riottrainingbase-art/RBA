import { SiteFrame } from "@/components/site-frame";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "沖縄キャンプ｜事前決済後のご案内",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function DayPassComplete() {
  return <SiteFrame locale="ja"><main style={{maxWidth:650,margin:"0 auto",padding:"48px 24px 96px"}}>
    <p style={{fontSize:12,letterSpacing:"0.14em"}}>RBA / OKINAWA CAMP 2026</p>
    <h1>お支払い後のご案内</h1>
    <p>Stripeの画面から戻りました。この画面の表示だけでは決済完了・参加確定とは判断できません。RBAが決済記録と受付情報を照合した後、個別に参加確定と集合方法をご案内します。</p>
    <p><strong>二重払いを防ぐため、もう一度決済しないでください。</strong> カード明細やStripeの通知にお支払いの記録がある場合、受付番号・保護者のメールアドレスを添えてRBAにお問い合わせください。カード番号をメールで送らないでください。</p>
    <p>お問い合わせ：riot.training.base@gmail.com</p>
    <p><a href="/ja/events/okinawa-international-camp-2026">キャンプ公式ページへ戻る →</a></p>
  </main></SiteFrame>;
}
