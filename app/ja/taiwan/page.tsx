import type { Metadata } from "next";
import { TaiwanExchangePage } from "@/components/taiwan-exchange-page";
export const metadata:Metadata={
 title:"RBA 台湾交流｜日本と台湾の育成をつなぐ",
 description:"日台の育成年代バスケットボール交流、指導者の学び、S&C。今後の企画は協議・準備中です。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/taiwan",languages:{"en":"https://riotbasketballacademy.com/taiwan","ja":"https://riotbasketballacademy.com/ja/taiwan","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan","ko":"https://riotbasketballacademy.com/ko/taiwan","x-default":"https://riotbasketballacademy.com/taiwan"}},
 openGraph:{title:"RBA 台湾交流｜日本と台湾の育成をつなぐ",description:"日台の育成年代バスケットボール交流、指導者の学び、S&C。今後の企画は協議・準備中です。",url:"https://riotbasketballacademy.com/ja/taiwan",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanExchangePage locale="ja"/>;}
