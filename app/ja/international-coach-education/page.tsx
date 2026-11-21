import type { Metadata } from "next";
import { InternationalCoachInterest } from "@/components/international-coach-interest";
export const metadata: Metadata = {
 title:"国際オンライン指導者講習｜無料希望登録 | Riot Basketball Academy",
 description:"RBAで検討中の次回国際オンライン指導者講習。講師・日程・料金は未定です。今後の講習について無料で希望をお知らせください。予約・決済なし。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/international-coach-education",languages:{"ja":"https://riotbasketballacademy.com/ja/international-coach-education","en":"https://riotbasketballacademy.com/international-coach-education"}},
};
export default function Page(){return <InternationalCoachInterest locale="ja"/>}
