import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
 title: "RBA UNITED JAPAN｜神戸2027 男子U14選抜プログラム・前金案内",
 description: "準備・国際対戦・振り返りを一体として考える男子U14選抜育成プログラム。参加費10万円、選考・正式条件承認後に前金5万円、残金5万円。一般交流参加とは別商品。宿泊・移動の協賛は交渉中で、現時点で無料提供は確約していません。",
 alternates: {canonical:"/ja/events/kobe-boys-u14-exchange-2027/united"},
 robots: {index:false,follow:false},
};
const form="https://form.jotform.com/263188088558069";
const prices=[["選抜プログラム・総参加費","100,000円"],["前金（選考通過・正式条件同意後）","50,000円"],["残金（指定期日）","50,000円"]];
const checklist=[
 "男子U14の年齢資格と選抜条件を確認（生年月日基準は最終調整中）",
 "体育館利用許可、競技実施日と安全・保険・成人引率体制を確認",
 "提供する事前指導・練習・ゲーム・フィードバックの内容を書面提示",
 "事前に各家庭へ参加費総額・返金条件・残金期限を説明し同意取得",
 "選抜対象の保護者にのみ有効期限付きの個別決済案内を発行",
];
const checkoutReady = process.env.KOBE_U14_DEPOSIT_ENABLED==="true" &&
 Boolean(process.env.STRIPE_SECRET_KEY) &&
 Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY) &&
 Boolean(process.env.KOBE_U14_STRIPE_WEBHOOK_SECRET) &&
 Boolean(process.env.KOBE_U14_TERMS_VERSION);
export default async function Page({searchParams}:{searchParams:Promise<{token?:string}>}) {
 const params=await searchParams;
 const token=typeof params.token==="string" && /^[a-f0-9]{64}$/.test(params.token) ? params.token : "";
 const canPay=checkoutReady && Boolean(token);
 return <main className="min-h-screen bg-[#faf4ea] text-black">
  <header className="border-b border-black/20 bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
   <Link href="/ja/events/kobe-boys-u14-exchange-2027" className="flex items-center gap-3"><Image src="/rba-logo-original.jpg" width={42} height={58} alt="RBA公式ロゴ" className="h-14 w-11 object-contain"/><span className="text-xs font-black leading-5">RIOT BASKETBALL<br/>ACADEMY</span></Link>
   <Link href="/ja/events/kobe-boys-u14-exchange-2027" className="text-sm font-bold underline">国際交流の概要へ戻る</Link>
  </div></header>
  <section className="bg-[#f2691b] px-5 py-14"><div className="mx-auto max-w-5xl">
   <p className="text-xs font-black tracking-[.2em]">RBA UNITED JAPAN / SELECTED BOYS U14</p>
   <h1 className="mt-4 text-[clamp(2.1rem,6vw,4.6rem)] font-black leading-tight">これは、一度きりの試合への<br/>招待ではありません。</h1>
   <p className="mt-4 max-w-3xl text-lg font-black leading-8">2027年1月｜神戸・関西 男子U14選抜育成プログラム</p>
   <p className="mt-5 max-w-3xl text-sm font-bold leading-8">RBA代表・西尾優人がヘッドコーチを担当する日本側の選抜活動。国内の一般交流試合参加とは別のプログラムです。選考希望の受付は無料です。</p>
  </div></section>
  <section className="mx-auto max-w-5xl px-5 py-12">
   <p className="text-xs font-black tracking-[.2em] text-[#da570a]">MORE THAN A TOURNAMENT</p>
   <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight sm:text-4xl">参加した日数ではなく、<br/>経験の質を高めるための選抜育成。</h2>
   <p className="mt-5 max-w-3xl text-sm leading-8">RBA UNITEDは、所属チームの枠を越えて集まる選手が「何を見るか」を準備し、異なるプレースタイルの相手に自分で判断して挑み、その経験を日常の練習へ持ち帰る流れを大切にします。単なる試合への出場枠と、選抜チームとしての育成活動は別のものです。</p>
   <div className="mt-7 grid gap-3 md:grid-cols-3">
    {[
     ["01 / PREPARE","準備する","選抜後の課題共有、チームの役割と判断の事前整理を検討しています。"],
     ["02 / COMPETE","世界と試す","1月5日の日本側チーム練習、1月6〜7日のグアムとの国際交流を調整しています。"],
     ["03 / REFLECT","次へつなぐ","振り返りや個別フィードバックを含む事後の学びを検討しています。"],
    ].map(([number,title,body])=><div className="border border-black/20 bg-white p-5" key={number}>
     <p className="text-xs font-black tracking-wider text-[#cf5414]">{number}</p>
     <h3 className="mt-3 text-xl font-black">{title}</h3>
     <p className="mt-3 text-sm leading-8 text-black/75">{body}</p>
    </div>)}
   </div>
   <p className="mt-5 text-xs leading-7 text-black/65">各活動の実施内容・回数・時間・会場・映像撮影の可否は現在調整中です。正式な提供範囲は、前金請求より前に保護者へ書面でご案内します。</p>
  </section>
  <section className="mx-auto max-w-5xl px-5 py-12">
   <p className="text-xs font-black tracking-[.2em] text-[#da570a]">PROGRAMME FEE / CURRENT PROPOSAL</p>
   <h2 className="mt-3 text-3xl font-black">選抜プログラム料金</h2>
   <div className="mt-6 overflow-hidden border-2 border-black bg-white">{prices.map(([label,price])=><div key={label} className="flex flex-wrap items-center justify-between gap-2 border-b border-black/20 px-5 py-4"><span className="font-bold">{label}</span><strong className="text-2xl">{price}</strong></div>)}</div>
   <p className="mt-4 text-sm leading-8">すべて税込の現時点の料金案です。前金50,000円は総額100,000円に全額充当し、重複請求しません。男子U14一般個人参加料金（1日8,800円／2日15,400円）や一般チーム料金は、選抜プログラムの費用には加算しません。</p>
   <div className="mt-6 border-l-4 border-[#f2691b] bg-white p-5 text-sm leading-8">
    <strong>重要：宿泊・送迎のスポンサーは交渉中です。</strong>
    <p>企業による宿泊費や移動費の無償提供・割引が成立しても、契約と対象範囲が確定するまでは参加費に含めません。交通・宿泊・食事、1月9日の追加交流が実施される場合の追加実費は、正式な案内を確認してください。</p>
   </div>
  </section>
  <section className="bg-[#17191f] px-5 py-12 text-white"><div className="mx-auto max-w-5xl">
   <h2 className="text-3xl font-black">予定している活動</h2>
   <div className="mt-6 grid gap-3 md:grid-cols-2">
    {[["JAN 05 / TUE","日本側RBA UNITED事前練習（午後・会場調整中）"],["JAN 06 / WED","グアムを中心とする国際交流試合・合同練習（会場調整中）"],["JAN 07 / THU","学校の始業日を考慮した交流日程（調整中）"],["JAN 08–09","追加交流の可能性を検討（実施・料金未確定）"]].map(([date,body])=><div className="border border-white/30 p-5" key={date}><p className="text-[#ffae7d] font-black text-sm">{date}</p><p className="mt-2 text-sm leading-7">{body}</p></div>)}
   </div>
   <p className="mt-6 text-sm leading-8 text-white/80">事前オンライン指導、映像レビュー、個別フィードバックは提供内容を検討中であり、現時点では実施確約ではありません。グアム以外の参加国・地域も交渉中です。</p>
  </div></section>
  <section className="mx-auto max-w-5xl px-5 py-12">
   <h2 className="text-3xl font-black">前金のお支払いまで</h2>
   <ol className="mt-5 list-decimal space-y-2 pl-6 text-sm leading-8">{checklist.map(x=><li key={x}>{x}</li>)}</ol>
   {canPay?<form className="mt-7 border-2 border-black bg-white p-6" method="POST" action="/api/commerce/kobe-u14-united-payment">
     <input type="hidden" name="token" value={token}/>
     <h3 className="text-2xl font-black">選考通過者専用｜Stripe決済</h3>
     <p className="mt-3 text-sm leading-8">支払前に書面で届いた最新の参加条件をお読みください。この画面は専用の案内を受け取った保護者のみ利用できます。既に支払済みの場合は再度決済しないでください。</p>
     <label className="mt-4 flex items-start gap-3 text-sm leading-7"><input type="checkbox" name="terms_accepted" value="yes" required className="mt-2"/><span>私は対象選手の保護者として、個別に案内された正式な提供内容・総額100,000円・今回の支払額50,000円・取消返金条件・追加実費の取扱いを確認し、同意します。</span></label>
     <button type="submit" className="mt-6 w-full min-h-14 bg-[#f2691b] px-6 py-4 font-black">Stripeで50,000円の支払い手続きへ</button>
    </form>:<div className="mt-7 border-2 border-black/25 bg-white p-6">
     <h3 className="text-xl font-black">現在は参加意向登録のみ受付中</h3>
     <p className="mt-3 text-sm leading-8">選考通過、体育館の正式な使用許可、参加条件・キャンセル規定の確定、保護者同意が揃うまでカード決済を開始しません。選考通過者にはRBAが個別の専用決済案内を送ります。</p>
     <a href={form} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center bg-black px-5 py-3 font-black text-white">男子U14選抜希望を無料登録 ↗</a>
    </div>}
   <p className="mt-6 text-sm leading-8">RBA側の理由で開催できない場合、正式条件を提供できない場合、または最終条件に保護者が同意せず正式参加しない場合は、受領した前金を全額返金する方針です。選手都合での正式契約成立後のキャンセル条件は、支払開始前に個別の正式書面でご提示します。</p>
   <p className="mt-5 text-sm">お問い合わせ：<a href="mailto:riot.training.base@gmail.com" className="underline">riot.training.base@gmail.com</a></p>
  </section>
 </main>;
}
