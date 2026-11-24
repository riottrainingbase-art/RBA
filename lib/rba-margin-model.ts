/** Internal planning helper. Quotes are NOT payments and do not establish event approval. */
export type RevenueGate = {
  sportingRulesApproved: boolean;
  venueConfirmed: boolean;
  safeguardingAndInsuranceConfirmed: boolean;
  termsAndRefundsApproved: boolean;
  deliverablesAndCapacityConfirmed: boolean;
  travelHandledSeparately: boolean;
};
export type MarginInputs = {
  paidParticipants: number;
  minimumParticipants: number;
  sportsFeePerParticipant: number;
  confirmedSponsorship: number;
  fixedVenueAndEventCosts: number;
  coachesAndStaffCosts: number;
  variableCostPerParticipant: number;
  rbaTravelAndAccommodation: number;
  contingency: number;
  paymentFeePct: number;
  targetMarginPct: number;
  gates: RevenueGate;
};
const nonnegative=(value:number)=>Number.isFinite(value)?Math.max(0,value):0;
const proportion=(pct:number)=>Math.min(100,nonnegative(pct))/100;
export function evaluateRbaMargin(input:MarginInputs) {
  const count=Math.floor(nonnegative(input.paidParticipants));
  const minimum=Math.floor(nonnegative(input.minimumParticipants));
  const price=nonnegative(input.sportsFeePerParticipant);
  const sponsor=nonnegative(input.confirmedSponsorship);
  const base=nonnegative(input.fixedVenueAndEventCosts)+nonnegative(input.coachesAndStaffCosts)+nonnegative(input.rbaTravelAndAccommodation)+nonnegative(input.contingency);
  const per=nonnegative(input.variableCostPerParticipant);
  const rate=proportion(input.paymentFeePct);
  const target=proportion(input.targetMarginPct);
  const revenue=count*price+sponsor;
  const directCosts=base+count*per;
  const paymentFees=revenue*rate;
  const contribution=revenue-directCosts-paymentFees;
  const marginPct=revenue>0?contribution/revenue*100:0;
  const contributionPerPlayer=price*(1-rate)-per;
  const netSponsor=sponsor*(1-rate);
  const breakEvenPlayers=contributionPerPlayer>0?Math.max(0,Math.ceil((base-netSponsor)/contributionPerPlayer)):null;
  const denom=1-rate-target;
  const requiredTotalRevenue=denom>0?directCosts/denom:null;
  const suggestedPrice=count>0&&requiredTotalRevenue!==null?Math.max(0,Math.ceil((requiredTotalRevenue-sponsor)/count)):null;
  const verified=Object.values(input.gates).every(Boolean);
  const financiallyReady=count>0&&count>=minimum&&revenue>0&&contribution>=0&&marginPct>=input.targetMarginPct;
  return {
    revenue:Math.round(revenue),
    directCosts:Math.round(directCosts),
    paymentFees:Math.round(paymentFees),
    contribution:Math.round(contribution),
    marginPct,
    breakEvenPlayers,
    suggestedPrice,
    financiallyReady,
    operationallyReady:verified,
    readyForReview:financiallyReady&&verified,
  };
}
