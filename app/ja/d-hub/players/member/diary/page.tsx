import type {Metadata} from "next";
import Link from "next/link";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {ArrowLeft,ArrowRight,NotebookPen} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"PLAYER DIARY | D-HUB PLAYERS"},robots:{index:false,follow:false}};

const labels:Record<string,string>={practice:"PRACTICE",game:"GAME",body:"BODY",goal:"GOAL",other:"NOTE"};

export default async function Page(){
 const s=await createClient();
 const {data:{user}}=await s.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fplayers%2Fmember%2Fdiary");
 const {data:ok}=await s.rpc("has_dhub_player_access");
 if(!ok)redirect("/ja/d-hub/players/member");

 const {data:entries}=await s.from("dhub_player_diary").select("*").eq("user_id",user.id).order("occurred_on",{ascending:false}).order("created_at",{ascending:false}).limit(30);

 async function save(fd:FormData){
   "use server";
   const x=await createClient();
   const {data:{user:u}}=await x.auth.getUser();
   if(!u)return;
   const {data:allowed}=await x.rpc("has_dhub_player_access");
   if(!allowed)return;
   const type=String(fd.get("entry_type")||"practice");
   const allowedTypes=["practice","game","body","goal","other"];
   await x.from("dhub_player_diary").insert({
     user_id:u.id,
     entry_type:allowedTypes.includes(type)?type:"other",
     title:String(fd.get("title")||"").slice(0,140),
     occurred_on:String(fd.get("occurred_on")||new Date().toISOString().slice(0,10)),
     content:String(fd.get("content")||"").slice(0,4000),
     next_action:String(fd.get("next_action")||"").slice(0,1000)
   });
   revalidatePath("/ja/d-hub/players/member/diary");
 }

 return <SiteFrame locale="ja" languagePage="d-hub"><main className="dhub-player-diary-page">
   <header className="dhub-player-diary-hero section-pad">
     <Link className="back-link" href="/ja/d-hub/players/member"><ArrowLeft size={15}/> PLAYERS HOME</Link>
     <p className="section-index">D-HUB PLAYERS / MY DIARY</p>
     <h1>長い反省文はいらない。<br/>次につながる一行を残す。</h1>
     <p>練習、試合、身体、目標。全部を書かなくて大丈夫です。気になった日に、事実と次の一つだけ残します。</p>
   </header>
   <section className="dhub-player-diary-entry section-pad">
     <div><p className="section-index">NEW ENTRY</p><h2>今日の一つ。</h2><p>評価より先に、実際に何が起きたかを書きます。</p></div>
     <form action={save}>
       <div className="diary-row"><label>種類<select name="entry_type"><option value="practice">練習</option><option value="game">試合</option><option value="body">身体・回復</option><option value="goal">目標</option><option value="other">その他</option></select></label><label>日付<input type="date" name="occurred_on" defaultValue={new Date().toISOString().slice(0,10)}/></label></div>
       <label>タイトル<input name="title" required placeholder="例：キャッチ前にリングを見られた"/></label>
       <label>実際に起きたこと<textarea name="content" rows={7} placeholder="良かったこと、困ったこと、見えたこと"/></label>
       <label>次にやること<input name="next_action" placeholder="一つだけ"/></label>
       <button className="button button-member" type="submit"><NotebookPen size={16}/> 記録する</button>
     </form>
   </section>
   <section className="dhub-player-diary-history section-pad">
     <div className="section-head"><div><p className="section-index">LAST 30</p><h2>自分の変化を、あとから見つける。</h2></div><p>{entries?.length||0} ENTRIES</p></div>
     <div className="dhub-player-diary-list">{(entries||[]).map(entry=><article key={entry.id}>
       <div><span>{labels[entry.entry_type]||"NOTE"}</span><time>{entry.occurred_on}</time></div>
       <h3>{entry.title}</h3>
       {entry.content?<p>{entry.content}</p>:null}
       {entry.next_action?<strong>NEXT → {entry.next_action}</strong>:null}
     </article>)}</div>
   </section>
   <footer className="dhub-player-profile-next section-pad"><div><p className="section-index inverse">KEEP GOING</p><h2>記録したら、コートへ戻る。</h2></div><Link className="button button-light" href="/ja/d-hub/players/articles">次の記事を探す <ArrowRight size={16}/></Link></footer>
 </main></SiteFrame>;
}
