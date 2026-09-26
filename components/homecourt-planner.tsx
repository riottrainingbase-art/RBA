"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronRight, Clock3, Download, ExternalLink, HeartPulse, Link2, ListChecks, LoaderCircle, Plus, TimerReset, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "./site-frame";

type TeamEventInput={id:string;team_id:string;event_type:string;title:string;starts_at:string;ends_at:string|null;venue:string|null};
type ScheduleItem={id:string;title:string;item_type:string;starts_at:string;ends_at:string|null;venue:string|null;link_url:string|null;link_label:string|null;countdown_enabled:boolean};
type Wellness={id:string;checkin_on:string;energy:number;fatigue:number;soreness:number;sleep_hours:number|null;pain_level:number;body_note:string|null;notes:string|null};
type CarePlan={id:string;title:string;care_type:string;scheduled_at:string;ends_at:string|null;location:string|null;provider:string|null;link_url:string|null;status:string;wellness_checkin_id:string|null};
type PrepTask={id:string;schedule_item_id:string|null;team_event_id:string|null;public_event_id?:string|null;title:string;category:string;due_at:string|null;completed_at:string|null;template_key?:string|null;auto_generated?:boolean};
type RbaParticipation={id:string;attendance_status:string;events:{id:string;title:string;event_type:string;starts_at:string|null;ends_at:string|null;venue:string|null;registration_url:string|null;status:string}|null};

const copy={
  ja:{
    title:"MY SCHEDULE",lead:"練習、試合、大会、学校行事、コンディショニングの予定を一つにまとめ、次の予定までの時間も確認できます。",
    next:"次の予定まで",personal:"自分の予定を追加",name:"予定名",type:"種類",start:"日時",venue:"場所",link:"関連リンク",linkLabel:"リンク名",countdown:"カウントダウンを表示",save:"予定を保存",
    wellness:"TODAY / CONDITION",wellnessTitle:"今日の体調を残す",wellnessBody:"エネルギー、疲労感、張り・筋肉痛、睡眠、痛みを簡単に記録できます。自分のコンディションの変化を振り返るための非公開記録です。",
    energy:"エネルギー",fatigue:"疲労感",soreness:"張り・筋肉痛",sleep:"睡眠時間",pain:"痛み",body:"気になる部位・状態",notes:"メモ",
    careAt:"続けてコンディショニングの予定も登録する",careTitle:"ケア予定名",care:"CARE PLAN",careHeading:"コンディショニングの予定を登録する",careType:"ケアの種類",provider:"担当・施設",careLocation:"場所",careLink:"予約・連絡リンク",careSave:"ケア予定を保存",
    private:"体調記録とコンディショニング予定は非公開です。チームへ自動で共有されることはありません。また、ここでの記録は医療上の診断や治療判断の代わりにはなりません。",
    painCaution:"強い痛み、急な悪化、しびれ、外傷などがある場合は、予定調整だけで済ませず医療機関や有資格者へ相談してください。",
    noUpcoming:"今後の登録予定はありません。",saved:"保存しました。",error:"保存できませんでした。もう一度お試しください。",complete:"完了にする",done:"完了",open:"開く",
    sourceTeam:"TEAM",sourcePersonal:"MY",sourceCare:"CARE",sourceRba:"RBA",prep:"EVENT PREP",prepTitle:"大会・イベントまでの準備",prepLead:"次の試合、大会、遠征に向けて必要な準備を、予定と一緒に管理できます。",target:"対象予定",task:"やること",due:"期限",taskSave:"準備を追加",taskEmpty:"準備項目はまだありません。",trend:"7 DAYS / CONDITION",trendTitle:"7日間のコンディション記録",trendLead:"7日間の変化を自分で振り返るための記録です。医療上の判断や診断には使用しません。",avgEnergy:"平均エネルギー",avgFatigue:"平均疲労",avgPain:"平均痛み",calendarAdd:"カレンダーに追加",taskDone:"完了",autoPlan:"大会に向けた準備項目を作成",autoPlanLead:"大会日から逆算して、今から必要な準備項目を作成します。同じ内容がすでに登録されている場合は、重複して追加しません。",autoPlanButton:"準備項目を作成",autoPlanDone:"大会準備を作成しました。",autoTag:"AUTO"
  },
  en:{
    title:"MY SCHEDULE",lead:"Keep practices, games, tournaments, events and care on one timeline, with countdowns to what comes next.",
    next:"Countdown",personal:"Add personal schedule",name:"Title",type:"Type",start:"Date & time",venue:"Location",link:"Related link",linkLabel:"Link label",countdown:"Show countdown",save:"Save schedule",
    wellness:"TODAY / CONDITION",wellnessTitle:"Log how you feel today",wellnessBody:"Record energy, fatigue, soreness, sleep and pain as a private trend log.",
    energy:"Energy",fatigue:"Fatigue",soreness:"Soreness",sleep:"Sleep hours",pain:"Pain",body:"Body note",notes:"Notes",
    careAt:"Schedule care from this check-in",careTitle:"Care title",care:"CARE PLAN",careHeading:"Set a care time",careType:"Care type",provider:"Provider / facility",careLocation:"Location",careLink:"Booking / contact link",careSave:"Save care plan",
    private:"Condition logs and care plans are private to your account and are not automatically shared with your team. They are not a diagnosis or treatment decision.",
    painCaution:"For severe pain, sudden worsening, numbness or acute injury, seek appropriate medical or qualified professional care rather than relying on scheduling alone.",
    noUpcoming:"No upcoming items yet.",saved:"Saved.",error:"Could not save. Please try again.",complete:"Mark complete",done:"Completed",open:"Open",
    sourceTeam:"TEAM",sourcePersonal:"MY",sourceCare:"CARE",sourceRba:"RBA",prep:"EVENT PREP",prepTitle:"Prepare for your next event",prepLead:"Keep the small tasks for games, tournaments and travel next to the event itself.",target:"Target event",task:"Task",due:"Due",taskSave:"Add preparation",taskEmpty:"No preparation tasks yet.",trend:"7 DAYS / CONDITION",trendTitle:"Your 7-day condition log",trendLead:"Use the trend to reflect on your own pattern. It is not a diagnosis or medical assessment.",avgEnergy:"Avg energy",avgFatigue:"Avg fatigue",avgPain:"Avg pain",calendarAdd:"Add to calendar",taskDone:"Done",autoPlan:"Build event prep automatically",autoPlanLead:"Work backward from the event and create only the preparation steps that are still useful. Duplicates are skipped.",autoPlanButton:"Create prep template",autoPlanDone:"Event preparation created.",autoTag:"AUTO"
  },
  "zh-tw":{
    title:"MY SCHEDULE",lead:"把訓練、比賽、大會、活動與照護放在同一條時間軸，並查看倒數。",
    next:"距離下一項",personal:"新增個人行程",name:"名稱",type:"類型",start:"日期時間",venue:"地點",link:"相關連結",linkLabel:"連結名稱",countdown:"顯示倒數",save:"儲存行程",
    wellness:"TODAY / CONDITION",wellnessTitle:"記錄今天的身體狀況",wellnessBody:"簡短記錄精神、疲勞、痠痛、睡眠與疼痛，作為私人趨勢紀錄。",
    energy:"精神",fatigue:"疲勞",soreness:"痠痛",sleep:"睡眠時數",pain:"疼痛",body:"在意部位／狀態",notes:"備註",
    careAt:"同時安排照護時間",careTitle:"照護名稱",care:"CARE PLAN",careHeading:"決定照護時間",careType:"照護類型",provider:"人員／設施",careLocation:"地點",careLink:"預約／聯絡連結",careSave:"儲存照護予定",
    private:"身體狀況與照護予定只屬於本人，不會自動分享給球隊。此功能不能取代診斷或治療判斷。",
    painCaution:"若有強烈疼痛、突然惡化、麻木或急性外傷，請尋求醫療或合資格專業人員協助。",
    noUpcoming:"目前沒有未來行程。",saved:"已儲存。",error:"無法儲存，請再試一次。",complete:"標記完成",done:"已完成",open:"開啟",
    sourceTeam:"TEAM",sourcePersonal:"MY",sourceCare:"CARE",sourceRba:"RBA",prep:"EVENT PREP",prepTitle:"為下一個活動做好準備",prepLead:"把比賽、大會、遠征前需要做的事和行程放在一起管理。",target:"目標行程",task:"待辦",due:"期限",taskSave:"新增準備",taskEmpty:"目前沒有準備事項。",trend:"7 DAYS / CONDITION",trendTitle:"7天身體狀況紀錄",trendLead:"用來回顧自己的變化，不作為診斷或醫療判斷。",avgEnergy:"平均精神",avgFatigue:"平均疲勞",avgPain:"平均疼痛",calendarAdd:"加入日曆",taskDone:"完成",autoPlan:"自動建立活動準備",autoPlanLead:"從活動日期倒推，只建立現在仍有用的準備項目，並避免重複。",autoPlanButton:"建立準備模板",autoPlanDone:"已建立活動準備。",autoTag:"AUTO"
  },
  ko:{
    title:"MY SCHEDULE",lead:"훈련, 경기, 대회, 행사와 케어를 하나의 타임라인에서 보고 다음 일정까지 카운트다운합니다.",
    next:"다음 일정까지",personal:"개인 일정 추가",name:"일정명",type:"종류",start:"날짜·시간",venue:"장소",link:"관련 링크",linkLabel:"링크 이름",countdown:"카운트다운 표시",save:"일정 저장",
    wellness:"TODAY / CONDITION",wellnessTitle:"오늘 컨디션 기록",wellnessBody:"에너지, 피로, 근육통, 수면, 통증을 짧게 기록하는 비공개 추세 기록입니다.",
    energy:"에너지",fatigue:"피로",soreness:"근육통",sleep:"수면 시간",pain:"통증",body:"신경 쓰이는 부위/상태",notes:"메모",
    careAt:"이 기록에서 케어 일정 잡기",careTitle:"케어 일정명",care:"CARE PLAN",careHeading:"케어 날짜와 시간 정하기",careType:"케어 종류",provider:"담당/시설",careLocation:"장소",careLink:"예약/연락 링크",careSave:"케어 일정 저장",
    private:"컨디션 기록과 케어 일정은 본인 비공개 데이터이며 팀에 자동 공유되지 않습니다. 진단이나 치료 판단을 대신하지 않습니다.",
    painCaution:"심한 통증, 갑작스러운 악화, 저림 또는 급성 외상이 있으면 일정 조정만으로 끝내지 말고 의료기관이나 자격 있는 전문가에게 상담하세요.",
    noUpcoming:"예정된 일정이 없습니다.",saved:"저장했습니다.",error:"저장하지 못했습니다. 다시 시도하세요.",complete:"완료로 표시",done:"완료",open:"열기",
    sourceTeam:"TEAM",sourcePersonal:"MY",sourceCare:"CARE",sourceRba:"RBA",prep:"EVENT PREP",prepTitle:"다음 대회·이벤트 준비",prepLead:"경기, 대회, 원정 전에 해야 할 일을 일정과 함께 관리합니다.",target:"대상 일정",task:"할 일",due:"기한",taskSave:"준비 추가",taskEmpty:"아직 준비 항목이 없습니다.",trend:"7 DAYS / CONDITION",trendTitle:"7일 컨디션 기록",trendLead:"자신의 변화 흐름을 돌아보기 위한 기록이며 진단이나 의료 판단이 아닙니다.",avgEnergy:"평균 에너지",avgFatigue:"평균 피로",avgPain:"평균 통증",calendarAdd:"캘린더에 추가",taskDone:"완료",autoPlan:"대회 준비 자동 생성",autoPlanLead:"이벤트 날짜에서 역산해 지금 필요한 준비만 만들고 중복은 건너뜁니다.",autoPlanButton:"준비 템플릿 만들기",autoPlanDone:"이벤트 준비를 만들었습니다.",autoTag:"AUTO"
  }
} as const;

function zonedInputToIso(value:string,timeZone:string){
  const m=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if(!m)throw new Error("date");
  const target=Date.UTC(Number(m[1]),Number(m[2])-1,Number(m[3]),Number(m[4]),Number(m[5]));
  let utc=target;
  const formatter=new Intl.DateTimeFormat("en-CA",{timeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});
  for(let i=0;i<2;i++){
    const parts=Object.fromEntries(formatter.formatToParts(new Date(utc)).filter(p=>p.type!=="literal").map(p=>[p.type,p.value]));
    utc-=Date.UTC(Number(parts.year),Number(parts.month)-1,Number(parts.day),Number(parts.hour),Number(parts.minute),Number(parts.second))-target;
  }
  return new Date(utc).toISOString();
}
function prepTemplateRows(locale:Locale,eventAt:string){
  const event=new Date(eventAt);
  const now=Date.now();
  const localized={
    ja:[
      ["now","prepare","この大会で取り組むことを1つ決める",0],
      ["d7","travel","会場・集合・移動時間を確認する",-7],
      ["d3","recovery","練習量と回復の時間を確認する",-3],
      ["d1","equipment","持ち物・ユニフォーム・飲料を準備する",-1],
      ["d0","prepare","到着時間とウォームアップ開始を確認する",-0.0833],
      ["d1plus","study","試合を振り返り、次に取り組むことを1つ残す",1]
    ],
    en:[
      ["now","prepare","Choose one purpose for this event",0],
      ["d7","travel","Confirm venue, meeting point and travel time",-7],
      ["d3","recovery","Check training load and make space for recovery",-3],
      ["d1","equipment","Prepare uniform, equipment and hydration",-1],
      ["d0","prepare","Confirm arrival and warm-up start time",-0.0833],
      ["d1plus","study","Reflect and write one next action",1]
    ],
    "zh-tw":[
      ["now","prepare","決定這次活動的一個目標",0],
      ["d7","travel","確認會場、集合與移動時間",-7],
      ["d3","recovery","確認訓練量並保留恢復時間",-3],
      ["d1","equipment","準備球衣、裝備與飲水",-1],
      ["d0","prepare","確認抵達與熱身開始時間",-0.0833],
      ["d1plus","study","活動後回顧並留下下一個行動",1]
    ],
    ko:[
      ["now","prepare","이번 대회에서 집중할 한 가지 정하기",0],
      ["d7","travel","장소·집합·이동 시간 확인",-7],
      ["d3","recovery","훈련량과 회복 시간 확인",-3],
      ["d1","equipment","유니폼·장비·수분 준비",-1],
      ["d0","prepare","도착 및 워밍업 시작 시간 확인",-0.0833],
      ["d1plus","study","경기 후 돌아보고 다음 행동 하나 남기기",1]
    ]
  } as const;
  return localized[locale].map(([key,category,title,offset])=>{
    const due=key==="now"?new Date(Math.max(now+5*60000,Math.min(event.getTime()-3600000,now+3600000))):new Date(event.getTime()+Number(offset)*86400000);
    return {template_key:key,category,title,due_at:due.toISOString()};
  }).filter(row=>new Date(row.due_at).getTime()>now-12*3600000);
}

function countdown(target:string,now:number,locale:Locale){
  const diff=new Date(target).getTime()-now;
  if(diff<=0)return locale==="ja"?"開始済み":locale==="ko"?"시작됨":locale==="zh-tw"?"已開始":"Started";
  const days=Math.floor(diff/86400000);
  const hours=Math.floor((diff%86400000)/3600000);
  const mins=Math.max(1,Math.floor((diff%3600000)/60000));
  if(days>0)return `D-${days} · ${hours}h`;
  if(hours>0)return locale==="ja"?`あと${hours}時間`:locale==="ko"?`${hours}시간 후`:locale==="zh-tw"?`${hours}小時後`:`${hours}h to go`;
  return locale==="ja"?`あと${mins}分`:locale==="ko"?`${mins}분 후`:locale==="zh-tw"?`${mins}分鐘後`:`${mins}m to go`;
}

export function HomecourtPlanner({locale,userId,timeZone,teamEvents,mode="full"}:{locale:Locale;userId:string;timeZone:string;teamEvents:TeamEventInput[];mode?:"summary"|"full"}){
  const c=copy[locale], supabase=useMemo(()=>createClient(),[]);
  const [schedule,setSchedule]=useState<ScheduleItem[]>([]);
  const [wellness,setWellness]=useState<Wellness|null>(null);
  const [wellnessHistory,setWellnessHistory]=useState<Wellness[]>([]);
  const [care,setCare]=useState<CarePlan[]>([]);
  const [tasks,setTasks]=useState<PrepTask[]>([]);
  const [rbaEvents,setRbaEvents]=useState<RbaParticipation[]>([]);
  const [busy,setBusy]=useState(false),[message,setMessage]=useState("");
  const [now,setNow]=useState(()=>Date.now());

  const load=useCallback(async()=>{
    const from=new Date(Date.now()-86400000).toISOString();
    const [scheduleQ,wellnessQ,careQ,tasksQ,rbaQ]=await Promise.all([
      supabase.from("homecourt_schedule_items").select("id,title,item_type,starts_at,ends_at,venue,link_url,link_label,countdown_enabled").eq("user_id",userId).gte("starts_at",from).order("starts_at").limit(40),
      supabase.from("homecourt_wellness_checkins").select("id,checkin_on,energy,fatigue,soreness,sleep_hours,pain_level,body_note,notes").eq("user_id",userId).order("checkin_on",{ascending:false}).limit(7),
      supabase.from("homecourt_care_plans").select("id,title,care_type,scheduled_at,ends_at,location,provider,link_url,status,wellness_checkin_id").eq("user_id",userId).gte("scheduled_at",from).order("scheduled_at").limit(20),
      supabase.from("homecourt_schedule_tasks").select("id,schedule_item_id,team_event_id,public_event_id,title,category,due_at,completed_at,template_key,auto_generated").eq("user_id",userId).order("due_at",{ascending:true}).limit(60),
      supabase.from("participations").select("id,attendance_status,events(id,title,event_type,starts_at,ends_at,venue,registration_url,status)").in("attendance_status",["registered","confirmed","attended"]).limit(30)
    ]);
    if(scheduleQ.error||wellnessQ.error||careQ.error||tasksQ.error||rbaQ.error){setMessage(c.error);return;}
    setSchedule((scheduleQ.data||[]) as ScheduleItem[]);
    const history=(wellnessQ.data||[]) as Wellness[];
    setWellnessHistory(history); setWellness(history[0]||null);
    setCare((careQ.data||[]) as CarePlan[]);
    setTasks((tasksQ.data||[]) as PrepTask[]);
    setRbaEvents((rbaQ.data||[]) as unknown as RbaParticipation[]);
  },[c.error,supabase,userId]);

  useEffect(()=>{const initial=window.setTimeout(()=>void load(),0);const tick=window.setInterval(()=>setNow(Date.now()),60000);return()=>{window.clearTimeout(initial);window.clearInterval(tick);};},[load]);

  const upcoming=useMemo(()=>{
    const team=teamEvents.filter(x=>new Date(x.starts_at).getTime()>now-3600000).map(x=>({id:`team-${x.id}`,title:x.title,at:x.starts_at,type:x.event_type,venue:x.venue,source:c.sourceTeam,link:null as string|null,teamEventId:x.id,scheduleItemId:null as string|null,publicEventId:null as string|null}));
    const personal=schedule.filter(x=>x.countdown_enabled&&new Date(x.starts_at).getTime()>now-3600000).map(x=>({id:`my-${x.id}`,title:x.title,at:x.starts_at,type:x.item_type,venue:x.venue,source:c.sourcePersonal,link:x.link_url,teamEventId:null as string|null,scheduleItemId:x.id,publicEventId:null as string|null}));
    const plans=care.filter(x=>x.status==="planned"&&new Date(x.scheduled_at).getTime()>now-3600000).map(x=>({id:`care-${x.id}`,title:x.title,at:x.scheduled_at,type:x.care_type,venue:x.location,source:c.sourceCare,link:x.link_url,teamEventId:null as string|null,scheduleItemId:null as string|null,publicEventId:null as string|null}));
    const registered=rbaEvents.filter(x=>x.events?.starts_at&&new Date(x.events.starts_at).getTime()>now-3600000).map(x=>({id:`rba-${x.id}`,title:x.events!.title,at:x.events!.starts_at!,type:x.events!.event_type,venue:x.events!.venue,source:c.sourceRba,link:x.events!.registration_url,teamEventId:null as string|null,scheduleItemId:null as string|null,publicEventId:x.events!.id}));
    return [...team,...personal,...registered,...plans].sort((a,b)=>new Date(a.at).getTime()-new Date(b.at).getTime()).slice(0,8);
  },[teamEvents,schedule,rbaEvents,care,now,c.sourceTeam,c.sourcePersonal,c.sourceRba,c.sourceCare]);

  async function addSchedule(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");const form=e.currentTarget;const fd=new FormData(form);
    let starts_at:string;try{starts_at=zonedInputToIso(String(fd.get("starts_at")),timeZone);}catch{setBusy(false);setMessage(c.error);return;}
    const link=String(fd.get("link_url")||"").trim()||null;
    const {error}=await supabase.from("homecourt_schedule_items").insert({
      user_id:userId,title:String(fd.get("title")).trim(),item_type:String(fd.get("item_type")),starts_at,
      venue:String(fd.get("venue")||"").trim()||null,link_url:link,link_label:String(fd.get("link_label")||"").trim()||null,
      countdown_enabled:fd.get("countdown_enabled")==="on"
    });
    if(error){setMessage(c.error);setBusy(false);return;} form.reset();setMessage(c.saved);setBusy(false);await load();
  }

  async function saveWellness(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");const form=e.currentTarget;const fd=new FormData(form);
    const today=new Intl.DateTimeFormat("en-CA",{timeZone,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
    const row={
      user_id:userId,checkin_on:today,energy:Number(fd.get("energy")),fatigue:Number(fd.get("fatigue")),soreness:Number(fd.get("soreness")),
      sleep_hours:String(fd.get("sleep_hours")||"").trim()?Number(fd.get("sleep_hours")):null,pain_level:Number(fd.get("pain_level")),
      body_note:String(fd.get("body_note")||"").trim()||null,notes:String(fd.get("notes")||"").trim()||null,updated_at:new Date().toISOString()
    };
    const saved=await supabase.from("homecourt_wellness_checkins").upsert(row,{onConflict:"user_id,checkin_on"}).select("id").single();
    if(saved.error||!saved.data){setMessage(c.error);setBusy(false);return;}
    const careAt=String(fd.get("care_at")||"").trim();
    if(careAt){
      let scheduled_at:string;try{scheduled_at=zonedInputToIso(careAt,timeZone);}catch{setMessage(c.error);setBusy(false);return;}
      const result=await supabase.from("homecourt_care_plans").insert({user_id:userId,title:String(fd.get("care_title")||"").trim()||"コンディショニング／ケア",care_type:"recovery",scheduled_at,wellness_checkin_id:saved.data.id,status:"planned"});
      if(result.error){setMessage(c.error);setBusy(false);return;}
    }
    setMessage(c.saved);setBusy(false);await load();
  }

  async function addCare(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");const form=e.currentTarget;const fd=new FormData(form);
    let scheduled_at:string;try{scheduled_at=zonedInputToIso(String(fd.get("scheduled_at")),timeZone);}catch{setMessage(c.error);setBusy(false);return;}
    const {error}=await supabase.from("homecourt_care_plans").insert({
      user_id:userId,title:String(fd.get("title")).trim(),care_type:String(fd.get("care_type")),scheduled_at,
      location:String(fd.get("location")||"").trim()||null,provider:String(fd.get("provider")||"").trim()||null,
      link_url:String(fd.get("link_url")||"").trim()||null,status:"planned"
    });
    if(error){setMessage(c.error);setBusy(false);return;}form.reset();setMessage(c.saved);setBusy(false);await load();
  }

  async function completeCare(id:string){
    setBusy(true);const {error}=await supabase.from("homecourt_care_plans").update({status:"completed",updated_at:new Date().toISOString()}).eq("id",id).eq("user_id",userId);
    if(error){setMessage(c.error);setBusy(false);return;}setBusy(false);await load();
  }

  async function addTask(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");const form=e.currentTarget;const fd=new FormData(form);
    const target=String(fd.get("target"));
    const [kind,id]=target.split(":");
    const dueRaw=String(fd.get("due_at")||"").trim();
    let due_at:string|null=null;if(dueRaw){try{due_at=zonedInputToIso(dueRaw,timeZone);}catch{setMessage(c.error);setBusy(false);return;}}
    const payload={user_id:userId,title:String(fd.get("title")).trim(),category:String(fd.get("category")),due_at,schedule_item_id:kind==="my"?id:null,team_event_id:kind==="team"?id:null};
    const {error}=await supabase.from("homecourt_schedule_tasks").insert(payload);
    if(error){setMessage(c.error);setBusy(false);return;}form.reset();setMessage(c.saved);setBusy(false);await load();
  }

  async function toggleTask(task:PrepTask){
    setBusy(true);const {error}=await supabase.from("homecourt_schedule_tasks").update({completed_at:task.completed_at?null:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("id",task.id).eq("user_id",userId);
    if(error){setMessage(c.error);setBusy(false);return;}setBusy(false);await load();
  }

  async function generateAutoPlan(targetValue:string){
    const target=prepTargets.find(item=>(item.teamEventId?`team:${item.teamEventId}`:item.publicEventId?`rba:${item.publicEventId}`:`my:${item.scheduleItemId}`)===targetValue);
    if(!target)return;
    setBusy(true);setMessage("");
    const rows=prepTemplateRows(locale,target.at).map(row=>({
      user_id:userId,title:row.title,category:row.category,due_at:row.due_at,template_key:row.template_key,auto_generated:true,
      schedule_item_id:target.scheduleItemId,team_event_id:target.teamEventId,public_event_id:target.publicEventId
    }));
    if(rows.length){
      let existingQuery=supabase.from("homecourt_schedule_tasks").select("template_key").eq("user_id",userId).in("template_key",rows.map(r=>r.template_key));
      if(target.teamEventId)existingQuery=existingQuery.eq("team_event_id",target.teamEventId);
      else if(target.publicEventId)existingQuery=existingQuery.eq("public_event_id",target.publicEventId);
      else existingQuery=existingQuery.eq("schedule_item_id",target.scheduleItemId!);
      const existing=await existingQuery;
      if(existing.error){setMessage(c.error);setBusy(false);return;}
      const keys=new Set((existing.data||[]).map(x=>x.template_key));
      const fresh=rows.filter(row=>!keys.has(row.template_key));
      if(fresh.length){
        const {error}=await supabase.from("homecourt_schedule_tasks").insert(fresh);
        if(error){setMessage(c.error);setBusy(false);return;}
      }
    }
    setMessage(c.autoPlanDone);setBusy(false);await load();
  }

  function downloadIcs(title:string,at:string,venue:string|null){
    const start=new Date(at);const end=new Date(start.getTime()+90*60000);
    const fmt=(d:Date)=>d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
    const clean=(v:string)=>v.replace(/[\\;,\n]/g,m=>({",":"\\,", ";":"\\;", "\n":"\\n", "\\":"\\\\"}[m]||m));
    const body=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//RBA//MY HOME COURT//JP","BEGIN:VEVENT",`UID:${crypto.randomUUID()}@riotbasketballacademy.com`,`DTSTAMP:${fmt(new Date())}`,`DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,`SUMMARY:${clean(title)}`,venue?`LOCATION:${clean(venue)}`:"","END:VEVENT","END:VCALENDAR"].filter(Boolean).join("\r\n");
    const url=URL.createObjectURL(new Blob([body],{type:"text/calendar;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="rba-homecourt-event.ics";document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  const trend=wellnessHistory.slice().reverse();
  const avg=(key:"energy"|"fatigue"|"pain_level")=>wellnessHistory.length?(wellnessHistory.reduce((sum,row)=>sum+Number(row[key]||0),0)/wellnessHistory.length).toFixed(1):"—";
  const prepTargets=upcoming.filter(item=>item.teamEventId||item.scheduleItemId||item.publicEventId);
  const openTaskCount=tasks.filter(task=>!task.completed_at).length;
  const painHigh=(wellness?.pain_level||0)>=7;
  return <section className={`homecourt-planner ${mode==="summary"?"homecourt-planner-summary":""}`}>
    <div className="homecourt-planner-head">
      <div><p className="section-index">SCHEDULE / COUNTDOWN / CARE</p><h2>{c.title}</h2><p>{c.lead}</p></div>
      <CalendarDays/>
    </div>
    {mode==="summary"?<section className="homecourt-today-center"><div><span>TODAY / MY COURT</span><h3>{locale==="ja"?"今日やること":"TODAY"}</h3></div><div className="homecourt-today-grid"><article className={openTaskCount===0?"is-done":undefined}><ListChecks/><span>PREP</span><strong>{openTaskCount===0?(locale==="ja"?"未完了なし":"CLEAR"):`${openTaskCount}`}</strong></article><article><CalendarDays/><span>NEXT</span><strong>{prepTargets[0]?.title||c.noUpcoming}</strong></article></div><a href={(locale==="en"?"":`/${locale}`)+"/my-homecourt/app/calendar"}>{locale==="ja"?"予定と準備を開く":"OPEN"}<ChevronRight/></a></section>:null}
    <div className="homecourt-countdowns">
      {upcoming.length?upcoming.slice(0,mode==="summary"?3:6).map(item=><article key={item.id}>
        <span>{item.source} / {item.type.toUpperCase()}</span>
        <strong>{countdown(item.at,now,locale)}</strong>
        <h3>{item.title}</h3>
        <time>{new Date(item.at).toLocaleString(locale,{timeZone,month:"short",day:"numeric",weekday:"short",hour:"2-digit",minute:"2-digit"})}</time>
        <p>{item.venue||"—"}</p>
        <div className="homecourt-countdown-actions">{item.link?<a href={item.link} target="_blank" rel="noreferrer">{c.open}<ExternalLink size={14}/></a>:null}<button type="button" onClick={()=>downloadIcs(item.title,item.at,item.venue)}><Download size={14}/>{c.calendarAdd}</button></div>
      </article>):<div className="homecourt-planner-empty"><TimerReset/><p>{c.noUpcoming}</p></div>}
    </div>
    {mode==="summary"?<a className="homecourt-planner-more" href={(locale==="en"?"":`/${locale}`)+"/my-homecourt/app/calendar"}>{c.title}<ChevronRight/></a>:<>
      <div className="homecourt-planner-grid">
        <form onSubmit={addSchedule} className="homecourt-planner-form">
          <div className="homecourt-form-title"><Plus/><div><span>PERSONAL / EVENT</span><h3>{c.personal}</h3></div></div>
          <label>{c.name}<input name="title" required maxLength={160}/></label>
          <label>{c.type}<select name="item_type" defaultValue="event"><option value="practice">PRACTICE</option><option value="game">GAME</option><option value="tournament">TOURNAMENT</option><option value="event">EVENT</option><option value="travel">TRAVEL</option><option value="personal">PERSONAL</option></select></label>
          <label>{c.start}<input name="starts_at" type="datetime-local" required/></label>
          <label>{c.venue}<input name="venue" maxLength={240}/></label>
          <label>{c.link}<input name="link_url" type="url" placeholder="https://"/></label>
          <label>{c.linkLabel}<input name="link_label" maxLength={80}/></label>
          <label className="homecourt-check"><input name="countdown_enabled" type="checkbox" defaultChecked/>{c.countdown}</label>
          <button disabled={busy}>{busy?<LoaderCircle className="spin"/>:<CalendarDays/>}{c.save}</button>
        </form>

        <form onSubmit={saveWellness} className="homecourt-planner-form homecourt-wellness-form">
          <div className="homecourt-form-title"><HeartPulse/><div><span>{c.wellness}</span><h3>{c.wellnessTitle}</h3></div></div>
          <p className="homecourt-form-lead">{c.wellnessBody}</p>
          <div className="homecourt-score-grid">
            <label>{c.energy}<select name="energy" defaultValue={wellness?.energy||3}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} / 5</option>)}</select></label>
            <label>{c.fatigue}<select name="fatigue" defaultValue={wellness?.fatigue||3}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} / 5</option>)}</select></label>
            <label>{c.soreness}<select name="soreness" defaultValue={wellness?.soreness||2}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} / 5</option>)}</select></label>
            <label>{c.pain}<select name="pain_level" defaultValue={wellness?.pain_level||0}>{Array.from({length:11},(_,n)=><option key={n} value={n}>{n} / 10</option>)}</select></label>
          </div>
          <label>{c.sleep}<input name="sleep_hours" type="number" min="0" max="24" step="0.5" defaultValue={wellness?.sleep_hours??""}/></label>
          <label>{c.body}<input name="body_note" maxLength={500} defaultValue={wellness?.body_note||""}/></label>
          <label>{c.notes}<textarea name="notes" maxLength={1500} defaultValue={wellness?.notes||""}/></label>
          <div className="homecourt-care-inline"><strong>{c.careAt}</strong><label>{c.careTitle}<input name="care_title" maxLength={160}/></label><label>{c.start}<input name="care_at" type="datetime-local"/></label></div>
          <button disabled={busy}>{busy?<LoaderCircle className="spin"/>:<CheckCircle2/>}{c.wellnessTitle}</button>
          <p className="homecourt-health-note">{c.private}</p>
          {painHigh?<p className="homecourt-health-caution">{c.painCaution}</p>:null}
        </form>
      </div>

      <section className="homecourt-trend-section">
        <div className="homecourt-care-heading"><div><p className="section-index">{c.trend}</p><h3>{c.trendTitle}</h3><p>{c.trendLead}</p></div><TrendingUp/></div>
        <div className="homecourt-trend-metrics"><article><span>{c.avgEnergy}</span><strong>{avg("energy")}</strong><small>/ 5</small></article><article><span>{c.avgFatigue}</span><strong>{avg("fatigue")}</strong><small>/ 5</small></article><article><span>{c.avgPain}</span><strong>{avg("pain_level")}</strong><small>/ 10</small></article></div>
        <div className="homecourt-trend-days">{trend.length?trend.map(row=><article key={row.id}><span>{new Date(row.checkin_on+"T00:00:00").toLocaleDateString(locale,{month:"short",day:"numeric"})}</span><div><i style={{height:`${Math.max(8,row.energy/5*100)}%`}}/><i style={{height:`${Math.max(8,row.fatigue/5*100)}%`}}/><i style={{height:`${Math.max(8,row.pain_level/10*100)}%`}}/></div><small>E {row.energy} · F {row.fatigue} · P {row.pain_level}</small></article>):<div className="homecourt-planner-empty"><TrendingUp/><p>{c.noUpcoming}</p></div>}</div>
      </section>

      <section className="homecourt-prep-section">
        <div className="homecourt-care-heading"><div><p className="section-index">{c.prep}</p><h3>{c.prepTitle}</h3><p>{c.prepLead}</p></div><ListChecks/></div>
        {prepTargets.length?<div className="homecourt-auto-plan">
          <div><span>AUTO / D-PLAN</span><strong>{c.autoPlan}</strong><p>{c.autoPlanLead}</p></div>
          <select id="homecourt-auto-target" defaultValue={prepTargets[0]?.teamEventId?`team:${prepTargets[0].teamEventId}`:prepTargets[0]?.publicEventId?`rba:${prepTargets[0].publicEventId}`:`my:${prepTargets[0]?.scheduleItemId}`}>{prepTargets.map(item=><option key={item.id} value={item.teamEventId?`team:${item.teamEventId}`:item.publicEventId?`rba:${item.publicEventId}`:`my:${item.scheduleItemId}`}>{item.title}</option>)}</select>
          <button type="button" disabled={busy} onClick={()=>{const el=document.getElementById("homecourt-auto-target") as HTMLSelectElement|null;if(el)void generateAutoPlan(el.value);}}>{busy?<LoaderCircle className="spin"/>:<TimerReset/>}{c.autoPlanButton}</button>
        </div>:null}
        <div className="homecourt-prep-layout">
          <div className="homecourt-prep-list">{tasks.length?tasks.map(task=><button type="button" key={task.id} className={task.completed_at?"is-done":undefined} onClick={()=>toggleTask(task)} disabled={busy}><CheckCircle2/><span>{task.auto_generated?`${c.autoTag} / `:""}{task.category.toUpperCase()}</span><strong>{task.title}</strong><small>{task.due_at?new Date(task.due_at).toLocaleString(locale,{timeZone,month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}</small></button>):<div className="homecourt-planner-empty"><ListChecks/><p>{c.taskEmpty}</p></div>}</div>
          {prepTargets.length?<form onSubmit={addTask} className="homecourt-planner-form homecourt-prep-form">
            <label>{c.target}<select name="target">{prepTargets.map(item=><option key={item.id} value={item.teamEventId?`team:${item.teamEventId}`:item.publicEventId?`rba:${item.publicEventId}`:`my:${item.scheduleItemId}`}>{item.title}</option>)}</select></label>
            <label>{c.task}<input name="title" required maxLength={180}/></label>
            <label>{c.type}<select name="category"><option value="prepare">PREPARE</option><option value="equipment">EQUIPMENT</option><option value="travel">TRAVEL</option><option value="recovery">RECOVERY</option><option value="study">STUDY</option><option value="other">OTHER</option></select></label>
            <label>{c.due}<input name="due_at" type="datetime-local"/></label>
            <button disabled={busy}><Plus/>{c.taskSave}</button>
          </form>:null}
        </div>
      </section>

      <div className="homecourt-care-section">
        <div className="homecourt-care-heading"><div><p className="section-index">{c.care}</p><h3>{c.careHeading}</h3></div><Clock3/></div>
        <div className="homecourt-care-layout">
          <div className="homecourt-care-list">
            {care.length?care.map(item=><article key={item.id} className={item.status==="completed"?"is-complete":undefined}>
              <span>{item.care_type.toUpperCase()}</span><strong>{item.title}</strong>
              <time>{new Date(item.scheduled_at).toLocaleString(locale,{timeZone,month:"short",day:"numeric",weekday:"short",hour:"2-digit",minute:"2-digit"})}</time>
              <p>{[item.provider,item.location].filter(Boolean).join(" · ")||"—"}</p>
              <div>{item.link_url?<a href={item.link_url} target="_blank" rel="noreferrer"><Link2 size={14}/>{c.open}</a>:null}{item.status==="planned"?<button type="button" disabled={busy} onClick={()=>completeCare(item.id)}><CheckCircle2 size={14}/>{c.complete}</button>:<span><CheckCircle2 size={14}/>{c.done}</span>}</div>
            </article>):<div className="homecourt-planner-empty"><HeartPulse/><p>{c.noUpcoming}</p></div>}
          </div>
          <form onSubmit={addCare} className="homecourt-planner-form homecourt-care-form">
            <label>{c.careTitle}<input name="title" required maxLength={160}/></label>
            <label>{c.careType}<select name="care_type"><option value="recovery">RECOVERY</option><option value="stretch">STRETCH</option><option value="conditioning">CONDITIONING</option><option value="bodywork">BODYWORK</option><option value="medical">MEDICAL</option><option value="other">OTHER</option></select></label>
            <label>{c.start}<input name="scheduled_at" type="datetime-local" required/></label>
            <label>{c.provider}<input name="provider" maxLength={160}/></label>
            <label>{c.careLocation}<input name="location" maxLength={240}/></label>
            <label>{c.careLink}<input name="link_url" type="url" placeholder="https://"/></label>
            <button disabled={busy}>{busy?<LoaderCircle className="spin"/>:<Plus/>}{c.careSave}</button>
          </form>
        </div>
      </div>
      {message?<p className="homecourt-planner-status" role="status">{message}</p>:null}
    </>}
  </section>;
}
