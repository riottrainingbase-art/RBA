"use client";
import {FormEvent,useCallback,useEffect,useMemo,useState} from "react";
import {ArrowRight,CheckCircle2,LoaderCircle,ShieldCheck,UserRound,Users} from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import type {Locale} from "@/components/site-frame";
import styles from "./programme-application.module.css";

type Subject={id:string;display_name:string;role:string|null;birth_year:number|null};
type Offer={
 slug:string;title:string;summary:string|null;unit_amount:number|null;currency:string;
 checkout_policy:string;application_kind:string;allowed_school_grades:string[];allowed_age_groups:string[];
 includes_accommodation_or_transport:boolean;
};
type Prepare={ok:boolean;offer:Offer;event:{id:string;title:string;starts_at:string|null;status:string}|null;subjects:Subject[]};

const gradeLabels:Record<string,string>={
 jp_g3:"小学3年",jp_g4:"小学4年",jp_g5:"小学5年",jp_g6:"小学6年",
 jhs1:"中学1年",jhs2:"中学2年",jhs3:"中学3年"
};
const yen=(value:number|null)=>value==null?"—":`¥${value.toLocaleString("ja-JP")}`;

export function ProgrammeApplication({locale,offerSlug,checkoutHref}:{locale:Locale;offerSlug:string;checkoutHref:string|null}){
 const supabase=useMemo(()=>createClient(),[]);
 const [info,setInfo]=useState<Prepare|null>(null);
 const [loading,setLoading]=useState(true);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 const [done,setDone]=useState<"review"|"checkout"|null>(null);
 const [subject,setSubject]=useState("");
 const [grade,setGrade]=useState("");
 const [ageGroup,setAgeGroup]=useState("");

 const load=useCallback(async()=>{
   setLoading(true);setError("");
   const {data,error:invokeError}=await supabase.functions.invoke("rba-application-gateway",{body:{action:"prepare",offer_slug:offerSlug}});
   if(invokeError||!data?.ok){setError(locale==="ja"?"申込情報を読み込めませんでした。":"Unable to load application.");setLoading(false);return;}
   const prepared=data as Prepare;
   setInfo(prepared);
   if(prepared.subjects.length===1)setSubject(prepared.subjects[0].id);
   if(prepared.offer.allowed_school_grades.length===1)setGrade(prepared.offer.allowed_school_grades[0]);
   if(prepared.offer.allowed_age_groups.length===1)setAgeGroup(prepared.offer.allowed_age_groups[0]);
   setLoading(false);
 },[locale,offerSlug,supabase]);

 useEffect(()=>{const timer=window.setTimeout(()=>void load(),0);return()=>window.clearTimeout(timer);},[load]);

 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault();if(!info)return;
   setBusy(true);setError("");
   const form=new FormData(e.currentTarget);
   const {data,error:invokeError}=await supabase.functions.invoke("rba-application-gateway",{body:{
     action:"submit",offer_slug:offerSlug,subject_user_id:subject,school_grade:grade,age_group:ageGroup,
     note:String(form.get("note")||""),eligibility_confirmed:form.get("confirm")==="on"
   }});
   if(invokeError||!data?.ok){
     const code=String(data?.error||"");
     const message=code==="subject_not_authorized"
       ? "参加者を確認できませんでした。"
       : code==="school_grade_required"||code==="age_group_required"
         ? "対象学年・年代を選択してください。"
         : code==="eligibility_confirmation_required"
           ? "対象・費用・申込条件の確認が必要です。"
           : "申込を完了できませんでした。入力内容をご確認ください。";
     setError(locale==="ja"?message:"Unable to submit application.");setBusy(false);return;
   }
   if(data.next==="checkout"&&checkoutHref){
     setDone("checkout");
     const destination=new URL(checkoutHref,window.location.origin);
     destination.searchParams.set("subject",String(data.subject_user_id||subject));
     window.location.assign(destination.pathname+destination.search);
     return;
   }
   setDone("review");setBusy(false);
 }

 if(loading)return <main className={styles.shell}><LoaderCircle className={styles.spin}/><p>APPLICATION LOADING</p></main>;
 if(!info)return <main className={styles.shell}><p>{error||"Application unavailable."}</p></main>;

 const c=locale==="ja"?{
   eyebrow:"RBA ID / APPLICATION",title:"RBA内で申込を完了します",participant:"参加者",grade:"学年",age:"年代",note:"運営へ伝えること（任意）",
   confirm:"対象・参加条件・費用・キャンセル条件を確認しました。",submit:info.offer.checkout_policy==="manual_after_application"?"申込を送信":"申込して支払いへ",
   noSubject:"参加できる選手がRBA IDに紐づいていません。保護者の場合は、MY HOME COURTでお子さまとの紐づけを確認してください。",
   reviewTitle:"申込を受け付けました",reviewBody:"RBA Operationsで内容を確認します。次の状態はMY HOME COURTのお知らせに反映します。",
   price:"参加費",status:"申込方式",manual:"RBA確認後に参加枠・支払いを確定",instant:"対象確認後、そのまま支払いへ"
 }:{
   eyebrow:"RBA ID / APPLICATION",title:"Complete your application inside RBA",participant:"Participant",grade:"School grade",age:"Age group",note:"Note for RBA (optional)",
   confirm:"I have reviewed eligibility, total cost and cancellation terms.",submit:info.offer.checkout_policy==="manual_after_application"?"Submit application":"Apply and continue to payment",
   noSubject:"No eligible participant is linked to this RBA ID.",reviewTitle:"Application received",reviewBody:"RBA Operations will review it and update MY HOME COURT.",
   price:"Price",status:"Application",manual:"RBA review before payment",instant:"Continue to payment after eligibility check"
 };

 if(done==="review")return <main className={styles.shell}><section className={styles.success}><CheckCircle2/><p>{c.eyebrow}</p><h1>{c.reviewTitle}</h1><p>{c.reviewBody}</p><a href={(locale==="en"?"":`/${locale}`)+"/my-homecourt/app/notifications"}>MY HOME COURT <ArrowRight/></a></section></main>;

 return <main className={styles.shell}>
   <header className={styles.hero}><p>{c.eyebrow}</p><h1>{c.title}</h1><span>{info.offer.title}</span></header>
   <div className={styles.grid}>
     <section className={styles.summary}>
       <span>{info.offer.application_kind.toUpperCase()}</span><h2>{info.offer.title}</h2>{info.offer.summary?<p>{info.offer.summary}</p>:null}
       <dl><div><dt>{c.price}</dt><dd>{yen(info.offer.unit_amount)}</dd></div><div><dt>{c.status}</dt><dd>{info.offer.checkout_policy==="manual_after_application"?c.manual:c.instant}</dd></div></dl>
       {info.offer.includes_accommodation_or_transport?<div className={styles.notice}><ShieldCheck/><p>{locale==="ja"?"宿泊・移動を含む可能性があるため、申込後に運営条件を確認します。":"Travel/accommodation details require operational review."}</p></div>:null}
     </section>
     <form className={styles.form} onSubmit={submit}>
       {info.subjects.length?<label><span><UserRound/>{c.participant}</span><select value={subject} onChange={e=>setSubject(e.target.value)} required><option value="">—</option>{info.subjects.map(item=><option key={item.id} value={item.id}>{item.display_name}{item.birth_year?` / ${item.birth_year}`:""}</option>)}</select></label>:<div className={styles.noSubject}><Users/><p>{c.noSubject}</p></div>}
       {info.offer.allowed_school_grades.length?<label><span>{c.grade}</span><select value={grade} onChange={e=>setGrade(e.target.value)} required><option value="">—</option>{info.offer.allowed_school_grades.map(item=><option key={item} value={item}>{gradeLabels[item]||item}</option>)}</select></label>:null}
       {!info.offer.allowed_school_grades.length&&info.offer.allowed_age_groups.length?<label><span>{c.age}</span><select value={ageGroup} onChange={e=>setAgeGroup(e.target.value)} required><option value="">—</option>{info.offer.allowed_age_groups.map(item=><option key={item} value={item}>{item}</option>)}</select></label>:null}
       <label><span>{c.note}</span><textarea name="note" rows={4}/></label>
       <label className={styles.confirm}><input type="checkbox" name="confirm" required/><span>{c.confirm}</span></label>
       {error?<p className={styles.error}>{error}</p>:null}
       <button disabled={busy||!info.subjects.length}>{busy?<LoaderCircle className={styles.spin}/>:<ArrowRight/>}{c.submit}</button>
     </form>
   </div>
 </main>;
}
