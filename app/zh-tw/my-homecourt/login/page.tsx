import type { Metadata } from "next";
import { MemberLoginEntry } from "@/components/member-login-entry";
export const metadata:Metadata={title:"RBA ID 登入",robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{error?:string|string[];next?:string|string[]}>}){const query=await searchParams;return <MemberLoginEntry locale="zh-tw" next={typeof query.next==="string"?query.next:undefined} authError={query.error==="browser"||query.error==="expired"?query.error:query.error==="auth"}/>;}