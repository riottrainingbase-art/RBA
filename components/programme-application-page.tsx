import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {checkoutOffers} from "@/lib/checkout-options";
import {SiteFrame,type Locale} from "@/components/site-frame";
import {ProgrammeApplication} from "@/components/programme-application";

export async function ProgrammeApplicationPage({locale,offerSlug}:{locale:Locale;offerSlug:string}){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  const prefix=locale==="en"?"":`/${locale}`;
  const pagePath=`${prefix}/apply/${encodeURIComponent(offerSlug)}`;
  if(!user)redirect(`${prefix}/my-homecourt/login?next=${encodeURIComponent(pagePath)}`);
  const option=Object.entries(checkoutOffers).find(([,slug])=>slug===offerSlug)?.[0]||null;
  const checkoutHref=option?`/api/commerce/checkout/${encodeURIComponent(option)}?locale=${locale}`:null;
  return <SiteFrame locale={locale} languagePage="payments"><ProgrammeApplication locale={locale} offerSlug={offerSlug} checkoutHref={checkoutHref}/></SiteFrame>;
}
