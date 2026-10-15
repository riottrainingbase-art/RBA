const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"dist");
const htmlFiles=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(f.endsWith(".html"))htmlFiles.push(f)}}
walk(root);
const failures=[];
const warnings=[];
const expected="/theme.css /app.js /favicon.svg /robots.txt /sitemap.xml".split(" ");
for(const asset of expected){if(!fs.existsSync(path.join(root,asset.slice(1))))failures.push("Missing "+asset)}
let broken=0;
const uniqueCanon=new Set();
for(const f of htmlFiles){
 const rel=path.relative(root,f).replace(/\\/g,"/");
 const text=fs.readFileSync(f,"utf8");
 const title=text.match(/<title>([^<]*)<\/title>/)?.[1];
 const canon=text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
 const h1=(text.match(/<h1(?:\s[^>]*)?>/g)||[]).length;
 if(!title) failures.push(rel+": missing title");
 if(!canon) failures.push(rel+": missing canonical");
 if(h1!==1) failures.push(rel+": expected one H1, found "+h1);
 if(!text.includes("jpnentry.sales@gmail.com")) failures.push(rel+": missing official email");
 if(!text.includes('href="/theme.css"')) failures.push(rel+": missing unified stylesheet");
 if(/href="\/(style|extra|premium|growth)\.css"/.test(text)) failures.push(rel+": legacy CSS references still present");
 if(!text.includes('class="brand-lockup"')) failures.push(rel+": missing aligned logo lockup");
 if(text.includes('class="brand-type"')||text.includes('class="hero-graphic"')) failures.push(rel+": legacy identity or hero still present");
 if(!text.includes('href="https://form.jotform.com/262542049350049"')) warnings.push(rel+": no RFQ URL");
 if(text.includes("riot.training.base@gmail.com")) failures.push(rel+": legacy email still visible");
 if(!text.includes('id="main-content"')) failures.push(rel+": missing skip-link target");
 if(canon){if(uniqueCanon.has(canon))warnings.push(rel+": duplicate canonical "+canon);uniqueCanon.add(canon)}
 const matches=text.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g);
 for(const m of matches){
  const url=m[1];
  let decoded;
  try{decoded=decodeURIComponent(url)}catch{continue}
  const file=path.join(root,decoded.slice(1));
  if(!fs.existsSync(file) && !fs.existsSync(path.join(file,"index.html")) && !fs.existsSync(file+".html")) {
   if(broken<25)failures.push(rel+": broken internal link "+url);
   broken++;
  }
 }
}

const growthRoutes=[
  "rfq/index.html",
  "ms/automotive/index.html","ms/industrial/index.html","ms/vehicles/index.html","ms/contact/index.html","ms/trust/index.html",
  "id/automotive/index.html","id/industrial/index.html","id/vehicles/index.html","id/contact/index.html","id/trust/index.html",
  "zh-cn/automotive/index.html","zh-cn/industrial/index.html","zh-cn/vehicles/index.html","zh-cn/contact/index.html","zh-cn/trust/index.html",
  "zh-tw/automotive/index.html","zh-tw/industrial/index.html","zh-tw/vehicles/index.html","zh-tw/contact/index.html","zh-tw/trust/index.html"
];
for(const r of growthRoutes) if(!fs.existsSync(path.join(root,r)))failures.push("Missing conversion or locale route: "+r);
const blogHtml=fs.readFileSync(path.join(root,"blog","index.html"),"utf8");
for(const k of ['class="blog-refine"','id="load-more"','data-topic="automotive"','data-topic="industrial"','data-topics="']){
 if(!blogHtml.includes(k))failures.push("Missing usable blog filter: "+k);
}
for(const area of ["automotive","industrial","vehicles","malaysia"]){
 const f=fs.readFileSync(path.join(root,area,"index.html"),"utf8");
 if(!f.includes('class="brief-section"'))failures.push(area+": missing RFQ buying checklist");
 if(!f.includes('href="/rfq"'))failures.push(area+": missing RFQ guide link");
}
const home=fs.readFileSync(path.join(root,"index.html"),"utf8");
if(!home.includes('class="confidence-bar"'))failures.push("Homepage missing evidence-first commercial status bar");
if(!home.includes('class="home-trust-section"'))failures.push("Homepage missing operator and trade scope");
if(home.includes("35°40′ N / 139°41′ E"))failures.push("Unverified precise office location displayed");
for(const locale of ["ms","id","zh-cn","zh-tw"]){
 const html=fs.readFileSync(path.join(root,locale,"index.html"),"utf8");
 if(!html.includes('href="/'+locale+'/automotive"'))failures.push(locale+": navigation switches to an unrelated language");
}
const requireHreflang=fs.readFileSync(path.join(root,"ms","automotive","index.html"),"utf8");
for(const l of ["en","ja","ms","id","zh-Hans","zh-Hant","x-default"]){
 if(!requireHreflang.includes('hreflang="'+l+'"'))failures.push("Missing auto-parts hreflang: "+l);
}


const partnerPage=fs.readFileSync(path.join(root,"partners/index.html"),"utf8");
const notFound=fs.readFileSync(path.join(root,"404.html"),"utf8");
const siteHome=fs.readFileSync(path.join(root,"index.html"),"utf8");
if(!siteHome.includes('class="partner-home"'))failures.push("Homepage has no buyer/supplier partner route");
if(!siteHome.includes('href="/partners#suppliers"'))failures.push("Supplier flow lacks homepage entrance");
if(!partnerPage.includes('id="buyers"')||!partnerPage.includes('id="suppliers"'))failures.push("Partners page does not distinguish buyers and suppliers");
if(!partnerPage.includes('mailto:jpnentry.sales@gmail.com?subject=Japan%20Supplier'))failures.push("Missing direct verified supplier email CTA");
if(!notFound.includes('content="noindex, follow"'))failures.push("404 must be noindex");
if(!notFound.includes('href="/rfq"')||!notFound.includes('href="/"'))failures.push("404 page must route users to enquiry or homepage");
for(const htmlFile of htmlFiles){
 const text=fs.readFileSync(htmlFile,"utf8");
 if(!text.includes('href="/partners"'))failures.push(path.relative(root,htmlFile)+": partner page not linked in footer");
}

const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
const sitemapUrls=(sitemap.match(/<url>/g)||[]).length;
if(sitemap.includes("https://www.jpnentry.com/404</loc>"))failures.push("404 URL must not enter sitemap");
if(!sitemap.includes("https://www.jpnentry.com/partners</loc>"))failures.push("Partnership page missing from sitemap");
const indexablePages=htmlFiles.filter(f=>!f.endsWith("/404.html")).length;
if(sitemapUrls!==indexablePages)failures.push("Sitemap contains "+sitemapUrls+" routes vs "+indexablePages+" indexable HTML pages");
console.log("JPNentry quality gate — "+htmlFiles.length+" pages, "+sitemapUrls+" sitemap entries, "+broken+" broken local links.");
if(warnings.length)console.log("Warnings ("+warnings.length+"):",warnings.slice(0,12));
if(failures.length){console.error("FAILURES ("+failures.length+"):",failures.slice(0,45));process.exitCode=1}
else console.log("PASS: internal routes, titles, canonical, H1, official contact, sitemap, required assets.");
