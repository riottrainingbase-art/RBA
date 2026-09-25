import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, Compass, CreditCard, FileText, HeartHandshake, History, House, LifeBuoy, LockKeyhole, MessageCircle, Sparkles, Users } from "lucide-react";
import { COACH_COMMUNITY_URL, HomecourtRole, PARENT_COMMUNITY_URL, homecourtRoles } from "./homecourt-data";
import { Locale, localePath, SiteFrame } from "./site-frame";
import { programmes } from "./programme-data";
import { getPublicJournalPosts } from "@/lib/public-content";
import { HomecourtConversionSection } from "./homecourt-conversion-section";

const copy={
  en:{title:"Your next court starts here.",lead:"From everyday practice to courts you have not seen yet. Find clinics, learning, community and exchange built for players, parents and coaches.",free:"Discover what comes next",freeBody:"Find clinics, development ideas and opportunities that fit where you are now.",paid:"Expand your court",paidBody:"Meet new teammates, visit new places and experience different ways to play and learn.",community:"Community",communityBody:"Useful conversations for families and coaches, connected to real programmes—not an endless social feed.",impact:"RBA IMPACT",impactBody:"See how programme income and partner support are reinvested into access, education and safer development environments.",choose:"Choose your route",tools:"Member essentials",register:"Start with RBA ID",upgrade:"Explore MY HOME COURT",impactCta:"See impact & reinvestment"},
  ja:{title:"これまでの参加を、これからの成長へ。",lead:"RBAのクリニックやキャンプで得た経験を、その日だけで終わらせない。参加履歴、振り返り、写真・動画、目標、次の活動を一つにつなぎ、自分の成長を振り返れる場所です。",free:"次の活動を見つける",freeBody:"年代・地域・目的に合う、現在募集中の活動を探せます。",paid:"経験を次の成長につなぐ",paidBody:"参加履歴や振り返りを残し、今の自分に合う学びや次の挑戦へ進めます。",community:"仲間と学ぶ",communityBody:"保護者と指導者が、現場での気づきや育成に関する問いを共有できます。",impact:"RBA IMPACT",impactBody:"参加費、会費、協賛金を、参加機会・指導者教育・安全な育成環境へどのように還元しているかをお伝えします。",choose:"立場に合う入口を選ぶ",tools:"よく使うメニュー",register:"MY HOME COURTを開く",upgrade:"MY HOME COURTについて",impactCta:"活動実績と再投資方針を見る"},
  "zh-tw":{title:"下一座球場，從這裡開始。",lead:"從平常的練習走向還沒見過的球場。球員、家長與教練都能找到適合自己的活動、學習與交流機會。",free:"發現下一個目標",freeBody:"探索適合現在自己的訓練營、培育內容與新機會。",paid:"拓展你的球場",paidBody:"認識新的夥伴、前往不同城市，接觸新的打法與學習方式。",community:"社群",communityBody:"以實際活動與培育問題為中心，連結家長與教練。",impact:"RBA IMPACT",impactBody:"公開活動收入與合作支持如何再投入參與機會、教育與安全環境。",choose:"選擇入口",tools:"會員選單",register:"使用RBA ID開始",upgrade:"了解MY HOME COURT",impactCta:"查看成果與再投資"},
  ko:{title:"다음 코트는 여기서 시작됩니다.",lead:"평소의 훈련에서 아직 만나지 못한 코트까지. 선수, 보호자와 코치가 자신에게 맞는 활동, 배움과 교류를 찾을 수 있습니다.",free:"다음 목표 발견하기",freeBody:"현재의 나에게 맞는 클리닉, 성장 콘텐츠와 새로운 기회를 찾아보세요.",paid:"코트를 넓히기",paidBody:"새로운 동료를 만나고 다른 도시와 플레이 스타일을 경험해 보세요.",community:"커뮤니티",communityBody:"실제 프로그램과 성장 과제를 중심으로 가족과 코치를 연결합니다.",impact:"RBA IMPACT",impactBody:"프로그램 수입과 파트너 지원이 참가 기회, 교육과 안전한 환경에 어떻게 재투자되는지 공개합니다.",choose:"역할 선택",tools:"회원 메뉴",register:"RBA ID로 시작",upgrade:"MY HOME COURT 알아보기",impactCta:"성과와 재투자 보기"},
} as const;

const clarityCopy={
  en:{
    kicker:"START HERE",title:"Know what MY HOME COURT does in 30 seconds.",
    lead:"One place to discover opportunities, learn, keep your basketball journey, and decide what to do next.",
    cards:[
      ["DISCOVER","Find your next opportunity","Clinics, camps and international experiences beyond your current team."],
      ["LEARN","Understand development better","Practical articles for players, families and coaches."],
      ["KEEP","Keep your journey","Save participation history, reflections and the next thing to work on."],
      ["MOVE","Turn learning into action","Go from reading to practice, programmes and the next challenge."]
    ],
    freeTitle:"Start free with RBA ID",freeBody:"Discover programmes, read open Journal articles and find the route that fits you.",
    paidTitle:"Continue with HOMECOURT",paidBody:"JPY 3,300/month. Learn, try, reflect and decide the next step as an ongoing growth cycle.",
    paidCta:"Start HOMECOURT",freeCta:"Start free",
    whoTitle:"Choose the route that fits you.",who:[
      ["PLAYER","I want more opportunities and a wider basketball world."],
      ["PARENT","I want better information for decisions about my child."],
      ["COACH","I want to keep improving my coaching every week."]
    ],
    faqTitle:"Before you join",faq:[
      ["Do I need to leave my current team?","No. MY HOME COURT is designed to add learning and opportunities outside your team, not replace it."],
      ["Can I use it for free?","Yes. Start with RBA ID. The monthly plan is optional."],
      ["Do I need previous RBA experience?","No. New users and past participants can both start here."]
    ]
  },
  ja:{
    kicker:"まずここから",title:"MY HOME COURTでできること。",
    lead:"次の活動を探す、育成について学ぶ、経験を記録する、次に取り組むことを決める。バラバラになりがちな情報と経験を、一つにつなげられます。",
    cards:[
      ["探す","次の機会を見つける","今の所属や地域だけに限らず、全国のクリニック・キャンプ・海外交流まで探せます。"],
      ["学ぶ","育成について理解を深める","選手・保護者・指導者それぞれに役立つ記事や実践のヒントを読めます。"],
      ["残す","経験を記録する","参加履歴や振り返り、次に試したいことを自分の記録として残せます。"],
      ["動く","学びを次の行動につなげる","読んで終わらせず、次の練習や活動、挑戦につなげます。"]
    ],
    freeTitle:"まずはRBA IDから",freeBody:"活動を探す、JOURNALを読む、自分に合う入口を見つける。RBA IDから始められます。",
    paidTitle:"学びと振り返りを、日常の習慣にする",paidBody:"一度のクリニックで終わらせず、学ぶ・試す・振り返る・次を決めるところまで続けられます。今のチームに所属したまま、外の学びや挑戦も選択肢にできます。",
    paidCta:"HOMECOURTを始める",freeCta:"RBA IDから始める",
    whoTitle:"あなたに合う入口を選ぶ。",who:[
      ["PLAYER / 選手","今のチームに所属したまま、もっと多くの機会や外のバスケットボールにも触れたい。"],
      ["PARENT / 保護者","子どもの育成環境や次の選択について、チーム以外からも判断材料を得たい。"],
      ["COACH / 指導者","経験だけに頼らず、毎週の指導や練習設計を学び続けたい。"]
    ],
    faqTitle:"登録前によくある質問",faq:[
      ["今のチームを辞める必要はありますか？","ありません。今いる環境を大切にしながら、所属の外にも学びと機会を持つための場所です。"],
      ["無料でも使えますか？","はい。RBA IDから無料で始められます。月額HOMECOURTは必要な方だけが選べます。"],
      ["RBAに参加したことがなくても使えますか？","使えます。初めての方も、過去参加者も同じ入口から始められます。"]
    ]
  },
  "zh-tw":{
    kicker:"從這裡開始",title:"30秒了解 MY HOME COURT。",
    lead:"找活動、學習培育、留下經驗、決定下一步。把這些全部連成一個屬於自己的籃球成長空間。",
    cards:[
      ["探索","找到下一個機會","不只侷限於目前球隊，也能看見日本各地訓練營、營隊與國際交流。"],
      ["學習","更理解球員培育","為球員、家長與教練整理可實際運用的文章與指南。"],
      ["紀錄","累積自己的經驗","保留參與紀錄、反思與下一個想嘗試的課題。"],
      ["行動","把學習變成下一步","不只閱讀，而是連到訓練、活動參與與下一個挑戰。"]
    ],
    freeTitle:"先從免費 RBA ID 開始",freeBody:"搜尋活動、閱讀公開 JOURNAL、找到適合自己的入口，免費即可開始。",
    paidTitle:"想持續成長，可加入 HOMECOURT",paidBody:"每月3,300日圓。把學習→實踐→反思→下一步，變成持續的成長循環。",
    paidCta:"開始 HOMECOURT",freeCta:"免費開始",
    whoTitle:"選擇最適合你的入口。",who:[
      ["PLAYER / 球員","想看見更多機會與球隊之外的籃球世界。"],
      ["PARENT / 家長","想增加判斷孩子環境與下一步的資訊。"],
      ["COACH / 教練","想持續更新每週的教學與訓練設計。"]
    ],
    faqTitle:"加入前常見問題",faq:[
      ["需要離開現在的球隊嗎？","不需要。MY HOME COURT 是在現有環境之外增加學習與機會，不是取代球隊。"],
      ["可以免費使用嗎？","可以。先從免費 RBA ID 開始；月費 HOMECOURT 是選擇性的。"],
      ["沒有參加過 RBA 也可以嗎？","可以。第一次接觸 RBA 的人與過去參加者都能使用。"]
    ]
  },
  ko:{
    kicker:"여기서 시작",title:"30초 만에 이해하는 MY HOME COURT.",
    lead:"다음 활동을 찾고, 육성을 배우고, 경험을 남기고, 다음 행동을 정하는 과정을 하나의 성장 공간으로 연결합니다.",
    cards:[
      ["찾기","다음 기회를 찾기","현재 팀에만 한정하지 않고 일본 전국 클리닉, 캠프와 국제 교류까지 볼 수 있습니다."],
      ["배우기","육성을 더 잘 이해하기","선수·보호자·코치를 위한 실전형 글과 가이드를 제공합니다."],
      ["남기기","경험을 쌓기","참가 이력, 돌아보기, 다음에 시도할 것을 자신의 기록으로 남깁니다."],
      ["행동하기","배움을 다음 단계로","읽고 끝내지 않고 훈련, 프로그램 참가와 다음 도전으로 이어갑니다."]
    ],
    freeTitle:"무료 RBA ID부터 시작",freeBody:"프로그램을 찾고 공개 JOURNAL을 읽으며 자신에게 맞는 경로를 무료로 시작할 수 있습니다.",
    paidTitle:"계속 성장하려면 HOMECOURT",paidBody:"월 3,300엔. 배우기→시도하기→돌아보기→다음 단계 결정의 성장 사이클을 이어갑니다.",
    paidCta:"HOMECOURT 시작",freeCta:"무료로 시작",
    whoTitle:"나에게 맞는 입구를 선택하세요.",who:[
      ["PLAYER / 선수","더 많은 기회와 팀 밖의 농구 세계를 보고 싶다."],
      ["PARENT / 보호자","아이의 환경과 선택을 위한 판단 자료를 늘리고 싶다."],
      ["COACH / 코치","매주 지도와 훈련 설계를 계속 업데이트하고 싶다."]
    ],
    faqTitle:"가입 전 자주 묻는 질문",faq:[
      ["현재 팀을 그만둬야 하나요?","아니요. 현재 환경을 존중하면서 팀 밖의 배움과 기회를 더하는 공간입니다."],
      ["무료로도 사용할 수 있나요?","네. 무료 RBA ID로 시작할 수 있으며 월간 HOMECOURT는 선택 사항입니다."],
      ["RBA 참가 경험이 없어도 되나요?","네. 처음 이용하는 분과 과거 참가자 모두 시작할 수 있습니다."]
    ]
  }
} as const;

export async function MyHomecourt({locale,role}:{locale:Locale;role?:HomecourtRole}) {
  const prefix=locale==="en"?"":`/${locale}`;
  const c=copy[locale];
  const authReady=process.env.RBA_AUTH_EMAIL_READY==="true";
  const registrationUrl=authReady
    ? (locale==="en"?"/my-homecourt/login":`/${locale}/my-homecourt/login${locale==="ja"?"?source=my-homecourt":""}`)
    : "https://lin.ee/5l1YG8N";
  const ja=locale==="ja";
  const today=new Date().toISOString().slice(0,10);
  const nextProgrammes=programmes.filter(p=>!p.registrationClosed&&p.startDate>=today).slice(0,3);
  const selected=role?homecourtRoles[role]:null;
  const roleCommunity=role==="coaches"?COACH_COMMUNITY_URL:PARENT_COMMUNITY_URL;
  const journalPosts=ja?await getPublicJournalPosts("ja",60):[];
  const preferredCategories=role==="families"?["families","development"]:role==="coaches"?["coaching","development"]:["development","international"];
  const recommendedJournal=journalPosts
    .filter(post=>preferredCategories.includes(post.category))
    .slice(0,3);
  const latestJournal=journalPosts.slice(0,3);
  const clear=clarityCopy[locale];
  return <SiteFrame locale={locale} languagePage="my-homecourt">
    <section className="my-homecourt-hero section-pad"><div className="my-homecourt-hero-copy"><a className="back-link" href={localePath(locale,"home-court")}>{ja?"← MY HOME COURTについて":"← MY HOME COURT"}</a><p className="section-index inverse">RBA / OPEN DEVELOPMENT PLATFORM</p><h1>{selected?(ja?selected.label:selected.shortLabel):c.title}</h1><p>{selected?(ja?selected.description:"Your dedicated route to RBA programmes and resources."):c.lead}</p><div className="my-homecourt-hero-actions"><a className="button button-member" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}><Sparkles size={17}/>{ja&&!authReady?"登録再開のお知らせを受け取る":c.register}<ArrowRight size={16}/></a><a className="button button-light" href={localePath(locale,"home-court")}>{c.upgrade}<ArrowRight size={16}/></a></div>{ja&&!authReady?<p className="registration-note">RBA IDの登録・ログインメールは現在調整中です。再開までは、公式LINEで新しい活動・記事・登録再開のお知らせを受け取れます。</p>:null}</div><div className="my-homecourt-hero-mark" aria-hidden="true"><span>RBA</span><strong>MY<br/>HOME<br/>COURT</strong><small>PLAYER / PARENT / COACH</small></div></section>
    {!role?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">{clear.kicker}</p><h2>{clear.title}</h2></div><p>{clear.lead}</p></div>
      <div className="homecourt-preview-grid">{clear.cards.map(([label,title,body],index)=><article key={label}><Compass/><span>{String(index+1).padStart(2,"0")} / {label}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className="homecourt-plan-grid">
        <article className="homecourt-plan-card homecourt-plan-free"><div className="homecourt-plan-card-head"><span>FREE / RBA ID</span><strong>¥0</strong></div><h3>{clear.freeTitle}</h3><p>{clear.freeBody}</p><a className="button button-light" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}>{clear.freeCta}<ArrowRight size={16}/></a></article>
        <article className="homecourt-plan-card homecourt-plan-paid"><div className="homecourt-plan-card-head"><span>HOMECOURT / MONTHLY</span><strong>¥3,300</strong></div><h3>{clear.paidTitle}</h3><p>{clear.paidBody}</p><a className="button button-member" href={`/api/commerce/checkout/homecourt-monthly?locale=${locale}`}>{clear.paidCta}<ArrowRight size={16}/></a></article>
      </div>
      <div className="section-head"><div><p className="section-index">PLAYER / PARENT / COACH</p><h2>{clear.whoTitle}</h2></div></div>
      <div className="homecourt-preview-grid">{clear.who.map(([label,body],index)=><article key={label}><Users/><span>{String(index+1).padStart(2,"0")}</span><h3>{label}</h3><p>{body}</p><a className="text-link" href={`${prefix}/my-homecourt/${index===0?"players":index===1?"families":"coaches"}`}>{label} <ArrowRight size={16}/></a></article>)}</div>
      <div className="section-head"><div><p className="section-index">FAQ</p><h2>{clear.faqTitle}</h2></div></div>
      <div className="homecourt-plan-grid">{clear.faq.map(([q,a])=><article className="homecourt-plan-card" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div>
    </section>:null}
    {!role&&ja?<section className="section-pad"><a className="button button-light" href="/ja/my-homecourt/participants">クリニックに参加した方へ：記録を始める<ArrowRight size={16}/></a></section>:null}
    {!role&&ja?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">START IN 60 SECONDS</p><h2>登録後は、まずこの3つから。</h2></div><p>最初から細かく設定する必要はありません。まずは「見る・保存する・記録する」の3つから始められます。</p></div>
      <div className="homecourt-preview-grid">
        <article><Compass/><span>01</span><h3>次の活動を見る</h3><p>年代・地域・目的から、今参加できる機会を探す。</p><a className="text-link" href="/ja/opportunities">活動を探す <ArrowRight size={16}/></a></article>
        <article><BookOpen/><span>02</span><h3>自分に合う記事を読む</h3><p>PLAYER／PARENT／COACHそれぞれの立場から、今必要な育成情報を探せます。</p><a className="text-link" href="/ja/journal">JOURNALを見る <ArrowRight size={16}/></a></article>
        <article><History/><span>03</span><h3>経験を記録する</h3><p>過去に参加したRBAのクリニックやキャンプも、Basketball Passportに記録できます。</p><a className="text-link" href="/ja/my-homecourt/participants">参加記録を始める <ArrowRight size={16}/></a></article>
        <article><Sparkles/><span>FREE</span><h3>RBA IDから始める</h3><p>活動を探す、保存する、経験を記録する。RBA IDを入口にMY HOME COURTを使えます。</p><a className="text-link" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}>{authReady?"無料で始める":"登録再開通知を受け取る"} <ArrowRight size={16}/></a></article>
      </div>
    </section>:null}
    {!role&&ja?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">MY JOURNEY</p><h2>知る。参加する。残す。学ぶ。そして次へ。</h2></div><p>MY HOME COURTでは、イベントを探して終わりではなく、参加前から参加後までを一つの流れとしてつなげます。</p></div>
      <div className="homecourt-preview-grid">
        <article><Compass/><span>01 / DISCOVER</span><h3>知る・探す</h3><p>年代、地域、目的から、自分に合うクリニックやキャンプ、交流の機会を探します。</p></article>
        <article><CalendarDays/><span>02 / JOIN</span><h3>参加する</h3><p>対象、日程、費用、参加条件を確認し、公式の申込ページから参加します。</p></article>
        <article><History/><span>03 / RECORD</span><h3>経験を残す</h3><p>参加した活動、学んだこと、次に試したいことをBasketball Passportに記録します。</p></article>
        <article><BookOpen/><span>04 / LEARN</span><h3>学びを深める</h3><p>JOURNALやD-HUB、講習から、今の自分に必要なテーマを学びます。</p></article>
        <article><Sparkles/><span>05 / APPLY</span><h3>日常で試す</h3><p>学んだことを普段の練習や試合、家庭での関わりの中で一つ試します。</p></article>
        <article><ArrowRight/><span>06 / NEXT</span><h3>次の挑戦へ</h3><p>振り返りをもとに、次の活動、Development Camp、RBA UNITED、海外交流へ進みます。</p></article>
      </div>
      <div className="homecourt-private-note"><HeartHandshake size={24}/><div><strong>一本道ではありません。</strong><p>選手、保護者、指導者、それぞれの立場やタイミングに合わせて、必要なところから何度でも行き来できます。</p></div></div>
    </section>:null}
    {!role?<section className="homecourt-product-preview section-pad"><div className="section-head"><div><p className="section-index">YOUR BASKETBALL PASSPORT</p><h2>{ja?"あの日の経験から、次の自分へ。":"One home for your basketball journey."}</h2></div><p>{ja?"過去に参加したクリニックやキャンプも、自分で記録できます。保護者の方は、お子さまごとに記録を分けて管理できます。":"RBA ID connects discovery, applications, participation and reflection."}</p></div><div className="homecourt-preview-grid"><article><CalendarDays/><span>01</span><h3>{ja?"過去の参加":"Applications"}</h3><p>{ja?"参加日・会場・学びを記録。日付が曖昧なら月単位でも。":"See programmes and next actions."}</p></article><article><History/><span>02</span><h3>{ja?"写真・動画で成長を振り返る":"History"}</h3><p>{ja?"前の自分と見比べて、できたことを見つける。気づきを次の練習へ。":"Keep your participation journey."}</p></article><article><BookOpen/><span>03</span><h3>{ja?"これからの目標":"Learning"}</h3><p>{ja?"今週やること、3か月後の目標、その先の目標まで残せます。":"Open role-based learning."}</p></article><article><Compass/><span>04</span><h3>{ja?"次のおすすめ":"Next"}</h3><p>{ja?"年代・地域・目的に合う機会へ。":"Find what fits you next."}</p></article></div><div className="homecourt-private-note"><LockKeyhole size={24}/><div><strong>{ja?"写真・動画と成長記録は非公開です。":"Your records stay private."}</strong><p>{ja?"本人・保護者を中心とした権限で管理し、他の会員や公開プロフィールには表示しません。":"Photos, film and development records are available only to authorised account holders."}</p></div></div></section>:null}
    {!role?<section className="homecourt-plan-separation section-pad">
      <div className="homecourt-plan-intro"><p className="section-index">WORLD CONNECTION STATUS</p><h2>{({ja:"海外とのつながりも、現在の状況を分かりやすく。",en:"Global connections should show their real status.","zh-tw":"與世界的連結，也要清楚顯示確認狀態。",ko:"세계와의 연결은 확인 상태까지 보여줍니다."})[locale]}</h2><p>{({ja:"国や地域の名前が載っているだけでは、実際に参加できるのか判断できません。MY HOME COURTでは、参加条件まで確認できたもの、協議中のもの、今後の構想を分けて表示します。",en:"A country name alone does not mean an opportunity is available. MY HOME COURT separates confirmed, discussion-stage and future concepts.","zh-tw":"只有國家名稱，無法知道是否真的能參加。MY HOME COURT會區分已確認、協議中與未來構想。",ko:"국가 이름만으로는 실제 참가 가능 여부를 알 수 없습니다. MY HOME COURT는 확정·협의 중·미래 구상을 구분합니다."})[locale]}</p></div>
      <div className="homecourt-plan-grid">
        <article className="homecourt-plan-card"><span>CONFIRMED</span><h3>{({ja:"参加条件まで確認済み",en:"Verified and available","zh-tw":"已確認參加條件",ko:"참가 조건 확인 완료"})[locale]}</h3><p>{({ja:"日程・対象・費用・募集状況など、参加判断に必要な情報を確認できている状態。",en:"Dates, eligibility, cost and availability are verified enough to support a real decision.","zh-tw":"日期、對象、費用與招募狀態等已確認，可作為實際判斷依據。",ko:"일정·대상·비용·모집 상태 등 참가 판단에 필요한 정보가 확인된 상태입니다."})[locale]}</p></article>
        <article className="homecourt-plan-card"><span>DISCUSSION</span><h3>{({ja:"連携を協議中",en:"Relationship in discussion","zh-tw":"合作協議中",ko:"협력 논의 중"})[locale]}</h3><p>{({ja:"相手先とのやり取りはあるが、参加可能とはまだ言えない状態。募集企画とは分けて表示します。",en:"There is an active relationship or discussion, but no participant availability is implied.","zh-tw":"已有交流或協議，但不代表目前可以參加，會與正式募集分開顯示。",ko:"관계나 논의는 진행 중이지만 참가 가능을 의미하지 않으며 모집 프로그램과 분리해 표시합니다."})[locale]}</p></article>
        <article className="homecourt-plan-card"><span>FUTURE</span><h3>{({ja:"今後検討している連携",en:"Future direction","zh-tw":"未來想建立的連結",ko:"앞으로 만들 연결"})[locale]}</h3><p>{({ja:"まだ具体的な募集や連携が確定していない段階です。現在参加できる企画とは分けて表示します。",en:"A future idea with no verified programme or partnership yet. Vision is kept separate from current reality.","zh-tw":"尚無正式募集或合作的構想階段，不把願景與現況混在一起。",ko:"아직 구체적인 모집이나 협력이 없는 구상 단계이며 비전과 현재 상황을 구분합니다."})[locale]}</p></article>
      </div>
    </section>:null}

    {!role?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">LOCAL → JAPAN → ASIA → WORLD</p><h2>{({ja:"今いる場所を大切にしながら、世界まで視野を広げる。",en:"Start where you are. See Japan, Asia and the world.","zh-tw":"珍惜現在的位置，同時把視野擴展到日本、亞洲與世界。",ko:"지금 있는 곳을 소중히 하면서 일본·아시아·세계로 시야를 넓힙니다."})[locale]}</h2></div><p>{({ja:"MY HOME COURTは、所属チームを否定するための場所ではありません。自分のホームを持ちながら、日本全国と世界の育成機会を知るための入口です。",en:"MY HOME COURT does not replace your team. It helps you keep your home base while discovering development opportunities across Japan and beyond.","zh-tw":"MY HOME COURT不是取代所屬球隊，而是在保有自己主場的同時，看見日本各地與世界的培育機會。",ko:"MY HOME COURT는 소속팀을 대체하지 않습니다. 자신의 홈을 유지하면서 일본 전국과 세계의 성장 기회를 볼 수 있게 합니다."})[locale]}</p></div>
      <div className="homecourt-preview-grid">
        <article><House/><span>LOCAL</span><h3>{({ja:"自分の所属・地域",en:"Your home team and region","zh-tw":"自己的球隊與地區",ko:"내 소속팀과 지역"})[locale]}</h3><p>{({ja:"まず、自分が今いる場所を知る。所属チームの地域はログイン後の日本地図に表示できます。",en:"Know where you are now. Your registered team region can appear on your private Japan map after login.","zh-tw":"先知道自己現在的位置。登入後可在私人日本地圖上顯示所屬球隊地區。",ko:"먼저 지금 있는 곳을 확인합니다. 로그인 후 소속팀 지역을 개인 일본 지도에 표시할 수 있습니다."})[locale]}</p></article>
        <article><Compass/><span>JAPAN</span><h3>{({ja:"日本全国の育成機会",en:"Opportunities across Japan","zh-tw":"日本全國的培育機會",ko:"일본 전국의 성장 기회"})[locale]}</h3><p>{({ja:"Development Camp、クリニック、RBA UNITEDなど、目的の違う機会を全国から探せます。",en:"Find Development Camps, clinics and RBA UNITED opportunities across Japan by purpose.","zh-tw":"依目的尋找日本各地的 Development Camp、訓練營與 RBA UNITED。",ko:"Development Camp, 클리닉, RBA UNITED 등 목적에 맞는 기회를 일본 전국에서 찾습니다."})[locale]}</p><a className="text-link" href={localePath(locale,"opportunities")}>{({ja:"日本の機会を探す",en:"Explore Japan","zh-tw":"探索日本機會",ko:"일본 기회 찾기"})[locale]} <ArrowRight size={16}/></a></article>
        <article><Users/><span>ASIA</span><h3>{({ja:"アジアとつながる",en:"Connect across Asia","zh-tw":"連結亞洲",ko:"아시아와 연결"})[locale]}</h3><p>{({ja:"日本だけを基準にせず、台湾・韓国・東南アジアなど異なる育成文化と出会う。",en:"Meet different development cultures across Taiwan, Korea and Southeast Asia.","zh-tw":"接觸台灣、韓國與東南亞等不同的培育文化。",ko:"대만·한국·동남아 등 다양한 성장 문화를 만납니다."})[locale]}</p><a className="text-link" href={localePath(locale,"international")}>{({ja:"海外交流を見る",en:"Explore international exchange","zh-tw":"查看國際交流",ko:"국제 교류 보기"})[locale]} <ArrowRight size={16}/></a></article>
        <article><Sparkles/><span>WORLD</span><h3>{({ja:"世界を日常の選択肢に",en:"Make the world feel reachable","zh-tw":"讓世界不再遙遠",ko:"세계를 특별한 곳으로만 두지 않기"})[locale]}</h3><p>{({ja:"海外を一度きりの遠征で終わらせず、普段から異なる育成環境を知り、学び、選択肢を持てる状態を目指します。",en:"Do not make international experience a one-off trip. Compare, learn and keep global options in everyday development.","zh-tw":"不把海外經驗變成一次性遠征，而是讓比較、學習與全球選擇成為日常。",ko:"해외 경험을 일회성 원정으로 끝내지 않고 일상 속 비교·학습·선택으로 이어갑니다."})[locale]}</p></article>
      </div>
    </section>:null}
    {!role&&ja?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">WHY MY HOME COURT</p><h2>知らなかったことで、選択肢を失わないために。</h2></div><p>所属チームだけでは得にくい情報や学び、活動、海外との接点も、自分で確認できるようにします。</p></div>
      <div className="homecourt-preview-grid">
        <article><Compass/><span>01</span><h3>選択肢が増える</h3><p>地域や所属だけで次の機会を決めず、全国のクリニック・キャンプ・海外交流まで見られます。</p><a className="text-link" href="/ja/opportunities">今参加できる活動を見る <ArrowRight size={16}/></a></article>
        <article><BookOpen/><span>02</span><h3>考える材料が増える</h3><p>出場時間、移籍、練習量、指導、身体づくりなど、JOURNALから育成を考える材料を得られます。</p><a className="text-link" href="/ja/journal">育成記事を読む <ArrowRight size={16}/></a></article>
        <article><History/><span>03</span><h3>経験が残る</h3><p>クリニックや試合を一日で終わらせず、参加履歴・気づき・次に試すことを自分の記録に残せます。</p><a className="text-link" href="/ja/my-homecourt/participants">成長記録を始める <ArrowRight size={16}/></a></article>
        <article><Sparkles/><span>04</span><h3>次にやることが見える</h3><p>読む、参加する、振り返る、次を選ぶ。バラバラだった情報や経験を一つの流れにつなげます。</p><a className="text-link" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}>{authReady?"無料でRBA IDを始める":"登録再開通知を受け取る"} <ArrowRight size={16}/></a></article>
      </div>
      <div className="homecourt-private-note"><HeartHandshake size={24}/><div><strong>チームを辞めるための場所ではありません。</strong><p>今いる環境を大切にしながら、所属の外にも学びと選択肢を持つための育成プラットフォームです。</p></div></div>
    </section>:null}
    {!role&&ja?<HomecourtConversionSection/>:null}
    {!role&&ja?<section className="homecourt-plan-separation section-pad">
      <div className="homecourt-plan-intro">
        <p className="section-index">FREE / HOMECOURT</p>
        <h2>まず知る。そこから、学びを続ける。</h2>
        <p>RBA IDは、育成の選択肢を広げるための入口です。HOMECOURTでは、学んだことを試し、振り返り、次の課題を決めるところまでを日常につなげていきます。</p>
      </div>
      <div className="homecourt-plan-grid">
        <article className="homecourt-plan-card homecourt-plan-free">
          <div className="homecourt-plan-card-head"><span>FREE / RBA ID</span><strong>¥0</strong><small>まずはここから</small></div>
          <h3>知る・探す・つながる</h3>
          <p>「知らなかったから選べなかった」を減らすための入口です。</p>
          <ul>
            <li><Check size={17}/>全国のクリニック・キャンプを探す</li>
            <li><Check size={17}/>年代・地域・目的から次の活動を探す</li>
            <li><Check size={17}/>参加履歴や自分の歩みを整理する</li>
            <li><Check size={17}/>PLAYER / PARENT / COACHの入口を使う</li>
            <li><Check size={17}/>RBAからの新しい機会を受け取る</li>
          </ul>
          <a className="button button-light" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}>{authReady?"無料でRBA IDをつくる":"LINEで登録再開通知を受け取る"}<ArrowRight size={16}/></a>
        </article>
        <article className="homecourt-plan-card homecourt-plan-paid">
          <div className="homecourt-plan-card-head"><span>HOMECOURT PLUS / MONTHLY</span><strong>¥3,300</strong><small>月額・税込</small></div>
          <h3>記録を、次の行動に変える</h3>
          <p>情報を増やすためではなく、これまでの記録や予定を使って「今週何をやるか」「次に何を変えるか」まで決めるためのメンバーシップです。</p>
          <ul>
            <li><Check size={17}/>WEEKLY DEVELOPMENT｜今週のテーマ・実践・振り返り</li>
            <li><Check size={17}/>SMART PREP｜大会・遠征から逆算する準備管理</li>
            <li><Check size={17}/>CONDITION TREND｜疲労・痛み・睡眠など7日間の推移</li>
            <li><Check size={17}/>MEMBER LEARNING｜会員限定の学習ライブラリ</li>
            <li><Check size={17}/>DEVELOPMENT HORIZON｜地域〜世界までの機会整理</li>
            <li><Check size={17}/>MONTHLY REVIEW｜参加・保存・学び・目標を月単位で振り返る</li>
          </ul>
          <a className="button button-member" href="/api/commerce/checkout/homecourt-monthly?locale=ja">HOMECOURT PLUSを始める<ArrowRight size={16}/></a>
        </article>
      </div>
      <div className="homecourt-value-line">
        <span>RBA ID</span><strong>知る・探す・記録する</strong><ArrowRight size={18}/><span>HOMECOURT PLUS</span><strong>整理する・実践する・振り返る</strong>
      </div>
      <div className="homecourt-growth-loop">
        <div><span>01</span><strong>LEARN</strong><p>今の自分に必要なテーマを学ぶ。</p></div>
        <div><span>02</span><strong>TRY</strong><p>次の練習や試合で一つ試す。</p></div>
        <div><span>03</span><strong>REFLECT</strong><p>できた・できなかっただけで終わらせず振り返る。</p></div>
        <div><span>04</span><strong>NEXT</strong><p>次に変えることを一つ決める。</p></div>
      </div>
      <p className="homecourt-plan-note">無料版の機能を意図的に弱くすることはしません。活動を探す、公開情報を読む、経験を記録する機能はRBA IDで使えます。有料版では、その記録を材料に「次の行動を決める」ための高度な機能を追加します。</p>
    </section>:null}
    {!role&&ja?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">WHO IS THIS FOR?</p><h2>こんな人に、MY HOME COURTは向いています。</h2></div><p>「情報が欲しい人」ではなく、育成の選択肢と行動を増やしたい人のための場所です。</p></div>
      <div className="homecourt-preview-grid">
        <article><Users/><span>PARENT</span><h3>今の環境が本当に合っているか考えたい</h3><p>チーム選び、出場時間、練習量、移籍、保護者の関わり方まで、判断材料を持ちたいご家庭へ。</p><a className="text-link" href="/ja/my-homecourt/families">保護者向けを見る <ArrowRight size={16}/></a></article>
        <article><Sparkles/><span>PLAYER</span><h3>もっと外の世界を見てみたい</h3><p>今のチームを大切にしながら、全国のクリニックやキャンプ、海外交流にも挑戦したい選手へ。</p><a className="text-link" href="/ja/my-homecourt/players">選手向けを見る <ArrowRight size={16}/></a></article>
        <article><BookOpen/><span>COACH</span><h3>毎週の指導を更新したい</h3><p>戦術だけでなく、判断、練習設計、S&C、育成年代の考え方まで継続して学びたい指導者へ。</p><a className="text-link" href="/ja/my-homecourt/coaches">指導者向けを見る <ArrowRight size={16}/></a></article>
        <article><Compass/><span>PAST PARTICIPANT</span><h3>RBA参加を一度きりで終わらせたくない</h3><p>過去のクリニックやキャンプで得た経験を残し、次の挑戦につなげたい方へ。</p><a className="text-link" href="/ja/my-homecourt/participants">参加記録を始める <ArrowRight size={16}/></a></article>
      </div>
    </section>:null}

    {!role&&ja?<section className="homecourt-plan-separation section-pad">
      <div className="homecourt-plan-intro">
        <p className="section-index">BEFORE YOU JOIN</p>
        <h2>よくある迷いに、先に答えます。</h2>
        <p>「自分に必要か分からない」を残さないために、登録前によくある疑問を整理します。</p>
      </div>
      <div className="homecourt-plan-grid">
        <article className="homecourt-plan-card">
          <h3>今のチームを辞める必要はありますか？</h3>
          <p>ありません。MY HOME COURTは移籍を促す場所ではなく、今いる環境を大切にしながら、所属の外にも学びと機会を持つための場所です。</p>
        </article>
        <article className="homecourt-plan-card">
          <h3>無料だけでも使えますか？</h3>
          <p>使えます。活動を探す、JOURNALを読む、RBAの新しい機会を知るところから始められます。継続的な実践ガイドや振り返りを使いたい方は月額HOMECOURTへ進めます。</p>
        </article>
        <article className="homecourt-plan-card">
          <h3>月額3,300円で何が変わりますか？</h3>
          <p>情報が増えるだけではありません。学ぶ→試す→振り返る→次を決める、という成長のサイクルを日常に持ち込めるようにします。</p>
        </article>
        <article className="homecourt-plan-card">
          <h3>RBAのクリニックに参加したことがなくても大丈夫ですか？</h3>
          <p>大丈夫です。初めての方も、過去参加者も、選手・保護者・指導者それぞれの入口から使えます。</p>
        </article>
      </div>
      <div className="homecourt-launch-actions">
        <a className="button button-member" href="/api/commerce/checkout/homecourt-monthly?locale=ja">月額HOMECOURTを始める<ArrowRight size={17}/></a>
        <a className="button button-light" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}>{authReady?"まず無料でRBA IDを始める":"無料登録の再開通知を受け取る"}<ArrowRight size={17}/></a>
      </div>
    </section>:null}

    {!role&&ja?<section className="homecourt-editorial-difference section-pad">
      <div className="homecourt-editorial-head">
        <p className="section-index">SOCIAL / MY HOME COURT</p>
        <h2>SNSは「流れる」。<br/>MY HOME COURTは「残る」。</h2>
        <p>InstagramやThreads、Xは、RBAを知る・新しい考えに触れる・活動を見つけるための入口です。MY HOME COURTは、その先で自分の経験を残し、次に何をするかを決める場所です。</p>
      </div>
      <div className="homecourt-editorial-grid">
        <article>
          <span>OPEN / SOCIAL</span>
          <h3>DISCOVER</h3>
          <strong>知る・見る・出会う。</strong>
          <p>投稿はタイムラインに流れていきます。新しい情報や考え方に触れ、RBAや育成機会を知るための場所です。</p>
          <ul><li>新着情報</li><li>育成についての発信</li><li>クリニック告知</li><li>世界・現場との接点</li></ul>
        </article>
        <article className="homecourt-editorial-premium">
          <span>PERSONAL / MY HOME COURT</span>
          <h3>OWN</h3>
          <strong>自分のバスケットボールを持つ。</strong>
          <p>参加履歴、Passport、Save、学び、目標、次の機会を、自分のRBA IDに残していきます。タイムラインではなく、自分専用の育成ホームです。</p>
          <ul><li>経験が蓄積される</li><li>あとで戻れる</li><li>自分向けに整理される</li><li>次の行動につながる</li></ul>
        </article>
      </div>
      <div className="homecourt-use-loop">
        <div><span>01</span><strong>SEE</strong><p>SNSで知る。</p></div>
        <div><span>02</span><strong>SAVE</strong><p>HOME COURTに残す。</p></div>
        <div><span>03</span><strong>DO</strong><p>実際に参加・実践する。</p></div>
        <div><span>04</span><strong>BUILD</strong><p>経験を次へつなぐ。</p></div>
      </div>
      <p className="homecourt-editorial-note">フォロワー数や投稿の反応を競う場所ではありません。MY HOME COURTの中心は、自分の経験・学び・次の選択です。</p>
    </section>:null}
    {!role&&ja?<section className="homecourt-editorial-difference section-pad">
      <div className="homecourt-editorial-head">
        <p className="section-index">NOTE / MY HOME COURT</p>
        <h2>noteは「考える」。<br/>HOME COURTは「使う」。</h2>
        <p>同じテーマを扱っても、役割は分けます。noteでは育成について広く問題提起し、考えるきっかけをつくる。MY HOME COURTでは、その考えを家庭や現場で実際に使える形まで落とし込みます。</p>
      </div>
      <div className="homecourt-editorial-grid">
        <article>
          <span>OPEN / NOTE</span>
          <h3>WHY</h3>
          <strong>なぜ、この問題を考えるのか。</strong>
          <p>育成論、現場への問題提起、社会に開いた論考。立場を越えて考えるきっかけを届けます。</p>
          <ul><li>問題提起</li><li>育成思想</li><li>現場への問い</li><li>広く共有する論考</li></ul>
        </article>
        <article className="homecourt-editorial-premium">
          <span>MEMBER / MY HOME COURT</span>
          <h3>HOW</h3>
          <strong>では、自分の家庭ではどうするか。</strong>
          <p>状況を整理し、子どもと話し、必要なら指導者へ確認し、次の選択まで進めるための実践ガイドです。</p>
          <ul><li>事実を整理する</li><li>子どもへの質問</li><li>確認すべきポイント</li><li>次に取る行動</li></ul>
        </article>
      </div>
      <div className="homecourt-use-loop">
        <div><span>01</span><strong>READ</strong><p>テーマを理解する。</p></div>
        <div><span>02</span><strong>SORT</strong><p>自分の状況を事実で整理する。</p></div>
        <div><span>03</span><strong>TALK</strong><p>子ども・家族・必要な相手と話す。</p></div>
        <div><span>04</span><strong>ACT</strong><p>今できる一つを選んで動く。</p></div>
      </div>
      <p className="homecourt-editorial-note">限定情報を売る場所ではなく、育成年代の家庭が判断しやすくなるための継続的な道具として育てていきます。</p>
    </section>:null}
    {ja&&role==="coaches"?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">COACH JOURNAL / PRACTICE LAB</p><h2>読む。設計する。現場で試す。振り返る。</h2></div><p>指導者向けJOURNALは、考え方だけで終わらせません。根拠を確認し、練習に落とし込み、観察して次の修正までつなげます。</p></div>
      <div className="homecourt-preview-grid">
        <article><BookOpen/><span>01 / READ</span><h3>根拠と考え方を読む</h3><p>EVIDENCE、RBA INTERPRETATION、LIMITATIONS、SOURCESを分けて確認する。</p><a className="text-link" href="/ja/journal#category-coaching">指導者向け記事へ <ArrowRight size={16}/></a></article>
        <article><FileText/><span>02 / PLAN</span><h3>COACH APPLICATIONを使う</h3><p>SETUP、CONSTRAINTS、OBSERVE、REVIEW QUESTIONSから次の練習を設計する。</p><a className="text-link" href={recommendedJournal[0]?("/ja/journal/"+recommendedJournal[0].slug):"/ja/journal"}>実践記事を開く <ArrowRight size={16}/></a></article>
        <article><Users/><span>03 / COACH</span><h3>現場では選手を見る</h3><p>メニューを消化するのではなく、誰が何を見て、どんな判断をしたかを観察する。</p><a className="text-link" href="/ja/d-hub">D-HUBで学ぶ <ArrowRight size={16}/></a></article>
        <article><History/><span>04 / REVIEW</span><h3>次の修正を一つ決める</h3><p>練習後に「何が起きたか」「次に何を変えるか」を短く残し、次回の設計へ戻す。</p><a className="text-link" href={roleCommunity} target="_blank" rel="noreferrer">指導者コミュニティへ <ArrowUpRight size={16}/></a></article>
      </div>
      <div className="homecourt-private-note"><Check size={24}/><div><strong>練習メニュー集ではなく、指導判断を更新する場所。</strong><p>同じドリルでも、目的・制約・観察項目が変われば学習は変わります。JOURNALとD-HUBを、毎週の練習設計へ接続します。</p></div></div>
    </section>:null}
    {ja&&recommendedJournal.length?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">{role?"FOR YOU / JOURNAL":"RECOMMENDED / JOURNAL"}</p><h2>{role==="families"?"保護者の方に、今読んでほしい3本。":role==="coaches"?"指導者の方に、今読んでほしい3本。":role==="players"?"選手の成長につながる3本。":"今週、まずこの3本。"}</h2></div><p>JOURNALで読んで終わりではなく、気づきを次の練習・会話・活動へつなげます。</p></div>
      <div className="homecourt-preview-grid">{recommendedJournal.map((post,index)=><article key={post.slug}><BookOpen/><span>{String(index+1).padStart(2,"0")}</span><h3>{post.title}</h3><p>{post.standfirst}</p><a className="text-link" href={`/ja/journal/${post.slug}`}>この記事を読む <ArrowRight size={16}/></a></article>)}</div>
      <div className="homecourt-private-note"><History size={24}/><div><strong>読んだら、次にやることを一つ決める。</strong><p>「分かった」で終わらず、次の練習・試合・家庭で試すことをMY HOME COURTに残す使い方をおすすめします。</p></div></div>
    </section>:null}
    {!role&&ja&&latestJournal.length?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">LATEST / JOURNAL</p><h2>新しく追加された育成記事。</h2></div><p>公開済みの記事だけを表示します。更新されたら、ここからすぐ読めます。</p></div>
      <div className="homecourt-preview-grid">{latestJournal.map((post,index)=><article key={post.slug}><FileText/><span>NEW {String(index+1).padStart(2,"0")}</span><h3>{post.title}</h3><p>{post.standfirst}</p><a className="text-link" href={`/ja/journal/${post.slug}`}>最新記事を読む <ArrowRight size={16}/></a></article>)}</div>
    </section>:null}
    {!role&&ja?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">THIS WEEK / HOME COURT</p><h2>毎週、ここに戻る理由を。</h2></div><p>情報を増やすのではなく、今週やることを一つ決めるための入口です。</p></div>
      <div className="homecourt-preview-grid">
        <article><BookOpen/><span>READ</span><h3>今週、一つ読む</h3><p>育成・保護者・指導者・海外交流から、自分に必要なテーマを選ぶ。</p><a className="text-link" href="/ja/journal">RBA JOURNALへ <ArrowRight size={16}/></a></article>
        <article><Compass/><span>FIND</span><h3>次の機会を一つ見る</h3><p>参加するかどうかは後でいい。まず、自分の地域の外にも選択肢があることを知る。</p><a className="text-link" href="/ja/opportunities">育成機会を探す <ArrowRight size={16}/></a></article>
        <article><History/><span>REFLECT</span><h3>今週の経験を一つ残す</h3><p>できたこと、迷ったこと、次に試したいこと。成長を結果だけで終わらせない。</p><a className="text-link" href="/ja/my-homecourt/participants">参加・成長記録へ <ArrowRight size={16}/></a></article>
        <article><Users/><span>CONNECT</span><h3>所属の外と一つつながる</h3><p>選手・保護者・指導者、それぞれの立場から、新しい考え方や人に触れる。</p><a className="text-link" href="/ja/community">RBAコミュニティへ <ArrowRight size={16}/></a></article>
      </div>
      {nextProgrammes.length?<div className="homecourt-private-note"><CalendarDays size={24}/><div><strong>次に参加できるRBA</strong><p>{nextProgrammes.map(p=>`${p.date[1]}｜${p.title[1]}｜${p.place[1]}`).join("　／　")}</p></div></div>:null}
    </section>:null}
    {!role&&ja?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">START FROM YOUR QUESTION</p><h2>いまの悩みから、入口を選ぶ。</h2></div><p>「何を見ればいいか分からない」で止まらないように、目的から次のページへ進めます。</p></div>
      <div className="homecourt-preview-grid">
        <article><Compass/><span>PLAYER</span><h3>次に参加できる活動を探したい</h3><p>年代・地域・目的から、現在参加できるクリニックやキャンプを探します。</p><a className="text-link" href="/ja/opportunities">育成機会を探す <ArrowRight size={16}/></a></article>
        <article><HeartHandshake/><span>PARENT</span><h3>今のチーム環境に迷っている</h3><p>費用、安全、起用、育成方針など、保護者が確認したいポイントを整理します。</p><a className="text-link" href="/ja/families">保護者向けページへ <ArrowRight size={16}/></a></article>
        <article><BookOpen/><span>COACH</span><h3>指導をアップデートしたい</h3><p>D-HUB、指導者講習、JOURNALから、日々の練習設計につながる学びへ進みます。</p><a className="text-link" href="/ja/coaches">指導者向けページへ <ArrowRight size={16}/></a></article>
        <article><Sparkles/><span>WORLD</span><h3>地域の外、世界まで見せたい</h3><p>Development Camp、RBA UNITED、Japan × Asia。目的の違う挑戦を分けて選べます。</p><a className="text-link" href="/ja/international">海外交流を見る <ArrowRight size={16}/></a></article>
      </div>
      <div className="homecourt-private-note"><MessageCircle size={24}/><div><strong>登録前でも、見る・学ぶ・相談するところから始められます。</strong><p>MY HOME COURTは囲い込むための会員ページではありません。まず選択肢を知り、必要なときに自分の記録と学びを持てるようにします。</p></div></div>
    </section>:null}
    {!role?<section className="membership-path section-pad"><p className="section-index">DISCOVER / CONNECT / CHALLENGE</p><div className="membership-path-grid"><article><span>01 / DISCOVER</span><Sparkles/><h2>{c.free}</h2><p>{c.freeBody}</p><a href={registrationUrl}>{c.register}<ArrowRight size={16}/></a></article><article><span>02 / CONNECT</span><MessageCircle/><h2>{c.community}</h2><p>{c.communityBody}</p><a href={localePath(locale,"community")}>{c.community}<ArrowRight size={16}/></a></article><article><span>03 / CHALLENGE</span><CreditCard/><h2>{c.paid}</h2><p>{c.paidBody}</p><a href={ja?localePath(locale,"schedule"):registrationUrl}>{locale==="ja"?"次の活動を探す":locale==="zh-tw"?"登入後加入":locale==="ko"?"로그인 후 가입":"Sign in to join"}<ArrowRight size={16}/></a></article></div></section>:null}
    <section className="my-homecourt-role section-pad"><p className="section-index">PLAYER / PARENT / COACH</p><h2 className="member-section-title">{c.choose}</h2><div className="my-homecourt-role-grid">{Object.entries(homecourtRoles).map(([key,data])=><a key={key} className={role===key?"is-current":undefined} href={`${prefix}/my-homecourt/${key}`}><span>{data.shortLabel}</span><strong>{ja?data.label:data.shortLabel}</strong><p>{ja?data.description:"Open your RBA guide, community and next actions."}</p><ArrowRight size={20}/></a>)}</div></section>
    {selected&&ja?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">YOUR NEXT STEP</p><h2>読んだあとに、次の一つへ。</h2></div><p>情報を集めるだけで終わらないように、立場に合わせて次の行動を選べます。</p></div>
      <div className="homecourt-preview-grid">
        <article><BookOpen/><span>READ</span><h3>もう1本読む</h3><p>今の課題に近いJOURNALを読み、考え方の幅を広げる。</p><a className="text-link" href="/ja/journal">JOURNALへ <ArrowRight size={16}/></a></article>
        <article><History/><span>REFLECT</span><h3>経験を一つ残す</h3><p>試合、練習、クリニックで気づいたことを記録する。</p><a className="text-link" href="/ja/my-homecourt/participants">参加・成長記録へ <ArrowRight size={16}/></a></article>
        <article><Compass/><span>FIND</span><h3>次の活動を見る</h3><p>今の課題を試せるクリニックやキャンプを探す。</p><a className="text-link" href="/ja/opportunities">活動を探す <ArrowRight size={16}/></a></article>
        <article><Users/><span>UNITED</span><h3>個人で次の挑戦へ</h3><p>所属チームを続けながら、大会・遠征・国際交流などに個人参加する。</p><a className="text-link" href="/ja/united">RBA UNITEDを見る <ArrowRight size={16}/></a></article>
        <article><Sparkles/><span>NEXT</span><h3>次に試すことを決める</h3><p>学びを一つに絞り、次の練習で実際に試す。</p><a className="text-link" href="/ja/my-homecourt/participants">MY HOME COURTに残す <ArrowRight size={16}/></a></article>
      </div>
    </section>:null}
    {selected?<section className="member-route-actions section-pad"><div><p className="section-index">{ja?"次に進む":"YOUR NEXT ACTION"}</p><h2>{ja?`${selected.label}向けのご案内`:`${selected.shortLabel} ROUTE`}</h2><p>{ja?"参加する。学ぶ。仲間とつながる。今必要な入口から始められます。":"Find programmes, community and the next action for your role."}</p></div><div className="member-route-action-grid"><a href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}><Sparkles/><strong>{ja&&!authReady?"登録再開通知を受け取る":c.register}</strong><span>{ja?"活動・記録・学びを一つにつなぐ":"Connect activities, records and learning"}</span><ArrowRight/></a><a href={roleCommunity} target="_blank" rel="noreferrer"><Users/><strong>{c.community}</strong><span>{ja?(role==="coaches"?"指導者向けオープンコミュニティ":"選手・保護者向けオープンコミュニティ"):"Join the relevant open community"}</span><ArrowUpRight/></a><a href={localePath(locale,"opportunities")}><CalendarDays/><strong>{ja?"現在募集中の活動":"Current programmes"}</strong><span>{ja?"日程・対象・募集状況を比較":"Compare dates, eligibility and availability"}</span><ArrowRight/></a>{role==="players"?<><a href={localePath(locale,"camp")}><BookOpen/><strong>Development Camp</strong><span>{({ja:"育成を深める。練習・ゲーム・振り返りを持ち帰る",en:"Develop through training, games and reflection","zh-tw":"透過訓練、比賽與反思深化培育",ko:"훈련·게임·회고를 통해 성장하기"})[locale]}</span><ArrowRight/></a><a href={localePath(locale,"united")}><Users/><strong>RBA UNITED</strong><span>{({ja:"大会・遠征・国際交流へ、期間限定チームで挑戦",en:"Join a time-limited team for tournaments, trips and exchanges","zh-tw":"以期間限定團隊挑戰大會、遠征與交流",ko:"기간 한정 팀으로 대회·원정·교류에 도전"})[locale]}</span><ArrowRight/></a></>:null}{role==="coaches"?<><a href={localePath(locale,"d-hub")}><BookOpen/><strong>D-HUB</strong><span>{ja?"継続して学べる指導者向けプログラム":"Ongoing coach development"}</span><ArrowRight/></a><a href={localePath(locale,"events/torsten-loibl-online-clinic")}><Users/><strong>TORSTEN LOIBL</strong><span>{ja?"世界の育成現場に学ぶ指導者講習":"International coach clinic"}</span><ArrowRight/></a></>:null}</div></section>:null}
    {!role&&ja?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">SHARE YOUR HOME COURT</p><h2>一人で使うだけではなく、つながる。</h2></div><p>保護者、選手、指導者。関わる人が同じ場所を見られるほど、次の選択が分かりやすくなります。</p></div>
      <div className="homecourt-preview-grid">
        <article><Users/><span>PARENT</span><h3>保護者に共有</h3><p>参加履歴や次の活動を、家族で確認する入口として。</p><a className="text-link" href="https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Friotbasketballacademy.com%2Fja%2Fmy-homecourt%2Ffamilies" target="_blank" rel="noreferrer">LINEで共有 <ArrowUpRight size={16}/></a></article>
        <article><Users/><span>PLAYER</span><h3>選手に共有</h3><p>自分の経験をPassportに残し、次に試すことを決めるために。</p><a className="text-link" href="https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Friotbasketballacademy.com%2Fja%2Fmy-homecourt%2Fplayers" target="_blank" rel="noreferrer">LINEで共有 <ArrowUpRight size={16}/></a></article>
        <article><BookOpen/><span>COACH</span><h3>指導者に共有</h3><p>D-HUB、Torsten、育成記事まで、指導者の学びを一つの入口へ。</p><a className="text-link" href="https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Friotbasketballacademy.com%2Fja%2Fmy-homecourt%2Fcoaches" target="_blank" rel="noreferrer">指導者へ共有 <ArrowUpRight size={16}/></a></article>
        <article><Sparkles/><span>FREE</span><h3>RBA IDを始める</h3><p>初めてでも、過去参加者でも。同じ入口から無料で始められます。</p><a className="text-link" href="/ja/my-homecourt/login">無料でRBA IDをつくる <ArrowRight size={16}/></a></article>
      </div>
    </section>:null}
    <section className="my-homecourt-tools section-pad"><div className="section-head"><div><p className="section-index">{ja?"よく使うメニュー":"QUICK ACCESS"}</p><h2>{c.tools}</h2></div><p>{ja?"活動を探す、申し込む、相談する。次の一歩に必要な情報を、ここから。":"Find programmes, applications, support and essential information here."}</p></div><div className="my-homecourt-tool-grid"><a href={localePath(locale,"schedule")}><CalendarDays/><strong>{ja?"開催日程・募集中の活動":"Programme calendar"}</strong><span>{ja?"対象年代、日程、会場を確認":"Check dates and eligibility"}</span></a><a href={localePath(locale,"payments")}><CreditCard/><strong>{ja?"申込・決済":"Registration & payment"}</strong><span>{ja?"公式の申込フォームと決済先を確認":"Official forms and payment links"}</span></a><a href={localePath(locale,"policies")}><FileText/><strong>{ja?"参加規約・安全方針":"Policies & safety"}</strong><span>{ja?"参加前に確認していただきたい大切な情報":"Important information before joining"}</span></a><a href={localePath(locale,"contact")}><LifeBuoy/><strong>{ja?"RBAへ相談する":"Ask RBA"}</strong><span>{ja?"申込や決済で不明な点はこちら":"Ask before payment when unclear"}</span></a></div></section>
    <section className="impact-entry section-pad"><HeartHandshake size={42}/><div><p className="section-index">RBA IMPACT / REINVESTMENT</p><h2>{c.impact}</h2><p>{c.impactBody}</p></div><a className="button button-dark" href={localePath(locale,"impact")}>{c.impactCta}<ArrowRight size={17}/></a></section>
    {selected?<section className="my-homecourt-content section-pad"><div><LockKeyhole size={34}/><p className="section-index">{ja?"コンテンツ案内":"CONTENT ROADMAP"}</p><h2>{ja?`${selected.label}のコンテンツ`:"Content for this route"}</h2><p>{ja?"動画、資料、お知らせを、立場に合わせて整理します。参加履歴や家族情報などの個人情報は、ログインした本人と権限を持つ関係者だけに表示します。":"Videos, resources and notices are organised for this route. Personal records are shown only to authenticated, authorised people."}</p></div><ul>{selected.items.map(item=><li key={item}><House size={17}/>{item}</li>)}<li><Check size={17}/>{ja?"指導者はD-HUBの継続学習や、トーステン講習へ進めます。":"Coaches can continue to D-HUB and the Torsten Loibl clinic."}</li></ul></section>:null}
  </SiteFrame>;
}
