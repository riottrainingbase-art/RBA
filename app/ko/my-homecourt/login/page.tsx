import type { Metadata } from "next";
import { MemberLoginEntry } from "@/components/member-login-entry";
export const metadata:Metadata={title:"RBA ID 로그인",robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{error?:string|string[]}>}){const query=await searchParams;return <MemberLoginEntry locale="ko" authError={query.error==="browser"||query.error==="expired"?query.error:query.error==="auth"}/>;}