import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = file => fs.readFileSync(path.join(ROOT,file),"utf8");
const exists = file => fs.existsSync(path.join(ROOT,file));
const scan = (dir,match,out=[]) => {
  if(!exists(dir))return out;
  for(const ent of fs.readdirSync(path.join(ROOT,dir),{withFileTypes:true})){
    const file=path.posix.join(dir,ent.name);
    if(ent.isDirectory())scan(file,match,out);
    else if(match(file))out.push(file);
  }
  return out;
};
const pages=scan("app",file=>/\/page\.(?:tsx|jsx|js|ts)$/.test(file));
const toRoute=file=>{
  const route=file.replace(/^app\//,"").replace(/\/page\.(?:tsx|jsx|js|ts)$/,"");
  const segments=route.split("/").filter(x=>!(/^\([^)]*\)$/.test(x))&&!x.startsWith("@"));
  return "/"+segments.join("/");
};
const routes=new Set(pages.map(toRoute));
const issues=[];
const ensure=(when,kind,message)=>{if(!when)issues.push({kind,message});};
ensure(pages.length>=300,"route-coverage","Expected at least 300 route pages; inventory seems incomplete.");
ensure(routes.size===pages.length,"duplicate-routes","Distinct page files resolve to duplicate routes.");
for(const lang of ["ja","ko","zh-tw"]) {
  ensure(pages.some(x=>x.startsWith("app/"+lang+"/")),"locale-coverage","Missing page group: "+lang);
}

// Check sitemap's explicitly enumerated public paths against actual App Router pages.
const sitemap=read("app/sitemap.ts");
const list=(name)=>{
  const found=sitemap.match(new RegExp("const "+name+"=\\[([\\s\\S]*?)\\](?: as const)?;"));
  return found?[...found[1].matchAll(/"([^",]+)"/g)].map(m=>m[1]):[];
};
const sitemapRoutes=[
  ...["","/ja","/zh-tw","/ko"].flatMap(locale=>list("core").map(p=>locale+p||"/")),
  ...list("productPages"),...list("regionalPages"),...list("legacy"),
  ...list("journalFamilyPages"),
  ...["","/ja","/zh-tw"].flatMap(l=>["/international/japan-experience","/international/partner-with-us"].map(p=>l+p)),
  ...["","/ja","/zh-tw","/ko"].flatMap(l=>["/taiwan","/taiwan/exchange"].map(p=>l+p)),
  "/ja/journal/paths",
];
const sitemapMissing=[...new Set(sitemapRoutes)].filter(url=>!routes.has(url));
ensure(sitemapMissing.length===0,"sitemap-404","Missing public routes: "+sitemapMissing.join(", "));

const hasAppRoute=url=>{
  const normalized=url.replace(/\/+$/,"")||"/";
  if(routes.has(normalized))return true;
  return routes.some(route=>{
    const a=route.split("/").filter(Boolean),b=normalized.split("/").filter(Boolean);
    const catchall=a.findIndex(seg=>/^\[\[?\.\.\./.test(seg));
    if(catchall<0&&a.length!==b.length)return false;
    if(catchall>=0&&b.length<catchall)return false;
    for(let i=0;i<a.length;i++){
      if(/^\[\[?\.\.\./.test(a[i]))return true;
      if(b[i]===undefined)return false;
      if(/^\[[^\]]+\]$/.test(a[i]))continue;
      if(a[i]!==b[i])return false;
    }
    return true;
  });
};

const sourceFiles=[
  ...pages,
  ...scan("components",p=>/\.(?:tsx|jsx)$/.test(p)),
];
const linkMap=new Map();
for(const file of sourceFiles) {
  const text=read(file);
  const reg=/\bhref\s*=\s*["'](\/(?!\/)[^"'?#\s]*)/g;
  for(const hit of text.matchAll(reg)){
    let to=hit[1].replace(/\/+$/,"")||"/";
    try{to=decodeURIComponent(to);}catch{}
    if(/^(?:\/api\/|\/_next\/|\/_vercel\/|\/\.well-known\/)/.test(to))continue;
    if(/\.(?:svg|png|jpg|jpeg|webp|ico|woff2?|mp4|webm|pdf|xml|txt|json|css|js)$/.test(to)){
      if(exists("public"+to))continue;
      if(to==="/sitemap.xml"||to==="/robots.txt")continue;
    }
    if(hasAppRoute(to))continue;
    const list=linkMap.get(to)||new Set();
    list.add(file);linkMap.set(to,list);
  }
}
const missingLinks=[...linkMap.entries()].map(([to,from])=>({to,from:[...from].slice(0,3)})).sort((a,b)=>a.to.localeCompare(b.to));

// High-impact expired-event and separated payment-flow regression guards.
const englishArchive=read("app/events/okinawa-clinic-2026-11-14/page.tsx");
const japaneseArchive=read("app/ja/events/okinawa-clinic-2026-11-14/page.tsx");
ensure(/Registration for this event is now closed/.test(englishArchive),"expired-en-event","English Okinawa event is not clearly closed.");
ensure(!/form\.jotform\.com|pre-registration enquiry|englishForm/.test(englishArchive),"expired-en-cta","English Okinawa event still offers registration.");
ensure(/開催を終了しました/.test(japaneseArchive),"expired-ja-event","Japanese Okinawa event is not clearly completed.");
ensure(!/OkinawaClinicEntry|新規受付中/.test(japaneseArchive),"expired-ja-checkout","Japanese event still embeds a registration component.");
const programme=read("components/programme-data.ts");
const pastEvent=programme.split('id:"okinawa-nov14"')[1]?.split('id: "sendai-u15"')[0]||"";
ensure(pastEvent.includes("registrationClosed: true"),"past-event-status","Nov 14 event lacks an explicit closed flag.");
const torsten=programme.split('id: "torsten"')[1]?.slice(0,1800)||"";
ensure(torsten.includes("Square")&&torsten.includes("Googleフォーム"),"jp-payment-flow","Japanese Torsten form/Square route is not explicit in the programme source.");
const jpLanding=read("components/torsten-japan-landing.tsx");
ensure(jpLanding.includes("Square")&&jpLanding.includes("Googleフォーム"),"jp-registration","Japanese Torsten page must use Google Form then Square.");
ensure(!jpLanding.includes("Stripe"),"jp-stripe-confusion","Japanese Torsten page should not mention Stripe.");

const report={
  status:issues.length?"failed":"passed",
  routePages:pages.length,
  byLocale:{
    japanese:pages.filter(p=>p.startsWith("app/ja/")).length,
    englishOrNeutral:pages.filter(p=>!/^app\/(ja|ko|zh-tw)\//.test(p)).length,
    traditionalChinese:pages.filter(p=>p.startsWith("app/zh-tw/")).length,
    korean:pages.filter(p=>p.startsWith("app/ko/")).length
  },
  staticSitemapRoutesVerified:[...new Set(sitemapRoutes)].length,
  sourceFilesScanned:sourceFiles.length,
  uniqueUnresolvedLiteralLinks:missingLinks.length,
  unresolvedLinkSamples:missingLinks.slice(0,50),
  problems:issues
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
