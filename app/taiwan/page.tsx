import type { Metadata } from "next";
import { TaiwanExchangePage } from "@/components/taiwan-exchange-page";
export const metadata:Metadata={
 title:"RBA Japan–Taiwan Basketball Exchange",
 description:"Purposeful youth basketball development exchanges between Japan and Taiwan. Future programmes are under discussion.",
 alternates:{canonical:"https://riotbasketballacademy.com/taiwan",languages:{"en":"https://riotbasketballacademy.com/taiwan","ja":"https://riotbasketballacademy.com/ja/taiwan","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan","ko":"https://riotbasketballacademy.com/ko/taiwan","x-default":"https://riotbasketballacademy.com/taiwan"}},
 openGraph:{title:"RBA Japan–Taiwan Basketball Exchange",description:"Purposeful youth basketball development exchanges between Japan and Taiwan. Future programmes are under discussion.",url:"https://riotbasketballacademy.com/taiwan",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanExchangePage locale="en"/>;}
