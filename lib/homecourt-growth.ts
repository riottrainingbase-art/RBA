/**
 * Private, self/guardian reported development observations.
 *
 * A stage describes an observed process, NOT athletic ability, medical health,
 * an objective match statistic, or a ranking among children.
 */
export const growthAreas = [
  {key:"scan",label:"周りを見る",hint:"味方・守備・スペースの情報に気づく"},
  {key:"decide",label:"選んで判断する",hint:"状況に合わせてプレーを選ぶ"},
  {key:"execute",label:"試して修正する",hint:"動きを試し、次のプレーに生かす"},
  {key:"connect",label:"仲間とつながる",hint:"声・パス・動きで仲間と協力する"},
  {key:"move",label:"身体を操作する",hint:"止まる・方向を変える・バランスを保つ"},
  {key:"reflect",label:"振り返りと工夫",hint:"気づきを言葉にして、次に試す"},
] as const;
export type GrowthArea = (typeof growthAreas)[number]["key"];
export type GrowthStage = 1 | 2 | 3 | 4;
export type GrowthContext = "practice" | "game" | "clinic" | "other";
export type GrowthObserver = "self" | "guardian";

export const growthStages: readonly {value:GrowthStage;label:string;detail:string}[] = [
  {value:1,label:"気づいた",detail:"どんな場面か気づいた・観察した"},
  {value:2,label:"助けを受けて試した",detail:"声かけやヒントを受け、試してみた"},
  {value:3,label:"自分で選んで試した",detail:"状況を見て自分で選択・実行した"},
  {value:4,label:"修正してまた試した",detail:"振り返り、違う場面でも工夫して試した"},
];
export const growthContexts:readonly {value:GrowthContext;label:string}[] = [
  {value:"practice",label:"練習"},
  {value:"game",label:"ゲーム・試合"},
  {value:"clinic",label:"クリニック"},
  {value:"other",label:"その他"},
];
export type GrowthObservation={
  id:string;
  observed_on:string;
  area:GrowthArea;
  stage:GrowthStage;
  context:GrowthContext;
  observer_kind:GrowthObserver;
  evidence:string;
};
export type GrowthCheckin={checked_on?:string;strengths?:string;challenge?:string;next_action?:string};
export type GrowthHistory={occurred_on?:string;date_precision?:string;title?:string;takeaway?:string};
export type GrowthGoal={title?:string;status?:string;action?:string;success?:string;target_on?:string};

const YMD=/^\d{4}-\d{2}-\d{2}$/;
export function isDay(value:string|undefined):value is string{
  if(!value||!YMD.test(value))return false;
  const time=Date.parse(value+"T00:00:00Z");
  return Number.isFinite(time)&&new Date(time).toISOString().slice(0,10)===value;
}
function weekStartDay(value:string):string{
  const date=new Date(value+"T00:00:00Z");
  const day=(date.getUTCDay()+6)%7;
  date.setUTCDate(date.getUTCDate()-day);
  return date.toISOString().slice(0,10);
}
function plusDays(value:string,days:number):string{
  const date=new Date(value+"T00:00:00Z");
  date.setUTCDate(date.getUTCDate()+days);
  return date.toISOString().slice(0,10);
}
export function todayJst(date=new Date()):string{
  const parts=new Intl.DateTimeFormat("en-US",{
    timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit",
  }).formatToParts(date);
  const get=(name:string)=>parts.find(p=>p.type===name)?.value||"";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
export type WeekActivity={start:string;end:string;days:number;daysLabel:string};
export function growthActivityWeeks(
  checkins:readonly GrowthCheckin[],
  history:readonly GrowthHistory[],
  observations:readonly GrowthObservation[],
  currentDay:string,
  size=12
):WeekActivity[]{
  if(!isDay(currentDay))return [];
  const lastMonday=weekStartDay(currentDay);
  const dates=new Set<string>();
  for(const entry of checkins)if(isDay(entry.checked_on)&&entry.checked_on<=currentDay)dates.add(entry.checked_on);
  // A month-only history is stored on the first for convenience, not as a known practice day.
  for(const entry of history)if(entry.date_precision!=="month"&&isDay(entry.occurred_on)&&entry.occurred_on<=currentDay)dates.add(entry.occurred_on);
  for(const entry of observations)if(isDay(entry.observed_on)&&entry.observed_on<=currentDay)dates.add(entry.observed_on);
  return Array.from({length:size},(_,i)=>{
    const start=plusDays(lastMonday,-7*(size-i-1));
    const end=plusDays(start,6);
    const days=Array.from(dates).filter(d=>d>=start&&d<=end).length;
    return{start,end,days,daysLabel:`${start.slice(5).replace("-","/")}週：${days}日記録`};
  });
}
export type GrowthTrend={
  area:GrowthArea;
  label:string;
  items:GrowthObservation[];
  first:GrowthObservation|null;
  latest:GrowthObservation|null;
  delta:number|null;
};
export function growthAreaTrends(records:readonly GrowthObservation[]):GrowthTrend[]{
  return growthAreas.map(area=>{
    const items=records
      .filter(r=>r.area===area.key && Number.isInteger(r.stage)&&r.stage>=1&&r.stage<=4&&isDay(r.observed_on))
      .slice()
      .sort((a,b)=>a.observed_on.localeCompare(b.observed_on)||a.id.localeCompare(b.id));
    const first=items[0]||null,latest=items.at(-1)||null;
    return{area:area.key,label:area.label,items,first,latest,delta:items.length>=2?latest!.stage-first!.stage:null};
  });
}
export function growthSummary(
  checkins:readonly GrowthCheckin[],
  history:readonly GrowthHistory[],
  goals:readonly GrowthGoal[],
  observations:readonly GrowthObservation[],
  currentDay:string
){
  const weeks=growthActivityWeeks(checkins,history,observations,currentDay);
  const areas=growthAreaTrends(observations);
  return{
    recordedDays:weeks.reduce((n,w)=>n+w.days,0),
    weeksWithNotes:weeks.filter(w=>w.days>0).length,
    areasObserved:areas.filter(a=>a.items.length>0).length,
    activeGoals:goals.filter(g=>g.status==="active").length,
    achievedGoals:goals.filter(g=>g.status==="achieved").length,
    weeks,
    areas,
  };
}
