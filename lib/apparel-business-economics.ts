/** RBA apparel unit economics, editable assumptions only. Not a supplier quote or tax estimate. */
export type ApparelEconomicsInput = {
  retailJpy:number;
  buyerShippingJpy:number;
  supplierJpy:number;
  freightJpy:number;
  importJpy:number;
  labellingJpy:number;
  packagingJpy:number;
  replacementReserveJpy:number;
  processingPercent:number;
  processingFixedJpy:number;
  extraMonthlyFixedJpy:number;
  monthlyUnits:number;
  targetContributionJpy:number;
};

export const scenarios:Record<string,{name:string;values:ApparelEconomicsInput}>={
  tee:{name:"RBA Tシャツ（試算例）",values:{
    retailJpy:4400,buyerShippingJpy:550,supplierJpy:2000,freightJpy:450,
    importJpy:200,labellingJpy:100,packagingJpy:140,replacementReserveJpy:150,
    processingPercent:3.6,processingFixedJpy:0,extraMonthlyFixedJpy:0,
    monthlyUnits:20,targetContributionJpy:1200}},
  shorts:{name:"RBAショーツ（試算例）",values:{
    retailJpy:6500,buyerShippingJpy:550,supplierJpy:2700,freightJpy:550,
    importJpy:280,labellingJpy:100,packagingJpy:140,replacementReserveJpy:180,
    processingPercent:3.6,processingFixedJpy:0,extraMonthlyFixedJpy:0,
    monthlyUnits:20,targetContributionJpy:1600}},
  sleeves:{name:"海外アームスリーブ（試算例）",values:{
    retailJpy:3300,buyerShippingJpy:350,supplierJpy:1100,freightJpy:400,
    importJpy:150,labellingJpy:90,packagingJpy:100,replacementReserveJpy:120,
    processingPercent:3.6,processingFixedJpy:0,extraMonthlyFixedJpy:0,
    monthlyUnits:20,targetContributionJpy:900}}
};

export function computeApparelEconomics(i:ApparelEconomicsInput){
  for(const [key,value] of Object.entries(i)){
    if(!Number.isFinite(value)||value<0)throw new Error("Invalid appraisal field: "+key);
  }
  if(i.processingPercent>=100||!Number.isInteger(i.monthlyUnits))throw new Error("Invalid economics assumptions");
  const revenue=i.retailJpy+i.buyerShippingJpy;
  const procurement=i.supplierJpy+i.freightJpy+i.importJpy+i.labellingJpy+i.packagingJpy+i.replacementReserveJpy;
  const fee=revenue*i.processingPercent/100+i.processingFixedJpy;
  const contribution=revenue-procurement-fee;
  const monthly=contribution*i.monthlyUnits-i.extraMonthlyFixedJpy;
  const factor=1-i.processingPercent/100;
  const needed=(i.targetContributionJpy+procurement+i.processingFixedJpy)/factor-i.buyerShippingJpy;
  return {
    revenue,procurement,fee,contribution,
    rate:revenue>0?contribution/revenue:0,
    monthlyContribution:monthly,
    breakEvenUnits:contribution>0?Math.ceil(i.extraMonthlyFixedJpy/contribution):null,
    suggestedRetailJpy:Math.ceil(Math.max(0,needed)/100)*100
  };
}
