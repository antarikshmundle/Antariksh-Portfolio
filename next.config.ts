import type { NextConfig } from "next";

/** Keeps the Kage experiment out of search results until it is cleared for indexing. */
const noIndex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/experiments/:path*", headers: noIndex },
      // The vendored ThreeUI page and its assets are public files, reachable directly.
      { source: "/landing-pages/:path*", headers: noIndex },
    ];
  },
  async redirects() {
    return [
      // AgriVerse and Crop AI Analyzer are one project; the case study lives
      // under the crop-ai-analyzer slug. Keeps old links and bookmarks working.
      {
        source: "/projects/agriverse",
        destination: "/projects/crop-ai-analyzer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
