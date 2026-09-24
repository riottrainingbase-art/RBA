import type {Metadata} from "next";
import {PublicJournalHub} from "@/components/public-journal";
export const metadata:Metadata={
  title:"RBA Journal | Basketball Development in Japan",
  description:"Development guides, field notes, programme information and Japan–Asia exchange from Riot Basketball Academy.",
  alternates:{canonical:"/journal"}
};
export default function Page(){return <PublicJournalHub locale="en"/>}
