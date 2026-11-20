import type { ReactNode } from "react";
import { privatePageMetadata } from "@/lib/private-page-seo";

// Search-engine hint only. Actual access control belongs in the route/server.
export const metadata = privatePageMetadata;
export default function PrivateSectionLayout({ children }: { children: ReactNode }) {
  return children;
}
