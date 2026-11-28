"use strict";
// Internal-only CLI/module. Never copied into dist. No payment API or charge.
const products=Object.freeze({
 "priority-rfq":Object.freeze({amount:33000,currency:"jpy",link:"https://buy.stripe.com/eVq6oH8GX6Hf0QT6gH0VO11",paymentLinkId:"plink_1UKgQ8DYCqayZSjAhddRmEZJ",intake:"https://form.jotform.com/262542049350049",label:"Priority RFQ Verification"}),
 "contact-desk":Object.freeze({amount:29800,currency:"jpy",link:"https://buy.stripe.com/dRm8wPcXdfdLgPR5cD0VO12",paymentLinkId:"plink_1UWIDaDYCqayZSjAacUUekD7",intake:"https://form.jotform.com/263024789882066",label:"Manufacturer Contact Desk"}),
 "supplier-dd":Object.freeze({amount:49800,currency:"jpy",link:"https://buy.stripe.com/9B67sL3mDd5D7fh7kL0VO13",paymentLinkId:"plink_1UWIDbDYCqayZSjA9kFdtKis",intake:"https://form.jotform.com/263025091048047",label:"Supplier Due Diligence"})
});
function paymentInstruction({orderRef,productKey,scopeApproved,termsApproved,deliveryConfirmed}){
 if(!/^JPN-[A-Z0-9-]{8,64}$/.test(orderRef)||!Object.hasOwn(products,productKey)||scopeApproved!==true||termsApproved!==true||deliveryConfirmed!==true)throw Error("Verified order reference, product, written scope, terms and delivery confirmation required.");
 const p=products[productKey];const u=new URL(p.link);u.searchParams.set("client_reference_id",orderRef);return {orderRef,productKey,amount:p.amount,currency:p.currency,paymentLinkId:p.paymentLinkId,url:u.toString()};
}
function reconcile(order,session){
 if(!order||!session||session.object!=="checkout.session"||session.livemode!==true||session.mode!=="payment"||session.status!=="complete"||session.payment_status!=="paid"||session.client_reference_id!==order.orderRef||session.payment_link!==order.paymentLinkId||session.currency!==order.currency||session.amount_total!==order.amount||!session.id||!session.payment_intent)return {status:"manual_review"};
 return {status:"paid_pending_fulfillment",orderRef:order.orderRef,sessionId:session.id,paymentIntentId:session.payment_intent};
}
module.exports={products,paymentInstruction,reconcile};
