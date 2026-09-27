import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, MessageCircle } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB LESSON | Riot Basketball Academy"},robots:{index:false,follow:false}};

type FlowItem={label?:string;minutes?:number;detail?:string};

export default async function Page({params}:{params:Promise<{week:string}>}){
  const {week}=await params;
  const weekNo=Number(week);
  if(!Number.isInteger(weekNo)||weekNo<1||weekNo>48)notFound();

  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect(`/ja/my-homecourt/login?next=${encodeURIComponent(`/ja/d-hub/member/lessons/${weekNo}`)}`);

  const {data:hasAccess}=await supabase.rpc("has_dhub_access");
  if(!hasAccess)redirect("/ja/d-hub/member");

  const [{data:lesson},{data:progress}]=await Promise.all([
    supabase.from("dhub_lessons").select("*").eq("week_no",weekNo).eq("published",true).maybeSingle(),
    supabase.from("dhub_lesson_progress").select("status,reflection,completed_at").eq("user_id",user.id).eq("lesson_id",(await supabase.from("dhub_lessons").select("id").eq("week_no",weekNo).maybeSingle()).data?.id||"00000000-0000-0000-0000-000000000000").maybeSingle()
  ]);

  if(!lesson)notFound();

  async function saveProgress(formData:FormData){
    "use server";
    const serverSupabase=await createClient();
    const {data:{user:currentUser}}=await serverSupabase.auth.getUser();
    if(!currentUser)return;
    const {data:allowed}=await serverSupabase.rpc("has_dhub_access");
    if(!allowed)return;
    const lessonId=String(formData.get("lesson_id")||"");
    const reflection=String(formData.get("reflection")||"").slice(0,4000);
    const status=String(formData.get("status")||"started")==="completed"?"completed":"started";
    await serverSupabase.from("dhub_lesson_progress").upsert({
      user_id:currentUser.id,
      lesson_id:lessonId,
      status,
      reflection,
      completed_at:status==="completed"?new Date().toISOString():null,
      updated_at:new Date().toISOString()
    },{onConflict:"user_id,lesson_id"});
    revalidatePath(`/ja/d-hub/member/lessons/${weekNo}`);
    revalidatePath("/ja/d-hub/member");
  }

  const flows=(Array.isArray(lesson.session_flow)?lesson.session_flow:[]) as FlowItem[];
  const preReads=(lesson.pre_read_slugs||[]) as string[];
  const reflections=(lesson.reflection_questions||[]) as string[];
  const prev=weekNo>1?weekNo-1:null;
  const next=weekNo<48?weekNo+1:null;

  return <SiteFrame locale="ja" languagePage="d-hub">
    <main className="dhub-lesson-page">
      <header className="dhub-lesson-hero section-pad">
        <Link href="/ja/d-hub/member" className="back-link"><ArrowLeft size={15}/> MEMBER HOME</Link>
        <p className="section-index">D-HUB / WEEK {String(weekNo).padStart(2,"0")} / MODULE {String(lesson.module_no).padStart(2,"0")}</p>
        <h1>{lesson.title}</h1>
        <p>{lesson.guiding_question}</p>
        <div className="dhub-lesson-meta"><span>{lesson.module_title}</span><span>30–45 MIN</span><span>FIELD ASSIGNMENT</span></div>
      </header>

      <section className="dhub-lesson-purpose section-pad">
        <div><p className="section-index">WHY THIS WEEK</p><h2>今週の目的</h2></div>
        <p>{lesson.purpose}</p>
      </section>

      {preReads.length?<section className="dhub-lesson-reading section-pad">
        <div className="section-head"><div><p className="section-index">PRE-READ / FREE JOURNAL</p><h2>先に、根拠を読む。</h2></div><p>参考文献・RBAの解釈・限界は無料JOURNAL側で確認できます。</p></div>
        <div className="dhub-lesson-reading-grid">{preReads.map(slug=><Link href={`/ja/journal/${slug}`} key={slug}><BookOpen size={18}/><strong>{slug.replaceAll("-"," ")}</strong><ArrowRight size={15}/></Link>)}</div>
      </section>:null}

      <section className="dhub-lesson-flow section-pad">
        <div className="section-head"><div><p className="section-index">ONLINE SESSION</p><h2>30〜45分の進め方。</h2></div><p>説明を聞くだけで終わらず、毎回、次の現場で試す一つまで決めます。</p></div>
        <div className="dhub-flow-grid">{flows.map((item,index)=><article key={index}>
          <span>{String(index+1).padStart(2,"0")} / {item.minutes||"—"} MIN</span>
          <h3>{item.label||"SESSION"}</h3>
          <p>{item.detail}</p>
        </article>)}</div>
      </section>

      <section className="dhub-field-task section-pad">
        <div><p className="section-index inverse">ON-COURT ASSIGNMENT</p><h2>次の現場で、これを一つ試す。</h2></div>
        <div><strong>{lesson.on_court_assignment}</strong><p>うまくいったかどうかだけではなく、「何が起きたか」を持ち帰ってください。</p></div>
      </section>

      <section className="dhub-reflection section-pad">
        <div className="section-head"><div><p className="section-index">REVIEW</p><h2>現場から戻って、記録する。</h2></div><p>{lesson.rba_note}</p></div>
        <div className="dhub-reflection-grid">
          <div>{reflections.map((q,index)=><div key={q}><span>{String(index+1).padStart(2,"0")}</span><strong>{q}</strong></div>)}</div>
          <form action={saveProgress}>
            <input type="hidden" name="lesson_id" value={lesson.id}/>
            <label htmlFor="reflection">自分の現場で起きたこと</label>
            <textarea id="reflection" name="reflection" rows={10} defaultValue={progress?.reflection||""} placeholder="成功・失敗の評価より先に、実際に起きたことを書いてください。"/>
            <div className="dhub-reflection-actions">
              <button type="submit" name="status" value="started" className="button button-light">記録を保存</button>
              <button type="submit" name="status" value="completed" className="button button-member"><CheckCircle2 size={16}/> 完了として保存</button>
            </div>
            {progress?.status==="completed"?<small>このレッスンは完了として記録されています。</small>:null}
          </form>
        </div>
      </section>

      <nav className="dhub-lesson-nav section-pad">
        {prev?<Link href={`/ja/d-hub/member/lessons/${prev}`}><ArrowLeft size={15}/> WEEK {String(prev).padStart(2,"0")}</Link>:<span/>}
        <a href="https://band.us/n/aaa2bdj9xcJ1o" target="_blank" rel="noreferrer"><MessageCircle size={16}/> BANDで話す</a>
        {next?<Link href={`/ja/d-hub/member/lessons/${next}`}>WEEK {String(next).padStart(2,"0")} <ArrowRight size={15}/></Link>:<Link href="/ja/d-hub/member">MEMBER HOME <ArrowRight size={15}/></Link>}
      </nav>
    </main>
  </SiteFrame>;
}
