"use client";

import {useCallback,useEffect,useMemo,useState} from "react";
import {CheckCircle2,Crown,LoaderCircle,ShieldCheck,Sparkles,Trophy,Users} from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import {PlayerCustomization,RbaPlayerMiniAvatar} from "./homecourt-player-avatar";
import styles from "./homecourt-season-board.module.css";

type BoardRow={
  rank_no:number;
  ranking_tag:string;
  season_points:number;
  is_self:boolean;
  skin_tone:string;
  hair_style:string;
  hair_color:string;
  jersey_style:string;
  jersey_number:number;
};

type Preference={participate:boolean;ranking_tag:string};

export function HomecourtSeasonBoard({userId}:{userId:string}){
  const supabase=useMemo(()=>createClient(),[]);
  const [rows,setRows]=useState<BoardRow[]>([]);
  const [preference,setPreference]=useState<Preference|null>(null);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  const load=useCallback(async()=>{
    setLoading(true);
    const [prefQ,boardQ]=await Promise.all([
      supabase.from("homecourt_ranking_preferences")
        .select("participate,ranking_tag")
        .eq("user_id",userId)
        .maybeSingle(),
      supabase.rpc("get_homecourt_season_board",{p_limit:20})
    ]);
    if(prefQ.error||boardQ.error){
      setMessage("SEASON BOARDを読み込めませんでした。時間をおいてもう一度お試しください。");
      setLoading(false);
      return;
    }
    setPreference((prefQ.data as Preference|null)||null);
    setRows((boardQ.data||[]) as BoardRow[]);
    setLoading(false);
  },[supabase,userId]);

  useEffect(()=>{const timer=window.setTimeout(()=>{void load();},0);return()=>window.clearTimeout(timer);},[load]);

  async function toggle(){
    setBusy(true);setMessage("");
    const enabled=!preference?.participate;
    const {data,error}=await supabase.rpc("set_homecourt_season_board_opt_in",{p_enabled:enabled});
    if(error){
      setMessage("ランキング設定を変更できませんでした。もう一度お試しください。");
      setBusy(false);
      return;
    }
    const row=Array.isArray(data)?data[0]:null;
    if(row)setPreference(row as Preference);
    setMessage(enabled?"SEASON BOARDに参加しました。":"SEASON BOARDへの参加を停止しました。");
    setBusy(false);
    await load();
  }

  const top=rows.filter(row=>row.rank_no<=3).slice(0,3);
  const rest=rows.filter(row=>row.rank_no>3);
  const self=rows.find(row=>row.is_self);

  function avatar(row:BoardRow){
    return <RbaPlayerMiniAvatar
      skinTone={row.skin_tone as PlayerCustomization["skin_tone"]}
      hairStyle={row.hair_style as PlayerCustomization["hair_style"]}
      hairColor={row.hair_color as PlayerCustomization["hair_color"]}
      jerseyStyle={row.jersey_style as PlayerCustomization["jersey_style"]}
      jerseyNumber={row.jersey_number}
    />;
  }

  return <section className={styles.shell} aria-labelledby="season-board-title">
    <header className={styles.head}>
      <div>
        <p>SEASON BOARD / 2026.10–12</p>
        <h3 id="season-board-title">今シーズン、どれだけ動いたか。</h3>
        <span>これは「上手い選手ランキング」ではありません。挑戦、記録、学び、RBAでの公式参加をポイントにしたシーズンランキングです。</span>
      </div>
      <div className={styles.seasonMark}><Trophy/><strong>SEASON 01</strong><small>OCT — DEC 2026</small></div>
    </header>

    <div className={styles.rules}>
      <div><strong>+40</strong><span>PASSPORT</span><small>最大5件</small></div>
      <div><strong>+20</strong><span>DISCOVERY</span><small>最大5件</small></div>
      <div><strong>+10</strong><span>JOURNAL</span><small>最大10本</small></div>
      <div><strong>+75</strong><span>RBA VERIFIED</span><small>最大4回</small></div>
      <div><strong>+50</strong><span>ALL-ROUND</span><small>4種類達成</small></div>
    </div>

    <div className={styles.privacy}>
      <ShieldCheck/>
      <div><strong>実名は表示しません。</strong><p>参加すると自動で匿名のRBA TAGが発行されます。ランキングに表示されるのはTAG・MY PLAYER・SEASON PTSだけです。課金額や能力値はポイントに入りません。</p></div>
      <button type="button" disabled={busy||loading} onClick={()=>void toggle()}>
        {busy?<LoaderCircle className="spin"/>:preference?.participate?<CheckCircle2/>:<Sparkles/>}
        {preference?.participate?"参加中｜ランキングから外れる":"SEASON BOARDに参加する"}
      </button>
    </div>

    {preference?<div className={styles.tag}><span>YOUR RBA TAG</span><strong>{preference.ranking_tag}</strong><small>{preference.participate?"BOARD ACTIVE":"BOARD OFF"}</small></div>:null}

    {loading?<div className={styles.loading}><LoaderCircle className="spin"/><span>ランキングを集計中</span></div>:<>
      {rows.length?<div className={styles.board}>
        {top.length?<div className={styles.podium}>{top.map(row=><article key={row.ranking_tag} data-rank={row.rank_no} data-self={row.is_self?"true":"false"}>
          <span className={styles.rank}>{row.rank_no===1?<Crown/>:null}#{row.rank_no}</span>
          {avatar(row)}
          <strong>{row.ranking_tag}</strong>
          <b>{row.season_points} PTS</b>
          {row.is_self?<small>YOU</small>:null}
        </article>)}</div>:null}

        {rest.length?<div className={styles.list}>{rest.map(row=><article key={row.ranking_tag} data-self={row.is_self?"true":"false"}>
          <span className={styles.listRank}>#{row.rank_no}</span>
          {avatar(row)}
          <strong>{row.ranking_tag}</strong>
          <b>{row.season_points} PTS</b>
          {row.is_self?<small>YOU</small>:null}
        </article>)}</div>:null}
      </div>:<div className={styles.empty}><Users/><strong>まだSEASON BOARD参加者はいません。</strong><p>最初のPLAYERとして参加できます。</p></div>}
    </>}

    {self&&self.rank_no>20?<div className={styles.yourRank}><span>YOUR RANK</span><strong>#{self.rank_no}</strong><b>{self.season_points} PTS</b></div>:null}
    <p className={styles.note}>SEASON PTSは2026年10月1日〜12月31日の行動だけを集計します。LifetimeのJourney LEVELはリセットされません。</p>
    <p className={styles.status} role="status">{message}</p>
  </section>;
}
