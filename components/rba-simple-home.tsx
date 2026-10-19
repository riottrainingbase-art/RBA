import { CurrentProgrammeHighlights } from "./current-programme-highlights";
import { RbaJapanProof } from "./rba-japan-proof";
import { RbaDevelopmentOverview, rbaDefinition } from "./rba-development-overview";
import { SiteFrame, type Locale, localePath } from "./site-frame";
import { RbaFieldUpdates } from "./rba-field-updates";

type HomeCopy = {
  eyebrow:string; title:string; intro:string; primary:string; secondary:string;
  start:string; startIntro:string; routes:[string,string,string][]; 
  programmeTitle:string; programmeIntro:string; programmeNames:[string,string,string][];
  memberTitle:string; memberBody:string; memberLink:string; policy:string;
};
const copy:Record<Locale,HomeCopy>={
  ja:{
    eyebrow:"RIOT BASKETBALL ACADEMY / SENDAI · JAPAN",
    title:rbaDefinition["ja"].title,
    intro:rbaDefinition["ja"].intro,
    primary:"募集中の活動を見る",secondary:"RBAについて",
    start:"何をお探しですか？",startIntro:"まずは、目的に合うページからご覧ください。",
    routes:[
      ["参加する","クリニック、キャンプ、スクール、3x3、遠征","opportunities"],
      ["学ぶ","選手・保護者・指導者向けの育成記事","journal"],
      ["開催・相談する","チームでの指導、地域開催、協賛・連携","organizer"],
      ["海外とつながる","日本とアジアのキャンプ、チーム・指導者交流","international"],
    ],
    programmeTitle:"RBAの主な活動",programmeIntro:"クリニック、遠征、継続学習など、目的に合わせて活動を選べます。",
    programmeNames:[
      ["BACKBONE","クリニックと3x3を通じて学ぶ","/backbone"],
      ["RBA UNITED","大会や遠征に向けたチーム活動","/ja/united"],
      ["D-HUB","選手・指導者の継続的な学び","/ja/d-hub"],
    ],
    memberTitle:"学びや活動を、ひとつの場所に。",memberBody:"MY HOME COURTでは、RBAの活動情報や育成コンテンツを確認できます。無料で始められ、有料プランへの加入は任意です。",
    memberLink:"MY HOME COURTを見る",policy:"参加費や申込条件は、各活動の公式案内をご確認ください。",
  },
  en:{
    eyebrow:"RIOT BASKETBALL ACADEMY / SENDAI · JAPAN",
    title:rbaDefinition["en"].title,
    intro:rbaDefinition["en"].intro,
    primary:"See current programmes",secondary:"About RBA",
    start:"What are you looking for?",startIntro:"Choose the route that fits what you want to do.",
    routes:[
      ["Take part","Clinics, camps, schools, 3x3 and team trips","opportunities"],
      ["Learn","Articles for players, families and coaches","journal"],
      ["Host or partner","Team clinics, local events and partnerships","organizer"],
      ["Connect internationally","Camps, teams and coach exchanges across Asia","international"],
    ],
    programmeTitle:"Our programmes",programmeIntro:"Different formats, one RBA approach to player development.",
    programmeNames:[
      ["BACKBONE","Clinics and 3x3 learning","/backbone"],
      ["RBA UNITED","Teams for tournaments and trips","/united"],
      ["D-HUB","Ongoing learning for players and coaches","/d-hub"],
    ],
    memberTitle:"Keep your learning in one place.",memberBody:"MY HOME COURT brings together RBA opportunities and learning resources. You can start for free; paid membership is optional.",
    memberLink:"Open MY HOME COURT",policy:"Check each programme's official page for fees, eligibility and booking terms.",
  },
  "zh-tw":{
    eyebrow:"RIOT BASKETBALL ACADEMY / SENDAI · JAPAN",
    title:rbaDefinition["zh-tw"].title,
    intro:rbaDefinition["zh-tw"].intro,
    primary:"查看近期活動",secondary:"認識RBA",
    start:"您想了解什麼？",startIntro:"依照您的需求，從這裡開始。",
    routes:[
      ["參加活動","訓練營、3x3、學校課程與球隊交流","opportunities"],
      ["閱讀學習","給球員、家長與教練的文章","journal"],
      ["邀請RBA合作","球隊訓練、在地活動與合作提案","organizer"],
      ["日本與海外交流","日本營隊、球隊及教練交流","international"],
    ],
    programmeTitle:"RBA的活動",programmeIntro:"不同的活動名稱，都是RBA培育計畫的一部分。",
    programmeNames:[
      ["BACKBONE","透過訓練營與3x3學習","/backbone"],
      ["RBA UNITED","以球隊形式參加比賽與交流","/zh-tw/united"],
      ["D-HUB","球員與教練的持續學習","/zh-tw/d-hub"],
    ],
    memberTitle:"把活動與學習資訊放在一起。",memberBody:"MY HOME COURT提供RBA的活動資訊與學習內容。可以先免費使用，是否加入付費方案由您自行決定。",
    memberLink:"前往MY HOME COURT",policy:"參加資格、費用與報名條件，請以各活動的正式公告為準。",
  },
  ko:{
    eyebrow:"RIOT BASKETBALL ACADEMY / SENDAI · JAPAN",
    title:rbaDefinition["ko"].title,
    intro:rbaDefinition["ko"].intro,
    primary:"모집 중인 활동 보기",secondary:"RBA 소개",
    start:"무엇을 찾고 계신가요?",startIntro:"목적에 맞는 페이지에서 시작해 보세요.",
    routes:[
      ["참가하기","클리닉, 캠프, 스쿨, 3x3, 원정","opportunities"],
      ["배우기","선수·보호자·지도자를 위한 글","journal"],
      ["개최·협력 문의","팀 지도, 지역 행사, 파트너십","organizer"],
      ["해외 교류","일본과 아시아의 캠프, 팀·지도자 교류","international"],
    ],
    programmeTitle:"RBA의 주요 활동",programmeIntro:"형태는 달라도 모두 RBA의 육성 활동입니다.",
    programmeNames:[
      ["BACKBONE","클리닉과 3x3을 통한 학습","/backbone"],
      ["RBA UNITED","대회와 원정에 참가하는 팀 활동","/ko/united"],
      ["D-HUB","선수와 지도자를 위한 지속 학습","/ko/d-hub"],
    ],
    memberTitle:"활동과 학습을 한곳에서.",memberBody:"MY HOME COURT에서 RBA의 활동 정보와 학습 자료를 볼 수 있습니다. 무료로 시작할 수 있으며 유료 가입은 선택 사항입니다.",
    memberLink:"MY HOME COURT 보기",policy:"참가비, 대상 및 신청 조건은 각 활동의 공식 안내를 확인해 주세요.",
  },
};
export function RbaSimpleHome({locale}:{locale:Locale}){
  const c=copy[locale];
  const home=localePath(locale,"my-homecourt");
  return <SiteFrame locale={locale}>
    <div className="bg-[#f4f1eb] text-[#171717]" style={{backgroundColor:"#f4f1eb",color:"#171717"}}>
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <section className="border-b border-[#c9c6c0] pb-16 pt-20 sm:pb-24 sm:pt-28">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#666]">{c.eyebrow}</p>
          <h1 className="mt-8 max-w-[900px] text-[clamp(39px,6vw,80px)] font-semibold leading-[1.23] tracking-[-0.065em]">{c.title}</h1>
          <p className="mt-7 max-w-[690px] text-base leading-8 text-[#555]">{c.intro}</p>
          <div className="mt-8 flex flex-wrap gap-7">
            <a href={localePath(locale,"opportunities")} className="inline-flex min-h-12 items-center border-b-2 border-[#171717] text-sm font-bold">{c.primary} ↗</a>
            <a href={localePath(locale,"about")} className="inline-flex min-h-12 items-center border-b border-[#999] text-sm font-semibold">{c.secondary} ↗</a>
          </div>
        </section>

        <CurrentProgrammeHighlights locale={locale}/>
        <RbaJapanProof locale={locale}/>
        <RbaDevelopmentOverview locale={locale}/>
        {locale==="ja" ? <section className="border-b border-[#c9c6c0] py-12 sm:py-16" aria-labelledby="torsten-home-clinic">
          <div className="relative overflow-hidden bg-[#161719] p-7 text-[#fff] sm:p-11">
            <p className="text-[11px] font-bold tracking-[0.20em] text-[#e9a16b]">RBA COACH EDUCATION / 2026.11.25 WED</p>
            <h2 id="torsten-home-clinic" className="mt-5 max-w-[800px] text-[clamp(30px,5vw,52px)] font-bold leading-tight tracking-[-0.05em]">
              練習では入る。<br/><span className="text-[#f39a5c]">試合では打てない。</span>
            </h2>
            <p className="mt-5 max-w-[740px] text-sm leading-7 text-[#ddd]">シュートフォームだけでなく、打つ前の判断、スペーシング、練習設計まで。トーステン・ロイブル氏と考えるオンライン指導者講習。日本語逐次通訳付き。</p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold">
              <span>11/25（水）20:00〜21:30</span><span>LIVE 3,300円（税込）</span><span>録画30日 4,400円（税込）</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/ja/events/torsten-loibl-online-clinic" className="inline-flex min-h-12 items-center justify-center bg-[#e86925] px-6 text-sm font-bold text-[#151515] hover:bg-[#fa9651]">講習の内容・申込へ ↗</a>
              <a href="/ja/coach/shooting-check" className="inline-flex min-h-12 items-center justify-center border border-[#b9b9b9] px-6 text-sm font-bold text-white hover:bg-[#303135]">まず無料・2分で練習を振り返る ↗</a>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-[#aaa]">主催：Riot Basketball Academy。無料チェックはRBA独自制作・登録不要です。フォーム送信後、決済完了で受講確定となります。</p>
          </div>
        </section> : null}
        {locale==="ja" ? <section className="border-b border-[#c9c6c0] py-12 sm:py-16" aria-labelledby="home-latest-202610">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-[11px] font-bold tracking-[0.18em] text-[#666]">LATEST / OCTOBER 2026</p><h2 id="home-latest-202610" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">最近のRBAの活動</h2></div>
            <a href="/ja/updates/2026-october" className="border-b border-[#171717] pb-1 text-sm font-bold">活動報告を読む ↗</a>
          </div>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[#555]">台湾・マレーシアでの現場の学びと、次の指導者講習。実施した活動と、これからの計画を区別してお知らせします。</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <a href="/ja/updates/2026-october#taiwan" className="group border-t border-[#aaa7a1] py-5 hover:bg-[#eae6de]">
              <span className="text-[11px] font-semibold text-[#666]">2026.10 / 実施した活動</span>
              <h3 className="mt-2 text-lg font-bold">台湾での育成交流 ↗</h3>
              <p className="mt-2 text-sm leading-6 text-[#555]">現地の選手・指導者との交流。2027年の相互交流は準備・協議中です。</p>
            </a>
            <a href="/ja/updates/2026-october#malaysia" className="group border-t border-[#aaa7a1] py-5 hover:bg-[#eae6de]">
              <span className="text-[11px] font-semibold text-[#666]">2026.10 / 実施した活動</span>
              <h3 className="mt-2 text-lg font-bold">マレーシア・ペナン ↗</h3>
              <p className="mt-2 text-sm leading-6 text-[#555]">現地の協力を得て指導者講習を実施。今後の開催は調整中です。</p>
            </a>
            <a href="/ja/events/torsten-loibl-online-clinic" className="group border-t border-[#aaa7a1] py-5 hover:bg-[#eae6de]">
              <span className="text-[11px] font-semibold text-[#666]">2026.11.25 / 申込受付中</span>
              <h3 className="mt-2 text-lg font-bold">Torsten Loibl Vol.2 ↗</h3>
              <p className="mt-2 text-sm leading-6 text-[#555]">Zoom・日本語逐次通訳。LIVE税込3,300円／録画30日税込4,400円。</p>
            </a>
          </div>
        </section> : null}
        {locale!=="ja" ? <RbaFieldUpdates locale={locale} placement="home" /> : null}
        <section className="py-14 sm:py-20" aria-labelledby="home-start">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#666]">START HERE</p>
          <h2 id="home-start" className="mt-3 text-3xl font-bold tracking-tight">{c.start}</h2>
          <p className="mt-2 text-sm text-[#666]">{c.startIntro}</p>
          <div className="mt-8 grid grid-cols-1 border-t border-[#c1beb7] sm:grid-cols-2">
            {c.routes.map(([label,description,route],index)=><a key={route} href={localePath(locale,route as "opportunities"|"journal"|"organizer"|"international")} className="group flex min-h-36 flex-col justify-between border-b border-[#c1beb7] px-2 py-6 transition-colors hover:bg-[#eae6de] sm:px-6">
              <span className="text-xs font-semibold text-[#777]">{String(index+1).padStart(2,"0")} <span aria-hidden="true">↗</span></span>
              <div><h3 className="mt-4 text-2xl font-bold">{label}</h3><p className="mt-1 text-sm text-[#606060]">{description}</p></div>
            </a>)}
          </div>
        </section>
        <section className="border-t border-[#d4d1ca] py-12 sm:py-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#666]">RBA PROGRAMMES</p>
          <h2 className="mt-3 text-2xl font-bold">{c.programmeTitle}</h2>
          <p className="mt-2 text-sm text-[#666]">{c.programmeIntro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {c.programmeNames.map(([name,detail,href])=><a key={name} href={href} className="border-t border-[#aaa7a1] py-4">
              <strong className="text-base">{name} ↗</strong><p className="mt-1 text-sm text-[#666]">{detail}</p>
            </a>)}
          </div>
        </section>
        <section className="border-t border-[#d4d1ca] py-12 sm:py-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#666]">MY HOME COURT</p>
          <h2 className="mt-3 text-2xl font-bold">{c.memberTitle}</h2>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[#555]">{c.memberBody}</p>
          <a href={home} className="mt-6 inline-flex min-h-11 items-center border-b border-[#171717] text-sm font-bold">{c.memberLink} ↗</a>
        </section>
        <p className="border-t border-[#d4d1ca] py-8 text-xs text-[#666]">{c.policy}</p>
      </div>
    </div>
  </SiteFrame>;
}
