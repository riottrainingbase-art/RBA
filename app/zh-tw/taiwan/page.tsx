import type { Metadata } from "next";
import { TaiwanExchangePage } from "@/components/taiwan-exchange-page";
export const metadata:Metadata={
 title:"RBA 日台籃球交流｜日本與台灣的青少年培育",
 description:"日台青少年籃球交流、教練學習與科學化體能教育。未來活動尚在規劃中。",
 alternates:{canonical:"https://riotbasketballacademy.com/zh-tw/taiwan",languages:{"en":"https://riotbasketballacademy.com/taiwan","ja":"https://riotbasketballacademy.com/ja/taiwan","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan","ko":"https://riotbasketballacademy.com/ko/taiwan","x-default":"https://riotbasketballacademy.com/taiwan"}},
 openGraph:{title:"RBA 日台籃球交流｜日本與台灣的青少年培育",description:"日台青少年籃球交流、教練學習與科學化體能教育。未來活動尚在規劃中。",url:"https://riotbasketballacademy.com/zh-tw/taiwan",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanExchangePage locale="zh-tw"/>;}
