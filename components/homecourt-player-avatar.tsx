"use client";

import {Circle,BookOpen,Compass,Globe2,Trophy} from "lucide-react";
import styles from "./homecourt-player-avatar.module.css";

export type PlayerCustomization={
  skin_tone:"tone-1"|"tone-2"|"tone-3"|"tone-4"|"tone-5";
  hair_style:"short"|"crop"|"waves"|"curly"|"braids"|"long";
  hair_color:"black"|"brown"|"dark-brown"|"ash";
  jersey_style:"rba-black"|"rba-white"|"rba-signal"|"street-dark"|"practice-grey";
  shorts_style:"match"|"black"|"white"|"signal";
  shoe_style:"basic"|"high-top"|"low-top"|"court-pro"|"global";
  accessory:"none"|"wristband"|"sleeve"|"headband"|"towel";
  jersey_number:number;
  court_theme:"base"|"night"|"street"|"arena"|"global";
};

export const defaultPlayerCustomization:PlayerCustomization={
  skin_tone:"tone-3",hair_style:"short",hair_color:"black",jersey_style:"rba-black",
  shorts_style:"match",shoe_style:"basic",accessory:"none",jersey_number:0,court_theme:"base"
};

const skin={ "tone-1":"#f4cfb5","tone-2":"#dfad88","tone-3":"#bc7f59","tone-4":"#8c593d","tone-5":"#5c3829"} as const;
const hair={black:"#131313",brown:"#5a3927","dark-brown":"#2c1d17",ash:"#66635f"} as const;
const kit={
  "rba-black":{body:"#111416",trim:"#c6d05a",text:"#fff"},
  "rba-white":{body:"#f4f5ef",trim:"#111416",text:"#111416"},
  "rba-signal":{body:"#c6d05a",trim:"#111416",text:"#111416"},
  "street-dark":{body:"#293137",trim:"#fff",text:"#fff"},
  "practice-grey":{body:"#aeb6b8",trim:"#303638",text:"#111416"},
} as const;

function Hair({style,color}:{style:PlayerCustomization["hair_style"];color:string}){
  if(style==="curly")return <g fill={color}>{[[88,50],[101,34],[119,28],[137,32],[153,43],[159,59],[142,60],[122,54],[102,60]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="16"/>)}</g>;
  if(style==="braids")return <><path d="M83 61c2-29 18-43 43-43s43 16 44 44c-25-12-61-9-87-1Z" fill={color}/><g stroke={color} strokeWidth="7" strokeLinecap="round"><path d="M93 55 82 100"/><path d="M104 52 98 104"/><path d="M151 53 159 100"/><path d="M160 58 173 98"/></g></>;
  if(style==="long")return <path d="M81 62c2-31 18-45 45-45 28 0 45 18 45 48l-8 67-23-12-35 3-23 10Z" fill={color}/>;
  if(style==="waves")return <><path d="M82 60c2-27 18-42 44-42 27 0 43 17 45 44-25-12-62-10-89-2Z" fill={color}/><path d="M91 43c12 5 18 5 29 0s20-5 32 0M91 53c12 5 18 5 29 0s20-5 32 0" fill="none" stroke="#ffffff33" strokeWidth="3"/></>;
  if(style==="crop")return <path d="M83 58c4-23 20-37 43-37 24 0 39 14 43 38-24-8-59-8-86-1Z" fill={color}/>;
  return <path d="M84 58c5-26 20-39 43-39 24 0 39 15 42 41-21-11-58-11-85-2Z" fill={color}/>;
}

export function RbaPlayerAvatar({config,name="PLAYER"}:{config:PlayerCustomization;name?:string}){
  const k=kit[config.jersey_style];
  const shoe=config.shoe_style==="global"?"#c6d05a":config.shoe_style==="court-pro"?"#f4f5ef":config.shoe_style==="high-top"?"#24292c":config.shoe_style==="low-top"?"#848c90":"#4c5559";
  const shortsColor=config.shorts_style==="white"?"#f4f5ef":config.shorts_style==="signal"?"#c6d05a":config.shorts_style==="black"?"#090a0b":k.body;
  return <div className={styles.avatarWrap} aria-label={`${name}のMY PLAYERキャラクター`}>
    <svg viewBox="0 0 250 370" role="img">
      <ellipse cx="125" cy="346" rx="77" ry="13" fill="#00000035"/>
      <path d="M101 217 91 319h26l12-94Z" fill={skin[config.skin_tone]}/>
      <path d="M148 217 160 319h-27l-12-94Z" fill={skin[config.skin_tone]}/>
      <path d="M87 304h34v29c-7 9-42 9-48 2 0-11 6-23 14-31Z" fill={shoe}/>
      <path d="M130 304h35c8 9 13 19 13 30-7 8-43 8-49-2Z" fill={shoe}/>
      {config.shoe_style==="high-top"?<><path d="M87 294h33v19H86Z" fill={shoe}/><path d="M132 294h32v19h-32Z" fill={shoe}/></>:null}
      <path d="M93 183c21-13 46-13 65 0l9 70c-28 14-58 14-84 0Z" fill={shortsColor}/>
      <path d="M95 128c16-9 45-9 61 0l18 63-20 18-11-38v58h-37v-58l-11 38-20-18Z" fill={k.body} stroke={k.trim} strokeWidth="5"/>
      <path d="M76 190 63 248" stroke={skin[config.skin_tone]} strokeWidth="20" strokeLinecap="round"/>
      <path d="M173 190 189 247" stroke={skin[config.skin_tone]} strokeWidth="20" strokeLinecap="round"/>
      {config.accessory==="sleeve"?<path d="M177 194 188 232" stroke="#111416" strokeWidth="16" strokeLinecap="round"/>:null}
      {config.accessory==="wristband"?<path d="M64 226 61 240" stroke="#c6d05a" strokeWidth="10" strokeLinecap="round"/>:null}
      {config.accessory==="towel"?<path d="M151 226h18v49h-18Z" fill="#f2f3ef"/>:null}
      <text x="125" y="160" fill={k.text} textAnchor="middle" fontSize="17" fontWeight="900">RBA</text>
      <text x="125" y="193" fill={k.text} textAnchor="middle" fontSize="30" fontWeight="900">{config.jersey_number}</text>
      <rect x="102" y="93" width="47" height="43" rx="18" fill={skin[config.skin_tone]}/>
      <ellipse cx="125" cy="72" rx="45" ry="52" fill={skin[config.skin_tone]}/>
      <Hair style={config.hair_style} color={hair[config.hair_color]}/>
      {config.accessory==="headband"?<path d="M84 66c25-8 57-8 83 0" fill="none" stroke="#c6d05a" strokeWidth="8"/>:null}
      <circle cx="109" cy="78" r="3.2" fill="#151515"/><circle cx="141" cy="78" r="3.2" fill="#151515"/>
      <path d="M114 99c7 6 15 6 22 0" fill="none" stroke="#55342b" strokeWidth="3" strokeLinecap="round"/>
    </svg>
    <div className={styles.nameplate}><span>MY PLAYER</span><strong>{name||"PLAYER"}</strong></div>
  </div>;
}

export type CourtUnlocks={
  ballRack:boolean; notebook:boolean; scoutBoard:boolean; teamBanner:boolean;
  nextBoard:boolean; globe:boolean; trophy:boolean; officialMemory:boolean;
};

export function RbaHomeCourtScene({config,unlocks,children,compact=false}:{config:PlayerCustomization;unlocks:CourtUnlocks;children:React.ReactNode;compact?:boolean}){
  return <div className={styles.court} data-theme={config.court_theme} data-compact={compact?"true":"false"}>
    <div className={styles.wall}>
      <div className={styles.wordmark}>RBA <small>MY HOME COURT</small></div>
      {unlocks.teamBanner?<div className={styles.banner}>TEAM CONNECTION</div>:null}
      {unlocks.officialMemory?<div className={styles.official}>RBA VERIFIED MEMORY</div>:null}
      {unlocks.globe?<div className={styles.wallItem}><Globe2/><span>WORLD</span></div>:null}
      {unlocks.scoutBoard?<div className={styles.board}><Compass/><span>NEXT COURTS</span><i/><i/><i/></div>:null}
    </div>
    <div className={styles.floor}>
      <div className={styles.key}><span/></div>
      <div className={styles.playerStage}>{children}</div>
      {unlocks.ballRack?<div className={styles.propBall}><Circle/><Circle/><Circle/></div>:null}
      {unlocks.notebook?<div className={styles.propBook}><BookOpen/><span>JOURNAL</span></div>:null}
      {unlocks.nextBoard?<div className={styles.propNext}><span>NEXT</span><strong>CHALLENGE</strong></div>:null}
      {unlocks.trophy?<div className={styles.propTrophy}><Trophy/><span>SEASON</span></div>:null}
    </div>
  </div>;
}
