import type { MetadataRoute } from "next";

/**
 * Crawling guidance only; access to these routes MUST also be protected by
 * application authentication and authorization.
 * Public registration information, event details and members' landing pages
 * remain crawlable. Private dashboards and staff tools do not.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/auth/",
        "/ja/d-hub/admin",
        "/my-homecourt/app",
        "/ja/my-homecourt/app",
        "/zh-tw/my-homecourt/app",
        "/ko/my-homecourt/app",
        "/ja/store/manage",
        "/ja/support/manage",
        "/ja/support/advertisers/manage",
        "/ja/events/okinawa-clinic-2026-11-14/admin",
      ],
    },
    sitemap: "https://riotbasketballacademy.com/sitemap.xml",
    host: "https://riotbasketballacademy.com",
  };
}
