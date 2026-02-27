import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output: bundles server + dependencies for deployment on VPS/Docker
  // Creates a self-contained server at .next/standalone/server.js
  output: "standalone",
};

export default nextConfig;
