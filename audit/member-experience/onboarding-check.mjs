import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const source=fs.readFileSync('components/member-app.tsx','utf8');
const body=source.slice(source.indexOf('  async function onboarding('),source.indexOf('\n  async function createTeam'));
const code=ts.transpileModule(`${body};globalThis.submit=onboarding;`,{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText;
for(const scenario of ['existing-role','new-role','role-denied','profile-denied','profile-missing','network-failure']){
 const calls=[];let busy=false,errors=0,loaded=0;
 const supabase={from(table){
   if(table==='profile_roles')return {upsert:async(_row,opts)=>{
     calls.push('role');assert.deepEqual(JSON.parse(JSON.stringify(opts)),{onConflict:'user_id,role',ignoreDuplicates:true});
     if(scenario==='network-failure')throw Error('network');
     return {error:scenario==='role-denied'?{}:null};
   }};
   return {update(){calls.push('profile');return {eq:()=>({select:()=>({maybeSingle:async()=>({data:scenario==='profile-missing'?null:{id:'test-user'},error:scenario==='profile-denied'?{}:null})})})};}};
 }};
 const context={FormData:class{get(k){return k==='role'?'player':'RBA test'}},userId:'test-user',locale:'ja',setBusy:x=>{busy=x},setMessage:()=>{},reportError:()=>{errors++;busy=false},load:async()=>{loaded++},supabase};
 vm.runInNewContext(code,context);await context.submit({preventDefault(){},currentTarget:{}});
 assert.equal(busy,false,scenario);const success=['existing-role','new-role'].includes(scenario);assert.equal(loaded,success?1:0,scenario);assert.equal(errors,success?0:1,scenario);if(['role-denied','network-failure'].includes(scenario))assert.deepEqual(calls,['role']);
}
console.log('Onboarding: 6 submission cases passed (mocked persistence; live duplicate role SQL separately verified with rollback).');
