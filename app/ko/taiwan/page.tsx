import type { Metadata } from "next";
import { TaiwanExchangePage } from "@/components/taiwan-exchange-page";
export const metadata:Metadata={
 title:"RBA 일본·대만 유소년 농구 교류",
 description:"일본과 대만의 유소년 농구 교류와 코치 교육. 향후 프로그램은 협의 중입니다.",
 alternates:{canonical:"https://riotbasketballacademy.com/ko/taiwan",languages:{"en":"https://riotbasketballacademy.com/taiwan","ja":"https://riotbasketballacademy.com/ja/taiwan","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan","ko":"https://riotbasketballacademy.com/ko/taiwan","x-default":"https://riotbasketballacademy.com/taiwan"}},
 openGraph:{title:"RBA 일본·대만 유소년 농구 교류",description:"일본과 대만의 유소년 농구 교류와 코치 교육. 향후 프로그램은 협의 중입니다.",url:"https://riotbasketballacademy.com/ko/taiwan",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanExchangePage locale="ko"/>;}
