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
  ["components/simple-japanese-home.tsx","<CorporateSupportStrip locale=\"ja\" />","ja-home-sponsor-visibility"],
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
  ["components/simple-japanese-home.tsx", "FOR TEAMS &amp; LOCAL ORGANISERS", "host-dark-section"],
  ["components/simple-japanese-home.tsx", "無料で開催相談する", "host-primary-label"],
  ["components/simple-japanese-home.tsx", "href=\"/ja/clinic-request\"", "host-official-contact-route"],
  ["components/simple-japanese-home.tsx", "FIRST TIME HERE?", "first-visit-identifier"],
  ["components/simple-japanese-home.tsx", "はじめてRBAを知った方へ。", "first-visit-japanese-heading"],
  ["components/simple-japanese-home.tsx", "選手・保護者の方", "first-visit-family"],
  ["components/simple-japanese-home.tsx", "スクールを探す方", "first-visit-school"],
  ["components/simple-japanese-home.tsx", "指導者・チームの方", "first-visit-coach"],
  ["components/simple-japanese-home.tsx", "地域の主催者の方", "first-visit-host"],
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
const homePositions = [
  "<section className={styles.hero}",
  'id="home-programmes"',
  'id="home-partners"',
  'id="home-next-step"',
  "home-age-categories",
  "<SendaiCommunity />",
];
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
if((organizedHome.match(/<CorporateSupportStrip locale="ja" \/>/g)||[]).length !== 1)
  failures.push({file:"components/simple-japanese-home.tsx",rule:"one-corporate-record-block",sample:"expected one sponsor component"});
if((organizedHome.match(/id="home-programmes"/g)||[]).length !== 1)
  failures.push({file:"components/simple-japanese-home.tsx",rule:"one-event-index",sample:"expected one event index"});
const partnerNav=fs.readFileSync("components/site-frame.tsx","utf8");
if(!partnerNav.includes('["パートナー","/ja/partners"]'))
  failures.push({file:"components/site-frame.tsx",rule:"partner-top-navigation",sample:"partner nav missing"});
const partnerStrip=fs.readFileSync("components/corporate-support-strip.tsx","utf8");
if(!partnerStrip.includes("PARTNERS / 協賛・パートナー"))
  failures.push({file:"components/corporate-support-strip.tsx",rule:"partner-label",sample:"partner label missing"});

// Founder visibility, trustworthy identity and responsive-page regression checks.
// The founder must be discoverable without scrolling to the footer, and profile
// links must lead to the same verified biography across the website.
const founderFile="components/founder-profile.tsx";
const founderSource=fs.readFileSync(founderFile,"utf8");
const founderCss=fs.readFileSync("components/founder-profile.css","utf8");
const homepageCss=fs.readFileSync("components/simple-japanese-home.module.css","utf8");
const founderMetadata=fs.readFileSync("app/ja/about/page.tsx","utf8");
const founderImage="public/media/founder/masato-nishio-on-court.webp";
const founderChecks=[
  [organizedHome,'id="home-founder"',"founder-home-section"],
  [organizedHome,'href="/ja/about"',"founder-home-about-route"],
  [organizedHome,'alt="RBA代表・西尾優人がバスケットボールの指導を行う様子"',"founder-home-image-alt"],
  [organizedHome,"NSCA-CPT","founder-home-qualification"],
  [organizedHome,"ドイツでのS&amp;C","founder-home-coaching-experience"],
  [organizedHome,'href="#home-founder"',"founder-home-table-of-contents"],
  [founderSource,'name:"西尾 優人"',"founder-ja-identity"],
  [founderSource,"credentials:[","founder-credentials"],
  [founderSource,"principles:[","founder-coaching-principles"],
  [founderSource,"founder-practice-grid","founder-content-present"],
  [founderSource,'localePath(locale,"approach")',"founder-approach-link"],
  [founderSource,'localePath(locale,"opportunities")',"founder-opportunities-link"],
  [founderMetadata,'"@type": "Person"',"founder-structured-data"],
  [founderMetadata,'"NSCA-CPT"',"founder-structured-credential"],
  [partnerNav,'["代表・理念","/ja/about"]',"founder-navigation"],
  [homepageCss,".page .founderIntroduction {","founder-home-layout"],
  [homepageCss,"@media (max-width: 760px)","founder-home-mobile-layout"],
  [founderCss,".founder-depth{","founder-full-profile-layout"],
];
for(const [source,fragment,rule] of founderChecks){
  if(!source.includes(fragment))failures.push({file:"founder profile / homepage",rule,sample:fragment});
}
if((organizedHome.match(/id="home-founder"/g)||[]).length!==1)
  failures.push({file:"components/simple-japanese-home.tsx",rule:"founder-unique-home-section",sample:"expected one founder section"});
if(organizedHome.indexOf('id="home-founder"')>organizedHome.indexOf('id="home-programmes"'))
  failures.push({file:"components/simple-japanese-home.tsx",rule:"founder-visible-near-start",sample:"founder introduction placed after activity listing"});
if(!fs.existsSync(founderImage)) {
  failures.push({file:founderImage,rule:"founder-photo-missing",sample:"missing approved founder photo"});
} else {
  const imageData=fs.readFileSync(founderImage);
  if(imageData.length<10240 || imageData.toString("ascii",0,4)!=="RIFF" || imageData.toString("ascii",8,12)!=="WEBP")
    failures.push({file:founderImage,rule:"founder-photo-invalid",sample:"expected a non-empty WebP"});
}

// The same full founder biography must be discoverable at every hreflang route.
for(const [locale,route] of [
  ["en","app/about/page.tsx"],
  ["ja","app/ja/about/page.tsx"],
  ["zh-tw","app/zh-tw/about/page.tsx"],
  ["ko","app/ko/about/page.tsx"],
]){
  if(!fs.existsSync(route)){failures.push({file:route,rule:"founder-locale-route-missing",sample:locale});continue;}
  const source=fs.readFileSync(route,"utf8");
  if(!source.includes('<FounderAboutPage locale="'+locale+'" />'))
    failures.push({file:route,rule:"founder-locale-not-detailed",sample:locale});
  if(!source.includes("NSCA-CPT"))
    failures.push({file:route,rule:"founder-locale-credentials-absent",sample:locale});
  if(!source.includes('alternates: { canonical:'))
    failures.push({file:route,rule:"founder-locale-canonical-absent",sample:locale});
}
if(!founderSource.includes('const SectionHeading=full?"h2":"h3";'))
  failures.push({file:founderFile,rule:"founder-heading-semantics",sample:"full profile requires h2 after h1"});
if(!partnerNav.includes('["代表紹介","/ja/about"]'))
  failures.push({file:"components/site-frame.tsx",rule:"founder-desktop-navigation",sample:"desktop founder link missing"});

if(failures.length){
  console.error(JSON.stringify({status:"failed",filesChecked:files.length,failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  status:"passed",
  filesChecked:files.length,
  scope:"Japanese mojibake, stale Saga dates and known unnatural metadata regressions."
},null,2));
