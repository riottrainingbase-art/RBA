import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { EssentialsPreorderForm } from "@/components/essentials-preorder-form";
import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";

export const dynamic="force-dynamic";
export const metadata:Metadata={
 title:"RBA ESSENTIALS｜公式アパレル・先行購入",
 description:"RBA ESSENTIALSの公式アパレル先行購入手続き。製造と納期が確定した場合のみ、税込価格・配送条件を明示してStripeで受付します。",
 robots:{index:false,follow:false},
};
export default async function EssentialsCheckoutPage({
 searchParams,
}:{searchParams:Promise<{item?:string;cancelled?:string}>}){
 const q=await searchParams;
 const config=getEssentialsPresaleConfig();
 return <SiteFrame locale="ja"><EssentialsPreorderForm
   available={config.ready}
   initial={q.item==="setup"?"setup":"tee"}
   teeJPY={config.ready?config.unitPrices.tee:null}
   setupJPY={config.ready?config.unitPrices.setup:null}
   shippingJPY={config.ready?config.shippingJPY:null}
   handwrittenJPY={config.handwrittenAvailable?config.handwrittenJPY:null}
   handwrittenAvailable={config.handwrittenAvailable}
   handwrittenTerms={config.handwrittenAvailable?config.handwrittenTerms:""}
   deliveryBy={config.ready?config.dispatchDeadline:null}
   arrivalBy={config.ready?config.deliveryDeadline:null}
   orderBy={config.ready?config.orderDeadline:null}
   termsVersion={config.ready?config.termsVersion:null}
   cancellationTerms={config.ready?config.cancellation:""}
   returnTerms={config.ready?config.returns:""}
   presaleNote={config.ready?config.note:""}
 /></SiteFrame>;
}
