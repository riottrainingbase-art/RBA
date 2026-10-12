import type { Metadata } from "next";
import { TaiwanExchangePage } from "@/components/taiwan-exchange-page";
export const metadata:Metadata={
 title:"RBA TAIWAN｜台日青少年籃球交流・教練研習",
 description:"Riot Basketball Academy 與台灣教練及球員的實際交流紀錄。了解青少年籃球訓練、教練研習及台日球隊交流的合作方向。未來活動尚未開放報名。",
 alternates:{canonical:"https://riotbasketballacademy.com/zh-tw/taiwan",languages:{"en":"https://riotbasketballacademy.com/taiwan","ja":"https://riotbasketballacademy.com/ja/taiwan","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan","ko":"https://riotbasketballacademy.com/ko/taiwan","x-default":"https://riotbasketballacademy.com/taiwan"}},
 openGraph:{locale:"zh_TW",title:"RBA TAIWAN｜台日青少年籃球交流・教練研習",description:"Riot Basketball Academy 與台灣教練及球員的實際交流紀錄。了解青少年籃球訓練、教練研習及台日球隊交流的合作方向。未來活動尚未開放報名。",url:"https://riotbasketballacademy.com/zh-tw/taiwan",siteName:"Riot Basketball Academy",type:"website"},
 twitter:{card:"summary_large_image",title:"RBA TAIWAN｜台日青少年籃球交流",description:"在台灣的實際交流、教練研習與青少年球員發展。歡迎學校、球隊及教練洽詢合作。"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanExchangePage locale="zh-tw"/>;}
