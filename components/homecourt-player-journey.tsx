"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Flag,
  Globe2,
  LockKeyhole,
  Map,
  Medal,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import styles from "./homecourt-player-journey.module.css";
import {computePlayerJourney,journeyTier,PLAYER_JOURNEY_LEVEL_NAMES} from "@/lib/homecourt-game";

type Props={
  displayName:string;
  historyCount:number;
  savedCount:number;
  journalViews:number;
  setupPercent:number;
  teamLinked:boolean;
  hasNextEvent:boolean;
};

export function HomecourtPlayerJourney({
  displayName,
  historyCount,
  savedCount,
  journalViews,
  setupPercent,
  teamLinked,
  hasNextEvent,
}:Props){
  const {xp,level,nextFloor,levelProgress,momentum,maxLevel}=computePlayerJourney({
    historyCount,savedCount,journalViews,setupPercent,teamLinked,hasNextEvent
  });

  const quests=[
    {code:"01",label:"SAVE DATA",title:"RBA IDの初期設定を完了する",done:setupPercent>=100,href:"/ja/my-homecourt/app/my"},
    {code:"02",label:"FIRST STAMP",title:"Basketball Passportに経験を1件残す",done:historyCount>=1,href:"/ja/my-homecourt/app/start"},
    {code:"03",label:"SCOUT",title:"気になる活動を1件保存する",done:savedCount>=1,href:"/ja/opportunities"},
    {code:"04",label:"STUDY",title:"JOURNALを1本読む",done:journalViews>=1,href:"/ja/journal"},
    {code:"05",label:"BUILD",title:"経験を3件まで増やす",done:historyCount>=3,href:"/ja/my-homecourt/app/start"},
    {code:"06",label:"NEXT CHALLENGE",title:"次の予定か所属先をつなぐ",done:hasNextEvent||teamLinked,href:hasNextEvent?"/ja/my-homecourt/app/calendar":"/ja/my-homecourt/app/team"},
  ];
  const completedQuests=quests.filter(q=>q.done).length;
  const nextQuest=quests.find(q=>!q.done)||quests[quests.length-1];

  const chapters=[
    {level:1,label:"CHAPTER 01",title:"BEGIN",body:"自分のセーブデータをつくる。",href:"/ja/my-homecourt/app/start"},
    {level:2,label:"CHAPTER 02",title:"EXPLORE",body:"次の場所と機会を探す。",href:"/ja/opportunities"},
    {level:3,label:"CHAPTER 03",title:"LEARN",body:"読むだけでなく、次に試すことを決める。",href:"/ja/journal"},
    {level:4,label:"CHAPTER 04",title:"REVIEW",body:"経験を振り返って、自分の変化を残す。",href:"/ja/my-homecourt/app/start"},
    {level:5,label:"CHAPTER 05",title:"CHALLENGE",body:"RBA UNITEDや新しい環境へ挑戦する。",href:"/ja/united"},
    {level:6,label:"CHAPTER 06",title:"WORLD",body:"日本の外まで、自分の選択肢を広げる。",href:"/ja/international"},
  ];

  const medals=[
    {name:"JOURNEY",value:historyCount,tier:journeyTier(historyCount,[1,3,5,10]),next:[1,3,5,10],icon:<Map/>},
    {name:"SCOUT",value:savedCount,tier:journeyTier(savedCount,[1,3,5,10]),next:[1,3,5,10],icon:<Compass/>},
    {name:"READER",value:journalViews,tier:journeyTier(journalViews,[1,3,10,20]),next:[1,3,10,20],icon:<BookOpen/>},
  ];

  return <section className={styles.shell} aria-labelledby="player-journey-title">
    <header className={styles.hero}>
      <div>
        <p>RBA PLAYER JOURNEY / SEASON 01</p>
        <span>YOUR BASKETBALL SAVE DATA</span>
        <h2 id="player-journey-title">{displayName || "PLAYER"}のストーリーを進める。</h2>
        <small>XPは上手さや序列ではなく、経験・振り返り・探索の記録です。公開ランキングはありません。</small>
      </div>
      <div className={styles.level}>
        <span>LEVEL</span>
        <strong>{String(level).padStart(2,"0")}</strong>
        <b>{PLAYER_JOURNEY_LEVEL_NAMES[level-1]}</b>
        <div><i style={{width:`${levelProgress}%`}}/></div>
        <small>{maxLevel?`${xp} XP / MAX LEVEL`:`${xp} XP / NEXT ${nextFloor} XP`}</small>
      </div>
    </header>

    <div className={styles.statusGrid}>
      <article><span>SEASON QUEST</span><strong>{completedQuests}/6</strong><small>COMPLETED</small></article>
      <article><span>PASSPORT</span><strong>{historyCount}</strong><small>EXPERIENCES</small></article>
      <article><span>DISCOVERY</span><strong>{savedCount}</strong><small>SAVED</small></article>
      <article><span>MOMENTUM</span><strong>{"●".repeat(momentum)}{"○".repeat(3-momentum)}</strong><small>ACTIVITY TYPES</small></article>
    </div>

    <section className={styles.nextMission}>
      <div>
        <p>NEXT STORY</p>
        <h3>{nextQuest.done?"SEASON 01 CLEAR":nextQuest.title}</h3>
        <span>{nextQuest.done?"次の章へ進めます。":`${nextQuest.label} / あと一つ進めてみよう。`}</span>
      </div>
      <Link href={nextQuest.done?"/ja/opportunities":nextQuest.href}>{nextQuest.done?"次の挑戦を探す":"MISSION START"} <ArrowRight/></Link>
    </section>

    <section className={styles.questSection}>
      <div className={styles.sectionHead}>
        <div><p>QUEST BOARD</p><h3>今シーズンの6つのQUEST</h3></div>
        <span>毎日やる必要はありません。できる時に、自分の順番で。</span>
      </div>
      <div className={styles.questGrid}>
        {quests.map(q=><Link key={q.code} href={q.href} className={q.done?styles.questDone:undefined}>
          <span>{q.code} / {q.label}</span>
          {q.done?<CheckCircle2/>:<Flag/>}
          <strong>{q.title}</strong>
          <small>{q.done?"CLEAR":"OPEN QUEST"}</small>
        </Link>)}
      </div>
    </section>

    <section className={styles.choiceSection}>
      <div className={styles.sectionHead}>
        <div><p>CHOOSE YOUR NEXT PLAY</p><h3>次に何をするかは、自分で選ぶ。</h3></div>
        <span>正解は一つではありません。</span>
      </div>
      <div className={styles.choiceGrid}>
        <Link href="/ja/my-homecourt/app/start"><Sparkles/><span>REVIEW</span><strong>最近の経験を1つ振り返る</strong><small>Passportに残す</small></Link>
        <Link href="/ja/opportunities"><Compass/><span>EXPLORE</span><strong>行ってみたい活動を探す</strong><small>気になるものを保存</small></Link>
        <Link href="/ja/journal"><BookOpen/><span>LEARN</span><strong>気になるテーマを1本読む</strong><small>次に試すことを決める</small></Link>
      </div>
    </section>

    <section className={styles.pathSection}>
      <div className={styles.sectionHead}>
        <div><p>GROWTH PATHS</p><h3>自分の成長ルートは、一つじゃない。</h3></div>
        <span>得点や技術点ではなく、どんな経験を増やしたか。</span>
      </div>
      <div className={styles.pathGrid}>
        {[
          {name:"EXPERIENCE",label:"PLAY",value:Math.min(100,historyCount*20),detail:`${historyCount} EXPERIENCE`,href:"/ja/my-homecourt/app/start"},
          {name:"DISCOVERY",label:"EXPLORE",value:Math.min(100,savedCount*25),detail:`${savedCount} SAVED`,href:"/ja/opportunities"},
          {name:"LEARNING",label:"LEARN",value:Math.min(100,journalViews*10),detail:`${journalViews} ARTICLES`,href:"/ja/journal"},
          {name:"CONNECTION",label:"CONNECT",value:(teamLinked?50:0)+(hasNextEvent?50:0),detail:teamLinked||hasNextEvent?"CONNECTED":"OPEN",href:teamLinked?"/ja/my-homecourt/app/team":"/ja/opportunities"},
        ].map(path=><Link href={path.href} key={path.name}>
          <span>{path.label}</span><strong>{path.name}</strong><div><i style={{width:`${path.value}%`}}/></div><small>{path.detail}</small>
        </Link>)}
      </div>

    <section className={styles.storySection}>
      <div className={styles.sectionHead}>
        <div><p>STORY MAP</p><h3>経験を増やすと、次の章が開く。</h3></div>
        <span>速く進む必要はありません。</span>
      </div>
      <div className={styles.chapterGrid}>
        {chapters.map(chapter=>{
          const unlocked=level>=chapter.level;
          return unlocked?<Link href={chapter.href} key={chapter.title}>
            <span>{chapter.label}</span><Star/>
            <strong>{chapter.title}</strong><p>{chapter.body}</p><small>UNLOCKED</small>
          </Link>:<article key={chapter.title}>
            <span>{chapter.label}</span><LockKeyhole/>
            <strong>{chapter.title}</strong><p>{chapter.body}</p><small>LEVEL {chapter.level}でOPEN</small>
          </article>;
        })}
      </div>
    </section>

    <section className={styles.medalSection}>
      <div className={styles.sectionHead}>
        <div><p>BADGE CASE</p><h3>上手さではなく、積み重ねを集める。</h3></div>
        <span>BRONZE → SILVER → GOLD → PLATINUM</span>
      </div>
      <div className={styles.medalGrid}>
        {medals.map(item=>{
          const next=item.next.find(n=>n>item.value);
          return <article key={item.name} data-tier={item.tier}>
            <div>{item.icon}</div><span>{item.name}</span><strong>{item.tier}</strong>
            <small>{next?`NEXT ${item.value}/${next}`:"MAX TIER"}</small>
          </article>;
        })}
        <article data-tier={(teamLinked||hasNextEvent)?"BRONZE":"LOCKED"}>
          <div><Trophy/></div><span>CHALLENGE</span><strong>{(teamLinked||hasNextEvent)?"BRONZE":"LOCKED"}</strong><small>{(teamLinked||hasNextEvent)?"NEXT STEP CONNECTED":"次の予定をつなぐ"}</small>
        </article>
        <article data-tier={completedQuests===quests.length?"GOLD":"LOCKED"}>
          <div><Star/></div><span>SEASON 01</span><strong>{completedQuests===quests.length?"CLEAR":"LOCKED"}</strong><small>{completedQuests}/6 QUESTS</small>
        </article>
      </div>
    </section>

    <footer className={styles.footer}>
      <div><Medal/><strong>NO RANKING / NO PAY-TO-WIN</strong><p>他の選手との順位、能力値、課金によるXP優位は作りません。昨日の自分より経験が増えたかを見るモードです。</p></div>
      <Link href="/ja/my-homecourt/app/start">BASKETBALL PASSPORT <ArrowRight/></Link>
      <Link href="/ja/international"><Globe2/> WORLD <ArrowRight/></Link>
    </footer>
  </section>;
}

export function HomecourtPlayerJourneyPreview({registrationUrl}:{registrationUrl:string}){
  return <section className={styles.preview}>
    <div className={styles.previewLead}>
      <p>RBA ID / PLAYER JOURNEY</p>
      <h2>RBA IDを、あなたのバスケット人生の「セーブデータ」に。</h2>
      <span>登録して終わりではなく、経験を残す。QUESTを進める。BADGEを集める。次の挑戦を見つける。</span>
      <a href={registrationUrl} target={registrationUrl.startsWith("http")?"_blank":undefined} rel={registrationUrl.startsWith("http")?"noreferrer":undefined}>PLAYER JOURNEYを始める <ArrowRight/></a>
    </div>
    <div className={styles.previewCards}>
      <article><Sparkles/><span>LEVEL</span><strong>経験で上がる</strong><small>能力評価ではなくJourney XP</small></article>
      <article><Flag/><span>QUEST</span><strong>次にやることが見える</strong><small>自分の順番で進める</small></article>
      <article><Map/><span>PASSPORT</span><strong>参加経験を集める</strong><small>地域から世界まで</small></article>
      <article><Medal/><span>BADGES</span><strong>積み重ねを残す</strong><small>公開ランキングなし</small></article>
    </div>
  </section>;
}
