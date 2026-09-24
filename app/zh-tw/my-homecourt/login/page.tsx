import type { Metadata } from "next";
import { MemberLogin } from "@/components/member-login";
export const metadata:Metadata={title:"RBA ID 登入",robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{error?:string|string[]}>}){const query=await searchParams;return <MemberLogin locale="zh-tw" authError={query.error==="browser"||query.error==="expired"?query.error:query.error==="auth"}/>;}