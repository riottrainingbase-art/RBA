export const miyagiPaymentPath = "/ja/events/shizugawa-united-2027/payment";
const programmes = {
  shizugawa: {title:"志津川育成合宿",slug:"united-shizugawa-2027",key:"MIYAGI_UNITED_SHIZUGAWA",expires:"2027-02-06T00:00:00+09:00"},
  rizehope: {title:"RIZEHOPE JAPAN（UNITED個人参加）",slug:"united-rizehope-2027",key:"MIYAGI_UNITED_RIZEHOPE",expires:"2027-02-27T00:00:00+09:00"},
} as const;

export function getMiyagiPayment(programme:string,now=new Date(),env=process.env){
  if(!Object.hasOwn(programmes,programme))return null;
  const info=programmes[programme as keyof typeof programmes];
  const amount=Number(env[info.key+"_AMOUNT_JPY"]);
  const formUrl=env[info.key+"_PAID_FORM_URL"]??"";
  const approvedForm=/^https:\/\/form\.jotform\.com\/\d{15}$/.test(formUrl)&&!/(263298832487069|263243952545057|263223566035050)$/.test(formUrl);
  const payable=env[info.key+"_PAYMENT_ENABLED"]==="true"&&Number.isSafeInteger(amount)&&amount>0&&approvedForm&&now<new Date(info.expires);
  return {title:info.title,slug:info.slug,amount:payable?amount:null,formUrl:payable?formUrl:null,payable};
}
