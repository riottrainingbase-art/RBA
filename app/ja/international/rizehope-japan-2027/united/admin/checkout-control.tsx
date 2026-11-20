"use client";
import {useState} from "react";
export function UnitedCheckoutControl({playerId,stage,enabled}:{
 playerId:string;stage:"deposit"|"balance";enabled:boolean;
}){
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 const [link,setLink]=useState("");
 async function request(){
  setBusy(true);setError("");setLink("");
  try{
   const response=await fetch("/api/rizehope-2027/united/admin/checkout",{
    method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({player_entry_id:playerId,stage})
   });
   const data=await response.json() as {ok:boolean;error?:string;checkout_url?:string};
   if(!response.ok||!data.ok||!data.checkout_url)throw new Error(data.error??"checkout_unavailable");
   const url=new URL(data.checkout_url);
   if(url.protocol!=="https:"||url.hostname!=="checkout.stripe.com")throw new Error("invalid_checkout_host");
   setLink(url.href);
  }catch(e){setError(e instanceof Error?e.message:"unknown_error")}
  finally{setBusy(false)}
 }
 return <div className="mt-4 border-t border-neutral-300 pt-4">
  <button type="button" disabled={!enabled||busy} onClick={request}
    className="min-h-11 bg-[#ff8a35] px-5 py-3 text-sm font-black disabled:opacity-40">
    {busy?"確認中":stage==="deposit"?"承認済み保護者へ前金Checkoutを発行":"入金済み保護者へ残金Checkoutを発行"}
  </button>
  {!enabled&&<p className="mt-2 text-xs">正式料金・返金規約・税務・保護者同意・署名付きWebhookまで決済停止中</p>}
  {error&&<p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
  {link&&<div className="mt-3 border border-orange-300 bg-orange-50 p-4">
   <p className="text-sm font-bold">個別案内限定・一般公開禁止</p>
   <a href={link} target="_blank" rel="noopener noreferrer nofollow" className="mt-2 block break-all text-xs underline">{link}</a>
   <button type="button" onClick={()=>navigator.clipboard.writeText(link)} className="mt-3 border p-2 text-xs font-bold">URLをコピー</button>
  </div>}
 </div>;
}
