"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Application = {
  id:string; plan_key:string; status:string; total_jpy:number; deposit_jpy:number; balance_jpy:number;
  created_at:string; deposit_paid_at:string|null; balance_paid_at:string|null; refund_completed_at:string|null;
};
const names:Record<string,string> = {
  individual_jan6:"個人｜1月6日",individual_jan7:"個人｜1月7日",individual_both:"個人｜1月6・7日",
  team_jan6:"チーム｜1月6日",team_jan7:"チーム｜1月7日",team_both:"チーム｜1月6・7日",
  selected:"RBA UNITED JAPAN選抜希望",
};
const statusNames:Record<string,string> = {
  awaiting_deposit:"前金の入金待ち",deposit_paid:"前金受領・参加条件確認中",
  balance_approved:"残金お支払い手続きのご案内待ち",fully_paid:"全額入金済・最終案内待ち",
  refund_pending:"返金処理中",refunded:"前金返金済み",needs_review:"運営による照合・確認が必要",
};
const yen=(n:number)=>n.toLocaleString("ja-JP")+"円";
export default function KobeDepositStatus(){
 const [rows,setRows]=useState<Application[]>([]);
 const [pending,setPending]=useState(true);
 const [error,setError]=useState("");
 useEffect(()=>{
   let cancelled=false;
   (async ()=>{
     try{
       const supabase=createClient();
       const {data,error}=await supabase.functions.invoke("rba-kobe-u14-deposit-status",{method:"GET"});
       if(error || !data?.ok)throw new Error("申込状況を取得できませんでした。");
       if(!cancelled)setRows(data.applications||[]);
     }catch{if(!cancelled)setError("申込情報を確認できませんでした。お問い合わせはRBAへお願いします。");}
     finally{if(!cancelled)setPending(false);}
   })();
   return()=>{cancelled=true};
 },[]);
 return <div className="mt-6 space-y-4">
   {pending?<p className="text-sm">申込状況を確認しています…</p>:error?<p className="border border-red-300 bg-red-50 p-5 text-sm text-red-900" role="alert">{error}</p>:rows.length===0?<div className="border border-black/20 bg-white p-6"><p className="font-black">このRBA IDに一致する申込はありません。</p><p className="mt-2 text-sm leading-7">申込時の保護者メールアドレスとMY HOMECOURTのログインメールが違う場合は、自動表示されません。決済済みの場合は重複して申込まずRBAへお問い合わせください。</p></div>:rows.map(item=><article key={item.id} className="border border-black/20 bg-white p-6">
     <p className="text-xs font-bold text-[#c65717]">2027 KOBE / BOYS U14</p>
     <h2 className="mt-2 text-xl font-black">{names[item.plan_key]||"参加希望"}</h2>
     <p className="mt-3 text-sm font-bold">現在の状態：{statusNames[item.status]||"確認中"}</p>
     <div className="mt-5 grid gap-3 sm:grid-cols-3">
       <div className="bg-[#f7f3ed] p-4"><span className="block text-xs">税込総額</span><strong className="text-lg">{yen(item.total_jpy)}</strong></div>
       <div className="bg-[#f7f3ed] p-4"><span className="block text-xs">前金</span><strong className="text-lg">{yen(item.deposit_jpy)}</strong></div>
       <div className="bg-[#f7f3ed] p-4"><span className="block text-xs">残金</span><strong className="text-lg">{yen(item.balance_jpy)}</strong></div>
     </div>
     <p className="mt-4 break-all text-xs text-black/70">申込番号：{item.id}</p>
     {item.deposit_paid_at?<p className="mt-2 text-sm">前金入金確認：{new Date(item.deposit_paid_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</p>:null}
     {item.balance_paid_at?<p className="mt-2 text-sm">残金入金確認：{new Date(item.balance_paid_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</p>:null}
     <p className="mt-4 border-t border-black/15 pt-4 text-sm leading-7">入金は「開催・参加・出場確定」ではありません。会場、最終条件、返金規定についての案内をご確認ください。Stripeで支払済みなのに未反映の場合は、二重決済せずお問い合わせください。</p>
   </article>)}
   <a href="/ja/events/kobe-boys-u14-exchange-2027/apply?source=my-homecourt" className="inline-flex min-h-12 items-center bg-black px-6 py-3 font-bold text-white">神戸U14のプラン・申込ページへ</a>
   <p className="text-sm">お問い合わせ：<a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
 </div>;
}
