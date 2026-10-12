import type { Metadata } from "next";
import { TaiwanTeamExchangePage } from "@/components/taiwan-team-exchange-page";
export const metadata:Metadata={
 title:"台日籃球交流｜台灣赴日本・日本赴台灣",
 description:"台灣球隊赴日本、日本球隊赴台灣的青少年籃球交流賽、訓練營及教練交流企劃洽詢。",
 alternates:{canonical:"https://riotbasketballacademy.com/zh-tw/taiwan/exchange",languages:{"ja":"https://riotbasketballacademy.com/ja/taiwan/exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/exchange","en":"https://riotbasketballacademy.com/taiwan/exchange","ko":"https://riotbasketballacademy.com/ko/taiwan/exchange","x-default":"https://riotbasketballacademy.com/taiwan/exchange"}},
 openGraph:{title:"台日籃球交流｜台灣赴日本・日本赴台灣",description:"台灣球隊赴日本、日本球隊赴台灣的青少年籃球交流賽、訓練營及教練交流企劃洽詢。",url:"https://riotbasketballacademy.com/zh-tw/taiwan/exchange",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanTeamExchangePage locale="zh-tw"/>;}
