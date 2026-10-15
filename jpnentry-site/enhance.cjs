module.exports = function enhanceSite(ctx) {
  const fs = require("node:fs");
  const path = require("node:path");
  const {out, posts, h, rfq, mail, write, page, cta} = ctx;
  const contactMail = `mailto:${mail}`;
  const contentSection = (eyebrow, title, desc, cards=[]) =>
    `<section class="section"><div class="wrap"><div class="section-head"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div><p>${desc}</p></div><div class="service-grid three">${cards.map((c,i)=>`<div class="service-card static"><span class="index">0${i+1} / JAPAN SOURCING</span><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join("")}</div></div></section>`;
  const trustLine = (txt,detail)=>`<div class="trust-row"><strong>${txt}</strong><span>${detail}</span></div>`;
  const buildLanding = ({slug,tag,title,lead,cards,secondTitle,secondDesc,bullets,disclaimer,faq,titleTag,desc,lang="en"}) => {
    const str=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">${tag}</p><h1>${title}</h1><p class="sublead">${lead}</p><div class="subhero-actions">
      <a class="btn btn-primary" href="${rfq}" target="_blank" rel="noopener">SUBMIT ONE BUYING BRIEF ↗</a><a class="btn btn-outline" href="${contactMail}">ASK THE SOURCING DESK ↗</a>
      </div></div></section>${contentSection("01 / BUYER-LED PROCUREMENT", "Specific needs.<br><em>Specific answers.</em>","We are an independent Japanese sourcing desk. Tell us what is difficult to procure; we check the actual source and terms before responding.",cards)}
      <section class="section method"><div class="wrap narrow"><p class="eyebrow">02 / FEASIBILITY</p><h2>${secondTitle}</h2><p class="sublead">${secondDesc}</p><div class="buyer-points">${bullets.map((x,i)=>`<div><b>0${i+1}</b><span>${x}</span></div>`).join("")}</div>
      ${disclaimer?`<div class="fine-notice"><strong>IMPORT / EXPORT NOTE</strong><p>${disclaimer}</p></div>`:""}</div></section>
      ${faq?`<section class="section"><div class="wrap narrow"><p class="eyebrow">COMMON QUESTIONS</p><h2>Before you send an RFQ.</h2>${faq.map(x=>`<details class="faq-item"><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join("")}</div></section>`:""}
      ${cta()}</main>`;
    write(`${slug}/index.html`,page(titleTag||title,desc||lead,str,"/"+slug,lang));
  };

  buildLanding({
    slug:"malaysia",tag:"MALAYSIA / JAPAN AUTOMOTIVE SOURCING",
    title:"Japan-side sourcing.<br><em>Built for Malaysian buyers.</em>",
    lead:"A Japan-based B2B sourcing desk for Malaysian automotive wholesalers, importers, workshops and fleet service operators. Start with one exact part number.",
    cards:[
      ["Toyota & Lexus parts","Japan-market part numbers, genuine references, compatibility and superseded identifiers — subject to actual Japan-side availability."],
      ["Hino, Isuzu & Fuso","Exact commercial-vehicle spare-part enquiries for distributors and workshops. We verify condition, sourcing and required documentation."],
      ["Urgent & hard-to-find","Shortages, unusual specifications and discontinued parts where a second Japan-side search may provide another commercial option."]
    ],
    secondTitle:"Start with an actual <em>purchase requirement.</em>",
    secondDesc:"We do not compete on a generic catalogue. A genuine buyer RFQ lets us test price, availability and the export route before commitments.",
    bullets:["Part number, chassis/VIN context and photos if relevant","Quantity, genuine/OEM condition and acceptable alternatives","Target buying price, currency, deadline and destination in Malaysia","Import permissions and HS classification checked for the exact goods"],
    disclaimer:"New Toyota complete-built vehicles generally require restricted Malaysian Franchise AP arrangements. This page promotes parts sourcing, not unrestricted new-vehicle imports. Certain used or regulated components may also require approvals.",
    faq:[
      ["Can you offer an immediate wholesale catalogue?","We do not advertise unverified stock. We work from exact buyer requirements and confirm a legitimate Japan-side source before issuing a quotation."],
      ["Can Malaysian importers submit several OEM references?","Yes. Please include part numbers, quantities and required specifications. The quotation will state which lines are available and on what terms."],
      ["Do you ship complete new Toyota vehicles to Malaysia?","Not as an unrestricted offer. Malaysian new-vehicle import and franchise permissions must be confirmed through authorized channels before any proposal."]
    ],
    titleTag:"Japanese OEM Auto Parts for Malaysia | Toyota, Hino & Lexus RFQs",
    desc:"Japan-based B2B procurement for Malaysian distributors: exact Toyota, Lexus, Hino, Isuzu and Fuso part references. Submit one RFQ for source and export feasibility."
  });

  buildLanding({
    slug:"toyota-lexus-parts",tag:"TOYOTA / LEXUS / EXACT OEM REFERENCES",
    title:"The right reference.<br><em>Not just a similar part.</em>",
    lead:"Genuine and OEM-specified Japanese vehicle components for international wholesalers, workshops and importers.",
    cards:[
      ["Exact part matching","Submit OEM reference, chassis/model code, grade and production year. We check whether the part is an exact match or a superseded reference."],
      ["Japan domestic checks","Potential availability, new/unused condition, provenance and supplier terms are checked before an offer is described as confirmed."],
      ["Trade-ready decisions","Buyers receive a clear quotation scope, payment conditions and export feasibility — or a documented no-go."]
    ],
    secondTitle:"Send an <em>accurate parts brief.</em>",secondDesc:"A precise part reference minimizes costly substitutions and shipping errors.",
    bullets:["Genuine OEM number and quantity","Vehicle code / VIN where legally and operationally appropriate","Target budget and destination country","Condition requirements, needed date and documentation"],
    disclaimer:"Manufacturer names identify the item category. JPNentry is independent and is not an official Toyota or Lexus dealer or appointed distributor.",
    faq:[
      ["Can you guarantee OEM authenticity?","We confirm the source and supporting documents in each verified quotation; no blanket authenticity guarantee is made for unexamined goods."],
      ["Can you source discontinued references?","We can investigate original and superseded identifiers. Availability and condition must be confirmed for each RFQ."]
    ],
    titleTag:"Toyota & Lexus Genuine Parts Sourcing from Japan",
    desc:"Send Toyota or Lexus exact OEM part numbers for buyer-led sourcing and verification in Japan. Independent parts sourcing, no invented stock claims."
  });

  buildLanding({
    slug:"commercial-parts",tag:"COMMERCIAL VEHICLES / JAPAN SOURCING",
    title:"Keep fleets moving.<br><em>Start with the part.</em>",
    lead:"Japan-side verification for hard-to-find spare parts for commercial vehicles and maintenance operations.",
    cards:[
      ["Hino & Isuzu","Commercial-vehicle references, exact part numbers and supplier availability checks for specific maintenance requirements."],
      ["Mitsubishi Fuso","Parts enquiries with precise vehicle and component context, including export-model differences and replacement references."],
      ["Repair network RFQs","For distributors, workshops and fleets managing backorders and urgent replacements requiring verified documentation."]
    ],
    secondTitle:"Quote from a <em>real requirement.</em>",secondDesc:"Avoid sourcing by vehicle name alone: exact component compatibility matters.",
    bullets:["Brand, model and chassis information","Part number / original label photo","Number of units, condition and acceptable replacements","Target FOB/CIF terms and deadline"],
    disclaimer:"Actual source, seller authorization, export controls, classification, origin and destination-country import requirements are checked case by case.",
    titleTag:"Hino, Isuzu & Fuso Parts Sourcing from Japan",
    desc:"Japan commercial vehicle parts sourcing for Hino, Isuzu and Mitsubishi Fuso: exact part RFQs, verified condition, lead time and export feasibility."
  });

  buildLanding({
    slug:"industrial-automation",tag:"INDUSTRIAL MPN / CONTROLS",
    title:"Exact machine components.<br><em>No guessing.</em>",
    lead:"Japan-based sourcing verification for industrial automation parts, legacy control equipment and measurement devices.",
    cards:[
      ["Industrial control","Specific Mitsubishi Electric, Omron, Yaskawa and FANUC part numbers, subject to lawful supply and seller conditions."],
      ["Discontinued MPNs","Availability and declared condition for obsolete or hard-to-find models that interrupt maintenance operations."],
      ["Precision instruments","Manufacturer model and accessory combinations, warranty status and cross-border logistics feasibility."]
    ],
    secondTitle:"One line can stop <em>a production line.</em>",
    secondDesc:"We work from exact MPNs. The sourceability check precedes any commercial commitment.",
    bullets:["Exact manufacturer part/model number (MPN)","Quantity, new/unused/surplus condition requirement","Country of use, end user and intended application","Target purchasing price and deadline"],
    disclaimer:"Some industrial and electronic items may require Japanese export-control checks, end-use/end-user screening and supplier authorization.",
    titleTag:"Japanese Industrial Automation Parts | Exact MPN Procurement",
    desc:"Source difficult Japanese industrial control and measurement MPNs with Japan-side verification and clear quote or no-go."
  });

  const contactBody=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">CONTACT / SOURCING DESK</p><h1>One clear brief.<br><em>One Japan-side desk.</em></h1><p class="sublead">Choose a non-binding RFQ or email us directly. Please include an exact product reference, model code or vehicle specification.</p></div></section>
    <section class="section"><div class="wrap contact-grid"><div class="contact-panel">
    <p class="eyebrow">BUYERS / RFQ</p><h2>Submit a buying brief.</h2><p>Our existing Jotform securely collects your part number or vehicle requirement, quantity, destination and contact preferences. Sending the form does not order or reserve any goods.</p>
    <a class="btn btn-primary" href="${rfq}" target="_blank" rel="noopener">OPEN NON-BINDING RFQ ↗</a><p class="mini-annotation">External form · No payment required to submit an initial enquiry.</p></div>
    <div class="contact-panel contact-secondary"><p class="eyebrow">DIRECT CONTACT</p><h2>Email the desk.</h2>
    <p>For purchasing teams, importer enquiries and sourcing partnership introductions.</p><a class="contact-email" href="${contactMail}">${mail}</a>
    <p class="mini-annotation">For faster assessment, include exact reference, quantity, condition, destination and target buy level. Do not email payment-card information.</p></div></div>
    <div class="wrap"><div class="fine-notice"><strong>BEFORE WE COMMIT</strong><p>No vehicle or parts purchase, reservation, bid or shipment is confirmed until actual sourceability, seller and export terms, and buyer's written approval are established.</p></div></div></section></main>`;
  write("contact/index.html",page("Contact JPNentry | Japan Sourcing RFQ","Request a verified Japan-side quote or no-go for genuine auto parts, industrial MPNs or specific vehicle briefs. Official email jpnentry.sales@gmail.com.",contactBody,"/contact"));

  const aboutBody=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">ABOUT / INDEPENDENT JAPAN DESK</p><h1>A practical bridge<br><em>to Japanese supply.</em></h1><p class="sublead">JPNentry coordinates exact buyer requirements with potential Japan-side suppliers and procurement partners. We verify commercial realities before buyers commit.</p></div></section>
  <section class="section"><div class="wrap narrow prose"><p class="eyebrow">WHAT JPNENTRY IS</p><h2>Independent. Buyer-led. Evidence-first.</h2>
  <p>JPNentry is operated by Masato Nishio as a sole-proprietor business based in Japan. Our work is organized around the exact item the buyer needs rather than a generic product catalogue. We assess potential availability and supplier terms and coordinate an agreed Japan-side scope.</p>
  <p>Our automotive sourcing network includes a Kobe-based procurement partner for exploring legitimate supply options. This relationship does not create manufacturer dealership status, guaranteed allocation or a right to export vehicles that are contractually restricted.</p>
  <h2>What we can—and cannot—promise.</h2><p>We can examine precise specifications, request supplier evidence and provide a documented commercial response where feasible. We cannot promise inventory, price, warranty, shipping or regulatory permission without checking a specific live order.</p>
  <div class="trust-row"><strong>Operator</strong><span>Masato Nishio / 西尾 優人</span></div>
  <div class="trust-row"><strong>Business status</strong><span>Japan-based sole proprietor (not a separate incorporated company)</span></div>
  <div class="trust-row"><strong>Official email</strong><a href="${contactMail}">${mail}</a></div>
  <div class="trust-row"><strong>Buyer commitment</strong><span>No purchase before written approval and agreed payment.</span></div>
  </div></section>${cta()}</main>`;
  write("about/index.html",page("About JPNentry | Independent Japan Procurement Desk","JPNentry is an independent Japan sourcing and verification desk operated by Masato Nishio, working from exact buyer specifications.",aboutBody,"/about"));

  const faqList=[
    ["Can you supply stock immediately?","We first check each exact requirement. Public website descriptions are capabilities, not claims of ready-to-ship inventory."],
    ["Is the first sourcing RFQ binding?","No. An initial RFQ is a request for assessment. A formal quotation and written approval precede any purchase."],
    ["Do you represent Toyota, Lexus, Omron or any other manufacturer?","No manufacturer authorization is implied. Brand names are used to identify product categories and part references."],
    ["Can you export brand-new Toyota vehicles from Japan?","Only if a legitimate seller permits the transaction and the destination has a compliant import route. No allocation, export rights or delivery is assumed."],
    ["Does Malaysia allow any new imported Toyota vehicle?","New complete-built vehicles may require manufacturer/franchise-related import permits. A buyer's permit and valid compliant transaction chain must be independently verified."],
    ["How is a quote priced?","The written quote identifies item cost, agreed sourcing/verification work, domestic logistics, inspection, packing and the scope of international transport. Taxes and destination clearance are clarified case by case."],
    ["How do you confirm genuine parts?","We evaluate supplier identity and available documentation against the precise part reference. The level of verification and any limitations are included in the final offer."],
    ["How are personal and RFQ details used?","Details are used to assess and coordinate the stated sourcing enquiry. Refer to our Privacy Policy for the current published terms."],
    ["What happens when an exact part is unavailable?","We issue a clear no-go or discuss permitted alternatives. Substitutions are never made without buyer approval."],
    ["What do you need from me?","MPN or OEM number, quantity, condition, destination, deadline and target buy price. Vehicle requests should include exact grade and import-document requirements."]
  ];
  const faqHtml=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">HELP / BUYER FAQ</p><h1>Clear answers.<br><em>Before you buy.</em></h1><p class="sublead">Trade, sourcing, verification and buyer approval — explained without a sales promise.</p></div></section>
  <section class="section"><div class="wrap narrow">${faqList.map(([q,a])=>`<details class="faq-item"><summary>${h(q)}</summary><p>${h(a)}</p></details>`).join("")}
  <div class="fine-notice"><strong>LEGAL AND TRADE CHECKS</strong><p>Regulations and contract permissions depend on the exact part, seller and destination. We are not a law or customs advisory firm; qualified parties should validate applicable requirements.</p></div></div></section>${cta()}</main>`;
  write("faq/index.html",page("Sourcing FAQ | Japan Auto Parts, Vehicles & Industrial MPNs","Practical buyer FAQs covering exact RFQs, verified Japan sourcing, manufacturer authorization, import restrictions and payment approval.",faqHtml,"/faq"));

  const jaLanding=[
    {slug:"ja/automotive",title:"日本車の純正部品を、型番から調査。",tag:"日本車部品 / 海外卸向け",lead:"Toyota・Lexus・Hino・Isuzuなどの純正部品、欠品・入手困難品について、日本国内の調達可否を一件ずつ確認します。",points:[
      ["純正・OEM指定品","純正品番、車台情報、適合条件を確認します。"],["欠品・旧型品","国内の調達候補と商品の状態を個別に検証します。"],["BtoB輸出","海外の卸・整備事業者向けに数量・希望価格・納期を確認します。"]]},
    {slug:"ja/industrial",title:"日本の産業部品を、正確な型番から。",tag:"産業機器 / 保守・交換部品",lead:"制御機器・計測器・生産終了品など、海外の購買部門が必要とする型番指定品の調達可能性を検証します。",points:[
      ["型番重視","メーカー、MPN、数量、状態を確認します。"],["生産終了部品","旧モデル・代替品の候補を調べます。"],["見積の透明性","供給可能性、書類、輸出条件、見積有効期限を明示します。"]]},
    {slug:"ja/vehicles",title:"新車・特定車両の輸出は、合法な商流を確認してから。",tag:"車両調達 / 海外ディーラー向け",lead:"神戸の自動車調達ネットワークと連携し、車種・グレード・希望価格を基に検証します。日本の販売契約と輸入国の許可を確認するまで供給を確約しません。",points:[
      ["車両条件を確認","グレード、年式、仕様、台数、希望FOB価格を取得。"],["調達権限の確認","販売店が輸出目的の販売を認めるか事前確認。"],["現地輸入の適法性","AP等の許可や登録条件を相手国の専門業者と確認。"]]}
  ];
  for(const j of jaLanding){
    const html=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">${j.tag}</p><h1>${j.title}</h1><p class="sublead">${j.lead}</p><div class="subhero-actions"><a class="btn btn-primary" href="${rfq}" target="_blank" rel="noopener">型番・仕様で見積依頼 ↗</a><a class="btn btn-outline" href="${contactMail}">メールで相談 ↗</a></div></div></section>
    <section class="section"><div class="wrap"><div class="section-head"><div><p class="eyebrow">JAPAN SOURCING DESK</p><h2>確認してから、<br><em>ご提案します。</em></h2></div><p>最初の問い合わせで発注や仕入れが確定することはありません。実際に調達できる経路と条件を確認します。</p></div><div class="service-grid three">${j.points.map((p,i)=>`<div class="service-card static"><span class="index">0${i+1}</span><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join("")}</div></div></section>${cta("具体的な依頼から始めましょう。","型番・数量・希望納期・仕向地を共有してください。")}</main>`;
    write(`${j.slug}/index.html`,page(j.title,j.lead,html,"/"+j.slug,"ja"));
  }
  const languageHomes=[
    {slug:"ms",lang:"ms",title:"Dapatkan alat ganti Jepun yang tepat.",title2:"Semak sumber. Dapatkan jawapan yang jelas.",lead:"JPNentry ialah meja penyumberan bebas yang berpangkalan di Jepun. Kami menyemak alat ganti automotif tulen, komponen industri dan keperluan kenderaan tertentu berdasarkan butiran pembeli.",label:"MALAYSIA / PENYUMBERAN B2B",cards:[["Alat ganti automotif Jepun","Toyota, Lexus, Hino, Isuzu dan alat ganti berdasarkan nombor OEM tertentu."],["Komponen industri","Komponen kawalan, alat pengukuran serta nombor model yang sukar diperoleh."],["Sumber kenderaan","Semakan keperluan kenderaan tertakluk kepada kebenaran penjual dan peraturan import negara destinasi."]],button:"HANTAR PERMINTAAN HARGA",caption:"Permintaan awal tidak mengikat. Tiada pembelian dibuat tanpa persetujuan bertulis dan pembayaran yang dipersetujui."},
    {slug:"id",lang:"id",title:"Temukan suku cadang Jepang yang tepat.",title2:"Verifikasi sumber sebelum membeli.",lead:"JPNentry adalah layanan pencarian sumber independen berbasis Jepang. Kami memeriksa ketersediaan suku cadang kendaraan Jepang, komponen industri, dan kebutuhan kendaraan berdasarkan spesifikasi pembeli.",label:"INDONESIA / SUMBER B2B",cards:[["Suku cadang otomotif","Nomor OEM Toyota, Lexus, Isuzu, Hino, dan suku cadang tertentu."],["Komponen industri","Model kontrol, instrumen, dan komponen lama yang sulit didapat."],["Kendaraan khusus","Pemeriksaan legalitas ekspor dan persyaratan impor sebelum penawaran."]],button:"KIRIM PERMINTAAN PENAWARAN",caption:"Permintaan awal tidak mengikat dan bukan pesanan. Pembelian dilakukan setelah persetujuan tertulis dan pembayaran yang disepakati."},
    {slug:"zh-cn",lang:"zh-Hans",title:"寻找准确的日本零部件。",title2:"先核实渠道，再决定采购。",lead:"JPNentry是一家位于日本的独立采购协助服务。我们根据采购商的具体型号、原厂零件编号及目的地，核实汽车零部件、工业设备和特定车辆的供应可能性。",label:"日本采购 / 企业询价",cards:[["日本汽车零部件","丰田、雷克萨斯、日野、五十铃等准确OEM零件编号的采购调查。"],["工业零部件","控制设备、测量仪器及停产型号的供应渠道核实。"],["特定车辆采购","必须先确认销售方出口许可及目的地进口规定，不保证现货或交期。"]],button:"提交询价需求",caption:"初步询价不构成订单。未经书面确认和付款，不会代为采购。"},
    {slug:"zh-tw",lang:"zh-Hant",title:"找到正確的日本零件。",title2:"先確認供應，再安排採購。",lead:"JPNentry是位於日本的獨立採購協助服務。我們根據買方提供的料號、規格與目的地，查核汽車零件、工業設備與特定車輛的供應可能性。",label:"日本採購 / 企業詢價",cards:[["日本汽車零件","Toyota、Lexus、Hino、Isuzu等特定OEM料號的供應調查。"],["工業零組件","控制設備、測量儀器以及停產型號的查核。"],["特定車輛採購","須事先確認賣方出口許可與目的地進口法規，不保證現貨或交期。"]],button:"提交採購詢價",caption:"初步詢價不構成訂單，未經書面同意及確認付款前不會購買。"}
  ];
  for(const l of languageHomes){
    const html=`<main><section class="subhero localized-hero"><div class="wrap"><p class="eyebrow">${l.label}</p><h1>${l.title}<br><em>${l.title2}</em></h1><p class="sublead">${l.lead}</p><div class="subhero-actions"><a class="btn btn-primary" href="${rfq}" target="_blank" rel="noopener">${l.button} ↗</a><a class="btn btn-outline" href="${contactMail}">${mail} ↗</a></div></div></section>
    <section class="section"><div class="wrap"><div class="service-grid three">${l.cards.map((p,i)=>`<div class="service-card static"><span class="index">0${i+1} / JPNENTRY</span><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join("")}</div><div class="fine-notice"><strong>NOTICE</strong><p>${l.caption}</p></div></div></section></main>`;
    write(`${l.slug}/index.html`,page(l.title,l.lead,html,"/"+l.slug,l.lang));
  }

  const featured=posts.slice(0,3).map(p=>`<a href="/post/${encodeURI(p.slug)}"><span class="eyebrow">SOURCING NOTE · ${h(p.date.slice(0,10))}</span><strong>${h(p.title)}</strong><span>READ NOTE ↗</span></a>`).join("");
  const homepageFile=path.join(out,"index.html");
  let home=fs.readFileSync(homepageFile,"utf8");
  const insert=`<section class="section focus-section"><div class="wrap">
   <div class="section-head"><div><p class="eyebrow">04 / FOR BUYING TEAMS</p><h2>Built for the<br><em>exact requirement.</em></h2></div><p>We do not sell a list of unverified inventory. Each buyer enquiry starts with exact identifiers and a commercial feasibility check.</p></div>
   <div class="focus-grid"><a href="/malaysia"><span>01 / MALAYSIA</span><h3>Automotive sourcing for Malaysian distributors</h3><p>Send Toyota, Lexus and commercial vehicle parts RFQs.</p><b>EXPLORE MALAYSIA DESK ↗</b></a>
   <a href="/toyota-lexus-parts"><span>02 / GENUINE REFERENCES</span><h3>Hard-to-find Toyota & Lexus components</h3><p>Part-number-led enquiries, without stock claims.</p><b>EXPLORE PARTS DESK ↗</b></a>
   <a href="/industrial-automation"><span>03 / INDUSTRIAL PURCHASING</span><h3>Exact Japanese industrial MPNs</h3><p>Sourceability checks for control and maintenance parts.</p><b>EXPLORE INDUSTRIAL DESK ↗</b></a>
   </div></div></section>
   <section class="section news-section"><div class="wrap"><div class="section-head"><div><p class="eyebrow">05 / DOCUMENTED NOTES</p><h2>Read what we<br><em>are checking.</em></h2></div><p>Live enquiries, methods and buyer guides. Examples are clearly distinguished from completed transactions.</p></div>
   <div class="news-row">${featured}</div><a class="text-link" href="/blog">SEE ALL BUYER GUIDES & NOTES ↗</a></div></section>`;
  home=home.replace("</main>",insert+"</main>");
  write("index.html",home);


  const topicGroups=[
    ["ghost-stock","Ghost Stock / Hard-to-Find Parts",["discontinued","obsolete","hard-to-find","ghost stock","legacy"]],
    ["trust-process","Trust, Verification & Policies",["trust","evidence","transparency","verify","verification","payment","contact preferences","faq","policy","commercial"]],
    ["start-here","Getting Started with JPNentry",["how to","submit","faq","about","start","read a","checklist","sourcing"]],
    ["vehicle-sourcing","Vehicle Procurement",["vehicle","car ","toyota","auction","fleet","automotive"]],
    ["taiwan-oem-parts-sourcing","Taiwan Japanese OEM Parts",["taiwan","台灣","台北","繁體","oem"]],
    ["industrial-automation","Industrial Automation",["industrial","automation","omron","mitsubishi","yaskawa","hioki","fanuc"]],
    ["genuine-auto-parts","Genuine Japanese Auto Parts",["genuine","toyota","lexus","oem","auto parts","nissan","hino","isuzu"]],
    ["ev-batteries","EV Battery Sourcing",["battery","ev ","leaf","hybrid","高壓"]],
    ["live-rfq","Live RFQ Notes",["live rfq","live sourcing","wholesale rfq","rfq note"]]
  ];
  for(const [slug,title,terms] of topicGroups){
    const selected=posts.filter(p=>terms.some(term=>(p.title+" "+p.description).toLowerCase().includes(term))).slice(0,42);
    const cards=selected.map(p=>'<a class="blog-card" href="/post/'+encodeURI(p.slug)+'"><span class="eyebrow">JPNENTRY / SOURCING NOTE</span><h3>'+h(p.title)+'</h3><p>'+h(p.description)+'</p><span class="card-link">READ NOTE ↗</span></a>').join("");
    const section='<main><section class="subhero"><div class="wrap"><p class="eyebrow">JPNENTRY / TOPIC INDEX</p><h1>'+h(title)+'</h1><p class="sublead">A curated index of published sourcing notes and guides. Live enquiries do not represent completed orders.</p></div></section><section class="section"><div class="wrap"><div class="blog-grid">'+cards+'</div><div class="endlink"><a class="text-link" href="/blog">← BROWSE ALL BUYER NOTES</a><a class="btn btn-primary" href="'+rfq+'" target="_blank" rel="noopener">SEND EXACT RFQ ↗</a></div></div></section></main>';
    write("blog/categories/"+slug+"/index.html",page(title,"Buyer-facing notes and practical JPNentry sourcing guidance.",section,"/blog/categories/"+slug));
  }
  const jpPosts=posts.filter(p=>p.language==="ja"||/[\u3040-\u30ff]/.test(p.title)).slice(0,45);
  const jpBlog='<main><section class="subhero"><div class="wrap"><p class="eyebrow">日本語 / 記事一覧</p><h1>日本から世界へ。<br><em>調達の記録と解説。</em></h1><p class="sublead">JPNentryの国内調達、海外営業、見積実務に関する公開記事をご覧いただけます。</p></div></section><section class="section"><div class="wrap"><div class="blog-grid">'+jpPosts.map(p=>'<a class="blog-card" href="/post/'+encodeURI(p.slug)+'"><span class="eyebrow">JPNENTRY NOTE</span><h3>'+h(p.title)+'</h3><p>'+h(p.description)+'</p><span class="card-link">記事を読む ↗</span></a>').join("")+'</div><p class="mini-annotation">英語を含む全記事は<a href="/blog">こちら</a>で確認できます。</p></div></section></main>';
  write("ja/blog/index.html",page("JPNentry 日本語記事一覧","日本国内の調達と国際取引に関するJPNentryの記事一覧。",jpBlog,"/ja/blog","ja"));
  const jpLegal='<main><section class="subhero"><div class="wrap"><p class="eyebrow">ご利用条件 / 個人情報</p><h1>取引の透明性を<br><em>大切にします。</em></h1><p class="sublead">JPNentryへの初回見積依頼は発注ではありません。正式な見積、取引条件、書面による承認、必要な入金確認を経て調達を開始します。</p></div></section><section class="section"><div class="wrap narrow prose"><h2>個人情報について</h2><p>お問い合わせ時にいただく氏名・メールアドレス・企業情報・製品情報は、依頼内容の確認とご連絡、合意した業務に必要な範囲で取り扱います。</p><h2>見積と決済について</h2><p>供給価格、手数料、納期、輸出条件は、個別見積でご提示します。初回問い合わせのみで課金や仕入れは行いません。カード情報をメールで送らないでください。</p><h2>正式なご利用条件</h2><p>こちらは日本語のご案内です。詳細は<a href="/legal">英語版のプライバシーポリシーと利用条件</a>をご確認ください。契約時は当該取引の書面条件を優先します。</p></div></section></main>';
  write("ja/legal/index.html",page("JPNentry ご利用条件・個人情報保護","初回見積、商談条件、個人情報取扱いに関するJPNentryの日本語案内。",jpLegal,"/ja/legal","ja"));
  const plainToHtml=(text)=>{
    const lines=String(text||"").split(/\r?\n/).map(s=>s.trim());
    let html=[],bullets=[];
    const closeList=()=>{if(bullets.length){html.push("<ul>"+bullets.map(s=>"<li>"+h(s)+"</li>").join("")+"</ul>");bullets=[]}};
    for(let i=0;i<lines.length;i++){
      const line=lines[i];
      if(!line){closeList();continue;}
      const bullet=line.match(/^(?:[*•-]\s+|\d+[.)]\s+)(.*)/);
      if(bullet){bullets.push(bullet[1]);continue;}
      closeList();
      const next=(lines.slice(i+1).find(s=>s)||"");
      const looksLikeHeading=line.length<=90&&!/[.!?。！？;；]$/.test(line)&&
        (i===0 || /^(?:what|why|how|status|scope|before|after|the |key |part |buyer|sourcing|verification|notes|next |重要|確認|取引|ご案内|料金|見積|輸出|調達|まとめ|注意|目的|背景)/i.test(line) ||
         (/^[A-Z][^:]+:$/.test(line)) || next.startsWith("• ") || next.startsWith("* "));
      html.push(looksLikeHeading?"<h2>"+h(line)+"</h2>":"<p>"+h(line)+"</p>");
    }
    closeList();
    return html.join("\n");
  };

  const supportedLocales=[["en","/","EN"],["ja","/ja","日本語"],["ms","/ms","Bahasa Melayu"],["id","/id","Bahasa Indonesia"],["zh-Hans","/zh-cn","简体中文"],["zh-Hant","/zh-tw","繁體中文"]];
  const switcher=(lang)=>`<details class="lang-menu"><summary aria-label="Choose language">${lang==="ja"?"日本語":lang==="ms"?"BM":lang==="id"?"ID":lang==="zh-Hans"?"中文":lang==="zh-Hant"?"繁中":"EN"} <span aria-hidden="true">⌄</span></summary><div class="lang-options">${supportedLocales.map(([l,u,label])=>`<a href="${u}" lang="${l}" ${l===lang?'aria-current="page"':''}>${label}</a>`).join("")}</div></details>`;
  const businessSchema={
    "@context":"https://schema.org","@type":"Organization",
    "name":"JPNentry","url":"https://www.jpnentry.com/",
    "email":mail,
    "description":"Independent Japan sourcing and verification for exact automotive OEM references, industrial MPNs and specialized vehicle procurement requirements.",
    "founder":{"@type":"Person","name":"Masato Nishio"},
    "areaServed":"Worldwide",
    "contactPoint":{"@type":"ContactPoint","contactType":"sales","email":mail,"availableLanguage":["English","Japanese"]}
  };
  const articleSlugOf=x=>x.match(/\/post\/(.+)\/index\.html$/)?.[1];
  const filepaths=[];
  const walk=d=>{for(const f of fs.readdirSync(d,{withFileTypes:true})){const full=path.join(d,f.name);if(f.isDirectory())walk(full);else if(full.endsWith(".html"))filepaths.push(full)}};
  walk(out);
  for(const f of filepaths){
    let html=fs.readFileSync(f,"utf8");
    const rel=path.relative(out,f).replace(/\\/g,"/");
    const lang=html.match(/<html lang="([^"]+)"/)?.[1]||"en";
    const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]||"https://www.jpnentry.com/";
    const navOptions=switcher(lang);
    html=html.replace(/<a class="lang" href="[^"]+">[^<]+<\/a>/,navOptions);
    html=html.replace('<nav class="main-nav"','<nav id="primary-nav" class="main-nav"');
    html=html.replace(/<button class="menu-toggle" aria-label="Toggle navigation" onclick="document.body.classList.toggle\('menu-open'\)">☰<\/button>/,
      '<button class="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Open navigation">☰</button>');
    html=html.replace('<body>','<body><a href="#main-content" class="skip-link">Skip to content</a>');
    html=html.replace("<main>","<main id=\"main-content\">");
    html=html.replace('<div class="footer-bottom">','<div class="footer-bottom">');
    const footAdd=`<a href="/about">About us</a><a href="/faq">FAQ</a><a href="/contact">Contact</a><a href="/malaysia">Malaysia desk</a>`;
    html=html.replace('<a href="/trust">Trust & verification</a>','<a href="/trust">Trust & verification</a>'+footAdd);
    if(lang==="ja"){
      html=html.replace(/<a class="btn btn-small" href="([^"]+)" target="_blank" rel="noopener">SEND RFQ/g,
        '<a class="btn btn-small" href="$1" target="_blank" rel="noopener">見積依頼');
    }
    let obj={...businessSchema};
    let additional="";
    if(rel.startsWith("post/")){
      const slug=articleSlugOf("/"+rel);
      const p=posts.find(x=>x.slug===slug);
      if(p){
        html=html.replace(/<article class="prose article-body">[\s\S]*?<\/article>/, '<article class="prose article-body">'+plainToHtml(p.content||p.description)+'</article>');
        obj={"@context":"https://schema.org","@type":"Article","headline":p.title,"description":p.description,"datePublished":p.date,"author":{"@type":"Organization","name":"JPNentry"},"publisher":{"@type":"Organization","name":"JPNentry"},"mainEntityOfPage":canonical};
      }
    }
    if(rel==="faq/index.html"){
      additional=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqList.map(x=>({"@type":"Question","name":x[0],"acceptedAnswer":{"@type":"Answer","text":x[1]}}))})}</script>`;
    }
    if(["index.html","ja/index.html","ms/index.html","id/index.html","zh-cn/index.html","zh-tw/index.html"].includes(rel)){
      additional+=supportedLocales.map(([ll,uri])=>`<link rel="alternate" hreflang="${ll}" href="https://www.jpnentry.com${uri}">`).join("")+
        '<link rel="alternate" hreflang="x-default" href="https://www.jpnentry.com/">';
    }
    html=html.replace('</head>',`<meta name="robots" content="index, follow">
    <meta name="twitter:card" content="summary"><meta property="og:url" content="${canonical}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/extra.css">
    <script type="application/ld+json">${JSON.stringify(obj)}</script>${additional}</head>`);
    if(!html.includes(`mailto:${mail}`))throw Error("Contact email missing: "+rel);
    write(rel,html);
  }

  fs.copyFileSync(path.join(__dirname,"extra.css"),path.join(out,"extra.css"));
  write("favicon.svg",`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="#111b25"/><path d="M35 14v30q0 8-9 8-7 0-12-5l5-7q3 3 6 3 2 0 2-3V14z" fill="#f6f5ef"/><circle cx="45" cy="45" r="5" fill="#e45d35"/></svg>`);
  write("robots.txt","User-agent: *\nAllow: /\nSitemap: https://www.jpnentry.com/sitemap.xml\n");
  const routes=filepaths.map(f=>{
    const name=path.relative(out,f).replace(/\\/g,"/").replace(/index\.html$/,"").replace(/\/$/,"");
    return name?"/"+name:"/";
  });
  const unique=[...new Set(routes)];
  const sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+
    unique.map(u=>`<url><loc>https://www.jpnentry.com${u}</loc></url>`).join("")+"</urlset>";
  write("sitemap.xml",sitemap);
  console.log("Enhanced "+filepaths.length+" pages. Unique routes: "+unique.length);
};
