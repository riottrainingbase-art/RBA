import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

const url = "https://riotbasketballacademy.com/ja/gream-sendai/girls";
const formUrl = "https://form.jotform.com/263083176331050";
const coachUrl = "https://form.jotform.com/263083569407060";
const ink = "#131619";
const muted = "#515b60";
const fog = "#f4f5f3";
const line = "#d9dfdf";

export const metadata: Metadata = {
  title: "GREAM SENDAI GIRLS U15｜2027年女子育成チーム準備・無料参加相談｜RBA",
  description: "仙台市太白区を中心に、2027年の女子U15育成活動を準備中。女子クリニックの経験をもとに、判断力・バスケットボール技術・着地や減速などの身体づくりを一体化。現在は保護者向け無料相談受付で、女子チーム設立・練習日・料金は未確定です。",
  alternates: { canonical: url },
  openGraph: {
    title: "GREAM SENDAI GIRLS｜強くなる。その先まで、育てる。",
    description: "仙台・太白区。女子バスケットボールの成長と、傷害リスクの低減を目指す身体づくり。2027年始動に向け無料の事前相談を受付中。",
    url,
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{url:"https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"}],
  },
};

const button = { display:"inline-flex", alignItems:"center", justifyContent:"center", minHeight:54, padding:"14px 23px", background:"#fff", color:ink, border:"1px solid #fff", fontWeight:850, textDecoration:"none", borderRadius:3, fontSize:16 } as const;
const pillars = [
  ["01 / PLAYER DEVELOPMENT", "見る、判断する、実行する。", "パスやシュートを切り離して教えるのではなく、1対1・2対2・3対3から実際のゲームに学びをつなげます。"],
  ["02 / ATHLETIC DEVELOPMENT", "身体づくりも、練習の一部。", "着地・減速・方向転換・片脚でのバランス・全身の筋力発揮を、年齢と習熟度に応じて段階的に扱います。"],
  ["03 / PLAYER WELLBEING", "安心して挑戦できる環境。", "暴言や威圧に頼らず、選手の声に耳を傾ける指導を重視。体調や痛みを伝えられることを大切にします。"],
  ["04 / LONG-TERM PATHWAY", "中学3年間、その先まで。", "目先の勝敗だけを目標にせず、本人の目標・成長・進路と競技を続ける選択肢を尊重します。"],
] as const;

const training = [
  ["01", "動作の準備", "ジョグ・方向転換・段階的な加速で身体を温める"],
  ["02", "着地と減速", "両脚・片脚で止まる、向きを変える、着地をコントロールする"],
  ["03", "筋力とバランス", "スクワット、ヒンジ、片脚支持などをレベルに応じて進める"],
  ["04", "ゲームへの接続", "判断を伴う1対1・少人数ゲームで動作を使う"],
] as const;

const faqs = [
 ["女子U15チームはもう設立していますか？", "2027年からの女子選手指導に向けた準備段階です。女子チームの正式設立、JBA登録、定員、活動開始日は決定していません。"],
 ["どの学年が相談できますか？", "小学6年生の卒団後の進路相談を歓迎します。中学生の保護者もご相談ください。正式な学年区分と受入条件は決まり次第案内します。"],
 ["練習日時・会場は決まっていますか？", "仙台市太白区を中心に検討しています。男子U15の会場確保と、女子専用の練習枠確定は別です。女子の曜日・日時・会場は調整中です。"],
 ["費用はいくらですか？", "女子の月会費・初期費用・遠征費は未決定です。男子の2027年度月額9,900円（税込）は女子の価格ではありません。無料事前相談で請求や自動課金はありません。"],
 ["ACL損傷を完全に予防できますか？", "いいえ。運動プログラムでリスク低減を目指しますが、あらゆるけがを防止する保証はありません。痛みや受傷歴がある場合は、医療専門職による評価を優先します。"],
 ["学校の部活と両立できますか？", "練習参加の可否と公式大会の競技者登録・出場資格は別です。JBA・中体連・宮城県協会の最新規程と学校の条件を確認し、本人と保護者の選択を尊重します。"],
 ["過去の女子クリニック参加者には優先権がありますか？", "過去の参加を理由に入団や席を確約しません。参加希望・必要なサポートを本人と保護者から確認し、公平な受入方法を整えます。"],
 ["フォームの情報は別のイベントの営業に使われますか？", "女子U15の準備・参加相談の目的で扱います。別イベントの販促には、目的に応じた適切な同意がない限り転用しません。"],
] as const;

export default function GreamSendaiGirlsPage() {
  return <SiteFrame locale="ja"><main id="main-content" lang="ja" style={{background:"#fff",color:ink}}>
    <section style={{background:ink,color:"#fff",padding:"clamp(68px,8vw,110px) max(20px,6vw) 74px",borderBottom:"5px solid #c4cbd0"}}>
      <div style={{maxWidth:1180,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3.4,fontWeight:900,color:"#b8c4c8",margin:"0 0 24px"}}>RIOT BASKETBALL ACADEMY / GREAM SENDAI / GIRLS U15</p>
        <h1 style={{fontSize:"clamp(47px,9vw,111px)",lineHeight:.93,fontWeight:950,letterSpacing:"-.065em",margin:"0 0 30px"}}>GREAM<br/>SENDAI <span style={{color:"#aebbc0"}}>GIRLS.</span></h1>
        <h2 style={{fontSize:"clamp(29px,4vw,51px)",lineHeight:1.2,margin:"0 0 18px",fontWeight:900}}>強くなる。<br/>その先まで、育てる。</h2>
        <p style={{fontSize:"clamp(16px,1.8vw,19px)",color:"#d2dbdf",lineHeight:1.95,maxWidth:840,margin:"0 0 29px"}}>
          女子選手がバスケットボールを楽しみ、見る・選ぶ・挑戦する力を伸ばす。これまでの女子クリニックでの指導経験と、
          ACL損傷リスクの低減を意識した身体づくりを結びつけ、2027年からの女子U15育成活動を準備しています。
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
          <a href={formUrl} target="_blank" rel="noopener noreferrer" data-growth-id="gream-sendai-girls-hero-interest" style={button}>保護者から無料の参加相談をする ↗</a>
          <a href="#programme" style={{...button,background:"transparent",color:"#fff",borderColor:"#69777e"}}>指導方針を見る ↓</a>
        </div>
        <p style={{fontSize:13,color:"#c2cdd1",lineHeight:1.8,margin:"21px 0 0"}}>2027年活動準備中／女子チームの設立・活動日・会費・定員・登録は未確定。無料相談だけで入団・費用は発生しません。</p>
      </div>
    </section>
    <section style={{padding:"26px max(20px,6vw)",background:"#e9edec",borderBottom:"1px solid "+line}}>
      <div style={{maxWidth:1180,margin:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:18}}>
        {[
          ["対象","女子U15を目指す選手・保護者の事前相談"],
          ["エリア","仙台市太白区を中心に準備"],
          ["参加相談","無料／課金なし"],
          ["ステータス","2027年の女子指導開始に向け調整中"]
        ].map(([k,v])=><div key={k}><p style={{fontSize:12,fontWeight:900,letterSpacing:1.8,color:muted,margin:"0 0 7px"}}>{k}</p><p style={{fontSize:17,fontWeight:800,lineHeight:1.55,margin:0}}>{v}</p></div>)}
      </div>
    </section>

    <section id="programme" style={{padding:"75px max(20px,6vw)"}}>
      <div style={{maxWidth:1180,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:900,color:muted}}>FOUR DEVELOPMENT PILLARS</p>
        <h2 style={{fontSize:"clamp(32px,5.5vw,62px)",lineHeight:1.1,letterSpacing:"-.045em",margin:"12px 0 22px"}}>バスケだけでなく、<br/>選手を育てる。</h2>
        <p style={{maxWidth:800,lineHeight:1.9,fontSize:17,color:muted,margin:"0 0 28px"}}>目の前の勝敗だけでなく、技術・判断・身体の成長・自分の言葉で伝える力を、継続して積み重ねます。年齢、経験、成長段階に応じて内容を調整します。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(255px,1fr))",gap:15}}>
          {pillars.map(([label,title,desc])=><article key={label} style={{border:"1px solid "+line,padding:"27px 25px",background:fog}}>
            <p style={{fontSize:12,letterSpacing:1.5,fontWeight:900,color:muted,margin:"0 0 19px"}}>{label}</p>
            <h3 style={{fontSize:25,lineHeight:1.3,margin:"0 0 17px"}}>{title}</h3>
            <p style={{fontSize:15,lineHeight:1.85,color:muted,margin:0}}>{desc}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section style={{padding:"76px max(20px,6vw)",background:ink,color:"#fff"}}>
      <div style={{maxWidth:1180,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#b8c7cc",fontWeight:900}}>NEUROMUSCULAR TRAINING / INJURY RISK REDUCTION</p>
        <h2 style={{fontSize:"clamp(32px,5.3vw,61px)",lineHeight:1.14,margin:"13px 0 18px"}}>けがを減らすための学びを、<br/>毎日の練習へ。</h2>
        <p style={{fontSize:17,color:"#d5dfe3",lineHeight:1.95,maxWidth:900}}>
          ジャンプ後の着地、急な停止、方向転換、片脚支持、筋力発揮。ゲームで繰り返す動作を、技術練習と分断せず段階的に扱います。
          神経筋トレーニングを含むウォームアップを週2回以上継続する方法は、女子選手のACLや足関節の傷害リスク低減の研究で支持されています。
          一方で、個人のリスクを確実に予測したり、けがをゼロにしたりするものではありません。
        </p>
        <h3 style={{fontSize:23,margin:"32px 0 14px"}}>運動準備・身体づくりの一例（実施案）</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))",gap:13}}>
          {training.map(([n,title,desc])=><article key={n} style={{padding:"22px 20px",border:"1px solid #637078"}}>
            <p style={{fontSize:12,fontWeight:900,color:"#b9c6ca",letterSpacing:2,margin:"0 0 11px"}}>{n}</p>
            <h4 style={{fontSize:22,margin:"0 0 9px"}}>{title}</h4>
            <p style={{fontSize:15,lineHeight:1.8,color:"#d8e0e3",margin:0}}>{desc}</p>
          </article>)}
        </div>
        <p style={{fontSize:13,color:"#b9c8ce",lineHeight:1.8,marginTop:25}}>
          指導者の監督下で、痛みの有無・疲労・練習経験・運動歴に応じて強度を調整。運動内容や評価は医療診断の代わりではありません。
        </p>
        <p style={{fontSize:13,color:"#c6d4d8",lineHeight:1.9,marginTop:12}}>
          参考：<a href="https://bjsm.bmj.com/content/59/22/1546" target="_blank" rel="noopener noreferrer" style={{color:"#fff",textDecoration:"underline"}}>IOC FAIR consensus (2025)</a> ／
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13615120/" target="_blank" rel="noopener noreferrer" style={{color:"#fff",textDecoration:"underline",marginLeft:6}}>ACL Injury Prevention Position Statement (2026)</a>
        </p>
      </div>
    </section>

    <section style={{padding:"75px max(20px,6vw)"}}>
      <div style={{maxWidth:1180,margin:"auto"}}>
        <p style={{fontSize:12,fontWeight:900,letterSpacing:3,color:muted}}>FROM FIRST CONTACT TO A TEAM</p>
        <h2 style={{fontSize:"clamp(32px,5vw,57px)",lineHeight:1.13,margin:"10px 0 25px"}}>2027年に向けた準備工程</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(255px,1fr))",gap:14}}>
          {[
            ["STEP 01","保護者の関心・希望を確認","学年、希望曜日、活動への不安を無料フォームで確認します。選手本人の希望も尊重します。"],
            ["STEP 02","指導・会場・安全管理を整備","女子の指導担当、練習場所と時間、複数大人の安全管理、保険・緊急対応、費用を確定します。"],
            ["STEP 03","説明会・体験を案内","具体的な開催条件と費用を説明し、納得したご家庭に体験機会をご案内します。"],
            ["STEP 04","正式設立・登録を判断","人数・人員・施設・登録要件が整った段階で女子チームの正式設立と募集を決定します。"]
          ].map(([n,title,desc])=><article key={n} style={{padding:"26px 23px",border:"1px solid "+line,background:fog}}>
            <p style={{fontSize:12,fontWeight:900,letterSpacing:2,color:muted,margin:"0 0 15px"}}>{n}</p>
            <h3 style={{fontSize:23,margin:"0 0 12px",lineHeight:1.3}}>{title}</h3>
            <p style={{fontSize:15,lineHeight:1.85,color:muted,margin:0}}>{desc}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section style={{padding:"70px max(20px,6vw)",background:fog}}>
      <div style={{maxWidth:1180,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:900,color:muted}}>FOR ATHLETES & FAMILIES</p>
        <h2 style={{fontSize:"clamp(30px,5vw,56px)",margin:"12px 0 22px"}}>安心して選べることも、育成。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:18}}>
          <article style={{padding:26,background:"#fff",border:"1px solid "+line}}><h3 style={{fontSize:24,margin:"0 0 12px"}}>出場機会と評価</h3><p style={{lineHeight:1.9,color:muted,margin:0}}>選手を単なる勝敗の手段として扱わず、練習中の学習機会を確保します。大会での出場時間は規程・競技状況等に応じて別途方針を明示します。出場時間の一律保証を意味しません。</p></article>
          <article style={{padding:26,background:"#fff",border:"1px solid "+line}}><h3 style={{fontSize:24,margin:"0 0 12px"}}>学校・今のチームを尊重</h3><p style={{lineHeight:1.9,color:muted,margin:0}}>小6の卒団や進学後の選択は本人と家庭のもの。入団や移籍の勧誘を強制せず、JBA・宮城県協会・学校の最新登録規程を確認します。</p></article>
          <article style={{padding:26,background:"#fff",border:"1px solid "+line}}><h3 style={{fontSize:24,margin:"0 0 12px"}}>女子選手の相談体制</h3><p style={{lineHeight:1.9,color:muted,margin:0}}>痛み、疲労、体調、身体の変化、心理的な負担を話しやすい環境を整え、必要に応じて保護者や医療専門職と連携する仕組みを準備します。</p></article>
        </div>
      </div>
    </section>

    <section style={{padding:"75px max(20px,6vw)"}}>
      <div style={{maxWidth:1180,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:900,color:muted}}>FREQUENTLY ASKED QUESTIONS</p>
        <h2 style={{fontSize:"clamp(32px,4.8vw,55px)",margin:"10px 0 24px"}}>保護者の疑問にお答えします。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(285px,1fr))",gap:13}}>
          {faqs.map(([q,a])=><article key={q} style={{padding:"23px 24px",border:"1px solid "+line}}>
            <h3 style={{fontSize:19,margin:"0 0 13px",lineHeight:1.55}}>{q}</h3>
            <p style={{lineHeight:1.8,color:muted,fontSize:15,margin:0}}>{a}</p>
          </article>)}
        </div>
        <p style={{marginTop:22,fontSize:13,lineHeight:1.85,color:muted}}>公式規程：<a href="https://u15.japanbasketball.jp/registration/" target="_blank" rel="noopener noreferrer" style={{color:ink,textDecoration:"underline"}}>JBA U15登録・移籍に関する資料</a>。2027年度の条件は公開後に改めて確認します。</p>
      </div>
    </section>

    <section style={{padding:"76px max(20px,6vw) 90px",background:ink,color:"#fff",textAlign:"center"}}>
      <div style={{maxWidth:880,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:900,color:"#b5c3c8"}}>FREE / PARENT-LED INTEREST REGISTRATION</p>
        <h2 style={{fontSize:"clamp(34px,5.3vw,65px)",lineHeight:1.13,margin:"14px 0 20px"}}>これからのチームを、<br/>一緒につくろう。</h2>
        <p style={{fontSize:17,color:"#d3dde1",lineHeight:1.9,margin:"0 auto 28px"}}>「まずは話を聞いてみたい」「体験があれば参加したい」。その段階から歓迎します。未成年者本人に代わり、保護者の方が無料で相談できます。</p>
        <a href={formUrl} target="_blank" rel="noopener noreferrer" data-growth-id="gream-sendai-girls-final-interest" style={button}>女子U15の無料事前相談をする ↗</a>
        <p style={{fontSize:13,color:"#c4cdd1",lineHeight:1.8,margin:"18px 0 27px"}}>相談のみで入会・課金・席の確定はありません。別イベントの営業への個人情報転用は行いません。</p>
        <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap",gap:"12px 24px",fontSize:14}}>
          <a href={coachUrl} target="_blank" rel="noopener noreferrer" style={{color:"#fff",textUnderlineOffset:4}}>指導者・女性スタッフの協力相談 ↗</a>
          <a href="/ja/gream-sendai/partners" style={{color:"#fff",textUnderlineOffset:4}}>地域パートナー・協賛のご案内 →</a>
          <a href="/ja/gream-sendai" style={{color:"#fff",textUnderlineOffset:4}}>GREAM仙台トップ →</a>
        </div>
      </div>
    </section>
  </main></SiteFrame>;
}
