import { UnitedArticleCTA } from "./united-projects";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, FileText, History as HistoryIcon, MessageCircle, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { getPublicJournalPost, getPublicJournalPosts, type PublicJournalPost } from "@/lib/public-content";
import { Locale, localePath, SiteFrame } from "@/components/site-frame";
import { JournalExplorer } from "@/components/journal-explorer";
import { JournalReaderTools } from "@/components/journal-reader-tools";
import { JournalLearningPathsGrid } from "@/components/journal-learning-paths";

const copy={
  en:{kicker:"RBA JOURNAL",title:"Useful ideas. Real programmes.",lead:"Development guides, field notes and international exchange stories from RBA.",latest:"LATEST",all:"ALL STORIES",exchange:"ASIA EXCHANGE DESK",exchangeTitle:"Build the next exchange with us.",exchangeBody:"Academies, teams and coaches can contact RBA about Japan visits, joint clinics, coach education and youth exchange.",ask:"Ask RBA on WhatsApp",read:"Read article",back:"Back to Journal"},
  ja:{kicker:"RBA JOURNAL",title:"育成を、もっと深く。もっと広く。",lead:"研究・公式資料で確認できること、RBAが現場でどう解釈するか、まだ断定できないことを分けて届けます。読むだけで終わらず、次の練習・判断・行動まで。",latest:"最新記事",all:"記事一覧",exchange:"ASIA EXCHANGE DESK",exchangeTitle:"日本とアジアの次の交流を、一緒につくる。",exchangeBody:"海外アカデミー、チーム、指導者の皆さまへ。来日プログラム、合同クリニック、指導者講習、育成年代の交流についてRBAへご相談ください。",ask:"WhatsAppでRBAに相談",read:"記事を読む",back:"JOURNALへ戻る"},
  "zh-tw":{kicker:"RBA JOURNAL",title:"讓培育連結更廣的世界。",lead:"分享球員、家長、教練與亞洲夥伴都能使用的培育觀點、現場筆記與國際交流。",latest:"最新文章",all:"所有文章",exchange:"ASIA EXCHANGE DESK",exchangeTitle:"一起建立日本與亞洲的下一次交流。",exchangeBody:"歡迎學院、球隊與教練洽詢日本交流、聯合訓練營、教練教育與青少年合作。",ask:"WhatsApp聯絡RBA",read:"閱讀文章",back:"返回JOURNAL"},
  ko:{kicker:"RBA JOURNAL",title:"육성을 더 넓은 세계로.",lead:"선수, 보호자, 코치와 아시아 파트너를 위한 육성 관점, 현장 기록, 국제 교류를 공유합니다.",latest:"최신 글",all:"전체 글",exchange:"ASIA EXCHANGE DESK",exchangeTitle:"일본과 아시아의 다음 교류를 함께 만듭니다.",exchangeBody:"아카데미, 팀, 코치는 일본 교류, 공동 클리닉, 코치 교육과 유소년 교류를 RBA에 문의할 수 있습니다.",ask:"WhatsApp으로 RBA 문의",read:"글 읽기",back:"JOURNAL로 돌아가기"}
} as const;

const categoryLabels={
  en:{development:"Development",families:"Families",coaching:"Coaching",international:"International",programme:"Programmes"},
  ja:{development:"育成",families:"保護者",coaching:"指導者",international:"海外交流",programme:"プログラム"},
  "zh-tw":{development:"培育",families:"家長",coaching:"教練",international:"國際交流",programme:"活動"},
  ko:{development:"육성",families:"보호자",coaching:"코칭",international:"국제 교류",programme:"프로그램"}
} as const;

const relatedTopicTerms=["U15","U12","ミニバス","Bユース","部活","クラブ","登録","移籍","セレクション","選抜","出場","プレータイム","ベンチ","スクリーン","マンツーマン","3x3","判断","パス","ドリブル","シュート","リバウンド","守備","プレス","トランジション","タイムアウト","練習","負荷","睡眠","怪我","捻挫","膝","オスグッド","脳震盪","ACL","復帰","保護者","チーム選び","海外","遠征","international","decision","screen","defense","training","injury"];

function relatedArticleScore(base:PublicJournalPost,candidate:PublicJournalPost){
  let score=0;
  if(base.category===candidate.category)score+=5;
  if(base.audience===candidate.audience)score+=3;
  const baseText=`${base.title} ${base.standfirst} ${base.evidence_level||""}`.toLowerCase();
  const candidateText=`${candidate.title} ${candidate.standfirst} ${candidate.evidence_level||""}`.toLowerCase();
  for(const term of relatedTopicTerms){
    const t=term.toLowerCase();
    if(baseText.includes(t)&&candidateText.includes(t))score+=4;
  }
  if(base.evidence_level&&candidate.evidence_level&&base.evidence_level===candidate.evidence_level)score+=1;
  return score;
}

function findRelatedArticles(base:PublicJournalPost,posts:PublicJournalPost[],limit=3){
  return posts
    .filter(candidate=>candidate.slug!==base.slug)
    .map(candidate=>({candidate,score:relatedArticleScore(base,candidate)}))
    .filter(item=>item.score>0)
    .sort((a,b)=>b.score-a.score||new Date(b.candidate.published_at||0).getTime()-new Date(a.candidate.published_at||0).getTime())
    .slice(0,limit)
    .map(item=>item.candidate);
}

export async function PublicJournalHub({locale}:{locale:Locale}){
  const c=copy[locale], posts=await getPublicJournalPosts(locale,500);
  const authReady=process.env.RBA_AUTH_EMAIL_READY==="true";
  const whatsapp=`https://wa.me/818032483703?text=${encodeURIComponent(({en:"Hello RBA, we are interested in a Japan–Asia basketball exchange.",ja:"RBAの海外交流について相談したいです。","zh-tw":"您好RBA，我們想詢問日本與亞洲的籃球交流。",ko:"RBA의 일본-아시아 농구 교류에 대해 문의하고 싶습니다."})[locale])}`;
  const findPost=(slug:string)=>posts.find(post=>post.slug===slug);
  const explorerItems=posts.map(post=>({
    slug:post.slug,
    category:post.category,
    audience:post.audience,
    title:post.title,
    standfirst:post.standfirst,
    reading:post.reading,
    published_at:post.published_at,
    evidence_level:post.evidence_level,
    source_count:post.source_references?.length||0
  }));
  const startHereSlugs=["winning-vs-developing","development-environment","parents-support-not-coach","who-is-playing"];
  const startHere=startHereSlugs.map(findPost).filter(Boolean) as typeof posts;

  const worldMapItems=[
    {country:"FINLAND",label:"フィンランド",slug:"world-map-finland-child-sport-reform-2026",focus:"順位表・地域決勝・子ども中心の競技設計"},
    {country:"GERMANY",label:"ドイツ",slug:"world-map-germany-mini-basketball-bio-banding-2026",focus:"U12ルール・コーチ教育・Bio-Banding"},
    {country:"SPAIN",label:"スペイン",slug:"world-map-spain-metodo-feb-2026",focus:"継続評価・大会を育成へ戻す仕組み"},
    {country:"FRANCE",label:"フランス",slug:"world-map-france-development-pathway-2026",focus:"U13からつながる全国育成経路"},
    {country:"AUSTRALIA",label:"オーストラリア",slug:"world-map-australia-participation-to-performance-2026",focus:"普及からハイパフォーマンスまでの接続"},
    {country:"SERBIA",label:"セルビア",slug:"world-map-serbia-coach-education-2026",focus:"伝統を更新する継続的なコーチ教育"},
    {country:"ENGLAND",label:"イングランド",slug:"world-map-england-development-rules-2026",focus:"出場機会と個人守備を制度で守る"},
    {country:"CANADA",label:"カナダ",slug:"world-map-canada-youth-rules-2026",focus:"年齢相応のルールと長期的な選手育成"},
    {country:"USA",label:"アメリカ",slug:"world-map-usa-basketball-guidelines-2026",focus:"試合数・休養・早期専門化まで含めた設計"}
  ];
  const worldMapPosts=worldMapItems
    .map(item=>({item,post:findPost(item.slug)}))
    .filter(entry=>Boolean(entry.post)) as {item:(typeof worldMapItems)[number];post:PublicJournalPost}[];
  const familyPaths=[
    {label:"チーム選びで迷っている",slug:"how-to-choose-youth-team"},
    {label:"今のチームから移るべきか悩んでいる",slug:"when-to-change-teams"},
    {label:"強豪チームへ行けば伸びるのか知りたい",slug:"strong-school-myth"},
    {label:"出場時間が少ない・機会が偏っている",slug:"playing-time-is-experience"},
    {label:"練習量が多すぎないか心配",slug:"too-much-practice"},
    {label:"試合後の声かけを見直したい",slug:"parents-support-not-coach"},
    {label:"応援席からどこまで声をかけるべきか",slug:"parents-sideline-instructions"},
    {label:"小学生の役割を早く固定していいのか",slug:"dont-fix-positions-too-early"}
  ];
  const coachPaths=[
    {label:"勝利と育成をどう両立するか",slug:"winning-vs-developing"},
    {label:"マンツーマンを育成の土台にしたい",slug:"why-man-to-man-first"},
    {label:"U12でスクリーンをどう扱うか考えたい",slug:"screens-before-reading"},
    {label:"ベンチから指示しすぎていないか",slug:"who-is-playing"},
    {label:"大差の試合をどう育成に変えるか",slug:"press-in-blowouts"},
    {label:"B戦を育成機会として設計したい",slug:"value-of-b-games"},
    {label:"罰走とコンディショニングを分けたい",slug:"punishment-running-is-not-conditioning"},
    {label:"怒鳴る指導を見直したい",slug:"shouting-is-not-coaching"},
    {label:"判断を増やす練習をつくりたい",slug:"small-sided-games"}
  ];
  return <SiteFrame locale={locale} languagePage="journal">
    <div className="journal-hub journal-cms">
      <section className="journal-cms-hero section-pad">
        <p className="section-index">{c.kicker}</p>
        <h1>{c.title}</h1>
        <p>{c.lead}</p>
        <div className="journal-cms-languages">
          <Link href="/journal" aria-current={locale==="en"?"page":undefined}>EN</Link>
          <Link href="/ja/journal" aria-current={locale==="ja"?"page":undefined}>日本語</Link>
          <Link href="/zh-tw/journal" aria-current={locale==="zh-tw"?"page":undefined}>繁中</Link>
          <Link href="/ko/journal" aria-current={locale==="ko"?"page":undefined}>한국어</Link>
        </div>
      </section>
      <JournalExplorer locale={locale} items={explorerItems}/>
      {locale==="ja"?<section className="journal-library-metrics section-pad" aria-label="RBA JOURNALの情報量">
        <article><strong>{posts.length}</strong><span>公開記事</span><small>育成・保護者・指導者・海外・プログラム</small></article>
        <article><strong>{posts.filter(post=>post.evidence_summary||post.source_references?.length).length}</strong><span>根拠欄あり</span><small>EVIDENCE / RBA INTERPRETATION / LIMITATIONS</small></article>
        <article><strong>{posts.reduce((sum,post)=>sum+(post.source_references?.length||0),0)}</strong><span>参考資料リンク</span><small>原典・公式資料を確認できる入口</small></article>
        <article><strong>{posts.filter(post=>post.reviewed_at).length}</strong><span>レビュー日付き</span><small>最終確認日を記事ごとに表示</small></article>
      </section>:null}
      {locale==="ja"?<JournalLearningPathsGrid compact totalArticles={posts.length}/>:null}

      {locale==="ja"&&worldMapPosts.length?<section className="journal-cms-index section-pad" id="world-youth-basketball-map">
        <div className="section-head">
          <div>
            <p className="section-index">WORLD YOUTH BASKETBALL MAP 2026</p>
            <h2>「海外ではこうしている」で終わらせない。</h2>
          </div>
          <p>各国の制度を並べるだけではなく、なぜその仕組みが生まれたのか、何を守ろうとしているのか、日本の育成年代と何が違うのかまで原典から確認します。</p>
        </div>
        <div className="homecourt-launch-actions">
          <Link className="button button-member" href={journalHref(locale,"world-youth-basketball-map-2026-synthesis")}>14か国比較｜共通点と違いをまとめて読む <ArrowRight size={17}/></Link>
        </div>
        <div className="journal-cms-grid">{worldMapPosts.map(({item,post},index)=><Link href={journalHref(locale,post.slug)} key={post.slug}>
          <span>{String(index+1).padStart(2,"0")}</span>
          <p className="note-tag">{item.country} / {item.label}</p>
          <div className="journal-card-meta"><span>{post.reading}</span>{post.source_references?.length?<span>参考文献 {post.source_references.length}</span>:null}</div>
          {post.evidence_level?<small className="journal-evidence-chip">{post.evidence_level}</small>:null}
          <h3>{post.title}</h3>
          <p>{item.focus}</p>
          <strong>背景から読む <ArrowRight size={16}/></strong>
        </Link>)}</div>
        {findPost("perceptual-cognitive-training-transfer-2026")?<div className="homecourt-launch-actions">
          <Link className="button button-light" href={journalHref(locale,"perceptual-cognitive-training-transfer-2026")}>2026 RESEARCH NOTE｜「認知トレーニング」は試合へ転移するか <ArrowRight size={17}/></Link>
        </div>:null}
      </section>:null}
\n\n      {locale==="ja"?<section className="journal-evidence-standard section-pad">
        <div className="section-head"><div><p className="section-index">EDITORIAL STANDARD</p><h2>根拠があることと、RBAの考えは分けて書きます。</h2></div><p>RBA JOURNALでは、研究やガイドラインで確認できること、RBAが現場でどう解釈しているか、現時点では断定できないことを分けて掲載します。</p></div>
        <div className="journal-evidence-grid">
          <article><span>EVIDENCE</span><h3>研究・公式資料</h3><p>学術論文やFIBA/WABC、JBAなど、できる限り元の資料まで確認して掲載します。</p></article>
          <article><span>RBA INTERPRETATION</span><h3>RBAの考え方</h3><p>研究結果をそのまま当てはめるのではなく、日本のU12・U15の現場ではどう考えるかを分けて書きます。</p></article>
          <article><span>LIMITATIONS</span><h3>断定できないこと</h3><p>研究対象が違う場合や、まだ十分な比較研究がない場合は、その点も書きます。</p></article>
        </div>
      </section>:null}

      {locale==="ja"?<section className="journal-clinic-bridge section-pad">
        <div className="journal-clinic-copy">
          <p className="section-index inverse">NEXT LIVE LEARNING / 11.25</p>
          <h2>シュートフォームだけ教えて、<br/>シューターは育つのか。</h2>
          <p>11月25日、トーステン・ロイブル氏と90分。技術だけでなく、スペーシング、判断、アドバンテージ、オフボールまで含めて「試合で質の高いシュートを生み出す育成」を学びます。</p>
          <div className="journal-clinic-facts"><span>ZOOM</span><span>日本語逐次通訳</span><span>LIVE ¥3,300</span><span>30日視聴 ¥4,400</span></div>
        </div>
        <div className="journal-clinic-actions">
          <strong>2026.11.25<br/><em>20:00–21:30</em></strong>
          <Link className="button button-member" href="/ja/events/torsten-loibl-online-clinic">講習内容を見る <ArrowRight size={17}/></Link>
        </div>
      </section>:null}
      {locale==="ja"&&startHere.length?<section className="journal-cms-index section-pad">
        <div className="section-head"><div><p className="section-index">初めて読む方へ</p><h2>RBAの考え方が分かる4本です。</h2></div><p>RBAが育成年代をどう考えているのか、土台になる記事を選びました。</p></div>
        <div className="journal-cms-grid">{startHere.map((post,index)=><Link href={journalHref(locale,post.slug)} key={post.slug}>
          <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">START HERE</p><div className="journal-card-meta"><span>{post.reading}</span>{post.source_references?.length?<span>参考文献 {post.source_references.length}</span>:null}</div>{post.evidence_level?<small className="journal-evidence-chip">{post.evidence_level}</small>:null}<h3>{post.title}</h3><p>{post.standfirst}</p><strong>この記事から読む <ArrowRight size={16}/></strong>
        </Link>)}</div>
      </section>:null}
      {locale==="ja"?<section className="homecourt-role-section section-pad">
        <div className="section-head"><div><p className="section-index">悩みから探す</p><h2>気になっていることから読めます。</h2></div><p>専門用語やテーマ名が分からなくても大丈夫です。保護者・指導者それぞれの悩みから記事を探せます。</p></div>
        <div className="homecourt-role-grid">
          <article><span>PARENTS</span><h3>保護者の方</h3><p>チーム選び、出場時間、試合後の声かけ、役割固定など。</p>{familyPaths.map(item=>{const post=findPost(item.slug);return post?<Link key={item.slug} href={journalHref(locale,item.slug)}>{item.label} <ArrowRight size={15}/></Link>:null})}</article>
          <article><span>COACHES</span><h3>指導者の方</h3><p>勝利と育成、ベンチワーク、プレス、判断を育てる練習設計など。</p><Link href="/ja/journal/coaches"><strong>指導者専用JOURNALへ</strong> <ArrowRight size={15}/></Link>{coachPaths.slice(0,5).map(item=>{const post=findPost(item.slug);return post?<Link key={item.slug} href={journalHref(locale,item.slug)}>{item.label} <ArrowRight size={15}/></Link>:null})}</article>
          <article><span>PLAYERS / ALL</span><h3>選手・すべての方</h3><p>試合、練習、クリニック、海外交流を「次の成長」につなげる記事です。</p><Link href="#all-articles">育成の記事を見る <ArrowRight size={15}/></Link><Link href="#all-articles">海外交流の記事を見る <ArrowRight size={15}/></Link><Link href="/ja/opportunities">参加できる活動を探す <ArrowRight size={15}/></Link></article>
        </div>
      </section>:null}
      
      {locale==="ja"?<section className="homecourt-role-section section-pad">
        <div className="section-head"><div><p className="section-index">FROM JOURNAL TO ACTION</p><h2>読んだあと、どう動くか。</h2></div><p>自分の立場に合う情報を保存し、次の活動や学びにつなげるならMY HOME COURTへ。</p></div>
        <div className="homecourt-role-grid">
          <article><span>PLAYER</span><h3>選手</h3><p>練習、試合、次のクリニック。今の自分に必要な情報をまとめて探せます。</p><Link href="/ja/my-homecourt/players">選手向けHOME <ArrowRight size={16}/></Link></article>
          <article><span>PARENT</span><h3>保護者</h3><p>チーム選び、出場時間、移籍、練習量。迷ったときに、感情だけで決めず整理できる記事をまとめています。</p><Link href="/ja/journal/families">保護者JOURNALへ <ArrowRight size={16}/></Link><Link href="/ja/my-homecourt/families">保護者向けHOME <ArrowRight size={16}/></Link></article>
          <article><span>COACH</span><h3>指導者</h3><p>D-HUB、Torsten、練習設計。毎週の指導をアップデートする学びをまとめます。</p><Link href="/ja/my-homecourt/coaches">指導者向けHOME <ArrowRight size={16}/></Link></article>
        </div>
        <div className="homecourt-launch-actions">{authReady?<Link className="button button-member" href="/ja/my-homecourt/login">無料でRBA IDをつくる<ArrowRight size={17}/></Link>:<a className="button button-member" href="https://lin.ee/5l1YG8N" target="_blank" rel="noreferrer">登録再開のお知らせを受け取る<ArrowRight size={17}/></a>}<Link className="button button-dark" href="/ja/homecourt-plus">教科書・PLUSを見る<ArrowRight size={17}/></Link><Link className="button button-light" href="/ja/opportunities">募集中の活動を見る<ArrowRight size={17}/></Link></div>
      </section>:null}
      <section className="journal-exchange-cta section-pad">
        <div><p className="section-index inverse">{c.exchange}</p><h2>{c.exchangeTitle}</h2><p>{c.exchangeBody}</p></div>
        <div><a className="button button-light" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{c.ask}</a><a className="button button-dark" href={localePath(locale,"international")}>International <ArrowUpRight size={16}/></a></div>
      </section>
    </div>
  </SiteFrame>;
}

export async function PublicJournalArticle({locale,slug}:{locale:Locale;slug:string}){
  const c=copy[locale], post=await getPublicJournalPost(locale,slug);
  if(!post)notFound();
  const allPosts=await getPublicJournalPosts(locale,500);
  const related=findRelatedArticles(post,allPosts,3);
  const currentInfo=Boolean(post.evidence_level&&/(CURRENT RULES|OFFICIAL RULES|REGISTRATION|TRANSFER|COMPETITION RULES|JBA CURRENT)/i.test(post.evidence_level));
  const safetyInfo=Boolean(post.evidence_level&&/MEDICAL|CDC|CONCUSSION|PEDIATRIC|AAP/i.test(post.evidence_level));
  const articleUrl="https://riotbasketballacademy.com"+journalHref(locale,slug);
  const articleLd={
    "@context":"https://schema.org",
    "@type":"Article",
    headline:post.title,
    description:post.standfirst,
    inLanguage:locale==="zh-tw"?"zh-Hant-TW":locale,
    datePublished:post.published_at||undefined,
    dateModified:post.reviewed_at||post.updated_at||post.published_at||undefined,
    mainEntityOfPage:articleUrl,
    author:{"@type":"Organization",name:"Riot Basketball Academy",url:"https://riotbasketballacademy.com"},
    publisher:{"@type":"Organization",name:"Riot Basketball Academy",url:"https://riotbasketballacademy.com"},
    citation:(post.source_references||[]).map(ref=>ref.url),
    isPartOf:{"@type":"CollectionPage",name:"RBA JOURNAL",url:"https://riotbasketballacademy.com"+journalRoot(locale)}
  };
  const breadcrumbLd={
    "@type":"BreadcrumbList",
    itemListElement:[
      {"@type":"ListItem",position:1,name:"Riot Basketball Academy",item:"https://riotbasketballacademy.com/"},
      {"@type":"ListItem",position:2,name:"RBA JOURNAL",item:"https://riotbasketballacademy.com"+journalRoot(locale)},
      {"@type":"ListItem",position:3,name:post.title,item:articleUrl}
    ]
  };
  const journalLd={"@context":"https://schema.org","@graph":[articleLd,breadcrumbLd]};
  return <SiteFrame locale={locale} languagePage="journal"><article className="journal-article journal-cms-article"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(journalLd)}}/>
    <header className="article-hero section-pad"><Link href={journalRoot(locale)} className="back-link">← {c.back}</Link><p className="section-index">{c.kicker} / {categoryLabels[locale][post.category as keyof typeof categoryLabels.en]||post.category}</p><h1>{post.title}</h1><div className="article-hero-summary"><p>{post.standfirst}</p><div className="article-meta-row"><span>{post.reading}</span><span>{categoryLabels[locale][post.category as keyof typeof categoryLabels.en]||post.category}</span>{post.source_references?.length?<a href="#sources">{locale==="ja"?`参考文献 ${post.source_references.length}件`:locale==="zh-tw"?`參考資料 ${post.source_references.length}`:locale==="ko"?`참고 자료 ${post.source_references.length}`:`${post.source_references.length} sources`}</a>:null}{post.reviewed_at?<span>{locale==="ja"?"最終レビュー":locale==="zh-tw"?"最後審查":locale==="ko"?"최종 검토":"Reviewed"} · {new Date(post.reviewed_at).toLocaleDateString(locale)}</span>:null}</div></div></header>
    {locale==="ja"?<UnitedArticleCTA slug={slug}/>:null}
    {post.hero_image_url?<figure className="journal-field-hero section-pad"><img src={post.hero_image_url} alt={post.hero_image_alt||post.title}/><figcaption>{post.hero_image_alt||post.title}</figcaption></figure>:null}
    <JournalReaderTools title={post.title} locale={locale} slug={post.slug}/>
    {locale==="ja"?<section className="journal-quick-summary section-pad">
      <div><span>30 SEC</span><strong>全部読まなくて大丈夫です。</strong></div>
      <div><h2>この記事で伝えたいこと</h2><p>{post.aside_text||post.standfirst}</p><div><a href="#section-1">気になるところから読む <ArrowRight size={15}/></a><Link href="/ja/journal">別の記事を探す <ArrowRight size={15}/></Link></div></div>
    </section>:null}
    {currentInfo?<section className="journal-current-notice section-pad"><span>CURRENT / 2026</span><div><strong>制度・ルールに関する記事です。</strong><p>{post.reviewed_at?`最終確認：${new Date(post.reviewed_at).toLocaleDateString("ja-JP")}。`:""} 大会要項・登録期限・競技規則は更新される場合があります。最新のJBA・都道府県協会・大会主管者の案内を優先してください。</p></div></section>:null}
    {safetyInfo?<section className="journal-safety-notice section-pad"><span>HEALTH / SAFETY</span><div><strong>健康・安全に関する一般情報です。</strong><p>診断や個別の復帰判断の代わりにはなりません。痛み・神経症状・頭部衝撃後の症状などがある場合は、医師・理学療法士等の適切な医療専門職へ相談してください。</p></div></section>:null}
    <section className="journal-reading-guide section-pad" aria-label={locale==="ja"?"この記事の読み方":"Article reading guide"}>
      <div className="journal-reading-guide-copy"><p className="section-index">{locale==="ja"?"この記事の流れ":"IN THIS ARTICLE"}</p><h2>{locale==="ja"?"気になるところから読んでください。":"See the structure before you read."}</h2><p>{locale==="ja"?"気になる項目から読んでも、最初から順番に読んでも大丈夫です。見出しから該当箇所へ移動できます。":"Jump to the section you need, or read from the beginning."}</p></div>
      <nav className="journal-reading-nav" aria-label={locale==="ja"?"記事内目次":"Article sections"}>{post.sections.map((section,index)=><a href={`#section-${index+1}`} key={section.heading}><span>{String(index+1).padStart(2,"0")}</span><strong>{section.heading}</strong></a>)}{post.coach_application?.length?<a href="#coach-application"><span>+</span><strong>{locale==="ja"?"現場での使い方":"Coach application"}</strong></a>:null}{post.source_references?.length?<a href="#sources"><span>↗</span><strong>{locale==="ja"?"参考文献":"Sources"}</strong></a>:null}</nav>
      <aside className="journal-reading-point"><span>{locale==="ja"?"まず、ここだけ":"KEY POINT"}</span><strong>{post.aside_title||c.kicker}</strong><p>{post.aside_text||post.standfirst}</p></aside>
    </section>
    {post.evidence_summary||post.rba_interpretation||post.limitations?<section className="journal-evidence-compact section-pad" id="evidence">
      <details>
        <summary>
          <div><span>EVIDENCE CHECK</span><strong>{locale==="ja"?"この記事の根拠とRBAの考え方":locale==="zh-tw"?"查看證據、RBA解讀與限制":locale==="ko"?"근거·RBA 해석·한계 보기":"Evidence, interpretation and limitations"}</strong></div>
          <div>{post.evidence_level?<small>{post.evidence_level}</small>:null}<b>＋</b></div>
        </summary>
        <div className="journal-evidence-grid">
          {post.evidence_summary?<article><span>EVIDENCE</span><h3>{locale==="ja"?"研究・ガイドラインから言えること":locale==="zh-tw"?"研究與指南支持的內容":locale==="ko"?"연구·가이드라인이 지지하는 내용":"What the evidence supports"}</h3><p>{post.evidence_summary}</p></article>:null}
          {post.rba_interpretation?<article><span>RBA INTERPRETATION</span><h3>{locale==="ja"?"RBAが現場でどう解釈するか":locale==="zh-tw"?"RBA如何在現場解讀":locale==="ko"?"RBA가 현장에서 어떻게 해석하는가":"How RBA applies it"}</h3><p>{post.rba_interpretation}</p></article>:null}
          {post.limitations?<article><span>LIMITATIONS</span><h3>{locale==="ja"?"ここは断定しない":locale==="zh-tw"?"不應斷言的部分":locale==="ko"?"단정하지 않는 부분":"What this does not prove"}</h3><p>{post.limitations}</p></article>:null}
        </div>
        {post.reviewed_at?<p className="journal-evidence-reviewed">{locale==="ja"?"最終レビュー":locale==="zh-tw"?"最後審查":locale==="ko"?"최종 검토":"Last reviewed"} · {new Date(post.reviewed_at).toLocaleDateString(locale)}</p>:null}
      </details>
    </section>:null}
    <div className="article-body section-pad"><aside className="article-side-note"><p>{locale==="ja"?"READING GUIDE":c.kicker}</p><strong>{post.aside_title||c.kicker}</strong><span>{post.aside_text||post.standfirst}</span><nav aria-label={locale==="ja"?"記事内目次":"Article sections"}>{post.sections.map((section,index)=><a href={`#section-${index+1}`} key={section.heading}><b>{String(index+1).padStart(2,"0")}</b>{section.heading}</a>)}</nav></aside><div>{post.sections.map((section,index)=><section id={`section-${index+1}`} key={section.heading}><span>{String(index+1).padStart(2,"0")}</span><h2>{section.heading}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}{section.bullets?.length?<ul>{section.bullets.map(b=><li key={b}>{b}</li>)}</ul>:null}</section>)}</div></div>
    {post.coach_application?.length?<section className="journal-coach-application section-pad" id="coach-application">
      <div className="section-head"><div><p className="section-index">COACH APPLICATION</p><h2>{locale==="ja"?"明日の練習で、どう使うか。":locale==="zh-tw"?"明天的訓練，如何使用。":locale==="ko"?"내일 훈련에서 어떻게 적용할까.":"How to use this in your next practice."}</h2></div><p>{locale==="ja"?"記事の内容を、現場で試せる形まで落とし込みます。":locale==="zh-tw"?"把文章內容轉成可在場上實踐的形式。":locale==="ko"?"기사 내용을 현장에서 실행 가능한 형태로 바꿉니다.":"Turn the article into a practical coaching task."}</p></div>
      <div className="journal-coach-tool-grid">{post.coach_application.map((tool,index)=><article key={tool.title}>
        <div className="journal-coach-tool-head"><span>{String(index+1).padStart(2,"0")} / COACH TOOL</span><h3>{tool.title}</h3><p>{tool.purpose}</p></div>
        {tool.setup?.length?<div><strong>SETUP</strong><ul>{tool.setup.map(item=><li key={item}>{item}</li>)}</ul></div>:null}
        {tool.constraints?.length?<div><strong>CONSTRAINTS</strong><ul>{tool.constraints.map(item=><li key={item}>{item}</li>)}</ul></div>:null}
        {tool.observations?.length?<div><strong>OBSERVE</strong><ul>{tool.observations.map(item=><li key={item}>{item}</li>)}</ul></div>:null}
        {tool.review_questions?.length?<div><strong>REVIEW QUESTIONS</strong><ul>{tool.review_questions.map(item=><li key={item}>{item}</li>)}</ul></div>:null}
      </article>)}</div>
      <div className="journal-coach-next"><BookOpen/><div><strong>{locale==="ja"?"READ → PLAN → COACH → REVIEW":locale==="zh-tw"?"READ → PLAN → COACH → REVIEW":locale==="ko"?"READ → PLAN → COACH → REVIEW":"READ → PLAN → COACH → REVIEW"}</strong><p>{locale==="ja"?"読むだけで終わらせず、練習設計に入れ、観察し、次の修正まで残す。":locale==="zh-tw"?"不只閱讀，而是放進訓練、觀察，再留下下一個修正。":locale==="ko"?"읽고 끝내지 않고 훈련에 넣고 관찰하고 다음 수정까지 남깁니다.":"Read it, plan it, coach it, observe it, then refine it."}</p></div></div>
    </section>:null}
    {post.source_references?.length?<section className="journal-sources section-pad" id="sources">
      <div className="section-head"><div><p className="section-index">SOURCES / FURTHER READING</p><h2>{locale==="ja"?"参考資料・一次情報":locale==="zh-tw"?"參考資料・原始來源":locale==="ko"?"참고 자료·1차 출처":"References and primary sources"}</h2></div><p>{locale==="ja"?"外部資料は、主張の根拠を確認できるよう原典へリンクしています。":locale==="zh-tw"?"外部資料直接連結原始來源，方便確認論據。":locale==="ko"?"외부 자료는 근거를 확인할 수 있도록 원문에 연결합니다.":"External references link to the original source where possible."}</p></div>
      <div className="journal-source-list">{post.source_references.map((ref,index)=><a key={ref.url+index} href={ref.url} target="_blank" rel="noreferrer"><span>{String(index+1).padStart(2,"0")}</span><div><strong>{ref.title}</strong><small>{ref.source}{ref.year?" · "+ref.year:""}</small>{ref.note?<p>{ref.note}</p>:null}</div><ArrowUpRight size={17}/></a>)}</div>
    </section>:null}

    {locale==="ja"?(post.category==="programme"?<section className="article-learning-bridge section-pad">
      <div>
        <p className="section-index inverse">ARTICLE → NEXT OPPORTUNITY</p>
        <h2>この2日間を、<br/>次の育成機会へ。</h2>
        <p>Development CampやClinicは、受けて終わりではなく、所属チームで試し、振り返り、次の機会へつなげるためにあります。現在募集中のRBAプログラムはOPPORTUNITIESにまとめています。</p>
      </div>
      <div className="article-learning-panel">
        <span>RBA / OPPORTUNITIES</span>
        <strong>NEXT CAMP / CLINIC</strong>
        <small>全国・海外の育成機会を更新</small>
        <Link className="button button-member" href="/ja/opportunities">募集中の活動を見る <ArrowRight size={17}/></Link>
      </div>
    </section>:post.category==="coaching"?<section className="article-learning-bridge section-pad">
      <div>
        <p className="section-index inverse">ARTICLE → LIVE LEARNING</p>
        <h2>読むだけで終わらせず、<br/>次の練習へ。</h2>
        <p>11月25日のTorsten Loibl Online Clinicでは、「現代バスケットボールにおけるシューターの育成と活用」をテーマに、技術・練習設計・ゲーム戦略を90分でつなぎます。</p>
      </div>
      <div className="article-learning-panel">
        <span>11.25 / 20:00 JST / ZOOM</span>
        <strong>LIVE ¥3,300</strong>
        <small>日本語逐次通訳付き</small>
        <Link className="button button-member" href="/ja/events/torsten-loibl-online-clinic">オンライン講習を見る <ArrowRight size={17}/></Link>
      </div>
    </section>:<section className="article-learning-bridge section-pad">
      <div>
        <p className="section-index inverse">ARTICLE → ACTION</p>
        <h2>読んだことを、<br/>次の行動へ。</h2>
        <p>記事を保存し、次の練習・試合・相談・育成機会へつなげる入口としてMY HOME COURTを使えます。</p>
      </div>
      <div className="article-learning-panel">
        <span>RBA / MY HOME COURT</span>
        <strong>READ → TRY → REVIEW</strong>
        <small>学びを残し、次を選ぶ</small>
        <Link className="button button-member" href="/ja/my-homecourt">MY HOME COURTを見る <ArrowRight size={17}/></Link>
      </div>
    </section>):null}
    {related.length?<section className="journal-cms-index section-pad">
      <div className="section-head"><div><p className="section-index">{locale==="ja"?"関連記事":"RELATED"}</p><h2>{locale==="ja"?"あわせて読みたい3本。":"Keep reading"}</h2></div><p>{locale==="ja"?"現在公開されている記事だけを表示しています。":"Published articles only."}</p></div>
      <div className="journal-cms-grid">{related.map((item,index)=><Link href={journalHref(locale,item.slug)} key={item.slug}>
        <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">{categoryLabels[locale][item.category as keyof typeof categoryLabels.en]||item.category}</p><h3>{item.title}</h3><p>{item.standfirst}</p><strong>{c.read}<ArrowRight size={16}/></strong>
      </Link>)}</div>
    </section>:null}
    <footer className="article-convert section-pad"><p className="section-index inverse">RBA / NEXT STEP</p><h2>{post.cta_title||c.exchangeTitle}</h2><p>{post.cta_body||c.exchangeBody}</p>{locale==="ja"?<div className="homecourt-plan-grid" style={{marginTop:"1.5rem"}}><article className="homecourt-plan-card"><span>FREE / RBA ID</span><h3>まずは知る・探す・残す。</h3><p>JOURNAL、育成機会、参加履歴を一つのRBA IDでつなぐ無料の入口です。</p><a className="button button-light" href="/ja/my-homecourt/login">無料でRBA IDをつくる<ArrowRight size={17}/></a></article><article className="homecourt-plan-card homecourt-plan-paid"><span>HOMECOURT PLUS / ¥3,300</span><h3>教科書を、次の行動に変える。</h3><p>DEVELOPMENT LIBRARYの教科書・DEEP DIVE・実践ガイドを使い、試す・振り返る・次を決めるところまで続けたい方へ。</p><a className="button button-member" href="/ja/homecourt-plus">HOMECOURT PLUSを見る<ArrowRight size={17}/></a></article></div>:null}<div><Link className="button button-light" href={journalRoot(locale)}>{c.back}<ArrowRight size={17}/></Link>{locale==="ja"?<Link className="button button-dark" href={post.category==="coaching"?"/ja/my-homecourt/coaches":post.category==="families"?"/ja/my-homecourt/families":post.category==="international"?"/ja/international":"/ja/my-homecourt/players"}>自分向けのHOMEを見る <ArrowRight size={17}/></Link>:<Link className="button button-dark" href={localePath(locale,"international")}>International <ArrowRight size={17}/></Link>}</div>{locale==="ja"?<p style={{marginTop:"1rem"}}>無料で知る・探すところから始めても構いません。継続的に学びを残したい方はHOMECOURT PLUSへ進めます。</p>:null}</footer>
    {locale==="ja"?<UnitedArticleCTA slug={slug}/>:null}
  </article></SiteFrame>;
}

export async function PublicCoachJournalHub({locale}:{locale:Locale}){
  const posts=await getPublicJournalPosts(locale,500);
  const coachPosts=posts.filter(post=>post.audience==="coaches"||post.category==="coaching"||post.coach_application?.length);
  const recentCoachPosts=coachPosts.slice(0,8);
  const prefix=locale==="en"?"":`/${locale}`;
  const coachGroups=[
    {id:"coach-u12",label:"U12 / FUNDAMENTALS",slugs:["why-youth-practice-becomes-shortcut-drills","why-man-to-man-first","screens-before-reading","small-sided-games","coach-catch-before-dribble-scan","coach-passing-window-before-pass-type"]},
    {id:"coach-offense",label:"OFFENSE / DECISION MAKING",slugs:["coach-teach-advantage-before-move","coach-drive-reactions-off-ball","spacing-is-a-relationship","after-pass-keep-playing","point-guard-is-not-only-decision-maker","offense-rules-need-priority"]},
    {id:"coach-game",label:"GAME COACHING",slugs:["who-is-playing","mistake-does-not-always-mean-substitution","press-in-blowouts","value-of-b-games","substitution-is-development-design","timeout-questions-not-orders"]},
    {id:"coach-practice",label:"PRACTICE DESIGN",slugs:["coach-one-theme-per-session","coach-4on0-to-4on4-progression","three-on-three-is-not-small-five-on-five","too-many-constraints-change-the-game","questions-are-not-always-better","stop-practice-less-often"]},
    {id:"coach-reflection",label:"FEEDBACK / REFLECTION",slugs:["coach-good-bad-next-reflection","athlete-controlled-feedback","feedback-is-not-better-when-more","minimal-intervention-coaching","coach-observe-before-correct","coach-video-ask-before-tell"]},
    {id:"coach-player",label:"PLAYER DEVELOPMENT",slugs:["coach-award-behavior-not-talent","relationship-is-coaching-infrastructure","mastery-climate-over-ranking","criticism-can-create-better-coaching","showa-myths-youth-basketball","read-before-you-react"]},
    {id:"coach-physical",label:"S&C / SAFETY",slugs:["girls-strength-and-knee-health","acl-prevention-is-a-program","coach-create-pain-reporting-culture","coach-growth-spurt-adjust-load","training-load-is-not-one-number","punishment-running-is-not-conditioning"]},
  ];
  return <SiteFrame locale={locale} languagePage="journal">
    <div className="journal-hub journal-cms">
      <section className="journal-cms-hero section-pad">
        <Link href={journalRoot(locale)} className="back-link">← RBA JOURNAL</Link>
        <p className="section-index">RBA JOURNAL / COACH</p>
        <h1>{locale==="ja"?"練習メニューを増やす前に、何を育てたいかを考える。":locale==="zh-tw"?"讓教練判斷不只依賴經驗。":locale==="ko"?"지도 판단을 경험에만 맡기지 않습니다.":"Coach with evidence, then test it on court."}</h1>
        <p>{locale==="ja"?"ミニバスの基礎、練習設計、ゲームコーチング、S&C、安全。答えを集めるのではなく、目の前の選手をどう見るかまで考える指導者向けJOURNALです。":"Evidence, coaching guidance and practical interpretation connected to practice design."}</p>
      </section>
      <nav className="journal-topic-nav section-pad" aria-label={locale==="ja"?"指導テーマ":"Coaching topics"}>
        <a href="#coach-u12"><span>01</span>{locale==="ja"?"U12 / 基礎":"U12 / Fundamentals"}</a>
        <a href="#coach-offense"><span>02</span>{locale==="ja"?"オフェンス / 判断":"Offense / Decisions"}</a>
        <a href="#coach-game"><span>03</span>{locale==="ja"?"試合運営":"Game coaching"}</a>
        <a href="#coach-practice"><span>04</span>{locale==="ja"?"練習設計":"Practice design"}</a>
        <a href="#coach-reflection"><span>05</span>{locale==="ja"?"FB / 振り返り":"Feedback / Reflection"}</a>
        <a href="#coach-player"><span>06</span>{locale==="ja"?"選手育成":"Player development"}</a>
        <a href="#coach-physical"><span>07</span>{locale==="ja"?"S&C / 安全":"S&C / Safety"}</a>
        <strong>{locale==="ja"?`${coachPosts.length}本を公開中`:`${coachPosts.length} coach articles`}</strong>
      </nav>
      {locale==="ja"?<section className="journal-library-metrics section-pad" aria-label="指導者JOURNALの情報量">
        <article><strong>{coachPosts.length}</strong><span>指導者向け記事</span><small>U12・練習設計・試合・S&Cまで</small></article>
        <article><strong>{coachPosts.filter(post=>post.coach_application?.length).length}</strong><span>実践ツール付き</span><small>READ → PLAN → COACH → REVIEW</small></article>
        <article><strong>{coachPosts.reduce((sum,post)=>sum+(post.source_references?.length||0),0)}</strong><span>参考資料リンク・延べ</span><small>原典・公式資料へ直接つなぐ</small></article>
        <article><strong>{coachPosts.filter(post=>post.reviewed_at).length}</strong><span>レビュー日付き</span><small>更新日を記事ごとに確認可能</small></article>
      </section>:null}
      {recentCoachPosts.length?<section className="journal-cms-index journal-coach-latest section-pad">
        <div className="section-head"><div><p className="section-index">{locale==="ja"?"LATEST COACH JOURNAL":"LATEST COACH JOURNAL"}</p><h2>{locale==="ja"?"今の練習を、一度疑ってみる。":"Latest coach articles"}</h2></div><p>{locale==="ja"?"新しい記事はここに並びます。メニューを集めるより、なぜその練習をするのかから考えます。":"New articles appear here automatically."}</p></div>
        <div className="journal-cms-grid">{recentCoachPosts.map((post,index)=><Link href={journalHref(locale,post.slug)} key={post.slug}>
          <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">{categoryLabels[locale][post.category as keyof typeof categoryLabels.en]||post.category}</p>
          <div className="journal-card-meta"><span>{post.reading}</span>{post.source_references?.length?<span>{locale==="ja"?`参考文献 ${post.source_references.length}`:`${post.source_references.length} SOURCES`}</span>:null}</div>
          {post.evidence_level?<small className="journal-evidence-chip">{post.evidence_level}</small>:null}
          <h3>{post.title}</h3><p>{post.standfirst}</p><strong>{post.coach_application?.length?(locale==="ja"?"実践ツール付き":"Includes coach tool"):(locale==="ja"?"記事を読む":"Read")} <ArrowRight size={16}/></strong>
        </Link>)}</div>
      </section>:null}
      <section className="homecourt-product-preview section-pad">
        <div className="section-head"><div><p className="section-index">COACHING LOOP</p><h2>READ → PLAN → COACH → REVIEW</h2></div><p>{locale==="ja"?"読むだけで終わらせず、次の練習で試せるところまで。":"Turn reading into the next practice."}</p></div>
        <div className="homecourt-preview-grid">
          <article><BookOpen/><span>01 / READ</span><h3>{locale==="ja"?"根拠を確認する":"Read the evidence"}</h3><p>{locale==="ja"?"EVIDENCE・LIMITATIONS・SOURCESまで確認する。":"Check evidence, limitations and original sources."}</p></article>
          <article><FileText/><span>02 / PLAN</span><h3>{locale==="ja"?"練習に落とし込む":"Plan"}</h3><p>{locale==="ja"?"COACH APPLICATIONから目的・制約・観察項目を決める。":"Turn the idea into purpose, constraints and observations."}</p></article>
          <article><Users/><span>03 / COACH</span><h3>{locale==="ja"?"選手を観察する":"Coach"}</h3><p>{locale==="ja"?"メニューの消化ではなく、選手が何を見て、どう判断し、どう行動したかを観察する。":"Observe player perception, decisions and actions."}</p></article>
          <article><HistoryIcon/><span>04 / REVIEW</span><h3>{locale==="ja"?"次を修正する":"Review"}</h3><p>{locale==="ja"?"何が起きたかを振り返り、次回の練習設計を一つ改善する。":"Record what happened and refine the next session."}</p></article>
        </div>
      </section>
      <section className="homecourt-role-section section-pad">
        <div className="section-head"><div><p className="section-index">COACHING THEMES</p><h2>{locale==="ja"?"課題から、読む。":"Browse by coaching problem."}</h2></div><p>{locale==="ja"?"練習メニューではなく、現場で起きている問題から必要な記事へ進めます。":"Start from the problem you are trying to solve."}</p></div>
        <div className="homecourt-role-grid">
          <article><span>GAME COACHING</span><h3>{locale==="ja"?"試合で何を学ばせるか":"Game coaching"}</h3><p>{locale==="ja"?"勝利と育成、出場機会、大差時の判断、B戦の設計。":"Winning, playing time, blowouts and game experience."}</p><a href="#coach-game">{locale==="ja"?"試合運営の記事を見る":"View game coaching"} <ArrowRight size={15}/></a></article>
          <article><span>PRACTICE DESIGN</span><h3>{locale==="ja"?"練習をどう設計するか":"Practice design"}</h3><p>{locale==="ja"?"3x3、少人数ゲーム、スクリーン、マンツーマン。制約と判断をどう作るか。":"Small-sided games, screens, man-to-man and constraints."}</p><a href="#coach-practice">{locale==="ja"?"練習設計の記事を見る":"View practice design"} <ArrowRight size={15}/></a></article>
          <article><span>PLAYER DEVELOPMENT</span><h3>{locale==="ja"?"選手とどう関わるか":"Player development"}</h3><p>{locale==="ja"?"ベンチ指示、声かけ、失敗、競争。選手自身が考える環境をつくる。":"Feedback, autonomy, mistakes and player ownership."}</p><a href="#coach-player">{locale==="ja"?"選手との関わりを見る":"View player development"} <ArrowRight size={15}/></a></article>
          <article><span>S&C / SAFETY</span><h3>{locale==="ja"?"身体と安全をどう守るか":"S&C and safety"}</h3><p>{locale==="ja"?"女子選手の身体づくり、ACL予防、コンディショニングの目的。":"Physical preparation, ACL prevention and conditioning."}</p><a href="#coach-physical">{locale==="ja"?"S&Cの記事を見る":"View S&C"} <ArrowRight size={15}/></a></article>
        </div>
      </section>
      {coachGroups.map(group=>{const grouped=group.slugs.map(slug=>coachPosts.find(post=>post.slug===slug)).filter(Boolean) as typeof coachPosts;return <section className="journal-cms-index section-pad" id={group.id} key={group.id}>
        <div className="section-head"><div><p className="section-index">{group.label}</p><h2>{group.label}</h2></div><p>{grouped.length} ARTICLES</p></div>
        {grouped.length?<div className="journal-cms-grid">{grouped.map((post,index)=><Link href={journalHref(locale,post.slug)} key={post.slug}>
          <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">{categoryLabels[locale][post.category as keyof typeof categoryLabels.en]||post.category}</p><div className="journal-card-meta"><span>{post.reading}</span>{post.source_references?.length?<span>{locale==="ja"?`参考文献 ${post.source_references.length}`:`${post.source_references.length} SOURCES`}</span>:null}</div>{post.evidence_level?<small className="journal-evidence-chip">{post.evidence_level}</small>:null}<h3>{post.title}</h3><p>{post.standfirst}</p><strong>{post.coach_application?.length?(locale==="ja"?"実践ツール付き":"Includes coach tool"):(locale==="ja"?"記事を読む":"Read")} <ArrowRight size={16}/></strong>
        </Link>)}</div>:<p>{locale==="ja"?"このテーマの記事を準備しています。":"Articles for this theme are being prepared."}</p>}
      </section>})}
      <section className="journal-exchange-cta section-pad">
        <div><p className="section-index inverse">CONTINUE LEARNING</p><h2>{locale==="ja"?"記事から、継続的な指導者教育へ。":"Continue beyond the article."}</h2><p>{locale==="ja"?"D-HUB、Torsten Loibl Online Clinic、MY HOME COURTをつなぎ、毎週の指導を更新します。":"Connect Journal, D-HUB and coach education."}</p></div>
        <div><Link className="button button-light" href={`${prefix}/d-hub`}>D-HUB <ArrowRight size={16}/></Link><Link className="button button-dark" href={`${prefix}/my-homecourt/coaches`}>COACH HOME <ArrowRight size={16}/></Link></div>
      </section>
    </div>
  </SiteFrame>;
}


export async function PublicFamilyJournalHub({locale}:{locale:Locale}){
  const posts=await getPublicJournalPosts(locale,500);
  const familyPosts=posts.filter(post=>post.audience==="families"||post.category==="families");
  const recentFamilyPosts=familyPosts.slice(0,12);
  const prefix=locale==="en"?"":`/${locale}`;
  const findFamily=(slug:string)=>familyPosts.find(post=>post.slug===slug);
  const familyGroups=[
    {id:"family-start",label:"START HERE",title:"最初に読んでほしい記事",description:"保護者が毎回コーチになるのではなく、環境・経験・本人の声を見るところから。",slugs:["parents-support-not-coach","how-to-choose-youth-team","too-much-practice","child-wants-to-quit-basketball"]},
    {id:"family-role",label:"ROLE / CONFIDENCE",title:"出場時間・役割・自信",description:"出る・出ないだけでなく、何を任され、何を経験できているかまで見ます。",slugs:["child-wants-to-be-relied-on","confidence-needs-evidence","role-and-playing-time-are-different","starter-is-not-status","make-team-but-no-minutes","confidence-after-bad-game"]},
    {id:"family-choice",label:"TEAM / TRANSITION",title:"チーム選び・移籍・進路",description:"強さや名前だけでなく、毎週どんな経験が積めるかを同じ軸で比べます。",slugs:["how-to-choose-youth-team","when-to-change-teams","u15-team-comparison-checklist","new-team-first-three-months","parent-high-school-path-timing","strong-school-myth"]},
    {id:"family-home",label:"AT HOME",title:"家庭での関わり方",description:"送迎の車、試合後、動画を見る時間。家庭までコーチングの場所にしすぎないために。",slugs:["parents-support-not-coach","parent-dont-promise-playing-time","parent-car-ride-not-coaching-session","parent-child-doesnt-talk-after-practice","parent-dont-coach-against-coach","watch-game-video-without-grading-child"]},
    {id:"family-load",label:"LOAD / RECOVERY",title:"練習量・回復・安全",description:"チーム、スクール、移動、睡眠、学校生活まで含めて一週間の負荷を見ます。",slugs:["too-much-practice","sleep-is-part-of-training","parent-schedule-needs-empty-space","commute-time-is-part-of-load","travel-fatigue-is-part-of-tournament","knee-pain-is-not-just-growing-pain"]},
    {id:"family-relationships",label:"RELATIONSHIPS",title:"チームの人間関係・相談",description:"困ったときに我慢か退団の二択へ急がず、事実・相談経路・安全を分けて考えます。",slugs:["asking-coach-is-not-complaining","when-coach-does-not-fit-child","teammate-conflict-needs-adult-support","belonging-is-part-of-development","parent-group-chat-does-not-run-team","leave-team-without-burning-bridges"]},
    {id:"family-pathway",label:"U15 / PATHWAY",title:"U15・進路・セレクション",description:"登録、大会、出場機会、生活。名前の強さだけではなく、その先の数年で考えます。",slugs:["u15-school-or-club-2026","b-youth-vs-u15-club-2026","u15-registration-before-joining","u15-transfer-rules-2026","u15-tryout-rejection-next-step","playing-up-age-category"]},
  ];
  const sourceCount=familyPosts.reduce((sum,post)=>sum+(post.source_references?.length||0),0);
  return <SiteFrame locale={locale} languagePage="journal">
    <div className="journal-hub journal-cms">
      <section className="journal-cms-hero section-pad">
        <Link href={journalRoot(locale)} className="back-link">← RBA JOURNAL</Link>
        <p className="section-index">RBA JOURNAL / PARENT</p>
        <h1>{locale==="ja"?"保護者だからこそ、技術以外に見えるものがある。":"A journal for families in youth basketball."}</h1>
        <p>{locale==="ja"?"チーム選び、出場時間、移籍、練習量、怪我、進路、試合後の声かけ。正解を押しつけるのではなく、何を確認し、何を急いで決めなくていいのかを整理します。":"Practical, evidence-aware guidance for families navigating youth basketball."}</p>
      </section>

      <nav className="journal-topic-nav section-pad" aria-label={locale==="ja"?"保護者向けテーマ":"Family topics"}>
        <a href="#family-role"><span>01</span>{locale==="ja"?"役割・自信":"Role / confidence"}</a>
        <a href="#family-choice"><span>02</span>{locale==="ja"?"チーム選び":"Team choice"}</a>
        <a href="#family-home"><span>03</span>{locale==="ja"?"家庭での関わり":"At home"}</a>
        <a href="#family-load"><span>04</span>{locale==="ja"?"練習量・安全":"Load / safety"}</a>
        <a href="#family-pathway"><span>05</span>{locale==="ja"?"U15・進路":"U15 / pathway"}</a>
        <strong>{locale==="ja"?`${familyPosts.length}本を公開中`:`${familyPosts.length} articles`}</strong>
      </nav>

      {locale==="ja"?<section className="journal-library-metrics section-pad" aria-label="保護者JOURNALの情報量">
        <article><strong>{familyPosts.length}</strong><span>保護者向け記事</span><small>チーム・家庭・進路・安全まで</small></article>
        <article><strong>{sourceCount}</strong><span>参考資料リンク・延べ</span><small>各記事から原典へ直接つなぐ</small></article>
        <article><strong>{new Set(familyPosts.flatMap(post=>post.source_references.map(ref=>ref.url))).size}</strong><span>ユニーク参考資料</span><small>同じ原典の重複利用は1件として集計</small></article>
        <article><strong>{familyPosts.filter(post=>post.reviewed_at).length}</strong><span>レビュー日付き</span><small>いつ確認した内容かを記事ごとに表示</small></article>
      </section>:null}

      <section className="journal-evidence-standard section-pad">
        <div className="section-head"><div><p className="section-index">HOW TO READ</p><h2>{locale==="ja"?"結論を急がないためのJOURNALです。":"Use the journal to slow down the decision."}</h2></div><p>{locale==="ja"?"『辞めるべき』『もっと頑張るべき』を先に決めず、本人の経験、環境、負荷、相談できる余地を分けて見ます。":"Separate the athlete's experience, environment, load and support before deciding."}</p></div>
        <div className="journal-evidence-grid">
          <article><span>01 / FACT</span><h3>{locale==="ja"?"まず事実を見る":"Start with facts"}</h3><p>{locale==="ja"?"出場時間、練習日数、移動、睡眠、本人が実際に言ったこと。解釈の前に確認します。":"Check what is actually happening."}</p></article>
          <article><span>02 / VOICE</span><h3>{locale==="ja"?"本人の言葉を残す":"Keep the athlete's voice"}</h3><p>{locale==="ja"?"大人が全部意味づけせず、本人がどう感じ、何を望んでいるかを聞きます。":"Do not replace the athlete's own perspective."}</p></article>
          <article><span>03 / NEXT</span><h3>{locale==="ja"?"次の一つを決める":"Choose one next step"}</h3><p>{locale==="ja"?"相談する、休む、比較する、もう少し見る。大きな決断の前にできる一つを探します。":"Find the smallest useful next action."}</p></article>
        </div>
        {locale==="ja"?<div className="homecourt-launch-actions"><Link className="button button-light" href="/ja/journal/families/references">参考文献ライブラリを見る <ArrowRight size={17}/></Link></div>:null}
      </section>

      {recentFamilyPosts.length?<section className="journal-cms-index section-pad">
        <div className="section-head"><div><p className="section-index">LATEST PARENT JOURNAL</p><h2>{locale==="ja"?"いま、保護者に読んでほしい記事。":"Latest family articles"}</h2></div><p>{locale==="ja"?"新しい記事はここに追加されます。":"New family articles appear here."}</p></div>
        <div className="journal-cms-grid">{recentFamilyPosts.map((post,index)=><Link href={journalHref(locale,post.slug)} key={post.slug}>
          <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">{categoryLabels[locale][post.category as keyof typeof categoryLabels.en]||post.category}</p>
          <div className="journal-card-meta"><span>{post.reading}</span>{post.source_references?.length?<span>{locale==="ja"?`参考文献 ${post.source_references.length}`:`${post.source_references.length} SOURCES`}</span>:null}</div>
          {post.evidence_level?<small className="journal-evidence-chip">{post.evidence_level}</small>:null}
          <h3>{post.title}</h3><p>{post.standfirst}</p><strong>{locale==="ja"?"記事を読む":"Read"} <ArrowRight size={16}/></strong>
        </Link>)}</div>
      </section>:null}

      {familyGroups.map(group=>{const grouped=group.slugs.map(findFamily).filter(Boolean) as typeof familyPosts;return <section className="journal-cms-index section-pad" id={group.id} key={group.id}>
        <div className="section-head"><div><p className="section-index">{group.label}</p><h2>{group.title}</h2></div><p>{group.description}</p></div>
        {grouped.length?<div className="journal-cms-grid">{grouped.map((post,index)=><Link href={journalHref(locale,post.slug)} key={post.slug}>
          <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">{categoryLabels[locale][post.category as keyof typeof categoryLabels.en]||post.category}</p>
          <div className="journal-card-meta"><span>{post.reading}</span>{post.source_references?.length?<span>{locale==="ja"?`参考文献 ${post.source_references.length}`:`${post.source_references.length} SOURCES`}</span>:null}</div>
          {post.evidence_level?<small className="journal-evidence-chip">{post.evidence_level}</small>:null}
          <h3>{post.title}</h3><p>{post.standfirst}</p><strong>{locale==="ja"?"記事を読む":"Read"} <ArrowRight size={16}/></strong>
        </Link>)}</div>:<p>{locale==="ja"?"このテーマの記事を準備しています。":"Articles are being prepared."}</p>}
      </section>})}

      <section className="journal-exchange-cta section-pad">
        <div><p className="section-index inverse">WHEN YOU NEED THE NEXT STEP</p><h2>{locale==="ja"?"読むだけで整理できない悩みは、相談して構いません。":"When an article is not enough."}</h2><p>{locale==="ja"?"チーム選び、移籍、出場機会、練習量。個別事情が大きいテーマは、JOURNALだけで答えを決めません。":"Some decisions depend heavily on the individual context."}</p></div>
        <div><Link className="button button-light" href={`${prefix}/my-homecourt/families`}>{locale==="ja"?"保護者向けHOME":"Family home"} <ArrowRight size={16}/></Link><Link className="button button-dark" href={`${prefix}/contact`}>{locale==="ja"?"RBAに相談":"Contact RBA"} <ArrowRight size={16}/></Link></div>
      </section>
    </div>
  </SiteFrame>;
}

type FamilyReferenceItem={
  title:string;
  source:string;
  year?:string|number|null;
  url:string;
  note?:string|null;
  usedBy:number;
  articles:{slug:string;title:string}[];
};

function familyReferenceGroup(ref:FamilyReferenceItem){
  const haystack=`${ref.source} ${ref.title}`.toLowerCase();
  if(haystack.includes("japan basketball")||haystack.includes("jba")||haystack.includes("日本バスケットボール協会"))return "JBA / JAPAN RULES";
  if(haystack.includes("fiba")||haystack.includes("world association of basketball coaches")||haystack.includes("wabc"))return "FIBA / COACHING";
  if(haystack.includes("ioc")||haystack.includes("international olympic committee"))return "IOC / CONSENSUS";
  if(haystack.includes("american academy of pediatrics")||haystack.includes("pediatrics")||haystack.includes("cdc")||haystack.includes("medical")||haystack.includes("injur")||haystack.includes("concussion")||haystack.includes("osgood"))return "MEDICAL / SAFETY";
  if(haystack.includes("systematic review")||haystack.includes("meta-analysis")||haystack.includes("meta analysis")||haystack.includes("scoping review")||haystack.includes("rapid review"))return "SYSTEMATIC REVIEWS";
  return "RESEARCH / OTHER";
}

export async function PublicFamilyReferenceLibrary({locale}:{locale:Locale}){
  const posts=await getPublicJournalPosts(locale,500);
  const familyPosts=posts.filter(post=>post.audience==="families"||post.category==="families");
  const sourceMap=new Map<string,FamilyReferenceItem>();
  let totalLinks=0;
  for(const post of familyPosts){
    for(const ref of post.source_references||[]){
      totalLinks+=1;
      const current=sourceMap.get(ref.url);
      if(current){
        current.usedBy+=1;
        if(!current.articles.some(article=>article.slug===post.slug))current.articles.push({slug:post.slug,title:post.title});
      }else{
        sourceMap.set(ref.url,{
          title:ref.title,
          source:ref.source,
          year:ref.year,
          url:ref.url,
          note:ref.note,
          usedBy:1,
          articles:[{slug:post.slug,title:post.title}]
        });
      }
    }
  }
  const references=[...sourceMap.values()].sort((a,b)=>{
    const ay=Number(a.year)||0, by=Number(b.year)||0;
    return by-ay||b.usedBy-a.usedBy||a.title.localeCompare(b.title,"ja");
  });
  const groupOrder=["JBA / JAPAN RULES","FIBA / COACHING","IOC / CONSENSUS","MEDICAL / SAFETY","SYSTEMATIC REVIEWS","RESEARCH / OTHER"];
  const currentSources=references.filter(ref=>(Number(ref.year)||0)>=2024).length;
  const allThreePlus=familyPosts.every(post=>(post.source_references?.length||0)>=3);
  const latestReviewed=familyPosts.map(post=>post.reviewed_at).filter(Boolean).sort().at(-1)||null;
  return <SiteFrame locale={locale} languagePage="journal">
    <div className="journal-hub journal-cms">
      <section className="journal-cms-hero section-pad">
        <Link href="/ja/journal/families" className="back-link">← 保護者JOURNAL</Link>
        <p className="section-index">RBA JOURNAL / SOURCE LIBRARY</p>
        <h1>{locale==="ja"?"参考文献を、見える場所に置く。":"Family Journal source library"}</h1>
        <p>{locale==="ja"?"RBA JOURNALで何を根拠に書いているのかを、記事の奥に隠しません。現行ルールは公式資料、一般化する主張はレビューやコンセンサス、医療・安全は専門機関のガイダンスを優先します。":"A transparent library of sources used across the family journal."}</p>
      </section>

      {locale==="ja"?<section className="journal-library-metrics section-pad" aria-label="参考文献監査状況">
        <article><strong>{familyPosts.length}</strong><span>対象記事</span><small>保護者向けJOURNAL全体</small></article>
        <article><strong>{totalLinks}</strong><span>参考資料リンク・延べ</span><small>記事ごとの引用・参考資料</small></article>
        <article><strong>{references.length}</strong><span>ユニーク参考資料</span><small>重複URLを除いて集計</small></article>
        <article><strong>{currentSources}</strong><span>2024年以降</span><small>新しい資料だけで古い基礎研究を置き換えるわけではありません</small></article>
      </section>:null}

      <section className="journal-evidence-standard section-pad">
        <div className="section-head"><div><p className="section-index">SOURCE STANDARD</p><h2>{locale==="ja"?"資料は、役割を分けて使います。":"How sources are used"}</h2></div><p>{locale==="ja"?`最終監査: ${latestReviewed?new Date(latestReviewed).toLocaleDateString("ja-JP"):"—"} / 全記事3件以上: ${allThreePlus?"確認済み":"要確認"}`:"Evidence is matched to the type of claim."}</p></div>
        <div className="journal-evidence-grid">
          <article><span>01 / CURRENT RULES</span><h3>{locale==="ja"?"制度は公式情報を優先":"Current rules first"}</h3><p>{locale==="ja"?"JBAの登録・移籍・大会要件など、変わり得る制度は公式の現行ページを優先します。":"Use current official sources for changing rules."}</p></article>
          <article><span>02 / SYNTHESIS</span><h3>{locale==="ja"?"一般化はレビューを優先":"Prefer evidence synthesis"}</h3><p>{locale==="ja"?"保護者の関わり、動機づけ、継続、専門化などは、単一研究だけで断定せず系統的レビュー・メタ解析を優先します。":"Prefer systematic reviews and meta-analyses for broad claims."}</p></article>
          <article><span>03 / SAFETY</span><h3>{locale==="ja"?"安全は専門機関へ戻す":"Safety sources"}</h3><p>{locale==="ja"?"脳震盪、復帰、成長期の痛み、負荷管理はAAP・CDC・IOCなどの専門資料を中心に扱います。":"Use medical and safeguarding authorities for safety claims."}</p></article>
          <article><span>04 / LIMITS</span><h3>{locale==="ja"?"研究とRBAの考えを混ぜない":"Keep interpretation separate"}</h3><p>{locale==="ja"?"研究が直接証明していないことはLIMITATIONSへ書き、RBAの現場解釈とは分けます。":"Separate evidence, interpretation and limitations."}</p></article>
        </div>
      </section>

      {groupOrder.map(group=>{
        const grouped=references.filter(ref=>familyReferenceGroup(ref)===group);
        if(!grouped.length)return null;
        return <section className="journal-cms-index section-pad" key={group}>
          <div className="section-head"><div><p className="section-index">{group}</p><h2>{group}</h2></div><p>{grouped.length} SOURCES</p></div>
          <div className="journal-cms-grid">{grouped.map((ref,index)=><a href={ref.url} target="_blank" rel="noreferrer" key={ref.url}>
            <span>{String(index+1).padStart(2,"0")}</span>
            <p className="note-tag">{ref.year||"YEAR N/A"} · {ref.usedBy} ARTICLES</p>
            <h3>{ref.title}</h3>
            <p>{ref.source}</p>
            {ref.note?<p>{ref.note}</p>:null}
            <strong>原典を開く <ArrowUpRight size={16}/></strong>
          </a>)}</div>
        </section>;
      })}

      <section className="journal-evidence-standard section-pad">
        <div className="section-head"><div><p className="section-index">TRACEABILITY</p><h2>{locale==="ja"?"どの記事で使っているかも追えます。":"Trace sources back to articles."}</h2></div><p>{locale==="ja"?"各記事の末尾にも参考資料を残しています。出典だけを並べるのではなく、本文のEVIDENCE・RBA INTERPRETATION・LIMITATIONSと一緒に確認してください。":"Each article keeps its own source list."}</p></div>
        <div className="homecourt-launch-actions"><Link className="button button-light" href="/ja/journal/families">保護者JOURNALへ戻る <ArrowRight size={17}/></Link><Link className="button button-dark" href="/ja/journal">JOURNAL全体を見る <ArrowRight size={17}/></Link></div>
      </section>
    </div>
  </SiteFrame>;
}

export const journalRoot=(locale:Locale)=>locale==="en"?"/journal":`/${locale}/journal`;
export const journalHref=(locale:Locale,slug:string)=>`${journalRoot(locale)}/${slug}`;
