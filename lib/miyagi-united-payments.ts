export const miyagiPaymentPath = "/ja/events/shizugawa-united-2027/payment";
const programmes = {
  shizugawa: {title:"志津川育成合宿",slug:"united-shizugawa-2027",key:"MIYAGI_UNITED_SHIZUGAWA",expires:"2027-02-06T00:00:00+09:00"},
  rizehope: {title:"RIZEHOPE JAPAN（UNITED個人参加）",slug:"united-rizehope-2027",key:"MIYAGI_UNITED_RIZEHOPE",expires:"2027-02-27T00:00:00+09:00"},
} as const;

export function getMiyagiPayment(programme:string,now=new Date(),env=process.env){
  if(!Object.hasOwn(programmes,programme))return null;
  const info=programmes[programme as keyof typeof programmes];
  const amount=Number(env[info.key+"_AMOUNT_JPY"]);
  const linkId=env[info.key+"_PAYMENT_LINK_ID"];
  const payable=env[info.key+"_PAYMENT_ENABLED"]==="true"&&Number.isSafeInteger(amount)&&amount>0&&!!linkId&&now<new Date(info.expires);
  return {title:info.title,slug:info.slug,amount:payable?amount:null,linkId,payable};
}
