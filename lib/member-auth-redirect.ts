import { checkoutOffers } from "./checkout-options";
/** Permit only existing member sections and verified checkout routes. */
export function memberAuthDestination(value: string | null): string {
 const fallback="/ja/my-homecourt/app";
 if(!value)return fallback;
 if(/^\/(?:(?:ja|ko|zh-tw)\/)?my-homecourt\/app(?:\/(?:calendar|team|notifications|my|admin|start|learn(?:\/[a-z0-9-]+)?))?$/.test(value))return value;
 const match=value.match(/^\/api\/commerce\/checkout\/([a-z0-9-]+)(?:\?locale=(en|ja|ko|zh-tw))?$/);
 return match&&Object.hasOwn(checkoutOffers,match[1])?value:fallback;
}
