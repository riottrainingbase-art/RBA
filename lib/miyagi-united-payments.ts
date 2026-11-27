export const miyagiPaymentPath = "/ja/events/shizugawa-united-2027/payment";
const programmes = {
  shizugawa: {title:"志津川育成合宿",slug:"united-shizugawa-2027",key:"MIYAGI_UNITED_SHIZUGAWA",expires:"2027-02-06T00:00:00+09:00",early:29800,regular:33000},
  rizehope: {title:"RIZEHOPE JAPAN（UNITED個人参加）",slug:"united-rizehope-2027",key:"MIYAGI_UNITED_RIZEHOPE",expires:"2027-02-27T00:00:00+09:00",early:22000,regular:24800},
} as const;
export const miyagiTermsVersion="miyagi-2027-v1";
export const miyagiEvent="rba_miyagi_united_2027";
export const miyagiRegions=["青森","岩手","宮城","秋田","山形","福島"] as const;

export function getMiyagiPayment(programme:string,now=new Date(),env=process.env){
  if(!Object.hasOwn(programmes,programme))return null;
  const info=programmes[programme as keyof typeof programmes];
  const earlyUntil=Date.parse(env[info.key+"_EARLY_UNTIL"]??"");
  const capacity=Number(env[info.key+"_CAPACITY"]);
  const end=Date.parse(info.expires);
  const amount=now.getTime()<earlyUntil?info.early:info.regular;
  const payable=env[info.key+"_PAYMENT_ENABLED"]==="true"&&Number.isFinite(earlyUntil)&&earlyUntil<end&&Number.isSafeInteger(capacity)&&capacity>0&&now.getTime()<end&&env.MIYAGI_UNITED_TERMS_VERSION===miyagiTermsVersion&&!!env.MIYAGI_UNITED_WEBHOOK_SECRET&&!!env.STRIPE_SECRET_KEY&&!!env.SUPABASE_SERVICE_ROLE_KEY;
  return {title:info.title,slug:info.slug,early:info.early,regular:info.regular,amount:payable?amount:null,capacity,payable};
}

export function validMiyagiGrade(programme:string,grade:string,region:string){
 return programme==="rizehope"?grade==="小6"&&miyagiRegions.some(x=>x===region):programme==="shizugawa"&&["小4","小5","小6","中1","中2","中3"].includes(grade)&&region.length>0;
}
