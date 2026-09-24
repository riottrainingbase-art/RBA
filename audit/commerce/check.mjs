import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
function compile(file, dependencies) {
  const compiledModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { URL, module: compiledModule, exports: compiledModule.exports,
    require: id => Object.hasOwn(dependencies, id) ? dependencies[id] : require(id) });
  return compiledModule.exports;
}
let signedIn = true, gateway = {ok:true,decision:'allowed',checkout_url:'https://book.stripe.com/verified-test'}, calls = 0;
const { GET } = compile('app/api/commerce/checkout/[option]/route.ts', {
  '@/lib/supabase/server': { createClient: async () => ({
    auth: { getUser: async () => ({data:{user:signedIn?{id:'test-user'}:null},error:null}) },
    functions: { invoke: async (name) => {assert.equal(name,'rba-checkout-gateway');calls++;return {data:gateway,error:null};} },
  }) },
});
let cases=0;
async function check(option,status,path){
 const response=await GET(new Request('https://example.test/api/commerce/checkout/test'),{params:Promise.resolve({option})});
 assert.equal(response.status,status);assert.equal(response.headers.get('location'),path);cases++;
}
for(const key of ['constructor','__proto__','toString','hasOwnProperty','missing',''])await check(key,404,null);
for(const key of ['yaima-rba','kobe-friday','kobe-half','kobe-1day','kobe-2day','kobe-3day','kobe-2day-stay','kobe-3day-stay'])await check(key,303,'https://example.test/ja/contact');
assert.equal(calls,0);
signedIn=false;await check('torsten-live',303,'https://example.test/ja/my-homecourt/login');assert.equal(calls,0);
signedIn=true;
for(const decision of ['blocked','waitlisted','inquiry_only']){gateway={ok:false,decision};await check('torsten-live',303,'https://example.test/ja/contact');}
for(const url of ['https://evil.test/pay','javascript:alert(1)','https://book.stripe.com.evil.test','https://user@book.stripe.com']){gateway={ok:true,decision:'allowed',checkout_url:url};await check('torsten-live',503,null);}
gateway={ok:true,decision:'allowed',checkout_url:'https://book.stripe.com/verified-test'};
await check('torsten-live',303,gateway.checkout_url);
console.log(`PASS: ${cases} gateway cases; no real payments or network calls.`);
