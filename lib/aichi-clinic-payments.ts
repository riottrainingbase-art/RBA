import {aichiClinic,aichiFee} from "./aichi-clinic-2027";
export const aichiEvent="rba_aichi_clinic_2027";
export const aichiTermsVersion="aichi-2027-v1";
export const aichiPaymentPath=aichiClinic.path+"/apply";
export const aichiPlans=["am","pm","full"] as const;
export const aichiGrades=["小1","小2","小3","小4","小5","小6","中1","中2","中3"] as const;
export function getAichiPayment(plan:string,now=new Date(),env=process.env){
 if(!aichiPlans.some(x=>x===plan))return null;
 const capacity=Number(env.AICHI_CLINIC_CAPACITY);
 const grades=(env.AICHI_CLINIC_GRADES||"").split(",").map(x=>x.trim()).filter(x=>aichiGrades.some(g=>g===x));
 const available=env.AICHI_CLINIC_PAYMENT_ENABLED==="true"&&env.AICHI_CLINIC_VENUE_CONFIRMED==="true"&&env.AICHI_CLINIC_TERMS_VERSION===aichiTermsVersion&&!!env.AICHI_CLINIC_WEBHOOK_SECRET&&!!env.STRIPE_SECRET_KEY&&!!env.SUPABASE_SERVICE_ROLE_KEY&&Number.isSafeInteger(capacity)&&capacity===aichiClinic.capacity&&grades.length===aichiGrades.length&&new Set(grades).size===aichiGrades.length&&now.getTime()<Date.parse("2027-02-23T00:00:00+09:00");
 return {plan,title:plan==="am"?"午前のみ":plan==="pm"?"午後のみ":"終日",amount:aichiFee(plan==="full"?"full":"half",now.getTime()),capacity,grades,payable:available};
}
