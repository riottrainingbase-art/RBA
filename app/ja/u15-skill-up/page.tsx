import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "仙台・太白区のU15バスケットボールスクール｜RBA U15 SKILL UP SCHOOL",
  description: "仙台市太白区のU15バスケットボールスクール。小学6年生・中学生が対象。毎週木曜日・原則月3回、18:00〜19:30。所属チームはそのままで、見る・判断する・実行する力をゲームの中で育てます。定員25名。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/u15-skill-up" },
  openGraph: {
    title: "RBA U15 SKILL UP SCHOOL｜仙台",
    description: "現代バスケットボールを学ぶ90分。小学6年生も参加可。SEE / DECIDE / ACT。毎週木曜日、仙台市太白区。月3回7,700円、定員25名。",
    url: "https://riotbasketballacademy.com/ja/u15-skill-up",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA U15 SKILL UP SCHOOL｜仙台",
    description: "現代バスケットボールを学ぶ90分。小学6年生も参加可。毎週木曜日・原則月3回、定員25名。",
    images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"],
  },
};

const months = [
  ["10月","OBSERVE & DECIDE","見る・認知する・判断する"],
  ["11月","CREATE ADVANTAGE","1on1で優位性をつくる"],
  ["12月","USE ADVANTAGE","ズレを使い、次へつなぐ"],
  ["1月","FINISHING","リング周辺の解決力"],
  ["2月","SHOOTING IN CONTEXT","ゲーム状況からシュートを選ぶ"],
  ["3月","SPACING","距離・角度・スペースを理解する"],
  ["4月","OFF-BALL PLAY","カット・リロケート・リアクション"],
  ["5月","PASSING & CONNECTING","優位性をパスでつなぐ"],
  ["6月","TRANSITION","切り替えと数的優位の判断"],
  ["7月","DEFENSIVE FUNDAMENTALS","1on1・クローズアウト・リカバリー"],
  ["8月","TEAM DEFENCE","ヘルプ・ローテーション・判断"],
  ["9月","COMPLETE PLAYER","年間の学びをゲームで統合する"],
] as const;

const focus = [
  ["SEE","相手・味方・スペースを観る"],
  ["DECIDE","状況に応じて選択する"],
  ["ACT","技術をゲームの中で実行する"],
  ["ADAPT","失敗から修正し、次へつなぐ"],
] as const;

const structuredData = {
  "@context":"https://schema.org",
  "@type":"SportsActivityLocation",
  name:"RBA U15 SKILL UP SCHOOL｜仙台",
  description:"仙台市太白区で毎週木曜日・原則月3回開催する、小学6年生・U15年代向けのバスケットボール育成スクール。",
  url:"https://riotbasketballacademy.com/ja/u15-skill-up",
  sport:"Basketball",
  address:{
    "@type":"PostalAddress",
    addressLocality:"仙台市太白区",
    addressRegion:"宮城県",
    addressCountry:"JP"
  },
  provider:{
    "@type":"SportsOrganization",
    name:"Riot Basketball Academy",
    url:"https://riotbasketballacademy.com"
  },
  offers:{
    "@type":"Offer",
    priceCurrency:"JPY",
    price:"7700",
    description:"月3回・月会費7,700円（税込）。初回入会金5,500円（税込）。"
  }
};

export default function Page(){
  return <SiteFrame locale="ja" languagePage="opportunities"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
    <main style={{background:"#f5f5f2",color:"#111"}}>
      <section style={{padding:"72px 6vw 56px",borderBottom:"1px solid #d6d6d0",background:"#fff"}}>
        <p style={{fontSize:13,letterSpacing:3,fontWeight:700,margin:"0 0 20px"}}>RIOT BASKETBALL ACADEMY · SENDAI · START OCT 2026</p>
        <h1 style={{fontSize:"clamp(42px,8vw,92px)",lineHeight:.92,letterSpacing:-3,margin:"0 0 24px",fontWeight:900}}>RBA U15<br/>SKILL UP SCHOOL</h1>
        <p style={{fontSize:"clamp(22px,3vw,34px)",fontWeight:800,margin:"0 0 14px"}}>現代バスケットボールを学ぶ90分。</p>
        <p style={{maxWidth:760,fontSize:17,lineHeight:1.8,margin:"0 0 30px",color:"#3f3f3a"}}>技術を覚えるだけで終わらせない。見る、判断する、実行する。1on1、スペーシング、フィニッシュ、オフボール、ディフェンス、スモールサイドゲームを年間でつなぎ、ゲームで使えるFundamentalsを育てます。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="#apply" style={{display:"inline-block",background:"#111",color:"#fff",padding:"15px 22px",fontWeight:800,textDecoration:"none"}}>STEP 1｜申込フォームへ ↓</a>
          <a href="https://buy.stripe.com/aFa3cx6abaDG8aNboz7EQ0u" target="_blank" rel="noreferrer" style={{display:"inline-block",border:"1px solid #111",color:"#111",padding:"14px 22px",fontWeight:800,textDecoration:"none",background:"#fff"}}>STEP 2｜入会金＋初月決済へ ↗</a>
        </div>
      </section>

      <section style={{padding:"48px 6vw",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:1,background:"#cfcfc9"}}>
        {[
          ["対象","U15年代（小学6年生も参加可）"],
          ["定員","25名"],
          ["開始","2026年10月"],["開催","毎週木曜日・原則月3回"],
          ["時間","18:00〜19:30"],
          ["会場","仙台市太白区"],
          ["入会金","5,500円（税込）"],["月会費","7,700円（税込）"],
        ].map(([k,v])=><div key={k} style={{background:"#fff",padding:"26px 24px"}}><div style={{fontSize:12,letterSpacing:2,color:"#6b6b65",marginBottom:8}}>{k}</div><strong style={{fontSize:22}}>{v}</strong></div>)}
      </section>

      <section style={{padding:"72px 6vw",background:"#111",color:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:700}}>DEVELOPMENT PRINCIPLE</p>
        <h2 style={{fontSize:"clamp(34px,5vw,60px)",lineHeight:1.05,margin:"12px 0 18px"}}>SKILL × PERCEPTION × DECISION × GAME</h2>
        <p style={{maxWidth:780,fontSize:18,lineHeight:1.8,color:"#d8d8d3"}}>チームで決められた役割だけではなく、一人のバスケットボール選手としてできることを増やす。技術と判断を切り離さず、ゲームの中で学びます。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginTop:34}}>
          {focus.map(([a,b])=><div key={a} style={{border:"1px solid #3e3e3a",padding:22}}><div style={{fontSize:28,fontWeight:900,marginBottom:9}}>{a}</div><div style={{color:"#d7d7d1",lineHeight:1.6}}>{b}</div></div>)}
        </div>
      </section>

      <section style={{padding:"72px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:700,color:"#666"}}>ANNUAL DEVELOPMENT PLAN · OCT 2026–SEP 2027 · 36 SESSIONS</p>
        <h2 style={{fontSize:"clamp(34px,5vw,58px)",lineHeight:1.08,margin:"12px 0 34px"}}>年間36回を、一つの成長ストーリーに。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12}}>
          {months.map(([m,e,j],i)=><article key={m} style={{background:"#fff",padding:"24px 22px",border:"1px solid #dddcd6"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:12}}><strong style={{fontSize:26}}>{m}</strong><span style={{fontSize:11,letterSpacing:2,color:"#777"}}>{String(i+1).padStart(2,"0")}/12</span></div>
            <h3 style={{fontSize:17,letterSpacing:1,margin:"18px 0 8px"}}>{e}</h3>
            <p style={{margin:0,lineHeight:1.65,color:"#4b4b47"}}>{j}</p>
          </article>)}
        </div>
      </section>

      <section style={{padding:"64px 6vw",background:"#fff"}}>
        <h2 style={{fontSize:"clamp(30px,4vw,48px)",margin:"0 0 24px"}}>1回90分の基本構成</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:1,background:"#d3d3cd"}}>
          {[["15分","INDIVIDUAL FUNDAMENTALS"],["20分","DECISION SKILL"],["20分","2on2 / 3on3"],["25分","GAME APPLICATION"],["10分","REFLECTION"]].map(([t,n])=><div key={n} style={{background:"#f8f8f5",padding:24}}><strong style={{fontSize:30}}>{t}</strong><div style={{marginTop:10,fontSize:12,letterSpacing:1.5}}>{n}</div></div>)}
        </div>
        <p style={{margin:"24px 0 0",fontSize:16,lineHeight:1.8,color:"#4d4d48"}}>最後は「何が見えた？」「なぜそのプレーを選んだ？」「次は何を変える？」まで振り返ります。正解を覚えるのではなく、自分でゲームを理解する力を育てます。</p>
      </section>

      <section style={{padding:"72px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:700,color:"#666"}}>WHO THIS IS FOR</p>
        <h2 style={{fontSize:"clamp(32px,5vw,54px)",lineHeight:1.08,margin:"12px 0 28px"}}>「もっとできるはず」を、練習だけで終わらせない。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>
          {[
            ["判断を速くしたい","ボールを持ってから考えるのではなく、受ける前から見て選ぶ習慣をつくる。"],
            ["試合で技術を使いたい","ドリルでできる技術を、1on1〜4on4の判断の中で使える形へつなげる。"],
            ["役割を広げたい","今のポジションだけに固定せず、運ぶ・攻める・パスする・守るを経験する。"],
            ["中学・次のカテゴリーへ備えたい","小学6年生も参加可。U15年代につながるゲーム理解を早めに身につける。"],
          ].map(([t,b])=><article key={t} style={{border:"1px solid #dddcd6",padding:24,background:"#fafaf7"}}><h3 style={{fontSize:21,margin:"0 0 10px"}}>{t}</h3><p style={{margin:0,lineHeight:1.75,color:"#4b4b47"}}>{b}</p></article>)}
        </div>
        <p style={{margin:"28px 0 0",fontSize:17,lineHeight:1.8,maxWidth:850}}><strong>所属チームはそのままで大丈夫です。</strong> チーム活動とは別に、自分自身のバスケットボールを整理し、試し、振り返るための育成環境として参加できます。</p>
      </section>

      <section style={{padding:"64px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:700,color:"#666"}}>SENDAI · TAIHAKU</p>
        <h2 style={{fontSize:"clamp(30px,4vw,48px)",margin:"10px 0 18px"}}>仙台で中学生のバスケスクールを探している方へ。</h2>
        <p style={{maxWidth:900,lineHeight:1.85,fontSize:17,color:"#444"}}>RBA U15 SKILL UP SCHOOLは、仙台市太白区で開催する小学6年生・中学生向けの定期育成スクールです。部活動やクラブチームの所属を変える必要はありません。普段のチーム活動を続けながら、個人として「見る・判断する・実行する」を整理し、ゲームの中で試す時間をつくります。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12,marginTop:24}}>
          <article style={{background:"#fff",border:"1px solid #dddcd6",padding:22}}><strong>仙台市太白区</strong><p style={{lineHeight:1.7,color:"#4b4b47"}}>毎週木曜日・18:00〜19:30。学校や所属チームと両立しやすい平日夜の90分です。</p></article>
          <article style={{background:"#fff",border:"1px solid #dddcd6",padding:22}}><strong>小学6年生から参加可</strong><p style={{lineHeight:1.7,color:"#4b4b47"}}>中学バスケへ進む前に、ゲーム理解と個人のFundamentalsを整理できます。</p></article>
          <article style={{background:"#fff",border:"1px solid #dddcd6",padding:22}}><strong>所属変更は不要</strong><p style={{lineHeight:1.7,color:"#4b4b47"}}>RBAは所属クラブの代替ではなく、選手個人の学習機会を追加する育成環境として設計しています。</p></article>
        </div>
      </section>

      <section style={{padding:"64px 6vw",background:"#ecece7"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:700,color:"#666"}}>MY HOME COURT</p>
        <h2 style={{fontSize:"clamp(30px,4vw,48px)",margin:"10px 0 18px"}}>90分で終わらせず、成長を残す。</h2>
        <p style={{maxWidth:860,lineHeight:1.85,fontSize:17,color:"#444"}}>スクールで取り組んだことを、MY HOME COURTのBasketball Passportや振り返りにつなげます。参加予定、学んだこと、次に試したいこと、次の育成機会を一つの場所で整理できます。RBA IDは無料です。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:24}}>
          <a href="/ja/my-homecourt" style={{display:"inline-block",background:"#111",color:"#fff",padding:"14px 20px",fontWeight:800,textDecoration:"none"}}>MY HOME COURTを見る →</a>
          <a href="/ja/my-homecourt/login" style={{display:"inline-block",border:"1px solid #111",color:"#111",padding:"13px 20px",fontWeight:800,textDecoration:"none",background:"#fff"}}>無料RBA IDをつくる →</a>
        </div>
      </section>

      <section style={{padding:"64px 6vw",background:"#111",color:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:700}}>REGISTRATION FLOW</p>
        <h2 style={{fontSize:"clamp(30px,4vw,48px)",margin:"10px 0 26px"}}>申込 → 月額登録 → MY HOME COURT</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
          <div style={{border:"1px solid #444",padding:24}}><strong style={{fontSize:26}}>01</strong><h3>申込フォーム</h3><p style={{color:"#d8d8d3",lineHeight:1.7}}>選手・保護者情報、現在の課題、安全上の共有事項を入力します。</p></div>
          <div style={{border:"1px solid #444",padding:24}}><strong style={{fontSize:26}}>02</strong><h3>入会金＋月額登録</h3><p style={{color:"#d8d8d3",lineHeight:1.7}}>初回は入会金5,500円＋初月会費7,700円＝13,200円（税込）。翌月以降は月額7,700円（税込）です。Stripeの安全な決済画面から登録します。</p><a href="https://buy.stripe.com/aFa3cx6abaDG8aNboz7EQ0u" target="_blank" rel="noreferrer" style={{color:"#fff",fontWeight:800}}>月額登録へ →</a></div>
          <div style={{border:"1px solid #444",padding:24}}><strong style={{fontSize:26}}>03</strong><h3>RBAから確認メール</h3><p style={{color:"#d8d8d3",lineHeight:1.7}}>フォームと決済を確認後、受付確定と会場詳細をメールでご案内します。</p></div>
          <div style={{border:"1px solid #444",padding:24}}><strong style={{fontSize:26}}>04</strong><h3>MY HOME COURT</h3><p style={{color:"#d8d8d3",lineHeight:1.7}}>参加予定、成長記録、次の育成機会を一つの場所につなげます。</p><a href="/ja/my-homecourt" style={{color:"#fff",fontWeight:800}}>MY HOME COURTを見る →</a></div>
        </div>
        <p style={{margin:"24px 0 0",color:"#bbb",lineHeight:1.7}}>登録後の支払い方法変更・解約手続きはStripeの会員ページから行えます。<a href="https://billing.stripe.com/p/login/8x2dRb2XZ4fi1MpeAL7EQ00" target="_blank" rel="noreferrer" style={{color:"#fff",fontWeight:800}}> 月額登録を管理する ↗</a></p>
      </section>

      <section style={{padding:"54px 6vw",background:"#ecece7"}}>
        <h2 style={{fontSize:"clamp(28px,4vw,44px)",margin:"0 0 18px"}}>お申込み前に</h2>
        <ul style={{lineHeight:1.9,fontSize:16,paddingLeft:22,margin:0,maxWidth:900}}>
          <li>対象はU15年代です。小学6年生も参加できます。</li><li>定員は25名です。定員到達後は受付停止またはキャンセル待ちとなります。</li>
          <li>フォーム送信と初回決済（入会金5,500円＋初月会費7,700円）の両方を確認後、RBAからの申込確認メールをもって受付確定となります。</li>
          <li>会場詳細は、申込確認メール内でご案内します。</li>
          <li>未成年者のため、保護者の方が内容をご確認のうえお申込みください。</li>
          <li>痛みや体調不良がある場合は無理に参加せず、事前にご相談ください。</li><li>欠席・解約・返金等は<a href="/ja/policies#cancellation" style={{fontWeight:800,color:"#111"}}>RBAのキャンセル・返金方針</a>をご確認ください。</li>
        </ul>
      </section>

      <section style={{padding:"72px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:700,color:"#666"}}>FREQUENTLY ASKED QUESTIONS</p>
        <h2 style={{fontSize:"clamp(32px,5vw,52px)",lineHeight:1.08,margin:"12px 0 30px"}}>参加前によくある質問</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12}}>
          {[
            ["小学6年生でも参加できますか？","はい。U15年代につながる準備期間として、小学6年生も参加できます。"],
            ["今のチームを辞める必要はありますか？","ありません。所属チームでの活動を大切にしながら、個人として学ぶための追加環境として参加できます。"],
            ["ポジションは固定されますか？","固定しません。運ぶ・攻める・パスする・守るなど、複数の役割を経験しながらゲーム理解を広げます。"],
            ["経験年数やレベル差があっても大丈夫ですか？","申込時の経験や課題を確認し、少人数グループやSmall-Sided Gamesを使って安全面と学習負荷を調整します。"],
            ["会場はどこですか？","仙台市太白区です。詳細は申込フォームと月額登録を確認後、RBAからの受付確認メールでご案内します。"],
            ["欠席した場合はどうなりますか？","月3回の定期受講です。欠席・振替・キャンセルの扱いはRBAの案内および規定に沿ってご案内します。"],
            ["月額登録の変更や解約はできますか？","Stripeの会員ページから支払い方法の変更や解約手続きができます。解約時期などはRBAの規定をご確認ください。"],
            ["MY HOME COURTは何に使いますか？","参加記録、Basketball Passport、振り返り、次の育成機会の確認など、スクール外の成長管理に使えます。RBA IDは無料です。"],
          ].map(([q,a])=><article key={q} style={{borderTop:"1px solid #d8d8d2",padding:"22px 4px 8px"}}><h3 style={{fontSize:18,margin:"0 0 10px"}}>{q}</h3><p style={{margin:0,lineHeight:1.8,color:"#4b4b47"}}>{a}</p></article>)}
        </div>
        <div style={{marginTop:34,padding:"24px",background:"#f3f3ef",border:"1px solid #dddcd6"}}>
          <strong style={{display:"block",fontSize:20,marginBottom:8}}>参加前に確認したいことがある方へ</strong>
          <p style={{margin:"0 0 14px",lineHeight:1.7,color:"#4b4b47"}}>学年、現在の課題、所属チームとの両立など、申込前の相談も受け付けています。</p>
          <a href="mailto:riot.training.base@gmail.com?subject=RBA%20U15%20SKILL%20UP%20SCHOOL%E7%9B%B8%E8%AB%87" style={{fontWeight:800,color:"#111"}}>メールで相談する →</a>
        </div>
      </section>

      <section style={{padding:"60px 6vw",background:"#111",color:"#fff",textAlign:"center"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:700}}>START OCTOBER 2026 · 25 PLAYERS</p>
        <h2 style={{fontSize:"clamp(34px,5vw,58px)",lineHeight:1.08,margin:"12px auto 18px",maxWidth:900}}>チームの外にも、成長できる場所を。</h2>
        <p style={{maxWidth:760,margin:"0 auto 26px",lineHeight:1.8,color:"#d8d8d3"}}>毎週木曜日・原則月3回。技術と判断を、ゲームの中で育てる90分です。</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="#apply" style={{display:"inline-block",background:"#fff",color:"#111",padding:"15px 22px",fontWeight:900,textDecoration:"none"}}>申込フォームへ ↓</a>
          <a href="https://buy.stripe.com/aFa3cx6abaDG8aNboz7EQ0u" target="_blank" rel="noreferrer" style={{display:"inline-block",border:"1px solid #777",color:"#fff",padding:"14px 22px",fontWeight:800,textDecoration:"none"}}>月額登録へ ↗</a>
        </div>
      </section>

      <section id="apply" style={{padding:"72px 4vw 88px",background:"#fff"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:3,fontWeight:700}}>APPLICATION</p>
          <h2 style={{fontSize:"clamp(34px,5vw,56px)",margin:"10px 0 12px"}}>申込フォーム</h2>
          <p style={{lineHeight:1.8,color:"#555",margin:"0 0 28px"}}>入力内容を確認後、RBAより申込確認メールをお送りします。会場詳細も確認メールでご案内します。</p>
          <div style={{border:"1px solid #d6d6d0",background:"#fafafa",minHeight:1180}}>
            <iframe
              title="RBA U15 SKILL UP SCHOOL 申込フォーム"
              src="https://form.jotform.com/262678369675074"
              width="100%"
              height="1180"
              style={{border:0,display:"block"}}
              loading="lazy"
            />
          </div>
          <p style={{fontSize:13,color:"#777",marginTop:14}}>フォームが表示されない場合は <a href="https://form.jotform.com/262678369675074" target="_blank" rel="noreferrer" style={{color:"#111",fontWeight:700}}>こちらから直接開いてください ↗</a></p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
