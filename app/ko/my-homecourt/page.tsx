import { pageMetadata } from "@/components/page-metadata";
import { GlobalMyHomecourt } from "@/components/global-my-homecourt";

export const metadata=pageMetadata("ko","my-homecourt");

export default function Page(){
  return <GlobalMyHomecourt locale="ko"/>;
}
