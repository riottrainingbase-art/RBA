import type {Metadata} from "next";
import Link from "next/link";
import {redirect} from "next/navigation";
import {ArrowRight,Compass,History,LockKeyhole,NotebookPen,Target,Users} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";
import {playerModuleEn,playerStageEn} from "@/lib/dhub-player-en";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:{absolute:"D-HUB PLAYERS MEMBER | Riot Basketball Academy"},
  robots:{index:false,follow:false}
};

export default async function Page(){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user)redirect("/my-homecourt/login?next=%2Fd-hub%2Fplayers%2Fmember");

  const {data:ok}=await s.rpc("has_dhub_player_access");
  if(!ok)return <SiteFrame locale="en" languagePage="d-hub">
    <main className="dhub-player-member-page">
      <section className="dhub-player-locked section-pad">
        <LockKeyhole size={42}/>
        <p className="section-index">D-HUB PLAYERS / MEMBER ACCESS</p>
        <h1>This page is for D-HUB PLAYERS members.</h1>
        <p>Access is available to an RBA ID linked to an active D-HUB PLAYERS ¥3,300 monthly Square subscription. COACH LAB membership is separate.</p>
        <div>
          <Link className="button button-dark" href="/d-hub/players">View D-HUB PLAYERS</Link>
          <Link className="button button-light" href="/ja/d-hub/access-request?program=players">Already paid? Match your access <ArrowRight size={16}/></Link>
        </div>
      </section>
    </main>
  </SiteFrame>;

  const [{data:mods},{data:prog},{count:articleCount}]=await Promise.all([
    s.from("dhub_player_modules").select("*").eq("published",true).order("module_order"),
    s.from("dhub_player_progress").select("module_id,status").eq("user_id",user.id),
    s.from("dhub_paid_articles").select("id",{count:"exact",head:true}).eq("program_type","players").eq("locale","en").eq("published",true)
  ]);

  const list=(mods||[]).map(m=>({...m,...(playerModuleEn[m.module_order]||{})}));
  const done=new Set((prog||[]).filter(x=>x.status==="completed").map(x=>x.module_id));
  const next=list.find(x=>!done.has(x.id))||list[list.length-1];
  const pct=list.length?Math.round(done.size/list.length*100):0;
  const stages=["assessment","development","game_experience","feedback","reassessment"];

  return <SiteFrame locale="en" languagePage="d-hub">
    <main className="dhub-player-member-page">
      <section className="dhub-player-hero section-pad">
        <p className="section-index">D-HUB PLAYERS / MEMBER</p>
        <h1>Connect practice, games<br/>and reflection.</h1>
        <p>See. Decide. Execute. Test it in games. Review what happened. Choose the next step. D-HUB PLAYERS is built to help you run that development cycle yourself.</p>
        <div className="dhub-player-status"><span>MEMBERSHIP</span><strong>ACTIVE</strong><small>Square ¥3,300 / month / PLAYERS</small></div>
      </section>

      <section className="dhub-player-progress section-pad">
        <div><span>MODULES</span><strong>{list.length}</strong><small>DEVELOPMENT STEPS</small></div>
        <div><span>COMPLETED</span><strong>{done.size}</strong><small>STEPS</small></div>
        <div><span>PROGRESS</span><strong>{pct}%</strong><small>YOUR RECORD</small></div>
        <div><span>NEXT</span><strong>{next?String(next.module_order).padStart(2,"0"):"—"}</strong><small>{next?.title||"COMPLETE"}</small></div>
      </section>

      <section className="dhub-player-toolkit section-pad">
        <div className="section-head"><div><p className="section-index">PLAYER TOOLKIT / THIS WEEK</p><h2>Where do you want to improve this week?</h2></div><p>You do not need to fix everything at once. Choose the section that matches what you need now.</p></div>
        <div className="dhub-player-toolkit-grid">
          <article><span>BEFORE GAME</span><h3>Before the game</h3><p>Reduce the noise. Choose one theme you can actually take onto the court.</p><Link href="/d-hub/players/articles/game-theme-one-only">Choose one game theme <ArrowRight size={15}/></Link></article>
          <article><span>IN GAME</span><h3>During the game</h3><p>Use the first three possessions to read the opponent and settle into the game.</p><Link href="/d-hub/players/articles/first-three-possessions">Read the first three possessions <ArrowRight size={15}/></Link></article>
          <article><span>AFTER GAME</span><h3>After the game</h3><p>Skip the long self-criticism. Keep one good thing, one problem and one next action.</p><Link href="/d-hub/players/articles/postgame-three-lines">Use the three-line review <ArrowRight size={15}/></Link></article>
          <article><span>RECOVERY</span><h3>Body & recovery</h3><p>Before adding more work, check whether your body is ready for good work.</p><Link href="/d-hub/players/articles/prepractice-body-check">Use the 30-second body check <ArrowRight size={15}/></Link></article>
        </div>
      </section>

      <section className="dhub-player-cycle section-pad">
        <div className="section-head"><div><p className="section-index">DEVELOPMENT CYCLE</p><h2>Do not judge development from one session.</h2></div></div>
        <div className="dhub-player-cycle-grid">
          <div><Compass/><strong>ASSESSMENT</strong><p>Know where you are</p></div>
          <div><Target/><strong>DEVELOPMENT</strong><p>Work on one challenge</p></div>
          <div><Users/><strong>GAME EXPERIENCE</strong><p>Test it in games</p></div>
          <div><NotebookPen/><strong>FEEDBACK</strong><p>Review what happened</p></div>
          <div><History/><strong>RE-ASSESSMENT</strong><p>Choose what comes next</p></div>
        </div>
      </section>

      {next?<section className="dhub-player-next section-pad">
        <div><p className="section-index">NEXT / {playerStageEn[next.stage]||String(next.stage).replaceAll("_"," ").toUpperCase()}</p><h2>{next.title}</h2><p>{next.guiding_question}</p></div>
        <div><strong>{next.focus}</strong><p>{next.action}</p><Link className="button button-member" href={"/d-hub/players/member/modules/"+next.module_order}>Open module <ArrowRight size={16}/></Link></div>
      </section>:null}

      <section className="dhub-player-next section-pad">
        <div><p className="section-index">MEMBER ARTICLE LIBRARY</p><h2>Turn a problem in your game into one next action.</h2><p>Before the game, 1-on-1, off-ball play, defense, shooting, mistakes, bench time, role changes, film and recovery—written in player language.</p></div>
        <div><strong>{articleCount||0} PLAYER articles available.</strong><p>Do not just read. Finish each article by choosing one thing to try in your next practice or game.</p><Link className="button button-member" href="/d-hub/players/articles">Open PLAYER articles <ArrowRight size={16}/></Link></div>
      </section>

      <section className="dhub-player-modules section-pad">
        <div className="section-head"><div><p className="section-index">18 DEVELOPMENT MODULES</p><h2>Your PLAYERS development curriculum.</h2></div><p>Separate from the 48-session COACH LAB curriculum.</p></div>
        {stages.map(stage=><section key={stage}><header><span>{playerStageEn[stage]}</span></header><div>
          {list.filter(x=>x.stage===stage).map(x=><Link href={"/d-hub/players/member/modules/"+x.module_order} key={x.id} className={done.has(x.id)?"is-complete":undefined}>
            <span>{String(x.module_order).padStart(2,"0")}</span><strong>{x.title}</strong><small>{done.has(x.id)?"COMPLETED":"OPEN"}</small><ArrowRight size={15}/>
          </Link>)}
        </div></section>)}
      </section>
    </main>
  </SiteFrame>;
}
