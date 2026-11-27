import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { getMiyagiPayment } from "@/lib/miyagi-united-payments";
import { miyagiPath, shizugawaInterest, rizehopeInterest } from "@/components/united-miyagi";
import styles from "@/components/united-miyagi.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {title:"RBA UNITED｜申込・お支払い",robots:{index:false,follow:true}};

export default async function Page({searchParams}:{searchParams:Promise<{programme?:string;status?:string}>}){
 const params=await searchParams;
 const choices=(["shizugawa","rizehope"] as const).filter(x=>!params.programme||params.programme===x);
 return <SiteFrame locale="ja"><div className={styles.page}><section className={styles.section}>
   <a href={miyagiPath}>← 企画詳細へ</a>
   <h1>無料登録の次へ</h1>
   <p>参加意向登録後、各企画の受付状況を確認し、正式申込とお支払いに進めます。</p>
   {params.status==="pending"&&<p className={styles.notice}>受入枠・申込・決済条件を確認できませんでした。再決済せずRBAへご確認ください。</p>}
   {choices.map(programme=>{
     const payment=getMiyagiPayment(programme);
     if(!payment)return null;
     return <article key={programme} className={styles.bridge}><h2>{payment.title}</h2>
       {payment.payable? <>
         <p>参加費（税込） <strong>{payment.amount?.toLocaleString("ja-JP")}円</strong>／1名</p>
         <p>正式条件を確認した保護者の方は無料RBA IDでログインし、決済へ進んでください。支払済みの方は再手続き不要です。</p>
         <form method="POST" action="/api/commerce/miyagi-united-checkout">
           <input type="hidden" name="programme" value={programme}/>
           <input type="hidden" name="expectedAmount" value={payment.amount??0}/>
           <label><input type="checkbox" name="accepted" value="yes" required/> 参加資格・総費用・取消条件を確認し、保護者として同意します。</label>
           <p><button className={styles.button} type="submit">正式申込確認・Stripe決済へ</button></p>
         </form>
       </>:<>
         <p className={styles.notice}>無料参加意向受付中。会場・受入枠・料金の正式条件を確認後、お支払いを開始します。今はお支払い不要です。</p>
         <a className={styles.button} href={programme==="shizugawa"?shizugawaInterest:rizehopeInterest}>まだの方は無料登録へ</a>
       </>}
     </article>;
   })}
   {!choices.length&&<a href={miyagiPath+"/payment"}>企画を選び直す</a>}
   <p><a href="/ja/policies#cancellation">参加規約</a>　<a href="mailto:riot.training.base@gmail.com">RBAへのご相談</a></p>
 </section></div></SiteFrame>;
}
