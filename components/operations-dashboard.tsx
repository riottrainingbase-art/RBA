"use client";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, CreditCard, LoaderCircle, RefreshCw, ShieldCheck, UserPlus, Users, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "./site-frame";
import styles from "./operations-dashboard.module.css";

type ExceptionItem={
  id:string;exception_type:string;severity:string;status:string;title:string;description:string|null;
  due_at:string|null;detected_at:string;metadata:Record<string,unknown>|null;
};
type FounderEvent={event_id:string|null;title:string|null;starts_at:string|null;business_unit_code:string|null;actual_revenue_jpy:number|null;actual_profit_jpy:number|null;close_status:string|null};
type Operator={user_id:string;member_role:string;status:string;is_entity_creator:boolean;email:string|null;display_name:string|null};
type FounderDigest={
  high_exception_count:number;unmatched_payment_count:number;failed_webhook_count:number;pending_application_count:number;
  founder_required_next_14_days:FounderEvent[];founder_dependency_pct:number;month:string|null;
};
type OpsData={
  authorized:boolean;operator_role:string|null;can_manage_operators:boolean;generated_at:string;summary:Record<string,unknown>|null;
  unmatched:Array<{id:string;customer_email:string|null;amount_total:number|null;currency:string;reason:string;created_at:string}>;
  failed_webhooks:Array<{stripe_event_id:string;event_type:string;error_message:string|null;received_at:string}>;
  exceptions:ExceptionItem[];
  monthly_kpis:Array<{month:string;business_unit_code:string|null;business_unit_name:string|null;revenue_jpy:number|null;operating_profit_jpy:number|null;founder_dependent_revenue_jpy:number|null;founder_dependency_pct:number|null}>;
  founder_required_events:FounderEvent[];
  operators:Operator[];
  pending_applications:number;
  founder_digest:FounderDigest;
};

const yen=(value:number|null|undefined)=>`¥${Number(value||0).toLocaleString("ja-JP")}`;

export function OperationsDashboard({locale}:{locale:Locale}){
  const supabase=useMemo(()=>createClient(),[]);
  const [data,setData]=useState<OpsData|null>(null);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState("");
  const [error,setError]=useState("");
  const [operatorEmail,setOperatorEmail]=useState("");

  const load=useCallback(async()=>{
    setLoading(true);setError("");
    const {data:result,error:invokeError}=await supabase.functions.invoke("rba-operations-console",{method:"GET"});
    if(invokeError||!result?.authorized){setError(locale==="ja"?"Operationsを読み込めませんでした。権限または接続を確認してください。":"Unable to load Operations.");setLoading(false);return;}
    setData(result as OpsData);setLoading(false);
  },[locale,supabase]);

  useEffect(()=>{const timer=window.setTimeout(()=>void load(),0);return()=>window.clearTimeout(timer);},[load]);

  async function action(actionName:string,payload:Record<string,unknown>={}){
    const actionKey=String(payload.exception_id||payload.user_id||actionName);
    setBusy(actionKey);setError("");
    const {data:result,error:invokeError}=await supabase.functions.invoke("rba-operations-console",{
      method:"POST",body:{action:actionName,...payload}
    });
    if(invokeError||!result?.ok){
      const code=String(result?.error||"");
      const message=code==="rba_id_not_found"
        ? (locale==="ja"?"そのメールアドレスのRBA IDが見つかりません。先にRBA ID登録が必要です。":"RBA ID not found for that email.")
        : code==="owner_required"
          ? (locale==="ja"?"運営担当者の変更はOwnerだけが行えます。":"Only the owner can manage operators.")
          : (locale==="ja"?"更新できませんでした。":"Update failed.");
      setError(message);setBusy("");return false;
    }
    await load();setBusy("");return true;
  }

  async function addOperator(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const email=operatorEmail.trim().toLowerCase();
    if(!email)return;
    const ok=await action("grant_operator",{email});
    if(ok)setOperatorEmail("");
  }

  if(loading)return <section className={styles.shell}><LoaderCircle className={styles.spin}/><p>OPERATIONS LOADING</p></section>;
  if(error&&!data)return <section className={styles.shell}><AlertTriangle/><p>{error}</p></section>;
  if(!data)return null;

  const digest=data.founder_digest;
  const high=data.exceptions.filter(x=>["critical","high"].includes(x.severity)).length;

  return <section className={styles.shell}>
    <header className={styles.header}>
      <div><p>RBA OPERATIONS / {String(data.operator_role||"operator").toUpperCase()}</p><h1>{locale==="ja"?"例外だけを見る運営画面":"Operations by exception"}</h1><span>{locale==="ja"?"正常系はシステムに任せ、判断が必要なものだけ処理します。":"Let the system run normal work and handle exceptions only."}</span></div>
      <button onClick={()=>action("refresh_exceptions")} disabled={Boolean(busy)}><RefreshCw/> {locale==="ja"?"再判定":"Refresh"}</button>
    </header>

    {error?<div className={styles.error}><AlertTriangle/>{error}</div>:null}

    <section className={styles.founderDigest}>
      <div className={styles.digestHead}>
        <div><p>FOUNDER DIGEST</p><h2>{locale==="ja"?"西尾氏が見るのは、ここだけ":"Founder-only attention"}</h2></div>
        <span>{digest.month||"CURRENT"}</span>
      </div>
      <div className={styles.digestGrid}>
        <article><span>{locale==="ja"?"重大例外":"High exceptions"}</span><strong>{digest.high_exception_count}</strong></article>
        <article><span>{locale==="ja"?"決済要確認":"Payment issues"}</span><strong>{digest.unmatched_payment_count+digest.failed_webhook_count}</strong></article>
        <article><span>{locale==="ja"?"確認待ち申込":"Pending applications"}</span><strong>{digest.pending_application_count}</strong></article>
        <article><span>{locale==="ja"?"14日以内Founder必須":"Founder / 14 days"}</span><strong>{digest.founder_required_next_14_days.length}</strong></article>
        <article><span>{locale==="ja"?"Founder依存売上":"Founder dependency"}</span><strong>{digest.founder_dependency_pct}%</strong></article>
      </div>
      {digest.founder_required_next_14_days.length?<div className={styles.digestEvents}>{digest.founder_required_next_14_days.map((item,index)=><article key={item.event_id||index}><span>{item.business_unit_code||"RBA"}</span><strong>{item.title||"Untitled event"}</strong><small>{item.starts_at?new Date(item.starts_at).toLocaleDateString(locale):"—"}</small></article>)}</div>:<div className={styles.digestClear}><CheckCircle2/>{locale==="ja"?"14日以内にFounder必須の現場はありません。":"No founder-required delivery in the next 14 days."}</div>}
    </section>

    <div className={styles.metrics}>
      <article><AlertTriangle/><span>OPEN EXCEPTIONS</span><strong>{data.exceptions.length}</strong></article>
      <article><ShieldCheck/><span>HIGH / CRITICAL</span><strong>{high}</strong></article>
      <article><CreditCard/><span>UNMATCHED PAYMENT</span><strong>{data.unmatched.length}</strong></article>
      <article><Activity/><span>FAILED WEBHOOK</span><strong>{data.failed_webhooks.length}</strong></article>
      <article><CheckCircle2/><span>PENDING APPLICATION</span><strong>{data.pending_applications}</strong></article>
      <article><Users/><span>OPERATORS</span><strong>{data.operators.length}</strong></article>
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
              {item.status==="open"?<button disabled={busy===item.id} onClick={()=>action("acknowledge_exception",{exception_id:item.id})}>{locale==="ja"?"対応中にする":"Acknowledge"}</button>:null}
              <button disabled={busy===item.id} onClick={()=>action("resolve_exception",{exception_id:item.id})}>{locale==="ja"?"解決済みにする":"Resolve"}</button>
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

    <div className={styles.panel}>
      <div className={styles.panelHead}><div><p>OPERATIONS TEAM</p><h2>{locale==="ja"?"西尾氏以外が処理できる体制":"Delegated operators"}</h2></div><span>{data.operators.length}</span></div>
      {data.can_manage_operators?<form className={styles.operatorForm} onSubmit={addOperator}><label>{locale==="ja"?"RBA IDのメールアドレス":"RBA ID email"}<input type="email" value={operatorEmail} onChange={e=>setOperatorEmail(e.target.value)} placeholder="name@example.com" required/></label><button disabled={Boolean(busy)}><UserPlus/>{locale==="ja"?"運営担当に追加":"Add operator"}</button></form>:null}
      <div className={styles.operatorList}>{data.operators.map(item=><article key={item.user_id}><div><strong>{item.display_name||item.email||"RBA OPERATOR"}</strong><span>{item.email||"—"}</span><small>{item.is_entity_creator?"FOUNDER / OWNER":item.member_role.toUpperCase()}</small></div>{data.can_manage_operators&&!item.is_entity_creator&&item.member_role==="staff"?<button aria-label={locale==="ja"?"運営権限を解除":"Remove operator"} disabled={busy===item.user_id} onClick={()=>action("revoke_operator",{user_id:item.user_id})}><X/></button>:null}</article>)}</div>
    </div>
  </section>;
}
