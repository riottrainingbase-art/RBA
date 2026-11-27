import type {Metadata} from "next";
import Image from "next/image";
import {SiteFrame} from "@/components/site-frame";

export const metadata:Metadata={
 title:"RBA公式 参加・予約案内｜クリニック・スクール・国際交流",
 description:"Riot Basketball Academyの開催情報、体験・無料相談、チーム申込と安全な決済案内を目的別に案内。無料意向登録と参加確定を区別します。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/book"},
 robots:{index:true,follow:true},
};
const cards=[
 {kind:"PROGRAMME",title:"クリニック・キャンプに参加",status:"イベントごとに申込条件を確認",copy:"開催日・対象年齢・参加費・受付状況を比較。申込完了と決済完了の扱いは個別の案内を優先します。",href:"/ja/opportunities",cta:"開催中の活動を探す"},
 {kind:"SCHEDULE",title:"日程から探す",status:"開催予定と募集状況は別",copy:"全国の育成クリニック・講習・キャンプを確認。企画段階の候補日や施設未確保案件は参加を確約しません。",href:"/ja/schedule",cta:"開催日程を見る"},
 {kind:"SCHOOL",title:"仙台スクール・体験相談",status:"無料相談からスタート",copy:"学年・練習内容・通いやすさを確認。施設や受入人数が確定した後に、体験日時と料金をご案内します。",href:"/ja/sendai-school",cta:"スクールを相談する"},
 {kind:"INTERNATIONAL",title:"RIZEHOPE JAPAN 2027",status:"海外U12は無料の参加意向登録",copy:"2月27〜28日の宮城交流企画。参加枠・大会参加費・宿泊・バスは未確定です。渡航と競技を分けて確認できます。",href:"/international/rizehope-japan-2027",cta:"海外チーム向け案内"},
 {kind:"TEAM",title:"チーム・学校への訪問指導",status:"内容を伺って個別見積",copy:"対象年代、人数、会場、指導テーマを確認した後、講師稼働・交通費・安全体制を含む見積をご案内します。",href:"/ja/clinic-request",cta:"開催・訪問を相談"},
 {kind:"PAYMENT",title:"申込済みの方の決済案内",status:"既存申込との二重支払いに注意",copy:"申込フォームに対応する正式な決済案内を確認。RBAから金額と支払方法が届く前の追加送金は必要ありません。",href:"/ja/payments",cta:"決済・確認について"},
];
export default function BookingHub(){
 const navy="#112742",line="#d6d9d9";
 return <SiteFrame locale="ja">
  <main lang="ja" style={{background:"#f9f8f5",minHeight:"100vh",color:navy,padding:"32px 18px 76px"}}>
   <div style={{maxWidth:1100,margin:"0 auto"}}>
    <a href="/ja/start" style={{color:"#435970",textDecoration:"underline",fontSize:13}}>← 公式の参加入口へ</a>
    <header style={{marginTop:35,display:"flex",gap:20,alignItems:"center",paddingBottom:30,borderBottom:`1px solid ${line}`}}>
      <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy公式ロゴ" width={82} height={82} style={{objectFit:"contain",borderRadius:3}}/>
      <div><p style={{fontWeight:800,fontSize:12,letterSpacing:".16em",margin:"0 0 9px"}}>OFFICIAL ENTRY / RIOT BASKETBALL ACADEMY</p>
       <h1 style={{fontSize:"clamp(30px,4.5vw,52px)",lineHeight:1.2,margin:0}}>参加・予約のご案内</h1></div>
    </header>
    <p style={{fontSize:16,lineHeight:1.95,maxWidth:820,margin:"25px 0 33px",color:"#43546a"}}>目的に合う正式な窓口から、お申し込みください。RBAは「無料の相談・意向登録」「参加申込」「決済」「RBAからの確定案内」を区別して管理しています。フォーム送信だけで有料契約や参加枠の確定にはなりません。</p>
    <section aria-labelledby="choices">
     <h2 id="choices" style={{fontSize:22,marginBottom:18}}>目的を選ぶ</h2>
     <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(275px,1fr))",gap:15}}>
     {cards.map(card=><article key={card.kind} style={{border:`1px solid ${line}`,background:"#fff",padding:24,display:"flex",flexDirection:"column",minHeight:280}}>
       <p style={{margin:"0 0 15px",fontSize:11,color:"#7a684e",fontWeight:800,letterSpacing:".12em"}}>{card.kind}</p>
       <h3 style={{fontSize:20,margin:"0 0 9px",lineHeight:1.4}}>{card.title}</h3>
       <strong style={{fontSize:12,color:"#6d596a"}}>{card.status}</strong>
       <p style={{fontSize:14,lineHeight:1.8,color:"#4d5d6e",flex:1}}>{card.copy}</p>
       <a href={card.href} style={{minHeight:44,display:"flex",alignItems:"center",justifyContent:"space-between",background:navy,color:"#fff",padding:"10px 14px",fontSize:14,fontWeight:700,textDecoration:"none"}}>{card.cta}<span aria-hidden="true">→</span></a>
     </article>)}
     </div>
    </section>
    <section style={{marginTop:30,padding:"25px 28px",background:"#eceeea",lineHeight:1.85}}>
      <h2 style={{fontSize:21,margin:"0 0 10px"}}>お申し込みから参加まで</h2>
      <ol style={{paddingLeft:22,margin:0}}>
       <li>公式ページで対象年齢・費用・日程・取消条件を確認する</li>
       <li>保護者または成人責任者が、該当する申込フォームを送信する</li>
       <li>会場・受入枠・参加費が承認された企画だけ、指定の方法で決済する</li>
       <li>RBAから受付・入金・参加可否の最終案内を受ける</li>
      </ol>
      <p style={{margin:"14px 0 0",fontSize:13}}>お子さまの病歴やパスポート情報は一般問い合わせフォーム・SNSのDMで送らないでください。確認や申込済みの方の連絡先：<a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
    </section>
   </div>
  </main>
 </SiteFrame>;
}
