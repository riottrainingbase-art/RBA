import { pageMetadata } from "@/components/page-metadata";
import { AudiencePage } from "@/components/audience-page";
export const metadata=pageMetadata("en","players");
export default function Page(){return <AudiencePage locale="en" kind="players"/>}