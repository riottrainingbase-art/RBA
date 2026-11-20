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

test("price proposals are 22k / 24.8k with 10k deposit, balances correct, no payment",()=>{
 const find=name=>Number(c.match(new RegExp(name+": (\\d+)"))?.[1]);
 assert.equal(find("proposalEarlyTotalJpy"),22000);
 assert.equal(find("proposalRegularTotalJpy"),24800);
 assert.equal(find("proposalDepositJpy"),10000);
 assert.equal(find("proposalEarlyBalanceJpy"),12000);
 assert.equal(find("proposalRegularBalanceJpy"),14800);
 assert.equal(find("proposalEarlyTotalJpy"),find("proposalDepositJpy")+find("proposalEarlyBalanceJpy"));
 assert.equal(find("proposalRegularTotalJpy"),find("proposalDepositJpy")+find("proposalRegularBalanceJpy"));
 assert.equal(find("proposalRosterTarget"),14);
 assert.equal(find("proposalEventTeamEntryCostJpy"),66000);
 assert.match(c,/proposalEarlyQuota: null as number \| null/);
 assert.match(c,/proposalIsApprovedForPublicPayment: false/);
 assert.match(c,/totalJpy: null as number \| null/);
 assert.match(c,/individualCheckoutEnabled: false/);
 assert.match(p,/先行優待価格案/);
 assert.match(p,/22,000円/);
 assert.match(p,/24,800円/);
 assert.match(p,/前金10,000円 ＋ 残金12,000円/);
 assert.match(p,/前金10,000円 ＋ 残金14,800円/);
 assert.match(p,/前金を含む決済は行いません/);
});
