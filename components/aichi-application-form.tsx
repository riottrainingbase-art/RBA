"use client";
import {useState} from "react";
type Plan={plan:string;title:string;amount:number;grades:string[]};
export function AichiApplicationForm({plans,termsVersion}:{plans:Plan[];termsVersion:string}){
 const [selected,setSelected]=useState("");
 const choice=plans.find(p=>p.plan===selected);
 return <form className="mt-6 grid gap-5 border border-[#C9A86A] bg-white p-5 sm:p-8" method="POST" action="/api/commerce/aichi-clinic-checkout">
  <p className="text-sm leading-7">保護者が選手1名ごとにお申し込みください。会員登録は不要です。</p>
  <fieldset className="grid gap-2"><legend className="mb-3 text-lg font-bold">01 / 参加区分を選ぶ</legend>{plans.map(p=><label key={p.plan} className="flex min-h-14 cursor-pointer items-center gap-3 border border-neutral-300 p-3"><input type="radio" name="plan" value={p.plan} checked={selected===p.plan} onChange={()=>setSelected(p.plan)} required/><span className="flex-1 font-bold">{p.title}</span><strong className="text-lg">{p.amount.toLocaleString("ja-JP")}円</strong></label>)}</fieldset>
  <input type="hidden" name="amount" value={choice?.amount??""}/><input type="hidden" name="termsVersion" value={termsVersion}/>
  <fieldset className="grid gap-4"><legend className="mb-3 text-lg font-bold">02 / 選手・保護者情報</legend>
   <label className="grid gap-1 text-sm font-bold">選手氏名<input className="min-h-12 border border-neutral-400 p-3 text-base font-normal" name="player" required maxLength={100}/></label>
   <label className="grid gap-1 text-sm font-bold">学年<select className="min-h-12 border border-neutral-400 p-3 text-base font-normal" name="grade" required defaultValue=""><option value="" disabled>選択してください</option>{(plans[0]?.grades??[]).map(g=><option key={g}>{g}</option>)}</select></label>
   <label className="grid gap-1 text-sm font-bold">所属チーム（任意）<input className="min-h-12 border border-neutral-400 p-3 text-base font-normal" name="team" maxLength={100}/></label>
   <label className="grid gap-1 text-sm font-bold">保護者氏名<input className="min-h-12 border border-neutral-400 p-3 text-base font-normal" name="guardian" required maxLength={100} autoComplete="name"/></label>
   <label className="grid gap-1 text-sm font-bold">保護者メール<input className="min-h-12 border border-neutral-400 p-3 text-base font-normal" type="email" name="email" required maxLength={254} autoComplete="email"/></label>
   <label className="grid gap-1 text-sm font-bold">保護者電話番号<input className="min-h-12 border border-neutral-400 p-3 text-base font-normal" type="tel" name="phone" required maxLength={32} autoComplete="tel"/></label>
  </fieldset>
  <fieldset className="grid gap-3"><legend className="mb-3 text-lg font-bold">03 / 確認してお支払いへ</legend><p className="text-sm leading-6"><a className="underline" href="/ja/cancellation" target="_blank" rel="noopener noreferrer">返金条件</a>・<a className="underline" href="/ja/policies" target="_blank" rel="noopener noreferrer">参加規約</a>・<a className="underline" href="/ja/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>・<a className="underline" href="/ja/legal" target="_blank" rel="noopener noreferrer">特商法表記</a>をご確認ください。</p><label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 h-5 w-5 shrink-0" type="checkbox" name="accepted" value="yes" required/>保護者または法定代理人として参加条件と個人情報の取扱いに同意します。</label><div aria-live="polite" className="border-t border-neutral-300 pt-4"><p className="text-sm">お支払い総額（税込・選手1名）</p><strong className="text-3xl">{choice?choice.amount.toLocaleString("ja-JP")+"円":"参加区分を選択"}</strong></div><button className="min-h-14 bg-[#A64A12] p-4 font-bold text-white disabled:bg-neutral-500" type="submit" disabled={!choice}>Stripe決済へ進む →</button><p className="text-xs leading-6">表示した料金は決済画面の作成時に再確認します。支払い済みの方は再決済せずRBAへお問い合わせください。</p></fieldset>
 </form>;
}
