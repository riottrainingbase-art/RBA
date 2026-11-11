"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarCheck2, CheckCircle2, Download, LockKeyhole, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { csvEscape } from "@/lib/homecourt-match";
import styles from "./member-entry-desk.module.css";

type Event={id:string;slug:string;title:string;starts_at:string|null;status:string;capacity:number|null;registration_url:string|null};
type Registration={id:string;event_slug:string;status:string;paid_at:string|null;created_at:string};
type Application={id:string;event_id:string|null;status:string};
type Order={id:string;event_id:string|null;status:string};
type Checkin={id:string;event_id:string;status:string;checked_in_at:string|null};
type Counts={event:Event;intake:number;paidClinic:number;applications:number;paidOrders:number;checkedIn:number;withdrawn:number;unlinked:boolean};

function summarize(event:Event, regs:Registration[], apps:Application[], orders:Order[], checks:Checkin[]):Counts{
  const a=regs.filter(x=>x.event_slug===event.slug);
  return {
    event,
    intake:a.filter(x=>x.status==="submitted"||x.status==="paid").length,
    paidClinic:a.filter(x=>x.status==="paid" && Boolean(x.paid_at)).length,
    withdrawn:a.filter(x=>x.status==="withdrawn").length,
    applications:apps.filter(x=>x.event_id===event.id&&x.status==="submitted").length,
    paidOrders:orders.filter(x=>x.event_id===event.id&&x.status==="paid").length,
    checkedIn:checks.filter(x=>x.event_id===event.id&&Boolean(x.checked_in_at)).length,
    unlinked:a.length===0 && !apps.some(x=>x.event_id===event.id) && !orders.some(x=>x.event_id===event.id),
  };
}

export function MemberEntryDesk({userId}:{userId:string}){
  const db=useMemo(()=>createClient(),[]);
  const [loading,setLoading]=useState(true);
  const [failure,setFailure]=useState("");
  const [events,setEvents]=useState<Counts[]>([]);
  const [unlinked,setUnlinked]=useState({clinics:0,orders:0});
  const [filter,setFilter]=useState("future");
  const reload=useCallback(async()=>{
    const {data:auth,error:authError}=await db.auth.getUser();
    if(authError||auth.user?.id!==userId)throw new Error("RBA IDのログインを確認できませんでした。");
    // Fetch only IDs and state counters; never move children's names, phones or
    // media-consent information into this reporting component.
    const [ev,reg,app,ord,check]=await Promise.all([
      db.from("events").select("id,slug,title,starts_at,status,capacity,registration_url").order("starts_at",{ascending:false}).limit(80),
      db.from("clinic_registrations").select("id,event_slug,status,paid_at,created_at").limit(1000),
      db.from("program_applications").select("id,event_id,status").limit(1000),
      db.from("platform_orders").select("id,event_id,status").limit(1000),
      db.from("event_checkins").select("id,event_id,status,checked_in_at").limit(1000),
    ]);
    if(ev.error||reg.error||app.error||ord.error||check.error)throw new Error("運営データの権限・取得状況を確認してください。");
    const registered=(reg.data||[]) as Registration[];
    const applications=(app.data||[]) as Application[];
    const orders=(ord.data||[]) as Order[];
    const checkins=(check.data||[]) as Checkin[];
    const source=(ev.data||[]) as Event[];
    setEvents(source.map(e=>summarize(e,registered,applications,orders,checkins)));
    const slugs=new Set(source.map(e=>e.slug)), ids=new Set(source.map(e=>e.id));
    setUnlinked({
      clinics:registered.filter(x=>!slugs.has(x.event_slug)).length,
      orders:orders.filter(x=>x.event_id&&!ids.has(x.event_id)).length,
    });
  },[db,userId]);
  useEffect(()=>{let live=true;void reload().catch(e=>{if(live)setFailure(e instanceof Error?e.message:"情報を読み込めませんでした。")}).finally(()=>{if(live)setLoading(false)});return()=>{live=false}},[reload]);
  const now=new Date();
  const display=events.filter(row=>filter==="all"||(filter==="future"?row.event.starts_at && new Date(row.event.starts_at)>now:row.event.starts_at && new Date(row.event.starts_at)<=now));
  const totals=events.reduce((a,x)=>({intake:a.intake+x.intake,paid:a.paid+x.paidClinic,order:a.order+x.paidOrders,checkins:a.checkins+x.checkedIn}),{intake:0,paid:0,order:0,checkins:0});
  const download=()=>{
    const cols=["イベント","開始日","公開状態","受付（clinicのみ）","clinic入金確認","別申請（重複あり）","注文入金（重複あり）","チェックイン","欠席・取下げ（clinic）","外部受付の未集計"];
    const lines=[cols.map(csvEscape).join(","),...display.map(x=>[
      x.event.title,x.event.starts_at?.slice(0,10)||"",x.event.status,
      x.intake,x.paidClinic,x.applications,x.paidOrders,x.checkedIn,x.withdrawn,"要別途確認"
    ].map(csvEscape).join(","))];
    const url=URL.createObjectURL(new Blob(["\ufeff"+lines.join("\r\n")],{type:"text/csv;charset=utf-8"}));
    try{const a=document.createElement("a");a.href=url;a.download="rba-entry-audit.csv";document.body.append(a);a.click();a.remove()}finally{window.setTimeout(()=>URL.revokeObjectURL(url),1000)}
  };
  return <section className={styles.desk} aria-labelledby="entry-desk-title">
    <div className={styles.hero}>
      <p>MY HOMECOURT / RBA ENTRY</p>
      <h1 id="entry-desk-title">申込・入金・来場を分けて確認。</h1>
      <span><LockKeyhole size={18}/>RBA管理者専用。保護者・選手の氏名や連絡先はこの画面に表示しません。</span>
    </div>
    {failure?<p role="alert" className={styles.failure}>{failure}</p>:null}
    {loading?<p role="status">運営情報を取得しています…</p>:<>
      <div className={styles.metrics}>
        <article><span>RBAイベント</span><strong>{events.length}</strong></article>
        <article><span>Clinic受付</span><strong>{totals.intake}</strong></article>
        <article><span>Clinic入金確認</span><strong>{totals.paid}</strong></article>
        <article><span>来場確認</span><strong>{totals.checkins}</strong></article>
      </div>
      <p className={styles.note}>この集計はRBA HOMECOURT内の特定DBテーブルのみです。Google Form、Square、外部Stripe、DM、BASTET等の主催者が受けた申込は含みません。複数の登録・注文テーブルを合算すると二重計上のおそれがあるため、別々に表示しています。</p>
      <div className={styles.controls}>
        <label>表示範囲 <select value={filter} onChange={e=>setFilter(e.target.value)}><option value="future">今後のイベント</option><option value="past">過去のイベント</option><option value="all">すべて</option></select></label>
        <button type="button" onClick={download} disabled={!display.length}><Download size={17}/>集計CSVを出力</button>
      </div>
      {display.length?<div className={styles.cards}>
        {display.map(x=><article key={x.event.id}>
          <div className={styles.eventHeading}><span>{x.event.status}</span><h2>{x.event.title}</h2><small>{x.event.starts_at?new Date(x.event.starts_at).toLocaleDateString("ja-JP",{timeZone:"Asia/Tokyo"}):"日程未設定"}</small></div>
          <div className={styles.counts}>
            <div><span>Clinic受付</span><strong>{x.intake}</strong></div>
            <div><span>Clinic入金確認</span><strong>{x.paidClinic}</strong></div>
            <div><span>別申請</span><strong>{x.applications}</strong></div>
            <div><span>注文入金</span><strong>{x.paidOrders}</strong></div>
            <div><span>来場記録</span><strong>{x.checkedIn}</strong></div>
          </div>
          <p>定員：{typeof x.event.capacity==="number"?x.event.capacity+"人":"未設定"} / 外部受付：未集計 / 自動残枠：算出しません</p>
          {x.unlinked?<small className={styles.warn}>このイベントに紐づく内部受付記録は未確認です。申込ゼロの証明ではありません。</small>:null}
          {x.event.registration_url?<a href={x.event.registration_url} target="_blank" rel="noopener noreferrer">登録されている申込導線を確認 ↗</a>:null}
        </article>)}
      </div>:<p className={styles.empty}>この期間に登録されたイベントはありません。公式サイト掲載と内部イベント表が一致するか、別途監査してください。</p>}
      {(unlinked.clinics>0||unlinked.orders>0)?<div className={styles.warnBox}>
        <ShieldCheck size={20}/><div><strong>未連携の記録があります</strong><p>内部イベント表に照合できないClinic受付 {unlinked.clinics}件 / 別注文 {unlinked.orders}件。勝手に紐づけたり、参加確定として数えたりしないでください。</p></div>
      </div>:null}
      <div className={styles.next}>
        <p>次の業務チェック</p>
        <ul>
          <li><CheckCircle2 size={17}/>公式LP・Google Form・Square・Stripeの受付を照合</li>
          <li><CheckCircle2 size={17}/>未払い・返金・重複申込を除いて確定名簿を作成</li>
          <li><CheckCircle2 size={17}/>会場承認・保険・引渡し方法・当日スタッフを確認</li>
          <li><CheckCircle2 size={17}/>実際の入金記録と照合後に参加確定連絡を送信</li>
        </ul>
        <a href="/ja/organizer"><CalendarCheck2 size={17}/>地域主催者向け RBA ORGANIZERを見る</a>
      </div>
    </>}
  </section>;
}
