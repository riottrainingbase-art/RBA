import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import KobeDepositStatus from "@/components/kobe-u14-deposit-status";
export const metadata:Metadata={title:"RBA UNITED｜申込・前金・残金の状況｜MY HOME COURT",robots:{index:false,follow:false}};
export default async function Page(){
 const client=await createClient();const {data:{user}}=await client.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Funited-2027");
 return <main className="min-h-screen bg-[#f7f2e9] px-5 py-10 text-black">
   <section className="mx-auto max-w-4xl">
     <Link className="text-sm font-bold underline" href="/ja/my-homecourt/app">← MY HOME COURTへ戻る</Link>
     <p className="mt-9 text-xs font-black tracking-widest text-[#c95a12]">MY HOME COURT / RBA UNITED</p>
     <h1 className="mt-3 text-3xl font-black sm:text-4xl">神戸U14｜申込とお支払い</h1>
     <p className="mt-4 text-sm leading-8">RBA IDのログインメールと申込メールが一致する登録について、前金・残金の状況を表示します。決済の反映はStripeの検証済み通知を基準にしています。</p>
     <KobeDepositStatus/>
   </section>
 </main>;
}
