import { ArrowRight, CreditCard, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { Locale, localePath } from "./site-frame";

const noteUrl="https://note.com/rba_official";
const lineUrl="https://lin.ee/5l1YG8N";

const copy={
 en:{label:"CHOOSE YOUR ROUTE",title:"For players, parents and coaches.",intro:"Start from your role and see the programmes, information and next action that apply to you.",roles:[
  {icon:"players",tag:"PLAYERS",title:"Play, learn and meet the next challenge.",body:"Join age-appropriate clinics, camps, 3x3 and club programmes built around seeing, deciding and executing in the game.",items:["U12 school in Sendai: Saturdays 16:30–18:00, Grades 4–6, JPY 6,600/month","U15 club network: Gream Sendai, Gream Okinawa and DSM collaboration","Clinics, camps, RBA UNITED and Japan–Asia exchange"],links:[["Open the players page","players"],["See current programmes","schedule"]]},
  {icon:"family",tag:"PARENTS",title:"Know the cost, safety rules and next step.",body:"Each official application page states the eligible age group, fee and event-specific terms. Ask before payment whenever something is unclear.",items:["A form submission alone does not always confirm a place","Payment and cancellation terms follow the official event form","Health, allergy and emergency information is handled only when required"],links:[["Open the parent page","families"],["Read participation policies","policies"],["Receive updates on LINE",lineUrl]]},
  {icon:"coach",tag:"COACHES",title:"Learn, discuss and bring RBA to your court.",body:"Coach education connects practice design, player development, S&C and direct learning from international coaches.",items:["Torsten Loibl online coach clinic","Open coach community and RBA learning","Clinic requests, practice design and coach dialogue"],links:[["Open the coaches page","coaches"],["Open RBA Community","community"],["Read RBA articles",noteUrl]]}
 ],flowLabel:"REGISTRATION & PAYMENT",flowTitle:"From interest to a confirmed place.",steps:[["01","Choose","Check the date, age group, fee and what is included."],["02","Apply","Complete the official form for that programme."],["03","Pay","Use the payment link shown after submission or sent by RBA."],["04","Confirmed","Your place is confirmed after payment or written confirmation from RBA."]],flowNote:"Payment methods differ by programme. The official form and the message from RBA take priority."},
 ja:{label:"目的別のご案内",title:"選手・保護者・コーチの方へ",intro:"立場ごとに、必要な情報と次に進むページをまとめました。",roles:[
  {icon:"players",tag:"選手",title:"参加して、学び、次の挑戦へ。",body:"見る・選ぶ・実行する力を育てるクリニック、キャンプ、3x3、クラブ活動に参加できます。",items:["仙台U12スクール：毎週土曜16:30〜18:00／旧実沢小学校／小学4〜6年生／月額6,600円","U15クラブ事業：Gream仙台、Gream沖縄、DSMとの連携","全国各地のクリニック、宿泊キャンプ、RBA UNITED、海外交流"],links:[["選手向けページを開く","players"],["募集中のプログラムを見る","schedule"]]},
  {icon:"family",tag:"保護者",title:"費用・安全面・申込方法を確認する。",body:"対象年代、参加費、費用に含まれる内容、キャンセル条件は、各企画の公式申込ページで確認できます。ご不明な点は、決済前にお問い合わせください。",items:["フォームを送信しただけでは、申込が確定しない企画があります","決済方法とキャンセル条件は、各企画の公式案内をご確認ください","健康状態、アレルギー、緊急連絡先は、運営に必要な範囲で安全に取り扱います"],links:[["保護者向けページを開く","families"],["参加規約・安全方針を読む","policies"],["公式LINEで募集情報を受け取る",lineUrl]]},
  {icon:"coach",tag:"コーチ・指導者",title:"学び、対話し、現場へつなげる。",body:"練習設計、選手育成、S&C、海外指導者からの学びを、日々のコーチングにつなげます。",items:["トーステン・ロイブル氏オンライン指導者講習","指導者向けオープンコミュニティ","地域・チームへの出張クリニック、練習設計、指導者向け相談"],links:[["コーチ・指導者向けページを開く","coaches"],["RBAコミュニティを開く","community"],["RBAの育成記事を読む",noteUrl]]}
 ],flowLabel:"申込・決済の流れ",flowTitle:"お申し込みから受付完了まで。",steps:[["01","内容を確認","日程、対象、参加費、費用に含まれる内容を確認します。"],["02","公式フォームを送信","参加者情報と必要事項を、各企画の専用フォームから送信します。"],["03","案内に従って決済","送信後の確認画面、またはRBAから届く案内に記載された決済リンクからお支払いください。"],["04","受付完了","決済完了、またはRBAからの受付完了の案内をもって、お申し込みが確定します。"]],flowNote:"決済方法は企画ごとに異なります。各申込フォームとRBAから届く案内を必ずご確認ください。フォームを送信しただけでは、申込が確定しない場合があります。"},
 "zh-tw":{label:"依身分選擇",title:"球員、家長與教練",intro:"依照您的身分，查看適合的活動、資訊與下一步。",roles:[
  {icon:"players",tag:"球員",title:"參加、學習，迎接下一個挑戰。",body:"參加依年齡設計的訓練營、培育營、3x3及俱樂部活動。",items:["仙台U12課程：每週六16:30–18:00，小學4–6年級，每月6,600日圓","U15俱樂部網絡與地方合作","日本各地活動、RBA UNITED及國際交流"],links:[["開啟球員頁面","players"],["查看近期活動","schedule"]]},
  {icon:"family",tag:"家長",title:"確認費用、安全與報名流程。",body:"各活動官方表單會列出參加資格、費用及活動條款。如有疑問，請在付款前聯絡RBA。",items:["提交表單不一定代表名額已確認","付款及取消規定以官方表單為準","健康與緊急資訊僅在必要範圍內使用"],links:[["開啟家長頁面","families"],["閱讀參加與安全政策","policies"],["透過LINE接收通知",lineUrl]]},
  {icon:"coach",tag:"教練",title:"學習、對話並帶回球場。",body:"從訓練設計、球員培育、體能訓練及國際教練交流中持續學習。",items:["Torsten Loibl線上教練講座","RBA開放教練社群","訓練營邀約與教練交流"],links:[["開啟教練頁面","coaches"],["開啟RBA社群","community"],["閱讀RBA文章",noteUrl]]}
 ],flowLabel:"報名與付款",flowTitle:"從選擇到確認名額。",steps:[["01","確認內容","確認日期、資格、費用及包含項目。"],["02","提交表單","使用該活動的官方報名表。"],["03","完成付款","使用提交後顯示或RBA寄送的付款連結。"],["04","確認名額","完成付款或收到RBA書面確認後，報名才正式成立。"]],flowNote:"付款方式依活動而異，請以官方表單及RBA通知為準。"},
 ko:{label:"대상별 안내",title:"선수, 보호자와 코치를 위해",intro:"현재 역할에 맞는 프로그램, 정보와 다음 단계를 확인하세요.",roles:[
  {icon:"players",tag:"선수",title:"참가하고 배우며 다음 도전으로.",body:"연령에 맞춘 클리닉, 캠프, 3x3와 클럽 프로그램에 참가할 수 있습니다.",items:["센다이 U12 스쿨: 토요일 16:30–18:00, 초등 4–6학년, 월 6,600엔","U15 클럽 네트워크와 지역 협력","일본 전국 프로그램, RBA UNITED와 국제 교류"],links:[["선수 페이지 열기","players"],["모집 중 프로그램 보기","schedule"]]},
  {icon:"family",tag:"보호자",title:"비용, 안전과 신청 절차를 확인하세요.",body:"각 공식 신청 페이지에서 대상, 참가비와 행사별 조건을 확인할 수 있습니다.",items:["폼 제출만으로 참가가 확정되지 않을 수 있습니다","결제와 취소 조건은 공식 신청 안내가 우선합니다","건강 및 긴급 정보는 필요한 범위에서만 사용합니다"],links:[["보호자 페이지 열기","families"],["참가·안전 정책 읽기","policies"],["LINE에서 소식 받기",lineUrl]]},
  {icon:"coach",tag:"코치",title:"배우고 대화하며 코트에 적용하세요.",body:"훈련 설계, 선수 육성, S&C와 국제 코치 교육을 연결합니다.",items:["Torsten Loibl 온라인 코치 클리닉","RBA 오픈 코치 커뮤니티","클리닉 요청과 코치 대화"],links:[["코치 페이지 열기","coaches"],["RBA 커뮤니티 열기","community"],["RBA 글 읽기",noteUrl]]}
 ],flowLabel:"신청 및 결제",flowTitle:"관심에서 참가 확정까지.",steps:[["01","내용 확인","날짜, 대상, 비용과 포함 사항을 확인합니다."],["02","신청","해당 프로그램의 공식 폼을 제출합니다."],["03","결제","제출 후 표시되거나 RBA가 보낸 결제 링크를 사용합니다."],["04","참가 확정","결제 또는 RBA의 서면 확인 후 참가가 확정됩니다."]],flowNote:"결제 방식은 프로그램마다 다릅니다. 공식 폼과 RBA 안내를 우선 확인해 주세요."}
} as const;

function route(locale:Locale,href:string){return href.startsWith("http")?href:localePath(locale,href as "schedule"|"contact"|"policies"|"events/torsten-loibl-online-clinic"|"players"|"families"|"coaches"|"community");}

export function AudienceJourneys({locale}:{locale:Locale}){
 const c=copy[locale];
 return <>
  <section className="audience-section section-pad" id="for-you">
   <div className="section-head"><div><p className="section-index">{c.label}</p><h2>{c.title}</h2></div><p>{c.intro}</p></div>
   <div className="audience-grid">{c.roles.map((role)=>{const Icon=role.icon==="players"?Users:role.icon==="family"?ShieldCheck:GraduationCap;return <article key={role.tag}><div className="audience-icon"><Icon size={24}/><span>{role.tag}</span></div><h3>{role.title}</h3><p>{role.body}</p><ul>{role.items.map(item=><li key={item}>{item}</li>)}</ul><div className="audience-links">{role.links.map(([label,href])=><a href={route(locale,href)} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noreferrer":undefined} key={label}>{label}<ArrowRight size={15}/></a>)}</div></article>})}</div>
  </section>
  <section className="registration-flow section-pad" id="registration-flow">
   <div><p className="section-index inverse"><CreditCard size={15}/> {c.flowLabel}</p><h2>{c.flowTitle}</h2></div>
   <div><ol>{c.steps.map(([n,title,body])=><li key={n}><span>{n}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol><p className="registration-note">{c.flowNote}</p></div>
  </section>
 </>;
}