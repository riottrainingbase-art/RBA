import type { Metadata } from "next";
import { TaiwanTeamExchangeOfficial } from "@/components/taiwan-team-exchange-official";
export const metadata: Metadata = {
 title: "RBA台湾｜日本と台湾を育成でつなぐ | Team Exchange",
 description: "Riot Basketball Academy Japan–Taiwan youth basketball development, coach learning, and team exchange. Confirmed activities and planning clearly distinguished.",
 alternates: {canonical:"https://riotbasketballacademy.com/ja/taiwan/exchange", languages:{"en":"https://riotbasketballacademy.com/taiwan/exchange","ja":"https://riotbasketballacademy.com/ja/taiwan/exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/exchange","ko":"https://riotbasketballacademy.com/ko/taiwan/exchange"}},
 openGraph:{title:"RBA台湾｜日本と台湾を育成でつなぐ | Team Exchange",url:"https://riotbasketballacademy.com/ja/taiwan/exchange",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanTeamExchangeOfficial locale="ja"/>;}
