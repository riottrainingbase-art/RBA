import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";
import { essentials } from "@/lib/rba-essentials";

export const dynamic="force-dynamic";
const BASE="https://riotbasketballacademy.com";
const csvEscape=(s:string)=>'"'+s.replaceAll('"','""').replaceAll(/\r|\n/g," ").trim()+'"';
const sizes=["S","M","L","XL"] as const;

/**
 * Import URL into Meta Commerce Manager as a scheduled catalog feed ONLY
 * after the website and exact prices/photos/legal terms are released.
 * This endpoint is never a substitute for Meta account/domain eligibility review.
 */
export async function GET(){
 const cfg=getEssentialsPresaleConfig();
 if(!cfg.ready || process.env.RBA_ESSENTIALS_META_FEED_APPROVED!=="true"){
    return new Response("RBA ESSENTIALS catalog is not released.",{
      status:503,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"},
    });
 }
 const header=["id","title","description","availability","condition","price","link","image_link","brand","item_group_id","color","size","product_type","google_product_category"];
 const rows:string[][]=[];
 for(const item of essentials){
    const unit=item.slug==="tee"?cfg.unitPrices.tee:cfg.unitPrices.setup;
    if(!unit)continue;
    for(const size of sizes){
      rows.push([
        `RBA-${item.slug.toUpperCase()}-${item.color}-${size}`,
        `${item.title} / ${item.color} / ${size}`,
        `${item.description}　RBA公式アパレルの先行販売。発送期限${cfg.dispatchDeadline}。`,
        "preorder","new",`${unit} JPY`,
        `${BASE}${item.pagePath}`,
        item.image,
        "Riot Basketball Academy",
        `RBA-${item.slug.toUpperCase()}-${item.color}`,
        item.color,
        size,
        item.slug==="tee"?"T-shirt":"Hoodie and sweatpants set",
        "Apparel & Accessories > Clothing"
      ]);
    }
 }
 const csv=[header,...rows].map(row=>row.map(csvEscape).join(",")).join("\r\n")+"\r\n";
 return new Response("\ufeff"+csv,{
   headers:{"Content-Type":"text/csv; charset=utf-8","Cache-Control":"public, max-age=600"},
 });
}
