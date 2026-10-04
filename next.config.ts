import { CACHE_TTL_SECONDS } from "./config/cache";
import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  outputFileTracingIncludes: {
    "/resume/pdf": ["./node_modules/@sparticuz/chromium/bin/**"],
  },
  images: {
    minimumCacheTTL: CACHE_TTL_SECONDS,
    remotePatterns: [
      new URL("https://raw.githubusercontent.com/**"),
      new URL("https://opengraph.githubassets.com/**"),
    ],
  },
};

export default nextConfig;
