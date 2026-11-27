import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { getMiyagiPayment } from "@/lib/miyagi-united-payments";
import { miyagiPath } from "@/components/united-miyagi";
import styles from "@/components/united-miyagi.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {title:"RBA UNITED｜申込・お支払い",robots:{index:false,follow:true}};

export default async function Page({searchParams}:{searchParams:Promise<{programme?:string;status?:string}>}){
 const params=await searchParams;
 const choices=(["shizugawa","rizehope"] as const).filter(x=>!params.programme||params.programme===x);
 return <SiteFrame locale="ja"><div className={styles.page}><section className={styles.section}>
   <a href={miyagiPath}>← 企画詳細へ</a>
   <h1>正式申込・お支払い</h1>
   <p>会員登録やログインは不要です。保護者の方が申込フォームを入力し、そのままお支払いへ進めます。</p>
   {choices.map(programme=>{
     const payment=getMiyagiPayment(programme);
     if(!payment)return null;
     return <article key={programme} className={styles.bridge}><h2>{payment.title}</h2>
       {payment.payable? <>
         <p>参加費（税込） <strong>{payment.amount?.toLocaleString("ja-JP")}円</strong>／1名</p>
         <p>参加資格・総費用・取消条件をご確認ください。支払済みの方は再手続き不要です。</p>
         <a className={styles.button} href={payment.formUrl!}>正式申込・決済へ →</a>
       </>:<>
         <p className={styles.notice}>正式受付準備中です。会場・受入枠・料金の確認後、このページから直接お申し込みいただけます。</p>
       </>}
     </article>;
   })}
   {!choices.length&&<a href={miyagiPath+"/payment"}>企画を選び直す</a>}
   <p><a href="/ja/policies#cancellation">参加規約</a>　<a href="mailto:riot.training.base@gmail.com">RBAへのご相談</a></p>
 </section></div></SiteFrame>;
}
