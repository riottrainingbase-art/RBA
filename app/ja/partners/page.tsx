import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("ja","partners");
import { LocalizedCorePage } from "@/components/localized-core-page";
export default function Page(){return <><aside style={{padding:"24px",background:"#e8ff6b",color:"#111",textAlign:"center"}}><strong>子どもたちの挑戦を、継続的に応援する。</strong><p>個人メンバーは月500円（税込）から。企業広告は1社につき月額1口・10,000円＋税（総額11,000円）です。</p><a href="/ja/support" style={{fontWeight:800,textDecoration:"underline"}}>写真・活動実績・応援プランを見る →</a></aside><LocalizedCorePage locale="ja" kind="partners"/></>}