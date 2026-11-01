// Final, additive marketing pass. Keep existing routes, lead forms and SEO structure intact.
module.exports = function executionMarketing({out,write,rfq,mail}) {
  const fs = require("node:fs");
  const path = require("node:path");
  function edit(relative, transform) {
    const file = path.join(out,relative);
    const original = fs.readFileSync(file,"utf8");
    const updated = transform(original);
    if(updated === original) throw new Error("Execution marketing made no changes: "+relative);
    write(relative,updated);
  }
  function required(html, before, after, tag) {
    if(!html.includes(before)) throw new Error("Expected "+tag+" anchor missing");
    return html.replace(before,after);
  }
  function seo(html,title,description) {
    const esc = s=>s.replace(/&/g,"&amp;").replace(/"/g,"&quot;");
    html=html.replace(/<title>[^<]*<\/title>/, "<title>"+esc(title)+" | JPNentry</title>");
    html=html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="'+esc(description)+'">');
    html=html.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="'+esc(title)+' | JPNentry">');
    html=html.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="'+esc(description)+'">');
    return html;
  }
  const enExecution = '<section class="section execution-section" id="execution"><div class="wrap">'+
    '<p class="eyebrow">FROM SEARCH TO EXECUTION / BUYER-LED B2B</p>'+
    '<div class="execution-heading"><h2>Finding a supplier is step one.<br><em>Making a trade work is the real job.</em></h2>'+
    '<p>JPNentry works from an actual buyer requirement and coordinates the Japan-side steps that a supplier list alone does not solve. Every transaction depends on validated counterparties, supplier permission, commercial feasibility and written agreement.</p></div>'+
    '<div class="execution-grid">'+
    '<article><span>01 / CONTACT</span><h3>Reach Japanese sellers</h3><p>Japanese-language enquiries, exact product matching, quantity and seller terms. We identify who can actually respond to the brief.</p></article>'+
    '<article><span>02 / NEGOTIATE</span><h3>Clarify the commercial terms</h3><p>Supplier price, availability, lead-time basis, payment conditions, cancellation risk and export restrictions — checked before a firm buyer offer.</p></article>'+
    '<article><span>03 / COORDINATE</span><h3>Bring in specialist partners</h3><p>Where feasible, coordinate suitable inspection, domestic handling and shipping providers. Their costs and scope are confirmed separately.</p></article>'+
    '<article><span>04 / EXECUTE</span><h3>Act only after approval</h3><p>Agree a written scope and quotation, verify payment and only then initiate authorized procurement or a defined third-party service.</p></article>'+
    '</div><div class="execution-actions"><a class="btn btn-primary" href="'+rfq+'" target="_blank" rel="noopener">SEND A LIVE BUYING REQUIREMENT ↗</a><a class="text-link" href="/rfq">WHAT TO INCLUDE IN YOUR RFQ ↗</a></div>'+
    '<p class="execution-disclaimer">Independent Japan-side coordination, not guaranteed stock, manufacturer representation, inspection certification, shipment or transaction success. An initial RFQ is free and non-binding.</p>'+
    '</div></section>';
  const jaExecution = '<section class="section execution-section" id="execution"><div class="wrap">'+
    '<p class="eyebrow">検索だけでは終わらせない / 海外企業の日本側購買支援</p>'+
    '<div class="execution-heading"><h2>仕入先を見つけるだけでなく、<br><em>取引を進めるために動く。</em></h2>'+
    '<p>型番や車両条件を確認し、日本の販売会社への問い合わせ、取引条件の調整、必要に応じた検品・輸送事業者との連絡を支援します。実際の発注は、供給条件と関係法令を確認し、お客様の書面承認を得てから進めます。</p></div>'+
    '<div class="execution-grid">'+
    '<article><span>01 / 照会</span><h3>日本の仕入先へ連絡</h3><p>製品・型番・数量と、実際に対応可能な供給条件を確認。</p></article>'+
    '<article><span>02 / 条件確認</span><h3>価格と取引条件を整理</h3><p>納期、在庫の有無、支払い、キャンセル、輸出制限のリスクを明示。</p></article>'+
    '<article><span>03 / 実務調整</span><h3>必要な専門事業者と連携</h3><p>検品、国内手配、輸送などは対応可能な事業者を確認し、費用を別途提示。</p></article>'+
    '<article><span>04 / 承認後</span><h3>合意した範囲で実行</h3><p>見積内容への書面同意と入金確認後に、適法な仕入・手配を開始。</p></article>'+
    '</div><div class="execution-actions"><a class="btn btn-primary" href="'+rfq+'" target="_blank" rel="noopener">具体的な調達依頼を送る ↗</a><a class="text-link" href="/rfq">依頼前の確認項目 ↗</a></div>'+
    '<p class="execution-disclaimer">当社は独立した調達窓口です。メーカー公認、在庫確保、検品保証、輸出や成約を保証するものではありません。初回の見積相談は無料です。</p>'+
    '</div></section>';
  edit("index.html",html=>{
    html=required(html,"Source in Japan.<br><em>Decide with clarity.</em>","Beyond AI search.<br><em>Real procurement execution.</em>","English homepage heading");
    html=required(html,"Buyer-led sourcing for Japanese automotive parts, industrial components and specialized vehicles. One precise requirement. One commercially grounded answer.",
      "Search tools can identify Japanese suppliers. JPNentry helps international buyers act on real purchasing requirements — direct seller contact, commercial negotiation and coordination with suitable inspection and export partners, subject to verification and written approval.","English hero lead");
    html=required(html,"JAPAN-BASED · BUYER-LED SOURCING","JAPAN-BASED · BUYER-LED TRADE EXECUTION","English hero label");
    html=required(html,'<section class="section method">',enExecution+'<section class="section method">',"English execution section");
    return seo(html,"Japan Procurement Execution | OEM Parts, Industrial MPNs & Vehicles","Beyond AI search: JPNentry coordinates real Japan-side supplier communication, commercial terms, inspection and export partners for buyer-led OEM parts, industrial components and vehicles.");
  });
  edit("ja/index.html",html=>{
    html=required(html,"日本で探す。<br><em>確かめて、提案する。</em>","日本で探して、<br><em>取引まで動く。</em>","Japanese homepage heading");
    html=required(html,"日本車の純正部品、産業機器の部品、特定仕様の車両まで。型番・数量・仕向地を伺い、日本側の実際の調達可否を確認したうえで、見積または対応不可の判断をご案内します。",
      "AIで仕入先を探せる時代だからこそ、日本側で実際に動くことが価値になります。日本車純正部品・産業機器・車両について、仕入先への確認、商談条件の調整、必要な輸出実務の連携を、合意した範囲で進めます。","Japanese hero lead");
    html=required(html,'<section class="section method">',jaExecution+'<section class="section method">',"Japanese execution section");
    return seo(html,"日本側の調達・商談・輸出実務支援","日本の純正自動車部品・産業機器・車両について、仕入先への連絡、取引条件の調整、検品・輸送事業者との連携を支援するJPNentry。");
  });
  const desc={
    "automotive/index.html":"Buyer-backed genuine Japanese automotive parts: actual supplier contact, conditions, quantity, lead time and export checks before any purchase.",
    "industrial/index.html":"Exact Japanese industrial MPNs: direct supplier enquiries, condition checks, price and compliance review, and coordination of logistics where viable.",
    "vehicles/index.html":"One buyer-backed Japan vehicle specification, then condition checks, licensed-importer requirements, commercial agreement and export coordination."
  };
  for(const [file,intro] of Object.entries(desc)){
    edit(file,html=>{
      const section='<aside class="execution-mini"><div class="wrap"><strong>FROM A SEARCH RESULT TO A REAL TRANSACTION</strong><p>'+intro+'</p><a href="/rfq">START WITH ONE COMPLETE BUYING BRIEF ↗</a></div></aside>';
      html=required(html,'<section class="cta-section">',section+'<section class="cta-section">',file+" service conversion");
      return html;
    });
  }
  const css=[
    ".execution-section{background:#e6ebe6;color:#182a28;padding-top:96px;padding-bottom:90px}",
    ".execution-heading{display:grid;grid-template-columns:1.5fr 1fr;align-items:end;gap:50px;margin-bottom:36px}",
    ".execution-heading h2{font-size:clamp(32px,4.6vw,64px);line-height:1.12;letter-spacing:-.035em}",
    ".execution-heading p{font-size:17px;line-height:1.8;color:#4b625d}",
    ".execution-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid #a6b8af;border-left:1px solid #a6b8af}",
    ".execution-grid article{padding:28px 24px 32px;border-right:1px solid #a6b8af;border-bottom:1px solid #a6b8af}",
    ".execution-grid span{display:block;font-size:11px;font-weight:800;letter-spacing:.12em;color:#8b5645}",
    ".execution-grid h3{font-size:21px;line-height:1.25;margin:25px 0 12px}",
    ".execution-grid p{font-size:14px;line-height:1.75;color:#526862}",
    ".execution-actions{display:flex;gap:22px;align-items:center;flex-wrap:wrap;margin-top:28px}",
    ".execution-disclaimer{max-width:840px;color:#5e716b;font-size:12px;line-height:1.7;margin-top:22px}",
    ".execution-mini{background:#172f2b;color:#f5f5f2;padding:28px 0}",
    ".execution-mini .wrap{display:flex;gap:20px;align-items:center;justify-content:space-between;flex-wrap:wrap}",
    ".execution-mini strong{font-size:12px;letter-spacing:.08em}",
    ".execution-mini p{max-width:550px;font-size:14px;line-height:1.7}",
    ".execution-mini a{color:#fff;text-decoration:underline;text-underline-offset:4px;font-weight:700}",
    "@media(max-width:950px){.execution-heading{grid-template-columns:1fr}.execution-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}",
    "@media(max-width:600px){.execution-section{padding-top:65px;padding-bottom:65px}.execution-grid{grid-template-columns:1fr}.execution-grid article{padding:22px}.execution-actions .btn{width:100%;text-align:center}}"
  ].join("\n");
  write("theme.css",fs.readFileSync(path.join(out,"theme.css"),"utf8")+"\n/* Real procurement execution marketing */\n"+css+"\n");
  console.log("Execution marketing pass: English/Japanese home pages, three vertical service pages and CSS.");
};
