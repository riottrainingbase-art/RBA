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
    title:"無料で使いながら、必要になったらPLUSへ。",
    body:"RBA IDは無料のまま使えます。HOMECOURT PLUSは、今週試すことや振り返りを毎週残したい方向けの月額プランです。",
    locked:"PLUSで増えること",
    unlock:"HOMECOURT PLUSを見る",
    active:"HOMECOURT PLUS",
    activeTitle:"今週やること",
    activeBody:"全部使う必要はありません。今週試したいことを一つ決め、練習や試合でやってみて、あとから振り返ります。",
    tools:"MEMBER TOOLS",
    toolsTitle:"記録を見ながら、今週やることを決める。",
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
    [Target,locale==="ja"?"WEEKLY DEVELOPMENT｜今週のテーマ":"WEEKLY DEVELOPMENT",locale==="ja"?"今週のテーマ、実際に試すこと、振り返りをまとめて残せます。":"Connect a weekly theme, action, reflection and next step."],
    [Gauge,locale==="ja"?"CONDITION｜7日間の状態":"CONDITION TREND",locale==="ja"?"体調・疲労・痛み・睡眠の7日間の推移を確認しながら、練習や予定を調整できます。":"Review seven-day condition trends alongside your schedule."],
    [CalendarDays,locale==="ja"?"SMART PREP｜試合・遠征準備":"SMART PREP",locale==="ja"?"大会や遠征から逆算して、準備・回復・持ち物・振り返りを整理・管理できます。":"Work backward from tournaments and trips to manage preparation."],
    [BookOpen,locale==="ja"?"LEARNING｜会員向け学習":"MEMBER LEARNING",locale==="ja"?"会員向けの記事やガイドを読み、次の練習で試すことを決めます。":"Use member learning and turn it into the next practice."],
    [Globe2,locale==="ja"?"NEXT OPPORTUNITY｜活動を探す":"DEVELOPMENT HORIZON",locale==="ja"?"地域・全国・アジア・世界から、参加したい活動を探します。":"Set the right horizon from local to global opportunities."],
    [History,locale==="ja"?"MONTHLY REVIEW｜月次振り返り":"MONTHLY REVIEW",locale==="ja"?"参加したこと、保存した活動、読んだ記事、目標を月ごとに振り返ります。":"Review participation, saves, learning and goals each month."],
  ] as const;

  if(!active)return <section className="member-first3">
    <div className="member-first3-head"><div><span>{c.eyebrow}</span><h2>{c.title}</h2><p>{c.body}</p></div><Crown size={38}/></div>
    <div className="member-first3-grid">{features.slice(0,3).map(([Icon,title,body])=><article key={title}><Icon/><span>PLUS FEATURE</span><strong>{title}</strong><p>{body}</p></article>)}</div>
    <div className="member-next-step"><div><Sparkles/><span>{c.locked}</span><strong>{locale==="ja"?"月額3,300円・いつでも解約可能":"¥3,300 / month"}</strong><p>{locale==="ja"?"RBA IDの機能はそのまま。毎週のテーマや振り返りまで使いたい方はHOMECOURT PLUSを利用できます。":"Keep your RBA ID; upgrade only if you want the full development loop."}</p></div><a href={locale==="ja"?"/ja/homecourt-plus":`/api/commerce/checkout/homecourt-monthly?locale=${locale}`}>{c.unlock}<ArrowRight/></a></div>
  </section>;

  return <section className="member-first3">
    <div className="member-first3-head"><div><span>{c.active}</span><h2>{c.activeTitle}</h2><p>{c.activeBody}</p></div><Crown size={38}/></div>
    <div className="member-first3-grid">
      <a href={`${prefix}/my-homecourt/app/learn`}><BookOpen/><span>01 / LEARN</span><strong>{roleTheme}</strong><p>{locale==="ja"?"今週必要なテーマを一つだけ選びます。":"Pick one useful theme for this week."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/calendar`}><CalendarDays/><span>02 / PREP</span><strong>{nextLabel}</strong><p>{locale==="ja"?"次の予定を見ながら、持ち物や移動、休養などを確認します。":"Prepare from your next scheduled event."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/home#passport-title`}><History/><span>03 / REFLECT</span><strong>{locale==="ja"?`記録 ${historyCount}件`:`${historyCount} records`}</strong><p>{locale==="ja"?"できたこと・課題・次に試すことを残します。":"Keep what worked, what did not and what comes next."}</p><ArrowRight/></a>
      <a href={`${prefix}/opportunities`}><Compass/><span>04 / NEXT</span><strong>{locale==="ja"?`保存 ${savedCount}件 / 閲覧 ${viewCount}件`:`${savedCount} saved`}</strong><p>{locale==="ja"?`${region||"全国"}から、参加してみたい活動を探します。`:"Choose the next opportunity that fits."}</p><ArrowRight/></a>
    </div>
    <div className="section-head"><div><p className="section-index">{c.tools}</p><h2>{c.toolsTitle}</h2></div></div>
    <div className="homecourt-preview-grid">
      {features.map(([Icon,title,body],index)=><article key={title}><Icon/><span>{String(index+1).padStart(2,"0")} / PLUS</span><h3>{title}</h3><p>{body}</p></article>)}
      <article><Target/><span>07 / PLUS</span><h3>DEVELOPMENT REPORT</h3><p>{locale==="ja"?"週ごとのテーマ、月ごとの振り返り、参加履歴を1枚にまとめ、印刷・PDF保存できます。":"Combine weekly, monthly and participation records in one printable report."}</p><a className="text-link" href={`${prefix}/my-homecourt/app/report`}>{locale==="ja"?"レポートを開く":"Open report"}<ArrowRight size={16}/></a></article>
    </div>
  </section>;
}
