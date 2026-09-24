import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as jsx from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
function load(path,imports={}){const module={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,{module,exports:module.exports,require:k=>{if(k==='react/jsx-runtime')return jsx;if(k in imports)return imports[k];throw Error(k);}});return module.exports;}
const {memberAuthDestination}=load('lib/member-auth-redirect.ts',{'./checkout-options':{checkoutOffers:{}}});
assert.equal(memberAuthDestination('/ja/my-homecourt/app/start'),'/ja/my-homecourt/app/start');
for(const value of ['https://example.com','//example.com','/ja/my-homecourt/app/start/../../admin','/ja/my-homecourt/app/start?next=https://example.com'])assert.equal(memberAuthDestination(value),'/ja/my-homecourt/app');
let user=null,redirected;
const {default:Page}=load('app/ja/my-homecourt/app/start/page.tsx',{'next/link':{default:({children,...props})=>jsx.jsx('a',{...props,children})},'next/navigation':{redirect:url=>{redirected=url;throw Error('REDIRECT');}},'@/lib/supabase/server':{createClient:async()=>({auth:{getUser:async()=>({data:{user}})}})},'@/components/basketball-passport':{BasketballPassport:({userId})=>jsx.jsx('div',{'data-user':userId,children:'Passport'})},'../../participants/participants.module.css':{default:{page:'page',start:'start'}}});
await assert.rejects(Page,/REDIRECT/);assert.equal(redirected,'/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Fstart');
user={id:'test-user'};const html=renderToStaticMarkup(await Page());assert.ok(html.includes('data-user="test-user"'));assert.ok(html.includes('次の活動を探す'));
console.log('Participant start: redirect allowlist, signed-out redirect and signed-in Passport identity passed.');
