import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
import * as jsx from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
function load(path, imports={}) {
 const module={exports:{}};
 const code=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 vm.runInNewContext(code,{module,exports:module.exports,require:key=>{if(key==='server-only')return {};if(key==='react/jsx-runtime')return jsx;if(key in imports)return imports[key];throw Error(key);},Date});
 return module.exports;
}
const {canReadMemberArticles}=load('lib/member-article-access.ts');
const articles=load('lib/member-articles.ts');
const now=Date.parse('2026-09-24T12:00:00Z');
const active={id:'test',status:'active',plan_key:'homecourt_monthly',current_period_end:'2099-01-01T00:00:00Z',cancel_at_period_end:false};
for(const [patch,expected] of [[{},true],[{status:'trialing'},true],[{cancel_at_period_end:true},true],[{status:'canceled'},false],[{status:'past_due'},false],[{plan_key:'other'},false],[{current_period_end:null},false],[{current_period_end:'invalid'},false],[{current_period_end:'2026-09-24T12:00:00Z'},false],[{current_period_end:'2020-01-01'},false]])assert.equal(canReadMemberArticles([{...active,...patch}],now),expected);
assert.equal(canReadMemberArticles([],now),false);
assert.equal(new Set(articles.memberArticles.map(a=>a.slug)).size,6);
for(const role of ['player','parent','coach'])assert.equal(articles.memberArticles.filter(a=>a.role===role).length,2);
let records=[],dbError=null,user={id:'test-user'};
const query={select:()=>query,eq:(key,value)=>{if(key==='user_id')assert.equal(value,'test-user');return query;},then:resolve=>resolve({data:records,error:dbError})};
const Page=load('app/ja/my-homecourt/app/learn/[[...slug]]/page.tsx',{
 '@/lib/supabase/server':{createClient:async()=>({auth:{getUser:async()=>({data:{user}})},from:table=>{assert.equal(table,'subscriptions');return query;}})},
 '@/lib/member-articles':articles,
 '@/lib/member-article-access':{canReadMemberArticles},
 './reading.module.css':{default:{}},
 'next/link':{default:({prefetch,...props})=>jsx.jsx('a',props)},
 'next/navigation':{redirect:url=>{throw Error('REDIRECT:'+url)},notFound:()=>{throw Error('NOT_FOUND')}}
}).default;
const slug=articles.memberArticles[0].slug;
const secret=articles.memberArticles[0].sections[0].paragraphs[0];
async function render(slugValue=[slug]){return renderToStaticMarkup(await Page({params:Promise.resolve({slug:slugValue})}));}
assert.ok(!(await render()).includes(secret));
records=[active];assert.ok((await render()).includes(secret));
records=[{...active,status:'canceled'}];assert.ok(!(await render()).includes(secret));
records=[{...active,current_period_end:null}];let pending=await render();assert.ok(pending.includes('追加のお支払いはせず'));assert.ok(!pending.includes(secret));assert.ok(!pending.includes('href="/ja/payments"'));
records=[active];dbError={message:'offline'};let failed=await render();assert.ok(failed.includes('確認できませんでした'));assert.ok(!failed.includes(secret));
dbError=null;assert.ok(!(await render([])).includes(secret));
await assert.rejects(()=>render(['unknown']),/NOT_FOUND/);
user=null;await assert.rejects(()=>render(),/REDIRECT:.*next=/);
console.log('PASS: 11 subscription cases, 6 article records, 8 server-render/access cases. No network or payment writes.');
