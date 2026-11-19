import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=relative=>readFileSync(path.join(root,relative),"utf8");
const sitemap=read("app/sitemap.ts");
const routes=[
  "/international/rizehope-japan-2027",
  "/ja/international/rizehope-japan-2027",
  "/ja/reading-guide",
  "/ja/supporters",
  "/ja/my-homecourt/nationwide",
  "/ja/my-homecourt/united",
  "/ja/partners/brief",
  "/ja/cancellation",
];

test("public, documented entry routes exist and are discoverable",()=>{
  for(const route of routes){
    assert.ok(existsSync(path.join(root,"app",route.slice(1),"page.tsx")),route+" page missing");
    assert.ok(sitemap.includes(JSON.stringify(route)),route+" absent from sitemap");
  }
  assert.match(sitemap,/rizehopePages\.map/);
  assert.match(sitemap,/publicDiscoveryPages\.map/);
});

test("bilingual RIZEHOPE links are reciprocal; no invented Korean or Chinese page",()=>{
  for(const lang of ["ja","en"]){
    const page=lang==="ja"?"app/ja/international/rizehope-japan-2027/page.tsx":"app/international/rizehope-japan-2027/page.tsx";
    const source=read(page);
    assert.match(source,/canonical:/);
    assert.match(source,/languages:/);
    assert.match(source,/\/ja\/international\/rizehope-japan-2027/);
    assert.match(source,/\/international\/rizehope-japan-2027/);
  }
  assert.ok(!sitemap.includes('"/ko/international/rizehope-japan-2027"'));
  assert.ok(!sitemap.includes('"/zh-tw/international/rizehope-japan-2027"'));
});

test("noindex link hub is deliberately not indexed; auth and payment are untouched",()=>{
  assert.match(read("app/ja/links/page.tsx"),/robots:\s*\{\s*index:\s*false/);
  assert.ok(!sitemap.includes('"/ja/links"'));
  assert.match(read("lib/rizehope-2027.ts"),/status:\s*"not-open"/);
});

test("primary homepage, navigation, event and bio links resolve to actual pages",()=>{
  const sources=["components/simple-japanese-home.tsx","components/site-frame.tsx","components/rizehope-international.tsx","app/ja/links/page.tsx"];
  const missing=[];
  for(const sourceFile of sources){
    const code=read(sourceFile);
    const urls=[...code.matchAll(/(?:href\s*=\s*["']|href\s*:\s*["'])(\/[^"'?#{}]+)(?:["'#?])/g)].map(match=>match[1]);
    for(const url of new Set(urls)){
      const clean=url.replace(/\/$/,"");
      if(!clean||clean.startsWith("/api/")||clean.startsWith("/media/")||clean.startsWith("/_"))continue;
      if(!existsSync(path.join(root,"app",clean.slice(1),"page.tsx"))&&!existsSync(path.join(root,"public",clean.slice(1)))&&!existsSync(path.join(root,"app",clean.slice(1),"route.ts"))){
        missing.push(sourceFile+" -> "+url);
      }
    }
  }
  assert.deepEqual(missing,[]);
});

test("robots leaves public areas discoverable but discourages crawlers from indexing private tools",()=>{
  const robots=read("app/robots.ts");
  for(const privatePath of ["/api/","/auth/","/ja/d-hub/admin","/ja/my-homecourt/app","/my-homecourt/app","/ja/store/manage","/ja/support/manage"]){
    assert.ok(robots.includes(JSON.stringify(privatePath)),privatePath+" missing robots exclusion");
  }
  assert.match(robots,/sitemap:\s*"https:\/\/riotbasketballacademy.com\/sitemap.xml"/);
  assert.ok(!robots.includes('disallow: ["/ja/reading-guide"'));
});
