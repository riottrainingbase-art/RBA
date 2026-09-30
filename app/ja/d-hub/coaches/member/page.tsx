import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2, ExternalLink, LockKeyhole, MessageCircle, NotebookPen, ShieldCheck } from "lucide-react";
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

  const [{ data: membershipRows }, { data: lessonRows }, { data: progressRows }, { data: projectRows }] = await Promise.all([
    supabase.from("dhub_memberships").select("member_name,status,provider,last_payment_at,access_until").eq("program_type","coach_lab").limit(1),
    supabase.from("dhub_lessons").select("id,week_no,module_no,module_title,title,guiding_question,purpose").eq("published",true).order("week_no"),
    supabase.from("dhub_lesson_progress").select("lesson_id,status,updated_at").eq("user_id",user.id),
    supabase.from("dhub_projects").select("id,title,summary,category,region,application_deadline").eq("status","open").order("application_deadline",{ascending:true,nullsFirst:false}).limit(3),
  ]);

  const membership = membershipRows?.[0];
  const lessons=(lessonRows||[]) as Lesson[];
  const completed=new Set((progressRows||[]).filter(row=>row.status==="completed").map(row=>row.lesson_id));
  const completedCount=completed.size;
  const openProjects=projectRows||[];
  const completionPercent=lessons.length?Math.round((completedCount/lessons.length)*100):0;
  const nextLesson=lessons.find(lesson=>!completed.has(lesson.id))||lessons[lessons.length-1];

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
          <p>D-HUB COACH LABは記事を読むだけの有料版ではありません。48回のカリキュラム、毎週の実践課題、指導者同士の対話、振り返りを一つにつなげます。</p>
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

        <section className="dhub-next-lesson section-pad">
          <div><p className="section-index">D-HUB PROJECTS</p><h2>学びを、実際の案件へ。</h2><p>RBAに届くクリニック、チーム支援、地域開催、国際交流などの依頼を、条件の合うCOACH LABメンバーへつなぎます。案件・収入を保証するものではなく、報酬・役割・安全条件を確認した案件だけを掲載します。</p></div>
          <div className="dhub-next-card"><BriefcaseBusiness/><span>OPEN PROJECTS</span><strong>{openProjects.length}</strong><p>{openProjects.length?openProjects.map(project=>project.title).join(" / "):"現在募集中の案件はありません。"}</p><Link className="button button-member" href="/ja/d-hub/coaches/member/projects">{openProjects.length?"案件を確認する":"PROJECTSを開く"} <ArrowRight size={16}/></Link></div>
        </section>

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
