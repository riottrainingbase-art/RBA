import { pageMetadata } from "@/components/page-metadata";
import { AudiencePage } from "@/components/audience-page";
export const metadata=pageMetadata("zh-tw","players");
export default function Page(){return <AudiencePage locale="zh-tw" kind="players"/>}
