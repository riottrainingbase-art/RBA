import { ArrowRight, BookOpen, CalendarDays, Compass, Crown, Gauge, Globe2, History, Sparkles, Target } from "lucide-react";
import type { Locale } from "./site-frame";

type Props={
  locale:Locale;
  active:boolean;
  role:string;
  region?:string|null;
  historyCount:number;
  savedCount:number;
  viewCount:number;
  nextEvent?:{title:string;starts_at:string;venue?:string|null}|null;
};

const copy={
  ja:{
    eyebrow:"HOMECOURT PLUS / MEMBER",
    title:"有料版は、情報を増やすためではなく、育成を「続く流れ」に変えるためのプランです。",
    body:"RBA IDでは、「知る・探す・記録する」を一つにつなげます。HOMECOURT PLUSでは、その記録をもとに、今週のテーマ設定から実践、振り返り、次の挑戦までを自然につなげていきます。",
    locked:"月額HOMECOURTで使える機能",
    unlock:"HOMECOURTを始める",
    active:"HOMECOURT MEMBER",
    activeTitle:"今週の育成ループ",
    activeBody:"全部やる必要はありません。今週は一つ決めて、試して、振り返る。そこから次を選びます。",
    tools:"MEMBER TOOLS",
    toolsTitle:"記録を見るだけでなく、次の行動を決める。",
  },
  en:{eyebrow:"HOMECOURT PLUS / MEMBER",title:"Paid HOMECOURT deepens the development loop, not just the content library.",body:"RBA ID helps you discover and record. HOMECOURT turns that history into a weekly learn–try–reflect–choose cycle.",locked:"HOMECOURT member features",unlock:"Start HOMECOURT",active:"HOMECOURT MEMBER",activeTitle:"Your weekly development loop",activeBody:"Choose one thing, try it, reflect, then decide what comes next.",tools:"MEMBER TOOLS",toolsTitle:"Turn records into the next action."},
  "zh-tw":{eyebrow:"HOMECOURT PLUS / MEMBER",title:"付費版不是增加資訊，而是深化完整成長循環。",body:"RBA ID用來探索與紀錄；HOMECOURT把紀錄連到每週主題、實踐、反思與下一步。",locked:"HOMECOURT會員功能",unlock:"開始HOMECOURT",active:"HOMECOURT MEMBER",activeTitle:"本週成長循環",activeBody:"選一件事、實踐、反思，再決定下一步。",tools:"MEMBER TOOLS",toolsTitle:"把紀錄變成下一個行動。"},
  ko:{eyebrow:"HOMECOURT PLUS / MEMBER",title:"유료 HOMECOURT는 정보량이 아니라 성장의 흐름을 깊게 만듭니다.",body:"RBA ID로 찾고 기록하고, HOMECOURT에서 매주 배우기·시도하기·돌아보기·다음 선택으로 연결합니다.",locked:"HOMECOURT 회원 기능",unlock:"HOMECOURT 시작",active:"HOMECOURT MEMBER",activeTitle:"이번 주 성장 루프",activeBody:"한 가지를 정하고 시도하고 돌아본 뒤 다음을 선택합니다.",tools:"MEMBER TOOLS",toolsTitle:"기록을 다음 행동으로 바꿉니다."}
} as const;

export function HomecourtPremium({locale,active,role,region,historyCount,savedCount,viewCount,nextEvent}:Props){
  const c=copy[locale];
  const prefix=locale==="en"?"":`/${locale}`;
  const isCoach=role==="coach"||role==="admin";
  const isParent=role==="parent";
  const roleTheme=isCoach
    ? (locale==="ja"?"次の練習で観察することを一つ決める":"Choose one observation for your next practice")
    : isParent
      ? (locale==="ja"?"今週、子どもに任せることを一つ決める":"Choose one thing to leave to the player this week")
      : (locale==="ja"?"次の練習で試すプレーを一つ決める":"Choose one play to try next");
  const nextLabel=nextEvent?.title||(locale==="ja"?"次の活動はまだ未設定":"No next event set");

  const features=[
    [Target,locale==="ja"?"WEEKLY DEVELOPMENT":"WEEKLY DEVELOPMENT",locale==="ja"?"今週のテーマ設定から、実践、振り返り、次の一歩までを一つの流れでつなげます。":"Connect a weekly theme, action, reflection and next step."],
    [Gauge,locale==="ja"?"CONDITION TREND":"CONDITION TREND",locale==="ja"?"体調・疲労・痛み・睡眠の7日間の推移を確認しながら、練習や予定を調整できます。":"Review seven-day condition trends alongside your schedule."],
    [CalendarDays,locale==="ja"?"SMART PREP":"SMART PREP",locale==="ja"?"大会や遠征から逆算して、準備・回復・持ち物・振り返りを整理・管理できます。":"Work backward from tournaments and trips to manage preparation."],
    [BookOpen,locale==="ja"?"MEMBER LEARNING":"MEMBER LEARNING",locale==="ja"?"会員向けの学習コンテンツを読み、次の練習や実践につなげます。":"Use member learning and turn it into the next practice."],
    [Globe2,locale==="ja"?"DEVELOPMENT HORIZON":"DEVELOPMENT HORIZON",locale==="ja"?"地域・全国・アジア・世界から、自分に必要な範囲の機会を整理する。":"Set the right horizon from local to global opportunities."],
    [History,locale==="ja"?"MONTHLY REVIEW":"MONTHLY REVIEW",locale==="ja"?"参加・保存・学び・目標を月単位で振り返り、次の1か月を決める。":"Review participation, saves, learning and goals each month."],
  ] as const;

  if(!active)return <section className="member-first3">
    <div className="member-first3-head"><div><span>{c.eyebrow}</span><h2>{c.title}</h2><p>{c.body}</p></div><Crown size={38}/></div>
    <div className="member-first3-grid">{features.map(([Icon,title,body])=><article key={title}><Icon/><span>PLUS FEATURE</span><strong>{title}</strong><p>{body}</p></article>)}</div>
    <div className="member-next-step"><div><Sparkles/><span>{c.locked}</span><strong>{locale==="ja"?"月額3,300円・いつでも解約可能":"¥3,300 / month"}</strong><p>{locale==="ja"?"無料RBA IDの機能はそのまま。継続的に育成を記録・整理・実践したい方だけHOMECOURTへ。":"Keep your RBA ID; upgrade only if you want the full development loop."}</p></div><a href={`/api/commerce/checkout/homecourt-monthly?locale=${locale}`}>{c.unlock}<ArrowRight/></a></div>
  </section>;

  return <section className="member-first3">
    <div className="member-first3-head"><div><span>{c.active}</span><h2>{c.activeTitle}</h2><p>{c.activeBody}</p></div><Crown size={38}/></div>
    <div className="member-first3-grid">
      <a href={`${prefix}/my-homecourt/app/learn`}><BookOpen/><span>01 / LEARN</span><strong>{roleTheme}</strong><p>{locale==="ja"?"今週必要なテーマを一つだけ選びます。":"Pick one useful theme for this week."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/calendar`}><CalendarDays/><span>02 / PREP</span><strong>{nextLabel}</strong><p>{locale==="ja"?"次の予定から逆算して、準備とコンディションを整えます。":"Prepare from your next scheduled event."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/home#passport-title`}><History/><span>03 / REFLECT</span><strong>{locale==="ja"?`記録 ${historyCount}件`:`${historyCount} records`}</strong><p>{locale==="ja"?"できたこと・課題・次に試すことを残します。":"Keep what worked, what did not and what comes next."}</p><ArrowRight/></a>
      <a href={`${prefix}/opportunities`}><Compass/><span>04 / NEXT</span><strong>{locale==="ja"?`保存 ${savedCount}件 / 閲覧 ${viewCount}件`:`${savedCount} saved`}</strong><p>{locale==="ja"?`${region||"全国"}を起点に、次の挑戦を選びます。`:"Choose the next opportunity that fits."}</p><ArrowRight/></a>
    </div>
    <div className="section-head"><div><p className="section-index">{c.tools}</p><h2>{c.toolsTitle}</h2></div></div>
    <div className="homecourt-preview-grid">
      {features.map(([Icon,title,body],index)=><article key={title}><Icon/><span>{String(index+1).padStart(2,"0")} / PLUS</span><h3>{title}</h3><p>{body}</p></article>)}
      <article><Target/><span>07 / PLUS</span><h3>DEVELOPMENT REPORT</h3><p>{locale==="ja"?"週ごとのテーマ、月ごとの振り返り、参加履歴を1枚にまとめ、印刷・PDF保存できます。":"Combine weekly, monthly and participation records in one printable report."}</p><a className="text-link" href={`${prefix}/my-homecourt/app/report`}>{locale==="ja"?"レポートを開く":"Open report"}<ArrowRight size={16}/></a></article>
    </div>
  </section>;
}
