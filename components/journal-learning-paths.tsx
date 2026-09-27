import Link from "next/link";
import {ArrowRight, BookOpen, CheckCircle2, Clock3} from "lucide-react";
import {getPublicJournalPosts} from "@/lib/public-content";
import {journalLearningPaths,type JournalLearningPath} from "@/lib/journal-learning-paths";
import {SiteFrame} from "@/components/site-frame";

function minutes(reading:string){
  const match=reading.match(/\d+/);
  return match?Number(match[0]):0;
}

export function JournalLearningPathsGrid({compact=false}:{compact?:boolean}){
  const paths=compact?journalLearningPaths.slice(0,10):journalLearningPaths;
  return <section className="journal-paths section-pad">
    <div className="section-head">
      <div>
        <p className="section-index">READING PATHS</p>
        <h2>何から読めばいいか迷ったら。</h2>
      </div>
      <p>251本を全部読む必要はありません。いまの立場や悩みに近いところから、6本ずつ順番にまとめました。</p>
    </div>
    <div className="journal-path-grid">
      {paths.map(path=><Link key={path.key} href={`/ja/journal/paths/${path.key}`} className="journal-path-card">
        <div className="journal-path-card-top"><span>{path.index} / {path.eyebrow}</span><small>{path.steps.length} ARTICLES</small></div>
        <h3>{path.shortTitle}</h3>
        <p>{path.description}</p>
        <div className="journal-path-card-foot"><small>{path.forWhom}</small><strong>読む順番を見る <ArrowRight size={16}/></strong></div>
      </Link>)}
    </div>
    {compact?<div className="journal-paths-link"><Link href="/ja/journal/paths">10の読み方をまとめて見る <ArrowRight size={16}/></Link></div>:null}
  </section>;
}

export async function PublicJournalLearningPathsHub(){
  return <SiteFrame locale="ja" languagePage="journal">
    <main className="journal-hub journal-path-page">
      <section className="journal-path-hero section-pad">
        <Link href="/ja/journal" className="back-link">← RBA JOURNAL</Link>
        <p className="section-index">RBA JOURNAL / READING PATHS</p>
        <h1>251本を、順番に読む。</h1>
        <p>記事は増えましたが、最初から全部読む必要はありません。選手、保護者、指導者、U12、U15、3x3、S&C、女子選手、海外、チーム選び。いま必要なテーマから入ってください。</p>
      </section>
      <JournalLearningPathsGrid/>
      <section className="journal-path-note section-pad">
        <BookOpen/>
        <div>
          <strong>途中から読んでも構いません。</strong>
          <p>この順番は「必ず1から読む」という意味ではありません。気になる記事があれば、そこから始めてください。読み終わったら、自分の練習やチームで一つだけ試す。それくらいで十分です。</p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}

export async function PublicJournalLearningPath({path}:{path:JournalLearningPath}){
  const posts=await getPublicJournalPosts("ja",500);
  const articleMap=new Map(posts.map(post=>[post.slug,post]));
  const steps=path.steps
    .map(step=>({step,post:articleMap.get(step.slug)}))
    .filter(item=>Boolean(item.post)) as {step:JournalLearningPath["steps"][number];post:typeof posts[number]}[];
  const totalMinutes=steps.reduce((sum,item)=>sum+minutes(item.post.reading),0);

  const itemListLd={
    "@context":"https://schema.org",
    "@type":"ItemList",
    name:path.title,
    itemListElement:steps.map((item,index)=>({
      "@type":"ListItem",
      position:index+1,
      name:item.post.title,
      url:`https://riotbasketballacademy.com/ja/journal/${item.post.slug}`
    }))
  };

  return <SiteFrame locale="ja" languagePage="journal">
    <main className="journal-hub journal-path-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemListLd)}}/>
      <section className="journal-path-detail-hero section-pad">
        <Link href="/ja/journal/paths" className="back-link">← 読む順番一覧へ</Link>
        <p className="section-index">{path.index} / {path.eyebrow}</p>
        <h1>{path.title}</h1>
        <p>{path.description}</p>
        <div className="journal-path-facts">
          <span><BookOpen size={15}/>{steps.length}本</span>
          <span><Clock3 size={15}/>目安 {totalMinutes}分</span>
          <span>{path.forWhom}</span>
        </div>
      </section>

      <section className="journal-path-intro section-pad">
        <div>
          <p className="section-index">HOW TO READ</p>
          <h2>一気に読まなくて大丈夫です。</h2>
        </div>
        <p>一日一つでも、週に一つでも構いません。記事を読んだら「自分ならどうするか」を一つだけ考えて、次へ進んでください。</p>
      </section>

      <section className="journal-path-steps section-pad">
        {steps.map(({step,post},index)=><article key={post.slug} className="journal-path-step">
          <div className="journal-path-step-index">
            <span>{String(index+1).padStart(2,"0")}</span>
            <small>{step.label}</small>
          </div>
          <div className="journal-path-step-copy">
            <p className="note-tag">{post.category==="coaching"?"指導者":post.category==="families"?"保護者":post.category==="international"?"海外":"育成"} · {post.reading}</p>
            <h2>{post.title}</h2>
            <p>{post.standfirst}</p>
            <div className="journal-path-focus"><strong>この記事で見ること</strong><span>{step.focus}</span></div>
          </div>
          <Link href={`/ja/journal/${post.slug}`}>この記事を読む <ArrowRight size={16}/></Link>
        </article>)}
      </section>

      <section className="journal-path-reflection section-pad">
        <div>
          <p className="section-index inverse">AFTER READING</p>
          <h2>読み終わったら、これだけ考える。</h2>
          <p>答えを出す必要はありません。次の練習やチーム選びで、少し見方が変われば十分です。</p>
        </div>
        <div className="journal-path-reflection-list">
          {path.reflection.map((question,index)=><div key={question}><CheckCircle2 size={18}/><span>{String(index+1).padStart(2,"0")}</span><strong>{question}</strong></div>)}
        </div>
      </section>

      <section className="journal-path-next section-pad">
        <div>
          <p className="section-index">JOURNAL → MY HOME COURT</p>
          <h2>読んだことを、自分のバスケットへ戻す。</h2>
          <p>気づいたことを一つ残す、次に聞きたいことを決める、参加してみたい活動を探す。MY HOME COURTは、その続きを置いておく場所です。</p>
        </div>
        <div>
          <Link className="button button-member" href={path.homeHref}>{path.homeLabel} <ArrowRight size={17}/></Link>
          <Link className="button button-light" href="/ja/journal">JOURNALへ戻る <ArrowRight size={17}/></Link>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
