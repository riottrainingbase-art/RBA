import fs from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
const code=ts.transpileModule(fs.readFileSync('lib/homecourt-billing.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {hasCurrentHomecourtSubscription:valid}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const now=Date.parse('2026-09-24T00:00:00Z');
const s={id:'fixture',plan_key:'homecourt_monthly',status:'active',current_period_end:null,cancel_at_period_end:false};
const cases=[
 [[],false],[[s],true],[[{...s,status:'trialing'}],true],
 ...['cancelled','canceled','past_due','unpaid','inactive','incomplete'].map(status=>[[{...s,status}],false]),
 [[{...s,plan_key:'other'}],false],
 [[{...s,cancel_at_period_end:true}],false],
 [[{...s,cancel_at_period_end:true,current_period_end:'invalid'}],false],
 [[{...s,cancel_at_period_end:true,current_period_end:'2026-09-24T00:00:00Z'}],false],
 [[{...s,cancel_at_period_end:true,current_period_end:'2026-10-24T00:00:00Z'}],true],
];
for(const [input,expected] of cases)assert.equal(valid(input,now),expected,JSON.stringify(input));
console.log(`PASS: ${cases.length} subscription status checks. No payment was made.`);
