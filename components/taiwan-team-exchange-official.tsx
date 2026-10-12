import Link from "next/link";
import { SiteFrame, type Locale } from "./site-frame";
import "./taiwan-official.css";

const content:Record<Locale,{title:string;intro:string;status:string;directions:string[];safety:string;contact:string;back:string}>={
ja:{title:"日本・台湾のチーム交流",intro:"日本から台湾へ、台湾から日本へ。交流試合・合同練習・育成キャンプを、選手の学びを中心に一緒に考えます。",status:"今後の開催日、参加費、受入先、募集は未確定です。問い合わせだけで申込・契約にはなりません。",directions:["日本から台湾へ：交流試合、現地指導者との学び、異文化経験","台湾から日本へ：合同練習、試合、地域クラブとの交流"],safety:"引率、保護者同意、保険、緊急時対応、会場、費用、キャンセル条件を実施前に書面で確認します。旅行手配を含む場合は法令に沿った体制を整えます。",contact:"チーム交流について相談",back:"台湾ページへ戻る"},
en:{title:"Japan–Taiwan team exchange",intro:"From Japan to Taiwan and Taiwan to Japan. Explore games, joint practice and development camps focused on learning.",status:"Dates, fees, host teams and registrations are not confirmed. An enquiry is not a booking or contract.",directions:["Japan → Taiwan: friendly games, local coach learning and cultural exchange","Taiwan → Japan: joint training, games and community exchange"],safety:"Safeguarding, guardian consent, insurance, emergency response, venues, costs and cancellation terms are agreed in writing. Travel arrangements must comply with applicable laws.",contact:"Discuss a team exchange",back:"Back to Taiwan overview"},
"zh-tw":{title:"台日球隊交流",intro:"從日本到台灣、從台灣到日本。以球員學習為中心，規劃交流賽、共同訓練與青少年培育營。",status:"日期、費用、接待球隊與報名尚未確定。洽詢不代表預約或簽約。",directions:["日本 → 台灣：交流賽、在地教練學習與文化體驗","台灣 → 日本：共同訓練、比賽與社區交流"],safety:"活動前將以書面確認兒少安全、家長同意、保險、緊急應變、場地、費用與取消條件。旅行安排須符合相關法規。",contact:"洽詢球隊交流",back:"返回台灣介紹"},
ko:{title:"일본·대만 팀 교류",intro:"일본에서 대만으로, 대만에서 일본으로. 선수의 배움을 중심으로 경기, 공동 훈련 및 육성 캠프를 논의합니다.",status:"일정, 비용, 현지 팀 및 모집은 미확정입니다. 문의는 예약이나 계약이 아닙니다.",directions:["일본 → 대만: 친선 경기, 현지 코치 교류, 문화 경험","대만 → 일본: 공동 훈련, 경기, 지역 클럽 교류"],safety:"인솔, 보호자 동의, 보험, 긴급 대응, 장소, 비용 및 취소 조건을 사전에 서면으로 확인합니다. 여행 관련 법규를 준수합니다.",contact:"팀 교류 문의",back:"대만 소개로 돌아가기"}
};
export function TaiwanTeamExchangeOfficial({locale}:{locale:Locale}){
 const c=content[locale];const back=locale==="en"?"/taiwan":`/${locale}/taiwan`;
 return <SiteFrame locale={locale} languagePage="international"><div className="rba-taiwan">
  <section className="rba-taiwan-hero"><div className="rba-taiwan-inner"><p className="rba-taiwan-label">RBA UNITED × RBA GLOBAL × RBA CONNECT</p><h1>{c.title}</h1><p className="rba-taiwan-lead">{c.intro}</p><Link className="rba-taiwan-btn" href={back}>{c.back} ↗</Link></div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner"><p className="rba-taiwan-label">TWO DIRECTIONS / ONE CONNECTION</p><div className="rba-taiwan-cards">{c.directions.map((d,i)=><article key={d}><span>0{i+1}</span><h3>{d}</h3></article>)}</div></div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner"><h2>PROGRAMME STATUS</h2><p className="rba-taiwan-intro">{c.status}</p><p className="rba-taiwan-intro">{c.safety}</p></div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner"><h2>{c.contact}</h2><p className="rba-taiwan-intro">{c.status}</p><a className="rba-taiwan-btn" href={`https://form.jotform.com/262590542634055?utm_source=rba_website&utm_medium=organic&utm_campaign=taiwan_2026_launch&utm_content=${locale}_team_exchange`} target="_blank" rel="noopener noreferrer">JOTFORM ↗</a></div></section>
 </div></SiteFrame>;
}
