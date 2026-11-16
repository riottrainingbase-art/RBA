import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";

export const dynamic = "force-dynamic";
const ORIGIN = "https://riotbasketballacademy.com";
const SIZES = new Set(["S","M","L","XL"]);
const asQty = (form:FormData, name:string) => {
  const val = form.get(name);
  if (typeof val !== "string" || !/^[0-3]$/.test(val)) return null;
  return Number(val);
};
const asSize = (form:FormData, name:string) => {
  const val = form.get(name);
  return typeof val === "string" && SIZES.has(val) ? val : null;
};
function fail(message:string,status=400) {
  return new NextResponse(message, {status,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});
}
export async function GET() { return fail("この決済ページは申込フォームからのみアクセスできます。",405); }

export async function POST(request:Request) {
  const source = request.headers.get("origin");
  if (!source) return fail("申込元を確認できません。",403);
  try {
    const sourceUrl = new URL(source);
    const requestedHost = new URL(request.url).host;
    if (sourceUrl.protocol !== "https:" || sourceUrl.host !== requestedHost) return fail("申込元を確認できません。",403);
  } catch { return fail("申込元を確認できません。",403); }
  const config=getEssentialsPresaleConfig();
  if(!config.ready || !config.unitPrices.tee || !config.unitPrices.setup ||
    config.shippingJPY!==0 || !config.dispatchDeadline || !config.deliveryDeadline || !config.orderDeadline || !config.termsVersion)
    return fail("現在、RBA ESSENTIALSの先行販売は準備中です。決済は受け付けていません。",423);
  const form=await request.formData().catch(()=>null);
  if(!form) return fail("申込内容が確認できませんでした。");
  const teeQty=asQty(form,"tee_qty"), setupQty=asQty(form,"setup_qty");
  if(teeQty===null || setupQty===null || teeQty+setupQty<1 || teeQty+setupQty>3)
    return fail("商品数量は合計1〜3点で選択してください。");
  const teeSize=asSize(form,"tee_size"), hoodieSize=asSize(form,"hoodie_size"), pantsSize=asSize(form,"pants_size");
  if((teeQty>0 && !teeSize) || (setupQty>0 && (!hoodieSize || !pantsSize)))
    return fail("Tシャツとセットアップのサイズを選択してください。");
  const handmade = form.get("handwritten")==="yes";
  const handwrittenTarget=form.get("handwritten_target");
  const rawMessage=form.get("handwritten_text");
  const handwrittenMessage=typeof rawMessage==="string"?rawMessage.normalize("NFC").trim():"";
  if (handmade && (!config.handwrittenAvailable || config.handwrittenJPY===null)) return fail("手書き加工の受付はまだ開始していません。",423);
  if (handmade && (
    (handwrittenTarget!=="tee"&&handwrittenTarget!=="setup") ||
    (handwrittenTarget==="tee" && teeQty!==1) ||
    (handwrittenTarget==="setup" && setupQty!==1) ||
    Array.from(handwrittenMessage).length<1 ||
    Array.from(handwrittenMessage).length>20 ||
    /[\r\n\t<>]/.test(handwrittenMessage)
  )) return fail("手書きの対象商品・文字数・文面を確認してください。");
  if(form.get("accept_preorder")!=="yes" || form.get("accept_terms")!=="yes" || form.get("accept_development_use")!=="yes"
    || form.get("terms_version")!==config.termsVersion)
    return fail("先行販売条件・利用規約への同意が必要です。");
  const orderID=crypto.randomUUID();
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  if(teeQty>0) items.push({quantity:teeQty,price_data:{
    currency:"jpy",unit_amount:config.unitPrices.tee,tax_behavior:"inclusive",
    product_data:{name:`RBA ESSENTIAL TEE / WHITE / ${teeSize}（先行販売）`,
      description:`先行販売・日本国内送料無料。お届け期限：${config.deliveryDeadline}。返品条件は公式サイト参照。` }
  }});
  if(setupQty>0) items.push({quantity:setupQty,price_data:{
    currency:"jpy",unit_amount:config.unitPrices.setup,tax_behavior:"inclusive",
    product_data:{name:`RBA ESSENTIAL SETUP / BLACK / Hoodie ${hoodieSize} & Pants ${pantsSize}（先行販売）`,
      description:`上下セット先行販売・日本国内送料無料。お届け期限：${config.deliveryDeadline}。返品条件は公式サイト参照。` }
  }});
  if (handmade && config.handwrittenJPY!==null) {
    items.push({quantity:1,price_data:{
      currency:"jpy",unit_amount:config.handwrittenJPY,tax_behavior:"inclusive",
      product_data:{name:"RBA ESSENTIALS / HANDWRITTEN LETTERING（衣類への直筆加工1か所）",
        description:"手書き文字・1着1か所。加工条件・返品・納期は購入前の販売規約に準拠。"}
    }});
  }
  if(items.length===0) return fail("商品を選択してください。");
  const metadata={
    program:"rba_essentials_presale",
    source:"rba_website",
    fulfillment:"preorder_pending",
    order_id:orderID,
    terms_version:config.termsVersion,
    dispatch_by:config.dispatchDeadline,
    deliver_by:config.deliveryDeadline,
    tee_qty:String(teeQty),
    tee_size:teeQty>0?teeSize!:"none",
    setup_qty:String(setupQty),
    hoodie_size:setupQty>0?hoodieSize!:"none",
    pants_size:setupQty>0?pantsSize!:"none",
    handwritten:handmade?"yes":"no",
    handwritten_target:handmade?String(handwrittenTarget):"none",
    handwritten_message:handmade?handwrittenMessage:"none",
    handwritten_addon_jpy:handmade?String(config.handwrittenJPY):"0",
    profit_use:"youth_basketball_development",
  };
  try {
    const secret=process.env.STRIPE_SECRET_KEY;
    if(!secret) return fail("現在、決済は準備中です。",503);
    const stripe=new Stripe(secret);
    // Never use another connected Stripe business or the test account by accident.
    if(!await verifyEssentialsStripeAccount(secret))
      return fail("RBA専用決済アカウントを確認できません。",503);
    const session=await stripe.checkout.sessions.create({
      mode:"payment",
      locale:"ja",
      client_reference_id:orderID,
      customer_creation:"always",
      phone_number_collection:{enabled:true},
      shipping_address_collection:{allowed_countries:["JP"]},
      shipping_options:[{shipping_rate_data:{
        type:"fixed_amount",display_name:"FIRST DROP / 日本国内送料無料",
        fixed_amount:{amount:config.shippingJPY,currency:"jpy"},
        tax_behavior:"inclusive",
      }}],
      line_items:items,
      metadata,
      payment_intent_data:{metadata},
      submit_type:"pay",
      success_url:ORIGIN+"/ja/essentials/complete?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:ORIGIN+"/ja/essentials/checkout?cancelled=1",
    },{idempotencyKey:"rba-essentials-"+orderID});
    if(!session.url || !/^https:\/\/checkout\.stripe\.com\//.test(session.url))
      return fail("Stripe決済ページの接続を確認できません。",503);
    const response=NextResponse.redirect(session.url,303);
    response.headers.set("Cache-Control","no-store");
    response.headers.set("Referrer-Policy","no-referrer");
    return response;
  } catch {
    return fail("Stripeへの接続を完了できませんでした。二重支払いを避けるため、確認後に再操作してください。",503);
  }
}
