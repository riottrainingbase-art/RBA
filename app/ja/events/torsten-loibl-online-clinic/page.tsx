import { pageMetadata } from "@/components/page-metadata";
import "./torsten-campaign.css";
import { TorstenCoachCampaignJa } from "@/components/torsten-coach-campaign-ja";

export const metadata = pageMetadata("ja", "events/torsten-loibl-online-clinic");
export default function Page() { return <TorstenCoachCampaignJa />; }
