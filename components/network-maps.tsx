"use client";
import { useState } from "react";
import Image from "next/image";
import type { Locale } from "./site-frame";
import { japanPoints,plannedJapanPoints,worldPoints,tr,MapPoint,Text4,ActivityType } from "./network-data";
import { programmeById } from "./programme-data";
const copy={
 title:["From Japan to the world.","日本の現場から、世界へ。","從日本球場，連結世界。","일본의 현장에서 세계로."] as Text4,
 intro:["Explore RBA's clinic locations and international relationships.","クリニック・活動地域と、海外の連携先を地図で紹介します。","透過地圖了解RBA的活動地區與海外合作關係。","지도에서 RBA의 클리닉 활동 지역과 해외 협력 관계를 확인하세요."] as Text4,
 japan:["Japan · Clinics","日本・クリニック開催地","日本・訓練營地點","일본・클리닉 활동 지역"] as Text4,
 world:["World · International network","世界・海外連携先","世界・海外合作網絡","세계・해외 협력 네트워크"] as Text4,
 hint:["Select a numbered marker or a location below.","地図の番号か、下の地域名を押すと詳細を表示します。","選擇地圖編號或下方地名查看詳情。","지도 번호 또는 아래 지역명을 누르면 상세 내용이 표시됩니다."] as Text4,
 note:["All 25 confirmed activity locations are shown. Markers are approximate regional positions, not gym entrances. Yamagata and Tatsuno are separately marked as planned.","これまでに活動した25地域を掲載しています。地図のピンは都市・地域のおおよその位置を示すもので、会場の入口を示すものではありません。山形と兵庫・たつのは開催予定として別に表示しています。","完整列出Drive已確認的25個活動地點。圖標為地區概略位置，非場館入口；山形與兵庫・龍野另列為預定活動。","Drive에서 확인된 25개 활동 지역을 모두 표시합니다. 핀은 지역 대표 위치이며 체육관 입구가 아닙니다. 야마가타와 효고・다쓰노는 예정으로 별도 표시합니다."] as Text4,
 worldNote:["A partner relationship does not mean an overseas programme has already taken place. Each location shows its current programme status.","連携先として掲載している地域でも、すでに海外で活動を実施したとは限りません。交流企画の進行状況は、各項目に表示しています。","合作關係不代表海外活動已舉行，各地項目另列交流企劃進度。","협력 관계가 해외 프로그램의 개최 완료를 의미하지는 않습니다. 각 항목에서 교류 진행 상황을 확인하세요."] as Text4,
 all:["All locations","すべて","全部地點","전체 지역"] as Text4,
 empty:["No locations in this category.","この区分の掲載地点はありません。","此類別尚無地點。","이 분류에는 등록된 지역이 없습니다."] as Text4,
 selected:["Selected location","選択中の地域","已選地點","선택한 지역"] as Text4,
 contact:["Discuss a clinic or exchange","クリニック・交流を相談する","洽詢訓練營或交流","클리닉·교류 문의"] as Text4,
 upcoming:["Upcoming programme","今後の開催予定","近期活動","예정 프로그램"] as Text4,
 apply:["Details & registration","詳細・申込へ","詳情與報名","상세·신청"] as Text4,
};
const activityLabels:Record<ActivityType,Text4>={clinic:["Clinic","クリニック","訓練營","클리닉"],camp:["Camp","キャンプ","培育營","캠프"],"3x3":["3x3","3x3","3x3","3x3"],school:["School","スクール","課程","스쿨"]};
const status:Record<MapPoint['status'],Text4>={activity:["Activity record","活動実績","活動紀錄","활동 이력"],planned:["Planned programme","開催予定","活動規劃","개최 예정"],partner:["Partner","連携先","合作夥伴","협력 파트너"],discussion:["In discussion","協議中","協議中","협의 중"]};
const offsets:Record<string,[number,number]>={akita:[-4,-1],yuzawa:[4,1],sendai:[-5,2],shizugawa:[5,-2],saitama:[-6,-2],kazo:[1,-5],harayama:[6,1],kozaki:[6,-4],kawasaki:[-4,5],takahama:[-6,-3],toyota:[4,-5],ise:[6,3],saga:[-4,-4],okawa:[5,3],okinawa:[7,-7],tomigusuku:[-7,-1],itoman:[7,3],nanjo:[-5,8],ishigaki:[-5,1],"yamagata-planned":[5,-4],"tatsuno-planned":[-5,4],taiwan:[-3,4],korea:[3,-3]};
const upcoming:Record<string,{text:Text4;href:string}>={
 kawasaki:{text:["27 Sep · RBA Kawasaki Clinic","9月27日 · RBA川崎クリニック","9月27日 · RBA川崎訓練營","9월 27일 · RBA 가와사키 클리닉"],href:programmeById.kawasaki.applicationUrl},
 saga:{text:["4–5 Oct · Saga × Fukuoka 2Days Camp","10月4〜5日 · 佐賀 × 福岡 2Days Camp","10月4日至5日 · 佐賀 × 福岡兩日營","10월 4~5일 · 사가 × 후쿠오카 2Days Camp"],href:programmeById["saga-fukuoka"].applicationUrl},
 okawa:{text:["4–5 Oct · Saga × Fukuoka 2Days Camp","10月4〜5日 · 佐賀 × 福岡 2Days Camp","10月4日至5日 · 佐賀 × 福岡兩日營","10월 4~5일 · 사가 × 후쿠오카 2Days Camp"],href:programmeById["saga-fukuoka"].applicationUrl},
 "yamagata-planned":{text:["24 Oct · Yamagata 1Day Clinic","10月24日 · 山形1Day Clinic","10月24日 · 山形一日訓練營","10월 24일 · 야마가타 1Day Clinic"],href:programmeById.yamagata.applicationUrl},
 shizugawa:{text:["7–8 Nov · Shizugawa Development Camp","11月7〜8日 · 志津川 Development Camp","11月7日至8日 · 志津川培育營","11월 7~8일 · 시즈가와 Development Camp"],href:programmeById.shizugawa.applicationUrl},
 "tatsuno-planned":{text:["20–23 Nov · KOBE Development Camp","11月20〜23日 · KOBE Development Camp","11月20日至23日 · KOBE培育營","11월 20~23일 · KOBE Development Camp"],href:programmeById.kobe.applicationUrl}
};
function MapPanel({locale,kind}:{locale:Locale;kind:"japan"|"world"}){
 const points=kind==="japan"?[...japanPoints,...plannedJapanPoints]:worldPoints;
 const [filter,setFilter]=useState("all");const [selected,setSelected]=useState(points[0].id);
 const shown=points.filter(p=>filter==="all"||p.status===filter||p.activities?.includes(filter as ActivityType));
 const active=shown.find(p=>p.id===selected)||shown[0];
 const kinds=kind==="japan"?['clinic','camp','3x3','school','planned'] as const:['partner','discussion'] as const;
 const bounds=kind==="japan"?[122,148,23,47]:[-180,180,-60,85];
 const position=(p:MapPoint)=>[(p.lon-bounds[0])/(bounds[1]-bounds[0])*100,(bounds[3]-p.lat)/(bounds[3]-bounds[2])*100];
 return <div className="network-panel"><p className="network-hint">{tr(copy.hint,locale)}</p><div className="network-filters" role="group" aria-label={tr(copy.all,locale)}>{['all',...kinds].map(s=><button type="button" key={s} aria-pressed={filter===s} onClick={()=>setFilter(s)}>{s==='all'?tr(copy.all,locale):s in activityLabels?tr(activityLabels[s as ActivityType],locale):tr(status[s as MapPoint['status']],locale)}</button>)}</div><div className="network-layout"><div className={`network-map network-map-${kind}`} role="group" aria-label={tr(copy[kind],locale)}>
  <Image src={`/network-${kind}.svg`} alt={tr(copy[kind],locale)} width={kind==='japan'?560:1000} height={kind==='japan'?620:403}/>
  <svg className="network-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{shown.map(p=>{const [x,y]=position(p),[dx,dy]=offsets[p.id]||[0,0];return <g key={p.id}><line x1={x} y1={y} x2={x+dx} y2={y+dy}/><circle cx={x} cy={y} r="0.45"/></g>})}</svg>
  {shown.map(p=>{const [x,y]=position(p),[dx,dy]=offsets[p.id]||[0,0];return <button type="button" className={`network-pin ${p.status}`} key={p.id} style={{left:`${x+dx}%`,top:`${y+dy}%`}} aria-label={`${tr(p.name,locale)} — ${tr(status[p.status],locale)}`} aria-pressed={active?.id===p.id} aria-controls={`network-detail-${kind}`} onClick={()=>setSelected(p.id)}>{points.indexOf(p)+1}</button>})}
  </div><aside className="network-detail" id={`network-detail-${kind}`} aria-live="polite">{active?<><p className="section-index">{tr(copy.selected,locale)}</p><span className={`network-badge ${active.status}`}>{tr(status[active.status],locale)}</span><h3>{tr(active.name,locale)}</h3><p>{tr(active.detail,locale)}</p>{upcoming[active.id]&&<div className="network-upcoming"><strong>{tr(copy.upcoming,locale)}</strong><p>{tr(upcoming[active.id].text,locale)}</p><a href={upcoming[active.id].href.startsWith("/")?(locale==='en'?'':`/${locale}`)+upcoming[active.id].href:upcoming[active.id].href} target={upcoming[active.id].href.startsWith("http")?"_blank":undefined} rel={upcoming[active.id].href.startsWith("http")?"noreferrer":undefined}>{tr(copy.apply,locale)} →</a></div>}<a href={(locale==='en'?'':`/${locale}`)+"/contact"}>{tr(copy.contact,locale)} →</a></>:<p>{tr(copy.empty,locale)}</p>}</aside></div>
  <div className="network-locations">{shown.map(p=><button type="button" key={p.id} aria-pressed={active?.id===p.id} onClick={()=>setSelected(p.id)} aria-controls={`network-detail-${kind}`}><strong>{points.indexOf(p)+1}. {tr(p.name,locale)}</strong><span>{tr(status[p.status],locale)}</span></button>)}</div><p className="network-note">{tr(kind==='japan'?copy.note:copy.worldNote,locale)}</p><p className="network-credit"><a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noreferrer">Natural Earth</a> · 2026-09-17</p>
 </div>;
}
export function NetworkMaps({locale}:{locale:Locale}){
 const [view,setView]=useState<"japan"|"world">("japan");
 return <section className="network-section section-pad" id="network"><div className="section-head"><div><p className="section-index">RBA / JAPAN × WORLD</p><h2>{tr(copy.title,locale)}</h2></div><p>{tr(copy.intro,locale)}</p></div><div className="network-tabs" role="tablist" aria-label="RBA network"><button type="button" role="tab" id="network-tab-japan" aria-selected={view==="japan"} aria-controls="network-panel-japan" onClick={()=>setView("japan")}>{tr(copy.japan,locale)}</button><button type="button" role="tab" id="network-tab-world" aria-selected={view==="world"} aria-controls="network-panel-world" onClick={()=>setView("world")}>{tr(copy.world,locale)}</button></div><div role="tabpanel" id={`network-panel-${view}`} aria-labelledby={`network-tab-${view}`}><MapPanel locale={locale} kind={view}/></div></section>
}
