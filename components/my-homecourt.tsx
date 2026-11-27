/* eslint-disable @next/next/no-html-link-for-pages -- checkout anchors intentionally avoid prefetching the server redirect endpoint. */
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, Compass, CreditCard, FileText, HeartHandshake, House, LifeBuoy, LockKeyhole, Sparkles, Users } from "lucide-react";
import { COACH_COMMUNITY_URL, HomecourtRole, PARENT_COMMUNITY_URL, homecourtRoles } from "./homecourt-data";
import { Locale, localePath, SiteFrame } from "./site-frame";

const copy={
  en:{title:"Your next court starts here.",lead:"From everyday practice to courts you have not seen yet. Find clinics, learning, community and exchange built for players, parents and coaches.",free:"Discover what comes next",freeBody:"Find clinics, development ideas and opportunities that fit where you are now.",paid:"Expand your court",paidBody:"Meet new teammates, visit new places and experience different ways to play and learn.",community:"Community",communityBody:"Useful conversations for families and coaches, connected to real programmes—not an endless social feed.",impact:"RBA IMPACT",impactBody:"See how programme income and partner support are reinvested into access, education and safer development environments.",choose:"Choose your route",tools:"Member essentials",register:"Start with RBA ID",upgrade:"Explore MY HOME COURT",impactCta:"See impact & reinvestment"},
  ja:{title:"あなたのバスケを、一つに。",lead:"練習や試合の記録、次の活動探し、育成の学びを一つに。今のチームに所属したまま使える、あなたのバスケットボールのホームです。",free:"次の活動を見つける",freeBody:"年代・地域・目的に合う、現在募集中の活動を探せます。",paid:"経験を次の成長につなぐ",paidBody:"参加履歴や振り返りを残し、今の自分に合う学びや次の挑戦へ進めます。",community:"仲間と学ぶ",communityBody:"保護者と指導者が、現場での気づきや育成に関する問いを共有できます。",impact:"RBA IMPACT",impactBody:"参加費、会費、協賛金を、参加機会・指導者教育・安全な育成環境へどのように還元しているかをお伝えします。",choose:"立場に合う入口を選ぶ",tools:"よく使うメニュー",register:"無料で始める・ログイン",upgrade:"使い方を見る",impactCta:"活動実績と再投資方針を見る"},
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
    kicker:"まずここから",title:"何ができる？",
    lead:"必要な機能から始めましょう。",
    cards:[
      ["探す","次の機会を見つける","全国のクリニック、キャンプ、海外交流から次の機会を探せます。"],
      ["学ぶ","育成について理解を深める","立場に合う育成記事や実践のヒントを読めます。"],
      ["残す","経験を記録する","参加履歴、振り返り、次に試すことを残せます。"],
      ["挑戦する","RBA UNITEDで新しい経験へ","所属チームを続けながら、国内外の大会・交流へ。"]
    ],
    freeTitle:"まずはRBA IDから",freeBody:"活動を探す、JOURNALを読む、経験を残す。RBA IDは無料です。",
    paidTitle:"学びと振り返りを、日常の流れにする",paidBody:"「学ぶ・試す・振り返る・次を決める」を継続する有料プランです。",
    paidCta:"PLUSの内容を見る",freeCta:"RBA IDから始める",
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
  const selected=role?homecourtRoles[role]:null;
  const roleCommunity=role==="coaches"?COACH_COMMUNITY_URL:PARENT_COMMUNITY_URL;
  const clear=clarityCopy[locale];
  return <SiteFrame locale={locale} languagePage="my-homecourt">
    <section className="my-homecourt-hero section-pad"><div className="my-homecourt-hero-copy"><a className="back-link" href={localePath(locale,"home-court")}>{ja?"← MY HOME COURTについて":"← MY HOME COURT"}</a><p className="section-index inverse">RBA / OPEN DEVELOPMENT PLATFORM</p><h1>{selected?(ja?selected.label:selected.shortLabel):c.title}</h1><p>{selected?(ja?selected.description:"Your dedicated route to RBA programmes and resources."):c.lead}</p><div className="my-homecourt-hero-actions"><a className="button button-member" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}><Sparkles size={17}/>{ja&&!authReady?"登録再開のお知らせを受け取る":c.register}<ArrowRight size={16}/></a><a className="button button-light" href={ja?"/ja/my-homecourt/guide":localePath(locale,"home-court")}>{c.upgrade}<ArrowRight size={16}/></a></div>{ja&&!authReady?<p className="registration-note">RBA IDの登録・ログインメールは現在調整中です。再開までは、公式LINEで新しい活動・記事・登録再開のお知らせを受け取れます。</p>:null}</div><div className="my-homecourt-hero-mark" aria-hidden="true"><span>RBA</span><strong>MY<br/>HOME<br/>COURT</strong><small>PLAYER / PARENT / COACH</small></div></section>
    {!role?<section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">{clear.kicker}</p><h2>{clear.title}</h2></div><p>{clear.lead}</p></div>
      <div className="homecourt-preview-grid">{clear.cards.map(([label,title,body],index)=><article key={label}><Compass/><span>{String(index+1).padStart(2,"0")} / {label}</span><h3>{title}</h3><p>{body}</p><a className="text-link" href={index===0?localePath(locale,"opportunities"):index===1?localePath(locale,"journal"):index===2?registrationUrl:localePath(locale,"united")}>{label}<ArrowRight size={16}/></a></article>)}</div>
      <div className="homecourt-plan-grid">
        <article className="homecourt-plan-card homecourt-plan-free"><div className="homecourt-plan-card-head"><span>FREE / RBA ID</span><strong>¥0</strong></div><h3>{clear.freeTitle}</h3><p>{clear.freeBody}</p><a className="button button-light" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}>{clear.freeCta}<ArrowRight size={16}/></a></article>
        <article className="homecourt-plan-card homecourt-plan-paid"><div className="homecourt-plan-card-head"><span>HOMECOURT PLUS</span><strong>¥3,300 / {({ja:"月",en:"mo","zh-tw":"月",ko:"월"})[locale]}</strong></div><h3>{clear.paidTitle}</h3><p>{clear.paidBody}</p><a className="button button-member" href={ja?"/ja/homecourt-plus":`/api/commerce/checkout/homecourt-monthly?locale=${locale}`}>{clear.paidCta}<ArrowRight size={16}/></a></article>
      </div>
      <div className="section-head"><div><p className="section-index">FAQ</p><h2>{clear.faqTitle}</h2></div></div>
      <div className="homecourt-plan-grid">{clear.faq.map(([q,a])=><details className="homecourt-plan-card" key={q}><summary className="font-bold cursor-pointer">{q}</summary><p>{a}</p></details>)}</div>
    </section>:null}
    
    
    {ja&&!role?<section className="homecourt-product-preview section-pad"><div className="homecourt-private-note"><LockKeyhole size={24}/><div><strong>成長記録は非公開です。</strong><p>写真・動画や参加履歴は、本人と権限を持つ関係者だけが確認できます。</p><a className="text-link" href="/ja/my-homecourt/guide">初期設定・使い方ガイドへ <ArrowRight size={16}/></a></div></div></section>:null}
    <section className="my-homecourt-role section-pad"><p className="section-index">PLAYER / PARENT / COACH</p><h2 className="member-section-title">{c.choose}</h2><div className="my-homecourt-role-grid">{Object.entries(homecourtRoles).map(([key,data])=><a key={key} className={role===key?"is-current":undefined} href={`${prefix}/my-homecourt/${key}`}><span>{data.shortLabel}</span><strong>{ja?data.label:data.shortLabel}</strong><p>{ja?data.description:"Open your RBA guide, community and next actions."}</p><ArrowRight size={20}/></a>)}</div></section>
    {selected?<section className="member-route-actions section-pad"><div><p className="section-index">{ja?"次に進む":"YOUR NEXT ACTION"}</p><h2>{ja?`${selected.label}向けのご案内`:`${selected.shortLabel} ROUTE`}</h2><p>{ja?"参加する。学ぶ。仲間とつながる。今必要な入口から始められます。":"Find programmes, community and the next action for your role."}</p></div><div className="member-route-action-grid"><a href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}><Sparkles/><strong>{ja&&!authReady?"登録再開通知を受け取る":c.register}</strong><span>{ja?"活動・記録・学びを一つにつなぐ":"Connect activities, records and learning"}</span><ArrowRight/></a><a href={roleCommunity} target="_blank" rel="noreferrer"><Users/><strong>{c.community}</strong><span>{ja?(role==="coaches"?"指導者向けオープンコミュニティ":"選手・保護者向けオープンコミュニティ"):"Join the relevant open community"}</span><ArrowUpRight/></a><a href={localePath(locale,"opportunities")}><CalendarDays/><strong>{ja?"現在募集中の活動":"Current programmes"}</strong><span>{ja?"日程・対象・募集状況を比較":"Compare dates, eligibility and availability"}</span><ArrowRight/></a>{role==="players"?<><a href={localePath(locale,"camp")}><BookOpen/><strong>Development Camp</strong><span>{({ja:"育成を深める。練習・ゲーム・振り返りを持ち帰る",en:"Develop through training, games and reflection","zh-tw":"透過訓練、比賽與反思深化培育",ko:"훈련·게임·회고를 통해 성장하기"})[locale]}</span><ArrowRight/></a><a href={localePath(locale,"united")}><Users/><strong>RBA UNITED</strong><span>{({ja:"大会・遠征・国際交流へ、期間限定チームで挑戦",en:"Join a time-limited team for tournaments, trips and exchanges","zh-tw":"以期間限定團隊挑戰大會、遠征與交流",ko:"기간 한정 팀으로 대회·원정·교류에 도전"})[locale]}</span><ArrowRight/></a></>:null}{role==="coaches"?<><a href={localePath(locale,"d-hub")}><BookOpen/><strong>D-HUB</strong><span>{ja?"継続して学べる指導者向けプログラム":"Ongoing coach development"}</span><ArrowRight/></a><a href={localePath(locale,"events/torsten-loibl-online-clinic")}><Users/><strong>TORSTEN LOIBL</strong><span>{ja?"世界の育成現場に学ぶ指導者講習":"International coach clinic"}</span><ArrowRight/></a></>:null}</div></section>:null}
    <section className="my-homecourt-tools section-pad"><div className="section-head"><div><p className="section-index">{ja?"よく使うメニュー":"QUICK ACCESS"}</p><h2>{c.tools}</h2></div><p>{ja?"活動を探す、申し込む、相談する。次の一歩に必要な情報を、ここから。":"Find programmes, applications, support and essential information here."}</p></div><div className="my-homecourt-tool-grid"><a href={localePath(locale,"schedule")}><CalendarDays/><strong>{ja?"開催日程・募集中の活動":"Programme calendar"}</strong><span>{ja?"対象年代、日程、会場を確認":"Check dates and eligibility"}</span></a><a href={localePath(locale,"payments")}><CreditCard/><strong>{ja?"申込・決済":"Registration & payment"}</strong><span>{ja?"公式の申込フォームと決済先を確認":"Official forms and payment links"}</span></a><a href={localePath(locale,"policies")}><FileText/><strong>{ja?"参加規約・安全方針":"Policies & safety"}</strong><span>{ja?"参加前に確認していただきたい大切な情報":"Important information before joining"}</span></a><a href={localePath(locale,"contact")}><LifeBuoy/><strong>{ja?"RBAへ相談する":"Ask RBA"}</strong><span>{ja?"申込や決済で不明な点はこちら":"Ask before payment when unclear"}</span></a></div></section>
    <section className="impact-entry section-pad"><HeartHandshake size={42}/><div><p className="section-index">RBA IMPACT / REINVESTMENT</p><h2>{c.impact}</h2><p>{c.impactBody}</p></div><a className="button button-dark" href={localePath(locale,"impact")}>{c.impactCta}<ArrowRight size={17}/></a></section>
    {selected?<section className="my-homecourt-content section-pad"><div><LockKeyhole size={34}/><p className="section-index">{ja?"コンテンツ案内":"CONTENT ROADMAP"}</p><h2>{ja?`${selected.label}のコンテンツ`:"Content for this route"}</h2><p>{ja?"動画、資料、お知らせを、立場に合わせて整理します。参加履歴や家族情報などの個人情報は、ログインした本人と権限を持つ関係者だけに表示します。":"Videos, resources and notices are organised for this route. Personal records are shown only to authenticated, authorised people."}</p></div><ul>{selected.items.map(item=><li key={item}><House size={17}/>{item}</li>)}<li><Check size={17}/>{ja?"指導者はD-HUBの継続学習や、トーステン講習へ進めます。":"Coaches can continue to D-HUB and the Torsten Loibl clinic."}</li></ul></section>:null}
  </SiteFrame>;
}
