function buildSite() {
  const fs = require("node:fs");
  const path = require("node:path");
  const root = __dirname;
  const out = path.join(root,"dist");
  fs.mkdirSync(out,{recursive:true});
  const posts = fs.readdirSync(path.join(root,"data"))
    .filter(n => /^posts-\d+\.json$/.test(n)).sort()
    .flatMap(n => JSON.parse(fs.readFileSync(path.join(root,"data",n),"utf8")));
  const h = v => String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const rfq = "https://form.jotform.com/262542049350049";
  const mail = "jpnentry.sales@gmail.com";
  const write = (p,v)=>{const f=path.join(out,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,v);};
  const nav = (ja=false)=>`<header class="site-header"><div class="wrap header-inner">
   <a class="brand" href="${ja?"/ja":"/"}" aria-label="JPNentry — home"><span class="brand-emblem" aria-hidden="true"><svg viewBox="0 0 48 48" role="img" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="8" fill="currentColor"/><path d="M31 12v20c0 6-4.6 10-11 10-3.6 0-6.6-1.2-9-3.7" fill="none" stroke="#F6F6F2" stroke-width="5.5" stroke-linecap="square"/><path d="M15 12h23" fill="none" stroke="#CF8068" stroke-width="4.5"/></svg></span><span class="brand-lockup"><strong>JPN<span>entry</span></strong></span></a>
   <nav class="main-nav" aria-label="Main navigation"><a href="/automotive">${ja?"自動車部品":"AUTO PARTS"}</a><a href="/industrial">${ja?"産業部品":"INDUSTRIAL"}</a><a href="/vehicles">${ja?"車両調達":"VEHICLES"}</a><a href="/blog">${ja?"記事":"INSIGHTS"}</a><a href="/about">${ja?"会社概要":"ABOUT"}</a><a href="/contact">${ja?"問い合わせ":"CONTACT"}</a><a class="menu-rfq" href="${rfq}" target="_blank" rel="noopener">${ja?"見積依頼":"REQUEST A QUOTE"} ↗</a></nav>
   <div class="header-actions"><a class="lang" href="${ja?"/":"/ja"}">${ja?"EN":"日本語"}</a><a class="btn btn-small" href="${rfq}" target="_blank" rel="noopener">REQUEST A QUOTE <span aria-hidden="true">↗</span></a></div>
   <button class="menu-toggle" aria-label="Toggle navigation" onclick="document.body.classList.toggle('menu-open')">☰</button>
   </div></header>`;
  const footer = `<footer class="footer"><div class="wrap">
    <div class="footer-top"><div><a class="brand footer-brand" href="/" aria-label="JPNentry — home"><span class="brand-emblem" aria-hidden="true"><svg viewBox="0 0 48 48" role="img" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="8" fill="currentColor"/><path d="M31 12v20c0 6-4.6 10-11 10-3.6 0-6.6-1.2-9-3.7" fill="none" stroke="#F6F6F2" stroke-width="5.5" stroke-linecap="square"/><path d="M15 12h23" fill="none" stroke="#CF8068" stroke-width="4.5"/></svg></span><span class="brand-lockup"><strong>JPN<span>entry</span></strong></span></a><p>Japan-side sourcing, verification and export coordination for exact buyer requirements.</p></div>
    <div><strong>EXPLORE</strong><a href="/automotive">Automotive parts</a><a href="/industrial">Industrial sourcing</a><a href="/vehicles">Vehicle sourcing</a><a href="/blog">Insights & buyer guides</a></div>
    <div><strong>WORK WITH US</strong><a href="${rfq}" target="_blank" rel="noopener">Submit an RFQ ↗</a><a href="mailto:${mail}">${mail}</a><a href="/legal">Privacy & service terms</a><a href="/trust">Trust & verification</a></div></div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} JPNentry · Operated by Masato Nishio, Japan</span><span>Independent sourcing desk · Not an authorized distributor of named manufacturers.</span></div>
  </div></footer>`;
  const page = (title,description,body,uri="/",lang="en")=>{
    const canonical="https://www.jpnentry.com"+(uri==="/"?"/":uri);
    return `<!doctype html><html lang="${lang}"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${h(title)} | JPNentry</title><meta name="description" content="${h(description)}">
    <link rel="canonical" href="${canonical}"><meta property="og:title" content="${h(title)} | JPNentry"><meta property="og:description" content="${h(description)}"><meta property="og:type" content="website">
    <meta name="theme-color" content="#172326"><link rel="stylesheet" href="/style.css">
    <script defer src="/app.js"></script></head><body>${nav(lang==="ja")}${body}${footer}</body></html>`;
  };
  const cta=(title="One exact requirement is enough.",desc="Part number, vehicle specification or product link — send the details. We will check whether a legitimate Japan-side route exists.")=>
   `<section class="cta-section"><div class="wrap cta-inner"><div><p class="eyebrow">START WITH ONE REAL REQUIREMENT</p><h2>${title}</h2><p>${desc}</p></div><div class="cta-actions"><a class="btn btn-light" href="${rfq}" target="_blank" rel="noopener">SUBMIT AN RFQ ↗</a><a class="text-link light-link" href="mailto:${mail}" aria-label="Email JPNentry sales">${mail}</a></div></div></section>`;
  const serviceCard=(num,tag,title,desc,href)=>`<a class="service-card" href="${href}"><span class="index">${num} / ${tag}</span><span class="card-arr">↗</span><h3>${title}</h3><p>${desc}</p><span class="card-link">EXPLORE SERVICE <span>↗</span></span></a>`;
  const home = `<main>
  <section class="hero"><div class="wrap hero-grid"><div class="hero-copy">
    <div class="micro-pill"><span class="live-dot"></span> JAPAN-BASED · BUYER-LED SOURCING</div>
    <h1>Source in Japan.<br><em>Decide with clarity.</em></h1>
    <p class="hero-desc">Buyer-led sourcing for Japanese automotive parts, industrial components and specialized vehicles. One precise requirement. One commercially grounded answer.</p>
    <div class="hero-buttons"><a class="btn btn-primary" href="${rfq}" target="_blank" rel="noopener">SEND ONE REQUIREMENT <span>↗</span></a><a class="btn btn-outline" href="#services">EXPLORE WHAT WE SOURCE <span>↓</span></a></div>
    <div class="hero-under"><span>INDEPENDENT SOURCING</span><span>REAL SOURCING CHECKS</span><span>GLOBAL B2B BUYERS</span></div>
  </div><div class="hero-art" aria-hidden="true"><div class="hero-art-head"><span>JPN / THE JAPAN DESK</span><span>REFERENCE — 001</span></div><div class="art-canvas"><span class="art-overline">PRECISION IN PROCUREMENT</span><div class="art-orbit art-orbit-one"></div><div class="art-orbit art-orbit-two"></div><div class="art-axis art-axis-x"></div><div class="art-axis art-axis-y"></div><div class="art-center"><span>JP</span><i>+</i></div><div class="art-location">JAPAN<br>35°40′ N / 139°41′ E</div><span class="art-corner art-corner-tl">+</span><span class="art-corner art-corner-br">+</span></div><div class="art-process"><span><b>01</b> REQUIREMENT</span><span><b>02</b> VERIFICATION</span><span><b>03</b> DECISION</span></div></div></div></section>
  <div class="signal-strip"><div class="wrap"><span>ONE EXACT REQUIREMENT</span><b>✳</b><span>ONE JAPAN-SIDE DESK</span><b>✳</b><span>REALISTIC COMMERCIAL ANSWERS</span></div></div>
  <section class="section services" id="services"><div class="wrap">
    <div class="section-head"><div><p class="eyebrow">01 / CAPABILITIES</p><h2>Source what<br><em>matters.</em></h2></div><p>We are built for specific requirements, not an unverified catalogue. Tell us exactly what is missing or hard to buy.</p></div>
    <div class="service-grid">
    ${serviceCard("01","AUTOMOTIVE","Genuine Japanese<br>auto parts","Exact OEM numbers, superseded references and hard-to-find Japanese vehicle parts. Toyota, Lexus, Nissan and more.","/automotive")}
    ${serviceCard("02","INDUSTRIAL","Critical industrial<br>components","Industrial automation MPNs, discontinued components, measurements and control devices with supplier-side checks.","/industrial")}
    ${serviceCard("03","VEHICLES","Specialized<br>vehicle sourcing","Buyer-led vehicle briefs. We assess dealer permissions, export eligibility, documentation and supply before quoting.","/vehicles")}
    ${serviceCard("04","SPECIALIST","EV & niche<br>requirements","EV component enquiries and specialized Japan-side products, subject to safety, compatibility and export constraints.","/industrial")}
    </div></div></section>
  <section class="section method"><div class="wrap"><div class="section-head"><div><p class="eyebrow">02 / OUR METHOD</p><h2>No vague promises.<br><em>Just a real process.</em></h2></div><p>A non-binding enquiry comes first. We verify the specific part or vehicle before requesting buyer commitment.</p></div>
  <div class="method-grid"><div><span>01</span><h3>Send a brief</h3><p>MPN, OEM number, model code, photo or vehicle brief with quantity and destination.</p></div>
  <div><span>02</span><h3>Verify in Japan</h3><p>Check sourceability, condition, supplier terms, required documents and restrictions.</p></div>
  <div><span>03</span><h3>Quote or no-go</h3><p>Receive a realistic commercial answer. We disclose assumptions and limitations.</p></div>
  <div><span>04</span><h3>Approve first</h3><p>No purchasing, reservation or supplier payment before your written approval and confirmed payment.</p></div></div>
  </div></section>
  <section class="section proof"><div class="wrap proof-grid"><div><p class="eyebrow">03 / TRANSPARENCY</p><h2>Built around<br><em>verification.</em></h2></div><div class="proof-copy"><p>We distinguish a live request, a verified quote and a completed transaction. Published sourcing notes are labeled to avoid overstating commercial results.</p><a href="/trust" class="text-link">READ OUR TRUST STANDARD ↗</a><a href="/blog" class="text-link">VIEW BUYER NOTES ↗</a></div></div></section>
  ${cta()}</main>`;
  write("index.html",page("Japan Sourcing Desk | Genuine Parts, Industrial MPNs & Vehicles","Independent Japan sourcing and verification for genuine Japanese auto parts, industrial MPNs and specialized vehicles. Send an exact RFQ for a quote or no-go.",home,"/"));
  const jaHome=`<main><section class="hero"><div class="wrap hero-grid"><div class="hero-copy">
  <div class="micro-pill"><span class="live-dot"></span> 日本拠点 · BtoB調達・確認窓口</div><h1>日本で探す。<br><em>確かめて、提案する。</em></h1><p class="hero-desc">日本車の純正部品、産業機器の部品、特定仕様の車両まで。型番・数量・仕向地を伺い、日本側の実際の調達可否を確認したうえで、見積または対応不可の判断をご案内します。</p>
  <div class="hero-buttons"><a class="btn btn-primary" href="${rfq}" target="_blank" rel="noopener">見積依頼を送る ↗</a><a class="btn btn-outline" href="#services">対応領域を見る ↓</a></div><div class="hero-under"><span>実際の在庫・条件を確認</span><span>見積依頼は非拘束</span><span>日本から海外へ</span></div>
  </div><div class="hero-art" aria-hidden="true"><div class="hero-art-head"><span>JPN / THE JAPAN DESK</span><span>REFERENCE — 001</span></div><div class="art-canvas"><span class="art-overline">PRECISION IN PROCUREMENT</span><div class="art-orbit art-orbit-one"></div><div class="art-orbit art-orbit-two"></div><div class="art-axis art-axis-x"></div><div class="art-axis art-axis-y"></div><div class="art-center"><span>JP</span><i>+</i></div><div class="art-location">JAPAN<br>35°40′ N / 139°41′ E</div><span class="art-corner art-corner-tl">+</span><span class="art-corner art-corner-br">+</span></div><div class="art-process"><span><b>01</b> REQUIREMENT</span><span><b>02</b> VERIFICATION</span><span><b>03</b> DECISION</span></div></div></div></section>
  <div class="signal-strip"><div class="wrap"><span>型番を一つ</span><b>✳</b><span>日本側で確認</span><b>✳</b><span>根拠のあるご提案</span></div></div>
  <section class="section services" id="services"><div class="wrap"><div class="section-head"><div><p class="eyebrow">01 / 対応領域</p><h2>調達先を探す<br><em>パートナーとして。</em></h2></div><p>幅広い在庫を保有しているという意味ではありません。個別の型番・仕様に対して、実際の日本国内の入手経路を調査します。</p></div><div class="service-grid">
  ${serviceCard("01","自動車部品","日本車の<br>純正部品","Toyota、Lexusなどの型番指定品、入手困難品、純正・OEM部品の調達可否を確認。","/automotive")}
  ${serviceCard("02","産業部品","産業機器・<br>旧型部品","制御機器・計測機器・生産終了の型番指定品について、国内の入手経路を調査。","/industrial")}
  ${serviceCard("03","車両","特定仕様の<br>車両調達","ディーラーの輸出許可や輸入国の規制を確認し、条件を満たす案件だけ検討。","/vehicles")}
  ${serviceCard("04","その他","専門性の高い<br>日本製品","EV関連機器やニッチな製品は、取引規制と実際の調達条件を確認して判断。","/industrial")}
  </div></div></section>
  <section class="section method"><div class="wrap"><div class="section-head"><div><p class="eyebrow">02 / 進め方</p><h2>最初に確認、<br><em>その後に見積。</em></h2></div><p>お申し込みのみで仕入れや支払いが確定することはありません。</p></div><div class="method-grid"><div><span>01</span><h3>依頼</h3><p>型番・数量・希望条件と仕向地を送信。</p></div><div><span>02</span><h3>調査</h3><p>国内供給経路・状態・規制・納期を確認。</p></div><div><span>03</span><h3>見積</h3><p>実現可能な条件を提示。対応不可の場合も明確に伝えます。</p></div><div><span>04</span><h3>承認後に進行</h3><p>書面承認と入金確認後、合意した範囲で調達します。</p></div></div></div></section>${cta("型番・仕様からご相談ください。","取引実績や在庫を誇張せず、一件ずつ供給可能性を確認します。")}</main>`;
  write("ja/index.html",page("日本製自動車部品・産業部品の調達窓口","JPNentryは日本車純正部品、産業部品、特定仕様の車両について、日本側の調達可能性を検証します。",jaHome,"/ja","ja"));
  write("zh-cn/index.html",page("Japan Sourcing & Verification Desk","Japan-side sourcing for exact industrial parts, auto parts and vehicle requirements.",home,"/zh-cn","en"));
  const features=[
  {path:"automotive",tag:"AUTOMOTIVE / GENUINE PARTS",title:"The part number matters.",subtitle:"A precise sourcing route for hard-to-find Japanese automotive components.",who:"FOR WHOLESALERS, REPAIR NETWORKS & IMPORTERS",items:[["Genuine & OEM-specified parts","Exact Toyota, Lexus, Nissan, Mitsubishi, Isuzu and other Japanese part references, subject to sourcing verification."],["Difficult supply positions","Backorders, superseded references and Japan-market-specific fitment requirements."],["Commercial clarity","Verification of source, condition, quantity, price basis and shipment scope before quotation."]],disclaimer:"JPNentry is independent and is not an authorized Toyota, Lexus or other manufacturer distributor. Import eligibility depends on product classification and destination regulations."},
  {path:"industrial",tag:"INDUSTRIAL / SPECIALIST PARTS",title:"When one part stops production.",subtitle:"Exact industrial MPNs, instrumentation and hard-to-source Japanese automation components.",who:"FOR SYSTEM INTEGRATORS, MAINTENANCE TEAMS & IMPORTERS",items:[["Industrial automation","Specific Mitsubishi Electric, Omron, Yaskawa, FANUC and related automation part numbers."],["Legacy & obsolete MPNs","Discontinued and difficult-to-source model numbers with documented condition."],["EV-related enquiries","Battery and high-voltage items require additional checks for safety, condition and dangerous-goods transport."]],disclaimer:"Named manufacturers are examples of product categories, not endorsements or authorized distributorships."},
  {path:"vehicles",tag:"VEHICLES / PROCUREMENT",title:"A vehicle brief, not a catalogue.",subtitle:"Buyer-led Japan vehicle sourcing when domestic sale terms and destination import rules permit.",who:"FOR IMPORTERS, DEALERS & FLEET BUYERS",items:[["Specific model & grade","Submit desired chassis, grade, drivetrain, quantity, budget and destination."],["Export compliance first","New vehicle purchases depend on seller/dealer export permission, brand restrictions and destination import eligibility."],["Commercial confirmation","We do not advertise unverified ready stock, guaranteed allocations or delivery dates."]],disclaimer:"JPNentry does not claim to be an authorized Toyota exporter. Malaysian new-CBU vehicle imports may require Franchise AP and manufacturer-authorized distribution. No purchase before written buyer approval."}
  ];
  for(const f of features){
    const html=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">${f.tag}</p><h1>${f.title}</h1><p class="sublead">${f.subtitle}</p><div class="subhero-actions"><a href="${rfq}" target="_blank" rel="noopener" class="btn btn-primary">SEND A BUYING BRIEF ↗</a><a href="mailto:${mail}" class="btn btn-outline">EMAIL THE DESK ↗</a></div></div></section>
    <section class="section"><div class="wrap"><div class="section-head"><div><p class="eyebrow">${f.who}</p><h2>Where we<br><em>can help.</em></h2></div><p>We start with one real demand and check Japan-side feasibility. We do not ask you to change your existing suppliers.</p></div>
    <div class="service-grid three">${f.items.map((x,i)=>`<div class="service-card static"><span class="index">0${i+1} / JAPAN DESK</span><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join("")}</div>
    <div class="fine-notice"><strong>COMPLIANCE & SCOPE</strong><p>${f.disclaimer}</p></div></div></section>
    <section class="section method"><div class="wrap"><div class="section-head"><div><p class="eyebrow">RFQ CHECKLIST</p><h2>What to<br><em>send us.</em></h2></div><p>Providing exact details helps us avoid incorrect matches and unrealistic commitments.</p></div><div class="checklist"><span>01 / PART OR MODEL IDENTIFIER</span><span>02 / QUANTITY & CONDITION</span><span>03 / DESTINATION COUNTRY</span><span>04 / TARGET BUY PRICE</span><span>05 / DEADLINE & DOCUMENTS</span></div></div></section>${cta()}</main>`;
    write(f.path+"/index.html",page(f.title,f.subtitle,html,"/"+f.path));
  }
  const trust=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">OUR STANDARD / TRANSPARENCY</p><h1>Proof before promises.</h1><p class="sublead">We separate unverified possibilities, live enquiries, checked quotations and completed transactions.</p></div></section>
  <section class="section"><div class="wrap narrow"><p class="eyebrow">THE OFFICIAL DESK</p><h2>Independent, Japan-based.</h2><p>JPNentry is operated by Masato Nishio (西尾 優人) as a sole-proprietor business in Japan, not a separate incorporated company. Our Japan-side sourcing service assists overseas buyers with specific enquiries, subject to supplier authorization and trade requirements.</p>
  <div class="trust-row"><strong>Official email</strong><a href="mailto:${mail}">${mail}</a></div>
  <div class="trust-row"><strong>Non-binding first contact</strong><span>An initial RFQ does not create an order or payment obligation.</span></div>
  <div class="trust-row"><strong>Quote verification</strong><span>We check the exact requirement and quote conditions before requesting approval.</span></div>
  <div class="trust-row"><strong>Payment safety</strong><span>Never send card information by email or through an RFQ form.</span></div>
  <div class="trust-row"><strong>Manufacturer independence</strong><span>No claim of official dealer or manufacturer partnership without evidence.</span></div>
  <div class="trust-row"><strong>Buyer privacy</strong><span>Buyer and supplier documents are handled for the agreed purpose.</span></div>
  <div class="fine-notice"><strong>VERIFY CONTACT DETAILS</strong><p>Confirm the official email and agreed written quote before sending any payment. Sourcing notes and examples should not be interpreted as completed sales unless clearly identified as such.</p></div>
  </div></section>${cta()}</main>`;
  write("trust/index.html",page("Trust & Verification","Verify JPNentry's official contact, RFQ approval and sourcing transparency standards.",trust,"/trust"));
  const legal=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">PRIVACY / TERMS</p><h1>Clear terms.<br>No surprises.</h1><p class="sublead">The policy and service terms published by the original JPNentry site, preserved for the migration preview.</p></div></section>
  <section class="section"><div class="wrap narrow prose"><h2 id="Privacy Policy">Privacy Policy</h2><p>At JPNENTRY, we are committed to protecting your privacy and ensuring the confidentiality of your business information. This policy outlines how we handle your data when you use our services.</p>
  <h3>1. Information We Collect</h3><p>We collect information that you provide directly to us, including your name, email address, and business details. This information is necessary to provide our market entry services and to communicate with you regarding your project.</p>
  <h3>2. Confidentiality and Security</h3><p>Any materials provided by you, including confidential business documents and market research, are treated as strictly confidential. We use these materials solely to perform the agreed-upon project and will not disclose them to any third party without your explicit written consent.</p>
  <h3>3. Data Security</h3><p>We take reasonable measures to protect your data from unauthorized access, disclosure, or loss. Our systems are hosted in secure environments with strict access controls to ensure the integrity of your information.</p>
  <h3>4. Disclosure</h3><p>We may disclose your information in limited circumstances, such as when required by law, or when we believe it is necessary to protect our rights or the rights of others.</p>
  <h3>5. Changes to This Policy</h3><p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting a revised version of this policy on our website.</p>
  <h2 id="Service Terms">Service Terms</h2><p>Standard terms and conditions for all JPNENTRY services.</p>
  <h3>Project Scope</h3><p>Each service is a fixed-scope, one-time project. The scope is defined in the project brief provided upon order request. Scope changes after the initial brief are subject to a revised project fee and timeline.</p>
  <h3>Payments</h3><p>Pricing is fixed and non-subscription based. Payment is processed via Stripe. Card details are never requested by email or form; they are processed directly through Stripe. Payment is due upon order request confirmation.</p>
  <h3>Limitations of Liability</h3><p>JPNENTRY provides commercial research and localization support. We do not provide legal, tax, immigration, licensing, investment, or regulatory advice. No guaranteed revenue, sales, partnerships, or market-entry outcome is guaranteed. All materials are treated as confidential and used solely for the agreed project.</p>
  <h3>Delivery Timelines</h3><p>Delivery timelines are provided in the project brief. We aim to meet these deadlines, but unforeseen circumstances may result in a delay. We will notify you of any significant delays promptly.</p>
  <h3>Refund Policy</h3><p>Refunds are only available if the project scope changes significantly or if the service is canceled before the work begins. No refunds are issued after work has commenced.</p>
  </div></section></main>`;
  write("legal/index.html",page("Legal & Sourcing Terms","JPNentry privacy policy, scope, payments, limits of liability and sourcing service terms.",legal,"/legal"));
  const sampleContent=`Important: this is a fictional illustrative example. It contains no client data and does not claim a completed transaction.
  The buyer's requirement
  An overseas repair business needs two units of a discontinued Japanese OEM component. It sends the manufacturer, exact MPN, a clear nameplate photo, acceptable condition, destination country and the date by which it needs a commercial answer.
  Japan-side verification
  JPNentry checks whether the referenced part number is exact, superseded or potentially incompatible. Current Japan-side routes are reviewed and sellers are contacted where confirmation is required. Old pages, search snippets and unverified marketplace claims are not presented as confirmed supply.
  The commercial answer
  The buyer receives either a Quote or a No-Go. A quote separates product cost, sourcing or verification fee, Japan domestic delivery, agreed inspection, packing, export handling and the status of international freight. Condition, quantity, payment terms and quote validity are written explicitly.
  The buyer approval gate
  The RFQ itself is non-binding. The buyer reviews the evidence and commercial terms. No reservation, purchase or supplier payment occurs until the buyer approves the final scope in writing and the required payment is confirmed.
  After approval
  JPNentry purchases through the agreed route, completes the agreed receiving or inspection steps and coordinates the defined export handover. If availability changes before payment, the quote is revalidated rather than silently substituted.`;
  const articleText=t=>{
   const lines=String(t||"").split(/\r?\n/);let blocks=[],p=[],bullets=[];
   const flush=()=>{if(p.length){blocks.push("<p>"+p.map(h).join(" ")+"</p>");p=[]}if(bullets.length){blocks.push("<ul>"+bullets.map(x=>"<li>"+h(x)+"</li>").join("")+"</ul>");bullets=[]}};
   for(const line0 of lines){const line=line0.trim();if(!line){flush();continue}if(/^([*•-]\s+|\d+\.\s+)/.test(line)){if(p.length)flush();bullets.push(line.replace(/^([*•-]\s+|\d+\.\s+)/,""));continue}if(bullets.length)flush();p.push(line)}
   flush();return blocks.join("\n");
  };
  const makePost=p=>{
   const date=p.date?new Date(p.date).toISOString().slice(0,10):"";
   return `<main><section class="posthero"><div class="wrap narrow"><a class="backlink" href="/blog">← ALL INSIGHTS</a><p class="eyebrow">JAPAN SOURCING / BUYER NOTE ${date?"· "+date:""}</p><h1>${h(p.title)}</h1><p class="sublead">${h(p.description)}</p></div></section>
   <section class="section"><div class="wrap narrow"><article class="prose article-body">${articleText(p.content||p.description)}</article><div class="fine-notice"><strong>SOURCING NOTE</strong><p>Availability, pricing, buyer intent, and outcomes change. Case and example status should be read in the context of this article. Submit a current RFQ for a fresh feasibility check.</p></div><div class="endlink"><a href="/blog" class="text-link">← RETURN TO INSIGHTS</a><a href="${rfq}" class="btn btn-primary" target="_blank" rel="noopener">SEND ONE REQUIREMENT ↗</a></div></div></section></main>`;
  };
  const ids=new Set();
  for(const p of posts){if(!p.slug||ids.has(p.slug))continue;ids.add(p.slug);write("post/"+p.slug+"/index.html",page(p.title,p.description||p.title,makePost(p),"/post/"+encodeURI(p.slug),p.language==="ja"?"ja":"en"))}
  const blogRows=posts.map(p=>`<a class="blog-card" href="/post/${encodeURI(p.slug)}" data-search="${h((p.title+" "+p.description).toLowerCase())}"><span class="eyebrow">${p.date?h(p.date.slice(0,10)):"JAPAN SOURCING"} · JPNENTRY</span><h3>${h(p.title)}</h3><p>${h(p.description)}</p><span class="card-link">READ NOTE ↗</span></a>`).join("");
  const blog=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">INSIGHTS / BUYER GUIDES</p><h1>Evidence over assumptions.</h1><p class="sublead">Practical sourcing notes, buyer checklists and transparent status updates. A live RFQ is not a completed transaction.</p></div></section><section class="section"><div class="wrap"><div class="blog-controls"><span>${posts.length} PUBLISHED NOTES & GUIDES</span><label>SEARCH NOTES <input type="search" id="note-search" placeholder="Model, part number, topic..." aria-label="Search articles"></label></div><div class="blog-grid" id="notes">${blogRows}</div><p class="empty-result" hidden>No matching notes found.</p></div></section>${cta()}</main>`;
  write("blog/index.html",page("Japan Sourcing Notes & Buyer Guides","JPNentry's sourcing notes, verified workflows, buyer guidance and automotive and industrial procurement insights.",blog,"/blog"));
  write("illustrative-sample/index.html",page("Illustrative RFQ Walkthrough: A Discontinued Japanese OEM Part","A clearly fictional example demonstrating JPNentry sourcing and approval steps.",makePost({title:"Illustrative RFQ Walkthrough: A Discontinued Japanese OEM Part",description:"Fictional example for workflow explanation, not a completed transaction.",content:sampleContent}),"/illustrative-sample"));
  write("robots.txt","User-agent: *\nAllow: /\nSitemap: https://www.jpnentry.com/sitemap.xml\n");
  const urls=["/","/ja","/zh-cn","/automotive","/industrial","/vehicles","/trust","/legal","/illustrative-sample","/blog",...Array.from(ids).map(s=>"/post/"+encodeURI(s))];
  write("sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(u=>`<url><loc>https://www.jpnentry.com${u}</loc></url>`).join("")+'</urlset>');
  fs.copyFileSync(path.join(root,"style.css"),path.join(out,"style.css"));
  fs.copyFileSync(path.join(root,"app.js"),path.join(out,"app.js"));
  require("./enhance.cjs")({out,posts,h,rfq,mail,write,page,cta});
  require("./growth.cjs")({out,posts,h,rfq,mail,write,page,cta});
  require("./finalize.cjs")({out,posts,h,rfq,mail,write,page,cta});
  console.log("Built "+urls.length+" routes; preserved "+ids.size+" article URLs.");
}
buildSite();
