"use client";

import {useMemo, useState} from "react";
import {Check, Copy, Share2, ArrowUpRight} from "lucide-react";
import styles from "./campaign-share-kit.module.css";

type Audience = "parents"|"coaches"|"social"|"english";
type Campaign = {
  id:string; title:string; date:string; link:string; until?:string;
  summary:string; condition:string; supportsEnglish?:boolean;
  messages: Partial<Record<Audience,string>>;
};
const campaigns: readonly Campaign[] = [
  {
    id:"sendai-school",title:"仙台 U12・U15 スクール｜体験相談",date:"通年の体験・参加相談",
    link:"https://riotbasketballacademy.com/ja/sendai-school",
    summary:"仙台市太白区｜U12金曜／U15 SKILL UP木曜・月3回／所属チームはそのまま",
    condition:"相談フォームの送信は無料です。実際の体験日・体験費用・受入条件は未確定のものがあり、RBAから個別に案内します。U15クラブGREAMとは別の活動です。",
    messages:{
      parents:"仙台・太白区で、小学生・中学生が通えるバスケットボールスクールを探しているご家庭へ。RBAは、所属チームを変えずに『見る・判断する・実行する』力を伸ばすU12・U15スクールの体験相談を受け付けています。U12は金曜、U15 SKILL UPは木曜18:00〜19:30を基本に活動します。相談は無料で、体験費用や受入日程は個別案内です。",
      coaches:"仙台市太白区のRBA U12・U15スクールでは、所属先を変えることなく、技術を試合の判断につなげる練習を提供しています。U12は金曜の枠を調整中、U15 SKILL UPは木曜18:00〜19:30・月3回が基本です。体験希望の保護者が自ら内容を確認できる公式ページをご案内します。共有は任意で、名簿提供等はお願いしません。",
      social:"チームはそのまま。もっと、上手くなる。仙台・太白区のRBA U12・U15バスケットボールスクール。シュート・ドライブだけでなく、見る・判断する・ゲームで使う力を伸ばそう。U12金曜／U15木曜（基本）。まずは保護者から無料の体験相談。開催日・体験費用・受入条件は公式ページで確認してください。"
    }
  },
  {
    id:"okinawa-1114",title:"11/14 沖縄クリニック",date:"2026年11月14日（土）16:00〜19:00",
    until:"2026-11-14",link:"https://riotbasketballacademy.com/ja/events/okinawa-clinic-2026-11-14",
    summary:"身体操作・シュート・対人ゲーム／小4〜中3・3,300円（税込）",
    condition:"会場は伊良波小学校。参加可否、対象学年の例外対応、当日の詳細及び支払方法はRBAからの最新案内を優先してください。",
    messages:{
      parents:"沖縄でバスケットボールを頑張るお子さんをお持ちの方へ。\nRBAが11/14（土）16:00〜19:00に小4〜中3対象のクリニックを予定しています。止まる・切り返す・シュートと、ゲームの中での判断を学ぶ3時間です。参加費は1名3,300円（税込）。会場は伊良波小学校です。参加枠・決済・集合案内はRBAからの正式連絡をご確認ください。",
      coaches:"11月14日（土）16:00〜19:00、RBAが沖縄県南部で小4〜中3対象の個人技術・身体操作クリニックを予定しています。内容は切り返し、シュート、少人数ゲームでの判断です。参加費3,300円（税込）。会場は伊良波小学校です。参加対象・枠・支払方法はRBAの最新案内を優先し、活動に支障がなければ関心のあるご家庭へ任意で情報共有いただけますと幸いです。",
      social:"沖縄の育成世代へ。\n上手くなるのは、技術を覚えることだけじゃない。止まる・見る・選ぶ・次のプレーへつなぐ。11/14（土）16:00〜19:00、小4〜中3対象。3,300円（税込）。伊良波小学校で開催予定。参加可否と正式な決済・集合案内はRBAからお知らせします。"
    }
  },
  {
    id:"tatsuno",title:"11/21〜23 兵庫・たつの Development Camp",date:"2026年11月21日（土）〜23日（月・祝）",
    until:"2026-11-23",link:"https://riotbasketballacademy.com/ja/events/kobe-development-camp-2026",
    summary:"小5〜中3／半日6,600円・1日11,000円・3日通い27,500円",
    condition:"体育館の利用時間・11/23の会場条件・宿泊を現地と確認中です。参加希望日の無料相談を先にご利用ください。",
    messages:{
      parents:"兵庫・たつの周辺でバスケットボールに取り組む小5〜中3のご家庭へ。RBAが11月21〜23日に育成キャンプを予定しています。練習で覚えた技術を、対人ゲームで使い、相手を見て判断する力につなげます。半日6,600円／1日11,000円／3日通い27,500円（税込）。体育館・宿泊の利用条件は最終確認中です。参加できそうな日がある方は、決済の前に公式ページからご相談ください。",
      coaches:"RBAは11/21〜23、兵庫県たつの市で小5〜中3向けの育成キャンプを計画中です。対象は技術とゲームでの認知・判断を伸ばしたい選手。半日・日帰り参加の相談も可能です。青龍ラーテルズと現地の調整を進めていますが、体育館と宿泊の条件は未確定です。ご希望のあるご家庭が自分で検討できるよう、任意の情報共有にご協力いただければ幸いです。",
      social:"練習ではできる。でも、試合になるとできない。\nその間にある『見る・選ぶ・動く』を学ぶ。11/21〜23、兵庫・たつの。小5〜中3対象。半日6,600円から参加日を相談できます。会場の利用条件は最終確認中。"
    }
  },
  {
    id:"torsten",title:"11/25 Torsten Loibl ONLINE CLINIC Vol.2",date:"2026年11月25日（水）20:00〜21:30",
    until:"2026-11-24",link:"https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic",
    summary:"英語講義＋日本語逐次通訳／LIVE 3,300円・30日録画4,400円",
    condition:"日本語LIVE・録画と海外USDの申込方法は異なります。詳細・決済は公式ページで確認してください。",
    messages:{
      parents:"子どものシュートを『フォームの形』だけで見ていませんか。11/25（水）20:00〜21:30、RBA主催のTorsten Loibl氏オンライン講習では、現代のゲームに必要なシューター育成と活用を学びます。英語講義・日本語逐次通訳。LIVE 3,300円、30日録画4,400円（税込）。保護者・選手も視聴できます。",
      coaches:"11/25（水）20:00〜21:30、Torsten Loibl ONLINE CLINIC Vol.2。現代バスケットボールにおけるシューターの育成と活用を扱います。英語講義・日本語逐次通訳。日本国内LIVE 3,300円／30日録画4,400円（税込）。指導者仲間で学ぶ機会を探している方に、任意で紹介いただけると幸いです。",
      social:"シュートフォームを整えるだけで、ゲームで打てるシューターは育つのか？\nポジショニング・判断・シュートを選ぶ状況を学ぶ90分。Torsten Loibl氏、11/25（水）20:00〜、日本語逐次通訳。LIVE3,300円／30日録画4,400円（税込）。"
    }
  },
  {
    id:"kagoshima",title:"11/29 BASTET × RBA 鹿児島クリニック",date:"2026年11月29日（日）",
    until:"2026-11-29",link:"https://riotbasketballacademy.com/ja/events/kagoshima-clinic-2026-11-29",
    summary:"錦江湾高校体育館／小・中・高校生／1部3,000円・通し4,000円",
    condition:"午前9:30〜12:00、午後13:00〜15:30。正式申込・決済は各自公式ページから行います。",
    messages:{
      parents:"鹿児島の小学生・中学生・高校生の保護者の皆さまへ。11/29（日）、錦江湾高校体育館でBASTET × RBAのバスケットボールクリニックを開催予定です。午前9:30〜12:00、午後13:00〜15:30。どちらか1部のみ3,000円、午前・午後通し4,000円（税込）。自分の予定に合わせて選べます。ご興味のある方は公式ページで内容と申込方法をご確認ください。",
      coaches:"11月29日（日）鹿児島市・錦江湾高校体育館で、BASTET × RBAクリニックを開催予定です。対象は小・中・高校生（男女）。午前9:30〜12:00、午後13:00〜15:30、各部3,000円／通し4,000円。日程が合う選手・保護者に限り、任意で公式情報を共有いただけましたら幸いです。",
      social:"鹿児島で、一緒にバスケ。11/29（日）錦江湾高校体育館。小・中・高校生対象、男女参加可。午前9:30〜12:00／午後13:00〜15:30。1部3,000円・通し4,000円。申込・決済はRBA公式ページへ。"
    }
  },
  {
    id:"okinawa-intl",title:"12/22〜24 沖縄国際ユースキャンプ",date:"2026年12月22日（火）〜24日（木）",
    until:"2026-12-24",link:"https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026",
    summary:"7〜18歳／国内・海外／沖縄県民は通い27,500円・2泊宿泊39,600円",
    condition:"施設から利用可能との回答あり。2泊3日の日数表記、宿泊責任者、体育館時間・送迎は最終確認中です。条件確定前の返金不可航空券購入は推奨しません。",
    supportsEnglish:true,
    messages:{
      parents:"この冬、沖縄で世界の仲間とバスケットボールを。RBAが12/22〜24に7〜18歳対象の国際ユースキャンプを計画しています。日本と海外の選手が、ゲーム・対人練習・交流を通じて学びます。沖縄県民は通い27,500円／2泊宿泊39,600円（税込）。施設から利用可能との回答がありますが、宿泊監督・体育館時間・送迎などは最終調整中です。交通手配の前に正式条件をご確認ください。",
      coaches:"12/22〜24、沖縄県糸満市で7〜18歳の国内外選手向け国際ユースキャンプを予定しています。技術習得に加えて、違う文化・競技背景の選手と練習し、試合場面で判断する経験をつくります。施設の利用可能回答は得ていますが、宿泊責任者・体育館時間等は最終調整中。ご関心のあるご家庭に、公式ページを任意で紹介いただけますと幸いです。",
      social:"国が違えば、バスケットボールの見え方も変わる。\n12/22〜24、沖縄で世界の仲間と学ぶ国際ユースキャンプ。7〜18歳対象。通い・宿泊プランあり。施設から利用可能との回答あり、詳細な宿泊・体育館条件は最終調整中。公式ページで確認を。",
      english:"Okinawa, Japan · 22–24 December 2026. Riot Basketball Academy is planning an international youth basketball camp for players aged 7–18, with training, games and cultural exchange. Day-only and two-night residential plans are available for discussion. The facility has replied that it can host the programme, while the precise accommodation, supervision, court hours and transfers are still being finalized. Please review the official terms before paying for non-refundable flights."
    }
  },
  {
    id:"sendai-u15",title:"仙台U15 SKILL UP SCHOOL",date:"木曜18:00〜19:30・原則月3回",
    link:"https://riotbasketballacademy.com/ja/u15-skill-up",
    summary:"小6〜U15／月7,700円・入会金5,500円",
    condition:"初回参加日・会場詳細・会費決済は申込内容を確認してからご案内します。",
    messages:{
      parents:"仙台・太白区で、チームはそのまま続けながら技術と判断を磨きたい選手へ。RBA U15 SKILL UP SCHOOLは木曜18:00〜19:30（原則月3回）、月会費7,700円・入会金5,500円（税込）。小学6年生から相談できます。初回参加日・会場は申込後にご確認ください。",
      coaches:"仙台の小6〜U15世代へ。所属チームと両立しながら、認知・判断・技術を対人練習とゲームで磨くRBA U15 SKILL UP SCHOOL。木曜18:00〜19:30、月3回7,700円（税込）＋入会金5,500円。興味のあるご家庭への任意紹介を歓迎します。",
      social:"チームの練習に通っていても、個人の課題に向き合う時間は作れる。仙台U15 SKILL UP SCHOOL／木曜18:00〜19:30・月3回7,700円。小6から相談可。技術だけでなく、ゲームで『見る・判断する・実行する』を学ぼう。"
    }
  },
  {
    id:"rtb-intro",title:"Riot Training Base｜見学・無料相談",date:"仙台・通年相談受付",
    link:"https://form.jotform.com/262724288973067",
    summary:"一般・競技者・保護者／初回15分相談・施設見学",
    condition:"空き枠と施設利用条件は個別確認。相談の送信だけでは有料契約になりません。",
    messages:{
      parents:"運動を再開したい方、体力をつけたい方、競技の身体づくりを見直したい方へ。仙台のRiot Training Baseでは、まず施設見学と15分の無料相談から始められます。プログラムは現在の課題・目標に合わせてご案内します。相談だけで契約は成立しません。",
      coaches:"学校・クラブでの身体づくりに、どんなサポートが必要でしょうか。Riot Training Baseでは、競技者のS&C、運動指導の相談を受け付けています。個別・団体どちらも、まず課題を整理してから提案します。初回見学・15分相談からご検討ください。",
      social:"運動は、始める前の相談から。仙台・Riot Training Baseは見学・15分無料相談を受付中。トレーニングの目標や不安、今の課題を聞き、必要なことを一緒に整理します。相談だけで有料契約にはなりません。"
    }
  },
  {
    id:"host",title:"RBAをあなたの地域へ｜開催相談",date:"全国・通年",
    link:"https://form.jotform.com/262648437888073",
    summary:"地域主催者・指導者・体育館関係者／相談・見積は無料",
    condition:"会場確保・日時・交通費・参加料金は未決定。フォーム送信だけで予約や契約にはなりません。",
    messages:{
      parents:"住んでいる地域でRBAのクリニックを開催してほしい方へ。指導者・保護者・地域主催者から、希望地域・年代・開催時期の相談を無料で受け付けています。会場や費用が決まっていなくても大丈夫。開催が確約されるものではありませんが、まず希望を届けられます。",
      coaches:"RBAの育成クリニックを地域やクラブで企画しませんか。小学・中学年代の技術と判断、指導者への引き継ぎまで、希望に合わせてプログラムを検討します。会場候補、参加人数、時期から無料で開催相談できます。正式な費用・日程は個別見積と合意後です。",
      social:"『うちの地域でもRBAを呼びたい』という声へ。全国のクリニック・チーム訪問・合同育成企画の無料相談を受付中。会場・人数・対象年代を一緒に整理します。申し込む前に、まず気軽に相談を。"
    }
  }
];
const audienceLabels:Record<Audience,string>={parents:"保護者LINE・ご家族へ",coaches:"指導者・チームへ",social:"SNS投稿用",english:"海外向け英語"};
function jstDay(){
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const part=(x:string)=>parts.find(p=>p.type===x)?.value??"";
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export function CampaignShareKit(){
  const [id,setId]=useState("sendai-school");
  const [audience,setAudience]=useState<Audience>("parents");
  const [status,setStatus]=useState("");
  const [fallback,setFallback]=useState(false);
  const today=jstDay();
  const visible=campaigns.filter(x=>!x.until||x.until>=today);
  const chosen=visible.find(c=>c.id===id)||visible[0];
  const currentAudience=chosen?.messages[audience]?audience:"parents";
  const message=useMemo(()=>{
    if(!chosen)return "";
    const link=new URL(chosen.link);
    // Attribution is campaign/audience only; no contact details, names or IDs.
    link.searchParams.set("utm_source","rba_share_kit");
    link.searchParams.set("utm_medium","organic_referral");
    link.searchParams.set("utm_campaign",chosen.id);
    link.searchParams.set("utm_content",currentAudience);
    return `${chosen.messages[currentAudience]}\n\n公式案内・申込・相談：\n${link.toString()}`;
  },[chosen,currentAudience]);
  if(!chosen)return <p>現在、共有できる募集企画はありません。<a href="/ja/opportunities">活動一覧をご確認ください。</a></p>;
  function choose(next:string){setId(next);setAudience("parents");setStatus("");setFallback(false);}
  async function copyText(){
    try{if(!navigator.clipboard?.writeText)throw new Error("unavailable");
      await navigator.clipboard.writeText(message);setFallback(false);setStatus("案内文をコピーしました。内容を確認し、希望する相手へ貼り付けてください。");
    }catch{setFallback(true);setStatus("自動コピーが使えませんでした。下の文面を選択してコピーしてください。");}
  }
  async function shareText(){
    if(typeof navigator.share!=="function"){await copyText();return;}
    try{await navigator.share({title:chosen.title,text:message});setStatus("共有画面を閉じました。実際の送信状況は共有先でご確認ください。");}
    catch(error){if(error instanceof Error&&error.name==="AbortError"){setStatus("共有をキャンセルしました。");return;}setStatus("共有を開けませんでした。文面をコピーしてご利用ください。");}
  }
  const audiences=(Object.keys(audienceLabels) as Audience[]).filter(x=>x!=="english"||chosen.supportsEnglish);
  return <section className={styles.kit} aria-label="育成機会を紹介する文章を作る">
    <div className={styles.formGrid}>
      <label className={styles.selectLabel}>紹介する活動
        <select value={chosen.id} onChange={e=>choose(e.target.value)}>
          {visible.map(c=><option value={c.id} key={c.id}>{c.title}</option>)}
        </select>
      </label>
      <label className={styles.selectLabel}>届けたい相手
        <select value={currentAudience} onChange={e=>{setAudience(e.target.value as Audience);setStatus("");setFallback(false);}}>
          {audiences.map(v=><option key={v} value={v}>{audienceLabels[v]}</option>)}
        </select>
      </label>
    </div>
    <div className={styles.details}>
      <p className={styles.when}>{chosen.date}</p><h2>{chosen.title}</h2>
      <p>{chosen.summary}</p><p className={styles.notice}>{chosen.condition}</p>
    </div>
    <label className={styles.textLabel} htmlFor="rba-campaign-message">そのまま使える紹介文（自由に編集してから共有できます）</label>
    <textarea id="rba-campaign-message" readOnly rows={12} value={message}
      onFocus={e=>{if(fallback)e.currentTarget.select();}} />
    <div className={styles.actions}>
      <button type="button" onClick={()=>void copyText()}><Copy size={18} aria-hidden="true"/>案内文をコピー</button>
      <button type="button" onClick={()=>void shareText()}><Share2 size={18} aria-hidden="true"/>スマートフォンで共有</button>
      <a data-growth-id={`share-kit-detail-${chosen.id}`} href={chosen.link}
         target={chosen.link.startsWith("https://form.")?"_blank":undefined}
         rel={chosen.link.startsWith("https://form.")?"noopener noreferrer":undefined}>公式案内を確認 <ArrowUpRight size={17} aria-hidden="true"/></a>
    </div>
    <p className={styles.status} role="status" aria-live="polite">{status||"内容を確認してから、ご自身で共有できます。自動送信・自動投稿は行いません。"}</p>
    <p className={styles.footerNote}>紹介はあくまで任意です。辞退した方への再送、子ども・保護者の連絡先名簿の提供、グループへの無断一斉送信はお願いしません。会場・宿泊条件の変更が生じた場合は、公式ページの最新内容を優先してください。</p>
  </section>;
}
