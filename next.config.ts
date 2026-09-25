import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/lesson/:slug", destination: "/labs/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
