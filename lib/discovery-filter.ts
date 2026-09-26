import type { Programme } from "@/components/programme-data";
export type DiscoveryFilters={age:string;region:string;category:string;from:string;to:string;onlineOnly:boolean};
export function filterDevelopmentOpportunities(items:readonly Programme[],filters:DiscoveryFilters,today:string){
 return items.filter(p=>!p.registrationClosed&&p.startDate>=today&&(!filters.age||p.ageGroups.some(a=>a===filters.age))&&(!filters.region||p.region===filters.region)&&(!filters.category||p.category===filters.category)&&(!filters.onlineOnly||p.region==="online")&&(!filters.from||p.startDate>=filters.from)&&(!filters.to||p.startDate<=filters.to)).sort((a,b)=>a.startDate.localeCompare(b.startDate));
}
