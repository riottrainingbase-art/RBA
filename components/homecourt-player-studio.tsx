"use client";

import {useEffect,useMemo,useState} from "react";
import {Check,LockKeyhole,LoaderCircle,Save,Sparkles,Star} from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import {defaultPlayerCustomization,PlayerCustomization,RbaHomeCourtScene,RbaPlayerAvatar} from "./homecourt-player-avatar";
import styles from "./homecourt-player-studio.module.css";

type Props={
  userId:string;
  name:string;
  level:number;
  historyCount:number;
  savedCount:number;
  journalViews:number;
  teamLinked:boolean;
  hasNextEvent:boolean;
  seasonClear:boolean;
};

type OfficialMemory={id:string;events:{title?:string|null;country?:string|null;region?:string|null;starts_at?:string|null}|null};

const hairOptions=[
  ["short","SHORT",1],["crop","CROP",1],["waves","WAVES",2],["curly","CURLY",3],["braids","BRAIDS",4],["long","LONG",5]
] as const;
const jerseyOptions=[
  ["rba-black","RBA BLACK",1],["practice-grey","PRACTICE",1],["rba-white","RBA WHITE",2],["rba-signal","SIGNAL",3],["street-dark","STREET",4]
] as const;
const shoeOptions=[
  ["basic","BASIC",1,"level"],["high-top","HIGH TOP",2,"level"],["low-top","LOW TOP",3,"level"],["court-pro","RBA EVENT",1,"official"],["global","GLOBAL",1,"world"]
] as const;
const accessoryOptions=[
  ["none","NONE",1,"level"],["wristband","WRIST",2,"level"],["sleeve","SLEEVE",3,"level"],["headband","HEADBAND",4,"level"],["towel","RBA TOWEL",1,"official"]
] as const;
const themeOptions=[
  ["base","HOME",1,"level"],["night","NIGHT",2,"level"],["street","STREET",3,"level"],["arena","ARENA",1,"official3"],["global","GLOBAL",1,"world"]
] as const;

function unlocked(kind:string,need:number,level:number,officialCount:number,hasWorld:boolean){
  if(kind==="world")return hasWorld;
  if(kind==="official")return officialCount>=1;
  if(kind==="official3")return officialCount>=3;
  return level>=need;
}

export function HomecourtPlayerStudio({userId,name,level,historyCount,savedCount,journalViews,teamLinked,hasNextEvent,seasonClear}:Props){
  const supabase=useMemo(()=>createClient(),[]);
  const [config,setConfig]=useState<PlayerCustomization>(defaultPlayerCustomization);
  const [official,setOfficial]=useState<OfficialMemory[]>([]);
  const [officialCount,setOfficialCount]=useState(0);
  const [hasVerifiedWorld,setHasVerifiedWorld]=useState(false);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [status,setStatus]=useState("");

  useEffect(()=>{
    let active=true;
    void (async()=>{
      const [customQ,memoryQ,officialCountQ,worldQ]=await Promise.all([
        supabase.from("homecourt_player_customization")
          .select("skin_tone,hair_style,hair_color,jersey_style,shorts_style,shoe_style,accessory,jersey_number,court_theme")
          .eq("user_id",userId).maybeSingle(),
        supabase.from("participations")
          .select("id,attendance_status,joined_at,events(title,country,region,starts_at)")
          .eq("player_user_id",userId)
          .eq("attendance_status","attended")
          .order("joined_at",{ascending:false})
          .limit(6),
        supabase.from("participations")
          .select("id",{count:"exact",head:true})
          .eq("player_user_id",userId)
          .eq("attendance_status","attended"),
        supabase.from("participations")
          .select("id,events!inner(country)")
          .eq("player_user_id",userId)
          .eq("attendance_status","attended")
          .neq("events.country","JP")
          .limit(1)
      ]);
      if(!active)return;
      if(customQ.data)setConfig({...defaultPlayerCustomization,...customQ.data} as PlayerCustomization);
      if(!memoryQ.error)setOfficial((memoryQ.data||[]) as unknown as OfficialMemory[]);
      if(!officialCountQ.error)setOfficialCount(officialCountQ.count||0);
      if(!worldQ.error)setHasVerifiedWorld((worldQ.data||[]).length>0);
      setLoading(false);
    })();
    return()=>{active=false;};
  },[supabase,userId]);

  const foreignCountries=Array.from(new Set(official.map(row=>row.events?.country).filter((country):country is string=>Boolean(country&&country!=="JP"))));
  const hasWorld=hasVerifiedWorld;

  const unlocks={
    ballRack:historyCount>=1,
    notebook:journalViews>=1,
    scoutBoard:savedCount>=1,
    teamBanner:teamLinked,
    nextBoard:hasNextEvent,
    globe:hasWorld,
    trophy:seasonClear,
    officialMemory:officialCount>0,
  };

  function patch<K extends keyof PlayerCustomization>(key:K,value:PlayerCustomization[K]){
    setConfig(current=>({...current,[key]:value}));
    setStatus("");
  }

  async function save(){
    setSaving(true);setStatus("");
    const {error}=await supabase.from("homecourt_player_customization").upsert({
      user_id:userId,...config,updated_at:new Date().toISOString()
    },{onConflict:"user_id"});
    setSaving(false);
    setStatus(error?"保存できませんでした。もう一度お試しください。":"MY PLAYERを保存しました。");
  }

  if(loading)return <section className={styles.loading}><LoaderCircle className="spin"/><span>MY PLAYERを読み込み中</span></section>;

  return <section className={styles.shell}>
    <div className={styles.head}>
      <div><p>MY PLAYER / MY HOME COURT</p><h3>経験が増えると、自分のコートも育つ。</h3><span>見た目は自分で選ぶ。限定アイテムはRBAでの実際の経験から解放されます。</span></div>
      <div className={styles.memory}>
        <span>RBA VERIFIED</span><strong>{officialCount}</strong><small>OFFICIAL MEMORIES</small>
        {hasWorld?<b>WORLD / {foreignCountries.join(" · ")}</b>:null}
      </div>
    </div>

    <div className={styles.stage}>
      <RbaHomeCourtScene config={config} unlocks={unlocks}>
        <RbaPlayerAvatar config={config} name={name}/>
      </RbaHomeCourtScene>

      <div className={styles.unlockLog}>
        <p>COURT COLLECTION</p>
        {[
          ["BALL RACK",unlocks.ballRack,"Passport 1件"],
          ["JOURNAL DESK",unlocks.notebook,"JOURNAL 1本"],
          ["SCOUT BOARD",unlocks.scoutBoard,"活動保存 1件"],
          ["TEAM BANNER",unlocks.teamBanner,"TEAM接続"],
          ["NEXT BOARD",unlocks.nextBoard,"次の予定"],
          ["VERIFIED MARK",unlocks.officialMemory,"RBA出席確認"],
          ["WORLD GLOBE",unlocks.globe,"海外RBA経験"],
          ["SEASON TROPHY",unlocks.trophy,"Season 01 CLEAR"],
        ].map(([label,isOpen,condition])=><div key={String(label)} data-open={String(Boolean(isOpen))}>
          {isOpen?<Check/>:<LockKeyhole/>}<strong>{label}</strong><small>{isOpen?"UNLOCKED":condition}</small>
        </div>)}
      </div>
    </div>

    {official.length?<section className={styles.memoryWall}>
      <div><p>MEMORY WALL / RBA VERIFIED</p><h4>実際に参加した場所が、ここに残る。</h4><span>自己申告の履歴とは別に、RBAが出席確認した記録だけを表示します。</span></div>
      <div className={styles.memoryCards}>
        {official.slice(0,6).map(row=><article key={row.id}>
          <strong>{row.events?.title||"RBA EXPERIENCE"}</strong>
          <span>{[row.events?.region,row.events?.country&&row.events.country!=="JP"?row.events.country:null].filter(Boolean).join(" / ")||"RBA"}</span>
          <small>{row.events?.starts_at?new Date(row.events.starts_at).toLocaleDateString("ja-JP",{year:"numeric",month:"short",day:"numeric"}):"VERIFIED"}</small>
        </article>)}
      </div>
    </section>:null}

    <details className={styles.customize}>
      <summary><Sparkles/> MY PLAYERをカスタムする</summary>
      <div className={styles.editor}>
        <fieldset><legend>SKIN</legend><div className={styles.swatches}>{(["tone-1","tone-2","tone-3","tone-4","tone-5"] as const).map(value=><button type="button" key={value} data-selected={config.skin_tone===value} onClick={()=>patch("skin_tone",value)}><span data-skin={value}/>{value.toUpperCase()}</button>)}</div></fieldset>
        <fieldset><legend>HAIR</legend><div className={styles.options}>{hairOptions.map(([value,label,need])=>{const open=level>=need;return <button type="button" disabled={!open} data-selected={config.hair_style===value} key={value} onClick={()=>patch("hair_style",value)}>{open?<Star/>:<LockKeyhole/>}<strong>{label}</strong><small>{open?"OPEN":`LEVEL ${need}`}</small></button>})}</div></fieldset>
        <fieldset><legend>HAIR COLOR</legend><div className={styles.options}>{(["black","brown","dark-brown","ash"] as const).map(value=><button type="button" data-selected={config.hair_color===value} key={value} onClick={()=>patch("hair_color",value)}><strong>{value.toUpperCase()}</strong></button>)}</div></fieldset>
        <fieldset><legend>JERSEY</legend><div className={styles.options}>{jerseyOptions.map(([value,label,need])=>{const open=level>=need;return <button type="button" disabled={!open} data-selected={config.jersey_style===value} key={value} onClick={()=>patch("jersey_style",value)}>{open?<Star/>:<LockKeyhole/>}<strong>{label}</strong><small>{open?"OPEN":`LEVEL ${need}`}</small></button>})}</div></fieldset>
        <fieldset><legend>SHORTS</legend><div className={styles.options}>{(["match","black","white","signal"] as const).map(value=><button type="button" data-selected={config.shorts_style===value} key={value} onClick={()=>patch("shorts_style",value)}><strong>{value.toUpperCase()}</strong><small>OPEN</small></button>)}</div></fieldset>
        <fieldset><legend>NUMBER</legend><input type="number" inputMode="numeric" min={0} max={99} value={config.jersey_number} onChange={e=>patch("jersey_number",Math.max(0,Math.min(99,Number(e.target.value)||0)))}/></fieldset>
        <fieldset><legend>SHOES</legend><div className={styles.options}>{shoeOptions.map(([value,label,need,kind])=>{const open=unlocked(kind,need,level,officialCount,hasWorld);return <button type="button" disabled={!open} data-selected={config.shoe_style===value} key={value} onClick={()=>patch("shoe_style",value)}>{open?<Star/>:<LockKeyhole/>}<strong>{label}</strong><small>{open?"OPEN":kind==="official"?"RBA VERIFIED":kind==="world"?"WORLD MEMORY":`LEVEL ${need}`}</small></button>})}</div></fieldset>
        <fieldset><legend>ACCESSORY</legend><div className={styles.options}>{accessoryOptions.map(([value,label,need,kind])=>{const open=unlocked(kind,need,level,officialCount,hasWorld);return <button type="button" disabled={!open} data-selected={config.accessory===value} key={value} onClick={()=>patch("accessory",value)}>{open?<Star/>:<LockKeyhole/>}<strong>{label}</strong><small>{open?"OPEN":kind==="official"?"RBA VERIFIED":`LEVEL ${need}`}</small></button>})}</div></fieldset>
        <fieldset><legend>HOME COURT</legend><div className={styles.options}>{themeOptions.map(([value,label,need,kind])=>{const open=unlocked(kind,need,level,officialCount,hasWorld);return <button type="button" disabled={!open} data-selected={config.court_theme===value} key={value} onClick={()=>patch("court_theme",value)}>{open?<Star/>:<LockKeyhole/>}<strong>{label}</strong><small>{open?"OPEN":kind==="official3"?"RBA VERIFIED ×3":kind==="world"?"WORLD MEMORY":`LEVEL ${need}`}</small></button>})}</div></fieldset>
        <button type="button" className={styles.save} disabled={saving} onClick={()=>void save()}>{saving?<LoaderCircle className="spin"/>:<Save/>}{saving?"保存中…":"MY PLAYERを保存"}</button>
        <p className={styles.status} role="status">{status}</p>
      </div>
    </details>

    <div className={styles.rule}><strong>RBA ORIGINAL RULE</strong><p>体格・得点・能力値・勝率ではアイテムを解放しません。経験、学び、振り返り、実際の参加をコートに残します。</p></div>
  </section>;
}
