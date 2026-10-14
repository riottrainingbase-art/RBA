import { pageMetadata } from "@/components/page-metadata";
import "./torsten-campaign.css";
import { TorstenCoachCampaignJa } from "@/components/torsten-coach-campaign-ja";

export const metadata = {...pageMetadata("ja", "events/torsten-loibl-online-clinic"), title:"練習では入る。試合では打てない。｜トーステン・ロイブル指導者講習 11/25"};
export default function Page() { return <TorstenCoachCampaignJa />; }
