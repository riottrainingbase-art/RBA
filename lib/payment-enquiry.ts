import { eventPayments, formatJPY } from "@/components/payment-data";
import { programmeById } from "@/components/programme-data";
import type { Locale } from "@/components/site-frame";
export function paymentEnquiryUrl(optionId:string,locale:Locale="ja"){
 const match=Object.entries(eventPayments).flatMap(([programme,options])=>options.map(option=>({programme,...option}))).find(option=>option.id===optionId);
 const url=new URL("https://form.jotform.com/262590542634055");
 if(match){const p=programmeById[match.programme as keyof typeof programmeById];const title=p.title[locale==="en"?0:locale==="ja"?1:locale==="zh-tw"?2:3];url.searchParams.set("message",`${locale==="ja"?"お支払い方法の確認":"Payment enquiry"}\n${title}\n${match.label} / ${formatJPY(match.amount)}\n${locale==="ja"?"申込済みかどうか・ご質問をご記入ください：":"Application status / question:"}\n`);}
 return url.href;
}
