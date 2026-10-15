module.exports = function growthUpgrade(ctx){
 const fs=require("node:fs"), path=require("node:path");
 const {out,posts,h,rfq,mail,write,page}=ctx;
 const origin="https://www.jpnentry.com";
 const local={
  ms:{root:"ms",lang:"ms",name:"Bahasa Melayu",nav:["Alat ganti","Industri","Kenderaan","Mengenai kami","Hubungi"],cta:"HANTAR RFQ",home:"Laman Utama",sub:"Semak keperluan sebenar, bukan katalog andaian.",legal:"Semakan awal tidak mengikat; tiada pembelian sebelum persetujuan bertulis dan bayaran disahkan.",brand:"Perkhidmatan penyumberan bebas dari Jepun",copy:"Salin senarai RFQ",copyDone:"Senarai disalin",contact:"E-mel kepada pasukan kami",rfqName:"Permintaan harga",trust:"Pengesahan & kepercayaan"},
  id:{root:"id",lang:"id",name:"Bahasa Indonesia",nav:["Suku cadang","Industri","Kendaraan","Tentang kami","Hubungi"],cta:"KIRIM RFQ",home:"Beranda",sub:"Periksa kebutuhan pembeli yang jelas, bukan katalog yang belum diverifikasi.",legal:"Permintaan awal tidak mengikat; pembelian hanya setelah persetujuan tertulis dan pembayaran dikonfirmasi.",brand:"Layanan pencarian sumber independen dari Jepang",copy:"Salin daftar RFQ",copyDone:"Daftar disalin",contact:"Email tim kami",rfqName:"Permintaan penawaran",trust:"Verifikasi & kepercayaan"},
  "zh-Hans":{root:"zh-cn",lang:"zh-Hans",name:"简体中文",nav:["汽车零件","工业零部件","车辆采购","关于我们","联系"],cta:"提交询价",home:"首页",sub:"以真实采购需求为起点，不展示未经核实的库存。",legal:"初步询价不构成订单；未经书面确认及付款，不会进行采购。",brand:"日本独立采购与核验服务",copy:"复制询价清单",copyDone:"已复制",contact:"发送电子邮件",rfqName:"采购询价",trust:"诚信与验证"},
  "zh-Hant":{root:"zh-tw",lang:"zh-Hant",name:"繁體中文",nav:["汽車零件","工業零件","車輛採購","關於我們","聯絡"],cta:"提交詢價",home:"首頁",sub:"以實際採購需求為起點，不宣稱未經查核的庫存。",legal:"初步詢價不構成訂單；未經書面確認與付款前不會採購。",brand:"日本獨立採購與核驗服務",copy:"複製詢價清單",copyDone:"已複製",contact:"寄送電子郵件",rfqName:"採購詢價",trust:"信任與驗證"}
 };
 const def={
  ms:{
   automotive:{eyebrow:"MALAYSIA / ALAT GANTI JEPUN",title:"Alat ganti Jepun.<br><em>Disemak mengikut nombor OEM.</em>",lead:"Untuk pengedar, bengkel dan pengimport Malaysia. Hantar nombor alat ganti Toyota, Lexus, Hino, Isuzu atau Mitsubishi Fuso bagi semakan sumber sebenar di Jepun.",items:[["Nombor alat ganti tepat","Berikan nombor OEM, model, varian dan kuantiti. Kami semak kesesuaian serta penggantian nombor jika berkenaan."],["Stok sukar dicari","Kami menyemak sumber Jepun untuk alat ganti yang kurang bekalan, khusus atau tidak lagi dikeluarkan."],["Syarat dagangan","Semakan harga, keadaan, kebenaran eksport dan dokumen dibuat sebelum sebarang tawaran muktamad."]],needs:["Nombor OEM / gambar rujukan","Kuantiti dan keadaan yang diterima","Bajet, tarikh perlu, destinasi import"],note:"Nama jenama menunjukkan kategori produk, bukan pengesahan bahawa JPNentry merupakan pengedar rasmi. Barang terkawal memerlukan semakan izin import."},
   industrial:{eyebrow:"JEPUN / KOMPONEN INDUSTRI",title:"Komponen industri Jepun.<br><em>Model tepat, sumber disahkan.</em>",lead:"Bagi pasukan pembelian dan penyelenggaraan yang memerlukan nombor model peralatan automasi, kawalan atau pengukuran dari Jepun.",items:[["Nombor model tepat","Sertakan pengeluar, MPN, kuantiti serta keadaan produk yang diperlukan."],["Komponen lama","Kami menilai kemungkinan penggantian dan bekalan sebenar bagi model terhenti."],["Semakan eksport","Kebenaran pembekal, penggunaan akhir, logistik dan sekatan eksport disahkan sebelum harga dimuktamadkan."]],needs:["MPN dan jenama pengeluar","Kuantiti, keadaan dan tarikh akhir","Negara penggunaan akhir serta bajet"],note:"Komponen terkawal mungkin memerlukan semakan kawalan eksport Jepun dan pengguna akhir."},
   vehicles:{eyebrow:"KENDERAAN / SEMAKAN SUMBER",title:"Sumber kenderaan dari Jepun.<br><em>Pematuhan didahulukan.</em>",lead:"Pertanyaan kenderaan tertentu daripada pengimport dan pengedar. Kami menyemak sama ada penjual Jepun membenarkan eksport dan syarat import negara destinasi dipenuhi.",items:[["Spesifikasi pembeli","Model, varian, kuantiti, bajet FOB dan tarikh penghantaran yang diperlukan."],["Kebenaran penjual","Tiada dakwaan stok atau alokasi yang belum disahkan; persetujuan penjual bagi eksport mesti diperiksa."],["Peraturan Malaysia","Import Toyota baharu CBU lazimnya tertakluk kepada Franchise AP dan laluan pengimport yang dibenarkan."]],needs:["Model, varian dan kuantiti tepat","Harga sasaran FOB Jepun","Permit import dan syarat dokumen"],note:"Kami tidak menawarkan import kenderaan Toyota baharu secara bebas ke Malaysia. Rangkaian perniagaan perlu dibuktikan mematuhi undang-undang sebelum sebut harga."},
   trust:{eyebrow:"KEPERCAYAAN / PENGESAHAN",title:"Bukti dahulu.<br><em>Janji kemudian.</em>",lead:"JPNentry dikendalikan secara milikan tunggal di Jepun oleh Masato Nishio. Kami membezakan pertanyaan, sebut harga yang disahkan dan transaksi selesai.",items:[["Hubungan rasmi","Alamat e-mel rasmi: jpnentry.sales@gmail.com."],["Proses pembelian","Tiada pembelian, tempahan atau bayaran pembekal tanpa kelulusan bertulis dan syarat bayaran yang disahkan."],["Kebebasan jenama","Kami bukan wakil atau pengedar yang dilantik oleh pengeluar yang dinamakan."]],needs:["Semak identiti pihak yang berurusan","Periksa skop sebut harga bertulis","Jangan hantar maklumat kad dalam e-mel"],note:"Butiran pengguna, pembekal dan dokumen pembelian dikendalikan untuk tujuan projek yang dipersetujui."},
   contact:{eyebrow:"HUBUNGI / JPNENTRY",title:"Hantar satu keperluan tepat.<br><em>Dapatkan jawapan realistik.</em>",lead:"Hantar butiran alat ganti, komponen atau kenderaan. Borang RFQ sedia ada tersedia dalam bahasa Inggeris; pertanyaan awal tidak mengikat.",items:[["Borang RFQ","Isi nombor alat ganti atau butiran kenderaan, kuantiti, harga sasaran dan destinasi."],["E-mel rasmi","Hubungi jpnentry.sales@gmail.com untuk pertanyaan B2B dan kerjasama."],["Sebelum pembelian","Penyumberan hanya diteruskan selepas terma dipersetujui, persetujuan bertulis dan bayaran disahkan."]],needs:["Nombor atau butiran produk","Bajet dan kuantiti","Negara destinasi dan tarikh diperlukan"],note:"Borang luar disediakan dalam bahasa Inggeris. Maklumat kad pembayaran tidak boleh dihantar melalui e-mel."}
  },
  id:{
   automotive:{eyebrow:"SUKU CADANG / JEPANG",title:"Suku cadang Jepang.<br><em>Nomor OEM diperiksa.</em>",lead:"Layanan B2B untuk importir, distributor, dan bengkel. Kirim nomor OEM Toyota, Lexus, Hino, Isuzu, atau Mitsubishi Fuso untuk pemeriksaan pemasok di Jepang.",items:[["Nomor komponen yang tepat","Sertakan nomor OEM, aplikasi kendaraan, varian, dan jumlah."],["Suku cadang langka","Penelusuran sumber untuk nomor lama, sulit diperoleh, atau pengganti resmi."],["Kelayakan ekspor","Harga, kondisi, persetujuan penjual, dan dokumen diperiksa sebelum penawaran final."]],needs:["Nomor OEM dan spesifikasi kendaraan","Jumlah, kondisi dan anggaran","Tujuan serta tenggat waktu"],note:"Nama produsen bukan bukti keagenan resmi. Persyaratan impor diperiksa per produk."},
   industrial:{eyebrow:"INDUSTRI / KOMPONEN JEPANG",title:"Komponen industri.<br><em>Tepat nomor modelnya.</em>",lead:"Pengadaan berdasarkan nomor MPN untuk otomasi pabrik, kontrol dan alat ukur Jepang.",items:[["Spesifikasi presisi","Nomor model, produsen dan persyaratan kondisi."],["Model lama","Pemeriksaan kemungkinan ketersediaan dan pengganti."],["Kepatuhan perdagangan","Pemeriksaan penggunaan akhir, izin pemasok serta ekspor bila diperlukan."]],needs:["Produsen dan MPN","Jumlah dan kondisi","Anggaran, tujuan dan tenggat"],note:"Peralatan tertentu dapat memerlukan pemeriksaan peraturan ekspor Jepang dan pengguna akhir."},
   vehicles:{eyebrow:"KENDARAAN / EKSPOR",title:"Pengadaan kendaraan Jepang.<br><em>Legalitas lebih dulu.</em>",lead:"Untuk pembeli armada, importir, dan dealer dengan permintaan model yang spesifik.",items:[["Pesanan khusus","Berikan model, kelas, jumlah dan harga target FOB."],["Persetujuan penjual","Pembelian kendaraan baru untuk ekspor bergantung pada ketentuan penjual Jepang."],["Aturan negara tujuan","Izin impor, spesifikasi keselamatan dan registrasi harus diverifikasi."]],needs:["Model, grade dan jumlah","Batas harga dan pelabuhan tujuan","Dokumen serta izin yang dibutuhkan"],note:"Tidak ada jaminan stok, alokasi atau jadwal pengiriman tanpa verifikasi sumber."},
   trust:{eyebrow:"KEPERCAYAAN / PROSES",title:"Bukti sebelum janji.",lead:"JPNentry dikelola oleh Masato Nishio sebagai usaha perseorangan di Jepang. Permintaan aktif bukan bukti transaksi selesai.",items:[["Kontak resmi","Email: jpnentry.sales@gmail.com."],["Persetujuan pembeli","Tidak ada pembelian sebelum penawaran tertulis, persetujuan dan pembayaran yang disepakati."],["Independen","Tidak mengklaim penunjukan resmi oleh merek kendaraan atau komponen mana pun."]],needs:["Verifikasi identitas dan alamat email","Tinjau ruang lingkup serta biaya tertulis","Jangan kirim detail kartu pembayaran via email"],note:"Syarat transaksi, pengembalian dan privasi dijelaskan dalam kebijakan resmi perusahaan."},
   contact:{eyebrow:"KONTAK / JPNENTRY",title:"Satu kebutuhan yang tepat.<br><em>Jawaban yang terukur.</em>",lead:"Kirim model atau nomor komponen untuk permintaan penawaran awal tanpa kewajiban membeli.",items:[["Formulir RFQ","Formulir eksternal tersedia dalam bahasa Inggris."],["Email resmi","jpnentry.sales@gmail.com untuk pertanyaan B2B dan kerja sama."],["Setelah persetujuan","Pembelian dimulai setelah syarat disetujui tertulis dan pembayaran dikonfirmasi."]],needs:["Nomor model/OEM","Jumlah, kondisi dan harga target","Negara tujuan dan tenggat"],note:"Jangan mengirim data kartu pembayaran melalui email atau formulir RFQ."}
  },
  "zh-Hans":{
   automotive:{eyebrow:"日本汽车零件 / 企业采购",title:"精准采购日本原厂零件。<br><em>从具体编号开始。</em>",lead:"面向汽车零件批发商、维修企业和进口商。根据丰田、雷克萨斯、日野、五十铃等OEM编号核实日本供应渠道。",items:[["准确零件编号","提供OEM编号、车型、数量及适配信息。"],["难以采购的零件","调查缺货、停产以及替代编号的供应可能性。"],["商业条件透明","报价前核实货源、品相、贸易条件及出口限制。"]],needs:["OEM零件编号及车辆资料","数量、品相及目标采购价格","目的国和交货时间"],note:"品牌仅表示产品类别，不代表JPNentry获得官方代理授权。进口要求需要逐项核实。"},
   industrial:{eyebrow:"日本工业零部件 / MPN",title:"日本工业零件。<br><em>型号准确，渠道核实。</em>",lead:"面向工业采购、维护及系统集成企业，调查控制器、测量仪器和停产型号在日本的供货可能性。",items:[["具体型号","核对制造商、MPN、数量和必要的品相条件。"],["停产备件","调查旧型号及替代产品的可行采购渠道。"],["合规核验","报价前核实贸易限制、最终用途及卖方销售条件。"]],needs:["制造商、具体型号","数量、预算与交期","目的国、最终用途"],note:"部分工业产品可能受到日本出口管制及终端用户审核要求。"},
   vehicles:{eyebrow:"日本车辆采购 / 合规优先",title:"从日本寻找指定车辆。<br><em>先核实合法交易渠道。</em>",lead:"根据具体型号、配置和数量调查采购可行性；不承诺未经确认的库存、交期或出口权限。",items:[["指定车型","提供型号、等级、数量、目标FOB价格。"],["销售方授权","新车出口必须事先确认日本销售商的交易条款。"],["目的国要求","核查进口许可、安全规范与车辆登记要求。"]],needs:["准确车辆型号与配置","目标价格、数量、目的港","进口许可与所需文件"],note:"不宣称能够不受限制地向马来西亚出口丰田新车。须先确认有效进口许可与合法供货渠道。"},
   trust:{eyebrow:"企业信息 / 交易核验",title:"有依据，再承诺。",lead:"JPNentry由Masato Nishio在日本以个人事业形式经营，并非独立注册公司法人。",items:[["官方联系邮箱","jpnentry.sales@gmail.com"],["先核验后采购","买方书面确认并按约定付款后，才会启动采购。"],["独立采购服务","不宣称与上述品牌存在官方授权经销关系。"]],needs:["核实对方身份和联系地址","确认书面报价与费用范围","请勿通过邮件发送银行卡信息"],note:"具体付款、隐私和退款等条件以正式条款及交易书面协议为准。"},
   contact:{eyebrow:"联系 / 企业询价",title:"提供具体需求。<br><em>获得明确答复。</em>",lead:"只需提供一个准确产品编号或车辆规格。首次询价不构成订单。",items:[["提交RFQ表单","外部表单采用英语填写。"],["电子邮件","jpnentry.sales@gmail.com"],["采购确认","在供应渠道、付款条件及买方书面确认完成之前不安排采购。"]],needs:["产品编号或车辆配置","数量、预算与期望交货时间","目的国"],note:"请勿通过询价表单或电子邮件发送银行卡详细信息。"}
  },
  "zh-Hant":{
   automotive:{eyebrow:"日本汽車零件 / 企業採購",title:"日本原廠零件。<br><em>從準確料號開始。</em>",lead:"服務汽車零件批發商、維修廠與進口商。依照Toyota、Lexus、Hino及Isuzu等OEM料號查核日本供應渠道。",items:[["準確的零件料號","提供OEM料號、車型、數量與適配資訊。"],["難以採購的零件","調查缺貨、停產及替代料號的供應可能性。"],["交易條件透明","報價前確認來源、品相、貿易條件與出口限制。"]],needs:["OEM料號及車輛資料","數量、品相與目標價格","目的地與交期"],note:"所列品牌僅表示產品類別，並非官方代理授權聲明。進口法規須逐項查核。"},
   industrial:{eyebrow:"日本工業零組件 / MPN",title:"日本工業零件。<br><em>型號準確，來源確認。</em>",lead:"為採購及設備維護團隊調查控制器、測量儀器和停產型號的日本供應可能性。",items:[["特定型號","核對製造商、MPN、數量與要求品相。"],["停產零件","查核舊型號及可能的替代來源。"],["出口合規","報價前確認貿易限制、最終用途與賣方供貨條件。"]],needs:["製造商與型號","數量、預算、期限","最終用途與目的地"],note:"部分工業產品可能涉及日本出口管制與最終用戶查核。"},
   vehicles:{eyebrow:"日本車輛採購 / 合規優先",title:"尋找指定日本車輛。<br><em>先確認合法交易渠道。</em>",lead:"依據具體車型、規格及數量評估採購可能性，不保證未經確認的現貨、交期或出口權限。",items:[["指定車款","請提供型號、等級、數量與目標FOB價格。"],["賣方允許出口","新車出口需先確認日本銷售方的合約條件。"],["目的地要求","查核進口許可、安全規範與車輛登記要求。"]],needs:["具體車型與規格","目標價格、數量與目的港","進口許可及文件"],note:"不聲稱可不受限制地向馬來西亞出口Toyota新車。必須查核當地合法進口渠道。"},
   trust:{eyebrow:"公司資訊 / 交易核驗",title:"有依據，才承諾。",lead:"JPNentry由Masato Nishio在日本以個人事業形式經營，並非獨立註冊的公司法人。",items:[["正式聯絡信箱","jpnentry.sales@gmail.com"],["確認後再採購","收到買方書面同意及約定付款後才進行採購。"],["獨立服務","不表示與列出的品牌存在官方授權代理關係。"]],needs:["確認交易對象及信箱","核對報價範圍與費用","請勿以電子郵件提供卡片資料"],note:"付款、隱私及退款等規定以正式條款和個別書面協議為準。"},
   contact:{eyebrow:"聯絡 / 企業詢價",title:"提供明確需求。<br><em>獲得具體回覆。</em>",lead:"只需提供一個準確零件料號或車輛規格。首次詢價並非訂單。",items:[["提交RFQ表單","外部表單以英文填寫。"],["正式聯絡信箱","jpnentry.sales@gmail.com"],["採購確認","在確認供應條件、取得書面同意與付款前不進行採購。"]],needs:["零件料號或車輛規格","數量、預算及需求時間","目的地"],note:"請勿透過表單或電子郵件傳送信用卡資料。"}
  }
 };
 const linkbar=(locale,type)=>{
  const x=local[locale],l=def[locale][type];const key=locale==="ms"?"Malay":locale==="id"?"Indonesian":"Chinese";
  return `<main><section class="subhero localized-hero"><div class="wrap"><p class="eyebrow">${l.eyebrow}</p><h1>${l.title}</h1><p class="sublead">${l.lead}</p>
   <div class="subhero-actions"><a href="${rfq}" class="btn btn-primary" target="_blank" rel="noopener">${x.cta} ↗</a><a href="mailto:${mail}" class="btn btn-outline">${x.contact} ↗</a></div></div></section>
   <section class="section"><div class="wrap"><div class="service-grid three">${l.items.map((p,i)=>`<div class="service-card static"><span class="index">0${i+1} / ${key.toUpperCase()}</span><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join("")}</div></div></section>
   <section class="section method"><div class="wrap narrow"><p class="eyebrow">RFQ / CHECKLIST</p><h2>${x.rfqName}</h2><div class="buyer-points">${l.needs.map((n,i)=>`<div><b>0${i+1}</b><span>${n}</span></div>`).join("")}</div><div class="fine-notice"><strong>NOTICE</strong><p>${l.note}</p></div></div></section>
   <section class="cta-section"><div class="wrap cta-inner"><div><p class="eyebrow">JPNENTRY / PROCUREMENT</p><h2>${x.sub}</h2><p>${x.legal}</p></div><div class="cta-actions"><a class="btn btn-light" href="${rfq}" target="_blank" rel="noopener">${x.cta} ↗</a><a class="text-link light-link" href="mailto:${mail}">${mail}</a></div></div></section></main>`;
 };
 let added=0;
 for(const [lang,x] of Object.entries(local)){
  for(const type of ["automotive","industrial","vehicles","trust","contact"]){
   const target=x.root+"/"+type, d=def[lang][type];
   write(target+"/index.html",page(d.title.replace(/<[^>]*>/g,"").trim(),d.lead,linkbar(lang,type),"/"+target,lang));
   added++;
  }
 }
 const rfqGuide=`<main><section class="subhero"><div class="wrap"><p class="eyebrow">RFQ / START HERE</p><h1>A clear brief.<br><em>A faster sourcing decision.</em></h1><p class="sublead">The fastest way to receive a meaningful commercial answer is to provide one exact requirement, buying conditions and destination. Your first RFQ is non-binding.</p><div class="subhero-actions"><a href="${rfq}" class="btn btn-primary" target="_blank" rel="noopener">OPEN THE OFFICIAL RFQ FORM ↗</a><a href="mailto:${mail}" class="btn btn-outline">EMAIL THE DESK ↗</a></div></div></section>
  <section class="section"><div class="wrap"><div class="section-head"><div><p class="eyebrow">BUYER PREPARATION</p><h2>Choose your<br><em>requirement type.</em></h2></div><p>Collect the details below, then use the same official RFQ form. We do not advertise stock or shipment readiness without verifying the exact order.</p></div>
  <div class="service-grid three">
  <article class="service-card static rfq-category"><span class="index">01 / JAPANESE AUTO PARTS</span><h3>Parts by OEM number</h3><p>OEM reference, compatible vehicle/chassis, quantity, condition, target FOB/CIF price, destination, date needed.</p><button type="button" class="copy-rfq" data-template="auto">COPY BUYING BRIEF ↗</button></article>
  <article class="service-card static rfq-category"><span class="index">02 / INDUSTRIAL MPN</span><h3>Industrial components</h3><p>Manufacturer, full model/MPN, required condition, quantity, end use, destination, target budget, date needed.</p><button type="button" class="copy-rfq" data-template="industrial">COPY BUYING BRIEF ↗</button></article>
  <article class="service-card static rfq-category"><span class="index">03 / VEHICLE PROCUREMENT</span><h3>Vehicle specifications</h3><p>Manufacturer, full model and grade, year, new/used, quantity, target FOB, destination, import eligibility and required documentation.</p><button type="button" class="copy-rfq" data-template="vehicle">COPY BUYING BRIEF ↗</button></article>
  </div><p class="copy-feedback" role="status" aria-live="polite" hidden></p></div></section>
  <section class="section method"><div class="wrap narrow"><p class="eyebrow">NO OBLIGATION</p><h2>Quote or no-go.<br><em>Not a guess.</em></h2><p class="sublead">We check actual Japan-side sourceability, terms and compliance. If a viable quotation cannot be supported, we will say so clearly. No reservation or purchase is made without written approval and confirmed payment.</p><div class="fine-notice"><strong>USE THE OFFICIAL FORM</strong><p>JPNentry's <a href="${rfq}" target="_blank" rel="noopener">existing Jotform RFQ</a> is the single structured intake. The buttons above copy preparation text only; they do not transmit buyer details to JPNentry.</p></div></div></section></main>`;
 write("rfq/index.html",page("Submit an RFQ | Japan Sourcing Buyer Checklist","Prepare an accurate JPNentry RFQ for genuine Japanese auto parts, industrial MPNs or specific vehicle procurement. Initial enquiries are non-binding.",rfqGuide,"/rfq"));added++;
 const root=path.join(out,"blog","index.html");
 if(fs.existsSync(root)){
  let b=fs.readFileSync(root,"utf8");
  const bar=`<div class="blog-refine" role="group" aria-label="Filter sourcing notes by topic">
    <button type="button" class="filter-chip" data-topic="all" aria-pressed="true">All notes</button>
    <button type="button" class="filter-chip" data-topic="automotive" aria-pressed="false">Automotive</button>
    <button type="button" class="filter-chip" data-topic="industrial" aria-pressed="false">Industrial</button>
    <button type="button" class="filter-chip" data-topic="ev" aria-pressed="false">EV & batteries</button>
    <button type="button" class="filter-chip" data-topic="trust" aria-pressed="false">Buyer guides</button>
   </div>`;
  b=b.replace('<div class="blog-grid" id="notes">',bar+'<div class="blog-grid" id="notes">');
  b=b.replace('<p class="empty-result" hidden>No matching notes found.</p>','<p class="empty-result" hidden>No matching notes found.</p><div class="blog-more"><button class="btn btn-outline" id="load-more" type="button" hidden>SHOW MORE NOTES <span aria-hidden="true">↓</span></button><p class="blog-showing" aria-live="polite"></p></div>');
  b=b.replace(/(<a class="blog-card" href="\/post\/)([^"]+)(" data-search=")([^"]+)(")/g,(_m,prefix,slug,middle,search,tail)=>{
    let decoded=slug;try{decoded=decodeURI(slug)}catch{}
    const post=posts.find(x=>x.slug===decoded);
    const s=((post?.title||"")+" "+(post?.description||"")).toLowerCase();
    const topics=[];
    if(/toyota|lexus|vehicle|genuine auto|auto parts|hino|isuzu|fuso|auction|jdm|car import/.test(s))topics.push("automotive");
    if(/industrial|automation|omron|yaskawa|fanuc|plc|hioki|mitsubishi electric|control system|sensor/.test(s))topics.push("industrial");
    if(/battery|ev |nissan leaf|high-voltage|high voltage/.test(s))topics.push("ev");
    if(/trust|payment|quote|verification|policy|faq|guide|transparency|checklist|how to|standard/.test(s))topics.push("trust");
    if(!topics.length)topics.push("general");
    return prefix+slug+middle+search+tail+' data-topics="'+topics.join(" ")+'"';
  });
  write("blog/index.html",b);
 }
 const corporateNotices={
  en:{lead:"OPERATED IN JAPAN · DIRECT B2B SOURCING · WRITTEN APPROVAL BEFORE PROCUREMENT",detail:"JPNentry is an independent desk operated by Masato Nishio. Manufacturer names indicate product references, not authorized dealerships.",link:"HOW WE VERIFY"},
  ja:{lead:"日本国内で調達を検証・契約前に条件を明示",detail:"運営：Masato Nishio（個人事業）。メーカーの公認代理店ではありません。",link:"検証方針"},
  ms:{lead:"PERNIAGAAN BEBAS DI JEPUN · PEMBELIAN SELEPAS KELULUSAN BERTULIS",detail:"JPNentry ialah perkhidmatan bebas; nama jenama bukan bukti keagenan rasmi.",link:"SEMAK PROSES"},
  id:{lead:"LAYANAN JEPANG · PEMBELIAN SETELAH PERSETUJUAN TERTULIS",detail:"JPNentry adalah layanan independen, bukan dealer resmi merek yang disebutkan.",link:"LIHAT VERIFIKASI"},
  "zh-Hans":{lead:"日本独立采购服务 · 书面确认后采购",detail:"JPNentry不代表所列制造商的官方授权经销商。",link:"核验流程"},
  "zh-Hant":{lead:"日本獨立採購服務 · 書面同意後採購",detail:"JPNentry並非所列品牌的官方授權經銷商。",link:"核驗流程"}
 };
 const mailHref="mailto:"+mail;
 const dataTemplates={
  auto:"AUTOMOTIVE PARTS REQUEST\nOEM part number:\nVehicle model / chassis:\nQuantity:\nAcceptable condition:\nTarget buying price + currency:\nDestination country / port:\nDate needed:\nDocumentation requirements:\nCompany and contact:",
  industrial:"INDUSTRIAL PARTS RFQ\nManufacturer + exact MPN:\nQuantity:\nCondition / warranty requirements:\nEnd use / end user:\nDestination country:\nTarget buying price + currency:\nDate needed:\nCompany and contact:",
  vehicle:"VEHICLE BUYING BRIEF\nMake / model / grade:\nYear / specification / RHD or LHD:\nNew or used condition:\nQuantity:\nTarget FOB price + currency:\nDestination and import-licence status:\nRequired export/registration documents:\nDesired shipping date:\nCompany and contact:"
 };
 write("rfq-templates.json",JSON.stringify(dataTemplates,null,2));
 const locales=[["en","/","English"],["ja","/ja","日本語"],["ms","/ms","Bahasa Melayu"],["id","/id","Bahasa Indonesia"],["zh-Hans","/zh-cn","简体中文"],["zh-Hant","/zh-tw","繁體中文"]];
 const menu=(lang)=>{
  const name=local[lang]?.name|| (lang==="ja"?"日本語":"EN");
  const shown=lang==="en"?"EN":lang==="ja"?"JP":lang==="ms"?"BM":lang==="id"?"ID":lang==="zh-Hans"?"中文":"繁中";
  return `<details class="lang-menu"><summary aria-label="Choose language">${shown} <span aria-hidden="true">⌄</span></summary><div class="lang-options">${locales.map(([ll,url,label])=>`<a href="${url}" lang="${ll}" ${ll===lang?'aria-current="page"':''}>${label}</a>`).join("")}</div></details>`;
 };
 const localizedNav=(lang)=>{
  const x=local[lang],pre="/"+x.root;
  const ls=[["automotive",x.nav[0]],["industrial",x.nav[1]],["vehicles",x.nav[2]],["trust",x.trust],["contact",x.nav[4]]];
  return `<nav id="primary-nav" class="main-nav" aria-label="Primary navigation">${ls.map(([r,label])=>`<a href="${pre}/${r}">${label}</a>`).join("")}<a class="menu-rfq" href="${rfq}" target="_blank" rel="noopener">${x.cta} ↗</a></nav>`;
 };
 const datePath=(rel)=>rel.replace(/\/index\.html$/,"").replace(/\\/g,"/");
 const reHome=(lang)=>{
  const x=corporateNotices[lang]||corporateNotices.en;
  const url=lang==="ms"?"/ms/trust":lang==="id"?"/id/trust":lang==="zh-Hans"?"/zh-cn/trust":lang==="zh-Hant"?"/zh-tw/trust":lang==="ja"?"/ja/trust":"/trust";
  return `<div class="confidence-bar"><div class="wrap"><div><strong>${x.lead}</strong><p>${x.detail}</p></div><a href="${url}">${x.link} ↗</a></div></div>`;
 };
 const linksSwap={
  automotive:["Genuine Japanese Auto Parts | Exact OEM Sourcing from Japan","Genuine Japanese auto parts sourcing: send an exact OEM reference, quantity and target price for a verified Japan-side quote or no-go.","Genuine Japanese<br><em>auto parts sourcing.</em>","We assess exact OEM references, superseded numbers, compatible vehicle specifications and genuine supply terms before offering a quote."],
  industrial:["Japanese Industrial Components | Exact MPN Sourcing","Japanese industrial automation and instrumentation MPN sourcing with supplier verification, availability and export eligibility checks.","Japanese industrial<br><em>components sourcing.</em>","Send the exact manufacturer and MPN. We verify supplier terms, compatibility, lead time and whether an export route is commercially viable."],
  vehicles:["Vehicle Sourcing from Japan | Dealer & Import Compliance First","Buyer-led vehicle sourcing from Japan: exact specifications and dealer export permissions verified before any commitment.","Vehicle sourcing<br><em>from Japan.</em>","Submit the exact model, grade, quantity, destination and buying budget. We verify seller permission and destination import eligibility before quoting."]
 };
 const allFiles=[];
 const walk=d=>{for(const f of fs.readdirSync(d,{withFileTypes:true})){const ff=path.join(d,f.name);if(f.isDirectory())walk(ff);else if(ff.endsWith(".html"))allFiles.push(ff);}};
 walk(out);
 for(const f of allFiles){
  const rel=path.relative(out,f).replace(/\\/g,"/");
  const pathId=datePath(rel);
  let html=fs.readFileSync(f,"utf8");
  const lang=html.match(/<html lang="([^"]+)"/)?.[1]||"en";
  const isNew= !html.includes('href="/premium.css"');
  if(isNew){
    html=html.replace('<link rel="stylesheet" href="/style.css">','<link rel="stylesheet" href="/style.css">');
    html=html.replace('</head>',`<meta name="robots" content="index, follow"><meta name="twitter:card" content="summary"><meta property="og:url" content="${origin}/${pathId}"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/extra.css"><link rel="stylesheet" href="/premium.css"></head>`);
    html=html.replace('<body>','<body><a href="#main-content" class="skip-link">Skip to content</a>');
    html=html.replace('<main>','<main id="main-content">');
    html=html.replace('<nav class="main-nav"','<nav id="primary-nav" class="main-nav"');
    html=html.replace(/<button class="menu-toggle" aria-label="Toggle navigation" onclick="document.body.classList.toggle\('menu-open'\)">☰<\/button>/,
      '<button class="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Open navigation">☰</button>');
    html=html.replace(/<a class="lang" href="[^"]+">[^<]+<\/a>/,menu(lang));
    html=html.replace('<a href="/trust">Trust & verification</a>','<a href="/trust">Trust & verification</a><a href="/about">About us</a><a href="/contact">Contact</a><a href="/malaysia">Malaysia desk</a>');
  }
  if(Object.hasOwn(local,lang)){
    const x=local[lang];
    html=html.replace(/<nav id="primary-nav" class="main-nav"[^>]*>[\s\S]*?<\/nav>/,localizedNav(lang));
    html=html.replace(/<details class="lang-menu">[\s\S]*?<\/details>/,menu(lang));
    html=html.replace(/<a class="brand" href="[^"]*"/,`<a class="brand" href="/${x.root}"`);
    html=html.replace(/<a class="brand footer-brand" href="[^"]*"/,`<a class="brand footer-brand" href="/${x.root}"`);
    html=html.replace(/(<a class="btn btn-small"[^>]*>)[\s\S]*?(<\/a>)/,(full,pre,post)=>pre+x.cta+' <span aria-hidden="true">↗</span>'+post);
    // Translate footer and header descriptions while preserving legal and company names
    html=html.replace(/<footer class="footer">[\s\S]*?<\/footer>/,footer=>{
      return footer.replace(/Japan-side sourcing, verification and export coordination for exact buyer requirements\./,x.brand)
        .replace(/>EXPLORE</,`>${x.home}<`)
        .replace(/>WORK WITH US</,`>${x.nav[4]}<`)
        .replace(/>Submit an RFQ ↗</,`>${x.cta} ↗<`)
        .replace(/>About us</,`>${x.nav[3]}<`)
        .replace(/>Contact</,`>${x.nav[4]}<`)
        .replace(/>Trust & verification</,`>${x.trust}<`)
        .replace(/>Privacy & service terms</,">Privacy / Terms (EN)<")
        .replace(/>Automotive parts</,`>${x.nav[0]}<`)
        .replace(/>Industrial sourcing</,`>${x.nav[1]}<`)
        .replace(/>Vehicle sourcing</,`>${x.nav[2]}<`)
        .replace(/>Malaysia desk</,`>${x.root==="ms"?"Malaysia":x.nav[0]}<`)
        .replace(/>Insights & buyer guides</,">Insights (EN)<");
    });
    html=html.replace(/<a href="\/automotive">/g,`<a href="/${x.root}/automotive">`);
    // On localized service pages, make the CTA description fully localized.
  }
  if(rel==="index.html" || rel==="ja/index.html" || ["ms/index.html","id/index.html","zh-cn/index.html","zh-tw/index.html"].includes(rel)){
    const old=html.match(/<div class="signal-strip">[\s\S]*?<\/div><\/div>/);
    if(old)html=html.replace(old[0],reHome(lang));
  }
  if(lang==="en" && linksSwap[pathId]){
    const [newTitle,newDesc,newHeadline,newLead]=linksSwap[pathId];
    html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${newTitle} | JPNentry</title>`);
    html=html.replace(/(<meta name="description" content=")[^"]+(")/,`$1${h(newDesc)}$2`);
    html=html.replace(/(<meta property="og:title" content=")[^"]+(")/,`$1${h(newTitle)} | JPNentry$2`);
    html=html.replace(/(<meta property="og:description" content=")[^"]+(")/,`$1${h(newDesc)}$2`);
    html=html.replace(/<h1>[\s\S]*?<\/h1>/,`<h1>${newHeadline}</h1>`);
    html=html.replace(/<p class="sublead">[\s\S]*?<\/p>/,`<p class="sublead">${newLead}</p>`);
  }
  if(rel==="malaysia/index.html"){
    html=html.replace('</section><section class="section"><div class="wrap">','</section><div class="regional-callout"><div class="wrap"><span>LOCAL BUYER INFORMATION</span><strong>Are you a Malaysian automotive purchaser?</strong><a href="/ms/automotive" lang="ms">Maklumat dalam Bahasa Melayu ↗</a></div></div><section class="section"><div class="wrap">');
  }
  if(["automotive/index.html","industrial/index.html","vehicles/index.html","malaysia/index.html","commercial-parts/index.html","toyota-lexus-parts/index.html","industrial-automation/index.html"].includes(rel)){
    const type=rel.startsWith("vehicle")?"vehicle":rel.startsWith("industrial")?"industrial":"auto";
    const sourceData=dataTemplates[type];
    const fields=sourceData.split("\n").slice(1).filter(Boolean).slice(0,5).map((line,i)=>`<li><span>0${i+1}</span>${h(line.replace(/:$/,""))}</li>`).join("");
    const htmlBlock=`<section class="brief-section"><div class="wrap"><div class="brief-intro"><p class="eyebrow">A BETTER REQUEST STARTS HERE</p><h2>Give us the details.<br><em>We verify the source.</em></h2><p>For a quote-ready response, include the following information. No purchase occurs during the initial enquiry.</p></div><ol class="brief-list">${fields}</ol><div class="brief-actions"><button type="button" class="copy-rfq" data-template="${type}">COPY A BUYING BRIEF ↗</button><a href="${rfq}" class="btn btn-primary" target="_blank" rel="noopener">SUBMIT AN RFQ ↗</a><a href="/rfq" class="text-link">BUYER CHECKLIST →</a></div><p class="copy-feedback" role="status" aria-live="polite" hidden></p></div></section>`;
    html=html.replace('<section class="cta-section">',htmlBlock+'<section class="cta-section">');
  }
  if(rel==="index.html"){
    const block=`<section class="home-trust-section"><div class="wrap"><div><p class="eyebrow">JPNENTRY / INDEPENDENT SOURCING</p><h2>In Japan.<br><em>On your side of the specification.</em></h2></div><div><p>JPNentry is operated in Japan by Masato Nishio, working from precise buyer requirements. We confirm supply terms and export feasibility before issuing firm commitments. Manufacturer names on this site describe item references, not official dealerships.</p><div class="home-trust-actions"><a href="/about" class="text-link">ABOUT THE DESK ↗</a><a href="/trust" class="text-link">OUR VERIFICATION STANDARD ↗</a></div></div></div></section>`;
    html=html.replace('<section class="cta-section">',block+'<section class="cta-section">');
  }
  // Correct imprecise city coordinates in a decorative sourcing graphic: no office location implied.
  html=html.replace('JAPAN<br>35°40′ N / 139°41′ E','JAPAN<br>PROCUREMENT NETWORK');
  // Keep alternate links strictly within matching language route families.
  if(["index.html","ja/index.html","ms/index.html","id/index.html","zh-cn/index.html","zh-tw/index.html",
      "automotive/index.html","ja/automotive/index.html","ms/automotive/index.html","id/automotive/index.html","zh-cn/automotive/index.html","zh-tw/automotive/index.html",
      "industrial/index.html","ja/industrial/index.html","ms/industrial/index.html","id/industrial/index.html","zh-cn/industrial/index.html","zh-tw/industrial/index.html",
      "vehicles/index.html","ja/vehicles/index.html","ms/vehicles/index.html","id/vehicles/index.html","zh-cn/vehicles/index.html","zh-tw/vehicles/index.html"
     ].includes(rel)){
    const service=["automotive","industrial","vehicles"].find(x=>rel.endsWith("/"+x+"/index.html"))||"";
    html=html.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g,"");
    const alternatives=locales.map(([ll,root])=>`<link rel="alternate" hreflang="${ll}" href="${origin}${root==="/"?"/":root}${service?(root==="/"?service:"/"+service):""}">`).join("");
    html=html.replace('</head>',alternatives+`<link rel="alternate" hreflang="x-default" href="${origin}/${service}"></head>`);
  }
  if(!html.includes('href="/growth.css"'))html=html.replace('</head>','<link rel="stylesheet" href="/growth.css"></head>');
  // English-language structured buyer-support pages were generated after the previous metadata pass
  if(isNew){
    const can=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]||origin+"/"+pathId;
    const data={"@context":"https://schema.org","@type":"WebPage","name":html.match(/<title>([^<]+)/)?.[1]||"JPNentry","url":can,"inLanguage":lang,"isPartOf":{"@type":"WebSite","name":"JPNentry","url":origin},"provider":{"@type":"Organization","name":"JPNentry","url":origin,"email":mail}};
    html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(data)}</script></head>`);
  }
  write(rel,html);
 }
 const files=[];
 walk(out); // allFiles already captured before file modifications, includes all new pages 
 const routes=allFiles.map(f=>"/"+path.relative(out,f).replace(/\\/g,"/").replace(/(^|\/)index\.html$/,"").replace(/\/$/,"")).map(x=>x==="/"?"/":x);
 const sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...new Set(routes)].map(u=>`<url><loc>${origin}${u}</loc></url>`).join("")+"</urlset>";
 write("sitemap.xml",sitemap);
 fs.copyFileSync(path.join(__dirname,"growth.css"),path.join(out,"growth.css"));
 console.log(`Growth upgrade: ${added} new targeted pages, ${allFiles.length} total pages, ${routes.length} sitemap entries.`);
};
