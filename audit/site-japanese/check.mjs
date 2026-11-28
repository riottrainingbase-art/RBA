import fs from "node:fs";
import path from "node:path";

const roots=["app","components","lib","definitive-content","public/rba-definitive"];
const exts=new Set([".ts",".tsx",".js",".mjs",".html",".css",".json"]);
const mojibake=[
  ["replacement-char",/�/],
  ["utf8-double-encoded",/(?:縺[ｧｨ九後]|譁[�]|繧[�]|螟[�]|蜿[�]|髯[�]|蛹[�])/],
  ["latin-mojibake",/(?:â€|â€™|â€œ|â€|Ã.|Â[^s])/],
];
const stale=[
  ["saga-old-date-ja",/2026\.10\.04[–-]05|10月4日[・〜～-]5日/],
  ["saga-old-date-en",/04[–-]05 OCT 2026/],
];
const awkward=[
  ["players-meta",/Riot Basketball Academyの選手の方へに関する情報をご案内します。/],
  ["families-meta",/Riot Basketball Academyの保護者の方へに関する情報をご案内します。/],
  ["coaches-meta",/Riot Basketball Academyのコーチ・指導者の方へに関する情報をご案内します。/],
];

function walk(dir,out=[]){
  if(!fs.existsSync(dir))return out;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name);
    if(entry.isDirectory())walk(p,out);
    else if(exts.has(path.extname(entry.name)))out.push(p);
  }
  return out;
}

const files=roots.flatMap(root=>walk(root));
const failures=[];
for(const file of files){
  let source;
  try{source=fs.readFileSync(file,"utf8");}catch{continue}
  for(const [rule,re] of [...mojibake,...stale,...awkward]){
    const m=source.match(re);
    if(m)failures.push({file,rule,sample:m[0]});
  }
}

// Corporate sponsorship visibility is a permanent product requirement.
// Keep this guard in CI so future home redesigns cannot silently hide recruitment.
const sponsorChecks=[
  ["components/simple-japanese-home.tsx","<CorporateSupportStrip locale=\"ja\" directoryOnly />","ja-home-sponsor-visibility"],
  ["components/localized-home.tsx","<CorporateSupportStrip locale={locale} />","multilingual-home-sponsor-visibility"],
  ["app/ja/gream-sendai/page.tsx","<CorporateSupportStrip locale=\"ja\" />","gream-home-sponsor-visibility"],
  ["components/corporate-support-strip.tsx","data-corporate-support=\"persistent-home\"","persistent-support-marker"],
  ["components/corporate-support-strip.tsx","home-corporate-sponsor-enquiry","corporate-sponsor-enquiry-cta"],
  ["components/corporate-support-strip.tsx","/ja/support#apply","monthly-corporate-ad-cta"],
  ["components/sponsor-partner-page.tsx","sponsor-options","partner-page-sponsor-programmes"],
  ["components/sponsor-partner-page.tsx","263089038431054","partner-page-free-enquiry-link"],
  ["components/corporate-support-strip.tsx","2026年 協賛実績","historical-sponsor-label"],
  ["components/sponsor-programme-clarity.tsx","月額11,000円の企業広告","sponsor-monthly-vs-top-faq"],
  ["components/sponsor-programme-clarity.tsx","トップページへの掲載","separate-homepage-sponsorship-rights"],
  ["components/sponsor-programme-clarity.tsx","選手・保護者の名簿","minor-privacy-sponsor"],
  ["app/ja/support/page.tsx","トップページ上部","monthly-advertising-disclaimer"],
  ["components/sponsor-partner-page.tsx","<SponsorProgrammeClarity />","sponsor-clarity-integrated"],
  ["components/sponsor-programme-clarity.tsx","/ja/partners/brief","sponsor-printable-deck-link"],
  ["app/ja/partners/brief/page.tsx","トップページ上部への企業ロゴ掲出","corporate-brief-placement-clarity"],
];
for(const [file,needle,rule] of sponsorChecks){
  if(!fs.existsSync(file)||!fs.readFileSync(file,"utf8").includes(needle)){
    failures.push({file,rule,sample:"missing required sponsor recognition or recruitment route"});
  }
}

// Guard the mobile-first contact route against blank/white-on-white buttons and
// accidental removal of the accessible first-visit links.
const homeConversionGuards = [
  ["components/simple-japanese-home.tsx", "RBAについて", "host-dark-section"],
  ["components/simple-japanese-home.tsx", "地域でのクリニック開催を相談する", "host-primary-label"],
  ["components/simple-japanese-home.tsx", "href=\"/ja/clinic-request\"", "host-official-contact-route"],
  ["components/simple-japanese-home.tsx", "開催予定・参加申込", "first-visit-identifier"],
  ["components/simple-japanese-home.tsx", "仙台のスクール・チーム", "first-visit-japanese-heading"],
  ["components/simple-japanese-home.tsx", "小学生の活動", "first-visit-family"],
  ["components/simple-japanese-home.tsx", "スクールの日程・体験", "first-visit-school"],
  ["components/simple-japanese-home.tsx", "指導者向け講習", "first-visit-coach"],
  ["components/simple-japanese-home.tsx", "海外チームの来日相談", "first-visit-host"],
  ["components/simple-japanese-home.module.css", ".hostPrimary,.hostPrimary:visited", "host-visited-link-contrast"],
  ["components/simple-japanese-home.module.css", "color:#191b1d !important;", "host-legible-text-colour"],
  ["components/simple-japanese-home.module.css", "background-color:#fff;", "host-white-button-background"],
  ["components/simple-japanese-home.module.css", ".hostFormats li{", "nonbroken-format-labels"],
  ["components/simple-japanese-home.module.css", "@media (max-width:530px)", "mobile-390-breakpoint"],
];
for (const [file,fragment,rule] of homeConversionGuards) {
  if (!fs.existsSync(file) || !fs.readFileSync(file,"utf8").includes(fragment))
    failures.push({ file, rule, sample:"mobile conversion / accessibility guard missing" });
}

// Prevent a homepage regression to repeated campaign panels or buried signup paths.
const organizedHome = fs.readFileSync("components/simple-japanese-home.tsx","utf8");
const homePositions = ['id="home-programmes"', 'id="home-sendai-school"', '<h2>指導者向け講習', 'id="home-host"', 'id="home-partners"'];
for (let i=0;i<homePositions.length;i++) {
  const position=organizedHome.indexOf(homePositions[i]);
  const preceding=i===0 ? -1 : organizedHome.indexOf(homePositions[i-1]);
  if(position<0 || position<=preceding) {
    failures.push({file:"components/simple-japanese-home.tsx",rule:"home-priority-order",sample:homePositions[i]});
  }
}
for (const removed of [
  "<OkinawaCampGrowthPanel",
  "<OkinawaDecemberCampCallout",
  "<NovemberCampaign",
  "styles.purposeGrid",
  "gream-sendai-u15-recruit",
  "sendai-school-trial",
  "kagoshima-clinic-home",
  "home-share-kit",
]) {
  if(organizedHome.includes(removed))
    failures.push({file:"components/simple-japanese-home.tsx",rule:"duplicate-home-promotion",sample:removed});
}
if((organizedHome.match(/<CorporateSupportStrip locale="ja" directoryOnly \/>/g)||[]).length !== 1)
  failures.push({file:"components/simple-japanese-home.tsx",rule:"one-corporate-record-block",sample:"expected one sponsor component"});
if((organizedHome.match(/id="home-programmes"/g)||[]).length !== 1)
  failures.push({file:"components/simple-japanese-home.tsx",rule:"one-event-index",sample:"expected one event index"});
const partnerNav=fs.readFileSync("components/site-frame.tsx","utf8");
if(!partnerNav.includes('["パートナー","/ja/partners"]'))
  failures.push({file:"components/site-frame.tsx",rule:"partner-top-navigation",sample:"partner nav missing"});
const partnerStrip=fs.readFileSync("components/corporate-support-strip.tsx","utf8");
if(!partnerStrip.includes("PARTNERS / 協賛・パートナー"))
  failures.push({file:"components/corporate-support-strip.tsx",rule:"partner-label",sample:"partner label missing"});

// Protect public trust links and correct indexing across all four languages.
// This guards the shared header/footer, rather than auditing only one landing page.
const governanceRoutes=[
  "app/ja/about/governance/page.tsx",
  "app/about/governance/page.tsx",
  "app/zh-tw/about/governance/page.tsx",
  "app/ko/about/governance/page.tsx",
];
for(const route of governanceRoutes){
 if(!fs.existsSync(route))failures.push({file:route,rule:"governance-route-missing",sample:"all four locales need a working organisation route"});
}
const sharedFrame=fs.readFileSync("components/site-frame.tsx","utf8");
for(const fragment of [
 "about/governance", "governanceLabels", "safetyLabels", "footer-purpose",
 "href={governanceHref}", 'href="mailto:riot.training.base@gmail.com"'
]){
 if(!sharedFrame.includes(fragment))failures.push({file:"components/site-frame.tsx",rule:"trust-navigation",sample:fragment});
}
const sitemapSrc=fs.readFileSync("app/sitemap.ts","utf8");
for(const fragment of ["governancePages", "...governancePages.map"]){
 if(!sitemapSrc.includes(fragment))failures.push({file:"app/sitemap.ts",rule:"governance-sitemap",sample:fragment});
}
const robotsSrc=fs.readFileSync("app/robots.ts","utf8");
for(const fragment of ["/api/","/ja/my-homecourt/app","/signin-with-chatgpt"]){
 if(!robotsSrc.includes(fragment))failures.push({file:"app/robots.ts",rule:"auth-crawl-hygiene",sample:fragment});
}
const bylawsSrc=fs.readFileSync("components/rba-governance-content.ts","utf8");
for(const fragment of ["effectiveBylaws","proposedBylaws","2026年7月7日"]){
 if(!bylawsSrc.includes(fragment))failures.push({file:"components/rba-governance-content.ts",rule:"effective-versus-draft",sample:fragment});
}


// Public information desk: prevent renewed false certainty in live event listings.
const statusRoute="app/ja/updates/page.tsx";
const factsRegister="lib/rba-public-status.ts";
if(!fs.existsSync(statusRoute))failures.push({file:statusRoute,rule:"official-information-route",sample:"missing"});
if(!fs.existsSync(factsRegister))failures.push({file:factsRegister,rule:"public-facts-register",sample:"missing"});
if(fs.existsSync(factsRegister)){
 const status=fs.readFileSync(factsRegister,"utf8");
 for(const needle of ["開催予定","準備・協議中","RBA GROWTH AWARDS","MY HOME COURT","D-HUB COACH LAB","青龍ラーテルズ","2027年1月5〜7日"]){
  if(!status.includes(needle))failures.push({file:factsRegister,rule:"status-categorization",sample:needle});
 }
 if(/suger\.snow|sayaco0529|take9811225|\bSKY15[45]\b/.test(status)){
  failures.push({file:factsRegister,rule:"child-travel-privacy",sample:"private trip contact or flight number in public facts"});
 }
}
const tatsunoFile="app/ja/events/kobe-development-camp-2026/page.tsx";
if(fs.existsSync(tatsunoFile)){
 const tatsuno=fs.readFileSync(tatsunoFile,"utf8");
 for(const stale of ["11/23は16:00終了","本キャンプ3日間を担当します。","会場の利用枠と宿泊条件を最終確認しています。"]){
  if(tatsuno.includes(stale))failures.push({file:tatsunoFile,rule:"stale-tatsuno-guidance",sample:stale});
 }
 for(const must of ["青龍ラーテルズ","11/23は別会場","11/23午前の練習には参加しません"]){
  if(!tatsuno.includes(must))failures.push({file:tatsunoFile,rule:"tatsuno-confirmed-conditions",sample:must});
 }
}
for(const [file,required] of [
 ["components/simple-japanese-home.tsx",'href="/ja/updates"'],
 ["components/site-frame.tsx",'href="/ja/updates"'],
 ["app/sitemap.ts","publicStatusPages"]
]){
 if(!fs.existsSync(file)||!fs.readFileSync(file,"utf8").includes(required)){
  failures.push({file,rule:"status-navigation",sample:required});
 }
}
// 2026-11-28: fixed live link audit regressions. Shared components cover all four locales.
const linkAuditRead=(file)=>fs.readFileSync(file,"utf8");
const gream=linkAuditRead("app/ja/gream-sendai/page.tsx");
const linkAuditPayments=linkAuditRead("components/localized-payments.tsx");
const linkAuditSchedule=linkAuditRead("components/localized-schedule.tsx");
const unitedGuide=linkAuditRead("components/united-participation-guide.tsx");
const linkAuditGuards=[
  ["gream-first-view",gream.indexOf("<GreamBrandHeading")>=0&&gream.indexOf("<GreamBrandHeading")<gream.indexOf("<CorporateSupportStrip"),"app/ja/gream-sendai/page.tsx"],
  ["gream-trial-before-annual",gream.indexOf('data-growth-id="gream-sendai-hero-trial"')>=0&&gream.indexOf('data-growth-id="gream-sendai-hero-trial"')<gream.indexOf("<GreamAnnualPlan"),"app/ja/gream-sendai/page.tsx"],
  ["gream-bio-direct",linkAuditRead("app/ja/links/page.tsx").includes('href:"/ja/gream-sendai/monthly-trial"'),"app/ja/links/page.tsx"],
  ["sendai-payment-anchor",linkAuditPayments.includes('id="sendai-u15"')&&linkAuditPayments.includes('/ja/u15-skill-up#apply')&&linkAuditSchedule.includes('event.id==="sendai-u15"?"/ja/u15-skill-up"'),"components/localized-payments.tsx"],
  ["completed-okinawa-no-checkout",!linkAuditPayments.includes('/ja/events/okinawa-clinic-2026-11-14#entry')&&linkAuditPayments.includes('2026.11.14 / OKINAWA / COMPLETED'),"components/localized-payments.tsx"],
  ["payment-event-date-gate",linkAuditPayments.includes('ids.filter(id=>isProgrammeActive(programmeById[id]))'),"components/localized-payments.tsx"],
  ["member-reflection-login",!unitedGuide.includes('#member-reflection')&&unitedGuide.includes('href={locale==="ja"?`${app}/start`:app}'),"components/united-participation-guide.tsx"],
  ["aichi-and-trial-sitemap",linkAuditRead("app/sitemap.ts").includes('"/ja/events/aichi-clinic-2027"')&&linkAuditRead("app/sitemap.ts").includes('"/ja/gream-sendai/monthly-trial"'),"app/sitemap.ts"],
  ["aichi-payment-gate",linkAuditRead("lib/aichi-clinic-payments.ts").includes('AICHI_CLINIC_PAYMENT_ENABLED==="true"'),"lib/aichi-clinic-payments.ts"],
  ["journal-reference-replacement",linkAuditRead("lib/public-content.ts").includes('withVerifiedJournalReferences')&&linkAuditRead("lib/public-content.ts").includes('dailyguardian.com.ph/blog/pba-nlex-fortifies-coaching-staff-after-adding-jong-uichico'),"lib/public-content.ts"],
];
for(const [rule,passed,file] of linkAuditGuards)if(!passed)failures.push({file,rule,sample:"public link regression"});

if(failures.length){
  console.error(JSON.stringify({status:"failed",filesChecked:files.length,failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  status:"passed",
  filesChecked:files.length,
  scope:"Japanese mojibake, stale Saga dates and known unnatural metadata regressions."
},null,2));
