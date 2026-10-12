import type { Metadata } from "next";
import { TaiwanTeamExchangePage } from "@/components/taiwan-team-exchange-page";
export const metadata:Metadata={
 title:"Japan–Taiwan Basketball Team Exchange Enquiries",
 description:"Explore basketball-focused exchanges for teams traveling from Taiwan to Japan or Japan to Taiwan.",
 alternates:{canonical:"https://riotbasketballacademy.com/taiwan/exchange",languages:{"ja":"https://riotbasketballacademy.com/ja/taiwan/exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/exchange","en":"https://riotbasketballacademy.com/taiwan/exchange","ko":"https://riotbasketballacademy.com/ko/taiwan/exchange","x-default":"https://riotbasketballacademy.com/taiwan/exchange"}},
 openGraph:{title:"Japan–Taiwan Basketball Team Exchange Enquiries",description:"Explore basketball-focused exchanges for teams traveling from Taiwan to Japan or Japan to Taiwan.",url:"https://riotbasketballacademy.com/taiwan/exchange",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanTeamExchangePage locale="en"/>;}
