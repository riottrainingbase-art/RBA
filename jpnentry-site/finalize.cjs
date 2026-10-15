module.exports = function finalizeSite(ctx){
 const fs=require("node:fs"),path=require("node:path");
 const {out,mail,rfq,write}=ctx;
 const htmlEsc=x=>String(x).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
 const origin="https://www.jpnentry.com";
 const template=fs.readFileSync(path.join(out,"about/index.html"),"utf8");
 const partnersMain=`<main id="main-content">
 <section class="subhero partner-hero"><div class="wrap"><p class="eyebrow">B2B PARTNERSHIPS / JAPAN</p>
 <h1>Build reliable trade.<br><em>One verified requirement at a time.</em></h1>
 <p class="sublead">JPNentry connects buyer-specified requests with potential Japan-side sources. We work through verifiable commercial terms, not unsupported stock or dealer claims.</p>
 <div class="subhero-actions"><a href="#buyers" class="btn btn-primary">I AM AN OVERSEAS BUYER ↓</a><a href="#suppliers" class="btn btn-outline">I AM A JAPAN-BASED SUPPLIER ↓</a></div>
 </div></section>
 <section class="section" id="buyers"><div class="wrap partner-grid">
 <div class="partner-label"><p class="eyebrow">01 / IMPORTERS, DEALERS & DISTRIBUTORS</p><h2>For overseas<br><em>buying teams.</em></h2><p>Have a customer-backed request? Send one exact requirement and a target buying level so we can assess the actual Japan-side route.</p></div>
 <div class="partner-details">
 <div class="trust-row"><strong>What to send</strong><span>OEM number or vehicle specification, quantity, desired condition, destination and target FOB price in a named currency.</span></div>
 <div class="trust-row"><strong>What we check</strong><span>Potential legitimate source, identity/condition, price basis, seller permission, export documents and shipment feasibility.</span></div>
 <div class="trust-row"><strong>Commercial answer</strong><span>A written quote where terms can be verified — or an explicit no-go. An initial enquiry is non-binding.</span></div>
 <div class="trust-row"><strong>What we do not promise</strong><span>Unverified ready stock, guaranteed allocations, manufacturer authorization or unrestricted vehicle imports.</span></div>
 <div class="partner-actions"><a href="/rfq" class="btn btn-primary">PREPARE A BUYING BRIEF ↗</a><a href="${rfq}" class="btn btn-outline" target="_blank" rel="noopener">OPEN RFQ FORM ↗</a></div>
 </div></div></section>
 <section class="section method" id="suppliers"><div class="wrap partner-grid">
 <div class="partner-label"><p class="eyebrow">02 / JAPAN SUPPLY NETWORK</p><h2>For Japanese<br><em>suppliers.</em></h2><p>If your business can legitimately supply exact Japanese vehicle parts or industrial components, we welcome a clear B2B introduction.</p></div>
 <div class="partner-details">
 <div class="trust-row"><strong>Supplier profile</strong><span>Registered business name, location, public website and relevant brands or product categories.</span></div>
 <div class="trust-row"><strong>Supply capabilities</strong><span>Product references, availability confirmation method, indicative lead times, sales restrictions and acceptable export terms.</span></div>
 <div class="trust-row"><strong>Standards</strong><span>We verify identity and provenance and follow seller restrictions, applicable Japanese export controls and buyer confidentiality requirements.</span></div>
 <div class="trust-row"><strong>No implied partnership</strong><span>Introducing a supplier does not create an exclusive agency, guaranteed order volume or endorsement by any manufacturer.</span></div>
 <div class="partner-actions"><a class="btn btn-primary" href="mailto:${mail}?subject=Japan%20Supplier%20Partnership%20Enquiry">INTRODUCE YOUR COMPANY ↗</a><a class="text-link" href="/trust">VIEW OUR TRADE STANDARDS →</a></div>
 </div></div></section>
 <section class="partner-principles"><div class="wrap"><p class="eyebrow">JPNENTRY / COMMERCIAL PRINCIPLES</p>
 <div class="principle-row"><span>01</span><strong>One exact requirement.</strong><span>No unsupported product catalogue or assumed buyer demand.</span></div>
 <div class="principle-row"><span>02</span><strong>Source verification first.</strong><span>Availability, seller terms and applicable trade requirements checked case by case.</span></div>
 <div class="principle-row"><span>03</span><strong>Written approval before buying.</strong><span>Procurement only after final written terms and confirmed payment.</span></div>
 </div></section>
 <section class="cta-section"><div class="wrap cta-inner"><div><p class="eyebrow">JPNENTRY / YOUR JAPAN DESK</p><h2>One real order.<br>One credible supply route.</h2><p>Start small, verify the business case, and expand only when both sides agree on the commercial terms.</p></div><div class="cta-actions"><a class="btn btn-light" href="/rfq">SEND A BUYING BRIEF ↗</a><a class="text-link light-link" href="mailto:${mail}">${mail}</a></div></div></section>
 </main>`;
 const modifyMeta=(src,title,description,url)=>{
  let html=src.replace(/<main id="main-content">[\s\S]*?<\/main>/,partnersMain);
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${htmlEsc(title)} | JPNentry</title>`);
  html=html.replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${htmlEsc(description)}">`);
  html=html.replace(/<link rel="canonical" href="[^"]*">/,`<link rel="canonical" href="${origin+url}">`);
  html=html.replace(/<meta property="og:title" content="[^"]*">/,`<meta property="og:title" content="${htmlEsc(title)} | JPNentry">`);
  html=html.replace(/<meta property="og:description" content="[^"]*">/,`<meta property="og:description" content="${htmlEsc(description)}">`);
  html=html.replace(/<meta property="og:url" content="[^"]*">/,`<meta property="og:url" content="${origin+url}">`);
  return html;
 };
 const partnerTitle="B2B Japan Sourcing Partners | Buyers & Suppliers";
 const partnerDesc="Overseas importers and Japan suppliers: work with JPNentry on buyer-backed automotive and industrial parts sourcing, exact RFQs and verifiable trade terms.";
 write("partners/index.html",modifyMeta(template,partnerTitle,partnerDesc,"/partners"));
 const fourOhFourMain=`<main id="main-content"><section class="not-found"><div class="wrap"><span class="not-found-index">404 / PAGE NOT FOUND</span><p class="eyebrow">JPNENTRY / JAPAN SOURCING DESK</p><h1>This page moved.<br><em>Your enquiry can continue.</em></h1><p>That address is not available. You can return to our sourcing services, prepare an RFQ, or contact the Japan desk directly.</p>
 <div class="not-found-actions"><a href="/" class="btn btn-primary">RETURN TO HOME ↗</a><a href="/rfq" class="btn btn-outline">PREPARE AN RFQ ↗</a><a href="/contact" class="text-link">CONTACT THE DESK →</a></div>
 </div></section></main>`;
 let errorPage=template.replace(/<main id="main-content">[\s\S]*?<\/main>/,fourOhFourMain);
 errorPage=errorPage.replace(/<title>[\s\S]*?<\/title>/,"<title>Page not found | JPNentry</title>");
 errorPage=errorPage.replace(/<meta name="robots" content="index, follow">/,'<meta name="robots" content="noindex, follow">');
 errorPage=errorPage.replace(/<link rel="canonical" href="[^"]*">/,'<link rel="canonical" href="https://www.jpnentry.com/404">');
 errorPage=errorPage.replace(/<meta property="og:url" content="[^"]*">/,'<meta property="og:url" content="https://www.jpnentry.com/404">');
 errorPage=errorPage.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,"");
 write("404.html",errorPage);
 // Introduce an intentionally small, supplier-aware route to every footer, and a clearly separated
 // two-sided partnership section on the English homepage. No new external form is used.
 const homeFile=path.join(out,"index.html");
 let home=fs.readFileSync(homeFile,"utf8");
 const newHomeBlock=`<section class="partner-home"><div class="wrap"><div class="section-head"><div><p class="eyebrow">JPNENTRY / B2B NETWORK</p><h2>For buyers.<br><em>And for the supply side.</em></h2></div><p>We build our Japan-side sourcing network around real buyer requirements and verifiable supplier relationships.</p></div>
  <div class="partner-home-grid"><a href="/partners#buyers"><span>01 / INTERNATIONAL BUYERS</span><h3>Looking for a difficult Japanese item?</h3><p>Send an exact OEM part, industrial MPN or vehicle brief with your buying conditions.</p><strong>HOW TO BUY FROM JAPAN ↗</strong></a><a href="/partners#suppliers"><span>02 / JAPAN-BASED SUPPLIERS</span><h3>Can you verify legitimate Japan-side supply?</h3><p>Introduce your company, product references and commercial terms for potential B2B enquiries.</p><strong>EXPLORE SUPPLIER PARTNERSHIPS ↗</strong></a></div></div></section>`;
 home=home.replace('<section class="cta-section">',newHomeBlock+'<section class="cta-section">');
 write("index.html",home);
 const files=[];
 const walk=d=>{for(const ent of fs.readdirSync(d,{withFileTypes:true})){const fp=path.join(d,ent.name);if(ent.isDirectory())walk(fp);else if(fp.endsWith(".html"))files.push(fp);}};
 walk(out);
 const originals=["style.css","extra.css","premium.css","growth.css"];
 const imports=[];
 const bodies=[];
 for(const f of originals){
  let css=fs.readFileSync(path.join(out,f),"utf8");
  const found=css.match(/@import\s+url\([^;]+\);/g)||[];
  for(const imp of found)if(!imports.includes(imp))imports.push(imp);
  css=css.replace(/@import\s+url\([^;]+\);/g,"");
  bodies.push("/* "+f+" */\n"+css);
 }
 const extraCss=String.raw`
/* Two-sided B2B trade participation */
.partner-hero {background:#e7ece7}
.partner-grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:9%;align-items:start}
.partner-label h2{font-size:clamp(39px,4.3vw,65px);line-height:1.17}
.partner-label>p:last-child{font-size:16px;color:#65726c;line-height:1.95;max-width:450px}
.partner-details .trust-row{grid-template-columns:175px 1fr;gap:20px;padding:19px 0}
.partner-details .trust-row:first-child{border-top:1px solid var(--line)}
.partner-details .trust-row span{font-size:14px;line-height:1.85}
.partner-actions{display:flex;align-items:center;gap:13px;flex-wrap:wrap;margin-top:35px}
.partner-principles{background:#1c2c2c;color:#fff;padding:80px 0}
.partner-principles .eyebrow{color:#c98a74}
.principle-row{border-bottom:1px solid rgba(255,255,255,.23);padding:23px 0;display:grid;grid-template-columns:70px 1fr 1.15fr;gap:18px;align-items:start}
.principle-row>span:first-child{font:700 13px var(--display);color:#c98a74}
.principle-row strong{font:700 21px/1.45 var(--display);color:#eef4f0}
.principle-row span:last-child{font-size:14px;color:#afbfba;line-height:1.8}
.partner-home{padding:93px 0;background:#fff}
.partner-home-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line);background:#fff}
.partner-home-grid a{min-height:288px;padding:31px 33px;display:flex;flex-direction:column;transition:background .2s}
.partner-home-grid a:first-child{border-right:1px solid var(--line)}
.partner-home-grid a:hover{background:#f0f3ee}
.partner-home-grid a>span{font:800 10px var(--display);color:var(--accent);letter-spacing:.1em}
.partner-home-grid h3{font:700 28px/1.28 var(--display);margin:51px 0 12px}
.partner-home-grid p{color:#5e6b67;font-size:14px}
.partner-home-grid strong{margin-top:auto;font:800 10px var(--display);letter-spacing:.1em}
.not-found{min-height:70vh;display:flex;align-items:center;background:#e8ece8;padding:95px 0}
.not-found-index{display:block;font:800 10px/1.5 var(--display);letter-spacing:.16em;color:#945642;margin-bottom:45px}
.not-found h1{max-width:1000px;font-size:clamp(48px,6vw,88px);line-height:1.12;margin-bottom:27px}
.not-found p:not(.eyebrow){max-width:560px;font-size:17px;color:#5e6e68;line-height:1.85}
.not-found-actions{display:flex;align-items:center;flex-wrap:wrap;gap:15px;margin-top:33px}
@media(max-width:850px){
 .partner-grid{grid-template-columns:1fr;gap:30px}
 .partner-home-grid{grid-template-columns:1fr}
 .partner-home-grid a:first-child{border-right:none;border-bottom:1px solid var(--line)}
 .principle-row{grid-template-columns:50px 1fr}
 .principle-row span:last-child{grid-column:2}
}
@media(max-width:640px){
 .partner-details .trust-row{grid-template-columns:1fr;gap:5px}
 .partner-principles{padding:63px 0}
 .partner-home{padding:68px 0}
 .partner-home-grid a{padding:27px;min-height:265px}
 .partner-home-grid h3{font-size:24px;margin-top:39px}
 .not-found{min-height:65vh;padding:70px 0}
 .not-found h1{font-size:45px}
 .not-found-actions{align-items:stretch;flex-direction:column}
 .not-found-actions .btn{width:100%}
}
@media print{
 .site-header,.footer,.cta-section,.menu-toggle,.btn,.not-found-actions,.lang-menu{display:none!important}
 body{background:white;color:black}
 .partner-details .trust-row{break-inside:avoid}
 .section{padding:25px 0}
 .wrap{width:100%}
}`;
 const bundle=imports.join("\n")+"\n"+bodies.join("\n\n")+"\n"+extraCss;
 write("theme.css",bundle);
 for(const f of files){
  const rel=path.relative(out,f).replace(/\\/g,"/");
  let html=fs.readFileSync(f,"utf8");
  const cssRe=/<link rel="stylesheet" href="\/(?:style|extra|premium|growth)\.css">/g;
  html=html.replace(cssRe,"");
  if(!html.includes('href="/theme.css"'))html=html.replace("</head>",'<link rel="stylesheet" href="/theme.css"></head>');
  if(!html.includes('href="/partners"')){
   html=html.replace(/(<a href="\/malaysia">[\s\S]*?<\/a>)/,'$1<a href="/partners">B2B Partnerships</a>');
  }
  write(rel,html);
 }
 let sitemap=fs.readFileSync(path.join(out,"sitemap.xml"),"utf8");
 if(!sitemap.includes(`${origin}/partners</loc>`)){
  sitemap=sitemap.replace("</urlset>",`<url><loc>${origin}/partners</loc></url></urlset>`);
  write("sitemap.xml",sitemap);
 }
 console.log(`Finalized ${files.length} HTML pages; 1 bundled CSS stylesheet (${bundle.length} bytes); partnership page and branded 404.`);
};
