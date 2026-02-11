import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.woorifinance.co.id",
      },
      {
        protocol: "https",
        hostname: "apps.woorifinance.co.id",
      },
      {
        protocol: "http",
        hostname: "apps.woorifinance.co.id",
      },
      {
        protocol: "http",
        hostname: "172.16.10.45:4444",
      },
      {
        protocol: "http",
        hostname: "172.16.80.40:3333",
      },
      // Add map tile providers
      {
        protocol: "https",
        hostname: "tile.openstreetmap.org",
      },
      {
        protocol: "https",
        hostname: "**.cartocdn.com",
      },
    ],
    minimumCacheTTL: 60,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
