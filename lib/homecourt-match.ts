/** TEAM-level only. Do not store children's contact information here. */
export const MATCH_AGE_GROUPS = ["U8","U10","U12","U15","U18","ADULT"] as const;
export const MATCH_GENDERS = ["boys","girls","mixed"] as const;
export const MATCH_MODES = ["host","travel","either"] as const;

export type MatchAge = (typeof MATCH_AGE_GROUPS)[number];
export type MatchGender = (typeof MATCH_GENDERS)[number];
export type MatchMode = (typeof MATCH_MODES)[number];

export const MATCH_PILOT_STATUSES = {
  requested: "回答待ち",
  accepted: "受入承認",
  declined: "見送り",
  cancelled: "辞退",
} as const;

export const MATCH_GENDER_LABELS:Record<MatchGender,string> = {
  boys:"男子", girls:"女子", mixed:"男女・混合"
};
export const MATCH_MODE_LABELS:Record<MatchMode,string> = {
  host:"会場あり", travel:"遠征希望", either:"どちらも可"
};

export function todayTokyo(now:Date=new Date()):string {
  return new Intl.DateTimeFormat("sv-SE", {timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(now);
}

export function matchPostInput(value:{
  title:string; age_group:string; gender:string;
  mode:string; starts_on:string; city_from:string;
}):{ok:true;data:{title:string;age_group:MatchAge;gender:MatchGender;mode:MatchMode;starts_on:string;city_from:string}}
  | {ok:false;message:string} {
  const title=value.title.trim(), city=value.city_from.trim();
  if(title.length<4||title.length>120||city.length<2||city.length>90) return {ok:false,message:"募集タイトル（4〜120文字）と市区町村（2〜90文字）を入力してください。"};
  if(!MATCH_AGE_GROUPS.includes(value.age_group as MatchAge)||
     !MATCH_GENDERS.includes(value.gender as MatchGender)||
     !MATCH_MODES.includes(value.mode as MatchMode)) return {ok:false,message:"対象年代・種別・開催方法を選択してください。"};
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value.starts_on)||
      Number.isNaN(new Date(value.starts_on+"T00:00:00Z").getTime())||
      new Date(value.starts_on+"T00:00:00Z").toISOString().slice(0,10)!==value.starts_on||
      value.starts_on<todayTokyo()) return {ok:false,message:"今日以降の有効な日付を指定してください。"};
  if(/https?:\/\/|www\.|[^\s@]+@[^\s@]+\.[^\s@]+|0\d{9,10}|@[a-z0-9_]+/i.test(title+" "+city)) return {ok:false,message:"公開欄に電話番号・メール・SNS IDやURLは記載できません。"};
  return {ok:true,data:{title,city_from:city,starts_on:value.starts_on,age_group:value.age_group as MatchAge,gender:value.gender as MatchGender,mode:value.mode as MatchMode}};
}

export function matchEligibleEntity(record:{status:string;verification_status:string}):boolean{
  return record.status==="active" && record.verification_status==="verified";
}

export function csvEscape(value:string|number|null|undefined):string {
  const original=String(value??"").replace(/[\r\n\t]/g," ");
  // Spreadsheet viewers may execute formulas even when CSV fields are quoted.
  const safe=/^\s*[=+\-@]/.test(original)?"'"+original:original;
  return '"'+safe.replace(/"/g,'""')+'"';
}
