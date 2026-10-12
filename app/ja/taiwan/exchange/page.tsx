import type { Metadata } from "next";
import { TaiwanTeamExchangePage } from "@/components/taiwan-team-exchange-page";
export const metadata:Metadata={
 title:"日本・台湾 バスケットボール遠征・交流企画のご相談",
 description:"日本から台湾へ、台湾から日本へ。交流試合・合同練習・育成クリニックの団体向け企画相談。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/taiwan/exchange",languages:{"ja":"https://riotbasketballacademy.com/ja/taiwan/exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/exchange","en":"https://riotbasketballacademy.com/taiwan/exchange","ko":"https://riotbasketballacademy.com/ko/taiwan/exchange","x-default":"https://riotbasketballacademy.com/taiwan/exchange"}},
 openGraph:{title:"日本・台湾 バスケットボール遠征・交流企画のご相談",description:"日本から台湾へ、台湾から日本へ。交流試合・合同練習・育成クリニックの団体向け企画相談。",url:"https://riotbasketballacademy.com/ja/taiwan/exchange",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanTeamExchangePage locale="ja"/>;}
