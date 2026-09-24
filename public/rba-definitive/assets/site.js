(() => {
  // RBA BLACK LABEL product layer
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // one-time brand cold open per session
  let showIntro=false; try { showIntro=!sessionStorage.getItem('rba-intro'); sessionStorage.setItem('rba-intro','1'); } catch {}
  if(showIntro){
    const intro=document.createElement('div'); intro.className='rba-intro'; intro.innerHTML='<div><div class="rba-intro-mark">RBA</div><div class="rba-intro-line"></div></div>'; document.body.prepend(intro);
    setTimeout(()=>intro.classList.add('is-gone'), reduce?80:1100); setTimeout(()=>intro.remove(), reduce?400:1900);
  }

  // global chrome
  const progress=document.createElement('div'); progress.className='scroll-progress'; document.body.prepend(progress);
  const aura=document.createElement('div'); aura.className='cursor-aura'; document.body.prepend(aura);
  let lastY=0;
  const header=$('.site-header');
  const syncScroll=()=>{
    const y=scrollY, max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=`${max>0?(y/max)*100:0}%`;
    header?.classList.toggle('is-scrolled',y>12);
    if(y>140 && y>lastY+10) header?.classList.add('is-hidden');
    if(y<lastY-10 || y<80) header?.classList.remove('is-hidden');
    lastY=y;
  };
  addEventListener('scroll',syncScroll,{passive:true}); syncScroll();

  // Accessible navigation; no authentication or commerce behavior here.
  const locale=location.pathname.split('/')[1];
  const words=({ja:['メニューを開く','メニューを閉じる','ページ内メニュー'], 'zh-tw':['開啟選單','關閉選單','頁面章節'], ko:['메뉴 열기','메뉴 닫기','페이지 목차']})[locale] || ['Open menu','Close menu','Page sections'];
  const btn=$('.mobile-btn'), panel=$('.mobile-panel');
  let previousOverflow='';
  const closeMenu=(restoreFocus=false)=>{
    if(!panel?.classList.contains('open'))return;
    panel.classList.remove('open'); panel.setAttribute('aria-hidden','true');
    btn?.setAttribute('aria-expanded','false');btn?.setAttribute('aria-label',words[0]);
    document.body.style.overflow=previousOverflow;
    if(restoreFocus)btn?.focus();
  };
  const openMenu=()=>{
    if(!panel)return;
    previousOverflow=document.body.style.overflow;
    panel.classList.add('open');panel.setAttribute('aria-hidden','false');
    btn?.setAttribute('aria-expanded','true');btn?.setAttribute('aria-label',words[1]);
    document.body.style.overflow='hidden';panel.querySelector('a[href]')?.focus();
  };
  btn?.setAttribute('aria-label',words[0]);
  btn?.addEventListener('click',()=>panel?.classList.contains('open')?closeMenu(true):openMenu());
  $$('.mobile-panel a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
  document.addEventListener('keydown',e=>{
    if(!panel?.classList.contains('open'))return;
    if(e.key==='Escape'){e.preventDefault();closeMenu(true);}
    if(e.key==='Tab'){
      const items=[btn,...panel.querySelectorAll('a[href],button:not([disabled])')].filter(Boolean);
      const first=items[0],last=items.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    }
  });
  addEventListener('resize',()=>{if(innerWidth>1080)closeMenu(true);},{passive:true});

  // chapter numbers + stagger groups
  $$('.section').forEach((el,i)=>{el.dataset.chapter=String(i+1).padStart(2,'0');el.classList.add('reveal');});
  $$('.grid4,.grid3,.role-grid,.roadmap,.vision-targets').forEach(el=>el.classList.add('reveal-stagger'));
  const observed=[...$$('.reveal'),...$$('.reveal-stagger'),...$$('.scale-strip'),...$$('.marquee')];
  if(!reduce && 'IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.07,rootMargin:'0px 0px -7%'});
    observed.forEach(el=>io.observe(el));
  } else observed.forEach(el=>el.classList.add('is-visible'));

  // hero light follows pointer, aura follows viewport pointer
  const hero=$('.hero');
  if(!reduce){
    addEventListener('pointermove',e=>{aura.style.left=e.clientX+'px';aura.style.top=e.clientY+'px';},{passive:true});
    hero?.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',`${((e.clientX-r.left)/r.width)*100}%`);hero.style.setProperty('--my',`${((e.clientY-r.top)/r.height)*100}%`)});
  }

  // semantic court grid on signature surfaces
  $$('.hero,.network-map,.opportunity-finder,.proof-layer').forEach(el=>{if(!$('.court-grid',el)){const g=document.createElement('div');g.className='court-grid';g.setAttribute('aria-hidden','true');el.prepend(g)}});

  // opportunity filters
  $$('.filter-chip').forEach(chip=>chip.addEventListener('click',()=>{
    $$('.filter-chip').forEach(x=>x.classList.remove('is-active')); chip.classList.add('is-active'); const f=chip.dataset.filter||'all';
    $$('.finder-item').forEach(item=>item.classList.toggle('is-filtered',f!=='all' && item.dataset.type!==f));
  }));

  // sticky chapter rail on long pages
  const sections=$$('main > section[id], main > section.section, main > section.opportunity-finder, main > section.proof-layer');
  if(sections.length>3 && 'IntersectionObserver' in window){
    const rail=document.createElement('nav'); rail.className='chapter-rail'; rail.setAttribute('aria-label',words[2]);
    sections.slice(0,12).forEach((s,i)=>{if(!s.id)s.id='section-'+(i+1); const b=document.createElement('button');b.className='chapter-dot';b.innerHTML='<span>'+(s.querySelector('.eyebrow,.kicker')?.textContent.trim()||String(i+1).padStart(2,'0'))+'</span>';b.addEventListener('click',()=>s.scrollIntoView({behavior:reduce?'auto':'smooth'}));rail.appendChild(b)});
    document.body.appendChild(rail);
    const dots=$$('.chapter-dot',rail); const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){dots.forEach(x=>x.classList.remove('is-active')); const idx=sections.slice(0,12).indexOf(e.target); if(idx>=0)dots[idx]?.classList.add('is-active')}}),{rootMargin:'-42% 0px -50%',threshold:0}); sections.slice(0,12).forEach(s=>rio.observe(s));
  }

  // network orbit
  $$('.network-map').forEach(el=>{if(!$('.orbit',el)){const o=document.createElement('div');o.className='orbit';o.setAttribute('aria-hidden','true');el.prepend(o)}});

  // Next.js paths are extensionless. Query strings do not change the active page.
  const normalise=p=>p.replace(/\/+$/,'') || '/';
  $$('.desktop-nav a,.mobile-panel a').forEach(a=>{
    const target=new URL(a.getAttribute('href')||'',location.href);
    if(target.origin===location.origin && normalise(target.pathname)===normalise(location.pathname))a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
  $$('.filter-chip').forEach(chip=>{
    chip.setAttribute('aria-pressed',String(chip.classList.contains('is-active')));
    chip.addEventListener('click',()=>$$('.filter-chip').forEach(x=>x.setAttribute('aria-pressed',String(x===chip))));
  });
})();
