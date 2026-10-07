import type { Metadata } from "next";
import { DsmPage } from "@/components/gream-dsm";
export const metadata: Metadata = { title: {absolute:"GREAM DSM｜秋田県大仙市のU15バスケットボールクラブ"},description:"秋田県大仙市を中心に活動するU15クラブチームGREAM DSM。チーム紹介、体験・活動に関する相談、スポンサー募集をご案内します。",alternates:{canonical:"https://riotbasketballacademy.com/ja/gream-dsm"},openGraph:{title:"GREAM DSM｜大仙市のU15クラブチーム",images:["/gream-dsm/team.webp"]}};
export default function Page(){return <DsmPage/>;}
