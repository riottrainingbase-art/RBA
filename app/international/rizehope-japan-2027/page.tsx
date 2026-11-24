import type {Metadata} from "next";
import Image from "next/image";
import {SiteFrame} from "@/components/site-frame";

export const metadata:Metadata={
 title:"RIZEHOPE JAPAN 2027 | International U12 Basketball & Tohoku Stays",
 description:"Explore a youth basketball exchange in Miyagi on 27–28 February 2027, optional Tohoku visits, group budget models and free club interest. No team acceptance or travel booking yet.",
 alternates:{canonical:"https://riotbasketballacademy.com/international/rizehope-japan-2027"},
 openGraph:{title:"RIZEHOPE JAPAN 2027 | Basketball, Tohoku & Cultural Exchange",description:"Basketball on 27–28 February 2027. Compare 3-, 4- and 6-night Japan visits for overseas U12 teams. Non-binding planning only.",type:"website",url:"https://riotbasketballacademy.com/international/rizehope-japan-2027",images:["/rba-logo-original.jpg"]},
};
const plans=[
 {label:"FOCUSED VISIT",nights:"3 nights / 4 days",dates:"26 February – 1 March",details:"Arrival, two basketball exchange days, departure. Includes planned team meals and local travel, subject to quotes."},
 {label:"BASKETBALL + SENDAI",nights:"4 nights / 5 days",dates:"26 February – 2 March",details:"An additional day to explore Sendai or Matsushima and share experiences as a team."},
 {label:"TOHOKU DISCOVERY",nights:"6 nights / 7 days",dates:"24 February – 2 March",details:"More time for an optional development clinic, cultural experiences and regional discovery before or after the event."},
];
const budget=[
 {size:"16 travellers",group:"12 players + 4 adults",amounts:["¥1,500,000","¥1,930,000","¥2,790,000"]},
 {size:"32 travellers",group:"24 players + 8 adults",amounts:["¥2,600,000","¥3,360,000","¥4,880,000"]},
 {size:"48 travellers",group:"36 players + 12 adults",amounts:["¥4,040,000","¥5,290,000","¥7,780,000"]},
];
const topics=[
 ["What RBA can coordinate","Development-focused games, Japanese club introductions subject to acceptance, additional coaching or training concepts, host-side communication and child-safe sporting operations."],
 ["What travel professionals arrange","Hotel rooms, group coach transport, excursions and relevant travel services are quoted, booked, contracted and charged by suitable registered travel providers or direct suppliers. RBA does not sell a confirmed bundled tour here."],
 ["Food and health","Request group-level dietary and accessibility numbers first. Specific allergen, cross-contact, medical action plans and guardian consents are handled securely only when necessary and by authorised staff."],
 ["When a place is confirmed","Final age rules, national and regional sports approvals where applicable, facility conditions, adult supervision, team capacity, cancellation terms and written acceptance must all be in place first."],
];
export default function RizehopeInternational(){
 const navy="#132943",line="#d7dbdd";
 return <SiteFrame locale="en">
  <main lang="en" style={{background:"#f8f7f4",color:navy,minHeight:"100vh"}}>
   <div style={{maxWidth:1100,margin:"0 auto",padding:"34px 18px 85px"}}>
    <a href="/international" style={{fontSize:13,textDecoration:"underline",color:"#425c72"}}>← RBA International</a>
    <header style={{display:"flex",alignItems:"center",gap:19,padding:"34px 0 30px",borderBottom:"1px solid #d6d9dc"}}>
      <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy official logo" width={83} height={83} style={{objectFit:"contain",borderRadius:3}}/>
      <div><p style={{fontSize:12,letterSpacing:".14em",fontWeight:800,margin:"0 0 9px"}}>RBA INTERNATIONAL / MIYAGI, JAPAN</p>
       <h1 style={{fontSize:"clamp(29px,4.6vw,53px)",lineHeight:1.16,margin:0}}>RIZEHOPE JAPAN 2027</h1></div>
    </header>
    <div style={{padding:"30px 0 22px",maxWidth:820}}>
      <p style={{fontSize:14,fontWeight:700,letterSpacing:".08em",color:"#967650"}}>27–28 FEBRUARY 2027 · SHIBATA / NEAR SENDAI</p>
      <h2 style={{fontSize:"clamp(26px,4.3vw,41px)",lineHeight:1.28,margin:"12px 0"}}>Come for basketball. Discover Tohoku together.</h2>
      <p style={{lineHeight:1.9,color:"#3d5065",fontSize:17}}>An international U12 youth basketball exchange is being prepared in Miyagi Prefecture. Visiting clubs may wish to combine the exchange with a longer stay, additional learning and experiences in northern Japan. Tell us what fits your team; we will help plan the basketball side and introduce appropriate travel providers.</p>
      <a href="https://form.jotform.com/263221234159047" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",background:navy,color:"white",padding:"15px 21px",fontWeight:800,textDecoration:"none",marginTop:11}}>Free international club interest →</a>
      <p style={{fontSize:13,color:"#596b7a",lineHeight:1.8}}>No team acceptance, venue entitlement, hotel, transport, sightseeing reservation or payment follows from this form.</p>
    </div>
    <section style={{padding:"27px 0",borderTop:`1px solid ${line}`}} aria-labelledby="stay">
      <h2 id="stay" style={{fontSize:27}}>Choose a visit that suits your club</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
        {plans.map(p=><article key={p.nights} style={{background:"#fff",padding:23,border:`1px solid ${line}`}}>
          <p style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#93734d"}}>{p.label}</p>
          <h3 style={{fontSize:22,margin:"12px 0 8px"}}>{p.nights}</h3>
          <strong style={{fontSize:13}}>{p.dates}</strong>
          <p style={{fontSize:14,lineHeight:1.85,color:"#4d5e6b"}}>{p.details}</p>
        </article>)}
      </div>
      <p style={{fontSize:13,lineHeight:1.8,color:"#516579"}}>Possible activities include Sendai, Matsushima Bay and regional Tohoku cultural experiences; all are optional and depend on season, opening hours, weather, budget, child supervision and supplier confirmation.</p>
    </section>
    <section style={{padding:"30px 0",borderTop:`1px solid ${line}`}} aria-labelledby="budget">
      <h2 id="budget" style={{fontSize:27}}>Planning budgets, not travel quotations</h2>
      <p style={{lineHeight:1.85,maxWidth:830}}>Indicative group-level Japan-land budgets in Japanese yen, updated 24 November 2026. These are working allowances for hotels, meals, event-day transport, sporting coordination, potential additional activities and contingency—not a payable programme price or travel package.</p>
      <div style={{overflowX:"auto",border:`1px solid ${line}`,background:"white"}}>
       <table style={{borderCollapse:"collapse",width:"100%",minWidth:670,textAlign:"left",fontSize:14}}>
        <thead style={{background:navy,color:"white"}}><tr><th style={{padding:15}}>Group size</th><th style={{padding:15}}>3 nights</th><th style={{padding:15}}>4 nights</th><th style={{padding:15}}>6 nights</th></tr></thead>
        <tbody>{budget.map((b,i)=><tr key={b.size} style={{background:i%2===0?"#fff":"#f1f1ed",borderBottom:`1px solid ${line}`}}><td style={{padding:15}}><strong>{b.size}</strong><div style={{fontSize:12,color:"#637180"}}>{b.group}</div></td>{b.amounts.map((a,k)=><td key={k} style={{padding:15,fontWeight:700}}>{a}</td>)}</tr>)}</tbody>
       </table>
      </div>
      <p style={{fontSize:13,lineHeight:1.95,color:"#526476",marginTop:14}}>International flights, visa/passport charges, personal travel-medical insurance and individual shopping are excluded. The overseas sports participation fee has not been approved. A local bus operator has provided indicative prices for the two exchange days, but airport transfers, extra-day transport and hotels are not booked or fully quoted. A sports-group lodge used in an earlier estimate ordinarily limits Sunday-night stays; this model does not promise that lodge for the three-night itinerary.</p>
    </section>
    <section style={{padding:"26px 0",borderTop:`1px solid ${line}`}} aria-labelledby="responsibility">
     <h2 id="responsibility" style={{fontSize:27}}>One clear plan. Separate responsibilities.</h2>
     <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14}}>
     {topics.map(([h,b])=><article key={h} style={{padding:"18px 20px",background:"#fff",border:`1px solid ${line}`}}><h3 style={{fontSize:17,margin:"0 0 9px"}}>{h}</h3><p style={{fontSize:14,lineHeight:1.8,margin:0,color:"#4f6072"}}>{b}</p></article>)}
     </div>
    </section>
    <section style={{marginTop:18,background:navy,color:"#fff",padding:"28px 26px"}} aria-labelledby="next">
      <h2 id="next" style={{fontSize:27,marginTop:0}}>Tell us about your team.</h2>
      <p style={{lineHeight:1.85,maxWidth:740}}>An adult club representative can share the country and city, estimated U12 birth years, number of players and adult chaperones, travel window, preferred airport and whether your group prefers more games, training or cultural experiences. We will discuss a tailored plan once we know your priorities.</p>
      <a href="https://form.jotform.com/263221234159047" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"14px 20px",background:"#fff",color:navy,fontWeight:800,textDecoration:"none",margin:"10px 0"}}>Submit free team interest →</a>
      <p style={{fontSize:13,opacity:.87,lineHeight:1.7}}>Do not submit children's names, passports or medical records in ordinary email or public messaging. For group enquiries: <a style={{color:"#fff"}} href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>. No deposit is requested.</p>
    </section>
   </div>
  </main>
 </SiteFrame>;
}
