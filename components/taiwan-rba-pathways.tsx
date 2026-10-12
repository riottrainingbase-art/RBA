import Link from "next/link";
import type { Locale } from "./site-frame";

const copy: Record<Locale, {
  eyebrow: string; title: string; intro: string;
  items: readonly {name: string; role: string; forWhom: string; action: string; href: string}[];
  note: string;
}> = {
  ja: {
    eyebrow: "ONE RBA / THREE DIFFERENT ROLES",
    title: "GLOBAL・UNITED・CONNECTの違い",
    intro: "別々のチームや会社ではありません。RBAの育成理念を、目的に合わせて実現する3つの役割です。",
    items: [
      {name:"RBA GLOBAL",role:"海外のクラブ・学校と育成事業をつくる",forWhom:"対象：クラブ・指導者・学校・主催者",action:"共同開催について相談",href:"/ja/taiwan#taiwan-enquiry"},
      {name:"RBA UNITED",role:"チームで大会・遠征に挑戦する",forWhom:"対象：選手・保護者",action:"選手向けの活動を確認",href:"/ja/united"},
      {name:"RBA CONNECT",role:"交流を一度きりで終わらせず、関係を続ける",forWhom:"対象：選手・指導者・地域のクラブ",action:"継続交流について相談",href:"/ja/taiwan#taiwan-enquiry"}
    ],
    note:"台湾での次回開催日・料金・参加募集は未確定です。申し込みではなく、まずは企画内容のご相談を受け付けています。"
  },
  en: {
    eyebrow:"ONE RBA / THREE DIFFERENT ROLES",title:"GLOBAL, UNITED & CONNECT — made simple",
    intro:"Not three separate organizations. Three roles within one development philosophy.",
    items:[
      {name:"RBA GLOBAL",role:"Builds development programmes with international clubs and schools.",forWhom:"For: clubs, coaches, schools and organizers",action:"Discuss a partnership",href:"/taiwan#taiwan-enquiry"},
      {name:"RBA UNITED",role:"Creates team-based tournament and travel experiences.",forWhom:"For: players and families",action:"Explore team experiences",href:"/united"},
      {name:"RBA CONNECT",role:"Keeps learning and relationships going beyond one exchange.",forWhom:"For: players, coaches and communities",action:"Discuss continued exchange",href:"/taiwan#taiwan-enquiry"}
    ],
    note:"Future Taiwan dates, prices and registration are not confirmed. An enquiry does not create a booking."
  },
  "zh-tw": {
    eyebrow:"ONE RBA / THREE DIFFERENT ROLES",title:"GLOBAL、UNITED、CONNECT 有什麼不同？",
    intro:"這不是三個獨立機構，而是 RBA 相同培育理念下的三種角色。",
    items:[
      {name:"RBA GLOBAL",role:"與海外球隊、學校及教練共同設計培育計畫。",forWhom:"適合：球隊、教練、學校、主辦單位",action:"洽詢共同合作",href:"/zh-tw/taiwan#taiwan-enquiry"},
      {name:"RBA UNITED",role:"以球隊形式參與比賽、遠征及交流。",forWhom:"適合：球員、家長",action:"了解球隊交流",href:"/zh-tw/united"},
      {name:"RBA CONNECT",role:"讓一次交流成為長期的學習與連結。",forWhom:"適合：球員、教練、在地社群",action:"洽詢持續交流",href:"/zh-tw/taiwan#taiwan-enquiry"}
    ],
    note:"下一次台灣活動的日期、費用及報名尚未確定。洽詢不等於報名。"
  },
  ko: {
    eyebrow:"ONE RBA / THREE DIFFERENT ROLES",title:"GLOBAL · UNITED · CONNECT의 차이",
    intro:"세 개의 독립 조직이 아니라 하나의 RBA 육성 철학을 실천하는 서로 다른 역할입니다.",
    items:[
      {name:"RBA GLOBAL",role:"해외 클럽과 학교와 함께 육성 프로그램을 만듭니다.",forWhom:"대상: 클럽, 코치, 학교, 주최자",action:"공동 프로그램 문의",href:"/ko/taiwan#taiwan-enquiry"},
      {name:"RBA UNITED",role:"팀 단위의 대회와 원정 경험을 제공합니다.",forWhom:"대상: 선수와 보호자",action:"팀 활동 알아보기",href:"/ko/united"},
      {name:"RBA CONNECT",role:"교류 이후에도 배움과 관계를 이어 갑니다.",forWhom:"대상: 선수, 코치, 지역 클럽",action:"지속 교류 문의",href:"/ko/taiwan#taiwan-enquiry"}
    ],
    note:"향후 대만 일정, 비용, 모집은 미확정이며 문의는 예약이 아닙니다."
  }
};

export function TaiwanRbaPathways({locale}:{locale:Locale}) {
 const c=copy[locale];
 return <section className="taiwan-pathways section-pad" aria-labelledby="taiwan-pathways-title">
  <p className="section-index">{c.eyebrow}</p>
  <h2 id="taiwan-pathways-title">{c.title}</h2>
  <p className="taiwan-wide">{c.intro}</p>
  <div className="taiwan-pathways-grid">{c.items.map(item=><article key={item.name}>
   <h3>{item.name}</h3><p>{item.role}</p><p className="taiwan-pathways-audience">{item.forWhom}</p>
   <Link href={item.href}>{item.action} →</Link>
  </article>)}</div>
  <p className="taiwan-footnote">{c.note}</p>
 </section>;
}
