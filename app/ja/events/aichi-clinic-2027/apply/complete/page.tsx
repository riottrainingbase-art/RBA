import {SiteFrame} from "@/components/site-frame";
export const metadata={title:"愛知クリニック｜お支払い状況",robots:{index:false,follow:false}};
export default function Page(){return <SiteFrame locale="ja"><main className="mx-auto max-w-3xl px-5 py-12"><h1 className="text-3xl font-black">お手続きありがとうございます</h1><p className="mt-4">決済状況を確認しています。Stripeの領収書とRBAの参加確定案内をご確認ください。こちらの画面のみでは参加確定ではありません。二重決済はお控えください。</p><a className="mt-6 inline-block underline" href="/ja/events/aichi-clinic-2027">開催概要へ</a></main></SiteFrame>;}
