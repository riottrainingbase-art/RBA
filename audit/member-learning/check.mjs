import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
import { z } from 'zod';
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
assert.equal(new Set(articles.memberArticles.map(a=>a.slug)).size,76);
assert.equal(articles.memberArticles.filter(a=>a.role==='player').length,39);
assert.equal(articles.memberArticles.filter(a=>a.role==='coach').length,2);
assert.equal(articles.memberArticles.filter(a=>a.role==='parent').length,35);
assert.ok(articles.memberArticles.filter(a=>['player','parent'].includes(a.role)).every(a=>a.category&&Array.isArray(a.tags)&&a.tags.length>0));
let records=[],dbError=null,user={id:'test-user'},bodyError=null;
const secret='TEST_ONLY_PRIVATE_BODY';
const testBody={sections:[{title:'Test section',paragraphs:[secret]}],action:'Test action',questions:['Test question']};
const bodyQuery={select:()=>bodyQuery,eq:()=>bodyQuery,maybeSingle:async()=>({data:testBody,error:bodyError})};
const query={select:()=>query,eq:(key,value)=>{if(key==='user_id')assert.equal(value,'test-user');return query;},then:resolve=>resolve({data:records,error:dbError})};
const Page=load('app/ja/my-homecourt/app/learn/[[...slug]]/page.tsx',{
 '@/lib/supabase/server':{createClient:async()=>({auth:{getUser:async()=>({data:{user}})},from:table=>{if(table==='member_article_bodies')return bodyQuery;assert.equal(table,'subscriptions');return query;}})},
 '@/lib/member-articles':articles,
 'zod':{z},
 '@/lib/member-article-access':{canReadMemberArticles},
 './reading.module.css':{default:{}},
 'next/link':{default:({prefetch,...props})=>jsx.jsx('a',props)},
 'next/navigation':{redirect:url=>{throw Error('REDIRECT:'+url)},notFound:()=>{throw Error('NOT_FOUND')}}
}).default;
const slug=articles.memberArticles[0].slug;

async function render(slugValue=[slug],search={}){return renderToStaticMarkup(await Page({params:Promise.resolve({slug:slugValue}),searchParams:Promise.resolve(search)}));}
assert.ok(!(await render()).includes(secret));
records=[active];assert.ok((await render()).includes(secret));
bodyError={message:'offline'};assert.ok(!(await render()).includes(secret));bodyError=null;
records=[{...active,status:'canceled'}];assert.ok(!(await render()).includes(secret));
records=[{...active,current_period_end:null}];let pending=await render();assert.ok(pending.includes('追加のお支払いはせず'));assert.ok(!pending.includes(secret));assert.ok(!pending.includes('href="/ja/payments"'));
records=[active];dbError={message:'offline'};let failed=await render();assert.ok(failed.includes('確認できませんでした'));assert.ok(!failed.includes(secret));
dbError=null;assert.ok(!(await render([])).includes(secret));
records=[active];
const parentSearch=await render([],{audience:'parent',q:'移籍'});assert.ok(parentSearch.includes('保護者向けガイド'));assert.ok(parentSearch.includes('移籍'));
const playerSearch=await render([],{audience:'player',q:'シュート'});assert.ok(playerSearch.includes('選手向けガイド'));assert.ok(playerSearch.includes('シュート'));
await assert.rejects(()=>render(['unknown']),/NOT_FOUND/);
user=null;await assert.rejects(()=>render(),/REDIRECT:.*next=/);
console.log('PASS: 11 subscription cases, 76 public-safe article records (39 player / 35 parent / 2 coach), player+parent search/category render, private-body access controls. No network or payment writes.');
