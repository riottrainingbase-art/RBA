import fs from 'node:fs';
import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-H','127.0.0.1','-p','3111'],{stdio:['ignore','pipe','pipe']});
const base='http://127.0.0.1:3111';
try{
 await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('startup')),15000);server.stdout.on('data',d=>{if(d.toString().includes('Ready')){clearTimeout(t);resolve();}});server.on('exit',()=>reject(Error('exit')));});
 const routes=Object.keys(JSON.parse(fs.readFileSync('.next/prerender-manifest.json')).routes).filter(x=>!x.startsWith('/_'));
 const pages=new Map(),targets=new Map(),broken=[],anchors=[],forms=[];
 const decode=s=>s.replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"');
 for(let i=0;i<routes.length;i+=8)await Promise.all(routes.slice(i,i+8).map(async path=>{const r=await fetch(base+path);const html=await r.text();pages.set(path,{status:r.status,html,ids:new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>decode(m[1])))});for(const m of html.matchAll(/<(a|iframe)\b[^>]*(?:href|src)="([^"]*)"[^>]*>/g)){const raw=decode(m[2]);const u=new URL(raw,base+path);if(!targets.has(u.href))targets.set(u.href,[]);targets.get(u.href).push(path);if(!raw||raw==='#'||raw.startsWith('javascript:'))broken.push({path,target:raw,reason:'placeholder'});}for(const m of html.matchAll(/<form\b[^>]*>/g))forms.push({path,tag:m[0]});}));
 for(const [target,sources] of targets){const u=new URL(target);if(u.origin!==base)continue;if(u.pathname.startsWith('/api/')||u.pathname.includes('/my-homecourt/app'))continue;let page=pages.get(u.pathname);if(!page){const r=await fetch(u,{redirect:'manual'});const html=await r.text();page={status:r.status,ids:new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))};pages.set(u.pathname,page);}if(page.status>=400)broken.push({target,sources,status:page.status});if(u.hash&&page.status===200&&!page.ids.has(decodeURIComponent(u.hash.slice(1))))anchors.push({target,sources,reason:'missing anchor'});}
 const external=[...targets].filter(([url])=>/^https?:/.test(url)&&!url.startsWith(base)).map(([url,sources])=>({url,sources:[...new Set(sources)]}));
 fs.writeFileSync('audit/release/links-current.json',JSON.stringify({date:new Date().toISOString(),routes:routes.length,targets:targets.size,broken,anchors,external,forms},null,2));console.log(JSON.stringify({routes:routes.length,targets:targets.size,broken,anchors,external:external.length,forms},null,2));
}finally{server.kill();}
