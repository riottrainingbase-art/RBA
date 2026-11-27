import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { getMiyagiPayment, miyagiRegions, miyagiTermsVersion } from "@/lib/miyagi-united-payments";
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
   {params.status==="cancelled"&&<p className={styles.notice}>お支払い画面を閉じました。既に決済済みの場合は再決済不要です。未決済の申込についてはRBAにご連絡ください。</p>}
   {choices.map(programme=>{
     const payment=getMiyagiPayment(programme);
     if(!payment)return null;
     return <article key={programme} className={styles.bridge}><h2>{payment.title}</h2>
       <p>早期価格（税込）{payment.early.toLocaleString("ja-JP")}円 ／ 通常価格（税込）{payment.regular.toLocaleString("ja-JP")}円（1名）</p>
       <p>募集定員：{programme==="shizugawa"?30:12}名。早期価格は2026年12月6日（日）23:59（日本時間）まで。</p>
       {payment.payable? <>
         <p>参加費（税込） <strong>{payment.amount?.toLocaleString("ja-JP")}円</strong>／1名</p>
         <p>参加資格・総費用・取消条件をご確認ください。支払済みの方は再手続き不要です。</p>
         <form className={styles.application} method="POST" action="/api/commerce/miyagi-united-checkout">
           <input type="hidden" name="programme" value={programme}/><input type="hidden" name="amount" value={payment.amount!}/><input type="hidden" name="termsVersion" value={miyagiTermsVersion}/>
           <label>保護者氏名<input name="guardian" required maxLength={100} autoComplete="name"/></label>
           <label>保護者メール<input name="email" type="email" required maxLength={254} autoComplete="email"/></label>
           <label>保護者電話番号<input name="phone" type="tel" required maxLength={32} autoComplete="tel"/></label>
           <label>選手氏名<input name="player" required maxLength={100}/></label>
           <label>学年<select name="grade" required defaultValue=""><option value="" disabled>選択してください</option>{(programme==="rizehope"?["小6"]:["小4","小5","小6","中1","中2","中3"]).map(x=><option key={x}>{x}</option>)}</select></label>
           <label>都道府県{programme==="rizehope"?<select name="region" required defaultValue=""><option value="" disabled>選択してください</option>{miyagiRegions.map(x=><option key={x}>{x}</option>)}</select>:<input name="region" required maxLength={40}/>}</label>
           <label>所属チーム（任意）<input name="team" maxLength={100}/></label>
           <p>参加費は1名分・税込です。<a href="/ja/policies">参加規約・キャンセル・返金方針</a>をご確認ください。主催者都合の中止・受入不可の場合は全額返金します。</p>
           <label className={styles.agree}><input type="checkbox" name="accepted" value="yes" required/> 私は保護者または法定代理人で、参加条件・安全方針・個人情報の取扱い・取消条件に同意します。</label>
           <button className={styles.button} type="submit">{payment.amount?.toLocaleString("ja-JP")}円で申込・Stripe決済へ →</button>
         </form>
       </>:<>
         <p className={styles.notice}>正式受付準備中です。会場・受入枠・料金の確認後、このページから直接お申し込みいただけます。</p>
       </>}
     </article>;
   })}
   {!choices.length&&<a href={miyagiPath+"/payment"}>企画を選び直す</a>}
   <p><a href="/ja/policies#cancellation">参加規約</a>　<a href="mailto:riot.training.base@gmail.com">RBAへのご相談</a></p>
 </section></div></SiteFrame>;
}
