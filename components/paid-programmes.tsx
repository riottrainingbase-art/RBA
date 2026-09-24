import { ArrowRight, MapPin } from "lucide-react";
import { Locale, localePath } from "./site-frame";
import { programmes } from "./programme-data";
import { tr } from "./network-data";
const translations={
 en:{label:"UPCOMING PAID PROGRAMMES",title:"Choose your next court.",intro:"Upcoming clinics and paid services, with dates, locations and a direct route to registration.",map:"See dates on the Japan map",all:"Full schedule",cta:"Details & registration",fallback:"See the application page for the fee."},
 ja:{label:"募集中のプログラム",title:"次に参加するコートを選ぶ。",intro:"日程、場所、対象、参加費、申込後の決済方法まで確認できます。",map:"日本地図で日付と場所を見る",all:"全日程を見る",cta:"公式申込ページへ",fallback:"参加費は申込ページでご確認ください"},
 "zh-tw":{label:"近期付費活動",title:"選擇下一個球場。",intro:"集中查看日期、地點、費用資訊及報名入口。",map:"在日本地圖查看日期與地點",all:"查看完整日程",cta:"詳情與報名",fallback:"費用請參閱報名頁面。"},
 ko:{label:"예정 유료 프로그램",title:"다음 코트를 선택하세요.",intro:"날짜, 장소, 참가비 안내와 신청 링크를 한곳에서 확인할 수 있습니다.",map:"일본 지도에서 날짜와 장소 보기",all:"전체 일정",cta:"상세·신청",fallback:"참가비는 신청 페이지에서 확인해 주세요."}
} as const;


export function PaidProgrammes({locale}:{locale:Locale}){
 const c=translations[locale];
 return <section className="paid-programmes section-pad" aria-labelledby="paid-programmes-title"><div className="section-head"><div><p className="section-index">{c.label}</p><h2 id="paid-programmes-title">{c.title}</h2></div><p>{c.intro}</p></div><div className="paid-programme-grid">{programmes.map((programme)=>{const href=programme.detailPath?localePath(locale,programme.detailPath):programme.applicationUrl;const external=!programme.detailPath;return <article key={programme.id}><time>{tr(programme.date,locale)}</time><h3>{tr(programme.title,locale)}</h3><p className="programme-place"><MapPin size={16}/>{tr(programme.place,locale)}</p><p className="programme-audience"><strong>{({en:"For",ja:"対象","zh-tw":"對象",ko:"대상"})[locale]}</strong>{tr(programme.audience,locale)}</p><p className="programme-price">{tr(programme.price,locale)}</p><p className="programme-payment">{tr(programme.payment,locale)}</p><a className="programme-link" href={href} target={external?"_blank":undefined} rel={external?"noreferrer":undefined}>{c.cta}<ArrowRight size={16}/></a></article>})}</div><div className="programme-links"><a className="button button-orange" href={localePath(locale,"payments")}>{({en:"Registration & payment",ja:"公式申込・決済","zh-tw":"官方報名與付款",ko:"공식 신청·결제"})[locale]}<ArrowRight size={17}/></a><a className="text-link" href={localePath(locale,"schedule")}>{c.all}<ArrowRight size={16}/></a></div></section>;
}