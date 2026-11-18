import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "企業スポンサー・協賛ご案内｜Riot Basketball Academy",
  description: "RBAの企業スポンサー・広告掲載をご検討中の担当者へ。育成活動、3つの協賛方法、契約・報告・個人情報の取り扱いを説明します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/partners/brief" },
};

const ink="#142126";
const dark="#4D5B60";
const frame="#D8DEDE";

export default function PartnerBrief() {
  const list = [
    ["01", "月額企業広告", "月額10,000円＋税（11,000円税込）。1社1口。公式サイト内の応援ページ、月次活動レポートに、許諾済みの企業情報を掲載。定型の利用条件に従います。"],
    ["02", "地域クリニック・キャンプ協賛", "会場、用具、指導・移動費や参加機会への支援。対象、金額、掲載媒体、報告内容は個別見積と契約で決めます。"],
    ["03", "全国育成・国際交流パートナー", "指導者教育、全国育成ツアー、海外の育成年代との交流など。企業の目的に合わせて共同企画を具体化します。"],
  ] as const;
  const process = [
    ["相談", "支援したい地域・年代・目的を伺います。問い合わせは無料です。"],
    ["提案", "活動内容、費用、掲載範囲、役割と報告方法を整理します。"],
    ["合意", "個別企画は正式契約で条件を確定。ロゴ・写真等は許諾後に使用します。"],
    ["報告", "実施した内容と掲載状況について、合意した範囲の資料を提出します。"],
  ] as const;
  return <SiteFrame locale="ja"><main lang="ja" style={{background:"#fff",color:ink,padding:"clamp(26px,5vw,60px) max(20px,6vw) 80px"}}>
    <div style={{maxWidth:1050,margin:"auto"}}>
      <p style={{fontSize:12,fontWeight:900,letterSpacing:2.4,color:dark}}>RIOT BASKETBALL ACADEMY / CORPORATE PARTNERSHIP</p>
      <h1 style={{fontSize:"clamp(34px,6vw,66px)",lineHeight:1.18,letterSpacing:"-.04em",margin:"20px 0 21px"}}>育成の次の一歩を、<br/>企業とともに。</h1>
      <p style={{fontSize:18,lineHeight:1.85,color:dark,maxWidth:800,marginBottom:28}}>RBAは、仙台を拠点に地域のクリニック、指導者の学び、国内・アジア交流へ取り組んでいます。企業のご支援を、子どもたちが学び、挑戦する機会につなげていきます。</p>
      <div style={{display:"flex",gap:13,flexWrap:"wrap",marginBottom:39}}>
        <a href="https://form.jotform.com/263089038431054" target="_blank" rel="noopener noreferrer" style={{padding:"15px 23px",background:ink,color:"#fff",textDecoration:"none",fontWeight:800}}>企業として無料相談する ↗</a>
        <a href="/ja/support#apply" style={{padding:"15px 23px",border:"1px solid "+ink,color:ink,textDecoration:"none",fontWeight:800}}>月額企業広告を確認する →</a>
      </div>
      <section aria-labelledby="brief-activities" style={{borderTop:"1px solid "+frame,paddingTop:34,marginTop:30}}>
        <h2 id="brief-activities" style={{fontSize:27,margin:"0 0 17px"}}>RBAが大切にする育成の機会</h2>
        <p style={{fontSize:16,lineHeight:1.95,color:dark}}>選手が見る・判断する・実行する力、指導者が日々の練習を工夫するための学び、地域や所属を越えて挑戦できる場、国内・アジアの選手や指導者との実践的な交流。ひとつのイベントで終わらせず、次につながる学習環境を目指しています。</p>
      </section>
      <section aria-labelledby="brief-plan" style={{paddingTop:40}}>
        <p style={{fontSize:12,color:dark,fontWeight:900,letterSpacing:1.7}}>WAYS TO PARTNER</p>
        <h2 id="brief-plan" style={{fontSize:27,margin:"12px 0 20px"}}>3つの協賛・広告の方法</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:13}}>
          {list.map(([n,title,body])=><article key={n} style={{background:"#f5f7f6",border:"1px solid "+frame,padding:24}}>
            <p style={{fontSize:12,color:dark,fontWeight:850}}>{n}</p><h3 style={{fontSize:21,lineHeight:1.48,margin:"13px 0"}}>{title}</h3><p style={{lineHeight:1.85,color:dark,fontSize:15}}>{body}</p>
          </article>)}
        </div>
      </section>
      <section aria-labelledby="brief-visibility" style={{paddingTop:45}}>
        <h2 id="brief-visibility" style={{fontSize:27,marginBottom:16}}>企業名・ロゴの掲載について</h2>
        <p style={{fontSize:16,lineHeight:1.9,color:dark}}>定型の月額企業広告は、RBA公式サイト内の応援ページと月次活動レポートへの掲載です。<strong style={{color:ink}}>トップページ上部への企業ロゴ掲出は自動的には含まれず、掲載位置・媒体・期間等を定める別途スポンサー契約でご相談</strong>します。企業名・ロゴや写真・動画は、利用許諾を得た範囲でのみ使用します。</p>
      </section>
      <section aria-labelledby="brief-process" style={{paddingTop:44}}>
        <h2 id="brief-process" style={{fontSize:27,marginBottom:20}}>お問い合わせから活動報告まで</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:12}}>
          {process.map(([title,body],i)=><article key={title} style={{borderTop:"3px solid "+ink,background:"#f7f8f7",padding:20}}><h3 style={{fontSize:19,margin:"0 0 11px"}}>{String(i+1).padStart(2,"0")} / {title}</h3><p style={{fontSize:14,lineHeight:1.8,color:dark}}>{body}</p></article>)}
        </div>
      </section>
      <section aria-labelledby="brief-safety" style={{paddingTop:43}}>
        <h2 id="brief-safety" style={{fontSize:27,marginBottom:15}}>子どもと家庭の安全を最優先に</h2>
        <p style={{fontSize:16,color:dark,lineHeight:1.9}}>未成年者への直接営業、選手・保護者の名簿や健康情報の提供は行いません。広告による売上・到達数等の効果も保証せず、実施・掲載の事実と合意した報告内容を大切にします。</p>
        <p style={{fontSize:14,color:dark,lineHeight:1.85,marginTop:18}}>RBAは現時点で適格請求書発行事業者ではないため、インボイスは発行できません。通常の請求書・領収書、契約内容や掲載記録は条件に応じてご案内します。各社の経理・税務処理については担当税理士等へご確認ください。</p>
      </section>
      <section style={{background:ink,color:"#fff",padding:"30px 28px",marginTop:48}}>
        <h2 style={{fontSize:28,margin:"0 0 12px"}}>一つの企画から、話してみませんか。</h2>
        <p style={{fontSize:15,lineHeight:1.85,color:"#dae2e4"}}>協賛の目的、想定予算、支援したい地域が決まっていない場合も構いません。まずは企業のご希望をお聞かせください。</p>
        <p style={{fontSize:15,color:"#fff",lineHeight:1.8}}>Riot Basketball Academy<br/>riot.training.base@gmail.com</p>
        <a href="https://form.jotform.com/263089038431054" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#fff",color:ink,textDecoration:"none",padding:"14px 22px",fontWeight:850}}>協賛の無料相談フォームへ ↗</a>
      </section>
      <p style={{fontSize:12,color:dark,lineHeight:1.8,marginTop:22}}>2026年11月版。詳細条件は正式な契約・掲載規約をご確認ください。印刷・PDF保存はお使いのブラウザの印刷機能から行えます。</p>
    </div>
  </main></SiteFrame>;
}