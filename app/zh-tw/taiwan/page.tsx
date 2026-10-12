import type { Metadata } from "next";
import { TaiwanOfficial } from "@/components/taiwan-official";
export const metadata: Metadata = {
 title: "RBA 台灣｜日台青少年籃球培育交流",
 description: "Riot Basketball Academy Japan–Taiwan youth basketball development, coach learning, and team exchange. Confirmed activities and planning clearly distinguished.",
 alternates: {canonical:"https://riotbasketballacademy.com/zh-tw/taiwan", languages:{"en":"https://riotbasketballacademy.com/taiwan","ja":"https://riotbasketballacademy.com/ja/taiwan","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan","ko":"https://riotbasketballacademy.com/ko/taiwan"}},
 openGraph:{title:"RBA 台灣｜日台青少年籃球培育交流",url:"https://riotbasketballacademy.com/zh-tw/taiwan",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanOfficial locale="zh-tw"/>;}
