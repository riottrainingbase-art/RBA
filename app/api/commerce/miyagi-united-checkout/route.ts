import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getMiyagiPayment, miyagiPaymentPath } from "@/lib/miyagi-united-payments";
import Stripe from "stripe";

export const dynamic="force-dynamic";
function redirect(request:Request,path:string){
 const response=NextResponse.redirect(new URL(path,request.url),303);
 response.headers.set("Cache-Control","private, no-store");
 response.headers.set("Referrer-Policy","no-referrer");
 return response;
}
export async function GET(){
 return new NextResponse("Method not allowed",{status:405,headers:{"Cache-Control":"no-store"}});
}
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin)return new NextResponse("Invalid origin",{status:403});
 const pending=()=>redirect(request,miyagiPaymentPath+"?status=pending");
 const form=await request.formData().catch(()=>null);
 const programme=form?.get("programme");
 if(typeof programme!=="string"||form?.get("accepted")!=="yes")return pending();
 const payment=getMiyagiPayment(programme);
 if(!payment?.payable||!payment.linkId||Number(form?.get("expectedAmount"))!==payment.amount)return pending();
 const secret=process.env.STRIPE_SECRET_KEY;
 if(!secret)return pending();
 try{
  const supabase=await createClient();
  const {data:{user},error:authError}=await supabase.auth.getUser();
  if(authError||!user)return redirect(request,"/ja/my-homecourt/login?next="+encodeURIComponent(miyagiPaymentPath+"?programme="+programme));
  const stripe=new Stripe(secret);
  const accountResponse=await fetch("https://api.stripe.com/v1/account",{headers:{Authorization:"Bearer "+secret},cache:"no-store"});
  if(!accountResponse.ok)return pending();
  const account=await accountResponse.json() as {id?:string};
  if(account.id!=="acct_1UGdxZRXDnnSs6XN")return pending();
  const link=await stripe.paymentLinks.retrieve(payment.linkId);
  if(!link.active||link.allow_promotion_codes||link.automatic_tax.enabled)return pending();
  const items=await stripe.paymentLinks.listLineItems(payment.linkId,{limit:2});
  if(items.has_more||items.data.length!==1)return pending();
  const item=items.data[0];
  if(item.quantity!==1||item.price?.currency!=="jpy"||item.price?.unit_amount!==payment.amount)return pending();
  // Existing gateway checks participant eligibility, application and capacity.
  const {data,error}=await supabase.functions.invoke("rba-checkout-gateway",{body:{offer_slug:payment.slug}});
  if(error||!data?.ok||data.decision!=="allowed"||!data.application_id)return pending();
  const url=new URL(data.checkout_url);
  const expected=new URL(link.url);
  if(url.protocol!=="https:"||!["buy.stripe.com","book.stripe.com"].includes(url.hostname)||url.username||url.password||expected.origin!==url.origin||expected.pathname!==url.pathname)return pending();
  return redirect(request,url.href);
 }catch{return pending();}
}
