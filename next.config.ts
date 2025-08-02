import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ['www.notion.so', 'secure.notion-static.com','img.notionusercontent.com']
  }
};

export default nextConfig;
