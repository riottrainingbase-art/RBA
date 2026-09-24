import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BasketballPassport } from "@/components/basketball-passport";
import styles from "../../participants/participants.module.css";
export const metadata:Metadata={title:"最初の記録 | MY HOME COURT",robots:{index:false,follow:false},alternates:{canonical:"/ja/my-homecourt/app/start"}};
export default async function StartPage(){
 const db=await createClient();const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Fstart");
 return <main className={`${styles.page} ${styles.start}`} lang="ja"><Link className={styles.back} href="/ja/my-homecourt/app">← MY HOME COURT</Link><h1>あなたの記録を、ここから。</h1><p>自分やお子さまを登録して、覚えている経験から残しましょう。</p><BasketballPassport userId={user.id}/><nav className={styles.links}><Link href="/ja/my-homecourt/app">ホームへ</Link><Link href="/ja/my-homecourt/app/learn">学びのライブラリ</Link><Link href="/ja/opportunities">次の活動を探す</Link><Link href="/ja/contact">記録の照合を相談する</Link></nav></main>;
}
