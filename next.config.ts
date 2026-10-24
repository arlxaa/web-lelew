import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A package-lock.json in the home folder confuses root detection.
  turbopack: { root: __dirname },
};

export default nextConfig;
