import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://img.clerk.com; connect-src 'self' https://*.clerk.accounts.dev; font-src 'self'; frame-src https://*.clerk.accounts.dev; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://*.clerk.accounts.dev" }
      ]
    }];
  }
};
export default nextConfig;
