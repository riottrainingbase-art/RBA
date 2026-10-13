import type {Metadata} from "next";
import {ProgrammeApplicationPage} from "@/components/programme-application-page";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"RBA APPLICATION",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{offer:string}>}){
  const {offer}=await params;
  return <ProgrammeApplicationPage locale="ja" offerSlug={decodeURIComponent(offer)}/>;
}
