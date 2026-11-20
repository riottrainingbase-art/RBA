import assert from "node:assert/strict";
import {test} from "node:test";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const c=read("lib/rizehope-2027.ts");
const p=read("app/ja/international/rizehope-japan-2027/united/page.tsx");
const hub=read("components/rizehope-international.tsx");
test("RBA UNITED individual registration is not domestic team fee",()=>{
 assert.match(c,/domesticTeamFeeIsNotAnIndividualPrice: true/);
 assert.match(c,/totalJpy: null as number \| null/);
 assert.match(p,/66,000円は、選手個人の参加費ではありません/);
 assert.match(c,/263221266794057/);
 assert.match(p,/p\.freeInterestForm/);
});
test("individual payment is blocked until selection, terms, tax, and reconciliation",()=>{
 assert.match(c,/individualCheckoutEnabled: false/);
 assert.match(c,/genericPublicPaymentLinksAllowed: false/);
 assert.match(c,/isRizehopePaymentOpen\("unitedPlayer"\)/);
 assert.match(c,/Number\(p.totalJpy\)===Number\(p.depositJpy\)\+Number\(p.balanceJpy\)/);
 assert.match(c,/p.writtenGuardianTermsAgreed/);
 assert.match(c,/p.stripePaidWebhookVerified/);
 assert.match(c,/p.reconciliationToSelectedPlayerVerified/);
 assert.match(p,/決済は受付していません/);
 assert.doesNotMatch(p,/buy\.stripe\.com|book\.stripe\.com/);
});
test("RBA UNITED route discoverable and ten-team cap applied",()=>{
 assert.match(hub,/rizehope-japan-2027\/united/);
 assert.match(p,/最大10チーム/);
 assert.match(p,/優先確保枠はありません/);
});

test("reconciled proposed pricing is 36k = 15k + 21k, clearly not billable",()=>{
 const total=Number(c.match(/proposalTotalJpy: (\d+)/)?.[1]);
 const deposit=Number(c.match(/proposalDepositJpy: (\d+)/)?.[1]);
 const balance=Number(c.match(/proposalBalanceJpy: (\d+)/)?.[1]);
 const roster=Number(c.match(/proposalRosterTarget: (\d+)/)?.[1]);
 const teamEntry=Number(c.match(/proposalEventTeamEntryCostJpy: (\d+)/)?.[1]);
 assert.equal(total,36000);
 assert.equal(deposit,15000);
 assert.equal(balance,21000);
 assert.equal(total,deposit+balance);
 assert.equal(roster,14);
 assert.equal(teamEntry,66000);
 assert.match(c,/proposalIsApprovedForPublicPayment: false/);
 assert.match(c,/totalJpy: null as number \| null/);
 assert.match(c,/individualCheckoutEnabled: false/);
 assert.match(p,/36,000円＝15,000円＋21,000円/);
 assert.match(p,/正式な契約条件がそろうまでは前金を請求しません/);
});
