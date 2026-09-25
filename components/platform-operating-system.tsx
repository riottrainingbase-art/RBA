import {ArrowRight,BookOpen,CalendarDays,CreditCard,Globe2,GraduationCap,HeartHandshake,IdCard,ShieldCheck,Users} from "lucide-react";
import {Locale,localePath,SiteFrame} from "./site-frame";

const copy={
 ja:{kicker:"RBA DEVELOPMENT PLATFORM",title:"育成を、単発で終わらせない。",lead:"RBAは、選手・保護者・指導者・チーム・主催者・海外アカデミーを、学び、活動機会、成長記録、安全管理、申込・決済でつなぐ育成プラットフォームです。",body:"クリニックに参加して終わりではなく、今の自分を振り返り、次の目標を決め、必要な機会を探し、経験を記録して、また次へ進む。その流れを一つのRBA IDでつなぎます。",modules:"PLATFORM CORE",modulesTitle:"一つのRBA IDから、必要な情報と機能へ。",roles:"FOR EVERY ROLE",rolesTitle:"立場に合わせて、必要な機能を使える。",trust:"TRUST LAYER",trustTitle:"広げる前に、安全と信頼を整える。",cta:"MY HOME COURTを始める",find:"育成機会を探す"},
 en:{kicker:"RBA DEVELOPMENT PLATFORM",title:"Turn development into one connected journey.",lead:"RBA connects players, families, coaches, teams, organisers and international academies through identity, learning, opportunity, safety and commerce.",body:"A clinic should not be the end. Understand where you are, choose the next target, find the right experience, record what happened and keep moving. One RBA ID connects that loop.",modules:"PLATFORM CORE",modulesTitle:"One RBA ID. One development system.",roles:"FOR EVERY ROLE",rolesTitle:"Different roles, one development infrastructure.",trust:"TRUST LAYER",trustTitle:"Design trust before scale.",cta:"Start MY HOME COURT",find:"Find opportunities"},
 "zh-tw":{kicker:"RBA DEVELOPMENT PLATFORM",title:"讓培育不再是單點，而是一條完整路徑。",lead:"RBA以身份、學習、機會、安全與付款，連結球員、家長、教練、球隊、主辦方與海外學院。",body:"參加訓練營不是終點。了解現在的位置、決定下一個目標、找到合適機會、留下經驗，再走向下一步。RBA ID把這個循環連起來。",modules:"PLATFORM CORE",modulesTitle:"從一個RBA ID連結整個培育系統。",roles:"FOR EVERY ROLE",rolesTitle:"不同角色，共用同一套培育基礎。",trust:"TRUST LAYER",trustTitle:"在規模之前先建立信任。",cta:"開始MY HOME COURT",find:"尋找培育機會"},
 ko:{kicker:"RBA DEVELOPMENT PLATFORM",title:"육성을 점이 아닌 하나의 여정으로.",lead:"RBA는 선수, 보호자, 코치, 팀, 주최자와 해외 아카데미를 ID, 학습, 기회, 안전, 결제로 연결합니다.",body:"클리닉 참가가 끝이 아닙니다. 현재를 알고, 다음 목표를 정하고, 필요한 기회를 찾고, 경험을 기록해 다시 다음으로 갑니다. 하나의 RBA ID가 이 흐름을 연결합니다.",modules:"PLATFORM CORE",modulesTitle:"하나의 RBA ID에서 모든 육성으로.",roles:"FOR EVERY ROLE",rolesTitle:"역할은 달라도 같은 육성 기반을 사용합니다.",trust:"TRUST LAYER",trustTitle:"규모보다 먼저 신뢰를 설계합니다.",cta:"MY HOME COURT 시작",find:"육성 기회 찾기"}
} as const;

const jaModuleDescriptions={
 "RBA ID":"本人確認と役割の基盤",
 "MY HOME COURT":"参加・振り返り・目標の記録",
 "OPPORTUNITIES":"育成機会の検索・申込",
 "TEAM HOME":"チーム運営と日々の連絡",
 "COACH EDUCATION":"指導者の継続学習",
 "GLOBAL NETWORK":"国内外の交流・連携",
 "COMMERCE":"申込・決済・契約管理",
 "SAFEGUARDING":"安全管理と同意",
 "IMPACT":"活動実績と再投資"
} as const;

const modules=[
 ["RBA ID",IdCard,"Identity",["my-homecourt"]],
 ["MY HOME COURT",BookOpen,"Development record",["my-homecourt"]],
 ["OPPORTUNITIES",CalendarDays,"Discovery & applications",["opportunities"]],
 ["TEAM HOME",Users,"Team operations",["my-homecourt"]],
 ["COACH EDUCATION",GraduationCap,"Coach development",["d-hub"]],
 ["GLOBAL NETWORK",Globe2,"International exchange",["international"]],
 ["COMMERCE",CreditCard,"Registration & billing",["payments"]],
 ["SAFEGUARDING",ShieldCheck,"Safety & consent",["policies"]],
 ["IMPACT",HeartHandshake,"Access & reinvestment",["impact"]]
] as const;

const roleCopy={
 ja:[["PLAYER","参加・振り返り・目標・次の機会"],["PARENT","子どもごとの記録・予定・申込"],["COACH","練習設計・学び・現場での実践"],["TEAM","予定・出欠・連絡・集金"],["ORGANIZER","開催・募集・運営・決済"],["GLOBAL PARTNER","日本との試合・キャンプ・指導者交流"]],
 en:[["PLAYER","Participate, reflect, set goals, move next"],["PARENT","Records, schedules and applications by child"],["COACH","Practice design, learning and implementation"],["TEAM","Schedule, attendance, communication, collections"],["ORGANIZER","Create, recruit, operate and settle"],["GLOBAL PARTNER","Games, camps and coach exchange with Japan"]],
 "zh-tw":[["PLAYER","參加、回顧、目標與下一步"],["PARENT","孩子個別紀錄、行程與報名"],["COACH","訓練設計、學習與現場實踐"],["TEAM","行程、出席、通知與收款"],["ORGANIZER","主辦、招募、運營與付款"],["GLOBAL PARTNER","與日本進行比賽、培育營與教練交流"]],
 ko:[["PLAYER","참가, 회고, 목표와 다음 기회"],["PARENT","아이별 기록, 일정과 신청"],["COACH","훈련 설계, 학습과 현장 실행"],["TEAM","일정, 출석, 공지와 회비"],["ORGANIZER","개최, 모집, 운영과 결제"],["GLOBAL PARTNER","일본과 경기, 캠프, 코치 교류"]]
} as const;

export function PlatformOperatingSystem({locale}:{locale:Locale}){
 const c=copy[locale];
 const trust=locale==="ja"?[
  ["CHILD SAFETY","未成年者と成人が無制限に直接やり取りする設計にはしません。"],
  ["CONSENT","写真・動画の利用同意、保護者同意、連絡設定を分けて管理します。"],
  ["VERIFICATION","本人が登録した記録と、RBAが確認した参加記録を区別します。"],
  ["TRANSPARENCY","未確定の機会を、確定済みとして掲載しない。"],
  ["DATA MINIMIZATION","育成に不要な個人情報を集めすぎない。"],
  ["CHOICE","メール配信、メンバーシップ、海外・国際交流への参加は、本人や家庭が選べます。"]
 ]:[
  ["CHILD SAFETY","No unrestricted adult-to-minor messaging by default."],
  ["CONSENT","Separate media, guardian and communication consent."],
  ["VERIFICATION","Distinguish self-reported and RBA-verified records."],
  ["TRANSPARENCY","Never present unconfirmed opportunities as confirmed."],
  ["DATA MINIMIZATION","Collect only what development actually needs."],
  ["CHOICE","Email, paid plans and international paths remain optional."]
 ];
 return <SiteFrame locale={locale} languagePage="platform"><div className="platform-os">
  <section className="platform-os-hero section-pad"><a className="back-link" href={localePath(locale)}>← RBA</a><p className="section-index inverse">{c.kicker}</p><h1>{c.title}</h1><p>{c.lead}</p><p>{c.body}</p><div><a className="button button-light" href={localePath(locale,"my-homecourt")}>{c.cta}<ArrowRight/></a><a className="text-link light-link" href={localePath(locale,"opportunities")}>{c.find}<ArrowRight/></a></div></section>
  {locale==="ja"?<section className="platform-os-trust section-pad"><p className="section-index">NOT ANOTHER SOCIAL NETWORK</p><h2>SNSで知った情報を、次の行動につなげる。</h2><div>
    <article><BookOpen/><strong>SNS</strong><p>知る、見る、共有する。新しい情報と出会う入口。</p></article>
    <article><IdCard/><strong>RBA ID</strong><p>選手・保護者・指導者それぞれの立場と利用履歴をつなぐ共通ID。</p></article>
    <article><CalendarDays/><strong>MY HOME COURT</strong><p>参加履歴、保存した活動、Basketball Passport、学び、予定、次の機会をまとめて確認できる自分専用のホーム。</p></article>
    <article><ArrowRight/><strong>NEXT ACTION</strong><p>投稿への反応で終わらず、実際の参加・学習・振り返りへ進む。</p></article>
  </div></section>:null}
  <section className="platform-os-core section-pad"><p className="section-index">{c.modules}</p><h2>{c.modulesTitle}</h2><div className="platform-core-grid">{modules.map(([name,Icon,desc,[path]])=><a key={name} href={localePath(locale,path as never)}><Icon/><span>{name}</span><strong>{desc}</strong><ArrowRight/></a>)}</div></section>
  <section className="platform-os-roles section-pad"><p className="section-index inverse">{c.roles}</p><h2>{c.rolesTitle}</h2><div>{roleCopy[locale].map(([role,desc])=><article key={role}><strong>{role}</strong><span>{desc}</span></article>)}</div></section>
  <section className="platform-os-trust section-pad"><p className="section-index">{c.trust}</p><h2>{c.trustTitle}</h2><div>{trust.map(([name,body])=><article key={name}><ShieldCheck/><strong>{name}</strong><p>{body}</p></article>)}</div></section>
 </div></SiteFrame>
}
