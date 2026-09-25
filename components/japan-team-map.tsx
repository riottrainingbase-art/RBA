"use client";
import styles from "./japan-team-map.module.css";
import { programmes } from "./programme-data";

type Locale="en"|"ja"|"zh-tw"|"ko";
type TeamPoint={id:string;name:string;region:string|null;country?:string|null};
type HistoryPoint={id:string;title:string;venue:string|null;occurred_on?:string|null};

const coords:Record<string,[number,number]>={
"北海道":[79,12],"青森県":[73,22],"岩手県":[77,28],"宮城県":[76,34],"秋田県":[69,28],"山形県":[70,35],"福島県":[73,41],
"茨城県":[78,50],"栃木県":[74,47],"群馬県":[69,48],"埼玉県":[72,52],"千葉県":[79,55],"東京都":[72,56],"神奈川県":[71,59],
"新潟県":[65,42],"富山県":[58,47],"石川県":[54,47],"福井県":[51,52],"山梨県":[67,56],"長野県":[63,50],"岐阜県":[57,55],"静岡県":[64,61],"愛知県":[58,61],
"三重県":[54,64],"滋賀県":[50,58],"京都府":[47,58],"大阪府":[46,62],"兵庫県":[42,60],"奈良県":[49,63],"和歌山県":[47,68],
"鳥取県":[36,57],"島根県":[30,57],"岡山県":[37,61],"広島県":[31,62],"山口県":[24,64],
"徳島県":[39,68],"香川県":[38,65],"愛媛県":[31,69],"高知県":[34,73],
"福岡県":[17,67],"佐賀県":[13,69],"長崎県":[9,71],"熊本県":[16,73],"大分県":[21,71],"宮崎県":[20,78],"鹿児島県":[15,82],"沖縄県":[8,94]
};
const aliases:Record<string,string>={"東京":"東京都","大阪":"大阪府","京都":"京都府","北海道":"北海道","宮城":"宮城県","兵庫":"兵庫県","神奈川":"神奈川県","佐賀":"佐賀県","福岡":"福岡県","山形":"山形県","沖縄":"沖縄県","石垣島":"沖縄県"};
const normalize=(value:string)=>aliases[value]||value;
const copy={
 ja:{title:"所属チームは、ここ。次の機会は、日本全国と世界へ。",lead:"所属チームの都道府県を日本地図に表示します。位置はチーム登録の地域情報を使った概略表示です。",unknown:"地域未設定",local:"MY TEAM",japan:"JAPAN",world:"WORLD"},
 en:{title:"Your team is here. Your next opportunity can be anywhere.",lead:"Your home team is shown on a schematic map of Japan using the team region you registered.",unknown:"Region not set",local:"MY TEAM",japan:"JAPAN",world:"WORLD"},
 "zh-tw":{title:"你的球隊在這裡，下一個機會可以在日本全國與世界。",lead:"依照球隊登錄的地區，在日本地圖上以概略位置顯示所屬球隊。",unknown:"地區未設定",local:"MY TEAM",japan:"JAPAN",world:"WORLD"},
 ko:{title:"내 팀은 여기. 다음 기회는 일본 전국과 세계로.",lead:"팀 등록 시 입력한 지역을 기준으로 일본 지도에 소속팀을 개략적으로 표시합니다.",unknown:"지역 미설정",local:"MY TEAM",japan:"JAPAN",world:"WORLD"}
} as const;

const prefectures=Object.keys(coords);
function prefectureFromText(value:string|null){
 if(!value)return null;
 const exact=prefectures.find(pref=>value.includes(pref));
 if(exact)return exact;
 for(const [short,full] of Object.entries(aliases)){if(value.includes(short))return full;}
 return null;
}
function prefectureFromVenue(venue:string|null){return prefectureFromText(venue);}
export function JapanTeamMap({locale,teams,history=[]}:{locale:Locale;teams:TeamPoint[];history?:HistoryPoint[]}){
 const c=copy[locale];
 const japanTeams=teams.filter(t=>!t.country||t.country==="JP"||t.country==="Japan");
 const plotted=japanTeams.map(t=>({team:t,point:t.region?coords[normalize(t.region)]:undefined})).filter(x=>x.point) as {team:TeamPoint;point:[number,number]}[];
 const unknown=japanTeams.filter(t=>!t.region||!coords[normalize(t.region)]);
 const experiences=history.map(item=>({item,prefecture:prefectureFromVenue(item.venue)})).filter(x=>x.prefecture) as {item:HistoryPoint;prefecture:string}[];
 const today=new Date().toISOString().slice(0,10);
 const next=programmes
   .filter(p=>!p.registrationClosed&&p.startDate>=today&&p.region!=="online")
   .map(p=>({programme:p,prefecture:prefectureFromText(p.place[1])}))
   .filter(x=>x.prefecture) as {programme:(typeof programmes)[number];prefecture:string}[];
 return <section className={styles.wrap}>
   <div className={styles.head}><div><span>MY HOME COURT / MAP</span><h2>{c.title}</h2></div><p>{c.lead}</p></div>
   <div className={styles.stats}>
     <div><span>MY TEAM</span><strong>{plotted.length}</strong><small>{locale==="ja"?"所属チーム":locale==="zh-tw"?"所屬球隊":locale==="ko"?"소속팀":"home teams"}</small></div>
     <div><span>EXPERIENCE</span><strong>{new Set(experiences.map(x=>x.prefecture)).size}</strong><small>{locale==="ja"?"経験した都道府県":locale==="zh-tw"?"有經驗的都道府縣":locale==="ko"?"경험한 도도부현":"prefectures visited"}</small></div>
     <div><span>NEXT</span><strong>{new Set(next.map(x=>x.prefecture)).size}</strong><small>{locale==="ja"?"次に行ける地域":locale==="zh-tw"?"下一個可前往地區":locale==="ko"?"다음에 갈 수 있는 지역":"next regions"}</small></div>
   </div>
   <div className={styles.grid}>
     <div className={styles.mapCard}>
       <div className={styles.mapLabels}><span>{c.local}</span><span>{c.japan}</span><span>{c.world}</span></div>
       <svg viewBox="0 0 100 105" role="img" aria-label={c.title} className={styles.map}>
         <path d="M79 8c4 3 5 8 3 12-2 4-5 6-8 5-3-2-3-6-1-10 2-4 3-6 6-7Z" className={styles.land}/>
         <path d="M74 22c4 4 6 9 5 15-1 7-5 13-8 18-4 6-7 12-12 15-6 4-12 4-18 1-5-2-10-6-14-7-5-2-10 0-13 4-2 4-2 8-1 13" className={styles.mainland}/>
         <path d="M39 65c4 2 6 5 5 8-2 3-6 4-10 3-4-1-7-3-8-6 2-3 8-6 13-5Z" className={styles.land}/>
         <path d="M21 66c4 2 6 5 5 9-2 5-6 10-10 13-4-1-7-4-7-8 1-6 6-12 12-14Z" className={styles.land}/>
         <path d="M8 91c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4Z" className={styles.land}/>
         {next.map(({programme,prefecture})=>{const point=coords[prefecture];return <g key={"next-"+programme.id} transform={"translate("+point[0]+" "+point[1]+")"}><rect x="-3.3" y="-3.3" width="6.6" height="6.6" rx="1.2" className={styles.nextRing}/><circle r="1" className={styles.nextPin}/><title>{programme.title[1]} · {prefecture}</title></g>})}
         {experiences.map(({item,prefecture})=>{const point=coords[prefecture];return <g key={"history-"+item.id} transform={"translate("+point[0]+" "+point[1]+")"}><circle r="4.3" className={styles.experienceRing}/><circle r="1.1" className={styles.experiencePin}/><title>{item.title} · {prefecture}</title></g>})}
         {plotted.map(({team,point})=><g key={team.id} transform={"translate("+point[0]+" "+point[1]+")"}><circle r="3.1" className={styles.ring}/><circle r="1.35" className={styles.pin}/><title>{team.name} · {team.region}</title></g>)}
       </svg>
       <div className={styles.legend}><span><i className={styles.legendTeam}/>MY TEAM</span><span><i className={styles.legendExperience}/>EXPERIENCE</span><span><i className={styles.legendNext}/>NEXT</span></div>
       <p className={styles.note}>※ {locale==="ja"?"都道府県ベースの概略位置です。住所や現在地は公開しません。経験地は履歴の会場名に都道府県が明記されている場合だけ表示します。":locale==="zh-tw"?"以都道府縣為單位的概略位置，不公開地址或即時位置。只有活動紀錄中明確寫有都道府縣時才顯示經驗地。":locale==="ko"?"도도부현 기준 개략 위치이며 주소나 현재 위치는 공개하지 않습니다. 경험지는 기록의 장소명에 도도부현이 명확히 있는 경우에만 표시합니다.":"Schematic prefecture-level location. Exact addresses and live location are not shown. Experience markers appear only when the prefecture is explicitly present in the saved venue."}</p>
     </div>
     <div className={styles.list}>
       {plotted.map(({team})=><article key={team.id}><span>{team.region}</span><strong>{team.name}</strong></article>)}
       {unknown.map(team=><article key={team.id}><span>{c.unknown}</span><strong>{team.name}</strong></article>)}
       {experiences.slice(0,4).map(({item,prefecture})=><article key={"list-"+item.id}><span>EXPERIENCE · {prefecture}</span><strong>{item.title}</strong></article>)}
       {next.slice(0,4).map(({programme,prefecture})=><article key={"next-list-"+programme.id}><span>NEXT · {prefecture}</span><strong>{programme.title[1]}</strong><a href={programme.applicationUrl} target="_blank" rel="noreferrer">{locale==="ja"?"募集を見る":locale==="zh-tw"?"查看招募":locale==="ko"?"모집 보기":"View programme"}</a></article>)}
       {!teams.length?<article><span>{c.unknown}</span><strong>{locale==="ja"?"TEAM HOMEから所属チームを登録してください。":locale==="zh-tw"?"請從 TEAM HOME 登錄所屬球隊。":locale==="ko"?"TEAM HOME에서 소속팀을 등록하세요.":"Add your team from TEAM HOME."}</strong></article>:null}
     </div>
   </div>
 </section>;
}
