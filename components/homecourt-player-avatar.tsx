"use client";

import {useId} from "react";
import {Circle,BookOpen,Compass,Globe2,Trophy} from "lucide-react";
import styles from "./homecourt-player-avatar.module.css";

export type PlayerCustomization={
  skin_tone:"tone-1"|"tone-2"|"tone-3"|"tone-4"|"tone-5";
  hair_style:"spiky"|"short"|"crop"|"waves"|"curly"|"braids"|"long";
  hair_color:"black"|"brown"|"dark-brown"|"ash";
  jersey_style:"rba-black"|"rba-white"|"rba-signal"|"street-dark"|"practice-grey";
  shorts_style:"match"|"black"|"white"|"signal";
  shoe_style:"basic"|"high-top"|"low-top"|"court-pro"|"global";
  accessory:"none"|"wristband"|"sleeve"|"headband"|"towel";
  jersey_number:number;
  court_theme:"base"|"night"|"street"|"arena"|"global";
};

export const defaultPlayerCustomization:PlayerCustomization={
  skin_tone:"tone-3",hair_style:"spiky",hair_color:"dark-brown",jersey_style:"rba-black",
  shorts_style:"match",shoe_style:"basic",accessory:"none",jersey_number:23,court_theme:"base"
};

const skin={
  "tone-1":{base:"#f4cfb5",shade:"#dca688",highlight:"#ffe3cf"},
  "tone-2":{base:"#dfad88",shade:"#bd7e5b",highlight:"#f4c5a2"},
  "tone-3":{base:"#bc7f59",shade:"#8e573d",highlight:"#d99d74"},
  "tone-4":{base:"#8c593d",shade:"#653a29",highlight:"#aa7150"},
  "tone-5":{base:"#5c3829",shade:"#3f251d",highlight:"#774c39"}
} as const;

const hair={
  black:{base:"#141414",light:"#36302d"},
  brown:{base:"#5a3927",light:"#896044"},
  "dark-brown":{base:"#2c1d17",light:"#5e4030"},
  ash:{base:"#66635f",light:"#96918b"}
} as const;

const kit={
  "rba-black":{body:"#101315",shade:"#050607",trim:"#f3f4ef",accent:"#c6d05a",text:"#ffffff"},
  "rba-white":{body:"#f4f5ef",shade:"#ced2d0",trim:"#111416",accent:"#c6d05a",text:"#111416"},
  "rba-signal":{body:"#c6d05a",shade:"#919a35",trim:"#111416",accent:"#ffffff",text:"#111416"},
  "street-dark":{body:"#293137",shade:"#11181c",trim:"#ffffff",accent:"#6fd4e7",text:"#ffffff"},
  "practice-grey":{body:"#aeb6b8",shade:"#737b7e",trim:"#303638",accent:"#ffffff",text:"#111416"}
} as const;

function Hair({style,color,showBand=true}:{style:PlayerCustomization["hair_style"];color:{base:string;light:string};showBand?:boolean}){
  if(style==="curly")return <g>
    <g fill={color.base}>{[[84,61],[95,43],[111,32],[130,29],[149,34],[164,47],[169,64],[151,66],[131,59],[111,65],[93,72]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="17"/>)}</g>
    <g fill={color.light} opacity=".65">{[[97,42],[128,31],[157,49]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="7"/>)}</g>
  </g>;

  if(style==="braids")return <g>
    <path d="M81 70c0-34 18-53 48-53 31 0 49 21 49 56-23-15-69-13-97-3Z" fill={color.base}/>
    <path d="M93 55c21-13 46-17 68-2" fill="none" stroke={color.light} strokeWidth="6" strokeLinecap="round"/>
    <g stroke={color.base} strokeWidth="8" strokeLinecap="round"><path d="M91 61 77 118"/><path d="M104 58 96 124"/><path d="M155 59 164 122"/><path d="M168 64 181 116"/></g>
  </g>;

  if(style==="long")return <g>
    <path d="M76 72c1-37 20-57 52-57 34 0 54 23 54 61l-8 87-24-17-46 2-27 18Z" fill={color.base}/>
    <path d="M91 42c18-16 45-19 70-1" fill="none" stroke={color.light} strokeWidth="7" strokeLinecap="round"/>
  </g>;

  if(style==="waves")return <g>
    <path d="M80 70c3-33 21-51 49-51 30 0 48 20 50 53-27-14-70-12-99-2Z" fill={color.base}/>
    <path d="M91 44c12 6 20 6 31 0 11-6 21-6 36 0M90 56c13 6 21 6 32 0 11-6 21-6 36 0" fill="none" stroke={color.light} strokeWidth="4" strokeLinecap="round"/>
  </g>;

  if(style==="crop")return <g>
    <path d="M82 70c5-28 22-45 47-45 27 0 44 17 48 47-27-10-67-10-95-2Z" fill={color.base}/>
    <path d="M96 43c17-8 39-8 57 0" fill="none" stroke={color.light} strokeWidth="5" strokeLinecap="round"/>
  </g>;

  if(style==="short")return <g>
    <path d="M82 70c4-31 21-48 48-48 29 0 46 19 48 51-24-15-67-13-96-3Z" fill={color.base}/>
    <path d="M98 37c18-8 37-6 53 4" fill="none" stroke={color.light} strokeWidth="6" strokeLinecap="round"/>
  </g>;

  return <g>
    <path d="M79 71 86 49 96 53 98 31 110 39 119 17 129 34 143 12 148 36 166 24 164 45 181 39 173 62 184 69c-25-13-75-14-105 2Z" fill={color.base}/>
    <path d="M95 49 110 37M121 36l9-13M144 37l12-11M158 49l13-5" stroke={color.light} strokeWidth="5" strokeLinecap="round"/>
    {showBand?<g><path d="M84 64c27-10 66-10 93 0l-3 15c-29-9-58-9-87 0Z" fill="#111416"/><text x="130" y="73" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="950">RBA</text></g>:null}
  </g>;
}

function PlayerFace({config}:{config:PlayerCustomization}){
  const s=skin[config.skin_tone], h=hair[config.hair_color];
  return <g>
    <ellipse cx="77" cy="90" rx="10" ry="14" fill={s.base}/><ellipse cx="183" cy="90" rx="10" ry="14" fill={s.base}/>
    <ellipse cx="130" cy="87" rx="50" ry="58" fill={s.base}/>
    <path d="M92 89c8-10 22-13 34-5M137 84c12-8 27-5 34 5" fill="none" stroke={s.shade} strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="111" cy="96" rx="10" ry="13" fill="#fff"/>
    <ellipse cx="151" cy="96" rx="10" ry="13" fill="#fff"/>
    <ellipse cx="112" cy="98" rx="6.5" ry="8.5" fill="#30251f"/><ellipse cx="150" cy="98" rx="6.5" ry="8.5" fill="#30251f"/>
    <circle cx="114" cy="95" r="2.4" fill="#fff"/><circle cx="152" cy="95" r="2.4" fill="#fff"/>
    <path d="M130 102c-2 5-3 8 2 9" fill="none" stroke={s.shade} strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M115 121c10 8 22 8 32 0" fill="none" stroke="#673d32" strokeWidth="3" strokeLinecap="round"/>
    <path d="M102 116c-6 2-9 4-11 7M159 116c6 2 9 4 11 7" stroke={s.highlight} strokeWidth="3" strokeLinecap="round" opacity=".35"/>
    <Hair style={config.hair_style} color={h}/>
    {config.accessory==="headband"&&config.hair_style!=="spiky"?<g><path d="M84 66c28-9 65-9 93 0" fill="none" stroke="#111416" strokeWidth="10"/><text x="130" y="69" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="950">RBA</text></g>:null}
  </g>;
}

export function RbaPlayerAvatar({config,name="PLAYER"}:{config:PlayerCustomization;name?:string}){
  const id=useId().replace(/:/g,"");
  const s=skin[config.skin_tone], k=kit[config.jersey_style];
  const shortsColor=config.shorts_style==="white"?"#f4f5ef":config.shorts_style==="signal"?"#c6d05a":config.shorts_style==="black"?"#090a0b":k.body;
  const shoe=config.shoe_style==="global"?{body:"#f5f6f2",accent:"#c6d05a"}:config.shoe_style==="court-pro"?{body:"#f7f7f3",accent:"#111416"}:config.shoe_style==="high-top"?{body:"#171b1e",accent:"#f4f5ef"}:config.shoe_style==="low-top"?{body:"#f0f2ef",accent:"#6fd4e7"}:{body:"#f7f7f2",accent:"#111416"};

  return <div className={styles.avatarWrap} aria-label={`${name}のMY PLAYERキャラクター`}>
    <svg viewBox="0 0 260 420" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-jersey`} x1="0" x2="1"><stop offset="0" stopColor={k.body}/><stop offset="1" stopColor={k.shade}/></linearGradient>
        <radialGradient id={`${id}-ball`} cx=".35" cy=".3"><stop offset="0" stopColor="#f29a42"/><stop offset=".65" stopColor="#d86b1f"/><stop offset="1" stopColor="#9a4216"/></radialGradient>
      </defs>
      <ellipse cx="132" cy="398" rx="92" ry="15" fill="#00000036"/>

      <path d="M98 269c11 2 24 3 35 2l-11 83-28-2Z" fill={s.base}/>
      <path d="M139 271c11 1 23 0 34-3l10 84-29 2Z" fill={s.base}/>
      <path d="M94 338h30l2 24H92Z" fill="#f4f5ef"/><path d="M153 338h30l2 24h-32Z" fill="#f4f5ef"/>
      <path d="M96 345h24M155 345h24" stroke="#111416" strokeWidth="4" opacity=".8"/>

      <g>
        <path d="M77 354c16-7 34-6 47 2l7 26c-15 12-56 14-68 5 1-13 5-25 14-33Z" fill={shoe.body} stroke="#111416" strokeWidth="4"/>
        <path d="M149 357c17-8 34-7 48 2 8 8 12 18 12 28-14 10-55 8-67-2Z" fill={shoe.body} stroke="#111416" strokeWidth="4"/>
        <path d="M75 372c16-4 33-3 48 2M153 374c17-3 33-2 47 2" stroke={shoe.accent} strokeWidth="7" strokeLinecap="round"/>
        <path d="M84 360h30M159 362h28" stroke="#6a6f72" strokeWidth="2.5" strokeDasharray="5 4"/>
      </g>

      <path d="M89 224c24-13 57-14 84-1l10 67c-28 17-70 17-101 1Z" fill={shortsColor} stroke={k.trim} strokeWidth="4"/>
      <path d="M130 229v62M94 275c20 5 50 5 79-1" fill="none" stroke={k.trim} strokeWidth="3" opacity=".7"/>
      <text x="98" y="282" fill={k.text} fontSize="10" fontWeight="950">RBA</text>

      <path d="M96 148c19-12 48-12 68 0 13 25 20 54 19 87-31 17-73 17-104 0-1-33 6-62 17-87Z" fill={`url(#${id}-jersey)`} stroke={k.trim} strokeWidth="5"/>
      <path d="M103 148c3 13 13 21 27 21 14 0 24-8 28-21" fill="none" stroke={k.trim} strokeWidth="5"/>
      <path d="M91 162c-10 19-17 43-19 67M170 161c12 20 19 42 21 67" fill="none" stroke={s.base} strokeWidth="21" strokeLinecap="round"/>
      <path d="M75 224c-2 18-5 31-11 44" fill="none" stroke={s.base} strokeWidth="19" strokeLinecap="round"/>
      <path d="M191 226c2 17 6 31 12 43" fill="none" stroke={s.base} strokeWidth="19" strokeLinecap="round"/>

      {config.accessory==="sleeve"?<path d="M186 190c5 16 7 29 6 43" stroke="#111416" strokeWidth="17" strokeLinecap="round"/>:null}
      {config.accessory==="wristband"?<path d="M67 242 63 256" stroke={k.accent} strokeWidth="11" strokeLinecap="round"/>:null}
      {config.accessory==="towel"?<path d="M165 238h18v52h-18Z" fill="#f2f3ef" stroke="#b8bfbb" strokeWidth="2"/>:null}

      <circle cx="67" cy="258" r="38" fill={`url(#${id}-ball)`} stroke="#6f2e13" strokeWidth="3"/>
      <path d="M30 258h74M67 220c-17 19-17 57 0 76M67 220c17 19 17 57 0 76M39 232c16 15 41 37 57 53" fill="none" stroke="#5d2611" strokeWidth="3"/>
      <text x="67" y="264" fill="#1a0d08" textAnchor="middle" fontSize="13" fontWeight="950" transform="rotate(-16 67 264)">RBA</text>

      <text x="130" y="190" fill={k.text} textAnchor="middle" fontSize="20" fontWeight="950" letterSpacing="1">RBA</text>
      <text x="130" y="225" fill={k.text} textAnchor="middle" fontSize="38" fontWeight="950">{config.jersey_number}</text>
      <rect x="108" y="132" width="45" height="28" rx="13" fill={s.base}/>
      <PlayerFace config={config}/>
    </svg>
    <div className={styles.nameplate}><span>MY PLAYER</span><strong>{name||"PLAYER"}</strong></div>
  </div>;
}

export function RbaPlayerMiniAvatar({skinTone="tone-3",hairStyle="spiky",hairColor="dark-brown",jerseyStyle="rba-black",jerseyNumber=23}:{skinTone?:PlayerCustomization["skin_tone"];hairStyle?:PlayerCustomization["hair_style"];hairColor?:PlayerCustomization["hair_color"];jerseyStyle?:PlayerCustomization["jersey_style"];jerseyNumber?:number}){
  const config:PlayerCustomization={...defaultPlayerCustomization,skin_tone:skinTone,hair_style:hairStyle,hair_color:hairColor,jersey_style:jerseyStyle,jersey_number:jerseyNumber};
  const s=skin[config.skin_tone], k=kit[config.jersey_style];
  return <div className={styles.miniAvatar}>
    <svg viewBox="58 15 145 185" role="img" aria-label="MY PLAYER">
      <path d="M95 146c20-13 51-13 71 0l11 62H83Z" fill={k.body} stroke={k.trim} strokeWidth="5"/>
      <text x="130" y="178" fill={k.text} textAnchor="middle" fontSize="18" fontWeight="950">RBA</text>
      <text x="130" y="201" fill={k.text} textAnchor="middle" fontSize="24" fontWeight="950">{config.jersey_number}</text>
      <rect x="108" y="132" width="45" height="28" rx="13" fill={s.base}/>
      <PlayerFace config={config}/>
    </svg>
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
