import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { TorstenShareKit } from "@/components/torsten-share-kit";
import { clinicPath, clinicSharePath, clinicTitle } from "@/lib/torsten-clinic";

export const metadata: Metadata = {
  title: "11/25 トーステン講習｜チーム内で共有できる案内文 | RBA",
  description: "ミニバス・U12、U15・中高・大学、保護者・選手向けの紹介文を選んでコピー。日本語逐次通訳付き、ライブ3,300円・30日オンデマンド4,400円。",
  alternates: { canonical: `https://riotbasketballacademy.com${clinicSharePath}` },
  openGraph: { title: "11/25 トーステン・ロイブル オンラインクリニック", description: "練習では入る。そのシュートを、試合で打てる力へ。チーム内で共有できる案内文。", url: `https://riotbasketballacademy.com${clinicSharePath}`, locale: "ja_JP", type: "website" },
};

export default function ClinicSharePage() {
  return <SiteFrame locale="ja" languagePage="events/torsten-loibl-online-clinic">
    <section className="section-pad" style={{background:"#f5f4f0"}}>
      <a className="back-link" href={clinicPath}>← 講習の詳細へ</a>
      <p className="section-index" style={{marginTop:30}}>チーム・指導者仲間への紹介</p>
      <h1 style={{fontSize:"clamp(32px,5vw,60px)",lineHeight:1.3,margin:"22px 0"}}>必要な人へ、<br/>そのまま届けられる案内文。</h1>
      <p style={{maxWidth:760,lineHeight:1.9}}>トーステン・ロイブル氏「{clinicTitle}」。同じ現場のスタッフや、学びたい指導者仲間へ。届けたい相手に合わせて紹介文を選べます。</p>
      <p style={{margin:"20px 0 40px",lineHeight:1.8}}>2026年11月25日（水）20:00〜21:30／Zoom・日本語逐次通訳<br/>ライブ3,300円・公開後30日間オンデマンド4,400円（税込）</p>
      <TorstenShareKit/>
      <a className="button button-dark" style={{marginTop:30}} href={clinicPath}>講習内容・参加方法を確認する</a>
    </section>
  </SiteFrame>;
}
