import { pageMetadata } from "@/components/page-metadata";
import { AudiencePage } from "@/components/audience-page";
export const metadata=pageMetadata("en","families");
export default function Page(){return <AudiencePage locale="en" kind="families"/>}