import type {Metadata} from "next";
import {PlatformOperatingSystem} from "@/components/platform-operating-system";

export const metadata:Metadata={
 manifest:"/rba-definitive/manifest.json",
 title:{absolute:"RBA培育平台 | 連結完整的成長路徑"},
 description:"以RBA ID連結球員、家長、教練、球隊、主辦方與海外學院的培育平台。",
 alternates:{canonical:`https://riotbasketballacademy.com/zh-tw/platform`,languages:{"en":"https://riotbasketballacademy.com/platform","ja":"https://riotbasketballacademy.com/ja/platform","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/platform","ko":"https://riotbasketballacademy.com/ko/platform","x-default":"https://riotbasketballacademy.com/platform"}},
 openGraph:{title:"RBA培育平台 | 連結完整的成長路徑",description:"以RBA ID連結球員、家長、教練、球隊、主辦方與海外學院的培育平台。",url:`https://riotbasketballacademy.com/zh-tw/platform`,siteName:"Riot Basketball Academy",type:"website",images:[{url:"https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"}]},
 twitter:{card:"summary_large_image",title:"RBA培育平台 | 連結完整的成長路徑",description:"以RBA ID連結球員、家長、教練、球隊、主辦方與海外學院的培育平台。",images:["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"]}
};

export default function Page(){return <PlatformOperatingSystem locale="zh-tw"/>;}
