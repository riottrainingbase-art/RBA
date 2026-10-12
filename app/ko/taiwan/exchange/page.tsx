import type { Metadata } from "next";
import { TaiwanTeamExchangeOfficial } from "@/components/taiwan-team-exchange-official";
export const metadata: Metadata = {
 title: "RBA 대만｜일본·대만 유소년 육성 교류 | Team Exchange",
 description: "Riot Basketball Academy Japan–Taiwan youth basketball development, coach learning, and team exchange. Confirmed activities and planning clearly distinguished.",
 alternates: {canonical:"https://riotbasketballacademy.com/ko/taiwan/exchange", languages:{"en":"https://riotbasketballacademy.com/taiwan/exchange","ja":"https://riotbasketballacademy.com/ja/taiwan/exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/exchange","ko":"https://riotbasketballacademy.com/ko/taiwan/exchange"}},
 openGraph:{title:"RBA 대만｜일본·대만 유소년 육성 교류 | Team Exchange",url:"https://riotbasketballacademy.com/ko/taiwan/exchange",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanTeamExchangeOfficial locale="ko"/>;}
