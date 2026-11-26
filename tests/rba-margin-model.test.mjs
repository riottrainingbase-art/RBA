import test from "node:test";
import assert from "node:assert/strict";
import {evaluateRbaMargin} from "../lib/rba-margin-model.ts";

const approved={
 sportingRulesApproved:true,venueConfirmed:true,safeguardingAndInsuranceConfirmed:true,
 termsAndRefundsApproved:true,deliverablesAndCapacityConfirmed:true,travelHandledSeparately:true
};
const scenario={
 paidParticipants:20,verifiedPaidParticipants:0,minimumParticipants:18,capacityParticipants:24,
 sportsFeePerParticipant:15000,confirmedSponsorship:100000,
 fixedVenueAndEventCosts:80000,coachesAndStaffCosts:100000,variableCostPerParticipant:1500,
 rbaTravelAndAccommodation:20000,contingency:20000,paymentFeePct:3.6,targetMarginPct:25,
 gates:approved
};

test("planning model separates card fees, sponsorship and verified receipts",()=>{
 const out=evaluateRbaMargin(scenario);
 assert.equal(out.sportsRevenue,300000);
 assert.equal(out.revenue,400000);
 assert.equal(out.verifiedRevenue,100000);
 assert.equal(out.directCosts,250000);
 assert.equal(out.paymentFees,10800);
 assert.equal(out.contribution,139200);
 assert.equal(out.marginPct,34.8);
 assert.equal(out.breakEvenPlayers,10);
 assert.equal(out.readyForReview,true);
 assert.equal(out.deliveryReady,false);
 assert.equal(out.cashCoverageGap,150000);
});

test("only fully reconciled paid attendance may satisfy final delivery review",()=>{
 const out=evaluateRbaMargin({...scenario,verifiedPaidParticipants:19});
 assert.equal(out.verifiedRevenue,385000);
 assert.equal(out.readyForReview,true);
 assert.equal(out.deliveryReady,true);
 assert.equal(out.cashCoverageGap,0);
});

test("operational permission remains a hard blocker even at healthy margins",()=>{
 const out=evaluateRbaMargin({...scenario,gates:{...approved,venueConfirmed:false},verifiedPaidParticipants:20});
 assert.equal(out.financiallyReady,true);
 assert.equal(out.operationallyReady,false);
 assert.equal(out.readyForReview,false);
 assert.equal(out.deliveryReady,false);
});

test("unreceived sponsorship must never be entered as confirmed money",()=>{
 const noSponsor=evaluateRbaMargin({...scenario,confirmedSponsorship:0});
 assert.equal(noSponsor.revenue,300000);
 assert.equal(noSponsor.readyForReview,false);
 assert.ok(noSponsor.suggestedPrice>scenario.sportsFeePerParticipant);
});

test("missing or impossible capacity, or duplicate paid counts, cannot pass review",()=>{
 for(const values of [
  {...scenario,minimumParticipants:0},
  {...scenario,capacityParticipants:0},
  {...scenario,capacityParticipants:18},
  {...scenario,verifiedPaidParticipants:21},
 ]){
  const out=evaluateRbaMargin(values);
  assert.equal(out.capacityOk,false);
  assert.equal(out.readyForReview,false);
 }
});

test("zero volume and impossible margin denominator do not create a fake quote",()=>{
 const zero=evaluateRbaMargin({...scenario,paidParticipants:0,verifiedPaidParticipants:0});
 assert.equal(zero.readyForReview,false);
 assert.equal(zero.suggestedPrice,null);
 const impossible=evaluateRbaMargin({...scenario,targetMarginPct:100});
 assert.equal(impossible.suggestedPrice,null);
 assert.equal(impossible.readyForReview,false);
});

test("fees are not deducted twice from banked sponsorship",()=>{
 const a=evaluateRbaMargin({...scenario,paidParticipants:0,minimumParticipants:0,capacityParticipants:0,confirmedSponsorship:100000});
 assert.equal(a.paymentFees,0);
 assert.equal(a.verifiedRevenue,100000);
});
