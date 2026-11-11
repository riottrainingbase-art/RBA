/**
 * Internal pricing simulator for RBA Performance Tee.
 * All rates, costs and exchange rates are editable ASSUMPTIONS.
 * Do not treat output as a live Printful quote, tax advice or Shopify checkout price.
 */
export type TeeEconomicsInput={
  retailJpy:number;
  customerShippingJpy:number;
  baseProductUsd:number;
  supplierShippingUsd:number;
  usdToJpy:number;
  paymentPercent:number;
  paymentFixedJpy:number;
  importTaxAndDutiesJpy:number;
  fxAndSupplierSurchargeJpy:number;
  expectedReplacementJpy:number;
  packagingAndSupportJpy:number;
  salesTaxReserveJpy:number;
  monthlyPlatformJpy:number;
  monthlyOtherFixedJpy:number;
  plannedOrders:number;
  desiredContributionJpy:number;
};
export const defaultTeeEconomics:TeeEconomicsInput={
  retailJpy:4400,customerShippingJpy:0,
  baseProductUsd:14.77,supplierShippingUsd:4.95,usdToJpy:155,
  paymentPercent:3.55,paymentFixedJpy:0,
  importTaxAndDutiesJpy:0,fxAndSupplierSurchargeJpy:0,
  expectedReplacementJpy:150,packagingAndSupportJpy:150,salesTaxReserveJpy:0,
  monthlyPlatformJpy:4850,monthlyOtherFixedJpy:0,
  plannedOrders:15,desiredContributionJpy:1400,
};
export type TeeEconomicsResult={
  grossCollectedJpy:number;
  supplierCostJpy:number;
  paymentFeeJpy:number;
  allVariableCostsJpy:number;
  contributionJpy:number;
  contributionRate:number;
  monthlyContributionJpy:number;
  monthlyOperatingProfitJpy:number;
  breakEvenOrders:number|null;
  maxAllowableRetailForMinimumFeeJpy:number;
  suggestedRetailForTargetJpy:number;
};
export function computeTeeEconomics(input:TeeEconomicsInput):TeeEconomicsResult{
  for(const [key,value] of Object.entries(input)){
    if(!Number.isFinite(value)||value<0)throw new Error("Invalid nonnegative simulation input: "+key);
  }
  if(input.paymentPercent>=100||input.usdToJpy<=0||!Number.isInteger(input.plannedOrders))
    throw new Error("Invalid fee, FX or order-count assumption");
  const gross=input.retailJpy+input.customerShippingJpy;
  const supplierCost=(input.baseProductUsd+input.supplierShippingUsd)*input.usdToJpy;
  const fee=gross*input.paymentPercent/100+input.paymentFixedJpy;
  const otherCosts=input.importTaxAndDutiesJpy+input.fxAndSupplierSurchargeJpy
    +input.expectedReplacementJpy+input.packagingAndSupportJpy+input.salesTaxReserveJpy;
  const variable=supplierCost+fee+otherCosts;
  const contribution=gross-variable;
  const fixed=input.monthlyPlatformJpy+input.monthlyOtherFixedJpy;
  const net=contribution*input.plannedOrders-fixed;
  const factor=1-input.paymentPercent/100;
  const desired=(input.desiredContributionJpy+supplierCost+otherCosts+input.paymentFixedJpy-
    input.customerShippingJpy*factor)/factor;
  return {
    grossCollectedJpy:gross,
    supplierCostJpy:supplierCost,
    paymentFeeJpy:fee,
    allVariableCostsJpy:variable,
    contributionJpy:contribution,
    contributionRate:gross>0?contribution/gross:0,
    monthlyContributionJpy:contribution*input.plannedOrders,
    monthlyOperatingProfitJpy:net,
    breakEvenOrders:contribution>0?Math.ceil(fixed/contribution):null,
    maxAllowableRetailForMinimumFeeJpy:Math.max(0,(supplierCost+otherCosts+input.paymentFixedJpy-input.customerShippingJpy*factor)/factor),
    suggestedRetailForTargetJpy:Math.ceil(desired/100)*100,
  };
}
