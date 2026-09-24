import { pageMetadata } from "@/components/page-metadata";
import { AudiencePage } from "@/components/audience-page";
export const metadata=pageMetadata("ko","families");
export default function Page(){return <AudiencePage locale="ko" kind="families"/>}