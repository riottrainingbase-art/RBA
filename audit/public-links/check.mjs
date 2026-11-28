import { parseArgs } from "node:util";
const {values}=parseArgs({options:{base:{type:"string",default:"https://riotbasketballacademy.com"},external:{type:"boolean",default:false}}});
const base=new URL(values.base);
if(base.protocol!=="https:"&&!(base.protocol==="http:"&&["localhost","127.0.0.1"].includes(base.hostname)))throw new Error("Use an HTTPS site or local preview.");
const canonical="https://riotbasketballacademy.com";
const sameSite=url=>url.origin===base.origin||url.origin===canonical;
const normalize=url=>{const u=new URL(url,base);if(sameSite(u)){u.protocol=base.protocol;u.host=base.host;}return u;};
const decode=s=>s.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[0-9a-f]+);/gi,m=>{const c={amp:"&",quot:'"',apos:"'",lt:"<",gt:">"}[m.slice(1,-1)];if(c)return c;const n=m.slice(1,-1);if(n.startsWith("#")){const v=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);if(Number.isInteger(v)&&v>=0&&v<=0x10ffff)return String.fromCodePoint(v);}return m;});
const stripHash=u=>{const x=new URL(u);x.hash="";return x.href;};
const readOnly=u=>{
 if(!sameSite(u))return false;
 if(/^\/(?:api|_next)(?:\/|$)/.test(u.pathname))return false;
 if(/^\/auth(?:\/|$)/.test(u.pathname))return false;
 if(u.search&&!/\/(?:contact|login|access-request)$/.test(u.pathname))return false;
 return true;
};
const fetchPage=async url=>{
 try{
  const res=await fetch(url,{redirect:"follow",signal:AbortSignal.timeout(20000),headers:{"User-Agent":"RBA-public-link-audit/1.0"}});
  const contentType=res.headers.get("content-type")||"";
  const html=contentType.includes("text/html")?await res.text():"";
  const clean=html.replace(/<!--[\s\S]*?-->/g,"").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,"");
  const ids=new Set([...clean.matchAll(/\bid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)].map(m=>decode(m[1]??m[2])));
  const links=[...clean.matchAll(/<a\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)].map(m=>decode(m[1]??m[2]));
  const title=decode(clean.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||"");
  return {url,status:res.status,final:res.url,title,ids,links};
 }catch(error){return {url,status:"error",final:url,title:"",ids:new Set(),links:[],error:String(error)};}
};
async function runPool(items,worker,onResult,concurrency=6){
 let i=0;await Promise.all(Array.from({length:Math.min(concurrency,items.length)},async()=>{while(i<items.length){const index=i++;onResult(await worker(items[index]));}}));
}
const sitemapRes=await fetch(new URL("/sitemap.xml",base),{signal:AbortSignal.timeout(20000)});
if(!sitemapRes.ok)throw new Error("Sitemap HTTP "+sitemapRes.status);
const xml=await sitemapRes.text();
const seeds=[...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(m=>normalize(decode(m[1].trim())));
if(!seeds.length)throw new Error("No sitemap URLs found");
const pending=new Set(seeds.filter(readOnly).map(stripHash)),visited=new Map(),edges=[],externalUrls=new Set(),excluded=new Set();
for(let wave=0;wave<12;wave++){
 const batch=[...pending].filter(url=>!visited.has(url));
 if(!batch.length)break;
 if(visited.size+batch.length>2000)throw new Error("Audit scope exceeded 2000 internal URLs");
 await runPool(batch,fetchPage,r=>{
  visited.set(r.url,r);
  if(!sameSite(new URL(r.final)))return;
  for(const href of r.links){
   if(!href||/^(?:mailto:|tel:|javascript:|data:)/i.test(href))continue;
   let u;try{u=normalize(new URL(href,r.final));}catch{continue;}
   if(!["http:","https:"].includes(u.protocol))continue;
   const target=stripHash(u);
   if(sameSite(u)){
    if(readOnly(u)){pending.add(target);edges.push({source:r.url,target,hash:u.hash});}else excluded.add(u.href);
   }else externalUrls.add(target);
  }
 });
 console.error("Checked "+visited.size+" internal URLs; discovered "+pending.size);
}
const failures=[],authRequired=[],externalResults=[];
for(const r of visited.values())if(r.status!==200)failures.push({type:"HTTP",url:r.url,status:r.status});
for(const e of edges){
 if(!e.hash||e.hash.startsWith("#:~:"))continue;
 const r=visited.get(e.target);if(!r||r.status!==200)continue;
 if(/\/my-homecourt\/login(?:\?|$)/.test(r.final)){authRequired.push(e);continue;}
 let fragment;try{fragment=decodeURIComponent(e.hash.slice(1));}catch{fragment=e.hash.slice(1);}
 if(!r.ids.has(fragment))failures.push({type:"anchor",source:e.source,target:e.target+e.hash});
}
if(values.external)await runPool([...externalUrls],fetchPage,r=>externalResults.push({url:r.url,status:r.status,title:r.title,final:r.final}),4);
for(const r of externalResults)if([404,410].includes(r.status))failures.push({type:"external-http",url:r.url,status:r.status});
const unvisited=[...pending].filter(url=>!visited.has(url));
const result={base:base.origin,sitemap:seeds.length,checked:visited.size,unvisited,links:edges.length,externalDiscovered:externalUrls.size,externalChecked:externalResults.length,externalResults,excluded:[...excluded],authRequired,failures};
console.log(JSON.stringify(result,null,2));
if(failures.length||unvisited.length)process.exitCode=1;
