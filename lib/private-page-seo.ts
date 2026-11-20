import type { Metadata } from "next";

/** Search engine exclusion; NOT an authorization/security boundary. */
export const privatePageMetadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
};
