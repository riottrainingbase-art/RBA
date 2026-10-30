import { checkoutOffers } from "./checkout-options";
/** Permit only existing member sections and verified checkout routes. */
export function memberAuthDestination(value: string | null): string {
 const fallback="/ja/my-homecourt/app";
 if(!value)return fallback;
 if(value==="/ja/support/manage")return value;
 if(value==="/ja/events/okinawa-clinic-2026-11-14")return value;
 if(value==="/my-homecourt/app/mvp")return value;
 if(/^\/my-homecourt\/app\/coach-library(?:\?group=(penang|kuala-lumpur|malaysia))?$/.test(value))return value;
 if(/^\/(?:(?:ja|ko|zh-tw)\/)?my-homecourt\/app(?:\/(?:calendar|team|notifications|my|admin|start|plus|report|learn(?:\/[a-z0-9-]+)?))?$/.test(value))return value;
 if(/^\/(?:(?:ja|ko|zh-tw)\/)?opportunities(?:\?[a-zA-Z0-9=&_-]+)?$/.test(value))return value;
 if(/^\/(?:(?:ja|ko|zh-tw)\/)?journal(?:\/[a-z0-9-]+)?(?:\?[a-zA-Z0-9=&_%.-]+)?$/.test(value))return value;
 const match=value.match(/^\/api\/commerce\/checkout\/([a-z0-9-]+)(?:\?locale=(en|ja|ko|zh-tw))?$/);
 return match&&Object.hasOwn(checkoutOffers,match[1])?value:fallback;
}
