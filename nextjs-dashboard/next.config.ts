import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow external placeholder images and common CDNs used in development
    domains: ['picsum.photos', 'images.unsplash.com'],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
