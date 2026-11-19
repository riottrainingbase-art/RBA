"use client";
import { useState } from "react";

export function RizehopeCheckoutControl({teamId,stage,enabled}:{
  teamId:string;stage:"deposit"|"balance";enabled:boolean;
}) {
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [url,setUrl]=useState("");
  const title=stage==="deposit"?"前金33,000円":"残金33,000円";
  async function requestCheckout() {
    setBusy(true);setError("");setUrl("");
    try{
      const result=await fetch("/api/rizehope-2027/admin/checkout",{
        method:"POST",credentials:"same-origin",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({team_id:teamId,stage})
      });
      const data=await result.json() as {ok:boolean;error?:string;checkout_url?:string};
      if(!result.ok||!data.ok||!data.checkout_url)throw new Error(data.error??"checkout_not_available");
      const link=new URL(data.checkout_url);
      if(link.protocol!=="https:"||link.hostname!=="checkout.stripe.com")throw new Error("unexpected_checkout_host");
      setUrl(link.href);
    }catch(e){setError(e instanceof Error?e.message:"request_failed")}
    finally{setBusy(false)}
  }
  return <div className="mt-3 space-y-3 border-t border-neutral-200 pt-3">
    <button type="button" disabled={!enabled||busy}
      onClick={requestCheckout}
      className="border border-black px-4 py-2 text-sm font-black disabled:opacity-40">
      {busy?"照会中":`${title}のチーム専用Checkoutを発行`}
    </button>
    {!enabled&&<p className="text-xs text-neutral-600">正式な規約・税務・Webhook・代表者同意を確認するまで発行禁止です。</p>}
    {error&&<p className="text-xs text-red-700" role="alert">{error}</p>}
    {url&&<div className="border border-orange-300 bg-orange-50 p-3">
      <p className="text-xs font-bold">承認済みチームにのみ個別案内（このURLは公開しない）</p>
      <a href={url} target="_blank" rel="noopener noreferrer nofollow" className="mt-2 block break-all text-xs underline">{url}</a>
      <button type="button" onClick={()=>navigator.clipboard.writeText(url)}
        className="mt-3 border border-black px-3 py-2 text-xs font-bold">チェックアウトURLをコピー</button>
    </div>}
  </div>;
}
