import test from "node:test";
import assert from "node:assert/strict";
import {evaluateRbaMargin} from "../lib/rba-margin-model.ts";

const approved={
 sportingRulesApproved:true,venueConfirmed:true,safeguardingAndInsuranceConfirmed:true,
 termsAndRefundsApproved:true,deliverablesAndCapacityConfirmed:true,travelHandledSeparately:true
};
const scenario={
 paidParticipants:20,minimumParticipants:18,sportsFeePerParticipant:15000,confirmedSponsorship:100000,
 fixedVenueAndEventCosts:80000,coachesAndStaffCosts:100000,variableCostPerParticipant:1500,
 rbaTravelAndAccommodation:20000,contingency:20000,paymentFeePct:3.6,targetMarginPct:30,
 gates:approved
};

test("contribution excludes external travel turnover and counts payment costs",()=>{
 const out=evaluateRbaMargin(scenario);
 assert.equal(out.revenue,400000);
 assert.equal(out.directCosts,250000);
 assert.equal(out.paymentFees,14400);
 assert.equal(out.contribution,135600);
 assert.equal(out.marginPct,33.9);
 assert.equal(out.breakEvenPlayers,10);
 assert.equal(out.readyForReview,true);
});

test("pending permission is a hard release blocker even if margin is healthy",()=>{
 const out=evaluateRbaMargin({...scenario,gates:{...approved,venueConfirmed:false}});
 assert.equal(out.financiallyReady,true);
 assert.equal(out.operationallyReady,false);
 assert.equal(out.readyForReview,false);
});

test("unconfirmed sponsor cannot rescue a below-target quote",()=>{
 const out=evaluateRbaMargin({...scenario,confirmedSponsorship:0});
 assert.equal(out.readyForReview,false);
 assert.ok(out.suggestedPrice>scenario.sportsFeePerParticipant);
});

test("zero attendees or unusable margin denominator never unlocks payment",()=>{
 const zero=evaluateRbaMargin({...scenario,paidParticipants:0});
 assert.equal(zero.readyForReview,false);
 assert.equal(zero.suggestedPrice,null);
 const impossible=evaluateRbaMargin({...scenario,targetMarginPct:100});
 assert.equal(impossible.suggestedPrice,null);
 assert.equal(impossible.readyForReview,false);
});
