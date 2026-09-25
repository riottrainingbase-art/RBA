"use client";

import {FormEvent,useEffect,useMemo,useState} from "react";
import {CheckCircle2,Globe2,LoaderCircle,ShieldCheck} from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import type {Locale} from "./site-frame";
import styles from "./global-development-profile.module.css";

type Props={userId:string;locale:Locale};
type Profile={
 primary_position:string|null;
 development_stage:string|null;
 long_term_goal:string|null;
 current_focus:string|null;
 preferred_regions:string[];
 preferred_countries:string[];
 preferred_languages:string[];
 opportunity_types:string[];
 travel_scope:string;
 international_interest:boolean;
 next_12_month_goal:string|null;
 profile_completion:number;
};

const empty:Profile={
 primary_position:null,development_stage:"learning",long_term_goal:null,current_focus:null,
 preferred_regions:[],preferred_countries:[],preferred_languages:[],opportunity_types:[],
 travel_scope:"local",international_interest:false,next_12_month_goal:null,profile_completion:0
};

const copy={
 ja:{eyebrow:"GLOBAL DEVELOPMENT PROFILE",title:"世界を意識する前に、自分を知る。",lead:"興味のある地域や活動、今取り組んでいることを残すと、MY HOME COURTが次の機会を提案しやすくなります。海外への参加や選考結果を保証するものではありません。",completion:"PROFILE",position:"主に取り組むポジション",stage:"今の成長段階",focus:"今、伸ばしたいこと",long:"長期的に目指したい姿",year:"この12か月で挑戦したいこと",scope:"参加を検討できる範囲",countries:"興味のある国・地域",languages:"触れてみたい言語",types:"興味のある機会",international:"海外・国際交流の情報も見たい",save:"プロフィールを保存",saved:"保存しました",privacy:"この情報は、MY HOME COURTで次の機会を提案するために使う非公開情報です。他の利用者には公開されません。",stages:{foundation:"基礎をつくる",learning:"学びを広げる",developing:"実戦で伸ばす",advanced:"高い強度へ挑戦",performance:"競技パフォーマンスを高める"},scopes:{local:"地域中心",national:"全国まで",asia:"アジアまで",global:"世界まで"},opps:{clinic:"クリニック",camp:"Development Camp",game:"ゲーム・大会",united:"RBA UNITED",exchange:"国際交流",online:"オンライン学習",coach:"指導者講習"}},
 en:{eyebrow:"GLOBAL DEVELOPMENT PROFILE",title:"Know yourself before chasing the world.",lead:"Save what you are working on and the places or experiences you want to explore. MY HOME COURT uses this to make the next step more relevant. It does not guarantee selection or travel.",completion:"PROFILE",position:"Primary position",stage:"Development stage",focus:"Current focus",long:"Long-term direction",year:"Challenge for the next 12 months",scope:"Preferred scope",countries:"Countries / regions of interest",languages:"Languages to explore",types:"Opportunities of interest",international:"Show international opportunities too",save:"Save profile",saved:"Saved",privacy:"This is a private preference profile used to improve MY HOME COURT recommendations. It is not a public player profile.",stages:{foundation:"Foundation",learning:"Learning",developing:"Developing",advanced:"Advanced",performance:"Performance"},scopes:{local:"Local",national:"National",asia:"Asia",global:"Global"},opps:{clinic:"Clinic",camp:"Development Camp",game:"Games / tournaments",united:"RBA UNITED",exchange:"International exchange",online:"Online learning",coach:"Coach education"}},
 "zh-tw":{eyebrow:"GLOBAL DEVELOPMENT PROFILE",title:"在看世界之前，先了解自己。",lead:"記錄目前想提升的內容與感興趣的地區或活動，MY HOME COURT會更容易推薦下一步。這不代表保證入選或海外參加。",completion:"PROFILE",position:"主要位置",stage:"目前培育階段",focus:"目前想提升的內容",long:"長期想成為的樣子",year:"未來12個月想挑戰的事",scope:"希望活動範圍",countries:"感興趣的國家・地區",languages:"想接觸的語言",types:"感興趣的機會",international:"也想看到海外・國際交流資訊",save:"儲存資料",saved:"已儲存",privacy:"此資料僅用於提升MY HOME COURT推薦，不會作為公開球員資料。",stages:{foundation:"建立基礎",learning:"擴大學習",developing:"實戰成長",advanced:"挑戰更高強度",performance:"提升競技表現"},scopes:{local:"地區",national:"日本全國",asia:"亞洲",global:"全球"},opps:{clinic:"訓練營",camp:"Development Camp",game:"比賽・賽事",united:"RBA UNITED",exchange:"國際交流",online:"線上學習",coach:"教練講習"}},
 ko:{eyebrow:"GLOBAL DEVELOPMENT PROFILE",title:"세계를 보기 전에, 먼저 나를 압니다.",lead:"지금 키우고 싶은 것과 관심 지역·활동을 남기면 MY HOME COURT가 더 알맞은 다음 기회를 보여줄 수 있습니다. 선발이나 해외 참가를 보장하지 않습니다.",completion:"PROFILE",position:"주 포지션",stage:"현재 육성 단계",focus:"지금 키우고 싶은 것",long:"장기적으로 원하는 모습",year:"앞으로 12개월의 도전",scope:"희망 활동 범위",countries:"관심 국가・지역",languages:"접해 보고 싶은 언어",types:"관심 기회",international:"해외・국제 교류 정보도 보기",save:"프로필 저장",saved:"저장했습니다",privacy:"이 정보는 MY HOME COURT 추천을 위한 비공개 정보이며 공개 선수 프로필이 아닙니다.",stages:{foundation:"기초 만들기",learning:"배움 넓히기",developing:"실전에서 성장",advanced:"높은 강도 도전",performance:"경기력 향상"},scopes:{local:"지역 중심",national:"전국",asia:"아시아",global:"세계"},opps:{clinic:"클리닉",camp:"Development Camp",game:"경기・대회",united:"RBA UNITED",exchange:"국제 교류",online:"온라인 학습",coach:"코치 교육"}}
} as const;

const languages=["English","日本語","繁體中文","한국어","Español","Deutsch"];
const opportunityKeys=["clinic","camp","game","united","exchange","online"] as const;
function split(value:string){return [...new Set(value.split(",").map(x=>x.trim()).filter(Boolean))].slice(0,12)}
function completion(p:Profile){
 const parts=[p.primary_position,p.development_stage,p.current_focus,p.long_term_goal,p.next_12_month_goal,p.preferred_countries.length,p.preferred_languages.length,p.opportunity_types.length];
 return Math.round(parts.filter(Boolean).length/parts.length*100);
}

export function GlobalDevelopmentProfile({userId,locale}:Props){
 const c=copy[locale]; const db=useMemo(()=>createClient(),[]);
 const [profile,setProfile]=useState<Profile>(empty),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 useEffect(()=>{const timer=window.setTimeout(async()=>{
   const {data}=await db.from("player_development_profiles").select("primary_position,development_stage,long_term_goal,current_focus,preferred_regions,preferred_countries,preferred_languages,opportunity_types,travel_scope,international_interest,next_12_month_goal,profile_completion").eq("user_id",userId).maybeSingle();
   if(data)setProfile({...empty,...data} as Profile);setLoading(false);
 },0);return()=>window.clearTimeout(timer)},[db,userId]);
 async function save(e:FormEvent<HTMLFormElement>){
   e.preventDefault();setBusy(true);setMessage("");
   const form=new FormData(e.currentTarget);
   const next:Profile={
    ...profile,
    primary_position:String(form.get("position")||"").trim()||null,
    development_stage:String(form.get("stage")||"learning"),
    current_focus:String(form.get("focus")||"").trim()||null,
    long_term_goal:String(form.get("long")||"").trim()||null,
    next_12_month_goal:String(form.get("year")||"").trim()||null,
    travel_scope:String(form.get("scope")||"local"),
    preferred_countries:split(String(form.get("countries")||"")),
    preferred_languages:languages.filter(x=>form.getAll("languages").includes(x)),
    opportunity_types:opportunityKeys.filter(x=>form.getAll("types").includes(x)),
    preferred_regions:profile.preferred_regions||[],
    international_interest:form.get("international")==="on",
    profile_completion:0
   };
   next.profile_completion=completion(next);
   const {error}=await db.from("player_development_profiles").upsert({user_id:userId,...next,public_visibility:"private",updated_at:new Date().toISOString()},{onConflict:"user_id"});
   if(error)setMessage(locale==="ja"?"保存できませんでした。もう一度お試しください。":"Could not save. Please try again.");else{setProfile(next);setMessage(c.saved);}
   setBusy(false);
 }
 if(loading)return <section className={styles.shell}><LoaderCircle className={styles.spin}/></section>;
 const scopeOrder=["local","national","asia","global"] as const;
 const activeScope=Math.max(0,scopeOrder.indexOf((profile.travel_scope||"local") as typeof scopeOrder[number]));
 return <section className={styles.shell} aria-labelledby="global-profile-title">
   <header><div><p>{c.eyebrow}</p><h3 id="global-profile-title">{c.title}</h3><span>{c.lead}</span></div><div className={styles.score}><small>{c.completion}</small><strong>{profile.profile_completion}%</strong><i><b style={{width:`${profile.profile_completion}%`}}/></i></div></header>
   <div className={styles.horizon}>
     <div className={styles.horizonHead}><span>MY HORIZON</span><strong>{({ja:"今の場所から、どこまで視野を広げたいか。",en:"How far do you want your basketball horizon to reach?","zh-tw":"從現在的位置，想把籃球視野拓展到哪裡？",ko:"지금 있는 곳에서 농구의 시야를 어디까지 넓히고 싶은가?"})[locale]}</strong></div>
     <div className={styles.horizonSteps}>
       {scopeOrder.map((scope,index)=><div key={scope} className={index<=activeScope?styles.scopeActive:undefined}><span>{String(index+1).padStart(2,"0")}</span><strong>{scope==="local"?"LOCAL":scope==="national"?"JAPAN":scope==="asia"?"ASIA":"WORLD"}</strong><small>{c.scopes[scope]}</small></div>)}
     </div>
     <div className={styles.interests}>
       <div><span>{({ja:"興味のある国・地域",en:"Countries / regions of interest","zh-tw":"感興趣的國家・地區",ko:"관심 국가·지역"})[locale]}</span><p>{profile.preferred_countries.length?profile.preferred_countries.join(" · "):({ja:"まだ設定していません",en:"Not set yet","zh-tw":"尚未設定",ko:"아직 설정하지 않음"})[locale]}</p></div>
       <div><span>{({ja:"興味のある機会",en:"Opportunity interests","zh-tw":"感興趣的機會",ko:"관심 기회"})[locale]}</span><p>{profile.opportunity_types.length?profile.opportunity_types.map(key=>(c.opps as Record<string,string>)[key]||key).join(" · "):({ja:"まだ設定していません",en:"Not set yet","zh-tw":"尚未設定",ko:"아직 설정하지 않음"})[locale]}</p></div>
     </div>
     <div className={styles.nextRoute}>
       <span>NEXT ROUTE</span>
       <strong>{profile.travel_scope==="local"?({ja:"まずは地域の中で、良い学びを増やす。",en:"Build stronger learning close to home.","zh-tw":"先在地區內增加更好的學習。",ko:"먼저 지역 안에서 좋은 배움을 늘립니다."})[locale]:profile.travel_scope==="national"?({ja:"日本全国から、育成と挑戦を選ぶ。",en:"Choose development and challenge opportunities across Japan.","zh-tw":"從日本全國選擇培育與挑戰機會。",ko:"일본 전국에서 성장과 도전 기회를 선택합니다."})[locale]:profile.travel_scope==="asia"?({ja:"日本とアジアを行き来する視野を持つ。",en:"Build a development view across Japan and Asia.","zh-tw":"建立往返日本與亞洲的培育視野。",ko:"일본과 아시아를 오가는 성장 시야를 만듭니다."})[locale]:({ja:"世界を日常の比較対象にする。",en:"Make the world part of your everyday development reference.","zh-tw":"讓世界成為日常培育的比較基準。",ko:"세계를 일상적인 성장의 비교 기준으로 둡니다."})[locale]}</strong>
       <div>
         {profile.travel_scope==="local"?<a href={locale==="en"?"/opportunities":`/${locale}/opportunities`}>{({ja:"地域の育成機会を見る",en:"Explore local opportunities","zh-tw":"查看地區培育機會",ko:"지역 성장 기회 보기"})[locale]}</a>:null}
         {profile.travel_scope==="national"?<><a href={locale==="en"?"/camp":`/${locale}/camp`}>Development Camp</a><a href={locale==="en"?"/united":`/${locale}/united`}>RBA UNITED</a></>:null}
         {profile.travel_scope==="asia"?<><a href={locale==="en"?"/international":`/${locale}/international`}>{({ja:"アジア交流を見る",en:"Explore Asia exchange","zh-tw":"查看亞洲交流",ko:"아시아 교류 보기"})[locale]}</a><a href={locale==="en"?"/asia":`/${locale}/asia`}>Japan × Asia</a></>:null}
         {profile.travel_scope==="global"?<><a href={locale==="en"?"/international":`/${locale}/international`}>{({ja:"世界の育成機会を見る",en:"Explore global opportunities","zh-tw":"查看全球培育機會",ko:"세계 성장 기회 보기"})[locale]}</a><a href={locale==="en"?"/journal":`/${locale}/journal`}>{({ja:"世界の育成記事を読む",en:"Read global development stories","zh-tw":"閱讀全球培育文章",ko:"세계 육성 기사 읽기"})[locale]}</a></>:null}
       </div>
     </div>
     <p className={styles.horizonNote}>{({ja:"海外志向の強さを競うための機能ではありません。今の自分に必要な範囲を、自分で選ぶためのプロフィールです。",en:"This is not a score for how international you are. It helps you choose the right scope for your development now.","zh-tw":"這不是比較誰更國際化的分數，而是幫助你選擇目前適合自己的成長範圍。",ko:"국제적 성향을 경쟁하는 점수가 아닙니다. 지금 자신에게 필요한 성장 범위를 스스로 선택하기 위한 프로필입니다."})[locale]}</p>
   </div>
   <form onSubmit={save}>
    <label>{c.position}<input name="position" defaultValue={profile.primary_position||""} maxLength={60} placeholder="PG / SG / Wing / Big"/></label>
    <label>{c.stage}<select name="stage" defaultValue={profile.development_stage||"learning"}>{Object.entries(c.stages).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
    <label className={styles.wide}>{c.focus}<textarea name="focus" defaultValue={profile.current_focus||""} maxLength={500}/></label>
    <label className={styles.wide}>{c.long}<textarea name="long" defaultValue={profile.long_term_goal||""} maxLength={500}/></label>
    <label className={styles.wide}>{c.year}<textarea name="year" defaultValue={profile.next_12_month_goal||""} maxLength={500}/></label>
    <label>{c.scope}<select name="scope" defaultValue={profile.travel_scope||"local"}>{Object.entries(c.scopes).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
    <label>{c.countries}<input name="countries" defaultValue={(profile.preferred_countries||[]).join(", ")} placeholder={locale==="ja"?"例：台湾, 韓国, ドイツ":"Taiwan, Korea, Germany"}/></label>
    <fieldset className={styles.wide}><legend>{c.languages}</legend><div className={styles.checks}>{languages.map(x=><label key={x}><input type="checkbox" name="languages" value={x} defaultChecked={profile.preferred_languages.includes(x)}/><span>{x}</span></label>)}</div></fieldset>
    <fieldset className={styles.wide}><legend>{c.types}</legend><div className={styles.checks}>{opportunityKeys.map(x=><label key={x}><input type="checkbox" name="types" value={x} defaultChecked={profile.opportunity_types.includes(x)}/><span>{c.opps[x]}</span></label>)}</div></fieldset>
    <label className={styles.toggle}><input type="checkbox" name="international" defaultChecked={profile.international_interest}/><Globe2/><span>{c.international}</span></label>
    <div className={styles.footer}><p><ShieldCheck/>{c.privacy}</p><button disabled={busy}>{busy?<LoaderCircle className={styles.spin}/>:<CheckCircle2/>}{c.save}</button></div>
    {message?<p className={styles.message} role="status">{message}</p>:null}
   </form>
 </section>;
}
