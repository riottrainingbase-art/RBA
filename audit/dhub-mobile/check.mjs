import fs from "node:fs";

const read=(path)=>fs.readFileSync(path,"utf8");
const failures=[];
const requireText=(path,text,label)=>{
  const source=read(path);
  if(!source.includes(text))failures.push(`${label} (${path})`);
};

requireText("public/rba-definitive/assets/site.js","addEventListener('pageshow',()=>closeMenu(false,true))","PWA/bfcache pageshow unlock");
requireText("public/rba-definitive/assets/site.js","addEventListener('pagehide',()=>closeMenu(false,true))","pagehide unlock");
requireText("public/rba-definitive/assets/site.js","data-rba-scroll-lock","owned scroll-lock marker");
requireText("public/rba-definitive/assets/site.js","visibilitychange","app background scroll recovery");
requireText("public/rba-definitive/assets/platform-mobile-v8.css","safe-area-inset-bottom","static mobile safe-area");
requireText("app/globals.css","site-shell>main#main-content","SiteFrame fixed-dock content clearance");
requireText("app/globals.css","safe-area-inset-bottom","SiteFrame iPhone safe-area");

for(const path of ["definitive-content/ja/d-hub.html","definitive-content/ja/d-hub-coaches.html","definitive-content/ja/d-hub-players.html"]){
  requireText(path,'class="site-header"',"D-HUB shared header");
  requireText(path,'class="mobile-btn"',"D-HUB mobile menu button");
  requireText(path,'class="mobile-panel"',"D-HUB mobile menu panel");
}
requireText("definitive-content/ja/d-hub-coaches.html","初めての方｜COACH LABに参加","Coach first-time CTA");
requireText("definitive-content/ja/d-hub-coaches.html","支払い済みなのに入れない方","Coach access-recovery CTA");
requireText("definitive-content/ja/d-hub-players.html","初めての方｜PLAYERSに参加","Players first-time CTA");
requireText("definitive-content/ja/d-hub-players.html","Gream所属選手｜RBA IDでチーム登録","Gream entitlement CTA");
requireText("app/ja/d-hub/coaches/member/page.tsx","linked_user_id===user.id","Coach membership identity binding");

if(failures.length){
  console.error("D-HUB mobile/governance audit failed:");
  for(const failure of failures)console.error(" - "+failure);
  process.exit(1);
}
console.log("D-HUB mobile/governance audit passed.");
