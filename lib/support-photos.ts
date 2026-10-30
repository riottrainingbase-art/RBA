import 'server-only';
import {createClient} from '@supabase/supabase-js';
export type SupportPhoto={id:string;path:string;caption:string;alt:string;width:number;height:number;sort_order:number;published:boolean;src:string};
export async function getSupportPhotos():Promise<SupportPhoto[]>{
 if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)return [];
 const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(url,options)=>fetch(url,{...options,cache:'no-store'})}});
 const {data,error}=await db.from('rba_support_photos').select('id,path,caption,alt,width,height,sort_order,published').eq('published',true).order('sort_order').order('created_at',{ascending:false}).limit(100);
 if(error)return [];
 const rows=(data||[]) as Omit<SupportPhoto,'src'>[];
 const paths=rows.filter(p=>!p.path.startsWith('/media/support/')).map(p=>p.path);
 const signed=paths.length?await db.storage.from('rba-support-photos').createSignedUrls(paths,300):null;
 const urls=new Map((signed?.data||[]).map(p=>[p.path,p.signedUrl]));
 return rows.map(p=>({...p,src:p.path.startsWith('/media/support/')?p.path:urls.get(p.path)||''})).filter(p=>p.src);
}
