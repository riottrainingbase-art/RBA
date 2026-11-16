"use client";

import { useState } from "react";
import Link from "next/link";
import { ESSENTIALS_INTEREST_FORM } from "@/lib/rba-essentials";
type Props = {
  available: boolean;
  initial: "tee" | "setup";
  teeJPY: number | null;
  setupJPY: number | null;
  shippingJPY: number | null;
  handwrittenJPY: number | null;
  handwrittenAvailable: boolean;
  deliveryBy: string | null;
  orderBy: string | null;
  termsVersion: string | null;
  cancellationTerms: string;
  returnTerms: string;
  presaleNote: string;
};
const yen=(n:number)=>n.toLocaleString("ja-JP")+"円";
const sizes=["S","M","L","XL"] as const;
export function EssentialsPreorderForm({available,initial,teeJPY,setupJPY,shippingJPY,handwrittenJPY,handwrittenAvailable,deliveryBy,orderBy,termsVersion,cancellationTerms,returnTerms,presaleNote}:Props){
  const [teeQty,setTeeQty]=useState(initial==="tee"?1:0);
  const [setupQty,setSetupQty]=useState(initial==="setup"?1:0);
  const [teeSize,setTeeSize]=useState("M");
  const [hoodieSize,setHoodieSize]=useState("M");
  const [pantsSize,setPantsSize]=useState("M");
  const [handwritten,setHandwritten]=useState(false);
  const [handwrittenText,setHandwrittenText]=useState("");
  const [handwrittenTarget,setHandwrittenTarget]=useState<"tee"|"setup">("tee");
  const [accepted,setAccepted]=useState(false);
  const [acceptedTerms,setAcceptedTerms]=useState(false);
  const [acknowledged,setAcknowledged]=useState(false);
  const handwrittenCharge = handwritten && handwrittenAvailable ? (handwrittenJPY??0) : 0;
  const subtotal=(teeJPY??0)*teeQty+(setupJPY??0)*setupQty+handwrittenCharge;
  const shipping=(teeQty+setupQty>0?(shippingJPY??0):0);
  const handwrittenTargetValid=handwrittenTarget==="tee"?teeQty===1:setupQty===1;
  const handwrittenValid=!handwritten||(handwrittenAvailable&&handwrittenTargetValid&&handwrittenText.trim().length>0&&Array.from(handwrittenText.trim()).length<=20);
  const canCheckout=available&&teeQty+setupQty>=1&&teeQty+setupQty<=3&&accepted&&acceptedTerms&&acknowledged&&handwrittenValid;
  return <div className="epWrap">
    <div className="epHead"><p>RBA ESSENTIALS / PRE-ORDER</p><h1>Pre-order<span>.</span></h1><p>公式ウェアの先行購入。国内送料無料はFIRST DROP限定。商品・サイズ・数量を選び、確定条件をご確認のうえStripe決済へお進みください。</p></div>
    {available ? <form method="POST" action="/api/commerce/essentials-preorder" className="epForm">
      <div className="epLeft">
        <div className="epLine"><span>01 / THE ITEMS</span><span>SELECT & SIZE</span></div>
        <div className="epItem">
          <div><h2>ESSENTIAL TEE</h2><p>WHITE / T-SHIRT</p>{teeJPY!==null&&<strong>{yen(teeJPY)}<small> 税込</small></strong>}</div>
          <div className="epFields">
            <label>数量<select name="tee_qty" value={teeQty} onChange={e=>{const q=Number(e.target.value);setTeeQty(q);if(q+setupQty>3)setSetupQty(3-q);}}>{[0,1,2,3].map(q=><option value={q} key={q}>{q}</option>)}</select></label>
            <label>サイズ<select name="tee_size" value={teeSize} onChange={e=>setTeeSize(e.target.value)} disabled={teeQty===0}>{sizes.map(s=><option key={s}>{s}</option>)}</select></label>
          </div>
        </div>
        <div className="epItem">
          <div><h2>ESSENTIAL SETUP</h2><p>BLACK / HOODIE + TROUSERS</p>{setupJPY!==null&&<strong>{yen(setupJPY)}<small> 税込</small></strong>}</div>
          <div className="epFields">
            <label>数量<select name="setup_qty" value={setupQty} onChange={e=>{const q=Number(e.target.value);setSetupQty(q);if(q+teeQty>3)setTeeQty(3-q);}}>{[0,1,2,3].map(q=><option value={q} key={q}>{q}</option>)}</select></label>
            <label>パーカー<select name="hoodie_size" value={hoodieSize} onChange={e=>setHoodieSize(e.target.value)} disabled={setupQty===0}>{sizes.map(s=><option key={s}>{s}</option>)}</select></label>
            <label>パンツ<select name="pants_size" value={pantsSize} onChange={e=>setPantsSize(e.target.value)} disabled={setupQty===0}>{sizes.map(s=><option key={s}>{s}</option>)}</select></label>
          </div>
        </div>
        <section className="epHandwritten" aria-label="手書きカスタムオプション">
          <div className="epLine"><span>02 / PERSONAL EDITION</span><span>HANDWRITTEN CUSTOM</span></div>
          {handwrittenAvailable && handwrittenJPY!==null ? <>
            <p className="epOptionIntro">1着・1か所に、制作者が直接メッセージを書き入れます。先行販売の国内送料は追加料金なしです。</p>
            <label className="epConsent"><input name="handwritten" type="checkbox" value="yes" checked={handwritten} onChange={v=>setHandwritten(v.target.checked)}/>手書きオプションを追加する（+{yen(handwrittenJPY)}・税込）</label>
            {handwritten && <div className="epOptionFields">
              <label>加工する商品
                <select name="handwritten_target" value={handwrittenTarget} onChange={e=>setHandwrittenTarget(e.target.value==="setup"?"setup":"tee")}>
                  <option value="tee" disabled={teeQty!==1}>ホワイトTシャツ（数量1点）</option>
                  <option value="setup" disabled={setupQty!==1}>ブラックセットアップのパーカー（上下の数量1セット）</option>
                </select>
              </label>
              <label>入れたいメッセージ（20文字以内・改行なし）
                <textarea name="handwritten_text" rows={2} maxLength={40} required value={handwrittenText} onChange={e=>setHandwrittenText(e.target.value)} placeholder="手書きで入れたい短い言葉"/>
              </label>
              <p className="epSmallNotice">生地の素材・印字範囲・個体差・返品特約は販売条件をご確認ください。1注文につき手書き加工は1か所だけです。</p>
            </div>}
          </> : <p className="epOptionIntro">手書きメッセージは特別仕様として準備中です。制作者との契約・洗濯耐久試験・追加価格が確定するまで選択できません。</p>}
        </section>
        <div className="epExplanation">
          <p>商品画像は完成イメージです。素材・実寸・縫製仕様は商品説明・確定サイズ表をご確認ください。</p>
          <p>ご住所、連絡先、お支払い情報は次のStripe決済画面で入力します。現在の発送対象は日本国内です。</p>
        </div>
      </div>
      <aside className="epSummary">
        <p className="epLabel">02 / YOUR ORDER</p><h2>Order summary</h2>
        <div className="epRow"><span>商品代金（税込）</span><strong>{yen(subtotal)}</strong></div>
        {handwrittenCharge>0 && <div className="epRow"><span>うち手書き追加料金（税込）</span><strong>{yen(handwrittenCharge)}</strong></div>}
        <div className="epRow"><span>送料（先行販売・国内限定）</span><strong>{shipping===0?"無料 / ¥0":yen(shipping)}</strong></div>
        <div className="epRow epTotal"><span>合計（税込）</span><strong>{yen(subtotal+shipping)}</strong></div>
        <div className="epTerms"><p><strong>先行販売・前払い</strong></p><p>支払時期：注文確定時の一括決済（Stripe）。FIRST DROPは日本国内送料無料。</p><p>申込受付期限：{orderBy}</p><p>発送期限：{deliveryBy} まで</p><p>{presaleNote}</p><p><strong>キャンセル</strong>：{cancellationTerms}</p><p><strong>返品・交換</strong>：{returnTerms}</p><p><Link href="/ja/essentials/legal">特定商取引法に基づく表記・販売条件を見る</Link></p></div>
        <input type="hidden" name="terms_version" value={termsVersion??""}/>
        <label className="epConsent"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} name="accept_preorder" value="yes"/>先行販売であること、決済が先に行われ、発送期限が{deliveryBy}であることを確認しました。</label>
        <label className="epConsent"><input type="checkbox" checked={acceptedTerms} onChange={e=>setAcceptedTerms(e.target.checked)} name="accept_terms" value="yes"/>商品・数量・合計金額・キャンセル・返品条件を確認し、同意します。</label>
        <label className="epConsent"><input type="checkbox" checked={acknowledged} onChange={e=>setAcknowledged(e.target.checked)} name="accept_development_use" value="yes"/>販売による利益をRBAの育成活動に活用する方針を確認しました。</label>
        <button className="epPay" type="submit" disabled={!canCheckout}>Stripeで先行購入する <span aria-hidden="true">↗</span></button>
        <p className="epFine">商品を選択し、上記に同意すると購入画面へ進みます。注文確定前にStripeで最終内容を確認できます。</p>
      </aside>
    </form>:<section className="epOffline"><p>PRE-ORDER / COMING SOON</p><h2>First, we make it right.</h2><p>ホワイトTシャツ4,900円、ブラックパーカー上下19,800円（税込）。FIRST DROPの国内送料は無料です。現在は製造品質・納期・返品条件・決済の確認中につき、お支払いを受け付けていません。</p><a href={ESSENTIALS_INTEREST_FORM} target="_blank" rel="noopener noreferrer">先行注文申込（お支払い前） ↗</a><Link href="/ja/essentials">コレクションに戻る ↗</Link></section>}
    <style jsx>{`
.epWrap{color:#171715;background:#f5f4f0;min-height:75vh;padding:58px clamp(22px,6vw,110px) 105px;font-family:Arial,sans-serif}
.epWrap *{box-sizing:border-box}
.epHead{border-bottom:1px solid #aaa8a3;padding-bottom:36px;margin-bottom:55px}
.epHead>p:first-child,.epLabel,.epLine{font-size:10px;letter-spacing:.17em;color:#6e6b66}
.epHead h1{font-family:Georgia,serif;font-size:clamp(65px,10vw,140px);font-weight:400;line-height:1.1;letter-spacing:-.075em;margin:15px 0 25px}
.epHead h1 span{color:#a3a09a}.epHead>p:last-child{font-size:15px;line-height:2;color:#65615d;max-width:670px}
.epForm{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.75fr);gap:clamp(35px,6vw,110px)}
.epLine{display:flex;justify-content:space-between;border-bottom:1px solid #77736c;padding-bottom:18px}
.epItem{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #c8c5be;padding:32px 0}
.epItem h2{font-family:Georgia,serif;font-size:27px;font-weight:400;margin:0}
.epItem p{font-size:10px;letter-spacing:.09em;color:#77736b;margin:11px 0 17px}
.epItem strong{font-size:17px;font-weight:600}.epItem small{font-size:11px;color:#75716a}
.epFields{display:flex;align-items:end;flex-wrap:wrap;justify-content:flex-end;gap:10px}
.epFields label{display:flex;flex-direction:column;font-size:10px;color:#62605a;gap:9px}
.epFields select{padding:12px 15px;min-width:68px;background:#fff;border:1px solid #bbb8b0;color:#1e1d1b;font-size:15px}
.epFields select:disabled{opacity:.45}
.epHandwritten{margin-top:34px}.epOptionIntro,.epSmallNotice{font-size:12px;line-height:1.95;color:#68645f;margin:20px 0}.epOptionFields{display:flex;flex-direction:column;gap:16px;margin:22px 0}.epOptionFields label{display:flex;flex-direction:column;gap:9px;font-size:12px;line-height:1.7}.epOptionFields select,.epOptionFields textarea{font:inherit;font-size:14px;color:#171717;padding:12px;border:1px solid #bcb9b1;background:white;max-width:510px;width:100%}
.epExplanation{font-size:12px;line-height:1.9;color:#77716c;margin:28px 0}
.epSummary{background:#e9e7e1;padding:clamp(26px,3vw,47px);align-self:start}
.epSummary h2{font-family:Georgia,serif;font-weight:400;font-size:37px;letter-spacing:-.04em;margin:17px 0 30px}
.epRow{display:flex;justify-content:space-between;gap:16px;font-size:13px;padding:13px 0}
.epRow strong{font-weight:500}.epTotal{border-top:1px solid #9a968f;margin-top:14px;padding-top:26px;font-size:17px}
.epTerms{font-size:11px;line-height:1.9;color:#55514a;border-top:1px solid #b7b4ac;padding:20px 0;margin-top:26px}
.epTerms p{margin:8px 0}.epTerms a{color:#292722;text-decoration:underline}
.epConsent{display:flex;align-items:start;gap:12px;font-size:11px;line-height:1.9;padding:12px 0;color:#35332f}
.epConsent input{margin:5px 0 0;width:17px;height:17px;flex:none;accent-color:#1a1a1a}
.epPay{border:0;background:#171717;color:white;padding:21px 22px;display:flex;justify-content:space-between;align-items:center;gap:25px;width:100%;font-size:12px;letter-spacing:.06em;margin-top:22px;cursor:pointer}
.epPay:disabled{opacity:.45;cursor:not-allowed}.epFine{font-size:10px;line-height:1.8;color:#6f6b64;margin:17px 0 0}
.epOffline{max-width:750px;margin:50px auto;padding:70px 40px;text-align:center;border:1px solid #cbc8c1}
.epOffline>p:first-child{font-size:10px;letter-spacing:.18em}.epOffline h2{font-family:Georgia,serif;font-weight:400;font-size:clamp(34px,5vw,58px);margin:25px 0}
.epOffline>p:not(:first-child){font-size:14px;color:#66605a;line-height:2;max-width:490px;margin:0 auto 28px}
.epOffline>a{display:block;color:#24221f;text-underline-offset:4px;padding:12px}
@media(max-width:990px){.epForm{grid-template-columns:1fr}.epSummary{max-width:760px;width:100%}}
@media(max-width:560px){.epWrap{padding:42px 21px 65px}.epHead{margin-bottom:34px}.epHead h1{font-size:65px}.epItem{flex-direction:column}.epFields{justify-content:flex-start}.epSummary{padding:25px 20px}.epOffline{padding:50px 20px}}
`}</style>
  </div>;
}
