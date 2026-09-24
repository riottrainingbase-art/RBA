import { Search } from "lucide-react";
import type { Locale } from "./site-frame";

const copy={
  ja:{label:"育成機会を探す",age:"年代",region:"地域",kind:"目的",submit:"条件から探す",all:"選択しない",ages:[["U8","U8"],["U10","U10"],["U12","U12"],["U15","U15"],["COACH","指導者"]],regions:[["tohoku","東北"],["kanto","関東"],["kansai","関西"],["kyushu","九州"],["okinawa","沖縄"],["online","オンライン"]],kinds:[["TRAIN","練習・クリニック"],["PLAY","試合・大会"],["TRAVEL","キャンプ・遠征"],["COACH","指導者の学び"]]},
  en:{label:"Find an opportunity",age:"Age",region:"Region",kind:"Purpose",submit:"Search",all:"Any",ages:[["U8","U8"],["U10","U10"],["U12","U12"],["U15","U15"],["COACH","Coach"]],regions:[["tohoku","Tohoku"],["kanto","Kanto"],["kansai","Kansai"],["kyushu","Kyushu"],["okinawa","Okinawa"],["online","Online"]],kinds:[["TRAIN","Training & clinics"],["PLAY","Games & events"],["TRAVEL","Camps & travel"],["COACH","Coach learning"]]},
  "zh-tw":{label:"尋找培育機會",age:"年齡",region:"地區",kind:"目的",submit:"搜尋",all:"不限",ages:[["U8","U8"],["U10","U10"],["U12","U12"],["U15","U15"],["COACH","教練"]],regions:[["tohoku","東北"],["kanto","關東"],["kansai","關西"],["kyushu","九州"],["okinawa","沖繩"],["online","線上"]],kinds:[["TRAIN","訓練與營隊"],["PLAY","比賽與活動"],["TRAVEL","培育營與遠征"],["COACH","教練學習"]]},
  ko:{label:"성장 기회 찾기",age:"연령",region:"지역",kind:"목적",submit:"검색",all:"전체",ages:[["U8","U8"],["U10","U10"],["U12","U12"],["U15","U15"],["COACH","코치"]],regions:[["tohoku","도호쿠"],["kanto","간토"],["kansai","간사이"],["kyushu","규슈"],["okinawa","오키나와"],["online","온라인"]],kinds:[["TRAIN","훈련・클리닉"],["PLAY","경기・대회"],["TRAVEL","캠프・원정"],["COACH","코치 학습"]]}
} as const;

export function PlatformQuickFinder({locale}:{locale:Locale}){
  const c=copy[locale]; const action=locale==="en"?"/opportunities":`/${locale}/opportunities`;
  return <form className="platform-quick-finder" action={action} method="get"><strong><Search size={17}/>{c.label}</strong><label><span>{c.age}</span><select name="age" defaultValue=""><option value="">{c.all}</option>{c.ages.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><label><span>{c.region}</span><select name="region" defaultValue=""><option value="">{c.all}</option>{c.regions.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><label><span>{c.kind}</span><select name="kind" defaultValue=""><option value="">{c.all}</option>{c.kinds.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><button type="submit"><Search size={17}/>{c.submit}</button></form>;
}
