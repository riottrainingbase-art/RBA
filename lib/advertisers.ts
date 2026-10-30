import 'server-only';
import {createClient} from '@supabase/supabase-js';
export type Advertiser={id:string;display_name:string;tier:'supporter'|'partner';ad_units:number;website_url:string;introduction:string;joined_at:string;logo_path:string;logo_url:string};
export async function getAdvertisers():Promise<Advertiser[]>{
 if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)return [];
 const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(url,options)=>fetch(url,{...options,cache:'no-store'})}});
 const {data,error}=await db.from('rba_advertisers').select('id,display_name,tier,website_url,introduction,joined_at,logo_path,ad_units').order('joined_at').order('created_at').order('id').limit(1000);
 if(error)return [];
 const rows=data||[];const paths=rows.filter(a=>a.logo_path&&a.tier==='partner').map(a=>a.logo_path);
 const signed=paths.length?await db.storage.from('rba-advertising-assets').createSignedUrls(paths,300):null;
 const urls=new Map((signed?.data||[]).map(p=>[p.path,p.signedUrl]));
 return rows.map(a=>({...a,logo_url:urls.get(a.logo_path)||''})) as Advertiser[];
}
export async function getAdvertisingReports(){
 if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)return [];
 const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(url,options)=>fetch(url,{...options,cache:'no-store'})}});
 const {data,error}=await db.from('rba_advertising_reports').select('id,title,report_month,pdf_path,issued_at').order('report_month',{ascending:false}).order('issued_at',{ascending:false}).limit(120);
 if(error||!data?.length)return [];
 const signed=await db.storage.from('rba-advertising-assets').createSignedUrls(data.map(r=>r.pdf_path),300);
 const urls=new Map((signed.data||[]).map(r=>[r.path,r.signedUrl]));
 return data.map(r=>({...r,url:urls.get(r.pdf_path)||''})).filter(r=>r.url);
}
