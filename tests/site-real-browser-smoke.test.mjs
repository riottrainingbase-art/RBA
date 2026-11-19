import assert from "node:assert/strict";
import {mkdirSync} from "node:fs";
import {pathToFileURL} from "node:url";

const port=Number(process.env.RBA_SMOKE_PORT||5173);
// The Next.js dev server serves browser assets on localhost; a different host
// can trigger its cross-origin dev-asset guard in WebKit.
const root="http://localhost:"+port;
const probe="http://127.0.0.1:"+port;
const modulePath=process.env.RBA_PLAYWRIGHT_PATH;
assert.ok(modulePath,"RBA_PLAYWRIGHT_PATH must resolve the exact pinned Playwright version");
const {chromium,webkit}=await import(pathToFileURL(modulePath).href);
const targets=[
  {path:"/",name:"English homepage"},
  {path:"/ja",name:"Japanese homepage"},
  {path:"/zh-tw",name:"Traditional Chinese homepage"},
  {path:"/ko",name:"Korean homepage"},
  {path:"/ja/about",name:"Founder profile"},
  {path:"/ja/international/rizehope-japan-2027",name:"RIZEHOPE Japanese"},
  {path:"/international/rizehope-japan-2027",name:"RIZEHOPE English"},
  {path:"/ja/reading-guide",name:"Reading guide"},
  {path:"/ja/supporters",name:"Supporter guide"},
  {path:"/ja/my-homecourt/nationwide",name:"Nationwide interest"},
  {path:"/ja/partners/brief",name:"Partner brief"}
];
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let ready=false;
for(let attempt=0;attempt<75;attempt++){
  try{
    const response=await fetch(probe+"/ja",{signal:AbortSignal.timeout(2500)});
    if(response.status<500){ready=true;break;}
  }catch{}
  await sleep(2000);
}
assert.ok(ready,"Local app did not become ready within 150 seconds");
mkdirSync("screenshots/site-smoke",{recursive:true});
for(const [engineName,engine] of [["chromium",chromium],["webkit",webkit]]){
  const browser=await engine.launch({headless:true});
  try{
    for(const width of [390,1280]){
      const context=await browser.newContext({
        viewport:{width,height:844},
        deviceScaleFactor:1,
        isMobile:width===390,hasTouch:width===390
      });
      try{
        for(const target of targets){
          const page=await context.newPage();
          try{
            const url=root+target.path;
            const result=await page.goto(url,{waitUntil:"load",timeout:45000});
            assert.equal(result?.status(),200,engineName+" "+width+" "+target.name+" HTTP status "+result?.status());
            // Never report CSS overflow before the app's stylesheet links are loaded.
            await page.waitForFunction(()=>{
              const links=[...document.querySelectorAll('link[rel="stylesheet"]')];
              return links.length ? links.every(link=>Boolean(link.sheet)) : document.styleSheets.length>0;
            },null,{timeout:15000});
            await page.waitForTimeout(180);
            const info=await page.evaluate(()=>{
              const h1=document.querySelector("h1");
              return {
                title:document.title||"",
                heading:h1?.textContent?.trim()||"",
                width:document.documentElement.scrollWidth,
                viewport:window.innerWidth,
                links:[...document.querySelectorAll('a[href]')].length
              };
            });
            assert.ok(info.title.length>6,engineName+" "+target.path+" missing title");
            assert.ok(info.heading.length>1,engineName+" "+target.path+" missing h1");
            assert.ok(info.links>1,engineName+" "+target.path+" missing links");
            if(info.width>info.viewport+2){
              const overflow=await page.evaluate(()=>{
                const viewport=innerWidth;
                const candidates=[...document.querySelectorAll("body *")].map(e=>{
                  const r=e.getBoundingClientRect();
                  return {tag:e.tagName.toLowerCase(),className:typeof e.className==="string"?e.className.slice(0,100):"",right:Math.round(r.right),left:Math.round(r.left),width:Math.round(r.width),text:(e.textContent||"").trim().slice(0,35)};
                }).filter(x=>x.right>viewport+6||x.left<-6).sort((a,b)=>b.right-a.right);
                return {stylesheetCount:document.styleSheets.length,viewportMeta:document.querySelector('meta[name="viewport"]')?.content||"",htmlClientWidth:document.documentElement.clientWidth,bodyScrollWidth:document.body.scrollWidth,offenders:candidates.slice(0,18)};
              });
              console.error("OVERFLOW_DEBUG "+engineName+" "+width+" "+target.path+" "+JSON.stringify(overflow));
              await page.screenshot({path:"screenshots/site-smoke/overflow-"+engineName+"-"+width+"-"+target.path.replaceAll("/","_")+".png",fullPage:false});
            }
            assert.ok(info.width<=info.viewport+2,engineName+" "+width+" "+target.path+" horizontal overflow "+JSON.stringify(info));
            if(target.path.includes("rizehope")){
              assert.match(info.heading,/RIZEHOPE/i);
              assert.equal(await page.locator("#rizehope-entry").count(),1,"RIZEHOPE registration section missing");
            }
            if(target.path==="/ja/about")assert.match(info.heading,/西尾/);
            if(target.path==="/ja"||target.path.includes("rizehope")){
              await page.screenshot({path:"screenshots/site-smoke/"+engineName+"-"+width+"-"+target.path.replaceAll("/","_")+".png",fullPage:false});
            }
            console.log("PASS "+engineName+" "+width+" "+target.path+" "+info.heading.slice(0,50));
          }finally{await page.close();}
        }
      }finally{await context.close();}
    }
  }finally{await browser.close();}
}
