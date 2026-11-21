import Image from "next/image";
import {SiteFrame, type Locale} from "./site-frame";
const signup="https://form.jotform.com/263244607359058";
const copy={
en:{tag:"PROPOSED ACCESS INITIATIVE / PARTNERSHIP ENQUIRY",headline:"Where you live should not decide how far you can go.",lead:"RBA is exploring a practical scholarship and access programme for young basketball players in Japan. We invite international academies, coaches, companies and foundations to help remove the barriers that keep children off the court.",section:"What we hope to support",areas:["Learning and clinic fee assistance","Domestic travel and exchange opportunities","Future international pathways, subject to safety and cost approval"],budget:"An illustrative 2027 pilot",budgetText:"Target JPY 500,000: JPY 100,000 for clinic access, JPY 200,000 for domestic travel and JPY 200,000 for future international support. These are planning scenarios, not secured funds or confirmed awards.",action:"Discuss a partnership — no payment",local:"日本語で読む",fine:"The programme is in development. No scholarship applications, donations, awards, tax benefits or federation endorsements have been confirmed. We do not request children's personal details from potential partners.",foot:"Independent RBA initiative / Masato Nishio"},
ja:{tag:"奨学金構想・国際協働相談 / 準備段階",headline:"住んでいる場所や、家庭の事情で。バスケを諦めなくていい。",lead:"RBAは、参加費や移動費の負担で学ぶ機会を逃す子どもを減らす仕組みを考えています。海外のクラブ、指導者、企業・財団の皆さんと、できる形から協力を始めたいと考えています。",section:"支援を検討していること",areas:["育成クリニックへの参加支援","国内の移動・交流への支援","安全・費用の条件を確認した国際交流への将来的支援"],budget:"2027年の試行予算案",budgetText:"初年度の目標案は50万円。クリニック支援10万円、国内遠征・交流20万円、国際交流の準備・参加費支援20万円を想定しています。資金確保済み・奨学生採用済みという意味ではありません。",action:"協働について相談する（決済なし）",local:"Read in English",fine:"制度は準備段階です。奨学生の応募、寄付決済、採用、税控除の案内は開始していません。未成年者の個人情報を協力者から収集することもありません。",foot:"RBAによる独立した構想 / 西尾 優人"}
};
export function AccessGlobalPage({locale}:{locale:"ja"|"en"}) {
 const t=copy[locale];const card={background:"#143146",padding:22,borderRadius:10} as const;
 return <SiteFrame locale={locale as Locale} languagePage="partners"><main style={{background:"#081c2b",color:"#fff",padding:"30px 15px 70px",minHeight:"100vh"}}>
 <div style={{maxWidth:1050,margin:"auto"}}>
 <header style={{padding:"38px 28px 48px",background:"#102d41",borderLeft:"7px solid #f3763c",borderRadius:16}}>
 <div style={{display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}><Image src="/rba-logo-original.jpg" alt="RBA official logo" width={70} height={94} priority style={{background:"#fff",borderRadius:7,padding:4}}/><span style={{fontSize:12,fontWeight:850,letterSpacing:2,color:"#faa675"}}>RIOT BASKETBALL ACADEMY / RBA ACCESS</span></div>
 <p style={{fontWeight:800,fontSize:14,color:"#f79562",marginTop:40}}>{t.tag}</p>
 <h1 style={{fontSize:"clamp(31px,4.8vw,58px)",lineHeight:1.27,letterSpacing:"-.03em",margin:"15px 0"}}>{t.headline}</h1>
 <p style={{fontSize:"clamp(16px,1.7vw,20px)",lineHeight:1.85,maxWidth:900,color:"#dfebf1"}}>{t.lead}</p>
 <div style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:24}}><a href={signup} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"15px 23px",background:"#f3763c",color:"#0e2230",borderRadius:8,fontWeight:850,textDecoration:"none"}}>{t.action} ↗</a><a href={locale==="ja"?"/access":"/ja/access"} style={{display:"inline-block",padding:"15px 23px",border:"1px solid #bdccda",color:"#fff",borderRadius:8,textDecoration:"none"}}>{t.local} →</a></div>
 </header>
 <section style={{padding:"32px 24px",marginTop:25,background:"#102a3e",borderRadius:14}}>
 <h2 style={{fontSize:29,margin:"0 0 24px"}}>{t.section}</h2>
 <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:15}}>
 {t.areas.map((area,i)=><div key={area} style={card}><p style={{color:"#f79562",fontWeight:800}}>0{i+1}</p><h3 style={{fontSize:19,lineHeight:1.5}}>{area}</h3></div>)}</div>
 </section>
 <section style={{padding:"32px 24px",marginTop:25,background:"#102a3e",borderRadius:14}}><h2 style={{fontSize:29}}>{t.budget}</h2><p style={{fontSize:17,lineHeight:1.85,color:"#d4e1e9"}}>{t.budgetText}</p><p style={{fontSize:13,lineHeight:1.8,color:"#b8cbd7"}}>{t.fine}</p>
 <a href={signup} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"14px 23px",background:"#f3763c",color:"#0e2230",borderRadius:8,fontWeight:850,textDecoration:"none",marginTop:15}}>{t.action} ↗</a></section>
 <footer style={{marginTop:28,display:"flex",gap:25,flexWrap:"wrap",fontSize:13,color:"#bcd0de",justifyContent:"space-between"}}><span>{t.foot}</span><a href="/ja/policies" style={{color:"#f5b18e"}}>Privacy</a><a href="mailto:riot.training.base@gmail.com" style={{color:"#f5b18e"}}>Contact</a></footer>
 </div></main></SiteFrame>;
}