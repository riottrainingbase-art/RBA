import fs from 'node:fs';
import nodePath from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url), ts=require('typescript');
function compile(path,dependencies={}){
 const cjsModule={exports:{}};
 const js=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(js,{module:cjsModule,exports:cjsModule.exports,URL,console:{warn:()=>{}},location:{origin:'https://preview.example.test'},require:id=>id in dependencies?dependencies[id]:id.startsWith('@/')?compile(id.slice(2)+'.ts',dependencies):id.startsWith('.')?compile(nodePath.join(nodePath.dirname(path),id)+'.ts',dependencies):require(id)});
 return cjsModule.exports;
}
const {memberAuthDestination}=compile('lib/member-auth-redirect.ts');
let count=0;
const browserClientSource=fs.readFileSync('lib/supabase/client.ts','utf8');
assert.match(browserClientSource,/flowType:\s*"implicit"/);
assert.match(browserClientSource,/detectSessionInUrl:\s*true/);count+=2;
for(const prefix of ['','/ja','/ko','/zh-tw'])for(const section of ['','/calendar','/team','/notifications','/my','/admin']){
 const path=`${prefix}/my-homecourt/app${section}`;assert.equal(memberAuthDestination(path),path);count++;
}
for(const value of [null,'','//evil.test','/\\evil.test','https://evil.test','/%2f%2fevil.test','/ja/my-homecourt/app/../../outside','/ja/my-homecourt/app?next=https://evil.test','/ja/my-homecourt/app#token','/ja/my-homecourt/app/unknown']){assert.equal(memberAuthDestination(value),'/ja/my-homecourt/app');count++;}
for(const locale of ['ja','en','ko','zh-tw']){const path=`/api/commerce/checkout/torsten-live?locale=${locale}`;assert.equal(memberAuthDestination(path),path);count++;}
for(const path of ['/api/commerce/checkout/constructor','/api/commerce/checkout/unknown','/api/commerce/checkout/torsten-live?locale=ja&next=https://evil.test','/api/commerce/checkout/torsten-live?locale=//evil.test']){assert.equal(memberAuthDestination(path),'/ja/my-homecourt/app');count++;}
let exchangeCalls=0;
for(const mode of ['success','error','throw']){
 const {GET}=compile('app/auth/callback/route.ts',{'@/lib/member-auth-redirect':{memberAuthDestination},'next/server':{NextResponse:{redirect:url=>({location:url.toString()})}},'@/lib/supabase/server':{createClient:async()=>({auth:{exchangeCodeForSession:async()=>{exchangeCalls++;if(mode==='throw')throw Error('network');return {error:mode==='error'?{}:null};}}})}});
 const good=await GET(new Request('https://preview.example.test/auth/callback?code=TEST&next=%2Fko%2Fmy-homecourt%2Fapp'));
 assert.equal(good.location,`https://preview.example.test/ko/my-homecourt/${mode==='success'?'app':'login?error=auth&next=%2Fko%2Fmy-homecourt%2Fapp'}`);count++;
 const absent=await GET(new Request('https://preview.example.test/auth/callback?next=%2Fzh-tw%2Fmy-homecourt%2Fapp'));
 assert.equal(absent.location,'https://preview.example.test/zh-tw/my-homecourt/login?error=auth&next=%2Fzh-tw%2Fmy-homecourt%2Fapp');count++;
}
{
 const {GET}=compile('app/auth/confirm/route.ts',{'@/lib/member-auth-redirect':{memberAuthDestination},'next/server':{NextResponse:{redirect:url=>({location:url.toString()})}},'@/lib/supabase/server':{createClient:async()=>({auth:{verifyOtp:async()=>({error:null})}})}});
 const nested=encodeURIComponent('https://preview.example.test/auth/finish?next=%2Fko%2Fmy-homecourt%2Fapp');
 const result=await GET(new Request(`https://preview.example.test/auth/confirm?token_hash=HASH&type=email&next=${nested}`));
 assert.equal(result.location,'https://preview.example.test/ko/my-homecourt/app');count++;
}
assert.equal(exchangeCalls,3);
for(const code of ['pkce_code_verifier_not_found','bad_code_verifier','otp_expired','flow_state_expired','flow_state_not_found']){
 const {GET}=compile('app/auth/callback/route.ts',{'@/lib/member-auth-redirect':{memberAuthDestination},'next/server':{NextResponse:{redirect:url=>({location:url.toString()})}},'@/lib/supabase/server':{createClient:async()=>({auth:{exchangeCodeForSession:async()=>({error:{code}})}})}});
 const result=await GET(new Request('https://preview.example.test/auth/callback?code=TEST&next=%2Fja%2Fmy-homecourt%2Fapp'));
 assert.equal(new URL(result.location).searchParams.get('error'),['pkce_code_verifier_not_found','bad_code_verifier'].includes(code)?'browser':'expired');count++;
}
for(const locale of ['ja','en','ko','zh-tw'])for(const failure of [false,true]){
 const {GET}=compile('app/auth/callback/route.ts',{'@/lib/member-auth-redirect':{memberAuthDestination},'next/server':{NextResponse:{redirect:url=>({location:url.toString()})}},'@/lib/supabase/server':{createClient:async()=>({auth:{exchangeCodeForSession:async()=>({error:failure?{}:null})}})}});
 const next=`/api/commerce/checkout/torsten-live?locale=${locale}`;
 const result=await GET(new Request(`https://preview.example.test/auth/callback?code=TEST&next=${encodeURIComponent(next)}`));
 const url=new URL(result.location);
 if(failure){assert.equal(url.pathname,`${locale==='en'?'':'/'+locale}/my-homecourt/login`);assert.equal(url.searchParams.get('next'),next);}else assert.equal(url.pathname+url.search,next);
 count++;
}
for(const mode of ['success','error','throw']){
 let received;
 const {GET}=compile('app/auth/confirm/route.ts',{'@/lib/member-auth-redirect':{memberAuthDestination},'next/server':{NextResponse:{redirect:url=>({location:url.toString()})}},'@/lib/supabase/server':{createClient:async()=>({auth:{verifyOtp:async input=>{received=input;if(mode==='throw')throw Error('network');return {error:mode==='error'?{code:'otp_expired'}:null};}}})}});
 const result=await GET(new Request('https://preview.example.test/auth/confirm?token_hash=HASH&type=email&next=https%3A%2F%2Fpreview.example.test%2Fko%2Fmy-homecourt%2Fapp'));
 assert.equal(result.location,`https://preview.example.test/ko/my-homecourt/${mode==='success'?'app':'login?error=expired&next=%2Fko%2Fmy-homecourt%2Fapp'}`);
 if(mode!=='throw')assert.equal(received.type,'email');
 count++;
}
for(const next of ['https://evil.test/ja/my-homecourt/app','//evil.test/ja/my-homecourt/app','https://preview.example.test/outside']){
 const {GET}=compile('app/auth/confirm/route.ts',{'@/lib/member-auth-redirect':{memberAuthDestination},'next/server':{NextResponse:{redirect:url=>({location:url.toString()})}},'@/lib/supabase/server':{createClient:async()=>({auth:{verifyOtp:async()=>({error:null})}})}});
 const result=await GET(new Request(`https://preview.example.test/auth/confirm?token_hash=HASH&type=email&next=${encodeURIComponent(next)}`));
 assert.equal(result.location,'https://preview.example.test/ja/my-homecourt/app');count++;
}
function find(node,type){if(!node||typeof node!=='object')return null;if(node.type===type)return node;const children=node.props?.children;for(const child of Array.isArray(children)?children:[children]){const result=find(child,type);if(result)return result;}return null;}
for(const scenario of ['success','returned-error','rate-limit','thrown-error','no-consent','invalid-form','double-submit']){
 let stateIndex=0,requests=0,options,finish;
 const states=[' qa@example.test ','player',scenario!=='no-consent',false,false,''];
 const result=scenario==='double-submit'?new Promise(resolve=>finish=resolve):null;
 const react={useState:initial=>{const i=stateIndex++;if(!(i in states))states[i]=initial;return [states[i],value=>states[i]=value];},useRef:()=>({current:false})};
 const {MemberLogin}=compile('components/member-login.tsx',{'react':react,'@/lib/supabase/client':{createEmailLinkClient:()=>({auth:{signInWithOtp:async input=>{requests++;options=input;if(scenario==='thrown-error')throw Error('network');if(result)return result;return {error:scenario==='returned-error'?{status:500}:scenario==='rate-limit'?{status:429}:null};}}})}});
 const component=MemberLogin({locale:'ja'}), form=find(component,'form');assert(form);
 const event={preventDefault(){},currentTarget:{reportValidity:()=>scenario!=='invalid-form'}};
 const first=form.props.onSubmit(event);
 if(scenario==='double-submit'){await form.props.onSubmit(event);assert.equal(requests,1);finish({error:null});}
 await first;
 assert.equal(states[3],false,'busy must clear');
 const blocked=['no-consent','invalid-form'].includes(scenario);assert.equal(requests,blocked?0:1);
 const success=['success','double-submit'].includes(scenario);assert.equal(states[4],success);
 if(!blocked&&!success)assert(states[5].length>0);
 if(options){assert.equal(options.email,'qa@example.test');assert.equal(options.options.emailRedirectTo,'https://preview.example.test/auth/finish?next=%2Fja%2Fmy-homecourt%2Fapp');}
 count++;
}
const report={passed:count,scope:'Unit checks with simulated Supabase responses: destination allowlist, browser-independent token-hash confirmation, legacy callback recovery, login send success/error/rate limit/network exception, consent/validity guards and synchronous duplicate prevention. No real email was sent; inbox, SMTP and browser E2E unverified.'};
fs.writeFileSync('audit/email-registration/unit-results.json',JSON.stringify(report,null,2)+'\n');console.log(report);
