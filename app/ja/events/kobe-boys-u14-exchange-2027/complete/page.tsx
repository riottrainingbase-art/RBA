import type { Metadata } from "next";
import Stripe from "stripe";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "神戸国際男子U14交流｜決済結果の確認｜RBA",
  description: "RBA UNITED男子U14国際交流のStripe決済結果を確認します。",
  robots: { index: false, follow: false },
};

export default async function KobePaymentComplete({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const query = await searchParams;
  const id = typeof query.session_id === "string" ? query.session_id : "";
  let paid = false;
  let amount: number | null = null;
  let offer = "";
  if (/^cs_(test|live)_[a-zA-Z0-9_]{10,}$/.test(id) && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const account = await stripe.accounts.retrieve();
      if (account.id === "acct_1UGdxZRXDnnSs6XN") {
        const session = await stripe.checkout.sessions.retrieve(id);
        if (session.metadata?.event === "rba_kobe_boys_u14_2027" && session.payment_status === "paid" && session.mode === "payment") {
          paid = true;
          amount = session.amount_total;
          const c = session.metadata.category === "team" ? "チーム参加" : "個人参加";
          const d = session.metadata.days === "both" ? "1月6・7日" : session.metadata.days === "jan6" ? "1月6日" : "1月7日";
          offer = c + "／" + d;
        }
      }
    } catch { /* Never treat an unverified redirect as payment proof. */ }
  }
  return <main className="flex min-h-screen items-center justify-center bg-[#f7f2ec] px-5 py-12 text-black"><div className="w-full max-w-2xl border-2 border-black bg-white p-7 sm:p-12">
    <p className="text-sm font-black tracking-widest text-[#e65c00]">RBA UNITED / KOBE 2027</p>
    <h1 className="mt-5 text-3xl font-black sm:text-4xl">{paid ? "Stripeでのお支払いを確認しました。" : "決済を確認できませんでした。"}</h1>
    {paid ? <><p className="mt-5 text-lg font-bold">{offer}</p><p className="mt-2 text-3xl font-black">{amount === null ? "" : amount.toLocaleString("ja-JP") + "円"}</p><p className="mt-5 text-sm leading-8">この画面はStripeの決済記録を確認した結果です。参加申込と決済時のメールアドレス・チーム名を主催者が照合した後、当日の詳細を個別にご案内します。お支払い済みの場合は同じ料金を再度決済しないでください。</p></> : <p className="mt-5 text-sm leading-8">ページのURLが不完全な場合、決済が未完了の場合、またはStripeの確認ができない場合に表示されます。支払いがあったか分からないときは、二重決済をせずRBAへお問い合わせください。</p>}
    <Link className="mt-7 inline-block bg-black px-6 py-4 font-black text-white" href="/ja/events/kobe-boys-u14-exchange-2027">大会案内に戻る</Link>
    <p className="mt-5 text-sm">お問い合わせ：<a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
  </div></main>;
}
