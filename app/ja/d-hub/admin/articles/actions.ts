"use server";

import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {createClient} from "@/lib/supabase/server";

type SectionInput={heading:string;paragraphs:string[]};
type ReferenceInput={title?:string;source?:string;year?:number|null;url?:string;note?:string};
type Payload={
 id?:string;
 program_type:"coach_lab"|"players";
 locale:"ja"|"en";
 slug?:string;
 category:string;
 title:string;
 summary:string;
 reading:string;
 sections:SectionInput[];
 field_action:string;
 reflection_questions:string[];
 related_public_slugs:string[];
 manual_references:ReferenceInput[];
 editorial_note?:string;
 publish_at?:string|null;
};

async function requireAdmin(){
 const db=await createClient();
 const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fadmin%2Farticles");
 const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(profile?.role!=="admin")redirect("/ja/d-hub");
 return {db,user};
}

function cleanText(value:unknown,max=12000){return String(value||"").replace(/\r/g,"").trim().slice(0,max)}
function unique<T>(items:T[]){return Array.from(new Set(items))}
function fallbackSlug(program:string){
 const d=new Date();
 const stamp=[d.getUTCFullYear(),String(d.getUTCMonth()+1).padStart(2,"0"),String(d.getUTCDate()).padStart(2,"0"),String(d.getUTCHours()).padStart(2,"0"),String(d.getUTCMinutes()).padStart(2,"0"),String(d.getUTCSeconds()).padStart(2,"0")].join("");
 return (program==="coach_lab"?"coach":"player")+"-"+stamp;
}
function normalizeSlug(value:string,program:string){
 const slug=value.toLowerCase().trim().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").replace(/-+/g,"-");
 return slug||fallbackSlug(program);
}
function normalizeSections(input:SectionInput[]){
 return (Array.isArray(input)?input:[]).map(section=>({
  heading:cleanText(section?.heading,180),
  paragraphs:(Array.isArray(section?.paragraphs)?section.paragraphs:[]).map(p=>cleanText(p,5000)).filter(Boolean)
 })).filter(section=>section.heading&&section.paragraphs.length);
}
function normalizeRefs(input:ReferenceInput[]){
 return (Array.isArray(input)?input:[]).map(ref=>({
  title:cleanText(ref?.title,500)||undefined,
  source:cleanText(ref?.source,300)||undefined,
  year:ref?.year?Number(ref.year):undefined,
  url:cleanText(ref?.url,1000)||undefined,
  note:cleanText(ref?.note,1200)||undefined
 })).filter(ref=>ref.title||ref.url);
}
function dedupeRefs(refs:ReferenceInput[]){
 const seen=new Set<string>();const out:ReferenceInput[]=[];
 for(const ref of refs){
  const key=(ref.url||ref.title||"").toLowerCase().trim();
  if(!key||seen.has(key))continue;
  seen.add(key);out.push(ref);
 }
 return out;
}

async function referencesFromRelated(db:Awaited<ReturnType<typeof createClient>>,slugs:string[],locale:"ja"|"en"){
 if(!slugs.length)return [] as ReferenceInput[];
 const {data}=await db.from("public_journal_posts").select("slug,source_references").eq("locale",locale).in("slug",slugs);
 const refs:ReferenceInput[]=[];
 for(const row of data||[]){
  const list=Array.isArray(row.source_references)?row.source_references:[];
  for(const ref of list)refs.push(ref as ReferenceInput);
 }
 return refs;
}

async function addRevision(db:Awaited<ReturnType<typeof createClient>>,articleId:string,userId:string,note:string){
 const {data:article}=await db.from("dhub_paid_articles").select("*").eq("id",articleId).maybeSingle();
 if(!article)return;
 const {data:last}=await db.from("dhub_paid_article_revisions").select("revision_no").eq("article_id",articleId).order("revision_no",{ascending:false}).limit(1).maybeSingle();
 await db.from("dhub_paid_article_revisions").insert({
  article_id:articleId,
  revision_no:(last?.revision_no||0)+1,
  snapshot:article,
  changed_by:userId,
  change_note:note
 });
}

export async function saveArticle(formData:FormData){
 const {db,user}=await requireAdmin();
 const intent=String(formData.get("intent")||"save");
 let payload:Payload;
 try{payload=JSON.parse(String(formData.get("payload")||"{}")) as Payload}catch{redirect("/ja/d-hub/admin/articles?error=payload")}
 if(payload.program_type!=="coach_lab"&&payload.program_type!=="players")redirect("/ja/d-hub/admin/articles?error=program");
 if(payload.locale!=="ja"&&payload.locale!=="en")payload.locale="ja";

 const title=cleanText(payload.title,240);
 const summary=cleanText(payload.summary,700);
 const category=cleanText(payload.category,120);
 const sections=normalizeSections(payload.sections);
 const questions=unique((payload.reflection_questions||[]).map(q=>cleanText(q,400)).filter(Boolean));
 const action=cleanText(payload.field_action,2400);
 const related=unique((payload.related_public_slugs||[]).map(s=>cleanText(s,180)).filter(Boolean));
 const manual=normalizeRefs(payload.manual_references);
 const automatic=await referencesFromRelated(db,related,payload.locale);
 const references=dedupeRefs([...automatic,...manual]);

 if(!title||!summary||!category||sections.length<3||questions.length<3||action.length<10){
  const back=payload.id?"/ja/d-hub/admin/articles/"+payload.id:"/ja/d-hub/admin/articles/new?program="+payload.program_type;
  redirect(back+"?error=required");
 }
 if(payload.program_type==="coach_lab"&&references.length===0){
  const back=payload.id?"/ja/d-hub/admin/articles/"+payload.id:"/ja/d-hub/admin/articles/new?program=coach_lab";
  redirect(back+"?error=references");
 }

 let existing:any=null;
 if(payload.id){
  const r=await db.from("dhub_paid_articles").select("*").eq("id",payload.id).maybeSingle();
  existing=r.data;
  if(!existing)redirect("/ja/d-hub/admin/articles?error=notfound");
 }

 let published=existing?.published||false;
 let publishedAt=existing?.published_at||null;
 if(intent==="draft"||intent==="unpublish"){published=false;publishedAt=null}
 if(intent==="publish"){published=true;publishedAt=new Date().toISOString()}
 if(intent==="schedule"){
  const when=payload.publish_at?new Date(payload.publish_at):null;
  if(!when||!Number.isFinite(when.getTime())||when.getTime()<=Date.now()+60000){
   const back=payload.id?"/ja/d-hub/admin/articles/"+payload.id:"/ja/d-hub/admin/articles/new?program="+payload.program_type;
   redirect(back+"?error=schedule");
  }
  published=true;publishedAt=when.toISOString();
 }
 if(!existing&&(intent==="save"||intent==="preview")){published=false;publishedAt=null}

 const slug=normalizeSlug(payload.slug||"",payload.program_type);
 const record={
  program_type:payload.program_type,
  locale:payload.locale,
  slug,
  category,
  title,
  summary,
  reading:cleanText(payload.reading,40)||"8 MIN READ",
  sections,
  field_action:action,
  reflection_questions:questions,
  related_public_slugs:related,
  source_references:references,
  editorial_note:cleanText(payload.editorial_note,3000),
  published,
  published_at:publishedAt,
  updated_at:new Date().toISOString(),
  updated_by:user.id
 };

 let articleId=payload.id||"";
 if(existing){
  const {error}=await db.from("dhub_paid_articles").update(record).eq("id",existing.id);
  if(error){
   const back="/ja/d-hub/admin/articles/"+existing.id;
   redirect(back+"?error=save");
  }
  articleId=existing.id;
 }else{
  const {data,error}=await db.from("dhub_paid_articles").insert({...record,created_by:user.id}).select("id").single();
  if(error||!data)redirect("/ja/d-hub/admin/articles/new?program="+payload.program_type+"&error=slug");
  articleId=data.id;
 }

 await addRevision(db,articleId,user.id,intent);
 revalidatePath("/ja/d-hub/admin/articles");
 revalidatePath("/ja/d-hub/coaches/articles");
 revalidatePath("/ja/d-hub/players/articles");
 revalidatePath("/ja/d-hub/coaches/member");
 revalidatePath("/ja/d-hub/players/member");
 revalidatePath("/d-hub/players/articles");
 revalidatePath("/d-hub/players/member");

 if(intent==="preview")redirect("/ja/d-hub/admin/articles/"+articleId+"/preview");
 redirect("/ja/d-hub/admin/articles/"+articleId+"?saved="+intent);
}

export async function duplicateArticle(formData:FormData){
 const {db,user}=await requireAdmin();
 const id=String(formData.get("id")||"");
 const {data:source}=await db.from("dhub_paid_articles").select("*").eq("id",id).maybeSingle();
 if(!source)redirect("/ja/d-hub/admin/articles?error=notfound");
 const {count}=await db.from("dhub_paid_articles").select("id",{count:"exact",head:true}).eq("program_type",source.program_type).like("slug",source.slug+"-copy%");
 const slug=source.slug+"-copy-"+String((count||0)+1);
 const {data,error}=await db.from("dhub_paid_articles").insert({
  ...source,id:undefined,slug,title:source.title+"（複製）",published:false,published_at:null,
  created_at:undefined,updated_at:new Date().toISOString(),created_by:user.id,updated_by:user.id,
  editorial_note:"複製元："+source.slug
 }).select("id").single();
 if(error||!data)redirect("/ja/d-hub/admin/articles?error=duplicate");
 await addRevision(db,data.id,user.id,"duplicate");
 redirect("/ja/d-hub/admin/articles/"+data.id+"?saved=duplicate");
}

export async function restoreRevision(formData:FormData){
 const {db,user}=await requireAdmin();
 const revisionId=String(formData.get("revision_id")||"");
 const {data:revision}=await db.from("dhub_paid_article_revisions").select("article_id,snapshot").eq("id",revisionId).maybeSingle();
 if(!revision)redirect("/ja/d-hub/admin/articles?error=revision");
 const s:any=revision.snapshot||{};
 const allowed={
  program_type:s.program_type,locale:s.locale||"ja",slug:s.slug,category:s.category,title:s.title,summary:s.summary,reading:s.reading,
  sections:s.sections,field_action:s.field_action,reflection_questions:s.reflection_questions,
  related_public_slugs:s.related_public_slugs,source_references:s.source_references,
  editorial_note:(s.editorial_note||"")+"\n復元後は下書きに戻しています。",
  published:false,published_at:null,updated_at:new Date().toISOString(),updated_by:user.id
 };
 await db.from("dhub_paid_articles").update(allowed).eq("id",revision.article_id);
 await addRevision(db,revision.article_id,user.id,"restore revision");
 revalidatePath("/ja/d-hub/admin/articles");
 redirect("/ja/d-hub/admin/articles/"+revision.article_id+"?saved=restored");
}
