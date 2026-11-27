import Image from "next/image";
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
  {name:"RBA GLOBAL",path:"international",copy:["海外交流・日本受け入れ・アカデミー間連携。","International exchanges and academy partnerships.","國際交流、日本接待及學院合作。","국제 교류·일본 방문·아카데미 협력."]},
  {name:"RBA / RTB BUSINESS",path:"/ja/business",local:true,copy:["企業研修・地域イベント・チーム支援の相談。","Corporate training, community events and team support.","企業培訓、社區活動及球隊支援。","기업 연수·지역 행사·팀 지원 상담."]},
  {name:"RBA PARTNERS",path:"partners",copy:["企業協賛・広告と育成支援の案内。","Corporate sponsorship, advertising and development support.","企業贊助、廣告與育成支援。","기업 후원·광고 및 육성 지원."]},
  {name:"RBA STORE",path:"/ja/store",local:true,copy:["公式ウェア・発売情報。販売状況は商品ページで確認。","Official apparel and release updates; check availability.","官方服飾與發售資訊，請確認銷售狀態。","공식 의류 및 출시 정보, 판매 상태 확인."]},
];
const text={
 ja:{title:"RBAのすべての事業を、ひとつの入口から。",body:"参加する、学ぶ、成長を記録する、次の機会へ。無料RBA IDを中心に、自分に合う活動を選べます。各企画の申込・決済・利用権限は個別の条件に従います。",open:"詳しく見る",jp:"日本語案内",next:"RBA IDでつながる"},
 en:{title:"One organisation. Connected opportunities.",body:"Join, learn, reflect and find your next court. Start with a free RBA ID; each programme has its own conditions and payment or access requirements.",open:"Explore",jp:"Japanese information",next:"Open MY HOME COURT"},
 "zh-tw":{title:"一個組織，連結所有培育機會。",body:"參與、學習、記錄與下一次挑戰。從免費RBA ID開始，各活動仍有獨立的報名、付款與使用條件。",open:"了解更多",jp:"日文資訊",next:"開啟 MY HOME COURT"},
 ko:{title:"하나의 조직, 연결되는 성장 기회.",body:"참여하고 배우고 기록하며 다음 기회를 찾습니다. 무료 RBA ID로 시작하되 각 프로그램의 신청·결제·이용 조건은 별도로 적용됩니다.",open:"자세히 보기",jp:"일본어 안내",next:"MY HOME COURT 열기"}
} as const;
export function RbaProjectDirectory({locale}:{locale:Locale}){
 const c=text[locale],i=locale==="ja"?0:locale==="en"?1:locale==="zh-tw"?2:3;
 return <section id="rba-project-directory" className="section-pad" style={{background:"#F6F5F1",color:"#111211"}}>
  <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy" width={52} height={80} style={{objectFit:"contain"}}/><div><p className="section-index" style={{color:"#2454D8"}}>RBA / PROJECT DIRECTORY</p><h2 style={{fontSize:"clamp(1.5rem,4vw,2.6rem)",fontWeight:900,marginTop:8}}>{c.title}</h2></div></div>
  <p style={{lineHeight:1.8,maxWidth:860,marginBottom:24}}>{c.body}</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:12}}>
   {projects.map((p,n)=><article key={p.name} style={{background:"#fff",border:"1px solid #D6D9DC",borderTop:"3px solid #2454D8",padding:18,display:"flex",flexDirection:"column",gap:10}}><span style={{fontSize:11,fontWeight:900,color:"#6B706F"}}>{String(n+1).padStart(2,"0")} / RBA</span><h3 style={{fontSize:"1.1rem",fontWeight:900}}>{p.name}</h3><p style={{lineHeight:1.7,fontSize:14,flex:1}}>{p.copy[i]}</p><a style={{fontWeight:800,color:"#2454D8",display:"inline-flex",alignItems:"center",gap:6,minHeight:44}} href={p.local?p.path:localePath(locale,p.path as LanguagePage)}>{p.local&&locale!=="ja"?c.jp:c.open}<ArrowRight size={16}/></a></article>)}
  </div>
  <a className="button button-member" style={{marginTop:20}} href={localePath(locale,"my-homecourt")}>{c.next}<ArrowRight size={16}/></a>
 </section>;
}
