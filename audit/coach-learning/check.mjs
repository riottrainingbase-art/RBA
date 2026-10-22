import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),ts=require('typescript');
function compile(file,deps={}){
 const mod={exports:{}};
 const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(js,{module:mod,exports:mod.exports,URL,Date,console,process:{env:{RBA_AUTH_EMAIL_READY:'true'}},require:id=>id in deps?deps[id]:id.endsWith('.css')?new Proxy({},{get:(_,key)=>key}):id.startsWith('@/')?compile(id.slice(2)+'.ts',deps):id.startsWith('.')?compile(path.join(path.dirname(file),id)+'.ts',deps):require(id)});
 return mod.exports;
}
const {memberAuthDestination}=compile('lib/member-auth-redirect.ts');
const learning=compile('lib/coach-learning.ts');
for(const group of ['penang','kuala-lumpur','malaysia']){
 const target=learning.coachLibraryPath(group);
 assert.equal(memberAuthDestination(target),target);
 const login=new URL(learning.coachLoginPath(group),'https://example.test');
 assert.equal(login.searchParams.get('next'),target);assert.equal(login.searchParams.get('role'),'coach');
}
for(const value of ['/my-homecourt/app/coach-library?group=other','/my-homecourt/app/coach-library?group=penang&next=https://evil.test','//evil.test/my-homecourt/app/coach-library','/my-homecourt/app/coach-library/../admin','/my-homecourt/app/coach-library/insights'])assert.equal(memberAuthDestination(value),'/ja/my-homecourt/app');
for(const user of [null,{id:'coach-fixture'}]){
 const redirect=location=>{throw {redirect:location};};
 const {default:Page}=compile('app/my-homecourt/app/coach-library/page.tsx',{'next/navigation':{redirect},'next/link':()=>null,'@/lib/supabase/server':{createClient:async()=>({auth:{getUser:async()=>({data:{user}})}})},'@/components/coach-library':{CoachLibrary:()=>null}});
 try{const page=await Page({searchParams:Promise.resolve({group:'penang'})});assert(user);assert.equal(page.props.userId,user.id);assert.equal(page.props.group,'penang');}catch(e){assert(!user);assert.equal(e.redirect,learning.coachLoginPath('penang'));}
}
for(const role of ['coach','admin']){
 let activityQueried=false;
 const redirect=location=>{throw {redirect:location};};
 const supabase={auth:{getUser:async()=>({data:{user:{id:'fixture'}}})},from(table){if(table==='profiles')return {select:()=>({eq:()=>({maybeSingle:async()=>({data:{role}})})})};activityQueried=true;return {select:()=>({in:()=>({order:()=>({limit:async()=>({data:[],error:null})})})})};}};
 const {default:Page}=compile('app/my-homecourt/app/coach-library/insights/page.tsx',{'next/navigation':{redirect},'next/link':()=>null,'@/lib/supabase/server':{createClient:async()=>supabase}});
 try{await Page();assert.equal(role,'admin');}catch(e){assert.equal(role,'coach');assert.equal(e.redirect,'/my-homecourt/app/coach-library');}
 assert.equal(activityQueried,role==='admin');
}
const topics=new Set(learning.coachTopics.map(x=>x.id));assert.equal(topics.size,6);
for(const r of learning.coachResources){assert(r.topics.every(t=>topics.has(t)));assert(r.href.startsWith('/journal/')||new URL(r.href).protocol==='https:');if(r.href.startsWith('/'))assert(fs.existsSync('app'+r.href+'/page.tsx'));}
console.log('Coach learning: 3 signup routes preserve return destination and COACH role; 5 unsafe destinations rejected; anonymous/member access and admin-only insights checks passed; 7 resource routes validated. Simulated auth; no real email sent.');
