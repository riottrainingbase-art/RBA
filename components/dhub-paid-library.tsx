import "server-only";
import Link from "next/link";
import {notFound,redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {ArrowLeft,ArrowRight,BookOpen,ExternalLink} from "lucide-react";
import {createClient} from "@/lib/supabase/server";
import {SiteFrame} from "@/components/site-frame";
import styles from "./dhub-paid-library.module.css";
import {DhubPlayerLibraryExplorer} from "./dhub-player-library-explorer";
import {DhubCoachLibraryExplorer} from "./dhub-coach-library-explorer";

type Program="coach_lab"|"players";
type PaidLocale="ja"|"en";
type Source={title?:string;source?:string;year?:number;url?:string;note?:string};
type Section={heading:string;paragraphs:string[]};
type PaidArticle={
 id:string;slug:string;category:string;title:string;summary:string;reading:string;
 sections:Section[];field_action:string;reflection_questions:string[];
 related_public_slugs:string[];source_references:Source[];published_at:string|null;editorial_note:string;
};

const config={
 ja:{
  coach_lab:{
   label:"D-HUB COACH LAB",audience:"指導者向け",root:"/ja/d-hub/coaches/articles",home:"/ja/d-hub/coaches/member",
   login:"/ja/my-homecourt/login",rpc:"has_dhub_coach_access",
   heading:"現場で使うための、メンバー記事。",
   lead:"無料COACH JOURNALで考え方と根拠を確認したあと、練習設計、ゲームコーチング、S&C、保護者対応まで一段深く掘り下げます。読んで終わりではなく、次の現場で何を変えるかまで決めるための記事です。"
  },
  players:{
   label:"D-HUB PLAYERS",audience:"選手向け",root:"/ja/d-hub/players/articles",home:"/ja/d-hub/players/member",
   login:"/ja/my-homecourt/login",rpc:"has_dhub_player_access",
   heading:"試合と練習に持っていける、選手向けの記事。",
   lead:"うまくいかなかった理由を自分の性格や才能だけで片づけず、次に何を見て、何を試すかを整理します。難しい言葉を覚えるためではなく、自分のプレーを少しずつ変えるための読み物です。"
  }
 },
 en:{
  coach_lab:{
   label:"D-HUB COACH LAB",audience:"COACHES",root:"/d-hub/coaches/articles",home:"/d-hub/coaches/member",
   login:"/my-homecourt/login",rpc:"has_dhub_coach_access",
   heading:"Member articles built for the next practice.",
   lead:"Go beyond ideas and turn them into practice design, game coaching, physical preparation and reflection."
  },
  players:{
   label:"D-HUB PLAYERS",audience:"PLAYERS",root:"/d-hub/players/articles",home:"/d-hub/players/member",
   login:"/my-homecourt/login",rpc:"has_dhub_player_access",
   heading:"Player articles you can take into practice and games.",
   lead:"Do not reduce a difficult game to talent or personality. Work out what you saw, what you chose, what happened, and what you can try next."
  }
 }
} as const;

export async function DhubPaidLibrary({program,slug,locale="ja"}:{program:Program;slug?:string[];locale?:PaidLocale}){
 const c=config[locale][program];
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 const next=slug?.length===1?c.root+"/"+encodeURIComponent(slug[0]):c.root;
 if(!user)redirect(c.login+"?next="+encodeURIComponent(next));
 const {data:allowed}=await supabase.rpc(c.rpc);
 if(!allowed)redirect(c.home);
 if(slug&&slug.length>1)notFound();

 if(slug?.length===1){
  const {data,error}=await supabase.from("dhub_paid_articles").select("*")
   .eq("program_type",program).eq("locale",locale).eq("slug",slug[0]).eq("published",true).maybeSingle();
  if(error||!data)notFound();
  const article=data as PaidArticle;
  const sources=Array.isArray(article.source_references)?article.source_references:[];
  const isJaTrackableArticle=locale==="ja"&&(program==="players"||program==="coach_lab");
  const isJaPlayerArticle=program==="players"&&locale==="ja";
  const isPlayerPath=isJaPlayerArticle&&article.editorial_note?.startsWith("GRADE6_12M|");
  const {data:articleProgress}=isJaTrackableArticle?await supabase.from("dhub_paid_article_progress")
    .select("status,reflection,next_action,completed_at")
    .eq("user_id",user.id).eq("article_id",article.id).maybeSingle():{data:null};
  const {data:pathRows}=isPlayerPath?await supabase.from("dhub_paid_articles")
    .select("id,slug,title,editorial_note")
    .eq("program_type","players").eq("locale","ja").eq("category","小6→中1 年間カリキュラム").eq("published",true):{data:[]};
  const orderedPath=(pathRows||[]).sort((a,b)=>String(a.editorial_note||"").localeCompare(String(b.editorial_note||"")));
  const pathIndex=isPlayerPath?orderedPath.findIndex(item=>item.id===article.id):-1;
  const previousPath=pathIndex>0?orderedPath[pathIndex-1]:null;
  const nextPath=pathIndex>=0&&pathIndex<orderedPath.length-1?orderedPath[pathIndex+1]:null;

  async function saveArticleProgress(fd:FormData){
    "use server";
    if(locale!=="ja"||(program!=="players"&&program!=="coach_lab"))return;
    const x=await createClient();
    const {data:{user:u}}=await x.auth.getUser();
    if(!u)return;
    const {data:access}=await x.rpc(program==="coach_lab"?"has_dhub_coach_access":"has_dhub_player_access");
    if(!access)return;
    const articleId=String(fd.get("article_id")||"");
    const {data:validArticle}=await x.from("dhub_paid_articles")
      .select("id")
      .eq("id",articleId)
      .eq("program_type",program)
      .eq("locale",locale)
      .eq("published",true)
      .maybeSingle();
    if(!validArticle)return;
    const status=String(fd.get("status")||"started")==="completed"?"completed":"started";
    await x.from("dhub_paid_article_progress").upsert({
      user_id:u.id,
      article_id:articleId,
      status,
      reflection:String(fd.get("reflection")||"").slice(0,4000),
      next_action:String(fd.get("next_action")||"").slice(0,1000),
      completed_at:status==="completed"?new Date().toISOString():null,
      updated_at:new Date().toISOString()
    },{onConflict:"user_id,article_id"});
    revalidatePath(c.root+"/"+article.slug);
    revalidatePath(c.root);
    revalidatePath(c.home);
  }

  return <SiteFrame locale={locale} languagePage="d-hub"><main className={styles.shell}>
    <header className={styles.articleHero}>
      <Link href={c.root} className={styles.back}><ArrowLeft size={15}/> {locale==="ja"?"記事一覧へ":"Article library"}</Link>
      <p className={styles.eyebrow}>{c.label} / MEMBER ARTICLE / {article.category}</p>
      <h1>{article.title}</h1>
      <p className={styles.lead}>{article.summary}</p>
      <div className={styles.meta}><span>{article.reading}</span>{sources.length?<span>{locale==="ja"?`参考文献 ${sources.length}件`:`${sources.length} sources`}</span>:null}</div>
    </header>

    <section className={styles.readingGuide}>
      <div><p className={styles.eyebrow}>{locale==="ja"?"この記事で扱うこと":"IN THIS ARTICLE"}</p><strong>{locale==="ja"?"気になる見出しから読んでも構いません。":"Start with the section that matters most right now."}</strong></div>
      <nav>{article.sections.map((section,index)=><Link href={"#paid-section-"+index} key={section.heading}><span>{String(index+1).padStart(2,"0")}</span>{section.heading}</Link>)}</nav>
    </section>

    <article className={styles.articleBody}>
      {article.sections.map((section,index)=><section id={"paid-section-"+index} key={section.heading}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <h2>{section.heading}</h2>
        {section.paragraphs.map(p=><p key={p}>{p}</p>)}
      </section>)}

      <section className={styles.action}>
        <p className={styles.eyebrow}>{locale==="ja"?(program==="coach_lab"?"次の現場でやること":"次の練習・試合でやること"):"NEXT ACTION"}</p>
        <h2>{locale==="ja"?"一つだけ、持ち帰る。":"Take one thing into your next session."}</h2>
        <p>{article.field_action}</p>
      </section>

      <section className={styles.questions}>
        <p className={styles.eyebrow}>{locale==="ja"?"振り返る時の問い":"REFLECTION QUESTIONS"}</p>
        {article.reflection_questions.map((q,index)=><div key={q}><span>{String(index+1).padStart(2,"0")}</span><strong>{q}</strong></div>)}
      </section>

      {isJaTrackableArticle?<section className={styles.pathProgress}>
        <div className={styles.pathProgressHead}><div><p className={styles.eyebrow}>{program==="coach_lab"?"COACHING NOTE / SAVE YOUR LEARNING":isPlayerPath?"MY MONTH / SAVE YOUR LEARNING":"MY LEARNING / SAVE YOUR NEXT ACTION"}</p><h2>{program==="coach_lab"?"読んだことを、次の指導へ残す。":isPlayerPath?"今月を、自分の記録にする。":"読んだことを、自分のプレーに残す。"}</h2></div><span data-status={articleProgress?.status||"not-started"}>{articleProgress?.status==="completed"?"COMPLETED":articleProgress?.status==="started"?"IN PROGRESS":"NOT STARTED"}</span></div>
        <form action={saveArticleProgress}>
          <input type="hidden" name="article_id" value={article.id}/>
          <label>{program==="coach_lab"?"実際の現場で起きたこと":"実際に起きたこと"}<textarea name="reflection" rows={7} defaultValue={articleProgress?.reflection||""} placeholder={program==="coach_lab"?"練習・試合・保護者対応などで、実際に起きたことを事実ベースで残す。":"練習や試合で、見えたこと・できたこと・困ったことを残す。"}/></label>
          <label>{program==="coach_lab"?"次の現場で一つ変えること":"次の練習・試合でやること"}<input name="next_action" defaultValue={articleProgress?.next_action||""} placeholder="一つだけ決める"/></label>
          <div><button className="button button-light" name="status" value="started">記録を保存</button><button className="button button-member" name="status" value="completed">{isPlayerPath?"今月を完了":"この記事を完了"}</button></div>
        </form>
      </section>:null}
    </article>

    {isPlayerPath?<nav className={styles.pathNav}>
      {previousPath?<Link href={c.root+"/"+previousPath.slug}><ArrowLeft size={15}/><span><small>PREVIOUS</small>{previousPath.title}</span></Link>:<span/>}
      <Link href={c.root}>12-MONTH PATH</Link>
      {nextPath?<Link href={c.root+"/"+nextPath.slug}><span><small>NEXT</small>{nextPath.title}</span><ArrowRight size={15}/></Link>:<span/>}
    </nav>:null}

    {article.related_public_slugs?.length?<section className={styles.related}>
      <div><p className={styles.eyebrow}>{locale==="ja"?"無料JOURNALも確認する":"RELATED JOURNAL"}</p><h2>{locale==="ja"?"根拠や背景を読み直す。":"Read the wider context."}</h2></div>
      <div>{article.related_public_slugs.map(s=><Link href={(locale==="ja"?"/ja/journal/":"/journal/")+s} key={s}><BookOpen size={16}/><span>{s.replaceAll("-"," ")}</span><ArrowRight size={15}/></Link>)}</div>
    </section>:null}

    {sources.length?<section className={styles.sources}>
      <div><p className={styles.eyebrow}>{locale==="ja"?"参考文献":"SOURCES"}</p><h2>{locale==="ja"?"記事の背景にした資料。":"Background and source material."}</h2>{program==="coach_lab"?<p>{locale==="ja"?"研究が直接示している範囲と、RBAでの現場への落とし込みは同じではありません。本文では、その違いを踏まえて実践案として整理しています。":"Research findings and RBA's on-court application are not the same thing. The article separates the evidence from the practical interpretation."}</p>:null}</div>
      <div>{sources.map((source,index)=>source.url?<a href={source.url} target="_blank" rel="noreferrer" key={(source.title||"source")+index}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{source.title||source.source||(locale==="ja"?"参考資料":"Source")}</strong><p>{[source.source,source.year].filter(Boolean).join(" / ")}</p>{source.note?<small>{source.note}</small>:null}</div><ExternalLink size={14}/></a>:null)}</div>
    </section>:null}

    <footer className={styles.articleFooter}><Link href={c.home}>{c.label} {locale==="ja"?"MEMBER HOMEへ":"MEMBER HOME"} <ArrowRight size={16}/></Link></footer>
  </main></SiteFrame>;
 }

 const {data,error}=await supabase.from("dhub_paid_articles")
  .select("id,slug,category,title,summary,reading,source_references,published_at,editorial_note")
  .eq("program_type",program).eq("locale",locale).eq("published",true)
  .order("published_at",{ascending:false}).order("title");
 const articles=(error?[]:(data||[])) as PaidArticle[];
 const allPlayerIds=locale==="ja"&&(program==="players"||program==="coach_lab")?articles.map(article=>article.id):[];
 const {data:allPlayerProgressRows}=allPlayerIds.length?await supabase.from("dhub_paid_article_progress")
   .select("article_id,status").eq("user_id",user.id).in("article_id",allPlayerIds):{data:[]};
 const allPlayerProgress=new Map((allPlayerProgressRows||[]).map(row=>[row.article_id,row.status]));
 const allPlayerCompleted=Array.from(allPlayerProgress.values()).filter(status=>status==="completed").length;
 const allPlayerStarted=Array.from(allPlayerProgress.values()).filter(status=>status==="started").length;
 const curriculumCategory=locale==="ja"&&program==="players"?"小6→中1 年間カリキュラム":null;
 const supportCategory=locale==="ja"&&program==="players"?"小6→中1 サポートツール":null;
 const curriculumArticles=curriculumCategory?articles
   .filter(article=>article.category===curriculumCategory&&article.editorial_note?.startsWith("GRADE6_12M|"))
   .sort((a,b)=>(a.editorial_note||"").localeCompare(b.editorial_note||"")):[];
 const supportArticles=supportCategory?articles
   .filter(article=>article.category===supportCategory&&article.editorial_note?.startsWith("GRADE6_SUPPORT|"))
   .sort((a,b)=>(a.editorial_note||"").localeCompare(b.editorial_note||"")):[];
 const curriculumIds=curriculumArticles.map(article=>article.id);
 const {data:curriculumProgressRows}=curriculumIds.length?await supabase.from("dhub_paid_article_progress")
   .select("article_id,status").eq("user_id",user.id).in("article_id",curriculumIds):{data:[]};
 const curriculumProgress=new Map((curriculumProgressRows||[]).map(row=>[row.article_id,row.status]));
 const curriculumCompleted=Array.from(curriculumProgress.values()).filter(status=>status==="completed").length;
 const now=new Date();
 const nowYm=`${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,"0")}`;
 const monthlyArticles=curriculumArticles.filter(article=>article.editorial_note?.split("|")[0]==="GRADE6_12M"&&article.editorial_note?.split("|")[1]!=="00");
 const currentMonthArticle=monthlyArticles.find(article=>article.editorial_note?.endsWith(nowYm))
   ||monthlyArticles.find(article=>String(article.editorial_note?.split("|")[2]||"")>nowYm)
   ||monthlyArticles[monthlyArticles.length-1]
   ||null;
 const categories=Array.from(new Set(articles.map(a=>a.category)))
   .filter(category=>category!==curriculumCategory&&category!==supportCategory);
 const articleBySlug=new Map(articles.map(article=>[article.slug,article]));
 const featuredCoachTracks=locale==="ja"&&program==="coach_lab"?[
   {label:"START HERE",title:"まず現場を棚卸しする",description:"記事を読む前に、自チームの課題を可視化する。90分の棚卸しと30日実装から始める。",slugs:["90min-youth-development-system-review","30day-reset-pro-implementation","world-map-to-my-team-rule-audit"]},
   {label:"PRACTICE DESIGN",title:"練習設計を更新する",description:"待ち時間、難易度、制約、ゲームへの接続。メニュー名ではなく学習環境から設計する。",slugs:["reduce-waiting-lines","practice-too-easy-no-learning","change-constraints-change-learning"]},
   {label:"GAME COACHING",title:"試合で経験を渡す",description:"出場時間、交代、タイムアウトを、勝敗だけでなく選手の経験設計として見直す。",slugs:["playing-time-experience-map","substitution-after-mistake","timeout-ask-before-answer"]},
   {label:"OBSERVATION",title:"選手をどう見るか",description:"結果や印象で評価せず、見る・選ぶ・実行する・修正するを観察する。",slugs:["what-should-coaches-observe","evaluation-is-not-ranking","talent-bias-selection-review"]},
   {label:"S&C / SAFETY",title:"成長期の身体と安全",description:"ACL、ジャンプ負荷、月間試合密度。単発メニューではなく週・月単位で安全を設計する。",slugs:["girls-u15-deceleration","jump-load-needs-easy-days","monthly-competition-load-audit"]},
   {label:"PARENTS / ORGANIZATION",title:"保護者・組織と話す",description:"出場時間、成長、役割を抽象語で済ませず、説明できる運用へ変える。",slugs:["explain-development-with-behaviors","playing-time-conversation","organization-client-risk"]},
   {label:"PRO COACH",title:"指導を仕事として続ける",description:"学習計画、継続案件、条件整理。指導技術だけでなく専門職としての実務を整える。",slugs:["coach-learning-year-plan","repeat-client-review","end-project-cleanly"]},
   {label:"SHOOTER DEVELOPMENT",title:"フォームの先まで見る",description:"シューターをフォームだけで育てず、準備・スペーシング・判断・アドバンテージまで扱う。",slugs:["develop-shooters-not-just-shooting-form","video-first-watch-no-pause","what-should-coaches-observe"]}
 ].map(track=>({
   ...track,
   articles:track.slugs.map(slug=>articleBySlug.get(slug)).filter((article): article is PaidArticle=>Boolean(article)),
 })).filter(track=>track.articles.length>0):[];

 const featuredPlayerTracks=locale==="ja"&&program==="players"?[
   {label:"READ THE GAME",title:"見る・判断する",description:"Catch前、Drive前、Helpの位置。技を出す前にゲームの情報を読む。",slugs:["advantage-before-catch","count-help-defenders","read-defender-feet"]},
   {label:"HANDLE PRESSURE",title:"Ball Handling・Footwork",description:"Dribbleの高さ、Pocket、Pivot、Stop。Pressureの中でも顔を上げて次を選ぶ。",slugs:["dribble-height-by-pressure","pocket-dribble-protect","pivot-create-angle"]},
   {label:"CREATE ADVANTAGE",title:"1on1・Finishing",description:"技の数ではなく、角度・緩急・2人目の守備から優位を作る。",slugs:["change-pace-before-move","retreat-re-attack","finish-read-rim-protector"]},
   {label:"PASS + SPACE",title:"Passing・Spacing",description:"Passing Window、Paint Touch、Second/Third Side。ボールを動かして守備を動かす。",slugs:["passing-window-angle","paint-touch-relocate","third-side-extra-pass"]},
   {label:"WITHOUT THE BALL",title:"Off-ball・Cut",description:"Pass後、Driveへの合わせ、DeniedへのBackdoor。ボールがない時間もプレーする。",slugs:["drift-lift-on-drive","backdoor-when-denied","cut-when-defender-turns-head"]},
   {label:"U15 SCREEN READS",title:"Screen・PnRを読む",description:"Screenを自動で使わない。Use / Reject / Snake / Tagを守備から選ぶ。",slugs:["screen-read-before-use","reject-screen","weakside-tag-read-pnr"]},
   {label:"STOP THE BALL",title:"守備",description:"Stealの前に進路を守る。Closeout、Gap、Help、Screen Communicationまで。",slugs:["contain-first-two-dribbles","gap-help-recover","screen-defense-communication"]},
   {label:"RUN + REBOUND",title:"Transition・Rebound",description:"Reboundから3秒、Wide Lane、Pitch Ahead、Rim/Ball。攻守の切り替えを速くする。",slugs:["guard-rebound-push","transition-wide-lanes","transition-defense-rim-ball"]},
   {label:"3x3 LAB",title:"3x3で判断回数を増やす",description:"Spacing、Pass-Cut-Fill、Transition、Communicationを少人数ゲームで磨く。",slugs:["3x3-space-after-check","3x3-pass-cut-fill","3x3-transition-first-possession"]},
   {label:"BEAT PRESSURE",title:"Press・Trap対応",description:"Trap、Inbound、Middle Flash、Press Break。囲まれてから頑張る前に出口を作る。",slugs:["trap-escape-pass-fake","middle-flash-vs-press","press-break-spacing"]},
   {label:"GAME MANAGEMENT",title:"終盤判断・役割",description:"Score / Time / Foul、Late Clock、Final Shot。終盤をコーチの指示待ちにしない。",slugs:["score-time-foul-awareness","late-clock-advance","final-shot-rebound-roles"]},
   {label:"ZONE READS",title:"Zone Defenseを読む",description:"外から回すだけにしない。Gap、High Post、Short Corner、Skipで守備を動かす。",slugs:["zone-gap-attack","zone-high-post-read","zone-short-corner"]},
   {label:"DHO + INTERIOR",title:"DHO・Post・Interior",description:"Handoff、Reject、Seal、High-Low。形ではなく守備の前後関係から読む。",slugs:["dho-read-defender","post-seal-early","high-low-read"]},
   {label:"SPECIAL SITUATIONS",title:"BLOB・SLOB・Foul Game",description:"終盤やOut of Boundsも、暗記ではなくScore・Time・Spacing・Safetyから判断する。",slugs:["bobj-sideline-spacing","slob-advance-ball","foul-or-no-foul-awareness"]},
   {label:"BUILD THE ATHLETE",title:"身体・回復・リーダーシップ",description:"成長期の身体、睡眠・回復、声かけ。長く成長するための土台を整える。",slugs:["landing-quiet-control","strength-basics-youth","pregame-nerves-routine"]}
 ].map(track=>({
   ...track,
   articles:track.slugs
     .map(slug=>articleBySlug.get(slug))
     .filter((article): article is PaidArticle=>Boolean(article)),
 })).filter(track=>track.articles.length>0):[];

 return <SiteFrame locale={locale} languagePage="d-hub"><main className={styles.shell}>
   <header className={styles.libraryHero}>
    <Link href={c.home} className={styles.back}><ArrowLeft size={15}/> MEMBER HOME</Link>
    <p className={styles.eyebrow}>{c.label} / PAID ARTICLE LIBRARY</p>
    <h1>{c.heading}</h1>
    <p className={styles.lead}>{c.lead}</p>
    <div className={styles.libraryStats}><div><span>{locale==="ja"?"公開中":"PUBLISHED"}</span><strong>{articles.length}</strong><small>ARTICLES</small></div><div><span>{locale==="ja"?"カテゴリー":"CATEGORIES"}</span><strong>{categories.length+(curriculumArticles.length?1:0)+(supportArticles.length?1:0)}</strong><small>LEARNING AREAS</small></div>{locale==="ja"&&(program==="players"||program==="coach_lab")?<><div><span>COMPLETED</span><strong>{allPlayerCompleted}</strong><small>YOUR ARTICLES</small></div><div><span>IN PROGRESS</span><strong>{allPlayerStarted}</strong><small>YOUR ARTICLES</small></div></>:null}<div><span>{locale==="ja"?"対象":"FOR"}</span><strong>{c.audience}</strong><small>MEMBERS ONLY</small></div></div>
   </header>

   {featuredCoachTracks.length?<section className={styles.supportTools}>
     <div className={styles.supportToolsHead}><div><p className={styles.eyebrow}>COACH LAB / START FROM YOUR PROBLEM</p><h2>今の現場から、8つの入口を選ぶ。</h2></div><p>72本を上から読む必要はありません。今困っている場面に近いルートから3本だけ選び、次の練習・試合で一つ試してください。</p></div>
     <div className={styles.supportToolsGrid}>{featuredCoachTracks.map((track,index)=><article className={styles.trackCard} key={track.label}>
       <span>{String(index+1).padStart(2,"0")} / {track.label}</span><h3>{track.title}</h3><p>{track.description}</p>
       <div className={styles.trackLinks}>{track.articles.map(article=><Link href={c.root+"/"+article.slug} key={article.slug}>{article.title} <ArrowRight size={14}/></Link>)}</div>
     </article>)}</div>
   </section>:null}

   {featuredPlayerTracks.length?<section className={styles.supportTools}>
     <div className={styles.supportToolsHead}><div><p className={styles.eyebrow}>PLAYER LEARNING PATHS / START HERE</p><h2>{articles.length}本から探さなくていい。今の課題から入る。</h2></div><p>技名から探すのではなく、ゲームで困っている場面から3本ずつ選びました。Gream / U15選手も、まず一つのPATHから始めて、次の練習で一つだけ試します。</p></div>
     <div className={styles.supportToolsGrid}>{featuredPlayerTracks.map((track,index)=><article className={styles.trackCard} key={track.label}>
       <span>{String(index+1).padStart(2,"0")} / {track.label}</span><h3>{track.title}</h3><p>{track.description}</p>
       <div className={styles.trackLinks}>{track.articles.map(article=><Link href={c.root+"/"+article.slug} key={article.slug}>{article.title} <ArrowRight size={14}/></Link>)}</div>
     </article>)}</div>
   </section>:null}

   {locale==="ja"&&program==="coach_lab"?<DhubCoachLibraryExplorer root={c.root} articles={articles.map(article=>({
     slug:article.slug,category:article.category,title:article.title,summary:article.summary,reading:article.reading,
     sourceCount:Array.isArray(article.source_references)?article.source_references.length:0,
     status:(allPlayerProgress.get(article.id) as "started"|"completed"|undefined)||null
   }))}/>:null}

   {locale==="ja"&&program==="players"?<DhubPlayerLibraryExplorer root={c.root} articles={articles.map(article=>({
     slug:article.slug,category:article.category,title:article.title,summary:article.summary,reading:article.reading,
     sourceCount:Array.isArray(article.source_references)?article.source_references.length:0
   }))}/>:null}

   {curriculumArticles.length?<section className={styles.curriculum}>
    <div className={styles.curriculumHead}>
      <div><p className={styles.eyebrow}>GRADE 6 → U15 / 12-MONTH PATH</p><h2>小6の今から、中1の秋まで。</h2><p>小学生最後の半年を「最後の大会のため」だけに使わず、中学で必要になる見る・判断する・実行する力へつなげます。2026年10月から2027年9月まで、毎月一つのテーマで進めます。</p></div>
      <div className={styles.curriculumStats}><div><span>PATH</span><strong>12</strong><small>MONTHS</small></div><div><span>COMPLETE</span><strong>{curriculumCompleted}/{curriculumArticles.length}</strong><small>YOUR PROGRESS</small></div></div>
    </div>
    <div className={styles.curriculumGrid}>{curriculumArticles.map((article,index)=>{
      const parts=(article.editorial_note||"").split("|");
      const label=parts[2]||"";
      const status=curriculumProgress.get(article.id);
      const isCurrent=currentMonthArticle?.id===article.id;
      return <Link href={c.root+"/"+article.slug} key={article.slug} className={[styles.curriculumCard,isCurrent?styles.curriculumCurrent:""].filter(Boolean).join(" ")}>
        <div className={styles.curriculumCardMeta}><span>{index===0?"START / ROADMAP":`MONTH ${String(index).padStart(2,"0")}`}</span><span>{label}</span></div>
        <div className={styles.curriculumCardStatus}>{isCurrent?<b>NOW / NEXT</b>:null}{status==="completed"?<b>COMPLETED</b>:status==="started"?<b>IN PROGRESS</b>:null}</div>
        <h3>{article.title}</h3><p>{article.summary}</p><strong>{status==="completed"?(locale==="ja"?"振り返る":"Review"):(locale==="ja"?"この月を始める":"Start")} <ArrowRight size={15}/></strong>
      </Link>;
    })}</div>
   </section>:null}

   {supportArticles.length?<section className={styles.supportTools}>
     <div className={styles.supportToolsHead}><div><p className={styles.eyebrow}>GRADE 6 → U15 / SUPPORT TOOLS</p><h2>12か月を回すための、6つの道具。</h2></div><p>自主練、映像、成長期の身体、U15選び、質問の仕方。月別テーマだけでは足りない部分をここで補います。</p></div>
     <div className={styles.supportToolsGrid}>{supportArticles.map((article,index)=><Link href={c.root+"/"+article.slug} key={article.slug}>
       <span>{String(index+1).padStart(2,"0")}</span><h3>{article.title}</h3><p>{article.summary}</p><strong>使ってみる <ArrowRight size={15}/></strong>
     </Link>)}</div>
   </section>:null}

   <nav className={styles.categoryNav}>{categories.map(category=><Link href={"#cat-"+category} key={category}>{category}</Link>)}</nav>

   {categories.map(category=><section className={styles.group} id={"cat-"+category} key={category}>
    <div className={styles.groupHead}><span>{category}</span><strong>{articles.filter(a=>a.category===category).length}{locale==="ja"?"本":" ARTICLES"}</strong></div>
    <div className={styles.grid}>{articles.filter(a=>a.category===category).map(article=>{
      const refs=Array.isArray(article.source_references)?article.source_references.length:0;
      const status=allPlayerProgress.get(article.id);
      return <Link href={c.root+"/"+article.slug} key={article.slug} className={styles.card}>
        <div className={styles.cardMeta}><span>{article.reading}</span>{refs?<span>{locale==="ja"?`参考文献 ${refs}`:`${refs} sources`}</span>:null}{status?<span>{status==="completed"?"COMPLETED":"IN PROGRESS"}</span>:null}</div>
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <strong>{locale==="ja"?"記事を読む":"Read article"} <ArrowRight size={15}/></strong>
      </Link>;
    })}</div>
   </section>)}
 </main></SiteFrame>;
}
