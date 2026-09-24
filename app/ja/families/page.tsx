import { pageMetadata } from "@/components/page-metadata";
import { AudiencePage } from "@/components/audience-page";
export const metadata=pageMetadata("ja","families");
export default function Page(){return <AudiencePage locale="ja" kind="families"/>}