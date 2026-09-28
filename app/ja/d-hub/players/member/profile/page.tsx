import type {Metadata} from "next";
import Link from "next/link";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {ArrowLeft,ArrowRight,Save} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"PLAYER PROFILE | D-HUB PLAYERS"},robots:{index:false,follow:false}};

export default async function Page(){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fplayers%2Fmember%2Fprofile");
  const {data:ok}=await s.rpc("has_dhub_player_access");
  if(!ok)redirect("/ja/d-hub/players/member");

  const {data:profile}=await s.from("dhub_player_profiles").select("*").eq("user_id",user.id).maybeSingle();

  async function save(fd:FormData){
    "use server";
    const x=await createClient();
    const {data:{user:u}}=await x.auth.getUser();
    if(!u)return;
    const {data:allowed}=await x.rpc("has_dhub_player_access");
    if(!allowed)return;
    const grade=String(fd.get("grade")||"").slice(0,30);
    await x.from("dhub_player_profiles").upsert({
      user_id:u.id,
      player_name:String(fd.get("player_name")||"").slice(0,100),
      grade:grade||null,
      category:String(fd.get("category")||"").slice(0,50)||null,
      prefecture:String(fd.get("prefecture")||"").slice(0,50)||null,
      team_name:String(fd.get("team_name")||"").slice(0,120)||null,
      goal:String(fd.get("goal")||"").slice(0,1000),
      current_challenge:String(fd.get("current_challenge")||"").slice(0,1000),
      onboarding_completed:true,
      updated_at:new Date().toISOString()
    },{onConflict:"user_id"});
    revalidatePath("/ja/d-hub/players/member/profile");
    revalidatePath("/ja/d-hub/players/member");
  }

  return <SiteFrame locale="ja" languagePage="d-hub"><main className="dhub-player-profile-page">
    <header className="dhub-player-profile-hero section-pad">
      <Link className="back-link" href="/ja/d-hub/players/member"><ArrowLeft size={15}/> PLAYERS HOME</Link>
      <p className="section-index">D-HUB PLAYERS / MY PROFILE</p>
      <h1>今の自分を、<br/>ここから始める。</h1>
      <p>学年、所属、目標、今の課題を更新します。学年に合わせたカリキュラム表示や、今後のおすすめ導線に使います。</p>
    </header>
    <section className="dhub-player-profile-form section-pad">
      <div>
        <p className="section-index">PROFILE</p>
        <h2>選手プロフィール</h2>
        <p>ポジションや評価を固定するためではありません。今いる環境と、次に伸ばしたいことを整理するためのプロフィールです。</p>
      </div>
      <form action={save}>
        <label>選手名<input name="player_name" defaultValue={profile?.player_name||""} placeholder="名前"/></label>
        <label>学年<select name="grade" defaultValue={profile?.grade||""}>
          <option value="">選択してください</option>
          <option value="小4">小学4年</option>
          <option value="小5">小学5年</option>
          <option value="小6">小学6年</option>
          <option value="中1">中学1年</option>
          <option value="中2">中学2年</option>
          <option value="中3">中学3年</option>
          <option value="高校生">高校生</option>
          <option value="その他">その他</option>
        </select></label>
        <label>カテゴリー<input name="category" defaultValue={profile?.category||""} placeholder="例：U12 / U15 / 部活 / クラブ"/></label>
        <label>所属チーム<input name="team_name" defaultValue={profile?.team_name||""} placeholder="チーム名"/></label>
        <label>都道府県<input name="prefecture" defaultValue={profile?.prefecture||""} placeholder="宮城県"/></label>
        <label className="wide">今の目標<textarea name="goal" rows={5} defaultValue={profile?.goal||""} placeholder="結果だけでなく、どんなプレーができるようになりたいか"/></label>
        <label className="wide">今困っていること<textarea name="current_challenge" rows={5} defaultValue={profile?.current_challenge||""} placeholder="試合・練習で困っている場面を具体的に"/></label>
        <button className="button button-member" type="submit"><Save size={16}/> プロフィールを保存</button>
      </form>
    </section>
    <section className="dhub-player-profile-next section-pad">
      <div><p className="section-index inverse">NEXT</p><h2>プロフィールを、次の行動へ。</h2></div>
      <div><Link className="button button-light" href="/ja/d-hub/players/articles">選手記事を探す <ArrowRight size={16}/></Link><Link className="button button-member" href="/ja/d-hub/players/articles/grade6-to-u15-12month-roadmap">小6→U15 PATH <ArrowRight size={16}/></Link></div>
    </section>
  </main></SiteFrame>;
}
