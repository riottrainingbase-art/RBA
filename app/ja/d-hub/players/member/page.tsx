import type {Metadata} from "next";
import Link from "next/link";
import {redirect} from "next/navigation";
import {ArrowRight,BookOpen,Compass,History,LockKeyhole,NotebookPen,Target,UserRound,Users} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB PLAYERS MEMBER | Riot Basketball Academy"},robots:{index:false,follow:false}};

const labels:Record<string,string>={
  assessment:"ASSESSMENT",
  development:"DEVELOPMENT",
  game_experience:"GAME EXPERIENCE",
  feedback:"FEEDBACK",
  reassessment:"RE-ASSESSMENT"
};

export default async function Page(){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fplayers%2Fmember");

  const {data:ok}=await s.rpc("has_dhub_player_access");
  if(!ok)return <SiteFrame locale="ja" languagePage="d-hub"><main className="dhub-player-member-page">
    <section className="dhub-player-locked section-pad">
      <LockKeyhole size={42}/>
      <p className="section-index">D-HUB PLAYERS / MEMBER ACCESS</p>
      <h1>PLAYERSメンバー専用ページです。</h1>
      <p>D-HUB PLAYERS月額会員、またはGream U15の在籍選手として確認できたRBA IDで利用できます。新規加入はRBA IDで参加選手を確認し、Stripe月額決済後に自動で利用できます。COACH LABの会員権とは別です。</p>
      <div>
        <Link className="button button-dark" href="/ja/apply/dhub-players-monthly">PLAYERSに参加する</Link>
        <Link className="button button-light" href="/ja/d-hub/access-request?program=players">既存Square会員の照合 <ArrowRight size={16}/></Link>
        <Link className="button button-light" href="/ja/my-homecourt/app/team">Gream招待コードで参加 <ArrowRight size={16}/></Link>
      </div>
    </section>
  </main></SiteFrame>;

  const [
    {data:mods},
    {data:prog},
    {count:articleCount},
    {data:profile},
    {data:pathArticles},
    {data:pathProgressRows},
    {count:diaryCount}
  ]=await Promise.all([
    s.from("dhub_player_modules").select("*").eq("published",true).order("module_order"),
    s.from("dhub_player_progress").select("module_id,status").eq("user_id",user.id),
    s.from("dhub_paid_articles").select("id",{count:"exact",head:true}).eq("program_type","players").eq("locale","ja").eq("published",true),
    s.from("dhub_player_profiles").select("*").eq("user_id",user.id).maybeSingle(),
    s.from("dhub_paid_articles").select("id,slug,title,summary,editorial_note").eq("program_type","players").eq("locale","ja").eq("category","小6→中1 年間カリキュラム").eq("published",true),
    s.from("dhub_paid_article_progress").select("article_id,status").eq("user_id",user.id),
    s.from("dhub_player_diary").select("id",{count:"exact",head:true}).eq("user_id",user.id)
  ]);

  const {data:greamMembershipRows}=await s.from("team_memberships")
    .select("member_role,status,teams(name,category)")
    .eq("user_id",user.id)
    .eq("status","active")
    .eq("member_role","player");
  const greamMemberships=(greamMembershipRows||[]) as unknown as Array<{member_role:string;status:string;teams:{name:string;category:string}|null}>;
  const activeGreamTeam=greamMemberships.find(item=>item.teams?.category==="gream_u15")?.teams||null;

  const list=mods||[];
  const done=new Set((prog||[]).filter(x=>x.status==="completed").map(x=>x.module_id));
  const next=list.find(x=>!done.has(x.id))||list[list.length-1];
  const pct=list.length?Math.round(done.size/list.length*100):0;
  const stages=["assessment","development","game_experience","feedback","reassessment"];

  const orderedPath=(pathArticles||[]).sort((a,b)=>String(a.editorial_note||"").localeCompare(String(b.editorial_note||"")));
  const pathIds=new Set(orderedPath.map(a=>a.id));
  const pathProgress=(pathProgressRows||[]).filter(row=>pathIds.has(row.article_id));
  const pathCompleted=pathProgress.filter(row=>row.status==="completed").length;
  const pathStarted=pathProgress.filter(row=>row.status==="started").length;
  const now=new Date();
  const nowYm=`${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,"0")}`;
  const monthlyPath=orderedPath.filter(a=>String(a.editorial_note||"").startsWith("GRADE6_12M|")&&!String(a.editorial_note||"").includes("|00|"));
  const currentMonth=monthlyPath.find(a=>String(a.editorial_note||"").endsWith(nowYm))
    ||monthlyPath.find(a=>String(a.editorial_note||"").split("|")[2]>nowYm)
    ||monthlyPath[monthlyPath.length-1]
    ||orderedPath[0];

  const grade=profile?.grade||"未設定";
  const isGrade6=grade==="小6";
  const profileReady=Boolean(profile?.onboarding_completed);

  return <SiteFrame locale="ja" languagePage="d-hub"><main className="dhub-player-member-page">
    <section className="dhub-player-hero section-pad">
      <p className="section-index">D-HUB PLAYERS / MEMBER</p>
      <h1>練習・試合・振り返りを、<br/>自分でつなぐ。</h1>
      <p>見る。選ぶ。実行する。ゲームで試す。振り返る。次の練習を決める。D-HUB PLAYERSは、その循環を自分で回せる選手になるための場所です。</p>
      <div className="dhub-player-status"><span>MEMBERSHIP</span><strong>ACTIVE</strong><small>{grade} / {activeGreamTeam?activeGreamTeam.name+" 在籍特典":"D-HUB PLAYERS 月額会員"}</small></div>
    </section>

    <section className="dhub-player-home-actions section-pad">
      <Link href="/ja/d-hub/players/member/profile">
        <UserRound size={20}/><span>MY PROFILE</span><strong>{profileReady?"プロフィールを見る":"最初に設定する"}</strong><small>学年・所属・目標・今の課題</small>
      </Link>
      <Link href="/ja/d-hub/players/member/diary">
        <NotebookPen size={20}/><span>MY DIARY</span><strong>{diaryCount||0} ENTRIES</strong><small>練習・試合・身体・次の一つ</small>
      </Link>
      <Link href="/ja/d-hub/players/articles">
        <BookOpen size={20}/><span>PLAYER LIBRARY</span><strong>{articleCount||0} ARTICLES</strong><small>今の困りごとから読む</small>
      </Link>
    </section>

    <section className="dhub-player-progress section-pad">
      <div><span>MODULES</span><strong>{list.length}</strong><small>DEVELOPMENT STEPS</small></div>
      <div><span>COMPLETED</span><strong>{done.size}</strong><small>STEPS</small></div>
      <div><span>PROGRESS</span><strong>{pct}%</strong><small>MODULE RECORD</small></div>
      <div><span>12-MONTH PATH</span><strong>{pathCompleted}/{orderedPath.length}</strong><small>{pathStarted?"IN PROGRESS":"YOUR RECORD"}</small></div>
    </section>

    <section className="dhub-player-next section-pad">
      <div>
        <p className="section-index">{isGrade6?"YOUR PATH / GRADE 6 → U15":"GRADE 6 → U15 / 12-MONTH PATH"}</p>
        <h2>{isGrade6?"小6の今を、中1の秋へつなぐ。":"小6の今から、中1の秋まで。"}</h2>
        <p>最後の大会のためだけに仕上げるのではなく、見る・判断する・実行する力を中学のゲームへつなげる12か月です。2026年10月から2027年9月まで、毎月一つのテーマで進めます。</p>
        {!profileReady?<p><Link href="/ja/d-hub/players/member/profile">学年を設定すると、自分向けPATHとして表示できます →</Link></p>:null}
      </div>
      <div>
        <strong>{currentMonth?.title||"ROADMAP + 12 MONTHLY ARTICLES"}</strong>
        <p>{currentMonth?.summary||"1on1、パス、シュート、守備、トランジション、中学移行、スクリーン、身体づくりまで順番に進みます。"}</p>
        {currentMonth?<Link className="button button-member" href={"/ja/d-hub/players/articles/"+currentMonth.slug}>今やるテーマを開く <ArrowRight size={16}/></Link>:null}
        <Link className="button button-light" href="/ja/d-hub/players/articles/grade6-to-u15-12month-roadmap">全体ロードマップ <ArrowRight size={16}/></Link>
      </div>
    </section>

    <section className="dhub-player-toolkit section-pad">
      <div className="section-head"><div><p className="section-index">PLAYER TOOLKIT / THIS WEEK</p><h2>今週、どこから変える？</h2></div><p>全部を一度にやらなくて大丈夫です。今の自分に近いところを一つだけ選びます。</p></div>
      <div className="dhub-player-toolkit-grid">
        <article><span>BEFORE GAME</span><h3>試合前</h3><p>考えることを増やしすぎず、テーマを一つに絞る。</p><Link href="/ja/d-hub/players/articles/game-theme-one-only">試合前の準備を見る <ArrowRight size={15}/></Link></article>
        <article><span>IN GAME</span><h3>ゲーム中</h3><p>最初の3ポゼッションで、相手と自分の状態を見る。</p><Link href="/ja/d-hub/players/articles/first-three-possessions">ゲーム中の見方を見る <ArrowRight size={15}/></Link></article>
        <article><span>AFTER GAME</span><h3>振り返り</h3><p>長い反省ではなく、良かったこと・困ったこと・次の一つ。</p><Link href="/ja/d-hub/players/member/diary">MY DIARYに残す <ArrowRight size={15}/></Link></article>
        <article><span>RECOVERY</span><h3>身体・回復</h3><p>練習を増やす前に、今の身体で良い練習ができるかを見る。</p><Link href="/ja/d-hub/players/articles/grade6-support-growth-body-check">成長期の身体を見る <ArrowRight size={15}/></Link></article>
      </div>
    </section>

    <section className="dhub-player-cycle section-pad">
      <div className="section-head"><div><p className="section-index">DEVELOPMENT CYCLE</p><h2>成長を、一回で判断しない。</h2></div></div>
      <div className="dhub-player-cycle-grid">
        <div><Compass/><strong>ASSESSMENT</strong><p>現在地を知る</p></div>
        <div><Target/><strong>DEVELOPMENT</strong><p>課題を試す</p></div>
        <div><Users/><strong>GAME EXPERIENCE</strong><p>ゲームで確かめる</p></div>
        <div><NotebookPen/><strong>FEEDBACK</strong><p>振り返る</p></div>
        <div><History/><strong>RE-ASSESSMENT</strong><p>次を決める</p></div>
      </div>
    </section>

    {next?<section className="dhub-player-next section-pad">
      <div><p className="section-index">NEXT / {labels[next.stage]}</p><h2>{next.title}</h2><p>{next.guiding_question}</p></div>
      <div><strong>{next.focus}</strong><p>{next.action}</p><Link className="button button-member" href={"/ja/d-hub/players/member/modules/"+next.module_order}>MODULEを開く <ArrowRight size={16}/></Link></div>
    </section>:null}

    <section className="dhub-player-next section-pad">
      <div><p className="section-index">MEMBER ARTICLE LIBRARY</p><h2>プレーの悩みを、次の一つに変える。</h2><p>ボールを受ける前、1on1、ペイント、オフボール、シュート、ミスのあと、ベンチ、役割変更、映像、回復。試合の中で困りやすい場面を選手向けの言葉で整理しています。</p></div>
      <div><strong>{articleCount||0}本のPLAYER記事を公開中。</strong><p>読むだけで終わらず、最後に「次の練習でやること」を一つ決めます。</p><Link className="button button-member" href="/ja/d-hub/players/articles">PLAYER記事を読む <ArrowRight size={16}/></Link></div>
    </section>

    <section className="dhub-player-modules section-pad">
      <div className="section-head"><div><p className="section-index">18 DEVELOPMENT MODULES</p><h2>PLAYERS専用カリキュラム。</h2></div><p>COACH LABの48回とは別内容です。</p></div>
      {stages.map(stage=><section key={stage}><header><span>{labels[stage]}</span></header><div>
        {list.filter(x=>x.stage===stage).map(x=><Link href={"/ja/d-hub/players/member/modules/"+x.module_order} key={x.id} className={done.has(x.id)?"is-complete":undefined}>
          <span>{String(x.module_order).padStart(2,"0")}</span><strong>{x.title}</strong><small>{done.has(x.id)?"COMPLETED":"OPEN"}</small><ArrowRight size={15}/>
        </Link>)}
      </div></section>)}
    </section>
  </main></SiteFrame>;
}
