import type { NextConfig } from "next";

const immutableProductionCsp = "default-src 'self'; base-uri 'self'; form-action 'self' https://*.stripe.com https://forms.gle https://docs.google.com https://form.jotform.com; frame-src 'self' https://form.jotform.com; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; media-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co; upgrade-insecure-requests";
// GitHub Actions local HTTP production-bundle smoke ONLY. WebKit honors
// upgrade-insecure-requests even for localhost, where no HTTPS server runs.
// Never omit this directive for public Production or ordinary previews.
const localHttpSmoke = process.env.CI === "true" &&
  process.env.GITHUB_ACTIONS === "true" &&
  process.env.RBA_HTTP_E2E_QA === "1" &&
  process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source:"/:path*",
      headers:[
        {key:"Content-Security-Policy",value:localHttpSmoke ? immutableProductionCsp.replace("; upgrade-insecure-requests","") : immutableProductionCsp},
        {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
        {key:"X-Content-Type-Options",value:"nosniff"},
        {key:"X-Frame-Options",value:"DENY"},
        {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=(), payment=()"},
      ],
    }];
  },
  async redirects() {
    return [
      {
        source: "/my-homecourt.html",
        destination: "/ja/my-homecourt?payment=complete",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;