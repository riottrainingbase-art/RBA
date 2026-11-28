import type { Metadata } from "next";
import { AichiClinicFees } from "@/components/aichi-clinic-fees";
import { getAichiPayment } from "@/lib/aichi-clinic-payments";
import { SiteFrame } from "@/components/site-frame";
import { aichiClinic as event } from "@/lib/aichi-clinic-2027";
export const metadata:Metadata={title:"愛知クリニック｜Stripe決済のご案内",robots:{index:false,follow:true}};
export const dynamic="force-dynamic";
export default function Page(){
 const payable=getAichiPayment("full")?.payable;
 return <SiteFrame locale="ja"><main className="mx-auto max-w-3xl px-5 py-12"><a href={event.path}>← 開催詳細</a><h1 className="mt-5 text-3xl font-black">お支払い</h1><p className="mt-3 font-bold">{event.dateLabel} {event.time}</p><p className="mt-6 border-l-4 border-orange-600 bg-neutral-100 p-5">{payable?"参加申込フォームから日本円でStripe事前決済をご利用ください。":"決済受付前です。定員・会場の使用許可・決済設定の確認後に申込受付を開始します。現在は支払い不要です。"} 早割は1月31日23:59までです。</p><AichiClinicFees/><p className="mt-6">参加者1名ごとに申込・支払を照合します。正式案内が届く前の支払い、重複支払いはしないでください。</p><a className="mt-6 inline-block border border-neutral-500 px-5 py-3 font-bold" href={event.path+"/apply"}>申込の受付状況 →</a><p className="mt-6 text-sm"><a className="underline" href="/ja/policies">参加規約・返金方針</a>　<a className="underline" href="/ja/legal">特商法表記</a></p></main></SiteFrame>;
}
