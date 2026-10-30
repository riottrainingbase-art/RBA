import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("ja","partners");
import { LocalizedCorePage } from "@/components/localized-core-page";
export default function Page(){return <><aside style={{padding:"24px",background:"#e8ff6b",color:"#111",textAlign:"center"}}><strong>子どもたちの挑戦を、継続的に応援する。</strong><p>個人は月500円から。企業は月5,000円・10,000円から。</p><a href="/ja/support" style={{fontWeight:800,textDecoration:"underline"}}>写真・活動実績・応援プランを見る →</a></aside><LocalizedCorePage locale="ja" kind="partners"/></>}