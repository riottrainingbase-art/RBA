import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA OPEN Q&A｜有料公開Q&A・育成相談",
  description: "U12・U15の育成、戦術、出場時間、指導方法、保護者の悩みについて、RBAが論点を整理して回答する有料公開Q&Aです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/open-qa" },
  openGraph: {
    title: "RBA OPEN Q&A｜有料公開Q&A・育成相談",
    description: "コメント欄の言い合いではなく、育成についてちゃんと議論するためのRBA公式有料Q&A。",
    url: "https://riotbasketballacademy.com/ja/open-qa",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const STANDARD_URL="https://buy.stripe.com/3cI6oJeGHeTWcr350b7EQ0v";
const DEEP_DIVE_URL="https://buy.stripe.com/14A3cx8ij4fidv78cn7EQ0w";

const themes=[
  ["U12 / U15 DEVELOPMENT","年代別の育成"],
  ["TACTICS","戦術・ゲームモデル"],
  ["PLAYING TIME","出場時間・ローテーション"],
  ["COACHING","声かけ・介入・指導方法"],
  ["PARENTS","保護者の悩み"],
  ["S&C / LOAD","身体づくり・負荷管理"],
  ["3x3","3x3と育成"],
  ["RULES / SYSTEM","制度・ルール"],
] as const;

const rules=[
  "異論・反論・質問は歓迎します。",
  "購入は、特定の結論・賛同・希望する回答を保証するものではありません。",
  "人格攻撃、侮辱、個人晒し、未成年者を特定できる情報は扱いません。",
  "できるだけ『何について』『なぜそう考えるか』を具体的に書いてください。",
  "回答時は、事実・参考資料・RBAの解釈・限界を可能な範囲で分けます。",
  "安全・プライバシー・対応範囲の理由で回答できない場合は、匿名化、テーマ変更、振替、返金等を個別にご案内する場合があります。",
] as const;

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const params=await searchParams;
  const paid=typeof params.paid==="string"?params.paid:"";
  const canSubmit=paid==="standard"||paid==="deep-dive";

  return <SiteFrame locale="ja" languagePage="journal">
    <main style={{background:"#f5f5f2",color:"#111"}}>
      <section style={{padding:"76px 6vw 60px",background:"#fff",borderBottom:"1px solid #dddcd6"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,margin:"0 0 18px"}}>RBA OPEN Q&A · PAID DEVELOPMENT DEBATE</p>
        <h1 style={{fontSize:"clamp(42px,7vw,86px)",lineHeight:.97,letterSpacing:-2,margin:"0 0 24px",fontWeight:900}}>異論も、反論も、<br/>本気なら歓迎します。</h1>
        <p style={{maxWidth:900,fontSize:18,lineHeight:1.9,color:"#454541",margin:"0 0 16px"}}>RBA OPEN Q&Aは、育成についての質問・反論・相談を、<strong>有料で論点整理して回答する公開Q&A</strong>です。</p>
        <p style={{maxWidth:900,fontSize:16,lineHeight:1.85,color:"#62625d",margin:0}}>コメント欄で何往復も消耗するのではなく、質問する側も回答する側も一度きちんと論点を整理する。そのための料金です。意見が違うこと自体は問題ありません。RBAへの反論も歓迎します。</p>
      </section>

      <section style={{padding:"64px 6vw",background:"#111",color:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:800}}>PRICING</p>
        <h2 style={{fontSize:"clamp(30px,4vw,52px)",margin:"10px 0 28px"}}>質問の深さで選ぶ。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:14,maxWidth:1000}}>
          <article style={{border:"1px solid #4b4b47",padding:28,background:"#171717"}}>
            <span style={{fontSize:12,letterSpacing:2,color:"#aaa"}}>STANDARD</span>
            <h3 style={{fontSize:30,margin:"10px 0 4px"}}>1質問 ¥1,100</h3>
            <p style={{color:"#ccc",fontSize:14}}>税込・1回</p>
            <p style={{lineHeight:1.8,color:"#ddd"}}>質問・反論・相談1件。論点を整理し、公開Q&Aとして簡潔に回答するプランです。</p>
            <ul style={{lineHeight:1.9,color:"#ddd",paddingLeft:20}}>
              <li>1テーマ・1質問</li>
              <li>論点整理</li>
              <li>Threads / Instagram等での回答候補</li>
              <li>必要に応じて参考資料を提示</li>
            </ul>
            <a href={STANDARD_URL} style={{display:"inline-block",marginTop:14,background:"#fff",color:"#111",padding:"14px 20px",fontWeight:900,textDecoration:"none"}}>STANDARDを購入 →</a>
          </article>
          <article style={{border:"1px solid #777",padding:28,background:"#fff",color:"#111"}}>
            <span style={{fontSize:12,letterSpacing:2,color:"#666"}}>DEEP DIVE</span>
            <h3 style={{fontSize:30,margin:"10px 0 4px"}}>1質問 ¥3,300</h3>
            <p style={{color:"#666",fontSize:14}}>税込・1回</p>
            <p style={{lineHeight:1.8,color:"#444"}}>前提・参考資料・根拠・RBAの解釈・限界まで整理し、JOURNAL等で深掘りするプランです。</p>
            <ul style={{lineHeight:1.9,color:"#444",paddingLeft:20}}>
              <li>1テーマ・1質問</li>
              <li>前提と論点を分解</li>
              <li>根拠・参考資料を確認</li>
              <li>RBAの解釈と限界を分離</li>
              <li>JOURNAL深掘り回答候補</li>
            </ul>
            <a href={DEEP_DIVE_URL} style={{display:"inline-block",marginTop:14,background:"#111",color:"#fff",padding:"14px 20px",fontWeight:900,textDecoration:"none"}}>DEEP DIVEを購入 →</a>
          </article>
        </div>
        <p style={{maxWidth:900,fontSize:13,lineHeight:1.75,color:"#aaa",margin:"24px 0 0"}}>決済後、自動的に質問フォームへ戻ります。フォームにはStripe決済時のメールアドレスをご入力ください。RBA側で決済確認後に受付します。</p>
      </section>

      <section style={{padding:"64px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>WHAT YOU CAN ASK</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 28px"}}>対象テーマ。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>
          {themes.map(([en,ja])=><article key={en} style={{background:"#fff",border:"1px solid #dddcd6",padding:24}}><div style={{fontSize:11,letterSpacing:2,color:"#777",fontWeight:800}}>{en}</div><h3 style={{fontSize:21,margin:"10px 0 0"}}>{ja}</h3></article>)}
        </div>
      </section>

      <section style={{padding:"64px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>HOW RBA ANSWERS</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 18px"}}>お金で「賛同」は買えません。</h2>
        <p style={{maxWidth:900,fontSize:17,lineHeight:1.9,color:"#444"}}>料金は、RBAの見解をあなたに合わせるためのものではありません。質問を読み、前提を整理し、必要な資料を確認し、回答としてまとめるための対価です。RBAと意見が一致しない回答になる場合もあります。</p>
      </section>

      <section style={{padding:"64px 6vw",background:"#ecece7"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>GROUND RULES</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 24px"}}>有料でも、何でも回答するわけではありません。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:10}}>
          {rules.map((r,i)=><div key={r} style={{background:"#fff",border:"1px solid #dadad4",padding:22,display:"grid",gridTemplateColumns:"42px 1fr",gap:12}}><strong>{String(i+1).padStart(2,"0")}</strong><span style={{lineHeight:1.75}}>{r}</span></div>)}
        </div>
      </section>

      <section id="question" style={{padding:"72px 4vw 92px",background:"#fff"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:3,fontWeight:800}}>ASK RBA</p>
          <h2 style={{fontSize:"clamp(34px,5vw,58px)",margin:"10px 0 12px"}}>{canSubmit?"決済ありがとうございます。質問を送ってください。":"質問フォームは決済後に開きます。"}</h2>
          {canSubmit?<>
            <p style={{lineHeight:1.85,color:"#555",margin:"0 0 8px"}}>購入プラン：<strong>{paid==="deep-dive"?"DEEP DIVE｜¥3,300":"STANDARD｜¥1,100"}</strong></p>
            <p style={{lineHeight:1.85,color:"#555",margin:"0 0 28px"}}>Stripe決済時と同じメールアドレスをフォームに入力してください。決済照合後に正式受付となります。</p>
            <div style={{border:"1px solid #d6d6d0",background:"#fafafa",minHeight:1580}}>
              <iframe title="RBA OPEN Q&A" src="https://form.jotform.com/262679203551055" width="100%" height="1580" style={{border:0,display:"block"}} loading="lazy"/>
            </div>
          </>:<>
            <p style={{lineHeight:1.85,color:"#555",margin:"0 0 26px"}}>STANDARDまたはDEEP DIVEを選び、Stripe決済を完了すると、このページに戻って質問フォームを入力できます。</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a href={STANDARD_URL} style={{background:"#111",color:"#fff",padding:"14px 20px",fontWeight:900,textDecoration:"none"}}>STANDARD ¥1,100 →</a>
              <a href={DEEP_DIVE_URL} style={{border:"1px solid #111",color:"#111",padding:"13px 20px",fontWeight:900,textDecoration:"none"}}>DEEP DIVE ¥3,300 →</a>
            </div>
          </>}
        </div>
      </section>
    </main>
  </SiteFrame>;
}
