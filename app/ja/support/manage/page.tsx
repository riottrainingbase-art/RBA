import type {Metadata} from 'next';
import {redirect,notFound} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';
import PhotoManager from './photo-manager';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'写真を更新する｜RBA',robots:{index:false,follow:false}};
export default async function Page(){
 const db=await createClient();const {data:{user}}=await db.auth.getUser();
 if(!user)redirect('/ja/my-homecourt/login?next=%2Fja%2Fsupport%2Fmanage');
 const {data}=await db.from('rba_support_photo_editors').select('user_id').eq('user_id',user.id).maybeSingle();
 if(!data)notFound();
 return <PhotoManager/>;
}
