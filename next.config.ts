import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Easter egg for anyone reading response headers in DevTools (Network tab)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Built-By",
            value:
              "Lilia Martinez. Hi, curious one! Type lili() in the Console.",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
