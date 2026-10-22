import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),ts=require('typescript');
function compile(file,deps={}){
 const mod={exports:{}};
 const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(js,{module:mod,exports:mod.exports,URL,Date,console,process:{env:{}},require:id=>id in deps?deps[id]:id.endsWith('.css')?new Proxy({},{get:(_,key)=>key}):id.startsWith('@/')?compile(id.slice(2)+'.ts',deps):id.startsWith('.')?compile(path.join(path.dirname(file),id)+'.ts',deps):require(id)});
 return mod.exports;
}
const {memberAuthDestination}=compile('lib/member-auth-redirect.ts');
const mvp=compile('lib/mvp-partner.ts');
const login=new URL(mvp.mvpLoginPath,'https://example.test');
assert.equal(login.searchParams.get('next'),mvp.mvpRoomPath);
assert.equal(login.searchParams.get('role'),'coach');
assert.equal(memberAuthDestination(login.searchParams.get('next')),mvp.mvpRoomPath);
for(const unsafe of ['/my-homecourt/app/mvp?role=manager','/my-homecourt/app/mvp/../admin','//evil.test/my-homecourt/app/mvp','https://evil.test/my-homecourt/app/mvp','/my-homecourt/app/mvp%2fadmin'])assert.equal(memberAuthDestination(unsafe),'/ja/my-homecourt/app');
for(const user of [null,{id:'verified-user'}]){
 let passedId;
 const {default:Page}=compile('app/my-homecourt/app/mvp/page.tsx',{
  'next/navigation':{redirect:location=>{throw {redirect:location};}},
  '@/lib/supabase/server':{createClient:async()=>({auth:{getUser:async()=>({data:{user}})}})},
  '@/components/mvp/partner-header':{PartnerHeader:()=>null},
  '@/components/mvp/partner-room':{PartnerRoom:()=>null},
 });
 try{const result=await Page();assert(user);const children=result.props.children.props.children;passedId=children[1].props.userId;assert.equal(passedId,user.id);}catch(error){assert(!user,JSON.stringify(error));assert.equal(error.redirect,mvp.mvpLoginPath);}
}
const {default:Welcome}=compile('app/coaches/malaysia/page.tsx',{'next/navigation':{redirect:location=>{throw {redirect:location};}},'next/image':()=>null,'next/link':()=>null});
try{await Welcome({searchParams:Promise.resolve({group:'kuala-lumpur'})});assert.fail('KL must lead to MVP');}catch(error){assert.equal(error.redirect,'/partners/mvp');}
assert(await Welcome({searchParams:Promise.resolve({group:'penang'})}));
console.log('PASS: MVP direct signup return, forged destinations rejected, verified server identity handoff, signed-out redirect, old KL link migration and separate Penang entry. Mocked auth; no real sign-in email sent. Database behavior is tested separately by rls-check.sql.');
