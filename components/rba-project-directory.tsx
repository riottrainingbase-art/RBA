import { ArrowRight } from "lucide-react";
import { localePath, type Locale, type LanguagePage } from "./site-frame";

type Project = { name:string; path:LanguagePage | string; local?:boolean; copy:readonly [string,string,string,string] };
const projects:Project[] = [
  {name:"RBA CLINIC / CAMP",path:"opportunities",copy:["全国のクリニック・キャンプの対象、日程、申込条件。","Find clinics and camps, dates and registration details.","查詢各地訓練課程、營隊及報名條件。","클리닉·캠프 일정과 신청 조건을 확인합니다."]},
  {name:"BACKBONE / 3x3",path:"/ja/backbone",local:true,copy:["3x3で観察・距離・判断・協力を学ぶ育成実践。","Development through 3x3: perception, spacing and decisions.","透過3x3培養觀察、空間、判斷與合作。","3x3를 통해 관찰·간격·판단·협력을 배웁니다."]},
  {name:"GREAM",path:"/ja/gream",local:true,copy:["地域の継続育成クラブ。仙台・秋田・沖縄の案内。","Local club development: Sendai, Akita and Okinawa.","地方長期育成俱樂部。仙台、秋田、沖繩資訊。","센다이·아키타·오키나와 지역 육성 클럽."]},
  {name:"RBA UNITED",path:"united",copy:["所属を変えず、期間限定チームで大会・交流へ。","Join time-limited exchange teams without leaving your club.","不離開原球隊，以限定團隊參與交流。","소속을 유지하며 기간 한정 팀으로 교류합니다."]},
  {name:"MY HOME COURT",path:"my-homecourt",copy:["無料RBA IDで活動・経験・学びをつなぐ。","Free RBA ID for opportunities, experience and learning.","免費RBA ID連結活動、經驗及學習。","무료 RBA ID로 활동·경험·학습을 연결합니다."]},
  {name:"HOMECOURT PLUS",path:"home-court",copy:["月額の任意プラン。学び・週次実践・振り返り。","Optional membership for ongoing learning and reflection.","自選月費方案，持續學習、實踐與反思。","선택형 월간 학습·실천·회고 멤버십."]},
  {name:"D-HUB",path:"d-hub",copy:["指導者・選手がそれぞれ継続する実践教育。","Separate learning programmes for coaches and players.","教練與球員各自的持續實踐教育。","지도자와 선수를 위한 지속 실천 교육."]},
  {name:"RBA JOURNAL",path:"journal",copy:["無料記事と育成の考え方。学びの入口。","Free articles and development perspectives.","免費文章及培育觀點。","무료 글과 육성 관점."]},
  {name:"RBA GLOBAL NETWORK",path:"international",copy:["海外交流・日本受け入れ・アカデミー間連携。","International exchanges and academy partnerships.","國際交流、日本接待及學院合作。","국제 교류·일본 방문·아카데미 협력."]},
  {name:"RBA / RTB BUSINESS",path:"/ja/business",local:true,copy:["企業研修・地域イベント・チーム支援の相談。","Corporate training, community events and team support.","企業培訓、社區活動及球隊支援。","기업 연수·지역 행사·팀 지원 상담."]},
  {name:"RBA PARTNERS",path:"partners",copy:["企業協賛・広告と育成支援の案内。","Corporate sponsorship, advertising and development support.","企業贊助、廣告與育成支援。","기업 후원·광고 및 육성 지원."]},
  {name:"RBA STORE",path:"/ja/store",local:true,copy:["公式ウェア・発売情報。販売状況は商品ページで確認。","Official apparel and release updates; check availability.","官方服飾與發售資訊，請確認銷售狀態。","공식 의류 및 출시 정보, 판매 상태 확인."]},
];
const labels = {
  ja: {title:"RBAの活動とサービス", groups:["参加する","学ぶ・記録する","連携・応援する"], jp:"日本語"},
  en: {title:"Explore RBA", groups:["Play","Learn & track","Partner & support"], jp:"Japanese"},
  "zh-tw": {title:"探索 RBA",groups:["參加活動","學習與記錄","合作與支持"],jp:"日文"},
  ko: {title:"RBA 활동 및 서비스",groups:["참가","학습·기록","협력·후원"],jp:"일본어"},
} as const;
const groups = [
  ["opportunities", "/ja/backbone", "/ja/gream", "united", "international"],
  ["my-homecourt", "home-court", "d-hub", "journal"],
  ["/ja/business", "partners", "/ja/store"],
] as const;
export function RbaProjectDirectory({locale}:{locale:Locale}){
  const c=labels[locale];
  const i=locale==="ja"?0:locale==="en"?1:locale==="zh-tw"?2:3;
  return <section id="rba-project-directory" className="section-pad" style={{background:"#F6F5F1",color:"#142437"}}>
    <h2 style={{fontSize:"clamp(1.6rem,4vw,2.6rem)",fontFamily:"Georgia, Yu Mincho, serif",fontWeight:600,marginBottom:28}}>{c.title}</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,280px),1fr))",gap:24}}>
      {groups.map((paths,index)=><div key={c.groups[index]} style={{borderTop:"1px solid #aa9576",paddingTop:16}}>
        <h3 style={{fontSize:"1.25rem",marginBottom:12,fontWeight:700}}>{c.groups[index]}</h3>
        {projects.filter(p=>(paths as readonly string[]).includes(p.path)).map(p=><a key={p.name} href={p.local?p.path:localePath(locale,p.path as LanguagePage)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,padding:"14px 0",borderBottom:"1px solid #d8d2c7",textDecoration:"none",color:"#142437",minHeight:64}}>
          <div><strong style={{fontSize:"1rem",fontWeight:700}}>{p.name}</strong>{p.local&&locale!=="ja"&&<small style={{marginInlineStart:8}}>{c.jp}</small>}<p style={{fontSize:13,lineHeight:1.55,margin:"4px 0 0"}}>{p.copy[i]}</p></div><ArrowRight size={16} style={{flexShrink:0,color:"#695332"}} aria-hidden="true"/>
        </a>)}
      </div>)}
    </div>
  </section>;
}
