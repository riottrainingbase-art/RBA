import type { Metadata } from "next";
import { DomesticGrowth } from "@/components/domestic-growth";
export const metadata: Metadata = {"title": "あなたの地域でRBAクリニック｜無料の開催希望登録", "description": "まだ開催がない地域でも、RBAクリニックへの参加希望を無料登録。地域・年代・時期の希望から開催を検討します。", "alternates": {"canonical": "/ja/clinic-interest"}};
export default function Page(){return <DomesticGrowth mode="interest"/>}
