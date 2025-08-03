import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ['www.notion.so', 'secure.notion-static.com', 'img.notionusercontent.com', 'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com']
  }
};

export default nextConfig;
