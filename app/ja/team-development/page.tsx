import type { Metadata } from "next";
import { DomesticGrowth } from "@/components/domestic-growth";
export const metadata: Metadata = {"title": "チームの継続支援｜練習に学びを残す3回のモデル｜RBA", "description": "訪問指導、普段の練習での実践、再確認を組み合わせるチーム向け支援。指導者への引き継ぎまで相談できます。", "alternates": {"canonical": "/ja/team-development"}};
export default function Page(){return <DomesticGrowth mode="team"/>}
