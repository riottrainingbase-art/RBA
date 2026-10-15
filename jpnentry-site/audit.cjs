const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"dist");
const htmlFiles=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(f.endsWith(".html"))htmlFiles.push(f)}}
walk(root);
const failures=[];
const warnings=[];
const expected="/style.css /extra.css /app.js /favicon.svg /robots.txt /sitemap.xml".split(" ");
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
const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
const sitemapUrls=(sitemap.match(/<url>/g)||[]).length;
if(sitemapUrls!==htmlFiles.length)failures.push("Sitemap contains "+sitemapUrls+" routes vs "+htmlFiles.length+" HTML pages");
console.log("JPNentry quality gate — "+htmlFiles.length+" pages, "+sitemapUrls+" sitemap entries, "+broken+" broken local links.");
if(warnings.length)console.log("Warnings ("+warnings.length+"):",warnings.slice(0,12));
if(failures.length){console.error("FAILURES ("+failures.length+"):",failures.slice(0,45));process.exitCode=1}
else console.log("PASS: internal routes, titles, canonical, H1, official contact, sitemap, required assets.");
