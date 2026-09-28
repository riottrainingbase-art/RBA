import type {Metadata} from "next";
import {notFound,redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import Link from "next/link";
import {ArrowLeft,ArrowRight,CheckCircle2} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";
import {playerModuleEn,playerStageEn} from "@/lib/dhub-player-en";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB PLAYERS MODULE | RBA"},robots:{index:false,follow:false}};

export default async function Page({params}:{params:Promise<{order:string}>}){
  const {order}=await params;
  const n=Number(order);
  if(!Number.isInteger(n))notFound();

  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user)redirect("/my-homecourt/login?next="+encodeURIComponent("/d-hub/players/member/modules/"+n));

  const {data:ok}=await s.rpc("has_dhub_player_access");
  if(!ok)redirect("/d-hub/players/member");

  const {data:m}=await s.from("dhub_player_modules").select("*").eq("module_order",n).eq("published",true).maybeSingle();
  if(!m)notFound();

  const copy=playerModuleEn[n];
  if(!copy)notFound();

  const {data:p}=await s.from("dhub_player_progress").select("status,reflection").eq("user_id",user.id).eq("module_id",m.id).maybeSingle();

  async function save(fd:FormData){
    "use server";
    const x=await createClient();
    const {data:{user:u}}=await x.auth.getUser();
    if(!u)return;
    const {data:allowed}=await x.rpc("has_dhub_player_access");
    if(!allowed)return;
    const status=String(fd.get("status")||"started")==="completed"?"completed":"started";
    await x.from("dhub_player_progress").upsert({
      user_id:u.id,
      module_id:String(fd.get("module_id")||""),
      status,
      reflection:String(fd.get("reflection")||"").slice(0,4000),
      completed_at:status==="completed"?new Date().toISOString():null,
      updated_at:new Date().toISOString()
    },{onConflict:"user_id,module_id"});
    revalidatePath("/d-hub/players/member/modules/"+n);
    revalidatePath("/d-hub/players/member");
  }

  return <SiteFrame locale="en" languagePage="d-hub">
    <main className="dhub-player-module-page">
      <header className="dhub-player-module-hero section-pad">
        <Link className="back-link" href="/d-hub/players/member"><ArrowLeft size={15}/> PLAYERS HOME</Link>
        <p className="section-index">D-HUB PLAYERS / {playerStageEn[m.stage]||String(m.stage).replaceAll("_"," ").toUpperCase()} / {String(n).padStart(2,"0")}</p>
        <h1>{copy.title}</h1>
        <p>{copy.guiding_question}</p>
      </header>

      <section className="dhub-player-module-focus section-pad">
        <div><p className="section-index">FOCUS</p><h2>What to notice this time.</h2></div>
        <p>{copy.focus}</p>
      </section>

      <section className="dhub-player-module-action section-pad">
        <div><p className="section-index inverse">ACTION</p><h2>Try it in your next practice or game.</h2></div>
        <strong>{copy.action}</strong>
      </section>

      <section className="dhub-player-module-review section-pad">
        <div>{copy.reflection_questions.map((q,i)=><div key={q}><span>{String(i+1).padStart(2,"0")}</span><strong>{q}</strong></div>)}</div>
        <form action={save}>
          <input type="hidden" name="module_id" value={m.id}/>
          <label>What actually happened?<textarea name="reflection" rows={10} defaultValue={p?.reflection||""}/></label>
          <div>
            <button className="button button-light" name="status" value="started">Save</button>
            <button className="button button-member" name="status" value="completed"><CheckCircle2 size={16}/> Complete</button>
          </div>
        </form>
      </section>

      <nav className="dhub-player-module-nav section-pad">
        {n>1?<Link href={"/d-hub/players/member/modules/"+(n-1)}><ArrowLeft size={15}/> Previous</Link>:<span/>}
        <Link href="/d-hub/players/member">HOME</Link>
        {n<18?<Link href={"/d-hub/players/member/modules/"+(n+1)}>Next <ArrowRight size={15}/></Link>:<span/>}
      </nav>
    </main>
  </SiteFrame>;
}
