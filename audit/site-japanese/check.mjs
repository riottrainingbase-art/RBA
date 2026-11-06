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
  ["components/sponsor-programme-clarity.tsx","未成年者の名簿","minor-privacy-sponsor"],
  ["app/ja/support/page.tsx","トップページ上部","monthly-advertising-disclaimer"],
  ["components/sponsor-partner-page.tsx","<SponsorProgrammeClarity />","sponsor-clarity-integrated"],
];
for(const [file,needle,rule] of sponsorChecks){
  if(!fs.existsSync(file)||!fs.readFileSync(file,"utf8").includes(needle)){
    failures.push({file,rule,sample:"missing required sponsor recognition or recruitment route"});
  }
}

if(failures.length){
  console.error(JSON.stringify({status:"failed",filesChecked:files.length,failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  status:"passed",
  filesChecked:files.length,
  scope:"Japanese mojibake, stale Saga dates and known unnatural metadata regressions."
},null,2));
