import type {Metadata} from "next";
import {PlatformOperatingSystem} from "@/components/platform-operating-system";

export const metadata:Metadata={
 manifest:"/rba-definitive/manifest.json",
 title:{absolute:"RBAプラットフォーム｜活動・記録・学び・交流をまとめる"},
 description:"RBA IDとMY HOME COURTを中心に、活動を探す、参加履歴を残す、育成記事を読む、申込・決済を確認する、国内外の交流を相談するといった機能をまとめています。",
 alternates:{canonical:`https://riotbasketballacademy.com/ja/platform`,languages:{"en":"https://riotbasketballacademy.com/platform","ja":"https://riotbasketballacademy.com/ja/platform","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/platform","ko":"https://riotbasketballacademy.com/ko/platform","x-default":"https://riotbasketballacademy.com/platform"}},
 openGraph:{title:"RBAプラットフォーム｜活動・記録・学び・交流をまとめる",description:"RBA IDとMY HOME COURTを中心に、活動を探す、参加履歴を残す、育成記事を読む、申込・決済を確認する、国内外の交流を相談するといった機能をまとめています。",url:`https://riotbasketballacademy.com/ja/platform`,siteName:"Riot Basketball Academy",type:"website",images:[{url:"https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"}]},
 twitter:{card:"summary_large_image",title:"RBAプラットフォーム｜活動・記録・学び・交流をまとめる",description:"RBA IDとMY HOME COURTを中心に、活動を探す、参加履歴を残す、育成記事を読む、申込・決済を確認する、国内外の交流を相談するといった機能をまとめています。",images:["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"]}
};

export default function Page(){return <PlatformOperatingSystem locale="ja"/>;}
