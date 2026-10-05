"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, CreditCard, LoaderCircle, RefreshCw, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "./site-frame";
import styles from "./operations-dashboard.module.css";

type ExceptionItem={
  id:string;exception_type:string;severity:string;status:string;title:string;description:string|null;
  due_at:string|null;detected_at:string;metadata:Record<string,unknown>|null;
};
type OpsData={
  authorized:boolean;generated_at:string;summary:Record<string,unknown>|null;
  unmatched:Array<{id:string;customer_email:string|null;amount_total:number|null;currency:string;reason:string;created_at:string}>;
  failed_webhooks:Array<{stripe_event_id:string;event_type:string;error_message:string|null;received_at:string}>;
  exceptions:ExceptionItem[];
  monthly_kpis:Array<{month:string;business_unit_code:string|null;business_unit_name:string|null;revenue_jpy:number|null;operating_profit_jpy:number|null;founder_dependent_revenue_jpy:number|null;founder_dependency_pct:number|null}>;
  founder_required_events:Array<{event_id:string|null;title:string|null;starts_at:string|null;business_unit_code:string|null;actual_revenue_jpy:number|null;actual_profit_jpy:number|null;close_status:string|null}>;
  pending_applications:number;
};

const yen=(value:number|null|undefined)=>`¥${Number(value||0).toLocaleString("ja-JP")}`;

export function OperationsDashboard({locale}:{locale:Locale}){
  const supabase=useMemo(()=>createClient(),[]);
  const [data,setData]=useState<OpsData|null>(null);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState("");
  const [error,setError]=useState("");

  const load=useCallback(async()=>{
    setLoading(true);setError("");
    const {data:result,error:invokeError}=await supabase.functions.invoke("rba-operations-console",{method:"GET"});
    if(invokeError||!result?.authorized){setError(locale==="ja"?"Operationsを読み込めませんでした。権限または接続を確認してください。":"Unable to load Operations.");setLoading(false);return;}
    setData(result as OpsData);setLoading(false);
  },[locale,supabase]);

  useEffect(()=>{void load();},[load]);

  async function action(actionName:string,exceptionId?:string){
    setBusy(exceptionId||actionName);setError("");
    const {error:invokeError}=await supabase.functions.invoke("rba-operations-console",{
      method:"POST",body:{action:actionName,exception_id:exceptionId}
    });
    if(invokeError){setError(locale==="ja"?"更新できませんでした。":"Update failed.");setBusy("");return;}
    await load();setBusy("");
  }

  if(loading)return <section className={styles.shell}><LoaderCircle className={styles.spin}/><p>OPERATIONS LOADING</p></section>;
  if(error&&!data)return <section className={styles.shell}><AlertTriangle/><p>{error}</p></section>;
  if(!data)return null;

  const high=data.exceptions.filter(x=>["critical","high"].includes(x.severity)).length;
  const latestMonth=data.monthly_kpis[0]?.month||null;
  const latestRows=latestMonth?data.monthly_kpis.filter(x=>x.month===latestMonth):[];
  const revenue=latestRows.reduce((sum,x)=>sum+Number(x.revenue_jpy||0),0);
  const founderRevenue=latestRows.reduce((sum,x)=>sum+Number(x.founder_dependent_revenue_jpy||0),0);
  const founderPct=revenue?Math.round(founderRevenue/revenue*1000)/10:0;

  return <section className={styles.shell}>
    <header className={styles.header}>
      <div><p>RBA OPERATIONS</p><h1>{locale==="ja"?"例外だけを見る運営画面":"Operations by exception"}</h1><span>{locale==="ja"?"正常系はシステムに任せ、判断が必要なものだけ処理します。":"Let the system run normal work and handle exceptions only."}</span></div>
      <button onClick={()=>action("refresh_exceptions")} disabled={Boolean(busy)}><RefreshCw/> {locale==="ja"?"再判定":"Refresh"}</button>
    </header>

    {error?<div className={styles.error}><AlertTriangle/>{error}</div>:null}

    <div className={styles.metrics}>
      <article><AlertTriangle/><span>OPEN EXCEPTIONS</span><strong>{data.exceptions.length}</strong></article>
      <article><ShieldCheck/><span>HIGH / CRITICAL</span><strong>{high}</strong></article>
      <article><CreditCard/><span>UNMATCHED PAYMENT</span><strong>{data.unmatched.length}</strong></article>
      <article><Activity/><span>FAILED WEBHOOK</span><strong>{data.failed_webhooks.length}</strong></article>
      <article><CheckCircle2/><span>PENDING APPLICATION</span><strong>{data.pending_applications}</strong></article>
      <article><span>FOUNDER DEPENDENCY</span><strong>{founderPct}%</strong><small>{latestMonth||"—"}</small></article>
    </div>

    <div className={styles.grid}>
      <div className={styles.panel}>
        <div className={styles.panelHead}><div><p>EXCEPTION QUEUE</p><h2>{locale==="ja"?"対応が必要":"Needs action"}</h2></div><span>{data.exceptions.length}</span></div>
        <div className={styles.list}>
          {data.exceptions.map(item=><article key={item.id} className={styles.exception}>
            <div className={styles.tags}><b data-level={item.severity}>{item.severity.toUpperCase()}</b><span>{item.exception_type}</span><span>{item.status}</span></div>
            <strong>{item.title}</strong>
            {item.description?<p>{item.description}</p>:null}
            <small>{new Date(item.detected_at).toLocaleString(locale)}</small>
            <div className={styles.actions}>
              {item.status==="open"?<button disabled={busy===item.id} onClick={()=>action("acknowledge_exception",item.id)}>{locale==="ja"?"対応中にする":"Acknowledge"}</button>:null}
              <button disabled={busy===item.id} onClick={()=>action("resolve_exception",item.id)}>{locale==="ja"?"解決済みにする":"Resolve"}</button>
            </div>
          </article>)}
          {!data.exceptions.length?<div className={styles.empty}><CheckCircle2/><p>{locale==="ja"?"未処理の例外はありません。":"No open exceptions."}</p></div>:null}
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHead}><div><p>PAYMENT</p><h2>{locale==="ja"?"決済例外":"Payment exceptions"}</h2></div></div>
        <div className={styles.list}>
          {data.unmatched.map(item=><article key={item.id} className={styles.compact}><strong>{yen(item.amount_total)}</strong><span>{item.customer_email||"NO EMAIL"}</span><p>{item.reason}</p><small>{new Date(item.created_at).toLocaleString(locale)}</small></article>)}
          {data.failed_webhooks.map(item=><article key={item.stripe_event_id} className={styles.compact}><strong>{item.event_type}</strong><p>{item.error_message||"Webhook processing failed"}</p><small>{new Date(item.received_at).toLocaleString(locale)}</small></article>)}
          {!data.unmatched.length&&!data.failed_webhooks.length?<div className={styles.empty}><CheckCircle2/><p>{locale==="ja"?"決済例外はありません。":"No payment exceptions."}</p></div>:null}
        </div>
      </div>
    </div>

    <div className={styles.panel}>
      <div className={styles.panelHead}><div><p>FOUNDER LOAD</p><h2>{locale==="ja"?"Founder必須として残っている案件":"Founder-required delivery"}</h2></div><span>{data.founder_required_events.length}</span></div>
      <div className={styles.eventGrid}>
        {data.founder_required_events.map((item,index)=><article key={item.event_id||index}><span>{item.business_unit_code||"RBA"}</span><strong>{item.title||"Untitled event"}</strong><p>{item.starts_at?new Date(item.starts_at).toLocaleDateString(locale):"—"}</p><small>{yen(item.actual_revenue_jpy)} / PROFIT {yen(item.actual_profit_jpy)}</small></article>)}
      </div>
    </div>
  </section>;
}
