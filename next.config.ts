import type { NextConfig } from "next";

const baseCsp="default-src 'self'; base-uri 'self'; form-action 'self' https://*.stripe.com https://forms.gle https://docs.google.com https://form.jotform.com; frame-src 'self' https://form.jotform.com; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; media-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co; upgrade-insecure-requests";
// Local GitHub browser QA only: Next.js dev HMR needs eval; production never gets it.
const localBrowserQA=process.env.NODE_ENV==="development" && process.env.RBA_LOCAL_BROWSER_QA==="1";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source:"/:path*",
      headers:[
        {key:"Content-Security-Policy",value:localBrowserQA?baseCsp.replace("script-src 'self' 'unsafe-inline'","script-src 'self' 'unsafe-inline' 'unsafe-eval'"):baseCsp},
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