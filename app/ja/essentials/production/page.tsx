import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient as serviceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isRbaStoreOwner } from "@/lib/essentials-store-owner";
import { SiteFrame } from "@/components/site-frame";
import { updateEssentialsProduction } from "./actions";
import styles from "./production.module.css";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"RBA ESSENTIALS｜製作・発送管理",robots:{index:false,follow:false}};
type PaidOrder={order_id:string;paid_at:string;tee_quantity:number;tee_size:string|null;setup_quantity:number;hoodie_size:string|null;pants_size:string|null;dispatch_by:string;deliver_by:string|null;payment_status:string;handwritten:boolean;handwritten_target:string|null;handwritten_message:string|null;handwritten_addon_jpy:number};
type Task={order_id:string;stage:string;tracking_reference:string|null;carrier:string|null;dispatch_date:string|null;issue_note:string;updated_at:string};
const stageNames:Record<string,string>={
 awaiting_handoff:"製作受付待ち",accepted_by_production:"製作受付済み",materials_ready:"素材・サイズ確認済み",
 making:"製作中",quality_check:"検品中",packed:"梱包済み",shipped:"発送済み",
 delivered:"お届け完了",problem:"要確認",
};
const next:Record<string,readonly string[]>={
 awaiting_handoff:["accepted_by_production","problem"],
 accepted_by_production:["materials_ready","problem"],
 materials_ready:["making","problem"],
 making:["quality_check","problem"],
 quality_check:["packed","making","problem"],
 packed:["shipped","problem"],
 shipped:["delivered","problem"],
 delivered:[],
 problem:["accepted_by_production","materials_ready","making","quality_check","packed"],
};
export default async function RbaEssentialsProduction({searchParams}:{searchParams:Promise<{status?:string}>}){
 const db=await createClient();
 const {data:{user},error}=await db.auth.getUser();
 if(error||!user)notFound();
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!service)notFound();
 try{if(new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")notFound();}catch{notFound();}
 const admin=serviceClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const [profile,staff]=await Promise.all([
  db.from("profiles").select("role").eq("id",user.id).maybeSingle(),
  admin.from("rba_essentials_fulfillment_agents").select("active").eq("user_id",user.id).eq("active",true).maybeSingle(),
 ]);
 const isAdmin=profile.data?.role==="admin" || await isRbaStoreOwner(user.id);
 if(!isAdmin&&(!staff.data?.active||!!staff.error))notFound();
 const [orders,tasks,q]=await Promise.all([
  admin.from("rba_essentials_orders").select("order_id,paid_at,tee_quantity,tee_size,setup_quantity,hoodie_size,pants_size,dispatch_by,deliver_by,payment_status,handwritten,handwritten_target,handwritten_message,handwritten_addon_jpy").eq("payment_status","paid").order("paid_at",{ascending:false}).limit(100),
  admin.from("rba_essentials_fulfillment_tasks").select("order_id,stage,tracking_reference,carrier,dispatch_date,issue_note,updated_at").limit(100),
  searchParams,
 ]);
 const taskMap=new Map<string,Task>((tasks.data??[] as Task[]).map(t=>[t.order_id,t as Task]));
 const list=(orders.data??[]) as PaidOrder[];
 return <SiteFrame locale="ja"><main className={styles.page}>
  <section className={styles.head}>
    <div className={styles.kicker}><span>RBA ESSENTIALS / PRODUCTION</span><span>RESTRICTED ACCESS</span></div>
    <h1>From order<br/><em>to delivery.</em></h1>
    <p>RBAが販売・入金照合・製造依頼・工程記録を管理し、製造委託先は加工・検品・発送の作業を担当します。製造委託先のRBAアカウントは必須ではありません。入金が確認された注文のみ表示しています。</p>
    <div className={styles.meta}><strong>{list.length}</strong><span>PAID ORDERS / 最新100件まで表示</span></div>
    {q.status==="saved"&&<p className={styles.success} role="status">製作ステータスを記録しました。</p>}
    {q.status==="invalid"&&<p className={styles.error} role="alert">ステータスの順序、追跡番号、発送日または問題の記録を確認してください。</p>}
    {q.status==="error"&&<p className={styles.error} role="alert">更新できませんでした。支払い状態と権限、台帳を確認してください。</p>}
  </section>
  <section className={styles.body} aria-label="製作と発送の進行状況">
    {(orders.error||tasks.error)&&<p className={styles.error} role="alert">受注データを取得できませんでした。製作・発送は台帳が確認できてから進めてください。</p>}
    {!orders.error&&list.length===0&&<p className={styles.empty}>入金済み注文はまだありません。発注・製作は行わないでください。</p>}
    {!orders.error&&list.map(o=>{
      const t=taskMap.get(o.order_id);
      const stage=t?.stage||"awaiting_handoff";
      return <article className={styles.order} key={o.order_id}>
        <div className={styles.orderHeader}>
          <div><p className={styles.kicker}>RBA / PAID ORDER</p><h2>{o.order_id.slice(0,8).toUpperCase()}</h2><p className={styles.small}>入金日：{new Date(o.paid_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</p></div>
          <div><p className={styles.kicker}>PROGRESS</p><strong className={styles.stage}>{stageNames[stage]||stage}</strong><p className={styles.small}>発送期限：{o.dispatch_by}／お届け期限：{o.deliver_by??"要確認"}</p></div>
        </div>
        <p style={{margin:"20px 0",fontSize:12}}><Link href={`/ja/essentials/production/${o.order_id}/shipping`}>配送先を確認する（権限限定） ↗</Link></p>
        <div className={styles.items}>
          {o.tee_quantity>0&&<div><span>WHITE TEE</span><strong>Size {o.tee_size} × {o.tee_quantity}</strong></div>}
          {o.setup_quantity>0&&<div><span>BLACK SETUP</span><strong>Hoodie {o.hoodie_size} / Pants {o.pants_size} × {o.setup_quantity}</strong></div>}
        </div>
        {o.handwritten&&<div className={styles.personalization}>
          <strong>HANDWRITTEN CUSTOM / 製作指示</strong>
          <p>加工対象：{o.handwritten_target==="tee"?"白Tシャツ":"黒セットアップのパーカー"}</p>
          <p>お客様指定の文字：<span>{o.handwritten_message}</span></p>
          <p>追加加工料金（税込）：{o.handwritten_addon_jpy.toLocaleString("ja-JP")}円。書き間違いがないよう原文を確認してください。</p>
        </div>}
        {stage==="shipped"||stage==="delivered"?<p className={styles.small}>発送：{t?.carrier??"未設定"} / 追跡：{t?.tracking_reference??"未設定"} / 日付：{t?.dispatch_date??"未設定"}</p>:null}
        {stage==="problem"&&<p className={styles.error}>要対応：{t?.issue_note||"詳細未入力"}</p>}
        {(next[stage]||[]).length>0&&<form action={updateEssentialsProduction} className={styles.action}>
          <input type="hidden" name="order_id" value={o.order_id}/>
          <label>次の工程
            <select name="stage" defaultValue={next[stage]?.[0]}>{(next[stage]||[]).map(key=><option value={key} key={key}>{stageNames[key]}</option>)}</select>
          </label>
          <label>配送会社（発送済みにする場合は必須）
            <input name="carrier" placeholder="配送会社名" maxLength={80}/>
          </label>
          <label>追跡番号（発送済みにする場合は必須）
            <input name="tracking_reference" placeholder="運送会社の追跡番号" maxLength={140}/>
          </label>
          <label>発送日（発送済みにする場合は必須）
            <input name="dispatch_date" type="date"/>
          </label>
          <label className={styles.wide}>問題・遅延の記録（「要確認」を選択する場合は必須）
            <textarea name="issue_note" maxLength={1200} rows={2} placeholder="購入者の個人情報を記入しない"/>
          </label>
          <button type="submit">工程の変更を保存する <span aria-hidden="true">↗</span></button>
        </form>}
      </article>;
    })}
  </section>
  <footer className={styles.footer}>
   <p>この管理画面には配送先住所・電話番号を表示しません。顧客情報の共有は委託契約とアクセス権限確認後、必要最小限の範囲で行ってください。発送ステータスを更新しても購入者への自動メール送信は行われません。</p>
   {isAdmin&&<Link href="/ja/essentials/manage/readiness">販売条件・委託契約の確認 ↗</Link>}
   {isAdmin&&<Link href="/ja/essentials/manage">売上・注文管理 ↗</Link>}
  </footer>
 </main></SiteFrame>;
}
