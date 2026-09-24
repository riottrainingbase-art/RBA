export const metadata = { robots: { index: false, follow: false } };
import { PaymentComplete } from "@/components/payment-complete";
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const q=await searchParams;const type=typeof q.type==="string"?q.type:undefined;return <PaymentComplete locale="ko" paymentType={type}/>}
