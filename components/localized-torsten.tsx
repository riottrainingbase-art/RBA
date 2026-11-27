import Image from "next/image";
import { SiteFrame, localePath, type Locale } from "./site-frame";
import { TorstenRecordingOffer } from "./torsten-recording-offer";
import { CoachEducationLoop } from "./coach-education-loop";
const copy={
 ja:{title:"シューターの育成と活用",desc:"シュート技術、練習設計、スペーシングと試合での判断をつなぐ講習。",learn:"学びのテーマ",topics:["技術と練習の設計","スペーシングと状況判断","試合で良いシュートを生み出す"],history:"2026年11月25日開催済み・英語＋日本語逐次通訳"},
 en:{title:"Developing and using shooters",desc:"Connect shooting technique, purposeful practice, spacing and decisions in the game.",learn:"Learning themes",topics:["Technical development and practice design","Spacing and decisions","Creating better shots in games"],history:"Held on 25 November 2026 · English with Japanese interpretation"},
 "zh-tw":{title:"現代籃球中的射手培育與運用",desc:"連結投籃技術、訓練設計、空間與比賽判斷。",learn:"學習主題",topics:["技術培育與訓練設計","空間與比賽判斷","創造更好的投籃機會"],history:"2026年11月25日已舉行 · 英語附日文逐步口譯"},
 ko:{title:"현대 농구의 슈터 육성과 활용",desc:"슈팅 기술, 훈련 설계, 공간과 경기 판단을 연결합니다.",learn:"학습 주제",topics:["기술 육성과 훈련 설계","공간과 경기 판단","더 좋은 슛 기회 만들기"],history:"2026년 11월 25일 개최 완료 · 영어 및 일본어 순차 통역"}
} as const;
export function LocalizedTorsten({locale}:{locale:Locale}){const c=copy[locale];return <SiteFrame locale={locale} languagePage="events/torsten-loibl-online-clinic">
<section className="section-pad" style={{background:"#111211",color:"#F6F5F1"}}><Image src="/rba-logo-original.jpg" alt="RBA" width={52} height={80}/><p style={{color:"#D4DFF8",marginTop:12}}>RBA COACH EDUCATION / VOL.2</p><h1 style={{fontSize:"clamp(2rem,7vw,4.5rem)",fontWeight:900}}>TORSTEN LOIBL<br/>{c.title}</h1><p style={{marginBlock:22}}>{c.desc}</p><p>{c.history}</p></section>
<TorstenRecordingOffer locale={locale}/><section className="section-pad"><h2>{c.learn}</h2><ul style={{lineHeight:2}}>{c.topics.map(x=><li key={x}>{x}</li>)}</ul><p>Torsten Loibl · B.PREMIER · FIBA WABC Level 3 Coach Instructor</p><p><a href={localePath(locale,"approach")}>RBA Development Framework →</a></p></section><CoachEducationLoop locale={locale}/></SiteFrame>}
