"use client";
import Image from "next/image";
import styles from "./japan-team-map.module.css";
import { programmes } from "./programme-data";

type Locale="en"|"ja"|"zh-tw"|"ko";
type TeamPoint={id:string;name:string;region:string|null;country?:string|null};
type HistoryPoint={id:string;title:string;venue:string|null;occurred_on?:string|null};

const prefectures=[
"北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"
] as const;
const aliases:Record<string,string>={"東京":"東京都","大阪":"大阪府","京都":"京都府","北海道":"北海道","宮城":"宮城県","兵庫":"兵庫県","神奈川":"神奈川県","佐賀":"佐賀県","福岡":"福岡県","山形":"山形県","沖縄":"沖縄県","石垣島":"沖縄県"};
const normalize=(value:string)=>aliases[value]||value;
const copy={
 ja:{
   title:"チームと経験地域を、日本地図で可視化する。",
   lead:"所属チームの所在地と、これまでに経験した地域を日本地図上で確認できます。表示は、登録された都道府県情報にもとづく概略表示です。",
   unknown:"地域未設定",local:"MY TEAM",experience:"EXPERIENCE",next:"NEXT",
   emptyTitle:"まだ所属チームが登録されていません。",
   emptyBody:"チームを登録すると、所属地域や活動履歴をこの画面で確認できます。",
   addTeam:"TEAM HOMEから所属チームを登録する",
   note:"都道府県単位の概略表示です。住所や現在地などの詳細な位置情報は表示しません。"
 },
 en:{
   title:"See your team and experience across Japan.",
   lead:"View your home-team region and the prefectures connected to your saved experience. Locations are shown at prefecture level only.",
   unknown:"Region not set",local:"MY TEAM",experience:"EXPERIENCE",next:"NEXT",
   emptyTitle:"No home team has been registered yet.",emptyBody:"Add a team to see your home region and activity history here.",addTeam:"Add a team from TEAM HOME",
   note:"Prefecture-level overview only. Exact addresses and live location are not shown."
 },
 "zh-tw":{
   title:"用日本地圖查看所屬球隊與活動經驗。",
   lead:"可在日本地圖上確認所屬球隊所在地與曾有活動經驗的都道府縣。位置僅以都道府縣層級概略顯示。",
   unknown:"地區未設定",local:"MY TEAM",experience:"EXPERIENCE",next:"NEXT",
   emptyTitle:"尚未登錄所屬球隊。",emptyBody:"登錄球隊後，即可在此查看所屬地區與活動紀錄。",addTeam:"從 TEAM HOME 登錄球隊",
   note:"僅顯示都道府縣層級，不會顯示詳細地址或即時位置。"
 },
 ko:{
   title:"소속팀과 경험 지역을 일본 지도에서 확인합니다.",
   lead:"등록된 팀 지역과 활동 기록을 바탕으로 소속 지역과 경험한 도도부현을 확인할 수 있습니다.",
   unknown:"지역 미설정",local:"MY TEAM",experience:"EXPERIENCE",next:"NEXT",
   emptyTitle:"아직 소속팀이 등록되지 않았습니다.",emptyBody:"팀을 등록하면 소속 지역과 활동 기록을 이 화면에서 확인할 수 있습니다.",addTeam:"TEAM HOME에서 팀 등록",
   note:"도도부현 단위의 개략 표시이며 상세 주소나 현재 위치는 표시하지 않습니다."
 }
} as const;

function prefectureFromText(value:string|null){
 if(!value)return null;
 const exact=prefectures.find(pref=>value.includes(pref));
 if(exact)return exact;
 for(const [short,full] of Object.entries(aliases)){if(value.includes(short))return full;}
 return null;
}

export function JapanTeamMap({locale,teams,history=[]}:{locale:Locale;teams:TeamPoint[];history?:HistoryPoint[]}){
 const c=copy[locale];
 const japanTeams=teams.filter(t=>!t.country||t.country==="JP"||t.country==="Japan");
 const plotted=japanTeams.map(team=>({team,prefecture:team.region?prefectureFromText(normalize(team.region)):null})).filter(x=>x.prefecture) as {team:TeamPoint;prefecture:string}[];
 const unknown=japanTeams.filter(team=>!team.region||!prefectureFromText(normalize(team.region)));
 const experiences=history.map(item=>({item,prefecture:prefectureFromText(item.venue)})).filter(x=>x.prefecture) as {item:HistoryPoint;prefecture:string}[];
 const today=new Date().toISOString().slice(0,10);
 const next=programmes.filter(p=>!p.registrationClosed&&p.startDate>=today&&p.region!=="online")
   .map(programme=>({programme,prefecture:prefectureFromText(programme.place[1])}))
   .filter(x=>x.prefecture) as {programme:(typeof programmes)[number];prefecture:string}[];

 const teamRegions=[...new Set(plotted.map(x=>x.prefecture))];
 const experienceRegions=[...new Set(experiences.map(x=>x.prefecture))];
 const nextRegions=[...new Set(next.map(x=>x.prefecture))];

 return <section className={styles.wrap}>
   <div className={styles.head}>
     <div><span>MY HOME COURT / MAP</span><h2>{c.title}</h2></div>
     <p>{c.lead}</p>
   </div>

   <div className={styles.stats}>
     <div><span>MY TEAM</span><strong>{plotted.length}</strong><small>{locale==="ja"?"所属チーム数":locale==="zh-tw"?"所屬球隊數":locale==="ko"?"소속팀 수":"home teams"}</small></div>
     <div><span>EXPERIENCE</span><strong>{experienceRegions.length}</strong><small>{locale==="ja"?"経験した都道府県数":locale==="zh-tw"?"有活動經驗的都道府縣數":locale==="ko"?"경험한 도도부현 수":"prefectures experienced"}</small></div>
     <div><span>NEXT</span><strong>{nextRegions.length}</strong><small>{locale==="ja"?"次に挑戦できる地域":locale==="zh-tw"?"下一個可挑戰地區":locale==="ko"?"다음 도전 가능 지역":"next regions"}</small></div>
   </div>

   <div className={styles.grid}>
     <div className={styles.mapCard}>
       <div className={styles.mapLabels}><span>{c.local}</span><span>{c.experience}</span><span>{c.next}</span></div>
       <div className={styles.mapVisual}>
         <Image src="/network-japan.svg" alt={locale==="ja"?"日本地図":locale==="ko"?"일본 지도":locale==="zh-tw"?"日本地圖":"Map of Japan"} width={1000} height={1000} priority className={styles.mapImage}/>
       </div>

       {teams.length===0&&experienceRegions.length===0?
         <div className={styles.emptyState}>
           <strong>{c.emptyTitle}</strong><p>{c.emptyBody}</p>
           <a href={"/"+(locale==="en"?"":locale+"/")+"my-homecourt/app/team"}>{c.addTeam}</a>
         </div>
       :
         <div className={styles.regionGroups}>
           <div><span>MY TEAM</span><div>{teamRegions.length?teamRegions.map(region=><i key={region}>{region}</i>):<small>—</small>}</div></div>
           <div><span>EXPERIENCE</span><div>{experienceRegions.length?experienceRegions.map(region=><i key={region}>{region}</i>):<small>—</small>}</div></div>
           <div><span>NEXT</span><div>{nextRegions.length?nextRegions.map(region=><i key={region}>{region}</i>):<small>—</small>}</div></div>
         </div>
       }
       <p className={styles.note}>※ {c.note}</p>
     </div>

     <div className={styles.list}>
       {plotted.map(({team,prefecture})=><article key={team.id}><span>MY TEAM · {prefecture}</span><strong>{team.name}</strong></article>)}
       {unknown.map(team=><article key={team.id}><span>{c.unknown}</span><strong>{team.name}</strong></article>)}
       {experiences.slice(0,4).map(({item,prefecture})=><article key={"list-"+item.id}><span>EXPERIENCE · {prefecture}</span><strong>{item.title}</strong></article>)}
       {next.slice(0,4).map(({programme,prefecture})=><article key={"next-list-"+programme.id}><span>NEXT · {prefecture}</span><strong>{programme.title[1]}</strong><a href={programme.applicationUrl} target="_blank" rel="noreferrer">{locale==="ja"?"募集を見る":locale==="zh-tw"?"查看招募":locale==="ko"?"모집 보기":"View programme"}</a></article>)}
     </div>
   </div>
 </section>;
}
