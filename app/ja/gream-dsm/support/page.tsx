import type { Metadata } from "next";
import { DsmPage } from "@/components/gream-dsm";
export const metadata: Metadata = {title:{absolute:"DSM GREAM スポンサー募集｜秋田のU15バスケットボールを支える"},description:"DSM GREAMの活動を支える企業・団体・地域の皆さまを募集。資金協賛、用具・物品提供、会場・移動の協力についてご相談いただけます。",alternates:{canonical:"https://riotbasketballacademy.com/ja/gream-dsm/support"},openGraph:{title:"DSM GREAM｜スポンサー・地域パートナー募集",locale:"ja_JP",type:"website",images:[{url:"https://riotbasketballacademy.com/gream-dsm/team.webp",width:1477,height:1108,alt:"DSM GREAMの集合写真"}]},twitter:{card:"summary_large_image",images:["https://riotbasketballacademy.com/gream-dsm/team.webp"]}};
export default function Page(){return <DsmPage support/>;}
