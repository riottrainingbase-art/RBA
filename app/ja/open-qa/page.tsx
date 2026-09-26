import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA OPEN Q&A｜育成について異論・反論・質問を受け付けます",
  description: "U12・U15の育成、戦術、出場時間、指導方法、保護者の悩みについて、RBAが論点を整理して回答する公開Q&A窓口です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/open-qa" },
  openGraph: {
    title: "RBA OPEN Q&A｜育成について異論・反論・質問を受け付けます",
    description: "コメント欄の言い合いではなく、育成についてちゃんと議論するための公開Q&A。",
    url: "https://riotbasketballacademy.com/ja/open-qa",
    siteName: "Riot Basketball Academy",
    type: "website",
  },
};

const themes=[
  ["U12 / U15 DEVELOPMENT","年代別の育成"],
  ["TACTICS","戦術・ゲームモデル"],
  ["PLAYING TIME","出場時間・ローテーション"],
  ["COACHING","声かけ・介入・指導方法"],
  ["PARENTS","保護者の悩み"],
  ["S&C","身体づくり・負荷管理"],
] as const;

const rules=[
  "異論・反論・質問は歓迎します。",
  "人格攻撃、侮辱、個人晒しは回答対象にしません。",
  "未成年者の氏名・学校名・チーム内部の非公開情報は書かないでください。",
  "できるだけ『何について』『なぜそう考えるか』を具体的に書いてください。",
  "回答時は、事実・根拠・RBAの解釈・限界を可能な範囲で分けます。",
  "すべての質問への回答を保証するものではありません。",
] as const;

export default function Page(){
  return <SiteFrame locale="ja" languagePage="journal">
    <main style={{background:"#f5f5f2",color:"#111"}}>
      <section style={{padding:"72px 6vw 56px",background:"#fff",borderBottom:"1px solid #dddcd6"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,margin:"0 0 18px"}}>RBA OPEN Q&A · DEVELOPMENT DEBATE</p>
        <h1 style={{fontSize:"clamp(42px,7vw,84px)",lineHeight:.98,letterSpacing:-2,margin:"0 0 24px",fontWeight:900}}>異論も、反論も、<br/>質問も歓迎します。</h1>
        <p style={{maxWidth:860,fontSize:18,lineHeight:1.9,color:"#454541",margin:0}}>コメント欄で言い合って終わるのではなく、育成についてちゃんと議論するための公開Q&Aです。U12・U15を中心に、戦術、出場時間、指導方法、保護者の悩みまで受け付けます。意見が違うこと自体は問題ではありません。論点を具体的にして、一緒に考えます。</p>
      </section>

      <section style={{padding:"56px 6vw",background:"#111",color:"#fff"}}>
        <div style={{maxWidth:900}}>
          <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:800}}>HOW RBA ANSWERS</p>
          <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 18px"}}>勝ち負けではなく、論点で話す。</h2>
          <p style={{fontSize:17,lineHeight:1.85,color:"#d8d8d3",margin:0}}>RBAは、相手を言い負かすために回答しません。質問の前提、現場で観察できる事実、参考になる研究・教材、RBAとしての解釈、分からないことや限界を分けて整理します。育成に唯一の正解がないテーマほど、立場ではなく中身を見ます。</p>
        </div>
      </section>

      <section style={{padding:"64px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>TOPICS</p>
        <h2 style={{fontSize:"clamp(30px,4vw,48px)",margin:"10px 0 28px"}}>こんなテーマを受け付けます。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>
          {themes.map(([en,ja])=><article key={en} style={{background:"#fff",border:"1px solid #dddcd6",padding:24}}><div style={{fontSize:11,letterSpacing:2,color:"#777",fontWeight:800}}>{en}</div><h3 style={{fontSize:22,margin:"10px 0 0"}}>{ja}</h3></article>)}
        </div>
      </section>

      <section style={{padding:"64px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>RULES</p>
        <h2 style={{fontSize:"clamp(30px,4vw,48px)",margin:"10px 0 26px"}}>議論のルール。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:10}}>
          {rules.map((r,i)=><div key={r} style={{borderTop:"1px solid #d8d8d2",padding:"18px 4px",display:"grid",gridTemplateColumns:"44px 1fr",gap:14}}><strong>{String(i+1).padStart(2,"0")}</strong><span style={{lineHeight:1.75}}>{r}</span></div>)}
        </div>
      </section>

      <section style={{padding:"64px 6vw",background:"#ecece7"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>PUBLIC ANSWERS</p>
        <h2 style={{fontSize:"clamp(30px,4vw,48px)",margin:"10px 0 18px"}}>回答は、育成の資産として残します。</h2>
        <p style={{maxWidth:900,fontSize:17,lineHeight:1.85,color:"#444"}}>有益な質問は、個人情報を除いたうえでThreads、Instagram、RBA JOURNAL、ライブ等で回答する場合があります。単発の言い合いで終わらせず、同じ悩みを持つ選手・保護者・指導者が後から読める形にします。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:24}}>
          <a href="/ja/journal" style={{background:"#111",color:"#fff",padding:"14px 20px",fontWeight:800,textDecoration:"none"}}>RBA JOURNALを見る →</a>
          <a href="/ja/journal/why-development-debate-becomes-winner-loser" style={{border:"1px solid #111",color:"#111",padding:"13px 20px",fontWeight:800,textDecoration:"none",background:"#fff"}}>勝敗と育成の議論を読む →</a>
        </div>
      </section>

      <section id="question" style={{padding:"72px 4vw 88px",background:"#fff"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:3,fontWeight:800}}>ASK RBA</p>
          <h2 style={{fontSize:"clamp(34px,5vw,56px)",margin:"10px 0 12px"}}>質問・反論を送る。</h2>
          <p style={{lineHeight:1.8,color:"#555",margin:"0 0 28px"}}>匿名でも構いません。人格攻撃ではなく、具体的な論点を送ってください。</p>
          <div style={{border:"1px solid #d6d6d0",background:"#fafafa",minHeight:1320}}>
            <iframe title="RBA OPEN Q&A" src="https://form.jotform.com/262679203551055" width="100%" height="1320" style={{border:0,display:"block"}} loading="lazy"/>
          </div>
          <p style={{fontSize:13,color:"#777",marginTop:14}}>フォームが表示されない場合は <a href="https://form.jotform.com/262679203551055" target="_blank" rel="noreferrer" style={{color:"#111",fontWeight:700}}>こちらから直接開いてください ↗</a></p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
