import 'server-only';
import {createClient} from '@supabase/supabase-js';

export type Advertiser={
  id:string;
  display_name:string;
  tier:'supporter'|'partner';
  ad_units:number;
  website_url:string;
  introduction:string;
  joined_at:string;
  logo_path:string;
  logo_url:string;
};

/**
 * Strictly public and paid-for advertiser directory, separate from programme
 * sponsorship and outreach leads. Missing evidence fails closed.
 * Do NOT treat a signed form, a Stripe checkout alone or a draft as publication.
 */
export async function getAdvertisers():Promise<Advertiser[]>{
  if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)return [];
  const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,{
    auth:{persistSession:false,autoRefreshToken:false},
    global:{fetch:(url,options)=>fetch(url,{...options,cache:'no-store'})}
  });
  const now=new Date().toISOString();
  const {data,error}=await db.from('rba_advertisers')
    .select('id,display_name,tier,website_url,introduction,joined_at,logo_path,ad_units,display_until,published,paid_verified,consent_confirmed_at')
    .eq('published',true)
    .eq('paid_verified',true)
    .not('consent_confirmed_at','is',null)
    .gte('display_until',now)
    .order('joined_at').order('created_at').order('id').limit(1000);
  if(error)return [];
  const rows=(data||[]).filter(a=>
    a.published===true && a.paid_verified===true &&
    Boolean(a.consent_confirmed_at) && Boolean(a.display_until) &&
    new Date(a.display_until).getTime()>=Date.now()
  );
  const paths=rows.filter(a=>a.logo_path&&a.tier==='partner').map(a=>a.logo_path);
  const signed=paths.length?await db.storage.from('rba-advertising-assets').createSignedUrls(paths,300):null;
  const urls=new Map((signed?.data||[]).map(p=>[p.path,p.signedUrl]));
  return rows.map(a=>({
    id:a.id,display_name:a.display_name,tier:a.tier,ad_units:a.ad_units,
    website_url:a.website_url,introduction:a.introduction,joined_at:a.joined_at,
    logo_path:a.logo_path,logo_url:urls.get(a.logo_path)||''
  })) as Advertiser[];
}

export async function getAdvertisingReports(){
  if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)return [];
  const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,{
    auth:{persistSession:false,autoRefreshToken:false},
    global:{fetch:(url,options)=>fetch(url,{...options,cache:'no-store'})}
  });
  const {data,error}=await db.from('rba_advertising_reports')
    .select('id,title,report_month,pdf_path,issued_at')
    .order('report_month',{ascending:false}).order('issued_at',{ascending:false}).limit(120);
  if(error||!data?.length)return [];
  const signed=await db.storage.from('rba-advertising-assets').createSignedUrls(data.map(r=>r.pdf_path),300);
  const urls=new Map((signed.data||[]).map(r=>[r.path,r.signedUrl]));
  return data.map(r=>({...r,url:urls.get(r.pdf_path)||''})).filter(r=>r.url);
}
