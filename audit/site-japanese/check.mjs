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
  ["organizer-mixed-language",/(?:ClinicやCamp|地域交流を増やしたいTeam|Basketballを通じた交流人口)/],
  ["hardcoded-ja-member-signup",/href=["']\/ja\/my-homecourt\/login["'][^>]*>無料でRBA IDをつくる/],
  ["legacy-homecourt-paid-name",/(?:月額HOMECOURT|有料HOMECOURT|HOMECOURT \/ MONTHLY)/],
  ["legacy-opportunity-cta",/このコートに挑戦する/],
  ["legacy-business-english-ja",/(?:Basketball Program|将来Vision|外部Organizer)/],
  ["legacy-abstract-start-cta",/次の一歩を、ここから始める/],
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

const homepage=fs.readFileSync("components/localized-home.tsx","utf8");
for(const required of [
  'START HERE / あなたはどなたですか？',
  'href="/ja/opportunities"',
  'href="/ja/coaches"',
  'href="/ja/organizer"',
  'href="/ja/international"',
  'href={memberStartHref}',
]){
  if(!homepage.includes(required))failures.push({file:"components/localized-home.tsx",rule:"homepage-primary-route-missing",sample:required});
}
if(homepage.includes('href="/ja/work-with-rba"'))failures.push({file:"components/localized-home.tsx",rule:"legacy-homepage-organizer-route",sample:'/ja/work-with-rba'});
const canonicalUiFiles=[
  "components/localized-home.tsx",
  "components/site-frame.tsx",
  "components/audience-page.tsx",
  "components/my-homecourt.tsx",
  "components/opportunity-explorer.tsx",
];
for(const file of canonicalUiFiles){
  const source=fs.readFileSync(file,"utf8");
  for(const legacy of ["/ja/schedule","/ja/home-court","/ja/work-with-rba","/ja/team"]){
    if(source.includes(`href="${legacy}"`)||source.includes(`href=\'${legacy}\'`))failures.push({file,rule:"legacy-primary-route",sample:legacy});
  }
}

const opportunitySource=fs.readFileSync("components/opportunity-explorer.tsx","utf8");
const controlsIndex=opportunitySource.indexOf('className="opportunity-controls');
const resultsIndex=opportunitySource.indexOf('className="opportunity-results');
const explanationIndex=opportunitySource.indexOf('className="homecourt-plan-separation');
if(!(controlsIndex>=0&&resultsIndex>controlsIndex&&explanationIndex>resultsIndex)){
  failures.push({file:"components/opportunity-explorer.tsx",rule:"opportunity-results-must-come-first",sample:"ordering regression"});
}

const staticShell=fs.readFileSync("components/definitive-static-page.tsx","utf8");
for(const required of ["function StaticHeader","function StaticFooter","extractContent","MY HOME COURT"]){
  if(!staticShell.includes(required))failures.push({file:"components/definitive-static-page.tsx",rule:"static-shell-regression",sample:required});
}

if(!fs.existsSync("docs/RBA_SITE_INFORMATION_ARCHITECTURE.md")){
  failures.push({file:"docs/RBA_SITE_INFORMATION_ARCHITECTURE.md",rule:"information-architecture-doc-missing",sample:"missing"});
}
if(!fs.existsSync("docs/RBA_JAPANESE_COPY_STYLE_GUIDE.md")){
  failures.push({file:"docs/RBA_JAPANESE_COPY_STYLE_GUIDE.md",rule:"japanese-copy-style-guide-missing",sample:"missing"});
}

const programmeSource=fs.readFileSync("components/programme-data.ts","utf8");
if(!programmeSource.includes('id: "sendai-u15"')||!programmeSource.includes('pathway:"school"')){
  failures.push({file:"components/programme-data.ts",rule:"sendai-u15-must-be-school",sample:"pathway must be school"});
}
const quickFinderSource=fs.readFileSync("components/platform-quick-finder.tsx","utf8");
if(!quickFinderSource.includes('ja:{label:"活動を探す"')){
  failures.push({file:"components/platform-quick-finder.tsx",rule:"quick-finder-ja-label",sample:"活動を探す"});
}
for(const file of files){
  let source;
  try{source=fs.readFileSync(file,"utf8");}catch{continue}
  for(const [rule,re] of [...mojibake,...stale,...awkward]){
    const m=source.match(re);
    if(m)failures.push({file,rule,sample:m[0]});
  }
}

if(failures.length){
  console.error(JSON.stringify({status:"failed",filesChecked:files.length,failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  status:"passed",
  filesChecked:files.length,
  scope:"Japanese mojibake, stale dates, product naming, programme labels, CTA wording and known unnatural copy regressions."
},null,2));
