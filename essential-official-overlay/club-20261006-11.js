(() => {
  if (!window.EB_DATA) { document.querySelector('#brandIntro')?.remove(); return; }
  const D = structuredClone(window.EB_DATA);
  const escapeText = s => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  for (const group of [D.programs,D.philosophy,D.results,D.news,D.gallery,D.partners,D.faq]) for(const row of group||[]) for(const key of Object.keys(row)) if(typeof row[key]==="string" && !["slug","label"].includes(key)) row[key]=escapeText(row[key]);
  if (!D) return;
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];

  const copy = Object.assign({}, ...Object.values(window.EB_DATA.pages||{}));
  $$("[data-copy]").forEach(el=>{if(copy[el.dataset.copy] !== undefined) el.textContent=copy[el.dataset.copy];});

  // Shared program facts also feed the trial guide and home summary.
  const weekdays = {MON:'月',TUE:'火',WED:'水',THU:'木',FRI:'金',SAT:'土',SUN:'日'};
  $$('[data-program-info]').forEach(el=>{const p=window.EB_DATA.programs.find(p=>p.slug===el.dataset.programInfo);if(p)el.textContent=p.target+'／'+p.fee;});
  $$('[data-program-days]').forEach(el=>{const p=window.EB_DATA.programs.find(p=>p.slug===el.dataset.programDays);if(p)el.textContent=p.days.map(d=>weekdays[d]).join('・');});
  $$('[data-program-times]').forEach(el=>{el.textContent='平日は'+window.EB_DATA.programs.map(p=>p.label+'が'+p.weekday).join('、')+'です。土日は大会・練習試合・会場の都合により、時間と場所が変わります。';});

  // One result entry feeds the news and home lists, with matching reports deduplicated.
  const resultNews = D.results.map(r=>({date:r.date,category:r.tag,title:r.title,excerpt:r.detail,image:r.image,url:r.url}));
  D.news = D.news.filter(n=>!D.results.some(r=>r.date===n.date && r.tag===n.category && r.url===n.url));
  for(const report of resultNews) if(!D.news.some(n=>n.date===report.date && n.title===report.title)) D.news.push(report);
  D.news.sort((a,b)=>b.date.localeCompare(a.date));
  // Account handles follow the official Instagram URL automatically.
  try { const account=new URL(D.social.instagram).pathname.split('/').filter(Boolean)[0]; if(account) D.social.instagramHandle='@'+account; } catch(e) {}

  if(window.EB_FALLBACK){
    const notice=document.createElement('p');notice.className='data-notice';notice.setAttribute('role','status');
    notice.textContent='最新の掲載情報を読み込めませんでした。体験参加の前に、日程と費用をご確認ください。';
    document.querySelector('main')?.prepend(notice);
  }

  // Global binds
  $$('[data-instagram]').forEach(a => {a.href = D.social.instagram; if(a.target==='_blank')a.rel='noopener noreferrer';});
  $$('[data-contact]').forEach(a => a.href = D.social.contactForm);
  $$('[data-email]').forEach(a => a.href = `mailto:${D.social.email}`);
  $$('[data-logo]').forEach(img => img.src = D.brand.logo);
  $$('[data-handle]').forEach(el => el.textContent = D.social.instagramHandle);
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // Mobile menu
  const menuBtn = $('#menuBtn');
  const mobilePanel = $('#mobilePanel');
  if (menuBtn && mobilePanel) {
    mobilePanel.inert = true;
    menuBtn.setAttribute('aria-controls','mobilePanel');
    const closeMenu = (focus=false) => {
      menuBtn.classList.remove('open'); mobilePanel.classList.remove('open'); document.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','メニューを開く');mobilePanel.inert=true;
      if(focus)menuBtn.focus();
    };
    menuBtn.addEventListener('click', () => {
      if(menuBtn.classList.contains('open')) { closeMenu(true); return; }
      menuBtn.classList.add('open');mobilePanel.classList.add('open');document.body.classList.add('menu-open');mobilePanel.inert=false;
      menuBtn.setAttribute('aria-expanded','true');menuBtn.setAttribute('aria-label','メニューを閉じる');mobilePanel.querySelector('a')?.focus();
    });
    mobilePanel.addEventListener('keydown',e=>{
      if(e.key==='Escape'){e.preventDefault();closeMenu(true);}
      if(e.key==='Tab'){
        const links=$$('a',mobilePanel);const first=links[0],last=links[links.length-1];
        if(e.shiftKey && document.activeElement===first){e.preventDefault();menuBtn.focus();}
        if(!e.shiftKey && document.activeElement===last){e.preventDefault();menuBtn.focus();}
      }
    });
    menuBtn.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu(true);if(e.key==='Tab'&&menuBtn.classList.contains('open')){e.preventDefault();const links=$$('a',mobilePanel);(e.shiftKey?links[links.length-1]:links[0])?.focus();}});
    $$('a', mobilePanel).forEach(a => a.addEventListener('click',()=>closeMenu()));
    addEventListener('resize',()=>{if(innerWidth>1050)closeMenu();});
  }

  // Header active nav
  const page = document.body.dataset.page;
  if (page) $$(`[data-nav="${page}"]`).forEach(a => a.classList.add('active'));


  // Premium intro animation (once per browsing session)
  const intro = $('#brandIntro');
  if (intro) {
    let seen=true;try{seen=sessionStorage.getItem('eb_intro_seen');}catch(e){}
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced) { intro.remove(); }
    else {
      try{sessionStorage.setItem('eb_intro_seen','1');}catch(e){}
      setTimeout(()=>intro.classList.add('is-done'), 1350);
      setTimeout(()=>intro.remove(), 2100);
    }
  }

  // Header elevation on scroll
  const mainHeader = $('.main-header');
  if (mainHeader) {
    const syncHeader = () => mainHeader.classList.toggle('scrolled', scrollY > 20);
    addEventListener('scroll', syncHeader, {passive:true}); syncHeader();
  }

  // This is a weekly guide, not a confirmed upcoming practice.
  const nextPractice = $('#nextPractice');
  if (nextPractice) nextPractice.textContent = '時間・会場は参加前に確認';
  const nextPracticeNote = $('#nextPracticeNote');
  if (nextPracticeNote) nextPracticeNote.textContent = '練習曜日と時間は「練習日程」で確認できます。';
  // Home news cards
  const newsFeature = $('#newsFeature');
  if (newsFeature) {
    const items = D.news.slice(0,3);
    newsFeature.innerHTML = items.map((n,i)=>`<a class="news-card reveal" href="${n.url}" target="_blank" rel="noopener"><img src="${n.image}" alt="${n.title}"><div class="news-card-body"><div class="meta">${n.date} / ${n.category}</div><h3>${n.title}</h3>${i===0?`<p>${n.excerpt}</p>`:''}</div></a>`).join('');
  }

  // Program cards
  const programGrid = $('#programGrid');
  if (programGrid) {
    programGrid.innerHTML = D.programs.map(p=>`<article id="${p.slug}" class="program-card reveal"><div class="program-media"><img src="${p.image}" alt="${p.title}" loading="lazy"><span class="program-label">${p.label}</span></div><div class="program-body"><h3>${p.title}</h3><p class="program-target">${p.target}</p><div class="program-stats"><div class="program-stat"><span>平日の基本時間</span><strong>${p.weekday}</strong></div><div class="program-stat"><span>活動曜日</span><strong style="font-size:15px">${p.days.map(d=>({MON:"月",TUE:"火",WED:"水",THU:"木",FRI:"金",SAT:"土",SUN:"日"}[d])).join("・")}</strong></div></div><div class="program-fee">${p.fee}</div><p style="font-size:14px">活動内容：${p.activity}</p><p class="section-lead" style="font-size:13px">${p.note}</p></div></article>`).join('');
  }

  // Philosophy
  const valueGrid = $('#valueGrid');
  if (valueGrid) valueGrid.innerHTML = D.philosophy.map(v=>`<article class="value-card reveal"><div class="no">${v.no}</div><h3>${v.title}</h3><p>${v.body}</p></article>`).join('');

  // Schedule table
  const scheduleTable = $('#scheduleTable');
  if (scheduleTable) {
    const days=['MON','TUE','WED','THU','FRI','SAT','SUN'];
    const dayJa={MON:'月',TUE:'火',WED:'水',THU:'木',FRI:'金',SAT:'土',SUN:'日'};
    let html = `<div class="schedule-cell head">カテゴリー</div>${days.map(d=>`<div class="schedule-cell head">${dayJa[d]}</div>`).join('')}`;
    D.programs.forEach(p=>{
      html += `<div class="schedule-cell label">${p.label}<br><small style="opacity:.55">${p.weekday}</small></div>`;
      html += days.map(d=>`<div class="schedule-cell">${p.days.includes(d)?`<span class="schedule-dot ${p.slug==='u15'?'u15':''}">●</span>`:'—'}</div>`).join('');
    });
    scheduleTable.innerHTML = html;
  }

  // Results
  const resultsList = $('#resultsList');
  if (resultsList) resultsList.innerHTML = D.results.map(r=>`<a class="result-row reveal" href="${r.url}" target="_blank" rel="noopener"><div class="date">${r.date}</div><div><span class="tag">${r.tag}</span></div><div><h3>${r.title}</h3><p>${r.detail}</p></div><div class="result">${r.result}</div></a>`).join('');

  // News list page
  const newsList = $('#newsList');
  if (newsList) {
    const renderNews = (filter='ALL') => {
      const arr = filter==='ALL' ? D.news : D.news.filter(n=>n.category===filter);
      newsList.innerHTML = arr.map(n=>`<a class="news-list-card reveal" href="${n.url}" target="_blank" rel="noopener"><img src="${n.image}" alt="${n.title}" loading="lazy"><div class="body"><div class="meta"><span>${n.date}</span><b>${n.category}</b></div><h2>${n.title}</h2><p>${n.excerpt}</p><strong style="font-size:12px">写真・大会報告を見る →</strong></div></a>`).join('');
      observeReveal();
    };
    renderNews();
    $$('.filter-chip').forEach(b=>b.addEventListener('click',()=>{
      $$('.filter-chip').forEach(x=>x.classList.remove('active')); b.classList.add('active'); renderNews(b.dataset.filter);
    }));
  }

  // Gallery
  const gallery = $('#galleryGrid');
  if (gallery) gallery.innerHTML = D.gallery.map(g=>`<figure class="gallery-item reveal"><img src="${g.src}" alt="${g.alt}" loading="lazy"></figure>`).join('');

  // Partners
  const partnerGrid = $('#partnerGrid');
  if (partnerGrid) partnerGrid.innerHTML = D.partners.map(p=>{
    const inside=`<img src="${p.logo}" alt="" loading="lazy"><span>${p.name}</span>`;
    const safe = typeof p.url==='string' && /^https:\/\//i.test(p.url);
    const instagram = safe && /^https:\/\/(www\.)?instagram\.com\//i.test(p.url);
    return safe ? `<a class="partner-card partner-link reveal" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="${p.name}の${instagram?'Instagram':'公式サイト'}を開く（新しいタブ）">${inside}<small>${instagram?'Instagram':'公式サイト'} <span aria-hidden="true">↗</span></small></a>` : `<div class="partner-card reveal">${inside}</div>`;
  }).join('');

  // FAQ
  const faq = $('#faqList');
  if (faq) faq.innerHTML = D.faq.map((f,i)=>`<details ${i===0?'open':''}><summary>${f.q}<span>＋</span></summary><p>${f.a}</p></details>`).join('');

  // Jotform
  const formFrame = $('#contactFrame');
  if (formFrame) formFrame.src = D.social.contactForm;

  // Background music + PV coordination
  const bgm = $('#siteBgm'); const sound = $('#soundToggle'); const pv = $('#teamPV');
  if (bgm && sound) {
    bgm.src = '/assets/media/essential-ballers-arena-edm.mp3';
    bgm.volume = 0.8;
    let wanted = false;
    const sync = () => { const on=!bgm.paused; sound.classList.toggle('on',on); sound.textContent=on?'♪ BGM ON':'♪ BGM OFF'; sound.setAttribute('aria-pressed',String(on)); sound.setAttribute('aria-label',on?'EDMのBGMを停止':'EDMのBGMを再生'); };
    sound.addEventListener('click', async()=>{ if(bgm.paused){try{await bgm.play();wanted=true}catch(e){wanted=false;sound.textContent='♪ もう一度タップして再生';sound.setAttribute('aria-label','BGMを再生できませんでした。もう一度お試しください');return;}}else{bgm.pause();wanted=false} sync(); });
    if(pv){pv.addEventListener('play',()=>{if(!bgm.paused)bgm.pause();sync()});pv.addEventListener('pause',async()=>{if(wanted&&pv.currentTime>0&&pv.currentTime<pv.duration){try{await bgm.play()}catch(e){}}sync()});pv.addEventListener('ended',async()=>{if(wanted){try{await bgm.play()}catch(e){}}sync()});}
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&!bgm.paused)bgm.pause();sync()}); sync();
  }

  // Reveal animation
  function observeReveal(){
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced || typeof IntersectionObserver==='undefined'){$$('.reveal').forEach(el=>el.classList.add('in'));return;}
    const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
    $$('.reveal').filter(el=>!el.classList.contains('in')).forEach(el=>io.observe(el));
  }
  observeReveal();
})();


;(function integrationRuntime(){
  const SUPPORT_PATH='/supporters?utm_source=essential_official&utm_medium=website&utm_campaign=founding50';
  const PARTNER_PATH='https://form.jotform.com/262791310335049';
  if(window.__EB_SUPPORTERS_INTEGRATED__) return;
  window.__EB_SUPPORTERS_INTEGRATED__=true;

  const style=document.createElement('style');
  style.textContent=`
    .eb-supporters-nav{position:relative}
    .eb-supporters-nav::after{content:"LIVE";position:absolute;right:4px;top:2px;font-size:7px;line-height:1;font-weight:950;letter-spacing:.08em;color:#10a9b7}
    .eb-supporters-band{position:relative;overflow:hidden;background:#061f24;color:#fff}
    .eb-supporters-band::before{content:"";position:absolute;width:520px;height:520px;border-radius:50%;right:-180px;top:-260px;background:rgba(16,169,183,.18)}
    .eb-supporters-band .wrap{position:relative;z-index:2}
    .eb-supporters-head{display:grid;grid-template-columns:.92fr 1.08fr;gap:48px;align-items:end;margin-bottom:34px}
    .eb-supporters-title{font-size:clamp(48px,7vw,92px);line-height:.88;letter-spacing:-.055em;margin:10px 0 0}
    .eb-supporters-copy{color:rgba(255,255,255,.68);max-width:680px}
    .eb-supporters-pills{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}
    .eb-supporters-pill{font-size:10px;font-weight:900;letter-spacing:.08em;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:8px 11px;color:#bfe8e6}
    .eb-supporters-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:28px}
    .eb-supporters-card{border:1px solid rgba(255,255,255,.14);border-radius:24px;padding:22px;background:rgba(255,255,255,.05)}
    .eb-supporters-card.featured{background:#fff;color:#061f24}
    .eb-supporters-card small{display:block;font-size:10px;font-weight:950;letter-spacing:.12em;color:#71d5d0}
    .eb-supporters-card.featured small{color:#0b8e98}
    .eb-supporters-card strong{display:block;font-size:24px;margin:10px 0 6px}
    .eb-supporters-price{font-size:36px;font-weight:950;letter-spacing:-.04em}
    .eb-supporters-price span{font-size:12px;font-weight:800;opacity:.65;margin-left:4px}
    .eb-supporters-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}
    .eb-supporters-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 20px;border-radius:999px;font-size:12px;font-weight:950}
    .eb-supporters-actions .primary{background:#10a9b7;color:#05272c}
    .eb-supporters-actions .secondary{border:1px solid rgba(255,255,255,.24);color:#fff}
    .eb-supporters-mini{margin-top:16px;color:rgba(255,255,255,.52);font-size:11px}
    .eb-dual-support{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:34px}
    .eb-dual-support>a{display:block;border-radius:26px;padding:28px;background:#061f24;color:#fff;min-height:210px;position:relative;overflow:hidden}
    .eb-dual-support>a:last-child{background:#eaf5f4;color:#061f24;border:1px solid rgba(6,31,36,.12)}
    .eb-dual-support small{font-size:10px;letter-spacing:.12em;font-weight:950;color:#10a9b7}
    .eb-dual-support strong{display:block;font-size:30px;line-height:1.05;margin:18px 0 8px;letter-spacing:-.04em}
    .eb-dual-support p{margin:0;opacity:.7;font-size:13px}
    .eb-supporter-top{font-weight:950!important;color:#0a8790!important}
    @media(max-width:850px){.eb-supporters-head,.eb-supporters-grid,.eb-dual-support{grid-template-columns:1fr}.eb-supporters-grid{gap:9px}.eb-supporters-card{padding:19px}}
    @media(max-width:560px){.eb-supporters-title{font-size:52px}.eb-supporters-band{padding:64px 0!important}.eb-supporters-actions a{width:100%}.eb-dual-support>a{min-height:auto}}
  `;
  document.head.appendChild(style);

  function make(html){
    const holder=document.createElement('div');
    holder.innerHTML=html.trim();
    return holder.firstElementChild;
  }
  function addLink(container,beforeSelector,html){
    if(!container||container.querySelector('[data-eb-supporters]')) return;
    const el=make(html);
    const before=beforeSelector?container.querySelector(beforeSelector):null;
    if(before) container.insertBefore(el,before); else container.appendChild(el);
  }

  document.querySelectorAll('.nav-links').forEach(nav=>addLink(nav,'a[data-nav="partners"]','<a class="eb-supporters-nav" data-eb-supporters href="'+SUPPORT_PATH+'">SUPPORTERS<small class="nav-ja">個人サポーター</small></a>'));
  addLink(document.querySelector('.mobile-panel nav'),'a[href="partners.html"]','<a data-eb-supporters href="'+SUPPORT_PATH+'">SUPPORTERS<small class="nav-ja">個人サポーター</small></a>');
  document.querySelectorAll('.footer-links').forEach(foot=>addLink(foot,'a[href="partners.html"]','<a data-eb-supporters href="'+SUPPORT_PATH+'">SUPPORTERS<small class="nav-ja">個人サポーター</small></a>'));

  const util=document.querySelector('.utility-right');
  if(util&&!util.querySelector('[data-eb-supporters]')){
    const a=document.createElement('a');
    a.dataset.ebSupporters='';
    a.className='eb-supporter-top';
    a.href=SUPPORT_PATH;
    a.textContent='SUPPORTERS';
    util.insertBefore(a,util.querySelector('.utility-cta'));
  }

  const page=document.body&&document.body.dataset?document.body.dataset.page:'';
  const main=document.querySelector('main');

  if(page==='home'&&main&&!document.querySelector('#ebSupportersOfficial')){
    const section=document.createElement('section');
    section.id='ebSupportersOfficial';
    section.className='section eb-supporters-band';
    section.innerHTML=
      '<div class="wrap">'+
        '<div class="eb-supporters-head">'+
          '<div><span class="eyebrow">ESSENTIAL SUPPORTERS / FOUNDING 50</span><h2 class="eb-supporters-title">STAND<br>WITH THE<br>TEAM.</h2></div>'+
          '<div><p class="eb-supporters-copy">選手・保護者だけで支えるクラブから、地域のみんなで育てるクラブへ。OB・OG、元保護者、ご家族、地域の方も、月550円からEssential ballersを継続的に応援できます。</p><div class="eb-supporters-pills"><span class="eb-supporters-pill">決済完了順 FOUNDING 50</span><span class="eb-supporters-pill">匿名参加OK</span><span class="eb-supporters-pill">いつでも期間末解約</span></div></div>'+
        '</div>'+
        '<div class="eb-supporters-grid">'+
          '<article class="eb-supporters-card"><small>SUPPORTER</small><strong>まずは気軽に応援</strong><div class="eb-supporters-price">¥550<span>/月</span></div></article>'+
          '<article class="eb-supporters-card featured"><small>SUPPORTER＋</small><strong>もう一歩近くで応援</strong><div class="eb-supporters-price">¥1,100<span>/月</span></div></article>'+
          '<article class="eb-supporters-card"><small>PATRON</small><strong>育成環境を強く支える</strong><div class="eb-supporters-price">¥3,300<span>/月</span></div></article>'+
        '</div>'+
        '<div class="eb-supporters-actions"><a class="primary" href="'+SUPPORT_PATH+'">プランを見る・正式加入 →</a><a class="secondary" href="partners.html">企業・団体で支える →</a></div>'+
        '<p class="eb-supporters-mini">月額・年額から選べます。正式加入・決済・会員管理はStripeを利用します。</p>'+
      '</div>';
    const target=document.querySelector('.instagram-band')||document.querySelector('main .section.dark:last-of-type');
    if(target) target.parentNode.insertBefore(section,target); else main.appendChild(section);
  }

  if(page==='partners'&&main&&!document.querySelector('#ebPartnerChoice')){
    const container=document.createElement('section');
    container.id='ebPartnerChoice';
    container.className='section';
    container.innerHTML=
      '<div class="wrap">'+
        '<div class="section-head"><div><span class="eyebrow">TWO WAYS TO SUPPORT</span><h2 class="section-title">SUPPORT<br>THE TEAM.</h2></div><p class="section-lead">個人の方はESSENTIAL SUPPORTERS、企業・団体の皆さまはPARTNER PROGRAMから。立場に合わせてチームを支える入口を用意しています。</p></div>'+
        '<div class="eb-dual-support">'+
          '<a href="'+SUPPORT_PATH+'"><small>FOR INDIVIDUALS</small><strong>ESSENTIAL<br>SUPPORTERS</strong><p>月550円から。OB・OG、元保護者、ご家族、地域の皆さまへ。</p></a>'+
          '<a href="'+PARTNER_PATH+'" target="_blank" rel="noopener"><small>FOR COMPANIES</small><strong>PARTNER<br>PROGRAM</strong><p>年間活動、Festival、遠征、用具、地域共創などをご相談いただけます。</p></a>'+
        '</div>'+
      '</div>';
    const firstSection=main.querySelector('.section');
    if(firstSection) firstSection.parentNode.insertBefore(container,firstSection.nextSibling); else main.appendChild(container);
  }

  if(page==='festival'&&main&&!document.querySelector('#ebFestivalSupport')){
    const section=document.createElement('section');
    section.id='ebFestivalSupport';
    section.className='section eb-supporters-band';
    section.innerHTML=
      '<div class="wrap"><div class="eb-supporters-head">'+
        '<div><span class="eyebrow">SUPPORT THE NEXT EXPERIENCE</span><h2 class="eb-supporters-title">KEEP THE<br>COURT OPEN.</h2></div>'+
        '<div><p class="eb-supporters-copy">Festivalだけでなく、日々の育成・大会・遠征まで。個人Supportersと企業Partnerの両方から、子どもたちの経験を支えることができます。</p><div class="eb-supporters-actions"><a class="primary" href="'+SUPPORT_PATH+'">個人で応援する →</a><a class="secondary" href="'+PARTNER_PATH+'" target="_blank" rel="noopener">企業・団体で相談する →</a></div></div>'+
      '</div></div>';
    main.appendChild(section);
  }
})();
