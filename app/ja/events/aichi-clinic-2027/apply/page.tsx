import type { Metadata } from "next";
import { AichiApplicationForm } from "@/components/aichi-application-form";
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
 return <SiteFrame locale="ja"><main className="mx-auto max-w-3xl px-5 py-12"><a href={event.path}>← 開催詳細</a><h1 className="mt-5 text-3xl font-black">参加申込・Stripe事前決済</h1><p className="mt-3 font-bold">{event.dateLabel} {event.time}</p><p className="mt-2">{event.place}。{event.audience}／定員{event.capacity}名。早割あり・事前決済制。会員登録不要。</p><AichiClinicFees/>
 {query.status==="cancelled"&&<p className="mt-4 bg-neutral-100 p-3">決済画面を閉じました。支払済みの方は再決済せず、RBAへお問い合わせください。</p>}
 {payable?<AichiApplicationForm plans={plans} termsVersion={aichiTermsVersion}/>:<p className="mt-6 border-l-4 border-orange-600 bg-neutral-100 p-5">受付準備中です。決済設定・取消条件の最終確認後に受付を開始します。現在は申込送信・参加枠の予約はできません。</p>}
 <p className="mt-8"><a className="underline" href="/ja/contact">お問い合わせ</a></p></main></SiteFrame>;
}
