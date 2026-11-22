import type { Metadata } from "next";
import { TaipeiClinic2026 } from "@/components/taipei-development-clinic-2026";
const url="https://taipei.riotbasketballacademy.com/ja/events/taipei-development-clinic-2026";
export const metadata: Metadata = {
 title: "RBA × SPARTANS｜台北育成クリニック 2026年12月11〜13日",
 description: "天母12/11 18:30〜20:00、内湖12/12 16:00〜18:00、林口12/13 14:00〜16:00。会場予約済み。参加相談・正式申込・決済のお問い合わせはSPARTANS公式LINEへ。",
 alternates: {canonical:url,languages:{ja:"https://taipei.riotbasketballacademy.com/ja/events/taipei-development-clinic-2026","zh-Hant-TW":"https://taipei.riotbasketballacademy.com/zh-tw/events/taipei-development-clinic-2026",en:"https://taipei.riotbasketballacademy.com/events/taipei-development-clinic-2026"}},
 openGraph:{title:"RBA × SPARTANS｜台北育成クリニック 2026年12月11〜13日",description:"天母12/11 18:30〜20:00、内湖12/12 16:00〜18:00、林口12/13 14:00〜16:00。会場予約済み。参加相談・正式申込・決済のお問い合わせはSPARTANS公式LINEへ。",url,siteName:"Riot Basketball Academy × SPARTANS",type:"website"}
};
export default function Page(){return <TaipeiClinic2026 locale="ja"/>;}
