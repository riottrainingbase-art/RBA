import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink, LockKeyhole, MessageCircle, NotebookPen } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "D-HUB MEMBER HOME | Riot Basketball Academy" },
  robots: { index: false, follow: false },
};

const BAND_URL = "https://band.us/n/aaa2bdj9xcJ1o";
const JOIN_FORM = "https://form.jotform.com/262590542634055";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fmember");
  }

  const { data: hasAccess } = await supabase.rpc("has_dhub_access");

  if (!hasAccess) {
    return (
      <SiteFrame locale="ja" languagePage="d-hub">
        <main className="dhub-member-page">
          <section className="dhub-member-hero section-pad">
            <LockKeyhole size={42}/>
            <p className="section-index">D-HUB / MEMBER ACCESS</p>
            <h1>このページは、D-HUBメンバー専用です。</h1>
            <p>Squareの月額購読が確認できたメンバーは、RBA IDでログインすると利用できます。すでに決済済みなのに入れない場合は、申込時・Square決済時・RBA IDのメールアドレスが異なる可能性があります。</p>
            <div className="dhub-member-actions">
              <a className="button button-dark" href={JOIN_FORM} target="_blank" rel="noreferrer">D-HUBへ参加する <ExternalLink size={16}/></a>
              <Link className="button button-light" href="/ja/contact">決済済みの方はこちら <ArrowRight size={16}/></Link>
            </div>
          </section>
        </main>
      </SiteFrame>
    );
  }

  const { data: membershipRows } = await supabase
    .from("dhub_memberships")
    .select("member_name,status,provider,last_payment_at,access_until")
    .limit(1);

  const membership = membershipRows?.[0];

  return (
    <SiteFrame locale="ja" languagePage="d-hub">
      <main className="dhub-member-page">
        <section className="dhub-member-hero section-pad">
          <CheckCircle2 size={42}/>
          <p className="section-index">D-HUB / PAID MEMBER</p>
          <h1>学んで、試して、また戻ってくる。</h1>
          <p>D-HUBは記事を読むだけの有料版ではありません。毎週の問い、現場で試す課題、指導者同士の対話、振り返りを一つにつなげるメンバー環境です。</p>
          <div className="dhub-member-status">
            <span>MEMBERSHIP</span>
            <strong>{membership?.status === "grace" ? "GRACE" : "ACTIVE"}</strong>
            <small>Square 月額3,300円</small>
          </div>
        </section>

        <section className="dhub-member-section section-pad">
          <div className="section-head">
            <div><p className="section-index">THIS WEEK</p><h2>今週は、一つだけ現場で試す。</h2></div>
            <p>全部変える必要はありません。JOURNALかD-HUBで得た問いを一つ選び、次の練習で観察します。</p>
          </div>
          <div className="dhub-member-grid">
            <article><BookOpen/><span>01 / READ</span><h3>根拠を読む</h3><p>指導者JOURNALから、今の課題に近い記事を一本選びます。</p><Link href="/ja/journal/coaches">COACH JOURNAL <ArrowRight size={15}/></Link></article>
            <article><NotebookPen/><span>02 / TEST</span><h3>練習で試す</h3><p>テーマを一つに絞り、目的・制約・観察項目を決めます。</p><Link href="/ja/my-homecourt/coaches">COACH HOME <ArrowRight size={15}/></Link></article>
            <article><MessageCircle/><span>03 / DISCUSS</span><h3>D-HUBで話す</h3><p>実際に起きたことを持ち帰り、他の指導者と考えます。</p><a href={BAND_URL} target="_blank" rel="noreferrer">BANDを開く <ExternalLink size={15}/></a></article>
          </div>
        </section>

        <section className="dhub-member-section dhub-member-dark section-pad">
          <div className="section-head">
            <div><p className="section-index inverse">MEMBER VALUE</p><h2>無料JOURNALとの違い。</h2></div>
            <p>無料では「理解する」。D-HUBでは「自分の現場で使い、振り返り、次を修正する」まで進めます。</p>
          </div>
          <div className="dhub-member-value">
            <div><span>FREE JOURNAL</span><strong>KNOW</strong><p>研究、参考文献、RBAの解釈、限界を読む。</p></div>
            <div><span>D-HUB MEMBER</span><strong>APPLY</strong><p>毎週の実践課題、対話、ケース検討、振り返りへつなぐ。</p></div>
            <div><span>COACHING LOOP</span><strong>UPDATE</strong><p>READ → PLAN → COACH → REVIEWを繰り返す。</p></div>
          </div>
          <div className="dhub-member-actions">
            <a className="button button-light" href={BAND_URL} target="_blank" rel="noreferrer">D-HUB BANDへ <ExternalLink size={16}/></a>
            <Link className="button button-dark" href="/ja/journal/coaches">指導者JOURNAL <ArrowRight size={16}/></Link>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
