import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { getPublicJournalPost, getPublicJournalPosts } from "@/lib/public-content";
import { Locale, localePath, SiteFrame } from "@/components/site-frame";

const copy={
  en:{kicker:"RBA JOURNAL",title:"Useful ideas. Real programmes.",lead:"Development guides, field notes and international exchange stories from RBA.",latest:"LATEST",all:"ALL STORIES",exchange:"ASIA EXCHANGE DESK",exchangeTitle:"Build the next exchange with us.",exchangeBody:"Academies, teams and coaches can contact RBA about Japan visits, joint clinics, coach education and youth exchange.",ask:"Ask RBA on WhatsApp",read:"Read article",back:"Back to Journal"},
  ja:{kicker:"RBA JOURNAL",title:"育成を、もっと広く。",lead:"選手・保護者・指導者へ。読むだけで終わらず、次の行動までつながる育成情報を届けます。",latest:"最新記事",all:"記事一覧",exchange:"ASIA EXCHANGE DESK",exchangeTitle:"日本とアジアの次の交流を、一緒につくる。",exchangeBody:"海外アカデミー、チーム、指導者の皆さまへ。来日プログラム、合同クリニック、指導者講習、育成年代の交流についてRBAへご相談ください。",ask:"WhatsAppでRBAに相談",read:"記事を読む",back:"JOURNALへ戻る"},
  "zh-tw":{kicker:"RBA JOURNAL",title:"讓培育連結更廣的世界。",lead:"分享球員、家長、教練與亞洲夥伴都能使用的培育觀點、現場筆記與國際交流。",latest:"最新文章",all:"所有文章",exchange:"ASIA EXCHANGE DESK",exchangeTitle:"一起建立日本與亞洲的下一次交流。",exchangeBody:"歡迎學院、球隊與教練洽詢日本交流、聯合訓練營、教練教育與青少年合作。",ask:"WhatsApp聯絡RBA",read:"閱讀文章",back:"返回JOURNAL"},
  ko:{kicker:"RBA JOURNAL",title:"육성을 더 넓은 세계로.",lead:"선수, 보호자, 코치와 아시아 파트너를 위한 육성 관점, 현장 기록, 국제 교류를 공유합니다.",latest:"최신 글",all:"전체 글",exchange:"ASIA EXCHANGE DESK",exchangeTitle:"일본과 아시아의 다음 교류를 함께 만듭니다.",exchangeBody:"아카데미, 팀, 코치는 일본 교류, 공동 클리닉, 코치 교육과 유소년 교류를 RBA에 문의할 수 있습니다.",ask:"WhatsApp으로 RBA 문의",read:"글 읽기",back:"JOURNAL로 돌아가기"}
} as const;

const categoryLabels={
  en:{development:"Development",families:"Families",coaching:"Coaching",international:"International",programme:"Programmes"},
  ja:{development:"育成",families:"保護者",coaching:"指導者",international:"海外交流",programme:"プログラム"},
  "zh-tw":{development:"培育",families:"家長",coaching:"教練",international:"國際交流",programme:"活動"},
  ko:{development:"육성",families:"보호자",coaching:"코칭",international:"국제 교류",programme:"프로그램"}
} as const;

export async function PublicJournalHub({locale}:{locale:Locale}){
  const c=copy[locale], posts=await getPublicJournalPosts(locale);
  const authReady=process.env.RBA_AUTH_EMAIL_READY==="true";
  const featured=posts[0], rest=posts.slice(1);
  const categoryOrder=["development","families","coaching","international","programme"] as const;
  const categoryDescriptions={
    ja:{development:"選手の成長、試合、練習、出場機会、U12・U15の育成を考える記事",families:"チーム選び、練習量、試合後の関わり方など保護者向けの記事",coaching:"練習設計、判断、ゲーム理解、コーチングを深める指導者向けの記事",international:"日本と世界の育成環境、海外交流、遠征から学ぶ記事",programme:"RBAのクリニック、キャンプ、学びを次の行動につなげる記事"},
    en:{development:"Player development, practice and competition",families:"Guidance for families",coaching:"Coach learning and practice design",international:"Japan–Asia exchange and global development",programme:"RBA programmes and next steps"},
    "zh-tw":{development:"球員培育與比賽學習",families:"家長指南",coaching:"教練學習與訓練設計",international:"日本與亞洲交流",programme:"RBA活動與下一步"},
    ko:{development:"선수 육성과 경기 학습",families:"보호자 가이드",coaching:"코치 학습과 훈련 설계",international:"일본·아시아 교류",programme:"RBA 프로그램과 다음 단계"}
  } as const;
  const whatsapp=`https://wa.me/818032483703?text=${encodeURIComponent(({en:"Hello RBA, we are interested in a Japan–Asia basketball exchange.",ja:"RBAの海外交流について相談したいです。","zh-tw":"您好RBA，我們想詢問日本與亞洲的籃球交流。",ko:"RBA의 일본-아시아 농구 교류에 대해 문의하고 싶습니다."})[locale])}`;
  const findPost=(slug:string)=>posts.find(post=>post.slug===slug);
  const startHereSlugs=["winning-vs-developing","development-environment","parents-support-not-coach","who-is-playing"];
  const startHere=startHereSlugs.map(findPost).filter(Boolean) as typeof posts;
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
      {featured?<section className="journal-feature section-pad">
        <div><p className="section-index">{c.latest} / {categoryLabels[locale][featured.category as keyof typeof categoryLabels.en]||featured.category}</p><h2>{featured.title}</h2><p>{featured.standfirst}</p><Link className="button button-dark" href={journalHref(locale,featured.slug)}>{c.read}<ArrowRight size={17}/></Link></div>
        <aside><span>{featured.reading}</span><strong>{featured.audience.toUpperCase()}</strong>{featured.evidence_level?<em className="journal-evidence-chip">{featured.evidence_level}</em>:null}<small>{featured.published_at?new Date(featured.published_at).toLocaleDateString(locale):""}</small></aside>
      </section>:null}
      {locale==="ja"&&startHere.length?<section className="journal-cms-index section-pad">
        <div className="section-head"><div><p className="section-index">初めて読む方へ</p><h2>まず、この4本から。</h2></div><p>RBAが育成年代をどう考えているのか、土台になる記事を選びました。</p></div>
        <div className="journal-cms-grid">{startHere.map((post,index)=><Link href={journalHref(locale,post.slug)} key={post.slug}>
          <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">START HERE</p>{post.evidence_level?<small className="journal-evidence-chip">{post.evidence_level}</small>:null}<h3>{post.title}</h3><p>{post.standfirst}</p><strong>この記事から読む <ArrowRight size={16}/></strong>
        </Link>)}</div>
      </section>:null}
      {locale==="ja"?<section className="homecourt-role-section section-pad">
        <div className="section-head"><div><p className="section-index">悩みから探す</p><h2>いま困っていることから読む。</h2></div><p>テーマ名が分からなくても大丈夫です。保護者・指導者それぞれのよくある悩みから記事へ進めます。</p></div>
        <div className="homecourt-role-grid">
          <article><span>PARENTS</span><h3>保護者の方</h3><p>チーム選び、出場時間、試合後の声かけ、役割固定など。</p>{familyPaths.map(item=>{const post=findPost(item.slug);return post?<Link key={item.slug} href={journalHref(locale,item.slug)}>{item.label} <ArrowRight size={15}/></Link>:null})}</article>
          <article><span>COACHES</span><h3>指導者の方</h3><p>勝利と育成、ベンチワーク、プレス、判断を育てる練習設計など。</p>{coachPaths.map(item=>{const post=findPost(item.slug);return post?<Link key={item.slug} href={journalHref(locale,item.slug)}>{item.label} <ArrowRight size={15}/></Link>:null})}</article>
          <article><span>PLAYERS / ALL</span><h3>選手・すべての方</h3><p>試合、練習、クリニック、海外交流を「次の成長」につなげる記事です。</p><Link href="#category-development">育成の記事を見る <ArrowRight size={15}/></Link><Link href="#category-international">海外交流の記事を見る <ArrowRight size={15}/></Link><Link href="/ja/opportunities">参加できる活動を探す <ArrowRight size={15}/></Link></article>
        </div>
      </section>:null}
      <section className="journal-cms-index section-pad">
        <div className="section-head"><div><p className="section-index">{locale==="ja"?"読みたいテーマから探す":c.all}</p><h2>{locale==="ja"?"目的別に、すぐ読める。":`${posts.length} STORIES`}</h2></div><p>{locale==="ja"?"記事が増えても迷わないように、立場とテーマで整理しています。":"Browse by topic."}</p></div>
        <div className="homecourt-role-grid">
          {categoryOrder.map(category=>{
            const count=posts.filter(post=>post.category===category).length;
            if(!count)return null;
            return <article key={category}><span>{String(count).padStart(2,"0")} ARTICLES</span><h3>{categoryLabels[locale][category]}</h3><p>{categoryDescriptions[locale][category]}</p><a href={`#category-${category}`}>{locale==="ja"?"このテーマの記事を見る":"View articles"} <ArrowRight size={16}/></a></article>
          })}
        </div>
      </section>
      {categoryOrder.map(category=>{
        const grouped=rest.filter(post=>post.category===category);
        if(!grouped.length)return null;
        return <section className="journal-cms-index section-pad" id={`category-${category}`} key={category}>
          <div className="section-head"><div><p className="section-index">{categoryLabels[locale][category]}</p><h2>{locale==="ja"?categoryDescriptions.ja[category]:categoryLabels[locale][category]}</h2></div><p>{grouped.length} STORIES</p></div>
          <div className="journal-cms-grid">{grouped.map((post,index)=><Link href={journalHref(locale,post.slug)} key={post.slug}>
            <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">{categoryLabels[locale][post.category as keyof typeof categoryLabels.en]||post.category}</p>{post.evidence_level?<small className="journal-evidence-chip">{post.evidence_level}</small>:null}<h3>{post.title}</h3><p>{post.standfirst}</p><strong>{c.read}<ArrowRight size={16}/></strong>
          </Link>)}</div>
        </section>
      })}
      {locale==="ja"?<section className="homecourt-role-section section-pad">
        <div className="section-head"><div><p className="section-index">FROM JOURNAL TO ACTION</p><h2>読むだけで終わらせない。</h2></div><p>自分の立場に合う情報を保存し、次の活動や学びにつなげるならMY HOME COURTへ。</p></div>
        <div className="homecourt-role-grid">
          <article><span>PLAYER</span><h3>選手</h3><p>練習、試合、次のクリニック。今の自分に必要な情報をまとめて探せます。</p><Link href="/ja/my-homecourt/players">選手向けHOME <ArrowRight size={16}/></Link></article>
          <article><span>PARENT</span><h3>保護者</h3><p>チーム選び、出場時間、移籍、練習量。迷ったときに戻って来られる場所です。</p><Link href="/ja/my-homecourt/families">保護者向けHOME <ArrowRight size={16}/></Link></article>
          <article><span>COACH</span><h3>指導者</h3><p>D-HUB、Torsten、練習設計。毎週の指導をアップデートする学びをまとめます。</p><Link href="/ja/my-homecourt/coaches">指導者向けHOME <ArrowRight size={16}/></Link></article>
        </div>
        <div className="homecourt-launch-actions">{authReady?<Link className="button button-member" href="/ja/my-homecourt/login">無料でRBA IDをつくる<ArrowRight size={17}/></Link>:<a className="button button-member" href="https://lin.ee/5l1YG8N" target="_blank" rel="noreferrer">登録再開のお知らせを受け取る<ArrowRight size={17}/></a>}<Link className="button button-light" href="/ja/opportunities">募集中の活動を見る<ArrowRight size={17}/></Link></div>
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
  const allPosts=await getPublicJournalPosts(locale,60);
  const related=allPosts
    .filter(candidate=>candidate.slug!==slug && (candidate.category===post.category || candidate.audience===post.audience))
    .slice(0,3);
  return <SiteFrame locale={locale} languagePage="journal"><article className="journal-article journal-cms-article">
    <header className="article-hero section-pad"><Link href={journalRoot(locale)} className="back-link">← {c.back}</Link><p className="section-index">{c.kicker} / {categoryLabels[locale][post.category as keyof typeof categoryLabels.en]||post.category}</p><h1>{post.title}</h1><div><p>{post.standfirst}</p><span>{post.reading} · RBA</span></div></header>
    {post.evidence_summary||post.rba_interpretation||post.limitations?<section className="journal-evidence section-pad">
      <div className="journal-evidence-head"><p className="section-index">EVIDENCE CHECK</p><h2>{locale==="ja"?"根拠と、RBAの解釈を分けて読む。":locale==="zh-tw"?"把證據與RBA的解讀分開閱讀。":locale==="ko"?"근거와 RBA의 해석을 구분해서 읽습니다.":"Separate evidence from RBA interpretation."}</h2>{post.evidence_level?<span>{post.evidence_level}</span>:null}{post.reviewed_at?<small>{locale==="ja"?"最終レビュー":locale==="zh-tw"?"最後審查":locale==="ko"?"최종 검토":"Last reviewed"} · {new Date(post.reviewed_at).toLocaleDateString(locale)}</small>:null}</div>
      <div className="journal-evidence-grid">
        {post.evidence_summary?<article><span>EVIDENCE</span><h3>{locale==="ja"?"研究・ガイドラインから言えること":locale==="zh-tw"?"研究與指南支持的內容":locale==="ko"?"연구·가이드라인이 지지하는 내용":"What the evidence supports"}</h3><p>{post.evidence_summary}</p></article>:null}
        {post.rba_interpretation?<article><span>RBA INTERPRETATION</span><h3>{locale==="ja"?"RBAが現場でどう解釈するか":locale==="zh-tw"?"RBA如何在現場解讀":locale==="ko"?"RBA가 현장에서 어떻게 해석하는가":"How RBA applies it"}</h3><p>{post.rba_interpretation}</p></article>:null}
        {post.limitations?<article><span>LIMITATIONS</span><h3>{locale==="ja"?"ここは断定しない":locale==="zh-tw"?"不應斷言的部分":locale==="ko"?"단정하지 않는 부분":"What this does not prove"}</h3><p>{post.limitations}</p></article>:null}
      </div>
    </section>:null}
    <div className="article-body section-pad"><aside><p>{post.aside_title||c.kicker}</p><span>{post.aside_text||post.standfirst}</span></aside><div>{post.sections.map((section,index)=><section key={section.heading}><span>{String(index+1).padStart(2,"0")}</span><h2>{section.heading}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}{section.bullets?.length?<ul>{section.bullets.map(b=><li key={b}>{b}</li>)}</ul>:null}</section>)}</div></div>
    {post.source_references?.length?<section className="journal-sources section-pad">
      <div className="section-head"><div><p className="section-index">SOURCES / FURTHER READING</p><h2>{locale==="ja"?"参考資料・一次情報":locale==="zh-tw"?"參考資料・原始來源":locale==="ko"?"참고 자료·1차 출처":"References and primary sources"}</h2></div><p>{locale==="ja"?"外部資料は、主張の根拠を確認できるよう原典へリンクしています。":locale==="zh-tw"?"外部資料直接連結原始來源，方便確認論據。":locale==="ko"?"외부 자료는 근거를 확인할 수 있도록 원문에 연결합니다.":"External references link to the original source where possible."}</p></div>
      <div className="journal-source-list">{post.source_references.map((ref,index)=><a key={ref.url+index} href={ref.url} target="_blank" rel="noreferrer"><span>{String(index+1).padStart(2,"0")}</span><div><strong>{ref.title}</strong><small>{ref.source}{ref.year?" · "+ref.year:""}</small>{ref.note?<p>{ref.note}</p>:null}</div><ArrowUpRight size={17}/></a>)}</div>
    </section>:null}

    {locale==="ja"?<section className="article-learning-bridge section-pad">
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
    </section>:null}
    {related.length?<section className="journal-cms-index section-pad">
      <div className="section-head"><div><p className="section-index">{locale==="ja"?"関連記事":"RELATED"}</p><h2>{locale==="ja"?"次に読むなら、この3本。":"Keep reading"}</h2></div><p>{locale==="ja"?"現在公開されている記事だけを表示しています。":"Published articles only."}</p></div>
      <div className="journal-cms-grid">{related.map((item,index)=><Link href={journalHref(locale,item.slug)} key={item.slug}>
        <span>{String(index+1).padStart(2,"0")}</span><p className="note-tag">{categoryLabels[locale][item.category as keyof typeof categoryLabels.en]||item.category}</p><h3>{item.title}</h3><p>{item.standfirst}</p><strong>{c.read}<ArrowRight size={16}/></strong>
      </Link>)}</div>
    </section>:null}
    <footer className="article-convert section-pad"><p className="section-index inverse">RBA / NEXT STEP</p><h2>{post.cta_title||c.exchangeTitle}</h2><p>{post.cta_body||c.exchangeBody}</p>{locale==="ja"?<div className="homecourt-plan-grid" style={{marginTop:"1.5rem"}}><article className="homecourt-plan-card"><span>FREE / RBA ID</span><h3>まず、選択肢を増やす。</h3><p>新しい記事、活動、クリニック、全国・海外の育成機会を追える入口です。</p><a className="button button-light" href="/ja/my-homecourt">無料の入口を見る<ArrowRight size={17}/></a></article><article className="homecourt-plan-card homecourt-plan-paid"><span>HOMECOURT / ¥3,300</span><h3>学びを、日常に残す。</h3><p>読むだけで終わらせず、試す・振り返る・次を決めるところまで続けたい方へ。</p><a className="button button-member" href="/api/commerce/checkout/homecourt-monthly?locale=ja">HOMECOURTを始める<ArrowRight size={17}/></a></article></div>:null}<div><Link className="button button-light" href={journalRoot(locale)}>{c.back}<ArrowRight size={17}/></Link>{locale==="ja"?<Link className="button button-dark" href={post.category==="coaching"?"/ja/my-homecourt/coaches":post.category==="families"?"/ja/my-homecourt/families":post.category==="international"?"/ja/international":"/ja/my-homecourt/players"}>自分向けのHOMEを見る <ArrowRight size={17}/></Link>:<Link className="button button-dark" href={localePath(locale,"international")}>International <ArrowRight size={17}/></Link>}</div>{locale==="ja"?<p style={{marginTop:"1rem"}}>無料で知る・探すところから始めても構いません。継続的に学びを残したい方は月額HOMECOURTへ進めます。</p>:null}</footer>
  </article></SiteFrame>;
}

export const journalRoot=(locale:Locale)=>locale==="en"?"/journal":`/${locale}/journal`;
export const journalHref=(locale:Locale,slug:string)=>`${journalRoot(locale)}/${slug}`;
