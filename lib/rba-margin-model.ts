/** RBA internal forecast only. No payment, booking or sale is authorised by this calculation. */
export type RevenueGate = {
  sportingRulesApproved: boolean;
  venueConfirmed: boolean;
  safeguardingAndInsuranceConfirmed: boolean;
  termsAndRefundsApproved: boolean;
  deliverablesAndCapacityConfirmed: boolean;
  travelHandledSeparately: boolean;
};
export type MarginInputs = {
  paidParticipants: number; // Expected buyers used for forecast, NOT verified payment count.
  verifiedPaidParticipants: number; // Unique paid registrations reconciled to processor.
  minimumParticipants: number;
  capacityParticipants: number; // Safety-approved upper bound.
  sportsFeePerParticipant: number;
  confirmedSponsorship: number; // Only cash received; speculative sponsorship excluded.
  fixedVenueAndEventCosts: number;
  coachesAndStaffCosts: number;
  variableCostPerParticipant: number;
  rbaTravelAndAccommodation: number; // RBA personnel only; exclude third-party travel turnover.
  contingency: number;
  paymentFeePct: number; // Card processing on sports participation fees, not banked sponsorship.
  targetMarginPct: number;
  gates: RevenueGate;
};
const nonnegative=(value:number)=>Number.isFinite(value)?Math.max(0,value):0;
const whole=(value:number)=>Math.floor(nonnegative(value));
const proportion=(pct:number)=>Math.min(100,nonnegative(pct))/100;
export function evaluateRbaMargin(input:MarginInputs) {
  const count=whole(input.paidParticipants);
  const verifiedCount=whole(input.verifiedPaidParticipants);
  const minimum=whole(input.minimumParticipants);
  const capacity=whole(input.capacityParticipants);
  const price=nonnegative(input.sportsFeePerParticipant);
  const sponsor=nonnegative(input.confirmedSponsorship);
  const base=nonnegative(input.fixedVenueAndEventCosts)+nonnegative(input.coachesAndStaffCosts)+nonnegative(input.rbaTravelAndAccommodation)+nonnegative(input.contingency);
  const per=nonnegative(input.variableCostPerParticipant);
  const rate=proportion(input.paymentFeePct);
  const target=proportion(input.targetMarginPct);
  const sportsRevenue=count*price;
  const revenue=sportsRevenue+sponsor;
  const directCosts=base+count*per;
  const paymentFees=sportsRevenue*rate;
  const contribution=revenue-directCosts-paymentFees;
  const marginPct=revenue>0?contribution/revenue*100:0;
  const contributionPerPlayer=price*(1-rate)-per;
  const breakEvenPlayers=contributionPerPlayer>0?Math.max(0,Math.ceil((base-sponsor)/contributionPerPlayer)):null;
  // Margin target applies to combined sports+received sponsorship revenue; only sports fees incur card fees.
  // (sports*count+sponsor - directCosts - sports*count*rate)/(sports*count+sponsor) >= target
  const denom=count*(1-rate-target);
  const numerator=directCosts-sponsor*(1-target);
  const suggestedPrice=count>0&&denom>0?Math.max(0,Math.ceil(numerator/denom)):null;
  const verifiedRevenue=verifiedCount*price+sponsor;
  const verifiedNetReceipts=verifiedCount*price*(1-rate)+sponsor;
  const cashCoverageGap=Math.max(0,directCosts-verifiedNetReceipts);
  const capacityOk=minimum>0&&capacity>=minimum&&count>=minimum&&count<=capacity&&verifiedCount<=count;
  const financialReady=capacityOk&&revenue>0&&contribution>=0&&marginPct>=input.targetMarginPct;
  const operationallyReady=Object.values(input.gates).every(Boolean);
  const deliveryReady=financialReady&&operationallyReady&&verifiedCount>=minimum;
  return {
    sportsRevenue:Math.round(sportsRevenue),
    revenue:Math.round(revenue),
    verifiedRevenue:Math.round(verifiedRevenue),
    directCosts:Math.round(directCosts),
    paymentFees:Math.round(paymentFees),
    contribution:Math.round(contribution),
    marginPct,
    breakEvenPlayers,
    suggestedPrice,
    cashCoverageGap:Math.round(cashCoverageGap),
    capacityOk,
    financiallyReady:financialReady,
    operationallyReady,
    readyForReview:financialReady&&operationallyReady,
    deliveryReady,
  };
}
