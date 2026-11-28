import type { Metadata } from "next";
import { AichiClinicFees } from "@/components/aichi-clinic-fees";
import { SiteFrame } from "@/components/site-frame";
import { aichiClinic as event } from "@/lib/aichi-clinic-2027";
import {aichiPlans,aichiTermsVersion,getAichiPayment} from "@/lib/aichi-clinic-payments";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"愛知クリニック｜参加申込・事前決済",robots:{index:false,follow:true}};
export default async function Page({searchParams}:{searchParams:Promise<{status?:string}>}){
 const query=await searchParams;
 const plans=aichiPlans.map(plan=>getAichiPayment(plan)).filter(p=>p!==null);
 const payable=plans.every(p=>p.payable);
 return <SiteFrame locale="ja"><main className="mx-auto max-w-3xl px-5 py-12"><a href={event.path}>← 開催詳細</a><h1 className="mt-5 text-3xl font-black">参加申込・Stripe事前決済</h1><p className="mt-3 font-bold">{event.dateLabel} {event.time}</p><p className="mt-2">{event.place}。早割あり・事前決済制。会員登録不要。</p><AichiClinicFees/>
 {query.status==="cancelled"&&<p className="mt-4 bg-neutral-100 p-3">決済画面を閉じました。支払済みの方は再決済せず、RBAへお問い合わせください。</p>}
 {payable?<><p className="mt-4">保護者が参加者1名ごとにお申し込みください。金額は決済画面の作成時点で判定します。</p>{plans.map(p=><form key={p.plan} className="mt-6 grid gap-3 border border-neutral-300 p-5" method="POST" action="/api/commerce/aichi-clinic-checkout"><h2 className="text-xl font-black">{p.title}：{p.amount.toLocaleString("ja-JP")}円（税込）</h2><input type="hidden" name="plan" value={p.plan}/><input type="hidden" name="amount" value={p.amount}/><input type="hidden" name="termsVersion" value={aichiTermsVersion}/><label className="grid gap-1">保護者氏名<input className="border p-2" name="guardian" required maxLength={100} autoComplete="name"/></label><label className="grid gap-1">保護者メール<input className="border p-2" type="email" name="email" required maxLength={254} autoComplete="email"/></label><label className="grid gap-1">保護者電話番号<input className="border p-2" type="tel" name="phone" required maxLength={32} autoComplete="tel"/></label><label className="grid gap-1">選手氏名<input className="border p-2" name="player" required maxLength={100}/></label><label className="grid gap-1">学年<select className="border p-2" name="grade" required defaultValue=""><option value="" disabled>選択してください</option>{p.grades.map(g=><option key={g}>{g}</option>)}</select></label><label className="grid gap-1">所属チーム（任意）<input className="border p-2" name="team" maxLength={100}/></label><p className="text-sm"><a className="underline" href="/ja/policies">参加規約・返金条件</a>・<a className="underline" href="/ja/privacy">プライバシーポリシー</a>・<a className="underline" href="/ja/legal">特商法表記</a>をご確認ください。</p><label><input type="checkbox" name="accepted" value="yes" required/> 保護者または法定代理人として参加条件と個人情報の取扱いに同意します。</label><button className="bg-[#ff7900] p-4 font-black text-black" type="submit">申込してStripe決済へ →</button></form>)}</>:<p className="mt-6 border-l-4 border-orange-600 bg-neutral-100 p-5">受付準備中です。会場の使用許可・対象学年・定員・決済設定の確認後に受付を開始します。現在は申込送信・参加枠の予約はできません。</p>}
 <p className="mt-8"><a className="underline" href="/ja/contact">お問い合わせ</a></p></main></SiteFrame>;
}
