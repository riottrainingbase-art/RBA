import type { Metadata } from "next";
import { TaiwanTeamExchangePage } from "@/components/taiwan-team-exchange-page";
export const metadata:Metadata={
 title:"일본·대만 농구 교류 기획 상담",
 description:"대만에서 일본으로, 일본에서 대만으로 팀 교류 경기와 클리닉 상담.",
 alternates:{canonical:"https://riotbasketballacademy.com/ko/taiwan/exchange",languages:{"ja":"https://riotbasketballacademy.com/ja/taiwan/exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/exchange","en":"https://riotbasketballacademy.com/taiwan/exchange","ko":"https://riotbasketballacademy.com/ko/taiwan/exchange","x-default":"https://riotbasketballacademy.com/taiwan/exchange"}},
 openGraph:{title:"일본·대만 농구 교류 기획 상담",description:"대만에서 일본으로, 일본에서 대만으로 팀 교류 경기와 클리닉 상담.",url:"https://riotbasketballacademy.com/ko/taiwan/exchange",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanTeamExchangePage locale="ko"/>;}
