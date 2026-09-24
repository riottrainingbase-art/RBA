import { pageMetadata } from "@/components/page-metadata";
import { AudiencePage } from "@/components/audience-page";
export const metadata=pageMetadata("zh-tw","families");
export default function Page(){return <AudiencePage locale="zh-tw" kind="families"/>}
