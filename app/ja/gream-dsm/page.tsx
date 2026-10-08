import type { Metadata } from "next";
import { DsmPage } from "@/components/gream-dsm";
export const metadata: Metadata = { title: {absolute:"DSM GREAM｜秋田県大仙市・仙北市・美郷町のU15バスケットボールクラブ"},description:"秋田県大仙市、仙北市、美郷町を中心に活動するU15クラブチームDSM GREAM。チーム紹介、体験・活動に関する相談、スポンサー募集をご案内します。",alternates:{canonical:"https://riotbasketballacademy.com/ja/gream-dsm"},openGraph:{title:"DSM GREAM｜大仙市・仙北市・美郷町のU15クラブチーム",locale:"ja_JP",type:"website",images:[{url:"https://riotbasketballacademy.com/gream-dsm/team.webp",width:1477,height:1108,alt:"DSM GREAMの集合写真"}]},twitter:{card:"summary_large_image",images:["https://riotbasketballacademy.com/gream-dsm/team.webp"]}};
export default function Page(){return <DsmPage/>;}
