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
