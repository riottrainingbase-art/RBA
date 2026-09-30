import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const FORM_ID="262722347194056";

const asText=(value:unknown)=>{
  if(value==null)return "";
  if(typeof value==="string")return value.trim();
  if(Array.isArray(value))return value.map(asText).filter(Boolean).join(", ");
  if(typeof value==="object")return Object.values(value as Record<string,unknown>).map(asText).filter(Boolean).join(" ").trim();
  return String(value).trim();
};

const prettyLabels=[
  "組織／チーム名","組織/チーム名","担当者名","メールアドレス","電話番号","依頼種別","対象年齢層",
  "希望地域／会場","希望地域/会場","希望日時","想定参加人数","改善したいこと・達成したいこと／必要な役割",
  "改善したいこと・達成したいこと/必要な役割","予算レンジ","交通費負担可否","宿泊費負担可否",
  "必要な資格／言語／経験","必要な資格/言語/経験","安全配慮や未成年参加に関する考慮事項","その他メモ"
];

function parsePretty(pretty:string){
  const result:Record<string,string>={};
  const matches=prettyLabels.flatMap(label=>{
    const idx=pretty.indexOf(label+":");
    return idx>=0?[{label,idx,start:idx+label.length+1}]:[];
  }).sort((a,b)=>a.idx-b.idx);
  for(let i=0;i<matches.length;i++){
    const current=matches[i];
    const end=i+1<matches.length?matches[i+1].idx:pretty.length;
    result[current.label]=pretty.slice(current.start,end).replace(/^[\s,]+|[\s,]+$/g,"").trim();
  }
  return result;
}
function pickPretty(map:Record<string,string>,...labels:string[]){for(const label of labels)if(map[label])return map[label];return "";}
function pickRaw(raw:Record<string,unknown>,...needles:string[]){
  const entries=Object.entries(raw);
  for(const needle of needles){
    const n=needle.toLowerCase().replace(/[^a-z0-9]/g,"");
    const found=entries.find(([key])=>key.toLowerCase().replace(/[^a-z0-9]/g,"").includes(n));
    if(found)return asText(found[1]);
  }
  return "";
}
function requestType(value:string){
  const v=value.toLowerCase();
  if(v.includes("オンコート")||v.includes("clinic")||v.includes("coaching"))return "on_court";
  if(v.includes("チーム")||v.includes("team"))return "team_support";
  if(v.includes("地域")||v.includes("camp")||v.includes("regional"))return "regional";
  if(v.includes("国際")||v.includes("united")||v.includes("international"))return "international";
  if(v.includes("s&c")||v.includes("performance")||v.includes("身体"))return "performance";
  if(v.includes("運営")||v.includes("通訳")||v.includes("record")||v.includes("operations"))return "operations";
  return "other";
}
function ageGroups(value:string){return Array.from(new Set((value.match(/U\s?\d{1,2}/gi)||[]).map(v=>v.replace(/\s/g,"").toUpperCase()).slice(0,20)));}
async function parseRequest(req:Request){
  const type=req.headers.get("content-type")||"";
  if(type.includes("multipart/form-data")||type.includes("application/x-www-form-urlencoded")){
    const fd=await req.formData();
    return Object.fromEntries(Array.from(fd.entries()).map(([k,v])=>[k,typeof v==="string"?v:v.name]));
  }
  const text=await req.text();
  if(!text)return {};
  try{return JSON.parse(text);}catch{return Object.fromEntries(new URLSearchParams(text));}
}

Deno.serve(async(req:Request)=>{
  if(req.method!=="POST")return new Response("Method not allowed",{status:405});
  try{
    const secretKeys=JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")||"{}");
    const serviceKey=secretKeys.default||Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if(!serviceKey)throw new Error("Supabase secret key unavailable");
    const supabase=createClient(Deno.env.get("SUPABASE_URL")!,serviceKey,{auth:{persistSession:false}});

    const token=new URL(req.url).searchParams.get("token")||"";
    const {data:validToken,error:tokenError}=await supabase.rpc("verify_dhub_project_webhook_token",{p_token:token});
    if(tokenError||!validToken)return new Response("Unauthorized",{status:401});

    const outer=await parseRequest(req) as Record<string,unknown>;
    const formId=asText(outer.formID||outer.formId);
    if(formId!==FORM_ID)return new Response("Wrong form",{status:400});
    const submissionId=asText(outer.submissionID||outer.submissionId);
    if(!submissionId)return new Response("Missing submission ID",{status:400});

    const rawString=asText(outer.rawRequest);
    let raw:Record<string,unknown>={};
    if(rawString){try{raw=JSON.parse(rawString);}catch{raw={rawRequest:rawString};}}
    const pretty=asText(outer.pretty);
    const p=parsePretty(pretty);

    const organization=pickPretty(p,"組織／チーム名","組織/チーム名")||pickRaw(raw,"organization","teamName","team");
    const contact=pickPretty(p,"担当者名")||pickRaw(raw,"contactPerson","contactName","name");
    const email=pickPretty(p,"メールアドレス")||pickRaw(raw,"email");
    const phone=pickPretty(p,"電話番号")||pickRaw(raw,"phone");
    const requestLabel=pickPretty(p,"依頼種別")||pickRaw(raw,"requestType","request");
    const ages=pickPretty(p,"対象年齢層")||pickRaw(raw,"targetAge","ageGroup");
    const region=pickPretty(p,"希望地域／会場","希望地域/会場")||pickRaw(raw,"regionVenue","venue","region");
    const schedule=pickPretty(p,"希望日時")||pickRaw(raw,"preferredDate","preferredTime","schedule");
    const countText=pickPretty(p,"想定参加人数")||pickRaw(raw,"participantCount","participants");
    const objective=pickPretty(p,"改善したいこと・達成したいこと／必要な役割","改善したいこと・達成したいこと/必要な役割")||pickRaw(raw,"achieve","objective","improve");
    const budget=pickPretty(p,"予算レンジ")||pickRaw(raw,"budget");
    const transport=pickPretty(p,"交通費負担可否")||pickRaw(raw,"transport");
    const accommodation=pickPretty(p,"宿泊費負担可否")||pickRaw(raw,"accommodation","lodging");
    const qualifications=pickPretty(p,"必要な資格／言語／経験","必要な資格/言語/経験")||pickRaw(raw,"qualifications","language","experience");
    const safety=pickPretty(p,"安全配慮や未成年参加に関する考慮事項")||pickRaw(raw,"safeguarding","minor");
    const notes=pickPretty(p,"その他メモ")||pickRaw(raw,"otherNotes","notes");
    const participantCount=Number((countText.match(/\d+/)||[])[0]||"");

    const payload={
      source:"jotform",source_submission_id:submissionId,organization_name:organization,contact_name:contact,email,phone,
      request_type:requestType(requestLabel),age_groups:ageGroups(ages),region_venue:region,preferred_schedule:schedule,
      participant_count:Number.isFinite(participantCount)&&participantCount>0?participantCount:null,
      objective,roles_requested:objective,budget_range:budget,transport_support:transport,accommodation_support:accommodation,
      required_qualifications:qualifications,safeguarding_notes:safety,other_notes:notes,
      raw_payload:{outer,raw,pretty},updated_at:new Date().toISOString()
    };
    const {error}=await supabase.from("dhub_client_requests").upsert(payload,{onConflict:"source,source_submission_id"});
    if(error)throw error;
    return Response.json({ok:true});
  }catch(error){
    console.error("dhub-project-intake",error);
    return Response.json({ok:false,error:"intake_failed"},{status:500});
  }
});