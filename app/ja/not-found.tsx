import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export default function NotFound(){
  return <SiteFrame locale="ja"><section className="system-state-page section-pad">
    <Search size={42}/>
    <p className="section-index">404 / PAGE NOT FOUND</p>
    <h1>お探しのページが<br/>見つかりませんでした。</h1>
    <p>URLが変更されたか、ページの公開が終了している可能性があります。募集中の活動やRBAの主要ページから、次の情報をお探しください。</p>
    <div className="system-state-actions">
      <Link className="button button-dark" href="/ja/opportunities">募集中の活動を見る <ArrowRight size={16}/></Link>
      <Link className="button button-light" href="/ja">RBAトップへ</Link>
      <Link className="text-link" href="/ja/contact">お問い合わせ <ArrowRight size={15}/></Link>
    </div>
  </section></SiteFrame>;
}
