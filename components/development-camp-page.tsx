import { ArrowRight, BookOpen, CalendarDays, Check, Compass, History, ShieldCheck, Users } from "lucide-react";
import { Locale, localePath, SiteFrame } from "./site-frame";
import { programmes } from "./programme-data";
import { tr } from "./network-data";

const copy={
  en:{
    tag:"DEVELOPMENT CAMP",title:"Train. Play. Reflect. Grow.",
    lead:"RBA Development Camp is a learning-focused programme that connects practice, games, physical preparation and reflection. It is not a temporary tournament team.",
    purpose:"WHAT THIS IS",purposeTitle:"A development environment, not a selection team.",
    purposeBody:"Players join to learn, repeat, try new solutions and take clear development themes back to everyday basketball.",
    steps:[["01","TRAIN","Work on skill, perception, decision-making and physical preparation."],["02","PLAY","Use those ideas in small-sided games and game-like situations."],["03","REFLECT","Identify what changed, what was difficult and what to try next."],["04","RETURN","Take one clear theme back to your normal practice and team."]],
    differenceTitle:"Development Camp and RBA UNITED are different.",
    campLabel:"DEVELOPMENT CAMP",campBody:"Learning-first. Practice, games, physical preparation and reflection are the centre of the programme.",
    unitedLabel:"RBA UNITED",unitedBody:"Challenge-first. Individual players come together as a time-limited team for a specific tournament or exchange.",
    openTitle:"Open Development Camps",openBody:"Only currently verified open camps are shown.",
    noOpen:"There are no verified open Development Camps right now.",
    apply:"Official application",all:"See all opportunities",home:"MY HOME COURT",
    faqTitle:"Before you join",faq:[
      ["Do I need to leave my team?","No. Development Camp is designed to add learning around your current environment, not replace it."],
      ["Is this a selection team?","No. The purpose is development. If a specific camp has capacity or eligibility limits, they are stated in the official application."],
      ["What should I bring back?","One or two clear things to keep working on after the camp: a decision, skill, physical habit or game understanding."]
    ]
  },
  ja:{
    tag:"DEVELOPMENT CAMP",title:"練習する。試す。振り返る。持ち帰る。",
    lead:"RBA Development Campは、技術・判断・身体づくり・ゲーム・振り返りをつなぐ「育成の場」です。大会に出るための期間限定チームではありません。",
    purpose:"DEVELOPMENT FIRST",purposeTitle:"選抜ではなく、成長のためのキャンプ。",
    purposeBody:"新しい仲間や環境の中で、学び、反復し、試し、振り返る。そこで見つけた課題を、普段の練習や所属チームへ持ち帰ることを目的にしています。",
    steps:[["01","TRAIN / 学ぶ","技術、認知・判断、身体の使い方をテーマを持って練習します。"],["02","PLAY / 試す","小人数ゲームや実戦に近い状況で、学んだことを実際に試します。"],["03","REFLECT / 振り返る","できた・できなかっただけでなく、何を見て、どう判断したかを整理します。"],["04","RETURN / 持ち帰る","次の練習で続けることを一つ決め、普段の環境へ戻ります。"]],
    differenceTitle:"Development CampとRBA UNITEDは、役割が違います。",
    campLabel:"DEVELOPMENT CAMP",campBody:"育成が中心。練習・ゲーム・身体づくり・振り返りを通して、選手自身の成長課題を深めます。",
    unitedLabel:"RBA UNITED",unitedBody:"挑戦が中心。個人で集まった選手が、大会・遠征・国際交流など特定の目的のために期間限定チームを組みます。",
    openTitle:"現在募集中のDevelopment Camp",openBody:"公式データで募集を確認できるキャンプだけを表示しています。",
    noOpen:"現在、募集を確認できるDevelopment Campはありません。",
    apply:"公式申込へ",all:"すべての育成機会を見る",home:"MY HOME COURT",
    faqTitle:"参加前によくある質問",faq:[
      ["今のチームを辞める必要はありますか？","ありません。今いる環境を大切にしながら、外で得た学びを普段の練習へ持ち帰るためのキャンプです。"],
      ["セレクションチームですか？","違います。目的は育成です。定員や対象年代などの参加条件がある場合は、各募集ページに明記します。"],
      ["キャンプ後は何をすればいいですか？","全部を持ち帰る必要はありません。次の練習で続けるテーマを一つか二つ決め、MY HOME COURTに記録する使い方をおすすめします。"]
    ]
  },
  "zh-tw":{
    tag:"DEVELOPMENT CAMP",title:"練習、實踐、反思，再把成長帶回去。",
    lead:"RBA Development Camp 是以培育為中心的活動，把技術、判斷、身體準備、比賽與反思連在一起。它不是為參加大會而組成的期間限定隊伍。",
    purpose:"DEVELOPMENT FIRST",purposeTitle:"不是選拔隊，而是成長環境。",
    purposeBody:"在新的夥伴與環境中學習、反覆練習、嘗試與反思，再把清楚的成長課題帶回平常的訓練與所屬球隊。",
    steps:[["01","TRAIN / 學習","練習技術、認知判斷與身體使用。"],["02","PLAY / 實踐","在小組比賽與接近實戰的情境中嘗試。"],["03","REFLECT / 反思","整理自己看到了什麼、如何判斷，以及下一步。"],["04","RETURN / 帶回","決定一個持續練習的主題，帶回日常環境。"]],
    differenceTitle:"Development Camp 與 RBA UNITED 的角色不同。",
    campLabel:"DEVELOPMENT CAMP",campBody:"以培育為中心。透過訓練、比賽、身體準備與反思深化個人成長課題。",
    unitedLabel:"RBA UNITED",unitedBody:"以挑戰為中心。個人報名球員為特定大會、遠征或國際交流組成期間限定團隊。",
    openTitle:"目前開放的 Development Camp",openBody:"只顯示官方資料已確認開放報名的營隊。",
    noOpen:"目前沒有確認開放報名的 Development Camp。",
    apply:"官方報名",all:"查看所有培育機會",home:"MY HOME COURT",
    faqTitle:"參加前常見問題",faq:[
      ["需要離開現在的球隊嗎？","不需要。營隊的目的，是把外部學習帶回目前的訓練環境。"],
      ["這是選拔隊嗎？","不是。核心目的是培育。若有名額或年齡等條件，會在正式報名頁面說明。"],
      ["營隊結束後要做什麼？","不需要一次帶回全部內容。選一至兩個下一步課題，持續練習並記錄在 MY HOME COURT。"]
    ]
  },
  ko:{
    tag:"DEVELOPMENT CAMP",title:"훈련하고, 시도하고, 돌아보고, 가져갑니다.",
    lead:"RBA Development Camp는 기술·판단·신체 준비·게임·회고를 연결하는 성장 중심 프로그램입니다. 대회 출전을 위한 기간 한정 팀이 아닙니다.",
    purpose:"DEVELOPMENT FIRST",purposeTitle:"선발팀이 아니라 성장 환경입니다.",
    purposeBody:"새로운 동료와 환경에서 배우고 반복하고 시도한 뒤, 명확한 성장 과제를 평소 훈련과 소속팀으로 가져가는 것이 목적입니다.",
    steps:[["01","TRAIN / 배우기","기술, 인지·판단, 신체 사용을 주제에 맞춰 훈련합니다."],["02","PLAY / 시도하기","소인수 게임과 실전 상황에서 배운 내용을 시험합니다."],["03","REFLECT / 돌아보기","무엇을 보고 어떻게 판단했는지 정리합니다."],["04","RETURN / 가져가기","다음 훈련에서 이어갈 한 가지 과제를 정해 일상으로 돌아갑니다."]],
    differenceTitle:"Development Camp와 RBA UNITED는 역할이 다릅니다.",
    campLabel:"DEVELOPMENT CAMP",campBody:"성장이 중심입니다. 훈련·게임·신체 준비·회고를 통해 개인의 성장 과제를 깊게 만듭니다.",
    unitedLabel:"RBA UNITED",unitedBody:"도전이 중심입니다. 개인 신청 선수가 특정 대회·원정·국제교류를 위해 기간 한정 팀을 구성합니다.",
    openTitle:"현재 모집 중 Development Camp",openBody:"공식 데이터에서 모집 중으로 확인된 캠프만 표시합니다.",
    noOpen:"현재 모집이 확인된 Development Camp가 없습니다.",
    apply:"공식 신청",all:"전체 성장 기회 보기",home:"MY HOME COURT",
    faqTitle:"참가 전 자주 묻는 질문",faq:[
      ["현재 팀을 그만둬야 하나요?","아니요. 지금 환경을 유지하면서 외부에서 얻은 배움을 평소 훈련으로 가져가는 프로그램입니다."],
      ["선발팀인가요?","아닙니다. 목적은 성장입니다. 정원이나 대상 연령 등 조건은 공식 모집 페이지에 명시합니다."],
      ["캠프 후에는 무엇을 해야 하나요?","모든 것을 가져갈 필요는 없습니다. 다음 훈련에서 이어갈 한두 가지를 정해 MY HOME COURT에 기록해 보세요."]
    ]
  }
} as const;

export function DevelopmentCampPage({locale}:{locale:Locale}){
  const c=copy[locale];
  const today=new Date().toISOString().slice(0,10);
  const open=programmes.filter(p=>p.pathway==="development-camp"&&!p.registrationClosed&&p.startDate>=today);
  return <SiteFrame locale={locale} languagePage="camp">
    <section className="network-hero section-pad"><a className="back-link" href={localePath(locale)}>← RBA</a><p className="section-index inverse">RBA / {c.tag}</p><Compass/><h1>RBA DEVELOPMENT CAMP</h1><strong>{c.title}</strong><p>{c.lead}</p><div className="my-homecourt-hero-actions"><a className="button button-light" href="#open-camps">{c.openTitle}<ArrowRight/></a><a className="button button-dark" href={localePath(locale,"my-homecourt")}>{c.home}<ArrowRight/></a></div></section>
    <section className="homecourt-product-preview section-pad"><div className="section-head"><div><p className="section-index">{c.purpose}</p><h2>{c.purposeTitle}</h2></div><p>{c.purposeBody}</p></div><div className="homecourt-preview-grid">{c.steps.map(([n,title,body])=><article key={n}><BookOpen/><span>{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="homecourt-plan-separation section-pad"><div className="homecourt-plan-intro"><p className="section-index">CAMP / UNITED</p><h2>{c.differenceTitle}</h2></div><div className="homecourt-plan-grid"><article className="homecourt-plan-card"><span>DEVELOPMENT</span><h3>{c.campLabel}</h3><p>{c.campBody}</p><a className="button button-light" href={localePath(locale,"camp")}>{c.campLabel}<ArrowRight/></a></article><article className="homecourt-plan-card"><span>CHALLENGE</span><h3>{c.unitedLabel}</h3><p>{c.unitedBody}</p><a className="button button-dark" href={localePath(locale,"united")}>{c.unitedLabel}<ArrowRight/></a></article></div></section>
    <section className="homecourt-product-preview section-pad" id="open-camps"><div className="section-head"><div><p className="section-index">OPEN NOW / VERIFIED</p><h2>{c.openTitle}</h2></div><p>{c.openBody}</p></div>{open.length?<div className="homecourt-preview-grid">{open.map(p=><article key={p.id}><CalendarDays/><span>{p.category}</span><h3>{tr(p.title,locale)}</h3><p>{tr(p.date,locale)} · {tr(p.place,locale)}</p><p>{tr(p.audience,locale)}</p><p>{tr(p.price,locale)}</p><a className="button button-dark" href={p.applicationUrl} target="_blank" rel="noreferrer">{c.apply}<ArrowRight/></a></article>)}</div>:<div className="homecourt-private-note"><CalendarDays/><div><strong>{c.noOpen}</strong></div></div>}<div className="homecourt-launch-actions"><a className="button button-light" href={localePath(locale,"opportunities")}>{c.all}<ArrowRight/></a><a className="button button-dark" href={localePath(locale,"my-homecourt")}>{c.home}<ArrowRight/></a></div></section>
    <section className="homecourt-plan-separation section-pad"><div className="homecourt-plan-intro"><p className="section-index">FAQ</p><h2>{c.faqTitle}</h2></div><div className="homecourt-plan-grid">{c.faq.map(([q,a])=><article className="homecourt-plan-card" key={q}><Check/><h3>{q}</h3><p>{a}</p></article>)}</div></section>
    <section className="network-release section-pad"><ShieldCheck/><div><p className="section-index">AFTER CAMP</p><h2>{locale==="ja"?"参加して終わりにしない。":locale==="zh-tw"?"不讓參加在活動結束時停止。":locale==="ko"?"참가로 끝내지 않습니다.":"Do not let the camp end at checkout."}</h2><p>{locale==="ja"?"参加履歴、振り返り、次に試すことをMY HOME COURTに残し、普段の練習へつなげます。":locale==="zh-tw"?"把參加紀錄、反思與下一步留在 MY HOME COURT，再帶回日常訓練。":locale==="ko"?"참가 이력, 회고와 다음 과제를 MY HOME COURT에 남겨 일상 훈련으로 연결합니다.":"Keep participation, reflection and the next action in MY HOME COURT and bring it back to everyday practice."}</p></div><a className="button button-member" href={localePath(locale,"my-homecourt")}>{c.home}<ArrowRight/></a></section>
  </SiteFrame>;
}
