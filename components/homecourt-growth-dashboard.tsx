"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  growthActivityWeeks,
  growthAreaTrends,
  growthAreas,
  growthContexts,
  growthStages,
  growthSummary,
  todayJst,
  type GrowthArea,
  type GrowthCheckin,
  type GrowthContext,
  type GrowthGoal,
  type GrowthHistory,
  type GrowthObservation,
  type GrowthObserver,
  type GrowthStage,
} from "@/lib/homecourt-growth";
import styles from "./homecourt-growth-dashboard.module.css";

type Props={
  userId:string;
  personId:string;
  personName:string;
  relationship:"self"|"child";
  history:readonly GrowthHistory[];
  checkins:readonly GrowthCheckin[];
  goals:readonly GrowthGoal[];
  onAddCheckin:()=>void;
  onAddGoal:()=>void;
};
type Draft={
  observed_on:string;
  area:GrowthArea;
  stage:GrowthStage;
  context:GrowthContext;
  observer_kind:GrowthObserver;
  evidence:string;
};
const areaKeys=new Set<string>(growthAreas.map(item=>item.key));
const contextKeys=new Set<string>(growthContexts.map(item=>item.value));
const stageLabel=(value:number)=>growthStages.find(s=>s.value===value)?.label||"—";
const dayLabel=(value:string)=>value.replace(/^(\d{4})-(\d{2})-(\d{2})$/,"$1/$2/$3");
function startDraft(day:string,relationship:"self"|"child"):Draft{
  return {observed_on:day,area:"scan",stage:2,context:"practice",observer_kind:relationship==="child"?"guardian":"self",evidence:""};
}
function ObservationTrend({items,label}:{items:readonly GrowthObservation[];label:string}){
  if(items.length<2)return <div className={styles.graphEmpty}>2回以上の観察記録が集まると、ここに変化を表示します。</div>;
  const ordered=items.slice(-14);
  const firstTime=Date.parse(ordered[0].observed_on+"T00:00:00Z");
  const lastTime=Date.parse(ordered[ordered.length-1].observed_on+"T00:00:00Z");
  const span=Math.max(1,lastTime-firstTime);
  const points=ordered.map(item=>{
    const x=24+((Date.parse(item.observed_on+"T00:00:00Z")-firstTime)/span)*252;
    const y=73-(item.stage-1)*18;
    return {x,y,stage:item.stage,date:item.observed_on};
  });
  const polyline=points.map(p=>`${p.x},${p.y}`).join(" ");
  return <div className={styles.trendGraph}>
    <svg viewBox="0 0 300 102" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label={`${label}の自己・保護者観察の推移。最初${ordered[0].stage}段階、最新${ordered[ordered.length-1].stage}段階。記録日順。`}>
      {[1,2,3,4].map(stage=><g key={stage}><line x1="24" x2="276" y1={73-(stage-1)*18} y2={73-(stage-1)*18} className={styles.gridLine}/><text x="7" y={77-(stage-1)*18} className={styles.axisText}>{stage}</text></g>)}
      <polyline points={polyline} fill="none" className={styles.trendLine}/>
      {points.map((p,i)=><circle key={p.date+"-"+i} cx={p.x} cy={p.y} r={i===points.length-1?4.5:3} className={styles.trendPoint}><title>{dayLabel(p.date)}：{stageLabel(p.stage)}</title></circle>)}
      <text x="24" y="97" className={styles.dateText}>{ordered[0].observed_on.slice(5).replace("-","/")}</text>
      <text x="276" y="97" textAnchor="end" className={styles.dateText}>{ordered[ordered.length-1].observed_on.slice(5).replace("-","/")}</text>
    </svg>
    <span className={styles.chartNote}>記録された観察段階の推移です。実力の客観評価ではありません。</span>
  </div>;
}
export function HomecourtGrowthDashboard({userId,personId,personName,relationship,history,checkins,goals,onAddCheckin,onAddGoal}:Props){
  const db=useMemo(()=>createClient(),[]);
  const day=useMemo(()=>todayJst(),[]);
  const [observations,setObservations]=useState<GrowthObservation[]>([]);
  const [loading,setLoading]=useState(true);
  const [loadError,setLoadError]=useState("");
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);
  const [draft,setDraft]=useState<Draft>(()=>startDraft(day,relationship));
  const [editingId,setEditingId]=useState<string|null>(null);
  const load=useCallback(async()=>{
    const {data,error}=await db.from("homecourt_growth_observations")
      .select("id,observed_on,area,stage,context,observer_kind,evidence")
      .eq("user_id",userId).eq("person_id",personId)
      .order("observed_on",{ascending:false}).order("created_at",{ascending:false}).limit(500);
    if(error)throw error;
    setObservations((data||[]) as GrowthObservation[]);
  },[db,userId,personId]);
  useEffect(()=>{
    let active=true;
    const read=async()=>{
      try{
        const {data,error}=await db.from("homecourt_growth_observations")
          .select("id,observed_on,area,stage,context,observer_kind,evidence")
          .eq("user_id",userId).eq("person_id",personId)
          .order("observed_on",{ascending:false}).order("created_at",{ascending:false}).limit(500);
        if(error)throw error;
        if(active){setObservations((data||[]) as GrowthObservation[]);setLoadError("");}
      }catch{
        if(active)setLoadError("観察記録の読込みに失敗しました。既存の記録は変更されていません。");
      }finally{if(active)setLoading(false);}
    };
    void read();
    return()=>{active=false;};
  },[db,userId,personId]);
  const summary=useMemo(()=>growthSummary(checkins,history,goals,observations,day),[checkins,history,goals,observations,day]);
  const latest=useMemo(()=>checkins.slice().filter(x=>x.checked_on).sort((a,b)=>(b.checked_on||"").localeCompare(a.checked_on||""))[0],[checkins]);
  const highestWeek=Math.max(1,...summary.weeks.map(w=>w.days));
  const activeGoal=goals.find(g=>g.status==="active");
  function change<K extends keyof Draft>(key:K,value:Draft[K]){setDraft(prev=>({...prev,[key]:value}));}
  async function save(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(busy||!personId)return;
    if(!/^\d{4}-\d{2}-\d{2}$/.test(draft.observed_on)||draft.observed_on>day||draft.observed_on<"2000-01-01"
       ||!areaKeys.has(draft.area)||!contextKeys.has(draft.context)||draft.stage<1||draft.stage>4
       ||!["self","guardian"].includes(draft.observer_kind)||draft.evidence.length>500){
      setMessage("日付・観察項目・入力文字数を確認してください。");return;
    }
    const payload={user_id:userId,person_id:personId,observed_on:draft.observed_on,area:draft.area,
      stage:draft.stage,context:draft.context,observer_kind:draft.observer_kind,evidence:draft.evidence.trim()};
    setBusy(true);setMessage("");
    try{
      const result=editingId
        ?await db.from("homecourt_growth_observations").update(payload).eq("id",editingId)
            .eq("user_id",userId).eq("person_id",personId).select("id").single()
        :await db.from("homecourt_growth_observations").upsert(payload,{onConflict:"user_id,person_id,observed_on,area"}).select("id").single();
      if(result.error)throw result.error;
      await load();
      setDraft(startDraft(day,relationship));setEditingId(null);
      setMessage("観察記録を保存しました。変化のグラフに反映しています。");
    }catch{
      setMessage("保存できませんでした。日付と同じ項目の重複、通信状態をご確認ください。入力内容は残っています。");
    }finally{setBusy(false);}
  }
  async function remove(id:string){
    if(busy||!window.confirm("この観察記録を削除しますか？ 削除後は元に戻せません。"))return;
    setBusy(true);setMessage("");
    try{
      const {data,error}=await db.from("homecourt_growth_observations").delete()
        .eq("id",id).eq("user_id",userId).eq("person_id",personId).select("id").single();
      if(error||!data)throw new Error("delete");
      await load();setEditingId(null);setDraft(startDraft(day,relationship));setMessage("観察記録を削除しました。");
    }catch{setMessage("削除できませんでした。もう一度ご確認ください。");}
    finally{setBusy(false);}
  }
  function edit(item:GrowthObservation){
    setEditingId(item.id);
    setDraft({observed_on:item.observed_on,area:item.area,stage:item.stage,context:item.context,
      observer_kind:item.observer_kind,evidence:item.evidence||""});
    document.getElementById("homecourt-growth-form")?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  return <section className={styles.dashboard} aria-labelledby="growth-title">
    <header className={styles.intro}>
      <p className={styles.kicker}>MY GROWTH / PERSONAL DEVELOPMENT</p>
      <h3 id="growth-title">{personName}の成長を、記録から見る。</h3>
      <p>今までの自分と今の自分を見比べます。練習・ゲームで「見た、選んだ、試した、修正した」ことを残し、継続して振り返りましょう。</p>
      <small>この画面は本人・保護者が残した非公開の記録だけを使います。自動採点、他の子との比較、選抜・医学的評価ではありません。</small>
    </header>
    <div className={styles.stats} aria-label="保存済みの成長記録の集計">
      <article><span>直近12週の記録日</span><strong>{summary.recordedDays}<small>日</small></strong><p>練習日数ではなく記録を残した日</p></article>
      <article><span>記録のある週</span><strong>{summary.weeksWithNotes}<small>/12週</small></strong><p>記録がない週も練習不足を意味しません</p></article>
      <article><span>観察したテーマ</span><strong>{summary.areasObserved}<small>/6</small></strong><p>自分で選んだ観察領域</p></article>
      <article><span>達成と記録した目標</span><strong>{summary.achievedGoals}<small>件</small></strong><p>本人・保護者による登録結果</p></article>
    </div>
    <section className={styles.activity} aria-labelledby="growth-activity">
      <div className={styles.sectionTitle}><div><span>12-WEEK RECORD</span><h4 id="growth-activity">振り返りを重ねた12週間</h4></div><small>単位：記録した日数／週</small></div>
      <div className={styles.weekChart} role="img" aria-label={summary.weeks.map(w=>w.daysLabel).join("、")}>
        {summary.weeks.map(w=><div key={w.start} className={styles.weekCol} title={w.daysLabel}>
          <div className={styles.barTrack}><span style={{height:`${w.days?Math.max(12,100*w.days/highestWeek):0}%`}} className={w.days?styles.bar:styles.barEmpty}/></div>
          <span>{w.start.slice(5).replace("-","/")}</span>
          <strong>{w.days}</strong>
        </div>)}
      </div>
      <p className={styles.chartFoot}>棒の高さは記録日数を表します。実際の練習回数、努力量、能力を測定するものではありません。</p>
    </section>
    <section className={styles.areas} aria-labelledby="growth-areas-title">
      <div className={styles.sectionTitle}><div><span>DECISION / ACTION / REFLECTION</span><h4 id="growth-areas-title">6つの観察テーマ</h4></div><small>本人・保護者の観察記録を比較</small></div>
      {loading?<p role="status">観察記録を読み込んでいます…</p>:loadError?<p role="alert" className={styles.error}>{loadError}</p>:
      <div className={styles.areaGrid}>{summary.areas.map(area=>{
        const detail=growthAreas.find(a=>a.key===area.area)!;
        return <article key={area.area} className={styles.areaCard}>
          <span className={styles.areaKicker}>{detail.label} <small>{area.items.length}件</small></span>
          <p>{detail.hint}</p>
          <div className={styles.areaCurrent}>
            {area.latest?<><strong>{stageLabel(area.latest.stage)}</strong><small>最近の観察：{dayLabel(area.latest.observed_on)}</small></>:<strong className={styles.emptyText}>まだ記録がありません</strong>}
          </div>
          <ObservationTrend items={area.items} label={detail.label}/>
          {area.first&&area.items.length>=2?<p className={styles.baseline}>最初：{stageLabel(area.first.stage)} ／ 最近：{stageLabel(area.latest!.stage)}</p>:null}
        </article>;
      })}</div>}
    </section>
    <section className={styles.nextFocus} aria-label="前回の気づきと次の一歩">
      <div><span>RECENT REFLECTION</span><h4>最近の気づき</h4>{latest?<p>{latest.strengths||"記録なし"}</p>:<p>振り返りを記録すると、ここに表示されます。</p>}<button type="button" onClick={onAddCheckin}>振り返りを残す</button></div>
      <div><span>NEXT ACTION</span><h4>次に試すこと</h4><p>{latest?.next_action||activeGoal?.action||"次の練習で試すことを一つ決めましょう。"}</p><button type="button" onClick={onAddGoal}>{activeGoal?"目標を追加する":"目標を決める"}</button></div>
    </section>
    <section className={styles.recordPanel} aria-labelledby="growth-record-title">
      <div className={styles.sectionTitle}><div><span>ADD YOUR OWN EVIDENCE</span><h4 id="growth-record-title">今日の観察を記録する</h4></div></div>
      <p>技術の優劣ではなく、実際にどう選んで試したかを記録します。1回の練習で全部を評価せず、気づいた項目だけで大丈夫です。</p>
      <form id="homecourt-growth-form" className={styles.form} onSubmit={save}>
        <div className={styles.formRow}>
          <label>観察日<input required type="date" min="2000-01-01" max={day} value={draft.observed_on} onChange={e=>change("observed_on",e.target.value)} disabled={busy}/></label>
          <label>テーマ<select value={draft.area} onChange={e=>change("area",e.target.value as GrowthArea)} disabled={busy}>{growthAreas.map(a=><option key={a.key} value={a.key}>{a.label}</option>)}</select></label>
          <label>場面<select value={draft.context} onChange={e=>change("context",e.target.value as GrowthContext)} disabled={busy}>{growthContexts.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}</select></label>
          <label>記録した人<select value={draft.observer_kind} onChange={e=>change("observer_kind",e.target.value as GrowthObserver)} disabled={busy}><option value="self">本人の振り返り</option><option value="guardian">保護者の観察</option></select></label>
        </div>
        <fieldset className={styles.stageFieldset} disabled={busy}>
          <legend>この場面で何を試しましたか？</legend>
          <div className={styles.stageOptions}>{growthStages.map(s=><label key={s.value} className={draft.stage===s.value?styles.selectedStage:""}>
            <input type="radio" name="growth-stage" checked={draft.stage===s.value} onChange={()=>change("stage",s.value)}/>
            <span><strong>{s.value}. {s.label}</strong><small>{s.detail}</small></span>
          </label>)}</div>
        </fieldset>
        <label>どんな場面でしたか？（任意・500文字まで）
          <textarea rows={3} maxLength={500} value={draft.evidence} onChange={e=>change("evidence",e.target.value)}
            placeholder="例：3対3でパス前に味方と守備を見て、自分で選んでみた。" disabled={busy}/>
        </label>
        <p className={styles.privacy}>個人情報、健康状態、けがの詳細、他の子の名前は入力しないでください。記録はこのアカウントだけで閲覧できます。指導者への自動共有はありません。</p>
        {message?<p className={styles.message} role="status">{message}</p>:null}
        <div className={styles.formActions}><button type="submit" disabled={busy}>{busy?"保存しています…":editingId?"変更を保存":"観察を保存"}</button>{editingId?<button type="button" disabled={busy} onClick={()=>{setEditingId(null);setDraft(startDraft(day,relationship));}}>編集をやめる</button>:null}</div>
      </form>
      {!loading&&!loadError&&observations.length>0?<div className={styles.history}>
        <h4>最近の観察記録</h4>
        {observations.slice(0,8).map(item=><article key={item.id} className={styles.record}>
          <div><span>{dayLabel(item.observed_on)} · {growthAreas.find(a=>a.key===item.area)?.label}</span><strong>{stageLabel(item.stage)}</strong>{item.evidence?<p>{item.evidence}</p>:null}<small>{item.observer_kind==="guardian"?"保護者の観察":"本人の振り返り"}・{growthContexts.find(c=>c.value===item.context)?.label}</small></div>
          <div className={styles.recordActions}><button type="button" disabled={busy} onClick={()=>edit(item)}>編集</button><button type="button" disabled={busy} onClick={()=>void remove(item.id)}>削除</button></div>
        </article>)}
        {observations.length>8?<p className={styles.chartFoot}>最近8件を表示中。過去の記録は6つのテーマ別グラフに反映しています。</p>:null}
      </div>:null}
    </section>
  </section>;
}
