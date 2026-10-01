import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink, LockKeyhole, MessageCircle, NotebookPen, ShieldCheck } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "D-HUB COACH LAB MEMBER | Riot Basketball Academy" },
  robots: { index: false, follow: false },
};

const BAND_URL = "https://band.us/n/aaa2bdj9xcJ1o";
const JOIN_FORM = "https://form.jotform.com/262498803883068";

type Lesson = {
  id:string;
  week_no:number;
  module_no:number;
  module_title:string;
  title:string;
  guiding_question:string;
  purpose:string;
};

type PaidArticleLite = {
  id:string;
  slug:string;
  category:string;
  title:string;
  summary:string;
  reading:string;
  published_at:string|null;
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fcoaches%2Fmember");
  }

  const { data: hasAccess } = await supabase.rpc("has_dhub_coach_access");

  if (!hasAccess) {
    return (
      <SiteFrame locale="ja" languagePage="d-hub">
        <main className="dhub-member-page">
          <section className="dhub-member-hero section-pad">
            <LockKeyhole size={42}/>
            <p className="section-index">D-HUB / MEMBER ACCESS</p>
            <h1>このページは、D-HUBメンバー専用です。</h1>
            <p>Squareの月額購読が確認できたメンバーは、RBA IDでログインすると利用できます。すでに決済済みなのに入れない場合は、申込時・Square決済時・RBA IDのメールアドレスが異なる可能性があります。</p>
            <div className="dhub-member-actions">
              <a className="button button-dark" href={JOIN_FORM} target="_blank" rel="noreferrer">D-HUBへ参加する <ExternalLink size={16}/></a>
              <Link className="button button-light" href="/ja/d-hub/access-request?program=coach_lab">Square決済済みの方はこちら <ArrowRight size={16}/></Link>
            </div>
          </section>
        </main>
      </SiteFrame>
    );
  }

  const [{ data: membershipRows }, { data: lessonRows }, { data: progressRows }, { data: paidRows }] = await Promise.all([
    supabase.from("dhub_memberships").select("member_name,status,provider,last_payment_at,access_until").eq("program_type","coach_lab").limit(1),
    supabase.from("dhub_lessons").select("id,week_no,module_no,module_title,title,guiding_question,purpose").eq("published",true).order("week_no"),
    supabase.from("dhub_lesson_progress").select("lesson_id,status,updated_at").eq("user_id",user.id),
    supabase.from("dhub_paid_articles")
      .select("id,slug,category,title,summary,reading,published_at")
      .eq("program_type","coach_lab")
      .eq("locale","ja")
      .eq("published",true)
      .order("published_at",{ascending:false})
  ]);

  const membership = membershipRows?.[0];
  const lessons=(lessonRows||[]) as Lesson[];
  const completed=new Set((progressRows||[]).filter(row=>row.status==="completed").map(row=>row.lesson_id));
  const completedCount=completed.size;
  const completionPercent=lessons.length?Math.round((completedCount/lessons.length)*100):0;
  const nextLesson=lessons.find(lesson=>!completed.has(lesson.id))||lessons[lessons.length-1];

  const paidArticles=(paidRows||[]) as PaidArticleLite[];
  const paidArticleIds=paidArticles.map(article=>article.id);
  const {data:paidProgressRows}=paidArticleIds.length
    ?await supabase.from("dhub_paid_article_progress")
      .select("article_id,status,updated_at")
      .eq("user_id",user.id)
      .in("article_id",paidArticleIds)
    :{data:[]};
  const paidProgress=new Map((paidProgressRows||[]).map(row=>[row.article_id,row.status]));
  const paidCompleted=Array.from(paidProgress.values()).filter(status=>status==="completed").length;
  const paidStarted=Array.from(paidProgress.values()).filter(status=>status==="started").length;
  const paidCategories=new Set(paidArticles.map(article=>article.category)).size;
  const latestPaid=paidArticles.slice(0,3);
  const suggestedPaid=paidArticles.find(article=>paidProgress.get(article.id)!=="completed")||paidArticles[0];

  const groups=Array.from(new Map(lessons.map(lesson=>[lesson.module_no,lesson.module_title])).entries()).map(([moduleNo,moduleTitle])=>({
    moduleNo,moduleTitle,lessons:lessons.filter(lesson=>lesson.module_no===moduleNo)
  }));

  return (
    <SiteFrame locale="ja" languagePage="d-hub">
      <main className="dhub-member-page">
        <section className="dhub-member-hero section-pad">
          <ShieldCheck size={42}/>
          <p className="section-index">D-HUB COACH LAB / PAID MEMBER</p>
          <h1>学んで、試して、また戻ってくる。</h1>
          <p>D-HUB COACH LABは、有料記事を読むだけの場所ではありません。48回のカリキュラムを使いながら、実際の練習で試し、振り返り、必要なら他の指導者と話すところまで扱います。</p>
          <div className="dhub-member-status">
            <span>MEMBERSHIP</span>
            <strong>{membership?.status === "grace" ? "GRACE" : "ACTIVE"}</strong>
            <small>Square 月額3,300円</small>
          </div>
        </section>

        <section className="dhub-progress-strip section-pad">
          <div><span>CURRICULUM</span><strong>48</strong><small>WEEKLY LESSONS</small></div>
          <div><span>COMPLETED</span><strong>{completedCount}</strong><small>LESSONS</small></div>
          <div><span>PROGRESS</span><strong>{completionPercent}%</strong><small>YOUR RECORD</small></div>
          <div className="dhub-progress-next"><span>NEXT</span><strong>{nextLesson?String(nextLesson.week_no).padStart(2,"0"):"—"}</strong><small>{nextLesson?.title||"すべて完了"}</small></div>
        </section>

        <section className="dhub-member-section section-pad">
          <div className="section-head">
            <div><p className="section-index">PREMIUM LIBRARY / YOUR PROGRESS</p><h2>有料記事を、読む本数ではなく「使った本数」で見る。</h2></div>
            <p>COACH LABには{paidArticles.length}本・{paidCategories}領域の有料記事があります。全部読む必要はありません。今の課題に近い一本を選び、現場で試して記録してください。</p>
          </div>
          <div className="dhub-member-value">
            <div><span>PREMIUM</span><strong>{paidArticles.length}</strong><p>公開中の有料記事</p></div>
            <div><span>AREAS</span><strong>{paidCategories}</strong><p>練習・試合・S&C・組織・実務</p></div>
            <div><span>COMPLETED</span><strong>{paidCompleted}</strong><p>使い終えた記事</p></div>
            <div><span>IN PROGRESS</span><strong>{paidStarted}</strong><p>記録を残している記事</p></div>
          </div>
          <div className="dhub-member-actions">
            <Link className="button button-member" href="/ja/d-hub/coaches/articles">課題から有料記事を探す <ArrowRight size={16}/></Link>
          </div>
        </section>

        <section className="dhub-member-section section-pad">
          <div className="section-head">
            <div><p className="section-index">THIS WEEK / 30 MINUTES</p><h2>今週は、30分だけでいい。</h2></div>
            <p>教材を消化するのではなく、読む → 一つ決める → 現場で試す → 一言残す。このサイクルを毎週回します。</p>
          </div>
          <div className="dhub-member-grid">
            <article><BookOpen/><span>10 MIN / LESSON</span><h3>{nextLesson?.title||"48週カリキュラム"}</h3><p>{nextLesson?.guiding_question||"今の現場に近い問いを一つ選ぶ。"}</p>{nextLesson?<Link href={`/ja/d-hub/coaches/member/lessons/${nextLesson.week_no}`}>今週のレッスン <ArrowRight size={15}/></Link>:null}</article>
            <article><NotebookPen/><span>15 MIN / PREMIUM</span><h3>{suggestedPaid?.title||"実践記事を一本選ぶ"}</h3><p>{suggestedPaid?.summary||"今困っている場面に近い記事を一本だけ読む。"}</p>{suggestedPaid?<Link href={`/ja/d-hub/coaches/articles/${suggestedPaid.slug}`}>この記事を使う <ArrowRight size={15}/></Link>:<Link href="/ja/d-hub/coaches/articles">記事を探す <ArrowRight size={15}/></Link>}</article>
            <article><MessageCircle/><span>5 MIN / REVIEW</span><h3>一言残して、必要なら話す。</h3><p>記事内のCOACHING NOTEへ「起きたこと」と「次に変えること」を残し、ケースを共有したい時だけBANDへ。</p><a href={BAND_URL} target="_blank" rel="noreferrer">BANDを開く <ExternalLink size={15}/></a></article>
          </div>
        </section>

                {nextLesson?<section className="dhub-next-lesson section-pad">
          <div>
            <p className="section-index">NEXT LESSON / WEEK {String(nextLesson.week_no).padStart(2,"0")}</p>
            <h2>{nextLesson.title}</h2>
            <p>{nextLesson.guiding_question}</p>
          </div>
          <div className="dhub-next-card">
            <span>今週の目的</span>
            <p>{nextLesson.purpose}</p>
            <Link className="button button-member" href={`/ja/d-hub/coaches/member/lessons/${nextLesson.week_no}`}>このレッスンを開く <ArrowRight size={16}/></Link>
          </div>
        </section>:null}

        <section className="dhub-member-section section-pad">
          <div className="section-head">
            <div><p className="section-index">COACHING LOOP</p><h2>READ → PLAN → COACH → REVIEW</h2></div>
            <p>無料JOURNALで根拠を読み、D-HUBで実践課題へ変え、現場で試して記録し、BANDでケースを持ち寄ります。</p>
          </div>
          <div className="dhub-member-grid">
            <article><BookOpen/><span>01 / READ</span><h3>根拠を読む</h3><p>指導者JOURNALから、今の課題に近い記事を一本選びます。</p><Link href="/ja/journal/coaches">COACH JOURNAL <ArrowRight size={15}/></Link></article>
            <article><NotebookPen/><span>02 / TEST</span><h3>練習で試す</h3><p>D-HUBの課題を一つ実施し、実際に起きたことを記録します。</p>{nextLesson?<Link href={`/ja/d-hub/coaches/member/lessons/${nextLesson.week_no}`}>NEXT LESSON <ArrowRight size={15}/></Link>:<Link href="/ja/my-homecourt/coaches">COACH HOME <ArrowRight size={15}/></Link>}</article>
            <article><MessageCircle/><span>03 / DISCUSS</span><h3>D-HUBで話す</h3><p>実際に起きたことを持ち帰り、他の指導者と考えます。</p><a href={BAND_URL} target="_blank" rel="noreferrer">BANDを開く <ExternalLink size={15}/></a></article>
          </div>
        </section>

        {latestPaid.length?<section className="dhub-member-section section-pad">
          <div className="section-head">
            <div><p className="section-index">LATEST PREMIUM ARTICLES</p><h2>新しく追加された実践記事。</h2></div>
            <p>新着を全部追う必要はありません。今の課題に合うものだけ使ってください。</p>
          </div>
          <div className="dhub-member-grid">
            {latestPaid.map(article=><article key={article.id}><BookOpen/><span>{article.category} / {article.reading}</span><h3>{article.title}</h3><p>{article.summary}</p><Link href={`/ja/d-hub/coaches/articles/${article.slug}`}>{paidProgress.get(article.id)==="completed"?"振り返る":paidProgress.get(article.id)==="started"?"続きを使う":"記事を使う"} <ArrowRight size={15}/></Link></article>)}
          </div>
        </section>:null}

        <section className="dhub-next-lesson section-pad">
          <div><p className="section-index">MEMBER ARTICLE LIBRARY</p><h2>無料JOURNALの、その先へ。</h2><p>練習の止めどころ、3x3の設計、ローテーション、女子U15の膝、保護者説明、映像レビュー。現場で迷いやすいところを、具体的に掘り下げています。</p></div>
          <div className="dhub-next-card"><span>COACH LAB MEMBERS ONLY</span><p>参考文献を付けたうえで、研究の話だけにせず、次の練習でどう使うかまでまとめています。</p><Link className="button button-member" href="/ja/d-hub/coaches/articles">有料記事を読む <ArrowRight size={16}/></Link></div>
        </section>

        <section className="dhub-curriculum section-pad">
          <div className="section-head">
            <div><p className="section-index">48-WEEK CURRICULUM</p><h2>12テーマ × 4レッスン。</h2></div>
            <p>知識を順番に消化するのではなく、自分の現場の課題に近いテーマから始めても構いません。</p>
          </div>
          <div className="dhub-curriculum-groups">
            {groups.map(group=><section key={group.moduleNo}>
              <header><span>MODULE {String(group.moduleNo).padStart(2,"0")}</span><h3>{group.moduleTitle}</h3></header>
              <div>
                {group.lessons.map(lesson=><Link href={`/ja/d-hub/coaches/member/lessons/${lesson.week_no}`} key={lesson.id} className={completed.has(lesson.id)?"is-complete":undefined}>
                  <span>WEEK {String(lesson.week_no).padStart(2,"0")}</span>
                  <strong>{lesson.title}</strong>
                  <small>{completed.has(lesson.id)?"COMPLETED":"OPEN LESSON"}</small>
                  <ArrowRight size={15}/>
                </Link>)}
              </div>
            </section>)}
          </div>
        </section>

        <section className="dhub-member-section dhub-member-dark section-pad">
          <div className="section-head">
            <div><p className="section-index inverse">MEMBER VALUE</p><h2>無料JOURNALとの違い。</h2></div>
            <p>無料では「理解する」。D-HUBでは「自分の現場で使い、振り返り、次を修正する」まで進めます。</p>
          </div>
          <div className="dhub-member-value">
            <div><span>FREE JOURNAL</span><strong>KNOW</strong><p>研究、参考文献、RBAの解釈、限界を読む。</p></div>
            <div><span>D-HUB MEMBER</span><strong>APPLY</strong><p>48レッスン、実践課題、振り返り、ケース検討。</p></div>
            <div><span>COMMUNITY</span><strong>DISCUSS</strong><p>BANDで現場の事例を持ち寄り、他の指導者と考える。</p></div>
            <div><span>COACHING LOOP</span><strong>UPDATE</strong><p>READ → PLAN → COACH → REVIEWを繰り返す。</p></div>
          </div>
          <div className="dhub-member-actions">
            <a className="button button-light" href={BAND_URL} target="_blank" rel="noreferrer">D-HUB BANDへ <ExternalLink size={16}/></a>
            <Link className="button button-dark" href="/ja/journal/coaches">指導者JOURNAL <ArrowRight size={16}/></Link>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
