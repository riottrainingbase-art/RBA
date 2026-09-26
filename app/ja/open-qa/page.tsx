import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA OPEN Q&A｜育成相談・専門回答",
  description: "U12・U15の育成、戦術、出場時間、指導方法、保護者の悩み、S&C、3x3について、RBAへ正式に質問・相談できる有料専門窓口です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/open-qa" },
  openGraph: {
    title: "RBA OPEN Q&A｜育成相談・専門回答",
    description: "育成の疑問を、感情論ではなく論点・根拠・実務に整理するRBA公式の有料質問窓口。",
    url: "https://riotbasketballacademy.com/ja/open-qa",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const STANDARD_URL="https://buy.stripe.com/3cI6oJeGHeTWcr350b7EQ0v";
const DEEP_DIVE_URL="https://buy.stripe.com/14A3cx8ij4fidv78cn7EQ0w";

const themes=[
  ["U12 / U15 DEVELOPMENT","年代別の育成","何を、いつ、どの順序で学ぶか。"],
  ["TACTICS","戦術・ゲームモデル","スクリーン、プレス、スペーシング、優位性。"],
  ["PLAYING TIME","出場時間・ローテーション","実戦経験をどう設計するか。"],
  ["COACHING","声かけ・介入・指導方法","教える、問う、待つ。その使い分け。"],
  ["PARENTS","保護者の悩み","環境選び、継続、移籍、指導者との関係。"],
  ["S&C / LOAD","身体づくり・負荷管理","成長期の身体、安全、回復、トレーニング。"],
  ["3x3","3x3と育成","判断回数、役割、スペース、競技経験。"],
  ["RULES / SYSTEM","制度・ルール","育成環境を支える仕組みそのもの。"],
] as const;

const steps=[
  ["01","ASK","質問・相談を1テーマに整理する"],
  ["02","PAY","STANDARD / DEEP DIVEを選んで決済"],
  ["03","SUBMIT","決済後のフォームから詳細を送信"],
  ["04","REVIEW","RBAが前提・論点・必要資料を確認"],
  ["05","ANSWER","内容に合う形で回答・知識化"],
] as const;

const standards=[
  ["QUESTION","何を知りたいのかを一文にする。"],
  ["CONTEXT","年代・状況・目的など、前提を整理する。"],
  ["EVIDENCE","必要に応じて研究・教材・一次情報を確認する。"],
  ["RBA VIEW","現場でどう解釈し、どう使うかを示す。"],
  ["LIMITS","断定できないこと、個人差、例外を明記する。"],
] as const;

const rules=[
  "料金は、質問を読み、論点整理・資料確認・回答作成を行う専門作業への対価です。",
  "特定の結論、RBAからの賛同、勝敗判定を購入するサービスではありません。",
  "RBAと異なる意見・反論も歓迎します。",
  "人格攻撃、侮辱、晒し目的、未成年者を特定できる情報を含む投稿は扱いません。",
  "公開時は個人情報を除き、必要に応じて質問内容を要約・匿名化します。",
  "医療・法律等は一般情報の範囲にとどめ、必要な場合は専門家への相談をご案内します。",
  "対応範囲外や安全上回答できない場合は、匿名化、別テーマへの振替、返金等を個別にご案内する場合があります。",
  "すべての質問への即時回答、個別返信、希望媒体での掲載を保証するものではありません。",
] as const;

const faq=[
  ["反対意見でも送れますか？","はい。RBAへの異論・反論も歓迎します。人物ではなく、育成方法・前提・根拠についてお送りください。"],
  ["匿名で利用できますか？","公開時は匿名を選べます。決済照合のため、Stripe決済時のメールアドレスのみフォームで確認します。"],
  ["支払えば希望する答えがもらえますか？","いいえ。料金は回答作業への対価です。RBAの見解が質問者の考えと一致しない場合もあります。"],
  ["どこで回答されますか？","質問内容に応じてThreads、Instagram、RBA JOURNAL、ライブ等から適した形を選びます。"],
  ["回答できない質問はどうなりますか？","安全・プライバシー・対応範囲等の理由で回答できない場合、振替や返金等を個別にご案内する場合があります。"],
] as const;

const structuredData={
  "@context":"https://schema.org",
  "@type":"FAQPage",
  mainEntity:faq.map(([q,a])=>({
    "@type":"Question",
    name:q,
    acceptedAnswer:{"@type":"Answer",text:a},
  })),
};

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const params=await searchParams;
  const paid=typeof params.paid==="string"?params.paid:"";
  const canSubmit=paid==="standard"||paid==="deep-dive";

  return <SiteFrame locale="ja" languagePage="journal">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
    <main style={{background:"#f5f5f2",color:"#111"}}>
      <section style={{padding:"78px 6vw 64px",background:"#fff",borderBottom:"1px solid #dddcd6"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,margin:"0 0 18px"}}>RBA OPEN Q&A · DEVELOPMENT CONSULTATION</p>
        <h1 style={{fontSize:"clamp(42px,7vw,86px)",lineHeight:.97,letterSpacing:-2,margin:"0 0 24px",fontWeight:900}}>育成の疑問を、<br/>ちゃんと考える。</h1>
        <p style={{maxWidth:920,fontSize:19,lineHeight:1.9,color:"#3f3f3b",margin:"0 0 16px"}}>RBA OPEN Q&Aは、育成年代のバスケットボールについて、<strong>RBAへ正式に質問・相談できる有料の専門回答サービス</strong>です。</p>
        <p style={{maxWidth:920,fontSize:16,lineHeight:1.9,color:"#62625d",margin:"0 0 30px"}}>短いコメントの応酬では扱いにくいテーマを、前提・論点・必要な資料に分けて整理します。質問、相談、RBAへの異論・反論まで受け付けます。目的は「言い負かすこと」ではなく、子どもの育成に使える知識へ変えることです。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="#pricing" style={{background:"#111",color:"#fff",padding:"15px 22px",fontWeight:900,textDecoration:"none"}}>プランを見る ↓</a>
          <a href="#scope" style={{border:"1px solid #111",color:"#111",padding:"14px 22px",fontWeight:800,textDecoration:"none"}}>相談できる内容</a>
        </div>
      </section>

      <section style={{padding:"58px 6vw",background:"#111",color:"#fff"}}>
        <div style={{maxWidth:950}}>
          <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:800}}>WHAT YOU ARE PAYING FOR</p>
          <h2 style={{fontSize:"clamp(30px,4vw,52px)",margin:"10px 0 18px"}}>答えを買うのではなく、<br/>考える時間と専門性に対価を払う。</h2>
          <p style={{fontSize:17,lineHeight:1.9,color:"#d8d8d3",margin:0}}>料金は、RBAの賛同を得るためのものではありません。質問を読み、状況を整理し、必要に応じて資料を確認し、実務で使える形に回答をまとめるための対価です。RBAと意見が一致しない回答になることもあります。</p>
        </div>
      </section>

      <section id="pricing" style={{padding:"68px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>PRICING</p>
        <h2 style={{fontSize:"clamp(30px,4vw,52px)",margin:"10px 0 12px"}}>回答の深さで選ぶ。</h2>
        <p style={{maxWidth:800,fontSize:16,lineHeight:1.8,color:"#5b5b56",margin:"0 0 30px"}}>どちらも1テーマ・1質問です。複数テーマが混在する場合は、回答前に論点を整理します。</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14,maxWidth:1040}}>
          <article style={{border:"1px solid #cecec8",padding:30,background:"#fff"}}>
            <span style={{fontSize:12,letterSpacing:2,color:"#777",fontWeight:800}}>STANDARD</span>
            <h3 style={{fontSize:32,margin:"10px 0 4px"}}>1質問 ¥1,100</h3>
            <p style={{color:"#777",fontSize:14,margin:"0 0 18px"}}>税込・1回</p>
            <p style={{lineHeight:1.85,color:"#444"}}><strong>論点整理＋RBAの専門的見解。</strong><br/>まず考え方を聞きたい方、現場の疑問を整理したい方向けです。</p>
            <ul style={{lineHeight:1.95,color:"#444",paddingLeft:20}}>
              <li>1テーマ・1質問</li>
              <li>質問の論点整理</li>
              <li>RBAとしての見解</li>
              <li>必要に応じた参考情報</li>
              <li>公開Q&Aとしての簡潔な回答を基本</li>
            </ul>
            <a href={STANDARD_URL} style={{display:"inline-block",marginTop:16,background:"#111",color:"#fff",padding:"15px 21px",fontWeight:900,textDecoration:"none"}}>STANDARDを選ぶ →</a>
          </article>

          <article style={{border:"2px solid #111",padding:30,background:"#111",color:"#fff"}}>
            <span style={{fontSize:12,letterSpacing:2,color:"#aaa",fontWeight:800}}>DEEP DIVE</span>
            <h3 style={{fontSize:32,margin:"10px 0 4px"}}>1質問 ¥3,300</h3>
            <p style={{color:"#aaa",fontSize:14,margin:"0 0 18px"}}>税込・1回</p>
            <p style={{lineHeight:1.85,color:"#eee"}}><strong>前提・根拠・解釈・限界まで深掘り。</strong><br/>育成方針や現場判断を、より丁寧に検討したい方向けです。</p>
            <ul style={{lineHeight:1.95,color:"#ddd",paddingLeft:20}}>
              <li>1テーマ・1質問</li>
              <li>前提・論点の分解</li>
              <li>参考資料・根拠の確認</li>
              <li>RBAの解釈と限界を明示</li>
              <li>JOURNAL等での深掘り回答候補</li>
            </ul>
            <a href={DEEP_DIVE_URL} style={{display:"inline-block",marginTop:16,background:"#fff",color:"#111",padding:"15px 21px",fontWeight:900,textDecoration:"none"}}>DEEP DIVEを選ぶ →</a>
          </article>
        </div>

        <p style={{maxWidth:900,fontSize:13,lineHeight:1.8,color:"#777",margin:"24px 0 0"}}>決済はStripeで行います。決済完了後、このページへ戻り質問フォームが表示されます。フォームにはStripe決済時と同じメールアドレスをご入力ください。</p>
      </section>

      <section style={{padding:"64px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>FLOW</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 28px"}}>利用の流れ。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:1,background:"#dadad4"}}>
          {steps.map(([n,en,body])=><article key={n} style={{background:"#f9f9f6",padding:24,minHeight:155}}><strong style={{fontSize:27}}>{n}</strong><div style={{fontSize:11,letterSpacing:2,fontWeight:800,margin:"10px 0 8px"}}>{en}</div><p style={{fontSize:14,lineHeight:1.7,color:"#555",margin:0}}>{body}</p></article>)}
        </div>
      </section>

      <section id="scope" style={{padding:"68px 6vw",background:"#ecece7"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>CONSULTATION SCOPE</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 28px"}}>相談できるテーマ。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(235px,1fr))",gap:12}}>
          {themes.map(([en,ja,body])=><article key={en} style={{background:"#fff",border:"1px solid #d8d8d2",padding:24,minHeight:145}}><div style={{fontSize:11,letterSpacing:2,color:"#777",fontWeight:800}}>{en}</div><h3 style={{fontSize:21,margin:"10px 0 8px"}}>{ja}</h3><p style={{fontSize:14,lineHeight:1.7,color:"#62625d",margin:0}}>{body}</p></article>)}
        </div>
      </section>

      <section style={{padding:"68px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>ANSWER STANDARD</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 14px"}}>回答は、できるだけ分けて考える。</h2>
        <p style={{maxWidth:880,fontSize:16,lineHeight:1.85,color:"#555",margin:"0 0 28px"}}>「経験上そう思う」と「確認できる根拠」を混ぜないために、必要に応じて次の観点で整理します。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:12}}>
          {standards.map(([en,body],i)=><article key={en} style={{borderTop:"2px solid #111",padding:"18px 2px"}}><div style={{fontSize:11,letterSpacing:2,fontWeight:900,color:"#777"}}>{String(i+1).padStart(2,"0")} · {en}</div><p style={{fontSize:15,lineHeight:1.75,color:"#444",margin:"10px 0 0"}}>{body}</p></article>)}
        </div>
      </section>

      <section style={{padding:"68px 6vw",background:"#111",color:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:800}}>KNOWLEDGE, NOT ARGUMENT</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 18px"}}>一人への返信で終わらせない。</h2>
        <p style={{maxWidth:920,fontSize:17,lineHeight:1.9,color:"#d8d8d3"}}>共有価値のある質問は、個人情報を除いて要約・匿名化し、Threads、Instagram、RBA JOURNAL、ライブ等で回答する場合があります。一つの疑問を、同じ悩みを持つ選手・保護者・指導者が後から使える知識に変えます。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:24}}>
          <a href="/ja/journal" style={{background:"#fff",color:"#111",padding:"14px 20px",fontWeight:900,textDecoration:"none"}}>RBA JOURNALを見る →</a>
          <a href="/ja/journal/why-development-debate-becomes-winner-loser" style={{border:"1px solid #777",color:"#fff",padding:"13px 20px",fontWeight:800,textDecoration:"none"}}>勝敗と育成の議論を読む →</a>
        </div>
      </section>

      <section style={{padding:"68px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>SERVICE POLICY</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 26px"}}>安心して使うためのルール。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:10}}>
          {rules.map((r,i)=><div key={r} style={{background:"#fff",border:"1px solid #dadad4",padding:22,display:"grid",gridTemplateColumns:"42px 1fr",gap:12}}><strong>{String(i+1).padStart(2,"0")}</strong><span style={{lineHeight:1.75}}>{r}</span></div>)}
        </div>
        <p style={{fontSize:13,lineHeight:1.8,color:"#777",marginTop:20}}>返金・キャンセル等については、RBAの<a href="/ja/policies" style={{color:"#111",fontWeight:800}}>各種ポリシー</a>もあわせてご確認ください。</p>
      </section>

      <section style={{padding:"68px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>FAQ</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 26px"}}>よくある質問。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:12}}>
          {faq.map(([q,a])=><article key={q} style={{border:"1px solid #dddcd6",padding:24}}><h3 style={{fontSize:18,margin:"0 0 10px"}}>{q}</h3><p style={{fontSize:14,lineHeight:1.8,color:"#555",margin:0}}>{a}</p></article>)}
        </div>
      </section>

      <section id="question" style={{padding:"72px 4vw 92px",background:"#ecece7"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:3,fontWeight:800}}>ASK RBA</p>
          <h2 style={{fontSize:"clamp(34px,5vw,58px)",margin:"10px 0 12px"}}>{canSubmit?"決済ありがとうございます。相談内容を送ってください。":"質問フォームは決済後に表示されます。"}</h2>
          {canSubmit?<>
            <p style={{lineHeight:1.85,color:"#555",margin:"0 0 8px"}}>購入プラン：<strong>{paid==="deep-dive"?"DEEP DIVE｜¥3,300":"STANDARD｜¥1,100"}</strong></p>
            <p style={{lineHeight:1.85,color:"#555",margin:"0 0 28px"}}>Stripe決済時と同じメールアドレスをご入力ください。決済照合後に正式受付となります。</p>
            <div style={{border:"1px solid #d6d6d0",background:"#fff",minHeight:1640}}>
              <iframe title="RBA OPEN Q&A" src="https://form.jotform.com/262679203551055" width="100%" height="1640" style={{border:0,display:"block"}} loading="lazy"/>
            </div>
          </>:<>
            <p style={{lineHeight:1.85,color:"#555",margin:"0 0 26px"}}>STANDARDまたはDEEP DIVEを選択し、Stripe決済を完了してください。決済後、このページへ戻ると質問フォームを入力できます。</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a href={STANDARD_URL} style={{background:"#111",color:"#fff",padding:"14px 20px",fontWeight:900,textDecoration:"none"}}>STANDARD ¥1,100 →</a>
              <a href={DEEP_DIVE_URL} style={{border:"1px solid #111",color:"#111",padding:"13px 20px",fontWeight:900,textDecoration:"none",background:"#fff"}}>DEEP DIVE ¥3,300 →</a>
            </div>
          </>}
        </div>
      </section>
    </main>
  </SiteFrame>;
}
