import type { Metadata } from "next";
import { TaiwanOfficial } from "@/components/taiwan-official";
export const metadata: Metadata = {
 title: "RBA Taiwan | Japan–Taiwan Basketball Development",
 description: "Riot Basketball Academy Japan–Taiwan youth basketball development, coach learning, and team exchange. Confirmed activities and planning clearly distinguished.",
 alternates: {canonical:"https://riotbasketballacademy.com/taiwan", languages:{"en":"https://riotbasketballacademy.com/taiwan","ja":"https://riotbasketballacademy.com/ja/taiwan","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan","ko":"https://riotbasketballacademy.com/ko/taiwan"}},
 openGraph:{title:"RBA Taiwan | Japan–Taiwan Basketball Development",url:"https://riotbasketballacademy.com/taiwan",siteName:"Riot Basketball Academy",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanOfficial locale="en"/>;}
