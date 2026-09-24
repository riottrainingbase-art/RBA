import type { Metadata } from "next";
import { MemberAppPage } from "@/components/member-app-page";
export const metadata:Metadata={title:"MY HOME COURT",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{section?:string[]}>}){const {section}=await params;return <MemberAppPage locale="ja" section={section?.[0]}/>;}