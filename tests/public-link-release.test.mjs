import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const exec=promisify(execFile);
const checker=fileURLToPath(new URL("../audit/public-links/check.mjs",import.meta.url));

test("opportunity explorer declares its client boundary before imports",()=>{
  const source=readFileSync(new URL("../components/opportunity-explorer.tsx",import.meta.url),"utf8");
  assert.match(source,/^\s*["']use client["'];/);
});

test("public link checker deduplicates links, catches missing anchors, and skips checkout APIs", async()=>{
  let apiCalls=0;
  const server=createServer((req,res)=>{
    const html=body=>{res.setHeader("Content-Type","text/html");res.end(body);};
    if(req.url.startsWith("/api/")){apiCalls++;res.end("unexpected");return;}
    if(req.url==="/sitemap.xml"){
      res.setHeader("Content-Type","application/xml");res.end(`<urlset><url><loc>https://riotbasketballacademy.com/</loc></url><url><loc>https://riotbasketballacademy.com/details</loc></url></urlset>`);return;
    }
    if(req.url==="/"){html(`<a href="/details#ok">Valid</a><a href="/details#missing">Missing</a><a href="/details#ok">Duplicate</a><a href="/api/commerce/checkout/test">Do not invoke</a><a href="/my-homecourt/app#member-reflection">Private</a>`);return;}
    if(req.url==="/details"){html('<h1 id="ok">Details</h1>');return;}
    if(req.url==="/my-homecourt/app"){res.writeHead(302,{Location:"/my-homecourt/login?next=%2Fmy-homecourt%2Fapp"});res.end();return;}
    if(req.url.startsWith("/my-homecourt/login")){html('<h1>Sign in</h1>');return;}
    res.statusCode=404;res.end("404");
  });
  await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
  try{
    const base=`http://127.0.0.1:${server.address().port}`;
    const result=await exec(process.execPath,[checker,"--base",base]).catch(e=>e);
    assert.equal(result.code,1);
    const data=JSON.parse(result.stdout);
    assert.equal(data.checked,3);
    assert.equal(data.unvisited.length,0);
    assert.equal(data.failures.length,1);
    assert.equal(data.failures[0].target,`${base}/details#missing`);
    assert.equal(data.authRequired.length,1);
    assert.equal(data.excluded.length,1);
    assert.equal(apiCalls,0);
  }finally{await new Promise(resolve=>server.close(resolve));}
});
