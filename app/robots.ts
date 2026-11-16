import type { MetadataRoute } from "next";

// Crawl discovery and access control are separate: authentication remains enforced by the app.
// Keep public MY HOME COURT information discoverable, but do not invite search engines
// to index account-only routes, authentication callbacks or API endpoints.
export default function robots():MetadataRoute.Robots {
 return {
  rules: {
   userAgent: "*",
   allow: "/",
   disallow: ["/api/", "/callback", "/signin-with-chatgpt", "/signout-with-chatgpt", "/my-homecourt/app", "/ja/my-homecourt/app", "/zh-tw/my-homecourt/app", "/ko/my-homecourt/app"],
  },
  sitemap: "https://riotbasketballacademy.com/sitemap.xml",
  host: "https://riotbasketballacademy.com",
 };
}
