import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA OPEN Q&A｜育成について異論・反論・質問を受け付けます",
  description: "U12・U15の育成、戦術、出場時間、指導方法、保護者の悩みについて、RBAが論点を整理し、根拠・解釈・限界を分けて回答する公開Q&Aです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/open-qa" },
  openGraph: {
    title: "RBA OPEN Q&A｜異論も、反論も、質問も歓迎します",
    description: "コメント欄の言い合いではなく、育成についてちゃんと議論するためのRBA公式公開Q&A。",
    url: "https://riotbasketballacademy.com/ja/open-qa",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter: {
    card:"summary_large_image",
    title:"RBA OPEN Q&A｜育成についてちゃんと議論する",
    description:"異論・反論・質問を、子どもの育成に役立つ問いへ。",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const themes=[
  ["U12 / U15 DEVELOPMENT","年代別の育成","何を、いつ、どの順序で学ぶのか。"],
  ["TACTICS","戦術・ゲームモデル","スクリーン、ゾーン、プレス、ミスマッチなど。"],
  ["PLAYING TIME","出場時間・ローテーション","実戦経験をどう配分するか。"],
  ["COACHING","声かけ・介入・指導方法","教える、問う、待つ。その使い分け。"],
  ["PARENTS","保護者の悩み","環境選び、移籍、継続、指導者との関係。"],
  ["S&C / LOAD","身体づくり・負荷管理","成長期の身体、安全、回復、トレーニング。"],
  ["3x3","3x3と育成","判断回数、役割、スペース、競技経験。"],
  ["RULES / SYSTEM","制度・ルール","育成環境を支える仕組みそのもの。"],
] as const;

const responseFramework=[
  ["01","QUESTION","何を問うているのかを一文にする。"],
  ["02","CONTEXT","年代・競技レベル・試合か練習かなど、前提を整理する。"],
  ["03","EVIDENCE","研究、FIBA/JBA等の教材、観察可能な事実を確認する。"],
  ["04","RBA VIEW","RBAとして現場でどう解釈し、どう使うかを示す。"],
  ["05","LIMITS","断定できないこと、個人差、例外を明記する。"],
] as const;

const rules=[
  ["異論・反論・質問は歓迎します。","RBAと同じ意見である必要はありません。"],
  ["人格攻撃・侮辱・個人晒しは扱いません。","方法への批判と、人への攻撃を分けます。"],
  ["未成年者を特定できる情報は送らないでください。","氏名、学校名、顔写真、非公開のチーム情報は不要です。"],
  ["具体的な論点を優先します。","「誰が悪い？」ではなく「何をどう考える？」へ。"],
  ["質問は要約・匿名化して公開する場合があります。","本人特定につながる情報は除きます。"],
  ["医療・法律等は一般情報の範囲で扱います。","個別診断・法的判断が必要な場合は専門家へつなげます。"],
  ["同じ内容の連投は統合する場合があります。","量ではなく論点の質を優先します。"],
  ["すべての質問への回答は保証しません。","育成上の公共性・再利用性が高い問いを優先します。"],
] as const;

const sampleQuestions=[
  "U12でスクリーンを多用することを、RBAはなぜ慎重に考えるのですか？",
  "勝利を目指しながら、出場時間をどう設計しますか？",
  "プレスやダブルチームは育成年代でどこまで使うべきですか？",
  "ミスした選手をすぐ交代させることに、学習上どんな影響がありますか？",
  "保護者は、チームを離れる判断をどこで考えるべきですか？",
  "『厳しい指導』と『心理的安全性』は両立できますか？",
] as const;

const faq=[
  ["匿名でも送れますか？","はい。公開時の名前表示を選べます。個別返信が不要ならメールアドレスも必須ではありません。"],
  ["反対意見でも大丈夫ですか？","もちろんです。RBAへの反論も歓迎します。人格ではなく、方法・前提・根拠について書いてください。"],
  ["チーム名や指導者名を書いてもいいですか？","原則不要です。個人やチームを特定することが目的ではなく、育成上の論点を扱うためです。"],
  ["必ず回答されますか？","すべての質問への回答は保証していません。多くの人の学びにつながる論点、具体性の高い問いを優先します。"],
  ["どこで回答されますか？","Threads、Instagram、RBA JOURNAL、ライブ等から、内容に適した形を選びます。"],
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

export default function Page(){
  return <SiteFrame locale="ja" languagePage="journal">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
    <main style={{background:"#f5f5f2",color:"#111"}}>
      <section style={{padding:"76px 6vw 60px",background:"#fff",borderBottom:"1px solid #dddcd6"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,margin:"0 0 18px"}}>RBA OPEN Q&A · DEVELOPMENT DEBATE</p>
        <h1 style={{fontSize:"clamp(42px,7vw,86px)",lineHeight:.97,letterSpacing:-2,margin:"0 0 24px",fontWeight:900}}>異論も、反論も、<br/>質問も歓迎します。</h1>
        <p style={{maxWidth:900,fontSize:18,lineHeight:1.9,color:"#454541",margin:"0 0 18px"}}>ここは「アンチ受付」ではありません。育成について意見が違う人同士が、コメント欄の言い合いではなく、<strong>論点で話すためのRBA公式公開Q&A</strong>です。</p>
        <p style={{maxWidth:900,fontSize:17,lineHeight:1.85,color:"#5a5a55",margin:"0 0 28px"}}>U12・U15を中心に、戦術、出場時間、指導方法、保護者の悩み、S&C、3x3まで。RBAへの反論も歓迎します。相手を言い負かすのではなく、意見の違いを子どもの育成に役立つ問いへ変えます。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="#question" style={{background:"#111",color:"#fff",padding:"15px 22px",fontWeight:900,textDecoration:"none"}}>質問・反論を送る ↓</a>
          <a href="#rules" style={{border:"1px solid #111",color:"#111",padding:"14px 22px",fontWeight:800,textDecoration:"none"}}>ルールを確認する</a>
        </div>
      </section>

      <section style={{padding:"58px 6vw",background:"#111",color:"#fff"}}>
        <div style={{maxWidth:940}}>
          <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:800}}>OUR POSITION</p>
          <h2 style={{fontSize:"clamp(30px,4vw,52px)",margin:"10px 0 18px"}}>勝った人が正しい、では終わらせない。</h2>
          <p style={{fontSize:17,lineHeight:1.9,color:"#d8d8d3",margin:0}}>試合結果は事実です。ただ、それだけで育成方法の妥当性まで決まるわけではありません。誰が言ったか、勝ったか負けたかではなく、<strong style={{color:"#fff"}}>何を育てたいのか。その方法で何が選手に残ったのか。</strong>そこを検証します。</p>
        </div>
      </section>

      <section style={{padding:"68px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>TOPICS</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 30px"}}>こんなテーマを受け付けます。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(235px,1fr))",gap:12}}>
          {themes.map(([en,ja,body])=><article key={en} style={{background:"#fff",border:"1px solid #dddcd6",padding:24,minHeight:150}}><div style={{fontSize:11,letterSpacing:2,color:"#777",fontWeight:800}}>{en}</div><h3 style={{fontSize:21,margin:"10px 0 9px"}}>{ja}</h3><p style={{fontSize:14,lineHeight:1.7,color:"#5a5a55",margin:0}}>{body}</p></article>)}
        </div>
      </section>

      <section style={{padding:"68px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>HOW RBA ANSWERS</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 16px"}}>回答は5段階で整理します。</h2>
        <p style={{maxWidth:900,fontSize:16,lineHeight:1.8,color:"#555",margin:"0 0 30px"}}>断定の強さを上げることより、何が分かっていて、どこからが解釈なのかを明確にします。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:1,background:"#d8d8d2"}}>
          {responseFramework.map(([n,en,body])=><article key={n} style={{background:"#f9f9f6",padding:24}}><strong style={{fontSize:28}}>{n}</strong><div style={{fontSize:11,letterSpacing:2,fontWeight:800,margin:"12px 0 8px"}}>{en}</div><p style={{fontSize:14,lineHeight:1.7,color:"#555",margin:0}}>{body}</p></article>)}
        </div>
      </section>

      <section style={{padding:"68px 6vw",background:"#ecece7"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>GOOD QUESTIONS</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 24px"}}>例えば、こんな問い。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:10}}>
          {sampleQuestions.map((q,i)=><div key={q} style={{background:"#fff",border:"1px solid #dadad4",padding:22,display:"grid",gridTemplateColumns:"42px 1fr",gap:12}}><strong>{String(i+1).padStart(2,"0")}</strong><span style={{lineHeight:1.75,fontWeight:700}}>{q}</span></div>)}
        </div>
      </section>

      <section id="rules" style={{padding:"68px 6vw",background:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>GROUND RULES</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 28px"}}>議論のルール。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:10}}>
          {rules.map(([r,b],i)=><article key={r} style={{borderTop:"1px solid #d8d8d2",padding:"20px 4px",display:"grid",gridTemplateColumns:"44px 1fr",gap:14}}><strong>{String(i+1).padStart(2,"0")}</strong><div><h3 style={{fontSize:17,margin:"0 0 6px"}}>{r}</h3><p style={{fontSize:14,lineHeight:1.7,color:"#666",margin:0}}>{b}</p></div></article>)}
        </div>
      </section>

      <section style={{padding:"68px 6vw",background:"#111",color:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:800}}>PUBLIC KNOWLEDGE</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 18px"}}>一人との口論で終わらせない。</h2>
        <p style={{maxWidth:920,fontSize:17,lineHeight:1.9,color:"#d8d8d3"}}>育成上有益な質問は、個人情報を除いて要約・匿名化し、Threads、Instagram、RBA JOURNAL、ライブ等で回答します。同じ疑問を持つ選手・保護者・指導者が、後から読める知識として残します。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:24}}>
          <a href="/ja/journal" style={{background:"#fff",color:"#111",padding:"14px 20px",fontWeight:900,textDecoration:"none"}}>RBA JOURNALを見る →</a>
          <a href="/ja/journal/why-development-debate-becomes-winner-loser" style={{border:"1px solid #777",color:"#fff",padding:"13px 20px",fontWeight:800,textDecoration:"none"}}>勝敗と育成の議論を読む →</a>
          <a href="/ja/journal/adults-must-keep-learning-in-youth-development" style={{border:"1px solid #777",color:"#fff",padding:"13px 20px",fontWeight:800,textDecoration:"none"}}>大人の学びを読む →</a>
        </div>
      </section>

      <section style={{padding:"68px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:800,color:"#666"}}>FAQ</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 28px"}}>送る前によくある質問。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:12}}>
          {faq.map(([q,a])=><article key={q} style={{background:"#fff",border:"1px solid #dddcd6",padding:24}}><h3 style={{fontSize:18,margin:"0 0 10px"}}>{q}</h3><p style={{fontSize:14,lineHeight:1.8,color:"#555",margin:0}}>{a}</p></article>)}
        </div>
      </section>

      <section id="question" style={{padding:"72px 4vw 92px",background:"#fff"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:3,fontWeight:800}}>ASK RBA</p>
          <h2 style={{fontSize:"clamp(34px,5vw,58px)",margin:"10px 0 12px"}}>質問・反論を送る。</h2>
          <p style={{lineHeight:1.85,color:"#555",margin:"0 0 8px"}}>匿名でも構いません。RBAと意見が違っていても問題ありません。</p>
          <p style={{lineHeight:1.85,color:"#555",margin:"0 0 28px"}}><strong>「誰が悪いか」ではなく、「何をどう考えるべきか」</strong>を送ってください。</p>
          <div style={{border:"1px solid #d6d6d0",background:"#fafafa",minHeight:1500}}>
            <iframe title="RBA OPEN Q&A" src="https://form.jotform.com/262679203551055" width="100%" height="1500" style={{border:0,display:"block"}} loading="lazy"/>
          </div>
          <p style={{fontSize:13,color:"#777",marginTop:14}}>フォームが表示されない場合は <a href="https://form.jotform.com/262679203551055" target="_blank" rel="noreferrer" style={{color:"#111",fontWeight:800}}>こちらから直接開いてください ↗</a></p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
