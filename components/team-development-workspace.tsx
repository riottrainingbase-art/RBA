"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardList, Eye, LoaderCircle, Printer, RefreshCw, ShieldCheck, Target, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./team-development.module.css";

type Entity={id:string;name:string;country:string;region:string|null;city:string|null};
type Cycle={id:string;entity_id:string;team_id:string|null;event_id:string|null;title:string;source_service:string;package_key:string;status:string;clinic_on:string|null;plan_start_on:string|null;plan_end_on:string|null;next_followup_on:string|null;commercial_status:string;access_ends_at:string|null;created_at:string};
type Brief={cycle_id:string;age_group:string|null;player_count:number|null;training_days:string|null;training_frequency:string|null;current_context:string|null;team_strength:string|null;offense_challenge:string|null;defense_challenge:string|null;perception_decision_challenge:string|null;physical_challenge:string|null;coach_goal:string|null;desired_change:string|null;constraints:string|null;notes:string|null};
type Finding={id:string;cycle_id:string;domain:string;finding_type:string;observation:string;evidence:string|null;next_action:string|null;priority:number|null;created_at:string};
type Report={cycle_id:string;summary:string;strengths:string[];priorities:string[];coach_focus:string;player_message:string;family_message:string;status:string;issued_at:string|null;updated_at:string};
type Week={id:string;cycle_id:string;week_no:number;starts_on:string|null;ends_on:string|null;title:string;focus:string;objective:string;small_sided_game:string;coach_observation:string;player_question:string;status:string};
type Checkin={id:string;cycle_id:string;week_no:number|null;progress_state:string;worked:string;evidence:string;stuck:string;adjustment:string;submitted_at:string};

const sourceLabel:Record<string,string>={rba_team_clinic:"TEAM CLINIC",rba_visit_training:"VISIT TRAINING",partner_program:"PARTNER",self_started:"TEAM HOME",other:"OTHER"};
const statusLabel:Record<string,string>={intake:"事前入力",scheduled:"実施予定",observed:"観察済み",report_ready:"REPORT発行",plan_active:"30日実践中",review_due:"振り返り",completed:"完了",paused:"一時停止"};
const progressLabel:Record<string,string>={not_started:"まだ試していない",trying:"試している",more_consistent:"安定して増えてきた",embedded:"チームの習慣になってきた"};
const domainLabel:Record<string,string>={spacing:"SPACING",perception:"PERCEPTION",decision:"DECISION",advantage:"ADVANTAGE",off_ball:"OFF-BALL",transition:"TRANSITION",defense:"DEFENCE",communication:"COMMUNICATION",physical:"PHYSICAL",practice_design:"PRACTICE DESIGN",other:"OTHER"};

function splitLines(value:FormDataEntryValue|null){return String(value||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean);}
function datePlus(start:string,days:number){const d=new Date(`${start}T12:00:00+09:00`);d.setDate(d.getDate()+days);return d.toISOString().slice(0,10);}

export function TeamDevelopmentWorkspace({userId,isAdmin}:{userId:string;isAdmin:boolean}){
  const db=useMemo(()=>createClient(),[]);
  const [entities,setEntities]=useState<Entity[]>([]);
  const [cycles,setCycles]=useState<Cycle[]>([]);
  const [selectedId,setSelectedId]=useState("");
  const [brief,setBrief]=useState<Brief|null>(null);
  const [findings,setFindings]=useState<Finding[]>([]);
  const [report,setReport]=useState<Report|null>(null);
  const [weeks,setWeeks]=useState<Week[]>([]);
  const [checkins,setCheckins]=useState<Checkin[]>([]);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const [tab,setTab]=useState<"overview"|"brief"|"report"|"plan"|"checkin">("overview");

  const selected=cycles.find(x=>x.id===selectedId)||cycles[0]||null;
  const entityName=(id:string)=>entities.find(x=>x.id===id)?.name||"TEAM";

  async function loadEntities(){
    if(isAdmin){
      const q=await db.from("platform_entities").select("id,name,country,region,city").eq("status","active").order("name");
      const rows=(q.data||[]) as Entity[];setEntities(rows);return rows;
    }
    const membershipQ=await db.from("entity_memberships").select("entity_id,member_role,status").eq("user_id",userId).eq("status","active");
    const ids=(membershipQ.data||[]).filter(x=>["owner","admin"].includes(x.member_role)).map(x=>x.entity_id);
    const ownQ=await db.from("platform_entities").select("id,name,country,region,city").eq("created_by",userId);
    const own=(ownQ.data||[]) as Entity[];
    const missing=ids.filter(id=>!own.some(x=>x.id===id));
    let extra:Entity[]=[];
    if(missing.length){const q=await db.from("platform_entities").select("id,name,country,region,city").in("id",missing);extra=(q.data||[]) as Entity[];}
    const rows=[...own,...extra].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i);setEntities(rows);return rows;
  }

  async function loadCycles(){
    const q=await db.from("team_development_cycles").select("*").order("created_at",{ascending:false});
    const rows=(q.data||[]) as Cycle[];setCycles(rows);
    setSelectedId(current=>current&&rows.some(x=>x.id===current)?current:rows[0]?.id||"");
    return rows;
  }

  async function loadCycle(id:string){
    if(!id){setBrief(null);setFindings([]);setReport(null);setWeeks([]);setCheckins([]);return;}
    const [b,f,r,w,c]=await Promise.all([
      db.from("team_development_briefs").select("*").eq("cycle_id",id).maybeSingle(),
      db.from("team_development_findings").select("*").eq("cycle_id",id).order("finding_type").order("priority",{ascending:true,nullsFirst:false}).order("created_at"),
      db.from("team_development_reports").select("*").eq("cycle_id",id).maybeSingle(),
      db.from("team_development_plan_weeks").select("*").eq("cycle_id",id).order("week_no"),
      db.from("team_development_checkins").select("*").eq("cycle_id",id).order("submitted_at",{ascending:false}),
    ]);
    setBrief((b.data||null) as Brief|null);setFindings((f.data||[]) as Finding[]);setReport((r.data||null) as Report|null);setWeeks((w.data||[]) as Week[]);setCheckins((c.data||[]) as Checkin[]);
  }

  async function reload(preferred?:string){
    setBusy(true);
    try{
      await loadEntities();const rows=await loadCycles();const id=preferred||selectedId||rows[0]?.id||"";if(id){setSelectedId(id);await loadCycle(id);}
    }finally{setBusy(false);}
  }

  useEffect(()=>{const timer=window.setTimeout(()=>void reload(),0);return()=>window.clearTimeout(timer);},[]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(()=>{if(selectedId)void loadCycle(selectedId);},[selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function createCycle(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");const form=new FormData(e.currentTarget);
    const entityId=String(form.get("entity_id"));
    const source=isAdmin?String(form.get("source_service")):"self_started";
    const packageKey=isAdmin?String(form.get("package_key")):"custom";
    const commercialStatus=isAdmin?String(form.get("commercial_status")):"included";
    const clinicOn=String(form.get("clinic_on")||"")||null;
    const result=await db.from("team_development_cycles").insert({
      entity_id:entityId,title:String(form.get("title")).trim(),source_service:source,
      package_key:packageKey,status:clinicOn?"scheduled":"intake",clinic_on:clinicOn,
      plan_start_on:clinicOn,plan_end_on:clinicOn?datePlus(clinicOn,29):null,
      next_followup_on:clinicOn?datePlus(clinicOn,30):null,commercial_status:commercialStatus,
      created_by:userId
    }).select("id").single();
    setBusy(false);setMessage(result.error?"TEAM DEVELOPMENTを作成できませんでした。運営権限をご確認ください。":"TEAM DEVELOPMENTを作成しました。まず事前ヒアリングを入力してください。");
    if(!result.error){e.currentTarget.reset();await reload(result.data.id);setTab("brief");}
  }

  async function saveBrief(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!selected)return;setBusy(true);const form=new FormData(e.currentTarget);
    const payload={cycle_id:selected.id,submitted_by:userId,age_group:String(form.get("age_group")||"")||null,player_count:Number(form.get("player_count"))||null,
      training_days:String(form.get("training_days")||"").trim()||null,training_frequency:String(form.get("training_frequency")||"").trim()||null,
      current_context:String(form.get("current_context")||"").trim()||null,team_strength:String(form.get("team_strength")||"").trim()||null,
      offense_challenge:String(form.get("offense_challenge")||"").trim()||null,defense_challenge:String(form.get("defense_challenge")||"").trim()||null,
      perception_decision_challenge:String(form.get("perception_decision_challenge")||"").trim()||null,physical_challenge:String(form.get("physical_challenge")||"").trim()||null,
      coach_goal:String(form.get("coach_goal")||"").trim()||null,desired_change:String(form.get("desired_change")||"").trim()||null,
      constraints:String(form.get("constraints")||"").trim()||null,notes:String(form.get("notes")||"").trim()||null,updated_at:new Date().toISOString()};
    const result=await db.from("team_development_briefs").upsert(payload,{onConflict:"cycle_id"});
    setBusy(false);setMessage(result.error?"事前ヒアリングを保存できませんでした。":"事前ヒアリングを保存しました。RBAが当日の設計に使います。");if(!result.error)await loadCycle(selected.id);
  }

  async function addFinding(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!selected||!isAdmin)return;setBusy(true);const form=new FormData(e.currentTarget);
    const result=await db.from("team_development_findings").insert({cycle_id:selected.id,domain:String(form.get("domain")),finding_type:String(form.get("finding_type")),
      observation:String(form.get("observation")).trim(),evidence:String(form.get("evidence")||"").trim()||null,next_action:String(form.get("next_action")||"").trim()||null,
      priority:Number(form.get("priority"))||null,created_by:userId});
    setBusy(false);setMessage(result.error?"観察メモを保存できませんでした。":"RBA観察メモを追加しました。");if(!result.error){e.currentTarget.reset();await loadCycle(selected.id);}
  }

  async function saveReport(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!selected||!isAdmin)return;setBusy(true);const form=new FormData(e.currentTarget);
    const status=String(form.get("status"));
    const result=await db.from("team_development_reports").upsert({cycle_id:selected.id,summary:String(form.get("summary")||"").trim(),
      strengths:splitLines(form.get("strengths")),priorities:splitLines(form.get("priorities")),coach_focus:String(form.get("coach_focus")||"").trim(),
      player_message:String(form.get("player_message")||"").trim(),family_message:String(form.get("family_message")||"").trim(),
      status,issued_by:status==="issued"?userId:report?.status==="issued"?userId:null,issued_at:status==="issued"?(report?.issued_at||new Date().toISOString()):null,updated_at:new Date().toISOString()},{onConflict:"cycle_id"});
    if(!result.error&&status==="issued")await db.from("team_development_cycles").update({status:weeks.length?"plan_active":"report_ready",updated_at:new Date().toISOString()}).eq("id",selected.id);
    setBusy(false);setMessage(result.error?"REPORTを保存できませんでした。":status==="issued"?"RBA TEAM DEVELOPMENT REPORTを発行しました。":"REPORT下書きを保存しました。");if(!result.error)await reload(selected.id);
  }

  async function issueThirtyDayPlan(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!selected||!isAdmin)return;setBusy(true);const form=new FormData(e.currentTarget);
    const start=String(form.get("start_on")||selected.plan_start_on||new Date().toISOString().slice(0,10));
    const rows=[1,2,3,4].map(week=>({cycle_id:selected.id,week_no:week,starts_on:datePlus(start,(week-1)*7),ends_on:datePlus(start,week*7-1),
      title:String(form.get(`week_${week}_title`)||`WEEK ${week}`).trim(),focus:String(form.get(`week_${week}_focus`)||"").trim(),
      objective:String(form.get(`week_${week}_objective`)||"").trim(),small_sided_game:String(form.get(`week_${week}_ssg`)||"").trim(),
      coach_observation:String(form.get(`week_${week}_observe`)||"").trim(),player_question:String(form.get(`week_${week}_question`)||"").trim(),
      status:week===1?"active":"planned",created_by:userId,updated_at:new Date().toISOString()}));
    const result=await db.from("team_development_plan_weeks").upsert(rows,{onConflict:"cycle_id,week_no"});
    if(!result.error)await db.from("team_development_cycles").update({status:"plan_active",plan_start_on:start,plan_end_on:datePlus(start,27),next_followup_on:datePlus(start,30),updated_at:new Date().toISOString()}).eq("id",selected.id);
    setBusy(false);setMessage(result.error?"30日プランを保存できませんでした。":"30 DAY DEVELOPMENT PLANを発行しました。");if(!result.error)await reload(selected.id);
  }

  async function addCheckin(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!selected)return;setBusy(true);const form=new FormData(e.currentTarget);
    const result=await db.from("team_development_checkins").insert({cycle_id:selected.id,week_no:Number(form.get("week_no"))||null,submitted_by:userId,
      progress_state:String(form.get("progress_state")),worked:String(form.get("worked")||"").trim(),evidence:String(form.get("evidence")||"").trim(),
      stuck:String(form.get("stuck")||"").trim(),adjustment:String(form.get("adjustment")||"").trim()});
    setBusy(false);setMessage(result.error?"振り返りを保存できませんでした。":"チームの振り返りを保存しました。");if(!result.error){e.currentTarget.reset();await loadCycle(selected.id);}
  }

  const strengths=findings.filter(x=>x.finding_type==="strength");
  const priorities=findings.filter(x=>x.finding_type==="priority");
  const observations=findings.filter(x=>x.finding_type==="observation");
  const today=new Date().toISOString().slice(0,10);
  const scheduledCount=cycles.filter(x=>x.status==="scheduled").length;
  const activePlanCount=cycles.filter(x=>x.status==="plan_active").length;
  const followupDueCount=cycles.filter(x=>x.next_followup_on&&x.next_followup_on<=today&&!["completed","paused"].includes(x.status)).length;
  const partnerCount=cycles.filter(x=>x.commercial_status==="partner"||x.package_key==="partner").length;

  return <div className={styles.workspacePage}>
    <section className={styles.workspaceHero}><p>RBA / TEAM DEVELOPMENT</p><h1>チームのクリニックを、<br/>次の30日へ。</h1><p>事前ヒアリング、RBAの現場観察、TEAM REPORT、4週間の実践、指導者の振り返りを一つにつなぎます。選手個人の公開ランキングには使いません。</p></section>
    <nav className={styles.workspaceNav}>{([["overview","全体"],["brief","事前"],["report","REPORT"],["plan","30 DAYS"],["checkin","振り返り"]] as const).map(([key,label])=><button key={key} aria-pressed={tab===key} onClick={()=>setTab(key)}>{label}</button>)}</nav>
    {message?<p className={styles.message} role="status">{message}</p>:null}
    {isAdmin?<section className={styles.timelineStats}><article><span>SCHEDULED</span><strong>{scheduledCount}</strong><p>これから訪問・クリニック</p></article><article><span>30 DAYS</span><strong>{activePlanCount}</strong><p>実践中のチーム</p></article><article><span>FOLLOW-UP</span><strong>{followupDueCount}</strong><p>再確認のタイミング</p></article><article><span>PARTNER</span><strong>{partnerCount}</strong><p>継続パートナー</p></article></section>:null}

    <section className={styles.workspaceSection}>
      <div className={styles.workspaceGrid}>
        <aside className={styles.sidebar}>
          <div className={styles.panel}><h2>TEAM DEVELOPMENT</h2><p>管理しているチーム、またはRBA管理者として担当するチームの育成サイクルです。</p></div>
          {cycles.map(c=><button className={styles.cycleCard} data-active={selected?.id===c.id} key={c.id} onClick={()=>{setSelectedId(c.id);setTab("overview");}}><span>{sourceLabel[c.source_service]||c.source_service}</span><strong>{c.title}</strong><div className={styles.cycleMeta}><b>{entityName(c.entity_id)}</b><b>{statusLabel[c.status]||c.status}</b><b>{c.package_key}</b></div></button>)}
          {!cycles.length?<div className={styles.empty}><Users/><p>まだTEAM DEVELOPMENTはありません。</p></div>:null}
          {entities.length?<div className={styles.panel}><h3>新しいサイクル</h3><form className={styles.form} onSubmit={createCycle}>
            <label className={styles.wide}>チーム・団体<select name="entity_id" required>{entities.map(x=><option key={x.id} value={x.id}>{x.name} / {[x.region,x.city].filter(Boolean).join(" ")}</option>)}</select></label>
            <label className={styles.wide}>タイトル<input name="title" required placeholder="2026 秋｜RBA TEAM DEVELOPMENT"/></label>
            {isAdmin?<><label>入口<select name="source_service"><option value="rba_team_clinic">TEAM CLINIC</option><option value="rba_visit_training">VISIT TRAINING</option><option value="partner_program">PARTNER</option><option value="self_started">TEAM HOME</option></select></label>
            <label>プラン<select name="package_key"><option value="clinic">CLINIC</option><option value="clinic_30">CLINIC + 30</option><option value="partner">PARTNER</option><option value="custom">CUSTOM</option></select></label>
            <label>実施日<input name="clinic_on" type="date"/></label><label>利用区分<select name="commercial_status"><option value="included">INCLUDED</option><option value="trial">TRIAL</option><option value="active">ACTIVE</option><option value="partner">PARTNER</option></select></label></>:<><input type="hidden" name="source_service" value="self_started"/><input type="hidden" name="package_key" value="custom"/><input type="hidden" name="commercial_status" value="included"/><label className={styles.wide}>開始日（任意）<input name="clinic_on" type="date"/></label><p className={styles.wide}>RBA TEAM CLINIC / PARTNERの区分は、RBA側で実施確認後に設定します。</p></>}
            <button className={styles.wide} disabled={busy}>{busy?<LoaderCircle/>:<CheckCircle2/>}作成</button>
          </form></div>:<div className={styles.empty}><ShieldCheck/><p>まずチーム・団体の運営者確認を完了してください。</p><a href="/ja/my-homecourt/app/claim">運営者確認へ<ArrowRight/></a></div>}
        </aside>

        <main className={styles.main}>
          {!selected?<div className={styles.empty}><ClipboardList/><h2>TEAM DEVELOPMENTを選択してください。</h2></div>:<>
            {tab==="overview"?<>
              <div className={styles.panel}><span>{sourceLabel[selected.source_service]||selected.source_service}</span><h2>{selected.title}</h2><div className={styles.cycleMeta}><b>{entityName(selected.entity_id)}</b><b>{statusLabel[selected.status]||selected.status}</b><b>{selected.package_key}</b><b>{selected.commercial_status}</b>{selected.clinic_on?<b>{selected.clinic_on}</b>:null}{selected.next_followup_on?<b>FOLLOW-UP {selected.next_followup_on}</b>:null}</div><p>事前 → 現場 → REPORT → 30 DAYS → FOLLOW-UPの順に、一つのチーム履歴として残します。</p></div>
              <div className={styles.reportGrid}>
                <article><ClipboardList/><h3>事前ヒアリング</h3><p>{brief?"入力済み":"未入力"}。現在の課題と「何を変えたいか」を共有します。</p></article>
                <article><Eye/><h3>RBA OBSERVATION</h3><p>{findings.length}件。個人点数ではなく、チームに起きている現象を記録します。</p></article>
                <article><Target/><h3>TEAM REPORT</h3><p>{report?.status==="issued"?"発行済み":"未発行"}。強みと優先課題を次の練習へ落とします。</p></article>
                <article><RefreshCw/><h3>30 DAYS</h3><p>{weeks.length?weeks.length+"週を設定済み":"未設定"}。4週間の実践と振り返りをつなぎます。</p></article>
              </div>
              <div className={styles.panel}><h3>TEAM DEVELOPMENT TIMELINE</h3><div className={styles.checkins}>
                <div className={styles.checkinCard}><strong>START</strong><p>{selected.created_at.slice(0,10)} / {selected.title}</p></div>
                {selected.clinic_on?<div className={styles.checkinCard}><strong>CLINIC</strong><p>{selected.clinic_on} / RBA現場セッション</p></div>:null}
                {report?.issued_at?<div className={styles.checkinCard}><strong>REPORT</strong><p>{new Date(report.issued_at).toLocaleDateString("ja-JP")} / TEAM DEVELOPMENT REPORT発行</p></div>:null}
                {checkins.map(c=><div className={styles.checkinCard} key={c.id}><strong>WEEK {c.week_no||"-"} / {progressLabel[c.progress_state]||c.progress_state}</strong><p>{new Date(c.submitted_at).toLocaleDateString("ja-JP")} / {c.worked||"チーム振り返り"}</p></div>)}
              </div></div>
            </>:null}

            {tab==="brief"?<div className={styles.panel}><h2>BEFORE / 事前ヒアリング</h2><p>「何を教えてほしいか」だけでなく、普段のチームで何が起きているかをRBAへ共有します。</p><form className={styles.form} onSubmit={saveBrief}>
              <label>年代<input name="age_group" defaultValue={brief?.age_group||""} placeholder="U12 / U15"/></label><label>人数<input name="player_count" type="number" min="1" max="100" defaultValue={brief?.player_count||""}/></label>
              <label>活動曜日<input name="training_days" defaultValue={brief?.training_days||""}/></label><label>練習頻度<input name="training_frequency" defaultValue={brief?.training_frequency||""}/></label>
              <label className={styles.wide}>今のチーム状況<textarea name="current_context" rows={3} defaultValue={brief?.current_context||""}/></label>
              <label className={styles.wide}>チームの強み<textarea name="team_strength" rows={3} defaultValue={brief?.team_strength||""}/></label>
              <label>オフェンスで困っていること<textarea name="offense_challenge" rows={4} defaultValue={brief?.offense_challenge||""}/></label>
              <label>ディフェンスで困っていること<textarea name="defense_challenge" rows={4} defaultValue={brief?.defense_challenge||""}/></label>
              <label>見る・判断する部分の課題<textarea name="perception_decision_challenge" rows={4} defaultValue={brief?.perception_decision_challenge||""}/></label>
              <label>身体・負荷・動きの課題<textarea name="physical_challenge" rows={4} defaultValue={brief?.physical_challenge||""}/></label>
              <label className={styles.wide}>指導者が今回見てほしいこと<textarea name="coach_goal" rows={4} defaultValue={brief?.coach_goal||""}/></label>
              <label className={styles.wide}>30日後、どう変わっていてほしいか<textarea name="desired_change" rows={4} defaultValue={brief?.desired_change||""}/></label>
              <label className={styles.wide}>施設・人数・時間などの制約<textarea name="constraints" rows={3} defaultValue={brief?.constraints||""}/></label>
              <label className={styles.wide}>その他<textarea name="notes" rows={3} defaultValue={brief?.notes||""}/></label>
              <button className={styles.wide} disabled={busy}>事前ヒアリングを保存</button>
            </form></div>:null}

            {tab==="report"?<>
              <div className={styles.panel}><h2>RBA OBSERVATION</h2><p>個人の序列ではなく、チームに起きている現象を記録します。</p>
                <div className={styles.findings}>{[...strengths,...priorities,...observations].map(f=><article className={styles.findingCard} data-type={f.finding_type} key={f.id}><span>{domainLabel[f.domain]||f.domain} / {f.finding_type.toUpperCase()}</span><h3>{f.observation}</h3>{f.evidence?<p><strong>見えた事実：</strong>{f.evidence}</p>:null}{f.next_action?<p><strong>次の行動：</strong>{f.next_action}</p>:null}</article>)}</div>
                {isAdmin?<form className={styles.form} onSubmit={addFinding}><label>領域<select name="domain">{Object.entries(domainLabel).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><label>種類<select name="finding_type"><option value="strength">STRENGTH</option><option value="priority">PRIORITY</option><option value="observation">OBSERVATION</option></select></label><label>優先度<select name="priority"><option value="">—</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></label><label className={styles.wide}>観察<textarea name="observation" required rows={3}/></label><label className={styles.wide}>見えた事実<textarea name="evidence" rows={3}/></label><label className={styles.wide}>次の行動<textarea name="next_action" rows={3}/></label><button className={styles.wide} disabled={busy}>観察メモを追加</button></form>:null}
              </div>
              <div className={styles.report}>
                <p>RBA / TEAM DEVELOPMENT REPORT</p><h2>{entityName(selected.entity_id)}</h2>
                {report?.summary?<p>{report.summary}</p>:<p>REPORTはまだ発行されていません。</p>}
                {report?.strengths?.length?<><h3>STRENGTHS</h3><ul>{report.strengths.map(x=><li key={x}>{x}</li>)}</ul></>:null}
                {report?.priorities?.length?<><h3>NEXT PRIORITIES</h3><ul>{report.priorities.map(x=><li key={x}>{x}</li>)}</ul></>:null}
                {report?.coach_focus?<><h3>FOR COACHES</h3><p>{report.coach_focus}</p></>:null}
                {report?.player_message?<><h3>FOR PLAYERS</h3><p>{report.player_message}</p></>:null}
                {report?.family_message?<><h3>FOR FAMILIES</h3><p>{report.family_message}</p></>:null}
                <div className={styles.reportFooter}><span>{report?.status==="issued"?"RBA発行済み":"DRAFT"} {report?.issued_at?new Date(report.issued_at).toLocaleDateString("ja-JP"):""}</span><button className={styles.printButton} type="button" onClick={()=>window.print()}><Printer/>印刷 / PDF保存</button></div>
              </div>
              {isAdmin?<div className={styles.panel}><h2>REPORT編集</h2><form className={styles.form} onSubmit={saveReport}><label className={styles.wide}>総括<textarea name="summary" rows={5} defaultValue={report?.summary||""}/></label><label>強み（1行1項目）<textarea name="strengths" rows={6} defaultValue={(report?.strengths||[]).join("\n")}/></label><label>優先課題（1行1項目）<textarea name="priorities" rows={6} defaultValue={(report?.priorities||[]).join("\n")}/></label><label className={styles.wide}>指導者へ<textarea name="coach_focus" rows={4} defaultValue={report?.coach_focus||""}/></label><label className={styles.wide}>選手へ<textarea name="player_message" rows={4} defaultValue={report?.player_message||""}/></label><label className={styles.wide}>保護者へ<textarea name="family_message" rows={4} defaultValue={report?.family_message||""}/></label><label>状態<select name="status" defaultValue={report?.status||"draft"}><option value="draft">DRAFT</option><option value="issued">ISSUE / 発行</option></select></label><button className={styles.wide} disabled={busy}>REPORTを保存</button></form></div>:null}
            </>:null}

            {tab==="plan"?<>
              <div className={styles.panel}><h2>30 DAY DEVELOPMENT PLAN</h2><p>RBAが帰った後の4週間を、練習テーマ・ゲーム・観察点・選手への問いまで残します。</p><div className={styles.weeks}>{weeks.map(w=><article className={styles.weekCard} key={w.id}><span>W{w.week_no}</span><div><strong>{w.title}</strong><p>{w.focus}</p><dl><div><dt>OBJECTIVE</dt><dd>{w.objective||"—"}</dd></div><div><dt>SMALL-SIDED GAME</dt><dd>{w.small_sided_game||"—"}</dd></div><div><dt>COACH OBSERVES</dt><dd>{w.coach_observation||"—"}</dd></div><div><dt>PLAYER QUESTION</dt><dd>{w.player_question||"—"}</dd></div></dl></div></article>)}</div></div>
              {isAdmin?<div className={styles.panel}><h2>4週間を発行</h2><form className={styles.form} onSubmit={issueThirtyDayPlan}><label className={styles.wide}>開始日<input name="start_on" type="date" defaultValue={selected.plan_start_on||selected.clinic_on||new Date().toISOString().slice(0,10)}/></label>{[1,2,3,4].map(week=><div className={styles.wide} key={week}><h3>WEEK {week}</h3><div className={styles.form}><label>タイトル<input name={`week_${week}_title`} defaultValue={weeks.find(x=>x.week_no===week)?.title||""}/></label><label>FOCUS<input name={`week_${week}_focus`} defaultValue={weeks.find(x=>x.week_no===week)?.focus||""}/></label><label className={styles.wide}>目的<textarea name={`week_${week}_objective`} rows={2} defaultValue={weeks.find(x=>x.week_no===week)?.objective||""}/></label><label className={styles.wide}>Small-Sided Game<textarea name={`week_${week}_ssg`} rows={2} defaultValue={weeks.find(x=>x.week_no===week)?.small_sided_game||""}/></label><label>コーチが見ること<textarea name={`week_${week}_observe`} rows={3} defaultValue={weeks.find(x=>x.week_no===week)?.coach_observation||""}/></label><label>選手への問い<textarea name={`week_${week}_question`} rows={3} defaultValue={weeks.find(x=>x.week_no===week)?.player_question||""}/></label></div></div>)}<button className={styles.wide} disabled={busy}>30日プランを発行</button></form></div>:null}
            </>:null}

            {tab==="checkin"?<div className={styles.panel}><h2>WEEKLY CHECK-IN</h2><p>結果の勝ち負けではなく、「何が増えたか」「どこで止まっているか」「次に何を変えるか」を残します。</p><div className={styles.checkins}>{checkins.map(c=><article className={styles.checkinCard} key={c.id}><span>WEEK {c.week_no||"-"} / {new Date(c.submitted_at).toLocaleDateString("ja-JP")}</span><h3>{progressLabel[c.progress_state]||c.progress_state}</h3>{c.worked?<p><strong>良くなったこと：</strong>{c.worked}</p>:null}{c.evidence?<p><strong>見えた変化：</strong>{c.evidence}</p>:null}{c.stuck?<p><strong>詰まっていること：</strong>{c.stuck}</p>:null}{c.adjustment?<p><strong>次の調整：</strong>{c.adjustment}</p>:null}</article>)}</div><form className={styles.form} onSubmit={addCheckin}><label>週<select name="week_no">{weeks.length?weeks.map(w=><option key={w.week_no} value={w.week_no}>WEEK {w.week_no}</option>):[1,2,3,4].map(w=><option key={w} value={w}>WEEK {w}</option>)}</select></label><label>今の状態<select name="progress_state"><option value="not_started">まだ試していない</option><option value="trying">試している</option><option value="more_consistent">安定して増えてきた</option><option value="embedded">習慣になってきた</option></select></label><label className={styles.wide}>良くなったこと<textarea name="worked" rows={3}/></label><label className={styles.wide}>実際に見えた変化<textarea name="evidence" rows={3}/></label><label>詰まっていること<textarea name="stuck" rows={3}/></label><label>次の練習で変えること<textarea name="adjustment" rows={3}/></label><button className={styles.wide} disabled={busy}>今週の振り返りを保存</button></form></div>:null}
          </>}
        </main>
      </div>
    </section>
  </div>;
}
